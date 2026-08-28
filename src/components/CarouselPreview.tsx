import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Copy, CheckCircle2, Palette, Lightbulb, Hash, ExternalLink, Download, Loader2 } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import type { CarouselOutput, CarouselSlide } from '../data/carouselGenerator';

interface CarouselPreviewProps {
  carousel: CarouselOutput;
}

const SLIDE_COLORS: Record<string, { bg: string; accent: string; badge: string }> = {
  hook:    { bg: 'from-indigo-900/80 to-purple-900/80', accent: 'text-purple-300', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  content: { bg: 'from-slate-900/80 to-slate-800/80',   accent: 'text-blue-300',   badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  cta:     { bg: 'from-emerald-900/80 to-teal-900/80',  accent: 'text-emerald-300', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
};

const BADGE_LABELS: Record<string, string> = {
  hook: 'Hook',
  content: 'Contenido',
  cta: 'CTA',
};

export default function CarouselPreview({ carousel }: CarouselPreviewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const exportContainerRef = useRef<HTMLDivElement>(null);

  const slide = carousel.slides[currentSlide];
  const colors = SLIDE_COLORS[slide.type];

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = () => {
    const text = carousel.slides
      .map(s => `— SLIDE ${s.id} (${BADGE_LABELS[s.type]}) —\n${s.emoji} ${s.headline}\n${s.body}`)
      .join('\n\n');
    copy(text, 'all');
  };

  const copySlide = (s: CarouselSlide) => {
    copy(`${s.emoji} ${s.headline}\n${s.body}`, `slide-${s.id}`);
  };

  const goTo = (i: number) => {
    if (i >= 0 && i < carousel.slides.length) setCurrentSlide(i);
  };

  const downloadAllSlides = async () => {
    if (!exportContainerRef.current || isDownloading) return;
    setIsDownloading(true);
    
    try {
      const slideElements = exportContainerRef.current.querySelectorAll('.export-slide');
      
      for (let i = 0; i < slideElements.length; i++) {
        const el = slideElements[i] as HTMLElement;
        
        // Use html-to-image instead of html2canvas for better modern CSS support
        const dataUrl = await htmlToImage.toPng(el, {
          quality: 1,
          pixelRatio: 2,
          backgroundColor: '#0c0c12',
          style: { transform: 'scale(1)', transformOrigin: 'top left' } // Ensure no scaling issues
        });
        
        const link = document.createElement('a');
        link.download = `slide-${i + 1}-${carousel.platform}.png`;
        link.href = dataUrl;
        link.click();
        
        await new Promise(r => setTimeout(r, 400));
      }
    } catch (error) {
      console.error('Error downloading slides:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Shared professional slide renderer
  const renderSlide = (s: CarouselSlide, index: number, isExport = false) => {
    const c = SLIDE_COLORS[s.type];
    const isTiktok = carousel.platform === 'tiktok';
    const aspectRatio = isTiktok ? 'aspect-[9/16]' : 'aspect-square';
    
    return (
      <div 
        className={`relative w-full ${aspectRatio} bg-[#0c0c12] overflow-hidden flex flex-col items-center justify-center p-8 text-center`}
      >
        {/* Professional Background Effects */}
        <div className={`absolute inset-0 bg-gradient-to-br ${c.bg} opacity-90`} />
        
        {/* Subtle grid pattern - safe for rendering */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Safe grain effect (image instead of SVG filter to avoid rendering bugs) */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")', backgroundSize: '150px' }} />

        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-white/[0.03] blur-[100px] rounded-[100%] pointer-events-none" />

        {/* Slide badge */}
        <div className={`absolute top-6 left-6 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border shadow-sm backdrop-blur-md ${c.badge} z-10`}>
          {BADGE_LABELS[s.type]}
        </div>

        {/* Slide number */}
        <div className="absolute top-6 right-6 text-xs sm:text-sm font-mono font-bold text-white/40 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-md z-10">
          {index + 1}/{carousel.slides.length}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[85%] w-full flex flex-col items-center">
          <div className="text-6xl sm:text-7xl mb-6 drop-shadow-xl z-20" style={{ fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif' }}>{s.emoji}</div>
          <h2 className={`text-3xl sm:text-4xl ${isTiktok ? 'md:text-5xl' : ''} font-extrabold text-white leading-[1.15] mb-5 tracking-tight text-balance drop-shadow-md`}>
            {s.highlightWord
              ? s.headline.split(new RegExp(`(${s.highlightWord})`, 'gi')).map((part, i) => (
                  part.toLowerCase() === s.highlightWord?.toLowerCase()
                    ? <span key={i} className={c.accent}>{part}</span>
                    : <span key={i}>{part}</span>
                ))
              : s.headline
            }
          </h2>
          <p className={`text-base sm:text-lg ${isTiktok ? 'md:text-xl' : ''} font-medium text-white/90 leading-relaxed max-w-sm text-balance drop-shadow`}>
            {s.body}
          </p>
        </div>

        {/* Footer brand mark */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white/20 uppercase tracking-widest z-10">
          Desliza para ver más
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {/* ── Slide counter + copy all ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white">{carousel.totalSlides} slides listos</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-gray-400">
            {carousel.platform}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyAll}
            className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            {copied === 'all' ? (
              <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Copiado</span></>
            ) : (
              <><Copy className="w-3.5 h-3.5" />Copiar texto</>
            )}
          </button>
          
          <button
            onClick={downloadAllSlides}
            disabled={isDownloading}
            className="flex items-center gap-1.5 text-[11px] font-bold px-4 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <><Loader2 className="w-3.5 h-3.5 animate-spin" />Descargando...</>
            ) : (
              <><Download className="w-3.5 h-3.5" />Descargar Imágenes</>
            )}
          </button>
        </div>
      </div>

      {/* ── Hidden export container ── */}
      <div className="absolute opacity-0 pointer-events-none z-[-100] left-0 top-0 overflow-hidden" ref={exportContainerRef}>
        <div className="w-[1080px] space-y-4">
          {carousel.slides.map((s, i) => (
            <div key={s.id} className="export-slide w-full">
              {renderSlide(s, i, true)}
            </div>
          ))}
        </div>
      </div>

      {/* ── Phone mockup ── */}
      <div className="flex items-center gap-4">
        {/* Prev button */}
        <button
          onClick={() => goTo(currentSlide - 1)}
          disabled={currentSlide === 0}
          className="flex-shrink-0 w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.1] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Slide card — Instagram square ratio */}
        <div className="flex-1 max-w-[400px]">
          <div className="rounded-2xl border border-white/[0.1] shadow-2xl shadow-black/50 overflow-hidden relative">
            {renderSlide(slide, currentSlide)}
            
            {/* Navigation Dots (overlay) */}
            <div className="absolute bottom-12 w-full flex items-center justify-center gap-1.5 z-20">
              {carousel.slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={() => goTo(currentSlide + 1)}
          disabled={currentSlide === carousel.slides.length - 1}
          className="flex-shrink-0 w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.1] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ── Copy current slide ── */}
      <button
        onClick={() => copySlide(slide)}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] text-gray-400 hover:text-white text-sm font-medium transition-all"
      >
        {copied === `slide-${slide.id}` ? (
          <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Slide {slide.id} copiado</span></>
        ) : (
          <><Copy className="w-3.5 h-3.5" />Copiar slide {slide.id}</>
        )}
      </button>

      {/* ── All slides text list ── */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#0c0c12] overflow-hidden">
        <div className="px-4 py-3 border-b border-white/[0.06]">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Todos los slides</p>
        </div>
        <div className="divide-y divide-white/[0.05]">
          {carousel.slides.map((s, i) => (
            <div
              key={s.id}
              onClick={() => setCurrentSlide(i)}
              className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors ${
                i === currentSlide ? 'bg-white/[0.05]' : 'hover:bg-white/[0.03]'
              }`}
            >
              <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                i === currentSlide ? 'bg-indigo-500 text-white' : 'bg-white/[0.06] text-gray-500'
              }`}>
                {s.id}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{s.emoji} {s.headline}</p>
                <p className="text-[11px] text-gray-500 truncate">{s.body}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); copySlide(s); }}
                className="flex-shrink-0 p-1 rounded-md text-gray-600 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                {copied === `slide-${s.id}`
                  ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  : <Copy className="w-3.5 h-3.5" />
                }
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Caption + Hashtags ── */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#0c0c12] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.05]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Caption del post</p>
            <button onClick={() => copy(carousel.caption, 'caption')} className="p-1 text-gray-600 hover:text-white transition-colors">
              {copied === 'caption' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed">{carousel.caption}</p>
        </div>

        <div className="px-5 py-4 border-b border-white/[0.05]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Hash className="w-3 h-3" />Hashtags
            </p>
            <button onClick={() => copy(carousel.hashtags.join(' '), 'hashtags')} className="p-1 text-gray-600 hover:text-white transition-colors">
              {copied === 'hashtags' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {carousel.hashtags.map(tag => (
              <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-500/[0.08] border border-indigo-500/[0.15] text-indigo-400 font-medium">{tag}</span>
            ))}
          </div>
        </div>

        {/* Design tips */}
        <div className="px-5 py-4 space-y-3">
          <div className="flex items-start gap-2">
            <Palette className="w-3.5 h-3.5 text-pink-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold text-pink-400 uppercase tracking-wider mb-1">Paleta de colores</p>
              <p className="text-xs text-gray-400">{carousel.colorSuggestion}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">Tip de diseño en Canva</p>
              <p className="text-xs text-gray-400">{carousel.designTip}</p>
            </div>
          </div>
          <a
            href="https://canva.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors mt-1"
          >
            <ExternalLink className="w-3 h-3" />
            Abrir Canva para diseñar →
          </a>
        </div>
      </div>
    </div>
  );
}
