import React, { useState } from 'react';
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
import { sendContactInquiry } from '../../services/emailService';
import { Calculator, Send, Check, Copy, CheckCircle, Cloud } from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await sendContactInquiry({
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      requirement: formData.projectType,
      budgetTier: estimatedPrice || 'Por definir',
      details: formData.notes,
      source: 'modal-cotizador',
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleCopySummary = () => {
    const text = `DreamTech Software Designer - Cotización
Cliente: ${formData.name}
Solución: ${formData.projectType}
Inversión Estimada: ${estimatedPrice || 'Por definir según alcance'}
Email: ${formData.email}
Tel: ${formData.phone}
Notas: ${formData.notes || 'Estándar'}
Garantía: Esquema pospago con despliegue en Google Cloud, AWS y Azure`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg border-white/15 bg-slate-950/95 text-slate-100 backdrop-blur-2xl">
        {!submitted ? (
          <div>
            <DialogHeader className="space-y-2 text-left">
              <div className="flex items-center gap-2">
                <Badge variant="glow" className="flex items-center gap-1.5 px-3 py-1">
                  <Calculator className="w-3.5 h-3.5 text-sky-400" />
                  <span>Presupuesto Inmediato</span>
                </Badge>
              </div>
              <DialogTitle className="text-2xl font-bold tracking-tight text-white">
                Cotiza tu Proyecto
              </DialogTitle>
              <DialogDescription className="text-slate-300 text-sm">
                Sin anticipos ni plazos forzosos. Arquitectura nativa de alto rendimiento en Google Cloud, AWS o Azure.
              </DialogDescription>
            </DialogHeader>

            {estimatedPrice && (
              <div className="mt-4 p-3.5 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-300">Presupuesto precalculado:</span>
                <span className="text-lg font-bold text-sky-300 tracking-tight">{estimatedPrice}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Nombre Completo / Empresa
                </label>
                <Input
                  required
                  placeholder="Ej. Roberto Morales · Tech Corp"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Correo Electrónico
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="contacto@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Teléfono de Contacto
                  </label>
                  <Input
                    required
                    type="tel"
                    placeholder="+52 55 1234 5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Tipo de Proyecto
                </label>
                <Input
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Notas adicionales o requerimientos clave
                </label>
                <textarea
                  rows={2}
                  placeholder="Módulos específicos, flujos de automatización, integraciones..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="flex w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2.5 text-sm text-foreground shadow-sm backdrop-blur-md transition-colors placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:border-sky-400/50 resize-none"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="glow"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Enviando al Correo...</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar Cotización al Correo</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.25)]">
              <Check className="w-7 h-7" />
            </div>
            <DialogTitle className="text-2xl font-bold text-white">¡Cotización Registrada!</DialogTitle>
            <DialogDescription className="text-slate-300 text-sm">
              Hemos registrado el desglose para <strong>{formData.name}</strong> ({formData.projectType}).
              Un arquitecto de soluciones de DreamTech revisará tus especificaciones para enviarte la propuesta formal.
            </DialogDescription>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-left space-y-1.5 font-mono text-slate-300">
              <div className="flex items-center gap-2 text-sky-400">
                <CheckCircle className="w-3.5 h-3.5" />
                <span className="font-semibold">Proyecto: {formData.projectType}</span>
              </div>
              <div>Inversión: {estimatedPrice || 'A cotizar según requerimientos'}</div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Cloud className="w-3.5 h-3.5" />
                <span>Garantía: Despliegue en GCP, AWS & Azure</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Button
                variant="outline"
                onClick={handleCopySummary}
                className="w-full flex items-center justify-center gap-2"
              >
                {copiedSummary ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSummary ? '¡Copiado al Portapapeles!' : 'Copiar Resumen'}</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full text-slate-400 hover:text-white"
              >
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
