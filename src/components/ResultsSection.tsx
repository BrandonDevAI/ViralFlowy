import { useState, useCallback } from 'react';
import { Flame, Clapperboard, Video, Timer, Megaphone } from 'lucide-react';
import type { ContentOutput } from '../types';
import HooksSection from './HooksSection';
import ScriptsSection from './ScriptsSection';
import VideoIdeasSection from './VideoIdeasSection';
import VideoStructure from './VideoStructure';
import CTASection from './CTASection';
import Toast from './Toast';

interface ResultsSectionProps {
  output: ContentOutput;
  visible: boolean;
}

const TABS = [
  { id: 'hooks', label: 'Hooks', icon: Flame },
  { id: 'scripts', label: 'Guiones', icon: Clapperboard },
  { id: 'videos', label: 'Ideas de Video', icon: Video },
  { id: 'structure', label: 'Estructura', icon: Timer },
  { id: 'ctas', label: 'CTAs', icon: Megaphone },
] as const;

type TabId = typeof TABS[number]['id'];

export default function ResultsSection({ output, visible }: ResultsSectionProps) {
  const [activeTab, setActiveTab] = useState<TabId>('hooks');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastKey, setToastKey] = useState(0);

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setToastKey((k) => k + 1);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 50);
  }, []);

  if (!visible) return null;

  return (
    <section
      className="px-4 sm:px-6 pb-20 mt-6 animate-fadeIn"
      style={{ animationFillMode: 'both' }}
    >
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-xs text-gray-500 font-medium px-3">Tu contenido viral está listo</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0f] overflow-hidden shadow-2xl shadow-black/50">
          <div className="border-b border-white/[0.06] px-2 pt-2">
            <div className="flex gap-0.5 overflow-x-auto scrollbar-hide">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-2.5 rounded-t-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? 'bg-white/[0.06] text-white border-b-2 border-indigo-400'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-5">
            {activeTab === 'hooks' && (
              <HooksSection hooks={output.hooks} onCopy={handleCopy} />
            )}
            {activeTab === 'scripts' && (
              <ScriptsSection scripts={output.scripts} onCopy={handleCopy} />
            )}
            {activeTab === 'videos' && (
              <VideoIdeasSection ideas={output.videoIdeas} onCopy={handleCopy} />
            )}
            {activeTab === 'structure' && (
              <VideoStructure />
            )}
            {activeTab === 'ctas' && (
              <CTASection ctas={output.ctas} onCopy={handleCopy} />
            )}
          </div>
        </div>
      </div>

      <Toast key={toastKey} message="¡Copiado!" visible={toastVisible} />
    </section>
  );
}
