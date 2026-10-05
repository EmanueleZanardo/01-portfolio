/**
 * Blog content for /blog. All articles are written from real engineering
 * practice (energy storage, web, PCB, data tooling) — no invented clients,
 * metrics or testimonials anywhere in here.
 */

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, yyyy-mm-dd */
  date: string;
  tags: string[];
  readingMinutes: number;
  content: BlogBlock[];
}

const posts: BlogPost[] = [
  {
    slug: "residential-battery-sizing-basics",
    title: "Sizing a Residential Battery Bank: The Math That Actually Matters",
    excerpt:
      "Daily energy first, peak power second: usable capacity, depth of discharge, C-rate and inverter losses — the four numbers behind a battery bank that actually works.",
    date: "2026-09-18",
    tags: ["Energy Storage", "LiFePO4", "Photovoltaics", "Off-Grid"],
    readingMinutes: 7,
    content: [
      {
        type: "paragraph",
        text: "Sizing a battery bank is one of the few places in a residential energy project where a spreadsheet beats a gut feeling. Oversize it and you pay for capacity you never cycle; undersize it and the inverter shuts down on the first cloudy week. The method below is the one I use before touching any datasheet: four numbers, in order, no magic.",
      },
      { type: "heading", level: 2, text: "1. Start from daily energy, not peak power" },
      {
        type: "paragraph",
        text: "List every load with its power draw and daily run time, then multiply: `watts × hours = watt-hours`. A small off-grid setup might look like this: LED lighting 40 W × 5 h = 200 Wh, a 24 V water pump 60 W × 1 h = 60 Wh, phone and laptop charging ≈ 150 Wh, a ventilation fan 90 W × 4 h = 360 Wh. Total: roughly 770 Wh per day. Be honest about duty cycles — a fridge compressor does not run 24 hours, and a pump rated 60 W rarely draws that continuously.",
      },
      {
        type: "paragraph",
        text: "Peak power matters too, but it sizes the inverter, not the battery. Energy (Wh) sizes the battery; power (W) sizes the inverter. Mixing the two up is the most common beginner mistake.",
      },
      { type: "heading", level: 2, text: "2. Nominal vs. usable capacity" },
      {
        type: "paragraph",
        text: "A battery's nameplate capacity is not what you get to use. Usable energy is `nominal capacity × depth of discharge (DoD)`. LiFePO4 chemistry comfortably allows 90–95% DoD with thousands of cycles; classic lead-acid should stay around 50% unless you enjoy replacing batteries. If your loads need 770 Wh/day and you want two days of autonomy on LiFePO4 at 90% DoD, the math is `770 × 2 / 0.9 ≈ 1,711 Wh` nominal — so a 24 V 100 Ah pack (2,560 Wh nominal) covers it with headroom, while a 12 V 100 Ah pack (1,280 Wh) does not.",
      },
      {
        type: "quote",
        text: "Autonomy days are a design choice, not a law of physics. One day of autonomy with a generator backup is often cheaper than three days of batteries.",
      },
      { type: "heading", level: 2, text: "3. C-rate: can the bank deliver the watts?" },
      {
        type: "paragraph",
        text: "Capacity in Wh tells you how long the energy lasts; the C-rate tells you how fast you may take it out. A 100 Ah LiFePO4 cell rated for 1C continuous discharge can deliver 100 A — at 24 V that is 2,400 W. But the real limit is usually the BMS: many budget 100 Ah packs ship with a 50 A or 100 A BMS, capping you at 1,200–2,400 W regardless of what the cells could do. Size for your peak load: `peak watts / pack voltage ≤ BMS continuous current`. If the numbers don't fit, add packs in parallel (capacity and current both scale) rather than pushing one pack past its rating.",
      },
      { type: "heading", level: 2, text: "4. Don't forget inverter losses — or the BMS" },
      {
        type: "paragraph",
        text: "An inverter is typically 90–95% efficient, and it also draws idle power (often 10–30 W) around the clock. Add ~10% to your daily Wh for conversion losses, and count the inverter's standby draw as a 24-hour load in your audit. As for the BMS: it is not optional equipment. It protects against overcharge, deep discharge, overcurrent and temperature extremes, and it keeps series cells balanced. A lithium bank without a BMS is a chemistry experiment, not a power system.",
      },
      { type: "heading", level: 2, text: "A worked example" },
      {
        type: "list",
        items: [
          "Daily consumption (audited): 1,400 Wh",
          "Autonomy target: 2 days → 2,800 Wh usable needed",
          "LiFePO4 at 90% DoD → 2,800 / 0.9 ≈ 3,111 Wh nominal",
          "Inverter losses (+10%) → ≈ 3,420 Wh nominal minimum",
          "System voltage 24 V → 3,420 / 25.6 ≈ 134 Ah → a 24 V 150 Ah bank (or 2× 24 V 100 Ah in parallel)",
          "Peak load 800 W → 800 / 25.6 ≈ 31 A → any 100 A BMS handles it comfortably",
        ],
      },
      {
        type: "code",
        language: "python",
        code: "daily_wh = 1400      # audited loads, Wh/day\n\nautonomy_days = 2\ndod = 0.90           # LiFePO4 usable depth of discharge\ninverter_eff = 0.90\npack_voltage = 25.6  # 8S LiFePO4 nominal\n\nnominal_wh = daily_wh * autonomy_days / (dod * inverter_eff)\nrequired_ah = nominal_wh / pack_voltage\nprint(f\"Nominal: {nominal_wh:.0f} Wh  ->  {required_ah:.0f} Ah at {pack_voltage} V\")\n# Nominal: 3444 Wh  ->  135 Ah at 25.6 V",
      },
      {
        type: "paragraph",
        text: "These are rules of thumb for planning, not a substitute for product datasheets or local regulations. Anything grid-tied — and anything above extra-low voltage in some jurisdictions — deserves a qualified electrician's sign-off. But if you walk into that conversation with the four numbers above already computed, the conversation goes much faster.",
      },
    ],
  },
  {
    slug: "nextjs-15-static-rendering-lessons",
    title: "Next.js 15 Static Rendering: Four Lessons from Shipping a Real Portfolio",
    excerpt:
      "fetch() is no longer cached, params are promises, and one careless import can de-static a whole route — what changed in Next.js 15 and how to keep pages fast.",
    date: "2026-09-26",
    tags: ["Next.js", "React", "TypeScript", "Web Performance"],
    readingMinutes: 6,
    content: [
      {
        type: "paragraph",
        text: "Rebuilding this portfolio on Next.js 15 taught me more about the App Router's rendering model than any tutorial. The framework got stricter in exactly the right places — and each strictness bit me once before I understood it. Here are the four lessons, in the order I learned them.",
      },
      { type: "heading", level: 2, text: "1. fetch() is no longer cached by default" },
      {
        type: "paragraph",
        text: "In Next.js 14, `fetch` in a Server Component was cached unless you opted out with `cache: 'no-store'`. In 15 the default flipped: every `fetch` is dynamic unless you opt in. That is the safer default — no more stale data surprises — but it means a page you assumed was static may now render on every request. If the data is fine to cache, say so explicitly with `next: { revalidate }` or wrap it in `unstable_cache`:",
      },
      {
        type: "code",
        language: "ts",
        code: "// Revalidate at most once an hour — page stays static between rebuilds\nconst res = await fetch(\"https://api.example.com/stats\", {\n  next: { revalidate: 3600 },\n});",
      },
      {
        type: "paragraph",
        text: "Run `next build` and read the route table it prints: `○` means static, `ƒ` means dynamic. After the upgrade, half my routes had silently become `ƒ`. Ten minutes of explicit caching flags fixed all of them.",
      },
      { type: "heading", level: 2, text: "2. params and searchParams are now promises" },
      {
        type: "paragraph",
        text: "In 15, the `params` and `searchParams` props are asynchronous — you must `await` them, even in a fully static page. The old synchronous access still type-checks in some setups and then fails at runtime, which makes this an annoying one to catch by reading code alone. The pattern for a dynamic blog route looks like this:",
      },
      {
        type: "code",
        language: "tsx",
        code: "export default async function PostPage({\n  params,\n}: {\n  params: Promise<{ slug: string }>;\n}) {\n  const { slug } = await params;\n  const post = getPostBySlug(slug);\n  // ...\n}",
      },
      { type: "heading", level: 2, text: "3. generateStaticParams is still the way for content sites" },
      {
        type: "paragraph",
        text: "For a blog, docs, or any content-driven route, `generateStaticParams` pre-renders every slug at build time — no client-side fetching, no loading spinners, instant navigation. Pair it with `dynamicParams = false` and any unknown slug returns a real 404 instead of triggering an on-demand render:",
      },
      {
        type: "code",
        language: "ts",
        code: "export const dynamicParams = false;\n\nexport async function generateStaticParams() {\n  return getAllPosts().map((post) => ({ slug: post.slug }));\n}",
      },
      { type: "heading", level: 2, text: "4. One dynamic import can de-static a whole route" },
      {
        type: "paragraph",
        text: "Calling `headers()`, `cookies()`, or reading `searchParams` anywhere in a route's component tree opts that route into dynamic rendering — including through an innocent-looking shared component. The fix is structural, not clever: keep dynamic reads in small, isolated components (or separate route segments) so the rest of the page stays static. When in doubt, the build output's route table is the ground truth — check it after every refactor, not just at release time.",
      },
      {
        type: "paragraph",
        text: "None of this is difficult once internalized, but it is easy to get wrong by momentum from Next.js 13/14 habits. The upgrade took an afternoon; the lesson — trust the build output, not your assumptions — applies to every framework.",
      },
    ],
  },
  {
    slug: "kicad-freerouting-6-layer-power-board",
    title: "KiCad + FreeRouting on a 6-Layer Power Board: Field Notes",
    excerpt:
      "Bound the batch run or it never ends, hand-route the critical nets, and never trust the autorouter with trace width — practical notes from autorouting a dense power PCB.",
    date: "2026-10-01",
    tags: ["KiCad", "PCB Design", "Power Electronics", "FreeRouting"],
    readingMinutes: 8,
    content: [
      {
        type: "paragraph",
        text: "Autorouters have a bad reputation on power boards, and most of it is earned: they happily route 20 A through a 0.25 mm trace and call it done. But used as a finisher — after you have constrained the problem properly — FreeRouting can clear hundreds of mundane signal nets on a dense 6-layer board while you spend your time on the nets that actually matter. These are my working notes from doing exactly that.",
      },
      { type: "heading", level: 2, text: "Export a clean DSN first" },
      {
        type: "paragraph",
        text: "The handoff is the Specctra DSN format: in KiCad's PCB editor, `File → Export → Specctra DSN`, run FreeRouting against the `.dsn`, then bring the result back with `File → Import → Specctra Session (.ses)`. Before exporting, run DRC and fix everything — the autorouter will not fix your footprint errors, it will faithfully route around them and produce garbage.",
      },
      { type: "heading", level: 2, text: "Bound the batch run, or it never ends" },
      {
        type: "paragraph",
        text: "This is the lesson that cost me a night: FreeRouting's batch mode loops until it hits its maximum pass count (default 999) and writes the `.ses` file only on a clean exit. Kill the process — or lose the machine to a reboot — and the entire routing session in memory is gone, with no partial file to recover. The pass-limit flag is not documented prominently, but it exists and it is the difference between a tool and a trap:",
      },
      {
        type: "code",
        language: "bash",
        code: "java -Xmx2g -jar freerouting.jar \\\n  -de board.dsn -do board.ses \\\n  --routerSettings.stop_pass_no=35",
      },
      {
        type: "paragraph",
        text: "With the bound in place, the run does exactly 35 passes, writes a valid `.ses`, and exits. Watch the unrouted-net count across passes: if it plateaus early (say, stuck at 25 unrouted from pass 10 onward), more passes will not save you — the remaining nets need manual help or better constraints, not more compute.",
      },
      { type: "heading", level: 2, text: "Route the critical nets yourself" },
      {
        type: "paragraph",
        text: "On a power board, a short list of nets deserves hand routing before the autorouter ever runs: voltage references and current-sense traces (noise-sensitive, keep them short and away from switching nodes), gate-drive signals (inductance matters), and differential pairs like Ethernet (length matching). Lock them with `Keepout` zones or route-then-lock, and let the autorouter handle the remaining digital glue — LEDs, pull-ups, enable lines, the boring 90%.",
      },
      { type: "heading", level: 2, text: "Net classes and keepouts before you press go" },
      {
        type: "paragraph",
        text: "FreeRouting respects the net classes from your DSN, so set them deliberately in KiCad first: generous clearance for high-voltage nets, wider minimum width for power nets, tight rules for signals. Add keepout areas under mounting holes, along the board edge, and beneath anything the autorouter cannot see (a tall inductor, a heatsink). Every constraint you add up front is ten manual cleanups you skip later.",
      },
      { type: "heading", level: 2, text: "The autorouter doesn't know IPC-2221" },
      {
        type: "paragraph",
        text: "This is the non-negotiable review step. FreeRouting optimizes for completion, not current capacity: verify power-trace width against IPC-2221 current-carrying charts yourself, pour copper polygons for the heavy rails instead of relying on traces, check thermal reliefs on high-current pads, and confirm via stitching around switching loops. Then run KiCad's DRC, then do a slow visual pass at high zoom. The autorouter is an intern with infinite patience — fast, tireless, and in need of supervision.",
      },
      {
        type: "paragraph",
        text: "Used this way — constrained problem, bounded run, supervised output — autorouting a 6-layer power board stops being a gamble and becomes what it should be: the fastest way to finish the easy 90% so you can spend your judgment on the 10% that decides whether the board works.",
      },
    ],
  },
  {
    slug: "streamlit-at-scale-energy-analysts",
    title: "Streamlit for Energy Analysts: Keeping a Data-Heavy Dashboard Fast",
    excerpt:
      "Cache the data pulls, fragment the reruns, lazy-load the tabs — how to keep a Streamlit dashboard with years of hourly energy prices responsive.",
    date: "2026-10-04",
    tags: ["Streamlit", "Python", "Energy Analytics", "Data Engineering"],
    readingMinutes: 7,
    content: [
      {
        type: "paragraph",
        text: "Streamlit's execution model is beautifully simple — every interaction reruns the script top to bottom — and that simplicity becomes a liability the moment your dashboard pulls years of hourly prices, computes KPIs across time bands, and renders half a dozen charts. An energy analytics terminal I maintain hit exactly that wall. The fixes below are general; they apply to any data-heavy Streamlit app.",
      },
      { type: "heading", level: 2, text: "Cache the data, not the hope" },
      {
        type: "paragraph",
        text: "The single biggest win: never fetch twice. Wrap every expensive operation — API pulls from sources like ENTSO-E, CSV parsing, heavy aggregations — in `@st.cache_data` with a sensible TTL, and put long-lived clients (database connections, API sessions) behind `@st.cache_resource`. A TTL of a few hours is usually right for energy market data: fresh enough for analysis, stable enough to keep the app snappy.",
      },
      {
        type: "code",
        language: "python",
        code: "import streamlit as st\n\n@st.cache_data(ttl=6 * 3600, show_spinner=\"Loading price history…\")\ndef load_prices(start: str, end: str):\n    # expensive API pull + parsing happens once per (start, end)\n    return fetch_hourly_prices(start, end)\n\n@st.cache_resource\ndef get_db():\n    # connection object shared across reruns, never pickled\n    return create_connection()",
      },
      {
        type: "paragraph",
        text: "One subtlety: `cache_data` hashes arguments, so pass plain strings and numbers, not DataFrames or custom objects, as parameters — otherwise every call looks new and the cache never hits.",
      },
      { type: "heading", level: 2, text: "Fragment the reruns" },
      {
        type: "paragraph",
        text: "`@st.fragment` is the most underused tool in the Streamlit toolbox. Decorate a chart function with it and interacting with that chart's widgets reruns only the fragment, not the whole page. In practice this means: moving a date slider on the load-curve chart no longer recomputes the KPI row, the heatmap, and the export table. Structure the page as independent fragments and the app feels instant even when the total computation is heavy.",
      },
      { type: "heading", level: 2, text: "Keep filters in session state, compute once" },
      {
        type: "paragraph",
        text: "Put filter widgets (date range, price zone, time band F1/F2/F3) in the sidebar, store their values in `st.session_state`, and derive every downstream dataset from a single filtered DataFrame computed once per rerun. The anti-pattern is filtering separately inside each chart function — same predicate evaluated five times, five chances to drift out of sync.",
      },
      { type: "heading", level: 2, text: "Lazy-load with tabs" },
      {
        type: "paragraph",
        text: "Streamlit renders every tab's content on each rerun unless you guard it. Wrap each tab's body in a check of the active tab, or simply accept the cost for cheap tabs and isolate the expensive ones (Monte Carlo simulations, large heatmaps) behind explicit \"Run\" buttons. A simulation that takes 20 seconds is fine behind a button; it is infuriating when it retriggers because someone toggled an unrelated checkbox.",
      },
      { type: "heading", level: 2, text: "Keep the app warm" },
      {
        type: "paragraph",
        text: "If you host on Streamlit Community Cloud, idle apps go to sleep and the first visitor waits through a full cold start — dependency install included. A lightweight scheduled ping every few hours keeps the instance warm. It is not elegant, but for a dashboard people open during market hours, the difference between a 2-second load and a 90-second cold start is the difference between a tool and a chore.",
      },
      {
        type: "paragraph",
        text: "None of these techniques is exotic. Together they take a dashboard from \"works on my machine with a small CSV\" to \"handles years of hourly data without making the analyst wait\" — which is the actual job.",
      },
    ],
  },
];

/** All posts, newest first. */
export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

/** All tags across posts, alphabetical. */
export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const p of posts) for (const t of p.tags) set.add(t);
  return [...set].sort((a, b) => a.localeCompare(b));
}
