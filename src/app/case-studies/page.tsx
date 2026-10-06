import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/lib/case-studies";
import { FocusMainOnMount } from "@/components/focus-main-on-mount";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  // Title suffix "| Emanuele Zanardo" comes from the layout's title template.
  title: "Case Studies",
  description:
    "Case studies of real projects: an open-source energy analytics workspace, a Next.js jewellery storefront rebuild, and an in-progress 300 kW load-bank PCB.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies | Emanuele Zanardo",
    description:
      "Real projects, honestly described: energy analytics, a Next.js jewellery storefront, and a 300 kW load-bank PCB.",
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
    description:
      "Real projects, honestly described: energy analytics, a Next.js jewellery storefront, and a 300 kW load-bank PCB.",
    images: [{ url: "/og-image.png", alt: "Emanuele Zanardo — Electronic Engineer" }],
  },
};

export default function CaseStudiesPage() {
  // seo: ItemList dei case study — le pagine articolo espongono già il loro
  // schema; la pagina lista aggiunge la collezione, come già fatto per /blog.
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: caseStudies.map((cs, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        "@id": `https://emanuelezanardo.info/case-studies/${cs.slug}`,
        url: `https://emanuelezanardo.info/case-studies/${cs.slug}`,
        name: cs.title,
        description: cs.summary,
        author: { "@id": "https://emanuelezanardo.info#person" },
        keywords: cs.tech.join(", "),
      },
    })),
  };

  return (
    <main id="main-content" tabIndex={-1} className="focus:outline-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {/* a11y: move focus to <main> after client-side navigation (WCAG 2.4.3) */}
      <FocusMainOnMount />
      <div className="container mx-auto px-4 py-20 lg:py-28">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((cs) => (
            <Card
              key={cs.slug}
              className="group overflow-hidden flex flex-col transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10"
            >
              <CardHeader className="p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  {cs.projectType} · {cs.timeline}
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
                  className="inline-flex items-center min-h-[44px] text-sm font-semibold text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  Read the case study →
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
  );
}
