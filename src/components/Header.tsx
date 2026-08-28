import { Zap } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-white text-sm tracking-tight">Viral Content Engine</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Features</a>
          <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Pricing</a>
          <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Examples</a>
        </nav>
        <button className="text-xs font-medium px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 transition-all duration-200">
          Sign in
        </button>
      </div>
    </header>
  );
}
