import { useState } from 'react';
import ChecklistForm from './components/ChecklistForm';
import ChecklistOutput from './components/ChecklistOutput';
import Navbar from './components/Navbar';
import { themes } from './themes';
import type { ChecklistData } from './types';

function App() {
  const [output, setOutput] = useState<string>('');
  const [currentTheme, setCurrentTheme] = useState<string>('padrao');

  // Fallback seguro: se currentTheme não existir, usa 'padrao'
  const theme = themes[currentTheme] || themes['padrao'];

  const handleSubmit = async (data: ChecklistData) => {
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

  // Se por algum motivo catastrófico o tema for nulo, exibe erro em vez de quebrar
  if (!theme) {
    return <div className="p-10 text-center text-red-600">Erro: Não foi possível carregar o tema visual.</div>;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme.classes.page}`}>

      <Navbar
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        themeClasses={theme.classes}
      />

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className={`text-3xl font-extrabold transition-colors duration-300 ${theme.classes.title}`}>
            Gerador de Checklist
          </h1>
          <p className={`mt-2 text-sm transition-colors duration-300 ${theme.classes.label} opacity-80`}>
            Preencha os dados abaixo para gerar o relatório padronizado.
          </p>
        </div>

        <ChecklistForm onSubmit={handleSubmit} themeClasses={theme.classes} />
        <ChecklistOutput output={output} themeClasses={theme.classes} />
      </div>
    </div>
  );
}

export default App;