"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, Linkedin, Loader } from "lucide-react";
import Link from "next/link";
import { sendContactMessage } from "@/app/actions";
import { useState } from "react";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";

const formSchema = contactFormSchema;

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      company: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    // robustezza: se la server action rifiuta la promise (timeout/500 di
    // rete), senza try/finally isSubmitting restava true per sempre — il
    // bottone si bloccava su "Sending..." senza toast e senza possibilita'
    // di riprovare. Ora l'utente riceve sempre un esito e il form si sblocca.
    setIsSubmitting(true);
    try {
      const result = await sendContactMessage(values);

      if (result.success) {
        toast({
          title: "Message Sent!",
          description:
            "Thank you for contacting me. I will get back to you as soon as possible.",
        });
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: result.error,
        });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "Could not send your message. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

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
          <div className="max-w-xl mx-auto w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" autoComplete="name" maxLength={100} enterKeyHint="next" aria-invalid={fieldState.error ? true : undefined} {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" inputMode="email" autoComplete="email" placeholder="your.email@example.com" maxLength={254} enterKeyHint="next" aria-invalid={fieldState.error ? true : undefined} {...field} disabled={isSubmitting}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project or idea..."
                          className="min-h-[150px]"
                          maxLength={5000}
                          enterKeyHint="send"
                          aria-invalid={fieldState.error ? true : undefined}
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Honeypot anti-spam field: hidden from real users, bots usually fill it. */}
                <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                    {...form.register("company")}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isSubmitting} aria-busy={isSubmitting}>
                  {isSubmitting && <Loader aria-hidden="true" className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
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
