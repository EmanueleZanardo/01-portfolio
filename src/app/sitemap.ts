import type { MetadataRoute } from 'next';
import { execFileSync } from 'child_process';
import { getAllPosts, postModifiedDate } from '@/lib/blog-posts';
import { getCaseStudySlugs } from '@/lib/case-studies';

// lastModified tracks the actual last content change (git commit date at build
// time), not the build time: a bare "new Date()" churns the sitemap on every
// redeploy (Vercel rebuilds on each push), forcing search engines to re-crawl
// pages that did not change. With an optional path, the date is scoped to
// that file's own history (git log -- <path>), so an asset that rarely
// changes (e.g. the CV PDF) keeps a stable lastmod while code churns.
function lastContentChange(path?: string): Date {
  try {
    const iso = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', ...(path ? ['--', path] : [])],
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

  const caseStudyEntries: MetadataRoute.Sitemap = getCaseStudySlugs().map(
    (slug) => ({
      url: `${base}/case-studies/${slug}`,
      lastModified,
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
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${base}/case-studies`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/cv`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/uses`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/singularity`,
      lastModified,
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
