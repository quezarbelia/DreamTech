export type TabType = 
  | 'inicio-calculadoras'
  | 'invitaciones-digitales'
  | 'planes-precios-saas'
  | 'soluciones-ia'
  | 'como-funciona-contacto';

export interface InvitationAddon {
  id: string;
  name: string;
  shortDesc: string;
  price: number;
  checked: boolean;
}

export interface InvitationTier {
  id: 'basica' | 'plus' | 'premier';
  name: string;
  badge: string;
  price: number;
  description: string;
  features: { text: string; included: boolean; highlight?: boolean }[];
  isPopular?: boolean;
}

export interface SaasType {
  id: string;
  name: string;
  subtitle: string;
  cost: number;
  icon: string;
}

export interface SaasPlanCard {
  id: string;
  tag: string;
  icon: string;
  title: string;
  description: string;
  price: number;
  priceSuffix: string;
  extraNote?: string;
  highlightBadge?: string;
  features: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
