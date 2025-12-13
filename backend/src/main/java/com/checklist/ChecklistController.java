package com.checklist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.util.StringUtils;

@RestController
@RequestMapping("/api/checklist")
@CrossOrigin(origins = "http://localhost:5173")
public class ChecklistController {

    @Autowired
    private BiosService biosService;

    @GetMapping("/bios/{sku}")
    public String getBios(@PathVariable String sku) {
        return biosService.findBiosBySku(sku);
    }

    @GetMapping("/bios/details/{sku}")
    public BiosDetails getBiosDetails(@PathVariable String sku) {
        return biosService.findBiosDetails(sku);
    }

    @PostMapping("/generate")
    public String generateOutput(@RequestBody ChecklistDTO dto) {
        StringBuilder sb = new StringBuilder();

        appendIfPresent(sb, "[RESPONSÁVEL NO ACOMPANHAMENTO:]  ", dto.getResponsavel());
        appendIfPresent(sb, "[PROBLEMA RELATADO:] ", dto.getProblema());
        appendIfPresent(sb, "[DIAGNÓSTICO REALIZADO:] ", dto.getDiagnostico());
        appendIfPresent(sb, "[BIOS ANTIGA:] ", dto.getBiosAntiga());
        appendIfPresent(sb, "[BIOS NOVA:] ", dto.getBiosNova());
        appendIfPresent(sb, "[CARGA CMOS:] ", dto.getCargaCmos());
        appendIfPresent(sb, "[ADAPT ACDC:] ", dto.getAdaptAcdc());
        appendIfPresent(sb, "[TENSÃO ENERGIA:] ", dto.getTensaoEnergia());
        appendIfPresent(sb, "[INSPEÇÃO VISUAL:] ", dto.getInspecaoVisual());
        appendIfPresent(sb, "[MONITOR/LCD:] ", dto.getMonitorLcd());
        appendIfPresent(sb, "[TECLADO:] ", dto.getTeclado());
        appendIfPresent(sb, "[MOUSE/TOUCHPAD:] ", dto.getMouseTouchpad());
        appendIfPresent(sb, "[SOFTWARES DE VERIFICAÇÃO UTILIZADOS:] ", dto.getSoftwaresVerificacao());
        appendIfPresent(sb, "[MANUTENÇÃO PREVENTIVA:] ", dto.getManutencaoPreventiva());
        appendIfPresent(sb, "[RESUMO DO SERVIÇO:] ", dto.getResumoServico());

        if (Boolean.TRUE.equals(dto.getInserirChaveWindows()) && StringUtils.hasText(dto.getChaveWindows())) {
            appendIfPresent(sb, "[CHAVE WINDOWS:] ", dto.getChaveWindows());
        }

        appendIfPresent(sb, "[OBSERVAÇÕES:] ", dto.getObservacoes());

        return sb.toString();
    }

    private void appendIfPresent(StringBuilder sb, String label, String value) {
        if (StringUtils.hasText(value)) {
            sb.append(label).append(value).append("\n\n");
        }
    }
}
