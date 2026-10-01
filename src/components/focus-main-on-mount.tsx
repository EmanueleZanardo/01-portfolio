"use client";

import { useEffect } from "react";

/**
 * a11y (WCAG 2.4.3): on client-side navigation the router swaps the page
 * without moving focus, so keyboard and screen-reader users stay stuck on
 * the previous context. On mount, move focus to the page's <main> landmark
 * (tabIndex={-1}, outline suppressed) — same pattern already used by the
 * hero CTAs and header nav on the homepage.
 */
export function FocusMainOnMount() {
  useEffect(() => {
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, []);
  return null;
}
