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
  return (
    <div className="w-full h-screen bg-[#030712] flex flex-col">
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
    </div>
  );
}
