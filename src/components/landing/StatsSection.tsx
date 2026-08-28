import { TrendingUp } from 'lucide-react';

const stats = [
  {
    value: '10x',
    label: 'Más rápido que crear contenido manualmente',
    sublabel: 'Ahorra horas cada semana',
  },
  {
    value: '500+',
    label: 'Plantillas y fórmulas virales',
    sublabel: 'Actualizadas constantemente',
  },
  {
    value: '50K+',
    label: 'Creadores y marcas activas',
    sublabel: 'En más de 30 países',
  },
  {
    value: '2.5M+',
    label: 'Contenidos generados',
    sublabel: 'Y creciendo cada día',
  },
];

export default function StatsSection() {
  return (
    <section className="py-20 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/[0.03] via-purple-600/[0.05] to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="rounded-[32px] border border-white/[0.08] bg-[#0A0A0F]/60 backdrop-blur-xl overflow-hidden shadow-[0_0_80px_rgba(99,102,241,0.05)]">
          {/* Top accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          <div className="p-8 sm:p-14 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_50%)] pointer-events-none" />
            
            <div className="flex items-center justify-center gap-2 mb-12 relative z-10">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <span className="text-xs text-indigo-300 font-bold uppercase tracking-[0.2em]">Resultados comprobados</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 relative z-10">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center animate-fadeInUp group"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-500 mb-3 tracking-tighter drop-shadow-sm group-hover:scale-110">
                    {stat.value}
                  </div>
                  <p className="text-[15px] text-gray-300 font-bold mb-1.5">{stat.label}</p>
                  <p className="text-xs text-gray-500 font-medium">{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
