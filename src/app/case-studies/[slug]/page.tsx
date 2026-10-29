import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { execFileSync } from "node:child_process";
import {
  caseStudies,
  caseStudyReadingMinutes,
  caseStudyWordCount,
  getCaseStudy,
  getCaseStudySlugs,
} from "@/lib/case-studies";
import { CalendarDays, ChevronRight, Clock } from "lucide-react";
import { FocusMainOnMount } from "@/components/focus-main-on-mount";
import { formatPostDate } from "@/app/blog/blog-utils";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { feedAlternatesTypes, hreflangLanguages, truncateDescription } from "@/lib/metadata";

// a11y/seo: come blog/[slug] — slug sconosciuti vanno al not-found
// statico con HTML completo (senza: la 404 dinamica arrivava solo via
// payload RSC, corpo HTML vuoto senza JS: niente h1, niente link home).
export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

// seo: datePublished/dateModified for case studies — git commit dates scoped
// to the data file all 4 case studies live in (src/lib/case-studies.ts), so
// the dates reflect actual content edits rather than deploy time. Mirrors
// the blog pages' post.date / postModifiedDate(post) convention and the
// file-scoped pattern already used by the CV/uses "Last updated" bylines and
// sitemap.ts lastContentChange('src/lib/case-studies.ts') (same value the
// sitemap reports as lastmod). Falls back to today if git is unavailable.
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: "Case Study Not Found" };

  const canonical = `/case-studies/${cs.slug}`;
  // seo: single source of truth for the article description — meta,
  // openGraph and twitter share the truncated text (≤160 chars).
  const description = truncateDescription(cs.summary);
  return {
    // Title suffix "| Emanuele Zanardo" comes from the layout's title template.
    title: cs.title,
    // seo: meta description ≤160 chars so Google shows it whole in SERPs
    description,
    alternates: { canonical, languages: hreflangLanguages(canonical), types: feedAlternatesTypes },
    openGraph: {
      title: `${cs.title} | Emanuele Zanardo`,
      description,
      url: canonical,
      siteName: "Emanuele Zanardo Portfolio",
      locale: "en_US",
      type: "article",
      // seo: article:published_time / article:modified_time — completes the
      // article OG graph (blog pages already emit both); file-scoped git
      // dates on the case-studies data file, mirroring the blog
      // post.date / postModifiedDate(post) convention.
      publishedTime: caseStudyPublishedDate().toISOString(),
      modifiedTime: caseStudyModifiedDate().toISOString(),
      // seo: article:author — completes the article OG graph (author was
      // previously only present in the page JSON-LD).
      authors: ["Emanuele Zanardo"],
      // seo: article:section — completes the article OG graph (high-level
      // section the article belongs to).
      section: "Case Studies",
      // seo: article:tag — completes the article OG graph (technology stack
      // as tags); mirrors the blog pages' `tags: post.tags` and the
      // keywords already present in this page's Article JSON-LD.
      tags: cs.tech,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          // seo: image alt mirrors the case study title (like blog pages
          // use post.title) — describes the actual content, not the site.
          alt: cs.title,
          type: "image/png",
          secureUrl: "https://emanuelezanardo.info/og-image.png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${cs.title} | Emanuele Zanardo`,
      description,
      images: [{ url: "/og-image.png", alt: cs.title }],
    },
    // seo: twitter:label1/data1 + label2/data2 — Twitter/X card labels
    // ("Reading time", "Section") rendered under the card summary. Next's
    // `twitter` Metadata type has no fields for them, so they go through
    // `other`; values mirror the byline "X min read" and the article:section.
    other: {
      "twitter:label1": "Reading time",
      "twitter:data1": `${caseStudyReadingMinutes(cs)} min`,
      "twitter:label2": "Section",
      "twitter:data2": "Case Studies",
    },
  };
}

