import React from "react";
import type { BlogBlock } from "@/lib/blog-posts";
import { cn } from "@/lib/utils";

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
  return (
    <div className="space-y-5 text-base leading-7 text-foreground/90">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return <p key={i}>{renderInline(block.text, `p${i}`)}</p>;
          case "heading":
            return block.level === 2 ? (
              <h2
                key={i}
                className={cn(
                  "font-headline text-3xl tracking-wide text-primary",
                  "pt-6"
                )}
              >
                {block.text}
              </h2>
            ) : (
              <h3 key={i} className="pt-4 text-xl font-semibold text-foreground">
                {block.text}
              </h3>
            );
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
