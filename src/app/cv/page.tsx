import type { Metadata } from "next";
import Link from "next/link";
import { Download, Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FocusMainOnMount } from "@/components/focus-main-on-mount";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PrintButton } from "./print-button";
import { statSync } from "node:fs";
import { join } from "node:path";

// cv: real file size in the download label, computed at build time —
// same pattern as the About section; falls back to plain "(PDF)".
function cvDownloadMeta(): string {
  try {
    const bytes = statSync(join(process.cwd(), "public", "cv-emanuele-zanardo.pdf")).size;
    const kb = Math.max(1, Math.round(bytes / 1024));
    return `(PDF, ${kb} KB)`;
  } catch {
    return "(PDF)";
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "CV",
    description:
      "Curriculum vitae of Emanuele Zanardo — Electronic Engineer: after-sales and certification experience in power electronics and energy storage, BSc from SUPSI.",
    alternates: { canonical: "/cv" },
    openGraph: {
      title: "CV | Emanuele Zanardo",
      description:
        "Curriculum vitae of Emanuele Zanardo — Electronic Engineer specializing in power electronics, firmware validation and product certification.",
      url: "/cv",
      siteName: "Emanuele Zanardo Portfolio",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "CV | Emanuele Zanardo",
      description:
        "Curriculum vitae of Emanuele Zanardo — Electronic Engineer specializing in power electronics, firmware validation and product certification.",
    },
  };
}

const SKILLS = [
  "C Programming (Embedded)",
  "STM32Cube & Keil IDE",
  "Hardware & Firmware Validation",
  "Product Device Certification",
  "Version Control (Git / SVN)",
  "Electronic Measurement Equipment",
  "AI Tools & Automation",
  "Stakeholder Communication",
  "Technical Adaptability",
  "Workflow Organization",
];

const EXPERIENCE = [
  {
    role: "After-Sales Engineer",
    company: "CENTIEL",
    location: "Cadro, Switzerland",
    period: "January 2026 – Present",
    intro:
      "Centiel is a leading Swiss manufacturer of energy-efficient UPS systems for critical infrastructure.",
    bullets: [
      "Ensure maximum reliability and availability of UPS systems for clients worldwide as part of the global technical support team.",
      "Perform remote troubleshooting, on-site maintenance, and complex field testing and commissioning in high-tech environments, including CyrusOne datacenters.",
      "Build strong customer relationships, independently manage factory witness tests, and deliver specialized technical training.",
      "Collaborate closely with R&D and engineering teams, analyzing field data and recurring issues to propose actionable product enhancements.",
    ],
  },
  {
    role: "Test & Certification Engineer",
    company: "HORIEN Salt Battery Solution (Horien group)",
    location: "Stabio, Switzerland",
    period: "October 2021 – January 2026",
    intro:
      "The Horien group is a world leader in designing and manufacturing molten salt storage systems for backup power, sustainable mobility and energy storage.",
    bullets: [
      "HW & FW test engineer for battery management systems: wrote and executed product tests, stressing the products under test.",
      "Actively engaged with designers, proposing FW (C language) and HW patches that improved the products.",
      "Project manager for certification projects covering UL 1973, UL 1741, IEC 61508 and ABS regulations.",
    ],
  },
];

