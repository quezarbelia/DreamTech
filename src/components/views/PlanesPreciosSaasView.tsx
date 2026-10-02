import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SAAS_PLAN_CARDS, FAQ_ITEMS } from '../../data/mockData';
import { TabType } from '../../types';

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
    <div className="w-full flex flex-col">
      {/* Header Section */}
      <section className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full vision-glass-pill shadow-lg">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-sky-300 uppercase tracking-widest">
              Transparencia Total · Modelo SaaS Pospago
            </span>
          </div>

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
              <span className="material-symbols-outlined text-sky-400 text-[20px]">verified</span>
              <span className="text-white font-medium">Sin plazos forzosos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sky-400 text-[20px]">schedule</span>
              <span className="text-white font-medium">Corte mensual transparente</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-300 text-[20px]">auto_mode</span>
              <span className="text-white font-medium">Mantenimiento preventivo activo</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6 Pricing Cards Grid */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-8">
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
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 text-left ${
                  isHighlighted
                    ? 'vision-glass-elevated border-sky-400/40'
                    : 'vision-glass hover:border-white/30'
                }`}
              >
                {plan.highlightBadge && (
                  <div className="absolute -top-3.5 right-6">
                    <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 text-xs font-bold shadow-lg">
                      {plan.highlightBadge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-sky-300 px-3 py-1 rounded-full vision-glass-pill">
                      {plan.tag}
                    </span>
                    <span className="material-symbols-outlined text-sky-400 text-[24px]">
                      {plan.icon}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{plan.title}</h2>
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

                  <div className="space-y-3 pt-4 border-t border-white/10 mb-8">
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                        <span className="material-symbols-outlined text-sky-400 text-[18px]">
                          check_circle
                        </span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() =>
                    onOpenQuoteModal(
                      plan.title,
                      `$${plan.price.toLocaleString()} ${plan.priceSuffix}`
                    )
                  }
                  className={`w-full py-3.5 px-4 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    isHighlighted
                      ? 'btn-glass-primary text-white shadow-lg'
                      : 'bg-white/10 hover:bg-white/20 border border-white/15 text-white'
                  }`}
                >
                  Iniciar Despliegue Pospago
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Governance & Policy Section */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-8">
        <div className="rounded-3xl vision-glass-elevated p-6 sm:p-10 text-left">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center shadow-inner text-sky-300">
                <span className="material-symbols-outlined text-[28px]">tune</span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
                  DreamOS Governance v2.4
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Panel de Gobernanza Técnica &amp; Política de Cambios
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full vision-glass text-slate-300 self-start md:self-auto">
              <span className="material-symbols-outlined text-sky-400 text-[16px]">gavel</span>
              <span className="text-xs font-medium">Normativa Contractual Certificada</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-3xl vision-glass p-6 shadow-inner flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300">
                    <span className="material-symbols-outlined text-[18px]">event_repeat</span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Módulo 1: Modificación de Serie Incluida
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                  Cada periodo mensual activo goza de 1 intervención técnica de calibración o ajuste estructural.
                  No es acumulable: el ciclo se reinicia el primer día de cada corte de facturación.
                </p>
              </div>

              <div className="flex items-center justify-between py-2 px-4 rounded-full bg-slate-900/60 border border-white/10 text-xs text-sky-300">
                <span>Disponibilidad Mensual</span>
                <span className="font-bold text-white">1 Solicitud / Periodo</span>
              </div>
            </div>

            <div className="rounded-3xl vision-glass p-6 shadow-inner flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                    <span className="material-symbols-outlined text-[18px]">add_task</span>
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

              <div className="flex items-center justify-between py-2 px-4 rounded-full bg-slate-900/60 border border-white/10 text-xs text-purple-300">
                <span>Costo Unitario Adicional</span>
                <span className="font-bold text-white">$500 MXN / Modificación extra</span>
              </div>
            </div>
          </div>

          {/* Highlighted Developer Clause */}
          <div className="relative rounded-3xl p-6 vision-glass border border-white/15 overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center shrink-0 shadow-lg">
                <span className="material-symbols-outlined text-[26px]">engineering</span>
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
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-400">
              Dudas Frecuentes
            </span>
            <h3 className="text-2xl sm:text-4xl text-white font-bold tracking-tight">
              Preguntas sobre Facturación &amp; SLAs
            </h3>
            <p className="text-sm text-slate-300">
              Conoce el funcionamiento exacto de nuestro modelo pospago y soporte técnico.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-3xl vision-glass p-5 sm:p-6 transition-all text-left"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors pr-4">
                      {faq.question}
                    </span>
                    <span
                      className={`material-symbols-outlined text-sky-400 text-[24px] transform transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-12">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className="rounded-3xl vision-glass-elevated p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-left"
        >
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-400">
              Infraestructura Lista
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white">
              ¿Listo para desplegar tu solución a mes vencido?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Nuestros arquitectos evalúan tu caso de uso en menos de 24 horas y aprovisionan el entorno
              en Google Cloud, AWS o Azure sin desembolso inicial.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onNavigateTab('como-funciona-contacto')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full btn-glass-primary text-white font-bold text-xs sm:text-sm text-center cursor-pointer active:scale-95 shadow-lg"
            >
              Solicitar Diagnóstico Sin Costo
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
