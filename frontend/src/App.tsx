import { useState, useEffect } from 'react';
import ChecklistForm from './components/ChecklistForm';
import ChecklistOutput from './components/ChecklistOutput';
import Navbar from './components/Navbar';
import { themes } from './themes';
import type { ChecklistData, BiosDetails } from './types';

function App() {
  const [output, setOutput] = useState<string>('');
  const [currentTheme, setCurrentTheme] = useState<string>('padrao');
  const [history, setHistory] = useState<string[]>([]);
  const [searchedBios, setSearchedBios] = useState<string>('');

  // Estados para o Modal de Pesquisa Detalhada
  const [isBiosModalOpen, setIsBiosModalOpen] = useState(false);
  const [biosSearchSku, setBiosSearchSku] = useState('');
  const [biosDetails, setBiosDetails] = useState<BiosDetails | null>(null);
  const [biosModalLoading, setBiosModalLoading] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('checklist_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    const savedTheme = localStorage.getItem('checklist_theme');
    if (savedTheme) setCurrentTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('checklist_theme', currentTheme);
  }, [currentTheme]);

  const theme = themes[currentTheme] || themes['padrao'];

  const handleSearchBios = async (sku: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/checklist/bios/${sku}`);
      if (response.ok) {
        const text = await response.text();
        setSearchedBios(text);
      } else {
        alert('Erro ao buscar BIOS. Verifique o SKU ou o backend.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão ao buscar BIOS.');
    }
  };

  const handleDetailedBiosSearch = async () => {
    if (!biosSearchSku) return;
    setBiosModalLoading(true);
    setBiosDetails(null);
    try {
      const response = await fetch(`http://localhost:8080/api/checklist/bios/details/${biosSearchSku}`);
      if (response.ok) {
        const data = await response.json();
        setBiosDetails(data);
      } else {
        setBiosDetails(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setBiosModalLoading(false);
    }
  };

  const handleSubmit = async (data: ChecklistData) => {
    try {
      const response = await fetch('http://localhost:8080/api/checklist/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const text = await response.text();
        setOutput(text);
        const newHistory = [text, ...history].slice(0, 10);
        setHistory(newHistory);
        localStorage.setItem('checklist_history', JSON.stringify(newHistory));
      } else {
        setOutput('Erro ao gerar checklist. Verifique se o backend está rodando na porta 8080.');
      }
    } catch (error) {
      setOutput('Erro de conexão com o servidor. O backend (Java) precisa estar rodando.');
    }
  };

  if (!theme) return <div>Erro tema</div>;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme.classes.page}`}>
      <Navbar
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        themeClasses={theme.classes}
        onSearch={handleSearchBios}
        onOpenBiosModal={() => setIsBiosModalOpen(true)}
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

        <ChecklistForm onSubmit={handleSubmit} themeClasses={theme.classes} externalBiosNova={searchedBios} />
        <ChecklistOutput output={output} themeClasses={theme.classes} />

        {history.length > 0 && (
          <div className={`mt-12 max-w-4xl mx-auto p-6 rounded-lg ${theme.classes.container}`}>
            <h3 className={`text-xl font-bold mb-4 ${theme.classes.title}`}>Histórico Recente (Local)</h3>
            <div className="space-y-4">
              {history.map((item, index) => (
                <div key={index} className={`p-3 rounded border ${theme.classes.output}`}>
                  <pre className="whitespace-pre-wrap font-mono text-xs overflow-x-auto max-h-32">{item.substring(0, 300)}...</pre>
                  <button onClick={() => setOutput(item)} className={`mt-2 text-xs font-bold underline ${theme.classes.label}`}>Carregar este resultado</button>
                </div>
              ))}
              <button onClick={() => { setHistory([]); localStorage.removeItem('checklist_history'); }} className="text-xs text-red-500 hover:text-red-700 mt-4">Limpar Histórico</button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Pesquisa Detalhada - Estrutura Simplificada e Robusta */}
      {isBiosModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">

          {/* Backdrop Escuro */}
          <div
            className="fixed inset-0 bg-black/70 transition-opacity"
            onClick={() => setIsBiosModalOpen(false)}
          ></div>

          {/* Painel do Modal */}
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl z-10 flex flex-col max-h-[90vh]">

            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-xl">
              <h3 className="text-xl font-bold text-gray-800" id="modal-title">
                Pesquisa Detalhada de BIOS
              </h3>
              <button
                onClick={() => setIsBiosModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✖
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto">
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={biosSearchSku}
                  onChange={(e) => setBiosSearchSku(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleDetailedBiosSearch()}
                  placeholder="Digite o SKU (ex: 12345)"
                  className="flex-1 rounded-lg border border-gray-300 p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                  autoFocus
                />
                <button
                  onClick={handleDetailedBiosSearch}
                  className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {biosModalLoading ? 'Buscando...' : 'Buscar'}
                </button>
              </div>

              {biosDetails && (
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <ul className="space-y-4 text-gray-800 text-sm">
                    <li className="flex flex-col sm:flex-row sm:items-baseline border-b border-gray-100 pb-2">
                      <strong className="text-gray-900 w-32 shrink-0">SKU:</strong>
                      <span className="font-mono text-indigo-700 font-bold">{biosDetails.sku}</span>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:items-baseline border-b border-gray-100 pb-2">
                      <strong className="text-gray-900 w-32 shrink-0">Descrição do equipamento:</strong>
                      <span>{biosDetails.descricao}</span>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:items-baseline border-b border-gray-100 pb-2">
                      <strong className="text-gray-900 w-32 shrink-0">PEP:</strong>
                      <span>{biosDetails.pep}</span>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:items-baseline border-b border-gray-100 pb-2">
                      <strong className="text-gray-900 w-32 shrink-0">Código da Bios:</strong>
                      <span>{biosDetails.codigoBios}</span>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:items-baseline pt-1">
                      <strong className="text-gray-900 w-32 shrink-0">Versão da Bios:</strong>
                      <span className="font-bold text-green-700">{biosDetails.versaoBios}</span>
                    </li>
                  </ul>

                  {/* Debug Row for development visibility if needed */}
                  {/* <div className="mt-4 text-xs text-gray-400 break-all">{biosDetails.rawData}</div> */}
                </div>
              )}

              {!biosDetails && !biosModalLoading && biosSearchSku && (
                <div className="text-center py-8 text-gray-500">
                  <p>Nenhum resultado encontrado para o SKU <strong>{biosSearchSku}</strong>.</p>
                </div>
              )}

              {!biosDetails && !biosSearchSku && !biosModalLoading && (
                <div className="text-center py-8 text-gray-400">
                  <p>Digite um SKU acima para pesquisar.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex justify-end">
              <button
                type="button"
                onClick={() => setIsBiosModalOpen(false)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors shadow-sm"
              >
                Fechar
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;