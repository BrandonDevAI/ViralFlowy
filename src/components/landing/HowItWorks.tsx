import { PenLine, Zap, Rocket, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: PenLine,
    title: 'Describe tu marca',
    description: 'Ingresa tu nicho, producto, audiencia objetivo y el estilo de contenido que deseas. Solo toma 30 segundos.',
    color: 'from-indigo-500 to-blue-500',
    iconColor: 'text-indigo-400',
    details: ['Nicho y audiencia', 'Producto o idea', 'Objetivo y estilo'],
  },
  {
    step: '02',
    icon: Zap,
    title: 'Genera al instante',
    description: 'Nuestro motor analiza miles de fórmulas virales probadas y genera contenido personalizado para tu marca.',
    color: 'from-purple-500 to-pink-500',
    iconColor: 'text-purple-400',
    details: ['Análisis inteligente', 'Fórmulas virales', 'Personalización total'],
  },
  {
    step: '03',
    icon: Rocket,
    title: 'Publica y crece',
    description: 'Copia los hooks, guiones e ideas generados. Graba, publica y observa cómo tu contenido se vuelve viral.',
    color: 'from-pink-500 to-rose-500',
    iconColor: 'text-pink-400',
    details: ['Copia con 1 clic', 'Listo para grabar', 'Resultados reales'],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 relative">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-purple-600/[0.04] blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/[0.08] text-indigo-300 text-xs font-medium mb-6">
            <Zap className="w-3 h-3" />
            <span>Proceso Simple</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Cómo funciona en{' '}
            <span className="text-gradient">3 pasos</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            De la idea al contenido viral en menos de 2 minutos. Sin complicaciones, sin curva de aprendizaje.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative group">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[calc(100%+0.5rem)] w-[calc(100%-5rem)] h-px bg-gradient-to-r from-white/10 to-transparent z-0" />
                )}

                <div className="relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500">
                  {/* Step number */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-mono font-bold text-gray-600 tracking-wider">PASO {step.step}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-5">{step.description}</p>

                  {/* Detail list */}
                  <div className="space-y-2">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${step.iconColor} flex-shrink-0`} />
                        <span className="text-xs text-gray-400">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
