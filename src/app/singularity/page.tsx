import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Singularity Quant ETRM | Emanuele Zanardo',
  description:
    'Singularity Quant ETRM — live energy trading and risk management terminal by Emanuele Zanardo: Swissix price analytics, KPIs, load curves, time bands and Monte Carlo simulator.',
  alternates: { canonical: '/singularity' },
  openGraph: {
    title: 'Singularity Quant ETRM | Emanuele Zanardo',
    description:
      'Live energy trading terminal demo: price analytics, KPIs, load curves and Monte Carlo simulator.',
    url: '/singularity',
    siteName: 'Emanuele Zanardo Portfolio',
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
      {/* perf: avvia subito la connessione TLS verso l'origine dell'embed Streamlit (contenuto principale della pagina) */}
      <link rel="preconnect" href="https://czpox8o8x6arnxw96txnvt.streamlit.app" />
      <link rel="dns-prefetch" href="https://czpox8o8x6arnxw96txnvt.streamlit.app" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <div className="p-4 bg-[#111827] border-b border-gray-800 flex justify-between items-center">
        <h1 className="text-blue-400 font-mono text-lg font-bold">💠 Singularity Quant ETRM - Live Terminal</h1>
        <a 
          href="/" 
          className="text-sm font-mono text-gray-400 hover:text-white bg-gray-800 px-3 py-1 rounded"
        >
          ← Torna al Portfolio
        </a>
      </div>
      <div className="flex-grow w-full">
        <iframe
          src="https://czpox8o8x6arnxw96txnvt.streamlit.app/?embed=true"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title="Singularity ETRM Dashboard"
          allowFullScreen
        />
      </div>
    </main>
  );
}
