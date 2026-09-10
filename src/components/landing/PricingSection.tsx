'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, X, Zap, Crown, Gem, Flame, Shield, Sparkles } from 'lucide-react';
import PayPalCheckoutModal from './PayPalCheckoutModal';
import { useAuth } from '../../context/AuthContext';
import { sounds } from '../../lib/soundFeedback';
import type { PlanName } from '../../types';

interface PricingSectionProps {
  onGoToApp?: () => void;
}

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    badge: 'Para probar',
    price: '$5',
    period: '/semana',
    equivalence: '',
    description: 'Prueba la herramienta sin compromiso. Ideal para generar tus primeros guiones.',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-blue-500/[0.1]',
    borderColor: 'border-white/[0.06]',
    buttonStyle: 'bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.1] hover:border-white/[0.2]',
    buttonText: 'Empezar por $5',
    features: [
      { text: '15 generaciones por día', included: true },
      { text: 'Generar desde idea (texto)', included: true },
      { text: 'Hooks virales adaptados', included: true },
      { text: 'Guiones UGC estructurados', included: true },
      { text: 'Copiar con 1 clic', included: true },
      { text: 'Soporte por email', included: true },
      { text: 'Replicar desde URL viral', included: false },
      { text: 'Generador de carruseles y Ads', included: false },
      { text: 'Multi-plataforma completa', included: false },
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
    description: 'Para creadores y marcas que van en serio y publican constantemente.',
    icon: Crown,
    color: 'from-purple-500 to-indigo-500',
    iconBg: 'bg-purple-500/[0.1]',
    borderColor: 'border-white/[0.06]',
    buttonStyle: 'bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.1] hover:border-white/[0.2]',
    buttonText: 'Elegir Creador',
    features: [
      { text: '50 generaciones por día', included: true },
      { text: 'Generar desde idea + URL viral', included: true },
      { text: 'Hooks virales con análisis psicológico', included: true },
      { text: 'Guiones completos (Hook + Cuerpo + CTA)', included: true },
      { text: 'Generador de carruseles de Instagram', included: true },
      { text: 'Todos los estilos de contenido', included: true },
      { text: 'CTAs optimizados para conversión', included: true },
      { text: 'Títulos y descripciones SEO', included: true },
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
    equivalence: 'Solo $5.75/mes (Pago anual)',
    description: 'Todo ilimitado. El plan definitivo para creadores, marcas y agencias.',
    icon: Gem,
    color: 'from-purple-500 via-indigo-500 to-blue-500',
    iconBg: 'bg-purple-500/[0.1]',
    borderColor: 'border-purple-500/40',
    buttonStyle: 'bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-[1.02]',
    buttonText: 'Obtener Pro — 42% OFF 🔥',
    features: [
      { text: 'Generaciones ILIMITADAS', included: true, highlight: true },
      { text: 'Todo lo del plan Creador incluido', included: true },
      { text: 'Generador de Anuncios y Flyers con IA', included: true, highlight: true },
      { text: '500+ fórmulas virales listas para usar', included: true, highlight: true },
      { text: '+100 hooks visuales para tus videos', included: true, highlight: true },
      { text: 'Guarda hasta 5 marcas o clientes', included: true },
      { text: 'Historial completo de contenido', included: true },
      { text: 'Acceso prioritario a nuevas funciones', included: true },
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
      try {
        const pending = localStorage.getItem('viralflowy_pending_plan');
        if (pending && ['starter', 'creador', 'pro'].includes(pending)) {
          localStorage.removeItem('viralflowy_pending_plan');
          setSelectedPlanId(pending as PlanName);
          setIsModalOpen(true);
        }
      } catch {
        // LocalStorage fallback
      }
    }
  }, [isLoggedIn]);

  const handlePlanClick = (planId: PlanName) => {
    sounds.playClick();
    if (!isLoggedIn) {
      try {
        localStorage.setItem('viralflowy_pending_plan', planId);
      } catch {}
      openLoginModal();
      return;
    }
    setSelectedPlanId(planId);
    setIsModalOpen(true);
  };

  return (
    <section id="pricing" className="py-24 px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-600/[0.06] blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-blue-500/[0.04] blur-[90px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/[0.08] text-purple-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Precios Claros y Transparentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Elige tu plan y empieza a <span className="virales-gradient">crear</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Acceso instantáneo a la plataforma. Sin contratos ni permanencias.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative rounded-[28px] transition-all duration-500 flex flex-col justify-between ${
                  plan.popular
                    ? `bg-[#0c0c14] md:scale-[1.03] z-10 border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20`
                    : `border ${plan.borderColor} bg-[#08080e]/80 backdrop-blur-xl hover:border-white/[0.14]`
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white text-xs font-bold shadow-lg shadow-purple-500/30">
                    <Flame className="w-3.5 h-3.5" />
                    Más Popular — 42% OFF
                  </div>
                )}

                {/* Trial badge */}
                {plan.badge && !plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/[0.1] text-white/70 text-[10px] font-semibold uppercase tracking-wider">
                    {plan.badge}
                  </div>
                )}

                <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Plan header */}
                    <div className="mb-6">
                      <div className={`w-12 h-12 rounded-2xl ${plan.iconBg} border border-white/[0.08] flex items-center justify-center mb-4`}>
                        <Icon className={`w-6 h-6 ${plan.popular ? 'text-purple-400' : 'text-blue-400'}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1.5">{plan.name}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">{plan.description}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-6 pb-6 border-b border-white/[0.06]">
                      <div className="flex items-baseline gap-2">
                        {plan.discount && (
                          <span className="text-lg text-gray-500 line-through font-medium">{plan.discount.original}</span>
                        )}
                        <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">{plan.price}</span>
                        <span className="text-sm text-gray-400">{plan.period}</span>
                      </div>
                      {plan.equivalence && (
                        <p className="text-xs text-purple-400 font-semibold mt-1">{plan.equivalence}</p>
                      )}
                      {plan.discount && (
                        <p className="text-xs text-emerald-400 font-medium mt-1">
                          Ahorras {plan.discount.saved} al año vs. mensual
                        </p>
                      )}
                    </div>

                    {/* Features list */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <div key={feature.text} className="flex items-start gap-2.5">
                          {feature.included ? (
                            <CheckCircle2
                              className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                (feature as any).highlight ? 'text-purple-400' : 'text-emerald-400'
                              }`}
                            />
                          ) : (
                            <X className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-600" />
                          )}
                          <span
                            className={`text-xs sm:text-sm leading-snug ${
                              !feature.included
                                ? 'text-gray-600'
                                : (feature as any).highlight
                                ? 'text-white font-semibold'
                                : 'text-gray-300'
                            }`}
                          >
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePlanClick(plan.id as PlanName)}
                    className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Notice */}
        <div className="flex items-center justify-center gap-2 mt-12 text-gray-400">
          <Shield className="w-4 h-4 text-emerald-400" />
          <p className="text-xs sm:text-sm">
            30 días de garantía de satisfacción · Cancela cuando quieras · Pago seguro cifrado con PayPal
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
