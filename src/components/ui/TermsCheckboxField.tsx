import React from 'react';
import { ShieldCheck, ExternalLink, AlertCircle, Check } from 'lucide-react';

interface TermsCheckboxFieldProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onOpenTerms: () => void;
  error?: string | null;
}

export const TermsCheckboxField: React.FC<TermsCheckboxFieldProps> = ({
  id = 'terms-checkbox',
  checked,
  onChange,
  onOpenTerms,
  error,
}) => {
  return (
    <div className="space-y-2">
      <div
        onClick={() => onChange(!checked)}
        className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
          error
            ? 'border-rose-500/50 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
            : checked
            ? 'border-sky-500/40 bg-sky-950/30'
            : 'border-white/10 bg-slate-900/40 hover:border-white/20 hover:bg-slate-900/60'
        }`}
      >
        {/* Checkbox box with clear visual checkmark */}
        <div className="flex items-center h-5 mt-0.5">
          <div
            className={`w-4 h-4 rounded flex items-center justify-center transition-colors border ${
              checked
                ? 'bg-sky-500 border-sky-400 text-white shadow-[0_0_8px_rgba(56,189,248,0.4)]'
                : 'bg-slate-950/80 border-white/30'
            }`}
          >
            {checked && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              e.stopPropagation();
              onChange(e.target.checked);
            }}
            className="sr-only"
          />
        </div>

        <div className="text-xs text-slate-300 leading-relaxed flex-1">
          <span>He leído y acepto los </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenTerms();
            }}
            className="text-sky-400 hover:text-sky-300 font-semibold underline underline-offset-2 inline-flex items-center gap-1 transition-colors cursor-pointer group"
          >
            <span>Términos y Condiciones y Uso Seguro de Datos</span>
            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <span>. Mis datos están protegidos bajo protocolo de confidencialidad NDA y cifrado SSL.</span>
        </div>

        <ShieldCheck
          className={`w-4 h-4 shrink-0 transition-colors mt-0.5 ${
            checked ? 'text-sky-400' : 'text-slate-500'
          }`}
        />
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-rose-400 px-1 animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
