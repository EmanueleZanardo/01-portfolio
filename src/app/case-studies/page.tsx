import type { Metadata } from "next";
import Link from "next/link";
import { execFileSync } from "node:child_process";
import { Clock } from "lucide-react";
import { caseStudies, caseStudyReadingMinutes } from "@/lib/case-studies";
import { FocusMainOnMount } from "@/components/focus-main-on-mount";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { feedAlternatesTypes, hreflangLanguages } from "@/lib/metadata";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// seo: single source of truth for the page description — shared by the meta
// description, openGraph and twitter tags (same pattern as the root layout:
// a divergent hand-written og:description silently contradicted the meta one).
const DESCRIPTION =
  "Case studies of real projects: energy analytics, a Next.js jewellery storefront, a 24/7 live streaming pipeline, and an in-progress 300 kW PCB.";

export const metadata: Metadata = {
  // Title suffix "| Emanuele Zanardo" comes from the layout's title template.
  title: "Case Studies",
  description: DESCRIPTION,
  alternates: { canonical: "/case-studies", languages: hreflangLanguages('/case-studies'), types: feedAlternatesTypes },
  openGraph: {
    title: "Case Studies | Emanuele Zanardo",
    description: DESCRIPTION,
    url: "/case-studies",
    siteName: "Emanuele Zanardo Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Emanuele Zanardo — Electronic Engineer",
        type: "image/png",
        secureUrl: "https://emanuelezanardo.info/og-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Emanuele Zanardo",
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", alt: "Emanuele Zanardo — Electronic Engineer" }],
  },
};

// seo: datePublished/dateModified for case studies — git commit dates scoped
// to the data file all 4 case studies live in (src/lib/case-studies.ts), so
// the dates reflect actual content edits rather than deploy time. Same
// helpers as case-studies/[slug]/page.tsx; falls back to today if git is
// unavailable.
const CASE_STUDIES_DATA_FILE = "src/lib/case-studies.ts";

function caseStudyFileDate(reverse = false): Date {
  // git --reverse walks the whole history, so it gets a 30s timeout +
  // one retry: a 5s timeout under build load silently fell back to
  // today and shipped a wrong datePublished (QA 13/10/2026 14:40).
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const iso = execFileSync(
        "git",
        ["log", ...(reverse ? ["--reverse"] : ["-1"]), "--format=%cI", "--", CASE_STUDIES_DATA_FILE],
        { timeout: 30000, stdio: ["ignore", "pipe", "ignore"] }
      )
        .toString()
        .trim()
        .split("\n")[0];
      const d = new Date(iso);
      if (!Number.isNaN(d.getTime())) return d;
    } catch {
      // retry once, then fall through to the fallback below
    }
  }
  return new Date();
}

const caseStudyPublishedDate = () => caseStudyFileDate(true);
const caseStudyModifiedDate = () => caseStudyFileDate(false);

