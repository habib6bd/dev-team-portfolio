import "server-only";

import { query, queryOne } from "@/lib/db";
import type { LeadInput, LeadStatus } from "@/lib/validation";

export type Lead = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  service: string;
  budget: string | null;
  timeline: string | null;
  message: string;
  status: LeadStatus;
  notes: string | null;
  source_path: string | null;
  referrer: string | null;
  country: string | null;
  created_at: Date;
  updated_at: Date;
};

type LeadMeta = {
  sourcePath: string | null;
  referrer: string | null;
  country: string | null;
  userAgent: string | null;
  ipHash: string | null;
};

export async function createLead(input: LeadInput, meta: LeadMeta): Promise<{ id: string }> {
  const row = await queryOne<{ id: string }>(
    `INSERT INTO leads
       (name, email, company, phone, service, budget, timeline, message,
        source_path, referrer, country, user_agent, ip_hash)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
     RETURNING id`,
    [
      input.name,
      input.email,
      input.company,
      input.phone,
      input.service,
      input.budget ?? null,
      input.timeline ?? null,
      input.message,
      meta.sourcePath,
      meta.referrer,
      meta.country,
      meta.userAgent,
      meta.ipHash,
    ],
  );

  return { id: row!.id };
}

export async function listLeads(options: { status?: string; search?: string } = {}): Promise<Lead[]> {
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (options.status && options.status !== "all") {
    params.push(options.status);
    conditions.push(`status = $${params.length}`);
  }

  if (options.search) {
    params.push(`%${options.search}%`);
    const p = `$${params.length}`;
    conditions.push(`(name ILIKE ${p} OR email ILIKE ${p} OR company ILIKE ${p} OR message ILIKE ${p})`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  return query<Lead>(`SELECT * FROM leads ${where} ORDER BY created_at DESC LIMIT 500`, params);
}

export async function getLead(id: string): Promise<Lead | null> {
  return queryOne<Lead>(`SELECT * FROM leads WHERE id = $1`, [id]);
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<void> {
  await query(`UPDATE leads SET status = $1, updated_at = now() WHERE id = $2`, [status, id]);
}

export async function updateLeadNotes(id: string, notes: string): Promise<void> {
  await query(`UPDATE leads SET notes = $1, updated_at = now() WHERE id = $2`, [notes || null, id]);
}

export async function deleteLead(id: string): Promise<void> {
  await query(`DELETE FROM leads WHERE id = $1`, [id]);
}

/**
 * Simple rate limit: at most `limit` submissions per IP per window.
 * Returns true when the caller is over the limit.
 */
export async function isRateLimited(ipHash: string | null, limit = 5, windowMinutes = 60): Promise<boolean> {
  if (!ipHash) return false;

  const row = await queryOne<{ count: string }>(
    `SELECT COUNT(*)::text AS count
       FROM submission_log
      WHERE ip_hash = $1
        AND created_at > now() - ($2::int || ' minutes')::interval`,
    [ipHash, String(windowMinutes)],
  );

  return Number(row?.count ?? 0) >= limit;
}

export async function recordSubmission(ipHash: string | null): Promise<void> {
  if (!ipHash) return;
  await query(`INSERT INTO submission_log (ip_hash) VALUES ($1)`, [ipHash]);
  // Keep the ledger from growing without bound.
  await query(`DELETE FROM submission_log WHERE created_at < now() - interval '7 days'`);
}
