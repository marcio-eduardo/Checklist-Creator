import React from 'react';
import type { BiosDetails } from '../types';

interface BiosSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    biosList: BiosDetails[];
    onSelect: (bios: BiosDetails) => void;
}

const BiosSelectionModal: React.FC<BiosSelectionModalProps> = ({ isOpen, onClose, biosList, onSelect }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
            <div className="fixed inset-0 bg-black/70 transition-opacity" onClick={onClose}></div>
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl z-10 flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-xl">
                    <h3 className="text-xl font-bold text-gray-800">Múltiplas BIOS Encontradas</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">✖</button>
                </div>
                <div className="p-6 overflow-y-auto">
                    <p className="text-gray-600 mb-4">O SKU pesquisado possui mais de uma versão de BIOS registrada. Selecione qual você deseja utilizar:</p>
                    <div className="space-y-3">
                        {biosList.map((bios, index) => (
                            <div key={index} 
                                 onClick={() => { onSelect(bios); onClose(); }}
                                 className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 hover:shadow-md cursor-pointer transition-all flex justify-between items-center bg-white group">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="font-mono font-bold text-indigo-700">{bios.sku}</span>
                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">PEP: {bios.pep}</span>
                                    </div>
                                    <p className="text-sm text-gray-800">{bios.descricao}</p>
                                    <div className="mt-2 text-sm">
                                        <span className="text-gray-500 mr-2">Cód: {bios.codigoBios}</span>
                                        <strong className="text-green-700">Ver: {bios.versaoBios}</strong>
                                    </div>
                                </div>
                                <div className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4">
                                    <button className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md font-medium text-sm border border-indigo-100">Selecionar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors shadow-sm">Cancelar</button>
                </div>
            </div>
        </div>
    );
};
export default BiosSelectionModal;
