import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

export const viewport: Viewport = {
  themeColor: '#333333',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://emanuelezanardo.info'),
  title: 'Emanuele Zanardo | Electronic Engineer',
  description: 'Professional portfolio of Emanuele Zanardo, Electronic Engineer specializing in embedded systems, firmware validation, and industrial automation.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Emanuele Zanardo | Electronic Engineer',
    description: 'Professional portfolio of Emanuele Zanardo.',
    url: 'https://emanuelezanardo.info',
    siteName: 'Emanuele Zanardo Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://i.postimg.cc/0j6WsZRn/istockphoto-1372200846-612x612.jpg',
        width: 612,
        height: 612,
        alt: 'Emanuele Zanardo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emanuele Zanardo | Electronic Engineer',
    description: 'Professional portfolio of Emanuele Zanardo.',
    images: ['https://i.postimg.cc/0j6WsZRn/istockphoto-1372200846-612x612.jpg'],
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
