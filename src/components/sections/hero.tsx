"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  // a11y: la navigazione ad ancore sposta il viewport ma lascia il focus sul
  // bottone (WCAG 2.4.3). Stesso pattern dell'header nav: dopo lo scroll
  // nativo, il focus segue la posizione visiva sulla sezione target.
  // preventScroll evita un secondo salto dopo lo scroll nativo dell'anchor.
  const moveFocusToSection = (sectionId: string) => {
    window.setTimeout(() => {
      document.getElementById(sectionId)?.focus({ preventScroll: true });
    }, 60);
  };

  return (
    // a11y: aria-labelledby come nelle altre sezioni (about/contact/services),
    // per coerenza dei landmark (WCAG 4.1.2)
    // a11y: tabIndex={-1} come nelle altre sezioni — rende la hero focusabile
    // programmaticamente (stesso pattern moveFocusToSection, WCAG 2.4.3);
    // tabindex negativo non altera l'ordine di tabulazione
    <section id="hero" aria-labelledby="hero-heading" tabIndex={-1} className="relative h-screen supports-[height:100dvh]:h-[100dvh] min-h-[500px] w-full flex items-center justify-center text-center text-white">
      <Image
        src="/hero-bg.webp"
        // a11y: decorative background — alt="" alone excludes it from the
        // accessibility tree; no aria-hidden needed (it would be redundant)
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 id="hero-heading" className="font-headline text-5xl md:text-7xl lg:text-8xl tracking-wider uppercase text-primary">
          Emanuele Zanardo
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-neutral-300">
          Electronic Engineer specializing in embedded systems, firmware validation, and industrial automation.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#projects" onClick={() => moveFocusToSection("projects")}>
              Experiences
            </Link>
          </Button>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#about" onClick={() => moveFocusToSection("about")}>
              About Me
            </Link>
          </Button>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#contact" onClick={() => moveFocusToSection("contact")}>
              Contact
            </Link>
          </Button>
          
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/singularity">
              Singularity ETRM
            </Link>
          </Button>

        </div>
      </div>
    </section>
  );
}
