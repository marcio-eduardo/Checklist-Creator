import React from 'react';
import { type ThemeClasses } from '../types';

interface Props {
    output: string;
    themeClasses: ThemeClasses;
}

const ChecklistOutput: React.FC<Props> = ({ output, themeClasses }) => {
    if (!output) return null;

    return (
        <div className={`mt-8 p-6 rounded-lg shadow-inner max-w-4xl mx-auto transition-colors duration-300 ${themeClasses.output}`}>
            <h3 className={`text-lg font-medium mb-4 ${themeClasses.title}`}>Resultado Gerado</h3>
            <pre className={`whitespace-pre-wrap font-mono text-sm p-4 rounded border overflow-x-auto transition-colors duration-300 ${themeClasses.outputPre}`}>
                {output}
            </pre>
            <div className="mt-4">
                <button
                    onClick={() => navigator.clipboard.writeText(output)}
                    className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${themeClasses.copyButton}`}
                >
                    Copiar para Área de Transferência
                </button>
            </div>
        </div>
    );
};

export default ChecklistOutput;