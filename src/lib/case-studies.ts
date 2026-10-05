/**
 * Case-study content model.
 *
 * Every case study below describes a REAL project built by the site owner —
 * an open-source analytics workspace, a jewellery storefront rebuild, and an
 * in-progress power-electronics PCB. They are framed honestly as personal /
 * open-source work: no client names, no invented metrics, no revenue claims.
 */
export interface CaseStudyLink {
  label: string;
  href: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  /** Human-readable project window, e.g. "September 2026 – in progress". */
  timeline: string;
  role: string;
  /** Honest framing: "Open source" or "Personal project". */
  projectType: "Open source" | "Personal project";
  tech: string[];
  links: CaseStudyLink[];
  challenge: string[];
  approach: string[];
  outcome: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "energy-analytics-workspace",
    title: "Singularity Quant ETRM — Energy Analytics Workspace",
    summary:
      "An open-source Streamlit workspace for Swiss day-ahead electricity price analytics: KPI dashboards, period comparison, threshold alerts, hourly heatmaps, F1/F2/F3 time bands, CSV export and a Monte Carlo simulator.",
    timeline: "September 2026 – in progress",
    role: "Designer & sole developer",
    projectType: "Open source",
    tech: ["Streamlit", "Python", "pandas", "Plotly", "ENTSO-E Transparency Platform", "Monte Carlo simulation"],
    links: [
      {
        label: "Live terminal",
        href: "https://czpox8o8x6arnxw96txnvt.streamlit.app/",
      },
    ],
    challenge: [
      "Day-ahead electricity prices on the Swiss market (Swissix) move in hourly granularity across daily, weekly and seasonal patterns. Understanding them requires more than a price chart: spreads between periods, time-band breakdowns (F1/F2/F3 tariff slots) and volatility estimates are what actually drive decisions for anyone sizing storage or flexible loads.",
      "The challenge was to build a single interactive workspace that an engineer could open and immediately explore — KPIs at a glance, then drill-downs into hours, bands and scenarios — without writing analysis code for every question.",
    ],
    approach: [
      "I built the workspace in Streamlit and Python, with pandas for the data pipeline and Plotly for the interactive charts, pulling price data from the ENTSO-E Transparency Platform.",
      "The app is organized as an analysis workspace with 60+ tabs: an 8-KPI summary header, period-over-period comparison, configurable threshold alerts, an hourly heatmap, F1/F2/F3 band analysis, CSV export for offline work, and a Monte Carlo simulator for scenario exploration.",
      "I run a continuous QA loop over the codebase — hourly automated checks that keep every tab green — so the workspace stays reliable as new analyses are added.",
    ],
    outcome: [
      "The workspace is live and free to use, embedded as an interactive terminal on this portfolio. It remains an active open-source project: tabs are added and refined regularly, and the QA cycle keeps regressions out.",
      "It also became a reusable pattern for my other data projects: a single Streamlit app structured as a tabbed workspace, with alerts and export built in, is now the template I reach for whenever a dataset needs exploring.",
    ],
  },
  {
    slug: "jewellery-ecommerce-nextjs",
    title: "GDC Jewellery Lab — Next.js Storefront",
    summary:
      "Rebuilt the storefront of a local jewellery atelier on Next.js 14 + TypeScript + Tailwind CSS, fully decoupling it from Firebase and adding an AI-assisted custom-piece flow.",
    timeline: "September – October 2026",
    role: "Developer & maintainer",
    projectType: "Personal project",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Genkit AI flows", "Vercel"],
    links: [
      {
        label: "Live site",
        href: "https://gdc-jewellery-lab.vercel.app/",
      },
    ],
    challenge: [
      "The atelier's site originally depended on Firebase for hosting and services, which made it hard to manage and keep lean for a small business that just needs a fast, elegant storefront with a contact path to the workshop.",
      "On top of the rebuild, the owner wanted visitors to be able to start a custom jewellery piece online — describing what they imagine — without the complexity of a full configurator.",
    ],
    approach: [
      "I rebuilt the site on Next.js 14 with TypeScript and Tailwind CSS, deploying to Vercel, and removed the Firebase dependency entirely: the codebase imports no Firebase/Firestore/Auth code at all.",
      "For the custom-piece flow I added AI-assisted flows built with Genkit (@genkit-ai/google-genai), letting visitors describe a bespoke piece and get guided through the process toward the workshop.",
      "The design got a full luxury restyle — deep black with champagne gold and serif headlines — and the gallery was reworked so image previews carry no text overlays, keeping the pieces themselves the focus.",
    ],
    outcome: [
      "The new storefront is live on Vercel: faster to manage, fully decoupled from Firebase, and consistent with the atelier's luxury positioning.",
      "One known limitation remains: the contact form's mail delivery is currently offline because the Gmail app password is not yet set in the Vercel environment variables — a single config step on the owner's side that is clearly flagged rather than silently broken.",
    ],
  },
  {
    slug: "load-bank-300kw-pcb",
    title: "300 kW Modular Load Bank — 6-Layer PCB",
    summary:
      "In-progress personal project: a modular 300 kW resistive load bank for FAT/SAT/commissioning tests of UPS systems in datacenters, with a 6-layer KiCad PCB designed for 400–480 V three-phase and up to 500 A per phase.",
    timeline: "September 2026 – in progress",
    role: "Hardware designer (sole)",
    projectType: "Personal project",
    tech: ["KiCad 7", "6-layer PCB", "FreeRouting", "ESP32 firmware", "Power electronics"],
    links: [],
    challenge: [
      "Factory and site acceptance tests of datacenter UPS systems need real loads: up to 300 kW on 400–480 V three-phase, derated for 208 V and single-phase 230 V operation, with a hard physical ceiling of 500 A per phase. The board has to be modular — caster-mounted units that combine — and survive the currents involved.",
      "My first layout attempt on 4 layers hit a physical wall: there simply wasn't enough copper real estate to route power and control cleanly without carving up the ground plane. That board had to be abandoned.",
    ],
    approach: [
      "I restarted as a 6-layer KiCad design: dedicated power planes, ESP32-based control firmware, I2C and VREF critical routing first, then differential Ethernet, then power, then the rest.",
      "For autorouting I ran extensive experiments with FreeRouting 2.1.0 in batch mode on a portable Java 21 runtime. Along the way I learned that the batch loop never terminates on its own and ignores pass-count settings — the fix is passing --routerSettings.stop_pass_no via reflection, which makes runs bounded and reproducible.",
      "The workflow gates every iteration on ERC/DRC plus visual review before anything gets committed or sent anywhere near a fab.",
    ],
    outcome: [
      "The project is honestly still in progress: the best autorouting runs got down to a handful of unrouted nets, and DRC is not clean yet — the board is NOT orderable, and I won't claim otherwise.",
      "What it has already produced is a repeatable hardware workflow: bounded FreeRouting runs with deterministic exit, a disciplined layer stack-up decision, and review gates that catch regressions. When the DRC goes green, the design files will be ready for manufacturing review.",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return caseStudies.map((cs) => cs.slug);
}
