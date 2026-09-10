'use client';

import React, { useState } from 'react';
import { Sparkles, Send, Bot, Copy, Check, Eye, Heart, Share2, Play, Flame, Film, Target, LayoutTemplate, Megaphone, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../lib/soundFeedback';

export default function ProductDemoSection() {
  const [selectedDemo, setSelectedDemo] = useState<'scripts' | 'campaigns'>('scripts');
  const [copied, setCopied] = useState<string | null>(null);

  const demoData = {
    scripts: {
      type: 'script',
      title: 'Funcionalidad 1: Guiones & Hooks Virales',
      inputSource: 'URL de Video Viral',
      inputUrl: 'https://tiktok.com/@growth_lab/video/7391823901',
      brand: 'Mi marca: Cursos y asesorías de productividad',
      analyzedPatterns: {
        hookScore: '98/100',
        pacing: '120 palabras/min (Alta retención)',
        format: 'Screen recording + Facecam UGC',
      },
      hook: 'Si sigues organizando tus tareas a mano en 2024, estás perdiendo 10 horas cada semana sin darte cuenta…',
      structure: [
        { time: '0:00 - 0:03', label: 'Hook de Tensión', text: 'Muestra pantalla llena de tareas atrasadas con cara de estrés.' },
        { time: '0:03 - 0:15', label: 'El Error Común', text: 'Explica por qué las listas tradicionales saturan tu memoria de trabajo.' },
        { time: '0:15 - 0:35', label: 'La Solución / Sistema', text: 'Muestra el flujo de 3 pasos automatizado en vivo.' },
        { time: '0:35 - 0:45', label: 'CTA', text: 'Comenta "FLUJO" y te envío la plantilla exacta que uso.' },
      ],
      cta: 'Comenta "FLUJO" abajo y te mando el acceso gratis antes de que sea de pago.',
    },
    campaigns: {
      type: 'campaign',
      title: 'Funcionalidad 2: Campañas Virales & Flyer de Ventas',
      inputSource: 'Descripción de Producto y Oferta',
      inputUrl: 'Tenis UltraBoost Pro · $79 USD · Envío gratis 24h',
      brand: 'Producto: Tenis UltraBoost Pro · Precio: $79 USD · Envío 24h gratis',
      analyzedPatterns: {
        hookScore: '99/100 (Optimizado para Conversión)',
        pacing: 'Flyer Publicitario + Copywriting Direct Response',
        format: 'GPT-4o Copywriting Engine',
      },
      productName: 'Tenis UltraBoost Pro',
      price: '$79 USD',
      originalPrice: '$130 USD (40% OFF)',
      benefits: [
        'Suela con amortiguación reactiva',
        'Malla 100% transpirable antirozaduras',
        'Garantía de 30 días y envío gratis',
      ],
      headlineAd: 'Descubre los tenis que eliminan el impacto en tus rodillas al correr.',
      bodyAd: 'Diseñados con ingeniera aeroespacial para darte máxima ligereza (solo 210g) y rebote continuo en cada pisada. Más de 15,000 corredores ya dieron el salto.',
      cta: 'Comprar Ahora — 40% OFF Solo Hoy',
    },
  };

  const active = demoData[selectedDemo];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    sounds.playClick();
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="demo" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/[0.08] text-blue-300 text-xs font-semibold mb-6">
            <Film className="w-3.5 h-3.5" />
            <span>Product Demo en Vivo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Mira lo que ViralFlow <span className="text-gradient">puede hacer</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Explora las dos grandes funcionalidades del motor: <strong>1. Guiones Virales</strong> y <strong>2. Campañas & Flyer de Ventas</strong>.
          </p>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={() => {
                sounds.playClick();
                setSelectedDemo('scripts');
              }}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                selectedDemo === 'scripts'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-xl shadow-purple-500/25 scale-105'
                  : 'bg-white/[0.03] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <Film className="w-4 h-4" />
              1. Guiones & Hooks Virales
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setSelectedDemo('campaigns');
              }}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                selectedDemo === 'campaigns'
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-xl shadow-amber-500/25 scale-105'
                  : 'bg-white/[0.03] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <Megaphone className="w-4 h-4" />
              2. Campañas Virales & Flyer de Ventas
            </button>
          </div>
        </div>

        {/* Interactive SaaS Simulation Interface */}
        <div className="rounded-[32px] border border-white/[0.1] bg-[#07070d]/95 backdrop-blur-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Panel: Input & Engine Status (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-[11px] font-mono text-gray-500 ml-2">ViralFlow Engine // {selectedDemo === 'scripts' ? 'Script Module' : 'Campaign & Flyer Module'}</span>
              </div>

              {/* URL or Idea Box */}
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Entrada Requerida</span>
                    {selectedDemo === 'campaigns' && (
                      <span className="text-[10px] text-amber-400 font-mono font-bold">Oferta lista ✓</span>
                    )}
                  </label>
                  <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08] text-xs font-mono text-white/90">
                    {active.inputUrl}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                    Contexto de Producto / Marca
                  </label>
                  <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08] text-xs font-mono text-purple-300">
                    {active.brand}
                  </div>
                </div>

                {/* Analysis Indicators */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Patrones Detectados
                  </span>
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <span className="text-gray-500">Puntaje de Impacto:</span>
                    <span className="font-bold text-yellow-400">{active.analyzedPatterns.hookScore}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <span className="text-gray-500">Formato del Motor:</span>
                    <span className="font-medium text-white">{active.analyzedPatterns.pacing}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <span className="text-gray-500">Motor de Render:</span>
                    <span className="font-medium text-purple-300">{active.analyzedPatterns.format}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-500">
              <span>IA: GPT-4o</span>
              <span className="text-emerald-400 font-mono">100% Optimizado</span>
            </div>
          </div>

          {/* Right Panel: AI Generated Content Ready (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-[#090912]/80 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {selectedDemo === 'scripts' ? 'Guión & Hooks Listos' : 'Flyer de Ventas & Kit de Campaña Listo'}
                </span>
              </div>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-medium">
                Listo para publicar
              </span>
            </div>

            {/* Content for Scripts */}
            {selectedDemo === 'scripts' && (
              <div className="space-y-4">
                {/* Generated Hook */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-yellow-500/20 group relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5" /> Hook Viral Adaptado
                    </span>
                    <button
                      onClick={() => handleCopy((active as any).hook, 'hook')}
                      className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/[0.05] transition-colors"
                      title="Copiar hook"
                    >
                      {copied === 'hook' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-sm text-white font-medium leading-relaxed">
                    "{(active as any).hook}"
                  </p>
                </div>

                {/* Script Breakdown Structure */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                      <LayoutTemplate className="w-3.5 h-3.5" /> Estructura Segundo a Segundo
                    </span>
                  </div>
                  <div className="space-y-2">
                    {(active as any).structure.map((item: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/[0.04] flex items-start gap-3 text-xs">
                        <span className="font-mono text-purple-400 font-semibold flex-shrink-0 w-20">
                          {item.time}
                        </span>
                        <div className="flex-1">
                          <span className="font-bold text-white block">{item.label}</span>
                          <span className="text-gray-400 text-[11px] leading-snug">{item.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="p-3.5 rounded-xl bg-purple-500/[0.06] border border-purple-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block">CTA de Conversión</span>
                    <p className="text-xs text-gray-200 mt-0.5">{(active as any).cta}</p>
                  </div>
                  <button
                    onClick={() => handleCopy((active as any).cta, 'cta')}
                    className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/[0.05] transition-colors ml-2"
                  >
                    {copied === 'cta' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Content for Campaigns & Sales Flyer */}
            {selectedDemo === 'campaigns' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  
                  {/* Visual Sales Flyer */}
                  <div className="sm:col-span-6 rounded-2xl bg-gradient-to-br from-[#121018] to-[#0d0d16] border border-amber-500/30 p-4 flex flex-col justify-between shadow-xl">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> 🎨 Flyer Optimizado
                        </span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 font-bold">
                          {(active as any).originalPrice}
                        </span>
                      </div>

                      {/* Mockup Preview */}
                      <div className="w-full h-32 rounded-xl bg-black/60 border border-white/[0.08] relative overflow-hidden flex flex-col justify-between p-3 mb-3">
                        <div className="flex justify-between items-start z-10">
                          <span className="text-xs font-black text-white">{(active as any).productName}</span>
                          <span className="text-xs font-mono font-black text-amber-400 bg-black/60 px-2 py-0.5 rounded">{(active as any).price}</span>
                        </div>
                        <div className="space-y-1 z-10">
                          {(active as any).benefits.map((b: string, i: number) => (
                            <div key={i} className="flex items-center gap-1 text-[10px] text-gray-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                              <span className="truncate">{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy((active as any).cta, 'flyer-cta')}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs hover:scale-[1.02] transition-transform"
                    >
                      {(active as any).cta}
                    </button>
                  </div>

                  {/* Ad Copy & Kit */}
                  <div className="sm:col-span-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1 mb-2">
                        <Megaphone className="w-3.5 h-3.5" /> Kit de Campaña
                      </span>
                      
                      {/* Headline */}
                      <div className="mb-3">
                        <span className="text-[10px] font-bold text-gray-500 uppercase block">Titular de Anuncio</span>
                        <p className="text-xs font-bold text-white mt-1">
                          "{(active as any).headlineAd}"
                        </p>
                      </div>

                      {/* Body */}
                      <div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase block">Copy Persuasivo</span>
                        <p className="text-xs text-gray-300 leading-relaxed mt-1">
                          {(active as any).bodyAd}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-emerald-400 font-semibold">
                      <span>Meta & TikTok Ads Ready</span>
                      <button
                        onClick={() => handleCopy(`${(active as any).headlineAd}\n\n${(active as any).bodyAd}\n\nCTA: ${(active as any).cta}`, 'ad-kit')}
                        className="text-xs text-purple-300 hover:text-white flex items-center gap-1"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copiar Kit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
