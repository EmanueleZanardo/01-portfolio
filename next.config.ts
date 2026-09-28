import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // Note: no X-Frame-Options/DENY here — /singularity embeds a Streamlit iframe.
  // No CSP either (would need per-page tuning); these headers are safe globally.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
        ],
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // images: solo asset locali (hero-bg.jpg, portrait.png in public/) —
  // nessun remotePattern: l'ottimizzatore non fa proxy di host esterni.
  images: {},
};

export default nextConfig;
