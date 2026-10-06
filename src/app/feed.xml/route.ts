import { getAllPosts } from '@/lib/blog-posts';

const SITE = 'https://emanuelezanardo.info';

/** Escape the five XML special characters so post titles/excerpts can't
 *  break the feed document. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * GET /feed.xml — RSS 2.0 feed of the blog.
 * Fully static (posts are a compile-time constant), so it can be cached
 * aggressively; the content changes only when a post is added or edited.
 */
export async function GET(): Promise<Response> {
  const items = getAllPosts()
    .map((post) => {
      const url = `${SITE}/blog/${post.slug}`;
      const pubDate = new Date(`${post.date}T00:00:00Z`).toUTCString();
      const categories = post.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join('\n');
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
${categories}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Emanuele Zanardo — Blog</title>
    <link>${SITE}/blog</link>
    <description>Notes on embedded systems, PCB design, firmware and energy by Emanuele Zanardo.</description>
    <language>en</language>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      // content changes only when a post changes, so it can be cached hard
      // (a new deploy always replaces the URL, busting stale caches).
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
