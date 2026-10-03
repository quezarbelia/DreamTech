import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TabType } from '../../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
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
  const [guestName, setGuestName] = useState('Sofía & Gabriel');
  const [guestAttendees, setGuestAttendees] = useState(2);
  const [selectedColor, setSelectedColor] = useState('Medianoche (#030712)');

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

  const handleSimulateRsvp = (e: React.FormEvent) => {
    e.preventDefault();
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
              Ir a la Calculadora Dinámica
            </Button>
          </div>
        </motion.div>
      </section>

      {/* LIVE INTERACTIVE SIMULATOR FRAME */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1100px] mx-auto w-full pb-10">
        <Card className="rounded-3xl border-white/15 bg-slate-950/80 shadow-2xl overflow-hidden text-left relative backdrop-blur-2xl">
          {/* Top Window Bar */}
          <div className="p-4 bg-slate-900/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400/80" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
              <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                demo.dreamtech.systems/boda-valenzuela
              </span>
            </div>

            {/* Audio Toggle Simulation */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="text-xs gap-2 rounded-full border-white/15"
            >
              {isPlayingAudio ? (
                <Music className="w-4 h-4 text-sky-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
              <span>{isPlayingAudio ? 'Música: En reproducción' : 'Audio en Pausa'}</span>
              {isPlayingAudio && (
                <div className="flex items-end gap-1 h-3.5 ml-1">
                  <span className="w-0.5 bg-sky-400 rounded-full animate-soundwave-1" />
                  <span className="w-0.5 bg-purple-400 rounded-full animate-soundwave-2" />
                  <span className="w-0.5 bg-cyan-300 rounded-full animate-soundwave-3" />
                  <span className="w-0.5 bg-indigo-400 rounded-full animate-soundwave-4" />
                </div>
              )}
            </Button>
          </div>

          {/* Invitation Content Preview */}
          <div className="p-6 sm:p-12 space-y-12">
            {/* Hero Invite Header */}
            <div className="text-center space-y-3 py-6 relative">
              <Badge variant="glow" className="text-xs uppercase tracking-widest px-4 py-1">
                Nuestra Boda · 28 Noviembre 2026
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Camila &amp; Alejandro
              </h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto italic">
                “Hay momentos en la vida que son inolvidables, y compartirlos con quienes más queremos los hace eternos.”
              </p>

              {/* Countdown Simulation */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto pt-4">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 text-center shadow-inner">
                  <span className="text-2xl sm:text-3xl font-extrabold text-sky-400">58</span>
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">Días</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 text-center shadow-inner">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">14</span>
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">Horas</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 text-center shadow-inner">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">32</span>
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">Minutos</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 text-center shadow-inner">
                  <span className="text-2xl sm:text-3xl font-extrabold text-purple-300">18</span>
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">Segundos</span>
                </div>
              </div>
            </div>

            {/* Interactive Timeline */}
            <Card className="p-6 sm:p-8 shadow-inner border-white/10 bg-slate-900/50">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-sky-400" />
                <h3 className="text-lg font-bold text-white tracking-tight">Itinerario del Evento</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                  <div className="text-xs font-semibold text-sky-400">17:00 hrs</div>
                  <div className="font-bold text-sm text-white">Ceremonia Religiosa</div>
                  <div className="text-[11px] text-slate-400">Parroquia de San José</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                  <div className="text-xs font-semibold text-purple-300">18:30 hrs</div>
                  <div className="font-bold text-sm text-white">Coctel de Bienvenida</div>
                  <div className="text-[11px] text-slate-400">Jardín Principal</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                  <div className="text-xs font-semibold text-sky-400">20:00 hrs</div>
                  <div className="font-bold text-sm text-white">Banquete &amp; Brindis</div>
                  <div className="text-[11px] text-slate-400">Salón de Cristal</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                  <div className="text-xs font-semibold text-purple-300">22:00 hrs</div>
                  <div className="font-bold text-sm text-white">Fiesta &amp; DJ Set</div>
                  <div className="text-[11px] text-slate-400">Pista Interactiva</div>
                </div>
              </div>
            </Card>

            {/* Ubicación & Mesa de Regalos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location Card */}
              <Card className="p-6 space-y-4 border-white/10 bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-sky-400" />
                  <h3 className="text-lg font-bold text-white">Ubicación del Recinto</h3>
                </div>
                <div className="text-xs text-slate-300">
                  <strong className="text-white block text-sm">Hacienda Los Encinos</strong>
                  Carretera Federal Km 42, San Ángel, CDMX.
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 text-xs gap-1.5"
                  >
                    <a href="https://maps.google.com" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                      <span>Google Maps</span>
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 text-xs gap-1.5"
                  >
                    <a href="https://waze.com" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-3.5 h-3.5 text-purple-300" />
                      <span>Abrir en Waze</span>
                    </a>
                  </Button>
                </div>
              </Card>

              {/* Gift Registry Card */}
              <Card className="p-6 space-y-4 border-white/10 bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-purple-300" />
                  <h3 className="text-lg font-bold text-white">Mesa de Regalos</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tu presencia es nuestro mejor regalo. Si deseas tener un detalle adicional con nosotros:
                </p>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">BBVA · CLABE Interbancaria</span>
                    <span className="text-xs font-mono font-bold text-sky-300">012180015678901234</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyClabe}
                    className="text-xs gap-1"
                  >
                    {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBank ? '¡Copiado!' : 'Copiar'}</span>
                  </Button>
                </div>
              </Card>
            </div>

            {/* Dress Code Swatches */}
            <Card className="p-6 border-white/10 bg-slate-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Palette className="w-5 h-5 text-sky-400" />
                  <h4 className="text-base font-bold text-white">Dress Code: Rigurosa Etiqueta / Formal</h4>
                </div>
                <p className="text-xs text-slate-300">
                  Sugerimos tonalidades nocturnas, azul marino, gris marengo y vestidos largos. Selección: {selectedColor}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                {colorPalettes.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-9 h-9 rounded-xl border ${c.border} shadow-md hover:scale-110 transition-transform cursor-pointer focus:outline-none`}
                    title={c.name}
                  />
                ))}
              </div>
            </Card>

            {/* Formulario RSVP Digital con Generador de Pase QR */}
            <Card className="p-6 sm:p-8 border-sky-400/40 bg-slate-900/80 shadow-2xl">
              <div className="text-center max-w-md mx-auto mb-6 space-y-2">
                <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 mx-auto">
                  <QrCode className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Confirmar Asistencia Digital (RSVP)</h3>
                <p className="text-xs text-slate-300">
                  Ingresa tus datos para registrarte de forma 100% digital y obtener tu Pase de Acceso Táctil con código QR de inmediato.
                </p>
              </div>

              <form onSubmit={handleSimulateRsvp} className="max-w-md mx-auto space-y-4">
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-semibold text-slate-300">
                    Nombre del Invitado o Familia
                  </label>
                  <Input
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-semibold text-slate-300">
                    Número de Personas
                  </label>
                  <select
                    value={guestAttendees}
                    onChange={(e) => setGuestAttendees(Number(e.target.value))}
                    className="flex h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2 text-sm text-foreground shadow-sm backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
                  >
                    <option value={1} className="bg-slate-950 text-white">1 Pase Confirmado</option>
                    <option value={2} className="bg-slate-950 text-white">2 Pases Confirmados</option>
                    <option value={3} className="bg-slate-950 text-white">3 Pases Confirmados</option>
                    <option value={4} className="bg-slate-950 text-white">4 Pases Confirmados</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  variant="glow"
                  size="lg"
                  className="w-full gap-2 font-bold text-sm"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Confirmar &amp; Generar Ticket Pass QR</span>
                </Button>
              </form>
            </Card>
          </div>
        </Card>
      </section>
    </div>
  );
};
