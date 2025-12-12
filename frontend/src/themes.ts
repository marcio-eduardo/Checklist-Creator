import type { Theme } from './types';

export const themes: Record<string, Theme> = {
    padrao: {
        name: 'Padrão (Clean)',
        icon: '☀️',
        classes: {
            page: 'bg-gray-100',
            container: 'bg-white shadow-md border-gray-200',
            title: 'text-gray-800',
            label: 'text-gray-700',
            input: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900',
            button: 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500',
            output: 'bg-gray-50 border-gray-200 text-gray-800',
            outputPre: 'bg-white text-gray-800 border-gray-300',
            copyButton: 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200'
        }
    },
    dark: {
        name: 'Modo Noturno',
        icon: '🌙',
        classes: {
            page: 'bg-gray-900',
            container: 'bg-gray-800 shadow-xl border-gray-700',
            title: 'text-white',
            label: 'text-gray-300',
            input: 'border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400',
            button: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
            output: 'bg-gray-800 border-gray-700 text-gray-200',
            outputPre: 'bg-gray-900 text-green-400 border-gray-700',
            copyButton: 'text-blue-300 bg-gray-700 hover:bg-gray-600 border border-gray-600'
        }
    },
    corporativo: {
        name: 'Corporativo (Azul)',
        icon: '💼',
        classes: {
            page: 'bg-slate-200',
            container: 'bg-white shadow-sm border-t-4 border-slate-800',
            title: 'text-slate-800 uppercase tracking-wide',
            label: 'text-slate-600 font-bold text-xs uppercase',
            input: 'border-slate-300 focus:border-slate-800 focus:ring-slate-800 bg-slate-50 text-slate-900 rounded-none',
            button: 'bg-slate-800 hover:bg-slate-900 text-white rounded-none focus:ring-slate-500',
            output: 'bg-white border-slate-300 text-slate-800',
            outputPre: 'bg-slate-50 text-slate-900 border-slate-200 font-serif',
            copyButton: 'text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-none'
        }
    },
    minimalista: {
        name: 'Papel (Minimalista)',
        icon: '📄',
        classes: {
            page: 'bg-white',
            container: 'bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
            title: 'text-black font-serif italic',
            label: 'text-black font-medium',
            input: 'border-2 border-black focus:ring-0 focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-white text-black rounded-none',
            button: 'bg-black text-white hover:bg-gray-800 rounded-none focus:ring-gray-500 shadow-[4px_4px_0px_0px_rgba(100,100,100,0.5)] active:translate-y-1 active:shadow-none transition-all',
            output: 'bg-white border-2 border-black text-black',
            outputPre: 'bg-gray-50 text-black border-black border-dashed border-2',
            copyButton: 'text-black border-2 border-black hover:bg-gray-100 rounded-none'
        }
    },
    cyber: {
        name: 'Cyberpunk',
        icon: '👾',
        classes: {
            page: 'bg-[#0b0c15]',
            container: 'bg-[#1a1b26] shadow-lg border border-purple-500/30',
            title: 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-extrabold',
            label: 'text-purple-300',
            input: 'border-purple-900/50 focus:border-pink-500 focus:ring-pink-500/20 bg-[#0f1019] text-pink-100',
            button: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-none',
            output: 'bg-[#0f1019] border-purple-900/50 text-purple-100',
            outputPre: 'bg-black text-pink-400 border-purple-900',
            copyButton: 'text-purple-300 bg-purple-900/20 hover:bg-purple-900/40 border border-purple-500/30'
        }
    }
};