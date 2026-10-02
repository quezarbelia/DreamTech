import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TicketPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestName?: string;
  passesCount?: number;
  tableNumber?: string;
}

export const TicketPassModal: React.FC<TicketPassModalProps> = ({
  isOpen,
  onClose,
  guestName = 'Familia Valenzuela',
  passesCount = 2,
  tableNumber = 'Mesa 08',
}) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-sm sm:max-w-md rounded-3xl vision-glass-elevated p-6 sm:p-7 shadow-2xl text-slate-200"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          {/* Header */}
          <div className="text-center mb-4">
            <span className="text-[11px] font-semibold text-sky-300 uppercase tracking-widest px-3 py-1 rounded-full vision-glass-pill">
              Pase de Acceso Táctil · DreamTech
            </span>
            <h3 className="text-xl font-bold text-white mt-2">Boda &amp; Recepción Gala</h3>
            <p className="text-xs text-slate-400">Jardín Los Encinos · 18:00 hrs</p>
          </div>

          {/* Glass Card Container */}
          <div className="rounded-2xl vision-glass p-5 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent"></div>

            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-slate-400">
              <span className="font-semibold tracking-wider">INVITADO OFICIAL</span>
              <span className="text-sky-300 font-bold">CONFIRMADO</span>
            </div>

            <div className="py-3 text-left">
              <div className="text-lg font-bold text-white">{guestName}</div>
              <div className="flex items-center gap-4 mt-2 text-xs text-slate-300">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sky-400 text-[16px]">group</span>
                  <span>{passesCount} Pases Reservados</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-purple-300 text-[16px]">chair</span>
                  <span>{tableNumber}</span>
                </div>
              </div>
            </div>

            {/* SVG QR Code Simulation */}
            <div className="my-3 p-4 rounded-2xl bg-white flex flex-col items-center justify-center shadow-lg">
              <svg
                className="w-40 h-40 text-slate-950"
                viewBox="0 0 100 100"
                fill="currentColor"
              >
                {/* Corner 1 */}
                <rect x="10" y="10" width="24" height="24" rx="4" fill="#020617" />
                <rect x="14" y="14" width="16" height="16" fill="white" />
                <rect x="18" y="18" width="8" height="8" fill="#020617" />
                {/* Corner 2 */}
                <rect x="66" y="10" width="24" height="24" rx="4" fill="#020617" />
                <rect x="70" y="14" width="16" height="16" fill="white" />
                <rect x="74" y="18" width="8" height="8" fill="#020617" />
                {/* Corner 3 */}
                <rect x="10" y="66" width="24" height="24" rx="4" fill="#020617" />
                <rect x="14" y="70" width="16" height="16" fill="white" />
                <rect x="18" y="74" width="8" height="8" fill="#020617" />
                {/* Data matrix dots */}
                <rect x="42" y="12" width="6" height="6" />
                <rect x="52" y="12" width="6" height="6" />
                <rect x="42" y="22" width="6" height="6" />
                <rect x="48" y="28" width="6" height="6" />
                <rect x="12" y="42" width="6" height="6" />
                <rect x="24" y="42" width="6" height="6" />
                <rect x="34" y="42" width="6" height="6" />
                <rect x="44" y="42" width="12" height="6" />
                <rect x="64" y="42" width="6" height="6" />
                <rect x="76" y="42" width="12" height="6" />
                <rect x="42" y="54" width="6" height="6" />
                <rect x="54" y="54" width="6" height="12" />
                <rect x="70" y="54" width="6" height="6" />
                <rect x="82" y="54" width="6" height="6" />
                <rect x="42" y="68" width="6" height="6" />
                <rect x="52" y="76" width="6" height="6" />
                <rect x="66" y="68" width="12" height="6" />
                <rect x="66" y="80" width="6" height="6" />
                <rect x="80" y="80" width="8" height="8" />
              </svg>
              <span className="text-[10px] text-slate-800 font-mono mt-1 font-semibold">
                UUID: DT-2026-INV-89B4C
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Lectura biométrica &amp; NFC</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Pase Válido Digital
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 flex gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 py-3 rounded-full btn-glass-primary text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 shadow-lg cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">
                {downloaded ? 'check_circle' : 'download'}
              </span>
              <span>{downloaded ? '¡Pase Descargado!' : 'Guardar en Dispositivo'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 text-xs sm:text-sm font-medium transition-all cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
