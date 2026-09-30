# STATUS.md — 01-portfolio (Sito personale)

**Ultimo aggiornamento: 30/09/2026 ~22:55 CEST**

## Stato
- Live su https://emanuelezanardo.info/ (Vercel) — deploy attivo.
- Stack: Next.js 15.
- Build verde: 8/8 pagine.
- Ultimo commit: 77c3caf (Person JSON-LD telephone in formato E.164).

## Ultimi eventi verificati (30/09/2026)
- QA 22:40 CEST: build verde 8/8, live testato (200 su / e /singularity; CV PDF, manifest, favicon, og-image, apple-touch-icon, robots.txt, sitemap.xml tutti 200; 404 corretta con title "Page Not Found | Emanuele Zanardo"; meta/OG/Twitter/JSON-LD Person+ProfessionalService presenti; immagini next/image OK; link interni validi (solo / e /singularity esistono — gli altri 404 sono attesi); nessun placeholder reale (solo attributi placeholder dei form); skip-link "#main-content" verificato su entrambe le pagine). Nessun bug trovato. Miglioria: telefono nel Person JSON-LD in formato E.164 senza spazi (+393451114337, prima "+39 345 111 4337") — formato canonico machine-readable per schema.org/Google.
- Fix title duplicato sulla pagina 404 (commit 35db53a).
- Keywords SEO aggiunte in `src/app/layout.tsx`.
- Push su GitHub e redeploy Vercel verificati, build OK.

## Prossimi passi
- Da parte di Emanuele: impostare solo `GMAIL_APP_PASSWORD` su Vercel, se non ancora impostata (form contatti).
- AI: il 28/09/2026 la dipendenza Google AI (Genkit/Gemini) e' stata rimossa dal repo (commit 293baf6); il sito non usa piu' alcuna AI di Google. NON impostare `GOOGLE_GENAI_API_KEY` — non serve piu' e va rimossa da Vercel se presente.
- QA continuo orario attivo (monitoraggio sito + dashboard).

## Blocchi
- Nessuno sul lato repo; in attesa di `GMAIL_APP_PASSWORD` lato Emanuele.
