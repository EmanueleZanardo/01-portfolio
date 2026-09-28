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
    description: 'Professional portfolio of Emanuele Zanardo, Electronic Engineer specializing in embedded systems, firmware validation, and industrial automation.',
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
    description: 'Professional portfolio of Emanuele Zanardo, Electronic Engineer specializing in embedded systems, firmware validation, and industrial automation.',
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

// Structured data for the freelance Engineering Services section (homepage)
const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Emanuele Zanardo — Engineering Services',
  url: 'https://emanuelezanardo.info/#services',
  description:
    'Freelance electronics engineering services: hardware design, firmware development, and PCB layout & testing.',
  provider: {
    '@type': 'Person',
    name: 'Emanuele Zanardo',
    url: 'https://emanuelezanardo.info',
    jobTitle: 'Electronic Engineer',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Engineering Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Hardware Design',
          description:
            'Analog and digital circuit design, power supplies, component selection, schematic capture and design reviews.',
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '50',
          priceCurrency: 'EUR',
          description: 'Indicative rate, per hour. Final quote depends on project scope.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Firmware Development',
          description:
            'Bare-metal C and RTOS-based firmware for STM32, ESP32 and other MCUs; drivers, communication stacks and bootloaders.',
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '50',
          priceCurrency: 'EUR',
          description: 'Indicative rate, per hour. Final quote depends on project scope.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'PCB Layout & Testing',
          description:
            'PCB layout and routing, board bring-up, debugging and hardware validation; DRC-clean designs ready for manufacturing.',
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '50',
          priceCurrency: 'EUR',
          description: 'Indicative rate, per hour. Final quote depends on project scope.',
        },
      },
    ],
  },
};

const FONT_CSS_URL =
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Mono:wght@400;700&display=swap';

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* perf: early-fetch hint for the font CSS, which is render-blocking */}
        <link rel="preload" as="style" href={FONT_CSS_URL} />
        <link rel="stylesheet" href={FONT_CSS_URL} />
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
