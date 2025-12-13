package com.checklist;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BiosDetails {
    private String sku;
    private String descricao;
    private String pep;
    private String codigoBios;
    private String versaoBios;
    private String rawData; // Para debug ou caso o parse falhe
}
