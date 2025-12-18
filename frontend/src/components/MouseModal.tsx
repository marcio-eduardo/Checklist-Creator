import React, { useState } from 'react';

interface MouseData {
    cliquesMacios: boolean;
    botoesFuncionais: boolean;
    outro: boolean;
    outroDescricao: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (summary: string) => void;
    currentValue: string;
}

const MouseModal: React.FC<Props> = ({ isOpen, onClose, onSave, currentValue }) => {
    const [data, setData] = useState<MouseData>({
        cliquesMacios: false,
        botoesFuncionais: false,
        outro: false,
        outroDescricao: ''
    });

    if (!isOpen) return null;

    const handleSave = () => {
        let summaryParts = [];
        summaryParts.push(`Cliques Macios: ${data.cliquesMacios ? "SIM" : "NÃO"}`);
        summaryParts.push(`Botões Funcionais: ${data.botoesFuncionais ? "SIM" : "NÃO"}`);

        if (data.outro && data.outroDescricao.trim()) {
            summaryParts.push(`Outro: ${data.outroDescricao.trim()}`);
        } else if (data.outro) {
            summaryParts.push(`Outro`);
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
                    <h3 className="text-lg font-bold text-gray-800 text-center">Mouse / Touchpad</h3>
                </div>

                <div className="p-6 overflow-y-auto">
                    <div className="text-left space-y-4 px-2">
                        {/* Cliques Macios */}
                        <div className="flex items-center">
                            <input
                                id="cliques"
                                type="checkbox"
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                checked={data.cliquesMacios}
                                onChange={(e) => setData({ ...data, cliquesMacios: e.target.checked })}
                            />
                            <label htmlFor="cliques" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
                                Cliques Macios
                            </label>
                        </div>

                        {/* Botões Funcionais */}
                        <div className="flex items-center">
                            <input
                                id="botoes"
                                type="checkbox"
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                checked={data.botoesFuncionais}
                                onChange={(e) => setData({ ...data, botoesFuncionais: e.target.checked })}
                            />
                            <label htmlFor="botoes" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
                                Botões Funcionais
                            </label>
                        </div>

                        {/* Outro */}
                        <div>
                            <div className="flex items-center">
                                <input
                                    id="outroMouse"
                                    type="checkbox"
                                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                    checked={data.outro}
                                    onChange={(e) => setData({ ...data, outro: e.target.checked })}
                                />
                                <label htmlFor="outroMouse" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
                                    Outro
                                </label>
                            </div>

                            {data.outro && (
                                <div className="mt-3 ml-8 animate-fade-in-down">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Especifique:</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                        value={data.outroDescricao}
                                        onChange={(e) => setData({ ...data, outroDescricao: e.target.value })}
                                        placeholder="Ex: Trackpad falhando..."
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
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MouseModal;
