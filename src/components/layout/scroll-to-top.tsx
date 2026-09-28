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
  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  if (!visible) return null;

  return (
    <Button
      variant="secondary"
      size="icon"
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg"
      onClick={scrollToTop}
    >
      <ArrowUp aria-hidden="true" className="h-5 w-5" />
    </Button>
  );
}
