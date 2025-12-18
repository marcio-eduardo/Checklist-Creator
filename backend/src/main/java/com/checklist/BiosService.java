package com.checklist;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class BiosService {

    private static final String PDF_PATH = "c:/Users/marci/Documents/Faculdade/Projetos/checklist/Project_Docs/Bios Governo.pdf";

    public String findBiosBySku(String sku) {
        if (sku == null || sku.trim().isEmpty()) {
            return "SKU não fornecido.";
        }

        File file = new File(PDF_PATH);
        if (!file.exists()) {
            return "Arquivo de BIOS não encontrado em: " + PDF_PATH;
        }

        try (PDDocument document = PDDocument.load(file)) {
            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);

            String[] lines = text.split("\\r?\\n");
            for (String line : lines) {
                // Verifica se a linha contém o SKU isolado
                if (line.contains(sku)) {
                    String cleanLine = line.trim();
                    String[] tokens = cleanLine.split("\\s+");

                    // Esperamos pelo menos 5 tokens: SKU, Desc, PEP, Cod, Ver
                    if (tokens.length >= 5) {
                        // O último token é a Versão da BIOS
                        return tokens[tokens.length - 1];
                    } else if (tokens.length > 0) {
                        // Fallback: Se não conseguiu estruturar, pelo menos tenta pegar o último
                        // elemento
                        return tokens[tokens.length - 1];
                    }
                }
            }

            return "SKU não encontrado.";

        } catch (IOException e) {
            e.printStackTrace();
            return "Erro ao ler arquivo PDF: " + e.getMessage();
        }
    }

    public BiosDetails findBiosDetails(String sku) {
        if (sku == null || sku.trim().isEmpty()) {
            return null;
        }

        File file = new File(PDF_PATH);
        if (!file.exists()) {
            return new BiosDetails(sku, "Erro: Arquivo não encontrado", "", "", "", "");
        }

        try (PDDocument document = PDDocument.load(file)) {
            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);

            String[] lines = text.split("\\r?\\n");
            for (String line : lines) {
                if (line.contains(sku)) {
                    String cleanLine = line.trim();
                    String[] tokens = cleanLine.split("\\s+");

                    // Esperamos pelo menos 5 tokens: SKU, Desc(>=1), PEP, Cod, Ver
                    if (tokens.length >= 5) {
                        // Extração Right-to-Left (mais segura para colunas fixas no final)
                        String foundSku = tokens[0];
                        String versaoBios = tokens[tokens.length - 1]; // Última Coluna
                        String codigoBios = tokens[tokens.length - 2]; // Penúltima Coluna
                        String pep = tokens[tokens.length - 3]; // Antepenúltima Coluna

                        // Descrição é o "miolo" (do índice 1 até o índice do PEP - 1)
                        StringBuilder descSb = new StringBuilder();
                        for (int i = 1; i <= tokens.length - 4; i++) {
                            descSb.append(tokens[i]).append(" ");
                        }
                        String descricao = descSb.toString().trim();

                        return new BiosDetails(
                                foundSku,
                                descricao,
                                pep,
                                codigoBios,
                                versaoBios,
                                cleanLine);
                    } else {
                        return new BiosDetails(sku, "Formato irregular (poucas colunas)", "", "", "", cleanLine);
                    }
                }
            }
            return null; // Não encontrado

        } catch (IOException e) {
            e.printStackTrace();
            return new BiosDetails(sku, "Erro IO", "", "", "", e.getMessage());
        }
    }
}
