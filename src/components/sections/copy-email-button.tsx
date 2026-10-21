"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

// micro-UX: pulsante "copia email" accanto al link mailto — molti visitatori
// copiano l'indirizzo invece di aprire il client di posta. Feedback "Copied"
// annunciata agli screen reader via aria-live (WCAG 4.1.3); il link mailto
// resta l'azione primaria (SEO, no-JS, utenti mouse/touch già a posto).
// Progressive enhancement: senza JS il bottone non fa nulla, il mailto funziona.
const EMAIL = "emanuele1998zanardo@gmail.com";

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // fallback: contesti non sicuri / permessi negati
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email address copied" : "Copy email address"}
      title={copied ? "Copied" : "Copy email address"}
      className="rounded p-1.5 text-muted-foreground hover:text-primary hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {copied ? (
        <Check aria-hidden="true" className="h-5 w-5" />
      ) : (
        <Copy aria-hidden="true" className="h-5 w-5" />
      )}
      {/* a11y: stato "copied" annunciato senza spostare il focus */}
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}
