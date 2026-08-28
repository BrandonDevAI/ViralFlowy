import { Flame, Clapperboard, Video, Lightbulb, Target, Wand2 } from 'lucide-react';

const features = [
  {
    icon: Flame,
    title: 'Hooks Virales',
    description: 'Genera hooks irresistibles que detienen el scroll al instante. Fórmulas probadas que capturan la atención en los primeros 3 segundos.',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/[0.08]',
    borderColor: 'border-orange-500/20',
    iconColor: 'text-orange-400',
  },
  {
    icon: Clapperboard,
    title: 'Guiones UGC',
    description: 'Guiones completos con hook, cuerpo y CTA listos para grabar. Estilo natural que conecta con tu audiencia.',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-500/[0.08]',
    borderColor: 'border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: Video,
    title: 'Ideas de Video',
    description: 'Conceptos creativos con instrucciones de grabación paso a paso. Formatos que dominan el algoritmo.',
    color: 'from-cyan-500 to-teal-500',
    bgColor: 'bg-cyan-500/[0.08]',
    borderColor: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Target,
    title: 'CTAs Optimizados',
    description: 'Llamadas a la acción diseñadas para convertir espectadores en seguidores, clientes y fans leales.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/[0.08]',
    borderColor: 'border-green-500/20',
    iconColor: 'text-green-400',
  },
  {
    icon: Lightbulb,
    title: 'Estructura de Video',
    description: 'La fórmula de 30 segundos que usan los creadores top. Hook → Problema → Valor → CTA en el tiempo perfecto.',
    color: 'from-yellow-500 to-amber-500',
    bgColor: 'bg-yellow-500/[0.08]',
    borderColor: 'border-yellow-500/20',
    iconColor: 'text-yellow-400',
  },
  {
    icon: Wand2,
    title: 'Múltiples Estilos',
    description: 'Desde UGC natural hasta storytelling y tendencias virales. Adapta el contenido al formato que mejor funcione.',
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/[0.08] text-purple-300 text-xs font-medium mb-6">
            <Wand2 className="w-3 h-3" />
            <span>Funcionalidades</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Todo lo que necesitas para{' '}
            <span className="text-gradient">dominar</span> las redes
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Herramientas profesionales de generación de contenido diseñadas para creadores, marcas y agencias que quieren resultados reales.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            // extract the base color name like 'orange', 'blue'
            const baseColor = feature.color.split('-')[1];
            
            return (
              <div
                key={feature.title}
                onMouseMove={handleMouseMove}
                className={`group relative p-8 rounded-[24px] border border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-xl hover:border-white/[0.12] transition-all duration-500 animate-fadeInUp overflow-hidden hover:-translate-y-1`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Spotlight effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255,255,255,0.06), transparent 40%)`
                  }}
                />
                
                {/* Subtle colored glow in the background of the card */}
                <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />

                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} border ${feature.borderColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${feature.color} transition-all duration-300">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
