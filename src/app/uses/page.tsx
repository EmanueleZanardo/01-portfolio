import type { Metadata } from "next";
import { execFileSync } from "node:child_process";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FocusMainOnMount } from "@/components/focus-main-on-mount";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { feedAlternatesTypes, hreflangLanguages } from "@/lib/metadata";

// cv-uses: "Uses" page — every tool listed here is evidenced by this site or
// by the work documented on it (package.json, the blog and case studies).
// Nothing is listed that the author does not demonstrably use.

// uses: "Last updated" byline — git commit date of the last change to THIS
// file (same pattern as sitemap.ts lastContentChange), so the date reflects
// actual content edits rather than deploy time. Falls back to today if git
// is unavailable (e.g. a build environment without history).
function lastUpdatedDate(): Date {
  try {
    const iso = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", "src/app/uses/page.tsx"],
      { timeout: 5000, stdio: ["ignore", "pipe", "ignore"] }
    )
      .toString()
      .trim();
    const d = new Date(iso);
    if (!Number.isNaN(d.getTime())) return d;
  } catch {
    // fall through to the fallback below
  }
  return new Date();
}

const usesUpdated = lastUpdatedDate();
const usesUpdatedISO = usesUpdated.toISOString().slice(0, 10);

// seo: datePublished dell'ItemList /uses — data del PRIMO commit di questo
// file (nascita della pagina, stesso pattern git-based di lastUpdatedDate;
// --reverse -1 prende il commit piu' vecchio). Parita' con l'ItemList di
// /case-studies (datePublished/dateModified, miglioria ciclo 05:39).
function firstPublishedDate(): Date {
  try {
    // NOTE: --reverse -1 NON funziona come ci si aspetta: git applica il
    // limite (-1) PRIMA di invertire l'ordine (--reverse), quindi restituirebbe
    // comunque il commit piu' recente. Usiamo invece --diff-filter=A (commit
    // che ha AGGIUNTO il file): l'ultima riga e' la nascita dell'incarnazione
    // corrente del file (copre anche delete+recreate).
    const out = execFileSync(
      "git",
      ["log", "--reverse", "--format=%cI", "--diff-filter=A", "--", "src/app/uses/page.tsx"],
      { timeout: 5000, stdio: ["ignore", "pipe", "ignore"] }
    )
      .toString()
      .trim();
    const iso = out.split("\n").map((l) => l.trim()).filter(Boolean).at(-1);
    const d = new Date(iso ?? "");
    if (!Number.isNaN(d.getTime())) return d;
  } catch {
    // fall through to the fallback below
  }
  return new Date();
}
const usesPublished = firstPublishedDate();
// en-GB: "8 October 2026" — matches the site language; explicit UTC so the
// rendered date never shifts with the server timezone.
const usesUpdatedLabel = usesUpdated.toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

interface ToolGroup {
  heading: string;
  // url e' opzionale: presente solo quando il tool ha un unico sito
  // ufficiale non ambiguo (niente URL inventati per voci combinate come
  // "Tailwind CSS + shadcn/ui" o "ESP32 / STM32" — un url parziale
  // traviserebbe la voce). Usato nel JSON-LD ItemList qui sotto.
  tools: { name: string; note: string; url?: string }[];
}

const TOOL_GROUPS: ToolGroup[] = [
  {
    heading: "This site",
    tools: [
      {
        name: "Next.js 15 + React 18",
        note: "Static rendering with TypeScript throughout; this portfolio is the reference build.",
        url: "https://nextjs.org",
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
        url: "https://vercel.com",
      },
      {
        name: "GitHub",
        note: "Version control and the deploy pipeline for all public work.",
        url: "https://github.com",
      },
    ],
  },
  {
    heading: "Embedded & hardware",
    tools: [
      {
        name: "KiCad",
        note: "Schematic capture and PCB layout, up to 6-layer power boards.",
        url: "https://www.kicad.org",
      },
      {
        name: "FreeRouting",
        note: "Autorouter used as a starting pass on dense boards, finished by hand.",
        url: "https://www.freerouting.org",
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
        url: "https://pandas.pydata.org",
      },
    ],
  },
];

