import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

export const viewport: Viewport = {
  themeColor: '#333333',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://emanuelezanardo.info'),
  title: 'Emanuele Zanardo | Electronic Engineer',
  description: 'Professional portfolio of Emanuele Zanardo, Electronic Engineer specializing in embedded systems, firmware validation, and industrial automation.',
  alternates: { canonical: '/' },
  authors: [{ name: 'Emanuele Zanardo', url: 'https://emanuelezanardo.info' }],
  creator: 'Emanuele Zanardo',
  icons: {
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'Emanuele Zanardo | Electronic Engineer',
    description: 'Professional portfolio of Emanuele Zanardo.',
    url: 'https://emanuelezanardo.info',
    siteName: 'Emanuele Zanardo Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Emanuele Zanardo — Electronic Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emanuele Zanardo | Electronic Engineer',
    description: 'Professional portfolio of Emanuele Zanardo.',
    images: [
      {
        url: '/og-image.png',
        alt: 'Emanuele Zanardo — Electronic Engineer',
      },
    ],
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Emanuele Zanardo',
  url: 'https://emanuelezanardo.info',
  jobTitle: 'Electronic Engineer',
  description:
    'Electronic Engineer specializing in embedded systems, firmware validation, and industrial automation.',
  image: 'https://emanuelezanardo.info/og-image.png',
  sameAs: [
    'https://github.com/EmanueleZanardo',
    'https://www.linkedin.com/in/emanuele-zanardo-1954aa193',
  ],
  knowsAbout: [
    'Embedded systems',
    'Firmware development',
    'Firmware validation',
    'Industrial automation',
    'PCB design',
    'ESP32',
    'KiCad',
    'Power electronics',
    'Energy trading analytics',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-background')}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
