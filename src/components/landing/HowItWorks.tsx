'use client';

import React from 'react';
import { Search, Cpu, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
  {
    step: '01',
    name: 'ANALIZA',
    icon: Search,
    title: 'Pega una URL o idea',
    description: 'Pega una URL viral de TikTok, Instagram, YouTube o introduce una idea que quieras estudiar para tu nicho.',
    color: 'from-blue-500 to-indigo-500',
    iconColor: 'text-blue-400',
    details: ['TikTok / Reels / Shorts / Ads', 'Nicho y audiencia objetivo', 'Objetivo de conversión'],
  },
  {
    step: '02',
    name: 'ENCUENTRA EL PATRÓN',
    icon: Cpu,
    title: 'La IA extrae la fórmula',
    description: 'ViralFlow identifica hooks, ángulos, ritmo de retención y CTAs que hicieron funcionar el contenido original.',
    color: 'from-purple-500 to-pink-500',
    iconColor: 'text-purple-400',
    details: ['Psicología del gancho', 'Curva de retención 0-30s', 'Estructura sin plagio'],
  },
  {
    step: '03',
    name: 'GENERA CONTENIDO',
    icon: Sparkles,
    title: 'Guiones listos para grabar',
    description: 'Obtén múltiples variantes de hooks, guiones completos, indicaciones de grabación y CTAs optimizados para tu marca.',
    color: 'from-emerald-500 to-teal-500',
    iconColor: 'text-emerald-400',
    details: ['Instrucciones de cámara', 'Copia con 1 clic', 'Formato multi-plataforma'],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 relative">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-purple-600/[0.04] blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/[0.08] text-indigo-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Workflow en 3 Pasos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Cómo funciona <span className="virales-gradient">ViralFlow</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            De la idea al contenido viral en menos de 2 minutos. Sin complicaciones, sin curva de aprendizaje.
          </p>
        </div>

        {/* Steps Grid with Animated Connector Line (section 21) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative group flex flex-col">
                {/* Horizontal Connector Line for Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[calc(100%-1rem)] w-8 h-[2px] bg-gradient-to-r from-purple-500/40 to-transparent z-10" />
                )}

                <div className="relative p-7 rounded-[26px] border border-white/[0.06] bg-[#090910]/80 backdrop-blur-xl hover:bg-[#0d0d18] hover:border-white/[0.14] transition-all duration-500 flex-1 flex flex-col justify-between shadow-lg hover:-translate-y-1">
                  <div>
                    {/* Step number and Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-13 h-13 p-3 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-purple-400/80 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                        {step.step} — {step.name}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2.5">{step.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">{step.description}</p>
                  </div>

                  {/* Detail list */}
                  <div className="space-y-2.5 pt-4 border-t border-white/[0.04]">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-2">
                        <CheckCircle2 className={`w-4 h-4 ${step.iconColor} flex-shrink-0`} />
                        <span className="text-xs text-gray-300 font-medium">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual pipeline summary at bottom */}
        <div className="mt-12 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono text-gray-400 flex-wrap">
          <span className="text-blue-400 font-bold">URL / IDEA</span>
          <ArrowRight className="w-4 h-4 text-gray-600" />
          <span className="text-indigo-400 font-bold">AI PATTERNS</span>
          <ArrowRight className="w-4 h-4 text-gray-600" />
          <span className="text-purple-400 font-bold">HOOK & SCRIPT</span>
          <ArrowRight className="w-4 h-4 text-gray-600" />
          <span className="text-emerald-400 font-bold">CONTENT READY</span>
        </div>
      </div>
    </section>
  );
}
