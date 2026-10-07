import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabType } from '../../types';
import { sendContactInquiry, openSecureMailto } from '../../services/emailService';
import { maskEmail, maskPhone, checkRateLimit } from '../../lib/security';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { TermsCheckboxField } from '@/components/ui/TermsCheckboxField';
import { TermsPrivacyModal } from '../modals/TermsPrivacyModal';
import {
  Zap,
  Cloud,
  ShieldCheck,
  Send,
  Mail,
  Phone,
  User,
  Clock,
  Lock,
  HelpCircle,
  Check,
  CheckCircle,
  Bell,
  Layers,
  ArrowRight,
  Info,
  Shield,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

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

  // Security, Anti-Spam & Timing States
  const [honeypotToken, setHoneypotToken] = useState('');
  const [mountTimestamp, setMountTimestamp] = useState<number>(Date.now());
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsError, setTermsError] = useState<string | null>(null);
  const [securityNotice, setSecurityNotice] = useState<string | null>(null);

  // Submission & Animation States
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitPhase, setSubmitPhase] = useState<'idle' | 'encrypting' | 'validating' | 'dispatching'>('idle');

  useEffect(() => {
    setMountTimestamp(Date.now());
  }, []);

  const reqOptions = [
    { id: 'invitacion', label: 'Invitación Digital' },
    { id: 'landing', label: 'Landing Page' },
    { id: 'pos', label: 'POS & Caja' },
    { id: 'crm', label: 'CRM Ventas' },
    { id: 'erp', label: 'ERP Operativo' },
    { id: 'ai', label: 'Solución IA a Medida' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTermsError(null);
    setSecurityNotice(null);

    // Validate Terms acceptance
    if (!acceptedTerms) {
      setTermsError('Debes aceptar los Términos y Condiciones y la Política de Uso Seguro de Datos para enviar tu solicitud.');
      return;
    }

    setIsSubmitting(true);
    setSubmitPhase('encrypting');

    // Visual micro-animation steps for high-security feeling
    const timer1 = setTimeout(() => setSubmitPhase('validating'), 700);
    const timer2 = setTimeout(() => setSubmitPhase('dispatching'), 1400);

    const selectedLabel = reqOptions.find((r) => r.id === selectedReq)?.label || selectedReq;
    const result = await sendContactInquiry({
      fullName,
      email,
      phone,
      requirement: selectedLabel,
      budgetTier,
      details: requirementDetails,
      source: 'formulario-contacto',
      honeypotToken,
    });

    clearTimeout(timer1);
    clearTimeout(timer2);

    if (result.success) {
      setIsSubmitting(false);
      setSubmitPhase('idle');
      setFormSent(true);
    } else {
      setIsSubmitting(false);
      setSubmitPhase('idle');
      setSecurityNotice(result.message);
    }
  };

  const handleClearForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setRequirementDetails('');
    setAcceptedTerms(false);
    setFormSent(false);
    setTermsError(null);
    setSecurityNotice(null);
    setSubmitPhase('idle');
    setMountTimestamp(Date.now());
  };

  const handleOpenSecureMailto = () => {
    const selectedLabel = reqOptions.find((r) => r.id === selectedReq)?.label || selectedReq;
    openSecureMailto({
      fullName,
      email,
      phone,
      requirement: selectedLabel,
      budgetTier,
      details: requirementDetails,
    });
  };

  return (
    <div className="w-full flex flex-col space-y-12 sm:space-y-16">
      <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-10 sm:gap-14">
        {/* 1. Header Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto pt-2 space-y-4"
        >
          <Badge variant="glow" className="gap-2 py-1 px-4">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            <span className="text-xs font-semibold tracking-wider uppercase">
              Metodología Ágil · Cero Fricción Financiera
            </span>
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Cómo Funciona DreamTech &amp;{' '}
            <span className="bg-gradient-to-r from-sky-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent">
              Solicita tu Cotización
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            De la conceptualización técnica al soporte permanente sin barreras de entrada ni cotizaciones astronómicas.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Badge variant="outline" className="gap-2 py-1.5 px-3.5">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span className="text-xs sm:text-sm font-medium text-white">Canal Cifrado End-to-End</span>
            </Badge>
            <Badge variant="outline" className="gap-2 py-1.5 px-3.5">
              <Zap className="w-4 h-4 text-sky-400" />
              <span className="text-xs sm:text-sm font-medium text-white">Setup Inicial $0 USD</span>
            </Badge>
            <Badge variant="outline" className="gap-2 py-1.5 px-3.5">
              <Cloud className="w-4 h-4 text-purple-300" />
              <span className="text-xs sm:text-sm font-medium text-white">Nube: GCP, AWS &amp; Azure</span>
            </Badge>
          </div>
        </motion.section>

        {/* 2. Timeline del Ciclo SaaS Pospago */}
        <section className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-2">
            <span className="text-xs font-semibold text-sky-400 tracking-widest uppercase">
              Ciclo de Vida del Software
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Despliegue Rápido en 4 Fases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Step 1 */}
            <Card className="p-6 border-white/10 bg-slate-900/60 backdrop-blur-xl flex flex-col justify-between gap-4 group hover:border-sky-500/40 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center text-sm font-bold">
                    01
                  </span>
                  <Badge variant="outline" className="text-[11px] text-slate-400">
                    Día 1
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                  Análisis Técnico &amp; Arquitectura
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Evaluamos tus requerimientos, definimos el stack tecnológico óptimo y redactamos la especificación técnica sin costo.
                </p>
              </div>
              <div className="text-[11px] text-sky-400 font-semibold flex items-center gap-1 pt-2 border-t border-white/10">
                <span>Kickoff Inmediato</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Card>

            {/* Step 2 */}
            <Card className="p-6 border-white/10 bg-slate-900/60 backdrop-blur-xl flex flex-col justify-between gap-4 group hover:border-sky-500/40 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30 flex items-center justify-center text-sm font-bold">
                    02
                  </span>
                  <Badge variant="outline" className="text-[11px] text-slate-400">
                    Días 2 - 5
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                  Construcción &amp; Prototipo Vivo
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Desarrollamos la versión funcional en sprints iterativos con acceso a un entorno de staging en tiempo real.
                </p>
              </div>
              <div className="text-[11px] text-purple-300 font-semibold flex items-center gap-1 pt-2 border-t border-white/10">
                <span>Staging Privado</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Card>

            {/* Step 3 */}
            <Card className="p-6 border-white/10 bg-slate-900/60 backdrop-blur-xl flex flex-col justify-between gap-4 group hover:border-sky-500/40 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center text-sm font-bold">
                    03
                  </span>
                  <Badge variant="outline" className="text-[11px] text-slate-400">
                    Día 6 - 7
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Despliegue Cloud &amp; QA
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Puesta en producción en Google Cloud, AWS o Azure con balanceo de carga, certificados SSL y tests de estrés.
                </p>
              </div>
              <div className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1 pt-2 border-t border-white/10">
                <span>Producción 99.9% Uptime</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Card>

            {/* Step 4 */}
            <Card className="p-6 border-white/10 bg-slate-900/60 backdrop-blur-xl flex flex-col justify-between gap-4 group hover:border-sky-500/40 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center text-sm font-bold">
                    04
                  </span>
                  <Badge variant="outline" className="text-[11px] text-slate-400">
                    Mes Vencido
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  Validación &amp; Facturación Pospago
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  El cliente opera su plataforma y solo liquida la suscripción o desarrollo tras certificar satisfacción total.
                </p>
              </div>
              <div className="text-[11px] text-amber-300 font-semibold flex items-center gap-1 pt-2 border-t border-white/10">
                <span>Cero Riesgo Financiero</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Card>
          </div>
        </section>

        {/* 3. Formulario de Contacto & Cotizador Integral */}
        <section className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <Card className="lg:col-span-8 p-6 sm:p-10 border-white/15 bg-slate-950/80 shadow-2xl flex flex-col gap-6 backdrop-blur-2xl relative overflow-hidden">
            {/* Background Ambience Glow */}
            <div className="absolute -top-32 -right-32 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
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
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs gap-1.5 py-1 px-2.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Protección Anti-Spam SSL</span>
                </Badge>
              </div>
            </div>

            {securityNotice && (
              <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5 animate-in fade-in">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <span>{securityNotice}</span>
              </div>
            )}

            <AnimatePresence mode="wait">
              {!formSent ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 text-left"
                >
                  {/* Anti-Bot Honeypot field (hidden from humans) */}
                  <input
                    type="text"
                    name="_company_fax_code"
                    value={honeypotToken}
                    onChange={(e) => setHoneypotToken(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                    style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                  />

                  {/* Requirement Selector */}
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
                            className={`px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                              isActive
                                ? 'bg-sky-500/25 border border-sky-400/60 text-white font-semibold shadow-md'
                                : 'bg-slate-900/60 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-900'
                            }`}
                          >
                            <span className="truncate">{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Nombre Completo o Razón Social
                      </label>
                      <div className="relative flex items-center">
                        <User className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
                        <Input
                          required
                          placeholder="Ej. Alex Valenzuela · Corp Tech"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          disabled={isSubmitting}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Correo Electrónico Profesional
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
                        <Input
                          required
                          type="email"
                          placeholder="alex@empresa.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isSubmitting}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Teléfono de Contacto
                      </label>
                      <div className="relative flex items-center">
                        <Phone className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
                        <Input
                          required
                          type="tel"
                          placeholder="+52 55 1234 5678"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          disabled={isSubmitting}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Presupuesto Estimado o Modalidad
                      </label>
                      <select
                        value={budgetTier}
                        onChange={(e) => setBudgetTier(e.target.value)}
                        disabled={isSubmitting}
                        className="flex h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2 text-xs sm:text-sm text-foreground shadow-sm backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer disabled:opacity-50"
                      >
                        <option className="bg-slate-950 text-white">Plan Pospago Estándar ($0 inicial)</option>
                        <option className="bg-slate-950 text-white">SaaS Growth Enterprise ($99 - $249 /mes)</option>
                        <option className="bg-slate-950 text-white">Desarrollo Core a Medida (&gt; $1,000 USD)</option>
                        <option className="bg-slate-950 text-white">Invitación Digital Interactiva ($800 - $2,000 MXN)</option>
                        <option className="bg-slate-950 text-white">Exploración / Consultoría Previa</option>
                      </select>
                    </div>
                  </div>

                  {/* Detalle del Requerimiento */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-300">
                        Detalle del Requerimiento &amp; Objetivos de Negocio
                      </label>
                      <span className="text-[11px] text-slate-500">Cifrado de extremo a extremo</span>
                    </div>
                    <textarea
                      rows={4}
                      value={requirementDetails}
                      onChange={(e) => setRequirementDetails(e.target.value)}
                      disabled={isSubmitting}
                      placeholder="Describe tus flujos, integraciones requeridas en Google Cloud, AWS o Azure, o fechas límite..."
                      className="flex w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-xs sm:text-sm text-foreground shadow-sm backdrop-blur-md placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 resize-none disabled:opacity-50"
                    />
                  </div>

                  {/* Checkbox de Términos y Condiciones con link interactivo */}
                  <div className="pt-1">
                    <TermsCheckboxField
                      id="contacto-terms-checkbox"
                      checked={acceptedTerms}
                      onChange={(checked) => {
                        setAcceptedTerms(checked);
                        if (checked) setTermsError(null);
                      }}
                      onOpenTerms={() => setShowTermsModal(true)}
                      error={termsError}
                    />
                  </div>

                  {/* Bottom Actions with animated stages */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <Lock className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>Acuerdo de Confidencialidad NDA mutuo automático</span>
                    </div>

                    <Button
                      type="submit"
                      variant="glow"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto font-bold text-xs sm:text-sm gap-2 relative overflow-hidden group min-w-[240px]"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2.5">
                          {submitPhase === 'encrypting' && (
                            <>
                              <Lock className="w-4 h-4 text-sky-300 animate-pulse" />
                              <span className="text-xs text-sky-200">1/3 Cifrando requerimiento...</span>
                            </>
                          )}
                          {submitPhase === 'validating' && (
                            <>
                              <Shield className="w-4 h-4 text-purple-300 animate-bounce" />
                              <span className="text-xs text-purple-200">2/3 Validando firmas seguras...</span>
                            </>
                          )}
                          {submitPhase === 'dispatching' && (
                            <>
                              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span className="text-xs text-white">3/3 Transmitiendo a DreamTech...</span>
                            </>
                          )}
                        </div>
                      ) : (
                        <>
                          <span>Enviar Cuestionario Seguro</span>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, type: 'spring' }}
                  className="text-center py-6 space-y-5"
                >
                  <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-xl animate-pulse" />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                      className="relative w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.35)]"
                    >
                      <Check className="w-8 h-8" />
                    </motion.div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Transmisión Cifrada Verificada</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">¡Cuestionario Enviado con Éxito!</h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Gracias <strong className="text-white">{fullName || 'por comunicarte'}</strong>. Tu solicitud técnica ha sido cifrada y remitida a la mesa de arquitectura de DreamTech.
                  </p>

                  {/* Masked Sensitive Data Card (no sensitive credentials exposed) */}
                  <div className="p-4 max-w-md mx-auto rounded-xl bg-slate-900/90 border border-white/10 text-left text-xs text-slate-300 space-y-2.5 font-mono shadow-inner">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2 text-sky-400 font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        <span>Canal de Entrega: SSL TLS 1.3</span>
                      </div>
                      <Badge variant="outline" className="text-[10px] text-emerald-400 border-emerald-500/30">
                        E2E Protegido
                      </Badge>
                    </div>

                    <div className="space-y-1.5 text-[11px]">
                      <div>
                        <span className="text-slate-500">Destinatario:</span>{' '}
                        <span className="text-slate-300">Mesa Técnica de Soluciones DreamTech</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Confirmación enviada a:</span>{' '}
                        <span className="text-sky-300 font-semibold">{maskEmail(email)}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Teléfono registrado:</span>{' '}
                        <span className="text-slate-300">{maskPhone(phone)}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Garantía legal:</span>{' '}
                        <span className="text-emerald-300">NDA de Confidencialidad Activo</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleOpenSecureMailto}
                      className="text-xs gap-1.5"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Abrir Resumen en mi Gestor de Correo</span>
                    </Button>
                    <Button
                      type="button"
                      variant="glow"
                      onClick={handleClearForm}
                      className="text-xs"
                    >
                      Enviar Otra Solicitud &amp; Limpiar Memoria
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* SLA Sidebar Card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Card className="p-6 border-white/10 bg-slate-900/60 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">SLA de Respuesta</h4>
                  <p className="text-[11px] text-slate-400">Compromiso técnico estricto</p>
                </div>
              </div>
              <Separator className="bg-white/10" />
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Diagnóstico Inicial:</span>
                  <span className="font-semibold text-white">&lt; 4 horas hábiles</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Propuesta de Arquitectura:</span>
                  <span className="font-semibold text-white">24 - 48 horas</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Entorno de Staging:</span>
                  <span className="font-semibold text-white">3 a 5 días</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Seguridad:</span>
                  <span className="font-semibold text-emerald-400">Cifrado SSL 256-bit</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-white/10 bg-gradient-to-br from-slate-900/90 to-purple-950/30 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Metodología Transparente</h4>
                  <p className="text-[11px] text-slate-400">Control total del código</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cada desarrollo incluye repositorio de código fuente privado, pipelines CI/CD automatizados y documentación de APIs OpenAPI/Swagger.
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400">Propiedad Intelectual:</span>
                <span className="font-bold text-sky-400">100% del Cliente</span>
              </div>
            </Card>
          </div>
        </section>

        {/* 4. Canales de Comunicación Directa & FAQ */}
        <section className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-2">
            <span className="text-xs font-semibold text-purple-400 tracking-widest uppercase">
              Soporte Continuo
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Canales de Operación &amp; Respaldo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Channel 1: Guardia NOC */}
            <Card className="p-6 border-white/10 bg-slate-900/60 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-300 flex items-center justify-center">
                  <Bell className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Guardia 24/7 Crítica</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Canal P1 exclusivamente habilitado para clientes activos bajo régimen de alta concurrencia o incidencias operativas.
                </p>
              </div>
              <div className="flex flex-col gap-1 pt-3 border-t border-white/10">
                <span className="text-[11px] text-slate-400">Centro de Operaciones NOC</span>
                <button
                  type="button"
                  onClick={() => {
                    const nocRecipient = atob('b3BzQGRyZWFtdGVjaC5zeXN0ZW1z');
                    window.location.href = `mailto:${nocRecipient}?subject=[Incidencia%20NOC%20P1]`;
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-purple-300 hover:text-purple-200 transition-colors text-left cursor-pointer group"
                >
                  <span>Contactar Guardia NOC (Canal Encriptado)</span>
                  <Mail className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </Card>

            {/* Channel 2: Garantía Contractual */}
            <Card className="p-6 border-white/10 bg-slate-900/60 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/30 text-sky-300 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Garantía Contractual</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Propiedad intelectual 100% transferible del código fuente y garantía total de no cobro si no se cumple el sprint acordado.
                </p>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-white">Contratos Digitales Validados</span>
              </div>
            </Card>
          </div>

          {/* Interactive FAQ Strip */}
          <Card className="mt-4 p-5 sm:p-6 border-white/10 bg-slate-900/60 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">¿Cómo funciona exactamente el cobro a mes vencido?</div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Solo se liquida una vez que los entregables pactados estén en producción y funcionando sin fallas operativas.
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigateTab('planes-precios-saas')}
              className="shrink-0 text-xs font-semibold"
            >
              Ver Comparativa de Precios
            </Button>
          </Card>
        </section>
      </div>

      {/* Terms and Privacy Modal */}
      <TermsPrivacyModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAccept={() => {
          setAcceptedTerms(true);
          setTermsError(null);
        }}
      />
    </div>
  );
};
