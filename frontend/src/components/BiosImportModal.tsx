import React, { useState } from 'react';

interface BiosImportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const BiosImportModal: React.FC<BiosImportModalProps> = ({ isOpen, onClose }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    if (!isOpen) return null;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            setMessage(null);
        }
    };

    const handleImport = async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        setMessage(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        // Determine endpoint based on file extension
        let url = 'http://localhost:8000/api/checklist/bios/upload';
        if (selectedFile.name.toLowerCase().endsWith('.xlsx')) {
            url = 'http://localhost:8000/api/checklist/bios/upload_excel';
        }

        try {
            console.log(`Iniciando upload para ${url}`);
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            console.log('Response status:', response.status);
            const text = await response.text();
            console.log('Response text:', text);

            if (response.ok) {
                setMessage({ text, type: 'success' });
                setTimeout(() => {
                    onClose();
                    setMessage(null);
                    setSelectedFile(null);
                }, 2000);
            } else {
                const errorMsg = `Erro ${response.status}: ${text}`;
                setMessage({ text: errorMsg, type: 'error' });
                console.error('Upload failed:', errorMsg);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            let errorDetail = 'Erro desconhecido.';
            if (error instanceof Error) {
                errorDetail = error.message;
            }
            setMessage({ text: `Erro de conexão: ${errorDetail}. Verifique o console (F12).`, type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/70 transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg z-10 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-xl">
                    <h3 className="text-xl font-bold text-gray-800">
                        Importar BIOS (PDF / Excel)
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        ✖
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    <p className="mb-4 text-sm text-gray-600">
                        Selecione o arquivo PDF ou Excel (.xlsx) contendo a lista de BIOS para atualizar o banco de dados.
                    </p>

                    <div className="flex flex-col gap-4">
                        <input
                            type="file"
                            accept=".pdf, .xlsx"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
                        />

                        {message && (
                            <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleImport}
                        disabled={isLoading || !selectedFile}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Enviando...' : 'Enviar Arquivo'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default BiosImportModal;
