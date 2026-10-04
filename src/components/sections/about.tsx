import Image from "next/image";
import { CheckCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { statSync } from "node:fs";
import { join } from "node:path";

// micro-ux/a11y: la dimensione reale del PDF nel label del download —
// gli screen reader annunciano tipo+dimensione del file che si scarica.
// Calcolata a build time (pagina statica): si aggiorna da sola quando il CV
// viene sostituito; in caso di errore torna il solo "(PDF)".
function cvDownloadMeta(): string {
  try {
    const bytes = statSync(join(process.cwd(), "public", "cv-emanuele-zanardo.pdf")).size;
    const kb = Math.max(1, Math.round(bytes / 1024));
    return `(PDF, ${kb} KB)`;
  } catch {
    return "(PDF)";
  }
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

export function About() {
  const cvMeta = cvDownloadMeta();
  return (
    <section id="about" aria-labelledby="about-heading" tabIndex={-1} className="py-20 lg:py-32 bg-card scroll-mt-16 focus:outline-none">
      <div className="container mx-auto px-4">
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
                Today I work as an After-Sales Technician at CENTIEL in Cadro, helping keep energy-efficient UPS systems for critical infrastructure running at maximum reliability: field commissioning, on-site maintenance, factory witness tests, and technical training for clients worldwide. Before that, I worked as a Test &amp; Certification Engineer at FZsonick (HORIEN group), stress-testing battery management systems in C and project-managing UL&nbsp;1973, UL&nbsp;1741, IEC&nbsp;61508, and ABS certification projects.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At university I built embedded systems, developed software in several programming languages, and managed solar generation plants with storage — the same hands-on mindset I bring to every project.
              </p>
            </div>
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILLS.map((skill) => (
                <li key={skill} className="flex items-center gap-2">
                  <CheckCircle aria-hidden="true" className="h-5 w-5 text-accent" />
                  <span className="font-medium text-sm md:text-base">{skill}</span>
                </li>
              ))}
            </ul>
             <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="/cv-emanuele-zanardo.pdf" download="cv-emanuele-zanardo.pdf" aria-label={`Download my CV ${cvMeta}`}>
                    <Download aria-hidden="true" className="mr-2 h-5 w-5" />
                    Download my CV <span className="sr-only">{cvMeta}</span>
                </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
