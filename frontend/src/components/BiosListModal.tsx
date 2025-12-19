import React, { useState, useEffect } from 'react';
import type { BiosDetails } from '../types';

interface BiosListModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const BiosListModal: React.FC<BiosListModalProps> = ({ isOpen, onClose }) => {
    const [biosList, setBiosList] = useState<BiosDetails[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            fetchBiosList();
        }
    }, [isOpen]);

    const fetchBiosList = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8000/api/checklist/bios/all');
            if (response.ok) {
                const data = await response.json();
                // Mapear para garantir que os campos correspondam (o backend retorna BiosItem, o frontend usa BiosDetails)
                // BiosItem tem: sku, descricao, pep, codigoBios, versaoBios
                setBiosList(data);
            } else {
                setError('Falha ao carregar lista de BIOS.');
            }
        } catch (err) {
            console.error(err);
            setError('Erro de conexão com o servidor.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/70 transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[95vw] z-10 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-xl">
                    <h3 className="text-xl font-bold text-gray-800">
                        Lista de BIOS ({biosList.length})
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        ✖
                    </button>
                </div>

                {/* Body */}
                <div className="p-0 overflow-y-auto overflow-x-auto flex-1">
                    {isLoading ? (
                        <div className="p-8 text-center text-gray-500">Carregando...</div>
                    ) : error ? (
                        <div className="p-8 text-center text-red-500">{error}</div>
                    ) : (
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-100 text-gray-700 font-bold sticky top-0 z-10">
                                <tr>
                                    <th className="p-3 border-b">SKU</th>
                                    <th className="p-3 border-b">Descrição</th>
                                    <th className="p-3 border-b">PEP</th>
                                    <th className="p-3 border-b">Código</th>
                                    <th className="p-3 border-b">Versão</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {biosList.filter(bios => /^\d/.test(bios.sku)).map((bios) => (
                                    <tr key={bios.sku} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-3 font-mono text-indigo-700 font-bold">{bios.sku}</td>
                                        <td className="p-3">{bios.descricao}</td>
                                        <td className="p-3">{bios.pep}</td>
                                        <td className="p-3">{bios.codigoBios}</td>
                                        <td className="p-3 font-bold text-green-700">{bios.versaoBios}</td>
                                    </tr>
                                ))}
                                {biosList.filter(bios => /^\d/.test(bios.sku)).length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-400">Nenhum registro encontrado.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                    >
                        Fechar
                    </button>
                </div>

            </div>
        </div>
    );
};

export default BiosListModal;
