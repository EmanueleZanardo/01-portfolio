import type { Metadata } from 'next';
import { NotFoundContent } from '@/components/not-found-content';

// Note: Next.js auto-injects <meta name="robots" content="noindex"/> on
// error statuses (app-render NonIndex), so no robots key here — adding one
// would duplicate the tag.
export const metadata: Metadata = {
  title: 'Page Not Found | Emanuele Zanardo',
  description: 'The page you are looking for does not exist or has been moved.',
};

export default function NotFound() {
  return <NotFoundContent />;
}
