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
                // Verifica se a linha contém o SKU isolado (evita casar "123" dentro de "1234")
                // Assumindo que o SKU é a primeira coluna, ele deve estar no início ou
                // precedido por espaço
                if (line.contains(sku)) {

                    // Estratégia: Coluna 5 é a Versão BIOS.
                    // Geralmente em extração de PDF, colunas viram espaços.
                    // Vamos tentar pegar o ÚLTIMO elemento da linha, assumindo que é a versão da
                    // BIOS.
                    // Ex linha: SKU123 Dell Optiplex 7010 PEP12 001 A12

                    // Tenta separar por MÚLTIPLOS espaços (indica separação visual de coluna no
                    // PDF)
                    String[] columns = line.trim().split("\\s{2,}");

                    if (columns.length >= 5) {
                        // Se identificou 5 ou mais colunas, pega a 5ª (índice 4)
                        return columns[4].trim();
                    } else if (columns.length > 0) {
                        // Fallback: Se não conseguiu separar 5 colunas, retorna a última parte
                        // encontrada
                        // assumindo que a formatação pode estar quebrada
                        return columns[columns.length - 1].trim();
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
                    // 1. Tenta split por múltiplos espaços (mais confiável se existir)
                    String[] columns = cleanLine.split("\\s{2,}");
                    if (columns.length >= 5) {
                        return new BiosDetails(
                                columns[0].trim(),
                                columns[1].trim(),
                                columns[2].trim(),
                                columns[3].trim(),
                                columns[4].trim(),
                                cleanLine);
                    }

                    // 2. Heurística Avançada por Hífen+Dígito
                    String[] tokens = cleanLine.split("\\s+");

                    if (tokens.length >= 4) { // SKU + Desc + PEP(val) + Cod + Ver (pode ser curto)
                        String foundSku = tokens[0];

                        // Procurar o token que contém o valor do PEP (ex: H3-02168)
                        // Padrão: contem "-" e depois um digito.
                        int pepValueIndex = -1;
                        for (int i = 1; i < tokens.length - 2; i++) {
                            if (tokens[i].contains("-") && tokens[i].matches(".*-\\d.*")) {
                                pepValueIndex = i;
                                break;
                            }
                        }

                        if (pepValueIndex != -1) {
                            // Verificar se tem prefixo "PEP:" ou "PEP" logo antes
                            int pepStartIndex = pepValueIndex;
                            boolean hasPrefix = false;
                            if (pepStartIndex > 1) {
                                String prev = tokens[pepStartIndex - 1].toUpperCase();
                                if (prev.equals("PEP") || prev.equals("PEP:")) {
                                    pepStartIndex = pepStartIndex - 1;
                                    hasPrefix = true;
                                }
                            }

                            // Reconstruir Descrição (tokens entre SKU e PEP Start)
                            StringBuilder descSb = new StringBuilder();
                            for (int k = 1; k < pepStartIndex; k++) {
                                descSb.append(tokens[k]).append(" ");
                            }

                            // Valor do PEP
                            String pepField;
                            if (hasPrefix) {
                                pepField = tokens[pepStartIndex] + " " + tokens[pepStartIndex + 1]; // PEP: H3-xxxx
                            } else {
                                pepField = tokens[pepValueIndex];
                            }

                            // Código BIO (próximo token após o valor do PEP)
                            int codeIndex = pepValueIndex + 1;
                            String codigoBios = (codeIndex < tokens.length) ? tokens[codeIndex] : "";

                            // Reconstruir Versão BIOS (tudo após o Código)
                            StringBuilder versaoSb = new StringBuilder();
                            for (int m = codeIndex + 1; m < tokens.length; m++) {
                                versaoSb.append(tokens[m]).append(" ");
                            }

                            return new BiosDetails(
                                    foundSku,
                                    descSb.toString().trim(),
                                    pepField,
                                    codigoBios,
                                    versaoSb.toString().trim(),
                                    cleanLine);
                        }
                    }

                    return new BiosDetails(sku, "Formato irregular encontrado (poucos tokens)", "", "", "", cleanLine);
                }
            }
            return null; // Não encontrado

        } catch (IOException e) {
            e.printStackTrace();
            return new BiosDetails(sku, "Erro IO", "", "", "", e.getMessage());
        }
    }
}
