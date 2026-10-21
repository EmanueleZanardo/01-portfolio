import type { Metadata } from 'next';

/**
 * seo: RSS/JSON feed autodiscovery (<link rel="alternate">) — single source
 * of truth. Next.js REPLACES the whole `alternates` object when a child
 * page defines its own, so any page that sets its own `canonical` must
 * spread this too; otherwise the feed links only render on pages that
 * inherit the root layout's alternates (i.e. the homepage only).
 * Found 2026-10-09: /blog, /blog/[slug], /case-studies, /case-studies/[slug],
 * /cv, /uses and /singularity had lost both feed autodiscovery links.
 */
/**
 * seo: hreflang self-referencing (en-US + x-default) — single source of
 * truth. Same `alternates`-replacement caveat as feedAlternatesTypes: any
 * page that sets its own `canonical` must call this with its own path,
 * otherwise the hreflang links only render on pages that inherit the root
 * layout's alternates (i.e. the homepage only).
 * Google recommends self-referencing hreflang even on single-language
 * sites; x-default covers unmatched locales. Values are absolute URLs, as
 * required for hreflang annotations.
 */
export function hreflangLanguages(
  canonicalPath: string
): NonNullable<NonNullable<Metadata['alternates']>['languages']> {
  const url = `https://emanuelezanardo.info${canonicalPath}`;
  return { 'en-US': url, 'x-default': url };
}

export const feedAlternatesTypes: NonNullable<
  NonNullable<Metadata['alternates']>['types']
> = {
  // seo: RSS autodiscovery — lets feed readers and search engines find
  // the blog feed (src/app/feed.xml/route.ts) from every page.
  'application/rss+xml': [{ url: '/feed.xml', title: 'Emanuele Zanardo — Blog' }],
  // seo: JSON Feed autodiscovery (https://www.jsonfeed.org/version/1.1/)
  // — same blog content as /feed.xml for readers that prefer JSON.
  'application/feed+json': [{ url: '/feed.json', title: 'Emanuele Zanardo — Blog' }],
};

/**
 * seo: word-boundary truncation for meta descriptions — single source of
 * truth. The old inline code did `text.slice(0, 157)` (blog) and
 * `text.slice(0, 157) + "…"` (case studies), which cut mid-word in SERPs
 * ("…watchdog supervisi…", "…autorouting a dens"). This cuts at the last
 * space within the budget and appends "…" only when something was actually
 * truncated. Total output stays ≤ maxChars + 1 (default 158) so Google
 * keeps showing the whole description in SERPs.
 */
export function truncateDescription(text: string, maxChars = 157): string {
  if (text.length <= maxChars) return text;
  const budget = text.slice(0, maxChars);
  const lastSpace = budget.lastIndexOf(' ');
  // Pathological single-word prefix: hard cut rather than a 1-word stub.
  const cut = lastSpace > 0 ? budget.slice(0, lastSpace) : budget;
  return cut + '…';
}
