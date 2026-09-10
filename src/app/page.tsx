'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UrgencyBar from '../components/landing/UrgencyBar';
import LandingHeader from '../components/landing/LandingHeader';
import HeroLanding from '../components/landing/HeroLanding';
import MainFeatureDeepDive from '../components/landing/MainFeatureDeepDive';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorks from '../components/landing/HowItWorks';
import UseCasesSection from '../components/landing/UseCasesSection';
import StatsSection from '../components/landing/StatsSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import PricingSection from '../components/landing/PricingSection';
import FAQSection from '../components/landing/FAQSection';
import FooterLanding from '../components/landing/FooterLanding';
import PayPalCheckoutModal from '../components/landing/PayPalCheckoutModal';
import { useAuth } from '../context/AuthContext';
import type { PlanName } from '../types';

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn, isLoading, hasActiveSubscription, profile } = useAuth();
  const [checkoutPlanId, setCheckoutPlanId] = useState<PlanName | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Automatic redirect if active subscriber
  useEffect(() => {
    if (isLoggedIn && !isLoading) {
      const isAdminTestAccount =
        profile?.email === 'brandondevnunez@gmail.com' ||
        profile?.email === 'brandodevnunez@gmail.com';
      const hasPlan = hasActiveSubscription || isAdminTestAccount || profile?.is_pro;

      if (hasPlan) {
        router.push('/app');
        return;
      }

      // Check if user came from a pending plan selection
      try {
        const pending = localStorage.getItem('viralflowy_pending_plan');
        if (pending && ['starter', 'creador', 'pro'].includes(pending)) {
          localStorage.removeItem('viralflowy_pending_plan');
          setCheckoutPlanId(pending as PlanName);
        } else {
          setCheckoutPlanId('pro');
        }
        setIsCheckoutOpen(true);
      } catch {}
    }
  }, [isLoggedIn, isLoading, hasActiveSubscription, profile, router]);

  const handleGoToApp = () => {
    const isAdminTestAccount =
      profile?.email === 'brandondevnunez@gmail.com' ||
      profile?.email === 'brandodevnunez@gmail.com';
    const hasPlan = hasActiveSubscription || isAdminTestAccount || profile?.is_pro;

    if (!isLoggedIn) {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (!hasPlan) {
      setCheckoutPlanId('pro');
      setIsCheckoutOpen(true);
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      router.push('/app');
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans relative overflow-x-hidden">
      {/* Global Background Lighting Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] rounded-full bg-purple-600/[0.07] blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-600/[0.05] blur-[120px]" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-indigo-500/[0.04] blur-[90px]" />
      </div>

      <div className="relative z-10">
        <UrgencyBar />
        <LandingHeader onGoToApp={handleGoToApp} />
        {/* Spacer for UrgencyBar (41px) + LandingHeader (80px) */}
        <div className="h-[121px]" />
        <HeroLanding onGoToApp={handleGoToApp} />
        <MainFeatureDeepDive />
        <FeaturesSection />
        <HowItWorks />
        <UseCasesSection />
        <StatsSection />
        <TestimonialsSection />
        <PricingSection onGoToApp={handleGoToApp} />
        <FAQSection />
        <FooterLanding />
      </div>

      {/* Checkout Modal */}
      {checkoutPlanId && (
        <PayPalCheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => {
            setIsCheckoutOpen(false);
            setCheckoutPlanId(null);
          }}
          planId={checkoutPlanId}
        />
      )}
    </div>
  );
}
