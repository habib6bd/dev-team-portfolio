"use server";

import { revalidatePath } from "next/cache";
import { contactDetails } from "@/data/siteData";
import { isDatabaseConfigured } from "@/lib/db";
import { createLead, isRateLimited, recordSubmission } from "@/lib/leads";
import type { LeadFormState } from "@/lib/lead-form-state";
import { requestContext } from "@/lib/request";
import { leadSchema } from "@/lib/validation";

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const raw = Object.fromEntries(formData.entries());
  const values: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "string" && key !== "website") values[key] = value;
  }

  // Honeypot: a real person never fills a field that is hidden from them.
  // Report success so a bot has no signal that it was caught.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return { status: "success", message: "Thanks — your message is on its way.", errors: {}, values: {} };
  }

  const parsed = leadSchema.safeParse({
    name: raw.name,
    email: raw.email,
    company: raw.company,
    phone: raw.phone,
    service: raw.service,
    budget: raw.budget || undefined,
    budgetCurrency: raw.budgetCurrency || undefined,
    timeline: raw.timeline || undefined,
    message: raw.message,
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      if (!errors[field]) errors[field] = issue.message;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      errors,
      values,
    };
  }

  if (!isDatabaseConfigured()) {
    return {
      status: "error",
      message:
        `The enquiry database isn't connected yet. Please email us directly at ${contactDetails.email}.`,
      errors: {},
      values,
    };
  }

  try {
    const context = await requestContext();

    if (await isRateLimited(context.ipHash)) {
      return {
        status: "error",
        message: "You've sent several enquiries recently. Please email us directly instead.",
        errors: {},
        values,
      };
    }

    await createLead(parsed.data, {
      sourcePath: typeof raw.sourcePath === "string" ? raw.sourcePath : null,
      referrer: context.referrer,
      country: context.country,
      userAgent: context.userAgent,
      ipHash: context.ipHash,
    });

    await recordSubmission(context.ipHash);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/leads");

    return {
      status: "success",
      message: "Thanks — we've got your details and will reply within one working day.",
      errors: {},
      values: {},
    };
  } catch (error) {
    console.error("[submitLead] failed to save lead", error);
    return {
      status: "error",
      message:
        `Something went wrong saving your message. Please try again, or email ${contactDetails.email}.`,
      errors: {},
      values,
    };
  }
}
