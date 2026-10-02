import React, { useState } from 'react';
import { motion } from 'motion/react';
import { INVITATION_TIERS, INVITATION_ADDONS, SAAS_SYSTEM_TYPES, getAddonPriceForTier } from '../../data/mockData';
import { TabType } from '../../types';

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
    <div className="w-full flex flex-col">
      {/* Cinematic Hero Section */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-10 sm:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-4 sm:space-y-6"
        >
          {/* Brand Logo Floating Emblem */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-sky-400/20 via-sky-600/30 to-indigo-950/70 p-3 flex items-center justify-center border border-white/30 shadow-[0_0_35px_rgba(56,189,248,0.35)] backdrop-blur-xl animate-float"
          >
            <img src="/logo.png" alt="DreamTech" className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(56,189,248,0.5)]" />
          </motion.div>

          {/* Spatial Capsule Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full vision-glass-pill shadow-lg">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-300 tracking-wider uppercase">
              Ecosistema Tecnológico DreamTech · Pospago Seguro &amp; Experiencias Digitales
            </span>
          </div>

          {/* Headline Typography */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-white font-extrabold tracking-tight leading-tight max-w-4xl">
            Tú sueñas,{' '}
            <span className="bg-gradient-to-r from-sky-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent">
              nosotros programamos
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
            Software inteligente y experiencias interactivas a tu medida. Arquitecturas con suscripción mensual pospago en nube (Google Cloud, AWS y Azure) y suites de invitaciones digitales de alta fidelidad con ticketing QR táctil.
          </p>

          {/* Quick Navigation Docks */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#calculadora-invitaciones"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full btn-glass-primary text-white font-semibold text-xs sm:text-sm active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">drafts</span>
              <span>Invitaciones Digitales</span>
            </a>
            <a
              href="#calculadora-saas"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full vision-glass text-slate-200 hover:text-white hover:bg-white/10 font-semibold text-xs sm:text-sm active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-sky-400">terminal</span>
              <span>Calculadora SaaS</span>
            </a>
          </div>
        </motion.div>

        {/* Atmospheric Mosaic Visual Element */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-10 sm:mt-12">
          
          {/* Guarantee Card (8 cols) */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="md:col-span-8 rounded-3xl vision-glass p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group text-left"
          >
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-400 text-[24px]">verified_user</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Garantía Operativa Cero Riesgo
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-semibold">
                Esquema Pospago
              </span>
            </div>

            <div className="my-5 z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Diseño, Entrega &amp; Aprobación</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
                Tanto en software corporativo como en invitaciones premium: validas la interfaz funcionando
                en entorno productivo antes de emitir tu liquidación. Transparencia digital integral.
              </p>
            </div>

            <div className="flex items-center gap-6 pt-2 z-10">
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-sky-400">100%</span>
                <span className="text-xs text-slate-300">Inspección Previa</span>
              </div>
              <div className="w-1 h-5 bg-white/20 rounded-full"></div>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-purple-300">24-48h</span>
                <span className="text-xs text-slate-300">Despliegue Rápido</span>
              </div>
              <div className="w-1 h-5 bg-white/20 rounded-full hidden sm:block"></div>
              <div className="items-center gap-2 hidden sm:flex">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">0$</span>
                <span className="text-xs text-slate-300">Anticipo Requerido</span>
              </div>
            </div>
          </motion.div>

          {/* Performance Metrics Card (4 cols) */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="md:col-span-4 rounded-3xl vision-glass p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden text-left"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Métricas de Rendimiento
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse"></span>
            </div>

            <div className="py-4">
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-xs text-slate-300">Latencia Edge CDN</span>
                <span className="text-sm font-semibold text-sky-400">&lt; 14ms</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                <div className="bg-sky-400 h-full w-[94%] rounded-full shadow-[0_0_8px_rgba(56,189,248,0.6)]"></div>
              </div>

              <div className="flex items-baseline justify-between mt-4 mb-1.5">
                <span className="text-xs text-slate-300">Interactividad Liquid UI</span>
                <span className="text-sm font-semibold text-purple-300">60 FPS</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                <div className="bg-purple-400 h-full w-[98%] rounded-full shadow-[0_0_8px_rgba(192,132,252,0.6)]"></div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-sky-400">speed</span>
              <span>Optimizado para WebGL y Safari visionOS</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN ESTRELLA: INVITACIONES DIGITALES */}
      <section
        className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14"
        id="calculadora-invitaciones"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full vision-glass-pill text-sky-300 text-xs font-semibold">
              <span className="material-symbols-outlined text-[15px]">diamond</span>
              <span>Eventos &amp; Celebraciones Exclusivas</span>
            </div>
            <h2 className="text-2xl sm:text-4xl text-white font-bold tracking-tight">
              Crea tu Invitación Digital <span className="text-sky-400">desde $800 MXN</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Experiencias dinámicas para bodas, aniversarios y galas con pase de acceso táctil y registro digital en tiempo real.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-full vision-glass self-start md:self-auto">
            <button
              onClick={() => onNavigateTab('invitaciones-digitales')}
              className="px-4 py-1.5 rounded-full btn-glass-primary text-white text-xs font-bold cursor-pointer transition-all active:scale-95"
            >
              Catálogo 2026
            </button>
            <button
              onClick={onOpenDemoPassModal}
              className="px-4 py-1.5 rounded-full text-slate-300 hover:text-white text-xs font-medium cursor-pointer transition-all flex items-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-[14px] text-sky-400">qr_code</span>
              <span>Demo de Boleto QR</span>
            </button>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 items-stretch text-left">
          {INVITATION_TIERS.map((tier) => {
            const isSelected = selectedInvTier === tier.id;
            return (
              <motion.div
                key={tier.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
                  tier.isPopular
                    ? 'vision-glass-elevated border-sky-400/40 shadow-[0_0_30px_rgba(56,189,248,0.2)]'
                    : 'vision-glass hover:border-white/30'
                }`}
              >
                {tier.isPopular && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/10 to-transparent animate-hologram pointer-events-none" />
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-black text-[11px] tracking-wider shadow-lg uppercase z-10">
                      MÁS POPULAR
                    </div>
                  </>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        tier.isPopular ? 'text-sky-300' : 'text-slate-400'
                      }`}
                    >
                      {tier.badge}
                    </span>
                    <span className="material-symbols-outlined text-[22px] text-sky-400">
                      {tier.id === 'basica' ? 'mail' : tier.id === 'plus' ? 'auto_awesome' : 'workspace_premium'}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white">{tier.name}</h3>

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
                        <span className="material-symbols-outlined text-sky-400 text-[18px]">
                          {feat.included ? 'check_circle' : 'remove_circle_outline'}
                        </span>
                        <span>{feat.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedInvTier(tier.id)}
                  className={`w-full mt-8 py-3 rounded-full font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                    isSelected
                      ? 'btn-glass-primary text-white shadow-lg'
                      : 'bg-white/10 hover:bg-white/20 border border-white/15 text-white'
                  }`}
                >
                  {isSelected ? `✓ Paquete ${tier.name} Seleccionado` : `Configurar ${tier.name}`}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* CALCULADORA DINÁMICA DE INVITACIONES (100% digital RSVP, sin WhatsApp) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl vision-glass-elevated p-5 sm:p-8 text-left"
        >
          <div className="flex items-center gap-3 pb-6 border-b border-white/10">
            <span className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 shadow-inner">
              <span className="material-symbols-outlined text-[22px]">calculate</span>
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
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
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedInvTier(tier.id)}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          isActive
                            ? 'bg-sky-500/25 border-sky-400/50 text-white shadow-md'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-sm">{tier.name}</div>
                          <div className="text-xs opacity-75">{tier.badge}</div>
                        </div>
                        <span className="text-sm font-extrabold text-sky-300">${tier.price.toLocaleString()}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Add-on Checkboxes (RSVP 100% digital sin WhatsApp) */}
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
                        className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all select-none ${
                          isPremierRsvp
                            ? 'bg-emerald-500/15 border-emerald-400/40 shadow-sm'
                            : isChecked
                            ? 'bg-sky-500/15 border-sky-400/40 shadow-sm'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
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
                              <span className="text-[10.5px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30 whitespace-nowrap">
                                ✓ Incluido en Premier
                              </span>
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
            <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl vision-glass p-5 sm:p-6 shadow-inner">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Desglose Estimado
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-[11px] font-semibold">
                    Plan {currentInvTier.name}
                  </span>
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

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-baseline justify-between py-2.5 px-4 bg-slate-900/60 rounded-2xl mb-3 border border-sky-400/25 shadow-inner">
                  <span className="text-xs font-semibold text-slate-300">Inversión Final:</span>
                  <motion.span
                    key={totalInvitationPrice}
                    initial={{ scale: 1.15, color: '#38bdf8' }}
                    animate={{ scale: 1, color: '#7dd3fc' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="text-2xl font-extrabold text-sky-300"
                  >
                    ${totalInvitationPrice.toLocaleString()} MXN
                  </motion.span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() =>
                      onOpenQuoteModal(
                        `Invitación Digital (${currentInvTier.name})`,
                        `$${totalInvitationPrice.toLocaleString()} MXN`
                      )
                    }
                    className="w-full py-3 rounded-full btn-glass-primary text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>Solicitar Demo &amp; Apartar Fecha</span>
                  </button>

                  <button
                    onClick={onOpenDemoPassModal}
                    className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-sky-400">qr_code_2</span>
                    <span>Ver Ejemplo de Pase QR Digital</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cláusula de Transparencia */}
          <div className="mt-8 p-4 sm:p-5 rounded-2xl vision-glass border border-white/10 flex items-start gap-4 text-left">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex-shrink-0 flex items-center justify-center text-purple-300">
              <span className="material-symbols-outlined text-[22px]">policy</span>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-white flex flex-wrap items-center gap-2">
                <span>Cláusula de Transparencia · Esquema Pago Contra Entrega</span>
                <span className="px-2.5 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 tracking-wide uppercase font-bold">
                  Certeza Jurídica
                </span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                En DreamTech trabajamos bajo estricto modelo de satisfacción: se entrega el demo completamente funcional y en línea
                para tu revisión exhaustiva y aprobación final. En caso de no liquidar el importe convenido tras la aceptación, el sistema
                procederá a la baja de la página web y a la anulación de los pases QR.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CALCULADORA DE INVERSIÓN SAAS CORPORATIVO */}
      <section
        className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14"
        id="calculadora-saas"
      >
        <div className="mb-8 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full vision-glass-pill text-purple-300 text-xs font-semibold mb-2">
            <span className="material-symbols-outlined text-[15px]">lan</span>
            <span>Infraestructura Pospago Empresarial Multi-Cloud</span>
          </div>
          <h2 className="text-2xl sm:text-4xl text-white font-bold tracking-tight">
            Calculadora de Inversión SaaS &amp; Software
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
            Calcula el coste de tu plataforma web, CRM, Punto de Venta o ERP corporativo con licenciamiento mensual
            sin penalización por cancelación forzosa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          {/* SaaS Options Left (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tipo de Software */}
            <div className="rounded-3xl vision-glass p-5 sm:p-7">
              <label className="text-sm font-semibold text-white flex items-center justify-between mb-4">
                <span>1. Arquitectura de Software Requerida:</span>
                <span className="text-xs text-sky-400 font-normal">Mensualidad Pospago</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {SAAS_SYSTEM_TYPES.map((sys) => {
                  const isActive = selectedSaasId === sys.id;
                  return (
                    <button
                      key={sys.id}
                      type="button"
                      onClick={() => setSelectedSaasId(sys.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? 'bg-sky-500/25 border-sky-400/50 text-white shadow-md'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div>
                        <span className={`material-symbols-outlined text-[24px] ${isActive ? 'text-white' : 'text-sky-400'}`}>
                          {sys.icon}
                        </span>
                        <div className="font-bold text-sm text-white mt-1.5">{sys.name}</div>
                        <div className="text-xs text-slate-400">{sys.subtitle}</div>
                      </div>
                      <div className={`text-xs font-bold mt-3 ${isActive ? 'text-white' : 'text-sky-300'}`}>
                        ${sys.cost.toLocaleString()} MXN/mes
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Despliegue & Módulos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Tipo de Despliegue Multi-Cloud */}
              <div className="rounded-3xl vision-glass p-5">
                <label className="text-sm font-semibold text-white block mb-3">
                  2. Ambiente de Hospedaje en Nube:
                </label>
                <div className="space-y-2">
                  <label
                    onClick={() => setHostingType('edge')}
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                      hostingType === 'edge'
                        ? 'bg-sky-500/20 border-sky-400/40'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="saas-hosting"
                        checked={hostingType === 'edge'}
                        onChange={() => setHostingType('edge')}
                        className="w-4 h-4 accent-sky-400"
                      />
                      <div>
                        <div className="text-xs font-semibold text-white">Local / Edge Multi-Cloud</div>
                        <div className="text-[11px] text-slate-400">Distribuido en Google Cloud &amp; CDN</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-sky-400">Incluido</span>
                  </label>

                  <label
                    onClick={() => setHostingType('cloud-dedicated')}
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                      hostingType === 'cloud-dedicated'
                        ? 'bg-sky-500/20 border-sky-400/40'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="saas-hosting"
                        checked={hostingType === 'cloud-dedicated'}
                        onChange={() => setHostingType('cloud-dedicated')}
                        className="w-4 h-4 accent-sky-400"
                      />
                      <div>
                        <div className="text-xs font-semibold text-white">Nube Dedicada (GCP / AWS / Azure)</div>
                        <div className="text-[11px] text-slate-400">Instancia aislada con IP fija</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-sky-300">+ $800/mes</span>
                  </label>
                </div>
              </div>

              {/* Modificaciones Mensuales */}
              <div className="rounded-3xl vision-glass p-5 flex flex-col justify-between">
                <div>
                  <label className="text-sm font-semibold text-white block mb-1">
                    3. Modificaciones Mensuales Incluidas:
                  </label>
                  <p className="text-xs text-slate-400 mb-3">
                    Ajustes de sprint y lógica de negocio ($500 c/u adicional).
                  </p>
                </div>

                <div className="flex items-center justify-between bg-slate-900/60 border border-white/10 p-3 rounded-2xl">
                  <span className="text-xs font-medium text-slate-300">Ajustes de sprint:</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSaasModifications((m) => Math.max(0, m - 1))}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white cursor-pointer active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[18px]">remove</span>
                    </button>
                    <span className="text-base font-bold text-sky-400 w-6 text-center">
                      {saasModifications}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSaasModifications((m) => m + 1)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white cursor-pointer active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SaaS Summary Card Right (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl vision-glass-elevated p-6 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Plan SaaS DreamTech
                </span>
                <span className="px-3 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-[11px] font-semibold">
                  Mensual Pospago
                </span>
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

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 text-white font-medium mb-1">
                  <span className="material-symbols-outlined text-sky-400 text-[18px]">lock_open</span>
                  <span>Sin Forzosidad</span>
                </div>
                Facturación mensual vencida. Cancela o escala módulos en cualquier ciclo sin penalización.
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="flex items-baseline justify-between py-2.5 px-4 bg-slate-900/60 rounded-2xl mb-3 border border-purple-400/25 shadow-inner">
                <span className="text-xs font-semibold text-slate-300">Subscripción:</span>
                <div className="text-right">
                  <motion.div
                    key={totalSaasMonthly}
                    initial={{ scale: 1.15, color: '#c084fc' }}
                    animate={{ scale: 1, color: '#7dd3fc' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="text-2xl font-extrabold text-sky-300"
                  >
                    ${totalSaasMonthly.toLocaleString()}
                  </motion.div>
                  <div className="text-[10px] text-slate-400">MXN / mes pospago</div>
                </div>
              </div>

              <button
                onClick={() =>
                  onOpenQuoteModal(
                    `Plan SaaS: ${currentSaas.name}`,
                    `$${totalSaasMonthly.toLocaleString()} MXN/mes`
                  )
                }
                className="w-full py-3.5 rounded-full btn-glass-primary text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-lg"
              >
                <span className="material-symbols-outlined text-[18px]">description</span>
                <span>Generar Propuesta SaaS</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
