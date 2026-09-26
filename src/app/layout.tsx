import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  metadataBase: new URL('https://emanuelezanardo.info'),
  title: 'Emanuele Zanardo | Electronic Engineer',
  description: 'Professional portfolio of Emanuele Zanardo, Electronic Engineer specializing in embedded systems, firmware validation, and industrial automation.',
  openGraph: {
    title: 'Emanuele Zanardo | Electronic Engineer',
    description: 'Professional portfolio of Emanuele Zanardo.',
    url: 'https://emanuelezanardo.info',
    siteName: 'Emanuele Zanardo Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Emanuele Zanardo | Electronic Engineer',
    description: 'Professional portfolio of Emanuele Zanardo.',
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
  sameAs: [
    'https://github.com/EmanueleZanardo',
    'https://www.linkedin.com/in/emanuele-zanardo-1954aa193',
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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
