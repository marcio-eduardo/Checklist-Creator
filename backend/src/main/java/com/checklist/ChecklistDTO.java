package com.checklist;

import lombok.Data;

@Data
public class ChecklistDTO {
    private String responsavel;
    private String problema;
    private String diagnostico;
    private String biosAntiga;
    private String biosNova;
    private String cargaCmos;
    private String adaptAcdc;
    private String tensaoEnergia;
    private String inspecaoVisual;
    private String monitorLcd;
    private String teclado;
    private String mouseTouchpad;
    private String softwaresVerificacao;
    private String manutencaoPreventiva;
    private String resumoServico;
    private String chaveWindows;
    private String observacoes;
    private String tipoEquipamento;
    private Boolean inserirChaveWindows;
}
