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
import { Loader } from "lucide-react";
import { useState } from "react";
import { sendContactMessage } from "@/app/actions";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";

const formSchema = contactFormSchema;

// perf: il form (react-hook-form + zod + @hookform/resolvers) e' l'unico
// consumer di queste librerie e sta tutto sotto la fold — vive in un chunk
// client separato caricato in lazy da contact.tsx (dynamic, ssr: false), cosi'
// non gonfia piu' il chunk condiviso di tutte le route (risparmio misurato
// nel report wC del 04/10/2026: vedi patches/wC-report.md).
export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      extra_info: "",
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
    <div className="max-w-xl mx-auto w-full">
      <Form {...form}>
        {/* noValidate: la validazione e' interamente custom (react-hook-form +
            FormMessage/aria-invalid) — i bubble nativi del browser su
            type="email" la scavalcavano con errori non stilati. */}
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" autoComplete="name" maxLength={100} enterKeyHint="next" autoCapitalize="words" autoCorrect="off" aria-invalid={fieldState.error ? true : undefined} {...field} disabled={isSubmitting} />
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
                  <Input type="email" inputMode="email" autoComplete="email" placeholder="your.email@example.com" maxLength={254} enterKeyHint="next" spellCheck={false} autoCapitalize="off" autoCorrect="off" aria-invalid={fieldState.error ? true : undefined} {...field} disabled={isSubmitting}/>
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
                    autoCapitalize="sentences"
                    aria-invalid={fieldState.error ? true : undefined}
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Honeypot anti-spam field: hidden from real users, bots usually fill it.
              Named "extra_info" (see contact-schema.ts): not a browser-autofill
              vocabulary token, so legitimate autofill can't fill it and get
              the user's real message silently dropped. */}
          <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
            <label htmlFor="extra_info">Extra info</label>
            <input
              id="extra_info"
              type="text"
              autoComplete="off"
              tabIndex={-1}
              {...form.register("extra_info")}
            />
          </div>
          <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isSubmitting} aria-busy={isSubmitting}>
            {isSubmitting && <Loader aria-hidden="true" className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
