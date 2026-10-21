import { getAllPosts } from '@/lib/blog-posts';
import { caseStudies } from '@/lib/case-studies';

const SITE = 'https://emanuelezanardo.info';

// seo/ai-discovery: llms.txt 100% generato dai dati a compile time (stesse
// sorgenti di sitemap.ts: getAllPosts + caseStudies) — Next lo prerenderizza
// una volta e lo serve statico (match con Cache-Control aggressivo sotto).
// Prima era un file statico in public/llms.txt aggiornato a mano: ogni nuovo
// articolo/pagina rischiava di restare fuori dall'indice finche' qualcuno
// non ricordava di aggiornarlo (la sezione 32 di qa-check.sh lo sorvegliava
// dall'esterno). Ora la deriva e' impossibile per costruzione: se l'articolo
// esiste nei dati, e' in llms.txt.
export const dynamic = 'force-static';

// Descrizioni stabili delle pagine di primo livello (testo editoriale, non
// derivabile dai dati — mirror del vecchio public/llms.txt).
const PAGES: Array<[string, string, string]> = [
  ['Home', `${SITE}/`, 'profile, services, selected work'],
  [
    'Blog',
    `${SITE}/blog`,
    'engineering notes: PCB design, firmware, batteries, Linux, web',
  ],
  [
    'Case Studies',
    `${SITE}/case-studies`,
    'project write-ups with methods and results',
  ],
  ['CV', `${SITE}/cv`, 'resume and downloadable PDF'],
  [
    'Singularity Quant ETRM',
    `${SITE}/singularity`,
    'live energy trading terminal: Swissix price analytics, KPIs, load curves, Monte Carlo simulator',
  ],
  ['Uses', `${SITE}/uses`, 'tools and setup'],
  [
    'Contact',
    `${SITE}/#contact`,
    'contact form (subject to configuration; email shown on page as fallback)',
  ],
];

/**
 * GET /llms.txt — AI-discovery index (llmstxt.org convention).
 * Fully static: content changes only when a post/case study is added or
 * edited, and a new deploy replaces the URL, busting stale caches.
 */
export async function GET(): Promise<Response> {
  const posts = getAllPosts();
  const pageLines = PAGES.map(
    ([label, url, desc]) => `- [${label}](${url}) — ${desc}`,
  ).join('\n');
  const caseStudyLines = caseStudies
    .map((cs) => `- [${cs.title}](${SITE}/case-studies/${cs.slug})`)
    .join('\n');
  const blogLines = posts
    .map((post) => `- [${post.title}](${SITE}/blog/${post.slug})`)
    .join('\n');

  const text = `# Emanuele Zanardo — Electronic Engineer Portfolio

> Portfolio of Emanuele Zanardo, Electronic Engineer: embedded systems, firmware & validation, PCB design, industrial automation — Ticino, Switzerland and Italy.

This is the personal website of an electronic engineer. Public pages can be summarized, quoted, and linked. Contact requests go through the contact form or WhatsApp +39 345 111 4337.

## Pages

${pageLines}

## Case Studies

${caseStudyLines}

## Blog

${blogLines}

## Feeds and machine-readable

- [RSS feed](${SITE}/feed.xml)
- [JSON feed](${SITE}/feed.json)
- [Sitemap](${SITE}/sitemap.xml)
- [robots.txt](${SITE}/robots.txt)

## Profiles

- [GitHub](https://github.com/EmanueleZanardo)
- [LinkedIn](https://www.linkedin.com/in/emanuele-zanardo-1954aa193)
`;

  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // content changes only when a post/case study changes, so it can be
      // cached hard (a new deploy always replaces the URL).
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
