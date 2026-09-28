import Image from "next/image";
import { CheckCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 lg:py-32 bg-card scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square max-w-md mx-auto">
             <Image
                src="/portrait.png"
                alt="Emanuele Zanardo"
                width={500}
                height={500}
                sizes="(max-width: 768px) 100vw, 500px"
                loading="lazy"
                data-ai-hint="portrait man"
                className="object-cover"
              />
          </div>
          <div>
            <h2 id="about-heading" className="font-headline text-4xl md:text-5xl text-primary">About Me</h2>
            <div className="mt-4 space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I am Emanuele Zanardo, an electronic engineer who graduated from SUPSI. My journey began at a technical institute that trained me as an electronics technician specializing in automation. Later, I decided to embrace the challenge of becoming an electronic engineer, developing a strong interest in engineering in general.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I am a dynamic person and a team player. I enjoy developing projects of all kinds, especially those related to my studies, but also anything concerning project design and process management. Thanks to university, I have been able to carry out interesting projects such as embedded systems and software development in various languages.
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
                <a href="/cv-emanuele-zanardo.pdf" download="cv-emanuele-zanardo.pdf" target="_blank" rel="noopener noreferrer">
                    <Download aria-hidden="true" className="mr-2 h-5 w-5" />
                    Download my CV
                </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
