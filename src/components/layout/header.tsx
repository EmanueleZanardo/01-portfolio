"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";

const NAV_LINKS = [
  { href: "#projects", label: "Experiences" },
  { href: "#about", label: "About Me" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

const NAV_SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  // micro-ux + a11y: highlight the nav link of the section in view.
  const activeSection = useActiveSection(NAV_SECTION_IDS);

  // a11y: quando l'header è nascosto (-translate-y-full in cima alla pagina)
  // i suoi link/bottoni restano nel tab order e nell'albero di accessibilità
  // pur essendo off-screen (WCAG 2.1.1/2.4.3). React 18 non supporta
  // l'attributo booleano `inert` nel JSX (inert={false} verrebbe renderizzato
  // come inert="false", che per gli attributi booleani HTML significa true),
  // quindi lo si gestisce imperativamente: toggleAttribute lo aggiunge e
  // rimuove correttamente. Il dialog del menu mobile (Sheet) è un portal su
  // document.body, fuori dal subtree dell'header — non ne risente.
  useEffect(() => {
    headerRef.current?.toggleAttribute('inert', !isVisible);
  }, [isVisible]);

  // a11y: anchor navigation jumps the viewport but leaves keyboard/screen-reader
  // focus on the nav link (WCAG 2.4.3). Move focus to the target section so the
  // reading position follows the visual one. preventScroll avoids a second
  // scroll jump after the browser's native anchor scroll.
  const moveFocusToSection = (sectionId: string) => {
    window.setTimeout(() => {
      document.getElementById(sectionId)?.focus({ preventScroll: true });
    }, 60);
  };

  // fix mobile: il tap su un link del menu laterale faceva partire il salto
  // all'ancora mentre lo Sheet si stava ancora chiudendo (body scroll-locked
  // + animazione di uscita) — il browser calcolava male la posizione e si
  // atterrava a metà sezione. Ora lo scroll parte solo a menu chiuso.
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    const headerOffset = 64; // h-14 (56px) + margine
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    // a11y: rispetta prefers-reduced-motion (stesso guard di scroll-to-top.tsx):
    // lo smooth scroll forzato ignora il CSS scroll-behavior:auto della media query
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroSectionHeight = window.innerHeight - 56; // 56 is header height (h-14)
      if (window.scrollY > heroSectionHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300",
        {
          "-translate-y-full": !isVisible,
          "translate-y-0": isVisible,
        }
      )}
    >
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="ml-4 mr-6 flex items-center space-x-2">
            <span className="font-bold font-headline text-lg text-primary">Emanuele Zanardo</span>
          </Link>
        </div>

        <nav aria-label="Primary" className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              // a11y: "page" e' il token WAI-ARIA raccomandato per la voce di
              // navigazione corrispondente alla pagina corrente (gli screen
              // reader annunciano "current page"; "true" e' generico).
              aria-current={activeSection === link.href.slice(1) ? "page" : undefined}
              onClick={() => moveFocusToSection(link.href.slice(1))}
              className={cn(
                "transition-colors hover:text-primary",
                activeSection === link.href.slice(1) && "text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              {/* a11y: Radix SheetTrigger gestisce da solo aria-expanded/aria-controls sul
                  trigger. Quelli manuali sono stati rimossi: aria-controls="mobile-nav"
                  puntava a un elemento smontato quando il menu e' chiuso (dangling id). */}
              <Button variant="ghost" size="icon">
                <Menu aria-hidden="true" className="h-6 w-6" />
                <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              {/* a11y: Radix dialog needs a programmatic title for screen readers */}
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="font-bold font-headline text-lg text-primary">Emanuele Zanardo</span>
                  </Link>
                </div>
                {/* a11y: unique landmark label — desktop nav already uses "Primary" */}
                <nav id="mobile-nav" aria-label="Mobile" className="flex flex-col gap-4 mt-8">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      // a11y: "page" = token WAI-ARIA raccomandato per la pagina
                      // corrente nella nav (vedi commento sopra, nav desktop).
                      aria-current={activeSection === link.href.slice(1) ? "page" : undefined}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        activeSection === link.href.slice(1) && "text-primary"
                      )}
                      onClick={(e) => {
                        e.preventDefault(); // niente jump nativo: scroll solo a menu chiuso (vedi scrollToSection)
                        setIsMobileMenuOpen(false);
                        // bugfix: il focus va spostato DOPO la chiusura dello Sheet.
                        // A menu ancora aperto il focus trap di Radix riporta il focus
                        // dentro il dialog e alla chiusura lo restituisce al bottone
                        // del menu — la sezione restava senza focus (WCAG 2.4.3).
                        window.setTimeout(() => {
                          scrollToSection(link.href.slice(1));
                          moveFocusToSection(link.href.slice(1));
                        }, 350);
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
