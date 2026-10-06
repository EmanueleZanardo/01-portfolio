import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollToTop } from '@/components/layout/scroll-to-top';
import Link from 'next/link';

// Text links to site sections — only routes that exist locally are listed
// (checked 05/10/2026): /, /blog, /case-studies, /cv, /uses, /singularity.
// /uses shipped on 05/10/2026 (40d7987), so it now joins the footer nav
// alongside the header (header.tsx already links it).
const SITE_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/cv', label: 'CV' },
  { href: '/uses', label: 'Uses' },
  { href: '/singularity', label: 'Live Demo' },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground ml-4">
          © {new Date().getFullYear()} Emanuele Zanardo. All rights reserved.
        </p>
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          {SITE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/EmanueleZanardo" target="_blank" rel="noopener noreferrer me" aria-label="GitHub (opens in new tab)">
              <Github aria-hidden="true" className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://www.linkedin.com/in/emanuele-zanardo-1954aa193" target="_blank" rel="noopener noreferrer me" aria-label="LinkedIn (opens in new tab)">
              <Linkedin aria-hidden="true" className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="mailto:emanuele1998zanardo@gmail.com" aria-label="Email">
              <Mail aria-hidden="true" className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>          
          </Button>
        </div>
      </div>
      <ScrollToTop />
    </footer>
  );
}
