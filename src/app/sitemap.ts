import type { MetadataRoute } from 'next';
import { execSync } from 'child_process';

// lastModified tracks the actual last content change (git commit date at build
// time), not the build time: a bare "new Date()" churns the sitemap on every
// redeploy (Vercel rebuilds on each push), forcing search engines to re-crawl
// pages that did not change.
function lastContentChange(): Date {
  try {
    const iso = execSync('git log -1 --format=%cI', {
      timeout: 5000,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
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
  ];
}
