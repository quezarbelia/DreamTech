import { InvitationTier, InvitationAddon, SaasType, SaasPlanCard, FaqItem } from '../types';

export const INVITATION_TIERS: InvitationTier[] = [
  {
    id: 'basica',
    name: 'Básica',
    badge: 'Esencial',
    price: 800,
    description: 'Perfecta para reuniones íntimas y recepciones familiares con despliegue ágil.',
    features: [
      { text: 'Capacidad: Menor a 100 personas', included: true },
      { text: 'Llenado rápido en Google Sheets', included: true },
      { text: 'Hasta 6 imágenes (1 cover + 5 carrusel)', included: true },
      { text: 'Sin música de fondo', included: false },
      { text: 'Sin ticket pass individual', included: false },
    ],
  },
  {
    id: 'plus',
    name: 'Plus',
    badge: 'Interactivo',
    price: 1200,
    description: 'Control de asistencia con analíticas gráficas y experiencia auditiva estéreo inmersiva.',
    isPopular: true,
    features: [
      { text: '100 a 500 invitados monitorizados', included: true },
      { text: 'Base de Datos Cloud integrada', included: true },
      { text: 'Descarga de Ticket Digital personal', included: true },
      { text: 'Visualización gráfica interactiva', included: true },
      { text: 'Música de fondo envolvente', included: true, highlight: true },
      { text: 'Hasta 10 imágenes en alta definición', included: true },
    ],
  },
  {
    id: 'premier',
    name: 'Premier',
    badge: 'VIP Total',
    price: 1800,
    description: 'Para recepciones de alto impacto con pases QR y cinemáticas refractivas visionOS.',
    features: [
      { text: 'Todo lo incluido en paquete Plus', included: true },
      { text: 'Confirmación RSVP & Pase QR', included: true, highlight: true },
      { text: 'Animaciones de cristal dinámicas', included: true },
      { text: '1 Imagen de fondo panorámica adaptativa', included: true },
      { text: 'Hasta 15 fotos en carrusel cinemático', included: true },
    ],
  },
];

export const INVITATION_ADDONS: Omit<InvitationAddon, 'checked'>[] = [
  {
    id: 'itinerario',
    name: 'Itinerario Interactivo',
    shortDesc: 'Timeline visual con íconos dinámicos del minuto a minuto del evento.',
    price: 75,
  },
  {
    id: 'regalos',
    name: 'Mesa de Regalos / Banco',
    shortDesc: 'Botones de copia con 1 clic para CLABE y enlaces a tiendas departamentales.',
    price: 75,
  },
  {
    id: 'dresscode',
    name: 'Dress Code Cromático',
    shortDesc: 'Swatches de colores permitidos, ejemplos fotográficos y especificaciones.',
    price: 75,
  },
  {
    id: 'gps',
    name: 'Ubicación GPS Waze/Maps',
    shortDesc: 'Navegación directa en 1 toque para no perderse hacia el recinto.',
    price: 75,
  },
  {
    id: 'rsvp',
    name: 'Confirmación RSVP Digital & Pase QR',
    shortDesc: 'Validación en vivo con generación instantánea de boleto digital interactivo.',
    price: 300,
  },
  {
    id: 'galeria',
    name: 'Fotos Extra (+5 Fotos)',
    shortDesc: 'Paquete de hasta 5 fotografías adicionales en alta definición para tu carrusel.',
    price: 100,
  },
];

/**
 * Returns dynamic price of each addon based on tier to ensure
 * exact full-pack totals (Básica con todo: $1,500, Plus con todo: $2,000, Premier con todo: $2,500)
 */
export const getAddonPriceForTier = (addonId: string, tierId: 'basica' | 'plus' | 'premier'): number => {
  if (addonId === 'rsvp') {
    return tierId === 'premier' ? 0 : 300;
  }
  if (tierId === 'basica') {
    if (addonId === 'galeria') return 100;
    return 75;
  }
  if (tierId === 'plus') {
    return 100;
  }
  if (tierId === 'premier') {
    if (addonId === 'galeria') return 200;
    return 125;
  }
  return 75;
};

export const SAAS_SYSTEM_TYPES: SaasType[] = [
  {
    id: 'landing',
    name: 'Landing Estática',
    subtitle: 'Alta conversión y SEO',
    cost: 500,
    icon: 'web',
  },
  {
    id: 'serverless',
    name: 'App Serverless',
    subtitle: 'Microservicios API',
    cost: 1000,
    icon: 'bolt',
  },
  {
    id: 'crm',
    name: 'CRM Clientes',
    subtitle: 'Gestión de Pipeline',
    cost: 1000,
    icon: 'contact_page',
  },
  {
    id: 'pos',
    name: 'Punto de Venta POS',
    subtitle: 'Caja, tickets e inventario',
    cost: 1500,
    icon: 'point_of_sale',
  },
  {
    id: 'procesos',
    name: 'Control Procesos',
    subtitle: 'Flujos y auditoría',
    cost: 1500,
    icon: 'account_tree',
  },
  {
    id: 'erp',
    name: 'ERP Empresarial',
    subtitle: 'Multi-sucursal y BI',
    cost: 3000,
    icon: 'corporate_fare',
  },
];

