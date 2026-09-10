'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Rocket, Sparkles, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../lib/soundFeedback';

interface CTAFinalProps {
  onGoToApp: () => void;
}

function MiniCountdown() {
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 45, s: 12 });

  useEffect(() => {
    try {
      const key = 'viralflowy_offer_end';
      const stored = localStorage.getItem(key);
      const target = stored ? parseInt(stored, 10) : Date.now() + 2 * 60 * 60 * 1000;
      if (!stored) localStorage.setItem(key, String(target));

      const tick = () => {
        const diff = Math.max(0, target - Date.now());
        setTimeLeft({
          h: Math.floor(diff / 3600000),
          m: Math.floor((diff % 3600000) / 60000),
          s: Math.floor((diff % 60000) / 1000),
        });
      };
      tick();
      const id = setInterval(tick, 1000);
      return () => clearInterval(id);
    } catch {
      // Fallback
    }
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs sm:text-sm font-medium">
      <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
      <span className="text-yellow-300 font-bold">Oferta 42% OFF</span>
      <span className="text-white/50">finaliza en</span>
      <span className="font-mono font-bold text-white">
        {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
      </span>
    </div>
  );
}

export default function CTAFinal({ onGoToApp }: CTAFinalProps) {
  const handleClick = () => {
    sounds.playClick();
    onGoToApp();
  };

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto relative">
        {/* Background glow */}
        <div className="absolute inset-0 rounded-[36px] bg-gradient-to-r from-purple-600/[0.2] via-indigo-600/[0.15] to-blue-600/[0.2] blur-[80px]" />

        <div className="relative rounded-[36px] border border-white/[0.1] bg-[#08080f]/90 backdrop-blur-2xl overflow-hidden p-8 sm:p-16 text-center shadow-2xl">
          {/* Top gradient hairline */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

          {/* Countdown */}
          <div className="mb-8">
            <MiniCountdown />
          </div>

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 shadow-2xl shadow-purple-500/30 mb-6">
            <Rocket className="w-8 h-8 text-white" />
          </div>

          {/* Headline (design.md exact) */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-[1.15]">
            Tu próxima idea viral <span className="virales-gradient">empieza aquí</span>.
          </h2>

          {/* Subheadline (design.md exact) */}
          <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed">
            Analiza contenido, encuentra el patrón y genera tu próximo guion en minutos.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={handleClick}
              className="group relative inline-flex items-center justify-center gap-2.5 px-10 py-4.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-[1.03] overflow-hidden w-full sm:w-auto cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Crear mi primer contenido</span>
              <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Micro-benefits (design.md exact) */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Sin contratos forzosos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Resultados en menos de 2 minutos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Cancela cuando quieras</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
