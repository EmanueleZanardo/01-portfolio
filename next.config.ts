import type {NextConfig} from 'next';

const STREAMLIT_URL = 'https://czpox8o8x6arnxw96txnvt.streamlit.app';

// Note: no X-Frame-Options/DENY here — /singularity embeds a Streamlit iframe.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: blob:",
  `frame-src ${STREAMLIT_URL}`,
  `connect-src 'self' ${STREAMLIT_URL}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Modern complement to the legacy X-Frame-Options: DENY in vercel.json —
  // this governs framing of OUR pages (unlike frame-src, which governs the
  // Streamlit iframe we embed on /singularity).
  "frame-ancestors 'none'",
].join('; ');

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ];
  },
  // images: solo asset locali (hero-bg.jpg, portrait.png in public/) —
  // nessun remotePattern: l'ottimizzatore non fa proxy di host esterni.
  images: {},
};

export default nextConfig;
