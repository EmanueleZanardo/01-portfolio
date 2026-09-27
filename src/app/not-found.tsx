import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="font-headline text-7xl md:text-8xl text-primary" aria-hidden="true">
        404
      </p>
      <h1 className="mt-4 font-headline text-2xl md:text-3xl">Page not found</h1>
      <p className="mt-2 text-muted-foreground max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">Back to homepage</Link>
      </Button>
    </main>
  );
}
