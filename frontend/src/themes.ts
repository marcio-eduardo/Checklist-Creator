import type { Theme } from './types';

export const themes: Record<string, Theme> = {
    padrao: {
        name: 'Padrão',
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
        name: 'Corporativo',
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
    cyberpunk: {
        name: 'Cyberpunk',
        icon: '👾',
        classes: {
            page: 'bg-[#0b0c15]',
            container: 'bg-[#1a1b26] shadow-lg border border-emerald-500/30',
            title: 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-600 font-extrabold',
            label: 'text-emerald-300',
            input: 'border-emerald-900/50 focus:border-cyan-500 focus:ring-cyan-500/20 bg-[#0f1019] text-cyan-100',
            button: 'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white border-none',
            output: 'bg-[#0f1019] border-emerald-900/50 text-emerald-100',
            outputPre: 'bg-black text-cyan-400 border-emerald-900',
            copyButton: 'text-emerald-300 bg-emerald-900/20 hover:bg-emerald-900/40 border border-emerald-500/30'
        }
    }
};