export default function CaseStudiesPage() {
  // seo: ItemList dei case study — le pagine articolo espongono già il loro
  // schema; la pagina lista aggiunge la collezione, come già fatto per /blog.
  // seo: datePublished/dateModified su ogni item — stesse date git
  // file-scoped su src/lib/case-studies.ts già usate dalle pagine articolo
  // (case-studies/[slug]/page.tsx) e dalla sitemap come lastmod; completa
  // la parità con l'ItemList del /blog (datePublished sui BlogPosting).
  const datePublished = caseStudyPublishedDate().toISOString();
  const dateModified = caseStudyModifiedDate().toISOString();
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    // seo: inLanguage — parita' con gli altri grafi top-level del sito
    // (blog, uses, layout, cv, singularity: cicli 19:40, 20:40); ItemList
    // eredita da CreativeWork, proprieta' valida.
    inLanguage: "en-US",
    // seo: numberOfItems — proprieta' specifica di schema.org/ItemList
    // (numero di voci della collezione); parita' con l'ItemList del /blog
    // (questo ciclo): completa il grafo per i parser di structured data.
    numberOfItems: caseStudies.length,
    itemListElement: caseStudies.map((cs, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        "@id": `https://emanuelezanardo.info/case-studies/${cs.slug}`,
        url: `https://emanuelezanardo.info/case-studies/${cs.slug}`,
        name: cs.title,
        description: cs.summary,
        datePublished,
        dateModified,
        author: { "@id": "https://emanuelezanardo.info#person" },
        keywords: cs.tech.join(", "),
        // seo: image su ogni item — parità con l'Article JSON-LD delle
        // pagine case study (stessa og-image.png già usata lì) e con
        // l'ItemList del /blog (ciclo a55270c); campo ImageObject
        // raccomandato per gli article rich results.
        image: "https://emanuelezanardo.info/og-image.png",
        // seo: inLanguage — parita' con i grafi top-level (cicli 19:40, 20:40)
        // e con l'Article delle pagine case study: proprieta' valida di
        // CreativeWork; gli item del /blog la ricevono in src/app/blog/page.tsx.
        inLanguage: "en-US",
      },
    })),
  };

  return (
    // ux: header/footer globali — la sezione case-studies ne era priva (unica
    // sezione contenuti senza chrome di navigazione); parità con /blog.
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
      {/* a11y: move focus to <main> after client-side navigation (WCAG 2.4.3) */}
      <FocusMainOnMount />
      <div className="container mx-auto px-4 py-24 lg:py-32">
        {/* seo + a11y: breadcrumb nav + BreadcrumbList JSON-LD */}
        <Breadcrumbs items={[{ name: "Case Studies" }]} />
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Case Studies
          </p>
          <h1 className="font-headline text-4xl md:text-5xl text-primary">
            Projects, explained
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Real work, described honestly — the challenge, the approach, and
            where things stand. No invented clients, no inflated metrics.
          </p>
        </div>
        {/* a11y: h2 di sezione — vedi nota in src/app/blog/page.tsx (le card
            usano CardTitle=h3; senza h2 intermedio l'outline saltava h1->h3). */}
        <h2 id="case-studies-heading" className="sr-only">All case studies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-labelledby="case-studies-heading">
          {caseStudies.map((cs) => (
            <Card
              key={cs.slug}
              className="group overflow-hidden flex flex-col transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10"
            >
              <CardHeader className="p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  {cs.projectType} · {cs.timeline} ·{" "}
                  {/* micro-ux: "min read" sulle card della lista — parita' con
                      le card di /blog (blog-list.tsx mostra
                      {post.readingMinutes} min read) e con la byline delle
                      pagine articolo; usa lo stesso helper caseStudyReadingMinutes
                      (~80 wpm) gia' verificato su /case-studies/[slug]. */}
                  <span className="inline-flex items-center gap-1">
                    <Clock aria-hidden="true" className="h-3.5 w-3.5" />
                    {caseStudyReadingMinutes(cs)} min read
                  </span>
                </p>
                <CardTitle className="font-headline text-2xl tracking-wide">
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className="group-hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                  >
                    {cs.title}
                  </Link>
                </CardTitle>
                <p className="text-sm text-muted-foreground font-semibold">
                  {cs.role}
                </p>
              </CardHeader>
              <CardContent className="flex-grow p-6 pt-0">
                <CardDescription>{cs.summary}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex flex-col items-start gap-4">
                <div className="flex flex-wrap gap-2">
                  {cs.tech.map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
                <Link
                  href={`/case-studies/${cs.slug}`}
                  // a11y (WCAG 2.5.8): min 44px touch target on mobile
                  // a11y (WCAG 2.4.4 Link Purpose): il testo visibile
                  // "Read the case study →" e' identico su tutte le card ma
                  // punta a case study diversi — aria-label univoco per
                  // distinguere le destinazioni (screen reader, speech input).
                  // a11y (WCAG 2.5.3 Label in Name): la freccia e' decorativa —
                  // aria-hidden cosi' il testo visibile ("Read the case study")
                  // e' contenuto nel nome accessibile (sezione QA 118).
                  aria-label={`Read the case study: ${cs.title}`}
                  className="inline-flex items-center min-h-[44px] text-sm font-semibold text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  Read the case study <span aria-hidden="true">→</span>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <p className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center min-h-[44px] text-sm font-semibold text-muted-foreground hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            ← Back to Portfolio
          </Link>
        </p>
      </div>
      </main>
      <Footer />
    </div>
  );
}
