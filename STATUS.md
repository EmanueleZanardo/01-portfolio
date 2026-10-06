## QA 2026-10-06 ~16:40 CEST (pushato)
- Pull: origin/main = f323544 (fetch OK, nessun nuovo commit remoto). Locale sincronizzato, working tree con sole modifiche del ciclo.
- Vercel: deploy di f323544 "success — Deployment has completed" (Commit Status API) — finestra rate limit 05/10 rientrata, push consentiti.
- Build: OK pre-miglioria (exit 0, Next 15, compilazione ~40s, 21/21 pagine statiche) e OK post-miglioria (exit 0, 22/22 pagine — nuova route /humans.txt registrata).
- Live 200: / /blog /case-studies /cv /singularity /uses; feed.xml / sitemap.xml; 4 blog post; 3 case-study; 10/10 asset (favicon, apple-touch-icon, manifest.webmanifest, og-image, hero-bg.webp, portrait.webp, cv-emanuele-zanardo.pdf, icon-192/512, rss-channel-icon) 200 con dimensioni plausibili. Tutti i link interni unici di homepage, /blog, /case-studies → 200; 0 rotti. 0 placeholder (lorem/TODO/FIXME). 2/2 img con alt corretto.
- Meta: title/description/canonical/OG(+type,secureUrl,alt)/Twitter large card/theme-color/viewport/RSS autodiscovery presenti su homepage.
- Feed: XML valido, 4/4 item, lastBuildDate, image 144x144, content:encoded su tutti gli item.
- Bug trovati: NESSUNO.
- Miglioria (1, piccola, discoverability): route `/humans.txt` (convenzione humanstxt.org — sezioni TEAM/THANKS/SITE, solo contatti già pubblici) + `<link rel="author" href="/humans.txt">` nell'head del layout.
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS irraggiungibile; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel (form contatti).

## QA 2026-10-06 ~12:40 CEST (pushato)
- Pull: origin/main = e11df4a (fetch OK, nessun nuovo commit remoto). Locale sincronizzato.
- Build: OK pre-miglioria (exit 0, Next 15, 20/20 pagine statiche, lint+typecheck puliti, First Load shared 101 kB) e OK post-miglioria (exit 0, lint+typecheck puliti). Log: hidden_files/sito-build-20261006-1240.log / -1240b.log. Vercel: deploy di e11df4a "success — Deployment has completed" (08:51:12Z), finestra rate limit rientrata.
- Live 200: / /blog /cv /uses /case-studies /feed.xml /robots.txt /sitemap.xml; /singularity; cv-emanuele-zanardo.pdf / og-image.png / manifest.webmanifest. 404 propria (HTTP 404, title "Page Not Found | Emanuele Zanardo", OG proprie) su URL inesistente.
- Homepage: title/description/canonical/OG(+type,secureUrl,width/height,alt)/Twitter large card/theme-color/viewport + RSS autodiscovery presenti; 15/15 link interni → 200; 0 img senza alt; 0 placeholder (lorem/TODO/FIXME). feed.xml valido (4/4 item, pubDate RFC-822 corrette). github.com/EmanueleZanardo 200.
- Miglioria (1, piccola, micro-UX): icona RSS nel footer (`/feed.xml`, icona Rss di lucide-react, aria-label "Blog RSS feed") — completa l'autodiscovery del ciclo 10:40 con un link visibile per i lettori umani.
- Bug trovati: NESSUNO.
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS irraggiungibile; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel (form contatti).

## QA 2026-10-06 ~10:40 CEST (pushato)
- Pull: origin/main = 44a2416 (fetch OK, nessun nuovo commit remoto). Locale sincronizzato.
- Build: OK pre-miglioria (exit 0, Next 15, 20/20 pagine statiche, lint+typecheck puliti, First Load 101 kB) e OK post-miglioria (exit 0; /feed.xml in route list). Log: hidden_files/sito-build-20261006-1040.log / -1040b.log.
- Live 200: / /blog /cv /uses /case-studies /singularity; robots.txt / sitemap.xml / manifest.webmanifest / favicon.ico / apple-touch-icon.png / og-image.png / cv-emanuele-zanardo.pdf / .well-known/security.txt. 404 propria su URL inesistente.
- Homepage: title/description/canonical/OG(+type,secureUrl,width/height,alt)/Twitter large card/theme-color/viewport presenti; 9/9 link interni → 200; 0 img senza alt; 0 placeholder (lorem/TODO/FIXME). GitHub/LinkedIn 200, wa.me 302 (redirect atteso).
- Miglioria (1, piccola, SEO/discoverability): feed RSS 2.0 del blog — nuova route `src/app/feed.xml/route.ts` (titolo, excerpt, pubDate, categorie dai tag, XML escapato, Cache-Control public s-maxage=86400) + autodiscovery `<link rel="alternate" type="application/rss+xml" href="/feed.xml">` nel metadata del layout. Verificato in locale con next start: /feed.xml 200, XML valido, 4/4 item, autodiscovery presente in homepage.
- Bug trovati: NESSUNO.

## QA 2026-10-06 ~09:40 CEST (NESSUN push — solo entry di routine, accumulata in locale per regola anti-rate-limit)
- Pull: origin/main = 44a2416 (fetch OK, nessun nuovo commit remoto). Locale sincronizzato.
- Build: OK (exit 0, Next 15, 20/20 pagine statiche, lint+typecheck puliti, First Load 101 kB shared + First Load pagine invariato).
- Live 200: / /blog /case-studies /cv /uses /singularity; robots.txt / sitemap.xml / manifest.webmanifest / favicon.ico / og-image.png / apple-touch-icon.png / cv-emanuele-zanardo.pdf / .well-known/security.txt (valido). /blog/nextjs-15-static-rendering-lessons /case-studies/load-bank-300kw-pcb 200 con title proprio. 404 propria su URL inesistente.
- Meta: title/description/canonical/OG/Twitter/theme-color/lang/skip-link su homepage; OG completo con locale, image 1200x630 e og:type website su /blog. 2/2 img con alt. 0 placeholder di contenuto. 15/15 link interni homepage → 200, 0 rotti.
- Security headers intatti: CSP, HSTS includeSubDomains, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy, COOP/CORP same-origin. Vercel cache HIT.
- Sitemap: 14 URL, lastmod 2026-10-06T04:52:29Z, Sitemap dichiarato in robots.txt.
- Sweep differenziale: target=_blank esterni tutti con rel=noopener (0 senza), manifest con icone 192/512/maskable + screenshots + shortcuts presenti, article meta coperti nei cicli precedenti — nessun gap sensato.
- Bug trovati: NESSUNO. Miglioria: nessuna forzata — diff finto su sito maturo = deploy Vercel sprecato.
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS irraggiungibile; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel (form contatti).

# STATUS.md — 01-portfolio (Sito personale)

**Ultimo aggiornamento: 06/10/2026 ~10:40 CEST**

## QA 2026-10-06 ~08:40 CEST (NESSUN push — solo entry di routine, accumulata in locale per regola anti-rate-limit)
- Pull: origin/main = 44a2416 (fetch OK, nessun nuovo commit remoto). Locale sincronizzato.
- Build: OK (exit 0, Next 15, 20/20 pagine statiche, lint+typecheck puliti, compilato in ~50s). Log: hidden_files/sito-build-20261006-0840.log.
- Live 200: / /blog /case-studies /cv /uses /singularity; robots.txt / sitemap.xml / manifest.webmanifest / favicon.ico / og-image.png / apple-touch-icon.png; /cv-emanuele-zanardo.pdf; .well-known/security.txt. 404 propria su URL inesistente. (Un primo batch curl ha dato 000 sugli asset per un hiccup di rete transitorio; retry → tutti 200.)
- Meta: title/description/canonical/OG/Twitter/theme-color completi su homepage. 9/9 link interni homepage validi. 0 placeholder di contenuto (lorem/TODO/FIXME). 0 img senza alt.
- Sitemap fresca: lastmod 2026-10-06T04:52:29Z su tutte le sezioni, robots.txt con Sitemap: dichiarato.
- Sweep differenziale: aria-current, OG/Twitter con type+secureUrl, form contatti (autocomplete/enterKeyHint/honeypot/rate-limit), hero priority, prefers-reduced-motion, print CSS /cv, noscript form, 404 token-search, breadcrumbs+JSON-LD, article:author — tutto già coperto, nessun gap sensato.
- Bug trovati: NESSUNO. Miglioria: nessuna forzata — diff finto su sito maturo = deploy Vercel sprecato.
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS irraggiungibile; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel (form contatti).

