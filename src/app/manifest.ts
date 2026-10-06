import type { MetadataRoute } from 'next';

// pwa: web app manifest — Next.js serves this at /manifest.webmanifest.
// Single source of truth: the legacy static public/manifest.webmanifest
// (identical content) was removed on 2026-10-06 to eliminate the drift
// risk between two copies. All icon/screenshot assets exist in public/;
// nothing here references invented files. Palette matches the dark theme:
// viewport themeColor '#333333' and background '#171717'.
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Emanuele Zanardo — Electronic Engineer',
    short_name: 'E. Zanardo',
    description:
      'Professional portfolio of Emanuele Zanardo, Electronic Engineer specializing in embedded systems, firmware validation, and industrial automation.',
    lang: 'en',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#171717',
    theme_color: '#333333',
    categories: ['business', 'productivity'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    screenshots: [
      {
        src: '/og-image.png',
        sizes: '1200x630',
        type: 'image/png',
        label: 'Emanuele Zanardo — Electronic Engineer portfolio',
        form_factor: 'wide',
      },
    ],
    shortcuts: [
      {
        name: 'Contact',
        short_name: 'Contact',
        description: 'Get in touch with Emanuele Zanardo',
        url: '/#contact',
        icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
      },
      {
        name: 'Singularity energy demo',
        short_name: 'Demo',
        description: 'Live energy analytics demo',
        url: '/singularity',
        icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
      },
    ],
  };
}
