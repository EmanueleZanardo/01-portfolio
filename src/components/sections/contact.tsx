import { Phone, Mail, Linkedin } from "lucide-react";
import Link from "next/link";
import { ContactFormLazy } from "./contact-form-lazy";

// perf: il form contatti (react-hook-form + zod + @hookform/resolvers) e'
// tutto sotto la fold — viene caricato in lazy in un chunk client separato
// (ContactFormLazy, ssr: false), fuori dal chunk condiviso iniziale.
// La sezione resta un server component: heading, descrizione e lista dei
// contatti (tel:, mailto:, LinkedIn) restano server-rendered — SEO e utenti
// senza JS li vedono subito, mentre il form compare appena il chunk lazy
// arriva (skeleton con altezza riservata = no CLS).

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" tabIndex={-1} className="py-20 lg:py-32 bg-card scroll-mt-16 focus:outline-none">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="contact-heading" className="font-headline text-4xl md:text-5xl text-primary">Contact Me</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Have an electronics project in mind, or just want to say hello? Feel free to write to me.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {/* a11y/no-js: il form e' ssr:false (ContactFormLazy) — con JS
              disabilitato lo slot lazy resterebbe vuoto. Il fallback
              <noscript> (server-rendered) spiega come contattarlo in
              alternativa: le opzioni telefono/email/LinkedIn qui a fianco
              sono sempre visibili. */}
          <div>
            <noscript>
              <p className="rounded-md border border-border bg-muted p-4 text-muted-foreground">
                The contact form needs JavaScript enabled. Please use the phone,
                email or LinkedIn options on this page to reach me.
              </p>
            </noscript>
            <ContactFormLazy />
          </div>
          {/* a11y: contact methods as a real list — screen readers announce
              "list, 3 items" and offer list navigation (WCAG 1.3.1). */}
          <ul className="flex flex-col justify-center space-y-6">
            <li className="flex items-center gap-4">
              <Phone aria-hidden="true" className="h-6 w-6 text-primary" />
              <a href="tel:+393451114337" className="text-lg text-muted-foreground hover:text-primary transition-colors">
                +39 345 111 4337
              </a>
            </li>
            <li className="flex items-center gap-4">
              <Mail aria-hidden="true" className="h-6 w-6 text-primary" />
              <a href="mailto:emanuele1998zanardo@gmail.com" className="text-lg text-muted-foreground hover:text-primary transition-colors">
                emanuele1998zanardo@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-4">
              <Linkedin aria-hidden="true" className="h-6 w-6 text-primary" />
              <Link href="https://www.linkedin.com/in/emanuele-zanardo-1954aa193" target="_blank" rel="noopener noreferrer me" aria-label="Emanuele Zanardo on LinkedIn (opens in new tab)" className="text-lg text-muted-foreground hover:text-primary transition-colors">
                Emanuele Zanardo
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
