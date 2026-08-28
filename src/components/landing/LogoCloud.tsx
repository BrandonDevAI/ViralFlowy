export default function LogoCloud() {
  const platforms = [
    { name: 'TikTok', color: 'from-pink-500 to-red-500' },
    { name: 'Instagram', color: 'from-purple-500 to-orange-500' },
    { name: 'YouTube', color: 'from-red-500 to-red-600' },
    { name: 'Facebook', color: 'from-blue-500 to-blue-600' },
    { name: 'Snapchat', color: 'from-yellow-400 to-yellow-500' },
  ];

  return (
    <section className="py-12 px-6 border-y border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-xs text-gray-600 font-medium uppercase tracking-widest mb-8">
          Optimizado para las plataformas más grandes
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300 group"
            >
              <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${platform.color} group-hover:scale-125 transition-transform duration-300`} />
              <span className="text-sm text-gray-400 font-medium group-hover:text-white transition-colors duration-300">
                {platform.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
