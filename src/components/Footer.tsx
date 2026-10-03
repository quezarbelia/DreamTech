import React from 'react';
import { TabType } from '../types';
import { Separator } from '@/components/ui/separator';

interface FooterProps {
  onSelectTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full bg-slate-950/80 border-t border-white/10 mt-16 sm:mt-24 py-10 relative z-10 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-sky-400/20 via-sky-600/30 to-indigo-950/70 p-1 flex items-center justify-center border border-white/20 shadow-[0_0_12px_rgba(56,189,248,0.25)]">
              <img src="/logo.png" alt="DreamTech" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-sm text-white tracking-tight">DreamTech</span>
              <span className="text-[9px] text-slate-400 tracking-wider uppercase font-semibold">Software Designer</span>
            </div>
          </div>

          {/* Footer Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-[13px] font-medium text-slate-400">
            <button
              onClick={() => onSelectTab('inicio-calculadoras')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Plataforma
            </button>
            <button
              onClick={() => onSelectTab('invitaciones-digitales')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Invitaciones
            </button>
            <button
              onClick={() => onSelectTab('planes-precios-saas')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Suscripciones SaaS
            </button>
            <button
              onClick={() => onSelectTab('soluciones-ia')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Sistemas Cloud
            </button>
            <button
              onClick={() => onSelectTab('como-funciona-contacto')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cómo Funciona
            </button>
          </nav>
        </div>

        <Separator className="bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-slate-400">
          <div>
            Diseñada por <span className="text-white font-medium">Gabriel Quezada</span>
          </div>
          <div className="text-slate-500">
            © 2026 DreamTech Software Designer. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};
