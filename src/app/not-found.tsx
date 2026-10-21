import type { Metadata } from 'next';
import { NotFoundContent } from '@/components/not-found-content';
import { Footer } from '@/components/layout/footer';
import { feedAlternatesTypes, hreflangLanguages } from '@/lib/metadata';

// Note: Next.js auto-injects <meta name="robots" content="noindex"/> on
// error statuses (app-render NonIndex), so no robots key here — adding one
// would duplicate the tag.
export const metadata: Metadata = {
  // seo: the layout's title template ('%s | Emanuele Zanardo') applies
  // automatically — keeping the suffix here would render it twice
  // ("Page Not Found | Emanuele Zanardo | Emanuele Zanardo").
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
  // seo: self-referencing alternates — the 404 previously inherited the root
  // layout's alternates, so its canonical and hreflang (en-US, x-default)
  // pointed at the homepage '/' while its og:url says '/404': crawlers got
  // "this missing page IS the homepage". Same pattern as every other page
  // (ciclo 00:40): own canonical matching og:url + hreflangLanguages with its
  // own path + the shared feed autodiscovery links. The page stays noindex
  // via Next's auto-injected tag (unchanged).
  alternates: {
    canonical: '/404',
    languages: hreflangLanguages('/404'),
    types: feedAlternatesTypes,
  },
  // seo: the 404 previously inherited the root layout's openGraph/twitter
  // metadata, so a shared link to a broken URL unfurled with the homepage
  // card (og:title "Emanuele Zanardo | Electronic Engineer", og:url "/") —
  // a misleading preview. Override both so the card identifies the page
  // as missing instead. The page stays noindex via the auto-injected tag.
  openGraph: {
    title: 'Page Not Found | Emanuele Zanardo',
    description: 'The page you are looking for does not exist or has been moved.',
    url: 'https://emanuelezanardo.info/404',
    siteName: 'Emanuele Zanardo Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Emanuele Zanardo — Electronic Engineer',
        type: 'image/png',
        // seo: og:image:secure_url — parita' col layout e tutte le altre
        // pagine (ciclo 02:40 per twitter:image:alt): la 404 ridefinisce
        // l'intero blocco openGraph, quindi senza questa riga la card della
        // 404 era l'unica senza secure_url.
        secureUrl: 'https://emanuelezanardo.info/og-image.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Not Found | Emanuele Zanardo',
    description: 'The page you are looking for does not exist or has been moved.',
    // seo: twitter:image:alt — object form with alt, like every other page
    // (layout, blog, case-studies, cv, uses, singularity); a plain string
    // image here emitted no twitter:image:alt on the 404 card.
    images: [
      {
        url: '/og-image.png',
        alt: 'Emanuele Zanardo — Electronic Engineer',
      },
    ],
  },
};

export default function NotFound() {
  // ux/a11y: the error page previously rendered the message alone, with no
  // site navigation or footer (the homepage Header is intentionally hidden at
  // the top and would stay off-screen+inert here, so only the Footer is
  // added — social/GitHub/LinkedIn/mail links plus the back-to-top button).
  return (
    <>
      <NotFoundContent />
      <Footer />
    </>
  );
}
