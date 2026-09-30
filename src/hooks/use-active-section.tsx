"use client";

import { useEffect, useState } from "react";

// micro-ux: track which page section is currently in view so the header nav
// can highlight the active link (and announce it to screen readers via
// aria-current). Observes a thin band in the middle of the viewport so at
// most one section is "active" at a time — no flicker between sections.
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    const observed: Element[] = [];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observed.push(el);
      }
    }

    return () => {
      for (const el of observed) observer.unobserve(el);
      observer.disconnect();
    };
  }, [sectionIds]);

  return active;
}
