import { useEffect, useRef } from 'react';
import { X, Rocket, Shield, Sparkles, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal() {
  const { showLoginModal, closeLoginModal, signInWithGoogle } = useAuth();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLoginModal();
    };
    if (showLoginModal) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [showLoginModal, closeLoginModal]);

  if (!showLoginModal) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn"
      onClick={(e) => { if (e.target === overlayRef.current) closeLoginModal(); }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0c0c12] shadow-2xl shadow-black/50 overflow-hidden animate-fadeInUp">
        {/* Top gradient line */}
        <div className="h-px bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

        {/* Close button */}
        <button
          onClick={closeLoginModal}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/[0.06] text-gray-500 hover:text-white transition-all z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 shadow-lg shadow-purple-500/25 mb-6">
            <Rocket className="w-7 h-7 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-white mb-2">
            Estás a un paso de crear contenido viral
          </h2>

          {/* Message */}
          <p className="text-sm text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
            Inicia sesión para acceder a tu cuenta y empezar a generar{' '}
            <span className="text-white font-semibold">hooks, guiones y videos</span>{' '}
            con IA en segundos.
          </p>

          {/* Google sign-in button */}
          <button
            onClick={signInWithGoogle}
            className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition-all duration-200 shadow-lg mb-5"
          >
            {/* Google icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continuar con Google
          </button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-5 text-[11px] text-gray-600">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-purple-400/60" />
              <span>Acceso inmediato</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-emerald-400/60" />
              <span>100% seguro</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-blue-400/60" />
              <span>2 min para empezar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
