import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UrgencyBar from '../components/landing/UrgencyBar';
import LandingHeader from '../components/landing/LandingHeader';
import HeroLanding from '../components/landing/HeroLanding';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorks from '../components/landing/HowItWorks';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import StatsSection from '../components/landing/StatsSection';
import PricingSection from '../components/landing/PricingSection';
import FAQSection from '../components/landing/FAQSection';
import CTAFinal from '../components/landing/CTAFinal';
import FooterLanding from '../components/landing/FooterLanding';
import PayPalCheckoutModal from '../components/landing/PayPalCheckoutModal';
import { useAuth } from '../context/AuthContext';
import type { PlanName } from '../types';

export default function LandingPage() {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading, hasActiveSubscription, profile } = useAuth();
  const [checkoutPlanId, setCheckoutPlanId] = useState<PlanName | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // After login logic
  useEffect(() => {
    if (isLoggedIn && !isLoading) {
      const isAdminTestAccount = profile?.email === 'brandondevnunez@gmail.com' || profile?.email === 'brandodevnunez@gmail.com';
      const hasPlan = hasActiveSubscription || isAdminTestAccount || profile?.is_pro;

      if (hasPlan) {
        // If they are premium, redirect to /app automatically
        navigate('/app');
        return;
      }

      // If NOT premium, open the checkout modal automatically
      const pending = localStorage.getItem('viralflowy_pending_plan');
      if (pending && ['starter', 'creador', 'pro'].includes(pending)) {
        localStorage.removeItem('viralflowy_pending_plan');
        setCheckoutPlanId(pending as PlanName);
      } else {
        // Default to showing 'pro' plan if they didn't explicitly click one
        setCheckoutPlanId('pro');
      }
      
      setIsCheckoutOpen(true);
      // Scroll to pricing section so they see context
      setTimeout(() => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    }
  }, [isLoggedIn, isLoading, hasActiveSubscription, profile, navigate]);

  const goToApp = () => {
    const isAdminTestAccount = profile?.email === 'brandondevnunez@gmail.com' || profile?.email === 'brandodevnunez@gmail.com';
    const hasPlan = hasActiveSubscription || isAdminTestAccount || profile?.is_pro;
    
    if (!isLoggedIn) {
      // Not logged in -> scroll to pricing so they choose one and login
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (!hasPlan) {
      // Logged in but no plan -> open checkout modal
      setCheckoutPlanId('pro');
      setIsCheckoutOpen(true);
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/app');
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans relative overflow-hidden">
      {/* Global background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] rounded-full bg-purple-600/[0.07] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-600/[0.05] blur-[100px]" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-indigo-500/[0.04] blur-[80px]" />
      </div>

      <div className="relative z-10">
        <UrgencyBar />
        <LandingHeader onGoToApp={goToApp} />
        {/* Spacer for fixed urgency bar (41px) + fixed header (80px) */}
        <div className="h-[121px]" />
        <HeroLanding onGoToApp={goToApp} />
        <FeaturesSection />
        <HowItWorks />
        <StatsSection />
        <TestimonialsSection />
        <PricingSection onGoToApp={goToApp} />
        <FAQSection />
        <CTAFinal onGoToApp={goToApp} />
        <FooterLanding />
      </div>

      {/* PayPal checkout modal (triggered after login from pricing) */}
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
