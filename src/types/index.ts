export interface FormData {
  niche: string;
  product: string;
  audience: string;
  goal: string;
  style: string;
}

export interface Hook {
  id: number;
  text: string;
}

export interface Script {
  id: number;
  hook: string;
  body: string;
  cta: string;
}

export interface VideoIdea {
  id: number;
  concept: string;
  howToRecord: string;
}

export interface ContentOutput {
  hooks: Hook[];
  scripts: Script[];
  videoIdeas: VideoIdea[];
  ctas: string[];
}

// ---- New complete video format ----

export interface VideoStructureStep {
  time: string;
  description: string;
}

export interface CompleteVideo {
  id: number;
  angle: string;
  title: string;
  hook: string;
  script: string;
  structure: VideoStructureStep[];
  cta: string;
  caption: string;
  hashtags: string[];
  recommended?: boolean; // Marks the best video of the batch
}

export interface CompleteVideoOutput {
  videos: CompleteVideo[];
  inferredNiche: string;
  inferredAudience: string;
  inferredGoal: string;
}

// ---- Subscription types ----

export type PlanName = 'starter' | 'creador' | 'pro';

export interface Subscription {
  id: string;
  user_id: string;
  plan_name: PlanName;
  price_paid: number;
  currency: string;
  paypal_order_id: string | null;
  starts_at: string;
  expires_at: string;
  is_active: boolean;
  created_at: string;
}

export interface PlanConfig {
  id: PlanName;
  label: string;
  price: number;
  durationDays: number;
  dailyLimit: number; // Infinity for unlimited
  canUseUrl: boolean;
  canUseCarousel: boolean;
  canUseAds: boolean;
  canUseAllStyles: boolean;
  canSaveHistory: boolean;
  canMultiBrand: boolean;
}

export const PLAN_CONFIGS: Record<PlanName, PlanConfig> = {
  starter: {
    id: 'starter',
    label: 'Starter',
    price: 5,
    durationDays: 7,
    dailyLimit: 15,
    canUseUrl: false,
    canUseCarousel: false,
    canUseAds: false,
    canUseAllStyles: false,
    canSaveHistory: false,
    canMultiBrand: false,
  },
  creador: {
    id: 'creador',
    label: 'Creador',
    price: 10,
    durationDays: 30,
    dailyLimit: 50,
    canUseUrl: true,
    canUseCarousel: true,
    canUseAds: false,
    canUseAllStyles: true,
    canSaveHistory: false,
    canMultiBrand: false,
  },
  pro: {
    id: 'pro',
    label: 'Pro',
    price: 69,
    durationDays: 365,
    dailyLimit: Infinity,
    canUseUrl: true,
    canUseCarousel: true,
    canUseAds: true,
    canUseAllStyles: true,
    canSaveHistory: true,
    canMultiBrand: true,
  },
};
