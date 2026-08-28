import { useState, useEffect } from 'react';
import { ArrowRight, Rocket, Sparkles, Users, Zap } from 'lucide-react';

interface CTAFinalProps {
  onGoToApp: () => void;
}

function MiniCountdown() {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const key = 'viralflowy_offer_end';
    const stored = localStorage.getItem(key);
    const target = stored ? parseInt(stored, 10) : Date.now() + 2 * 60 * 60 * 1000;

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
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.1] text-sm font-medium">
      <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
      <span className="text-yellow-300 font-bold">42% OFF</span>
      <span className="text-white/50">termina en</span>
      <span className="font-mono font-bold text-white">
        {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
      </span>
    </div>
  );
}

export default function CTAFinal({ onGoToApp }: CTAFinalProps) {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto relative">
        {/* Background glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/[0.15] via-indigo-600/[0.1] to-blue-600/[0.15] blur-[60px]" />

        <div className="relative rounded-3xl border border-white/[0.08] bg-[#0a0a0f]/80 backdrop-blur-xl overflow-hidden">
          {/* Top gradient line */}
          <div className="h-px bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />

          <div className="relative p-10 sm:p-16 text-center">
            {/* Countdown */}
            <div className="mb-8">
              <MiniCountdown />
            </div>

            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 shadow-2xl shadow-purple-500/30 mb-8">
              <Rocket className="w-7 h-7 text-white" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Tu competencia ya crea contenido{' '}
              <span className="virales-gradient">viral con IA</span>
            </h2>

            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
              No te quedes atrás. Aprovecha el 42% OFF y empieza a generar videos virales en minutos.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button
                onClick={onGoToApp}
                className="group relative inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white font-bold text-base hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-[1.04] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Crear mi primer video viral</span>
                <Rocket className="relative w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </button>
            </div>

            {/* Social proof micro */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-yellow-400/60" />
                <span>Sin tarjeta de crédito</span>
              </div>
              <span className="hidden sm:inline text-gray-700">·</span>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-400/60" />
                <span>50,000+ creadores ya lo usan</span>
              </div>
              <span className="hidden sm:inline text-gray-700">·</span>
              <div className="flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-blue-400/60" />
                <span>Resultados en 2 minutos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