function Section({ heading, paragraphs }: { heading: string; paragraphs: string[] }) {
  return (
    <section aria-label={heading} className="mt-12">
      <h2 className="font-headline text-3xl text-primary mb-4">{heading}</h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    // seo: @id — stable canonical identity of the article entity itself.
    // Byte-identical to the page canonical (sezione 69 qa-check): mirrors the
    // BlogPosting @id on blog pages (miglioria ciclo 07:40); the nested
    // author/publisher/mainEntityOfPage already had @ids, the main graph not.
    "@id": `https://emanuelezanardo.info/case-studies/${cs.slug}`,
    headline: cs.title,
    description: cs.summary,
    url: `https://emanuelezanardo.info/case-studies/${cs.slug}`,
    // seo: mainEntityOfPage — mirrors the BlogPosting JSON-LD on blog pages
    // (recommended Article field for Google article rich results).
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://emanuelezanardo.info/case-studies/${cs.slug}`,
    },
    // seo: inLanguage/author/publisher/keywords/image — recommended Article
    // fields Google uses for article rich results, mirroring the BlogPosting
    // schema on blog pages so case studies get the same completeness.
    inLanguage: "en-US",
    image: "https://emanuelezanardo.info/og-image.png",
    author: {
      "@type": "Person",
      // seo: @id links this author to the canonical Person entity in the
      // layout JSON-LD (https://emanuelezanardo.info#person); sameAs mirrors
      // the canonical Person's profiles (parita' con le pagine blog).
      "@id": "https://emanuelezanardo.info#person",
      name: "Emanuele Zanardo",
      url: "https://emanuelezanardo.info",
      sameAs: [
        "https://github.com/EmanueleZanardo",
        "https://www.linkedin.com/in/emanuele-zanardo-1954aa193",
      ],
    },
    publisher: {
      "@type": "Person",
      // seo: @id + sameAs — same canonical-Person linkage as author above.
      "@id": "https://emanuelezanardo.info#person",
      name: "Emanuele Zanardo",
      url: "https://emanuelezanardo.info",
      sameAs: [
        "https://github.com/EmanueleZanardo",
        "https://www.linkedin.com/in/emanuele-zanardo-1954aa193",
      ],
    },
    keywords: cs.tech.join(", "),
    // seo: wordCount — recommended Article field (Google article rich
    // results); mirrors the wordCount in the BlogPosting JSON-LD on blog
    // pages, computed from the narrative sections (challenge/approach/
    // outcome).
    wordCount: caseStudyWordCount(cs),
    // seo: timeRequired — schema.org/Duration (ISO 8601) reading-time estimate;
    // mirrors the visible byline "min read" (caseStudyReadingMinutes, same
    // ~80 wpm pace as blog posts) and the twitter:data1 "Reading time" label;
    // parita' col BlogPosting JSON-LD delle pagine blog (ciclo 10:40).
    timeRequired: `PT${caseStudyReadingMinutes(cs)}M`,
    // seo: datePublished/dateModified — recommended Article fields (Google
    // article rich results freshness signal), mirroring the BlogPosting
    // JSON-LD on blog pages; file-scoped git dates on the case-studies
    // data file (same values as the OG published/modified_time above).
    datePublished: caseStudyPublishedDate().toISOString(),
    dateModified: caseStudyModifiedDate().toISOString(),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://emanuelezanardo.info",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Case Studies",
        item: "https://emanuelezanardo.info/case-studies",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cs.title,
      },
    ],
  };

  return (
    // ux: header/footer globali — le pagine case study ne erano prive (unica
    // sezione contenuti senza chrome di navigazione); parità con /blog/[slug]
    // (stesso pattern: chrome escluso dalla stampa via print:hidden).
    <div className="flex min-h-screen flex-col">
      <div className="print:hidden">
        <Header />
      </div>
      <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
      {/* a11y: move focus to <main> after client-side navigation (WCAG 2.4.3) */}
      <FocusMainOnMount />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* print: il contenuto stampabile e' marcato .print-article (contrasto
          carta in globals.css); py azzerato su stampa per non sprecare pagina. */}
      <div className="print-article container mx-auto px-4 py-24 print:py-0 lg:py-32 max-w-3xl">
        {/* micro-ux + a11y: breadcrumb invece del semplice "back" — mostra la
            gerarchia del sito (Home / Case Studies / titolo) e aiuta screen
            reader e SEO (BreadcrumbList JSON-LD sopra). print: non stampato. */}
        <nav aria-label="Breadcrumb" className="print:hidden">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              <Link
                href="/case-studies"
                className="transition-colors hover:text-primary"
              >
                Case Studies
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li
              aria-current="page"
              className="max-w-[180px] truncate text-foreground sm:max-w-xs"
            >
              {cs.title}
            </li>
          </ol>
        </nav>

        <article className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            {cs.projectType} · {cs.timeline}
          </p>
          {/* micro-ux: visible reading-time estimate (Clock + "min read",
              same pattern as blog post pages) — computed from the narrative
              sections at the same ~80 wpm pace as the blog readingMinutes.
              Dates (CalendarDays + published <time>, conditional "Updated"
              when revised) mirror the blog byline and the datePublished /
              dateModified already present in the page's JSON-LD and OG tags —
              the reader sees what the crawlers see. Day-level comparison:
              intra-day edits don't trigger an "Updated" badge. */}
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {(() => {
              const publishedDay = caseStudyPublishedDate().toISOString().slice(0, 10);
              const modifiedDay = caseStudyModifiedDate().toISOString().slice(0, 10);
              return (
                <>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays aria-hidden="true" className="h-4 w-4" />
                    <time dateTime={publishedDay}>{formatPostDate(publishedDay)}</time>
                  </span>
                  {modifiedDay !== publishedDay && (
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden="true">·</span>
                      <span>
                        Updated{" "}
                        <time dateTime={modifiedDay}>{formatPostDate(modifiedDay)}</time>
                      </span>
                    </span>
                  )}
                </>
              );
            })()}
            <span className="inline-flex items-center gap-1.5">
              <Clock aria-hidden="true" className="h-4 w-4" />
              {caseStudyReadingMinutes(cs)} min read
            </span>
          </div>
          <h1 className="font-headline text-4xl md:text-5xl text-primary">
            {cs.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {cs.summary}
          </p>

          <dl className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-lg border bg-card p-6">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Timeline
              </dt>
              <dd className="mt-1 font-semibold">{cs.timeline}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Role
              </dt>
              <dd className="mt-1 font-semibold">{cs.role}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Type
              </dt>
              <dd className="mt-1 font-semibold">{cs.projectType}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <h2 className="sr-only">Tech stack</h2>
            <div className="flex flex-wrap gap-2">
              {cs.tech.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          <Section heading="Challenge" paragraphs={cs.challenge} />
          <Section heading="Approach" paragraphs={cs.approach} />
          <Section heading="Outcome" paragraphs={cs.outcome} />

          {cs.links.length > 0 && (
            // print: bottoni CTA esterni — non stampati.
            <div className="mt-12 flex flex-wrap gap-4 print:hidden">
              {cs.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  // a11y: annuncia esplicitamente la nuova scheda — il glifo "↗"
                  // e' solo decorativo (gli screen reader lo leggerebbero come
                  // "north east arrow")
                  aria-label={`${link.label} (opens in new tab)`}
                  // a11y (WCAG 2.5.8): min 44px touch target on mobile
                  className="inline-flex items-center min-h-[44px] px-5 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          )}
        </article>

        {/* print: nav tra case studies — non stampata. */}
        <nav aria-label="More case studies" className="mt-16 border-t pt-8 print:hidden">
          <h2 className="font-headline text-2xl text-primary mb-4">
            More case studies
          </h2>
          <ul className="space-y-3">
            {caseStudies
              .filter((other) => other.slug !== cs.slug)
              .map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/case-studies/${other.slug}`}
                    // a11y (WCAG 2.5.8): min 44px touch target on mobile
                    className="inline-flex items-center min-h-[44px] font-semibold hover:text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                  >
                    {other.title} →
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
