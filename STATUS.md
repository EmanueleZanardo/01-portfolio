# STATUS.md — 01-portfolio (Sito personale)

**Ultimo aggiornamento: 30/09/2026 sera CEST**

## Stato
- Live su https://emanuelezanardo.info/ (Vercel) — deploy attivo.
- Stack: Next.js 15.
- Build verde: 8/8 pagine.
- Ultimo commit: 7326522 (fix title duplicato 404, commit 35db53a).

## Ultimi eventi verificati (30/09/2026)
- Fix title duplicato sulla pagina 404 (commit 35db53a).
- Keywords SEO aggiunte in `src/app/layout.tsx`.
- Push su GitHub e redeploy Vercel verificati, build OK.

## Prossimi passi
- Da parte di Emanuele: impostare solo `GMAIL_APP_PASSWORD` su Vercel, se non ancora impostata (form contatti).
- AI: il 28/09/2026 la dipendenza Google AI (Genkit/Gemini) e' stata rimossa dal repo (commit 293baf6); il sito non usa piu' alcuna AI di Google. NON impostare `GOOGLE_GENAI_API_KEY` — non serve piu' e va rimossa da Vercel se presente.
- QA continuo orario attivo (monitoraggio sito + dashboard).

## Blocchi
- Nessuno sul lato repo; in attesa di `GMAIL_APP_PASSWORD` lato Emanuele.
