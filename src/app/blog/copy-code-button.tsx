"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * micro-ux: copy-to-clipboard button for article code blocks. Sits in the
 * code block header next to the language label; on click it copies the
 * block's source and flips to a "Copied" confirmation for 2s. Uses the
 * Clipboard API with a textarea+execCommand fallback for non-secure
 * contexts or older browsers; a clipboard failure leaves the button in its
 * idle state instead of showing fake confirmation.
 * a11y: a real <button> (keyboard-focusable) with an aria-label that
 * updates on copy, plus an aria-live="polite" sr-only status so screen
 * readers announce the result.
 */
export function CopyCodeButton({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const ta = document.createElement("textarea");
        ta.value = code;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard denied or unavailable: stay idle, no fake feedback.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={
        copied
          ? "Code copied to clipboard"
          : `Copy ${language} code to clipboard`
      }
      title={copied ? "Copied" : "Copy code"}
      className={cn(
        // the figcaption is uppercase/tracking-wider: reset both here so the
        // button reads as a normal UI label, not a second language tag.
        "inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 font-code text-xs normal-case tracking-normal",
        "text-muted-foreground transition-colors duration-150 hover:bg-primary/10 hover:text-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
        "motion-reduce:transition-none"
      )}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      <span aria-hidden="true">{copied ? "Copied" : "Copy"}</span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Code copied to clipboard" : ""}
      </span>
    </button>
  );
}
