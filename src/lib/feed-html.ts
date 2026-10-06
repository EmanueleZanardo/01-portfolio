import type { BlogBlock } from '@/lib/blog-posts';

// feed: shared rendering of blog blocks as HTML, used by both the RSS 2.0
// feed (src/app/feed.xml/route.ts) and the JSON Feed 1.1 feed
// (src/app/feed.json/route.ts). Single source of truth so the two feeds can
// never drift apart; mirrors the block mapping of the on-page article
// renderer (src/app/blog/article-body.tsx).

/** Escape the five XML special characters so post titles/excerpts can't
 *  break the feed document. */
export function escapeXml(value: string): string {
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
export function renderInlineHtml(text: string): string {
  const escaped = escapeXml(text);
  return escaped.replace(/`([^`]+)`/g, '<code>$1</code>');
}

/** Plain-HTML rendering of a BlogBlock for feed content. */
export function blockToHtml(block: BlogBlock): string {
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
