import { Copy, Flame } from 'lucide-react';
import type { Hook } from '../types';

interface HooksSectionProps {
  hooks: Hook[];
  onCopy: (text: string) => void;
}

export default function HooksSection({ hooks, onCopy }: HooksSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Flame className="w-4 h-4 text-orange-400" />
        <h3 className="text-sm font-semibold text-white">Hooks Virales</h3>
        <span className="text-xs text-gray-500 ml-auto">{hooks.length} hooks generados</span>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {hooks.map((hook, index) => (
          <div
            key={hook.id}
            className="group flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-200 cursor-default"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-md bg-white/[0.05] text-gray-500 text-xs font-mono flex items-center justify-center mt-0.5">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="flex-1 text-sm text-gray-200 leading-relaxed">{hook.text}</p>
            <button
              onClick={() => onCopy(hook.text)}
              className="flex-shrink-0 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-150"
              title="Copiar hook"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
