import React, { useState, useEffect } from 'react';
import type { ChecklistData, ThemeClasses } from '../types';
import InspecaoVisualModal from './InspecaoVisualModal';
import MonitorLcdModal from './MonitorLcdModal';
import TecladoModal from './TecladoModal';
import SoftwaresModal from './SoftwaresModal';
import ManutencaoModal from './ManutencaoModal';
import MouseModal from './MouseModal';

interface Props {
    onSubmit: (data: ChecklistData) => void;
    themeClasses: ThemeClasses;
    externalBiosNova?: string; // Prop opcional vinda da busca
}

const ChecklistForm: React.FC<Props> = ({ onSubmit, themeClasses, externalBiosNova }) => {
    const [formData, setFormData] = useState<ChecklistData>({
        responsavel: '',
        problema: '',
        diagnostico: '',
        biosAntiga: '',
        biosNova: '',
        cargaCmos: '',
        adaptAcdc: '',
        tensaoEnergia: '',
        inspecaoVisual: '',
        monitorLcd: '',
        teclado: '',
        mouseTouchpad: '',
        softwaresVerificacao: '',
        manutencaoPreventiva: '',
        resumoServico: '',
        chaveWindows: '',
        observacoes: '',
        obsCheck: false,
        tipoEquipamento: 'Desktop',
        inserirChaveWindows: false,
        sku: '',
        segmento: 'Governo', // Padrão
        chamado: ''
    });

    // Estado para controlar o modal de inspeção visual
    const [isVisualModalOpen, setIsVisualModalOpen] = useState(false);
    // Estado para controlar o modal de Monitor LCD
    const [isMonitorModalOpen, setIsMonitorModalOpen] = useState(false);
    // Estado para controlar o modal de Teclado
    const [isTecladoModalOpen, setIsTecladoModalOpen] = useState(false);
    // Estado para controlar o modal de Softwares
    const [isSoftwaresModalOpen, setIsSoftwaresModalOpen] = useState(false);
    // Estado para controlar o modal de Manutenção
    const [isManutencaoModalOpen, setIsManutencaoModalOpen] = useState(false);
    // Estado para controlar o modal de Mouse
    const [isMouseModalOpen, setIsMouseModalOpen] = useState(false);

    // ... (useEffect e handlers existentes)

    const handleSegmentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, segmento: e.target.value as any }));
    };

    // Efeito para preencher BiosNova quando a busca externa ocorrer
    useEffect(() => {
        if (externalBiosNova) {
            setFormData(prev => ({ ...prev, biosNova: externalBiosNova }));
        }
    }, [externalBiosNova]);

    // Verificação de Segurança
    if (!themeClasses) {
        return <div className="p-4 text-center">A carregar formulário...</div>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleTipoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, tipoEquipamento: e.target.value as any }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleSaveVisual = (summary: string) => {
        setFormData(prev => ({ ...prev, inspecaoVisual: summary }));
        setIsVisualModalOpen(false); // Fecha o modal após salvar
    };

    const handleSaveMonitor = (summary: string) => {
        setFormData(prev => ({ ...prev, monitorLcd: summary }));
        setIsMonitorModalOpen(false);
    };

    const handleSaveTeclado = (summary: string) => {
        setFormData(prev => ({ ...prev, teclado: summary }));
        setIsTecladoModalOpen(false);
    };

    const handleSaveSoftwares = (summary: string) => {
        setFormData(prev => ({ ...prev, softwaresVerificacao: summary }));
        setIsSoftwaresModalOpen(false);
    };

    const handleSaveManutencao = (summary: string) => {
        setFormData(prev => ({ ...prev, manutencaoPreventiva: summary }));
        setIsManutencaoModalOpen(false);
    };

    const handleSaveMouse = (summary: string) => {
        setFormData(prev => ({ ...prev, mouseTouchpad: summary }));
        setIsMouseModalOpen(false);
    };

    // Helper classes
    const inputClass = `mt-1 block w-full rounded-md shadow-sm sm:text-sm border p-2 transition-colors duration-300 ${themeClasses.input}`;
    const labelClass = `block text-sm font-medium transition-colors duration-300 ${themeClasses.label}`;
    const radioContainerClass = `flex items-center space-x-2 cursor-pointer ${themeClasses.input} p-2 rounded-md border border-transparent hover:border-current transition-all`;
    const radioLabelClass = `text-sm font-medium ${themeClasses.label}`;

    return (
        <form onSubmit={handleSubmit} className={`p-6 rounded-lg space-y-4 max-w-4xl mx-auto transition-colors duration-300 ${themeClasses.container}`}>
            <h2 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${themeClasses.title}`}>Dados do Serviço</h2>

            {/* Seleção do Tipo de Equipamento */}
            <div className="mb-6">
                <label className={`block text-lg font-semibold mb-2 ${themeClasses.title}`}>Tipo de Equipamento</label>
                <div className="flex flex-wrap gap-4">
                    {['Desktop', 'Notebook', 'MiniDesk'].map((tipo) => (
                        <label key={tipo} className={radioContainerClass}>
                            <input
                                type="radio"
                                name="tipoEquipamento"
                                value={tipo}
                                checked={formData.tipoEquipamento === tipo}
                                onChange={handleTipoChange}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            />
                            <span className={radioLabelClass}>{tipo}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Seleção de Segmento */}
            <div className="mb-6">
                <label className={`block text-lg font-semibold mb-2 ${themeClasses.title}`}>Segmento</label>
                <div className="flex flex-wrap gap-4">
                    {['Governo', 'Corporativo'].map((seg) => (
                        <label key={seg} className={radioContainerClass}>
                            <input
                                type="radio"
                                name="segmento"
                                value={seg}
                                checked={formData.segmento === seg}
                                onChange={handleSegmentoChange}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            />
                            <span className={radioLabelClass}>{seg}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label className={labelClass}>Chamado</label>
                <input
                    type="text"
                    name="chamado"
                    maxLength={11}
                    value={formData.chamado}
                    onChange={handleChange}
                    className={`mt-1 block w-48 rounded-md shadow-sm sm:text-sm border p-2 transition-colors duration-300 ${themeClasses.input}`}
                    placeholder="2024..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Responsável</label>
                    <input type="text" name="responsavel" value={formData.responsavel} onChange={handleChange} className={inputClass} />
                </div>
            </div>

            {/* Checkbox Chave Windows */}
            <div className="border-t border-b border-gray-200/20 py-4 my-2">
                <div className="flex items-center mb-2">
                    <input
                        id="inserirChaveWindows"
                        name="inserirChaveWindows"
                        type="checkbox"
                        checked={formData.inserirChaveWindows}
                        onChange={handleCheckboxChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2"
                    />
                    <label htmlFor="inserirChaveWindows" className={labelClass}>
                        Inserido chave do windows?
                    </label>
                </div>

                {formData.inserirChaveWindows && (
                    <div className="animate-fade-in-down">
                        <label className={labelClass}>Chave Windows</label>
                        <input type="text" name="chaveWindows" value={formData.chaveWindows} onChange={handleChange} className={inputClass} placeholder="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX" />
                    </div>
                )}
            </div>

            <div>
                <label className={labelClass}>Problema Relatado</label>
                <textarea name="problema" value={formData.problema} onChange={handleChange} rows={3} className={inputClass}></textarea>
            </div>

            <div>
                <label className={labelClass}>Diagnóstico Realizado</label>
                <textarea name="diagnostico" value={formData.diagnostico} onChange={handleChange} rows={3} className={inputClass}></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Bios Antiga</label>
                    <input type="text" name="biosAntiga" value={formData.biosAntiga} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Bios Nova</label>
                    {/* Campo preenchido automaticamente pela busca, mas editável */}
                    <input type="text" name="biosNova" value={formData.biosNova} onChange={handleChange} className={inputClass} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className={labelClass}>Carga CMOS</label>
                    <input type="text" name="cargaCmos" value={formData.cargaCmos} onChange={handleChange} className={inputClass} />
                </div>
                {formData.tipoEquipamento !== 'Desktop' && (
                    <div>
                        <label className={labelClass}>Adaptador AC/DC (V)</label>
                        <input type="text" name="adaptAcdc" value={formData.adaptAcdc} onChange={handleChange} className={inputClass} />
                    </div>
                )}
                <div>
                    <label className={labelClass}>Tensão Energia (V)</label>
                    <input type="text" name="tensaoEnergia" value={formData.tensaoEnergia} onChange={handleChange} className={inputClass} />
                </div>
            </div>

            <div>
                <label className={labelClass}>Inspeção Visual (Clique para detalhar)</label>
                <div onClick={() => setIsVisualModalOpen(true)} className="cursor-pointer">
                    <input
                        type="text"
                        name="inspecaoVisual"
                        readOnly
                        value={formData.inspecaoVisual}
                        className={`${inputClass} bg-gray-50 cursor-pointer`}
                        placeholder="Clique para preencher a inspeção visual"
                    />
                </div>
                {/* Modal de Inspeção Visual */}
                <InspecaoVisualModal
                    isOpen={isVisualModalOpen}
                    onClose={() => setIsVisualModalOpen(false)}
                    onSave={handleSaveVisual}
                    currentValue={formData.inspecaoVisual}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className={labelClass}>Monitor/LCD (Clique para detalhar)</label>
                    <div onClick={() => setIsMonitorModalOpen(true)} className="cursor-pointer">
                        <input
                            type="text"
                            name="monitorLcd"
                            readOnly
                            value={formData.monitorLcd}
                            className={`${inputClass} bg-gray-50 cursor-pointer`}
                            placeholder="Clique para detalhar"
                        />
                    </div>
                    <MonitorLcdModal
                        isOpen={isMonitorModalOpen}
                        onClose={() => setIsMonitorModalOpen(false)}
                        onSave={handleSaveMonitor}
                        currentValue={formData.monitorLcd}
                    />
                </div>
                <div>
                    <label className={labelClass}>Teclado (Clique para detalhar)</label>
                    <div onClick={() => setIsTecladoModalOpen(true)} className="cursor-pointer">
                        <input
                            type="text"
                            name="teclado"
                            readOnly
                            value={formData.teclado}
                            className={`${inputClass} bg-gray-50 cursor-pointer`}
                            placeholder="Clique para detalhar"
                        />
                    </div>
                    <TecladoModal
                        isOpen={isTecladoModalOpen}
                        onClose={() => setIsTecladoModalOpen(false)}
                        onSave={handleSaveTeclado}
                        currentValue={formData.teclado}
                    />
                </div>
                <div>
                    <label className={labelClass}>Mouse/Touchpad (Clique para detalhar)</label>
                    <div onClick={() => setIsMouseModalOpen(true)} className="cursor-pointer">
                        <input
                            type="text"
                            name="mouseTouchpad"
                            readOnly
                            value={formData.mouseTouchpad}
                            className={`${inputClass} bg-gray-50 cursor-pointer`}
                            placeholder="Clique para detalhar"
                        />
                    </div>
                    <MouseModal
                        isOpen={isMouseModalOpen}
                        onClose={() => setIsMouseModalOpen(false)}
                        onSave={handleSaveMouse}
                        currentValue={formData.mouseTouchpad}
                    />
                </div>
            </div>

            <div>
                <label className={labelClass}>Softwares de Verificação (Clique para selecionar)</label>
                <div onClick={() => setIsSoftwaresModalOpen(true)} className="cursor-pointer">
                    <input
                        type="text"
                        name="softwaresVerificacao"
                        readOnly
                        value={formData.softwaresVerificacao}
                        className={`${inputClass} bg-gray-50 cursor-pointer`}
                        placeholder="Clique para selecionar softwares"
                    />
                </div>
                <SoftwaresModal
                    isOpen={isSoftwaresModalOpen}
                    onClose={() => setIsSoftwaresModalOpen(false)}
                    onSave={handleSaveSoftwares}
                    currentValue={formData.softwaresVerificacao}
                />
            </div>

            <div>
                <label className={labelClass}>Manutenção Preventiva (Clique para selecionar)</label>
                <div onClick={() => setIsManutencaoModalOpen(true)} className="cursor-pointer">
                    <input
                        type="text"
                        name="manutencaoPreventiva"
                        readOnly
                        value={formData.manutencaoPreventiva}
                        className={`${inputClass} bg-gray-50 cursor-pointer`}
                        placeholder="Clique para selecionar itens da manutenção"
                    />
                </div>
                <ManutencaoModal
                    isOpen={isManutencaoModalOpen}
                    onClose={() => setIsManutencaoModalOpen(false)}
                    onSave={handleSaveManutencao}
                    currentValue={formData.manutencaoPreventiva}
                />
            </div>

            <div>
                <label className={labelClass}>Resumo do Serviço (Máx 500)</label>
                <textarea name="resumoServico" maxLength={500} value={formData.resumoServico} onChange={handleChange} rows={4} className={inputClass}></textarea>
            </div>

            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input id="obsCheck" name="obsCheck" type="checkbox" checked={formData.obsCheck} onChange={handleCheckboxChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="obsCheck" className={`font-medium ${themeClasses.label}`}>Adicionar Observações</label>
                </div>
            </div>

            {formData.obsCheck && (
                <div>
                    <label className={labelClass}>Observações (Máx 500)</label>
                    <textarea name="observacoes" maxLength={500} value={formData.observacoes} onChange={handleChange} rows={3} className={inputClass}></textarea>
                </div>
            )}

            <div className="pt-4">
                <button type="submit" className={`w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ${themeClasses.button}`}>
                    Gerar Checklist
                </button>
            </div>
        </form>
    );
};

export default ChecklistForm;