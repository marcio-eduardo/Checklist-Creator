export interface ChecklistData {
    responsavel: string;
    problema: string;
    diagnostico: string;
    biosAntiga: string;
    biosNova: string;
    cargaCmos: string;
    adaptAcdc: string;
    tensaoEnergia: string;
    inspecaoVisual: string;
    monitorLcd: string;
    teclado: string;
    mouseTouchpad: string;
    softwaresVerificacao: string;
    manutencaoPreventiva: string;
    resumoServico: string;
    chaveWindows: string;
    observacoes: string;
    obsCheck: boolean;
    tipoEquipamento: 'Desktop' | 'Notebook' | 'MiniDesk';
    inserirChaveWindows: boolean;
}

export interface ThemeClasses {
    page: string;
    container: string;
    title: string;
    label: string;
    input: string;
    button: string;
    output: string;
    outputPre: string;
    copyButton: string;
}

export interface Theme {
    name: string;
    icon: string;
    classes: ThemeClasses;
}