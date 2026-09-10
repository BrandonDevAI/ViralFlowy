import type { Metadata, Viewport } from 'next';
import '../index.css';
import { Providers } from './providers';
import LoginModal from '../components/LoginModal';

export const metadata: Metadata = {
  metadataBase: new URL('https://viralflowy.com'),
  title: 'ViralFlowy — IA para ingeniería de contenido viral',
  description:
    'Convierte contenido viral en ideas para tu marca. Pega un TikTok, Reel o una idea. ViralFlow analiza su estructura y genera hooks, guiones y CTAs adaptados a tu audiencia.',
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'ViralFlowy — IA para ingeniería de contenido viral',
    description:
      'Convierte contenido viral en ideas para tu marca en minutos. Hooks, guiones y CTAs optimizados para conversión.',
    images: ['/logo.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#050507',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#050507] text-white font-sans antialiased overflow-x-hidden">
        <Providers>
          {children}
          <LoginModal />
        </Providers>
      </body>
    </html>
  );
}
