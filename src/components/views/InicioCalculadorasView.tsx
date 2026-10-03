import React, { useState } from 'react';
import { motion } from 'motion/react';
import { INVITATION_TIERS, INVITATION_ADDONS, SAAS_SYSTEM_TYPES, getAddonPriceForTier } from '../../data/mockData';
import { TabType } from '../../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import {
  Gift,
  PartyPopper,
  Calculator,
  Mail,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Zap,
  QrCode,
  Layers,
  Cpu,
  Server,
  Send,
  LockOpen,
  Plus,
  Minus,
  Check,
  ArrowRight,
  Database,
  Cloud,
  CheckCircle,
} from 'lucide-react';

interface InicioCalculadorasViewProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenQuoteModal: (planName?: string, price?: string) => void;
  onOpenDemoPassModal: () => void;
}

export const InicioCalculadorasView: React.FC<InicioCalculadorasViewProps> = ({
  onNavigateTab,
  onOpenQuoteModal,
  onOpenDemoPassModal,
}) => {
  // Invitation Calculator State
  const [selectedInvTier, setSelectedInvTier] = useState<'basica' | 'plus' | 'premier'>('plus');
  const [activeAddons, setActiveAddons] = useState<Record<string, boolean>>({
    itinerario: true,
    regalos: true,
    dresscode: true,
    gps: true,
    rsvp: true,
    galeria: true,
  });

  // SaaS Calculator State
  const [selectedSaasId, setSelectedSaasId] = useState<string>('serverless');
  const [hostingType, setHostingType] = useState<'edge' | 'cloud-dedicated'>('edge');
  const [saasModifications, setSaasModifications] = useState<number>(1);

  // Calculations
  const currentInvTier = INVITATION_TIERS.find((t) => t.id === selectedInvTier) || INVITATION_TIERS[1];
  const addonsTotal = INVITATION_ADDONS.reduce((acc, addon) => {
    const isPremierRsvp = addon.id === 'rsvp' && selectedInvTier === 'premier';
    const isChecked = isPremierRsvp || !!activeAddons[addon.id];
    const price = getAddonPriceForTier(addon.id, selectedInvTier);
    return acc + (isChecked ? price : 0);
  }, 0);
  const totalInvitationPrice = currentInvTier.price + addonsTotal;

  const currentSaas = SAAS_SYSTEM_TYPES.find((s) => s.id === selectedSaasId) || SAAS_SYSTEM_TYPES[1];
  const hostingCost = hostingType === 'cloud-dedicated' ? 800 : 0;
  const hostingLabel = hostingType === 'edge' ? 'Edge Multi-Cloud Hosting' : 'Cloud Dedicado (Google Cloud / AWS / Azure)';
  const modificationsCost = saasModifications * 500;
  const totalSaasMonthly = currentSaas.cost + hostingCost + modificationsCost;

  const handleToggleAddon = (id: string) => {
    setActiveAddons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full flex flex-col space-y-12 sm:space-y-16">
      {/* Studio Hero Section */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto"
        >
          {/* Brand Logo & Name (Clean floating logo without recuadro, ambient subtle radial glow, and DreamTech name below) */}
          <div className="shrink-0 flex flex-col items-center justify-center group text-center select-none">
            <div className="relative flex items-center justify-center">
              {/* Clean subtle ambient radial glow */}
              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-6 bg-gradient-to-tr from-sky-500/20 via-sky-400/10 to-transparent rounded-full blur-2xl pointer-events-none -z-10"
              />
              <motion.img
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                src="/logo.png"
                alt="DreamTech Logo"
                className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain filter drop-shadow-[0_12px_28px_rgba(56,189,248,0.35)] cursor-pointer"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mt-3 flex flex-col items-center"
            >
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-md">
                DreamTech
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-sky-400">
                Software Designer
              </span>
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col text-center md:text-left space-y-4 flex-1">
            {/* Headline Typography */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl text-white font-extrabold tracking-tight leading-tight">
              Tu sueño,{' '}
              <span className="text-slate-400">
                nosotros programamos
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              Desarrollamos aplicaciones web, plataformas empresariales e invitaciones interactivas premium. Entregamos soluciones probadas en producción antes de tu liquidación, con infraestructura cloud confiable y soporte continuo.
            </p>

            {/* Quick Navigation Docks */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <Button
                variant="glow"
                size="lg"
                asChild
              >
                <a href="#calculadora-invitaciones" className="gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Invitaciones Digitales</span>
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
              >
                <a href="#calculadora-saas" className="gap-2 text-slate-200 hover:text-white">
                  <Terminal className="w-4 h-4 text-sky-400" />
                  <span>Calculadora SaaS</span>
                </a>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Guarantee Banner (Full Width, without metrics card or 24-48h) */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-5xl mx-auto mt-10 sm:mt-12"
        >
          <Card className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden text-left border-white/10 bg-slate-900/60 hover:border-white/20 transition-all duration-300">
            <div className="space-y-2 z-10 flex-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Garantía de Aprobación Previa
                </span>
                <Badge variant="outline" className="text-xs text-sky-300 border-sky-500/25 bg-sky-500/10 ml-2">
                  Esquema Pospago
                </Badge>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Diseño, Entrega &amp; Aprobación
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Tanto en software corporativo como en invitaciones premium: validas la interfaz funcionando
                en entorno productivo antes de emitir tu liquidación. Transparencia digital integral.
              </p>
            </div>

            <div className="flex items-center gap-6 z-10 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl sm:text-4xl font-extrabold text-white">100%</span>
                <div className="flex flex-col text-xs text-slate-300 leading-tight">
                  <span className="font-semibold text-white">Inspección</span>
                  <span>Previa</span>
                </div>
              </div>
              <Separator orientation="vertical" className="h-8 bg-white/20" />
              <div className="flex items-center gap-2.5">
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400">0$</span>
                <div className="flex flex-col text-xs text-slate-300 leading-tight">
                  <span className="font-semibold text-white">Anticipo</span>
                  <span>Requerido</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* SECCIÓN ESTRELLA: INVITACIONES DIGITALES */}
      <section
        className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"
        id="calculadora-invitaciones"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 text-left">
          <div className="space-y-2">
            <Badge variant="glow" className="gap-1.5">
              <PartyPopper className="w-3.5 h-3.5 text-sky-400" />
              <span>Eventos &amp; Celebraciones Exclusivas</span>
            </Badge>
            <h2 className="text-2xl sm:text-4xl text-white font-bold tracking-tight">
              Crea tu Invitación Digital <span className="text-sky-400">desde $800 MXN</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Experiencias dinámicas para bodas, aniversarios y galas con pase de acceso táctil y registro digital en tiempo real.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl self-start md:self-auto">
            <Button
              size="sm"
              variant="glow"
              onClick={() => onNavigateTab('invitaciones-digitales')}
              className="rounded-xl text-xs font-bold"
            >
              Catálogo 2026
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onOpenDemoPassModal}
              className="rounded-xl text-slate-300 hover:text-white text-xs gap-1.5"
            >
              <QrCode className="w-3.5 h-3.5 text-sky-400" />
              <span>Demo de Boleto QR</span>
            </Button>
          </div>
        </div>

        {/* 3 Tier Cards with Shadcn Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-6 mb-10 items-stretch text-left pt-4">
          {INVITATION_TIERS.map((tier) => {
            const isSelected = selectedInvTier === tier.id;
            return (
              <motion.div
                key={tier.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col relative"
              >
                <Card
                  onClick={() => setSelectedInvTier(tier.id)}
                  className={`p-6 sm:p-8 flex flex-col justify-between flex-1 relative group cursor-pointer transition-all duration-300 ${
                    tier.isPopular
                      ? 'border-sky-400/60 bg-slate-900/85 shadow-[0_0_35px_rgba(56,189,248,0.25)]'
                      : 'border-white/10 bg-slate-900/50 hover:border-white/25'
                  }`}
                >
                  {/* RECOMENDADO Centered on top of the card border */}
                  {tier.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                      <Badge className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-[11px] tracking-wider uppercase py-1 px-4 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.6)] border border-sky-200">
                        RECOMENDADO
                      </Badge>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          tier.isPopular ? 'text-sky-300 font-bold' : 'text-slate-400'
                        }`}
                      >
                        {tier.badge}
                      </span>
                      <span className={`p-2 rounded-xl border transition-colors ${
                        tier.isPopular ? 'bg-sky-500/20 text-sky-300 border-sky-400/40 shadow-sm' : 'bg-sky-500/10 text-sky-400 border-sky-400/20'
                      }`}>
                        {tier.id === 'basica' ? <Mail className="w-5 h-5" /> : tier.id === 'plus' ? <Gift className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white tracking-tight">{tier.name}</h3>

                    <div className="flex flex-col my-3">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-white">
                          ${tier.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400">MXN / base</span>
                      </div>
                      <span className="text-xs font-semibold text-sky-400 mt-1">
                        Con todo: ${tier.id === 'basica' ? '1,500' : tier.id === 'plus' ? '2,000' : '2,500'} MXN
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                      {tier.description}
                    </p>

                    <Separator className="bg-white/10 mb-5" />

                    <ul className="space-y-3 text-xs sm:text-sm">
                      {tier.features.map((feat, i) => (
                        <li
                          key={i}
                          className={`flex items-center gap-2.5 ${
                            feat.included
                              ? feat.highlight
                                ? 'text-purple-200 font-semibold'
                                : 'text-slate-200'
                              : 'opacity-40 text-slate-500'
                          }`}
                        >
                          {feat.included ? (
                            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-slate-600 shrink-0" />
                          )}
                          <span>{feat.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedInvTier(tier.id);
                    }}
                    variant={isSelected ? 'glow' : 'outline'}
                    size="lg"
                    className="w-full mt-8 rounded-xl font-semibold text-xs sm:text-sm"
                  >
                    {isSelected ? `✓ Paquete ${tier.name} Seleccionado` : `Configurar ${tier.name}`}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CALCULADORA DINÁMICA DE INVITACIONES */}
        <Card className="p-6 sm:p-8 text-left border-white/15 bg-slate-900/70 shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center gap-3 pb-6 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 shadow-inner">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Calculadora Dinámica de Invitaciones
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Personaliza los módulos de interacción y obtén tu presupuesto exacto al instante.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            {/* Controls Column (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Step 1: Base Tier Selection */}
              <div>
                <label className="text-xs sm:text-sm font-semibold text-white block mb-3">
                  1. Selecciona el Paquete Base:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {INVITATION_TIERS.map((tier) => {
                    const isActive = selectedInvTier === tier.id;
                    return (
                      <motion.button
                        key={tier.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedInvTier(tier.id)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isActive
                            ? 'bg-sky-500/25 border-sky-400/60 text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                            : 'bg-slate-950/40 border-white/10 text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-sm">{tier.name}</div>
                          <div className="text-xs text-slate-400">{tier.badge}</div>
                        </div>
                        <span className="text-sm font-extrabold text-sky-300">${tier.price.toLocaleString()}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Add-on Checkboxes */}
              <div>
                <label className="text-xs sm:text-sm font-semibold text-white block mb-3">
                  2. Secciones y Aditamentos Táctiles a Incluir:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {INVITATION_ADDONS.map((addon) => {
                    const isPremierRsvp = addon.id === 'rsvp' && selectedInvTier === 'premier';
                    const isChecked = isPremierRsvp || !!activeAddons[addon.id];
                    const addonPrice = getAddonPriceForTier(addon.id, selectedInvTier);

                    return (
                      <label
                        key={addon.id}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all select-none ${
                          isPremierRsvp
                            ? 'bg-emerald-500/15 border-emerald-400/40 shadow-sm'
                            : isChecked
                            ? 'bg-sky-500/15 border-sky-400/40 shadow-sm'
                            : 'bg-slate-950/40 border-white/10 hover:bg-white/5'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          disabled={isPremierRsvp}
                          onChange={() => !isPremierRsvp && handleToggleAddon(addon.id)}
                          className="mt-1 w-4 h-4 rounded bg-slate-900 text-sky-400 accent-sky-400 cursor-pointer disabled:opacity-75"
                        />
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs sm:text-sm font-semibold text-white">
                              {addon.name}
                            </span>
                            {isPremierRsvp ? (
                              <Badge variant="emerald" className="text-[10px] whitespace-nowrap">
                                ✓ Incluido en Premier
                              </Badge>
                            ) : (
                              <span className="text-xs font-bold text-sky-300 whitespace-nowrap">
                                + ${addonPrice}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                            {addon.shortDesc}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Real-Time Breakdown & Summary Card (4 Cols) */}
            <Card className="lg:col-span-4 flex flex-col justify-between p-5 sm:p-6 border-white/15 bg-slate-950/60 shadow-inner">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Desglose Estimado
                  </span>
                  <Badge variant="glow" className="text-[10px]">
                    Plan {currentInvTier.name}
                  </Badge>
                </div>

                <div className="space-y-2 py-4 text-xs text-slate-300 max-h-48 overflow-y-auto">
                  <div className="flex justify-between items-center text-white font-medium">
                    <span>{currentInvTier.name} (Base)</span>
                    <span className="font-semibold">${currentInvTier.price.toLocaleString()} MXN</span>
                  </div>

                  {INVITATION_ADDONS.filter((a) => (a.id === 'rsvp' && selectedInvTier === 'premier') || activeAddons[a.id]).map((addon) => {
                    const isPremierRsvp = addon.id === 'rsvp' && selectedInvTier === 'premier';
                    const price = getAddonPriceForTier(addon.id, selectedInvTier);
                    return (
                      <div key={addon.id} className="flex justify-between items-center text-xs text-slate-300">
                        <span className="truncate pr-2">• {addon.name}</span>
                        <span className={`font-medium whitespace-nowrap ${isPremierRsvp ? 'text-emerald-400 font-semibold' : 'text-sky-300'}`}>
                          {isPremierRsvp ? '✓ Incluido ($0 MXN)' : `+$${price} MXN`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-baseline justify-between py-2.5 px-4 bg-slate-900/80 rounded-xl border border-sky-400/30 shadow-inner">
                  <span className="text-xs font-semibold text-slate-300">Inversión Final:</span>
                  <motion.span
                    key={totalInvitationPrice}
                    initial={{ scale: 1.12, color: '#38bdf8' }}
                    animate={{ scale: 1, color: '#7dd3fc' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="text-2xl font-extrabold text-sky-300"
                  >
                    ${totalInvitationPrice.toLocaleString()} MXN
                  </motion.span>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="glow"
                    size="lg"
                    onClick={() =>
                      onOpenQuoteModal(
                        `Invitación Digital (${currentInvTier.name})`,
                        `$${totalInvitationPrice.toLocaleString()} MXN`
                      )
                    }
                    className="w-full gap-2 text-xs sm:text-sm font-bold"
                  >
                    <Send className="w-4 h-4" />
                    <span>Solicitar Demo &amp; Apartar Fecha</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={onOpenDemoPassModal}
                    className="w-full gap-2 text-xs text-slate-300 hover:text-white"
                  >
                    <QrCode className="w-4 h-4 text-sky-400" />
                    <span>Ver Ejemplo de Pase QR Digital</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Cláusula de Transparencia */}
          <div className="mt-8 p-4 sm:p-5 rounded-2xl border border-white/10 bg-slate-950/40 flex items-start gap-4 text-left">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex-shrink-0 flex items-center justify-center text-purple-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-white flex flex-wrap items-center gap-2">
                <span>Cláusula de Transparencia · Esquema Pago Contra Entrega</span>
                <Badge variant="purple" className="text-[10px]">
                  Certeza Jurídica
                </Badge>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                En DreamTech trabajamos bajo estricto modelo de satisfacción: se entrega el demo completamente funcional y en línea
                para tu revisión exhaustiva y aprobación final. En caso de no liquidar el importe convenido tras la aceptación, el sistema
                procederá a la baja de la página web y a la anulación de los pases QR.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* CALCULADORA DE INVERSIÓN SAAS CORPORATIVO */}
      <section
        className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-10"
        id="calculadora-saas"
      >
        <div className="mb-8 text-left space-y-2">
          <Badge variant="purple" className="gap-1.5">
            <Server className="w-3.5 h-3.5 text-purple-300" />
            <span>Infraestructura Pospago Empresarial Multi-Cloud</span>
          </Badge>
          <h2 className="text-2xl sm:text-4xl text-white font-bold tracking-tight">
            Calculadora de Inversión SaaS &amp; Software
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Calcula el coste de tu plataforma web, CRM, Punto de Venta o ERP corporativo con licenciamiento mensual
            sin penalización por cancelación forzosa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          {/* SaaS Options Left (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tipo de Software */}
            <Card className="p-5 sm:p-7 border-white/10 bg-slate-900/60">
              <label className="text-sm font-semibold text-white flex items-center justify-between mb-4">
                <span>1. Arquitectura de Software Requerida:</span>
                <Badge variant="glow" className="text-xs">
                  Mensualidad Pospago
                </Badge>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {SAAS_SYSTEM_TYPES.map((sys) => {
                  const isActive = selectedSaasId === sys.id;
                  return (
                    <motion.button
                      key={sys.id}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedSaasId(sys.id)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? 'bg-sky-500/25 border-sky-400/60 text-white shadow-md'
                          : 'bg-slate-950/40 border-white/10 text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <div>
                        <span className={`p-2 rounded-lg inline-flex items-center justify-center mb-2 ${isActive ? 'bg-sky-400 text-slate-950' : 'bg-sky-500/10 text-sky-400'}`}>
                          {sys.id === 'serverless' ? <Zap className="w-5 h-5" /> : sys.id === 'microservices' ? <Cpu className="w-5 h-5" /> : <Database className="w-5 h-5" />}
                        </span>
                        <div className="font-bold text-sm text-white mt-1">{sys.name}</div>
                        <div className="text-xs text-slate-400">{sys.subtitle}</div>
                      </div>
                      <div className={`text-xs font-bold mt-3 ${isActive ? 'text-white' : 'text-sky-300'}`}>
                        ${sys.cost.toLocaleString()} MXN/mes
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </Card>

            {/* Despliegue & Módulos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tipo de Despliegue Multi-Cloud */}
              <Card className="p-5 border-white/10 bg-slate-900/60">
                <label className="text-sm font-semibold text-white block mb-3">
                  2. Ambiente de Hospedaje en Nube:
                </label>
                <div className="space-y-2">
                  <label
                    onClick={() => setHostingType('edge')}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      hostingType === 'edge'
                        ? 'bg-sky-500/20 border-sky-400/40'
                        : 'bg-slate-950/40 border-white/10 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="saas-hosting"
                        checked={hostingType === 'edge'}
                        onChange={() => setHostingType('edge')}
                        className="w-4 h-4 accent-sky-400 cursor-pointer"
                      />
                      <div>
                        <div className="text-xs font-semibold text-white">Local / Edge Multi-Cloud</div>
                        <div className="text-[11px] text-slate-400">Distribuido en Google Cloud &amp; CDN</div>
                      </div>
                    </div>
                    <Badge variant="glow" className="text-[10px]">
                      Incluido
                    </Badge>
                  </label>

                  <label
                    onClick={() => setHostingType('cloud-dedicated')}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      hostingType === 'cloud-dedicated'
                        ? 'bg-sky-500/20 border-sky-400/40'
                        : 'bg-slate-950/40 border-white/10 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="saas-hosting"
                        checked={hostingType === 'cloud-dedicated'}
                        onChange={() => setHostingType('cloud-dedicated')}
                        className="w-4 h-4 accent-sky-400 cursor-pointer"
                      />
                      <div>
                        <div className="text-xs font-semibold text-white">Nube Dedicada (GCP / AWS / Azure)</div>
                        <div className="text-[11px] text-slate-400">Instancia aislada con IP fija</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-sky-300">+ $800/mes</span>
                  </label>
                </div>
              </Card>

              {/* Modificaciones Mensuales */}
              <Card className="p-5 border-white/10 bg-slate-900/60 flex flex-col justify-between">
                <div>
                  <label className="text-sm font-semibold text-white block mb-1">
                    3. Modificaciones Mensuales Incluidas:
                  </label>
                  <p className="text-xs text-slate-400 mb-3">
                    Ajustes de sprint y lógica de negocio ($500 c/u adicional).
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-slate-950/50 border border-white/10 p-3 rounded-xl">
                    <span className="text-xs font-medium text-slate-300">Ajustes de sprint:</span>
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setSaasModifications((m) => Math.max(0, m - 1))}
                        className="h-7 w-7 rounded-lg"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </Button>
                      <span className="text-base font-bold text-sky-400 w-6 text-center">
                        {saasModifications}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setSaasModifications((m) => m + 1)}
                        className="h-7 w-7 rounded-lg"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>

                  <Slider
                    value={[saasModifications]}
                    max={10}
                    step={1}
                    onValueChange={(val) => setSaasModifications(val[0])}
                  />
                </div>
              </Card>
            </div>
          </div>

          {/* SaaS Summary Card Right (4 Cols) */}
          <Card className="lg:col-span-4 flex flex-col justify-between p-6 shadow-2xl border-white/15 bg-slate-950/70">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Plan SaaS DreamTech
                </span>
                <Badge variant="purple" className="text-[10px]">
                  Mensual Pospago
                </Badge>
              </div>

              <div className="space-y-3 my-5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">{currentSaas.name}</span>
                  <span className="text-white font-semibold">${currentSaas.cost.toLocaleString()} MXN</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">{hostingLabel}</span>
                  <span className="text-white font-semibold">${hostingCost.toLocaleString()} MXN</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">{saasModifications} Modificación(es) Mensual(es)</span>
                  <span className="text-white font-semibold">${modificationsCost.toLocaleString()} MXN</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">SLA Multi-Cloud y Mantenimiento</span>
                  <span className="text-sky-400 font-semibold">Incluido</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 text-white font-medium mb-1">
                  <LockOpen className="w-4 h-4 text-sky-400" />
                  <span>Sin Forzosidad</span>
                </div>
                Pago a mes vencido. Cancela o escala módulos en cualquier ciclo sin penalización.
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="flex items-baseline justify-between py-2.5 px-4 bg-slate-900/80 rounded-xl border border-purple-400/25 shadow-inner">
                <span className="text-xs font-semibold text-slate-300">Subscripción:</span>
                <div className="text-right">
                  <motion.div
                    key={totalSaasMonthly}
                    initial={{ scale: 1.12, color: '#c084fc' }}
                    animate={{ scale: 1, color: '#7dd3fc' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="text-2xl font-extrabold text-sky-300"
                  >
                    ${totalSaasMonthly.toLocaleString()}
                  </motion.div>
                  <div className="text-[10px] text-slate-400">MXN / mes pospago</div>
                </div>
              </div>

              <Button
                variant="glow"
                size="lg"
                onClick={() =>
                  onOpenQuoteModal(
                    `Plan SaaS: ${currentSaas.name}`,
                    `$${totalSaasMonthly.toLocaleString()} MXN/mes`
                  )
                }
                className="w-full gap-2 text-xs sm:text-sm font-bold"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Generar Propuesta SaaS</span>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};
