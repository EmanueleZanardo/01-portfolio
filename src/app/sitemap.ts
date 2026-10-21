import type { MetadataRoute } from 'next';
import { execFileSync } from 'child_process';
import { getAllPosts, postModifiedDate } from '@/lib/blog-posts';
import { getCaseStudySlugs } from '@/lib/case-studies';

// lastModified tracks the actual last content change (git commit date at build
// time), not the build time: a bare "new Date()" churns the sitemap on every
// redeploy (Vercel rebuilds on each push), forcing search engines to re-crawl
// pages that did not change. With one or more paths, the date is scoped to
// those files' own history (git log -1 -- <paths> returns the newest commit
// touching any of them), so a page whose rendered content is driven by a data
// file keeps a stable lastmod while unrelated code churns.
function lastContentChange(...paths: string[]): Date {
  try {
    const iso = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', ...(paths.length > 0 ? ['--', ...paths] : [])],
      {
        timeout: 5000,
        stdio: ['ignore', 'pipe', 'ignore'],
      },
    )
      .toString()
      .trim();
    const d = new Date(iso);
    if (!Number.isNaN(d.getTime())) return d;
  } catch {
    // git unavailable (or shallow build): fall back to build time.
  }
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://emanuelezanardo.info';
  const lastModified = lastContentChange();

  // seo: /uses now exists (page added alongside this change) — it belongs
  // in the sitemap. (A 404 in the sitemap is worse than a missing entry,
  // so this was deliberately withheld until the page landed.)
  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    // seo: post lastmod = the article's actual last content revision
    // (publication date, or the optional `updated` revision date), not
    // build time — so search engines re-crawl revised articles instead of
    // assuming they are unchanged since first publication.
    lastModified: new Date(`${postModifiedDate(post)}T00:00:00Z`),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // seo: case studies live in src/lib/case-studies.ts — file-scoped lastmod
  // (same pattern as the CV PDF below): the repo-wide lastContentChange()
  // would churn on every unrelated push (new blog posts, STATUS.md entries),
  // forcing search engines to re-crawl unchanged case-study pages.
  const caseStudiesLastModified = lastContentChange('src/lib/case-studies.ts');

  // seo: /cv, /uses e /singularity lastmod — file-scoped sugli stessi file
  // che le byline "Last updated" delle pagine leggono via git log, non
  // repo-wide: lastContentChange() senza path churnerebbe a ogni push non
  // correlato (nuovi post, entry STATUS.md), forzando i crawler a
  // re-indicizzare pagine invariate. Stesso pattern di
  // caseStudiesLastModified sopra.
  const cvLastModified = lastContentChange('src/app/cv/page.tsx');
  const usesLastModified = lastContentChange('src/app/uses/page.tsx');
  const singularityLastModified = lastContentChange('src/app/singularity/page.tsx');
  // seo: /blog e /case-studies (pagine indice) lastmod — file-scoped sui
  // data file che guidano il contenuto renderizzato (src/lib/blog-posts.ts /
  // src/lib/case-studies.ts + il page.tsx che renderizza l'ItemList JSON-LD),
  // non repo-wide: lastContentChange() senza path churnerebbe a ogni push
  // non correlato (entry STATUS.md, tweak ai feed, altre pagine), forzando
  // i crawler a re-indicizzare indici invariati. Stesso pattern del
  // caseStudiesLastModified e di cv/uses/singularity qui sopra.
  const blogIndexLastModified = lastContentChange(
    'src/lib/blog-posts.ts',
    'src/app/blog/page.tsx',
  );
  const caseStudiesIndexLastModified = lastContentChange(
    'src/lib/case-studies.ts',
    'src/app/case-studies/page.tsx',
  );
  const caseStudyEntries: MetadataRoute.Sitemap = getCaseStudySlugs().map(
    (slug) => ({
      url: `${base}/case-studies/${slug}`,
      lastModified: caseStudiesLastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    }),
  );

  return [
    {
      url: base,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/blog`,
      lastModified: blogIndexLastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${base}/case-studies`,
      lastModified: caseStudiesIndexLastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/cv`,
      lastModified: cvLastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/uses`,
      lastModified: usesLastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/singularity`,
      lastModified: singularityLastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...blogEntries,
    ...caseStudyEntries,
    // seo: the CV PDF is a public, crawlable asset linked from the About
    // section (download link) — Google indexes PDFs, so it belongs in the
    // sitemap with its own file-scoped lastmod.
    {
      url: `${base}/cv-emanuele-zanardo.pdf`,
      lastModified: lastContentChange('public/cv-emanuele-zanardo.pdf'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
