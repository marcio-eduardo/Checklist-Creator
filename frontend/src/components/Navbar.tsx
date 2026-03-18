import React, { useState } from 'react';
import { themes } from '../themes';
import type { ThemeClasses } from '../types';

interface Props {
    currentTheme: string;
    onThemeChange: (themeKey: string) => void;
    themeClasses: ThemeClasses;
    onSearch: (sku: string) => void;
    onOpenBiosModal: () => void;
    onOpenImportModal: () => void;
    onOpenBiosListModal: () => void;
}

const Navbar: React.FC<Props> = ({ currentTheme, onThemeChange, themeClasses, onSearch, onOpenBiosModal, onOpenImportModal, onOpenBiosListModal }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isThemesOpen, setIsThemesOpen] = useState(false); // New state for themes
    const [sku, setSku] = useState('');

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedSku = sku.trim();
        if (trimmedSku) {
            onSearch(trimmedSku);
        }
    };

    return (
        <nav className={`shadow-lg transition-colors duration-300 ${themeClasses.container} border-b`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="flex-shrink-0 flex items-center">
                        <div className={`${themeClasses.title}`}>
                            <span className="font-bold text-xl hidden sm:block">✅ ChecklistSys</span>
                            <span className="font-bold text-xl sm:hidden">✅</span>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-center px-2 lg:ml-6">
                        <form onSubmit={handleSearchSubmit} className="max-w-lg w-full flex justify-center">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={sku}
                                    onChange={(e) => setSku(e.target.value)}
                                    maxLength={10}
                                    placeholder="SKU"
                                    className={`w-32 sm:w-40 px-3 py-1 text-sm rounded-l-md border-r-0 focus:ring-0 focus:outline-none ${themeClasses.input} border border-gray-300 placeholder-gray-400`}
                                />
                                <button
                                    type="submit"
                                    className={`px-4 py-1 text-sm font-medium rounded-r-md border border-l-0 ${themeClasses.button} opacity-90 hover:opacity-100 transition-opacity`}
                                >
                                    Pesquisar
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="flex items-center">
                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center">
                            <div className="relative ml-3">
                                <div>
                                    <button
                                        onClick={toggleSettings}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium focus:outline-none transition-colors ${themeClasses.button}`}
                                        id="user-menu-button"
                                        aria-expanded="false"
                                        aria-haspopup="true"
                                    >
                                        <span className="hidden sm:inline">Configurações</span>
                                        <span className="sm:hidden">⚙️</span>
                                        <svg className={`h-5 w-5 ${isSettingsOpen ? 'transform rotate-180' : ''} transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                {isSettingsOpen && (
                                    <div
                                        className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 ${themeClasses.container}`}
                                        role="menu"
                                    >
                                        <div className="py-1">
                                            {/* Opção de Pesquisa Detalhada */}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    onOpenBiosModal();
                                                    setIsSettingsOpen(false);
                                                }}
                                                className={`block w-full text-left px-4 py-2 text-sm transition-colors hover:font-bold ${themeClasses.input}`}
                                            >
                                                🔍 Pesquisa Detalhada BIOS
                                            </button>

                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    onOpenBiosListModal();
                                                    setIsSettingsOpen(false);
                                                }}
                                                className={`block w-full text-left px-4 py-2 text-sm transition-colors hover:font-bold ${themeClasses.input}`}
                                            >
                                                📋 Listar Toda BIOS
                                            </button>

                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    onOpenImportModal(); // Nova função
                                                    setIsSettingsOpen(false);
                                                }}
                                                className={`block w-full text-left px-4 py-2 text-sm transition-colors hover:font-bold ${themeClasses.input}`}
                                            >
                                                📥 Importar Lista de BIOS
                                            </button>

                                            <div className="border-t border-gray-200 my-1"></div>

                                            <div className={`px-4 py-2 text-xs font-semibold uppercase ${themeClasses.label}`}>
                                                Temas
                                            </div>
                                            {Object.entries(themes).map(([key, t]) => (
                                                <button
                                                    key={key}
                                                    onClick={() => {
                                                        onThemeChange(key);
                                                        setIsSettingsOpen(false);
                                                    }}
                                                    className={`block w-full text-left px-4 py-2 text-sm transition-colors ${currentTheme === key ? 'bg-indigo-100/10 font-bold' : ''
                                                        } hover:opacity-80 ${themeClasses.input}`}
                                                    role="menuitem"
                                                >
                                                    <span className="mr-2">{t.icon}</span> {t.name}
                                                </button>
                                            ))}

                                            <div className="border-t border-gray-200 my-1"></div>

                                            <button
                                                type="button"
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    if (confirm('Tem certeza que deseja fechar o aplicativo?')) {
                                                        try {
                                                            await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/checklist/shutdown`, { method: 'POST' });
                                                            window.close(); // Tenta fechar a aba
                                                            document.body.innerHTML = "<div style='display:flex;justify-content:center;align-items:center;height:100vh;flex-direction:column'><h1>Aplicação Encerrada</h1><p>Você pode fechar esta janela.</p></div>";
                                                        } catch (err) {
                                                            console.error(err);
                                                            alert('Erro ao tentar desligar o servidor.');
                                                        }
                                                    }
                                                    setIsSettingsOpen(false);
                                                }}
                                                className={`block w-full text-left px-4 py-2 text-sm transition-colors hover:font-bold text-red-600 ${themeClasses.input}`}
                                            >
                                                ❌ Sair do Sistema
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex md:hidden ml-2">
                            <button
                                onClick={toggleMenu}
                                type="button"
                                className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${themeClasses.button}`}
                            >
                                {/* Icon logic */}
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {/* Mobile Menu with Slide-Down Animation */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[80vh] opacity-100 border-t' : 'max-h-0 opacity-0'} ${themeClasses.container}`}>
                <div className="px-4 py-4 space-y-3">

                    <div className="space-y-1">
                        <p className={`px-3 text-xs font-bold uppercase tracking-wider opacity-70 mb-2 ${themeClasses.label}`}>Bios & Dados</p>
                        <button
                            onClick={() => {
                                onOpenBiosModal();
                                setIsMenuOpen(false);
                            }}
                            className={`flex items-center w-full px-3 py-3 rounded-xl transition-all ${themeClasses.input} hover:brightness-95 active:scale-95`}
                        >
                            <span className="text-xl mr-3">🔍</span>
                            <span className="font-medium">Pesquisa Detalhada</span>
                        </button>
                        <button
                            onClick={() => {
                                onOpenBiosListModal();
                                setIsMenuOpen(false);
                            }}
                            className={`flex items-center w-full px-3 py-3 rounded-xl transition-all ${themeClasses.input} hover:brightness-95 active:scale-95`}
                        >
                            <span className="text-xl mr-3">📋</span>
                            <span className="font-medium">Listar Toda BIOS</span>
                        </button>
                        <button
                            onClick={() => {
                                onOpenImportModal();
                                setIsMenuOpen(false);
                            }}
                            className={`flex items-center w-full px-3 py-3 rounded-xl transition-all ${themeClasses.input} hover:brightness-95 active:scale-95`}
                        >
                            <span className="text-xl mr-3">📥</span>
                            <span className="font-medium">Importar Lista</span>
                        </button>
                    </div>

                    <div className="border-t border-gray-200/20 my-2"></div>

                    <div className="space-y-1">
                        <button
                            onClick={() => setIsThemesOpen(!isThemesOpen)}
                            className={`flex items-center justify-between w-full px-3 text-xs font-bold uppercase tracking-wider opacity-70 mb-2 ${themeClasses.label} focus:outline-none`}
                        >
                            <span>Aparência</span>
                            <span>{isThemesOpen ? '▲' : '▼'}</span>
                        </button>

                        {/* Collapsible Themes Grid */}
                        <div className={`grid grid-cols-2 gap-2 transition-all duration-300 overflow-hidden ${isThemesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                            {Object.entries(themes).map(([key, t]) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        onThemeChange(key);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`flex items-center justify-center px-3 py-2 rounded-lg text-sm transition-all ${currentTheme === key
                                            ? 'bg-indigo-500 text-white shadow-md font-bold'
                                            : `${themeClasses.input} hover:brightness-95`
                                        }`}
                                >
                                    <span className="mr-2">{t.icon}</span> {t.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* <div className="border-t border-gray-200/20 my-2"></div>

                     <button
                        onClick={async () => {
                             if (confirm('Tem certeza que deseja fechar o aplicativo?')) {
                                try {
                                    await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/checklist/shutdown`, { method: 'POST' });
                                    window.close();
                                    document.body.innerHTML = "<div style='display:flex;justify-content:center;align-items:center;height:100vh;flex-direction:column'><h1>Aplicação Encerrada</h1><p>Você pode fechar esta janela.</p></div>";
                                } catch (err) {
                                    console.error(err);
                                    alert('Erro ao tentar desligar o servidor.');
                                }
                            }
                            setIsMenuOpen(false);
                        }}
                        className={`flex items-center w-full px-3 py-3 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 transition-colors font-medium`}
                    >
                        <span className="text-xl mr-3">❌</span>
                        Sair do Sistema
                    </button> */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
