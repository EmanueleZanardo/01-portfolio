"use client";

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Respect the user's reduced-motion preference: CSS disables smooth
  // scrolling, but this JS-driven scroll would otherwise ignore it.
  // a11y: il bottone smonta quando lo scroll torna < 400px (WCAG 2.4.3) —
  // senza spostare il focus, la tastiera lo perderebbe su <body>. Stesso
  // pattern di moveFocusToSection in hero.tsx: preventScroll evita un
  // secondo salto mentre l'animazione smooth e' in corso.
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
