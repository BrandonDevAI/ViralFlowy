import { Timer } from 'lucide-react';

const TIMELINE = [
  { range: '0–3s', label: 'Hook', description: 'Detén el scroll al instante. Empieza con la declaración o visual más impactante.', color: 'from-orange-500 to-red-500', bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20', width: '10%' },
  { range: '3–10s', label: 'Problema', description: 'Identifica el punto de dolor que tu audiencia siente profundamente. Haz que asientan con la cabeza.', color: 'from-yellow-500 to-orange-500', bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20', width: '23%' },
  { range: '10–20s', label: 'Valor', description: 'Entrega el insight, tip o transformación. Este es el corazón de tu video.', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', width: '33%' },
  { range: '20–30s', label: 'CTA', description: 'Impulsa una acción clara y única. Comentar, seguir, hacer clic o compartir.', color: 'from-green-500 to-emerald-500', bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20', width: '33%' },
];

export default function VideoStructure() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Timer className="w-4 h-4 text-green-400" />
        <h3 className="text-sm font-semibold text-white">Estructura de Video</h3>
        <span className="text-xs text-gray-500 ml-auto">Fórmula de 30 segundos</span>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-[#0a0a0f] overflow-hidden">
        <div className="p-4 pb-3">
          <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
            {TIMELINE.map((step) => (
              <div
                key={step.label}
                className={`bg-gradient-to-r ${step.color} rounded-full`}
                style={{ width: step.width }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-gray-600">0s</span>
            <span className="text-[10px] text-gray-600">30s</span>
          </div>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {TIMELINE.map((step) => (
            <div key={step.label} className="flex items-start gap-4 px-4 py-4">
              <div className={`flex-shrink-0 px-2 py-1 rounded-md ${step.bg} border ${step.border}`}>
                <span className={`text-xs font-mono font-semibold ${step.text}`}>{step.range}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white mb-0.5">{step.label}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
