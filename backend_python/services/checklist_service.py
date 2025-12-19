from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class ChecklistDTO(BaseModel):
    chamado: Optional[str] = None
    responsavel: Optional[str] = None
    segmento: Optional[str] = None
    problema: Optional[str] = None
    diagnostico: Optional[str] = None
    biosAntiga: Optional[str] = None
    biosNova: Optional[str] = None
    cargaCmos: Optional[str] = None
    adaptAcdc: Optional[str] = None
    tensaoEnergia: Optional[str] = None
    inspecaoVisual: Optional[str] = None
    monitorLcd: Optional[str] = None
    teclado: Optional[str] = None
    mouseTouchpad: Optional[str] = None
    softwaresVerificacao: Optional[str] = None
    manutencaoPreventiva: Optional[str] = None
    resumoServico: Optional[str] = None
    inserirChaveWindows: Optional[bool] = False
    chaveWindows: Optional[str] = None
    observacoes: Optional[str] = None

def append_if_present(sb: list, label: str, value: Optional[str]):
    if value and value.strip():
        sb.append(f"{label}{value}\n\n")

@router.post("/generate")
def generate_output(dto: ChecklistDTO):
    sb = []
    
    append_if_present(sb, "[CHAMADO:] ", dto.chamado)
    append_if_present(sb, "[RESPONSÁVEL NO ACOMPANHAMENTO:]  ", dto.responsavel) # Preserved extra space from Java
    append_if_present(sb, "[SEGMENTO:] ", dto.segmento)
    append_if_present(sb, "[PROBLEMA RELATADO:] ", dto.problema)
    append_if_present(sb, "[DIAGNÓSTICO REALIZADO:] ", dto.diagnostico)
    append_if_present(sb, "[BIOS ANTIGA:] ", dto.biosAntiga)
    append_if_present(sb, "[BIOS NOVA:] ", dto.biosNova)
    append_if_present(sb, "[CARGA CMOS:] ", dto.cargaCmos)
    append_if_present(sb, "[ADAPT ACDC:] ", dto.adaptAcdc)
    append_if_present(sb, "[TENSÃO ENERGIA:] ", dto.tensaoEnergia)
    append_if_present(sb, "[INSPEÇÃO VISUAL:] ", dto.inspecaoVisual)
    append_if_present(sb, "[MONITOR/LCD:] ", dto.monitorLcd)
    append_if_present(sb, "[TECLADO:] ", dto.teclado)
    append_if_present(sb, "[MOUSE/TOUCHPAD:] ", dto.mouseTouchpad)
    append_if_present(sb, "[SOFTWARES DE VERIFICAÇÃO UTILIZADOS:] ", dto.softwaresVerificacao)
    append_if_present(sb, "[MANUTENÇÃO PREVENTIVA:] ", dto.manutencaoPreventiva)
    append_if_present(sb, "[RESUMO DO SERVIÇO:] ", dto.resumoServico)

    if dto.inserirChaveWindows and dto.chaveWindows and dto.chaveWindows.strip():
        append_if_present(sb, "[CHAVE WINDOWS:] ", dto.chaveWindows)

    append_if_present(sb, "[OBSERVAÇÕES:] ", dto.observacoes)

    return "".join(sb)
