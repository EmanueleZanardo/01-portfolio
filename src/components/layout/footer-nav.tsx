"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Text links to site sections — only routes that exist locally are listed
// (checked 05/10/2026): /, /blog, /case-studies, /cv, /uses, /singularity.
// /uses shipped on 05/10/2026 (40d7987), so it now joins the footer nav
// alongside the header (header.tsx already links it).
const SITE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/cv", label: "CV" },
  { href: "/uses", label: "Uses" },
  { href: "/singularity", label: "Live Demo" },
];

export function FooterNav() {
  // a11y: same pattern as the header nav (header.tsx): announce the current
  // page in the footer nav too, so screen-reader users get a consistent
  // "current page" signal in both landmarks. "/" matches only exactly —
  // sub-paths must not highlight Home. Detail pages (/blog/<slug>,
  // /case-studies/<slug>) prefix-match their section (ciclo 07:40), so the
  // section link stays highlighted there too.
  const pathname = usePathname();
  const isCurrent = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      aria-label="Footer"
      className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
    >
      {SITE_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={isCurrent(link.href) ? "page" : undefined}
          className={cn(
            // a11y (WCAG 2.5.8, ciclo 13:39): py-1 -> 28px di altezza
            // (prima text-sm senza padding = 20px, sotto i 24px minimi).
            "text-sm text-muted-foreground transition-colors hover:text-primary py-1",
            isCurrent(link.href) && "text-primary"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
