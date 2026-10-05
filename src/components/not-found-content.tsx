'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, FileText, FlaskConical, Home, Mail, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Route finder for the 404 page — only real, verified site routes and
// homepage anchors (checked 05/10/2026 against src/app/). Never link to
// routes that do not exist yet (there is no /uses route).
const SITE_ROUTES = [
  {
    href: '/',
    label: 'Home',
    description: 'Hero, about, experiences, services and contact.',
    keywords: 'main start homepage',
  },
  {
    href: '/#about',
    label: 'About me',
    description: 'Background, skills and experience.',
    keywords: 'bio profile background skills cv',
  },
  {
    href: '/#projects',
    label: 'Experiences',
    description: 'Selected engineering work and projects.',
    keywords: 'projects work',
  },
  {
    href: '/#services',
    label: 'Services',
    description: 'Freelance hardware design, firmware and PCB services.',
    keywords: 'services hardware firmware pcb quote freelance',
  },
  {
    href: '/blog',
    label: 'Blog',
    description: 'Engineering notes, projects and lab learnings.',
    keywords: 'blog articles posts writing notes electronics',
  },
  {
    href: '/case-studies',
    label: 'Case Studies',
    description: 'In-depth breakdowns of selected engineering work.',
    keywords: 'case studies portfolio breakdown engineering',
  },
  {
    href: '/cv',
    label: 'CV',
    description: 'Curriculum vitae — experience, skills and education.',
    keywords: 'cv resume experience education',
  },
  {
    href: '/#contact',
    label: 'Contact',
    description: 'Get in touch for a project or a quote.',
    keywords: 'contact email message quote hire',
  },
  {
    href: '/singularity',
    label: 'Singularity Quant ETRM',
    description: 'Live energy trading analytics demo.',
    keywords: 'demo dashboard energy trading analytics singularity',
  },
];

export function NotFoundContent() {
  const mainRef = useRef<HTMLElement>(null);
  const [query, setQuery] = useState('');

  // a11y: on soft navigation to this 404 (Next App Router renders it in
  // place, no full page load), move keyboard/screen-reader focus to the
  // error content — otherwise SR users stay silent on stale content.
  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
  }, []);

  const trimmed = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!trimmed) return [];
    return SITE_ROUTES.filter((route) =>
      `${route.label} ${route.description} ${route.keywords}`
        .toLowerCase()
        .includes(trimmed)
    );
  }, [trimmed]);

  return (
    <main
      ref={mainRef}
      id="main-content"
      tabIndex={-1}
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 focus:outline-none"
    >
      <p className="font-headline text-7xl md:text-8xl text-primary" aria-hidden="true">
        404
      </p>
      <h1 className="mt-4 font-headline text-2xl md:text-3xl">Page not found</h1>
      <p className="mt-2 text-muted-foreground max-w-md">
        The page you are looking for does not exist or has been moved. Search
        below — it might live somewhere else on this site.
      </p>

      {/* Site search — filters the real route list above */}
      <div className="mt-8 w-full max-w-md">
        <label htmlFor="not-found-search" className="sr-only">
          Search this site
        </label>
        <div className="relative">
          <Search
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          />
          <Input
            id="not-found-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search this site… try “services”, “demo” or “contact”"
            autoComplete="off"
            className="pl-9"
          />
        </div>
        {trimmed.length > 0 && (
          <div aria-live="polite">
            <ul
              className="mt-2 rounded-md border border-input bg-card text-left divide-y divide-border/60"
              aria-label="Search results"
            >
              {results.length === 0 ? (
                <li className="px-4 py-3 text-sm text-muted-foreground">
                  No matches — try “contact”, “demo” or “services”.
                </li>
              ) : (
                results.map((route) => (
                  <li key={route.href}>
                    <Link
                      href={route.href}
                      className="flex items-center justify-between gap-3 px-4 py-3 rounded-md transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span>
                        <span className="block text-sm font-medium text-foreground">
                          {route.label}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {route.description}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-muted-foreground"
                      />
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Quick links — real destinations only, so this page never 404s again */}
      <nav aria-label="Quick links" className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/">
            <Home aria-hidden="true" className="mr-2 h-4 w-4" />
            Home
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/blog">
            <FileText aria-hidden="true" className="mr-2 h-4 w-4" />
            Blog
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/singularity">
            <FlaskConical aria-hidden="true" className="mr-2 h-4 w-4" />
            Live demo
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/#contact">
            <Mail aria-hidden="true" className="mr-2 h-4 w-4" />
            Contact
          </Link>
        </Button>
      </nav>
    </main>
  );
}
