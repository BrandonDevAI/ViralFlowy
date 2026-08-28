import { useState, useEffect, useRef } from 'react';
import { Rocket, Play, Eye, Heart, Sparkles, Bot, Send, Check, TrendingUp } from 'lucide-react';

interface HeroLandingProps {
  onGoToApp: () => void;
}

/* ------------------------------------------------------------------ */
/*  Phone Mockup – simulated AI generation flow                       */
/* ------------------------------------------------------------------ */
function PhoneMockup() {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState('');
  const hookText = '¿Sabías que el 90% de las marcas fallan en TikTok? Aquí te muestro cómo evitarlo…';
  const guionText = 'INTRO: Muestra problema → HOOK visual → 3 puntos clave → CTA irresistible → Cierre emocional';
  const inputUrl = 'https://tiktok.com/@viral/video/712...';

  // Realistic typing animation
  useEffect(() => {
    if (step !== 1) return;
    let i = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      i++;
      setTyping(inputUrl.slice(0, i));
      if (i < inputUrl.length) {
        // Randomize typing speed for a more natural feel
        const nextDelay = 20 + Math.random() * 50; 
        timeoutId = setTimeout(typeNextChar, nextDelay);
      } else {
        timeoutId = setTimeout(() => setStep(2), 500);
      }
    };
    
    timeoutId = setTimeout(typeNextChar, 200);
    return () => clearTimeout(timeoutId);
  }, [step]);

  // Auto-advance steps with smoother timing
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1000),
      setTimeout(() => setStep(2), 4000),
      setTimeout(() => setStep(3), 6000),
      // Loop
      setTimeout(() => { setStep(0); setTyping(''); }, 12000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [step === 0 ? Date.now() : 0]);

  return (
    <div className="phone-mockup-wrapper relative perspective-1000">
      {/* Phone frame */}
      <div className="phone-frame relative mx-auto w-[280px] sm:w-[300px] lg:w-[320px] rounded-[42px] border-[6px] border-[#1a1a24] bg-[#030305] shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_80px_rgba(168,85,247,0.15)] overflow-hidden backdrop-blur-2xl transition-transform duration-700 ease-out">
        
        {/* Screen Glare Effect */}
        <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-80" />
        
        {/* Background ambient light inside screen */}
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-purple-600/[0.15] to-transparent pointer-events-none" />

        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1a24] rounded-b-3xl z-40 flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/20" />
        </div>

        {/* Screen content */}
        <div className="relative pt-10 pb-4 px-4 min-h-[500px] sm:min-h-[540px] flex flex-col z-20">
          {/* Top bar – fake TikTok-style */}
          <div className="flex items-center justify-between px-1 mb-5">
            <span className="text-[11px] text-white/50 font-semibold tracking-wide">9:41</span>
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full border-[1.5px] border-white/40" />
              <div className="w-4 h-2.5 rounded-[3px] bg-white/40" />
            </div>
          </div>

          {/* ViralFlowy badge */}
          <div className="flex items-center gap-2 mb-6 animate-fadeIn">
            <img src="/logo.png" alt="ViralFlowy" className="w-6 h-6 object-contain drop-shadow-md" />
            <span className="text-xs font-black text-white/95 tracking-tight">ViralFlowy</span>
            <span className="ml-auto text-[9px] px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 text-purple-200 font-bold uppercase tracking-wider backdrop-blur-md">
              Modo IA
            </span>
          </div>

          {/* Step 0-1: Input */}
          <div className={`glass-card mb-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 0 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Send className="w-2.5 h-2.5 text-purple-400" />
              </div>
              <span className="text-[11px] text-white/70 font-semibold">URL o idea viral</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] shadow-inner">
              <span className="text-[12px] text-white/90 font-mono truncate flex-1">
                {step >= 1 ? typing : ''}
                {step === 1 && <span className="inline-block w-[2px] h-3.5 bg-purple-400 animate-pulse ml-0.5 align-middle" />}
              </span>
            </div>
          </div>

          {/* Step 2: Processing */}
          <div className={`flex items-center gap-2.5 mb-4 px-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-500 ${step >= 3 ? 'bg-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.3)]'}`}>
              {step >= 3
                ? <Check className="w-3.5 h-3.5 text-green-400" />
                : <Bot className={`w-3.5 h-3.5 text-purple-400 ${step === 2 ? 'animate-spin' : ''}`} />
              }
            </div>
            <span className="text-[11px] text-white/70 font-medium">
              {step >= 3 ? 'Contenido generado con éxito' : 'Analizando patrones virales...'}
            </span>
          </div>

          {/* Step 3: Generated results */}
          <div className={`space-y-3.5 flex-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
            {/* Hook */}
            <div className="glass-card relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 rounded-md bg-yellow-500/20">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                </div>
                <span className="text-[10px] text-yellow-400/90 font-bold uppercase tracking-widest">Hook Viral</span>
              </div>
              <p className="text-[12px] text-white/95 leading-relaxed font-medium">{hookText}</p>
            </div>

            {/* Guion */}
            <div className="glass-card relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 rounded-md bg-blue-500/20">
                  <TrendingUp className="w-3 h-3 text-blue-400" />
                </div>
                <span className="text-[10px] text-blue-400/90 font-bold uppercase tracking-widest">Estructura del Guión</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed font-medium">{guionText}</p>
            </div>

            {/* Fake metrics */}
            <div className="flex items-center justify-between px-2 pt-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[11px] font-bold text-blue-100">1.2M</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-pink-500/10 border border-pink-500/20">
                  <Heart className="w-3.5 h-3.5 text-pink-400" />
                  <span className="text-[11px] font-bold text-pink-100">87K</span>
                </div>
              </div>
              <span className="text-[9px] text-white/30 font-semibold uppercase tracking-wider">Predicción IA</span>
            </div>
          </div>

          {/* Home indicator */}
          <div className="mt-5 mx-auto w-28 h-1.5 rounded-full bg-white/20" />
        </div>
      </div>

      {/* Floating metric badges */}
      <div className="absolute -top-4 -right-2 sm:-right-8 glass-badge animate-float shadow-xl shadow-blue-500/10" style={{ animationDelay: '0s' }}>
        <div className="p-1 rounded-full bg-blue-500/20">
          <Eye className="w-3.5 h-3.5 text-blue-400" />
        </div>
        <span className="text-xs font-extrabold text-white">1.2M views</span>
      </div>

      <div className="absolute top-1/3 -left-6 sm:-left-12 glass-badge animate-float shadow-xl shadow-pink-500/10" style={{ animationDelay: '1.5s' }}>
        <div className="p-1 rounded-full bg-pink-500/20">
          <Heart className="w-3.5 h-3.5 text-pink-400" />
        </div>
        <span className="text-xs font-extrabold text-white">87K likes</span>
      </div>

      <div className="absolute bottom-24 -right-4 sm:-right-10 glass-badge animate-float shadow-xl shadow-yellow-500/10" style={{ animationDelay: '3s' }}>
        <div className="p-1 rounded-full bg-yellow-500/20">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
        </div>
        <span className="text-xs font-extrabold text-white">Creado con IA</span>
      </div>

      {/* Glow behind phone */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[550px] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-blue-500/15 blur-[100px]" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Platform Logos (inline SVG)                                       */
/* ------------------------------------------------------------------ */
function PlatformLogos() {
  return (
    <div className="mt-16 lg:mt-20 animate-fadeInUp stagger-5">
      <p className="text-center text-[11px] text-gray-500 font-medium uppercase tracking-[0.2em] mb-6">
        Optimizado para plataformas líderes
      </p>
      <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8">
        {[
          {
            name: 'TikTok', icon: (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.28 8.28 0 0 0 3.76.97V6.22a4.85 4.85 0 0 1-.01.47z" />
              </svg>
            )
          },
          {
            name: 'Instagram', icon: (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            )
          },
          {
            name: 'YouTube', icon: (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.84.55 9.38.55 9.38.55s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
              </svg>
            )
          },
          {
            name: 'Facebook', icon: (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.33l-.53 3.49h-2.8v8.44C19.61 23.08 24 18.09 24 12.07z" />
              </svg>
            )
          },
        ].map((p) => (
          <div
            key={p.name}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-300 group cursor-default"
          >
            <span className="text-gray-500 group-hover:text-white transition-colors duration-300">{p.icon}</span>
            <span className="text-sm text-gray-500 font-medium group-hover:text-white transition-colors duration-300">
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN HERO                                                         */
/* ------------------------------------------------------------------ */
export default function HeroLanding({ onGoToApp }: HeroLandingProps) {
  // Animate "virales" word glow
  const viralesRef = useRef<HTMLSpanElement>(null);

  return (
    <section id="hero" className="relative pt-8 sm:pt-12 pb-12 sm:pb-20 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full bg-gradient-to-b from-purple-600/[0.12] via-indigo-600/[0.08] to-transparent blur-[120px] animate-blob" />
        <div className="absolute top-60 right-1/4 w-[350px] h-[350px] rounded-full bg-blue-500/[0.08] blur-[80px] animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute top-40 left-1/4 w-[250px] h-[250px] rounded-full bg-purple-500/[0.06] blur-[60px] animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ====== LEFT COLUMN – Text ====== */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/[0.08] text-purple-300 text-xs font-medium mb-8 animate-fadeInUp">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Motor de contenido viral impulsado por IA</span>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6 animate-fadeInUp stagger-1">
              Crea videos{' '}
              <span ref={viralesRef} className="virales-text relative inline-block">
                <span className="virales-gradient">virales</span>
              </span>{' '}
              que generan ventas
              <br />
              <span className="text-gray-400 text-[0.65em]">— en minutos</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed animate-fadeInUp stagger-2">
              Deja de adivinar qué funciona. Usa IA para replicar contenido viral y convertirlo en{' '}
              <span className="text-white font-medium">hooks</span>,{' '}
              <span className="text-white font-medium">guiones</span> y{' '}
              <span className="text-white font-medium">anuncios</span> listos para publicar.
            </p>

            {/* CTAs */}
            <div className="flex flex-col mb-12 animate-fadeInUp stagger-3">
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
                <button
                  onClick={onGoToApp}
                  id="hero-cta-primary"
                  className="group hover-magnetic relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white font-bold text-base hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-[1.04] overflow-hidden"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Crear mi primer video viral</span>
                  <Rocket className="relative w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                </button>

                <button
                  id="hero-cta-secondary"
                  className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl border border-white/[0.1] bg-white/[0.03] text-white/80 font-medium text-base hover:bg-white/[0.07] hover:border-white/[0.18] transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                    <Play className="w-4 h-4 ml-0.5" />
                  </div>
                  Ver cómo funciona (30s)
                </button>
              </div>
              <p className="mt-4 text-[13px] text-gray-500 font-medium flex items-center justify-center lg:justify-start gap-2">
                <span className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-6 h-6 rounded-full border-2 border-[#050507]" />
                  ))}
                </span>
                Únete a +10,000 creadores de contenido
              </p>
            </div>

            {/* Social proof stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-10 animate-fadeInUp stagger-4">
              {[
                { value: '10x', label: 'Más rápido creando contenido', icon: '⚡' },
                { value: '500+', label: 'Plantillas virales', icon: '🎯' },
                { value: '50,000+', label: 'Creadores creciendo', icon: '🚀' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 group">
                  <span className="text-lg">{stat.icon}</span>
                  <div className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-gradient transition-all duration-300">{stat.value}</span>
                    <span className="text-[11px] text-gray-500 font-medium">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ====== RIGHT COLUMN – Phone Mockup ====== */}
          <div className="flex-shrink-0 w-full lg:w-auto flex justify-center animate-fadeInUp stagger-3">
            <PhoneMockup />
          </div>
        </div>

        {/* Platform logos */}
        <PlatformLogos />
      </div>
    </section>
  );
}
