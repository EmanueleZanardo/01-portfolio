import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FocusMainOnMount } from "@/components/focus-main-on-mount";

// cv-uses: "Uses" page — every tool listed here is evidenced by this site or
// by the work documented on it (package.json, the blog and case studies).
// Nothing is listed that the author does not demonstrably use.

interface ToolGroup {
  heading: string;
  tools: { name: string; note: string }[];
}

const TOOL_GROUPS: ToolGroup[] = [
  {
    heading: "This site",
    tools: [
      {
        name: "Next.js 15 + React 18",
        note: "Static rendering with TypeScript throughout; this portfolio is the reference build.",
      },
      {
        name: "Tailwind CSS + shadcn/ui",
        note: "Utility-first styling over Radix primitives for the component library.",
      },
      {
        name: "React Hook Form + Zod",
        note: "One shared schema validates the contact form on the client and again in the server action.",
      },
      {
        name: "Vercel",
        note: "Hosting and per-commit preview deployments for every project here.",
      },
      {
        name: "GitHub",
        note: "Version control and the deploy pipeline for all public work.",
      },
    ],
  },
  {
    heading: "Embedded & hardware",
    tools: [
      {
        name: "KiCad",
        note: "Schematic capture and PCB layout, up to 6-layer power boards.",
      },
      {
        name: "FreeRouting",
        note: "Autorouter used as a starting pass on dense boards, finished by hand.",
      },
      {
        name: "ESP32 / STM32",
        note: "The two MCU families used for firmware and validation work.",
      },
    ],
  },
  {
    heading: "Data tooling",
    tools: [
      {
        name: "Python + Streamlit",
        note: "Interactive energy analytics — the dashboard case study runs on it.",
      },
      {
        name: "pandas",
        note: "Time-series crunching behind the energy price analyses.",
      },
    ],
  },
];

export const metadata: Metadata = {
  // Title suffix "| Emanuele Zanardo" comes from the layout's title template.
  title: "Uses",
  description:
    "The tools Emanuele Zanardo actually uses: Next.js, TypeScript and Tailwind for the web, KiCad for PCB design, Python and Streamlit for data tooling.",
  alternates: { canonical: "/uses" },
  openGraph: {
    title: "Uses | Emanuele Zanardo",
    description:
      "The tools Emanuele Zanardo actually uses — web stack, embedded tooling and data analysis.",
    url: "/uses",
    siteName: "Emanuele Zanardo Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Uses — Emanuele Zanardo",
        type: "image/png",
        secureUrl: "https://emanuelezanardo.info/og-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uses | Emanuele Zanardo",
    description:
      "The tools Emanuele Zanardo actually uses — web stack, embedded tooling and data analysis.",
    images: [{ url: "/og-image.png", alt: "Uses — Emanuele Zanardo" }],
  },
};

export default function UsesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-grow focus:outline-none"
      >
        <FocusMainOnMount />
        <div className="container mx-auto max-w-3xl px-4 py-24 lg:py-32">
          <div className="mb-12 text-center">
            <h1 className="font-headline text-4xl text-primary md:text-5xl">
              Uses
            </h1>
            <p className="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
              The tools behind the work — every entry here is evidenced by
              this site or the projects documented on it.
            </p>
          </div>

          <div className="space-y-10">
            {TOOL_GROUPS.map((group) => (
              <section key={group.heading} aria-labelledby={`uses-${group.heading.toLowerCase().replace(/\s+/g, "-")}`}>
                <h2
                  id={`uses-${group.heading.toLowerCase().replace(/\s+/g, "-")}`}
                  className="font-headline text-2xl text-primary"
                >
                  {group.heading}
                </h2>
                <ul className="mt-4 divide-y divide-border rounded-lg border border-border bg-card">
                  {group.tools.map((tool) => (
                    <li key={tool.name} className="px-5 py-4">
                      <p className="font-medium">{tool.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {tool.note}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
