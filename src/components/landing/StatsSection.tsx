'use client';

import React from 'react';
import { TrendingUp, Clock, Layers, FileCode, Smartphone } from 'lucide-react';

const stats = [
  {
    icon: Clock,
    value: '< 2 min',
    label: 'Tiempo promedio',
    sublabel: 'Para generar guiones completos',
    color: 'text-purple-400',
  },
  {
    icon: Layers,
    value: '10+',
    label: 'Variaciones por idea',
    sublabel: 'Múltiples ángulos y ganchos',
    color: 'text-indigo-400',
  },
  {
    icon: FileCode,
    value: '500+',
    label: 'Fórmulas virales',
    sublabel: 'De TikTok, Reels y Shorts',
    color: 'text-blue-400',
  },
  {
    icon: Smartphone,
    value: '4',
    label: 'Formatos integrados',
    sublabel: 'Ideas, URL, Carruseles y Ads',
    color: 'text-emerald-400',
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[32px] border border-white/[0.08] bg-[#0A0A0F]/80 backdrop-blur-xl overflow-hidden shadow-[0_0_80px_rgba(99,102,241,0.05)]">
          {/* Top accent hairline */}
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

          <div className="p-8 sm:p-12 relative">
            <div className="flex items-center justify-center gap-2 mb-10 relative z-10">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-purple-300 font-bold uppercase tracking-[0.2em]">
                Métricas Funcionales del Motor
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center group">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-1.5 font-mono tracking-tight group-hover:text-purple-300 transition-colors">
                      {stat.value}
                    </div>
                    <p className="text-sm text-gray-200 font-bold mb-0.5">{stat.label}</p>
                    <p className="text-xs text-gray-500">{stat.sublabel}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom accent hairline */}
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
