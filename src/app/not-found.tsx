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
