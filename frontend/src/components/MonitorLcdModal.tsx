import React, { useState } from 'react';

interface MonitorData {
    sinaisQueda: boolean;
    riscosListras: boolean;
    manchasTela: boolean;
    pixelQueimado: boolean;
    anomalia: boolean;
    anomaliaDescricao: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (summary: string) => void;
    currentValue: string;
}

const MonitorLcdModal: React.FC<Props> = ({ isOpen, onClose, onSave, currentValue }) => {
    const [data, setData] = useState<MonitorData>({
        sinaisQueda: false,
        riscosListras: false,
        manchasTela: false,
        pixelQueimado: false,
        anomalia: false,
        anomaliaDescricao: ''
    });

    if (!isOpen) return null;

    const handleSave = () => {
        let summaryParts = [];
        summaryParts.push(`Queda: ${data.sinaisQueda ? "SIM" : "NÃO"}`);
        summaryParts.push(`Riscos/Listras: ${data.riscosListras ? "SIM" : "NÃO"}`);
        summaryParts.push(`Manchas: ${data.manchasTela ? "SIM" : "NÃO"}`);
        summaryParts.push(`Pixel Queimado: ${data.pixelQueimado ? "SIM" : "NÃO"}`);

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
                    <h3 className="text-lg font-bold text-gray-800 text-center">Inspeção Monitor/LCD</h3>
                </div>

                <div className="p-6 overflow-y-auto">
                    <div className="text-left space-y-4 px-2">
                        {/* Sinais de Queda */}
                        <div className="flex items-center">
                            <input
                                id="queda"
                                type="checkbox"
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                checked={data.sinaisQueda}
                                onChange={(e) => setData({ ...data, sinaisQueda: e.target.checked })}
                            />
                            <label htmlFor="queda" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
                                Sinais de Queda
                            </label>
                        </div>

                        {/* Riscos ou Listras */}
                        <div className="flex items-center">
                            <input
                                id="riscos"
                                type="checkbox"
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                checked={data.riscosListras}
                                onChange={(e) => setData({ ...data, riscosListras: e.target.checked })}
                            />
                            <label htmlFor="riscos" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
                                Riscos ou Listras
                            </label>
                        </div>

                        {/* Manchas na Tela */}
                        <div className="flex items-center">
                            <input
                                id="manchas"
                                type="checkbox"
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                checked={data.manchasTela}
                                onChange={(e) => setData({ ...data, manchasTela: e.target.checked })}
                            />
                            <label htmlFor="manchas" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
                                Manchas na Tela
                            </label>
                        </div>

                        {/* Pixel Queimado */}
                        <div className="flex items-center">
                            <input
                                id="pixel"
                                type="checkbox"
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                checked={data.pixelQueimado}
                                onChange={(e) => setData({ ...data, pixelQueimado: e.target.checked })}
                            />
                            <label htmlFor="pixel" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
                                Pixel Queimado
                            </label>
                        </div>

                        {/* Anomalia */}
                        <div>
                            <div className="flex items-center">
                                <input
                                    id="anomaliaMonitor"
                                    type="checkbox"
                                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                    checked={data.anomalia}
                                    onChange={(e) => setData({ ...data, anomalia: e.target.checked })}
                                />
                                <label htmlFor="anomaliaMonitor" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
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
                                        placeholder="Ex: Tela piscando..."
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
                        Salvar Monitor
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MonitorLcdModal;
