# STATUS.md — 01-portfolio (Sito personale)

**Ultimo aggiornamento: 03/10/2026 ~04:45 CEST**

## 03/10/2026 ~04:45 CEST — ciclo QA orario
- Nessun bug trovato (build verde 8/8, exit 0, lint+typecheck via build; live 200 su /, /singularity, robots.txt, sitemap.xml, .well-known/security.txt, cv-emanuele-zanardo.pdf, favicon.ico, apple-touch-icon.png, og-image.png, manifest.webmanifest, icon-192/512.png; 404 corretta; meta/OG/Twitter/canonical/lang/theme-color presenti; security headers live: CSP, COOP, CORP, Permissions-Policy, Referrer-Policy, HSTS, nosniff, X-Frame-Options DENY; nessun placeholder reale — solo classi/attributi placeholder legittimi del form; nessun link interno rotto; nessuna immagine mancante; esterni: Streamlit embed 200; pull 4f6f9dd solo docs, nessun codice nuovo da verificare).
- Nessuna miglioria forzata: terzo ciclo consecutivo tutto verde — sweep completo senza residui (JSON-LD, manifest PWA, security.txt RFC 9116, meta/OG completi, a11y WCAG 2.4.3, header sicurezza) tutto già a posto.
- Blocchi aperti (azioni di Emanuele): `www.emanuelezanardo.info` ancora NXDOMAIN — fix IONOS (CNAME www → cname.vercel-dns.com) + Vercel Domains; discrepanza date Horien sito (Feb 2022–Dec 2025) vs CV (Oct 2021–Jan 2026) — servono date corrette; GMAIL_APP_PASSWORD da impostare su Vercel (form contatti).**

