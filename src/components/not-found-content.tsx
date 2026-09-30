'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function NotFoundContent() {
  const mainRef = useRef<HTMLElement>(null);

  // a11y: on soft navigation to this 404 (Next App Router renders it in
  // place, no full page load), move keyboard/screen-reader focus to the
  // error content — otherwise SR users stay silent on stale content.
  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <main
      ref={mainRef}
      id="main-content"
      tabIndex={-1}
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 focus:outline-none"
    >
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