export const SAAS_PLAN_CARDS: SaasPlanCard[] = [
  {
    id: 'landing-estatica',
    tag: 'Micro Edge',
    icon: 'speed',
    title: 'Landing Page Estática',
    description: 'Presencia ultra-rápida en CDN distribuida a nivel global con rendimiento inmutable de 100 en Core Web Vitals.',
    price: 500,
    priceSuffix: 'MXN / mes pospago',
    features: [
      '1 modificación mensual garantizada',
      'Despliegue Multi-Edge Anycast',
      'Certificado TLS/SSL gestionado',
      'Protección DDoS perimetral',
    ],
  },
  {
    id: 'landing-funcional',
    tag: 'Reactiva & Base de Datos',
    icon: 'dynamic_form',
    title: 'Landing Funcional',
    description: 'Lógica de ejecución en el Edge, formularios estructurados y persistencia automatizada en base de datos cloud.',
    price: 1000,
    priceSuffix: 'MXN / mes pospago',
    features: [
      '1 modificación mensual técnica',
      'Lógica de Middleware & Webhooks',
      'Notificaciones instantáneas por Email',
      'Backups relacionales redundantes',
    ],
  },
  {
    id: 'pos',
    tag: 'Caja & Stock',
    icon: 'point_of_sale',
    title: 'Punto de Venta (POS)',
    description: 'Control de corte de caja, inventario multi-almacén en vivo y enlace nativo con escáneres láser y cajones.',
    price: 1500,
    priceSuffix: 'MXN / mes pospago',
    highlightBadge: 'Comercio Físico & Cloud',
    features: [
      '1 modificación funcional por mes',
      'Modo Offline con reconciliación P2P',
      'Soporte USB / Bluetooth de código de barras',
      'Módulo de impresión térmica rápida ESC/POS',
    ],
  },
  {
    id: 'procesos',
    tag: 'Automatización',
    icon: 'terminal',
    title: 'Procesos Críticos',
    description: 'Pipelines de cálculo autónomos, telemetría de fallos, orquestación de colas y disparadores de emergencia.',
    price: 1500,
    priceSuffix: 'MXN Local / + consumo Cloud',
    features: [
      '1 ajuste de pipeline mensual',
      'Logs inmutables y monitoreo 24/7',
      'Disparadores vía Webhooks / Cronjobs',
      'Fallback automático a instancia local',
    ],
  },
  {
    id: 'crm',
    tag: 'Ventas & Clientes',
    icon: 'hub',
    title: 'CRM Inteligente',
    description: 'Embudos de venta visuales, trazabilidad profunda de leads y métricas de conversión en tiempo real.',
    price: 1000,
    priceSuffix: 'Serverless',
    extraNote: 'Opción Cloud Dedicado: $1,500 MXN / mes',
    features: [
      '1 modificación mensual por contrato',
      'Tableros Kanban dinámicos',
      'Pipeline de prospección inteligente',
      'Historial auditado de clientes y tratos',
    ],
  },
  {
    id: 'erp',
    tag: 'Core Operativo',
    icon: 'account_tree',
    title: 'ERP Integral Modular',
    description: 'Arquitectura modular: Ventas + Inventarios + Facturación CFDI. Escala de acuerdo al crecimiento empresarial.',
    price: 3000,
    priceSuffix: 'MXN base / mes',
    extraNote: '+$1,000 MXN/mes por módulo adicional',
    features: [
      '1 modificación estructural mensual',
      'Facturación CFDI 4.0 automática',
      'Multi-sucursal y matriz consolidada',
      'Control fino de accesos y roles (RBAC)',
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '¿Cómo opera el cobro a mes vencido exactamente?',
    answer: 'Tu software entra en producción y tu equipo lo utiliza activamente durante los primeros 30 días naturales sin cobro previo. Al término del periodo mensual, el sistema emite el reporte de uso junto a la factura fiscal CFDI 4.0 por el importe exacto convenido.',
  },
  {
    id: 'faq-2',
    question: '¿Qué cubre exactamente la modificación técnica mensual incluida?',
    answer: 'Cubre cambios de lógica operativa, ajustes de diseño, adición de campos en bases de datos, cambio de endpoints de API o integración de nuevos disparadores de automatización. Si el requerimiento excede la dimensión de 1 módulo (según la evaluación técnica), se cotizará en bloques transparentes de $500 MXN.',
  },
  {
    id: 'faq-3',
    question: '¿Existe penalización por pausar o cancelar el servicio SaaS?',
    answer: 'Cero penalizaciones. Al ser una relación basada en la utilidad entregada, puedes solicitar la migración, descarga o desactivación con 15 días naturales de anticipación al siguiente corte, saldando únicamente el periodo en curso ya transcurrido.',
  },
  {
    id: 'faq-4',
    question: '¿Cómo se brinda el Soporte Crítico 24/7?',
    answer: 'Nuestros sistemas cuentan con agentes de telemetría continuos. Si ocurre un fallo en la nube o caída de un servicio, nuestros ingenieros son notificados automáticamente en segundos, garantizando un tiempo de respuesta de contingencia menor a 15 minutos.',
  },
];

export const TELEMETRY_LOGS = [
  '[14:22:04] Multi-Cloud Mesh: Google Cloud, AWS & Azure synchronizing 32 regional pods.',
  '[14:22:18] Google Cloud Vertex & Cloud Run instances report healthy heartbeat at 9ms.',
  '[14:22:31] AWS Mesh Core & Azure Edge Nodes achieve 99.99% multi-region failover parity.',
  '[14:22:45] Automated failover check successful across all continental cloud zones.',
  '[14:23:02] Storage sync: Redundant backups replicated seamlessly across Google Cloud & AWS S3.',
  '[14:23:19] Dynamic auto-scaling triggered: Provisioned 12 edge worker instances across multi-cloud.',
  '[14:23:41] End-to-end encryption key rotation executed successfully via cloud HSM modules.',
];
