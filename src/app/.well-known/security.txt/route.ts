import { NextResponse } from 'next/server';

// security: RFC 9116 security.txt — punto di contatto per segnalazioni di
// vulnerabilità. Il Contact mailto è già pubblico nel footer (nessuna nuova
// esposizione); Expires è dinamico (oggi + 180 giorni) così il file non scade
// mai tra i deploy, come richiesto dallo standard (max 1 anno).
export const dynamic = 'force-dynamic';

export async function GET() {
  const expires = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString();
  const body = [
    '# RFC 9116 — security.txt for emanuelezanardo.info',
    'Contact: mailto:emanuele1998zanardo@gmail.com',
    'Contact: https://emanuelezanardo.info/#contact',
    `Expires: ${expires}`,
    'Preferred-Languages: en, it',
    '',
  ].join('\n');
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
