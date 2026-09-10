'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Flame,
  LayoutTemplate,
  Megaphone,
  Sparkles,
  Target,
  TrendingUp,
  Video,
} from 'lucide-react';
import { sounds } from '../../lib/soundFeedback';

type FeatureItem = {
  id: string;
  label: string;
  icon: typeof Flame;
  title: string;
  description: string;
  example: string;
  metric: string;
  tags: string[];
};

const scriptFeatures: FeatureItem[] = [
  {
    id: 'hook',
    label: '01. Gancho visual y verbal',
    icon: Flame,
    title: 'Desmonta los primeros 3 segundos',
    description: 'Extrae el patrón psicológico del gancho original para adaptarlo a tu marca sin repetir el contenido.',
    example: 'Ejemplo: "El error que te hace perder horas cada semana sin darte cuenta..."',
    metric: '+340% retención inicial',
    tags: ['Curiosidad abierta', 'Controversia controlada', 'Antes y después'],
  },
  {
    id: 'retention',
    label: '02. Curva de retención',
    icon: TrendingUp,
    title: 'Mapea los picos de atención',
    description: 'Detecta dónde la audiencia pierde interés y añade open loops para mantenerla mirando hasta el final.',
    example: 'Ejemplo: "Pero antes de enseñarte la solución, mira lo que casi todos hacen mal..."',
    metric: '72% visualización completa',
    tags: ['Open loops', 'Interrupción de patrón', 'Micro-revelaciones'],
  },
  {
    id: 'structure',
    label: '03. Estructura de guión',
    icon: Video,
    title: 'Convierte el análisis en un guión grabable',
    description: 'Ordena qué decir, qué mostrar y qué texto superponer en cada momento del video.',
    example: 'Ejemplo: 0:00 Hook · 0:03 Problema · 0:15 Solución · 0:35 CTA',
    metric: '< 2 min de redacción',
    tags: ['Hook visual', 'Problema empático', 'Solución de valor'],
  },
  {
    id: 'cta',
    label: '04. Cierre y conversión',
    icon: Target,
    title: 'Termina con una acción clara',
    description: 'Genera CTAs pensados para conseguir comentarios, guardados, seguidores o clics.',
    example: 'Ejemplo: "Comenta FLUJO y te envío la plantilla exacta por mensaje."',
    metric: '4.8x más interacción',
    tags: ['Palabra clave', 'Guardado de valor', 'Link de bio'],
  },
];

const campaignFeatures: FeatureItem[] = [
  {
    id: 'offer',
    label: '01. Oferta irresistible',
    icon: Target,
    title: 'Convierte beneficios en una oferta',
    description: 'Organiza precio, beneficios y urgencia en una propuesta que se entiende de un vistazo.',
    example: 'Ejemplo: "$79 hoy · Envío gratis · Garantía de 30 días"',
    metric: 'Oferta lista para publicar',
    tags: ['Precio ancla', 'Beneficios', 'Urgencia'],
  },
  {
    id: 'headline',
    label: '02. Titular de alto CTR',
    icon: Megaphone,
    title: 'Escribe anuncios que detienen el scroll',
    description: 'Crea titulares directos que conectan el problema del cliente con el resultado que busca.',
    example: 'Ejemplo: "Corre más rápido sin castigar tus rodillas."',
    metric: 'Mensaje centrado en conversión',
    tags: ['Beneficio principal', 'Dolor del cliente', 'Lenguaje claro'],
  },
  {
    id: 'copy',
    label: '03. Copy persuasivo',
    icon: LayoutTemplate,
    title: 'Desarrolla el argumento de venta',
    description: 'Explica por qué el producto importa, qué lo diferencia y por qué actuar ahora.',
    example: 'Ejemplo: "Ligereza y soporte para que cada paso se sienta más estable."',
    metric: 'Copy adaptado a tu producto',
    tags: ['Prueba social', 'Diferenciador', 'Objeciones'],
  },
  {
    id: 'channels',
    label: '04. Kit multicanal',
    icon: Sparkles,
    title: 'Adapta una idea para cada plataforma',
    description: 'Obtén variantes listas para Meta y TikTok, con formato, CTA y tono adecuados para cada canal.',
    example: 'Ejemplo: Video corto para TikTok + anuncio directo para Meta.',
    metric: 'Meta y TikTok listos',
    tags: ['Formato vertical', 'Variantes de copy', 'CTA por canal'],
  },
];

