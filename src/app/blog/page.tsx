import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FocusMainOnMount } from "@/components/focus-main-on-mount";
import { getAllPosts, getAllTags } from "@/lib/blog-posts";
import { BlogList } from "./blog-list";

export const metadata: Metadata = {
  // Title suffix "| Emanuele Zanardo" comes from the layout's title template.
  title: "Blog",
  description:
    "Technical notes by Emanuele Zanardo: energy storage sizing, Next.js, KiCad PCB design and Streamlit data tooling — from real engineering practice.",
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-grow focus:outline-none"
      >
        <FocusMainOnMount />
        <div className="container mx-auto px-4 py-24 lg:py-32">
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
