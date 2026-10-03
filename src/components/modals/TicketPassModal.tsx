import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Download, CheckCircle, Users, Armchair, ShieldCheck } from 'lucide-react';

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

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md border-white/15 bg-slate-950/95 text-slate-100 backdrop-blur-2xl">
        <DialogHeader className="text-center sm:text-center space-y-2">
          <div className="flex justify-center">
            <Badge variant="glow" className="flex items-center gap-1.5 px-3 py-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Pase de Acceso Táctil · DreamTech</span>
            </Badge>
          </div>
          <DialogTitle className="text-xl font-bold text-white">
            Boda &amp; Recepción Gala
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400">
            Jardín Los Encinos · 18:00 hrs
          </DialogDescription>
        </DialogHeader>

        {/* Card Pass */}
        <Card className="p-5 border-white/15 bg-slate-900/80 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />

          <div className="flex items-center justify-between pb-3 text-xs text-slate-400">
            <span className="font-semibold tracking-wider text-[11px] uppercase">Invitado Oficial</span>
            <Badge variant="emerald" className="text-[10px]">
              CONFIRMADO
            </Badge>
          </div>

          <Separator className="bg-white/10 mb-3" />

          <div className="py-2 text-left">
            <div className="text-lg font-bold text-white tracking-tight">{guestName}</div>
            <div className="flex items-center gap-4 mt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 text-sky-300">
                <Users className="w-4 h-4 text-sky-400" />
                <span>{passesCount} Pases Reservados</span>
              </div>
              <div className="flex items-center gap-1.5 text-purple-300">
                <Armchair className="w-4 h-4 text-purple-400" />
                <span>{tableNumber}</span>
              </div>
            </div>
          </div>

          {/* SVG QR Code */}
          <div className="my-3 p-4 rounded-xl bg-white flex flex-col items-center justify-center shadow-lg">
            <svg
              className="w-36 h-36 text-slate-950"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <rect x="10" y="10" width="24" height="24" rx="4" fill="#020617" />
              <rect x="14" y="14" width="16" height="16" fill="white" />
              <rect x="18" y="18" width="8" height="8" fill="#020617" />

              <rect x="66" y="10" width="24" height="24" rx="4" fill="#020617" />
              <rect x="70" y="14" width="16" height="16" fill="white" />
              <rect x="74" y="18" width="8" height="8" fill="#020617" />

              <rect x="10" y="66" width="24" height="24" rx="4" fill="#020617" />
              <rect x="14" y="70" width="16" height="16" fill="white" />
              <rect x="18" y="74" width="8" height="8" fill="#020617" />

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

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              Lectura biométrica & NFC
            </span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Pase Válido Digital
            </span>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="mt-3 flex gap-2">
          <Button
            variant="glow"
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2"
          >
            {downloaded ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-300" />
                <span>¡Pase Descargado!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Guardar en Dispositivo</span>
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="px-5 text-slate-300 hover:text-white"
          >
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
