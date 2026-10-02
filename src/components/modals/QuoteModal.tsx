import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { sendContactInquiry } from '../../services/emailService';

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

  if (!isOpen) return null;

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
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-lg rounded-3xl vision-glass-elevated p-6 sm:p-8 shadow-2xl text-slate-200"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          {!submitted ? (
            <div>
              <div className="flex items-center gap-2 mb-2 text-sky-400">
                <span className="material-symbols-outlined text-[20px]">calculate</span>
                <span className="text-[12px] font-bold uppercase tracking-wider">
                  Presupuesto Inmediato
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                Cotiza tu Proyecto
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-5">
                Sin anticipos ni plazos forzosos. Diseñamos tu arquitectura en Google Cloud, AWS o Azure.
              </p>

              {estimatedPrice && (
                <div className="mb-4 p-3.5 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-between">
                  <span className="text-xs text-slate-300">Presupuesto precalculado:</span>
                  <span className="text-lg font-bold text-sky-300">{estimatedPrice}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Nombre Completo / Empresa
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Ej. Roberto Morales"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950/70 border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="contacto@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950/70 border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Teléfono de Contacto
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+52 55 1234 5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950/70 border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Tipo de Proyecto
                  </label>
                  <input
                    type="text"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-slate-950/70 border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Notas adicionales o requerimientos clave
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Módulos específicos, integraciones requeridas..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-slate-950/70 border border-white/10 rounded-2xl px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full btn-glass-primary text-white font-bold text-sm transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>Enviando al Correo...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar Cotización al Correo</span>
                        <span className="material-symbols-outlined text-[18px]">send</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[28px]">check</span>
              </div>
              <h3 className="text-xl font-bold text-white">¡Cotización Registrada!</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Hemos generado tu desglose para <strong>{formData.name}</strong> ({formData.projectType}).
                Un arquitecto de soluciones de DreamTech revisará tus especificaciones.
              </p>

              <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10 text-xs text-left space-y-1 font-mono text-slate-300">
                <div>Proyecto: {formData.projectType}</div>
                <div>Inversión: {estimatedPrice || 'A cotizar'}</div>
                <div>Garantía: Despliegue en GCP, AWS &amp; Azure</div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={handleCopySummary}
                  className="w-full py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                  <span>{copiedSummary ? '¡Copiado al Portapapeles!' : 'Copiar Resumen'}</span>
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-full text-slate-400 hover:text-white text-xs font-medium transition-all cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
