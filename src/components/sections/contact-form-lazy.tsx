"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// perf: il form contatti (react-hook-form + zod + @hookform/resolvers) e'
// tutto sotto la fold — chunk client separato (ssr: false), fuori dal bundle
// iniziale. Usato da contact.tsx (server component) cosi' heading e lista
// contatti restano server-rendered (SEO/no-JS).
export const ContactFormLazy = dynamic(
  () => import("./contact-form").then((m) => m.ContactForm),
  {
    ssr: false,
    // perf/CLS: skeleton con altezza riservata pari a quella del form (~430px),
    // cosi' l'arrivo del chunk lazy non sposta il layout (no CLS).
    loading: () => (
      <div className="max-w-xl mx-auto w-full" aria-hidden="true">
        <div className="space-y-6">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-11 w-full" />
        </div>
      </div>
    ),
  },
);
