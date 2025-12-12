import React, { useState } from 'react';

interface ChecklistData {
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
}

interface Props {
    onSubmit: (data: ChecklistData) => void;
}

const ChecklistForm: React.FC<Props> = ({ onSubmit }) => {
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
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg space-y-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Checklist de Suporte Técnico</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Responsável</label>
                    <input type="text" name="responsavel" value={formData.responsavel} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Chave Windows</label>
                    <input type="text" name="chaveWindows" value={formData.chaveWindows} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Problema Relatado</label>
                <textarea name="problema" value={formData.problema} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"></textarea>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Diagnóstico Realizado</label>
                <textarea name="diagnostico" value={formData.diagnostico} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Bios Antiga</label>
                    <input type="text" name="biosAntiga" value={formData.biosAntiga} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Bios Nova</label>
                    <input type="text" name="biosNova" value={formData.biosNova} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Carga CMOS</label>
                    <input type="text" name="cargaCmos" value={formData.cargaCmos} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Adaptador AC/DC (V)</label>
                    <input type="text" name="adaptAcdc" value={formData.adaptAcdc} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tensão Energia (V)</label>
                    <input type="text" name="tensaoEnergia" value={formData.tensaoEnergia} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Inspeção Visual (Máx 200 caracteres)</label>
                <input type="text" name="inspecaoVisual" maxLength={200} value={formData.inspecaoVisual} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Monitor/LCD (Máx 100)</label>
                    <input type="text" name="monitorLcd" maxLength={100} value={formData.monitorLcd} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Teclado (Máx 100)</label>
                    <input type="text" name="teclado" maxLength={100} value={formData.teclado} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mouse/Touchpad (Máx 100)</label>
                    <input type="text" name="mouseTouchpad" maxLength={100} value={formData.mouseTouchpad} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Softwares de Verificação</label>
                <input type="text" name="softwaresVerificacao" value={formData.softwaresVerificacao} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Manutenção Preventiva (Máx 100)</label>
                <input type="text" name="manutencaoPreventiva" maxLength={100} value={formData.manutencaoPreventiva} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Resumo do Serviço (Máx 500)</label>
                <textarea name="resumoServico" maxLength={500} value={formData.resumoServico} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"></textarea>
            </div>

            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input id="obsCheck" name="obsCheck" type="checkbox" checked={formData.obsCheck} onChange={handleCheckboxChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="obsCheck" className="font-medium text-gray-700">Adicionar Observações</label>
                </div>
            </div>

            {formData.obsCheck && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Observações (Máx 500)</label>
                    <textarea name="observacoes" maxLength={500} value={formData.observacoes} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"></textarea>
                </div>
            )}

            <div className="pt-4">
                <button type="submit" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Gerar Checklist
                </button>
            </div>
        </form>
    );
};

export default ChecklistForm;
