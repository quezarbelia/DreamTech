import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabType } from '../types';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: TabType; label: string; icon: string }[] = [
    { id: 'inicio-calculadoras', label: 'Inicio', icon: 'calculate' },
    { id: 'invitaciones-digitales', label: 'Invitaciones', icon: 'drafts' },
    { id: 'planes-precios-saas', label: 'Planes SaaS', icon: 'layers' },
    { id: 'soluciones-ia', label: 'Soluciones IA', icon: 'psychology' },
    { id: 'como-funciona-contacto', label: 'Cómo Funciona', icon: 'settings_suggest' },
  ];

  const handleNavClick = (tab: TabType) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center pt-2 sm:pt-3 px-2 sm:px-4 lg:px-6 pointer-events-none w-full max-w-full">
        <div className="w-full max-w-[1360px] h-15 sm:h-17 px-3 sm:px-5 rounded-2xl sm:rounded-3xl vision-glass flex items-center justify-between gap-2 pointer-events-auto transition-all shadow-2xl">
          
          {/* Brand Logo & Title */}
          <button
            onClick={() => handleNavClick('inicio-calculadoras')}
            className="flex items-center gap-2 sm:gap-2.5 text-left focus:outline-none group cursor-pointer shrink-0"
          >
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-gradient-to-br from-sky-400/20 via-sky-600/30 to-indigo-950/70 p-1 flex items-center justify-center border border-white/25 shadow-[0_0_15px_rgba(56,189,248,0.25)] group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all backdrop-blur-md overflow-hidden">
              <img src="/logo.png" alt="DreamTech Logo" className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[15px] sm:text-[17px] text-white tracking-tight leading-none group-hover:text-sky-300 transition-colors">
                DreamTech
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] text-slate-400 tracking-widest uppercase font-semibold mt-0.5">
                Software Designer
              </span>
            </div>
          </button>

          {/* Persistent Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 p-1 rounded-full bg-slate-950/40 border border-white/10 backdrop-blur-2xl shadow-inner shrink-0">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 xl:px-4 py-1.5 xl:py-2 rounded-full text-[13px] font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-sky-500/25 border border-sky-400/40 shadow-[0_0_14px_rgba(56,189,248,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] opacity-80">{link.icon}</span>
                    <span>{link.label}</span>
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Cotizar & Mobile Trigger */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center justify-center px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full btn-glass-primary text-white font-semibold text-xs sm:text-[13px] transition-all cursor-pointer whitespace-nowrap active:scale-95 shadow-md"
            >
              <span className="hidden sm:inline">Cotizar Proyecto</span>
              <span className="inline sm:hidden">Cotizar</span>
            </button>

            {/* User Profile Shortcut */}
            <button
              onClick={() => handleNavClick('como-funciona-contacto')}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center shadow-sm transition-all cursor-pointer text-sky-200"
              title="Contacto y Soporte"
            >
              <span className="material-symbols-outlined text-[17px] sm:text-[18px]">person</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-200 hover:text-white transition-colors cursor-pointer"
              aria-label="Abrir menú"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Full Screen with internal scroll) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-50 lg:hidden bg-slate-950/96 backdrop-blur-3xl overflow-y-auto max-h-[100dvh] flex flex-col justify-between p-4 sm:p-6"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-sky-500/20 p-1 flex items-center justify-center border border-white/20">
                  <img src="/logo.png" alt="DreamTech" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-white text-base">DreamTech</span>
                  <span className="text-[9px] text-slate-400 tracking-wider uppercase font-semibold">Software Designer</span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer active:scale-90 transition-transform"
                aria-label="Cerrar menú"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Links List */}
            <div className="flex flex-col gap-2 py-4">
              <div className="text-[11px] uppercase tracking-wider text-sky-400 font-bold px-1 mb-1">
                Secciones Principales
              </div>
              {navLinks.map((link) => {
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl text-left text-[14px] sm:text-[15px] font-medium transition-all ${
                      isActive
                        ? 'bg-sky-500/20 text-white shadow-lg border border-sky-400/35 font-semibold'
                        : 'bg-white/5 text-slate-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[20px] text-sky-400">
                        {link.icon}
                      </span>
                      <span>{link.label}</span>
                    </div>
                    <span className="material-symbols-outlined text-[18px] opacity-60">
                      arrow_forward_ios
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-3.5 rounded-full btn-glass-primary text-white font-bold text-[14px] text-center shadow-lg active:scale-95 transition-transform"
              >
                Cotizar Proyecto Inmediato
              </button>
              <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-slate-400 text-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                <span>Sistemas en línea · 99.98% SLA Multi-Cloud</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
