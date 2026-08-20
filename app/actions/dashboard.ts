"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth";
import { deleteLead, updateLeadNotes, updateLeadStatus } from "@/lib/leads";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/validation";

function assertStatus(value: FormDataEntryValue | null): LeadStatus {
  if (typeof value === "string" && (LEAD_STATUSES as readonly string[]).includes(value)) {
    return value as LeadStatus;
  }
  throw new Error(`Unknown lead status: ${String(value)}`);
}

function assertId(value: FormDataEntryValue | null): string {
  if (typeof value !== "string" || !/^\d+$/.test(value)) {
    throw new Error("Invalid lead id.");
  }
  return value;
}

export async function setLeadStatus(formData: FormData) {
  // Server Actions are reachable by direct POST, so every one re-checks auth.
  await requireAuth();

  const id = assertId(formData.get("id"));
  await updateLeadStatus(id, assertStatus(formData.get("status")));

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/leads");
  revalidatePath(`/dashboard/leads/${id}`);
}

export async function setLeadNotes(formData: FormData) {
  await requireAuth();

  const id = assertId(formData.get("id"));
  const notes = formData.get("notes");
  await updateLeadNotes(id, typeof notes === "string" ? notes.slice(0, 4000) : "");

  revalidatePath(`/dashboard/leads/${id}`);
}

export async function removeLead(formData: FormData) {
  await requireAuth();

  const id = assertId(formData.get("id"));
  await deleteLead(id);

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/leads");
  redirect("/dashboard/leads");
}
