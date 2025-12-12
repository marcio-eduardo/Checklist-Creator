import React from 'react';

interface Props {
    output: string;
}

const ChecklistOutput: React.FC<Props> = ({ output }) => {
    if (!output) return null;

    return (
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-inner max-w-4xl mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Resultado Gerado</h3>
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 bg-white p-4 rounded border border-gray-300 overflow-x-auto">
                {output}
            </pre>
            <div className="mt-4">
                <button
                    onClick={() => navigator.clipboard.writeText(output)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Copiar para Área de Transferência
                </button>
            </div>
        </div>
    );
};

export default ChecklistOutput;
