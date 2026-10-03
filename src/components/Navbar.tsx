import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabType } from '../types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calculator,
  Mail,
  Layers,
  Bot,
  Settings2,
  Menu,
  X,
  ChevronRight,
  User,
} from 'lucide-react';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'inicio-calculadoras', label: 'Inicio', icon: <Calculator className="w-4 h-4" /> },
    { id: 'invitaciones-digitales', label: 'Invitaciones Digitales', icon: <Mail className="w-4 h-4" /> },
    { id: 'planes-precios-saas', label: 'Planes SaaS', icon: <Layers className="w-4 h-4" /> },
    { id: 'soluciones-ia', label: 'Sistemas Cloud', icon: <Bot className="w-4 h-4" /> },
    { id: 'como-funciona-contacto', label: 'Cómo Funciona', icon: <Settings2 className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: TabType) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center pt-3 px-3 sm:px-6 pointer-events-none w-full max-w-full">
        <div className="w-full max-w-[1360px] h-14 sm:h-16 px-4 sm:px-5 rounded-2xl border border-white/10 bg-[#090d16]/80 backdrop-blur-xl flex items-center justify-between gap-3 pointer-events-auto transition-all shadow-xl shadow-black/40">
          
          {/* Brand Logo & Title */}
          <button
            onClick={() => handleNavClick('inicio-calculadoras')}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer shrink-0"
          >
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-gradient-to-br from-sky-400/30 via-indigo-600/30 to-purple-900/50 p-1 flex items-center justify-center border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.3)] group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all overflow-hidden">
              <img src="/logo.png" alt="DreamTech Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[15px] sm:text-[16px] text-white tracking-tight leading-none group-hover:text-slate-200 transition-colors">
                DreamTech
              </span>
              <span className="text-[9px] text-slate-400 tracking-wider uppercase font-medium mt-0.5">
                Software Designer
              </span>
            </div>
          </button>

          {/* Persistent Desktop Navigation with Shadcn style pills */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 p-1 rounded-full bg-slate-900/70 border border-white/10 backdrop-blur-2xl shadow-inner shrink-0">
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
                      className="absolute inset-0 rounded-full bg-sky-500/20 border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span className={isActive ? 'text-sky-400' : 'text-slate-400'}>{link.icon}</span>
                    <span>{link.label}</span>
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Cotizar & Mobile Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="glow"
              size="sm"
              onClick={onOpenQuoteModal}
              className="rounded-full shadow-md text-xs sm:text-[13px] font-semibold"
            >
              <span className="hidden sm:inline">Cotizar Proyecto</span>
              <span className="inline sm:hidden">Cotizar</span>
            </Button>

            {/* User Profile Shortcut */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleNavClick('como-funciona-contacto')}
              className="rounded-full h-8 w-8 sm:h-9 sm:w-9 border-white/15 text-sky-200 hover:text-white"
              title="Contacto y Soporte"
            >
              <User className="w-4 h-4" />
            </Button>

            {/* Mobile Hamburger Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden rounded-full h-8 w-8 sm:h-9 sm:w-9 border-white/15 text-slate-200"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-50 lg:hidden bg-slate-950/98 backdrop-blur-3xl overflow-y-auto max-h-[100dvh] flex flex-col justify-between p-5"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sky-400/30 via-indigo-600/30 to-purple-900/50 p-1 flex items-center justify-center border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                  <img src="/logo.png" alt="DreamTech" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-white text-base">DreamTech</span>
                  <span className="text-[9px] text-slate-400 tracking-wider uppercase font-semibold">Software Designer</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full"
                aria-label="Cerrar menú"
              >
                <X className="w-4 h-4" />
              </Button>
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
                    className={`flex items-center justify-between p-3.5 rounded-xl text-left text-[14px] font-medium transition-all ${
                      isActive
                        ? 'bg-sky-500/20 text-white shadow-lg border border-sky-400/40 font-semibold'
                        : 'bg-white/5 text-slate-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sky-400">{link.icon}</span>
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <Button
                variant="glow"
                size="lg"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full font-bold"
              >
                Cotizar Proyecto Inmediato
              </Button>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 text-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>Sistemas cloud activos · Soporte técnico continuo</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
