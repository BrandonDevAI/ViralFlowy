import { Zap } from 'lucide-react';
import type { FormData } from '../types';

interface ContentFormProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const GOAL_OPTIONS = [
  'Obtener más vistas',
  'Aumentar seguidores',
  'Vender un producto',
];

const STYLE_OPTIONS = [
  'UGC (natural / estilo influencer)',
  'Storytelling',
  'Problema → Solución',
  'Tendencia Viral',
];

export default function ContentForm({ formData, onChange, onSubmit, isLoading }: ContentFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <section className="px-4 sm:px-6 pb-8" id="generator">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0f] overflow-hidden shadow-2xl shadow-black/50">
          {/* Header */}
          <div className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">Generador de Contenido</h2>
              <p className="text-xs text-gray-500 mt-0.5">Completa los detalles para generar tu contenido viral</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-[10px] text-indigo-400 font-medium">IA Activa</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400">Nicho</label>
                <input
                  type="text"
                  value={formData.niche}
                  onChange={(e) => onChange('niche', e.target.value)}
                  placeholder="ej. fitness, ecommerce, belleza"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400">Audiencia Objetivo</label>
                <input
                  type="text"
                  value={formData.audience}
                  onChange={(e) => onChange('audience', e.target.value)}
                  placeholder="ej. hombres 20–30, emprendedores"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-400">Producto o Idea</label>
              <input
                type="text"
                value={formData.product}
                onChange={(e) => onChange('product', e.target.value)}
                placeholder="Describe tu producto o idea de contenido"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400">Objetivo</label>
                <select
                  value={formData.goal}
                  onChange={(e) => onChange('goal', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-[#111116] transition-all duration-200 appearance-none cursor-pointer"
                >
                  {GOAL_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#111116] text-white">{opt}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400">Estilo de Contenido</label>
                <select
                  value={formData.style}
                  onChange={(e) => onChange('style', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-[#111116] transition-all duration-200 appearance-none cursor-pointer"
                >
                  {STYLE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#111116] text-white">{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-sm hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.01]"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generando tu contenido...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" strokeWidth={2.5} />
                    Generar Contenido Viral
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
