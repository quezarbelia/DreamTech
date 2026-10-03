import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SAAS_PLAN_CARDS, FAQ_ITEMS } from '../../data/mockData';
import { TabType } from '../../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronDown,
  Zap,
  ArrowRight,
  Sliders,
  Gavel,
  RefreshCw,
  PlusCircle,
  FileCheck,
  Wrench,
  CheckCircle,
} from 'lucide-react';

interface PlanesPreciosSaasViewProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenQuoteModal: (planName?: string, price?: string) => void;
}

export const PlanesPreciosSaasView: React.FC<PlanesPreciosSaasViewProps> = ({
  onNavigateTab,
  onOpenQuoteModal,
}) => {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full flex flex-col space-y-10 sm:space-y-14">
      {/* Header Section */}
      <section className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center max-w-3xl mx-auto space-y-4"
        >
          <Badge variant="glow" className="gap-2 py-1 px-4">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase">
              Transparencia Total · Modelo SaaS Pospago
            </span>
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-white font-extrabold tracking-tight leading-tight">
            Suscripciones Flexibles pagadas a{' '}
            <span className="bg-gradient-to-r from-sky-300 via-indigo-200 to-purple-300 text-transparent bg-clip-text">
              Mes Vencido
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Paga exactamente por el valor productivo que tu empresa ya está capitalizando. Todo despliegue incluye 1
            ajuste arquitectónico mensual garantizado por contrato con SLAs multi-nube (Google Cloud, AWS y Azure).
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-sky-400" />
              <span className="text-white font-medium">Sin plazos forzosos</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400" />
              <span className="text-white font-medium">Corte mensual transparente</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-purple-300" />
              <span className="text-white font-medium">Mantenimiento preventivo activo</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6 Pricing Cards Grid */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {SAAS_PLAN_CARDS.map((plan, idx) => {
            const isHighlighted = !!plan.highlightBadge;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="h-full flex flex-col"
              >
                <Card
                  className={`relative p-6 sm:p-8 flex flex-col justify-between flex-1 transition-all duration-300 text-left ${
                    isHighlighted
                      ? 'border-sky-400/50 bg-slate-900/80 shadow-[0_0_35px_rgba(56,189,248,0.2)]'
                      : 'border-white/10 bg-slate-900/50 hover:border-white/20'
                  }`}
                >
                  {plan.highlightBadge && (
                    <div className="absolute -top-3.5 right-6 z-10">
                      <Badge variant="glow" className="bg-sky-500 text-slate-950 font-black text-xs shadow-lg uppercase border-none px-3 py-0.5">
                        {plan.highlightBadge}
                      </Badge>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="text-[11px] font-semibold uppercase tracking-wider text-sky-300">
                        {plan.tag}
                      </Badge>
                      <span className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-400/20">
                        <Zap className="w-5 h-5" />
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">{plan.title}</h2>
                    <p className="text-xs sm:text-sm text-slate-300 mb-6 min-h-[38px] leading-relaxed">
                      {plan.description}
                    </p>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold text-white leading-none">
                          ${plan.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400 uppercase font-medium">
                          {plan.priceSuffix}
                        </span>
                      </div>
                      {plan.extraNote && (
                        <span className="text-xs font-semibold text-sky-300 mt-1.5 block">
                          {plan.extraNote}
                        </span>
                      )}
                    </div>

                    <Separator className="bg-white/10 mb-6" />

                    <div className="space-y-3 mb-8">
                      {plan.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant={isHighlighted ? 'glow' : 'outline'}
                    size="lg"
                    onClick={() =>
                      onOpenQuoteModal(
                        plan.title,
                        `$${plan.price.toLocaleString()} ${plan.priceSuffix}`
                      )
                    }
                    className="w-full font-bold text-xs sm:text-sm rounded-xl"
                  >
                    Iniciar Despliegue Pospago
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Governance & Policy Section */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-6 sm:p-10 text-left border-white/15 bg-slate-950/70 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center shadow-inner text-sky-300">
                <Sliders className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
                  DreamOS Governance v2.4
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Panel de Gobernanza Técnica &amp; Política de Cambios
                </h3>
              </div>
            </div>

            <Badge variant="outline" className="gap-2 px-3 py-1.5 self-start md:self-auto text-slate-300">
              <Gavel className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-xs font-medium">Normativa Contractual Certificada</span>
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 shadow-inner flex flex-col justify-between border-white/10 bg-slate-900/50">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Módulo 1: Modificación de Serie Incluida
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                  Cada periodo mensual activo goza de 1 intervención técnica de calibración o ajuste estructural.
                  No es acumulable: el ciclo se reinicia el primer día de cada periodo mensual.
                </p>
              </div>

              <div className="flex items-center justify-between py-2 px-4 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-sky-300">
                <span>Disponibilidad Mensual</span>
                <span className="font-bold text-white">1 Solicitud / Periodo</span>
              </div>
            </Card>

            <Card className="p-6 shadow-inner flex flex-col justify-between border-white/10 bg-slate-900/50">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                    <PlusCircle className="w-4 h-4" />
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Módulo 2: Modificaciones Adicionales
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                  Si tus requerimientos de negocio demandan sprints extraordinarios antes del cierre de periodo, puedes
                  activar solicitudes adicionales bajo tarifa plana y predecible.
                </p>
              </div>

              <div className="flex items-center justify-between py-2 px-4 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-purple-300">
                <span>Costo Unitario Adicional</span>
                <span className="font-bold text-white">$500 MXN / Modificación extra</span>
              </div>
            </Card>
          </div>

          {/* Highlighted Developer Clause */}
          <div className="relative rounded-2xl p-6 border border-white/15 bg-slate-900/60 overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center shrink-0 shadow-lg">
                <Wrench className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-widest text-sky-300 font-bold">
                  Cláusula de Evaluación Técnica del Desarrollador
                </span>
                <blockquote className="text-sm sm:text-base text-white italic leading-relaxed">
                  “Al ingresar una solicitud de cambio, el desarrollador / equipo técnico es la entidad facultada
                  para evaluar el impacto estructural y determinar con precisión técnica la cantidad de modificaciones
                  que representa dicha petición.”
                </blockquote>
                <p className="text-xs text-slate-300 pt-1">
                  Esta salvaguarda asegura la estabilidad del código base, la coherencia de los esquemas relacionales
                  y evita la degradación de performance en entornos de producción activos.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Accordion FAQ Section */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <Badge variant="glow" className="text-xs">
              Dudas Frecuentes
            </Badge>
            <h3 className="text-2xl sm:text-4xl text-white font-bold tracking-tight">
              Preguntas sobre Planes, Pagos &amp; Soporte
            </h3>
            <p className="text-sm text-slate-300">
              Conoce el funcionamiento exacto de nuestro modelo pospago y soporte técnico.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <Card
                  key={faq.id}
                  className="p-5 sm:p-6 transition-all text-left border-white/10 bg-slate-900/60"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-sky-400 transform transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t border-white/10 text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <Card className="p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-left border-white/15 bg-slate-950/80 shadow-2xl backdrop-blur-2xl">
          <div className="space-y-2 max-w-xl">
            <Badge variant="glow" className="text-xs">
              Infraestructura Lista
            </Badge>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              ¿Listo para desplegar tu solución a mes vencido?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Nuestros arquitectos evalúan tu caso de uso y aprovisionan el entorno
              en Google Cloud, AWS o Azure sin desembolso inicial.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Button
              variant="glow"
              size="lg"
              onClick={() => onNavigateTab('como-funciona-contacto')}
              className="w-full sm:w-auto font-bold text-xs sm:text-sm gap-2"
            >
              <span>Solicitar Diagnóstico Sin Costo</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};
