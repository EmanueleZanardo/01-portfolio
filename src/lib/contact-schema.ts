import { z } from "zod";

// Single source of truth for the contact form payload, shared by the
// client form (react-hook-form + zodResolver) and the server action.
// Validating server-side too means direct calls to the server action
// can't bypass the email format or length limits (nodemailer errors and
// quota burn on oversized messages).
export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(100),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).max(254),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(5000),
  // Honeypot: real users leave this empty, bots tend to fill it.
  // robustness: named "extra_info" instead of "company" — "company" is a
  // standard browser-autofill vocabulary token, and a legitimate autofill
  // would fill it for a real user, silently dropping their message
  // (the honeypot check drops filled fields with fake success).
  extra_info: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
