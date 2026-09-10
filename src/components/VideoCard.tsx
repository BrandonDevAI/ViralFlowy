'use client';

import { useState } from 'react';
import { Copy, CheckCircle2, ChevronDown, Hash } from 'lucide-react';
import type { CompleteVideo } from '../types';

interface VideoCardProps {
  video: CompleteVideo;
  index: number;
}

const ANGLE_STYLES: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  'Storytelling': {
    bg: 'bg-blue-500/[0.07]',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
    dot: 'bg-blue-500',
  },
  'Polémica': {
    bg: 'bg-rose-500/[0.07]',
    border: 'border-rose-500/20',
    text: 'text-rose-400',
    dot: 'bg-rose-500',
  },
  'Curiosidad': {
    bg: 'bg-amber-500/[0.07]',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
    dot: 'bg-amber-500',
  },
};

export default function VideoCard({ video, index }: VideoCardProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = () => {
    const full = [
      `🎬 ${video.title}`,
      ``,
      `📌 HOOK (0–3s):`,
      video.hook,
      ``,
      `📝 GUIÓN:`,
      video.script,
      ``,
      `📣 CTA:`,
      video.cta,
      ``,
      `✍️ CAPTION:`,
      video.caption,
      ``,
      `# HASHTAGS:`,
      video.hashtags.join(' '),
    ].join('\n');
    copy(full, 'all');
  };

  // Get clean angle name (remove emoji prefix)
  const angleName = video.angle.replace(/^\S+\s/, '');
  const styles = ANGLE_STYLES[angleName] || ANGLE_STYLES['Storytelling'];

  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
        video.recommended
          ? 'border-amber-500/40 bg-[#0f0e0a] shadow-lg shadow-amber-500/10 hover:border-amber-500/60'
          : 'border-white/[0.07] bg-[#0c0c12] hover:border-white/[0.12]'
      }`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* ── Recommended banner ── */}
      {video.recommended && (
        <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/20 border-b border-amber-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
          </span>
          <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">
            ⭐ El Más Recomendado — Empieza con este
          </span>
        </div>
      )}
      {/* ── Card header ── */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Index badge */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20 flex-shrink-0">
            {video.id}
          </div>
          {/* Angle tag */}
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${styles.bg} ${styles.border} border ${styles.text} flex items-center gap-1.5`}>
            <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
            {video.angle}
          </span>
        </div>

        {/* Copy all button */}
        <button
          onClick={copyAll}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium text-gray-500 hover:text-white hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-200"
        >
          {copied === 'all' ? (
            <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">¡Copiado!</span></>
          ) : (
            <><Copy className="w-3.5 h-3.5" />Copiar todo</>
          )}
        </button>
      </div>

      {/* ── Title ── */}
      <div className="px-5 pb-4">
        <h3 className="text-base font-bold text-white leading-snug">
          {video.title}
        </h3>
      </div>

      {/* ── Hook — always visible ── */}
      <ContentBlock
        label="HOOK"
        sublabel="0–3s · Lo primero que dicen"
        color={styles.text}
        content={video.hook}
        onCopy={() => copy(video.hook, 'hook')}
        isCopied={copied === 'hook'}
      />

      {/* ── Script — always visible ── */}
      <ContentBlock
        label="GUIÓN"
        sublabel="El cuerpo del video"
        color="text-indigo-400"
        content={video.script}
        onCopy={() => copy(video.script, 'script')}
        isCopied={copied === 'script'}
        multiline
      />

      {/* ── Expand toggle ── */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-3 border-t border-white/[0.05] hover:bg-white/[0.02] transition-colors duration-200"
      >
        <span className="text-[11px] text-gray-600 font-medium uppercase tracking-wider">
          {expanded ? 'Ocultar' : 'Ver CTA · Caption · Hashtags · Estructura'}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* ── Collapsible section ── */}
      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out ${expanded ? 'max-h-[1000px]' : 'max-h-0'}`}
      >
        {/* CTA */}
        <ContentBlock
          label="CTA"
          sublabel="Llamada a la acción"
          color="text-emerald-400"
          content={video.cta}
          onCopy={() => copy(video.cta, 'cta')}
          isCopied={copied === 'cta'}
        />

        {/* Caption */}
        <ContentBlock
          label="CAPTION"
          sublabel="Descripción del post"
          color="text-cyan-400"
          content={video.caption}
          onCopy={() => copy(video.caption, 'caption')}
          isCopied={copied === 'caption'}
        />

        {/* Structure */}
        <div className="px-5 py-4 border-t border-white/[0.05]">
          <p className="text-[10px] font-semibold text-green-400 uppercase tracking-wider mb-3">
            ⏱ Estructura del video
          </p>
          <div className="space-y-2">
            {video.structure.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 text-[10px] font-mono font-bold text-gray-600 bg-white/[0.04] px-2 py-0.5 rounded-md min-w-[46px] text-center mt-0.5">
                  {step.time}
                </span>
                <span className="text-xs text-gray-500 leading-relaxed">{step.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hashtags */}
        <div className="px-5 py-4 border-t border-white/[0.05]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Hash className="w-3 h-3" />
              Hashtags
            </p>
            <button
              onClick={() => copy(video.hashtags.join(' '), 'hashtags')}
              className="text-[10px] flex items-center gap-1 text-gray-600 hover:text-white transition-colors"
            >
              {copied === 'hashtags' ? (
                <><CheckCircle2 className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">Copiado</span></>
              ) : (
                <><Copy className="w-3 h-3" />Copiar</>
              )}
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {video.hashtags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-indigo-500/[0.08] border border-indigo-500/[0.15] text-[11px] text-indigo-400 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Reusable content block ──
function ContentBlock({
  label,
  sublabel,
  color,
  content,
  onCopy,
  isCopied,
  multiline,
}: {
  label: string;
  sublabel: string;
  color: string;
  content: string;
  onCopy: () => void;
  isCopied: boolean;
  multiline?: boolean;
}) {
  return (
    <div className="px-5 py-4 border-t border-white/[0.05]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${color}`}>{label}</span>
          <span className="text-[10px] text-gray-700">· {sublabel}</span>
        </div>
        <button
          onClick={onCopy}
          className="p-1 rounded-md text-gray-600 hover:text-white hover:bg-white/[0.06] transition-all duration-150"
        >
          {isCopied ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
      <p className={`text-sm text-gray-200 leading-relaxed ${multiline ? 'whitespace-pre-line' : ''}`}>
        {content}
      </p>
    </div>
  );
}
