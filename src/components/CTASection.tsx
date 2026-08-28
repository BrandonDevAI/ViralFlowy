import { Copy, Megaphone } from 'lucide-react';

interface CTASectionProps {
  ctas: string[];
  onCopy: (text: string) => void;
}

export default function CTASection({ ctas, onCopy }: CTASectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Megaphone className="w-4 h-4 text-green-400" />
        <h3 className="text-sm font-semibold text-white">CTAs Optimizados</h3>
        <span className="text-xs text-gray-500 ml-auto">{ctas.length} CTAs generados</span>
      </div>

      <div className="space-y-3">
        {ctas.map((cta, index) => (
          <div
            key={index}
            className="group relative flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] bg-gradient-to-r from-green-500/[0.04] to-emerald-500/[0.04] hover:from-green-500/[0.08] hover:to-emerald-500/[0.08] hover:border-green-500/20 transition-all duration-200"
          >
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center shadow-sm shadow-green-500/20">
              <span className="text-xs font-bold text-white">{index + 1}</span>
            </div>
            <p className="flex-1 text-sm text-gray-200 leading-relaxed pt-0.5">{cta}</p>
            <button
              onClick={() => onCopy(cta)}
              className="flex-shrink-0 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-150"
              title="Copiar CTA"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
