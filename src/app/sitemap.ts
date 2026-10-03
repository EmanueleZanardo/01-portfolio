import type { MetadataRoute } from 'next';
import { execFileSync } from 'child_process';

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
  return [
    {
      url: base,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/singularity`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
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
