import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'María García',
    role: 'Creadora de contenido · 150K seguidores',
    quote: 'Antes tardaba horas pensando en qué publicar. Ahora genero una semana entera de contenido en 10 minutos. Mis vistas se triplicaron.',
    avatar: 'MG',
    color: 'from-pink-500 to-rose-500',
    rating: 5,
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Founder · E-commerce de skincare',
    quote: 'Los guiones UGC que genera son increíbles. Mi equipo de ads los usa directamente y nuestro ROAS subió un 240%. Herramienta imprescindible.',
    avatar: 'CR',
    color: 'from-indigo-500 to-blue-500',
    rating: 5,
  },
  {
    name: 'Ana Martínez',
    role: 'Social Media Manager · Agencia digital',
    quote: 'Manejo 12 cuentas de clientes y esta herramienta me salvó la vida. Los hooks son adictivos y las ideas de video siempre son frescas.',
    avatar: 'AM',
    color: 'from-purple-500 to-violet-500',
    rating: 5,
  },
  {
    name: 'Diego López',
    role: 'Influencer fitness · 500K seguidores',
    quote: 'Mi engagement subió un 180% usando los hooks de esta herramienta. El contenido se siente natural, no robótico. 100% recomendado.',
    avatar: 'DL',
    color: 'from-emerald-500 to-teal-500',
    rating: 5,
  },
  {
    name: 'Sofía Hernández',
    role: 'Emprendedora · Cursos online',
    quote: 'Pasé de 0 a 50K seguidores en 3 meses usando estas fórmulas. Cada video que hago con estos guiones tiene mínimo 100K vistas.',
    avatar: 'SH',
    color: 'from-amber-500 to-orange-500',
    rating: 5,
  },
  {
    name: 'Roberto Jiménez',
    role: 'Director creativo · Agencia de ads',
    quote: 'La calidad de los CTAs es brutal. Nuestros clientes no pueden creer la velocidad a la que producimos contenido de alto impacto.',
    avatar: 'RJ',
    color: 'from-cyan-500 to-blue-500',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/[0.04] blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-pink-500/20 bg-pink-500/[0.08] text-pink-300 text-xs font-medium mb-6">
            <Star className="w-3 h-3" />
            <span>Testimonios</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Creadores que ya{' '}
            <span className="text-gradient">explotan</span> sus redes
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Miles de creadores y marcas confían en nuestro motor para generar contenido viral todos los días.
          </p>
        </div>

        {/* Testimonials marquee */}
        <div className="relative flex overflow-hidden mt-10" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-6 px-3">
            {[...testimonials, ...testimonials].map((t, index) => (
              <div
                key={`${t.name}-${index}`}
                className="w-[320px] sm:w-[350px] flex-shrink-0 group relative p-7 rounded-[24px] border border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-xl hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-purple-500/10 absolute top-6 right-6" />

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-[15px] text-gray-300 leading-relaxed mb-6">
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                    <span className="text-sm font-bold text-white">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-white">{t.name}</p>
                    <p className="text-[13px] text-purple-400/80 font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
