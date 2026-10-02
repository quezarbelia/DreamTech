import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TabType } from '../../types';

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
    <div className="w-full flex flex-col">
      {/* Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-8 sm:pt-10 pb-8 max-w-[1400px] mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full vision-glass-pill shadow-lg mb-4">
            <span className="material-symbols-outlined text-sky-400 text-[16px]">celebration</span>
            <span className="text-xs font-semibold text-sky-300 tracking-widest uppercase">
              Experiencias Táctiles para Bodas, XV &amp; Galas
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-white font-extrabold tracking-tight mb-4">
            Invitaciones Digitales <span className="bg-gradient-to-r from-sky-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent">Interactivas</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Diseñadas con estética visionOS, música envolvente, control de confirmación digital en tiempo real y pases
            de acceso con código QR individualizado.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={() => onOpenQuoteModal('Invitación Digital Plus', '$1,400 MXN')}
              className="px-6 py-3 rounded-full btn-glass-primary text-white font-bold text-xs sm:text-sm active:scale-95 transition-all cursor-pointer shadow-lg"
            >
              Personalizar mi Invitación
            </button>
            <button
              onClick={() => onNavigateTab('inicio-calculadoras')}
              className="px-6 py-3 rounded-full vision-glass text-slate-200 hover:text-white font-semibold text-xs sm:text-sm hover:bg-white/10 transition-all cursor-pointer"
            >
              Ir a la Calculadora Dinámica
            </button>
          </div>
        </motion.div>
      </section>

      {/* LIVE INTERACTIVE SIMULATOR FRAME (Inspirado en la imagen de referencia visionOS) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1100px] mx-auto w-full mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl vision-glass-elevated overflow-hidden text-left relative"
        >
          {/* Top Window Bar */}
          <div className="p-4 bg-slate-950/70 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-400/80"></span>
              <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                demo.dreamtech.systems/boda-valenzuela
              </span>
            </div>

            {/* Audio Toggle Simulation */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs text-white flex items-center gap-2 transition-all cursor-pointer active:scale-95 shadow-sm"
            >
              <span className={`material-symbols-outlined text-[16px] ${isPlayingAudio ? 'text-sky-400' : 'text-slate-400'}`}>
                {isPlayingAudio ? 'music_note' : 'volume_off'}
              </span>
              <span>{isPlayingAudio ? 'Música: En reproducción' : 'Audio en Pausa'}</span>
              {isPlayingAudio && (
                <div className="flex items-end gap-1 h-3.5 ml-1">
                  <span className="w-0.5 bg-sky-400 rounded-full animate-soundwave-1"></span>
                  <span className="w-0.5 bg-purple-400 rounded-full animate-soundwave-2"></span>
                  <span className="w-0.5 bg-cyan-300 rounded-full animate-soundwave-3"></span>
                  <span className="w-0.5 bg-indigo-400 rounded-full animate-soundwave-4"></span>
                </div>
              )}
            </button>
          </div>

          {/* Invitation Content Preview */}
          <div className="p-6 sm:p-12 space-y-12">
            
            {/* Hero Invite Header */}
            <div className="text-center space-y-3 py-6 relative">
              <span className="text-xs font-semibold text-sky-300 uppercase tracking-widest px-4 py-1 rounded-full vision-glass-pill">
                Nuestra Boda · 28 Noviembre 2026
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Camila &amp; Alejandro
              </h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto italic">
                “Hay momentos en la vida que son inolvidables, y compartirlos con quienes más queremos los hace eternos.”
              </p>

              {/* Countdown Simulation */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto pt-4">
                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10 text-center shadow-inner">
                  <span className="text-2xl sm:text-3xl font-extrabold text-sky-400">58</span>
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">Días</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10 text-center shadow-inner">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">14</span>
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">Horas</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10 text-center shadow-inner">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">32</span>
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">Minutos</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10 text-center shadow-inner">
                  <span className="text-2xl sm:text-3xl font-extrabold text-purple-300">18</span>
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">Segundos</span>
                </div>
              </div>
            </div>

            {/* Interactive Timeline */}
            <div className="rounded-3xl vision-glass p-6 sm:p-8 shadow-inner">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-sky-400 text-[22px]">schedule</span>
                <h3 className="text-lg font-bold text-white">Itinerario del Evento</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
                  <div className="text-xs font-semibold text-sky-400">17:00 hrs</div>
                  <div className="font-bold text-sm text-white">Ceremonia Religiosa</div>
                  <div className="text-[11px] text-slate-400">Parroquia de San José</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
                  <div className="text-xs font-semibold text-purple-300">18:30 hrs</div>
                  <div className="font-bold text-sm text-white">Coctel de Bienvenida</div>
                  <div className="text-[11px] text-slate-400">Jardín Principal</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
                  <div className="text-xs font-semibold text-sky-400">20:00 hrs</div>
                  <div className="font-bold text-sm text-white">Banquete &amp; Brindis</div>
                  <div className="text-[11px] text-slate-400">Salón de Cristal</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
                  <div className="text-xs font-semibold text-purple-300">22:00 hrs</div>
                  <div className="font-bold text-sm text-white">Fiesta &amp; DJ Set</div>
                  <div className="text-[11px] text-slate-400">Pista Interactiva</div>
                </div>
              </div>
            </div>

            {/* Ubicación & Mesa de Regalos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location Card */}
              <div className="p-6 rounded-3xl vision-glass space-y-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sky-400 text-[22px]">location_on</span>
                  <h3 className="text-lg font-bold text-white">Ubicación del Recinto</h3>
                </div>
                <div className="text-xs text-slate-300">
                  <strong className="text-white block text-sm">Hacienda Los Encinos</strong>
                  Carretera Federal Km 42, San Ángel, CDMX.
                </div>
                <div className="flex gap-2 pt-2">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-xs text-white font-medium flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px] text-sky-400">map</span>
                    <span>Google Maps</span>
                  </a>
                  <a
                    href="https://waze.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-xs text-white font-medium flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px] text-purple-300">navigation</span>
                    <span>Abrir en Waze</span>
                  </a>
                </div>
              </div>

              {/* Gift Registry Card */}
              <div className="p-6 rounded-3xl vision-glass space-y-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-purple-300 text-[22px]">redeem</span>
                  <h3 className="text-lg font-bold text-white">Mesa de Regalos</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tu presencia es nuestro mejor regalo. Si deseas tener un detalle adicional con nosotros:
                </p>
                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">BBVA · CLABE Interbancaria</span>
                    <span className="text-xs font-mono font-bold text-sky-300">012180015678901234</span>
                  </div>
                  <button
                    onClick={handleCopyClabe}
                    className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium transition-all cursor-pointer"
                  >
                    {copiedBank ? '¡Copiado!' : 'Copiar CLABE'}
                  </button>
                </div>
              </div>
            </div>

            {/* Dress Code Swatches */}
            <div className="p-6 rounded-3xl vision-glass flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-sky-400 text-[20px]">palette</span>
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
                    className={`w-9 h-9 rounded-2xl border ${c.border} shadow-md hover:scale-110 transition-transform cursor-pointer focus:outline-none`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Formulario RSVP Digital con Generador de Pase QR (Sin WhatsApp) */}
            <div className="p-6 sm:p-8 rounded-3xl vision-glass-elevated border-sky-400/40 shadow-2xl">
              <div className="text-center max-w-md mx-auto mb-6">
                <span className="material-symbols-outlined text-sky-400 text-[32px] mb-1">
                  mark_email_read
                </span>
                <h3 className="text-2xl font-bold text-white">Confirmar Asistencia Digital (RSVP)</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Ingresa tus datos para registrarte de forma 100% digital y obtener tu Pase de Acceso Táctil con código QR de inmediato.
                </p>
              </div>

              <form onSubmit={handleSimulateRsvp} className="max-w-md mx-auto space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Nombre del Invitado o Familia</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-slate-950/70 border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Número de Personas</label>
                  <select
                    value={guestAttendees}
                    onChange={(e) => setGuestAttendees(Number(e.target.value))}
                    className="w-full bg-slate-950/70 border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-400 cursor-pointer"
                  >
                    <option value={1}>1 Pase Confirmado</option>
                    <option value={2}>2 Pases Confirmados</option>
                    <option value={3}>3 Pases Confirmados</option>
                    <option value={4}>4 Pases Confirmados</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full btn-glass-primary text-white font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-lg"
                >
                  <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
                  <span>Confirmar &amp; Generar Ticket Pass QR</span>
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