// seo: single source of truth for the page description — shared by the meta
// description, openGraph and twitter tags (same pattern as the root layout:
// a divergent hand-written og:description silently contradicted the meta one).
const DESCRIPTION =
  "The tools Emanuele Zanardo actually uses: Next.js, TypeScript and Tailwind for the web, KiCad for PCB design, Python and Streamlit for data tooling.";

export const metadata: Metadata = {
  // Title suffix "| Emanuele Zanardo" comes from the layout's title template.
  title: "Uses — Tools & Stack",
  description: DESCRIPTION,
  alternates: { canonical: "/uses", languages: hreflangLanguages('/uses'), types: feedAlternatesTypes },
  openGraph: {
    title: "Uses — Tools & Stack | Emanuele Zanardo",
    description: DESCRIPTION,
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
    title: "Uses — Tools & Stack | Emanuele Zanardo",
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", alt: "Uses — Emanuele Zanardo" }],
  },
};

export default function UsesPage() {
  // seo: ItemList dei tool — la pagina /uses non esponeva alcun JSON-LD
  // (blog e case-studies hanno il loro ItemList con date); ogni tool e'
  // un Thing con name + description — i tipi sono misti (software, servizi
  // online, piattaforme hardware) quindi niente sottotipi inventati.
  // url (sito ufficiale) solo dove non ambiguo — vedi il commento su
  // ToolGroup.tools: JSON.stringify scarta le chiavi undefined, quindi le
  // voci senza url restano name+description senza campi vuoti.
  // seo: numberOfItems — proprieta' specifica di schema.org/ItemList;
  // il conteggio e' il totale dei tool su tutti i gruppi (stesso flatMap
  // dell'itemListElement qui sotto). Parita' con gli ItemList di /blog e
  // /case-studies (questo ciclo).
  const usesToolCount = TOOL_GROUPS.reduce((n, g) => n + g.tools.length, 0);
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Uses — Emanuele Zanardo",
    numberOfItems: usesToolCount,
    datePublished: usesPublished.toISOString(),
    dateModified: usesUpdated.toISOString(),
    // seo: inLanguage — parita' con gli altri grafi top-level del sito
    // (blog, case-studies, layout, cv, singularity: cicli 19:40, 20:40);
    // ItemList eredita da CreativeWork, proprieta' valida.
    inLanguage: "en-US",
    itemListElement: TOOL_GROUPS.flatMap((group, gi) =>
      group.tools.map((tool, ti) => ({
        "@type": "ListItem",
        position: gi * 100 + ti + 1,
        item: {
          "@type": "Thing",
          name: tool.name,
          description: tool.note,
          ...(tool.url ? { url: tool.url } : {}),
        },
      }))
    ),
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
        <div className="container mx-auto max-w-3xl px-4 py-24 lg:py-32">
          {/* seo + a11y: breadcrumb nav + BreadcrumbList JSON-LD */}
          <Breadcrumbs items={[{ name: "Uses" }]} />
          <div className="mb-12 text-center">
            <h1 className="font-headline text-4xl text-primary md:text-5xl">
              Uses
            </h1>
            <p className="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
              The tools behind the work — every entry here is evidenced by
              this site or the projects documented on it.
            </p>
            {/* uses: "Last updated" byline — the uses-page convention
                (readers trust the list only if it is visibly maintained);
                <time> keeps it machine-readable. */}
            <p className="mt-3 text-sm text-muted-foreground">
              Last updated:{" "}
              <time dateTime={usesUpdatedISO}>{usesUpdatedLabel}</time>
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
                      <p className="font-medium">
                        {tool.url ? (
                          // micro-ux: il nome del tool linka il sito ufficiale
                          // (stessi 6 url non-ambigui del JSON-LD ItemList,
                          // verificati 200 il 09/10/2026; voci combinate senza
                          // url per non travisare). Pattern link esterni del
                          // sito: _blank + noopener + "(opens in new tab)".
                          // a11y 16:40 (axe identical-links-same-purpose,
                          // WCAG 2.4.4/2.4.9): "official website" disambigua
                          // dai social del footer ("GitHub (opens in new
                          // tab)" -> profilo github.com/EmanueleZanardo):
                          // stesso nome accessibile + URL diverso = FAIL.
                          <a
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${tool.name} official website (opens in new tab)`}
                            className="underline decoration-dotted underline-offset-4 transition-colors hover:text-primary"
                          >
                            {tool.name}
                          </a>
                        ) : (
                          tool.name
                        )}
                      </p>
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
