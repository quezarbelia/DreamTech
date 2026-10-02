import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TabType } from '../../types';

import { sendContactInquiry, generateMailtoUrl, getTargetEmail } from '../../services/emailService';

interface ComoFuncionaContactoViewProps {
  onNavigateTab: (tab: TabType) => void;
}

export const ComoFuncionaContactoView: React.FC<ComoFuncionaContactoViewProps> = ({
  onNavigateTab,
}) => {
  const [selectedReq, setSelectedReq] = useState<string>('ai');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [budgetTier, setBudgetTier] = useState('Plan Pospago Estándar ($0 inicial)');
  const [requirementDetails, setRequirementDetails] = useState('');
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);

  const reqOptions = [
    { id: 'invitacion', label: 'Invitación Digital', icon: 'celebration' },
    { id: 'landing', label: 'Landing Page', icon: 'web' },
    { id: 'pos', label: 'POS & Caja', icon: 'point_of_sale' },
    { id: 'crm', label: 'CRM Ventas', icon: 'hub' },
    { id: 'erp', label: 'ERP Operativo', icon: 'domain' },
    { id: 'ai', label: 'Solución IA a Medida', icon: 'psychology' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionFeedback(null);

    const selectedLabel = reqOptions.find((r) => r.id === selectedReq)?.label || selectedReq;
    const result = await sendContactInquiry({
      fullName,
      email,
      phone,
      requirement: selectedLabel,
      budgetTier,
      details: requirementDetails,
      source: 'formulario-contacto',
    });

    setIsSubmitting(false);
    setSubmissionFeedback(result.message);
    setFormSent(true);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 flex flex-col gap-10 sm:gap-14">
        
        {/* 1. Header Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto pt-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full vision-glass-pill shadow-lg mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping"></span>
            <span className="text-xs font-semibold text-sky-300 tracking-wider uppercase">
              Metodología Ágil · Cero Fricción Financiera
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Cómo Funciona DreamTech &amp;{' '}
            <span className="bg-gradient-to-r from-sky-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent">
              Solicita tu Cotización
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            De la conceptualización técnica al soporte permanente sin barreras de entrada ni cotizaciones astronómicas.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full vision-glass shadow-sm">
              <span className="material-symbols-outlined text-sky-400 text-[18px]">verified</span>
              <span className="text-xs sm:text-sm font-medium text-white">Arquitectura Sin Fricción</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full vision-glass shadow-sm">
              <span className="material-symbols-outlined text-sky-400 text-[18px]">bolt</span>
              <span className="text-xs sm:text-sm font-medium text-white">Setup Inicial $0 USD</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full vision-glass shadow-sm">
              <span className="material-symbols-outlined text-purple-300 text-[18px]">cloud</span>
              <span className="text-xs sm:text-sm font-medium text-white">Nube: GCP, AWS &amp; Azure</span>
            </div>
          </div>
        </motion.section>

        {/* 2. Timeline del Ciclo SaaS Pospago */}
        <section className="relative z-10 flex flex-col gap-6 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-sky-400 tracking-widest uppercase">
                Protocolo de Entrega Continua
              </span>
              <h2 className="text-2xl sm:text-4xl text-white font-bold tracking-tight mt-1">
                El Ciclo SaaS Pospago
              </h2>
            </div>
            <div className="text-xs sm:text-sm text-slate-300 max-w-md">
              Un flujo simbiótico donde la rentabilidad precede a la facturación, respaldado por sprints técnicos certificados.
            </div>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-[2px] -translate-y-1/2 bg-gradient-to-r from-sky-400/20 via-sky-400/60 to-purple-400/20 z-0 pointer-events-none opacity-40 shadow-[0_0_12px_rgba(56,189,248,0.5)]"></div>

            {/* Fase 01 */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 flex flex-col justify-between p-6 sm:p-8 rounded-3xl vision-glass"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-xl font-bold text-sky-300 shadow-inner">
                    01
                  </span>
                  <span className="px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-semibold uppercase tracking-wide">
                    Fase Inicial
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">Auditoría &amp; Prototipado</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Levantamiento ágil de requerimientos y diseño de arquitectura profunda. Modelado espacial UI/UX interactivo
                  y pruebas de flujo con <span className="text-white font-bold">$0 costo inicial de entrada</span>.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Tiempo estimado</span>
                  <span className="text-white font-semibold">3 a 5 días hábiles</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                  <div className="w-full h-full bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"></div>
                </div>
              </div>
            </motion.div>

            {/* Fase 02 */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 flex flex-col justify-between p-6 sm:p-8 rounded-3xl vision-glass-elevated border-sky-400/40"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 flex items-center justify-center text-xl font-bold text-slate-950 shadow-lg">
                    02
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold uppercase tracking-wide">
                    Despliegue Multi-Cloud
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">Lanzamiento &amp; Despliegue</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Implementación directa en producción en Google Cloud, AWS y Azure bajo estándares de ultra-velocidad, microservicios
                  serverless y seguridad perimetral Zero-Trust.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Infraestructura Nube</span>
                  <span className="text-sky-300 font-semibold">GCP, AWS &amp; Azure</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-sky-400 to-purple-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"></div>
                </div>
              </div>
            </motion.div>

            {/* Fase 03 */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 flex flex-col justify-between p-6 sm:p-8 rounded-3xl vision-glass"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-xl font-bold text-sky-300 shadow-inner">
                    03
                  </span>
                  <span className="px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-semibold uppercase tracking-wide">
                    Pospago
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">Mantenimiento Continuo</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Tu software opera generando rentabilidad tangible y facturas a mes vencido. Incluye 1 modificación mensual
                  programada de serie, parches de seguridad transparentes y guardia activa.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Soporte Garantizado</span>
                  <span className="text-white font-semibold">24/7 Monitorización NOC</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                  <div className="w-full h-full bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. Formulario Avanzado de Cotización & Sidebar SLA (Sin videollamada) */}
        <section className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* Main Form Glass Panel (8 Cols) */}
          <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl vision-glass-elevated flex flex-col gap-6">
            <div>
              <span className="text-xs font-semibold text-sky-400 tracking-widest uppercase">
                Estimación Inmediata
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Cotiza tu Proyecto Digital
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Completa los parámetros técnicos de tu visión para recibir un plan de arquitectura y presupuesto garantizado.
              </p>
            </div>

            {!formSent ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Requirement Selector (Pills) */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs sm:text-sm font-semibold text-white">
                    Tipo de Requerimiento Central
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {reqOptions.map((opt) => {
                      const isActive = selectedReq === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedReq(opt.id)}
                          className={`px-3.5 py-2.5 rounded-2xl text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                            isActive
                              ? 'bg-sky-500/25 border-sky-400/50 text-white font-semibold shadow-md'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px] text-sky-400">{opt.icon}</span>
                          <span className="truncate">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Input Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Nombre Completo o Razón Social
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px] pointer-events-none">
                        badge
                      </span>
                      <input
                        required
                        type="text"
                        placeholder="Ej. Alex Valenzuela · Corp Tech"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-500 pl-11 pr-4 py-3 rounded-2xl shadow-inner focus:outline-none focus:ring-1 focus:ring-sky-400 text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Correo Electrónico Profesional
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px] pointer-events-none">
                        alternate_email
                      </span>
                      <input
                        required
                        type="email"
                        placeholder="alex@empresa.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-500 pl-11 pr-4 py-3 rounded-2xl shadow-inner focus:outline-none focus:ring-1 focus:ring-sky-400 text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Teléfono de Contacto
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px] pointer-events-none">
                        call
                      </span>
                      <input
                        required
                        type="tel"
                        placeholder="+52 55 1234 5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-500 pl-11 pr-4 py-3 rounded-2xl shadow-inner focus:outline-none focus:ring-1 focus:ring-sky-400 text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Presupuesto Estimado o Modalidad
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px] pointer-events-none">
                        payments
                      </span>
                      <select
                        value={budgetTier}
                        onChange={(e) => setBudgetTier(e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 text-white pl-11 pr-8 py-3 rounded-2xl shadow-inner focus:outline-none focus:ring-1 focus:ring-sky-400 text-xs sm:text-sm appearance-none cursor-pointer"
                      >
                        <option className="bg-slate-900 text-white">Plan Pospago Estándar ($0 inicial)</option>
                        <option className="bg-slate-900 text-white">SaaS Growth Enterprise ($99 - $249 /mes)</option>
                        <option className="bg-slate-900 text-white">Desarrollo Core a Medida (&gt; $1,000 USD)</option>
                        <option className="bg-slate-900 text-white">Invitación Digital Interactiva ($800 - $2,000 MXN)</option>
                        <option className="bg-slate-900 text-white">Exploración / Consultoría Previa</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 text-slate-400 text-[18px] pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                {/* Detalle del Requerimiento */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-slate-300">
                      Detalle del Requerimiento &amp; Objetivos de Negocio
                    </label>
                    <span className="text-[11px] text-slate-500">Markdown soportado</span>
                  </div>
                  <textarea
                    rows={4}
                    value={requirementDetails}
                    onChange={(e) => setRequirementDetails(e.target.value)}
                    placeholder="Describe brevemente tus flujos, integraciones requeridas en Google Cloud, AWS o Azure, o fechas límite..."
                    className="w-full bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-500 p-4 rounded-2xl shadow-inner focus:outline-none focus:ring-1 focus:ring-sky-400 text-xs sm:text-sm resize-none"
                  />
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="material-symbols-outlined text-sky-400 text-[18px]">lock</span>
                    <span>Acuerdo de Confidencialidad NDA mutuo automático</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full btn-glass-primary text-white font-bold text-xs sm:text-sm active:scale-95 transition-all cursor-pointer shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>Enviando al Correo...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar Cuestionario al Correo</span>
                        <span className="material-symbols-outlined text-[18px]">send</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                  <span className="material-symbols-outlined text-[32px]">mark_email_read</span>
                </div>
                <h3 className="text-2xl font-bold text-white">¡Cuestionario Enviado con Éxito!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Gracias <strong className="text-white">{fullName || 'por escribirnos'}</strong>. La información ha sido remitida a nuestro equipo técnico y se ha enviado la notificación por correo electrónico.
                </p>
                <div className="p-3.5 max-w-md mx-auto rounded-2xl bg-sky-500/10 border border-sky-400/25 text-left text-xs text-slate-300 flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-sky-400 text-[18px] shrink-0 mt-0.5">info</span>
                  <div>
                    <span className="font-semibold text-white">Destinatario configurado:</span> {getTargetEmail()}
                    <div className="text-[11px] text-slate-400 mt-0.5">Te responderemos a la brevedad a {email}.</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                  <a
                    href={generateMailtoUrl({
                      fullName,
                      email,
                      phone,
                      requirement: reqOptions.find((r) => r.id === selectedReq)?.label,
                      budgetTier,
                      details: requirementDetails,
                    })}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">mail</span>
                    <span>Abrir copia en mi gestor de correo</span>
                  </a>
                  <button
                    onClick={() => {
                      setFormSent(false);
                      setFullName('');
                      setEmail('');
                      setPhone('');
                      setRequirementDetails('');
                    }}
                    className="px-5 py-2.5 rounded-full bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-xs sm:text-sm font-medium transition-all cursor-pointer border border-sky-400/30"
                  >
                    Enviar Otra Solicitud
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* SLA Sidebar Card (Sin videollamada como se solicitó) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="p-6 rounded-3xl vision-glass flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    Live SLA Multi-Cloud
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">v4.2.0</span>
              </div>

              <div>
                <div className="text-4xl font-extrabold text-white tracking-tight">99.98%</div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Uptime certificado mediante conmutación por error automatizada en Google Cloud, AWS y Azure.
                </p>
              </div>

              {/* Latency Bars */}
              <div className="flex items-end gap-1.5 h-12 pt-2">
                <div className="w-full bg-sky-500/20 rounded-t-sm h-[80%] hover:h-full transition-all"></div>
                <div className="w-full bg-sky-500/20 rounded-t-sm h-[65%] hover:h-full transition-all"></div>
                <div className="w-full bg-sky-500/30 rounded-t-sm h-[90%] hover:h-full transition-all"></div>
                <div className="w-full bg-sky-500/20 rounded-t-sm h-[75%] hover:h-full transition-all"></div>
                <div className="w-full bg-sky-500/40 rounded-t-sm h-[95%] hover:h-full transition-all"></div>
                <div className="w-full bg-sky-500/30 rounded-t-sm h-[85%] hover:h-full transition-all"></div>
                <div className="w-full bg-sky-400 rounded-t-sm h-full shadow-[0_0_8px_rgba(56,189,248,0.6)]"></div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 flex items-start gap-3">
                <span className="material-symbols-outlined text-sky-400 text-[20px] mt-0.5">timer</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Respuesta Técnica Certificada</span>
                  <span className="text-[11px] text-slate-300">
                    Arquitectos Senior evalúan tu requerimiento en{' '}
                    <span className="text-sky-300 font-semibold">&lt; 2 horas hábiles</span>.
                  </span>
                </div>
              </div>
            </div>

            {/* Architecture Overview Card */}
            <div className="p-6 rounded-3xl vision-glass flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 text-sky-300 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">cloud_queue</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white leading-tight">Infraestructura Nube</h4>
                  <span className="text-xs text-slate-400">Google Cloud, AWS &amp; Azure</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Despliegues con orquestación elástica de microservicios, bases de datos vectoriales y balanceadores Anycast globales.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Canales Inmediatos (Sin WhatsApp Ejecutivo como se solicitó) */}
        <section className="relative z-10 flex flex-col gap-6 pt-4 text-left">
          <div className="flex flex-col gap-1 text-center max-w-xl mx-auto">
            <span className="text-xs font-semibold text-sky-400 tracking-widest uppercase">
              Canales Inmediatos
            </span>
            <h2 className="text-2xl sm:text-4xl text-white font-bold tracking-tight">
              Atención Directa &amp; Guardia Activa
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Channel 1: Guardia NOC */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-3xl vision-glass flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 text-purple-300 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">notifications_active</span>
                </div>
                <h3 className="text-lg font-bold text-white">Guardia 24/7 Crítica</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Canal P1 exclusivamente habilitado para clientes activos bajo régimen de alta concurrencia o incidencias operativas.
                </p>
              </div>
              <div className="flex flex-col gap-1 pt-3 border-t border-white/10">
                <span className="text-[11px] text-slate-400">Centro de Operaciones NOC</span>
                <a
                  href="mailto:ops@dreamtech.systems"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-purple-300 hover:underline"
                >
                  <span>ops@dreamtech.systems</span>
                  <span className="material-symbols-outlined text-[16px]">mail</span>
                </a>
              </div>
            </motion.div>

            {/* Channel 2: Garantía Contractual */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-3xl vision-glass flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/30 text-sky-300 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">verified_user</span>
                </div>
                <h3 className="text-lg font-bold text-white">Garantía Contractual</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Propiedad intelectual 100% transferible del código fuente y derecho irrevocable de no facturación si no se cumple el sprint acordado.
                </p>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-xs font-semibold text-white">Contratos Digitales Validados</span>
              </div>
            </motion.div>
          </div>

          {/* Interactive FAQ Strip */}
          <div className="mt-4 p-5 sm:p-6 rounded-3xl vision-glass flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">help</span>
              </div>
              <div>
                <div className="text-sm font-bold text-white">¿Cómo funciona exactamente el cobro a mes vencido?</div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Solo facturamos una vez que los entregables pactados estén en producción y funcionando sin fallas operativas.
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('planes-precios-saas')}
              className="shrink-0 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Ver Comparativa de Precios
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
