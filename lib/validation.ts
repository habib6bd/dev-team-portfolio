import { z } from "zod";

export const SERVICE_OPTIONS = [
  "Web Development",
  "SEO",
  "Admin Support",
  "Full package",
  "Something else",
] as const;

export const BUDGET_OPTIONS = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
  "Not sure yet",
] as const;

export const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within a month",
  "1 – 3 months",
  "Just exploring",
] as const;

export const LEAD_STATUSES = ["new", "contacted", "won", "archived"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .optional()
    .transform((value) => (value ? value : null));

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120, "That name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(200, "That email address is too long.")
    .pipe(z.email("That doesn't look like a valid email address.")),
  company: optionalText(160),
  phone: optionalText(40),
  service: z.enum(SERVICE_OPTIONS, { message: "Please choose a service." }),
  budget: z.enum(BUDGET_OPTIONS).optional().nullable(),
  timeline: z.enum(TIMELINE_OPTIONS).optional().nullable(),
  message: z
    .string()
    .trim()
    .min(20, "Please tell us a little more — at least 20 characters.")
    .max(4000, "Please keep the message under 4000 characters."),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const visitSchema = z.object({
  path: z.string().trim().min(1).max(300),
  referrer: z.string().trim().max(500).optional().nullable(),
  screenWidth: z.number().int().positive().max(20000).optional().nullable(),
});
