import React from 'react';
import { TabType } from '../types';

interface FooterProps {
  onSelectTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full vision-glass border-x-0 border-b-0 border-t border-white/10 mt-16 sm:mt-24 py-8 sm:py-10 relative z-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & SLA Indicator */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-sky-500/20 p-1 flex items-center justify-center border border-white/20 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
              <img src="/logo.png" alt="DreamTech" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-sm text-white tracking-tight">DreamTech</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full vision-glass-pill shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] sm:text-[12px] font-medium text-slate-300 tracking-wide">
              Sistemas Multi-Cloud en línea · 99.98% SLA
            </span>
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
            Soluciones IA
          </button>
          <button
            onClick={() => onSelectTab('como-funciona-contacto')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Cómo Funciona
          </button>
        </nav>

        {/* Legal copyright */}
        <div className="text-[12px] text-slate-500 text-center md:text-right">
          © 2026 DreamTech Software Designer. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
