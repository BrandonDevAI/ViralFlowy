'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  Rocket,
  Play,
  Eye,
  Heart,
  Sparkles,
  Bot,
  Send,
  Check,
  TrendingUp,
  Zap,
  ArrowRight,
  ImagePlus,
  Megaphone,
  ShoppingBag,
  Tag,
  Film,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { sounds } from '../../lib/soundFeedback';

// Dynamically import 3D Hero Scene with SSR disabled for Next.js
const HeroScene = dynamic(() => import('../3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
    </div>
  ),
});

interface HeroLandingProps {
  onGoToApp: () => void;
}

type DemoFeature = 'scripts' | 'campaigns';

/* ------------------------------------------------------------------ */
/*  Hero Interactive Demo with 3D Core Integration & Both Features    */
/* ------------------------------------------------------------------ */
function HeroInteractiveDemo({
  feature,
  setFeature,
  step,
  setStep,
  typing,
}: {
  feature: DemoFeature;
  setFeature: (f: DemoFeature) => void;
  step: number;
  setStep: (s: number) => void;
  typing: string;
}) {
  // Feature 1: Scripts data
  const hookText = '¿Sabías que el 90% de los videos mueren en los primeros 3s? Aquí está el cambio…';
  const guionText = 'INTRO: Tensión visual → HOOK: Patrón psicológico → VALOR: 3 pasos clave → CTA: Cierre magnético';

  // Feature 2: Campaign & Flyer data
  const campaignProduct = {
    name: 'Tenis UltraBoost Pro',
    price: '$79 USD (40% OFF)',
    desc: 'Tenis de alto rendimiento con amortiguación reactiva y malla 100% transpirable.',
    benefits: ['✓ Suela de retorno de energía', '✓ Ultraligeros (210g)', '✓ Envío gratis 24h'],
    headlineAd: 'Corre más rápido sin dolor articular',
    ctaAd: 'Comprar Ahora — 40% OFF',
  };

  return (
    <div className="relative w-full max-w-[500px] mx-auto">
      {/* Outer Glow Halo */}
      <div className="absolute -inset-1.5 rounded-[38px] bg-gradient-to-r from-purple-600/30 via-indigo-600/20 to-blue-600/30 blur-2xl -z-10 opacity-70 animate-pulse-glow" />

      {/* Main SaaS Card */}
      <div className="relative rounded-[32px] border border-white/[0.12] bg-[#07070d]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden p-5 sm:p-7 transition-all duration-500">
        
        {/* Top Header inside card */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 p-0.5 shadow-md">
              <img src="/logo.png" alt="ViralFlowy" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-xs font-black text-white tracking-tight">ViralFlow Engine</span>
              <p className="text-[10px] text-gray-500 font-mono">v2.4 · Dual AI Engine</p>
            </div>
          </div>

          {/* Feature Selector Tabs in Header */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
            <button
              onClick={() => {
                sounds.playClick();
                setFeature('scripts');
                setStep(0);
              }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                feature === 'scripts'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              1. Guiones
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setFeature('campaigns');
                setStep(0);
              }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                feature === 'campaigns'
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              2. Campañas & Flyer
            </button>
          </div>
        </div>

        {/* Integrated 3D Core Viewport */}
        <div className="relative w-full h-36 sm:h-44 rounded-2xl bg-[#040407]/80 border border-white/[0.06] overflow-hidden mb-4 flex items-center justify-center">
          <HeroScene step={step} />
          
          <div className="absolute top-2.5 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 border border-white/[0.08] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
            <span className="text-[9px] font-mono text-purple-200 font-bold uppercase tracking-wider">
              {feature === 'scripts' ? 'MODO 1: GUIONES & HOOKS' : 'MODO 2: CAMPAÑA & FLYER'}
            </span>
          </div>

          <div className="absolute bottom-2 right-3 text-[9px] font-mono text-white/40 uppercase tracking-wider pointer-events-none">
            {step === 0 && 'INPUT ACTIVO'}
            {step === 1 && 'PROCESANDO IA...'}
            {step >= 2 && 'RESULTADOS LISTOS ✓'}
          </div>
        </div>

        {/* ========================================================== */}
        {/*  FEATURE 1: VIRAL SCRIPTS & HOOKS                          */}
        {/* ========================================================== */}
        {feature === 'scripts' && (
          <div className="space-y-3 animate-fadeIn">
            {/* Input URL Box */}
            <div className="relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/[0.08] shadow-inner">
              <Send className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span className="text-xs text-white/90 font-mono truncate flex-1">
                {typing || 'https://tiktok.com/@growth/video/71829...'}
                {step === 0 && <span className="inline-block w-[2px] h-3.5 bg-purple-400 animate-pulse ml-0.5 align-middle" />}
              </span>
            </div>

            {/* Analysis Status */}
            <div className={`flex items-center gap-2 px-1 text-xs transition-all duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-purple-500/20 text-purple-400'}`}>
                {step >= 2 ? <Check className="w-3 h-3" /> : <Bot className={`w-3 h-3 ${step === 1 ? 'animate-spin' : ''}`} />}
              </div>
              <span className="text-[11px] font-medium text-gray-300">
                {step === 0 && 'Pega URL viral o introduce una idea'}
                {step === 1 && 'Analizando ganchos, retención y estructura viral...'}
                {step >= 2 && 'Patrón identificado con 98.4% de afinidad'}
              </span>
            </div>

            {/* AI Output Cards */}
            <div className={`space-y-2.5 pt-1 transition-all duration-500 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-2'}`}>
              {/* Hook card */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-yellow-500/20 relative overflow-hidden">
                <div className="flex items-center gap-1.5 mb-1 text-yellow-400 text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>🔥 Hook Viral Adaptado</span>
                </div>
                <p className="text-xs text-white/95 font-medium leading-relaxed">
                  "{hookText}"
                </p>
              </div>

              {/* Structure card */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-blue-500/20 relative overflow-hidden">
                <div className="flex items-center gap-1.5 mb-1 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                  <TrendingUp className="w-3 h-3" />
                  <span>🎬 Estructura de Retención</span>
                </div>
                <p className="text-[11px] text-gray-300 font-medium leading-relaxed">
                  {guionText}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/*  FEATURE 2: VIRAL CAMPAIGNS & SALES FLYER                   */}
        {/* ========================================================== */}
        {feature === 'campaigns' && (
          <div className="space-y-3 animate-fadeIn">
            {/* Product description & offer */}
            <div className="p-2.5 rounded-xl bg-black/50 border border-white/[0.08] flex flex-col justify-center">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                  Descripción & Oferta:
                </span>
                <p className="text-[11px] text-white/90 font-mono truncate">
                  {typing || `${campaignProduct.name} - ${campaignProduct.price}`}
                  {step === 0 && <span className="inline-block w-[2px] h-3 bg-amber-400 animate-pulse ml-0.5 align-middle" />}
                </p>
                <span className="text-[9px] text-amber-400/80 font-medium mt-0.5">
                  Amortiguación reactiva · Malla transpirable
                </span>
            </div>

            {/* Processing Status */}
            <div className={`flex items-center gap-2 px-1 text-xs transition-all duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {step >= 2 ? <Check className="w-3 h-3" /> : <Bot className={`w-3 h-3 ${step === 1 ? 'animate-spin' : ''}`} />}
              </div>
              <span className="text-[11px] font-medium text-gray-300">
                {step === 0 && 'Describe tu producto y oferta para vender'}
                {step === 1 && 'Optimizando flyer, extrayendo beneficios y redactando ads...'}
                {step >= 2 && '🎨 Flyer de ventas + Kit de Campaña completados'}
              </span>
            </div>

            {/* Generated Campaign Output: Optimized Sales Flyer + Ad Kit */}
            <div className={`grid grid-cols-12 gap-3 pt-1 transition-all duration-500 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-2'}`}>
              
              {/* Sales Flyer Card */}
              <div className="col-span-6 rounded-xl bg-gradient-to-br from-[#121018] to-[#0d0d16] border border-amber-500/30 p-2.5 relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> Flyer Optimizado
                  </span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-bold">
                    40% OFF
                  </span>
                </div>

                {/* Simulated Visual Flyer Layout */}
                <div className="w-full h-16 rounded-lg bg-black/60 border border-white/[0.08] relative overflow-hidden flex items-center justify-center mb-1.5">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                  <div className="text-center z-20">
                    <span className="text-[10px] font-extrabold text-white block">👟 {campaignProduct.name}</span>
                    <span className="text-[11px] font-black text-amber-400 font-mono">$79 USD</span>
                  </div>
                </div>

                {/* Benefits Pill */}
                <div className="space-y-0.5 text-[8px] text-gray-300 font-medium">
                  {campaignProduct.benefits.map((b, i) => (
                    <p key={i} className="truncate">{b}</p>
                  ))}
                </div>

                {/* Flyer CTA */}
                <div className="mt-1.5 pt-1 border-t border-white/[0.08] text-center">
                  <span className="text-[9px] font-black text-white bg-gradient-to-r from-amber-500 to-rose-500 px-2 py-0.5 rounded block">
                    {campaignProduct.ctaAd}
                  </span>
                </div>
              </div>

              {/* Campaign Ad Kit */}
              <div className="col-span-6 rounded-xl bg-white/[0.03] border border-purple-500/20 p-2.5 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1 mb-1.5">
                    <Megaphone className="w-2.5 h-2.5" /> Kit de Campaña
                  </span>
                  
                  {/* Headline Ad */}
                  <div className="mb-2">
                    <span className="text-[8px] font-bold text-gray-500 uppercase block">Titular de Alto CTR</span>
                    <p className="text-[10px] text-white font-semibold leading-tight mt-0.5">
                      "{campaignProduct.headlineAd}"
                    </p>
                  </div>

                  {/* Body Copy */}
                  <div>
                    <span className="text-[8px] font-bold text-gray-500 uppercase block">Copy Persuasivo</span>
                    <p className="text-[9px] text-gray-300 leading-snug line-clamp-2 mt-0.5">
                      {campaignProduct.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-2 pt-1 border-t border-white/[0.06] flex items-center justify-between text-[9px] text-emerald-400 font-semibold">
                  <span>TikTok / Meta Ads</span>
                  <span className="text-white font-bold">ROAS 3.8x</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Metrics */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-blue-400 font-semibold">
              <Eye className="w-3.5 h-3.5" /> 1.2M
            </span>
            <span className="flex items-center gap-1 text-pink-400 font-semibold">
              <Heart className="w-3.5 h-3.5" /> 87K
            </span>
          </div>
          <span className="text-[10px] text-gray-500 font-mono">
            {feature === 'scripts' ? 'Modo: Guiones Virales' : 'Modo: Campañas & Flyer'}
          </span>
        </div>
      </div>

      {/* Floating Badges */}
      <div className="absolute -top-3 -right-3 sm:-right-6 glass-badge animate-float shadow-xl shadow-purple-500/10" style={{ animationDelay: '0s' }}>
        <div className="p-1 rounded-full bg-purple-500/20">
          <Zap className="w-3 h-3 text-purple-400" />
        </div>
        <span className="text-xs font-bold text-white">
          {feature === 'scripts' ? 'Guiones UGC' : 'Flyer de Ventas'}
        </span>
      </div>

      <div className="absolute -bottom-3 -left-3 sm:-left-6 glass-badge animate-float shadow-xl shadow-blue-500/10" style={{ animationDelay: '2s' }}>
        <div className="p-1 rounded-full bg-amber-500/20">
          <Sparkles className="w-3 h-3 text-amber-400" />
        </div>
        <span className="text-xs font-bold text-white">
          {feature === 'scripts' ? 'Fórmulas Virales' : 'Kit de Campaña'}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Hero Section                                                 */
/* ------------------------------------------------------------------ */
export default function HeroLanding({ onGoToApp }: HeroLandingProps) {
  const [feature, setFeature] = useState<DemoFeature>('scripts');
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState('');

  const scriptsInput = 'https://tiktok.com/@growth/video/71829...';
  const campaignsInput = 'Tenis UltraBoost Pro - $79 USD (Envío gratis hoy)';

  // Timed loop: Cycles through Feature 1 (Guiones) -> Feature 2 (Campañas & Flyer)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const currentInput = feature === 'scripts' ? scriptsInput : campaignsInput;

    if (step === 0) {
      let i = 0;
      const typeInterval = setInterval(() => {
        i++;
        setTyping(currentInput.slice(0, i));
        if (i >= currentInput.length) {
          clearInterval(typeInterval);
          timeoutId = setTimeout(() => {
            sounds.playPulse();
            setStep(1);
          }, 800);
        }
      }, 35);
      return () => clearInterval(typeInterval);
    } else if (step === 1) {
      timeoutId = setTimeout(() => {
        sounds.playSuccess();
        setStep(2);
      }, 2400);
    } else if (step === 2) {
      // Hold on the output card, then switch to the next feature!
      timeoutId = setTimeout(() => {
        setStep(0);
        setTyping('');
        // Toggle between Feature 1 (scripts) and Feature 2 (campaigns)
        setFeature((prev) => (prev === 'scripts' ? 'campaigns' : 'scripts'));
      }, 6000);
    }

    return () => clearTimeout(timeoutId);
  }, [step, feature]);

  const handlePrimaryCTA = () => {
    sounds.playClick();
    onGoToApp();
  };

  return (
    <section id="hero" className="relative pt-6 sm:pt-10 pb-16 sm:pb-24 px-6 overflow-hidden">
      {/* Background Lighting Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[750px] rounded-full bg-gradient-to-b from-purple-600/[0.14] via-indigo-600/[0.08] to-transparent blur-[140px] animate-blob" />
        <div className="absolute top-60 right-10 w-[400px] h-[400px] rounded-full bg-blue-500/[0.08] blur-[100px] animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute top-40 left-10 w-[350px] h-[350px] rounded-full bg-purple-500/[0.06] blur-[90px] animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-14">

          {/* ====== LEFT COLUMN — Value & Copy ====== */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/[0.08] text-purple-300 text-xs font-semibold mb-6 animate-fadeInUp">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>IA para ingeniería de contenido viral & campañas de venta</span>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-6 animate-fadeInUp stagger-1">
              Convierte contenido viral y productos en{' '}
              <span className="virales-gradient inline-block">ventas para tu marca</span>.
            </h1>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-200">
                <Film className="w-3.5 h-3.5 text-purple-400" />
                Guiones UGC & Hooks 0-3s
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-200">
                <ImagePlus className="w-3.5 h-3.5 text-amber-400" />
                Flyers de Venta
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-200">
                <Megaphone className="w-3.5 h-3.5 text-blue-400" />
                Kit de Ads con Precio y CTA
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-10 animate-fadeInUp stagger-3">
              <button
                onClick={handlePrimaryCTA}
                id="hero-cta-primary"
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white font-bold text-base hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-[1.03] overflow-hidden w-full sm:w-auto cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Crear mi primer contenido</span>
                <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <a
                href="#features"
                onClick={() => sounds.playClick()}
                id="hero-cta-secondary"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl border border-white/[0.1] bg-white/[0.04] text-white/80 font-medium text-base hover:bg-white/[0.08] hover:border-white/[0.18] transition-all duration-300 w-full sm:w-auto"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                  <Play className="w-3.5 h-3.5 ml-0.5 text-white" />
                </div>
                <span>Ver funcionalidades</span>
              </a>
            </div>

            {/* Quick Functional Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.06] animate-fadeInUp stagger-4 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white font-mono">&lt; 2 min</div>
                <div className="text-[11px] text-gray-500 font-medium">Guiones y Flyers listos</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">100%</div>
                <div className="text-[11px] text-gray-500 font-medium">Oferta lista para vender</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-purple-400 font-mono">500+</div>
                <div className="text-[11px] text-gray-500 font-medium">Fórmulas de conversión</div>
              </div>
            </div>
          </div>

          {/* ====== RIGHT COLUMN — Dual-Feature Interactive 3D Demo ====== */}
          <div className="flex-1 w-full flex justify-center animate-fadeInUp stagger-3">
            <HeroInteractiveDemo
              feature={feature}
              setFeature={setFeature}
              step={step}
              setStep={setStep}
              typing={typing}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
