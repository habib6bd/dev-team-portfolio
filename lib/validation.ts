import { z } from "zod";

export const SERVICE_OPTIONS = [
  "Web Development",
  "SEO",
  "Admin Support",
  "ERP Software Solution",
  "Custom Software Development",
  "Pharmacy Management Software",
  "Super Shop Management Software",
  "Full package",
  "Something else",
] as const;

export const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within a month",
  "1 – 3 months",
  "Just exploring",
] as const;

/** Currencies a client can state their budget in (BDT = Bangladeshi taka). */
export const BUDGET_CURRENCIES = ["USD", "BDT"] as const;
const CURRENCY_SYMBOLS: Record<(typeof BUDGET_CURRENCIES)[number], string> = { USD: "$", BDT: "৳" };

export const LEAD_STATUSES = ["new", "contacted", "won", "archived"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .optional()
    .transform((value) => (value ? value : null));

export const leadSchema = z
  .object({
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
  // Free-form amount: any number from zero up, never negative. Combined with
  // the currency below into display text ("$1,500", "৳50,000") for storage.
  budget: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || null)
    .refine((value) => value === null || /^\d{1,9}(\.\d{1,2})?$/.test(value), {
      message: "Please enter the amount as a number, zero or more.",
    }),
  budgetCurrency: z.enum(BUDGET_CURRENCIES).default("USD"),
  timeline: z.enum(TIMELINE_OPTIONS).optional().nullable(),
  message: z
    .string()
    .trim()
    .min(20, "Please tell us a little more — at least 20 characters.")
    .max(4000, "Please keep the message under 4000 characters."),
  })
  .transform(({ budget, budgetCurrency, ...rest }) => ({
    ...rest,
    budget:
      budget === null
        ? null
        : CURRENCY_SYMBOLS[budgetCurrency] +
          Number(budget).toLocaleString("en-US", {
            // Whole amounts stay clean ("$1,500"); cents always show two digits.
            minimumFractionDigits: Number.isInteger(Number(budget)) ? 0 : 2,
            maximumFractionDigits: 2,
          }),
  }));

export type LeadInput = z.infer<typeof leadSchema>;

export const visitSchema = z.object({
  path: z.string().trim().min(1).max(300),
  referrer: z.string().trim().max(500).optional().nullable(),
  screenWidth: z.number().int().positive().max(20000).optional().nullable(),
});
