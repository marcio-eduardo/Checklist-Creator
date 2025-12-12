import { useState } from 'react';
import ChecklistForm from './components/ChecklistForm';
import ChecklistOutput from './components/ChecklistOutput';

function App() {
  const [output, setOutput] = useState<string>('');

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch('http://localhost:8080/api/checklist/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const text = await response.text();
        setOutput(text);
      } else {
        console.error('Failed to generate checklist');
        setOutput('Erro ao gerar checklist. Verifique o console.');
      }
    } catch (error) {
      console.error('Error connecting to backend', error);
      setOutput('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Gerador de Checklist</h1>
        <p className="mt-2 text-sm text-gray-600">Preencha os dados abaixo para gerar o relatório padronizado.</p>
      </div>

      <ChecklistForm onSubmit={handleSubmit} />
      <ChecklistOutput output={output} />
    </div>
  );
}

export default App;
