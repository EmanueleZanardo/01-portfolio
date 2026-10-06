import { getAllPosts } from '@/lib/blog-posts';
import { blockToHtml } from '@/lib/feed-html';

const SITE = 'https://emanuelezanardo.info';

/**
 * GET /feed.json — JSON Feed 1.1 of the blog (https://www.jsonfeed.org/version/1.1/).
 * Modern companion to the RSS 2.0 feed (/feed.xml): many readers (NetNewsWire,
 * Feedbin, Reeder…) prefer JSON, and parsers don't need an XML stack.
 * Item HTML comes from the shared @/lib/feed-html renderer, so it is
 * byte-identical to the RSS <content:encoded> for the same post.
 */
export async function GET(): Promise<Response> {
  const posts = getAllPosts();

  const items = posts.map((post) => {
    const url = `${SITE}/blog/${post.slug}`;
    return {
      // JSON Feed spec: id must be a unique string for the item — the
      // permalink is stable across title edits, so it is the right id.
      id: url,
      url,
      title: post.title,
      summary: post.excerpt,
      content_html: post.content.map(blockToHtml).join('\n'),
      // RFC 3339: post.date is a calendar day ("2026-10-06").
      date_published: `${post.date}T00:00:00Z`,
      tags: post.tags,
    };
  });

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Emanuele Zanardo — Blog',
    home_page_url: `${SITE}/blog`,
    feed_url: `${SITE}/feed.json`,
    description:
      'Notes on embedded systems, PCB design, firmware and energy by Emanuele Zanardo.',
    icon: `${SITE}/rss-channel-icon.png`,
    favicon: `${SITE}/favicon.ico`,
    language: 'en',
    items,
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      // same caching rationale as /feed.xml: content changes only when a
      // post changes (a new deploy busts stale caches).
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