function FeaturePanel({
  title,
  description,
  features,
  accent,
  animationClass,
}: {
  title: string;
  description: string;
  features: FeatureItem[];
  accent: 'purple' | 'amber';
  animationClass: string;
}) {
  const [activeId, setActiveId] = useState(features[0].id);
  const active = features.find((feature) => feature.id === activeId) || features[0];
  const ActiveIcon = active.icon;
  const isAmber = accent === 'amber';

  return (
    <div className={`rounded-[28px] border ${isAmber ? 'border-amber-500/20' : 'border-purple-500/20'} bg-[#090910]/90 backdrop-blur-2xl p-5 sm:p-7 shadow-2xl ${animationClass}`}>
      <div className="flex items-start gap-3 pb-5 border-b border-white/[0.08]">
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${isAmber ? 'bg-amber-500/10 text-amber-300 border border-amber-500/25' : 'bg-purple-500/10 text-purple-300 border border-purple-500/25'}`}>
          <ActiveIcon className="w-5 h-5" />
        </div>
        <div>
          <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${isAmber ? 'text-amber-300' : 'text-purple-300'}`}>
            {isAmber ? 'Funcionalidad 2' : 'Funcionalidad 1'}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{title}</h3>
          <p className="text-sm text-gray-400 leading-relaxed mt-2">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-5">
        {features.map((feature) => {
          const Icon = feature.icon;
          const isActive = active.id === feature.id;
          return (
            <button
              key={feature.id}
              type="button"
              onClick={() => {
                sounds.playClick();
                setActiveId(feature.id);
              }}
              className={`text-left p-3 rounded-xl border transition-all duration-300 ${isActive
                ? isAmber
                  ? 'bg-amber-500/[0.1] border-amber-500/40'
                  : 'bg-purple-500/[0.1] border-purple-500/40'
                : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]'}`}
            >
              <span className={`flex items-center gap-2 text-xs font-bold ${isActive ? 'text-white' : 'text-gray-400'}`}>
                <Icon className={`w-3.5 h-3.5 ${isActive ? (isAmber ? 'text-amber-300' : 'text-purple-300') : 'text-gray-500'}`} />
                {feature.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl bg-black/35 border border-white/[0.07] p-5 min-h-[220px] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${isAmber ? 'text-amber-300' : 'text-purple-300'}`}>
              Ejemplo seleccionado
            </span>
            <span className="text-[10px] text-emerald-300 font-mono font-bold text-right">{active.metric}</span>
          </div>
          <h4 className="text-lg font-bold text-white mb-3">{active.title}</h4>
          <p className="text-sm text-gray-300 leading-relaxed">{active.description}</p>
          <p className={`text-sm font-semibold leading-relaxed mt-4 ${isAmber ? 'text-amber-200' : 'text-purple-200'}`}>
            {active.example}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {active.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] text-gray-300">
              <CheckCircle2 className={`w-3.5 h-3.5 ${isAmber ? 'text-amber-400' : 'text-purple-400'}`} />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MainFeatureDeepDive() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-gradient-to-r from-purple-600/[0.05] via-indigo-600/[0.04] to-amber-500/[0.04] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/[0.08] text-purple-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dos motores para crecer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-[1.15]">
            De la idea al contenido que <span className="virales-gradient">convierte</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Explora cada funcionalidad y descubre cómo ViralFlow transforma patrones virales en guiones y campañas listos para publicar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <FeaturePanel
            title="Guiones y Hooks Virales"
            description="Analiza una URL o una idea y conviértela en una estructura clara, retenida y lista para grabar."
            features={scriptFeatures}
            accent="purple"
            animationClass={hasEntered ? 'animate-slide-in-left' : 'opacity-0 -translate-x-8'}
          />
          <FeaturePanel
            title="Campañas Virales"
            description="Construye ofertas, anuncios y mensajes de venta adaptados a cada canal, sin depender de una pieza visual."
            features={campaignFeatures}
            accent="amber"
            animationClass={hasEntered ? 'animate-slide-in-right' : 'opacity-0 translate-x-8'}
          />
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 text-xs sm:text-sm font-mono text-gray-400 flex-wrap">
          <span className="text-purple-400 font-bold">URL / IDEA</span>
          <ArrowRight className="w-4 h-4 text-gray-600" />
          <span className="text-indigo-400 font-bold">ANÁLISIS IA</span>
          <ArrowRight className="w-4 h-4 text-gray-600" />
          <span className="text-amber-400 font-bold">CAMPAÑA</span>
          <ArrowRight className="w-4 h-4 text-gray-600" />
          <span className="text-emerald-400 font-bold">PUBLICA</span>
        </div>
      </div>
    </section>
  );
}
