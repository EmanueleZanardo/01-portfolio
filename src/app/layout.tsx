import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

// Self-hosted fonts (public/fonts/*.woff2) — no IP is sent to Google Fonts.
const bebasNeue = localFont({
  src: '../../public/fonts/bebas-neue-latin-400.woff2',
  weight: '400',
  display: 'swap',
  variable: '--font-bebas',
});

const robotoMono = localFont({
  src: [
    { path: '../../public/fonts/roboto-mono-latin-400.woff2', weight: '400' },
    { path: '../../public/fonts/roboto-mono-latin-700.woff2', weight: '700' },
  ],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const viewport: Viewport = {
  themeColor: '#333333',
  colorScheme: 'dark',
};

// seo: single source of truth for the site description (159 chars) — shared
// by the meta description, openGraph and twitter tags, and the WebPage
// JSON-LD, so they never drift apart.
const siteDescription =
  'Portfolio of Emanuele Zanardo, Electronic Engineer: embedded systems, firmware & validation, PCB design, industrial automation — Ticino, Switzerland and Italy.';

export const metadata: Metadata = {
  metadataBase: new URL('https://emanuelezanardo.info'),
  title: {
    // seo: single source of truth for title branding — every subpage that
    // sets its own title gets "… | Emanuele Zanardo" automatically.
    default: 'Emanuele Zanardo | Electronic Engineer',
    template: '%s | Emanuele Zanardo',
  },
  description: siteDescription,
  // seo: keywords metadata — search engines can use them as an extra relevance
  // signal; kept focused on his actual services and service areas.
  keywords: ['Electronic Engineer', 'embedded systems', 'firmware development', 'firmware validation', 'PCB design', 'PCB layout', 'KiCad', 'ESP32', 'STM32', 'freelance electronics engineer', 'industrial automation', 'Ticino', 'Varese', 'Switzerland', 'Italy'],
  alternates: { canonical: '/' },
  authors: [{ name: 'Emanuele Zanardo', url: 'https://emanuelezanardo.info' }],
  creator: 'Emanuele Zanardo',
  // micro-ux: iOS Safari auto-detects phone-like text and wraps it in its own
  // unstyled <a>, clashing with (or double-linking) the explicit styled tel:
  // link in the contact section. The number is intentionally linked there,
  // so auto-detection is disabled.
  formatDetection: { telephone: false },
  // micro-ux: quando l'utente aggiunge il sito alla home di iOS, si comporta
  // da web app standalone con status bar nera opaca in tinta col tema dark
  // (default: Safari con chrome chiaro che stona col design).
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black',
    title: 'E. Zanardo',
  },
  icons: {
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  // seo: let Google show large image previews in search results
  // (max-image-preview: large) — only the googlebot tag is emitted (no
  // robots index/follow tag): index/follow is the default anyway, and a
  // duplicate "robots" tag would conflict with Next.js's auto-injected
  // noindex on error statuses (404). Verified: /404 serves only
  // <meta name="robots" content="noindex"/>.
  robots: {
    googleBot: {
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    title: 'Emanuele Zanardo | Electronic Engineer',
    description: siteDescription,
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
        // seo: og:image:type — alcuni scraper/validator (es. LinkedIn,
        // WhatsApp) lo usano per il content-type senza fare un HEAD extra.
        type: 'image/png',
        // seo: og:image:secure_url — richiesto esplicitamente da alcuni
        // validator/scraper; l'URL e' https, quindi e' anche l'URL sicuro.
        secureUrl: 'https://emanuelezanardo.info/og-image.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emanuele Zanardo | Electronic Engineer',
    description: siteDescription,
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
  // seo: @id anchor — the WebSite/WebPage graphs below reference the person
  // (and the service) by reference instead of duplicating the entities.
  '@id': 'https://emanuelezanardo.info#person',
  name: 'Emanuele Zanardo',
  url: 'https://emanuelezanardo.info',
  jobTitle: 'Electronic Engineer',
  // seo: current employer, already public on the site (experience section) —
  // enriches the knowledge-graph signal with zero privacy exposure.
  worksFor: {
    '@type': 'Organization',
    name: 'CENTIEL',
  },
  description:
    'Electronic Engineer specializing in embedded systems, firmware validation, and industrial automation.',
  // seo: Person.image should depict the person (not a banner graphic) —
  // Google/knowledge-graph use it as the person's photo. portrait.webp is the
  // actual portrait already published in the About section.
  image: 'https://emanuelezanardo.info/portrait.webp',
  // seo: contact point in structured data — same number already shown
  // publicly on the site (tel:/wa.me links in the contact section).
  // E.164 without spaces: canonical machine-readable format per schema.org
  // and Google's contact-point guidance (previous commit used "+39 345 111 4337").
  telephone: '+393451114337',
  // seo: region-level address for local-search geo relevance — region and
  // country only, no street/city (privacy-safe); consistent with the
  // areaServed on the ProfessionalService schema below.
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Ticino',
    addressCountry: 'CH',
  },
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
  '@id': 'https://emanuelezanardo.info#engineering-services',
  name: 'Emanuele Zanardo — Engineering Services',
  url: 'https://emanuelezanardo.info/#services',
  description:
    'Freelance electronics engineering services: hardware design, firmware development, and PCB layout & testing.',
  // seo: geo-relevance for local search — services target the cross-border
  // area where Emanuele actually works (Varese province IT + Ticino CH).
  areaServed: [
    {
      '@type': 'AdministrativeArea',
      name: 'Provincia di Varese',
      addressCountry: 'IT',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Canton Ticino',
      addressCountry: 'CH',
    },
  ],
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
          price: 50,
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
          price: 50,
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
          price: 50,
          priceCurrency: 'EUR',
          description: 'Indicative rate, per hour. Final quote depends on project scope.',
        },
      },
    ],
  },
};

// Structured data: WebSite + WebPage graphs for the homepage. All name
// strings below are reused from strings already present in this file
// (siteName, title default, description) — no new names introduced. The
// entities link to the Person and ProfessionalService graphs above via @id
// instead of duplicating them.
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://emanuelezanardo.info#website',
  url: 'https://emanuelezanardo.info',
  name: 'Emanuele Zanardo Portfolio',
  description: siteDescription,
  inLanguage: 'en-US',
  author: { '@id': 'https://emanuelezanardo.info#person' },
  publisher: { '@id': 'https://emanuelezanardo.info#person' },
};

const webpageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://emanuelezanardo.info#webpage',
  url: 'https://emanuelezanardo.info',
  name: 'Emanuele Zanardo | Electronic Engineer',
  description: siteDescription,
  inLanguage: 'en-US',
  isPartOf: { '@id': 'https://emanuelezanardo.info#website' },
  about: { '@id': 'https://emanuelezanardo.info#engineering-services' },
  mainEntity: { '@id': 'https://emanuelezanardo.info#person' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('dark', bebasNeue.variable, robotoMono.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
        />
        {/* seo: WebSite + WebPage graphs — same graph, separate script blocks
            so a parse failure in one block cannot poison the others. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageJsonLd) }}
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
