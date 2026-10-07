import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FocusMainOnMount } from "@/components/focus-main-on-mount";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getAllPosts, getAllTags } from "@/lib/blog-posts";
import { BlogList } from "./blog-list";

export const metadata: Metadata = {
  // Title suffix "| Emanuele Zanardo" comes from the layout's title template.
  title: "Blog",
  description:
    "Technical notes by Emanuele Zanardo: energy storage, Linux reliability, Next.js, KiCad PCB design and Streamlit data tooling — from real engineering practice.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Emanuele Zanardo",
    description:
      "Technical notes on energy storage, Next.js, KiCad PCB design and Streamlit — from real engineering practice.",
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
    title: "Blog | Emanuele Zanardo",
    description:
      "Technical notes on energy storage, Next.js, KiCad PCB design and Streamlit — from real engineering practice.",
    images: [{ url: "/og-image.png", alt: "Blog — Emanuele Zanardo" }],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  // seo: ItemList dei post — le pagine articolo espongono già BlogPosting +
  // BreadcrumbList; la pagina lista completa la collezione con l'ItemList,
  // così Google associa l'elenco agli articoli indicizzati.
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
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
        author: { "@id": "https://emanuelezanardo.info#person" },
        keywords: post.tags.join(", "),
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
          <BlogList posts={posts} tags={tags} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
