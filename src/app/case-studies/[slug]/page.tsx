import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy, getCaseStudySlugs } from "@/lib/case-studies";
import { ChevronRight } from "lucide-react";
import { FocusMainOnMount } from "@/components/focus-main-on-mount";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: "Case Study Not Found" };

  const canonical = `/case-studies/${cs.slug}`;
  return {
    // Title suffix "| Emanuele Zanardo" comes from the layout's title template.
    title: cs.title,
    // seo: meta description ≤160 chars so Google shows it whole in SERPs
    description: cs.summary.slice(0, 157) + (cs.summary.length > 157 ? "…" : ""),
    alternates: { canonical },
    openGraph: {
      title: `${cs.title} | Emanuele Zanardo`,
      description: cs.summary,
      url: canonical,
      siteName: "Emanuele Zanardo Portfolio",
      locale: "en_US",
      type: "article",
      // seo: article:author — completes the article OG graph (author was
      // previously only present in the page JSON-LD).
      authors: ["Emanuele Zanardo"],
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
      title: `${cs.title} | Emanuele Zanardo`,
      description: cs.summary,
      images: [{ url: "/og-image.png", alt: "Emanuele Zanardo — Electronic Engineer" }],
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
    headline: cs.title,
    description: cs.summary,
    url: `https://emanuelezanardo.info/case-studies/${cs.slug}`,
    inLanguage: "en",
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
    <main id="main-content" tabIndex={-1} className="focus:outline-none">
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
      <div className="container mx-auto px-4 py-20 lg:py-28 max-w-3xl">
        {/* micro-ux + a11y: breadcrumb invece del semplice "back" — mostra la
            gerarchia del sito (Home / Case Studies / titolo) e aiuta screen
            reader e SEO (BreadcrumbList JSON-LD sopra). */}
        <nav aria-label="Breadcrumb">
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
            <div className="mt-12 flex flex-wrap gap-4">
              {cs.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  // a11y (WCAG 2.5.8): min 44px touch target on mobile
                  className="inline-flex items-center min-h-[44px] px-5 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </article>

        <nav aria-label="More case studies" className="mt-16 border-t pt-8">
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
  );
}
