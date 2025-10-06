import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { Footer } from '@/components/layout/footer';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { AuthSyncProvider } from '@/components/auth/auth-sync-provider';
import Header from '@/components/layout/header';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: {
    default: 'FSW Barber - Agende seu corte',
    template: '%s | FSW Barber',
  },
  description: 'Encontre as melhores barbearias e agende seu horário de forma simples e rápida.',
  keywords: ['barbearia', 'corte de cabelo', 'agendamento', 'beleza masculina'],
  authors: [{ name: 'FSW Barber' }],
  creator: 'FSW Barber',
  metadataBase: new URL('https://barber-better.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'FSW Barber',
    description: 'As melhores barbearias em um só lugar',
    siteName: 'FSW Barber',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FSW Barber - Agende seu corte',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FSW Barber',
    description: 'As melhores barbearias em um só lugar',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={nunito.variable}>
      <body className="overflow-x-hidden font-sans antialiased">
        <AuthSyncProvider>
          <div className="flex h-full flex-col">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          <Toaster richColors position="top-center" />
        </AuthSyncProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
