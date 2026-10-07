import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabType } from '../../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { TermsCheckboxField } from '@/components/ui/TermsCheckboxField';
import { TermsPrivacyModal } from '../modals/TermsPrivacyModal';
import { sendContactInquiry } from '../../services/emailService';
import {
  PartyPopper,
  Music,
  VolumeX,
  Clock,
  MapPin,
  Gift,
  Palette,
  QrCode,
  ExternalLink,
  Copy,
  Check,
  CheckCircle,
  Calendar,
  Lock,
  Shield,
  Sparkles,
  Mail,
  Phone,
  User,
} from 'lucide-react';

interface InvitacionesDigitalesViewProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenQuoteModal: (planName?: string, price?: string) => void;
  onOpenDemoPassModal: (guestName?: string, passesCount?: number, tableNumber?: string) => void;
}

export const InvitacionesDigitalesView: React.FC<InvitacionesDigitalesViewProps> = ({
  onNavigateTab,
  onOpenQuoteModal,
  onOpenDemoPassModal,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  // RSVP Form States
  const [guestName, setGuestName] = useState('Sofía & Gabriel');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestAttendees, setGuestAttendees] = useState(2);
  const [selectedColor, setSelectedColor] = useState('Medianoche (#030712)');

  // Security, Terms & Submission States
  const [honeypotToken, setHoneypotToken] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsError, setTermsError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitPhase, setSubmitPhase] = useState<'idle' | 'validating' | 'encrypting' | 'dispatching'>('idle');
  const [rsvpSent, setRsvpSent] = useState(false);

  const colorPalettes = [
    { name: 'Medianoche', hex: '#030712', border: 'border-white/30' },
    { name: 'Azul Crepúsculo', hex: '#0f172a', border: 'border-sky-400/40' },
    { name: 'Zafiro Estelar', hex: '#0369a1', border: 'border-white/30' },
    { name: 'Amatista Suave', hex: '#a855f7', border: 'border-white/40' },
  ];

  const handleCopyClabe = () => {
    navigator.clipboard.writeText('012180015678901234');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTermsError(null);

    if (!acceptedTerms) {
      setTermsError('Debes aceptar los Términos y Condiciones y la Política de Uso Seguro de Datos para confirmar tu asistencia.');
      return;
    }

    setIsSubmitting(true);
    setSubmitPhase('validating');

    const timer1 = setTimeout(() => setSubmitPhase('encrypting'), 500);
    const timer2 = setTimeout(() => setSubmitPhase('dispatching'), 1100);

    // Send inquiry / RSVP to DreamTech email service securely
    await sendContactInquiry({
      fullName: guestName,
      email: guestEmail || 'rsvp@invitacion.dreamtech.systems',
      phone: guestPhone || 'No especificado',
      requirement: `Confirmación RSVP Invitación (${guestAttendees} Pases)`,
      budgetTier: 'Invitación Digital Interactiva',
      details: `Pases confirmados: ${guestAttendees} personas. Paleta seleccionada: ${selectedColor}. Mesa asignada: Mesa 04.`,
      source: 'invitacion-rsvp',
      honeypotToken,
    });

    clearTimeout(timer1);
    clearTimeout(timer2);

    setIsSubmitting(false);
    setSubmitPhase('idle');
    setRsvpSent(true);

    // Automatically trigger the Ticket Pass Modal with QR code for the user
    onOpenDemoPassModal(guestName, guestAttendees, 'Mesa 04');
  };

  return (
    <div className="w-full flex flex-col space-y-10 sm:space-y-14">
      {/* Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-8 sm:pt-10 max-w-[1400px] mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="glow" className="gap-2 py-1 px-4 mb-4">
            <PartyPopper className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-semibold tracking-wider uppercase">
              Experiencias Táctiles para Bodas, XV &amp; Galas
            </span>
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-white font-extrabold tracking-tight mb-4">
            Invitaciones Digitales{' '}
            <span className="bg-gradient-to-r from-sky-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent">
              Interactivas
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Diseñadas con estética visionOS, música envolvente, control de confirmación digital en tiempo real y pases
            de acceso con código QR individualizado.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <Button
              variant="glow"
              size="lg"
              onClick={() => onOpenQuoteModal('Invitación Digital Plus', '$1,400 MXN')}
              className="font-bold text-xs sm:text-sm"
            >
              Personalizar mi Invitación
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigateTab('inicio-calculadoras')}
              className="text-slate-200 hover:text-white font-semibold text-xs sm:text-sm"
            >
              Ver Otras Soluciones
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Main Interactive Demo Card */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto w-full">
        <Card className="border-white/15 bg-slate-950/80 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Light */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar Preview Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-white tracking-wider uppercase">
                Demo en Vivo · Modo Interactivo
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="gap-2 text-xs"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                    <span>Silenciar Música</span>
                  </>
                ) : (
                  <>
                    <Music className="w-3.5 h-3.5 text-sky-400 animate-bounce" />
                    <span>Reproducir Vals Demo</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Invitation Body Mockup */}
          <div className="my-8 sm:my-12 text-center max-w-xl mx-auto space-y-6 relative z-10">
            <div className="text-xs sm:text-sm tracking-[0.3em] uppercase text-sky-300 font-medium">
              Nuestra Boda de Ensueño
            </div>

            <h2 className="text-4xl sm:text-6xl font-serif tracking-wide text-white italic">
              Sofía &amp; Mateo
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Hay momentos en la vida que son inolvidables, y compartirlos con quienes más amamos los hace eternos.
            </p>

            {/* Countdown Clock */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto pt-4">
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
                <span className="block text-2xl sm:text-3xl font-bold text-white">42</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Días</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
                <span className="block text-2xl sm:text-3xl font-bold text-white">14</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Horas</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
                <span className="block text-2xl sm:text-3xl font-bold text-white">35</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Min</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
                <span className="block text-2xl sm:text-3xl font-bold text-sky-400">18</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Seg</span>
              </div>
            </div>
          </div>

          {/* Interactive Feature Panels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 my-8">
            {/* Panel 1: Itinerario */}
            <Card className="p-6 border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-4 text-left">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Itinerario y Ceremonia</h3>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  <span>Sábado 24 de Octubre, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>Ceremonia Religiosa: 16:30 hrs</span>
                </div>
                <div className="flex items-center gap-2">
                  <PartyPopper className="w-3.5 h-3.5 text-purple-400" />
                  <span>Recepción y Gala: 18:30 hrs</span>
                </div>
              </div>
            </Card>

            {/* Panel 2: Ubicación GPS */}
            <Card className="p-6 border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-4 text-left">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Ubicación &amp; Navegación</h3>
              <p className="text-xs text-slate-300">
                Jardín Los Encinos, Av. de las Rosas #104. Conexión directa a Google Maps y Waze.
              </p>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="w-full text-xs gap-1.5"
              >
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Abrir en Google Maps</span>
                </a>
              </Button>
            </Card>

            {/* Panel 3: Mesa de Regalos */}
            <Card className="p-6 border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-4 text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Gift className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Mesa de Regalos &amp; Sobres</h3>
              <p className="text-xs text-slate-300">
                Tu presencia es nuestro mejor regalo. Si deseas hacernos un presente, te compartimos nuestra cuenta CLABE:
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyClabe}
                className="w-full text-xs gap-1.5"
              >
                {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBank ? '¡CLABE Copiada!' : 'Copiar Cuenta CLABE'}</span>
              </Button>
            </Card>
          </div>

          {/* Interactive RSVP Form with QR Pass Generator and Security */}
          <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
            {/* Customizer Strip */}
            <Card className="p-4 sm:p-5 border-white/10 bg-slate-900/60 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-sky-400" />
                <span className="text-xs font-semibold text-white">
                  Temas cromáticos disponibles para tu evento:
                </span>
              </div>
              <div className="flex items-center gap-2">
                {colorPalettes.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(`${c.name} (${c.hex})`)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition-all ${
                      selectedColor.includes(c.name)
                        ? 'border-sky-400 bg-sky-500/20 text-white'
                        : 'border-white/10 bg-slate-950/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </Card>

            {/* Formulario RSVP Digital con Generador de Pase QR & Seguridad */}
            <Card className="p-6 sm:p-8 border-sky-400/40 bg-slate-900/80 shadow-2xl relative overflow-hidden">
              <div className="text-center max-w-md mx-auto mb-6 space-y-2">
                <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 mx-auto">
                  <QrCode className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Confirmar Asistencia Digital (RSVP)</h3>
                <p className="text-xs text-slate-300">
                  Ingresa tus datos para registrarte de forma 100% digital y obtener tu Pase de Acceso Táctil con código QR de inmediato.
                </p>
              </div>

              <form onSubmit={handleRsvpSubmit} className="max-w-md mx-auto space-y-4">
                {/* Honeypot field for bot suppression */}
                <input
                  type="text"
                  name="_guest_fax_check"
                  value={honeypotToken}
                  onChange={(e) => setHoneypotToken(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                  style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                />

                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-semibold text-slate-300">
                    Nombre del Invitado o Familia
                  </label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
                    <Input
                      required
                      placeholder="Ej. Sofía & Gabriel"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      disabled={isSubmitting}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      Correo Electrónico (opcional)
                    </label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
                      <Input
                        type="email"
                        placeholder="invitado@evento.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        disabled={isSubmitting}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      Teléfono / WhatsApp
                    </label>
                    <div className="relative flex items-center">
                      <Phone className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
                      <Input
                        type="tel"
                        placeholder="+52 55 1234 5678"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        disabled={isSubmitting}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-semibold text-slate-300">
                    Número de Personas Confirmadas
                  </label>
                  <select
                    value={guestAttendees}
                    onChange={(e) => setGuestAttendees(Number(e.target.value))}
                    disabled={isSubmitting}
                    className="flex h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2 text-sm text-foreground shadow-sm backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer disabled:opacity-50"
                  >
                    <option value={1} className="bg-slate-950 text-white">1 Pase Confirmado</option>
                    <option value={2} className="bg-slate-950 text-white">2 Pases Confirmados</option>
                    <option value={3} className="bg-slate-950 text-white">3 Pases Confirmados</option>
                    <option value={4} className="bg-slate-950 text-white">4 Pases Confirmados</option>
                    <option value={5} className="bg-slate-950 text-white">5 Pases Confirmados</option>
                  </select>
                </div>

                {/* Terms and conditions interactive checkbox */}
                <div className="pt-1">
                  <TermsCheckboxField
                    id="invitacion-terms-checkbox"
                    checked={acceptedTerms}
                    onChange={(checked) => {
                      setAcceptedTerms(checked);
                      if (checked) setTermsError(null);
                    }}
                    onOpenTerms={() => setShowTermsModal(true)}
                    error={termsError}
                  />
                </div>

                <Button
                  type="submit"
                  variant="glow"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full gap-2 font-bold text-sm relative overflow-hidden"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      {submitPhase === 'validating' && (
                        <>
                          <Lock className="w-4 h-4 text-sky-400 animate-pulse" />
                          <span>1/3 Validando registro...</span>
                        </>
                      )}
                      {submitPhase === 'encrypting' && (
                        <>
                          <Shield className="w-4 h-4 text-purple-400 animate-bounce" />
                          <span>2/3 Cifrando confirmación...</span>
                        </>
                      )}
                      {submitPhase === 'dispatching' && (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>3/3 Generando Pase de Acceso QR...</span>
                        </>
                      )}
                    </div>
                  ) : (
                    <>
                      <QrCode className="w-4 h-4" />
                      <span>Confirmar &amp; Generar Ticket Pass QR</span>
                    </>
                  )}
                </Button>

                {rsvpSent && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-center gap-2 animate-in fade-in">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>¡Asistencia confirmada y Pase QR generado con éxito!</span>
                  </div>
                )}
              </form>
            </Card>
          </div>
        </Card>
      </section>

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
