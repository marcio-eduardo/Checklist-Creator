import React, { useState } from 'react';

interface InspecaoData {
    oxidado: boolean;
    capacitorEstufado: boolean;
    anomalia: boolean;
    anomaliaDescricao: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (summary: string) => void;
    currentValue: string; // Para tentar popular se já houver dados (opcional, mas bom pra UX)
}

const InspecaoVisualModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
    // Tenta inferir estado inicial da string, ou usa defaults
    const [data, setData] = useState<InspecaoData>({
        oxidado: false,
        capacitorEstufado: false,
        anomalia: false,
        anomaliaDescricao: ''
    });

    if (!isOpen) return null;

    const handleSave = () => {
        let summaryParts = [];
        summaryParts.push(`Oxidado: ${data.oxidado ? "SIM" : "NÃO"}`);
        summaryParts.push(`Capacitor Estufado: ${data.capacitorEstufado ? "SIM" : "NÃO"}`);

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
                    <h3 className="text-lg font-bold text-gray-800 text-center">Inspeção Visual Detalhada</h3>
                </div>

                <div className="p-6 overflow-y-auto">
                    <div className="text-left space-y-4 px-2">
                        {/* Oxidado */}
                        <div className="flex items-center">
                            <input
                                id="oxidado"
                                type="checkbox"
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                checked={data.oxidado}
                                onChange={(e) => setData({ ...data, oxidado: e.target.checked })}
                            />
                            <label htmlFor="oxidado" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
                                Oxidado
                            </label>
                        </div>

                        {/* Capacitor Estufado */}
                        <div className="flex items-center">
                            <input
                                id="capacitor"
                                type="checkbox"
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                checked={data.capacitorEstufado}
                                onChange={(e) => setData({ ...data, capacitorEstufado: e.target.checked })}
                            />
                            <label htmlFor="capacitor" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
                                Capacitor Estufado
                            </label>
                        </div>

                        {/* Anomalia */}
                        <div>
                            <div className="flex items-center">
                                <input
                                    id="anomalia"
                                    type="checkbox"
                                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                    checked={data.anomalia}
                                    onChange={(e) => setData({ ...data, anomalia: e.target.checked })}
                                />
                                <label htmlFor="anomalia" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
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
                                        placeholder="Ex: Pinos tortos..."
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
                        Salvar Inspeção
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InspecaoVisualModal;
