"use server";

import {
  generateDesignVariations,
  type GenerateDesignVariationsInput,
} from "@/ai/flows/generate-design-variations";
import { z } from "zod";
import nodemailer from "nodemailer";

export async function generateDesigns(input: GenerateDesignVariationsInput) {
  try {
    const output = await generateDesignVariations(input);
    return { designSuggestions: output.designSuggestions };
  } catch (error) {
    console.error("Error generating design variations:", error);
    return { error: "Failed to generate design ideas. The AI model may be temporarily unavailable." };
  }
}

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
  // Honeypot field: bots fill it, real users leave it empty.
  company: z.string().optional(),
});

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
  values: z.infer<typeof contactFormSchema>
) {
  const { name, email, message, company } = values;

  // Honeypot: pretend success for bots so they don't learn the trap.
  if (company && company.trim() !== "") {
    console.warn("Contact form: honeypot triggered, dropping message from", email);
    return { success: true };
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
