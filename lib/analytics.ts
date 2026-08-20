import "server-only";

import { query, queryOne } from "@/lib/db";

export type VisitInput = {
  visitorId: string;
  sessionId: string;
  path: string;
  referrer: string | null;
  referrerHost: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  device: string;
  browser: string;
  os: string;
  country: string | null;
  screenWidth: number | null;
  ipHash: string | null;
};

export async function recordVisit(input: VisitInput): Promise<void> {
  await query(
    `INSERT INTO visits
       (visitor_id, session_id, path, referrer, referrer_host, utm_source,
        utm_medium, utm_campaign, device, browser, os, country, screen_width, ip_hash)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
    [
      input.visitorId,
      input.sessionId,
      input.path,
      input.referrer,
      input.referrerHost,
      input.utmSource,
      input.utmMedium,
      input.utmCampaign,
      input.device,
      input.browser,
      input.os,
      input.country,
      input.screenWidth,
      input.ipHash,
    ],
  );
}

export type Overview = {
  views: number;
  visitors: number;
  sessions: number;
  leads: number;
  viewsPrev: number;
  visitorsPrev: number;
  leadsPrev: number;
  newLeads: number;
};

/** Headline counters for `days`, alongside the equally-sized preceding window. */
export async function getOverview(days: number): Promise<Overview> {
  const row = await queryOne<Record<string, string>>(
    `WITH bounds AS (
       SELECT now() - ($1::int || ' days')::interval     AS current_start,
              now() - ($1::int * 2 || ' days')::interval AS previous_start
     )
     SELECT
       (SELECT COUNT(*)                  FROM visits, bounds WHERE created_at >= current_start)::text AS views,
       (SELECT COUNT(DISTINCT visitor_id) FROM visits, bounds WHERE created_at >= current_start)::text AS visitors,
       (SELECT COUNT(DISTINCT session_id) FROM visits, bounds WHERE created_at >= current_start)::text AS sessions,
       (SELECT COUNT(*)                  FROM leads,  bounds WHERE created_at >= current_start)::text AS leads,
       (SELECT COUNT(*)                  FROM visits, bounds WHERE created_at >= previous_start AND created_at < current_start)::text AS views_prev,
       (SELECT COUNT(DISTINCT visitor_id) FROM visits, bounds WHERE created_at >= previous_start AND created_at < current_start)::text AS visitors_prev,
       (SELECT COUNT(*)                  FROM leads,  bounds WHERE created_at >= previous_start AND created_at < current_start)::text AS leads_prev,
       (SELECT COUNT(*)                  FROM leads   WHERE status = 'new')::text AS new_leads`,
    [String(days)],
  );

  const n = (key: string) => Number(row?.[key] ?? 0);

  return {
    views: n("views"),
    visitors: n("visitors"),
    sessions: n("sessions"),
    leads: n("leads"),
    viewsPrev: n("views_prev"),
    visitorsPrev: n("visitors_prev"),
    leadsPrev: n("leads_prev"),
    newLeads: n("new_leads"),
  };
}

export type TimePoint = { date: string; views: number; visitors: number; leads: number };

/**
 * One row per day for the last `days` days, including days with no traffic —
 * generate_series fills the gaps so the chart never skips a date.
 */
export async function getTimeSeries(days: number): Promise<TimePoint[]> {
  return query<TimePoint>(
    `WITH days AS (
       SELECT generate_series(
         date_trunc('day', now()) - ($1::int - 1) * interval '1 day',
         date_trunc('day', now()),
         interval '1 day'
       ) AS day
     )
     SELECT
       to_char(days.day, 'YYYY-MM-DD') AS date,
       COALESCE(v.views, 0)::int       AS views,
       COALESCE(v.visitors, 0)::int    AS visitors,
       COALESCE(l.leads, 0)::int       AS leads
     FROM days
     LEFT JOIN (
       SELECT date_trunc('day', created_at) AS day,
              COUNT(*) AS views,
              COUNT(DISTINCT visitor_id) AS visitors
         FROM visits
        GROUP BY 1
     ) v ON v.day = days.day
     LEFT JOIN (
       SELECT date_trunc('day', created_at) AS day, COUNT(*) AS leads
         FROM leads
        GROUP BY 1
     ) l ON l.day = days.day
     ORDER BY days.day`,
    [String(days)],
  );
}

export type Breakdown = { label: string; value: number };

async function breakdown(column: string, days: number, limit: number): Promise<Breakdown[]> {
  return query<Breakdown>(
    `SELECT COALESCE(NULLIF(${column}, ''), 'Unknown') AS label, COUNT(*)::int AS value
       FROM visits
      WHERE created_at > now() - ($1::int || ' days')::interval
      GROUP BY 1
      ORDER BY value DESC
      LIMIT $2`,
    [String(days), limit],
  );
}

export const getTopPages = (days: number, limit = 8) => breakdown("path", days, limit);
export const getDevices = (days: number) => breakdown("device", days, 5);
export const getBrowsers = (days: number) => breakdown("browser", days, 6);
export const getCountries = (days: number, limit = 8) => breakdown("country", days, limit);

/** Traffic sources, with utm_source taking precedence over the referrer host. */
export async function getSources(days: number, limit = 8): Promise<Breakdown[]> {
  return query<Breakdown>(
    `SELECT COALESCE(NULLIF(utm_source, ''), NULLIF(referrer_host, ''), 'Direct') AS label,
            COUNT(*)::int AS value
       FROM visits
      WHERE created_at > now() - ($1::int || ' days')::interval
      GROUP BY 1
      ORDER BY value DESC
      LIMIT $2`,
    [String(days), limit],
  );
}

export async function getLeadsByService(days: number): Promise<Breakdown[]> {
  return query<Breakdown>(
    `SELECT service AS label, COUNT(*)::int AS value
       FROM leads
      WHERE created_at > now() - ($1::int || ' days')::interval
      GROUP BY 1
      ORDER BY value DESC`,
    [String(days)],
  );
}

export type RecentVisitor = {
  visitor_id: string;
  last_seen: Date;
  page_views: number;
  device: string;
  browser: string;
  country: string | null;
  entry_page: string;
  last_page: string;
  source: string;
};

/** Distinct visitors, most recently active first. */
export async function getRecentVisitors(days: number, limit = 50): Promise<RecentVisitor[]> {
  return query<RecentVisitor>(
    `SELECT * FROM (
       SELECT DISTINCT ON (visitor_id)
              visitor_id,
              MAX(created_at)   OVER (PARTITION BY visitor_id) AS last_seen,
              COUNT(*)          OVER (PARTITION BY visitor_id)::int AS page_views,
              FIRST_VALUE(path) OVER (PARTITION BY visitor_id ORDER BY created_at ASC)  AS entry_page,
              FIRST_VALUE(path) OVER (PARTITION BY visitor_id ORDER BY created_at DESC) AS last_page,
              device,
              browser,
              country,
              COALESCE(NULLIF(utm_source, ''), NULLIF(referrer_host, ''), 'Direct') AS source
         FROM visits
        WHERE created_at > now() - ($1::int || ' days')::interval
        ORDER BY visitor_id, created_at DESC
     ) recent
     ORDER BY last_seen DESC
     LIMIT $2`,
    [String(days), limit],
  );
}
