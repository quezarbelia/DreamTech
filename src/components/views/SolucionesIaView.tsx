import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TELEMETRY_LOGS } from '../../data/mockData';
import { TabType } from '../../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Terminal,
  Cpu,
  Wallet,
  Cloud,
  RefreshCw,
  Zap,
  ShieldCheck,
  Layers,
  Activity,
  WifiOff,
  Database,
  ArrowRight,
  Server,
  BarChart3,
  Bot,
} from 'lucide-react';

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
    <div className="w-full flex flex-col space-y-12 sm:space-y-16">
      {/* SECTION HEADER */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-8 sm:pt-10 max-w-[1400px] mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center max-w-4xl mx-auto space-y-4"
        >
          <Badge variant="outline" className="gap-2 py-1 px-4 border-white/10 bg-white/5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium tracking-wide">
              Ingeniería de Software · Despliegues Cloud Empresariales
            </span>
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-white font-extrabold tracking-tight leading-tight">
            Infraestructura Cloud &amp;{' '}
            <span className="text-slate-400">
              Sistemas de Alto Rendimiento
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
            Diseñamos y desplegamos arquitecturas escalables, bases de datos resilientes y plataformas web de alta disponibilidad en Google Cloud, AWS y Azure.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-300">
            <Badge variant="outline" className="gap-2 py-1.5 px-3.5">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-semibold text-white">Latencia Global &lt; 15ms</span>
            </Badge>
            <Badge variant="outline" className="gap-2 py-1.5 px-3.5">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-semibold text-white">Seguridad Cifrada TLS/AES</span>
            </Badge>
            <Badge variant="outline" className="gap-2 py-1.5 px-3.5">
              <Cloud className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-semibold text-white">Migración Zero-Downtime</span>
            </Badge>
          </div>
        </motion.div>
      </section>

      {/* INTERACTIVE SPATIAL CONSOLE */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full">
        <Card className="rounded-3xl border-white/15 bg-slate-950/80 p-5 sm:p-8 shadow-2xl backdrop-blur-2xl">
          {/* Console Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 bg-slate-900/80 border border-white/10 p-4 rounded-2xl shadow-inner">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-400/80" />
                <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
              </div>
              <Separator orientation="vertical" className="h-4 bg-white/20" />
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-sky-400" />
                <span className="text-xs sm:text-sm text-white font-medium tracking-wide">
                  DreamTech Console <span className="text-slate-400 font-normal">Monitor de Nube</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs text-emerald-400 border-emerald-500/25 bg-emerald-500/10">
                Sistemas Cloud: 100% Operativos
              </Badge>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          {/* Telemetry Grid (3 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5 text-left">
            {/* Card 1: Backend API Performance */}
            <Card className="p-5 sm:p-6 border-white/10 bg-slate-900/60 flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Disponibilidad API &amp; Microservicios
                  </span>
                  <div className="text-3xl font-extrabold text-white mt-1">99.98%</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-400/20 flex items-center justify-center text-sky-300">
                  <Activity className="w-5 h-5" />
                </div>
              </div>

              {/* Sparkline Chart */}
              <div className="w-full">
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Latencia Media</span>
                  <span className="text-sky-300 font-semibold">14ms · P99</span>
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
                <span>Rendimiento Global</span>
                <span className="text-white font-medium">Nominal</span>
              </div>
            </Card>

            {/* Card 2: Flexible Financial Model */}
            <Card className="p-5 sm:p-6 border-white/10 bg-slate-900/60 flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider">
                    Modelo Financiero Flexible
                  </span>
                  <div className="text-3xl font-extrabold text-white mt-1">Pospago</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shadow-inner">
                  <Wallet className="w-5 h-5" />
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
            </Card>

            {/* Card 3: Multi-Cloud Mesh */}
            <Card className="p-5 sm:p-6 border-white/10 bg-slate-900/60 flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-sky-300 uppercase tracking-wider">
                    NUBE: Google Cloud, AWS y Azure
                  </span>
                  <div className="text-3xl font-extrabold text-white mt-1">SLA 99.99%</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 shadow-inner">
                  <Cloud className="w-5 h-5" />
                </div>
              </div>

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
            </Card>
          </div>

          {/* Live Stream Console Output */}
          <div className="rounded-2xl bg-slate-950/90 border border-white/10 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-inner">
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
            <Button
              variant="outline"
              size="sm"
              onClick={cycleLog}
              className="text-xs gap-1.5 shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refrescar Registro</span>
            </Button>
          </div>
        </Card>
      </section>

      {/* BENTO GRID: LAS 4 CAPAS OPERATIVAS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col mb-8 text-left space-y-1">
          <Badge variant="glow" className="w-fit text-xs">
            Estructura Modular Integrada
          </Badge>
          <h2 className="text-2xl sm:text-4xl text-white font-bold tracking-tight">
            Las 4 Capas Operativas de DreamTech
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Arquitectura de capas interconectadas diseñadas para despliegue sin fricción.
          </p>
        </div>

        {/* 4-Layer Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch text-left">
          {/* CAPA 1 */}
          <Card className="p-6 sm:p-8 flex flex-col justify-between border-white/10 bg-slate-900/50 hover:border-white/20 transition-all">
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-sky-400 tracking-wider uppercase">
                      Capa 01 · Perímetro Web
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Landing Pages de Alto Rendimiento
                    </h3>
                  </div>
                </div>

                <Badge variant="emerald" className="text-xs">
                  100/100 Lighthouse
                </Badge>
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
                <span className="text-[10px] text-slate-400 mt-0.5">Render instantáneo</span>
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
          </Card>

          {/* CAPA 2 */}
          <Card className="p-6 sm:p-8 flex flex-col justify-between border-white/10 bg-slate-900/50 hover:border-white/20 transition-all">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-purple-300 tracking-wider uppercase">
                    Capa 02 · Transacciones
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">POS Inteligente</h3>
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
                  <WifiOff className="w-4 h-4 text-sky-400" />
                  <span>Modo Offline Activo</span>
                </div>
                <Badge variant="glow" className="text-[10px]">
                  Zero-Data-Loss
                </Badge>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-white">
                  <Activity className="w-4 h-4 text-purple-300" />
                  <span>Auto-Sync Vectorial</span>
                </div>
                <Badge variant="purple" className="text-[10px]">
                  &lt; 300ms
                </Badge>
              </div>
            </div>
          </Card>

          {/* CAPA 3 */}
          <Card className="p-6 sm:p-8 flex flex-col justify-between border-white/10 bg-slate-900/50 hover:border-white/20 transition-all">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-sky-400 tracking-wider uppercase">
                    Capa 03 · Operaciones
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Procesos Críticos</h3>
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
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-sky-400 to-indigo-400 h-full rounded-full w-[94%] shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
              </div>
              <span className="text-[11px] text-slate-400 pt-1">
                Monitoreo continuo de eventos por segundo (EPS)
              </span>
            </div>
          </Card>

          {/* CAPA 4 */}
          <Card className="p-6 sm:p-8 flex flex-col justify-between border-white/10 bg-slate-900/50 hover:border-white/20 transition-all">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-purple-300 tracking-wider uppercase">
                    Capa 04 · Gestión Central
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">CRM &amp; ERP Cognitivos</h3>
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
          </Card>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full pb-10">
        <Card className="p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border-white/15 bg-slate-950/80 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col space-y-2 text-center md:text-left">
            <Badge variant="glow" className="w-fit text-xs mx-auto md:mx-0">
              Despliegue Inmediato
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ¿Listo para poner en marcha tu infraestructura cloud?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Nuestros arquitectos de software diseñan un plan de implementación a medida, con despliegue en nube
              (Google Cloud, AWS y Azure) sin costo inicial.
            </p>
          </div>

          <div className="flex items-center justify-center shrink-0 w-full sm:w-auto">
            <Button
              variant="glow"
              size="lg"
              onClick={() => onNavigateTab('planes-precios-saas')}
              className="w-full sm:w-auto font-bold text-sm gap-2"
            >
              <span>Ver Esquema SaaS</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};
