import { useState, useEffect } from 'react';
import { CheckCircle2, X, Zap, Crown, Gem, Flame, Shield } from 'lucide-react';
import PayPalCheckoutModal from './PayPalCheckoutModal';
import { useAuth } from '../../context/AuthContext';
import type { PlanName } from '../../types';

interface PricingSectionProps {
  onGoToApp: () => void;
}

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    badge: 'Para probar',
    price: '$5',
    period: '/semana',
    equivalence: '',
    description: 'Prueba la herramienta sin compromiso. Ideal para ver resultados rápidos.',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-blue-500/[0.1]',
    borderColor: 'border-white/[0.06]',
    buttonStyle: 'bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.1] hover:border-white/[0.2]',
    buttonText: 'Empezar por $5',
    features: [
      { text: '15 generaciones por día', included: true },
      { text: 'Generar desde idea (texto)', included: true },
      { text: 'Hooks virales', included: true },
      { text: 'Guiones básicos', included: true },
      { text: '1 estilo de contenido', included: true },
      { text: 'Copiar con 1 clic', included: true },
      { text: 'Soporte por email', included: true },
      { text: 'Replicar desde URL viral', included: false },
      { text: 'CTAs optimizados', included: false },
      { text: 'Multi-plataforma', included: false },
    ],
    popular: false,
    discount: null,
  },
  {
    id: 'creador',
    name: 'Creador',
    badge: null,
    price: '$10',
    period: '/mes',
    equivalence: '',
    description: 'Para creadores que van en serio y quieren escalar su contenido.',
    icon: Crown,
    color: 'from-purple-500 to-indigo-500',
    iconBg: 'bg-purple-500/[0.1]',
    borderColor: 'border-white/[0.06]',
    buttonStyle: 'bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.1] hover:border-white/[0.2]',
    buttonText: 'Elegir Creador',
    features: [
      { text: '50 generaciones por día', included: true },
      { text: 'Generar desde idea + URL viral', included: true },
      { text: 'Hooks virales', included: true },
      { text: 'Guiones completos (Hook + Cuerpo + CTA)', included: true },
      { text: 'Todos los estilos de contenido', included: true },
      { text: 'CTAs optimizados para conversión', included: true },
      { text: 'Títulos y descripciones SEO', included: true },
      { text: 'Multi-plataforma (TikTok, IG, YT, FB)', included: true },
      { text: 'Soporte prioritario', included: true },
      { text: 'Generaciones ilimitadas', included: false },
    ],
    popular: false,
    discount: null,
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'Mejor valor',
    price: '$69',
    period: '/año',
    equivalence: 'Solo $5.75/mes',
    description: 'Todo ilimitado. El plan definitivo para creadores y marcas.',
    icon: Gem,
    color: 'from-purple-500 via-indigo-500 to-blue-500',
    iconBg: 'bg-purple-500/[0.1]',
    borderColor: 'border-purple-500/30',
    buttonStyle: 'bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-[1.02]',
    buttonText: 'Obtener Pro — 42% OFF 🔥',
    features: [
      { text: 'Generaciones ILIMITADAS', included: true, highlight: true },
      { text: 'Todo lo del plan Creador', included: true },
      { text: '500+ fórmulas virales listas para usar', included: true, highlight: true },
      { text: '+100 hooks visuales para tus videos', included: true, highlight: true },
      { text: 'Guarda hasta 5 marcas o clientes', included: true },
      { text: 'Tu contenido guardado para siempre', included: true },
      { text: 'Acceso anticipado a nuevas funciones', included: true },
      { text: 'Licencia de uso comercial', included: true },
      { text: 'Soporte prioritario 24/7', included: true },
    ],
    popular: true,
    discount: { original: '$120', saved: '$51' },
  },
];

