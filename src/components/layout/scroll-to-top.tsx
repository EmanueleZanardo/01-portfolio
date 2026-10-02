"use client";

import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const shouldShow = window.scrollY > 400;
      // a11y (WCAG 2.4.3): il bottone smonta quando lo scroll torna sopra i
      // 400px. Se in quel momento ha il focus — es. utente da tastiera che
      // scorre con PageUp/Home mentre e' posizionato sul bottone — l'unmount
      // lo perderebbe su <body>: spostarlo prima su #main-content (stesso
      // pattern di scrollToTop qui sotto). Nel click path non interferisce:
      // il focus e' gia' su #main-content entro 60ms dal click, prima che lo
      // smooth scroll attraversi la soglia dei 400px.
      if (!shouldShow && document.activeElement === buttonRef.current) {
        document.getElementById('main-content')?.focus({ preventScroll: true });
      }
      setVisible(shouldShow);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Respect the user's reduced-motion preference: CSS disables smooth
  // scrolling, but this JS-driven scroll would otherwise ignore it.
  // a11y: dopo il click il bottone smontera' (scroll < 400px, WCAG 2.4.3) —
  // spostare il focus su #main-content prima, altrimenti la tastiera lo
  // perderebbe su <body>. Stesso pattern di moveFocusToSection in hero.tsx:
  // preventScroll evita un secondo salto mentre l'animazione smooth e' in
  // corso. (Il caso "focus sul bottone mentre smonta per scroll manuale"
  // e' gestito nell'handler onScroll qui sopra.)
  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    window.setTimeout(() => {
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }, 60);
  };

  if (!visible) return null;

  // max() with env(safe-area-inset-*) keeps the button clear of the
  // iPhone home indicator / side notch on edge-to-edge displays.
  return (
    <Button
      ref={buttonRef}
      variant="secondary"
      size="icon"
      aria-label="Back to top"
      className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-50 rounded-full shadow-lg"
      onClick={scrollToTop}
    >
      <ArrowUp aria-hidden="true" className="h-5 w-5" />
    </Button>
  );
}
