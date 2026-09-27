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
        url: 'https://i.postimg.cc/0j6WsZRn/istockphoto-1372200846-612x612.jpg',
        width: 612,
        height: 612,
        alt: 'Singularity Quant ETRM by Emanuele Zanardo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Singularity Quant ETRM | Emanuele Zanardo',
    description:
      'Live energy trading terminal demo: price analytics, KPIs, load curves and Monte Carlo simulator.',
    images: ['https://i.postimg.cc/0j6WsZRn/istockphoto-1372200846-612x612.jpg'],
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
    <main id="main-content" className="w-full h-screen bg-[#030712] flex flex-col">
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
        />
      </div>
    </main>
  );
}
