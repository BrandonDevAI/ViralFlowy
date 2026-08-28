import { useState, useEffect } from 'react';
import { Menu, X, Zap, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface LandingHeaderProps {
  onGoToApp: () => void;
}

export default function LandingHeader({ onGoToApp }: LandingHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, signOut, openLoginModal } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Características', href: '#features' },
    { label: 'Cómo Funciona', href: '#how-it-works' },
    { label: 'Precios', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-[41px] left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-[#050507]/95 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/20'
        : 'bg-[#050507]/70 backdrop-blur-md'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="ViralFlowy"
            className="w-16 h-16 object-contain"
          />
          <span className="font-bold text-white text-xl tracking-tight">
            ViralFlowy
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {/* Logout button */}
              <button
                onClick={signOut}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                title="Cerrar sesión"
              >
                Cerrar sesión
              </button>
              <button
                onClick={onGoToApp}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white font-semibold text-xs hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-[1.02]"
              >
                <Zap className="w-3.5 h-3.5" />
                Ir a la App
              </button>
            </>
          ) : (
            <button
              onClick={openLoginModal}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white font-semibold text-xs hover:bg-white/[0.1] transition-all duration-300 hover:scale-[1.02]"
            >
              <LogIn className="w-3.5 h-3.5" />
              Iniciar Sesión
            </button>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/[0.05] text-gray-400 transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#050507]/95 backdrop-blur-2xl">
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all"
              >
                {item.label}
              </a>
            ))}
            
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => { setMobileOpen(false); onGoToApp(); }}
                  className="w-full mt-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white font-semibold text-sm"
                >
                  Ir a la App
                </button>
                <button
                  onClick={() => { setMobileOpen(false); signOut(); }}
                  className="w-full mt-2 px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-red-500/10 text-gray-400 hover:text-red-400 font-semibold text-sm transition-colors"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <button
                onClick={() => { setMobileOpen(false); openLoginModal(); }}
                className="w-full mt-2 px-5 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white font-semibold text-sm"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
