package com.checklist;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

public class BiosServiceTest {

    // Simulação logica findBiosDetails
    private BiosDetails parseLineDetails(String line, String searchSku) {
        if (!line.contains(searchSku))
            return null;

        String[] tokens = line.trim().split("\\s+");
        if (tokens.length < 5) {
            return new BiosDetails(searchSku, "Formato inválido", "", "", "", line);
        }

        String sku = tokens[0];
        String versao = tokens[tokens.length - 1];
        String codigo = tokens[tokens.length - 2];
        String pep = tokens[tokens.length - 3];

        StringBuilder descSb = new StringBuilder();
        for (int i = 1; i <= tokens.length - 4; i++) {
            descSb.append(tokens[i]).append(" ");
        }
        String descricao = descSb.toString().trim();

        return new BiosDetails(sku, descricao, pep, codigo, versao, line);
    }

    // Simulação logica findBiosBySku
    private String parseLineSimple(String line, String searchSku) {
        if (!line.contains(searchSku))
            return "SKU não encontrado.";

        String[] tokens = line.trim().split("\\s+");
        if (tokens.length >= 5) {
            return tokens[tokens.length - 1];
        }
        return tokens[tokens.length - 1]; // Fallback
    }

    @Test
    public void testParseStandardLine() {
        String line = "1030308 POSITIVO SIM L3000 SEMPEP 11193469 0101.3.X.P";

        // Teste findBiosDetails
        BiosDetails details = parseLineDetails(line, "1030308");
        assertEquals("0101.3.X.P", details.getVersaoBios());

        // Teste findBiosBySku
        String versionSimple = parseLineSimple(line, "1030308");
        assertEquals("0101.3.X.P", versionSimple);
    }

    @Test
    public void testParseWithPepValue() {
        String line = "1302246 POSITIVO MASTER D150 F4500 H3-1234 11198583 0102.2.X.P";

        // Teste findBiosDetails
        BiosDetails details = parseLineDetails(line, "1302246");
        assertEquals("0102.2.X.P", details.getVersaoBios());

        // Teste findBiosBySku
        String versionSimple = parseLineSimple(line, "1302246");
        assertEquals("0102.2.X.P", versionSimple);
    }
}
