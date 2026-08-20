/**
 * Shape of the hire-form action result.
 *
 * This lives outside `app/actions/leads.ts` on purpose: a `"use server"`
 * module may only export async functions, so the initial-state object cannot
 * be exported from there.
 */
export type LeadFormState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Field name -> first error message, used to mark inputs in the form. */
  errors: Record<string, string>;
  /** Echoed back so a failed submit doesn't wipe what the visitor typed. */
  values: Record<string, string>;
};

export const initialLeadFormState: LeadFormState = {
  status: "idle",
  message: "",
  errors: {},
  values: {},
};