## 03/10/2026 ~03:45 CEST — ciclo QA orario
- Nessun bug trovato (build verde 8/8, exit 0, lint+typecheck via build; live 200 su /, /singularity, robots.txt, sitemap.xml, .well-known/security.txt, cv-emanuele-zanardo.pdf, favicon.ico, apple-touch-icon.png, og-image.png, manifest.webmanifest, icon-192/512/512-maskable, hero-bg.webp + portrait.webp via _next/image; 404 corretta; meta/OG/Twitter/canonical/lang/theme-color/og:locale/og:image:type+alt+dimensioni presenti su entrambe le pagine; security headers live: CSP, HSTS, nosniff, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy; 1 h1 per pagina; skip link; ancore tutte con id corrispondenti; rel=noopener (+me) su tutti i target=_blank; form: labels, autocomplete, honeypot, aria-invalid, noValidate, inputMode/email, spellCheck/autoCapitalize/autoCorrect off — tutto OK; nessun placeholder reale; nessun link interno rotto; nessuna immagine mancante; esterni: GitHub 200, wa.me 200, Streamlit 303 (atteso), LinkedIn 999 (bot-block anti-curl, atteso)).
- Nessuna miglioria forzata: sweep completo — JSON-LD su entrambe le pagine, manifest PWA completo (id, categories, maskable icons, shortcuts, screenshots, theme/background), appleWebApp standalone, security.txt RFC 9116, max-image-preview:large, decoding async sul ritratto, theme-color coerente (#333333 layout+manifest) — tutto già a posto.
- Blocchi aperti (azioni di Emanuele): `www.emanuelezanardo.info` ancora NXDOMAIN — fix IONOS (CNAME www → cname.vercel-dns.com) + Vercel Domains; discrepanza date Horien sito (Feb 2022–Dec 2025) vs CV (Oct 2021–Jan 2026) — servono date corrette; GMAIL_APP_PASSWORD da impostare su Vercel (form contatti).

## 03/10/2026 ~02:00 CEST — aggiornamento documentale giornaliero
- Cicli QA orari 02/10 tutti VERDI, nessun bug trovato: migliorie pushate — 05:40 `autoCapitalize="words"` su input Name (commit post 05:40); 07:39 `noValidate` sul contact form + rettifica protocollo Vercel: il rate limit era già rientrato (tip 570e999 deploy success 05:51, commit cc444bc); 21:40 `type: image/png` agli shortcut PWA (commit 88103e8); 22:40 `autoCapitalize="sentences"` sul textarea Message (commit 39b40e4); 23:45 sweep completo senza forzature (commit d6311a4). HEAD main: 9da6e1d (entry QA 03/10 ~01:55 CEST).
- Blocchi aperti (azioni di Emanuele): `www.emanuelezanardo.info` ancora NXDOMAIN — fix IONOS (CNAME www → cname.vercel-dns.com) + Vercel Domains; discrepanza date Horien sito (Feb 2022–Dec 2025) vs CV (Oct 2021–Jan 2026) — servono date corrette; GMAIL_APP_PASSWORD da impostare su Vercel (form contatti).
- Prossimi passi: QA oraria continua; nessun push di feature in sospeso.


## 02/10/2026 ~05:40 CEST — ciclo QA orario
- Nessun bug trovato (build verde 8/8 pre+post miglioria, exit 0, lint+typecheck attivi; live 200 su /, /singularity, sitemap.xml, robots.txt, og-image.png, cv-emanuele-zanardo.pdf, apple-touch-icon.png, manifest.webmanifest, favicon.ico; meta/OG/Twitter/canonical/lang/theme-color/format-detection presenti; placeholder reali assenti — solo attributi placeholder legittimi del form; nessun link interno rotto; nessuna immagine mancante; 2 img in home con alt adeguato, 1 decorativa con alt="" aria-hidden).
- Miglioria micro-UX (complemento al commit 92c08ec ~04:48): input "Name" del contact form ora con `autoCapitalize="words"` + `autoCorrect="off"` — il correttore mobile non storpia più i nomi propri e ogni parola parte maiuscola (email aveva già off/off/off). Build verde, push su main.
- Blocco aperto: `www.emanuelezanardo.info` ancora NXDOMAIN — azione di Emanuele su IONOS (CNAME www → cname.vercel-dns.com) + Vercel Domains.
- Discrepanza date Horien NON risolta: sito Feb 2022–Dec 2025 vs CV Oct 2021–Jan 2026 — servono date corrette da Emanuele.

## 02/10/2026 ~03:45 CEST — ciclo QA orario
- RATE LIMIT VERCEL RIENTRATO: tutti i commit recenti (f7aee11, 38ac15d, 9e0aa3d, a4c1934) mostrano `Vercel | success` su GitHub — il blocco build-rate-limit del 01/10 ~17:35 CEST è finito, i deploy tornano a funzionare. Migliorie con codice di nuovo pushabili.
- Nessun bug trovato (build verde 8/8, exit 0, lint+typecheck attivi; live 200 su /, /singularity, cv-emanuele-zanardo.pdf, manifest.webmanifest, favicon.ico, apple-touch-icon.png, og-image.png, portrait.webp, hero-bg.webp, robots.txt, sitemap.xml; 404 corretta con robots noindex e title singolo; meta/OG/Twitter/canonical/lang/theme-color/format-detection presenti; JSON-LD Person+ProfessionalService validi al parsing; security headers live: CSP, X-Frame-Options DENY, Permissions-Policy, nosniff, HSTS, Referrer-Policy strict-origin-when-cross-origin, COOP/CORP same-origin; ancore tutte con id corrispondenti; rel=noopener su tutti i target=_blank; skip link presente su / e /singularity; nessun placeholder reale — solo attributi placeholder legittimi del form; nessun link interno rotto; nessuna immagine mancante).
- Nessuna miglioria forzata: sweep completo — Person JSON-LD ha già sameAs/knowsAbout/worksFor/address/telefono E.164, manifest PWA completo (id, categories), reduced-motion gestito, hero con priority, sitemap con lastmod basato su git, iframe con title+referrerPolicy. Tutto già a posto.
- Blocco aperto: `www.emanuelezanardo.info` ancora NXDOMAIN — azione di Emanuele su IONOS (CNAME www → cname.vercel-dns.com) + Vercel Domains.
- Discrepanza date Horien NON risolta: sito Feb 2022–Dec 2025 vs CV Oct 2021–Jan 2026 — servono date corrette da Emanuele.

## 02/10/2026 ~02:45 CEST — ciclo QA orario
- Nessun bug trovato (build verde 8/8 con lint+typecheck attivi; live 200 su /, /singularity, cv-emanuele-zanardo.pdf, manifest.webmanifest, favicon.ico, apple-touch-icon.png, icon-192/512.png, og-image.png, portrait.webp, hero-bg.webp, robots.txt, sitemap.xml; 404 corretta; meta/OG/Twitter/canonical/lang/theme-color/format-detection/HSTS presenti; iframe Streamlit con title; decorative img con alt="" aria-hidden; ancore tutte con id; placeholder reali assenti — solo attributi legittimi del form; LinkedIn 999 = bot-block del crawler, non link rotto).
- Nessuna miglioria forzata: sweep completo — anche l'iframe su /singularity ha già title, JSON-LD validi, header di sicurezza tutti attivi, manifest PWA completo.
- Blocco aperto: `www.emanuelezanardo.info` ancora NXDOMAIN (01/10 ~18:45) — azione di Emanuele su IONOS (CNAME www → cname.vercel-dns.com) + Vercel Domains.
- Discrepanza date Horien NON risolta: sito Feb 2022–Dec 2025 vs CV Oct 2021–Jan 2026 — servono date corrette da Emanuele.

## 02/10/2026 ~02:00 CEST — aggiornamento documentale giornaliero
- QA oraria attiva: nessun bug trovato nei cicli del 01/10 (build verde 8/8, live 200, meta/OG/JSON-LD/header sicurezza OK; migliorie a11y/SEO incrementali).
- Ciclo ~01:50 CEST 02/10: lint+typecheck ora ATTIVI nel build locale (node_modules era stale, Next.js saltava silenziosamente i controlli; `npm install` dal lockfile ha ripristinato la sincronia — nessuna modifica a file tracciati). Live verificato tutto 200.
- Blitz 01/10 21:03: 404/PWA e contenuti CV migliorati. Discrepanza Horien NON risolta: sito Feb 2022–Dec 2025 vs CV Oct 2021–Jan 2026 — servono date corrette da Emanuele.
- Blocco aperto: `www.emanuelezanardo.info` ancora NXDOMAIN (verificato via DoH) — azione di Emanuele su IONOS (CNAME www → cname.vercel-dns.com) + Vercel Domains.

## Stato
- Live su https://emanuelezanardo.info/ (Vercel) — deploy attivo e allineato all'ultimo commit.
- Stack: Next.js 15.
- Build verde: 8/8 pagine.
- Ultimo commit: 09c8389 (QA solidita: manifest PWA con id e categories).
- NOTA DNS (01/10 ~18:45 CEST): `www.emanuelezanardo.info` NON esiste nel DNS (NXDOMAIN verificato via DoH Cloudflare; apex → 216.198.79.1 OK). Chi digita www. ottiene "sito non raggiungibile". Fix lato Emanuele: in IONOS aggiungere CNAME `www` → `cname.vercel-dns.com`, poi in Vercel → Settings → Domains aggiungere `www.emanuelezanardo.info` (redirect a apex o servito).

## Ultimi eventi verificati (01–02/10/2026)
- QA ~01:50 CEST 02/10: build verde 8/8 con lint+typecheck ora ATTIVI — fix: node_modules locale era stale (eslint ed altri pacchetti mancanti, build Next.js saltava silenziosamente il controllo lint/types con l'avviso "ESLint must be installed"); `npm install` ha ripristinato la sincronia col lockfile (nessuna modifica a file tracciati), rebuild verde con lint+types eseguiti e superati. Nota: su Vercel il problema non esisteva (installa sempre dal lockfile). Live: 200 su / e /singularity; CV PDF, manifest, favicon, apple-touch-icon, og-image, portrait.webp, hero-bg.webp, robots.txt, sitemap.xml tutti 200; 404 corretta; meta/OG (incl. dimensioni+alt)/Twitter/canonical/lang/theme-color/format-detection presenti; JSON-LD (2 blocchi) valido al parsing; security headers live: CSP, X-Frame-Options DENY, Permissions-Policy, nosniff, HSTS, Referrer-Policy strict-origin-when-cross-origin, COOP same-origin, CORP same-origin; nessun placeholder reale — solo attributi placeholder legittimi dei campi form; nessun link interno rotto, tutte le ancore con target; link esterni GitHub/LinkedIn 200, rel=noopener ovunque; rel="me" già presente. Nessuna miglioria forzata: sweep completo — tutto già a posto. NOTA DNS www: ancora NXDOMAIN (verificato via DoH Cloudflare) — resta l'unico punto aperto, azione di Emanuele su IONOS/Vercel.
- QA ~00:45 CEST 02/10: nessun bug trovato (build verde 8/8; 200 su /, /singularity, cv-emanuele-zanardo.pdf, manifest.webmanifest, favicon.ico, apple-touch-icon.png, robots.txt, sitemap.xml, og-image.png, hero-bg.webp, portrait.webp via image optimizer; 404 corretta su URL inesistente; meta/OG/Twitter/canonical/lang/theme-color/format-detection presenti; JSON-LD Person+ProfessionalService+SoftwareApplication OK; nessun placeholder reale — solo attributi placeholder legittimi dei campi form; nessun link interno rotto; tutti i target=_blank con rel=noopener; gerarchia heading pulita (1 h1 + 4 h2, nessun id duplicato); link esterni GitHub/LinkedIn 200; app Streamlit embeddata raggiungibile (200)). Nessuna miglioria forzata: sweep completo (honeypot form, aria-live toast, subject email col nome mittente, anno footer dinamico, preconnect Streamlit, header sicurezza, JSON-LD) — tutto già a posto. Nota: la NOTA DNS www resta l'unico punto aperto e richiede azione di Emanuele su IONOS/Vercel.
- QA ~13:45 CEST 01/10: nessun bug trovato (build verde 8/8 pre+post fix; 200 su /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, og-image.png, apple-touch-icon.png, hero-bg.webp, portrait.webp; 404 corretta su URL inesistente; meta/OG/Twitter/canonical/lang/theme-color/format-detection presenti; JSON-LD Person+SoftwareApplication OK; security headers live: CSP, X-Frame-Options DENY, Permissions-Policy, nosniff, Referrer-Policy strict-origin-when-cross-origin, COOP same-origin, CORP same-origin; nessun placeholder reale — solo attributi placeholder legittimi dei campi form; nessun link interno rotto; tutti i target=_blank con rel=noopener). Miglioria: `<link rel="preconnect">` all'origine Streamlit su /singularity accanto al dns-prefetch esistente — DNS+TLS+TCP stabiliti in anticipo per l'iframe principale (coerente con la decisione di non usare loading="lazy" sull'iframe); commit f1245e7 pushato su origin/main via Contents API.
- QA ~11:56 CEST 01/10: nessun bug trovato (build verde 8/8 pre+post fix; 200 su /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, og-image.png, apple-touch-icon.png, icon-192/512/512-maskable.png, hero-bg.webp, portrait.webp; meta/OG/Twitter/canonical/lang/theme-color/format-detection presenti; JSON-LD Person+ProfessionalService OK; security headers live: CSP, X-Frame-Options DENY, Permissions-Policy, nosniff, HSTS, Referrer-Policy strict-origin-when-cross-origin, COOP same-origin, CORP same-origin; nessun placeholder reale — solo classi placeholder: del form e word-match in payload RSC; nessun link interno rotto; iframe Streamlit su /singularity raggiungibile). Miglioria: date di impiego delle esperienze ora renderizzate come `<time dateTime="2026-01">` machine-readable (inizio/fine separati, "Present" quando in corso) in src/components/sections/projects.tsx — micro-SEO/a11y; commit 1fb715a pushato su origin/main via Contents API, deploy Vercel in corso di verifica.
- QA ~10:55 CEST 01/10: nessun bug trovato (build verde 8/8 pre+post fix; 200 su /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, og-image.png, apple-touch-icon.png, hero-bg.webp, portrait.webp; 404 corretta su URL inesistente; meta/OG/Twitter/canonical/lang/theme-color/format-detection presenti; JSON-LD Person+ProfessionalService e SoftwareApplication OK; security headers live: CSP, X-Frame-Options DENY, Permissions-Policy, nosniff, HSTS, Referrer-Policy strict-origin, COOP same-origin, CORP same-origin; nessun placeholder reale; iframe Streamlit su /singularity raggiungibile (200); nessun link interno rotto). Miglioria: `tabIndex={-1}` aggiunto alla `<section id="hero">` in hero.tsx — era l'unica sezione senza focus programmatico (about/contact/projects/services ce l'hanno già); completa la coerenza del pattern moveFocusToSection (WCAG 2.4.3), zero impatto sull'ordine di tabulazione.
- QA ~09:55 CEST 01/10: nessun bug trovato (build verde 8/8 pre+post fix; 200 su /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, og-image.png, apple-touch-icon.png, hero-bg.webp, portrait.webp; 404 corretta su URL inesistente; meta/OG/Twitter/canonical/lang/theme-color/format-detection presenti; JSON-LD Person+ProfessionalService e SoftwareApplication OK; security headers live: CSP, X-Frame-Options DENY, Permissions-Policy, nosniff, HSTS, Referrer-Policy, COOP same-origin, CORP same-origin; nessun placeholder reale — solo attributi placeholder dei campi form; nessun link interno rotto). Miglioria: "← Torna al Portfolio" → "← Back to Portfolio" nell'header di /singularity — era l'ultima stringa italiana sul sito inglese (la 404 usa già "Back to homepage"); commit 402a4de pushato su origin/main, deploy Vercel in corso di verifica.
- QA ~07:55 CEST 01/10: nessun bug trovato (build verde 8/8 pre+post; 200 su /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, og-image.png; 404 corretta su URL inesistente; meta/OG/Twitter/canonical/lang/theme-color/format-detection presenti; JSON-LD Person+ProfessionalService OK; security headers live: CSP, X-Frame-Options DENY, Permissions-Policy, nosniff, HSTS, Referrer-Policy strict-origin, COOP same-origin; nessun placeholder reale; ancore #about/#contact/#projects/#services/#main-content tutte con id corrispondenti; rel=noopener su tutti i target=_blank; nessun link interno rotto). Miglioria: header `Cross-Origin-Resource-Policy: same-origin` in next.config.ts — completamento naturale dell'hardening COOP del ciclo ~06:55 (difesa contro XS-Leaks, tutti gli asset sono same-origin; COEP volutamente NON aggiunto perché bloccherebbe l'iframe cross-origin di Streamlit su /singularity); deploy Vercel verificato live (header servito, /singularity ancora 200 con embed funzionante).
- QA ~06:55 CEST 01/10: nessun bug trovato (build verde 8/8; 200 su / e /singularity; CV PDF, manifest, favicon, og-image, apple-touch-icon, portrait.webp, hero-bg.webp, robots.txt, sitemap.xml tutti 200; meta/OG/Twitter/JSON-LD presenti; nessun placeholder reale — solo classi placeholder: del form; link esterni tutti con rel=noopener; honeypot form correttamente nascosto; security headers live verificati: CSP, X-Frame-Options, Permissions-Policy, nosniff). Miglioria: header `Cross-Origin-Opener-Policy: same-origin` aggiunto in next.config.ts — era l'unico hardening standard mancante; sicuro qui (nessun popup, l'unico _blank è un anchor normale verso l'app Streamlit).
- QA ~05:50 CEST 01/10: nessun bug trovato (build verde 8/8; 200 su / e /singularity; CV PDF, manifest, favicon, og-image, apple-touch-icon, robots.txt, sitemap.xml tutti 200; canonical /singularity OK; meta/OG/Twitter/JSON-LD presenti; nessun placeholder reale — solo attributi placeholder legittimi del form; form contatti gestisce già con messaggio chiaro il caso GMAIL_APP_PASSWORD mancante). Miglioria: `<FocusMainOnMount />` aggiunto anche alla homepage — la navigazione client-side da /singularity a / non spostava il focus sul nuovo <main> (stesso pattern WCAG 2.4.3 già applicato a /singularity, hero CTA e header nav).
- QA ~03:05 CEST 01/10: nessun bug trovato. Miglioria: CTA hero (Experiences/About Me/Contact) ora spostano il focus sulla sezione target dopo lo scroll — stesso pattern WCAG 2.4.3 già usato nella nav dell'header (hero.tsx diventa client component, +0.6 kB sulla home). Build verde 8/8.
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

## QA ~16:45 CEST 02/10
- Pull fresco da origin/main (37763bc), build verde 8/8 pre e post fix (lint+typecheck attivi).
- Live: 200 su /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, og-image.png, apple-touch-icon.png; 404 corretta su URL inesistente.
- Security headers live: CSP, X-Frame-Options DENY, Permissions-Policy, nosniff, HSTS, Referrer-Policy strict-origin-when-cross-origin, COOP same-origin, CORP same-origin.
- Meta/OG/Twitter/canonical/lang/theme-color/format-detection presenti su / e /singularity; JSON-LD validi al parsing (home: Person+ProfessionalService; /singularity: Person+ProfessionalService+SoftwareApplication).
- Nessun placeholder reale; nessun link interno rotto (tutte le ancore con id); rel=noopener su tutti i target=_blank; iframe Streamlit con title; CV con download; form contatti con inputMode/enterKeyHint/autoComplete già ottimizzati.
- Nessun bug trovato. Miglioria: `offers.price` del JSON-LD SoftwareApplication da stringa '0' a numero 0 (schema.org raccomanda Number) — commit 85f43e9 pushato su origin/main via Contents API; deploy Vercel automatico in corso.
- Blocco aperto (da Emanuele): `www.emanuelezanardo.info` ancora NXDOMAIN — CNAME www → cname.vercel-dns.com su IONOS + dominio su Vercel.

## QA ~17:45 CEST 02/10
- Pull fresco da origin/main (8b2af95, in sync), build verde 8/8 (exit 0, lint+typecheck attivi).
- Live: 200 su /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, og-image.png, apple-touch-icon.png, hero-bg.webp, portrait.webp; 404 corretta su URL inesistente.
- Meta: lang en, title singolo, canonical, description, OG/Twitter con dimensioni+alt, theme-color, format-detection — presenti su / e /singularity; ancore #main-content/#about/#services/#projects/#contact tutte con id corrispondenti; nessun placeholder reale; nessun link interno rotto; aria-label su icon links e scroll-to-top; sitemap con lastmod git-based.
- Deploy Vercel: status `success` su 8b2af95 (verificato via GitHub commit status) — live allineato al repo.
- Nessun bug trovato. Nessuna miglioria forzata: sweep completo — headers sicurezza, CSP, JSON-LD, a11y focus, PWA manifest tutto già a posto.
- Blocco aperto (da Emanuele): `www.emanuelezanardo.info` ancora NXDOMAIN.

## QA ~18:40 CEST 02/10
- Pull fresco da origin/main (165b7be, in sync dopo reset --hard di 3 commit locali duplicati già upstream), build verde (exit 0, 8/8 pagine statiche; nota: lint/types saltati in build locale con avviso "ESLint must be installed" — node_modules locale non in sync col lockfile, non code; su Vercel installazione pulita).
- Live: 200 su /, /singularity, cv-emanuele-zanardo.pdf, hero-bg.webp, portrait.webp (diretti e via /_next/image), manifest, robots.txt, sitemap.xml; 404 corretta su URL inesistente.
- Security headers live: CSP, X-Frame-Options DENY, Permissions-Policy, nosniff, HSTS (max-age 63072000), Referrer-Policy strict-origin-when-cross-origin, COOP same-origin, CORP same-origin.
- Meta: title singolo, description, canonical, OG/Twitter, lang en, theme-color, format-detection — presenti; alt su portrait, alt="" decorativo su hero-bg; JSON-LD Person+ProfessionalService+SoftwareApplication; nessun placeholder reale; nessun link interno rotto; rel=noopener su target=_blank.
- Deploy Vercel: status `success` su 165b7be (verificato via GitHub commit status) — live allineato al repo.
- Nessun bug trovato. Nessuna miglioria forzata: sweep completo — headers, CSP, JSON-LD, a11y focus, immagini, form tutto già a posto.
- Blocco aperto (da Emanuele): `www.emanuelezanardo.info` ancora NXDOMAIN.

## QA ~20:40 CEST 02/10
- Pull fresco da origin/main (59947c4, in sync), build verde (exit 0, 8/8 pagine statiche, lint+typecheck eseguiti).
- Live: 200 su /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, og-image.png, apple-touch-icon.png; 404 corretta su URL inesistente.
- Security headers live: CSP, X-Frame-Options DENY, Permissions-Policy, nosniff, HSTS (max-age 63072000), Referrer-Policy strict-origin-when-cross-origin, COOP same-origin, CORP same-origin.
- Meta: title singolo, description, canonical, OG/Twitter (+og:image:type), lang en, theme-color, format-detection — presenti; aria-current già su nav desktop/mobile (scroll-spy, assente in SSR = previsto); aria-label su icon links e scroll-to-top; nessuna immagine mancante; nessun placeholder reale; nessun link interno rotto; rel=noopener su target=_blank.
- Nessun bug trovato. Nessuna miglioria forzata: sweep completo — headers, CSP, JSON-LD, a11y focus, immagini, form tutto già a posto.
- Blocco aperto (da Emanuele): `www.emanuelezanardo.info` ancora NXDOMAIN.

## QA ~21:40 CEST 02/10
- Pull fresco da origin/main (13e7921, in sync), build verde (exit 0, 8/8 pagine statiche).
- Live: 200 su /, /singularity, robots.txt, sitemap.xml; immagini _next/image (hero-bg.webp, portrait.webp) 200 con URL unescaped (i 400 visti in un primo sweep erano un artefatto del parsing HTML del test, non del sito); tel:+393451114337 corretto (errore del test che prefissava il dominio); link streamlit ?embed=true 200, plain streamlit timeout = cold start di Streamlit Cloud (transitorio); 404 corretta su URL inesistente.
- Meta: description, OG/Twitter (+type, +alt), canonical, lang en, theme-color, og:locale — presenti; nessun placeholder reale (solo placeholder di form legittimi); nessun link interno rotto; rel=noopener su target=_blank.
- Miglioria: pwa — `type: image/png` aggiunto agli icon degli shortcut PWA del manifest (coerenza con gli icon top-level; i validatori manifest segnalano le voci senza mime type).
- Blocco aperto (da Emanuele): `www.emanuelezanardo.info` ancora irraggiungibile (curl 000).

## QA ~23:45 CEST 02/10
- Pull fresco da origin/main (39b40e4, in sync), build verde (exit 0, 8/8 pagine statiche, lint+typecheck eseguiti).
- Live: 200 su /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, og-image.png, apple-touch-icon.png; 404 corretta su URL inesistente e su path inesistente sotto /_next/static.
- Security headers live: CSP, X-Frame-Options DENY, Permissions-Policy, nosniff, HSTS (max-age 63072000), Referrer-Policy strict-origin-when-cross-origin, COOP same-origin, CORP same-origin — su / e /singularity.
- Meta: lang en, title singolo, description, canonical, OG/Twitter (+type/+alt), og:locale, theme-color, format-detection — presenti; JSON-LD parse-validi (home: Person+ProfessionalService; /singularity: +SoftwareApplication).
- Ancore #main-content/#about/#services/#projects/#contact tutte con id corrispondenti; nessun link interno rotto; rel=noopener su tutti i target=_blank; nessun placeholder reale (solo placeholder di form legittimi); iframe Streamlit con title; embed Streamlit ?embed=true 200.
- Immagini leggere e ottimizzate (og-image 34KB, hero-bg 55KB, portrait 35KB); reduced-motion rispettato (CSS + scroll-to-top).
- Nessun bug trovato. Nessuna miglioria forzata: sweep completo — headers, CSP, JSON-LD, a11y focus, PWA, immagini, form, robots/sitemap tutto già a posto.
- Blocco aperto (da Emanuele): `www.emanuelezanardo.info` ancora irraggiungibile (curl 000, DNS non configurato).

## QA ~00:55 CEST 03/10
- Pull fresco da origin/main (d6311a4, in sync), build verde pre e post miglioria (exit 0, 8/8 pagine statiche, lint+typecheck via build).
- Live: 200 su /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, apple-touch-icon.png, og-image.png, portrait.webp; 404 corretta su URL inesistente.
- Meta: lang en, description, canonical, OG/Twitter (+type/+alt), og:locale, theme-color, format-detection, googlebot max-image-preview — presenti; security headers OK (CSP, HSTS, nosniff, DENY, Referrer-Policy, COOP/CORP, Permissions-Policy); 1 h1/pagina; JSON-LD validi; ancore tutte risolte; rel=noopener ovunque; nessun placeholder di contenuto; nessun link interno rotto; nessuna immagine mancante.
- Nessun bug trovato.
- Miglioria/security: RFC 9116 security.txt su /.well-known/security.txt (route handler con Expires dinamico +180 giorni, Contact mailto già pubblico nel footer) — verificato live 200 text/plain dopo il deploy Vercel.

## QA ~01:55 CEST 03/10
- Pull fresco da origin/main (30fe446, in sync), build verde (exit 0, Next.js 15.3.8, 8/8 pagine statiche, lint+typecheck via build; TMPDIR=~/workspace/tmp-build).
- Live: 200 su /, /singularity, robots.txt, sitemap.xml, /.well-known/security.txt, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, apple-touch-icon.png, og-image.png; 404 corretta su URL inesistente.
- Meta: description, canonical, OG/Twitter completi (+width/+height/+type/+alt), og:locale en_US, theme-color, format-detection, googlebot — presenti su / e /singularity; hero-bg.webp con preload immagine (priority) e font woff2 preloaded; security headers OK (CSP, HSTS, nosniff, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy); 1 h1/pagina; tutte le ancore (#about/#contact/#projects/#services/#main-content) risolte; target=_blank tutti con rel=noopener (+me su social); nessun placeholder di contenuto; nessun link interno rotto; nessuna immagine mancante.
- Link esterni: GitHub 200, LinkedIn 200, app Streamlit embeddata raggiungibile (303 redirect).
- Nessun bug trovato.
- Nessuna miglioria forzata: sweep completo — form (autocomplete/autocapitalize/honeypot+aria-hidden+tabIndex=-1/aria-busy/aria-invalid), a11y focus (skip-link, moveFocusToSection, tabIndex=-1 sezioni), scroll-margin-top 4.5rem per header fisso, PWA manifest completo, JSON-LD, sitemap lastmod da git, robots allow-all (security.txt raggiungibile), security headers/CSP — tutto già a posto.
- Blocco aperto (da Emanuele): `www.emanuelezanardo.info` ancora NXDOMAIN — richiede azione sua su IONOS/Vercel.

## QA ~02:40 CEST 03/10
- Pull fresco da origin/main (04a2ae0, in sync), build verde (exit 0, 8/8 pagine statiche, lint+typecheck via build).
- Live: 200 su /, /singularity, robots.txt, sitemap.xml, /.well-known/security.txt, manifest.webmanifest, cv-emanuele-zanardo.pdf, og-image.png; 404 corretta su URL inesistente.
- Meta: description, canonical, OG/Twitter completi, og:locale en_US, theme-color, format-detection, googlebot max-image-preview — presenti; 1 h1/pagina; h2 sulle sezioni; aria-label sui link social con rel noopener (+me); skip-link e focus management a posto; form con autocomplete/autocapitalize/honeypot; nessun placeholder di contenuto; nessun link interno rotto; nessuna immagine mancante; sitemap con lastmod da git (02/10).
- Nessun bug trovato.
- Nessuna miglioria forzata: sweep completo — il sito è già coperto su tutti i fronti testati nei cicli precedenti (security.txt, CSP, JSON-LD, a11y focus, PWA manifest con shortcut, robots/sitemap, immagini ottimizzate).
- Blocco aperto (da Emanuele): `www.emanuelezanardo.info` ancora irraggiungibile (curl 000) — richiede azione sua su IONOS/Vercel.

## QA ~05:45 CEST 03/10
- Pull fresco da origin/main (2bdae10, in sync), build verde (exit 0, Next.js 15.3.8, 8/8 pagine statiche).
- Live: 200 su /, /singularity, robots.txt, sitemap.xml, /.well-known/security.txt, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, apple-touch-icon.png, og-image.png, hero-bg.webp, portrait.webp (diretti); 404 corretta su URL inesistente.
- Deploy Vercel: status `success` su 2bdae10 — live allineato al repo.
- Meta: description, canonical, OG/Twitter completi, og:locale, theme-color, format-detection, googlebot — presenti; 1 h1/pagina; ancore tutte risolte; target=_blank tutti con rel=noopener; nessun placeholder di contenuto; nessun link interno rotto; nessuna immagine mancante; footer con anno dinamico.
- Nessun bug trovato.
- Nessuna miglioria forzata: sweep completo — il sito è già coperto su tutti i fronti testati nei cicli precedenti (security.txt, CSP, JSON-LD, a11y focus, PWA manifest, robots/sitemap, immagini ottimizzate, rate limit form).
- Blocco aperto (da Emanuele): `www.emanuelezanardo.info` ancora irraggiungibile (NXDOMAIN) — richiede azione sua su IONOS/Vercel.

## QA ~06:45 CEST 03/10
- Pull fresco da origin/main (3b0b053, in sync), build verde (exit 0, Next.js 15.3.8, 8/8 pagine statiche, lint+typecheck via build).
- Live: 200 su /, /singularity, robots.txt, sitemap.xml, /.well-known/security.txt, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, apple-touch-icon.png, og-image.png, hero-bg.webp, portrait.webp (diretti); 404 corretta su URL inesistente; security.txt 200 text/plain.
- Security headers OK (CSP completa con frame-src Streamlit, X-Frame-Options DENY, Permissions-Policy, nosniff, HSTS 63072000, Referrer-Policy strict-origin-when-cross-origin, COOP/CORP same-origin).
- Meta: title, description, canonical, OG/Twitter completi (+width/+height/+type/+alt), og:locale en_US, theme-color, format-detection, googlebot max-image-preview — presenti su / e /singularity; ancore (#main-content/#about/#services/#projects/#contact) tutte risolte; target=_blank tutti con rel=noopener; nessun placeholder di contenuto; nessun link interno rotto; nessuna immagine mancante.
- Nessun bug trovato.
- Nessuna miglioria forzata: sweep completo — sito già coperto su tutti i fronti (security.txt RFC 9116, CSP, JSON-LD, a11y focus, PWA manifest con shortcut+screenshots, robots/sitemap, immagini ottimizzate, form con honeypot/rate limit, autoCapitalize mobile).
- Blocco aperto (da Emanuele): `www.emanuelezanardo.info` ancora irraggiungibile (curl 000) — richiede azione sua su IONOS/Vercel.
## QA ~07:39 CEST 03/10
- Pull fresco da origin/main (279aa33, in sync), build verde (exit 0, Next.js 15.3.8, 8/8 pagine statiche, lint+typecheck via build; ~5min per contesa CPU su VM 2 vCPU con build parallelo 12-Sito-gioielleria).
- Live: 200 su /, /singularity, robots.txt, sitemap.xml, /.well-known/security.txt, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, apple-touch-icon.png, og-image.png, hero-bg.webp, portrait.webp (diretti); 404 corretta su URL inesistente; tip con Vercel status success (deploy operativi).
- Security headers OK (CSP completa con frame-src Streamlit, X-Frame-Options DENY, Permissions-Policy, nosniff, HSTS 63072000, Referrer-Policy strict-origin-when-cross-origin, COOP/CORP same-origin).
- Meta: title, description, canonical, OG/Twitter completi (+width/+height/+type/+alt), og:locale en_US, theme-color, format-detection, googlebot max-image-preview — presenti su / e /singularity; preconnect Streamlit già in pagina /singularity; ancore tutte risolte; target=_blank tutti con rel=noopener (+me sui social); alt su tutte le img; nessun placeholder di contenuto; nessun link interno rotto; nessuna immagine mancante.
- Nessun bug trovato.
- Nessuna miglioria forzata: sweep completo — sito già coperto su tutti i fronti (security.txt RFC 9116, CSP, JSON-LD, a11y focus, PWA manifest con shortcut+screenshots, robots/sitemap, immagini ottimizzate, form con honeypot/rate limit, autoCapitalize mobile, noValidate).
- Blocco aperto (da Emanuele): `www.emanuelezanardo.info` ancora irraggiungibile (curl 000) — richiede azione sua su IONOS/Vercel.
## QA ~08:45 CEST 03/10
- Pull fresco da origin/main (fdbe6ee, in sync), build verde (exit 0, Next.js 15.3.8, compilato in 27s, 8/8 pagine statiche, zero errori; TMPDIR=~/workspace/tmp-build).
- Live: 200 su /, /singularity, robots.txt, sitemap.xml, /.well-known/security.txt, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, apple-touch-icon.png, og-image.png, hero-bg.webp, portrait.webp (diretti); 404 corretta su URL inesistente.
- Meta live verificati su HTML reale: lang en, title singolo, description, canonical (https su / e /singularity), og:title/og:image(+type=image/png), twitter:card summary_large_image, theme-color — presenti; 1 h1 per pagina; 2 blocchi JSON-LD sulla home; 0 img senza alt; 0 target=_blank senza noopener; nessun placeholder di contenuto (solo attributi placeholder legittimi del contact form); iframe Streamlit con title + referrerPolicy.
- Security headers live OK (CSP completa con frame-src/connect-src Streamlit, X-Frame-Options implicito via frame-ancestors 'none', HSTS, COOP same-origin, Permissions-Policy).
- Nessun bug trovato.
- Nessuna miglioria forzata: sweep completo — sito già coperto su tutti i fronti (security.txt RFC 9116, CSP, JSON-LD Person+ProfessionalService+SoftwareApplication, a11y focus/skip-link, PWA manifest con shortcut+screenshots, robots/sitemap con lastmod da git, immagini ottimizzate, form con honeypot/rate limit/noValidate/autoCapitalize).
- Nota: `www.emanuelezanardo.info` ora risolve in DNS (198.18.188.97, range benchmarking) ma HTTPS resta irraggiungibile (curl 000) — DNS in movimento, ma serve ancora configurazione su IONOS/Vercel (blocco da Emanuele).
