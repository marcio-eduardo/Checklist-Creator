package com.checklist;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checklist")
@CrossOrigin(origins = "http://localhost:5173") // Permite acesso do frontend Vite
public class ChecklistController {

    @PostMapping("/generate")
    public String generateOutput(@RequestBody ChecklistDTO dto) {
        StringBuilder sb = new StringBuilder();

        sb.append("[RESPONSÁVEL NO ACOMPANHAMENTO:]  ").append(dto.getResponsavel() != null ? dto.getResponsavel() : "").append("\n\n");
        sb.append("[PROBLEMA RELATADO:] ").append(dto.getProblema() != null ? dto.getProblema() : "").append("\n\n");
        sb.append("[DIAGNÓSTICO REALIZADO:] ").append(dto.getDiagnostico() != null ? dto.getDiagnostico() : "").append("\n\n");
        sb.append("[BIOS ANTIGA:] ").append(dto.getBiosAntiga() != null ? dto.getBiosAntiga() : "").append("\n\n");
        sb.append("[BIOS NOVA:] ").append(dto.getBiosNova() != null ? dto.getBiosNova() : "").append("\n\n");
        sb.append("[CARGA CMOS:] ").append(dto.getCargaCmos() != null ? dto.getCargaCmos() : "").append("\n\n");
        sb.append("[ADAPT ACDC:] ").append(dto.getAdaptAcdc() != null ? dto.getAdaptAcdc() : "").append("\n\n");
        sb.append("[TENSÃO ENERGIA:] ").append(dto.getTensaoEnergia() != null ? dto.getTensaoEnergia() : "").append("\n\n");
        sb.append("[INSPEÇÃO VISUAL:] ").append(dto.getInspecaoVisual() != null ? dto.getInspecaoVisual() : "").append("\n\n");
        sb.append("[MONITOR/LCD:] ").append(dto.getMonitorLcd() != null ? dto.getMonitorLcd() : "").append("\n\n");
        sb.append("[TECLADO:] ").append(dto.getTeclado() != null ? dto.getTeclado() : "").append("\n\n");
        sb.append("[MOUSE/TOUCHPAD:] ").append(dto.getMouseTouchpad() != null ? dto.getMouseTouchpad() : "").append("\n\n");
        sb.append("[SOFTWARES DE VERIFICAÇÃO UTILIZADOS:] ").append(dto.getSoftwaresVerificacao() != null ? dto.getSoftwaresVerificacao() : "").append("\n\n");
        sb.append("[MANUTENÇÃO PREVENTIVA:] ").append(dto.getManutencaoPreventiva() != null ? dto.getManutencaoPreventiva() : "").append("\n\n");
        sb.append("[RESUMO DO SERVIÇO:] ").append(dto.getResumoServico() != null ? dto.getResumoServico() : "").append("\n\n");
        sb.append("[CHAVE WINDOWS:] ").append(dto.getChaveWindows() != null ? dto.getChaveWindows() : "").append("\n\n");
        sb.append("[OBSERVAÇÕES:] ").append(dto.getObservacoes() != null ? dto.getObservacoes() : "");


        return sb.toString();
    }
}
