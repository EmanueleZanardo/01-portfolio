import { NextResponse } from 'next/server';

// humans.txt (humanstxt.org convention) — credits for the humans behind
// emanuelezanardo.info. Fully static: nothing here changes between deploys,
// so it stays a static route. Contact details are the same ones already
// public in the footer and in /.well-known/security.txt (no new exposure).
export async function GET() {
  const body = [
    '/* TEAM */',
    '  Name: Emanuele Zanardo',
    '  Role: Electronic Engineer — embedded systems, firmware & validation, PCB design',
    '  Site: https://emanuelezanardo.info',
    '  Location: Ticino, Switzerland',
    '',
    '/* THANKS */',
    '  Stack: Next.js 15, TypeScript, Tailwind CSS, Vercel',
    '  Icons: Lucide',
    '  Fonts: Bebas Neue, Roboto Mono (self-hosted)',
    '',
    '/* SITE */',
    '  Standards: HTML5, CSS3, RSS 2.0',
    '  Last update: 2026',
    '  Contact: https://emanuelezanardo.info/#contact',
    '',
  ].join('\n');
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
