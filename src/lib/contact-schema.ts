import { z } from "zod";

// Single source of truth for the contact form payload, shared by the
// client form (react-hook-form + zodResolver) and the server action.
// Server-side re-validation means direct calls to the action can't bypass
// the email format or length limits (nodemailer errors and quota burn on
// oversized messages).
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your name (at least 2 characters)." })
    .max(60, { message: "Please keep your name under 60 characters." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Please enter your email address." })
    .email({ message: "That doesn't look like a valid email address." })
    .max(254, { message: "Please use a shorter email address." }),
  message: z
    .string()
    .trim()
    .min(10, {
      message: "Please write a bit more — at least 10 characters.",
    })
    .max(2000, {
      message: "Please keep your message under 2,000 characters.",
    }),
  // Honeypot: must stay empty. Real users never touch the field (it's
  // visually hidden), bots tend to fill it. The server action pre-checks
  // this on the raw payload and fakes success for filled submissions so
  // the bot never learns the trap — see src/app/actions.ts.
  // Named "extra_info" instead of "company": "company" is a standard
  // browser-autofill vocabulary token, and legitimate autofill would fill
  // it for a real user, silently dropping their message.
  extra_info: z
    .string()
    .max(0, { message: "This field must be left empty." })
    .optional()
    .default(""),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
