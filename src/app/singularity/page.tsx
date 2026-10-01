import type { Metadata } from 'next';
import Link from 'next/link';
import { FocusMainOnMount } from '@/components/focus-main-on-mount';

export const metadata: Metadata = {
  // Title suffix "| Emanuele Zanardo" comes from the layout's title template.
  title: 'Singularity Quant ETRM',
  description:
    'Singularity Quant ETRM — live energy trading and risk management terminal by Emanuele Zanardo: Swissix price analytics, KPIs, load curves, time bands and Monte Carlo simulator.',
  alternates: { canonical: '/singularity' },
  openGraph: {
    title: 'Singularity Quant ETRM | Emanuele Zanardo',
    description:
      'Live energy trading terminal demo: price analytics, KPIs, load curves and Monte Carlo simulator.',
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
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Singularity Quant ETRM | Emanuele Zanardo',
    description:
      'Live energy trading terminal demo: price analytics, KPIs, load curves and Monte Carlo simulator.',
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
      price: '0',
      priceCurrency: 'CHF',
    },
  };

  return (
    <main id="main-content" tabIndex={-1} className="w-full h-screen bg-[#030712] flex flex-col focus:outline-none">
      {/* a11y: sposta il focus sul <main> dopo la navigazione client-side (WCAG 2.4.3) */}
      <FocusMainOnMount />
      {/* perf: avvia subito la connessione TLS verso l'origine dell'embed Streamlit (contenuto principale della pagina) */}
      {/* perf: il terminale Streamlit e' il contenuto principale della pagina —
          preconnect stabilisce DNS+TLS+TCP in anticipo rispetto all'iframe
          (dns-prefetch solo DNS). Allineato alla decisione del ciclo precedente
          di NON usare loading="lazy" sull'iframe: il contenuto deve partire subito. */}
      <link rel="dns-prefetch" href="https://czpox8o8x6arnxw96txnvt.streamlit.app" />
      <link rel="preconnect" href="https://czpox8o8x6arnxw96txnvt.streamlit.app" />
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
            aria-label="Open Singularity Quant ETRM live terminal in new tab"
            className="text-sm font-mono text-gray-400 hover:text-white bg-gray-800 px-3 py-1 rounded"
          >
            Open in new tab ↗
          </a>
          <Link
            href="/"
            className="text-sm font-mono text-gray-400 hover:text-white bg-gray-800 px-3 py-1 rounded"
          >
            ← Back to Portfolio
          </Link>
        </div>
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
          // viewport) — niente loading="lazy": il terminale Streamlit deve
          // iniziare a caricarsi subito, non dopo il round-trip
          // dell'IntersectionObserver del lazy-load
          // privacy: l'embed di terze parti riceve solo l'origine come referrer, mai l'URL completo della pagina
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </main>
  );
}
