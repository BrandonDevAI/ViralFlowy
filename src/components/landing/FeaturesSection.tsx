'use client';

import React from 'react';
import { Flame, Clapperboard, Video, Lightbulb, Target, Wand2, Sparkles } from 'lucide-react';
import { sounds } from '../../lib/soundFeedback';

const features = [
  {
    icon: Flame,
    title: 'Hooks Virales',
    description: 'Hooks que capturan atención en los primeros 3 segundos. Genera múltiples variantes según nicho, audiencia, formato y objetivo.',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/[0.08]',
    borderColor: 'border-orange-500/20',
    iconColor: 'text-orange-400',
  },
  {
    icon: Clapperboard,
    title: 'Guiones UGC',
    description: 'Guiones UGC listos para grabar. Hook → problema → historia → producto → CTA con instrucciones visuales de cámara.',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-500/[0.08]',
    borderColor: 'border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: Video,
    title: 'Ideas de Video',
    description: 'Convierte una idea en conceptos concretos de contenido. Obtén formato, ángulo, estructura y dirección de grabación.',
    color: 'from-cyan-500 to-teal-500',
    bgColor: 'bg-cyan-500/[0.08]',
    borderColor: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Target,
    title: 'CTAs Optimizados',
    description: 'CTAs diseñados según el objetivo de conversión: ganar seguidores, disparar comentarios o llevar tráfico a tu tienda.',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/[0.08]',
    borderColor: 'border-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    icon: Lightbulb,
    title: 'Estructura de Video',
    description: 'Construye videos con una estructura clara de principio a fin, evitando puntos ciegos donde los usuarios hacen scroll.',
    color: 'from-yellow-500 to-amber-500',
    bgColor: 'bg-yellow-500/[0.08]',
    borderColor: 'border-yellow-500/20',
    iconColor: 'text-yellow-400',
  },
  {
    icon: Wand2,
    title: 'Múltiples Estilos',
    description: 'Adapta una misma idea a UGC, storytelling, educativo, venta directa y tendencias sin perder la identidad de tu marca.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/[0.08]',
    borderColor: 'border-purple-500/20',
    iconColor: 'text-purple-400',
  },
];

export default function FeaturesSection() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="features" className="py-24 px-6 relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-500/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/[0.08] text-purple-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Capacidades del Motor</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Todo lo que necesitas para <span className="virales-gradient">dominar las redes</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Herramientas precisas de ingeniería de contenido para creadores y marcas que buscan viralidad predecible.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                onMouseMove={handleMouseMove}
                className="group relative p-8 rounded-[24px] border border-white/[0.06] bg-[#090910]/80 backdrop-blur-xl hover:border-white/[0.14] transition-all duration-500 animate-fadeInUp overflow-hidden hover:-translate-y-1.5 shadow-lg flex flex-col justify-between"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Spotlight effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255,255,255,0.06), transparent 40%)`,
                  }}
                />

                {/* Subtle colored glow */}
                <div
                  className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 rounded-2xl ${feature.bgColor} border ${feature.borderColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
