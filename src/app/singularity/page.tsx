import type { Metadata } from 'next';
import Link from 'next/link';
import { FocusMainOnMount } from '@/components/focus-main-on-mount';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { feedAlternatesTypes, hreflangLanguages } from '@/lib/metadata';

// seo: single source of truth for the page description — shared by the meta
// description, openGraph and twitter tags (same pattern as the root layout:
// a divergent hand-written og:description silently contradicted the meta one).
const DESCRIPTION =
  'Singularity Quant ETRM — live energy trading terminal by Emanuele Zanardo: Swissix price analytics, KPIs, load curves and Monte Carlo simulator.';

export const metadata: Metadata = {
  // Title suffix "| Emanuele Zanardo" comes from the layout's title template.
  title: 'Singularity Quant ETRM',
  // seo: meta description kept ≤160 chars so Google shows it whole in SERPs
  // (was 176 chars and got truncated); drops "risk management" from the
  // lead — the terminal's core keyword set is preserved.
  description: DESCRIPTION,
  alternates: { canonical: '/singularity', languages: hreflangLanguages('/singularity'), types: feedAlternatesTypes },
  openGraph: {
    title: 'Singularity Quant ETRM | Emanuele Zanardo',
    description: DESCRIPTION,
    url: '/singularity',
    siteName: 'Emanuele Zanardo Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Singularity Quant ETRM by Emanuele Zanardo',
        // seo: og:image:type — alcuni scraper/validator (es. LinkedIn,
        // WhatsApp) lo usano per il content-type senza fare un HEAD extra.
        type: 'image/png',
        // seo: og:image:secure_url — richiesto esplicitamente da alcuni
        // validator/scraper; l'URL e' https, quindi e' anche l'URL sicuro.
        secureUrl: 'https://emanuelezanardo.info/og-image.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Singularity Quant ETRM | Emanuele Zanardo',
    description: DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        alt: 'Singularity Quant ETRM by Emanuele Zanardo',
      },
    ],
  },
};

export default function SingularityPage() {
  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Singularity Quant ETRM',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    // seo: inLanguage — parita' con gli altri grafi JSON-LD del sito
    // (layout, blog, case-studies, cv usano tutti "en-US"; ciclo 19:40):
    // segnale lingua uniforme per i parser sul SoftwareApplication.
    inLanguage: 'en-US',
    url: 'https://emanuelezanardo.info/singularity',
    author: {
      '@type': 'Person',
      name: 'Emanuele Zanardo',
      url: 'https://emanuelezanardo.info',
    },
    description:
      'Live energy trading and risk management terminal: Swissix price analytics, KPIs, load curves, time bands (F1/F2/F3) and Monte Carlo simulator.',
    offers: {
      '@type': 'Offer',
      // seo: price numerico (0 = gratuito) come raccomanda schema.org —
      // le stringhe sono accettate ma i validatori preferiscono Number
      price: 0,
      priceCurrency: 'CHF',
    },
  };

  return (
    <main id="main-content" tabIndex={-1} className="w-full h-screen bg-[#030712] flex flex-col focus:outline-none">
      {/* a11y: sposta il focus sul <main> dopo la navigazione client-side (WCAG 2.4.3) */}
      <FocusMainOnMount />
      {/* perf: avvia subito la connessione TLS verso l'origine dell'embed Streamlit
          (contenuto principale della pagina) — preconnect copre gia' DNS+TLS+TCP,
          dns-prefetch sarebbe ridondante; */}
      <link rel="preconnect" href="https://czpox8o8x6arnxw96txnvt.streamlit.app" />
      {/* perf: il terminale Streamlit e' il contenuto principale della pagina —
          l'iframe (sotto) non usa loading="lazy" perche' deve iniziare a
          caricarsi subito, non dopo il round-trip dell'IntersectionObserver */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <div className="p-4 bg-[#111827] border-b border-gray-800 flex justify-between items-center">
        <h1 className="text-blue-400 font-mono text-lg font-bold"><span aria-hidden="true">💠</span> Singularity Quant ETRM - Live Terminal</h1>
        <div className="flex items-center gap-2">
          {/* ux: fallback diretto se l'embed Streamlit è bloccato o lento (reti aziendali, app in sleep) */}
          <a
            href="https://czpox8o8x6arnxw96txnvt.streamlit.app/?embed=true"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open in new tab: Singularity Quant ETRM live terminal"
            // a11y (WCAG 2.5.3 Label in Name): il nome inizia col testo visibile
            // e la freccia e' decorativa (aria-hidden) — QA 118.
            // a11y (WCAG 2.5.8): min-h 44px — touch target adeguato su mobile
            className="text-sm font-mono text-gray-400 hover:text-white bg-gray-800 px-3 py-1 rounded min-h-[44px] inline-flex items-center"
          >
            Open in new tab <span aria-hidden="true">↗</span>
          </a>
          <Link
            href="/"
            // a11y (WCAG 2.5.8): min-h 44px — touch target adeguato su mobile
            className="text-sm font-mono text-gray-400 hover:text-white bg-gray-800 px-3 py-1 rounded min-h-[44px] inline-flex items-center"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>
      {/* seo + a11y: breadcrumb nav + BreadcrumbList JSON-LD — parita' con le
          altre pagine indice (blog, case-studies, uses, cv); variante dark
          per il tema del terminale, strip compatta sotto la header bar */}
      <div className="bg-[#111827] border-b border-gray-800 px-4 py-2">
        <Breadcrumbs dark items={[{ name: 'Singularity Quant ETRM' }]} />
      </div>
      <div className="flex-grow w-full">
        <iframe
          src="https://czpox8o8x6arnxw96txnvt.streamlit.app/?embed=true"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title="Singularity ETRM Dashboard"
          allowFullScreen
          // perf: l'iframe e' il contenuto principale della pagina (riempie il
          // viewport) — loading="eager" esplicito: la strategia di caricamento
          // deve essere una scelta consapevole, non un default accidentale
          // (QA 281: ogni iframe deve dichiarare loading; "lazy" qui ritarderebbe
          // il terminale Streamlit del round-trip dell'IntersectionObserver)
          loading="eager"
          // privacy: l'embed di terze parti riceve solo l'origine come referrer, mai l'URL completo della pagina
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </main>
  );
}
