import { Copy, Video, Camera } from 'lucide-react';
import type { VideoIdea } from '../types';

interface VideoIdeasSectionProps {
  ideas: VideoIdea[];
  onCopy: (text: string) => void;
}

export default function VideoIdeasSection({ ideas, onCopy }: VideoIdeasSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Video className="w-4 h-4 text-cyan-400" />
        <h3 className="text-sm font-semibold text-white">Ideas de Video</h3>
        <span className="text-xs text-gray-500 ml-auto">{ideas.length} ideas generadas</span>
      </div>

      <div className="space-y-3">
        {ideas.map((idea, index) => (
          <div
            key={idea.id}
            className="group rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-200 overflow-hidden"
          >
            <div className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-bold flex items-center justify-center mt-0.5">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white leading-snug">{idea.concept}</p>
                </div>
                <button
                  onClick={() => onCopy(`${idea.concept}\n\nCómo grabar:\n${idea.howToRecord}`)}
                  className="flex-shrink-0 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-150"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-start gap-2 pl-9">
                <Camera className="w-3.5 h-3.5 text-gray-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-400 leading-relaxed">{idea.howToRecord}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
