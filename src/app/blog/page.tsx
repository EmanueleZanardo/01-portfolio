import type { Metadata } from "next";
import { execFileSync } from "node:child_process";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FocusMainOnMount } from "@/components/focus-main-on-mount";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getAllPosts, getAllTags, postModifiedDate } from "@/lib/blog-posts";
import { BlogList } from "./blog-list";
import { feedAlternatesTypes, hreflangLanguages } from "@/lib/metadata";

// seo: single source of truth for the page description — shared by the meta
// description, openGraph and twitter tags (same pattern as the root layout:
// a divergent hand-written og:description silently contradicted the meta one).
const DESCRIPTION =
  "Technical notes: energy storage, Linux reliability, Next.js, KiCad PCB design and Streamlit data tooling — from real engineering practice.";

export const metadata: Metadata = {
  // Title suffix "| Emanuele Zanardo" comes from the layout's title template.
  title: "Engineering Blog",
  description: DESCRIPTION,
  alternates: { canonical: "/blog", languages: hreflangLanguages('/blog'), types: feedAlternatesTypes },
  openGraph: {
    title: "Engineering Blog | Emanuele Zanardo",
    description: DESCRIPTION,
    url: "/blog",
    siteName: "Emanuele Zanardo Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blog — Emanuele Zanardo",
        type: "image/png",
        secureUrl: "https://emanuelezanardo.info/og-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Blog | Emanuele Zanardo",
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", alt: "Blog — Emanuele Zanardo" }],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  // seo: datePublished/dateModified top-level dell'ItemList — date git
  // scoped al data file src/lib/blog-posts.ts (dove vivono tutti i post),
  // così le date riflettono i contenuti reali e non il deploy. Stesso
  // pattern di /case-studies (data file scoped) e /uses (pagina scoped):
  // l'ItemList del /blog era l'unico dei tre senza date di collezione
  // (aveva solo le date per-item). dateModified = ultimo commit del data
  // file; datePublished = primo commit che lo ha toccato (nascita della
  // collezione). Fallback a oggi se git non e' disponibile (build Vercel).
  const BLOG_POSTS_DATA_FILE = "src/lib/blog-posts.ts";
  function blogFileDate(reverse = false): Date {
    // git --reverse walks the whole history, so it gets a 30s timeout +
    // one retry: a 5s timeout under build load silently fell back to
    // today and shipped a wrong datePublished (QA 13/10/2026 14:40,
    // case-studies). Same hardening as the case-studies helpers.
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const iso = execFileSync(
          "git",
          ["log", ...(reverse ? ["--reverse"] : ["-1"]), "--format=%cI", "--", BLOG_POSTS_DATA_FILE],
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
  const blogPublished = blogFileDate(true).toISOString();
  const blogModified = blogFileDate(false).toISOString();

  // seo: ItemList dei post — le pagine articolo espongono già BlogPosting +
  // BreadcrumbList; la pagina lista completa la collezione con l'ItemList,
  // così Google associa l'elenco agli articoli indicizzati.
  // seo: datePublished/dateModified su ogni item — dateModified = campo
  // `updated` del post se rivisto dopo la pubblicazione, altrimenti la data
  // di pubblicazione (postModifiedDate), stessa convenzione del BlogPosting
  // JSON-LD sulle pagine articolo; completa la parità con l'ItemList dei
  // case studies (datePublished/dateModified dal 08/10).
  // seo: image su ogni item — parità con il BlogPosting JSON-LD sulle pagine
  // articolo (stessa og-image.png con alt = titolo, ciclo b2fc27e); campo
  // ImageObject raccomandato per gli article rich results.
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    // seo: date di collezione — parita' con gli ItemList di /case-studies
    // (ciclo 05:39) e /uses (ciclo 17:40); qui scoped al data file dei post.
    datePublished: blogPublished,
    dateModified: blogModified,
    // seo: inLanguage — parita' con gli altri grafi top-level del sito
    // (layout, cv, singularity e le pagine articolo: cicli 19:40, 20:40);
    // ItemList eredita da CreativeWork, proprieta' valida.
    inLanguage: "en-US",
    // seo: numberOfItems — proprieta' specifica di schema.org/ItemList
    // (numero di voci della collezione); completa il grafo per i parser
    // di structured data e i rich result delle pagine lista.
    numberOfItems: posts.length,
    itemListElement: posts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "BlogPosting",
        "@id": `https://emanuelezanardo.info/blog/${post.slug}`,
        url: `https://emanuelezanardo.info/blog/${post.slug}`,
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: postModifiedDate(post),
        author: { "@id": "https://emanuelezanardo.info#person" },
        keywords: post.tags.join(", "),
        image: "https://emanuelezanardo.info/og-image.png",
        // seo: inLanguage — parita' con i grafi top-level (cicli 19:40, 20:40)
        // e con il BlogPosting delle pagine articolo: e' una proprieta'
        // valida di CreativeWork (BlogPosting la eredita); gli item dei
        // case-studies la ricevono in src/app/case-studies/page.tsx.
        inLanguage: "en-US",
      },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-grow focus:outline-none"
      >
        <FocusMainOnMount />
        <div className="container mx-auto px-4 py-24 lg:py-32">
          {/* seo + a11y: breadcrumb nav + BreadcrumbList JSON-LD */}
          <Breadcrumbs items={[{ name: "Blog" }]} />
          <div className="mb-12 text-center">
            <h1 className="font-headline text-4xl text-primary md:text-5xl">
              Blog
            </h1>
            <p className="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
              Technical notes from the bench and the terminal — energy
              storage, web engineering, PCB design and data tooling.
            </p>
          </div>
          {/* a11y: h2 di sezione — le card usano CardTitle=h3 per convenzione
              del design system (corretto sotto gli h2 delle sezioni in
              homepage); senza un h2 intermedio l'outline qui saltava da h1
              a h3 (axe-core "heading-order"). sr-only: h1 + filtro tag
              comunicano gia' la sezione ai vedenti. */}
          <h2 id="articles-heading" className="sr-only">All articles</h2>
          <BlogList posts={posts} tags={tags} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
