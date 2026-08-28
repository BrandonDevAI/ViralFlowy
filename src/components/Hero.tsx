import { ArrowDown, TrendingUp } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium mb-8">
          <TrendingUp className="w-3 h-3" />
          <span>Powered by viral content formulas</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
          Create Viral Content{' '}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            in Seconds
          </span>
        </h1>

        <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
          Hooks, scripts and ideas designed to maximize views and conversions.
          Built for TikTok, Reels, and Ads.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition-all duration-200 shadow-lg shadow-blue-500/25"
          >
            Start Generating Free
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
          </button>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 font-medium text-sm border border-white/10 transition-all duration-200">
            See examples
          </button>
        </div>

        <div className="flex items-center justify-center gap-8 text-center">
          {[
            { value: '10x', label: 'Faster content creation' },
            { value: '500+', label: 'Viral templates used' },
            { value: '3 platforms', label: 'TikTok, Reels & Ads' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-xs text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
