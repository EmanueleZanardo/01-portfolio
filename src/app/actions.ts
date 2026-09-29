"use server";

import nodemailer from "nodemailer";
import { headers } from "next/headers";

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

// Shape of the contact-form payload. Validation runs client-side
// (react-hook-form + zod with max-length constraints); the server action
// receives already-validated values, so a plain type is enough here.
type ContactFormValues = {
  name: string;
  email: string;
  message: string;
  // Honeypot field: bots fill it, real users leave it empty.
  company?: string;
};

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
  values: ContactFormValues
) {
  const { name, email, message, company } = values;

  // Honeypot: pretend success for bots so they don't learn the trap.
  if (company && company.trim() !== "") {
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
    subject: `New Contact Form Message from ${safeName}`,
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

  try {
    await transporter.sendMail(mailOptionsOwner);
    await transporter.sendMail(mailOptionsUser);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: "There was an error sending your message. Please ensure the mailing service is properly configured.",
    };
  }
}
