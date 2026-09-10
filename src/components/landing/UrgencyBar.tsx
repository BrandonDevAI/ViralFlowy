'use client';

import React, { useState, useEffect } from 'react';

function getTargetTime(): number {
  if (typeof window === 'undefined') return Date.now() + 2 * 60 * 60 * 1000;
  try {
    const key = 'viralflowy_offer_end';
    const stored = localStorage.getItem(key);
    if (stored) {
      const val = parseInt(stored, 10);
      if (val > Date.now()) return val;
    }
    const target = Date.now() + 2 * 60 * 60 * 1000;
    localStorage.setItem(key, target.toString());
    return target;
  } catch {
    return Date.now() + 2 * 60 * 60 * 1000;
  }
}

export default function UrgencyBar() {
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 45, s: 12 });

  useEffect(() => {
    const target = getTargetTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="urgency-bar fixed top-0 left-0 right-0 z-[60] w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 overflow-hidden">
      {/* Animated shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

      <div className="relative flex items-center justify-center gap-3 px-4 py-2.5 text-white text-xs sm:text-sm font-medium">
        <span className="text-base sm:text-lg leading-none">🔥</span>
        <span className="hidden sm:inline">Oferta de lanzamiento:</span>
        <span className="font-bold text-yellow-300">42% OFF</span>
        <span className="hidden sm:inline text-white/80">— termina en</span>
        <span className="sm:hidden text-white/80">—</span>

        <div className="flex items-center gap-1">
          <span className="countdown-digit">{pad(timeLeft.h)}</span>
          <span className="text-white/60 font-bold">:</span>
          <span className="countdown-digit">{pad(timeLeft.m)}</span>
          <span className="text-white/60 font-bold">:</span>
          <span className="countdown-digit">{pad(timeLeft.s)}</span>
        </div>
      </div>
    </div>
  );
}
