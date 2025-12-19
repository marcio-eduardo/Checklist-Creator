import React, { useState } from 'react';

interface TecladoData {
    teclasMacias: boolean;
    teclasFuncionais: boolean;
    anomalia: boolean;
    anomaliaDescricao: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (summary: string) => void;
    currentValue: string;
}

const TecladoModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
    const [data, setData] = useState<TecladoData>({
        teclasMacias: false,
        teclasFuncionais: false,
        anomalia: false,
        anomaliaDescricao: ''
    });

    if (!isOpen) return null;

    const handleSave = () => {
        let summaryParts = [];
        summaryParts.push(`Teclas Macias: ${data.teclasMacias ? "SIM" : "NÃO"}`);
        summaryParts.push(`Teclas Funcionais: ${data.teclasFuncionais ? "SIM" : "NÃO"}`);

        if (data.anomalia && data.anomaliaDescricao.trim()) {
            summaryParts.push(`Anomalia: ${data.anomaliaDescricao.trim()}`);
        } else if (data.anomalia) {
            summaryParts.push(`Anomalia: SIM (Sem descrição)`);
        } else {
            summaryParts.push(`Anomalia: NÃO`);
        }

        onSave(summaryParts.join(" | "));
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div
                className="fixed inset-0 bg-black/70 transition-opacity"
                onClick={onClose}
            ></div>

            <div
                className="relative bg-white rounded-xl shadow-2xl w-full max-w-md z-10 flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                    <h3 className="text-lg font-bold text-gray-800 text-center">Inspeção Teclado</h3>
                </div>

                <div className="p-6 overflow-y-auto">
                    <div className="text-left space-y-4 px-2">
                        {/* Teclas Macias */}
                        <div className="flex items-center">
                            <input
                                id="teclasMacias"
                                type="checkbox"
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                checked={data.teclasMacias}
                                onChange={(e) => setData({ ...data, teclasMacias: e.target.checked })}
                            />
                            <label htmlFor="teclasMacias" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
                                Teclas Macias
                            </label>
                        </div>

                        {/* Teclas Funcionais */}
                        <div className="flex items-center">
                            <input
                                id="teclasFuncionais"
                                type="checkbox"
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                checked={data.teclasFuncionais}
                                onChange={(e) => setData({ ...data, teclasFuncionais: e.target.checked })}
                            />
                            <label htmlFor="teclasFuncionais" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
                                Teclas Funcionais
                            </label>
                        </div>

                        {/* Anomalia */}
                        <div>
                            <div className="flex items-center">
                                <input
                                    id="anomaliaTeclado"
                                    type="checkbox"
                                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                    checked={data.anomalia}
                                    onChange={(e) => setData({ ...data, anomalia: e.target.checked })}
                                />
                                <label htmlFor="anomaliaTeclado" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
                                    Possui Anomalia?
                                </label>
                            </div>

                            {data.anomalia && (
                                <div className="mt-3 ml-8 animate-fade-in-down">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Descreva a anomalia:</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                        rows={3}
                                        value={data.anomaliaDescricao}
                                        onChange={(e) => setData({ ...data, anomaliaDescricao: e.target.value })}
                                        placeholder="Ex: Tecla Enter emperrada..."
                                        autoFocus
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors shadow-sm"
                    >
                        Salvar Teclado
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TecladoModal;
