import Image from "next/image";
import { CheckCircle, Download, Briefcase, GraduationCap, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { statSync } from "node:fs";
import { join } from "node:path";

// micro-ux/a11y: the real size of the PDF in the download label — screen
// readers announce the type and size of the file being downloaded.
// Computed at build time (static page): updates itself when the CV is
// replaced; on error it falls back to just "(PDF)".
function cvDownloadMeta(): string {
  try {
    const bytes = statSync(join(process.cwd(), "public", "cv-emanuele-zanardo.pdf")).size;
    const kb = Math.max(1, Math.round(bytes / 1024));
    return `(PDF, ${kb} KB)`;
  } catch {
    return "(PDF)";
  }
}

// Career timeline — entries mirrored from the CV (public/cv-emanuele-zanardo.pdf).
// Only real roles and real date ranges; nothing invented.
const TIMELINE = [
  {
    icon: Briefcase,
    period: "Jan 2026 – Present",
    role: "After-Sales Engineer",
    company: "CENTIEL · Cadro, Switzerland",
    points: [
      "Remote troubleshooting and on-site maintenance of energy-efficient UPS systems for critical infrastructure",
      "Field commissioning and factory witness tests, including deployments in CyrusOne datacenters",
      "Technical training for international clients; field-data analysis with R&D to drive product improvements",
    ],
  },
  {
    icon: Briefcase,
    period: "Oct 2021 – Jan 2026",
    role: "Test & Certification Engineer",
    company: "FZsonick (Horien Group) · Stabio, Switzerland",
    points: [
      "HW & FW test engineering for battery management systems on molten-salt battery storage",
      "Stress testing with C firmware patches and hardware fixes proposed to designers",
      "Project-managed product certifications: UL 1973, UL 1741, IEC 61508, ABS",
    ],
  },
  {
    icon: GraduationCap,
    period: "Sep 2018 – Sep 2021",
    role: "BSc in Electronic Engineering",
    company: "SUPSI · Lugano, Switzerland",
    points: [
      "Practice-oriented degree with labs and semester projects, often proposed by partner companies",
      "Embedded systems, software development in several languages, solar generation plants with storage",
    ],
  },
  {
    icon: Wrench,
    period: "Foundation",
    role: "Electronics Technician (Automation)",
    company: "Technical institute",
    points: [
      "Trained as an electronics technician specializing in automation before engineering school",
    ],
  },
];

// Skills grouped by domain — every item is backed by shipped work or the CV:
// hardware & firmware (day job + certification work), web (this site and other
// live Next.js projects), data (Streamlit dashboards, Supabase-backed apps).
const SKILL_GROUPS = [
  {
    title: "Hardware & Firmware",
    skills: [
      "C Programming (Embedded)",
      "STM32Cube & Keil IDE",
      "ESP32 firmware development",
      "Hardware & Firmware Validation",
      "Product Device Certification (UL 1973, UL 1741, IEC 61508, ABS)",
      "Electronic Measurement Equipment",
      "PCB design & bring-up",
      "Version Control (Git / SVN)",
    ],
  },
  {
    title: "Web",
    skills: [
      "Next.js & React",
      "TypeScript",
      "Tailwind CSS",
      "Responsive UI",
      "Vercel deployments",
      "Contact & booking flows",
    ],
  },
  {
    title: "Data & Analytics",
    skills: [
      "Python",
      "Streamlit dashboards",
      "Supabase / PostgreSQL",
      "Data visualization & CSV export",
      "Field-data analysis",
    ],
  },
];

export function About() {
  const cvMeta = cvDownloadMeta();
  return (
    <section id="about" aria-labelledby="about-heading" tabIndex={-1} className="py-20 lg:py-32 bg-card scroll-mt-16 focus:outline-none">
      <div className="container mx-auto px-4">
        {/* Summary */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square max-w-md mx-auto">
             <Image
                src="/portrait.webp"
                alt="Portrait of Emanuele Zanardo, electronic engineer"
                width={500}
                height={500}
                sizes="(max-width: 768px) 100vw, 500px"
                loading="lazy"
                // perf: decoding async — immagine below-fold, la decodifica
                // non blocca il main thread (zero effetto visivo)
                decoding="async"
                className="object-cover"
              />
          </div>
          <div>
            <h2 id="about-heading" className="font-headline text-4xl md:text-5xl text-primary">About Me</h2>
            <div className="mt-4 space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I am Emanuele Zanardo, an electronic engineer with a Bachelor&apos;s degree in Electronic Engineering from SUPSI in Lugano. My journey began at a technical institute, where I trained as an electronics technician specializing in automation — and I later took on the challenge of becoming an engineer.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today I work as an After-Sales Engineer at CENTIEL in Cadro, helping keep energy-efficient UPS systems for critical infrastructure running at maximum reliability: field commissioning, on-site maintenance, factory witness tests, and technical training for clients worldwide. Before that, I worked as a Test &amp; Certification Engineer at FZsonick (Horien group), stress-testing battery management systems in C and project-managing UL&nbsp;1973, UL&nbsp;1741, IEC&nbsp;61508, and ABS certification projects.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At university I built embedded systems, developed software in several programming languages, and managed solar generation plants with storage — the same hands-on mindset I bring to every project. I now also build modern web applications and data dashboards, from schematic to deployed product.
              </p>
            </div>
          </div>
        </div>

        {/* Career timeline */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="font-headline text-3xl md:text-4xl text-primary text-center">Career</h3>
          <p className="mt-3 text-center text-muted-foreground">
            Roles and dates as listed on my CV — no filler.
          </p>
          <ol className="mt-10 relative border-l-2 border-primary/20 ml-3 md:ml-6 space-y-10">
            {TIMELINE.map((entry) => (
              <li key={entry.role} className="relative pl-8 md:pl-10">
                <span className="absolute -left-[17px] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <entry.icon aria-hidden="true" className="h-4 w-4" />
                </span>
                <p className="text-sm font-medium uppercase tracking-wide text-accent">{entry.period}</p>
                <h4 className="mt-1 font-headline text-2xl text-foreground">{entry.role}</h4>
                <p className="text-muted-foreground">{entry.company}</p>
                <ul className="mt-3 space-y-2">
                  {entry.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        {/* Skills matrix */}
        <div className="mt-20">
          <h3 className="font-headline text-3xl md:text-4xl text-primary text-center">Skills</h3>
          <p className="mt-3 text-center text-muted-foreground max-w-2xl mx-auto">
            Grouped by domain — each backed by real projects or professional work.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {SKILL_GROUPS.map((group) => (
              <Card key={group.title} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{group.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {group.skills.map((skill) => (
                      <li key={skill} className="flex items-start gap-2">
                        <CheckCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <span className="font-medium text-sm md:text-base">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CV download */}
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="/cv-emanuele-zanardo.pdf" download="cv-emanuele-zanardo.pdf" aria-label={`Download my CV ${cvMeta}`}>
              <Download aria-hidden="true" className="mr-2 h-5 w-5" />
              Download my CV <span className="sr-only">{cvMeta}</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
