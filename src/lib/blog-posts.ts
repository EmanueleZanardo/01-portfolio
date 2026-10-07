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
  /**
   * ISO date, yyyy-mm-dd — set only when the article content is revised
   * AFTER publication. Feeds dateModified (BlogPosting JSON-LD) and
   * article:modified_time (OG). Omit for never-revised posts.
   */
  updated?: string;
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
  {
    slug: "linux-watchdog-patterns-supervising-processes",
    title:
      "Watchdogs That Actually Restart Things: Supervising Long-Running Processes on Linux",
    excerpt:
      "flock, pidfiles with /proc verification, and pgrep patterns that don't match your own shell — patterns that keep 24/7 data pipelines alive on a Linux VM.",
    date: "2026-10-06",
    tags: ["Linux", "Bash", "DevOps", "Reliability"],
    readingMinutes: 8,
    content: [
      {
        type: "paragraph",
        text: "A watchdog that crashes, starts duplicates, or kills the wrong process is worse than no watchdog at all. I keep a few 24/7 data pipelines running on a small Linux virtual machine — chart renderers and FFmpeg encoders feeding live streams — and the supervision around them has taught me more than the pipelines themselves. These are the patterns that survived contact with reality.",
      },
      { type: "heading", level: 2, text: "1. One instance at a time: flock" },
      {
        type: "paragraph",
        text: "A watchdog that runs every few minutes must never overlap with itself: a run that overruns its interval would otherwise start a second copy, then a third. The fix is `flock -n` on a lockfile — the second instance exits silently if the lock is held. One line, and an entire class of duplicate-start bugs disappears.",
      },
      {
        type: "code",
        language: "bash",
        code: "# one instance at a time — a late second run exits silently\nflock -n /var/lock/stream-watchdog.lock -c /opt/pipeline/watchdog.sh",
      },
      {
        type: "heading",
        level: 2,
        text: "2. Restart only what is missing — never kill first",
      },
      {
        type: "paragraph",
        text: "The watchdog's job is to check each component (tunnel, supervisors, renderers) and start the ones that are absent. It must never kill anything as part of a restart: when two streams share one tunnel process, a supervisor that kills \"its\" tunnel on restart takes down the other stream too — which then restarts, kills the first, and the two supervisors spend the night assassinating each other. Start what's missing, leave the rest alone.",
      },
      {
        type: "heading",
        level: 2,
        text: "3. Verify the PID is yours before touching it",
      },
      {
        type: "paragraph",
        text: "PID files lie: PIDs get recycled, and a stale pidfile can point at an unrelated process that happened to inherit the number. Before acting on a pidfile, read `/proc/<pid>/cmdline` and confirm it is actually your process. A recycled PID never gets hit this way — the difference between \"the renderer was restarted\" and \"I killed someone's database\".",
      },
      {
        type: "code",
        language: "bash",
        code: "pid=$(cat /run/renderer.pid)\nif tr '\\0' ' ' < \"/proc/$pid/cmdline\" | grep -q \"render_charts\"; then\n  echo \"renderer alive (pid $pid)\"\nelse\n  echo \"stale pidfile — starting a fresh renderer\"\nfi",
      },
      {
        type: "heading",
        level: 2,
        text: "4. pgrep patterns that don't match your own shell",
      },
      {
        type: "paragraph",
        text: "When a supervisor checks whether a process is running via `pgrep -f`, the pattern is matched against every command line — including the supervisor's own. Searching for `supervisor.sh` matches the `pgrep -f supervisor.sh` command itself, so the check always succeeds and the dead process is never restarted. The classic fix is the character-class trick: `pgrep -f \"supervisor[.]sh\"` matches the script but not the literal pattern string. And never run `pkill -f` with a broad pattern: I once killed my own shell with `pkill -f \"sleep 60\"` because the pattern appeared in my own command line. Monitoring reads (pgrep, /proc, log tails); killing happens only by verified PID.",
      },
      {
        type: "quote",
        text: "Monitoring may read — pgrep, /proc, log tails. It must never reach for kill on a guess.",
      },
      {
        type: "heading",
        level: 2,
        text: "5. Rotate the logs — /tmp is smaller and more shared than you think",
      },
      {
        type: "paragraph",
        text: "On many small VMs /tmp is a tmpfs: a few hundred megabytes, shared with every other process on the box. An unbounded log there eventually hits ENOSPC, and then the interesting failures start — renderers crash on write, PNG frames freeze, and your live stream shows a still image to the world. Rotate aggressively (a small `rot_log` helper beats logrotate for ad-hoc scripts) and never write large files to /tmp.",
      },
      { type: "heading", level: 2, text: "6. Know whose timezone your logs are in" },
      {
        type: "paragraph",
        text: "VM system clocks are usually UTC while you live somewhere else. A watchdog log whose last line says 17:45, read at 19:45 local time, is not stuck — 17:45 UTC is 19:45 in Zurich. I have filed a false \"watchdog is dead\" alarm on exactly this confusion. Before paging anyone, convert.",
      },
      {
        type: "paragraph",
        text: "None of this is glamorous. Together it is the difference between a pipeline that survives the night and one that pages you at 3 AM — usually because of something the watchdog itself did.",
      },
    ],
  },
  {
    slug: "diy-lifepo4-battery-bank-build",
    title:
      "Building a DIY LiFePO4 Battery Bank: What Comes After the Sizing Math",
    excerpt:
      "Cells, a BMS, busbars, fuses and torque: the practical build checklist for a 24 V LiFePO4 bank — and why the BMS is the one part you never skip.",
    date: "2026-10-07",
    tags: ["LiFePO4", "Energy Storage", "Photovoltaics", "DIY"],
    readingMinutes: 8,
    content: [
      {
        type: "paragraph",
        text: "The sizing math tells you how big the bank must be; this is the companion piece about putting it together. A DIY LiFePO4 bank is genuinely within reach of a careful hobbyist — but lithium chemistry forgives nothing, so the build order matters. What follows is the checklist I use, in the order I do things.",
      },
      { type: "heading", level: 2, text: "1. The BMS is not optional equipment" },
      {
        type: "paragraph",
        text: "The battery management system protects against overcharge, deep discharge, overcurrent and temperature extremes, and it keeps the series cells balanced. Size its continuous current rating for your peak load: `peak watts / pack voltage ≤ BMS continuous current`. A 100 Ah cell pack with a 50 A BMS is a 50 A pack, no matter what the cells could deliver — the BMS is the bottleneck, and deliberately so. A lithium bank without a BMS is a chemistry experiment, not a power system.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. Series inside the pack, parallel between packs",
      },
      {
        type: "paragraph",
        text: "A nominal 24 V LiFePO4 pack is 8 cells in series (8S) internally — the series connection lives inside each pack, supervised by its own BMS. When you need more capacity, add whole identical packs in parallel, never by building longer series strings across packs. Parallel packs scale both capacity and current; mismatched packs in parallel will fight each other through their BMSs.",
      },
      { type: "heading", level: 2, text: "3. Cells: grade and source matter" },
      {
        type: "paragraph",
        text: "Prismatic LiFePO4 cells (the EVE LF105 / LF280K class) are the standard building block. Buy grade-A cells from a reputable source and inspect on arrival: no bloating, no damaged terminals, and voltages within a few tens of millivolts of each other — they typically ship at storage charge, around 3.2–3.3 V per cell. A cell that arrives at 2.5 V while its siblings sit at 3.3 V is a return, not a project.",
      },
      {
        type: "heading",
        level: 2,
        text: "4. Top-balance before the first assembly",
      },
      {
        type: "paragraph",
        text: "Before wiring cells in series, connect them all in parallel and charge the group slowly to 3.65 V per cell, then let them rest. This top-balancing aligns every cell to the same full state of charge, so the BMS starts from a level field instead of fighting an imbalance from day one. Skip it and the weakest cell hits the top first on every charge, throttling the whole pack.",
      },
      { type: "heading", level: 2, text: "5. Busbars, torque, fuses" },
      {
        type: "list",
        items: [
          "Clean every contact surface (terminals and busbars) before assembly — a thin oxide layer becomes a hot spot at tens of amps.",
          "Torque the terminal bolts to the cell manufacturer's spec; too loose arcs, too tight strips the threads.",
          "Fuse every parallel string individually, as close to the pack as possible.",
          "Size cables for both current and voltage drop — at 24 V, a 3% drop is only 0.77 V, and long thin runs eat it fast.",
          "Keep the bank ventilated and the cells mechanically restrained; prismatic cells swell slightly with cycling.",
        ],
      },
      { type: "heading", level: 2, text: "6. Commissioning: prove the capacity" },
      {
        type: "paragraph",
        text: "Before trusting the bank, run one full cycle: charge to the BMS cutoff, then discharge through a known, measured load while logging voltage and current. Integrate to watt-hours and compare against the nameplate. If a \"2,560 Wh\" 24 V 100 Ah pack delivers far less usable energy, you want to know that on the bench — not during the first cloudy week.",
      },
      {
        type: "code",
        language: "python",
        code: "# rough capacity check: discharge through a known load,\n# logging current (A) once per minute at 25.6 V nominal\ndischarged_ah = sum(current_samples_a) / 60\ndischarged_wh = discharged_ah * 25.6\nprint(f\"Usable: {discharged_wh:.0f} Wh\")",
      },
      {
        type: "quote",
        text: "Build it like the datasheet is watching: torque specs, fuses, and one honest capacity test beat three forum threads of opinions.",
      },
      {
        type: "paragraph",
        text: "These are planning-level practices, not a substitute for the cell and BMS datasheets or local electrical regulations. Anything grid-tied — and anything above extra-low voltage in some jurisdictions — deserves a qualified electrician's sign-off. Walk in with the sizing math done and a torqued, fused, tested bank, and that conversation goes much faster.",
      },
    ],
  },
  {
    slug: "embedding-streamlit-in-nextjs",
    title: "Embedding a Streamlit App in a Next.js Site: What Actually Works",
    excerpt:
      "iframe with ?embed=true, preconnect, no lazy-load above the fold, and a fallback link — how I embedded a live Streamlit terminal in a Next.js page reliably.",
    date: "2026-10-07",
    tags: ["Streamlit", "Next.js", "Web", "Integration"],
    readingMinutes: 6,
    content: [
      {
        type: "paragraph",
        text: "My portfolio embeds a live Streamlit energy terminal as a full page (`/singularity`). The integration itself is one iframe — Streamlit is its own server with its own runtime, and trying to merge the two frameworks is a losing game. What separates a good embed from a janky one is everything around the iframe: connection setup, loading behavior, fallbacks and privacy. These are the details that worked.",
      },
      { type: "heading", level: 2, text: "1. Use Streamlit's embed mode" },
      {
        type: "paragraph",
        text: "Append `?embed=true` to the app URL. Streamlit then renders in embed mode: the hamburger menu, the \"made with Streamlit\" footer and most chrome disappear, and the app looks like a component of your page instead of a separate site squeezed into a box. It is the single biggest visual win and it costs one query parameter.",
      },
      {
        type: "code",
        language: "tsx",
        code: "<iframe\n  src=\"https://your-app.streamlit.app/?embed=true\"\n  width=\"100%\"\n  height=\"100%\"\n  style={{ border: \"none\" }}\n  title=\"Energy analytics terminal\"\n  allowFullScreen\n/>",
      },
      { type: "heading", level: 2, text: "2. Preconnect to the embed origin" },
      {
        type: "paragraph",
        text: "The iframe's content comes from a different origin, so the browser pays DNS + TCP + TLS setup before the first byte. A `<link rel=\"preconnect\">` to the Streamlit origin in the page head starts that handshake while your own page is still rendering. It is a one-line, zero-risk speedup — and `dns-prefetch` alone is redundant once you preconnect.",
      },
      {
        type: "heading",
        level: 2,
        text: "3. Don't lazy-load the thing people came for",
      },
      {
        type: "paragraph",
        text: "`loading=\"lazy\"` on an iframe waits for an IntersectionObserver round-trip before starting the load. That is correct for below-the-fold embeds and exactly wrong when the embed IS the page: the Streamlit app should start booting the moment the page loads, not after the browser finishes deciding it is visible. Reserve lazy loading for embeds the visitor has to scroll to.",
      },
      { type: "heading", level: 2, text: "4. Always ship a fallback link" },
      {
        type: "paragraph",
        text: "Iframes get blocked — corporate networks, strict content policies — and Streamlit Community Cloud puts idle apps to sleep, so the first visitor can stare at a loading screen for a minute. A plain \"Open in new tab\" link to the same `?embed=true` URL keeps the page useful in every failure mode. It is also the escape hatch for users who want the app fullscreen without your site's frame around it.",
      },
      { type: "heading", level: 2, text: "5. Lock down the referrer" },
      {
        type: "paragraph",
        text: "By default the embedded app sees your full page URL as the referrer — including any query parameters. `referrerPolicy=\"strict-origin-when-cross-origin\"` sends only the origin to the third party. Your page URL structure is none of their business.",
      },
      { type: "heading", level: 2, text: "6. Full-viewport layout and an accessible name" },
      {
        type: "paragraph",
        text: "Give the iframe a real layout to live in — a full-viewport flex column with a slim header bar for the title and the fallback link — instead of a fixed pixel height that fights every screen size. And set the `title` attribute: without it, screen readers announce the iframe as an unlabeled frame, which is a WCAG failure for the main content of the page.",
      },
      {
        type: "quote",
        text: "The iframe is the integration. Everything else is making the seam invisible.",
      },
      {
        type: "paragraph",
        text: "Two runtimes, one page, a clean boundary: Next.js owns the chrome, the metadata and the structured data; Streamlit owns the interactivity inside the frame. Respect that split and the embed stops feeling like an embed.",
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

/**
 * Modification date of a post (ISO yyyy-mm-dd) — the optional `updated`
 * field when the article was revised after publication, otherwise the
 * publication date itself. Feeds schema.org `dateModified` on the
 * BlogPosting JSON-LD and `article:modified_time` in the OG metadata.
 */
export function postModifiedDate(post: BlogPost): string {
  return post.updated ?? post.date;
}

/**
 * Total word count of a post's body (all block texts, code included) —
 * feeds schema.org `wordCount` on the BlogPosting JSON-LD.
 */
export function postWordCount(post: BlogPost): number {
  const chunks: string[] = [];
  for (const block of post.content) {
    switch (block.type) {
      case "paragraph":
      case "heading":
      case "quote":
        chunks.push(block.text);
        break;
      case "list":
        chunks.push(block.items.join(" "));
        break;
      case "code":
        chunks.push(block.code);
        break;
    }
  }
  return chunks
    .join(" ")
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}