export default function CvPage() {
  const cvMeta = cvDownloadMeta();
  return (
    <div className="flex flex-col min-h-screen">
      <div className="print:hidden">
        <Header />
      </div>
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-grow focus:outline-none py-16 lg:py-24"
      >
        <FocusMainOnMount />
        {/* print: A4-friendly margins; the CV sheet is a white "paper" card,
            so nothing needs color overrides when printing. */}
        <style>{`@media print {
  @page { size: A4; margin: 12mm; }
  html, body { background: #ffffff !important; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}`}</style>

        <div className="container mx-auto px-4">
          {/* Page intro — screen only */}
          <div className="print:hidden max-w-3xl">
            <h1 className="font-headline text-5xl md:text-6xl text-primary">
              Curriculum Vitae
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              The same CV, readable online and ready to print. Use the buttons
              below to download the original PDF or print this page — only the
              CV sheet itself is sent to the printer.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a
                  href="/cv-emanuele-zanardo.pdf"
                  download="cv-emanuele-zanardo.pdf"
                >
                  <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                  Download PDF{" "}
                  <span className="ml-1 text-xs opacity-80">{cvMeta}</span>
                </a>
              </Button>
              <PrintButton />
            </div>
          </div>

          {/* CV sheet — white paper look on screen, prints as-is */}
          <article
            aria-label="Curriculum vitae of Emanuele Zanardo"
            className="print:mt-0 mt-10 max-w-4xl mx-auto bg-white text-neutral-900 rounded-lg shadow-xl print:shadow-none print:rounded-none p-8 md:p-12"
          >
            <header className="text-center">
              <h2 className="font-headline text-4xl md:text-5xl tracking-wide text-neutral-900">
                Emanuele Zanardo
              </h2>
              <p className="mt-1 text-sm uppercase tracking-[0.25em] text-neutral-500">
                Electronic Engineer
              </p>
              <address className="not-italic mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-neutral-600">
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  <a href="tel:+393451114337" className="hover:underline">
                    +39 345 111 4337
                  </a>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  <a
                    href="mailto:emanuele1998zanardo@gmail.com"
                    className="hover:underline"
                  >
                    emanuele1998zanardo@gmail.com
                  </a>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                  <Link href="/" className="hover:underline">
                    emanuelezanardo.info
                  </Link>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                  <a
                    href="https://www.linkedin.com/in/emanuele-zanardo-1954aa193"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    linkedin.com/in/emanuele-zanardo-1954aa193
                  </a>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  Campione d&apos;Italia (CO), Italy
                </span>
              </address>
            </header>

            <Separator className="my-8 bg-neutral-200" />

            <section aria-labelledby="cv-profile" className="break-inside-avoid">
              <h3
                id="cv-profile"
                className="font-headline text-2xl tracking-wide text-neutral-900"
              >
                Profile
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-700">
                Electronics engineer with a Bachelor&apos;s degree from SUPSI.
                I come first of all from a technical institute that trained me
                as an electronic technician specializing in automation — then I
                took on the challenge of becoming an electronic engineer.
                Dynamic and suited to teamwork, I develop projects of all kinds,
                especially around electronic engineering, design and process
                management. Previously I worked as an electronic engineer in
                the R&amp;D team of FZsonick (Horien group) in Stabio, a
                manufacturer of molten salt batteries and ready-to-use storage
                systems. I currently work as an After-Sales Engineer at
                CENTIEL in Cadro, a company that designs and manufactures
                energy-efficient UPS systems for critical infrastructure.
              </p>
            </section>

            <Separator className="my-8 bg-neutral-200" />

            <section
              aria-labelledby="cv-experience"
              className="break-inside-avoid"
            >
              <h3
                id="cv-experience"
                className="font-headline text-2xl tracking-wide text-neutral-900"
              >
                Professional Experience
              </h3>
              <div className="mt-4 space-y-8">
                {EXPERIENCE.map((job) => (
                  <div key={job.company} className="break-inside-avoid">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="text-lg font-semibold text-neutral-900">
                        {job.role} — {job.company}
                      </h4>
                      <p className="text-sm text-neutral-500">
                        {job.period} · {job.location}
                      </p>
                    </div>
                    <p className="mt-1 text-sm italic text-neutral-600">
                      {job.intro}
                    </p>
                    <ul className="mt-2 list-disc pl-5 space-y-1.5 text-[15px] leading-relaxed text-neutral-700">
                      {job.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="my-8 bg-neutral-200" />

            <section
              aria-labelledby="cv-education"
              className="break-inside-avoid"
            >
              <h3
                id="cv-education"
                className="font-headline text-2xl tracking-wide text-neutral-900"
              >
                Education
              </h3>
              <div className="mt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="text-lg font-semibold text-neutral-900">
                    Bachelor of Science in Electronic Engineering
                  </h4>
                  <p className="text-sm text-neutral-500">
                    September 2018 – September 2021 · SUPSI, Lugano
                  </p>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">
                  Strongly practice-oriented degree course with laboratories
                  and exercise blocks for each theoretical part; semester
                  projects and the degree thesis are often proposed by partner
                  companies.
                </p>
              </div>
            </section>

            <Separator className="my-8 bg-neutral-200" />

            <section aria-labelledby="cv-skills" className="break-inside-avoid">
              <h3
                id="cv-skills"
                className="font-headline text-2xl tracking-wide text-neutral-900"
              >
                Skills
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Skills">
                {SKILLS.map((skill) => (
                  <li key={skill}>
                    <Badge
                      variant="secondary"
                      className="bg-neutral-100 text-neutral-800 hover:bg-neutral-200 border border-neutral-200"
                    >
                      {skill}
                    </Badge>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
