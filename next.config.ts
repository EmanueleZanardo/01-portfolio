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
  // img-src: no 'blob:' — verified 02/10/2026: the built HTML/JS serves no
  // blob: image sources and src/ has no URL.createObjectURL calls. Keeps
  // 'data:' (used for inline SVG icons), drops the unused blob: surface.
  "img-src 'self' data:",
  `frame-src ${STREAMLIT_URL}`,
  `connect-src 'self' ${STREAMLIT_URL}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Modern complement to the legacy X-Frame-Options: DENY in vercel.json —
  // this governs framing of OUR pages (unlike frame-src, which governs the
  // Streamlit iframe we embed on /singularity).
  "frame-ancestors 'none'",
  // upgrade-insecure-requests: difesa in profondità — il sito e l'embed
  // Streamlit sono già interamente HTTPS, quindi nessun effetto collaterale.
  "upgrade-insecure-requests",
].join('; ');

const nextConfig: NextConfig = {
  /* config options here */
  // security: rimuove l'header "X-Powered-By: Next.js" dalle risposte —
  // information disclosure gratuita sullo stack (inutile per il sito, utile
  // a chi cerca vulnerabilita' note).
  poweredByHeader: false,
  // perf: trasforma i barrel import di lucide-react in import diretti dei
  // singoli moduli — meno lavoro di tree-shaking, bundle JS piu' piccolo.
  // (Nota: in Next 15.3.8 la chiave resta in "experimental" — non esiste
  // ancora come top-level stabile in questa versione; verificato nei tipi
  // di node_modules/next 15.3.8.)
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async headers() {
    return [
      // perf: long-lived Cache-Control per gli asset stabili di public/.
      // Verificato il 07/10/2026 con curl -I sul live: Vercel serve i file
      // di public/ con `public, max-age=0, must-revalidate`, quindi ogni
      // visita ripetuta rivalida hero-bg, portrait, icone, CV PDF e font.
      // Questi asset cambiano di rado e hanno URL stabili, quindi:
      // - font (woff2 subset, generati una volta sola): 1 anno, immutable;
      // - immagini di brand (hero/portrait/icone/og-image): 7gg browser,
      //   30gg edge — non immutable: l'URL resta uguale se vengono
      //   rigenerate, quindi devono scadere entro giorni, non mesi;
      // - CV PDF (aggiornato di rado): 1gg browser, 7gg edge.
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      ...[
        'og-image.png',
        'hero-bg.webp',
        'portrait.webp',
        'icon-192.png',
        'icon-512.png',
        'icon-512-maskable.png',
        'apple-touch-icon.png',
        'rss-channel-icon.png',
      ].map((file) => ({
        source: `/${file}`,
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, s-maxage=2592000' },
        ],
      })),
      {
        source: '/favicon.ico',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, s-maxage=2592000' },
        ],
      },
      {
        source: '/cv-emanuele-zanardo.pdf',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, s-maxage=604800' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          // security: unico header di sicurezza standard assente — il sito e'
          // gia' interamente HTTPS (Vercel), quindi forza HTTPS lato browser
          // per 2 anni su dominio e sottodomini, chiudendo il vettore
          // downgrade/SSL-stripping sul primo accesso. Senza "preload" (non
          // inviato alla preload list dei browser).
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          // security: isola il browsing context della pagina dai documenti
          // cross-origin — difesa contro attacchi cross-origin (es. XS-Leaks).
          // Sicuro qui: il sito non apre popup (l'unico _blank e' un anchor
          // normale verso l'app Streamlit, che funziona anche in un contesto
          // separato) e l'iframe cross-origin di /singularity non dipende
          // dall'opener.
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          // security: impedisce ad altri origin di embeddare le nostre
          // risorse (difesa in profondita' contro XS-Leaks, completamento
          // naturale della COOP qui sopra). Sicuro qui: tutti gli asset
          // (immagini, font, _next/*) sono same-origin. NON aggiungere
          // Cross-Origin-Embedder-Policy: richiederebbe CORP opt-in anche
          // dall'iframe cross-origin di Streamlit e lo bloccherebbe.
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
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
