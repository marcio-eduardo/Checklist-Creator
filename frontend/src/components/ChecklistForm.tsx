import React, { useState } from 'react';
import type { ChecklistData, ThemeClasses } from '../types';

interface Props {
    onSubmit: (data: ChecklistData) => void;
    themeClasses: ThemeClasses;
}

const ChecklistForm: React.FC<Props> = ({ onSubmit, themeClasses }) => {
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
        inserirChaveWindows: false
    });

    // Verificação de Segurança: se themeClasses não vier, retorna null ou loader para não quebrar
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

    // Helper para aplicar classes comuns + tema
    const inputClass = `mt-1 block w-full rounded-md shadow-sm sm:text-sm border p-2 transition-colors duration-300 ${themeClasses.input}`;
    const labelClass = `block text-sm font-medium transition-colors duration-300 ${themeClasses.label}`;

    // Classes para radio buttons
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className={labelClass}>Bios Antiga</label>
                    <input type="text" name="biosAntiga" value={formData.biosAntiga} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Bios Nova</label>
                    <input type="text" name="biosNova" value={formData.biosNova} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Carga CMOS</label>
                    <input type="text" name="cargaCmos" value={formData.cargaCmos} onChange={handleChange} className={inputClass} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Lógica Condicional: Adaptador AC/DC só aparece se não for Desktop */}
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
                <label className={labelClass}>Inspeção Visual (Máx 200 caracteres)</label>
                <input type="text" name="inspecaoVisual" maxLength={200} value={formData.inspecaoVisual} onChange={handleChange} className={inputClass} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className={labelClass}>Monitor/LCD (Máx 100)</label>
                    <input type="text" name="monitorLcd" maxLength={100} value={formData.monitorLcd} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Teclado (Máx 100)</label>
                    <input type="text" name="teclado" maxLength={100} value={formData.teclado} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Mouse/Touchpad (Máx 100)</label>
                    <input type="text" name="mouseTouchpad" maxLength={100} value={formData.mouseTouchpad} onChange={handleChange} className={inputClass} />
                </div>
            </div>

            <div>
                <label className={labelClass}>Softwares de Verificação</label>
                <input type="text" name="softwaresVerificacao" value={formData.softwaresVerificacao} onChange={handleChange} className={inputClass} />
            </div>

            <div>
                <label className={labelClass}>Manutenção Preventiva (Máx 100)</label>
                <input type="text" name="manutencaoPreventiva" maxLength={100} value={formData.manutencaoPreventiva} onChange={handleChange} className={inputClass} />
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