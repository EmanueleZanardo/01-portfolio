import { statSync } from 'node:fs';
import { join } from 'node:path';
import { getAllPosts } from '@/lib/blog-posts';
import { escapeXml, blockToHtml } from '@/lib/feed-html';

const SITE = 'https://emanuelezanardo.info';

// perf/seo: feed 100% determinato dai dati a compile time (post + byte size
// dell'OG image letta a build time) — Next lo prerenderizza una volta e lo
// serve dalla CDN (match con Cache-Control aggressivo sotto e i commenti
// "prerendered"). Senza questo, il route veniva segnato come Dynamic (ƒ)
// nel report di build nonostante il contenuto fosse statico.
export const dynamic = 'force-static';

// seo: RSS 2.0 <enclosure> — exposes each article's main image to feed
// readers that render enclosures as thumbnails. `length` (bytes) is a
// required attribute per the RSS 2.0 spec, so it is read once at build
// time from the committed public/og-image.png (the route is statically
// prerendered; all posts share the site-wide OG image — same as the
// article pages' OG/Twitter card, the BlogPosting JSON-LD image and the
// feed.json item image). Defensive: if the file can't be read, the feed
// ships without enclosures instead of a wrong length.
let ogImageBytes: number | null = null;
try {
  ogImageBytes = statSync(join(process.cwd(), 'public', 'og-image.png')).size;
} catch {
  ogImageBytes = null;
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
  const enclosureTag =
    ogImageBytes !== null
      ? `      <enclosure url="${SITE}/og-image.png" length="${ogImageBytes}" type="image/png" />\n`
      : '';
  const items = posts
    .map((post) => {
      const url = `${SITE}/blog/${post.slug}`;
      const pubDate = new Date(`${post.date}T00:00:00Z`).toUTCString();
      const categories = post.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join('\n');
      const contentHtml = post.content.map(blockToHtml).join('\n');
      // rss: <author> is the item author's email per the RSS 2.0 spec
      // (parenthesized display name is the conventional form); matches the
      // public contact email already shown on the site and the feed-level
      // author in feed.json.
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <author>emanuele1998zanardo@gmail.com (Emanuele Zanardo)</author>
      <description>${escapeXml(post.excerpt)}</description>
      <content:encoded>${escapeXml(contentHtml)}</content:encoded>
${enclosureTag}      <pubDate>${pubDate}</pubDate>
${categories}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">
  <channel>
    <title>Engineering Blog | Emanuele Zanardo</title>
    <link>${SITE}/blog</link>
    <description>Notes on embedded systems, PCB design, firmware and energy by Emanuele Zanardo.</description>
    <!-- seo: language "en-US" — BCP 47, stessa convenzione inLanguage
         "en-US" ora uniforme su tutti i grafi JSON-LD del sito (cicli
         19:40, 20:40, 21:40): "en" bare era l'ultimo segnale lingua
         rimasto non allineato. -->
    <language>en-US</language>
    <!-- seo: <category> a livello di canale — RSS 2.0 standard: dichiara
         il dominio tematico del blog agli aggregatori (gli item hanno gia'
         le loro <category> dai tag dei post). Un blog su embedded, PCB,
         firmware ed energia rientra nella categoria convenzionale
         "Technology". -->
    <category>Technology</category>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <ttl>60</ttl>
    <sy:updatePeriod>weekly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <!-- seo: <generator> identifies the channel producer per the RSS 2.0 spec;
         the site's own URL is the conventional value for hand-rolled feeds. -->
    <generator>${SITE}</generator>
    <copyright>Copyright ${new Date().getFullYear()} Emanuele Zanardo</copyright>
    <!-- seo: <managingEditor>/<webMaster> — campi standard RSS 2.0 a livello
         di canale (responsabile editoriale e tecnico). Stessa email pubblica
         gia' usata in <author> degli item, footer e security.txt: nessuna
         nuova esposizione; su un blog personale le due figure coincidono. -->
    <managingEditor>emanuele1998zanardo@gmail.com (Emanuele Zanardo)</managingEditor>
    <webMaster>emanuele1998zanardo@gmail.com (Emanuele Zanardo)</webMaster>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE}/rss-channel-icon.png</url>
      <title>Engineering Blog | Emanuele Zanardo</title>
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
