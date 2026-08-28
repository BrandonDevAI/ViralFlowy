const footerLinks = [
  {
    title: 'Producto',
    links: [
      { label: 'Características', href: '#features' },
      { label: 'Cómo funciona', href: '#how-it-works' },
      { label: 'Precios', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacidad', href: '#' },
      { label: 'Términos de uso', href: '#' },
      { label: 'Política de reembolso', href: '#' },
    ],
  },
  {
    title: 'Contacto',
    links: [
      { label: 'soporte@viralflowy.com', href: 'mailto:soporte@viralflowy.com' },
      { label: 'Instagram', href: '#' },
      { label: 'TikTok', href: '#' },
    ],
  },
];

export default function FooterLanding() {
  return (
    <footer className="border-t border-white/[0.06] pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/logo.png"
                alt="ViralFlowy"
                className="w-9 h-9 object-contain rounded-lg"
              />
              <span className="font-bold text-white text-sm">ViralFlowy</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-[220px]">
              Crea contenido viral con IA. Hooks, guiones y anuncios listos para publicar en minutos.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} ViralFlowy. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Instagram</a>
            <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">TikTok</a>
            <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
