import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * a11y + seo: breadcrumb nav condivisa per le pagine indice (blog,
 * case-studies, uses, cv). Renderizza la <nav aria-label="Breadcrumb"> con
 * aria-current="page" sull'elemento corrente e inietta il BreadcrumbList
 * JSON-LD (stesso schema usato dalle pagine articolo) per i rich result
 * di Google. "Home" e' sempre il primo elemento.
 */
export interface BreadcrumbItem {
  name: string;
  /** Assente => elemento corrente (non linkato). */
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const full: BreadcrumbItem[] = [{ name: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: full.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.href
        ? { item: `https://emanuelezanardo.info${item.href}` }
        : {}),
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          {full.map((item, i) => {
            const isLast = i === full.length - 1;
            return (
              <li key={item.name} className="flex items-center gap-1.5">
                {i > 0 && (
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={isLast ? "text-foreground" : undefined}
                  >
                    {item.name}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
