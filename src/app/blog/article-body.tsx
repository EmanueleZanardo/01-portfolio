import React from "react";
import type { BlogBlock } from "@/lib/blog-posts";
import { cn } from "@/lib/utils";

/**
 * Builds a GitHub-style anchor id from a heading's text: lowercase,
 * diacritics stripped, punctuation dropped, words joined with hyphens.
 * Pure and deterministic (server component renders once per page), so SSR
 * and client HTML always agree. Duplicate headings in one article get
 * suffixed ids (`my-heading`, `my-heading-2`, ...) via the `used` set.
 */
function slugifyHeading(text: string, used: Set<string>): string {
  const base =
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/[\s_-]+/g, "-") || "section";
  let slug = base;
  let n = 2;
  while (used.has(slug)) slug = `${base}-${n++}`;
  used.add(slug);
  return slug;
}

/**
 * Renders inline `code` spans inside paragraph/list/quote text.
 * Plain React, no markdown dependency.
 */
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={`${keyPrefix}-${i}`}
          className="rounded bg-muted px-1.5 py-0.5 font-code text-[0.85em] text-primary"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={`${keyPrefix}-${i}`}>{part}</React.Fragment>;
  });
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  return (
    <figure className="my-6 overflow-hidden rounded-lg border border-border/60 bg-muted/40">
      <figcaption className="border-b border-border/60 px-4 py-1.5 font-code text-xs uppercase tracking-wider text-muted-foreground">
        {language}
      </figcaption>
      <pre className="overflow-x-auto p-4 font-code text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
    </figure>
  );
}

export function ArticleBody({ blocks }: { blocks: BlogBlock[] }) {
  // Tracks generated heading ids so duplicates in one article get unique
  // anchors (see slugifyHeading).
  const usedSlugs = new Set<string>();
  return (
    <div className="space-y-5 text-base leading-7 text-foreground/90">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return <p key={i}>{renderInline(block.text, `p${i}`)}</p>;
          case "heading": {
            // micro-ux: every heading gets a stable id plus a GitHub-style
            // permalink ("#") revealed on hover/focus — sections of an
            // article become deep-linkable (previously only the page top
            // had an anchor). The link is keyboard-focusable and announced
            // as "Link to section: <heading>"; scroll-margin (globals.css)
            // keeps the jumped-to heading clear of the fixed header.
            const slug = slugifyHeading(block.text, usedSlugs);
            const permalink = (
              <a
                href={`#${slug}`}
                aria-label={`Link to section: ${block.text}`}
                className="ml-2 inline-block align-baseline text-[0.7em] text-primary/50 opacity-0 transition-opacity duration-150 hover:text-primary group-hover:opacity-100 focus-visible:opacity-100 motion-reduce:transition-none"
              >
                <span aria-hidden="true">#</span>
              </a>
            );
            return block.level === 2 ? (
              <h2
                key={i}
                id={slug}
                className={cn(
                  "group font-headline text-3xl tracking-wide text-primary",
                  "pt-6"
                )}
              >
                {block.text}
                {permalink}
              </h2>
            ) : (
              <h3
                key={i}
                id={slug}
                className="group pt-4 text-xl font-semibold text-foreground"
              >
                {block.text}
                {permalink}
              </h3>
            );
          }
          case "code":
            return <CodeBlock key={i} language={block.language} code={block.code} />;
          case "list":
            return (
              <ul key={i} className="list-disc space-y-2 pl-6 marker:text-primary">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item, `li${i}-${j}`)}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-primary pl-4 italic text-muted-foreground"
              >
                {renderInline(block.text, `q${i}`)}
              </blockquote>
            );
        }
      })}
    </div>
  );
}
