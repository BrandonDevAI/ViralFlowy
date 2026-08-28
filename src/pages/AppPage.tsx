import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, ArrowLeft, Sparkles, LogOut,
  Crown, Gem, Wand2, Link2, Lock,
  ChevronRight, RotateCcw, AlertCircle, LayoutTemplate,
  Megaphone, ImagePlus, Copy, CheckCircle2
} from 'lucide-react';
import type { CompleteVideoOutput, PlanName } from '../types';
import { generateCompleteVideos } from '../data/completeVideoData';
import { replicateViralUrl, type OriginalVideoAnalysis } from '../data/urlReplicator';
import { generateCarousel, type CarouselOutput, type CarouselPlatform } from '../data/carouselGenerator';
import { generateAds, type AdsOutput } from '../data/adsGenerator';
import VideoCard from '../components/VideoCard';
import CarouselPreview from '../components/CarouselPreview';
import { useAuth } from '../context/AuthContext';
import PayPalCheckoutModal from '../components/landing/PayPalCheckoutModal';

type AppMode = 'idea' | 'url' | 'carousel' | 'ads';

const EXAMPLE_IDEAS = [
  'Cómo ganar dinero vendiendo plantillas de Canva',
  'Tips de skincare para hombres que empiezan',
  'Errores que destruyen tu crecimiento en TikTok',
  'Cómo crecer en Instagram desde 0 seguidores',
];

