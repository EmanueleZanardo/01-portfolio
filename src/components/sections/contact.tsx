"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await sendContactMessage(values);
    setIsSubmitting(false);

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
  }

  return (
    <section id="contact" className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl text-primary">Contact Me</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Feel free to write to me.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="max-w-xl mx-auto w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" autoComplete="name" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" inputMode="email" autoComplete="email" placeholder="your.email@example.com" {...field} disabled={isSubmitting}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project or idea..."
                          className="min-h-[150px]"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting && <Loader aria-hidden="true" className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-4">
              <Phone aria-hidden="true" className="h-6 w-6 text-primary" />
              <a href="tel:+393451114337" className="text-lg text-muted-foreground hover:text-primary transition-colors">
                +39 3451114337
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Mail aria-hidden="true" className="h-6 w-6 text-primary" />
              <a href="mailto:emanuele1998zanardo@gmail.com" className="text-lg text-muted-foreground hover:text-primary transition-colors">
                emanuele1998zanardo@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Linkedin aria-hidden="true" className="h-6 w-6 text-primary" />
              <Link href="https://www.linkedin.com/in/emanuele-zanardo-1954aa193" target="_blank" rel="noopener noreferrer me" className="text-lg text-muted-foreground hover:text-primary transition-colors">
                Emanuele Zanardo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
