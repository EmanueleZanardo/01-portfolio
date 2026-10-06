import { getAllPosts } from '@/lib/blog-posts';
import type { BlogBlock } from '@/lib/blog-posts';

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

/** Escape XML, then render inline `code` spans as <code> (mirrors the
 *  renderInline() of the on-page article renderer). Backticks survive
 *  escaping untouched, so the conversion is safe to apply after. */
function renderInlineHtml(text: string): string {
  const escaped = escapeXml(text);
  return escaped.replace(/`([^`]+)`/g, '<code>$1</code>');
}

/** Plain-HTML rendering of a BlogBlock for <content:encoded>: mirrors
 *  ArticleBody's block mapping so the feed text matches the on-page article. */
function blockToHtml(block: BlogBlock): string {
  switch (block.type) {
    case 'paragraph':
      return `<p>${renderInlineHtml(block.text)}</p>`;
    case 'heading':
      return block.level === 2
        ? `<h2>${renderInlineHtml(block.text)}</h2>`
        : `<h3>${renderInlineHtml(block.text)}</h3>`;
    case 'code':
      return `<pre><code>${escapeXml(block.code)}</code></pre>`;
    case 'list':
      return `<ul>${block.items.map((item) => `<li>${renderInlineHtml(item)}</li>`).join('')}</ul>`;
    case 'quote':
      return `<blockquote>${renderInlineHtml(block.text)}</blockquote>`;
  }
}

/**
 * GET /feed.xml — RSS 2.0 feed of the blog.
 * Fully static (posts are a compile-time constant), so it can be cached
 * aggressively; the content changes only when a post is added or edited.
 */
export async function GET(): Promise<Response> {
  const posts = getAllPosts();
  // Newest post drives the channel's lastBuildDate (deterministic: keeps the
  // route fully static so Vercel can prerender it and CDNs can cache it).
  const lastBuildDate =
    posts.length > 0
      ? new Date(`${posts[0].date}T00:00:00Z`).toUTCString()
      : new Date().toUTCString();
  const items = posts
    .map((post) => {
      const url = `${SITE}/blog/${post.slug}`;
      const pubDate = new Date(`${post.date}T00:00:00Z`).toUTCString();
      const categories = post.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join('\n');
      const contentHtml = post.content.map(blockToHtml).join('\n');
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <content:encoded>${escapeXml(contentHtml)}</content:encoded>
      <pubDate>${pubDate}</pubDate>
${categories}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Emanuele Zanardo — Blog</title>
    <link>${SITE}/blog</link>
    <description>Notes on embedded systems, PCB design, firmware and energy by Emanuele Zanardo.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <ttl>60</ttl>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <copyright>Copyright ${new Date().getFullYear()} Emanuele Zanardo</copyright>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE}/rss-channel-icon.png</url>
      <title>Emanuele Zanardo — Blog</title>
      <link>${SITE}/blog</link>
      <width>144</width>
      <height>144</height>
    </image>
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
