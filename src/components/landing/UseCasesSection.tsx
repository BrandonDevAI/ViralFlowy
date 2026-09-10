'use client';

import React from 'react';
import { Users, ShoppingBag, Building2, Smartphone, Sparkles, ArrowRight } from 'lucide-react';
import { sounds } from '../../lib/soundFeedback';

interface UseCasesSectionProps {
  onGoToApp?: () => void;
}

export default function UseCasesSection({ onGoToApp }: UseCasesSectionProps) {
  const cases = [
    {
      icon: Users,
      title: 'Creadores de Contenido',
      description: 'Genera ideas y guiones sin pasar horas buscando qué publicar. Mantén una constancia inquebrantable en TikTok, Instagram y Shorts.',
      badge: 'Crecimiento Orgánico',
      accent: 'from-purple-500 to-indigo-500',
      tag: '01',
    },
    {
      icon: Smartphone,
      title: 'Marcas Personales & Coaches',
      description: 'Convierte tu conocimiento y experiencia en conceptos de contenido de alto valor que posicionan tu autoridad y venden tus servicios.',
      badge: 'Autoridad & Leads',
      accent: 'from-blue-500 to-cyan-500',
      tag: '02',
    },
    {
      icon: Building2,
      title: 'Agencias & Media Buyers',
      description: 'Crea múltiples variantes y ángulos de video en minutos para diferentes clientes y campañas de anuncios sin agotar a tu equipo creativo.',
      badge: 'Escalabilidad',
      accent: 'from-indigo-500 to-violet-500',
      tag: '03',
    },
    {
      icon: ShoppingBag,
      title: 'E-commerce & Tiendas Online',
      description: 'Genera hooks y guiones de UGC enfocados en resolver objeciones, demostrar productos y maximizar el ROAS en tus anuncios de pago.',
      badge: 'Ventas Directas',
      accent: 'from-emerald-500 to-teal-500',
      tag: '04',
    },
  ];

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/[0.08] text-purple-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Casos de Uso</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Diseñado para quienes <span className="virales-gradient">viven del contenido</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Ya sea que crees para ti o para tus clientes, ViralFlow acelera tu producción 10x.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative p-8 rounded-[28px] border border-white/[0.06] bg-[#090910]/80 backdrop-blur-xl hover:border-white/[0.14] transition-all duration-500 hover:-translate-y-1.5 shadow-lg overflow-hidden flex flex-col justify-between"
              >
                {/* Accent glow corner */}
                <div
                  className={`absolute -top-12 -right-12 w-36 h-36 rounded-full bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500`}
                />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-gray-400 font-semibold">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs text-purple-400 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Explorar soluciones</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
