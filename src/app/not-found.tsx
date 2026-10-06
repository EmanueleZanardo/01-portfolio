import type { Metadata } from 'next';
import { NotFoundContent } from '@/components/not-found-content';
import { Footer } from '@/components/layout/footer';

// Note: Next.js auto-injects <meta name="robots" content="noindex"/> on
// error statuses (app-render NonIndex), so no robots key here — adding one
// would duplicate the tag.
export const metadata: Metadata = {
  // seo: the layout's title template ('%s | Emanuele Zanardo') applies
  // automatically — keeping the suffix here would render it twice
  // ("Page Not Found | Emanuele Zanardo | Emanuele Zanardo").
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
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
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Not Found | Emanuele Zanardo',
    description: 'The page you are looking for does not exist or has been moved.',
    images: ['/og-image.png'],
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