export default function PricingSection({ onGoToApp: _onGoToApp }: PricingSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<PlanName | null>(null);
  const { isLoggedIn, openLoginModal } = useAuth();

  // Auto-open checkout modal after login if a plan was pending
  useEffect(() => {
    if (isLoggedIn) {
      const pending = localStorage.getItem('viralflowy_pending_plan');
      if (pending && ['starter', 'creador', 'pro'].includes(pending)) {
        localStorage.removeItem('viralflowy_pending_plan');
        setSelectedPlanId(pending as PlanName);
        setIsModalOpen(true);
      }
    }
  }, [isLoggedIn]);

  const handlePlanClick = (planId: PlanName) => {
    if (!isLoggedIn) {
      // Save which plan they wanted so we open modal after login
      localStorage.setItem('viralflowy_pending_plan', planId);
      openLoginModal();
      return;
    }
    setSelectedPlanId(planId);
    setIsModalOpen(true);
  };

  return (
    <section id="pricing" className="py-24 px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-purple-600/[0.06] blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/[0.04] blur-[80px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/[0.08] text-purple-300 text-xs font-medium mb-6">
            <Gem className="w-3 h-3" />
            <span>Precios simples, sin sorpresas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Elige tu plan y empieza a{' '}
            <span className="virales-gradient">crear</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Desde $5 puedes probar. Pero los creadores que van en serio eligen el plan anual.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto items-start">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl transition-all duration-500 flex flex-col ${
                  plan.popular
                    ? `bg-[#0d0d14] md:scale-[1.05] z-10 before:absolute before:inset-[-2px] before:-z-10 before:rounded-[18px] before:bg-gradient-to-br before:from-purple-600 before:via-indigo-500 before:to-blue-500 before:opacity-80 before:animate-pulse-glow shadow-2xl shadow-purple-500/20`
                    : `border ${plan.borderColor} bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1]`
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white text-xs font-bold shadow-lg shadow-purple-500/30">
                    <Flame className="w-3 h-3" />
                    Más Popular — 42% OFF
                  </div>
                )}

                {/* Trial badge */}
                {plan.badge && !plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/[0.1] text-white/60 text-[10px] font-semibold uppercase tracking-wider">
                    {plan.badge}
                  </div>
                )}

                <div className="p-6 sm:p-7">
                  {/* Plan header */}
                  <div className="mb-5">
                    <div className={`w-11 h-11 rounded-xl ${plan.iconBg} border border-white/[0.06] flex items-center justify-center mb-4`}>
                      <Icon className={`w-5 h-5 ${plan.popular ? 'text-purple-400' : 'text-blue-400'}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      {plan.discount && (
                        <span className="text-lg text-gray-600 line-through font-medium">{plan.discount.original}</span>
                      )}
                      <span className="text-4xl sm:text-5xl font-extrabold text-white">{plan.price}</span>
                      <span className="text-sm text-gray-500">{plan.period}</span>
                    </div>
                    {plan.equivalence && (
                      <p className="text-sm text-purple-400 font-semibold mt-1">{plan.equivalence}</p>
                    )}
                    {plan.discount && (
                      <p className="text-xs text-green-400/80 mt-1">
                        Ahorras {plan.discount.saved} al año vs. plan mensual
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => handlePlanClick(plan.id as PlanName)}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 mb-6 ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                  </button>

                  {/* Features list */}
                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature.text} className="flex items-start gap-2.5">
                        {feature.included ? (
                          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            (feature as any).highlight ? 'text-purple-400' : 'text-emerald-400'
                          }`} />
                        ) : (
                          <X className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-600" />
                        )}
                        <span className={`text-sm leading-snug ${
                          !feature.included
                            ? 'text-gray-600'
                            : (feature as any).highlight
                              ? 'text-white font-semibold'
                              : 'text-gray-400'
                        }`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee */}
        <div className="flex items-center justify-center gap-2 mt-10 text-gray-500">
          <Shield className="w-4 h-4 text-emerald-400/60" />
          <p className="text-xs">
            30 días de garantía de devolución · Cancela cuando quieras · Pago seguro con PayPal
          </p>
        </div>
      </div>
      
      {/* PayPal Checkout Modal */}
      {selectedPlanId && (
        <PayPalCheckoutModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          planId={selectedPlanId}
        />
      )}
    </section>
  );
}
