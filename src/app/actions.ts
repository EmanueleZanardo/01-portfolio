"use server";

import nodemailer from "nodemailer";
import { headers } from "next/headers";
import { contactFormSchema } from "@/lib/contact-schema";

// Anti-abuse: simple in-memory sliding-window rate limiter for the contact
// form. Keyed by client IP (x-forwarded-for on Vercel) so a single sender
// can't hammer the endpoint and burn the Gmail quota (each submit sends two
// emails). Best-effort on serverless (per-instance memory); still stops
// casual abuse and naive bots.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // submissions per window
const rateBuckets = new Map<string, number[]>();

function isRateLimited(
  key: string,
  buckets: Map<string, number[]> = rateBuckets,
  windowMs: number = RATE_LIMIT_WINDOW_MS,
  max: number = RATE_LIMIT_MAX,
): boolean {
  const now = Date.now();
  // robustness: la mappa e' in memoria per istanza — senza pruning cresce
  // senza limiti su istanze long-lived. Quando supera una soglia, elimina i
  // bucket completamente scaduti prima di valutare.
  if (buckets.size > 1000) {
    for (const [k, hits] of buckets) {
      const fresh = hits.filter((t) => now - t < windowMs);
      if (fresh.length === 0) buckets.delete(k);
      else buckets.set(k, fresh);
    }
  }
  const hits = (buckets.get(key) ?? []).filter(
    (t) => now - t < windowMs,
  );
  if (hits.length >= max) return true;
  hits.push(now);
  buckets.set(key, hits);
  return false;
}

async function getClientKey(fallback: string): Promise<string> {
  try {
    const forwarded = (await headers()).get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
  } catch {
    // headers() unavailable outside a request context; fall back to email.
  }
  return `email:${fallback}`;
}

// Shape of the contact-form payload. The canonical schema lives in
// src/lib/contact-schema.ts, shared with the client form; the server
// action re-validates with safeParse so direct calls to the action can't
// bypass the email format or length limits (nodemailer errors and quota
// burn on oversized messages).
type ContactFormValues = {
  name: string;
  email: string;
  message: string;
  // Honeypot field: bots fill it, real users leave it empty.
  extra_info?: string;
};

// Structured result consumed by the client form. On server-side
// validation failure the first friendly error per field is returned so
// the client can map it onto the matching input (inline field errors,
// aria-invalid) instead of showing a generic message. Inputs are never
// cleared — the user edits and resubmits.
export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "message", string>
>;

export type ContactActionResult =
  | { success: true }
  | { success: false; error: string; fieldErrors?: ContactFieldErrors };

// Escape user input before interpolating it into HTML email bodies,
// otherwise a crafted message can inject arbitrary HTML into the emails.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactMessage(
  values: ContactFormValues,
): Promise<ContactActionResult> {
  // Server-side validation: never trust client-only validation, since the
  // action can be invoked directly. Rejects invalid emails and oversized
  // fields before anything touches the mail service.
  const parsed = contactFormSchema.safeParse(values);
  if (!parsed.success) {
    console.warn("Contact form: server-side validation failed", parsed.error.issues.map((i) => i.path.join(".")));
    // Map the first friendly zod message per field so the client can show
    // inline field errors (and keep the user's input).
    const fieldErrors: ContactFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (
        (field === "name" || field === "email" || field === "message") &&
        !fieldErrors[field]
      ) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      success: false,
      error: "Please review the highlighted fields and try again.",
      fieldErrors,
    } satisfies ContactActionResult;
  }

  const { name, email, message, extra_info } = parsed.data;

  // Honeypot: pretend success for bots so they don't learn the trap.
  if (extra_info && extra_info.trim() !== "") {
    console.warn("Contact form: honeypot triggered, dropping message from", email);
    return { success: true };
  }

  // Rate limit real-looking submissions before touching the mail service.
  const clientKey = await getClientKey(email);
  if (isRateLimited(clientKey)) {
    console.warn("Contact form: rate limit hit for", clientKey);
    return {
      success: false,
      error: "Too many messages sent recently. Please try again later.",
    };
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
  // bugfix: il subject e' plain text, non HTML — usare safeName (escaped)
  // mostrerebbe entita' come &#39; a chi legge l'email. In piu' `name` e'
  // solo z.string() (i \n sono permessi): stripparli evita tentativi di
  // header injection nel subject.
  const subjectName = name.replace(/[\r\n]+/g, " ").trim().slice(0, 100);

  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  if (!gmailAppPassword) {
    console.error("GMAIL_APP_PASSWORD env var is not set");
    return {
      success: false,
      error: "The contact form is not configured yet. Please use the email address shown on this page instead.",
    };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "emanuele1998zanardo@gmail.com",
      pass: gmailAppPassword,
    },
  });

  const mailOptionsOwner = {
    from: "emanuele1998zanardo@gmail.com",
    to: "emanuele1998zanardo@gmail.com",
    // replyTo is the zod-validated sender address (z.string().email() rejects
    // newlines, so no header injection); hitting "Reply" in the inbox answers
    // the visitor directly instead of Emanuele himself.
    replyTo: email,
    subject: `New Contact Form Message from ${subjectName}`,
    html: `
      <h2>New Message from Portfolio Contact Form</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `,
  };

  const mailOptionsUser = {
    from: "emanuele1998zanardo@gmail.com",
    to: email,
    subject: "Thank you for your message!",
    html: `
      <h2>Hello ${safeName},</h2>
      <p>Thank you for contacting me through my portfolio website.</p>
      <p>I have received your message and will get back to you as soon as possible.</p>
      <br>
      <p>Best regards,</p>
      <p>Emanuele Zanardo</p>
    `,
  };

  // edge case: i due invii sono separati. Se la conferma all'utente
  // fallisce dopo che il messaggio al proprietario e' partito, ritornare
  // success:false farebbe riprovare l'utente e duplicare l'email ricevuta —
  // il messaggio e' gia' arrivato, quindi e' success comunque (l'errore
  // resta nei log per diagnosi).
  try {
    await transporter.sendMail(mailOptionsOwner);
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: "There was an error sending your message. Please ensure the mailing service is properly configured.",
    };
  }
  try {
    await transporter.sendMail(mailOptionsUser);
  } catch (error) {
    console.error("Error sending confirmation email to user:", error);
  }
  return { success: true };
}
