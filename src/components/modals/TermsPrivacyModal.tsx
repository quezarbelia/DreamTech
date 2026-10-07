import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, FileText, CheckCircle2, EyeOff, Server, Check } from 'lucide-react';

interface TermsPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
}

export const TermsPrivacyModal: React.FC<TermsPrivacyModalProps> = ({
  isOpen,
  onClose,
  onAccept,
}) => {
  const handleAcceptAndClose = () => {
    if (onAccept) {
      onAccept();
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[88vh] flex flex-col p-0 overflow-hidden border-white/15 bg-slate-950/95 text-slate-100 backdrop-blur-2xl shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-sky-950/40 via-slate-900/60 to-purple-950/30">
          <DialogHeader className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <Badge variant="glow" className="flex items-center gap-1.5 px-3 py-1">
                <Shield className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-xs font-semibold">Seguridad y Confidencialidad</span>
              </Badge>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-300 text-[11px] gap-1">
                <Lock className="w-3 h-3" />
                <span>Cifrado TLS 1.3</span>
              </Badge>
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Términos, Condiciones y Política de Uso de Datos
            </DialogTitle>
            <DialogDescription className="text-slate-300 text-xs sm:text-sm">
              Cumplimiento de estándares de privacidad, secreto profesional y protección de propiedad intelectual de DreamTech.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-[58vh]">
          {/* Section 1 */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-sky-300 font-semibold text-sm">
              <FileText className="w-4 h-4 text-sky-400" />
              <span>1. Finalidad Exclusiva del Tratamiento de Datos</span>
            </div>
            <p>
              La información suministrada mediante este formulario (nombre, correo electrónico, teléfono y descripción técnica de tu requerimiento) será utilizada <strong>únicamente y de forma exclusiva</strong> para:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Elaborar el análisis de viabilidad técnica y estimación presupuestaria.</li>
              <li>Establecer contacto directo por parte de un arquitecto de soluciones de DreamTech.</li>
              <li>Coordinar demostraciones de software o entregas de prototipos.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
              <EyeOff className="w-4 h-4 text-emerald-400" />
              <span>2. No Comercialización ni Cesión a Terceros</span>
            </div>
            <p>
              DreamTech <strong>nunca vende, arrienda, comparte ni transfiere</strong> tus datos personales ni comerciales a empresas de publicidad, corredores de datos ni terceros ajenos al proyecto. Tus datos se mantienen en un entorno hermético y privado.
            </p>
          </div>

          {/* Section 3 */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-purple-300 font-semibold text-sm">
              <Lock className="w-4 h-4 text-purple-400" />
              <span>3. Acuerdo de Confidencialidad (NDA Mutuo Automático)</span>
            </div>
            <p>
              Cualquier idea de producto, arquitectura de software, flujo empresarial, base de datos o lógica de negocio compartida en esta solicitud queda protegida bajo nuestro protocolo de <strong>estricta reserva industrial</strong>. DreamTech se compromete a no divulgar ni apropiarse de los requerimientos de sus clientes.
            </p>
          </div>

          {/* Section 4 */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
              <Server className="w-4 h-4 text-amber-400" />
              <span>4. Seguridad Técnica &amp; Cero Almacenamiento Residual</span>
            </div>
            <p>
              Esta plataforma web estática no almacena contraseñas, tokens de pago ni credenciales en el navegador ni en bases de datos vulnerables. Toda transmisión viaja encriptada vía protocolo HTTPS con cifrado de 256 bits y protección activa contra spam y denegación de servicio.
            </p>
          </div>

          {/* Section 5 */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-sky-300 font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>5. Derechos ARCO y Supresión de Datos</span>
            </div>
            <p>
              Tienes derecho a solicitar el acceso, rectificación, limitación o borrado total de tus registros en cualquier momento respondiendo a nuestras comunicaciones o contactando a nuestro centro de seguridad técnica.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 text-center sm:text-left">
            Al aceptar confirmas que eres mayor de edad y titular o representante autorizado de los datos provistos.
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="w-1/2 sm:w-auto text-xs"
            >
              Cerrar
            </Button>
            <Button
              type="button"
              variant="glow"
              size="sm"
              onClick={handleAcceptAndClose}
              className="w-1/2 sm:w-auto text-xs font-semibold gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Aceptar y Continuar</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
