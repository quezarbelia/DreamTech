import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TELEMETRY_LOGS } from '../../data/mockData';
import { TabType } from '../../types';

interface SolucionesIaViewProps {
  onNavigateTab: (tab: TabType) => void;
}

export const SolucionesIaView: React.FC<SolucionesIaViewProps> = ({ onNavigateTab }) => {
  const [logIndex, setLogIndex] = useState(0);
  const [logFading, setLogFading] = useState(false);

  // Auto cycle telemetry logs
  useEffect(() => {
    const timer = setInterval(() => {
      cycleLog();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const cycleLog = () => {
    setLogFading(true);
    setTimeout(() => {
      setLogIndex((prev) => (prev + 1) % TELEMETRY_LOGS.length);
      setLogFading(false);
    }, 150);
  };

  return (
    <div className="w-full flex flex-col">
      {/* SECTION HEADER */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-10 sm:py-16 max-w-[1400px] mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col items-center max-w-4xl mx-auto space-y-4"
        >
          {/* Specular Micro-kicker */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full vision-glass-pill shadow-lg">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
            <span className="text-[11px] sm:text-xs font-semibold text-sky-300 tracking-widest uppercase">
              Ingeniería de Vanguardia · Ergonomía visionOS
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-white font-extrabold tracking-tight leading-tight">
            Ecosistema de Software Inteligente{' '}
            <span className="bg-gradient-to-r from-sky-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent">
              Potenciado con IA
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
            Arquitecturas serverless y multi-cloud diseñadas para alta disponibilidad, analítica predictiva y
            automatización sin fricción.
          </p>

          {/* Metrics Inline List */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full vision-glass shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-sky-400">bolt</span>
              <span className="font-semibold text-white">Latencia &lt; 15ms</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full vision-glass shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-sky-400">verified_user</span>
              <span className="font-semibold text-white">SOC2 Tipo II Compliant</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full vision-glass shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-purple-300">cloud_sync</span>
              <span className="font-semibold text-white">Zero-Downtime Migration</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* INTERACTIVE SPATIAL CONSOLE: DreamTech OS v2.4 */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-3xl vision-glass-elevated p-5 sm:p-8"
        >
          {/* Console Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 bg-slate-950/60 border border-white/10 p-4 rounded-2xl shadow-inner">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-400/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400/80"></span>
              </div>
              <div className="h-4 w-px bg-white/20"></div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-400 text-[20px]">terminal</span>
                <span className="text-xs sm:text-sm text-white font-medium tracking-wide">
                  DreamTech OS v2.4 <span className="text-slate-400 font-normal">Spatial Console</span>
                </span>
              </div>
            </div>

            {/* Mode Indicator / Live Nodes */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-semibold text-sky-300 uppercase tracking-wider px-3.5 py-1 rounded-full bg-sky-500/15 border border-sky-400/30">
                Multi-Cloud Ingestion: Nominal
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
            </div>
          </div>

          {/* Telemetry Grid (3 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {/* Card 1: LLM Agent */}
            <div className="p-5 sm:p-6 rounded-2xl vision-glass-interactive flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Agente Cognitivo LLM
                  </span>
                  <div className="text-3xl font-extrabold text-white mt-1">99.4%</div>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 shadow-inner">
                  <span className="material-symbols-outlined text-[20px]">neurology</span>
                </div>
              </div>

              {/* Sparkline Chart */}
              <div className="w-full">
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Latencia Promedio</span>
                  <span className="text-sky-300 font-semibold">12ms · P99</span>
                </div>
                <svg className="w-full h-10 text-sky-400" preserveAspectRatio="none" viewBox="0 0 100 24">
                  <path
                    d="M0,18 Q15,4 30,12 T60,6 T85,15 L100,8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span>Inferencia RAG</span>
                <span className="text-sky-300 font-semibold">Tiempo real</span>
              </div>
            </div>

            {/* Card 2: Flexible Financial Model */}
            <div className="p-5 sm:p-6 rounded-2xl vision-glass-interactive flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider">
                    Modelo Financiero Flexible
                  </span>
                  <div className="text-3xl font-extrabold text-white mt-1">Pospago</div>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shadow-inner">
                  <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                </div>
              </div>

              <div className="space-y-1.5 py-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Costo de Arranque:</span>
                  <span className="font-bold text-emerald-400">$0.00 MXN</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Liquidación:</span>
                  <span className="font-semibold text-white">Mes Vencido</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Cancelación:</span>
                  <span className="font-semibold text-slate-300">Sin Plazos Forzosos</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span>Riesgo Financiero</span>
                <span className="text-emerald-400 font-semibold">0% Garantizado</span>
              </div>
            </div>

            {/* Card 3: Multi-Cloud Mesh (NUBE, Google Cloud, AWS y Azure) */}
            <div className="p-5 sm:p-6 rounded-2xl vision-glass-interactive flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-sky-300 uppercase tracking-wider">
                    NUBE: Google Cloud, AWS y Azure
                  </span>
                  <div className="text-3xl font-extrabold text-white mt-1">SLA 99.99%</div>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 shadow-inner">
                  <span className="material-symbols-outlined text-[20px]">cloud_sync</span>
                </div>
              </div>

              {/* 3 Multi-Cloud Nodes requested by user */}
              <div className="grid grid-cols-3 gap-2 py-1">
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950/60 border border-white/5 text-center">
                  <span className="text-xs font-bold text-sky-300">Google Cloud</span>
                  <span className="text-[10px] text-slate-400">Cloud Run & AI</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950/60 border border-white/5 text-center">
                  <span className="text-xs font-bold text-amber-300">AWS</span>
                  <span className="text-[10px] text-slate-400">Mesh Core</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950/60 border border-white/5 text-center">
                  <span className="text-xs font-bold text-indigo-300">Azure</span>
                  <span className="text-[10px] text-slate-400">Hybrid Edge</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span>Sincronización Multi-Cloud</span>
                <span className="text-sky-300 font-semibold">Activa &amp; Redundante</span>
              </div>
            </div>
          </div>

          {/* Live Stream Console Output & Simulated Terminal */}
          <div className="rounded-2xl bg-slate-950/80 border border-white/10 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-2 overflow-hidden flex-1">
              <span className="text-sky-400 font-mono text-xs tracking-tight whitespace-nowrap">
                &gt; sys.telemetry.hook:
              </span>
              <span
                className={`text-slate-300 font-mono text-xs truncate transition-opacity duration-150 ${
                  logFading ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {TELEMETRY_LOGS[logIndex]}
              </span>
            </div>
            <button
              onClick={cycleLog}
              className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-95"
            >
              <span className="material-symbols-outlined text-[14px]">refresh</span>
              <span>Refrescar Registro</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* BENTO GRID: LAS 4 CAPAS OPERATIVAS (Agentes autónomos eliminados a solicitud del usuario) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full mb-16">
        <div className="flex flex-col mb-8 text-left">
          <span className="text-xs font-semibold text-sky-400 tracking-widest uppercase">
            Estructura Modular Integrada
          </span>
          <h2 className="text-2xl sm:text-4xl text-white font-bold tracking-tight mt-1">
            Las 4 Capas Operativas de DreamTech
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Arquitectura de capas interconectadas diseñadas para despliegue sin fricción.
          </p>
        </div>

        {/* Balanced 4-Layer Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* CAPA 1: Landing Pages de Alto Rendimiento */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl vision-glass p-6 sm:p-8 flex flex-col justify-between text-left"
          >
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300">
                    <span className="material-symbols-outlined text-[24px]">speed</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-sky-400 tracking-wider uppercase">
                      Capa 01 · Perímetro Web
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Landing Pages de Alto Rendimiento
                    </h3>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-white/10 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-xs text-white font-semibold">100/100 Lighthouse</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                Experiencias visuales ultralivianas montadas en CDN perimetral global. Tiempos de carga
                sub-segundo con captura y conversión instantánea.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-white/10">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col">
                <span className="text-[11px] text-slate-400">Core Web Vitals</span>
                <span className="text-lg font-bold text-sky-300 mt-1">0.12s LCP</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Renderizado instantáneo</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col">
                <span className="text-[11px] text-slate-400">Conversión</span>
                <span className="text-lg font-bold text-purple-300 mt-1">+48.2%</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Scoring cualificado</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col">
                <span className="text-[11px] text-slate-400">Edge CDN</span>
                <span className="text-lg font-bold text-white mt-1">310+ POPs</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Baja latencia</span>
              </div>
            </div>
          </motion.div>

          {/* CAPA 2: Punto de Venta POS */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl vision-glass p-6 sm:p-8 flex flex-col justify-between text-left"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                  <span className="material-symbols-outlined text-[24px]">point_of_sale</span>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-purple-300 tracking-wider uppercase">
                    Capa 02 · Transacciones
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">POS Inteligente</h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                Cobro ágil con tolerancia absoluta a fallas de red. Almacenamiento local IndexedDB cifrado y
                sincronización instantánea al recuperar conectividad.
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined text-[18px] text-sky-400">wifi_off</span>
                  <span>Modo Offline Activo</span>
                </div>
                <span className="text-[11px] text-sky-300 px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/30 font-semibold">
                  Zero-Data-Loss
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined text-[18px] text-purple-300">sync_saved_locally</span>
                  <span>Auto-Sync Vectorial</span>
                </div>
                <span className="text-[11px] text-purple-300 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-400/30 font-semibold">
                  &lt; 300ms
                </span>
              </div>
            </div>
          </motion.div>

          {/* CAPA 3: Procesos Críticos */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl vision-glass p-6 sm:p-8 flex flex-col justify-between text-left"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300">
                  <span className="material-symbols-outlined text-[24px]">precision_manufacturing</span>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-sky-400 tracking-wider uppercase">
                    Capa 03 · Operaciones
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Procesos Críticos</h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                Automatización de pipelines de datos y tareas continuas con algoritmos para detección
                predictiva de anomalías y alertas tempranas.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>Detección de Desvíos</span>
                <span className="text-sky-300 font-semibold">99.8% Eficacia</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-sky-400 to-indigo-400 h-full rounded-full w-[94%] shadow-[0_0_8px_rgba(56,189,248,0.5)]"></div>
              </div>
              <span className="text-[11px] text-slate-400 pt-1">
                Monitoreo continuo de eventos por segundo (EPS)
              </span>
            </div>
          </motion.div>

          {/* CAPA 4: CRM & ERP Cognitivos */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl vision-glass p-6 sm:p-8 flex flex-col justify-between text-left"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                  <span className="material-symbols-outlined text-[24px]">dashboard_customize</span>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-purple-300 tracking-wider uppercase">
                    Capa 04 · Gestión Central
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">CRM & ERP Cognitivos</h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                Paneles predictivos que unifican inventario, cuentas por cobrar y comportamiento de clientes en un
                modelo analítico 360°.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="text-[11px] text-slate-400 block">Scoring Leads</span>
                <span className="text-xl font-extrabold text-purple-300">A+ Pro</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5">
                <span className="text-[11px] text-slate-400 block">Forecast Trimestre</span>
                <span className="text-xl font-extrabold text-white">±2.1% err</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CALL TO ACTION: (Se eliminaron módulos de integración técnica y sólo queda ver esquema SaaS como se pidió) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full mb-16">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className="relative rounded-3xl vision-glass-elevated p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col space-y-2 text-center md:text-left">
            <span className="text-xs font-semibold text-sky-400 tracking-widest uppercase">
              Despliegue Inmediato
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              ¿Listo para orquestar tu arquitectura con IA?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Nuestros arquitectos de software diseñan un plan de implementación a medida, con despliegue en nube
              (Google Cloud, AWS y Azure) sin costo inicial.
            </p>
          </div>

          <div className="flex items-center justify-center shrink-0">
            <button
              onClick={() => onNavigateTab('planes-precios-saas')}
              className="px-8 py-3.5 rounded-full btn-glass-primary text-white font-bold text-sm transition-all cursor-pointer whitespace-nowrap active:scale-95 shadow-xl"
            >
              Ver Esquema SaaS
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
