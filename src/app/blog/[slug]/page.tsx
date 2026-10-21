import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronRight, Clock } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FocusMainOnMount } from "@/components/focus-main-on-mount";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getAllPosts, getPostBySlug, postModifiedDate, postWordCount } from "@/lib/blog-posts";
import { ArticleBody } from "../article-body";
import { formatPostDate } from "../blog-utils";
import { feedAlternatesTypes, hreflangLanguages, truncateDescription } from "@/lib/metadata";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  // seo: single source of truth for the article description — meta,
  // openGraph and twitter share the truncated text (≤160 chars).
  const description = truncateDescription(post.excerpt);

  return {
    // Title suffix "| Emanuele Zanardo" comes from the layout's title template.
    title: post.title,
    // seo: meta description kept ≤160 chars so Google shows it whole in SERPs.
    description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}`, languages: hreflangLanguages(`/blog/${post.slug}`), types: feedAlternatesTypes },
    openGraph: {
      title: `${post.title} | Emanuele Zanardo`,
      description,
      url: `/blog/${post.slug}`,
      siteName: "Emanuele Zanardo Portfolio",
      locale: "en_US",
      type: "article",
      publishedTime: `${post.date}T00:00:00Z`,
      // seo: article:modified_time — Google uses it to tell readers (and the
      // crawler) how fresh the article is; equals the publication date until
      // the post is actually revised (post.updated set).
      modifiedTime: `${postModifiedDate(post)}T00:00:00Z`,
      // seo: article:author — completes the article OG graph (author was
      // previously only present in the BlogPosting JSON-LD).
      authors: ["Emanuele Zanardo"],
      // seo: article:section — completes the article OG graph (high-level
      // section the article belongs to).
      section: "Blog",
      tags: post.tags,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/png",
          secureUrl: "https://emanuelezanardo.info/og-image.png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Emanuele Zanardo`,
      description,
      images: [{ url: "/og-image.png", alt: post.title }],
    },
    // seo: twitter:label1/data1 + label2/data2 — Twitter/X card labels
    // ("Reading time", "Section") rendered under the card summary. Next's
    // `twitter` Metadata type has no fields for them, so they go through
    // `other`; values mirror the byline "X min read" and the article:section.
    other: {
      "twitter:label1": "Reading time",
      "twitter:data1": `${post.readingMinutes} min`,
      "twitter:label2": "Section",
      "twitter:data2": "Blog",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  // posts are newest-first: "previous" in reading order is the older post.
  const olderPost = index < posts.length - 1 ? posts[index + 1] : null;
  const newerPost = index > 0 ? posts[index - 1] : null;

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    // seo: @id — stable canonical identity of the article entity itself.
    // Byte-identical to the page canonical (sezione 69 qa-check): the nested
    // author/publisher/mainEntityOfPage already had @ids, but the main graph
    // had none — entity linking / disambiguazione nei knowledge graph.
    "@id": `https://emanuelezanardo.info/blog/${post.slug}`,
    headline: post.title,
    description: post.excerpt,
    datePublished: `${post.date}T00:00:00Z`,
    // seo: dateModified — recommended Article field (Google article rich
    // results freshness signal); falls back to the publication date for
    // never-revised posts (post.updated unset).
    dateModified: `${postModifiedDate(post)}T00:00:00Z`,
    // seo: wordCount/image/inLanguage — recommended Article fields Google
    // uses for article rich results; wordCount is computed from the blocks.
    wordCount: postWordCount(post),
    // seo: timeRequired — schema.org/Duration (ISO 8601) reading-time estimate;
    // mirrors the visible byline "{n} min read" and the twitter:data1 "Reading
    // time" label (same post.readingMinutes), so crawlers see what the reader
    // sees. timeRequired is a valid property of Article on schema.org.
    timeRequired: `PT${post.readingMinutes}M`,
    image: "https://emanuelezanardo.info/og-image.png",
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      // seo: @id links this author to the canonical Person entity in the
      // layout JSON-LD (https://emanuelezanardo.info#person) instead of
      // duplicating it; sameAs mirrors the canonical Person's profiles so
      // the authorship graph stays connected even when parsed standalone.
      "@id": "https://emanuelezanardo.info#person",
      name: "Emanuele Zanardo",
      url: "https://emanuelezanardo.info",
      sameAs: [
        "https://github.com/EmanueleZanardo",
        "https://www.linkedin.com/in/emanuele-zanardo-1954aa193",
      ],
    },
    // seo: publisher — recommended Article field for Google article rich
    // results; mirrors the Article JSON-LD on case study pages (publisher
    // is a Person here since the site is self-published by Emanuele).
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://emanuelezanardo.info/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
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
        name: "Blog",
        item: "https://emanuelezanardo.info/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* print: header/footer sono chrome di navigazione — non stampati
          (stesso pattern della pagina CV: div print:hidden). */}
      <div className="print:hidden">
        <Header />
      </div>
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-grow focus:outline-none"
      >
        <FocusMainOnMount />
        <article className="print-article container mx-auto max-w-3xl px-4 py-24 print:py-0 lg:py-32">
          {/* print: breadcrumb di navigazione — non stampato. */}
          <nav aria-label="Breadcrumb" className="mb-8 print:hidden">
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
                  href="/blog"
                  className="transition-colors hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li
                aria-current="page"
                className="max-w-[180px] truncate text-foreground sm:max-w-xs"
              >
                {post.title}
              </li>
            </ol>
          </nav>

          <header className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays aria-hidden="true" className="h-4 w-4" />
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              </span>
              {/* micro-ux: show the revision date only for actually revised
                  posts (post.updated set) — machine-readable via dateTime,
                  consistent with the dateModified in the JSON-LD above. */}
              {post.updated && post.updated !== post.date && (
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden="true">·</span>
                  <span>
                    Updated{" "}
                    <time dateTime={post.updated}>
                      {formatPostDate(post.updated)}
                    </time>
                  </span>
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Clock aria-hidden="true" className="h-4 w-4" />
                {post.readingMinutes} min read
              </span>
            </div>
            <h1 className="font-headline text-4xl leading-tight tracking-wide text-primary md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          <Separator className="mb-10" />

          <ArticleBody blocks={post.content} />

          <Separator className="my-10" />

          {/* print: nav tra articoli — non stampata. */}
          <nav
            aria-label="More posts"
            className="flex flex-col gap-4 print:hidden sm:flex-row sm:justify-between"
          >
            {olderPost ? (
              <Link
                href={`/blog/${olderPost.slug}`}
                className="group inline-flex max-w-xs flex-col gap-1 rounded-lg border border-border/60 p-4 transition-colors hover:border-primary"
              >
                <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground">
                  <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
                  Older post
                </span>
                <span className="font-medium group-hover:text-primary">
                  {olderPost.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {newerPost ? (
              <Link
                href={`/blog/${newerPost.slug}`}
                className="group inline-flex max-w-xs flex-col items-end gap-1 rounded-lg border border-border/60 p-4 text-right transition-colors hover:border-primary sm:ml-auto"
              >
                <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground">
                  Newer post
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </span>
                <span className="font-medium group-hover:text-primary">
                  {newerPost.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </article>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
