import type {NextConfig} from 'next';

const STREAMLIT_URL = 'https://czpox8o8x6arnxw96txnvt.streamlit.app';

// Security headers: single source of truth for this site (dev + prod).
// Previously these were duplicated between vercel.json and this file, which
// sent doubled headers (with slightly different Permissions-Policy values).
// X-Frame-Options: DENY is safe here: it only prevents OTHER sites from
// framing OUR pages, it does not affect the Streamlit iframe we embed on
// /singularity (that direction is governed by frame-src in the CSP).
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
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ];
  },
  // images: solo asset locali (hero-bg.webp, portrait.webp in public/) —
  // nessun remotePattern: l'ottimizzatore non fa proxy di host esterni.
  // perf: AVIF first per i browser che lo supportano (WebP fallback),
  // riduce hero-bg.webp e portrait.webp rispetto ai PNG/JPEG originali.
  images: { formats: ['image/avif', 'image/webp'] },
};

export default nextConfig;
