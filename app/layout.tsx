import type { Metadata } from 'next';
import { Playfair_Display, Space_Mono, Inter, Special_Elite } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/AnnouncementBar';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const specialElite = Special_Elite({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-special-elite',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Watering My Grass — Wellness Journalism That Reads the Papers',
  description: 'Nonprofit wellness journalism. Named researcher + journal + year + sample size. Every time. The anti-Goop.',
  openGraph: {
    title: 'Watering My Grass',
    description: 'We read the actual peer-reviewed research and tell you what it says.',
    url: 'https://wateringmygrass.com',
    siteName: 'Watering My Grass',
    type: 'website',
    images: [
      {
        url: 'https://wateringmygrass.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Watering My Grass — Read the Papers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Watering My Grass — Read the Papers',
    description: 'Nonprofit wellness journalism. The anti-Goop.',
    images: ['https://wateringmygrass.com/og-image.png'],
  },
  metadataBase: new URL('https://wateringmygrass.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${spaceMono.variable} ${inter.variable} ${specialElite.variable}`}>
      <body>
        <AnnouncementBar />
        <Nav />
        <main>{children}</main>
        <Footer />
        <KeyboardShortcuts />
      </body>
    </html>
  );
}