export default function AppPage() {
  const [mode, setMode] = useState<AppMode>('idea');

  // Idea mode state
  const [userIdea, setUserIdea] = useState('');

  // URL mode state
  const [viralUrl, setViralUrl] = useState('');
  const [brandIdea, setBrandIdea] = useState('');
  const [videoContext, setVideoContext] = useState('');

  // Carousel mode state
  const [carouselTopic, setCarouselTopic] = useState('');
  const [carouselPlatform, setCarouselPlatform] = useState<CarouselPlatform>('instagram');
  const [carouselSlides, setCarouselSlides] = useState(7);
  const [carouselOutput, setCarouselOutput] = useState<CarouselOutput | null>(null);

  // Ads mode state
  const [adsDescription, setAdsDescription] = useState('');
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [refImageFile, setRefImageFile] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);
  const [refImagePreview, setRefImagePreview] = useState<string | null>(null);
  const [generateVisual, setGenerateVisual] = useState(false);
  const [adsOutput, setAdsOutput] = useState<AdsOutput | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Shared state
  const [output, setOutput] = useState<CompleteVideoOutput | null>(null);
  const [videoAnalysis, setVideoAnalysis] = useState<OriginalVideoAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutPlanId, setCheckoutPlanId] = useState<PlanName>('creador');
  const [error, setError] = useState<string | null>(null);

  const {
    isLoggedIn, profile, consumeCoin, signOut,
    isLoading: authLoading, openLoginModal,
    hasActiveSubscription, activePlan,
    logGeneration, remainingGenerations, canGenerate,
  } = useAuth();

  const isAdminAccount = profile?.email === 'brandondevnunez@gmail.com' || profile?.email === 'brandodevnunez@gmail.com';
  const isPremium = hasActiveSubscription || profile?.is_pro || isAdminAccount;

  const canUseUrlMode = hasActiveSubscription && activePlan && activePlan.canUseUrl;
  const canUseCarouselMode = hasActiveSubscription && activePlan && activePlan.canUseCarousel;
  const canUseAdsMode = hasActiveSubscription && activePlan && activePlan.canUseAds;

  // ── Generate from idea ──
  const handleGenerateIdea = useCallback(async () => {
    if (!userIdea.trim()) return;
    if (!isLoggedIn) { openLoginModal(); return; }
    if (!canGenerate && !isPremium) {
      setCheckoutPlanId('starter');
      setIsCheckoutModalOpen(true);
      return;
    }
    if (!isPremium) {
      const allowed = await consumeCoin();
      if (!allowed) { setCheckoutPlanId('starter'); setIsCheckoutModalOpen(true); return; }
    }

    setIsLoading(true);
    setOutput(null);
    setVideoAnalysis(null);
    setError(null);

    try {
      const result = await generateCompleteVideos(userIdea);
      logGeneration('idea', userIdea);
      setOutput(result);
      setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch {
      setError('Ocurrió un error generando tu contenido. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, [userIdea, consumeCoin, canGenerate, isPremium, isLoggedIn, openLoginModal, logGeneration]);

  // ── Generate from URL ──
  const handleGenerateUrl = useCallback(async () => {
    if (!viralUrl.trim() || !brandIdea.trim()) return;
    if (!isLoggedIn) { openLoginModal(); return; }
    if (!canUseUrlMode) {
      setCheckoutPlanId('creador');
      setIsCheckoutModalOpen(true);
      return;
    }

    setIsLoading(true);
    setOutput(null);
    setVideoAnalysis(null);
    setError(null);

    try {
      const result = await replicateViralUrl(viralUrl, brandIdea, videoContext || undefined) as CompleteVideoOutput & { originalVideoAnalysis?: OriginalVideoAnalysis };

      if (result.originalVideoAnalysis) {
        setVideoAnalysis(result.originalVideoAnalysis);
      }
      logGeneration('url', viralUrl + ' → ' + brandIdea);
      setOutput(result);
      setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch {
      setError('No se pudo analizar la URL. Verifica que sea un enlace válido e intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, [viralUrl, brandIdea, videoContext, canUseUrlMode, isLoggedIn, openLoginModal, logGeneration]);

  // ── Generate carousel ──
  const handleGenerateCarousel = useCallback(async () => {
    if (!carouselTopic.trim()) return;
    if (!isLoggedIn) { openLoginModal(); return; }
    if (!canUseCarouselMode) {
      setCheckoutPlanId('creador');
      setIsCheckoutModalOpen(true);
      return;
    }
    if (!canGenerate && !isPremium) {
      setCheckoutPlanId('creador');
      setIsCheckoutModalOpen(true);
      return;
    }
    if (!isPremium) {
      const allowed = await consumeCoin();
      if (!allowed) { setCheckoutPlanId('starter'); setIsCheckoutModalOpen(true); return; }
    }
    setIsLoading(true);
    setCarouselOutput(null);
    setError(null);
    try {
      const result = await generateCarousel(carouselTopic, carouselPlatform, carouselSlides);
      logGeneration('carousel', carouselTopic);
      setCarouselOutput(result);
      setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch {
      setError('Error generando el carrusel. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, [carouselTopic, carouselPlatform, carouselSlides, isPremium, isLoggedIn, openLoginModal, consumeCoin, canGenerate, logGeneration, canUseCarouselMode]);

  // ── Generate ads ──
  const handleGenerateAds = useCallback(async () => {
    if (!adsDescription.trim()) return;
    if (!isLoggedIn) { openLoginModal(); return; }
    if (!canUseAdsMode) {
      setCheckoutPlanId('pro');
      setIsCheckoutModalOpen(true);
      return;
    }
    if (!canGenerate && !isPremium) {
      setCheckoutPlanId('pro');
      setIsCheckoutModalOpen(true);
      return;
    }
    if (!isPremium) {
      const allowed = await consumeCoin();
      if (!allowed) { setCheckoutPlanId('starter'); setIsCheckoutModalOpen(true); return; }
    }
    setIsLoading(true);
    setAdsOutput(null);
    setError(null);
    try {
      const result = await generateAds(adsDescription, !!productImageFile, !!refImageFile, generateVisual);
      setAdsOutput(result);
      logGeneration('ads', adsDescription);
      setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch {
      setError('Error generando el flyer y copy. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, [adsDescription, productImageFile, refImageFile, generateVisual, isPremium, isLoggedIn, openLoginModal, consumeCoin, canGenerate, logGeneration, canUseAdsMode]);

  const handleReset = () => {
    setOutput(null);
    setVideoAnalysis(null);
    setCarouselOutput(null);
    setAdsOutput(null);
    setError(null);
    setUserIdea('');
    setViralUrl('');
    setBrandIdea('');
    setVideoContext('');
    setCarouselTopic('');
    setAdsDescription('');
    setProductImageFile(null);
    setRefImageFile(null);
    setProductImagePreview(null);
    setRefImagePreview(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImageFile(file);
      setProductImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRefImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRefImageFile(file);
      setRefImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'idea') handleGenerateIdea();
    else if (mode === 'url') handleGenerateUrl();
    else if (mode === 'carousel') handleGenerateCarousel();
    else handleGenerateAds();
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans">
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-200px] left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-600/[0.07] blur-[120px]" />
        <div className="absolute bottom-[-100px] right-[5%] w-[500px] h-[500px] rounded-full bg-purple-600/[0.06] blur-[100px]" />
      </div>

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05] bg-[#050507]/80 backdrop-blur-2xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              Inicio
            </Link>
            <span className="text-white/10">|</span>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-white text-sm">ViralFlowy</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isPremium && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                {hasActiveSubscription ? <Gem className="w-3 h-3 text-indigo-400" /> : <Crown className="w-3 h-3 text-indigo-400" />}
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wide">
                  {hasActiveSubscription && activePlan ? activePlan.label : 'PRO'}
                </span>
                {hasActiveSubscription && activePlan && activePlan.dailyLimit !== Infinity && (
                  <span className="text-[10px] text-indigo-400/50">· {remainingGenerations} hoy</span>
                )}
              </div>
            )}

            {isLoggedIn && profile ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white">{(profile.name || 'U').charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="text-[11px] font-medium text-gray-300 max-w-[90px] truncate">{profile.name?.split(' ')[0]}</span>
                </div>
                <button
                  onClick={signOut}
                  title="Cerrar sesión"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] hover:bg-red-500/10 hover:border-red-500/20 text-gray-500 hover:text-red-400 transition-all duration-200"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium hidden sm:inline">Salir</span>
                </button>
              </div>
            ) : (
              <button onClick={openLoginModal} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold hover:bg-indigo-500/20 transition-all">
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">

          {/* Hero */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/[0.07] mb-4">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider">
                Motor de contenido viral · IA
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {mode === 'idea'
                ? <>Tu idea → <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">3 videos virales</span></>
                : mode === 'url'
                ? <>URL viral → <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">tu marca</span></>
                : mode === 'carousel'
                ? <>Texto → <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">carrusel pro</span></>
                : <>Tu producto → <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">flyer + copy</span></>
              }
            </h1>
            <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
              {mode === 'idea'
                ? 'Escribe una idea y la IA genera hooks, guiones y CTAs listos para publicar.'
                : mode === 'url'
                ? 'Pega una URL viral y la IA replica su patrón adaptado a tu marca o idea.'
                : mode === 'carousel'
                ? 'Ingresa un tema y la IA diseña un carrusel educativo para tus redes.'
                : 'Sube tu producto y la IA diseña tu flyer y redacta textos para Meta/TikTok Ads.'
              }
            </p>
          </div>

          {/* ── Mode Tabs ── */}
          <div className="flex rounded-xl bg-white/[0.04] border border-white/[0.07] p-1 mb-5">
            <button
              onClick={() => { setMode('idea'); setOutput(null); setVideoAnalysis(null); setCarouselOutput(null); setError(null); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                mode === 'idea' ? 'bg-white/[0.08] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              Idea
            </button>
            <button
              onClick={() => { setMode('url'); setOutput(null); setVideoAnalysis(null); setCarouselOutput(null); setError(null); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                mode === 'url'
                  ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/10 text-white shadow-sm border border-pink-500/20'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              Replicar URL
              {!canUseUrlMode && (
                <span className="flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">
                  <Lock className="w-2 h-2" />Creador
                </span>
              )}
            </button>
            <button
              onClick={() => { setMode('carousel'); setOutput(null); setVideoAnalysis(null); setCarouselOutput(null); setError(null); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                mode === 'carousel'
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-white shadow-sm border border-emerald-500/20'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <LayoutTemplate className="w-3.5 h-3.5" />
              Carrusel
              {!canUseCarouselMode && (
                <span className="flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                  <Lock className="w-2 h-2" />Creador
                </span>
              )}
            </button>
            <button
              onClick={() => { setMode('ads'); setOutput(null); setVideoAnalysis(null); setCarouselOutput(null); setAdsOutput(null); setError(null); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                mode === 'ads'
                  ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 text-white shadow-sm border border-amber-500/20'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Megaphone className="w-3.5 h-3.5" />
              Ads
              {!canUseAdsMode && (
                <span className="flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">
                  <Lock className="w-2 h-2" />Pro
                </span>
              )}
            </button>
          </div>

          {/* ── Input Form ── */}
          <form onSubmit={handleSubmit}>
            <div className="rounded-2xl border border-white/[0.07] bg-[#0c0c12] shadow-2xl shadow-black/40 overflow-hidden">

              {mode === 'idea' && (
                /* ─ Idea Mode ─ */
                <div className="p-5">
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Tu idea de contenido
                  </label>
                  <textarea
                    value={userIdea}
                    onChange={(e) => setUserIdea(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleGenerateIdea(); }}
                    placeholder="Ej: Cómo ganar dinero vendiendo productos digitales..."
                    className="w-full h-24 bg-transparent text-white text-sm placeholder:text-gray-600 focus:outline-none resize-none leading-relaxed"
                  />
                  {!userIdea && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {EXAMPLE_IDEAS.map((ex) => (
                        <button
                          key={ex}
                          type="button"
                          onClick={() => setUserIdea(ex)}
                          className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] text-gray-500 hover:text-gray-300 hover:border-white/[0.15] transition-all duration-200 truncate max-w-[220px]"
                        >
                          {ex}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {mode === 'url' && (
                /* ─ URL Mode ─ */
                <div className="p-5 space-y-4">
                  {!canUseUrlMode && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/[0.07] border border-amber-500/20">
                      <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-amber-300">Función exclusiva — Plan Creador o Pro</p>
                        <p className="text-[11px] text-amber-400/70 mt-0.5">Actualiza tu plan para replicar cualquier video viral.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setCheckoutPlanId('creador'); setIsCheckoutModalOpen(true); }}
                        className="ml-auto text-[11px] font-bold text-amber-300 border border-amber-500/30 px-3 py-1 rounded-lg hover:bg-amber-500/10 transition-colors flex-shrink-0"
                      >
                        Subir plan
                      </button>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      URL del video viral 🔗
                    </label>
                    <input
                      type="url"
                      value={viralUrl}
                      onChange={(e) => setViralUrl(e.target.value)}
                      placeholder="https://www.tiktok.com/@usuario/video/123... o Instagram, YouTube..."
                      disabled={!canUseUrlMode}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    />
                    <p className="text-[10px] text-gray-600 mt-1">
                      Funciona con TikTok, Instagram Reels y YouTube Shorts
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Tu marca o idea 🎯
                    </label>
                    <input
                      type="text"
                      value={brandIdea}
                      onChange={(e) => setBrandIdea(e.target.value)}
                      placeholder="Ej: Mi tienda de ropa, Mi canal de finanzas, Mis cursos de Excel..."
                      disabled={!canUseUrlMode}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      ¿De qué trata el video? <span className="text-gray-600 normal-case font-normal">(opcional pero mejora mucho el resultado)</span>
                    </label>
                    <textarea
                      value={videoContext}
                      onChange={(e) => setVideoContext(e.target.value)}
                      placeholder="Ej: Un creador habla sobre cómo perdió 20 kilos en 3 meses con un método diferente..."
                      disabled={!canUseUrlMode}
                      rows={2}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none disabled:opacity-40 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              )}
              
              {mode === 'carousel' && (
                /* ─ Carousel Mode ─ */
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Tema del carrusel 🎠
                    </label>
                    <textarea
                      value={carouselTopic}
                      onChange={(e) => setCarouselTopic(e.target.value)}
                      placeholder="Ej: Los 6 errores que arruinan tu perfil de Instagram, Cómo ahorrar dinero como freelancer..."
                      rows={2}
                      className="w-full bg-transparent text-white text-sm placeholder:text-gray-600 focus:outline-none resize-none leading-relaxed"
                    />
                  </div>

                  {/* Platform */}
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Plataforma 📱</label>
                    <div className="flex gap-2">
                      {(['instagram', 'linkedin', 'tiktok'] as CarouselPlatform[]).map((p) => (
                        <button key={p} type="button" onClick={() => setCarouselPlatform(p)}
                          className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                            carouselPlatform === p
                              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                              : 'bg-white/[0.03] border-white/[0.08] text-gray-500 hover:text-gray-300'
                          }`}>
                          {p === 'instagram' ? '📸 Instagram' : p === 'linkedin' ? '💼 LinkedIn' : '🎵 TikTok'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Slide count */}
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Número de slides: <span className="text-white font-bold">{carouselSlides}</span>
                    </label>
                    <input type="range" min={5} max={10} value={carouselSlides}
                      onChange={(e) => setCarouselSlides(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-600 mt-0.5">
                      <span>5 slides</span><span>10 slides</span>
                    </div>
                  </div>
                </div>
              )}

              {mode === 'ads' && (
                /* ─ Ads Mode ─ */
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <label
                      className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all cursor-pointer overflow-hidden ${
                        productImagePreview
                          ? 'bg-amber-500/10 border-amber-500/40'
                          : 'bg-white/[0.03] border-white/[0.08] text-gray-400 hover:text-gray-300 hover:bg-white/[0.05]'
                      }`}
                    >
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleProductImageChange} 
                      />
                      {productImagePreview ? (
                        <>
                          <div className="absolute inset-0 bg-black/40 z-10" />
                          <img src={productImagePreview} alt="Producto" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                          <CheckCircle2 className="w-6 h-6 text-amber-400 z-20 drop-shadow-md" />
                          <span className="text-xs font-semibold text-amber-300 z-20 drop-shadow-md">Producto listo</span>
                        </>
                      ) : (
                        <>
                          <ImagePlus className="w-6 h-6" />
                          <span className="text-xs font-semibold">Subir Producto</span>
                          <span className="text-[9px] text-center opacity-70">JPG, PNG (Obligatorio)</span>
                        </>
                      )}
                    </label>

                    <label
                      className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all cursor-pointer overflow-hidden ${
                        refImagePreview
                          ? 'bg-orange-500/10 border-orange-500/40'
                          : 'bg-white/[0.03] border-white/[0.08] text-gray-400 hover:text-gray-300 hover:bg-white/[0.05]'
                      }`}
                    >
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleRefImageChange} 
                      />
                      {refImagePreview ? (
                        <>
                          <div className="absolute inset-0 bg-black/40 z-10" />
                          <img src={refImagePreview} alt="Referencia" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                          <CheckCircle2 className="w-6 h-6 text-orange-400 z-20 drop-shadow-md" />
                          <span className="text-xs font-semibold text-orange-300 z-20 drop-shadow-md">Ref. lista</span>
                        </>
                      ) : (
                        <>
                          <LayoutTemplate className="w-6 h-6" />
                          <span className="text-xs font-semibold">Flyer Referencia</span>
                          <span className="text-[9px] text-center opacity-70">Estilo base (Opcional)</span>
                        </>
                      )}
                    </label>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Describe tu producto y oferta 📢
                      </label>
                      <textarea
                        value={adsDescription}
                        onChange={(e) => setAdsDescription(e.target.value)}
                        placeholder="Ej: Tenis para correr súper ligeros, $50 USD. Quiero un diseño elegante y persuasivo..."
                        rows={3}
                        className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 transition-all resize-none"
                      />
                    </div>
                    
                    {/* Toggle DALL-E */}
                    <label className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] cursor-pointer hover:bg-white/[0.04] transition-colors">
                      <div className="relative flex items-center pt-0.5">
                        <input
                          type="checkbox"
                          checked={generateVisual}
                          onChange={(e) => setGenerateVisual(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-600 text-amber-500 focus:ring-amber-500 focus:ring-offset-gray-900 bg-gray-800"
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <span className="text-sm font-medium text-white flex items-center gap-1.5">
                          <ImagePlus className="w-3.5 h-3.5 text-amber-400" />
                          Generar Flyer Visual con DALL-E 3
                        </span>
                        <span className="text-[11px] text-gray-500 mt-0.5">
                          Actívalo solo cuando estés seguro del texto. (Cuesta ~$0.04 por imagen)
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* ─ Submit bar ─ */}
              <div className="border-t border-white/[0.06] px-5 py-3 flex items-center justify-between">
                <span className="text-[11px] text-gray-600">
                  {isPremium ? '✨ Generaciones ilimitadas' : 'Ctrl+Enter para generar'}
                </span>
                <button
                  type="submit"
                  disabled={isLoading || authLoading || (
                    mode === 'idea' ? !userIdea.trim() :
                    mode === 'url' ? (!viralUrl.trim() || !brandIdea.trim()) :
                    mode === 'carousel' ? !carouselTopic.trim() :
                    !adsDescription.trim()
                  )}
                  className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-sm text-white disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ${
                    mode === 'url'
                      ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 hover:shadow-lg hover:shadow-pink-500/25'
                      : mode === 'carousel'
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:shadow-lg hover:shadow-emerald-500/25'
                      : mode === 'ads'
                      ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:shadow-lg hover:shadow-amber-500/25'
                      : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-indigo-500/25'
                  }`}
                >
                  {isLoading ? (
                    <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Generando...</>
                  ) : mode === 'idea' ? (
                    <><Wand2 className="w-3.5 h-3.5" />Generar videos<ChevronRight className="w-3.5 h-3.5 opacity-70" /></>
                  ) : mode === 'url' ? (
                    <><Link2 className="w-3.5 h-3.5" />Replicar viral<ChevronRight className="w-3.5 h-3.5 opacity-70" /></>
                  ) : mode === 'carousel' ? (
                    <><LayoutTemplate className="w-3.5 h-3.5" />Crear carrusel<ChevronRight className="w-3.5 h-3.5 opacity-70" /></>
                  ) : (
                    <><Megaphone className="w-3.5 h-3.5" />Generar Ad<ChevronRight className="w-3.5 h-3.5 opacity-70" /></>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* ── Error ── */}
          {error && (
            <div className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/[0.08] border border-red-500/20 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* ── Loading ── */}
          {isLoading && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-white/[0.05]" />
                <span className="text-[11px] text-gray-600 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  {mode === 'url' ? 'Analizando el video viral y adaptando...' 
                   : mode === 'ads' ? 'Diseñando el Flyer y redactando el Copy...'
                   : 'Creando tu contenido viral...'}
                </span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>
              {(mode === 'ads' || mode === 'carousel' ? [1] : [1, 2, 3]).map((i) => (
                <div key={i} className="rounded-2xl border border-white/[0.05] bg-[#0c0c12] p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/[0.04] animate-pulse" />
                    <div className="h-4 w-28 rounded-lg bg-white/[0.04] animate-pulse" />
                  </div>
                  <div className="h-4 w-full rounded-lg bg-white/[0.03] animate-pulse" />
                  <div className="h-4 w-3/4 rounded-lg bg-white/[0.03] animate-pulse" />
                  <div className="h-4 w-1/2 rounded-lg bg-white/[0.02] animate-pulse" />
                </div>
              ))}
            </div>
          )}

          {/* ── Results ── */}
          {output && !isLoading && (
            <div id="results" className="mt-8">

              {/* Video analysis card (URL mode only) */}
              {videoAnalysis && (
                <div className="mb-5 p-4 rounded-2xl bg-gradient-to-br from-pink-500/[0.08] to-rose-500/[0.05] border border-pink-500/20">
                  <p className="text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <Link2 className="w-3 h-3" />
                    Análisis del video original
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] text-gray-600 mb-0.5">Plataforma</p>
                      <p className="text-xs text-white font-medium">{videoAnalysis.platform}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-600 mb-0.5">Tipo de Hook</p>
                      <p className="text-xs text-white font-medium">{videoAnalysis.hookType}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[10px] text-gray-600 mb-0.5">Ángulo viral detectado</p>
                      <p className="text-xs text-white font-medium">{videoAnalysis.detectedAngle}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[10px] text-gray-600 mb-0.5">¿Por qué funcionó?</p>
                      <p className="text-xs text-gray-300 leading-relaxed">{videoAnalysis.viralMechanism}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Context chips */}
              <div className="flex flex-wrap gap-2 mb-5 justify-center">
                <span className="text-[11px] px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] text-gray-400">
                  📍 {output.inferredNiche}
                </span>
                <span className="text-[11px] px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] text-gray-400">
                  👥 {output.inferredAudience}
                </span>
                <span className="text-[11px] px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] text-gray-400">
                  🎯 {output.inferredGoal}
                </span>
              </div>

              {/* Video Cards */}
              <div className="space-y-4">
                {output.videos.map((video, index) => (
                  <VideoCard key={video.id} video={video} index={index} />
                ))}
              </div>

              {/* Reset */}
              <div className="mt-8 text-center">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] text-gray-400 hover:text-white text-sm font-medium transition-all duration-200"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Nueva generación
                </button>
              </div>
            </div>
          )}

          {/* ── Carousel Results ── */}
          {carouselOutput && !isLoading && (
            <div id="results" className="mt-8">
              <div className="flex items-center gap-2 mb-5">
                <div className="flex-1 h-px bg-white/[0.05]" />
                <span className="text-[11px] text-gray-600 flex items-center gap-1.5">
                  <LayoutTemplate className="w-3 h-3 text-emerald-400" />
                  {carouselOutput.totalSlides} slides listos para {carouselOutput.platform}
                </span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>
              <CarouselPreview carousel={carouselOutput} />
              <div className="mt-8 text-center">
                <button onClick={handleReset} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] text-gray-400 hover:text-white text-sm font-medium transition-all">
                  <RotateCcw className="w-3.5 h-3.5" />Nuevo carrusel
                </button>
              </div>
            </div>
          )}

          {/* ── Ads Results ── */}
          {adsOutput && !isLoading && (
            <div id="results" className="mt-8">
              <div className="flex items-center gap-2 mb-5">
                <div className="flex-1 h-px bg-white/[0.05]" />
                <span className="text-[11px] text-gray-600 flex items-center gap-1.5">
                  <Megaphone className="w-3 h-3 text-amber-400" />
                  Tu Ad Set está listo para lanzar
                </span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Visual Flyer */}
                <div className="flex flex-col gap-3">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">
                    Visual Generado
                  </p>
                  <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-[#0a0a0f] relative aspect-square flex items-center justify-center">
                    {adsOutput.flyerUrl ? (
                      <>
                        <img 
                          src={adsOutput.flyerUrl} 
                          alt="Flyer generado" 
                          className="w-full h-full object-cover"
                        />
                        <div className="p-3 bg-gradient-to-t from-black to-transparent flex justify-between items-end absolute bottom-0 left-0 right-0">
                           <span className="text-xs font-semibold text-white/90">Alta Conversión</span>
                           <button className="bg-white text-black text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-gray-200">
                             Descargar HD
                           </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-6 opacity-60">
                        <ImagePlus className="w-8 h-8 mx-auto mb-3 opacity-50" />
                        <p className="text-sm font-medium">Generación Visual Omitida</p>
                        <p className="text-xs text-gray-500 mt-1">Activa la opción de DALL-E para crear la imagen publicitaria.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Copywriting */}
                <div className="flex flex-col gap-4">
                  {/* Headlines */}
                  <div>
                     <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1 mb-2">
                      Títulos Ganadores (Headlines)
                    </p>
                    <div className="space-y-2">
                      {adsOutput.headlines.map((headline, idx) => (
                        <div key={idx} className="flex gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors group">
                           <p className="text-sm text-gray-200 flex-1">{headline}</p>
                           <button onClick={() => copyToClipboard(headline, `hl-${idx}`)} className="text-gray-500 hover:text-white transition-colors">
                             {copiedText === `hl-${idx}` ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                           </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Primary Texts */}
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1 mb-2">
                      Textos Principales (Primary Text)
                    </p>
                    <div className="space-y-3">
                      {adsOutput.primaryTexts.map((text, idx) => (
                        <div key={idx} className="flex flex-col gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors group">
                           <p className="text-[13px] text-gray-300 whitespace-pre-wrap leading-relaxed">{text}</p>
                           <div className="flex justify-end">
                             <button onClick={() => copyToClipboard(text, `pt-${idx}`)} className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-gray-500 hover:text-white transition-colors">
                               {copiedText === `pt-${idx}` ? <><CheckCircle2 className="w-3 h-3 text-green-400" />Copiado</> : <><Copy className="w-3 h-3" />Copiar</>}
                             </button>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA & Audience */}
                  <div className="grid grid-cols-2 gap-3">
                     <div className="p-3 rounded-xl bg-amber-500/[0.05] border border-amber-500/10">
                        <p className="text-[10px] text-amber-500/70 uppercase font-bold mb-1">Mejor Botón CTA</p>
                        <p className="text-sm font-semibold text-amber-100">{adsOutput.cta}</p>
                     </div>
                     <div className="p-3 rounded-xl bg-blue-500/[0.05] border border-blue-500/10">
                        <p className="text-[10px] text-blue-500/70 uppercase font-bold mb-1">Audiencia Sugerida</p>
                        <p className="text-xs font-medium text-blue-100 leading-snug">{adsOutput.targetAudience}</p>
                     </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button onClick={handleReset} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] text-gray-400 hover:text-white text-sm font-medium transition-all">
                  <RotateCcw className="w-3.5 h-3.5" />Nuevo Ad
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* PayPal Modal */}
      <PayPalCheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        planId={checkoutPlanId}
      />
    </div>
  );
}
