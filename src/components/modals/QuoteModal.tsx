import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TermsCheckboxField } from '@/components/ui/TermsCheckboxField';
import { TermsPrivacyModal } from './TermsPrivacyModal';
import { sendContactInquiry } from '../../services/emailService';
import { maskEmail, maskPhone, checkRateLimit } from '../../lib/security';
import {
  Calculator,
  Send,
  Check,
  Copy,
  CheckCircle,
  Cloud,
  Shield,
  Lock,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: string;
  estimatedPrice?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialType = 'Solución de Software',
  estimatedPrice,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: initialType,
    notes: '',
  });

  // Security & Anti-Bot states
  const [honeypotToken, setHoneypotToken] = useState('');
  const [mountTimestamp, setMountTimestamp] = useState<number>(Date.now());
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsError, setTermsError] = useState<string | null>(null);
  const [securityNotice, setSecurityNotice] = useState<string | null>(null);

  // Submission & Animation states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitPhase, setSubmitPhase] = useState<'idle' | 'encrypting' | 'validating' | 'dispatching'>('idle');
  const [submitted, setSubmitted] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Keep projectType in sync with prop when modal opens
  useEffect(() => {
    if (isOpen) {
      setMountTimestamp(Date.now());
      setTermsError(null);
      setSecurityNotice(null);
      setFormData((prev) => ({
        ...prev,
        projectType: initialType,
      }));
    }
  }, [isOpen, initialType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTermsError(null);
    setSecurityNotice(null);

    // Validate terms acceptance
    if (!acceptedTerms) {
      setTermsError('Es obligatorio aceptar los Términos y Condiciones y la Política de Uso de Datos para enviar tu solicitud.');
      return;
    }

    setIsSubmitting(true);
    setSubmitPhase('encrypting');

    // Smooth security animation phases
    const phaseTimer1 = setTimeout(() => setSubmitPhase('validating'), 600);
    const phaseTimer2 = setTimeout(() => setSubmitPhase('dispatching'), 1300);

    const result = await sendContactInquiry({
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      requirement: formData.projectType,
      budgetTier: estimatedPrice || 'Por definir',
      details: formData.notes,
      source: 'modal-cotizador',
      honeypotToken,
    });

    clearTimeout(phaseTimer1);
    clearTimeout(phaseTimer2);

    if (result.success) {
      setIsSubmitting(false);
      setSubmitPhase('idle');
      setSubmitted(true);
    } else {
      setIsSubmitting(false);
      setSubmitPhase('idle');
      setSecurityNotice(result.message);
    }
  };

  const handleCopySummary = () => {
    const text = `DreamTech Software Designer - Cotización Registrada
Folio de Seguridad: DT-${mountTimestamp.toString().slice(-6)}
Cliente: ${formData.name}
Solución: ${formData.projectType}
Inversión Estimada: ${estimatedPrice || 'Por definir según alcance'}
Email: ${maskEmail(formData.email)}
Teléfono: ${maskPhone(formData.phone)}
Garantía: Esquema pospago con despliegue en Google Cloud, AWS y Azure
Cifrado: TLS 1.3 / SSL 256-bit`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleResetAndClose = () => {
    // Clear sensitive user data from memory upon closing
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: initialType,
      notes: '',
    });
    setAcceptedTerms(false);
    setSubmitted(false);
    setSubmitPhase('idle');
    setTermsError(null);
    setSecurityNotice(null);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleResetAndClose()}>
        <DialogContent className="sm:max-w-lg max-h-[92vh] overflow-y-auto border-white/15 bg-slate-950/95 text-slate-100 backdrop-blur-2xl shadow-2xl">
          {/* Animated Background Ambience */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="quote-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <DialogHeader className="space-y-2 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="glow" className="flex items-center gap-1.5 px-3 py-1">
                      <Calculator className="w-3.5 h-3.5 text-sky-400" />
                      <span>Presupuesto Inmediato</span>
                    </Badge>
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full">
                      <Shield className="w-3 h-3" />
                      <span>Canal SSL Cifrado</span>
                    </div>
                  </div>
                  <DialogTitle className="text-2xl font-bold tracking-tight text-white">
                    Cotiza tu Proyecto
                  </DialogTitle>
                  <DialogDescription className="text-slate-300 text-xs sm:text-sm">
                    Sin anticipos ni plazos forzosos. Arquitectura nativa de alto rendimiento en Google Cloud, AWS o Azure.
                  </DialogDescription>
                </DialogHeader>

                {estimatedPrice && (
                  <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-sky-500/15 to-purple-500/10 border border-sky-400/30 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-300">Presupuesto precalculado:</span>
                    <span className="text-lg font-bold text-sky-300 tracking-tight">{estimatedPrice}</span>
                  </div>
                )}

                {securityNotice && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2 animate-in fade-in">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <span>{securityNotice}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-left">
                  {/* Anti-Bot Honeypot (hidden from real users) */}
                  <input
                    type="text"
                    name="_fax_number_verification"
                    value={honeypotToken}
                    onChange={(e) => setHoneypotToken(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                    style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                  />

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Nombre Completo / Razón Social
                    </label>
                    <Input
                      required
                      placeholder="Ej. Roberto Morales · Tech Corp"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        Correo Electrónico
                      </label>
                      <Input
                        required
                        type="email"
                        placeholder="contacto@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">
                        Teléfono de Contacto
                      </label>
                      <Input
                        required
                        type="tel"
                        placeholder="+52 55 1234 5678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Tipo de Proyecto
                    </label>
                    <Input
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Notas adicionales o requerimientos clave
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Módulos específicos, flujos de automatización, integraciones..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      disabled={isSubmitting}
                      className="flex w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2 text-xs sm:text-sm text-foreground shadow-sm backdrop-blur-md transition-colors placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:border-sky-400/50 resize-none disabled:opacity-50"
                    />
                  </div>

                  {/* Terms & Conditions Checkbox with interactive modal link */}
                  <div className="pt-1">
                    <TermsCheckboxField
                      id="quote-terms-checkbox"
                      checked={acceptedTerms}
                      onChange={(checked) => {
                        setAcceptedTerms(checked);
                        if (checked) setTermsError(null);
                      }}
                      onOpenTerms={() => setShowTermsModal(true)}
                      error={termsError}
                    />
                  </div>

                  {/* Animated Submit Button with dynamic security phases */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="glow"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 relative overflow-hidden group"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2.5 py-0.5">
                          {submitPhase === 'encrypting' && (
                            <>
                              <Lock className="w-4 h-4 text-sky-400 animate-pulse" />
                              <span className="text-xs sm:text-sm font-semibold text-sky-200">
                                1/3 Cifrando datos de solicitud...
                              </span>
                            </>
                          )}
                          {submitPhase === 'validating' && (
                            <>
                              <Shield className="w-4 h-4 text-purple-400 animate-bounce" />
                              <span className="text-xs sm:text-sm font-semibold text-purple-200">
                                2/3 Validando integridad SSL...
                              </span>
                            </>
                          )}
                          {submitPhase === 'dispatching' && (
                            <>
                              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span className="text-xs sm:text-sm font-semibold text-white">
                                3/3 Transmitiendo de forma segura...
                              </span>
                            </>
                          )}
                        </div>
                      ) : (
                        <>
                          <span>Enviar Cotización de Forma Segura</span>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="quote-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: 'spring' }}
                className="text-center py-4 space-y-4"
              >
                {/* Animated Success Badge with glow */}
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
                    <span>Transmisión Cifrada Exitosa</span>
                  </div>
                  <DialogTitle className="text-2xl font-bold text-white">¡Cotización Registrada!</DialogTitle>
                </div>

                <DialogDescription className="text-slate-300 text-xs sm:text-sm max-w-sm mx-auto">
                  Hemos registrado la solicitud para <strong className="text-white">{formData.name}</strong>.
                  La información ha sido protegida y se envió la confirmación a tu correo.
                </DialogDescription>

                {/* Masked Sensitive Data Card (protects privacy on screen share or public PC) */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-left space-y-2 font-mono text-slate-300 shadow-inner">
                  <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                    <div className="flex items-center gap-2 text-sky-400 font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      <span>{formData.projectType}</span>
                    </div>
                    <Badge variant="outline" className="text-[10px] text-emerald-400 border-emerald-500/30">
                      SSL Cifrado
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div>
                      <span className="text-slate-500">Inversión:</span>{' '}
                      <span className="text-sky-300 font-bold">{estimatedPrice || 'Por definir'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Email:</span>{' '}
                      <span className="text-slate-200">{maskEmail(formData.email)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Teléfono:</span>{' '}
                      <span className="text-slate-200">{maskPhone(formData.phone)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Privacidad:</span>{' '}
                      <span className="text-emerald-300">NDA Protegido</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pt-1.5 border-t border-white/5 text-[11px] text-slate-400">
                    <Cloud className="w-3.5 h-3.5 text-purple-400" />
                    <span>Garantía: Despliegue en Google Cloud, AWS &amp; Azure</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={handleCopySummary}
                    className="w-full flex items-center justify-center gap-2 text-xs"
                  >
                    {copiedSummary ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedSummary ? '¡Resumen Copiado al Portapapeles!' : 'Copiar Resumen Seguro'}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleResetAndClose}
                    className="w-full text-slate-400 hover:text-white text-xs"
                  >
                    Cerrar y Limpiar Memoria
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      {/* Terms & Privacy Modal */}
      <TermsPrivacyModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAccept={() => {
          setAcceptedTerms(true);
          setTermsError(null);
        }}
      />
    </>
  );
};
