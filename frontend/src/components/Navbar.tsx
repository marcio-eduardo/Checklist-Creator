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
    const [sku, setSku] = useState('');

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (sku) {
            onSearch(sku);
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

            {/* Mobile Menu (Simplificado para brevidade, manter lógica existente se possível) */}
        </nav>
    );
};

export default Navbar;
