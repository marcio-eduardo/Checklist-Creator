import React, { useState } from 'react';

interface SoftwaresData {
    swd: boolean;
    memtest: boolean;
    crystaldisk: boolean;
    burnin: boolean;
    outro: boolean;
    outroDescricao: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (summary: string) => void;
    currentValue: string;
}

const SoftwaresModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
    const [data, setData] = useState<SoftwaresData>({
        swd: false,
        memtest: false,
        crystaldisk: false,
        burnin: false,
        outro: false,
        outroDescricao: ''
    });

    if (!isOpen) return null;

    const handleSave = () => {
        let summaryParts = [];
        if (data.swd) summaryParts.push("SWD");
        if (data.memtest) summaryParts.push("MemTest");
        if (data.crystaldisk) summaryParts.push("CrystalDisk");
        if (data.burnin) summaryParts.push("BurnIn Test");

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
                    <h3 className="text-lg font-bold text-gray-800 text-center">Software de Verificação</h3>
                </div>

                <div className="p-6 overflow-y-auto">
                    <div className="text-left space-y-4 px-2">
                        {/* SWD */}
                        <div className="flex items-center">
                            <input
                                id="swd"
                                type="checkbox"
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                checked={data.swd}
                                onChange={(e) => setData({ ...data, swd: e.target.checked })}
                            />
                            <label htmlFor="swd" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
                                SWD
                            </label>
                        </div>

                        {/* MemTest */}
                        <div className="flex items-center">
                            <input
                                id="memtest"
                                type="checkbox"
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                checked={data.memtest}
                                onChange={(e) => setData({ ...data, memtest: e.target.checked })}
                            />
                            <label htmlFor="memtest" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
                                MemTest
                            </label>
                        </div>

                        {/* CrystalDisk */}
                        <div className="flex items-center">
                            <input
                                id="crystaldisk"
                                type="checkbox"
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                checked={data.crystaldisk}
                                onChange={(e) => setData({ ...data, crystaldisk: e.target.checked })}
                            />
                            <label htmlFor="crystaldisk" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
                                CrystalDisk
                            </label>
                        </div>

                        {/* BurnIn Test */}
                        <div className="flex items-center">
                            <input
                                id="burnin"
                                type="checkbox"
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                checked={data.burnin}
                                onChange={(e) => setData({ ...data, burnin: e.target.checked })}
                            />
                            <label htmlFor="burnin" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
                                BurnIn Test
                            </label>
                        </div>

                        {/* Outro */}
                        <div>
                            <div className="flex items-center">
                                <input
                                    id="outro"
                                    type="checkbox"
                                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                    checked={data.outro}
                                    onChange={(e) => setData({ ...data, outro: e.target.checked })}
                                />
                                <label htmlFor="outro" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
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
                                        placeholder="Nome do software..."
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
                        Salvar Softwares
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SoftwaresModal;
