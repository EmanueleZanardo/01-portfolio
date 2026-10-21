import { NextResponse } from 'next/server';
import { execFileSync } from 'child_process';

// humans.txt (humanstxt.org convention) — credits for the humans behind
// emanuelezanardo.info. Static route (force-static): the "Last update" date
// is the repo's newest commit date at build time — the same git-based
// freshness pattern sitemap.ts uses for page lastmods — not the request
// time, so the date only moves when the site actually changes. (Without
// force-static this route handler would be dynamic and "Last update" would
// churn on every request.) Contact details are the same ones already
// public in the footer and in /.well-known/security.txt (no new exposure).
export const dynamic = 'force-static';

function lastContentChange(): string {
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI'], {
      timeout: 5000,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    const d = new Date(iso);
    if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  } catch {
    // git unavailable (or shallow build): fall back to the build date.
  }
  return new Date().toISOString().slice(0, 10);
}

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
    `  Last update: ${lastContentChange()}`,
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