## QA 2026-10-06 ~07:40 CEST (NESSUN push — solo entry di routine, accumulata in locale per regola anti-rate-limit)
- Pull: origin/main = 44a2416 (fetch OK, nessun nuovo commit remoto). Locale pulito.
- Build: OK (exit 0, Next 15, 20/20 pagine statiche, lint+typecheck puliti, First Load JS 136 kB invariato). Log: /tmp/sito-build-20261006-0739.log.
- Live 200: / /blog /case-studies /cv /uses /singularity + /robots.txt /sitemap.xml (14 URL, PDF CV incluso) /manifest.webmanifest /favicon.ico /og-image.png; embed Streamlit /singularity → 200 in 0,9s (niente sleep). 404 propria "Page Not Found | Emanuele Zanardo".
- Meta: title/description/OG/Twitter completi su homepage, /blog, /cv, /uses (campionati). 15/15 link interni homepage → 200. 2 img, entrambe con alt. 0 placeholder di contenuto (solo attributo placeholder dell'input ricerca 404 — legittimo).
- Security headers intatti: CSP (frame-src limitato allo Streamlit), HSTS includeSubDomains, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP/CORP same-origin.
- Sweep differenziale: aria-current nav, theme-color, OG/Twitter con type+secureUrl su tutte le pagine, autocomplete/enterKeyHint/honeypot/rate-limit form contatti, hero priority, prefers-reduced-motion, print CSS /cv, noscript form, 404 token-search — tutto già coperto, nessun gap sensato.
- Bug trovati: NESSUNO. Miglioria: nessuna — nessun diff forzato su sito maturo (precedente: ciclo 06:40 già spinto con deploy Vercel success).
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS irraggiungibile; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel (form contatti).

## QA 2026-10-06 ~06:40 CEST (pushato)
- Pull: origin/main = 5184dc5 (fetch OK, nessun nuovo commit remoto). Locale pulito.
- Build: OK (exit 0, Next 15, 20/20 pagine statiche). Typecheck: pulito (tsc --noEmit).
- Live 200: / /blog /case-studies /cv /uses /singularity + 4 blog post + 3 case studies + /manifest.webmanifest + /cv-emanuele-zanardo.pdf (319 KB) + /og-image.png (200, 34 KB image/png) + /apple-touch-icon.png + /favicon.ico + /robots.txt + /sitemap.xml (14 URL). 404 corretta su URL inesistente (OG card propria "Page Not Found", role=search sull'input).
- Meta: title/description/OG/Twitter su tutte le 6 pagine. 0 img senza alt, 0 placeholder di contenuto (solo attributo `placeholder` dell'input di ricerca 404 — legittimo), 0 link interni rotti. Skip-link #main-content: target presente su tutte le pagine.
- Bug trovati: NESSUNO.
- Miglioria (1, micro-UX pagina 404): il finder di ricerca ora fa token matching con punteggio — ogni parola della query viene cercata in label/description/keywords e le route con più match appaiono per prime (match >= 1). Prima richiedeva la frase esatta come sottostringa: "servcies demo" (prefill dal path) o "energy demo" non trovavano nulla. Ora "energy demo" → Singularity Quant ETRM; "cv resume" → CV per primo. Logica verificata con test Node.
- Push: commit unico via Git Data API (miglioria + entry STATUS.md).
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS irraggiungibile; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel (form contatti).

## QA 2026-10-06 ~04:40 CEST (pushato)
- Rate limit Vercel rientrato (deploy 925ef69 attivo): live completo, nessun 404 stale.
- Pull: origin/main = 925ef69 (fetch OK, nessun nuovo commit remoto). Locale ahead 1 (entry STATUS.md 03:40).
- Build: OK due volte (pre/post fix, exit 0, Next 15, 20/20 pagine statiche, lint+typecheck puliti, First Load 136 kB invariato).
- Live 200: / /blog /blog/<post> /case-studies /case-studies/<slug> /uses /cv /singularity /sitemap.xml /robots.txt /manifest.webmanifest /cv-emanuele-zanardo.pdf /og-image.png /hero-bg.webp /portrait.webp /apple-touch-icon.png /.well-known/security.txt (valido, Expires 2027-04-04); /contatti → 404 custom corretto (nessuna route contatti, il form è in /#contact). Sitemap: 14 URL. Meta completi (description, canonical, OG/Twitter con image 1200x630, theme-color). 0 placeholder, 0 img senza alt, 0 link interni rotti. security.txt valido.
- Bug trovati: NESSUNO.
- Miglioria (1, micro-UX/a11y pagina 404): finder di ricerca ora esposto come landmark `role="search"` + `enterKeyHint="search"` sull'input (tastiera mobile mostra il tasto "cerca"). Verificato nel prerender HTML di /_not-found.
- Push: commit unico via Git Data API (miglioria + entry STATUS.md 03:40/04:40).
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS irraggiungibile; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel (form contatti).

## QA 2026-10-06 ~03:40 CEST (pushato)
- Rate limit Vercel RIENTRATO: GitHub Commit Status API su `67fb3f2` → `Vercel | success | Deployment has completed`. Live = deploy completo: /uses 200 (al ciclo 01:40 era 404 per deploy stale).
- Pull: origin/main = 67fb3f2 (fetch OK, nessun nuovo commit remoto; base 67fb3f24 verificata prima del push).
- Build: OK due volte (pre-fix: exit 0; post-fix: exit 0, Next 15, 20/20 statiche). Log: /tmp/sito-build-0339.log, /tmp/sito-build-0339b.log
- Live: 12 URL → 200 (/, /singularity, /uses, /blog, /case-studies, /cv, /cv-emanuele-zanardo.pdf, /manifest.webmanifest, /apple-touch-icon.png, /favicon.ico, /robots.txt, /sitemap.xml); 7/7 articoli+case studies della sitemap → 200. Meta completi (lang, h1 singolo, canonical, OG/Twitter su tutte le pagine). 0 img senza alt, 0 placeholder, security headers intatti (CSP, HSTS, X-Frame, nosniff, Referrer/Permissions/COOP/CORP).
- Bug fixati (2): (a) /cv non aveva og:image — generateMetadata di pagina sostituisce (non fa merge di) openGraph del layout; aggiunte images + secureUrl come nelle altre pagine. (b) twitter card su /cv era "summary" → "summary_large_image" (coerenza col resto del sito).
- Miglioria (1, SEO+a11y): nuovo componente condiviso `src/components/breadcrumbs.tsx` (nav aria-label="Breadcrumb" con aria-current="page" + BreadcrumbList JSON-LD, stesso schema delle pagine articolo) montato sulle 4 pagine indice che ne erano prive: /blog, /case-studies, /uses, /cv (su /cv dentro il blocco print:hidden, non stampato). Verificato nel prerender: nav + BreadcrumbList presenti su tutte e 4.
- Push: `925ef69` via Git Data API (commit atomico, 5 file, base 67fb3f2 verificata). Locale risincronizzato con git reset --hard origin/main.
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS irraggiungibile; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel (form contatti).

## 06/10/2026 ~02:05 CEST — aggiornamento documentale giornaliero
- **Commit `5ee7cfa` (05/10 11:58 UTC):** SEO, PWA and content improvements — JSON-LD graphs, sitemap per nuove route, web manifest.
- **05/10 13:58 CEST — RE-HIT rate limit Vercel:** "Deployment rate limited — retry in 24 hours" (GitHub Commit Status API sullo SHA 5ee7cfa). Finestra fino a **~06/10 13:58 CEST**: nessun push per ritentare (un push brucia un tentativo); il primo push dopo il rientro deploya tutto. Live = deploy STALE `7336eea` 02:06 CEST; /blog /cv /uses /case-studies 404 live = atteso.
- **Ciclo QA 05/10 23:40:** miglioria breadcrumb navigabile (Home / Blog|Case Studies / titolo, aria-current, BreadcrumbList JSON-LD) — commit locale `f8e9424` in ACCUMULO, nessun push per blocco Vercel.
- Blocchi (serve lui): www.emanuelezanardo.info HTTPS irraggiungibile (IONOS/Vercel); date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel (form contatti).


## QA 2026-10-06 ~02:40 CEST (PUSH RIPRESO: rate limit Vercel RIENTRATO)
- RATE LIMIT FINITO: Emanuele ha pushato lui stesso `d8e9fd1` (STATUS.md) alle 02:08 CEST — GitHub Commit Status API: `Vercel | success | Deployment has completed`. Live = deploy completo: /blog /cv /uses /case-studies ora 200 (prima 404 per deploy stale).
- Pull: origin/main avanzato a d8e9fd1 (solo docs, di Emanuele). 19 commit locali accumulati durante il blocco (5ee7cfa→df857d3) riapplicati sopra d8e9fd1: patch codice applicata pulita (nessun conflitto, lui non toccava src/), STATUS.md unito a mano (suo header + sua sezione 02:05, poi le mie 16 entry QA).
- Build: OK due volte (pre/post fix, exit 0, Next.js 15.3.8, 20/20 statiche, lint+typecheck puliti). article:author verificato nel prerender HTML di /blog e /case-studies.
- Live 200: / /blog /cv /uses /case-studies /singularity robots sitemap manifest favicon apple-touch-icon cv-pdf og-image hero-bg portrait security.txt; /blog/ 308 (redirect trailing slash, normale); 404 corretta su URL inesistente. Sitemap live include tutte le nuove route. Meta completi su / (title/description/canonical/OG/Twitter/theme-color). 0 placeholder, 0 img senza alt, 0 link rotti.
- Bug trovati: NESSUNO (i 404 di ieri erano deploy-side, ora risolti dal deploy di Emanuele).
- Miglioria (1, piccola, SEO): pagine articolo blog/case-studies dichiarano `type: "article"` ma senza autore OG — aggiunto `authors: ["Emanuele Zanardo"]` → `<meta property="article:author">` (prima l'autore era solo nel JSON-LD). File: src/app/blog/[slug]/page.tsx, src/app/case-studies/[slug]/page.tsx.
- Push: TUTTO in UN commit via Git Data API (un solo deploy Vercel): migliorie accumulate del blocco (breadcrumb nav + BreadcrumbList JSON-LD, ItemList JSON-LD su /blog e /case-studies, ProfilePage JSON-LD su /cv, 404 con ricerca precompilata, footer /uses, fallback noscript form contatti) + article:author + STATUS.md.
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS irraggiungibile; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel.

## QA 2026-10-06 ~00:40 CEST (NESSUN push — blocco Vercel rate-limit attivo fino a ~06/10 13:58 CEST)
- Pull: origin/main = 5ee7cfa (fetch OK, nessun nuovo commit remoto). Clone locale ahead 17 → 18 con questo ciclo (miglioria codice + entry STATUS.md in accumulo locale).
- Build: OK due volte (pre-fix: exit 0; post-fix: exit 0, lint+typecheck puliti, 20/20 pagine statiche, 0 warning/errori). ItemList JSON-LD verificato nel prerender HTML di /blog (4 voci BlogPosting) e /case-studies (3 voci CreativeWork). Log: hidden_files/sito-build-0039*.log
- Live: / → 200, /singularity → 200; og-image.png → 200; meta completi (title/description/viewport/canonical/OG/Twitter); tutte le img homepage con alt; 0 placeholder; unico link interno (/singularity) → 200.
- Deploy STALE (invariato): 5ee7cfa rate-limitato ("Deployment rate limited — retry in 24 hours", riverificato via GitHub Commit Status API); live = deploy 7336eea del 05/10 02:06 CEST. /blog /cv /uses /case-studies → 404 live = atteso, non bug. Rientro finestra ~06/10 13:58 CEST → primo push utile al ciclo 14:40; NON pushare prima.
- Bug trovati: NESSUNO.
- Miglioria (1, piccola, SEO): pagine lista /blog e /case-studies senza structured data — ora espongono ItemList JSON-LD con voce per ogni post (BlogPosting: @id+url+headline+description+datePublished+author@id+keywords) e ogni case study (CreativeWork: @id+url+name+description+author@id+keywords), a complemento di BlogPosting+BreadcrumbList già presenti sulle pagine articolo. File: src/app/blog/page.tsx, src/app/case-studies/page.tsx.
- Push: NESSUNO (blocco rate-limit Vercel); commit in accumulo locale, push al primo ciclo utile dopo il rientro.
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS irraggiungibile; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel.

## QA 2026-10-05 ~23:40 CEST (NESSUN push — blocco Vercel rate-limit attivo fino a ~06/10 13:58 CEST)
- Pull: origin/main = 5ee7cfa (fetch OK, nessun nuovo commit remoto). Clone locale ahead 17 (miglioria codice + entry STATUS.md in accumulo locale).
- Build: OK due volte (pre-fix: exit 0, 20/20 pagine, 0 warning; post-fix: exit 0, 20/20 pagine, typecheck pulito, breadcrumb + BreadcrumbList JSON-LD verificati nel prerender HTML di entrambe le pagine articolo). Log: hidden_files/build_20261005_2340*.log
- Live 200: / /singularity /sitemap.xml /robots.txt /manifest.webmanifest /favicon.ico /apple-touch-icon.png /og-image.png /cv-emanuele-zanardo.pdf /hero-bg.webp /portrait.webp; meta completi (title/description/canonical/OG/Twitter); 0 placeholder; 0 TODO; security headers intatti.
- Deploy STALE (invariato): 5ee7cfa/40d7987/a4c8b18 rate-limitati ("Deployment rate limited — retry in 24 hours", riverificato via GitHub Commit Status API); live = deploy 7336eea del 05/10 02:06 CEST. /blog /cv /uses /case-studies → 404 live = atteso, non bug. Rientro finestra ~06/10 13:58 CEST → primo push utile al ciclo 14:40; NON pushare prima.
- Bug trovati: NESSUNO.
- Miglioria (1, piccola, micro-UX/a11y/SEO): le pagine articolo (blog e case-studies) avevano solo un link "back" — ora mostrano un breadcrumb navigabile Home / Blog|Case Studies / titolo con <nav aria-label="Breadcrumb">, aria-current="page" sull'item corrente (titolo troncato via CSS) e BreadcrumbList JSON-LD affiancato allo schema esistente (BlogPosting/Article). File: src/app/blog/[slug]/page.tsx, src/app/case-studies/[slug]/page.tsx.
- Push: NESSUNO (blocco rate-limit Vercel); commit in accumulo locale, push al primo ciclo utile dopo il rientro.
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS irraggiungibile; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel.

## QA 2026-10-05 ~22:40 CEST (NESSUN push — blocco Vercel rate-limit attivo fino a ~06/10 13:58 CEST)
- Pull: origin/main = 5ee7cfa (fetch OK, nessun nuovo commit remoto). Clone locale ahead 16 (solo entry STATUS.md + 3 migliorie codice accumulate, nessuna modifica in questo ciclo).
- Build: OK (exit 0, Next.js 15.3.8, lint+typecheck puliti, 20/20 pagine statiche, 0 warning, First Load shared 101 kB). Log: hidden_files/sito-build-20261005-2240.log
- Live 200: / /singularity /sitemap.xml /robots.txt /manifest.webmanifest /cv-emanuele-zanardo.pdf /og-image.png /favicon.ico /apple-touch-icon.png; /404-probe-xyz -> 404 corretta; meta completi (title/description/OG/Twitter/canonical/lang=en); 0 placeholder; 0 TODO; security headers intatti (CSP, HSTS includeSubDomains, X-Frame-Options DENY, Permissions-Policy, Referrer-Policy, nosniff, COOP/CORP same-origin); 2 img homepage entrambe con alt; unico link interno (/singularity) -> 200.
- Deploy STALE (invariato): 5ee7cfa/40d7987/a4c8b18 rate-limitati ("Deployment rate limited — retry in 24 hours"); live = deploy 7336eea del 05/10 02:06 CEST. /blog /cv /uses /case-studies danno 404 live = atteso, non bug. Rientro finestra ~06/10 13:58 CEST → primo push utile al ciclo 14:40; NON pushare prima.
- Sweep differenziale: robots.txt ok (sitemap dichiarata), security.txt ok (Expires 2027-04-03), /cv e /uses buildati con canonical+OG+description+JSON-LD, blog post con schema BlogPosting, /uses con skip-link/main landmark/aria-label completi. NESSUN gap sensato rimasto.
- Bug trovati: NESSUNO. Miglioria: nessuna — nessun diff forzato (convenzione cicli 18:40/19:40; migliorie recenti noscript-form, 404-route-finder, 404-prefill verificate intatte nel tree).
- Push: NESSUNO (blocco rate-limit Vercel + anti-rate-limit: solo entry STATUS.md); entry accumulata in locale.
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS ancora irraggiungibile (curl 000, ritestato); date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel.

## 05/10/2026 ~21:40 CEST — ciclo QA orario (nessun push: blocco rate-limit Vercel ancora attivo)
- Pull: origin/main fermo a 5ee7cfa (fetch OK, nessun nuovo commit remoto). Clone locale ahead 14 → 15 con questo ciclo (miglioria codice + entry STATUS.md in accumulo locale, in attesa del rientro finestra).
- Blocco Vercel ancora attivo (rientro ~06/10 13:58 CEST; NON pushare prima): live serve deploy stale → /cv /uses /blog /case-studies danno 404 live (deploy-side, ATTESO — non bug).
- Build: OK due volte (pre-fix: exit 0, 20/20 pagine; post-fix: exit 0, 20/20 pagine, 0 warning/errori, First Load JS shared 101 kB; log goal hidden_files/sito-build-20261005-2139*.log).
- Live: / → 200, /singularity → 200, 404 corretta; sitemap.xml/robots.txt/manifest.webmanifest/favicon.ico/apple-touch-icon.png/og-image.png/cv-emanuele-zanardo.pdf/_next/image (hero-bg.webp, portrait.webp) → 200; meta completi (title/description/OG/Twitter/canonical/lang), 0 placeholder, 0 img senza alt; security headers intatti.
- Bug trovati: nessuno.
- Miglioria (1, piccola, micro-UX): la ricerca della pagina 404 partiva vuota — ora pre-compila la query con i segmenti del path fallito (es. /servcies-demo → "servcies demo"), via useEffect su window.location.pathname con split su / - _ (niente hydration mismatch, non sovrascrive input utente). File: src/components/not-found-content.tsx.
- Push: NESSUNO (blocco rate-limit Vercel); commit in accumulo locale, push al primo ciclo utile dopo il rientro (~06/10 14:40 CEST).
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS irraggiungibile (curl 000); date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel.

## 05/10/2026 ~20:40 CEST — ciclo QA orario (nessun push: blocco rate-limit Vercel ancora attivo)
- Pull: origin/main fermo a 5ee7cfa (fetch OK, nessun nuovo commit remoto). Clone locale ahead 13 → 14 con questo ciclo (entry STATUS.md + 3 migliorie codice accumulate, in attesa del rientro finestra).
- Blocco Vercel ancora attivo (rientro ~06/10 13:58 CEST; NON pushare prima): live serve il deploy 7336eea → /cv /uses /blog /case-studies danno 404 live (deploy-side, ATTESO — non bug).
- Build: OK (exit 0, Next.js 15.3.8, 20/20 pagine statiche, First Load 136 kB invariato; rebuild post-fix in corso per verifica, log sito-build-20261005-2040.log).
- Live: / → 200, /singularity → 200; sitemap.xml/robots.txt/manifest.webmanifest/favicon.ico/apple-touch-icon.png/og-image.png/cv-emanuele-zanardo.pdf/security.txt → 200; title corretto, 1 h1, 0 placeholder; headers sicurezza intatti (CSP, HSTS includeSubDomains, X-Frame-Options DENY, Permissions-Policy, Referrer-Policy, nosniff).
- Bug/gap trovato: il route-finder della pagina 404 non conosceva /uses (pagina aggiunta il 05/10) — cercandola, nessun risultato; il commento diceva ancora "(there is no /uses route)". FIX: aggiunta entry /uses a SITE_ROUTES + commento aggiornato in src/components/not-found-content.tsx (tsc + eslint puliti).
- www.emanuelezanardo.info HTTPS ancora irraggiungibile (curl 000) — azione Emanuele, invariato.
- Push: NESSUNO (blocco rate-limit Vercel); miglioria + entry accumulate in locale, push al primo ciclo utile dopo il rientro (~06/10 14:40 CEST).
- Aperti (invariati, azioni Emanuele): www HTTPS; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel.

## 05/10/2026 ~16:40 CEST — ciclo QA orario (nessun push: blocco rate-limit Vercel ancora attivo)
- Pull: origin/main fermo a 5ee7cfa (nessun nuovo commit remoto). Clone canonico ~/workspace/portfolio in sync; ahead 10 (sole entry STATUS.md + fix footer /uses in accumulo locale).
- Blocco Vercel CONFERMATO ancora attivo: GitHub Commit Status API su 5ee7cfa → "Vercel | failure | Deployment rate limited — retry in 24 hours". Live serve ancora il deploy pre-13:58: /blog /cv /uses /case-studies → 404 (deploy-side, ATTESO — non bug del codice; le route esistono e buildano tutte). Primo push utile dopo ~13:58 CEST del 06/10.
- Build: OK (exit 0, Next.js 15.3.8, tutte le route statiche generate — /blog x4 post, /case-studies x3, /cv, /uses, /singularity; log goal hidden_files/sito-build-20261005-1640.log).
- Live: 200 su /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, favicon.ico, apple-touch-icon.png, cv-emanuele-zanardo.pdf, og-image.png, hero-bg.webp, .well-known/security.txt; tutti i link interni dell'homepage + asset _next (js/css/woff2) 200; 1 h1; 0 img senza alt; title/description/canonical/OG/Twitter completi; security headers intatti (CSP, HSTS 63072000+includeSubDomains, X-Frame-Options DENY, nosniff, Permissions-Policy, Referrer-Policy, no X-Powered-By).
- Nessun bug trovato. Sweep miglioria: skip-to-content, lang="en", aria-current su nav già presenti — nessun gap sensato (10° ciclo consecutivo senza gap; nessun diff forzato).
- PUSH: nessuno (rate limit attivo; accumulo locale: 10 ahead).
- Blocchi aperti (serve Emanuele): www.emanuelezanardo.info HTTPS irraggiungibile; date Horien sito vs CV (verificato: cv/page.tsx e about.tsx dicono Oct 2021–Jan 2026, projects.tsx homepage dice Feb 2022–Dec 2025 — tocco io solo su sua conferma quale sia corretto); GMAIL_APP_PASSWORD su Vercel (form contatti); rientro rate-limit Vercel ~06/10 dopo le 13:58 CEST.

## 05/10/2026 ~15:40 CEST — ciclo QA orario (nessun push: miglioria codice in accumulo locale per blocco rate-limit Vercel)
- Pull: origin/main a 5ee7cfa (SEO/PWA + /blog /case-studies /cv /uses) — primo QA completo sul nuovo codice (i cicli 06:40–14:40 giravano su base più vecchia). Clone canonico ~/workspace/portfolio in sync; ahead 8 (sole entry STATUS.md accumulate, non pushate). Repo verificato: 01-portfolio via GitHub API.
- Blocco Vercel: 5ee7cfa (13:58 CEST) → "Vercel | failure | Deployment rate limited — retry in 24 hours" (Commit Status API); rate-limitati anche 40d7987 (13:57) e 2da4b42 (04/10 16:46). Ultimo deploy live riuscito: 8c6ff02 (04/10 15:45 CEST). Live serve build precedente: /blog /case-studies /cv /uses → 404 (deploy-side, ATTESO — non bug). Primo push utile dopo ~13:58 CEST del 06/10 (il primo push deploya tutto).
- Build: OK (exit 0, Next.js 15.3.8, 20/20 pagine statiche, First Load 136 kB invariato; log goal hidden_files/sito-run-20261005-1539.log).
- QA nuove pagine (server locale da build 5ee7cfa): 200 su /blog, /blog/kicad-freerouting-6-layer-power-board, /case-studies, /case-studies/load-bank-300kw-pcb, /cv, /uses, /sitemap.xml, /robots.txt, /.well-known/security.txt; 404 corretta su /blog/nonexistent-slug; sitemap 14 URL con tutte le nuove route; BlogPosting JSON-LD + title template OK.
- Sweep: 1 h1/pagina; 0 img senza alt; 0 placeholder/TODO/FIXME; slugs/date/readingMinutes consistenti (4 post, 3 case studies); live / e /singularity 200 con meta/headers intatti.
- Miglioria (1, piccola): footer.tsx — commento stale ("There is no /uses route — do not add a link for it until it ships") e footer SENZA link /uses mentre l'header lo aveva → aggiunta entry { href: '/uses', label: 'Uses' } in SITE_LINKS + commento aggiornato. Build re-verificato OK. Commit in accumulo locale (no push per rate limit).
- PUSH: nessuno (blocco rate limit fino a ~06/10 13:58 CEST).
- Blocchi aperti (azioni Emanuele): www.emanuelezanardo.info HTTPS irraggiungibile; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel (form contatti); rientro rate-limit Vercel ~06/10 dopo le 13:58 CEST.

## 05/10/2026 ~10:40 CEST — ciclo QA orario (nessun push: solo entry STATUS.md, accumulata in locale per anti-rate-limit)
- Pull: origin/main fermo a 7336eea (nessun nuovo commit di Emanuele); clone attivo ~/workspace/portfolio in sync, nessun conflitto. NOTA: hidden_files/portfolio è un clone duplicato obsoleto (storico divergente: mancano entry 02:40/04:40/06:40/09:40) — ignorarlo, il clone canonico è ~/workspace/portfolio.
- Build: OK (exit 0, Next.js 15.3.8, 8/8 pagine statiche, First Load 135 kB invariato; log goal hidden_files/sito-build-20261005-1039.log).
- Live 200: /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, favicon.ico, cv-emanuele-zanardo.pdf, og-image.png, apple-touch-icon.png, hero-bg.webp, .well-known/security.txt; 404 corretta con noindex; security headers intatti (CSP, HSTS 63072000+includeSubDomains, nosniff, DENY, Referrer-Policy, Permissions-Policy, COOP/CORP same-origin, no X-Powered-By).
- Nessun bug: 1 h1 su / e /singularity; 0 img senza alt; 0 target=_blank senza noopener (verificato: il rel è sulla riga successiva del sorgente); 0 placeholder/TODO; title/description/canonical/OG(12)/Twitter(5)/theme-color/JSON-LD(4/6) OK; tutti i link interni 200; ancore #main-content/#about/#projects/#services/#contact risolte; _next/image 200; footer con anni storici + 2026 dinamico.
- Sweep migliorie: hero Image (priority+sizes=100vw) e portrait (lazy+async+sizes) già ottimizzati; singularity rel="noopener noreferrer" OK — nessun gap sensato rimasto (8° ciclo consecutivo senza gap; nessun diff forzato, diff finto = deploy Vercel sprecato).
- PUSH: nessuno (anti-rate-limit: nessuna modifica sostanziale a codice/test/asset; commit locale in accumulo per il prossimo push sostanziale — ora 6 ahead di origin/main).
- Blocchi aperti (serve Emanuele): www.emanuelezanardo.info HTTPS ancora irraggiungibile (azione IONOS/Vercel); discrepanza date Horien sito vs CV; GMAIL_APP_PASSWORD da impostare su Vercel (form contatti).

## 05/10/2026 ~09:40 CEST — ciclo QA orario (nessun push: solo entry STATUS.md, accumulata in locale per anti-rate-limit)
- Pull: origin/main fermo a 7336eea (nessun nuovo commit); clone attivo ~/workspace/portfolio in sync, nessun conflitto.
- Build: OK (exit 0, Next.js 15.3.8, 8/8 pagine statiche, First Load 135 kB invariato; log goal hidden_files/sito-build-20261005-0939.log).
- Live 200: /, /singularity, robots.txt, sitemap.xml, cv-emanuele-zanardo.pdf, og-image.png, favicon.ico, manifest.webmanifest, .well-known/security.txt (Expires 2027-04-03), apple-touch-icon.png, hero-bg.webp, icon-192/512/512-maskable.png, _next chunk+CSS+woff2; 404 corretta con noindex; security headers intatti (CSP, HSTS 63072000+includeSubDomains, nosniff, DENY, Referrer-Policy, Permissions-Policy, COOP/CORP same-origin, no X-Powered-By).
- Nessun bug: 1 h1/pagina, 0 img senza alt, 0 target=_blank senza noopener, 0 placeholder, title/description/canonical/OG(7)/Twitter(4)/theme-color/JSON-LD OK, tutti i link interni 200, ancore #about/#services/#projects/#contact/#main-content risolte, footer 2026 dinamico, social link con aria-label e rel me.
- Nessuna miglioria forzata: sweep a11y/SEO/perf/micro-UX senza gap sensato (6° ciclo consecutivo; diff finto sprecherebbe un deploy Vercel).
- PUSH: nessuno (anti-rate-limit: l'unica modifica è questa entry STATUS.md, commit locale in accumulo per il prossimo push sostanziale).
- Blocchi aperti (serve Emanuele): www.emanuelezanardo.info HTTPS ancora irraggiungibile (azione IONOS/Vercel); discrepanza date Horien sito vs CV; GMAIL_APP_PASSWORD da impostare su Vercel (form contatti).

## 05/10/2026 ~08:40 CEST — ciclo QA orario (entry ricostruita nel ciclo 09:40 dal run log: la entry non era stata committata)
- Pull: origin/main fermo a 7336eea (nessun nuovo commit di Emanuele); nessun conflitto.
- Build: OK (exit 0, Next.js 15.3.8, 8/8 pagine statiche, First Load 135 kB invariato; log goal hidden_files/sito-build-20261005-0839.log).
- Live 200: /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, favicon.ico, cv-emanuele-zanardo.pdf, og-image.png, apple-touch-icon.png, hero-bg.webp, icon-192/512/512-maskable.png, _next webpack chunk + CSS + woff2; 404 corretta con noindex; ancore #main-content/#about/#projects/#services/#contact tutte risolte.
- Meta: 1 h1 su / e /singularity; 0 img senza alt; 0 placeholder/TODO; title/description/canonical/OG(12)/Twitter/theme-color/JSON-LD Person+ProfessionalService OK; security headers completi (HSTS 63072000+includeSubDomains, CSP, nosniff, DENY, Referrer-Policy, Permissions-Policy, COOP/CORP same-origin, no X-Powered-By).
- Sweep migliorie: hero (priority LCP), portrait (lazy+async+sizes), scroll-to-top (inert/focus/reduced-motion), header (aria-current), footer (anno dinamico), 404, manifest, sitemap — nessun gap sensato rimasto dopo i deep sweep del 04/10.
- Bug trovati: NESSUNO. Miglioria: NESSUNA forzata (nessun gap sensato; diff finto = deploy Vercel sprecato).
- PUSH: nessuno (anti-rate-limit: solo entry STATUS.md; commit locale in accumulo).
- Blocchi aperti (serve Emanuele): www.emanuelezanardo.info HTTPS ancora irraggiungibile (azione IONOS/Vercel); discrepanza date Horien sito vs CV; GMAIL_APP_PASSWORD da impostare su Vercel (form contatti).

## 05/10/2026 ~06:40 CEST — ciclo QA orario (entry spostata in cima nel ciclo 09:40: era stata appesa in fondo al file)
- Pull: origin/main fermo a 7336eea (nessun nuovo commit remoto).
- Build: OK (exit 0, Next.js 15.3.8, 53s compile, 8/8 pagine statiche, 0 errori, First Load 135 kB invariato). Log: sito-build-20261005-0639.log
- Live 200: /, /singularity, robots.txt, sitemap.xml, cv-emanuele-zanardo.pdf, og-image.png, hero-bg.webp, portrait.webp, favicon.ico, apple-touch-icon.png, manifest.webmanifest, .well-known/security.txt; 404 corretta.
- Meta/headers: title, description, OG, canonical, lang OK; 0 placeholder; security headers intatti (CSP, HSTS includeSubDomains, DENY, Permissions-Policy, Referrer-Policy, nosniff); tutte le img con alt; asset _next/image 200.
- Sweep src: 0 TODO; link interni tutti validi; scroll-to-top già curato (focus WCAG 2.4.3, reduced-motion, safe-area).
- Bug trovati: NESSUNO. Miglioria: nessuna — sweep completo senza gap sensato (nessun diff forzato).
- PUSH: nessuno (anti-rate-limit: nessuna modifica sostanziale a codice/test/asset); entry STATUS.md accumulata in locale.
- Blocchi aperti (serve Emanuele): www.emanuelezanardo.info HTTPS ancora irraggiungibile; discrepanza date Horien sito vs CV; GMAIL_APP_PASSWORD da impostare su Vercel (form contatti).

## 05/10/2026 ~04:40 CEST — ciclo QA orario (nessun push: solo entry STATUS.md, accumulata in locale per anti-rate-limit)
- Pull: origin/main fermo a 7336eea (nessun nuovo commit); clone attivo ~/workspace/portfolio in sync, nessun conflitto.
- Build: OK (exit 0, Next.js 15.3.8, compile 52s, lint+typecheck puliti, 8/8 pagine statiche, First Load 135 kB invariato; log goal hidden_files/sito-build-20261005-0439.log).
- Live 200: /, /singularity, robots.txt, sitemap.xml, cv-emanuele-zanardo.pdf, og-image.png, favicon.ico, manifest.webmanifest, .well-known/security.txt, hero-bg.webp, portrait.webp (via _next/image); 404 corretta; security headers intatti (CSP, HSTS 63072000+includeSubDomains, X-Frame-Options DENY, Permissions-Policy, Referrer-Policy, nosniff).
- Nessun bug: title/OG/Twitter/canonical/lang OK, 0 placeholder, link interni tutti validi (ancore #about/#services/#projects/#contact/#main-content, PDF, manifest, /singularity), 0 TODO/FIXME nel sorgente, alt/skip-link/aria-current già curati.
- Nessuna miglioria forzata: sweep a11y/SEO/perf/micro-UX senza gap sensato (5° ciclo consecutivo; diff finto sprecherebbe un deploy Vercel).
- PUSH: nessuno (anti-rate-limit: l'unica modifica è questa entry STATUS.md, commit locale in accumulo per il prossimo push sostanziale).
- Blocchi aperti (serve Emanuele): www HTTPS ancora irraggiungibile (azione IONOS/Vercel); date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel (form contatti).

## 05/10/2026 ~02:00 CEST — aggiornamento documentale giornaliero
- **04/10 02:40 — Emanuele ha pushato lui stesso commit `b5fb48e` (STATUS.md)** durante la sospensione; deploy Vercel riuscito → rate limit sembrava rientrato.
- **04/10 10:40 — scadenza sospensione Vercel:** pushati in blocco i 25 commit accumulati (commit `b21c544`, via Git Data API, base b5fb48e verificata su commits/main). Migliorie andate live: honeypot `extra_info`, aria-current, og:image:secure_url, HSTS, poweredByHeader false, fix focus menu mobile, reduced-motion nav, tempi verbali CV.
- **04/10 11:40** — push `700a332` (text-balance titolo hero); deploy live verificato. **15:40** — push `8c6ff02` (back-to-top con fade) + `97e400f` (STATUS.md).
- **04/10 16:40–16:46 — Squad SITO deep sweep** (5 worker, 12–14 commit, HEAD `2da4b42`): a11y (contrasto, CardTitle div→h3, touch target 44px), SEO (meta /singularity ≤160ch, JSON-LD price numerico), perf (form lazy, First Load 161→135 kB), fix card CENTIEL "After-Sales Engineer"→"After-Sales Technician" (verificato contro CV PDF). ⚠️ ~12 push ravvicinati = rischio rientro rate limit Vercel.
- **04/10 18:40 / 20:40 / 22:40 — deploy Vercel BLOCCATO (~7h)**: il push delle 16:46 non è mai andato live (sitemap lastmod ferma a 13:44:18Z, live serve ancora "After-Sales Engineer"). Serve che Emanuele controlli Vercel → Deployments.
- Blocchi aperti (serve lui): www.emanuelezanardo.info HTTPS irraggiungibile (NXDOMAIN); date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel (form contatti).


## 04/10/2026 ~12:40 CEST — ciclo QA orario (nessun push: solo entry STATUS.md, accumulata in locale per anti-rate-limit)
- Pull: origin/main fermo a 700a332 (nessun nuovo commit di Emanuele); clone principale ~/workspace/portfolio in sync, nessun conflitto.
- Build: OK (exit 0, Next.js 15.3.8, 8/8 pagine statiche, lint+typecheck pass; log goal hidden_files/build_20261004_1240.log; TMPDIR=~/workspace/tmp-build).
- Live 200: /, /singularity, robots.txt, sitemap.xml (con voce cv-emanuele-zanardo.pdf), .well-known/security.txt, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, og-image.png; 404 corretta; security headers completi (CSP, HSTS 63072000+includeSubDomains, nosniff, DENY, Referrer-Policy, Permissions-Policy, no X-Powered-By).
- Nessun bug: 1 h1/pagina, 0 img senza alt, 0 target=_blank senza noopener, 0 placeholder di contenuto, meta/OG (+secure_url/+type/+alt/+dimensioni)/Twitter/canonical/theme-color/lang/og:locale OK, tutte le ancore (#about/#services/#projects/#contact/#main-content) risolte, nessun link interno rotto, nessuna immagine mancante. Nota: aria-current="page" assente nell'HTML statico è atteso — viene impostato client-side da use-active-section (verificato in header.tsx).
- Nessuna miglioria forzata: sweep completo (hero priority/fetchpriority, portrait lazy+async+sizes, iframe con title, label "opens in new tab" coerenti, form honeypot/labels/autocomplete, footer anno dinamico, manifest con shortcuts+screenshots, JSON-LD, reduced-motion) — nessun gap sensato rimasto; forzare un diff finto sprecherebbe un deploy Vercel.
- PUSH: nessuno (anti-rate-limit: l'unica modifica è questa entry STATUS.md, commit locale in accumulo per il prossimo push sostanziale).
- Blocchi aperti (serve Emanuele): www.emanuelezanardo.info HTTPS ancora irraggiungibile (azione IONOS/Vercel); discrepanza date Horien sito vs CV; GMAIL_APP_PASSWORD da impostare su Vercel (form contatti).

## 04/10/2026 ~11:40 CEST — ciclo QA orario
- Pull: origin/main fermo a b21c544 (nessun nuovo commit di Emanuele); clone principale ~/workspace/portfolio in sync, nessun conflitto.
- Audit commit locali "persi" 8478c18/96f4c85 (clone secondario goal hidden_files/portfolio, cicli 05:40/06:40): verifica sostanza confermata con l'audit del ciclo 10:40 — 8478c18 (og:image:secure_url) DUPLICATO (già su origin via b21c544, verificato live); 96f4c85 (moveFocusToSection 60→350ms blanket) SUPERATO dal fix mirato in b21c544 (timeout 350ms con scrollToSection+moveFocusToSection solo nel menu mobile post-chiusura Sheet, 60ms invariati su desktop/hero). Avevo ri-applicato il blanket fix a inizio ciclo: REVERTITO dopo la verifica (avrebbe solo rallentato di 290ms il focus su desktop senza beneficio). Nessun lavoro perso.
- Build: OK pre+post miglioria (exit 0, Next.js 15.3.8, lint+typecheck pass; log goal hidden_files/build_20261004_1140c.log; TMPDIR=~/workspace/tmp-build); text-balance verificato nel prerender (.next/server/app/index.html).
- Live 200: /, /singularity, robots.txt, sitemap.xml (include cv-emanuele-zanardo.pdf — deploy b21c544 RIUSCITO, rate limit Vercel rientrato), manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, og-image.png, .well-known/security.txt; 404 corretta; og:image:secure_url + HSTS (max-age=63072000; includeSubDomains) + honeypot extra_info tutti live; no X-Powered-By.
- Nessun bug: 1 h1/pagina, 0 img senza alt, 0 target=_blank senza noopener, 0 placeholder di contenuto, meta/OG/Twitter/canonical/theme-color/lang OK, nessun link interno rotto.
- Miglioria (micro-UX/tipografia): `text-balance` su h1 hero + tagline in src/components/sections/hero.tsx — niente più vedove tipografiche sul titolo più visto del sito.
- PUSH: commit con fix hero.tsx + questa entry STATUS.md (dettagli SHA nel run log).
- Blocchi aperti (serve Emanuele): www.emanuelezanardo.info HTTPS ancora irraggiungibile (azione IONOS/Vercel); discrepanza date Horien sito vs CV; GMAIL_APP_PASSWORD da impostare su Vercel (form contatti).

## 04/10/2026 ~10:40 CEST — ciclo QA orario (PUSH RIPRESO: sospensione rate limit Vercel scaduta alle 10:00 CEST)
- Build: OK (exit 0, Next.js 15.3.8, 6 route: / e /singularity + not-found/robots/sitemap statiche, security.txt dinamica; log in goal hidden_files/build_20261004_1040.log).
- Pull: origin/main fermo a b5fb48e (antenato di HEAD, storia lineare); locale ahead 24 commit.
- Live 200: /, /singularity, robots.txt, sitemap.xml (/ + /singularity + cv PDF), .well-known/security.txt, cv-emanuele-zanardo.pdf, manifest.webmanifest, apple-touch-icon.png, favicon.ico, og-image.png, hero-bg.webp (55KB), portrait.webp (35KB); 404 corretta su path inesistenti; no X-Powered-By.
- Nessun bug trovato: meta completi (title singolo, description, canonical, OG+type+alt+dimensioni, Twitter card, theme-color #333333, color-scheme dark, lang en, og:locale, 4 JSON-LD), heading h1→h2 in ordine, 1 h1/pagina, img con alt (portrait lazy+async+sizes), skip-link, form con label/autocomplete/enterKeyHint + toast aria-live + honeypot aria-hidden, "placeholder" solo attributi legittimi del form, bottoni con nomi accessibili (Open menu/Close menu via sr-only, Send Message), nessun link interno rotto, security headers completi (CSP, HSTS 63072000 + includeSubDomains in coda, COOP/CORP same-origin, nosniff, DENY, Referrer-Policy, Permissions-Policy).
- Audit "commit persi" 8478c18/96f4c85 (citati nel run log 06:40): trovati nel clone secondario goal hidden_files/portfolio (i cicli 05:40/06:40 hanno lavorato lì, non in ~/workspace/portfolio). Verifica sostanza: 8478c18 (og:image:secure_url) DUPLICATO di 1054732 già nello stack principale; 96f4c85 (moveFocusToSection 60→350ms blanket) SUPERATO da 8b72d7f (fix mirato: focus+scroll nel timeout 350ms post-chiusura Sheet solo per il menu mobile, 60ms invariati su desktop/hero). Nulla di perso: il clone principale ~/workspace/portfolio è strettamente superiore (anche aria-current="page" vs "true" del clone secondario). I cicli futuri lavorano SOLO in ~/workspace/portfolio.
- Nessuna miglioria forzata: audit a11y/SEO/perf completo, nessun gap sensato trovato (ultimi cicli: reduced-motion, aria-current, honeypot, og:secure_url, label CV, HSTS).
- PUSH: stack di 24 commit pushato in blocco via Git Data API (sospensione scaduta + modifiche codice reali: honeypot extra_info, aria-current="page", og:image:secure_url, dimensione CV nel label, HSTS + no X-Powered-By, fix tempi verbali about/projects, focus Sheet mobile, scroll menu mobile, reduced-motion nav; + entry STATUS.md accumulate) — SHA nel run log; reset hard locale su origin/main post-push.
- Blocchi aperti (serve Emanuele): www.emanuelezanardo.info HTTPS ancora irraggiungibile (azione IONOS/Vercel); discrepanza date Horien sito vs CV; GMAIL_APP_PASSWORD da impostare su Vercel (form contatti).

## 04/10/2026 ~07:40 CEST — ciclo QA orario (senza push: sospensione rate limit Vercel fino al 04/10 10:00 CEST)
- Build: OK (exit 0, Next.js 15.3.8, 8/8 pagine statiche prerenderizzate, lint+typecheck pass).
- Pull: origin/main fermo a b5fb48e (antenato di HEAD, storia lineare); locale ahead 21 commit, tutti in coda per il push in blocco dopo le 10:00 (fix codice: honeypot extra_info, aria-current, og:image:secure_url, dimensione CV nel label, HSTS+no X-Powered-By, focus Sheet, scroll menu mobile, reduced-motion nav; + entry STATUS.md orarie).
- Live 200: /, /singularity, robots.txt, sitemap.xml (/, /singularity, cv PDF), .well-known/security.txt, cv-emanuele-zanardo.pdf, manifest.webmanifest, apple-touch-icon.png, favicon.ico, og-image.png; 404 corretta su path inesistenti.
- Nessun bug trovato: meta completi (title singolo, description, canonical, OG+secure_url, Twitter card, theme-color, lang en, JSON-LD Person valido), 1 h1/pagina, img con alt, skip-link presente, form contatti con label+autocomplete+toast aria-live, honeypot aria-hidden, nessun placeholder finto, nessun link interno rotto, asset leggeri (og-image 34KB, hero 55KB), security headers completi (CSP, HSTS 2 anni + includeSubDomains, COOP, nosniff, DENY).
- Nessuna miglioria forzata: copertura a11y/SEO/perf già completa (ultimi cicli: reduced-motion, aria-current, honeypot, og:secure_url, label CV).
- Blocchi aperti (serve Emanuele): www.emanuelezanardo.info HTTPS ancora irraggiungibile (azione IONOS/Vercel); discrepanza date Horien sito vs CV; GMAIL_APP_PASSWORD da impostare su Vercel (form contatti).

## 04/10/2026 ~03:40 CEST — ciclo QA orario
- Miglioria a11y (commit cd54058, solo locale — push sospeso fino al 04/10 10:00): `scrollToSection` in header.tsx ora rispetta `prefers-reduced-motion` (stesso guard già usato in scroll-to-top.tsx): scroll `auto` invece di `smooth` per chi ha ridotto il movimento, perché lo scroll JS forzato ignora lo `scroll-behavior:auto` della media query CSS. Build verde 8/8 exit 0 post-modifica.
- Risolto divergenza branch: origin/main aveva ricevuto b5fb48e (STATUS.md, da altro clone ~02:05); rebase locale su origin/main con risoluzione conflitti STATUS.md (7 entry replayate). Ora la storia è lineare e origin/main è antenato di HEAD; i 7 fix codice (honeypot, aria-current, og:image:secure_url, dimensione CV, HSTS/no X-Powered-By, focus Sheet, scroll menu mobile) sono tutti preservati.
- Nessun bug trovato (build verde 8/8 exit 0 pre+post; live 200 su /, /singularity, robots.txt, sitemap.xml, .well-known/security.txt, cv-emanuele-zanardo.pdf, favicon.ico, apple-touch-icon.png, og-image.png, manifest.webmanifest, icon-192/512.png; 404 corretta; homepage con contenuto reale, nessun placeholder).
- Blocchi aperti (azioni di Emanuele): `www.emanuelezanardo.info` HTTPS ancora irraggiungibile — fix IONOS/Vercel; discrepanza date Horien sito vs CV; GMAIL_APP_PASSWORD da impostare su Vercel (form contatti).

## 04/10/2026 ~02:00 CEST — aggiornamento documentale giornaliero
- **03/10 09:50 CEST — Vercel ha bloccato i deploy del portfolio per rate limit** ("retry in 24 hours", troppi deploy dai push orari QA). Sito live integro sulla versione precedente `453b3bd` (08:45); tutti gli URL rispondono 200. (HEAD remoto: f445252 "seo: sitemap — CV PDF entry + per-file lastmod").
- QA oraria tutto il giorno verde (build 8/8, live 200, nessun bug). **Push sospesi fino alle 10:00 CEST del 04/10**; ~15 commit locali in coda da pushare in blocco.
- Blocchi aperti (serve Emanuele): `www.emanuelezanardo.info` HTTPS irraggiungibile (NXDOMAIN, azione IONOS/Vercel); date Horien discordanti sito vs CV; `GMAIL_APP_PASSWORD` da impostare su Vercel (form contatti).

## 04/10/2026 ~02:40 CEST — ciclo QA orario (senza push: sospensione rate limit Vercel fino al 04/10 10:00 CEST)
- Pull: origin/main avanzato a b5fb48e (push alle 02:05 CEST durante la sospensione — solo STATUS.md, 7 inserimenti, nessun conflitto con il codice locale). Merge base: f445252. Locale ahead 17, nessun push per sospensione; il ciclo delle 10:00+ dovra' rebaseare/mergeare su b5fb48e prima del push in blocco.
- Build: OK (exit 0, Next.js 15.3.8, 8/8 pagine statiche, compilazione 12s, lint+typecheck pass, log in goal hidden_files/sito-build-0239.log).
- Live 200: /, /singularity, sitemap.xml (completa: /, /singularity, cv-emanuele-zanardo.pdf — la voce CV di f445252 e' live: il deploy Vercel del push 02:05 e' riuscito, rate limit apparentemente rientrato), robots.txt, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, apple-touch-icon.png, og-image.png, hero-bg.webp, portrait.webp, .well-known/security.txt; 404 corretta solo su path inesistenti (privacy/cookie-policy non esistono nel repo, non sono bug).
- Meta: title singolo, description, canonical, OG (+type/+alt/+dimensioni/+secure_url), Twitter card summary_large_image, theme-color #333333, lang en — presenti su / e /singularity; 1 h1/pagina; 2/2 img home con alt; "placeholder" solo attributi legittimi del form contatti; nessun link interno rotto (11/11 → 200 inclusi chunk _next, font woff2, manifest, icone); nessuna immagine mancante.
- Security headers live: CSP (frame-src Streamlit), HSTS 63072000, nosniff, X-Frame-Options DENY, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy, no X-Powered-By.
- A11y gia' coperti: skip link, aria-label sui social del footer, aria-current="page" in nav, reduced-motion in globals.css + scroll-to-top, focus trap/sheet menu mobile.
- Nessun bug trovato. Miglioria: nessuna forzata — sweep completo, tutto verde (come cicli 00:40/01:40; le migliorie reali honeypot/aria-current/secure_url/CV-label sono in coda push).
- Push: NESSUNO per sospensione; in coda dopo il 04/10 10:00 CEST: 17 commit (0a1d410, c889eae, 3a16fb0, a0c30c1, af6aaea, c7e855c, 759cfc9 + migliorie) + entry STATUS.md accumulate.
- Aperti (azioni di Emanuele): www.emanuelezanardo.info HTTPS (IONOS/Vercel), date Horien sito vs CV, GMAIL_APP_PASSWORD su Vercel (form contatti).

## 04/10/2026 ~00:40 CEST — ciclo QA orario (senza push: sospensione rate limit Vercel fino al 04/10 10:00 CEST)
- Pull: nessun nuovo commit remoto (origin/main f445252); clone locale ahead 15, tutti non pushati per sospensione (push in blocco al 04/10 dopo le 10:00).
- Build: OK (exit 0, Next.js 15.3.8, 8/8 pagine statiche, lint+typecheck pass, 0 errori — log in goal hidden_files/sito-build-0039.log); /tmp al 1%.
- Live 200: /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, apple-touch-icon.png, og-image.png, .well-known/security.txt; 404 corretta su URL inesistente (title 'Page Not Found').
- Meta: lang en, title singolo, description, canonical, OG (+site_name/+locale/+type/+alt/+dimensioni), Twitter card, theme-color OK su / e /singularity; JSON-LD Person/ProfessionalService/SoftwareApplication OK; 1 h1/pagina; 2/2 img di home con alt (hero decorativa alt=""); rel=noopener (+me) su tutti i target=_blank; nessun placeholder di contenuto; nessun link interno rotto; nessuna immagine mancante.
- Security headers live: CSP (frame-src Streamlit), HSTS 63072000, nosniff, X-Frame-Options DENY, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy, no X-Powered-By.
- NOTA sitemap: la sitemap live ha 2 URL (non 3) perché il deploy live è 453b3bd (ore 08:45 03/10) — il commit f445252 (voce CV PDF in sitemap) è stato pushato alle 09:50 ma la build Vercel è stata bloccata dal rate limit. NON è un bug: la voce CV andrà live con il push post-sospensione.
- Housekeeping: il clone in goal hidden_files/portfolio/ aveva 3 commit locali duplicati (09bd7d5/b76e158/9adf646 — reimplementazioni parallele di aria-current/secure_url/moveFocus già presenti qui come af6aaea/c7e855c/c889eae+0a1d410, più completi) — resettato a origin/main per evitare confusione nei cicli futuri. Clone attivo resta ~/workspace/portfolio.
- Nessun bug trovato. Miglioria: nessuna forzata — sweep completo, tutto verde (come cicli 14:39–23:40 del 03/10; forzare un diff finto sprecherebbe un deploy Vercel).
- Push: NESSUNO per sospensione; in coda dopo il 04/10 10:00 CEST: 15 commit (0a1d410, c889eae, 3a16fb0, a0c30c1, af6aaea, c7e855c, 759cfc9 + migliorie) + entry STATUS.md accumulate.
- Aperti (azioni di Emanuele): www.emanuelezanardo.info HTTPS (IONOS/Vercel), date Horien sito vs CV, GMAIL_APP_PASSWORD su Vercel (form contatti).

## 03/10/2026 ~23:40 CEST — ciclo QA orario (senza push: sospensione rate limit Vercel fino al 04/10 10:00 CEST)
- Pull: nessun nuovo commit remoto (origin/main f445252); clone locale ahead 14, tutti non pushati per sospensione (saranno pushati in blocco al 04/10 dopo le 10:00).
- Build: OK (exit 0, Next.js 15.3.8, 8/8 pagine statiche, 0 warning — log in goal hidden_files/sito-build-2339.log); /tmp al 2%.
- Live 200: /, /singularity, robots.txt, sitemap.xml, /.well-known/security.txt, cv-emanuele-zanardo.pdf (312 KB), og-image.png (33 KB), favicon.ico; 404 corretta su URL inesistente; security headers OK (HSTS 63072000, nosniff, X-Frame-Options DENY, Referrer-Policy strict-origin-when-cross-origin, no X-Powered-By).
- Meta: lang en, title singolo, description, canonical, OG (+type/+alt/+dimensioni), Twitter card, theme-color OK; 1 h1/pagina; 2/2 img di home con alt (hero decorativa alt=""); rel=noopener (+me) su tutti i target=_blank; nessun placeholder di contenuto; nessun link interno rotto; nessuna immagine mancante.
- Nessun bug trovato. Miglioria: nessuna forzata — sweep completo, tutto verde (come cicli 14:39/15:39/16:39/17:39; le migliorie reali dei cicli 21:40/22:40 sono già in coda push).
- Aperti (azioni di Emanuele): www.emanuelezanardo.info HTTPS (IONOS/Vercel), date Horien sito vs CV, GMAIL_APP_PASSWORD su Vercel (form contatti).

## 03/10/2026 ~22:40 CEST — ciclo QA orario
- Miglioria a11y/micro-UX (commit 759cfc9, solo locale — push sospeso fino al 04/10 10:00): il bottone Download CV ora annuncia tipo+dimensione reale del PDF — `aria-label="Download my CV (PDF, 312 KB)"` e span sr-only aggiornato (about.tsx). Dimensione calcolata a build time via fs.statSync (pagina statica: si aggiorna da sola quando il CV cambia; fallback a "(PDF)" in caso di errore). Verificato nell'HTML del build locale. Build verde 8/8 exit 0 pre+post, tsc pulito.
- Nessun bug trovato (live 200 su /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, apple-touch-icon.png, og-image.png, icon-192/512/512-maskable, .well-known/security.txt, hero-bg.webp + portrait.webp via _next/image con params; 404 corretta su URL inesistente; /singularity/ → 308; meta/OG/Twitter/canonical/lang/theme-color presenti; security headers live: CSP, COOP, CORP, Permissions-Policy, Referrer-Policy, HSTS 63072000, nosniff, X-Frame-Options DENY, no X-Powered-By; 1 h1; ancore con id; rel=noopener (+me) sui target=_blank; "placeholder" solo attributi legittimi del form; nessun link interno rotto; nessuna immagine mancante).
- Blocchi aperti (azioni di Emanuele): `www.emanuelezanardo.info` HTTPS ancora irraggiungibile — fix IONOS/Vercel; discrepanza date Horien sito vs CV; GMAIL_APP_PASSWORD da impostare su Vercel (form contatti).

## 03/10/2026 ~21:40 CEST — ciclo QA orario
- Miglioria SEO (commit c7e855c, solo locale — push sospeso fino al 04/10 10:00): `og:image:secure_url` aggiunto alle immagini OpenGraph di `/` e `/singularity` (layout.tsx, singularity/page.tsx). Alcuni scraper/validator lo richiedono esplicitamente; l'URL è https, quindi coincide con l'URL sicuro. Verificato emesso nell'HTML del build locale su entrambe le pagine. Build verde 8/8 exit 0 pre+post.
- Nessun bug trovato (live 200 su /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, apple-touch-icon.png, og-image.png, icon-192/512/512-maskable, .well-known/security.txt, hero-bg.webp + portrait.webp via _next/image con params; 404 corretta su URL inesistente; /singularity/ → 308; meta/OG/Twitter/canonical/lang/theme-color presenti su entrambe le pagine; security headers live: CSP, COOP, CORP, Permissions-Policy, Referrer-Policy, HSTS 63072000, nosniff, X-Frame-Options DENY, no X-Powered-By; 1 h1/pagina; ancore #about #contact #projects #main-content con id corrispondenti; rel=noopener (+me) su tutti i target=_blank; 2/2 img di home con alt; nessun placeholder di contenuto; nessun link interno rotto; nessuna immagine mancante).
- Blocchi aperti (azioni di Emanuele): `www.emanuelezanardo.info` HTTPS ancora irraggiungibile — fix IONOS/Vercel; discrepanza date Horien sito vs CV; GMAIL_APP_PASSWORD da impostare su Vercel (form contatti).

## 03/10/2026 ~18:40 CEST — ciclo QA orario
- Miglioria anti-spam (commit a0c30c1, solo locale — push sospeso fino al 04/10 10:00): campo honeypot rinominato `company` → `extra_info` (contact-schema.ts, contact.tsx, actions.ts). `company` è un token standard del vocabolario autofill dei browser: un autofill legittimo poteva compilarlo per un utente reale e il messaggio veniva scartato in silenzio (successo finto). Build verde 8/8 post-modifica.
- Nessun bug trovato (build verde 8/8 exit 0 pre+post; live 200 su /, /singularity, sitemap.xml, robots.txt, cv-emanuele-zanardo.pdf, favicon.ico, apple-touch-icon.png, manifest.webmanifest, hero-bg.webp, portrait.webp; 404 corretta con robots noindex; title/description/OG/canonical presenti su / e /singularity; entrambi gli img di home con alt; "placeholder" solo attributi blur-up legittimi; nessun link interno rotto; nessuna immagine mancante).
- Blocchi aperti (azioni di Emanuele): `www.emanuelezanardo.info` ancora da sistemare su IONOS/Vercel; discrepanza date Horien sito vs CV; GMAIL_APP_PASSWORD da impostare su Vercel (form contatti).

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

## 03/10/2026 ~11:39 CEST — ciclo QA orario (senza push: sospensione rate limit Vercel fino al 04/10 10:00 CEST)
- Pull: +2 commit suoi (f445252 sitemap con CV PDF + per-file lastmod; 0a1d410 fix scroll menu mobile). Build verde pre+post (8/8 statiche, exit 0, tsc pulito). Live 200 su 10 URL + 404 corretta; meta/OG/twitter/canonical/lang/theme-color/googlebot OK; 2/2 img con alt; nessun placeholder; nessun link rotto.
- Bug reale trovato e fixato in locale (commit c889eae, DA PUSHAARE dopo il 04/10 10:00): nel fix 0a1d410 moveFocusToSection scattava a 60ms con lo Sheet ancora aperto — il focus trap di Radix annullava lo spostamento e alla chiusura il focus tornava al bottone menu (WCAG 2.4.3). Ora focus+scroll entrambi nel timeout a 350ms post-chiusura — src/components/layout/header.tsx.
- Vercel: commit 0a1d410 ancora 'pending' (rate limit da ~09:50 attivo), niente da forzare. Blocchi aperti: www NXDOMAIN, date Horien sito vs CV, GMAIL_APP_PASSWORD.

## 03/10/2026 ~15:39 CEST — ciclo QA orario (senza push: sospensione rate limit Vercel fino al 04/10 10:00 CEST)
- Pull: nessun nuovo commit remoto (origin/main f445252); clone locale ahead 3 (0a1d410, c889eae, 3a16fb0), tutti non pushati per sospensione.
- Build: OK pre (exit 0, Next.js 15.3.8, 8/8 pagine statiche, zero errori — log in goal hidden_files/sito-build-1539.log).
- Live 200: /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, apple-touch-icon.png, og-image.png, hero-bg/portrait via _next/image, streamlit embed, /.well-known/security.txt. 404 corrette: URL inesistente, /.git/HEAD, /.env, /server.js (nessun leak).
- Meta: description/keywords/author/canonical/OG/twitter/lang/theme-color/googlebot OK; og:image:type presente su / e /singularity; security headers OK (CSP, DENY, nosniff, Referrer-Policy, Permissions-Policy, HSTS; no X-Powered-By).
- A11y: 1 h1 per pagina (verificato live anche sulla 404), skip link presente, alt immagini OK, hero-bg priority/LCP OK.
- Nessun bug trovato; nessun link interno rotto; nessuna immagine mancante; nessun placeholder di contenuto.
- Miglioria: nessuna forzata — sweep completo, tutto verde (come ciclo 14:39).
- Push: NESSUNO per sospensione; in coda dopo il 04/10 10:00 CEST: f445252 (sitemap CV), 0a1d410 + c889eae (fix menu mobile a11y), 3a16fb0 (HSTS + no X-Powered-By + fix contenuti), più entry STATUS.md accumulate.
- Aperti: www.emanuelezanardo.info HTTPS (azione Emanuele), date Horien sito vs CV, GMAIL_APP_PASSWORD su Vercel.

## 03/10/2026 ~16:39 CEST — ciclo QA orario (senza push: sospensione rate limit Vercel fino al 04/10 10:00 CEST)
- Pull: nessun nuovo commit remoto (origin/main f445252); clone locale ahead 4 (0a1d410, c889eae, 3a16fb0, 9c1f276 STATUS.md), tutti non pushati per sospensione.
- Build: OK (exit 0, Next.js 15.3.8, 8/8 pagine statiche, zero errori — log in goal hidden_files/sito-build-1639.log).
- Live 200: /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, apple-touch-icon.png, og-image.png, /.well-known/security.txt, hero-bg/portrait via _next/image. 404 corretta su URL inesistente (title 'Page Not Found | Emanuele Zanardo').
- Meta: lang en, title, description, canonical, OG (+type=image/png), Twitter card, theme-color OK su /; 1 h1 per pagina (verificato live su / e /singularity); security headers OK (CSP con frame-src Streamlit, X-Frame-Options DENY, HSTS max-age=63072000, nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy, no X-Powered-By).
- A11y/contenuti: nessun placeholder; nessun link interno rotto; nessuna immagine mancante; iframe Streamlit con title + referrerPolicy + preconnect; security.txt RFC 9116 con Expires dinamico (oggi + 180 gg); asset ottimizzati (og-image 34KB, hero-bg 56KB webp, portrait 35KB webp).
- Nessun bug trovato. Miglioria: nessuna forzata — sweep completo, tutto verde (come cicli 14:39/15:39).
- Push: NESSUNO per sospensione; in coda dopo il 04/10 10:00 CEST: 0a1d410 + c889eae (fix menu mobile a11y), 3a16fb0 (HSTS + no X-Powered-By + fix contenuti), entry STATUS.md accumulate (incl. questa).
- Aperti: www.emanuelezanardo.info HTTPS (azione Emanuele), date Horien sito vs CV, GMAIL_APP_PASSWORD su Vercel.

## 03/10/2026 ~17:39 CEST — ciclo QA orario (senza push: sospensione rate limit Vercel fino al 04/10 10:00 CEST)
- Pull: nessun nuovo commit remoto (origin/main f445252); clone locale ahead 5 (0a1d410, c889eae, 3a16fb0, 9c1f276, 3c4d2a8), tutti non pushati per sospensione.
- Build: OK (exit 0, Next.js 15.3.8, 8/8 pagine statiche, zero errori — log in goal hidden_files/sito-build-1739.log; /tmp al 1%).
- Live 200: /, /singularity, robots.txt, sitemap.xml, /.well-known/security.txt, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, apple-touch-icon.png, og-image.png. 404 corretta su URL inesistente.
- Meta: lang en, title, description, canonical, OG (+type/+alt/+dimensioni), Twitter card, theme-color OK; 1 h1 per pagina (verificato live su / e /singularity); JSON-LD presenti su entrambe; security headers OK (CSP, X-Frame-Options DENY, HSTS 63072000, nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy, COOP/CORP same-origin; no X-Powered-By).
- A11y/contenuti: skip link presente; 1 h1/pagina; tutte le img con alt (decorativa alt=""); rel="noopener noreferrer" su tutti i target=_blank (+rel=me sui social); ancore interne tutte risolte; placeholder example.com solo attributo legittimo dell'input email; nessun link interno rotto; nessuna immagine mancante.
- Nessun bug trovato. Miglioria: nessuna forzata — sweep completo, tutto verde (come cicli 14:39/15:39/16:39); src ispezionato (contact form, manifest, robots, sitemap, iframe singularity, hero/about image attrs) senza gap reali.
- Push: NESSUNO per sospensione; in coda dopo il 04/10 10:00 CEST: 0a1d410 + c889eae (fix menu mobile a11y), 3a16fb0 (HSTS + no X-Powered-By + fix contenuti), entry STATUS.md accumulate (incl. questa).
- Aperti: www.emanuelezanardo.info HTTPS (azione Emanuele), date Horien sito vs CV, GMAIL_APP_PASSWORD su Vercel.

## 03/10/2026 ~20:39 CEST — ciclo QA orario (senza push: sospensione rate limit Vercel fino al 04/10 10:00 CEST)
- Pull: nessun nuovo commit remoto (origin/main f445252); clone locale ahead 9 (0a1d410, c889eae, 3a16fb0, 9c1f276, 3c4d2a8, e5e2261, a0c30c1 fix honeypot, c5b88ba STATUS.md, af6aaea), tutti non pushati per sospensione.
- Build: OK pre+post miglioria (exit 0, Next.js 15.3.8, 8/8 pagine statiche, zero errori — log sito-build-2039*.log in goal hidden_files).
- Live 200: /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, apple-touch-icon.png, og-image.png, /.well-known/security.txt; 404 corretta su URL inesistente; /singularity/ -> 308 a canonical.
- Meta: lang en, title, description, canonical, OG (+type), Twitter card, theme-color, keywords OK su / e /singularity; 1 h1 per pagina; JSON-LD Person/ProfessionalService/Offer OK; security headers OK (CSP, X-Frame-Options DENY, HSTS 63072000, nosniff, Referrer-Policy, Permissions-Policy, no X-Powered-By).
- Contenuti: nessun placeholder (example.com solo attributo placeholder legittimo dell'input email); nessun link interno rotto; nessuna immagine mancante; rel=noopener su target=_blank OK; 404 con noindex + title singolo OK.
- Nessun bug trovato.
- Miglioria (commit LOCALE af6aaea, non pushato): aria-current="true" -> "page" nelle nav desktop+mobile (header.tsx) — token WAI-ARIA raccomandato, screen reader annunciano "current page". NOTA: il run log delle 19:40 citava commit 9adf646/b76e158/09bd7d5 come migliorie fatte — tali SHA NON esistono nel repo (verificato con git cat-file): migliorie mai applicate; questa entry corregge il record, af6aaea applica davvero aria-current="page". Resta da fare og:image:secure_url (anch'esso citato ma mai applicato).
- Push: NESSUNO per sospensione; in coda dopo il 04/10 10:00 CEST: 0a1d410 + c889eae (fix menu mobile a11y), 3a16fb0 (HSTS + no X-Powered-By + fix contenuti), a0c30c1 (honeypot extra_info), af6aaea (aria-current page), f445252 (sitemap CV), entry STATUS.md accumulate (incl. questa).
- Aperti: www.emanuelezanardo.info HTTPS (azione Emanuele), date Horien sito vs CV, GMAIL_APP_PASSWORD su Vercel.

## QA 2026-10-04 ~01:40 CEST (senza push — sospensione rate limit Vercel fino al 04/10 10:00 CEST)
- Build: OK (exit 0, Next.js 15.3.8, 8/8 pagine statiche, zero errori — log sito-build-0139.log in goal hidden_files).
- Live 200: /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, apple-touch-icon.png, og-image.png, /.well-known/security.txt; 404 corretta su URL inesistente.
- Meta: description, canonical, OG (+type/+site_name/+locale), twitter card, theme-color, format-detection, manifest, lang OK su / e /singularity; 1 h1 per pagina; JSON-LD Person valido (address Ticino/CH, worksFor CENTIEL); 2/2 img home con alt; nessun placeholder; nessun link interno rotto; esterni github/wa.me 200, linkedin 999 (anti-bot, atteso).
- Security headers OK (CSP, HSTS 63072000, nosniff, DENY, COOP/CORP, Referrer-Policy strict-origin-when-cross-origin da next.config.ts, Permissions-Policy, no X-Powered-By); rel=noopener(+me) su target=_blank OK.
- Sitemap live: 2 URL (deploy 453b3bd del 03/10 08:45) — la voce CV PDF di f445252 (pushato alle 09:50 durante il blocco build) va live col push post-sospensione; non è un bug.
- Nessun bug trovato. Nessuna miglioria forzata: preconnect Streamlit, aria-current="page", honeypot extra_info, focus menu mobile, label CV con dimensione, og:image:secure_url già applicati nei cicli precedenti.
- Push: NESSUNO per sospensione; in coda dopo il 04/10 10:00 CEST: 16 commit (8 migliorie reali: 0a1d410, c889eae, 3a16fb0, a0c30c1, af6aaea, c7e855c, 759cfc9, f445252) + entry STATUS.md accumulate (incl. questa).
- Aperti: www.emanuelezanardo.info HTTPS (azione Emanuele), date Horien sito vs CV, GMAIL_APP_PASSWORD su Vercel.

## QA 2026-10-04 ~04:40 CEST (senza push — sospensione rate limit Vercel fino al 04/10 10:00 CEST)
- Build: OK (exit 0, Next.js 15.3.8, 8/8 pagine statiche, zero errori — log sito-build-0439.log in goal hidden_files).
- Live 200: /, /singularity, sitemap.xml (3 URL: /, /singularity, cv PDF — deploy 02:05 andato a buon fine), robots.txt, manifest.webmanifest, cv-emanuele-zanardo.pdf, og-image.png, hero-bg.webp, portrait.webp, /.well-known/security.txt; 404 corretta su URL inesistente (non bug: /about, /projects, /contact non sono rotte dell'app).
- Meta: title, description, OG (+secure_url/+alt), twitter card (+image:alt), canonical, theme-color, viewport, charset OK su / e /singularity; 1 h1 per pagina; nessun placeholder di contenuto (solo attributi placeholder= legittimi del form contatti); nessun link interno rotto; nessuna immagine mancante.
- Security headers OK (CSP, HSTS 63072000, nosniff, DENY, Referrer-Policy, Permissions-Policy, no X-Powered-By).
- Nessun bug trovato. Nessuna miglioria forzata: sweep completo del src (form a11y via shadcn aria-describedby/aria-live, skip link, reduced-motion, toast, iframe) — tutto già coperto dai cicli precedenti.
- Push: NESSUNO per sospensione; coda locale 20 commit (merge di origin b5fb48e già assorbito; 8 migliorie reali + entry STATUS.md accumulate) — push dopo il 04/10 10:00 CEST.
- Aperti: www.emanuelezanardo.info HTTPS (azione Emanuele), date Horien sito vs CV, GMAIL_APP_PASSWORD su Vercel.

## QA 2026-10-04 ~08:40 CEST (senza push — sospensione rate limit Vercel fino al 04/10 10:00 CEST)
- Pull: nessun nuovo commit remoto (origin/main b5fb48e); clone locale ahead 22 (entry QA accumulate + 8 migliorie reali in coda).
- Build: OK (exit 0, Next.js 15.3.8, 8/8 pagine statiche, zero errori — log sito-build-0839.log in goal hidden_files).
- Live 200: /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, cv-emanuele-zanardo.pdf, favicon.ico, apple-touch-icon.png, og-image.png, /.well-known/security.txt, hero-bg.webp + portrait.webp via _next/image; 404 corretta con noindex su URL inesistente.
- Meta: title, description, keywords, OG (+type, +alt, +dimensioni — secure_url in coda post-push), twitter card (+image:alt), canonical, theme-color, viewport, charset, metadataBase OK su / e /singularity; 1 h1 per pagina; JSON-LD validi (Person, ProfessionalService, SoftwareApplication — parse JSON OK).
- Security headers OK (CSP, HSTS 63072000, nosniff, DENY, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy, no X-Powered-By); rel=noopener(+me) su target=_blank.
- Esterni: github 200, wa.me 200, linkedin 999 (anti-bot, atteso); iframe Streamlit embed 200; nessun link interno rotto; nessuna immagine mancante; nessun placeholder di contenuto.
- Nessun bug trovato. Nessuna miglioria forzata: sweep completo del src (nav a11y, honeypot, reduced-motion, preconnect, focus menu mobile, label CV, og tags) — tutto già coperto dai cicli precedenti; og:image:secure_url già committato in locale (1054732), va live col push post-sospensione.
- Push: NESSUNO per sospensione; coda locale 23 commit (8 migliorie reali + entry STATUS.md accumulate, incl. questa) — push dopo il 04/10 10:00 CEST.
- Aperti: www.emanuelezanardo.info HTTPS (azione Emanuele), date Horien sito vs CV, GMAIL_APP_PASSWORD su Vercel.

## QA 2026-10-04 ~09:40 CEST (senza push — sospensione rate limit Vercel fino al 04/10 10:00 CEST)
- Pull: nessun nuovo commit remoto; clone locale ahead 23 (entry QA accumulate + migliorie reali in coda).
- Build: OK (exit 0, Next.js 15.3.x, 8/8 pagine statiche, zero errori — log build_20261004_0940.log in goal hidden_files).
- Live 200: / (0,62s), /singularity, /hero-bg.webp, /portrait.webp, /cv-emanuele-zanardo.pdf, /robots.txt, /sitemap.xml. Meta completi (title, description, keywords, OG, twitter, canonical, theme-color, charset); nessun placeholder/lorem; nessun link interno rotto.
- Nessun bug trovato. Nessuna miglioria forzata: sweep a11y/SEO già coperto dai cicli precedenti; sito stabile, niente da stravolgere.
- Push: NESSUNO per sospensione; coda locale cresce di 1 (questa entry) — push dopo il 04/10 10:00 CEST.
- Aperti: www.emanuelezanardo.info HTTPS (azione Emanuele), date Horien sito vs CV, GMAIL_APP_PASSWORD su Vercel.

## QA 2026-10-04 ~13:40 CEST (senza push — anti rate-limit: solo entry STATUS.md, nessuna modifica a codice)
- Pull: nessun nuovo commit remoto (origin/main 700a332); clone locale ahead 1 (entry QA 12:40).
- Build: OK (exit 0, Next.js 15.3.8, 8/8 pagine statiche, zero errori — log sito-build-20261004-1339.log in goal hidden_files).
- Live 200: /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest (valido: name/short_name/icons maskable/shortcuts), cv-emanuele-zanardo.pdf, og-image.png, hero-bg.webp, portrait.webp, /.well-known/security.txt, favicon.ico; 404 corretta su URL inesistente; iframe Streamlit risponde 303 (redirect normale di Streamlit Cloud, il browser lo segue — non bug).
- Meta: title, description, OG (+secure_url/+alt/+dimensioni — deploy post-sospensione 04/10 confermato live), twitter card (+image:alt), canonical, theme-color #333333, viewport, charset, JSON-LD OK su / e /singularity; 1 h1 per pagina; nessun placeholder/lorem; nessun link interno rotto; nessuna immagine mancante (hero portrait.webp alt descrittiva, hero-bg decorativa alt="").
- Security headers OK (CSP con frame-src Streamlit, HSTS 63072000, nosniff, DENY, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy, no X-Powered-By); rel=noopener(+me) su tutti i target=_blank.
- a11y sweep: aria-current=page su nav scrollspy (src, client-side), autocomplete/enterKeyHint/inputMode sul form, ToastViewport aria-live="polite", icone decorative aria-hidden, honeypot, skip link, reduced-motion — tutto già coperto.
- Nessun bug trovato. Nessuna miglioria forzata.
- Push: NESSUNO (anti rate-limit: solo entry STATUS.md); clone locale ahead 2 dopo questa entry — push alla prossima modifica sostanziale.
- Aperti: www.emanuelezanardo.info HTTPS (azione Emanuele), date Horien sito vs CV, GMAIL_APP_PASSWORD su Vercel.

## QA 2026-10-04 ~14:40 CEST (senza push — anti rate-limit: solo entry STATUS.md, nessuna modifica a codice)
- Pull: nessun nuovo commit remoto (origin/main 700a332); clone locale ahead 2 (entry QA 12:40, 13:40).
- Build: OK (exit 0, Next.js 15.3.8, compilato in 5.0s, 6 route statiche + security.txt dinamica, zero errori — log sito-build-20261004-1439.log in goal hidden_files).
- Live 200: /, /singularity, robots.txt, sitemap.xml, manifest.webmanifest, cv-emanuele-zanardo.pdf, og-image.png, hero-bg.webp, portrait.webp, /.well-known/security.txt, favicon.ico, apple-touch-icon.png, _next static JS+CSS; 404 corretta su URL inesistente.
- Meta: title, description, OG (locale/type/secure_url/alt/dimensioni), twitter card (+image:alt), canonical, theme-color #333333, formatDetection telephone:false, appleWebApp, viewport, charset OK su / e /singularity; 1 h1 per pagina; JSON-LD presenti; nessun placeholder/lorem; nessun link interno rotto; nessuna immagine mancante.
- Nessun bug trovato. Nessuna miglioria forzata: sweep src (hero priority+sizes, metadata, a11y nav/form, preconnect, focus, reduced-motion, rel=noopener) — tutto già coperto dai cicli precedenti.
- Push: NESSUNO (anti rate-limit: solo entry STATUS.md); clone locale ahead 3 dopo questa entry — push alla prossima modifica sostanziale.
- Aperti: www.emanuelezanardo.info HTTPS (azione Emanuele), date Horien sito vs CV, GMAIL_APP_PASSWORD su Vercel.

## QA 2026-10-04 ~15:40 CEST (CON push — modifica sostanziale: fade back-to-top)
- Pull: nessun nuovo commit remoto (origin/main 700a332); clone locale ahead 3 (entry QA 12:40, 13:40, 14:40).
- Build: OK (exit 0, Next.js 15.3.8, zero errori).
- Live 200: /; /singularity, cv-emanuele-zanardo.pdf, apple-touch-icon.png, favicon.ico, manifest.webmanifest, robots.txt, sitemap.xml; immagini hero-bg.webp (55 KB) e portrait.webp (29 KB) OK; meta title/description/OG/twitter/viewport OK; placeholder trovati solo come attributi placeholder degli input form (legittimi).
- Bug trovati: NESSUNO.
- Miglioria del ciclo (micro-UX + a11y): pulsante "back to top" (src/components/layout/scroll-to-top.tsx) — prima appariva/spariva di colpo per mount/unmount; ora resta montato e sfuma con transizione di opacità (opacity/invisible + pointer-events-none), visibility:hidden lo esclude da tab order e albero a11y quando nascosto, motion-reduce:transition-none rispetta il reduced-motion. Logica focus WCAG 2.4.3 invariata.
- Push: SÌ (modifica sostanziale a codice + 4 entry STATUS.md accumulate).
- Aperti: www.emanuelezanardo.info HTTPS (azione Emanuele), date Horien sito vs CV, GMAIL_APP_PASSWORD su Vercel.

## QA 2026-10-05 ~02:40 CEST (NESSUN push — nessuna modifica a codice)
- Pull: origin/main fermo a 7336eea ("docs: aggiorna STATUS.md — stato 05/10/2026"); clone pulito, nessun nuovo commit.
- PIPELINE VERCEL RIPRESA: live deploy 2026-10-05T00:05:36Z (02:05 CEST) — sitemap lastmod live aggiornata; homepage live senza più "After-Sales Engineer" (content fix del deep sweep 16:46 ora online). Main e live sono di nuovo allineati.
- Build: OK (exit 0, Next.js 15.3.8, 45s compile, 8/8 pagine statiche, 0 errori/warning). Log: sito-build-20261005-0239.log
- Live 200: / /singularity /robots.txt /sitemap.xml /cv-emanuele-zanardo.pdf /og-image.png /hero-bg.webp /portrait.webp /favicon.ico /manifest.webmanifest /.well-known/security.txt; 404 corretta su URL inesistente.
- Sicurezza headers live: CSP (frame-src/connect-src solo Streamlit singularity), HSTS includeSubDomains, X-Frame-Options DENY, Permissions-Policy, Referrer-Policy, nosniff.
- Sweep src: 0 TODO; alt su tutte le img (hero-bg decorativa alt=""); autoComplete/name/email sugli input; skip-link + main-content su tutte le pagine; rel="me" sui social; security.txt route; sitemap con lastmod da git log (no churn).
- Bug trovati: NESSUNO. Miglioria: nessuna — codebase già coperta (deep sweep 04/10 16:46).
- Push: NESSUNO (anti rate-limit: nessuna modifica sostanziale a codice/test/asset); entry STATUS.md accumulata in locale.
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel.

## QA 2026-10-05 ~03:40 CEST (NESSUN push — nessuna modifica a codice)
- Pull: origin/main fermo a 7336eea ("docs: aggiorna STATUS.md — stato 05/10/2026"); nessun nuovo commit remoto.
- Build: OK (exit 0, Next.js 15.3.8, 50s compile, 8/8 pagine statiche, 0 errori/warning, First Load 135 kB invariato). Log: sito-build-20261005-0339.log
- Live 200: / /singularity /robots.txt /sitemap.xml /cv-emanuele-zanardo.pdf /og-image.png /hero-bg.webp /portrait.webp /favicon.ico /manifest.webmanifest /.well-known/security.txt /apple-touch-icon.png; 404 corretta su URL inesistente; deploy live 2026-10-05T00:05:36Z allineato con main.
- Meta/headers: title, description, OG, twitter card, canonical, lang OK; nessun placeholder; headers live intatti (CSP, HSTS, X-Frame-Options DENY, Permissions-Policy, Referrer-Policy, nosniff).
- Sweep src: 0 TODO; nessun link interno rotto; nessuna immagine mancante; nessuna immagine senza alt/width.
- Bug trovati: NESSUNO. Miglioria: nessuna — sweep completo senza gap sensato (4° ciclo consecutivo).
- Push: NESSUNO (anti rate-limit: nessuna modifica sostanziale a codice/test/asset); entry STATUS.md accumulata in locale (clone ora ahead 2).
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS (ancora irraggiungibile, ritestato); date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel.

## QA 2026-10-05 ~14:40 CEST (NESSUN push — blocco Vercel rate-limit attivo)
- Pull: origin/main = 5ee7cfa ("SEO, PWA and content improvements", pushato oggi 13:58 CEST); nessun nuovo commit remoto dopo il fetch. Clone locale ahead 8 (7 entry STATUS.md + questa, solo docs, in accumulo per anti-rate-limit).
- Build: OK (exit 0, Next.js 15.3.8, lint+typecheck puliti, 20/20 pagine statiche, First Load 136 kB invariato). Log: sito-build-20261005-1439.log
- Live 200: / /singularity /robots.txt /sitemap.xml /cv-emanuele-zanardo.pdf /og-image.png /hero-bg.webp /favicon.ico /manifest.webmanifest /.well-known/security.txt /apple-touch-icon.png; tutti i link interni/asset 200; 1 h1; 0 img senza alt; title/description/canonical/OG(12)/Twitter completi; headers live intatti (CSP, HSTS includeSubDomains, X-Frame-Options DENY, Permissions-Policy, Referrer-Policy, nosniff).
- Deploy STALE: il push 5ee7cfa (13:58 CEST, include /blog /cv /uses /case-studies) è stato rate-limitato da Vercel — GitHub Commit Status: "Vercel | failure | Deployment rate limited — retry in 24 hours". Il sito live serve ancora il deploy precedente: /blog /cv /uses /case-studies rispondono 404 (atteso fino al redeploy). NON pushare nulla fino a domani ~14:00 CEST: un push ora brucerebbe un tentativo e rischierebbe di resettare la finestra. Il primo push dopo il rientro deployerà tutto (nuove pagine incluse).
- Bug trovati: NESSUNO (i 404 sulle nuove pagine sono deploy-side, non codice). Miglioria: nessuna — sweep senza gap sensato (9° ciclo consecutivo senza modifiche a codice).
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel; NUOVO: rientro rate-limit Vercel ~06/10 dopo le 13:58 CEST → primo push utile al ciclo 14:40.

## QA 2026-10-05 ~11:40 CEST (NESSUN push — nessuna modifica a codice)
- Pull: origin/main fermo a 7336eea ("docs: aggiorna STATUS.md — stato 05/10/2026"); nessun nuovo commit remoto. Clone locale ahead 4 (solo entry STATUS.md accumulate, per anti-rate-limit).
- Build: OK (exit 0, Next.js 15.3.8, 32s compile, lint+typecheck puliti, 8/8 pagine statiche, First Load 135 kB invariato). Log: sito-build-20261005-1139.log
- Live 200: / /singularity /robots.txt /sitemap.xml /cv-emanuele-zanardo.pdf /og-image.png /hero-bg.webp /portrait.webp /favicon.ico /manifest.webmanifest /.well-known/security.txt /apple-touch-icon.png; 404 corretta su URL inesistente; deploy live 2026-10-05T00:05:36Z allineato con main (X-Vercel-Cache: HIT).
- Meta/headers: title, description, canonical, OG (+og:image:alt/type/width/height), twitter card su homepage e /singularity; headers live intatti (CSP con frame/connect-src Streamlit, HSTS includeSubDomains, X-Frame-Options DENY, Permissions-Policy, Referrer-Policy, nosniff).
- Sweep src: 0 TODO/FIXME; nessun link interno rotto; nessuna immagine mancante (hero-bg e portrait con alt/size corretti); iframe /singularity con title + referrerPolicy; form con autoComplete/aria-invalid; form azione con rate limit; 404 con focus management; reduced-motion coperto in globals.css; manifest completo (icons maskable, shortcuts, screenshots).
- Bug trovati: NESSUNO. Miglioria: nessuna — sweep completo senza gap sensato (5° ciclo consecutivo senza modifiche a codice).
- Push: NESSUNO (anti rate-limit: nessuna modifica sostanziale a codice/test/asset); entry STATUS.md accumulata in locale.
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel.

## QA 2026-10-05 ~17:40 CEST (NESSUN push — blocco Vercel rate-limit attivo)
- Pull: origin/main = 5ee7cfa; nessun nuovo commit remoto dopo il fetch. Clone locale ahead 10 (9 entry STATUS.md + questa, +1 modifica codice, in accumulo).
- Build: OK (exit 0, Next.js 15, lint+typecheck puliti, 20/20 pagine statiche, First Load 136 kB invariato). Log: sito-build-20261005-1740.log / -1740b.log
- Live 200: / /singularity /cv-emanuele-zanardo.pdf /manifest.webmanifest /sitemap.xml /robots.txt /og-image.png (1200x630 RGB); meta (title/description/canonical/OG/Twitter), 0 placeholder, headers sicurezza intatti (CSP, HSTS, X-Frame-Options DENY, Permissions-Policy, Referrer-Policy, nosniff); 0 TODO; nessun link interno rotto; nessun asset mancante (public/ completo).
- Deploy STALE (invariato): 5ee7cfa/40d7987/a4c8b18 rate-limitati ("Deployment rate limited — retry in 24 hours", primo fail 11:53 UTC); live = deploy 7336eea del 05/10 02:06 CEST. /blog /cv /uses /case-studies danno 404 live = atteso, non bug. Rientro finestra ~06/10 13:58 CEST → primo push utile al ciclo 14:40; NON pushare prima (un push ora rischierebbe di resettare le 24h).
- Bug trovati: NESSUNO. Miglioria: fallback <noscript> nella sezione contatti (contact.tsx) — il form è ssr:false, senza JS lo slot lazy restava vuoto; ora compare un messaggio server-rendered che rimanda a telefono/email/LinkedIn (verificato nel prerender HTML, <noscript> presente in .next/server/app/index.html).
- Push: NESSUNO (blocco rate-limit Vercel); modifica codice + entry accumulate in locale (clone ora ahead 11), push al primo ciclo utile dopo il rientro.
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS irraggiungibile; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel.

## QA 2026-10-05 ~18:40 CEST (NESSUN push — blocco Vercel rate-limit attivo)
- Pull: origin/main = 5ee7cfa; nessun nuovo commit remoto dopo il fetch. Clone locale ahead 11 (solo entry STATUS.md + 2 migliorie codice accumulate, nessuna modifica in questo ciclo).
- Build: OK (exit 0, Next.js 15.3.8, 61s compile, lint+typecheck puliti, 20/20 pagine statiche, 0 warning, First Load 136 kB invariato). Log: sito-build-20261005-1840.log
- Live 200: / /singularity /sitemap.xml /robots.txt /manifest.webmanifest /cv-emanuele-zanardo.pdf /og-image.png; headers sicurezza intatti (CSP, HSTS includeSubDomains, X-Frame-Options DENY, Permissions-Policy, Referrer-Policy, nosniff); 0 placeholder.
- Deploy STALE (invariato): 5ee7cfa rate-limitato ("Deployment rate limited — retry in 24 hours"); live = deploy 7336eea del 05/10 02:06 CEST. /blog /cv /uses /case-studies danno 404 live = atteso, non bug. Rientro finestra ~06/10 13:58 CEST → primo push utile al ciclo 14:40; NON pushare prima.
- Bug trovati: NESSUNO. Miglioria: nessuna — sweep differenziale senza gap (skip-link, aria-current, OG/Twitter su tutte le pagine, 0 TODO già coperti nei cicli precedenti; 12° ciclo, 3° consecutivo senza modifica codice).
- Push: NESSUNO (blocco rate-limit Vercel); entry accumulata in locale.
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS ancora irraggiungibile (curl 000, ritestato); date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel.

## QA 2026-10-05 ~19:40 CEST (NESSUN push — blocco Vercel rate-limit attivo)
- Pull: origin/main = 5ee7cfa (fetch OK, nessun nuovo commit remoto). Clone locale ahead 12 (solo entry STATUS.md + 2 migliorie codice accumulate).
- Build: OK (exit 0, Next.js, 20/20 pagine statiche, 0 warning, First Load 136 kB invariato).
- Live: / → 200, /singularity → 200; /cv /uses /blog /case-studies → 404 (deploy stale, ATTESO — non bug); /manifest.webmanifest /favicon.ico /apple-touch-icon.png /og-image.png → 200; title/description/OG/Twitter completi; 404 page con titolo corretto; 0 placeholder in homepage; security headers intatti (CSP, HSTS includeSubDomains, DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP/CORP same-origin).
- www.emanuelezanardo.info HTTPS ancora irraggiungibile (curl 000) — blocco noto, azione Emanuele.
- Bug trovati: NESSUNO. Miglioria: nessuna — nessun gap sensato, nessun diff forzato; migliorie recenti (noscript form contatti, footer /uses) verificate intatte nel tree.
- Push: NESSUNO (blocco rate-limit Vercel fino a ~06/10 13:58 CEST; anti-rate-limit comunque); entry accumulata in locale.
- Aperti (invariati, azioni Emanuele): www HTTPS; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel.

## QA 2026-10-06 ~01:40 CEST (NESSUN push — blocco Vercel rate-limit attivo)
- Pull: origin/main = 5ee7cfa (fetch OK, nessun nuovo commit remoto). Clone locale ahead 18 (migliorie codice + entry STATUS.md accumulate).
- Build: OK due volte, pre-fix e post-fix (exit 0, lint+typecheck puliti, 20/20 pagine statiche, 0 warning/errori). Log: sito-build-0139.log, sito-build-0139b.log
- Miglioria: JSON-LD ProfilePage su /cv — mainEntity/about puntano al #person canonico di layout (nessuna duplicazione), arricchimento CV-only: alumniOf SUPSI Lugano, hasOccupation (After-Sales Engineer CENTIEL dal 2026-01; Test & Certification Engineer HORIEN Salt Battery Solution 2021-10→2026-01), knowsAbout = 10 skill on-page. 5/5 blocchi ld+json validi nel prerender HTML.
- Bug trovati: NESSUNO.
- Live: / → 200, /singularity → 200, /uses → 404 (deploy stale, atteso); /cv-emanuele-zanardo.pdf /manifest.webmanifest /apple-touch-icon.png /favicon.ico /robots.txt /sitemap.xml → 200; meta description/OG/Twitter completi; 0 placeholder; 0 img senza alt; security headers intatti (CSP, HSTS includeSubDomains, DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP/CORP same-origin).
- Push: NESSUNO (blocco rate-limit Vercel fino a ~06/10 13:58 CEST); primo push utile al ciclo ~14:40.
- Aperti (invariati, azioni Emanuele): www HTTPS; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel.

## QA 2026-10-06 ~11:40 CEST (NESSUN push — nessun bug, nessuna miglioria sensata; entry accumulata in locale per regola anti-rate-limit)
- Pull: origin/main = e11df4a (fetch OK, nessun nuovo commit remoto). Clone locale sincronizzato, working tree pulito.
- Build: OK (exit 0, Next.js 15.3.8, 48s compile, lint+typecheck puliti, 20/20 pagine statiche, 0 warning/errori, First Load 101 kB). Log: /tmp/sito-build-20261006-1139.log
- Live 200: / /blog /case-studies /cv /uses /singularity; robots.txt / sitemap.xml / manifest.webmanifest / favicon.ico / og-image.png / apple-touch-icon.png / cv-emanuele-zanardo.pdf / feed.xml. 404 propria su URL inesistente (title "Page Not Found | Emanuele Zanardo").
- Meta: title/description/canonical/OG completo/Twitter large card/theme-color/lang="en"/skip-link #main-content su homepage; og:type article + JSON-LD Article su /case-studies; JSON-LD BlogPosting su /blog/[slug] (6 blocchi). 2/2 img con alt (hero-bg decorative alt="" corretta). 0 placeholder.
- Link interni: tutti i 17 href interni homepage → 200, nessun rotto. Immagini: nessuna mancante.
- Security headers intatti: CSP, HSTS includeSubDomains, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP/CORP same-origin.
- RSS: /feed.xml XML valido, 4 item (= 4 post blog), autodiscovery <link rel="alternate" type="application/rss+xml"> presente in homepage.
- Sitemap: 14 URL, lastmod 2026-10-06T04:52:29Z. Deploy Vercel: success su e11df4a (Commit Status API).
- Sweep differenziale: nessun gap sensato (hero con priority, BlogPosting/Article JSON-LD, 404 search+OG, RSS+autodiscovery, ProfilePage JSON-LD su /cv, Breadcrumbs+BreadcrumbList JSON-LD già coperti nei cicli precedenti).
- Bug trovati: NESSUNO. Miglioria: nessuna forzata — diff finto su sito maturo = deploy Vercel sprecato (precedente ciclo 09:39).
- Push: NESSUNO (anti-rate-limit: solo entry di routine).
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS ancora irraggiungibile (curl 000, ritestato); date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel (form contatti).

## QA 2026-10-06 ~13:40 CEST
- Pull: origin/main = 83194bb (fetch OK, nessun nuovo commit remoto). Clone locale sincronizzato, working tree pulito.
- Build: OK (exit 0, Next.js 15.3.8, lint+typecheck puliti, 20/20 pagine statiche, First Load shared 101 kB). Log: goal hidden_files/sito-build-20261006-1340.log
- Live 200: / /blog /cv /uses /case-studies /singularity /feed.xml /robots.txt /sitemap.xml /manifest.webmanifest /og-image.png. 404 propria (HTTP 404, title "Page Not Found | Emanuele Zanardo").
- Homepage: title/description/canonical/OG (type+secureUrl+width/height/alt)/Twitter large card/RSS autodiscovery presenti; 2/2 img con alt; 0 placeholder (lorem/TODO/FIXME); lang="en"; skip-link; security headers intatti.
- Feed: /feed.xml XML valido, 4/4 item con pubDate RFC-822 corrette.
- Bug trovati: NESSUNO.
- Miglioria (1, piccola, feed/SEO): elemento <image> nel canale RSS (/feed.xml) — icona brand 144x144 (nuovo asset public/rss-channel-icon.png, resize da apple-touch-icon.png, entro il limite spec RSS di 144px) con url/title/link/width/height; i feed reader mostrano ora il logo del canale.
- Push: commit singolo via Git Data API (src/app/feed.xml/route.ts + public/rss-channel-icon.png + entry STATUS.md).
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS irraggiungibile; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel (form contatti).

## QA 2026-10-06 ~15:40 CEST
- Pull: origin/main = 73e908f (fetch OK, nessun nuovo commit remoto). Clone locale sincronizzato, working tree pulito.
- Build: OK pre-miglioria (exit 0, Next.js 15.3.8, 20/20 pagine statiche, lint+typecheck puliti, First Load shared 101 kB) e OK post-miglioria (exit 0, tsc --noEmit pulito). Log: goal hidden_files/sito-build-20261006-1540.log e -1540b.log
- Live 200: / /blog /cv /uses /case-studies /singularity /feed.xml /robots.txt /sitemap.xml /manifest.webmanifest /og-image.png. 404 propria (HTTP 404, title "Page Not Found | Emanuele Zanardo").
- Homepage: title/description/canonical/OG (type+secureUrl+width/height/alt)/Twitter large card/RSS autodiscovery/theme-color presenti; 2/2 img con alt; 0 placeholder (lorem/TODO/FIXME); lang="en"; skip-link; security headers intatti (CSP, HSTS includeSubDomains, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy).
- Link interni: 22 href unici su homepage+blog/cv/uses/case-studies/singularity → tutti 200, 0 rotti.
- Feed: /feed.xml XML valido, 4/4 item con pubDate RFC-822 corrette e <image> canale OK.
- Bug trovati: NESSUNO.
- Miglioria (1, piccola, feed): full-text RSS — ogni item di /feed.xml include ora <content:encoded> (namespace xmlns:content) con l'articolo intero reso in HTML dai BlogBlock (paragrafi, h2/h3, liste, citazioni, code block con escape XML); verificato in locale con next start: XML valido, 4/4 item con contenuto completo (3,3-4,3 KB/item). I feed reader/newsletter possono mostrare gli articoli interi senza aprire il browser.
- Push: commit via Git Data API (src/app/feed.xml/route.ts + entry STATUS.md), base remota verificata invariata prima del push.
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS irraggiungibile; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel (form contatti).

## QA 2026-10-06 ~18:40 CEST
- Pull: origin/main = 06c2c20 (fetch OK, nessun nuovo commit remoto). Locale avanti di un commit non pushato del ciclo 17:40 (17:40: worker morto prima del push — il suo commit `<ttl>60`+`<docs>` sul feed esisteva solo in locale; viene consolidato in questo push).
- Build: OK post-miglioria (exit 0, Next.js 15, 22 pagine, First Load shared 101 kB).
- Live 200: / /blog /case-studies /cv /singularity /uses /feed.xml /sitemap.xml /robots.txt. 404 propria verificata in passato (title "Page Not Found").
- Homepage: title/description/canonical/OG (type+secureUrl+width/height/alt)/Twitter large card/RSS autodiscovery/theme-color presenti; 2/2 img con alt (hero decorativa, portrait descrittiva); 0 placeholder (lorem/TODO/FIXME).
- Link interni: 23 href unici su homepage+/blog+/case-studies → tutti 200, 0 rotti (incl. 4 blog post, 3 case-study, cv-emanuele-zanardo.pdf).
- Vercel: deploy del tip remoto "success — Deployment has completed" (Commit Status API) — finestra rate limit del 05/10 rientrata.
- Bug trovati: NESSUNO.
- Miglioria (1, piccola, feed): elemento <copyright> nel canale /feed.xml ("Copyright <anno build> Emanuele Zanardo", anno dinamico) — completa la serie di polish RSS (lastBuildDate/immagine canale/ttl/docs).
- Push: commit atomico via Git Data API (src/app/feed.xml/route.ts + entry STATUS.md), incluse le 2 righe non pushate del ciclo 17:40; base remota verificata invariata prima del push.
- Aperti (invariati, azioni Emanuele): www.emanuelezanardo.info HTTPS irraggiungibile; date Horien sito vs CV; GMAIL_APP_PASSWORD su Vercel (form contatti).
