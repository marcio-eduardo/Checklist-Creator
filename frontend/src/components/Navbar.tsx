import React, { useState } from 'react';
import { themes } from '../themes';
import type { ThemeClasses } from '../types';

interface Props {
    currentTheme: string;
    onThemeChange: (themeKey: string) => void;
    themeClasses: ThemeClasses;
}

const Navbar: React.FC<Props> = ({ currentTheme, onThemeChange, themeClasses }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

    return (
        <nav className={`shadow-lg transition-colors duration-300 ${themeClasses.container} border-b`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className={`flex-shrink-0 flex items-center ${themeClasses.title}`}>
                            <span className="font-bold text-xl">✅ ChecklistSys</span>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative ml-3">
                            <div>
                                <button
                                    onClick={toggleSettings}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium focus:outline-none transition-colors ${themeClasses.button}`}
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                >
                                    <span>⚙️ Configurações</span>
                                    <svg className={`h-5 w-5 ${isSettingsOpen ? 'transform rotate-180' : ''} transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Dropdown menu */}
                            {isSettingsOpen && (
                                <div
                                    className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 ${themeClasses.container}`}
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                >
                                    <div className="py-1" role="none">
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
                    <div className="-mr-2 flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${themeClasses.button}`}
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
                        <div className={`px-3 py-2 text-xs font-semibold uppercase ${themeClasses.label}`}>
                            Temas
                        </div>
                        {Object.entries(themes).map(([key, t]) => (
                            <button
                                key={key}
                                onClick={() => {
                                    onThemeChange(key);
                                    setIsMenuOpen(false);
                                }}
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${currentTheme === key ? 'bg-indigo-500/10' : ''
                                    } ${themeClasses.title}`}
                            >
                                <span className="mr-2">{t.icon}</span> {t.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
