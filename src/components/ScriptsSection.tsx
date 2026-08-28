import { Copy, Clapperboard } from 'lucide-react';
import type { Script } from '../types';

interface ScriptsSectionProps {
  scripts: Script[];
  onCopy: (text: string) => void;
}

export default function ScriptsSection({ scripts, onCopy }: ScriptsSectionProps) {
  const copyFullScript = (script: Script) => {
    const full = `HOOK:\n${script.hook}\n\nCUERPO:\n${script.body}\n\nCTA:\n${script.cta}`;
    onCopy(full);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Clapperboard className="w-4 h-4 text-blue-400" />
        <h3 className="text-sm font-semibold text-white">Guiones UGC</h3>
        <span className="text-xs text-gray-500 ml-auto">{scripts.length} guiones generados</span>
      </div>

      <div className="space-y-4">
        {scripts.map((script, index) => (
          <div
            key={script.id}
            className="rounded-xl border border-white/[0.06] bg-[#0a0a0f] overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <span className="text-xs font-medium text-gray-400">Guión {index + 1}</span>
              <button
                onClick={() => copyFullScript(script)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-150"
              >
                <Copy className="w-3 h-3" />
                Copiar todo
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="inline-block px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-400 text-[10px] font-semibold uppercase tracking-wider">Hook</span>
                </div>
                <p className="text-sm text-white font-medium leading-relaxed pl-1">{script.hook}</p>
              </div>

              <div className="h-px bg-white/[0.06]" />

              <div className="space-y-1.5">
                <span className="inline-block px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-semibold uppercase tracking-wider">Cuerpo</span>
                <p className="text-sm text-gray-300 leading-relaxed pl-1">{script.body}</p>
              </div>

              <div className="h-px bg-white/[0.06]" />

              <div className="space-y-1.5">
                <span className="inline-block px-2 py-0.5 rounded-md bg-green-500/10 text-green-400 text-[10px] font-semibold uppercase tracking-wider">CTA</span>
                <p className="text-sm text-gray-200 font-medium leading-relaxed pl-1">{script.cta}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
