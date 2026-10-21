import React from "react";
import type { BlogBlock } from "@/lib/blog-posts";
import { cn } from "@/lib/utils";
import { CopyCodeButton } from "./copy-code-button";

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
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts = text.split(/(`[^`]+`)/g);
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

/**
 * Accessible name per la <pre> scrollabile di un code block.
 * a11y (axe landmark-unique / scrollable-region-focusable): ogni regione
 * deve avere un nome univoco nella pagina. Quando un articolo contiene più
 * code block (anche dello stesso linguaggio) il nome include il progressivo
 * "n di N" così due <pre> non condividono mai lo stesso accessible name.
 */
function codeRegionLabel(language: string, index: number, total: number): string {
  const base = language ? `Esempio di codice ${language}` : "Esempio di codice";
  const numbered = total > 1 ? `${base}, ${index} di ${total}` : base;
  return `${numbered}, scorrevole orizzontalmente`;
}

function CodeBlock({
  language,
  code,
  index,
  total,
}: {
  language: string;
  code: string;
  index: number;
  total: number;
}) {
  return (
    <figure className="my-6 overflow-hidden rounded-lg border border-border/60 bg-muted/40">
      {/* micro-ux: header row pairs the language label with a copy button
          (CopyCodeButton, client component) — readers of a technical blog
          copy commands/configs constantly; previously they had to
          select the text by hand. */}
      <figcaption className="flex items-center justify-between border-b border-border/60 px-4 py-1.5 font-code text-xs uppercase tracking-wider text-muted-foreground print:hidden">
        <span>{language}</span>
        <CopyCodeButton code={code} language={language} />
      </figcaption>
      <pre
        className="overflow-x-auto p-4 font-code text-sm leading-relaxed focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        tabIndex={0}
        role="region"
        aria-label={codeRegionLabel(language, index, total)}
      >
        <code>{code}</code>
      </pre>
    </figure>
  );
}

export function ArticleBody({ blocks }: { blocks: BlogBlock[] }) {
  // Tracks generated heading ids so duplicates in one article get unique
  // anchors (see slugifyHeading).
  const usedSlugs = new Set<string>();
  // Sequenza dei code block nell'articolo: mappa indice-blocco -> progressivo
  // (1..N). Serve a CodeBlock per nomi regione univoci (landmark-unique).
  // Calcolata in un passaggio separato prima del render: pura e deterministica,
  // nessuna mutazione durante la map del JSX (sicura anche in SSR).
  const codeSeq = new Map<number, number>();
  let codeTotal = 0;
  blocks.forEach((b, i) => {
    if (b.type === "code") codeSeq.set(i, ++codeTotal);
  });
  return (
    <div className="print-article space-y-5 text-base leading-7 text-foreground/90">
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
                title="Permalink to this section"
                className="ml-2 inline-block align-baseline text-[0.7em] text-primary/50 opacity-0 transition-opacity duration-150 hover:text-primary group-hover:opacity-100 focus-visible:opacity-100 motion-reduce:transition-none print:hidden"
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
            return (
              <CodeBlock
                key={i}
                language={block.language}
                code={block.code}
                index={codeSeq.get(i) ?? 1}
                total={codeTotal}
              />
            );
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
