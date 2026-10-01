# STATUS.md — 01-portfolio (Sito personale)

**Ultimo aggiornamento: 01/10/2026 ~02:00 CEST**

## Stato
- Live su https://emanuelezanardo.info/ (Vercel) — deploy attivo.
- Stack: Next.js 15.
- Build verde: 8/8 pagine.
- Ultimo commit: b79a9483 (micro-ux: appleWebApp metadata iOS, 01/10 01:04 CEST).

## Ultimi eventi verificati (30/09–01/10/2026)
- QA 23:39 CEST 30/09: nessun bug trovato. Miglioria: `formatDetection: { telephone: false }` nei metadata — iOS Safari non auto-linka più testo simile a numeri di telefono. Push 11f6335 su origin/main, deploy Vercel verificato live.
- QA 22:40 CEST 30/09: build verde 8/8, live testato (200 su / e /singularity; CV PDF, manifest, favicon, og-image, apple-touch-icon, robots.txt, sitemap.xml tutti 200; 404 corretta; meta/OG/Twitter/JSON-LD Person+ProfessionalService presenti; nessun placeholder reale; skip-link "#main-content" verificato). Miglioria: telefono nel Person JSON-LD in formato E.164 (+393451114337).
- Fix title duplicato sulla pagina 404 (commit 35db53a); keywords SEO in `src/app/layout.tsx`.
- 01/10 01:04 CEST: commit b79a9483 (appleWebApp metadata iOS).

## Prossimi passi
- Da parte di Emanuele: impostare solo `GMAIL_APP_PASSWORD` su Vercel, se non ancora impostata (form contatti).
- AI: il 28/09/2026 la dipendenza Google AI (Genkit/Gemini) e' stata rimossa dal repo (commit 293baf6); il sito non usa piu' alcuna AI di Google. NON impostare `GOOGLE_GENAI_API_KEY` — non serve piu' e va rimossa da Vercel se presente.
- QA continuo orario attivo (monitoraggio sito + dashboard).

## Blocchi
- Nessuno sul lato repo; in attesa di `GMAIL_APP_PASSWORD` lato Emanuele.
