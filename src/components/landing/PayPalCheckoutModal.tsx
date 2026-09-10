'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Shield, Clock, Gem, Zap, Crown, Tag, CheckCircle2, AlertCircle } from 'lucide-react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import type { PlanName } from '../../types';
import { PLAN_CONFIGS } from '../../types';

interface PayPalCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: PlanName;
}

const PLAN_ICONS: Record<PlanName, typeof Zap> = {
  starter: Zap,
  creador: Crown,
  pro: Gem,
};

const PLAN_PERIOD: Record<PlanName, string> = {
  starter: 'semana',
  creador: 'mes',
  pro: 'año',
};

// Discount codes configuration
// Add your discount codes here. Format: { code: percentage (0-100) }
const VALID_DISCOUNT_CODES: Record<string, { percent: number; label: string }> = {
  'LAUNCH42': { percent: 42, label: 'Oferta de lanzamiento' },
  'VIRALFLOWY20': { percent: 20, label: 'Cupón especial' },
  'WELCOME10': { percent: 10, label: '10% de bienvenida' },
};

export default function PayPalCheckoutModal({ isOpen, onClose, planId }: PayPalCheckoutModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { profile, refreshSubscription } = useAuth();
  const router = useRouter();
  const planConfig = PLAN_CONFIGS[planId];
  const PlanIcon = PLAN_ICONS[planId];

  // Discount code state
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ percent: number; label: string } | null>(null);
  const [discountError, setDiscountError] = useState('');

  const originalPrice = planConfig.price;
  const discountAmount = appliedDiscount ? (originalPrice * appliedDiscount.percent) / 100 : 0;
  const finalPrice = Math.max(0, originalPrice - discountAmount);

  // Reset discount when plan changes
  useEffect(() => {
    setDiscountCode('');
    setAppliedDiscount(null);
    setDiscountError('');
  }, [planId]);

  const handleApplyDiscount = () => {
    const code = discountCode.trim().toUpperCase();
    setDiscountError('');

    if (!code) {
      setDiscountError('Ingresa un código');
      return;
    }

    const discount = VALID_DISCOUNT_CODES[code];
    if (discount) {
      setAppliedDiscount(discount);
      setDiscountError('');
    } else {
      setAppliedDiscount(null);
      setDiscountError('Código no válido');
    }
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
    setDiscountError('');
  };

  // Close on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#0c0c12] shadow-2xl shadow-black/50 overflow-hidden animate-fadeInUp">
        {/* Top gradient line */}
        <div className="h-px bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/[0.06] text-gray-500 hover:text-white transition-all z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <PlanIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Plan {planConfig.label}
              </h2>
              <p className="text-xs text-gray-500">
                Acceso por {planConfig.durationDays} días
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 mb-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Resumen de orden</p>

            {/* Plan price */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-white font-medium">ViralFlowy — {planConfig.label}</p>
                <p className="text-xs text-gray-500">Pago por {PLAN_PERIOD[planId]}</p>
              </div>
              <p className={`text-sm font-semibold ${appliedDiscount ? 'text-gray-500 line-through' : 'text-white'}`}>
                ${originalPrice.toFixed(2)}
              </p>
            </div>

            {/* Discount code input */}
            <div className="border-t border-white/[0.06] pt-3 mb-3">
              {appliedDiscount ? (
                // Show applied discount
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs text-emerald-400 font-medium">{appliedDiscount.label}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">
                      {discountCode.toUpperCase()}
                    </span>
                    <button
                      onClick={handleRemoveDiscount}
                      className="text-xs text-gray-600 hover:text-gray-400 ml-1 transition-colors"
                    >
                      Quitar
                    </button>
                  </div>
                  <span className="text-sm text-emerald-400 font-semibold">
                    -${discountAmount.toFixed(2)}
                  </span>
                </div>
              ) : (
                // Show discount input
                <div>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => { setDiscountCode(e.target.value); setDiscountError(''); }}
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyDiscount()}
                        placeholder="Código de descuento"
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all"
                      />
                    </div>
                    <button
                      onClick={handleApplyDiscount}
                      className="px-4 py-2.5 rounded-lg bg-white/[0.06] border border-white/[0.1] text-white text-xs font-semibold hover:bg-white/[0.1] transition-all"
                    >
                      Aplicar
                    </button>
                  </div>
                  {discountError && (
                    <div className="flex items-center gap-1 mt-1.5 text-red-400">
                      <AlertCircle className="w-3 h-3" />
                      <span className="text-[11px]">{discountError}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Total */}
            <div className="border-t border-white/[0.06] pt-3 flex items-center justify-between">
              <p className="text-sm font-bold text-white">Total</p>
              <p className="text-xl font-extrabold text-white">${finalPrice.toFixed(2)}</p>
            </div>
          </div>

          {/* Plan features quick list */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-5 text-[11px] text-gray-500">
            {planId === 'starter' && (
              <>
                <span>✅ 15 gen/día</span>
                <span>✅ Hooks + guiones</span>
                <span>✅ Desde idea</span>
              </>
            )}
            {planId === 'creador' && (
              <>
                <span>✅ 50 gen/día</span>
                <span>✅ URL viral</span>
                <span>✅ Multi-plataforma</span>
              </>
            )}
            {planId === 'pro' && (
              <>
                <span>✅ Ilimitado</span>
                <span>✅ 500+ fórmulas</span>
                <span>✅ Features exclusivas</span>
              </>
            )}
          </div>

          {/* PayPal Buttons */}
          <div className="relative z-10 min-h-[150px]">
            <PayPalButtons
              key={`${planId}-${finalPrice}`}
              style={{
                layout: 'vertical',
                color: 'blue',
                shape: 'rect',
                label: 'pay'
              }}
              createOrder={(_data, actions) => {
                return actions.order.create({
                  intent: 'CAPTURE',
                  purchase_units: [
                    {
                      description: `ViralFlowy — Plan ${planConfig.label} (${planConfig.durationDays} días)${appliedDiscount ? ` [${discountCode.toUpperCase()}]` : ''}`,
                      amount: {
                        currency_code: 'USD',
                        value: finalPrice.toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={async (_data, actions) => {
                if (!actions.order) return Promise.reject();
                
                try {
                  const details = await actions.order.capture();
                  console.log('Pago exitoso:', details);
                  
                  if (profile?.id) {
                    // Calculate expiration date
                    const now = new Date();
                    const expiresAt = new Date(now.getTime() + planConfig.durationDays * 24 * 60 * 60 * 1000);

                    // Save subscription to database
                    const { error: subError } = await supabase
                      .from('subscriptions')
                      .insert({
                        user_id: profile.id,
                        plan_name: planId,
                        price_paid: finalPrice,
                        currency: 'USD',
                        paypal_order_id: details.id || null,
                        starts_at: now.toISOString(),
                        expires_at: expiresAt.toISOString(),
                        is_active: true,
                      });

                    if (subError) {
                      console.error('Error saving subscription:', subError);
                      throw new Error('No se pudo guardar la suscripción en la base de datos.');
                    }

                    // Also update is_pro in profiles for backward compatibility
                    await supabase
                      .from('profiles')
                      .update({ is_pro: true })
                      .eq('id', profile.id);

                    // Refresh subscription in context
                    await refreshSubscription();
                  }

                  alert(`¡Pago completado! Ahora tienes el plan ${planConfig.label}. ¡A crear contenido viral! 🚀`);
                  onClose();
                  // Use soft navigation to avoid full page reload and losing context
                  setTimeout(() => {
                    router.push('/app');
                  }, 100);
                } catch (error) {
                  console.error('Error capturando el pago:', error);
                  alert('Hubo un error al procesar el pago. Por favor contacta soporte.');
                }
              }}
              onError={(err) => {
                console.error('Error de PayPal:', err);
              }}
            />
          </div>

          {/* Security & guarantee */}
          <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-gray-600">
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-400/50" />
              <span>Pago seguro</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-purple-400/50" />
              <span>30 días de garantía</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
