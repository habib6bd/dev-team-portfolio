import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { recordVisit } from "@/lib/analytics";
import { isDatabaseConfigured } from "@/lib/db";
import { countryFromHeaders, hashIp, ipFromHeaders, isBot, parseUserAgent } from "@/lib/request";
import { visitSchema } from "@/lib/validation";

const VISITOR_COOKIE = "devteam_vid";
const SESSION_COOKIE = "devteam_sid";
const VISITOR_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const SESSION_MAX_AGE = 60 * 30; // 30 minutes of inactivity ends the session

function hostOf(referrer: string | null): string | null {
  if (!referrer) return null;
  try {
    return new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/**
 * Records one page view. Called by <VisitTracker /> on every route change.
 * Always answers 204 — analytics must never surface an error to a visitor.
 */
export async function POST(request: NextRequest) {
  try {
    if (!isDatabaseConfigured()) return new Response(null, { status: 204 });

    const userAgent = request.headers.get("user-agent");
    if (isBot(userAgent)) return new Response(null, { status: 204 });

    const parsed = visitSchema.safeParse(await request.json());
    if (!parsed.success) return new Response(null, { status: 204 });

    const cookieStore = await cookies();

    const visitorId = cookieStore.get(VISITOR_COOKIE)?.value ?? randomUUID();
    const sessionId = cookieStore.get(SESSION_COOKIE)?.value ?? randomUUID();

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
    };

    cookieStore.set(VISITOR_COOKIE, visitorId, { ...cookieOptions, maxAge: VISITOR_MAX_AGE });
    // Re-set on every view so the 30-minute window slides with activity.
    cookieStore.set(SESSION_COOKIE, sessionId, { ...cookieOptions, maxAge: SESSION_MAX_AGE });

    const { path, referrer, screenWidth } = parsed.data;
    const url = new URL(path, request.nextUrl.origin);
    const { device, browser, os } = parseUserAgent(userAgent);

    // Ignore self-referrals so internal navigation doesn't look like traffic.
    const referrerHost = hostOf(referrer ?? null);
    const isSelfReferral = referrerHost === request.nextUrl.hostname.replace(/^www\./, "");

    await recordVisit({
      visitorId,
      sessionId,
      path: url.pathname,
      referrer: isSelfReferral ? null : (referrer ?? null),
      referrerHost: isSelfReferral ? null : referrerHost,
      utmSource: url.searchParams.get("utm_source"),
      utmMedium: url.searchParams.get("utm_medium"),
      utmCampaign: url.searchParams.get("utm_campaign"),
      device,
      browser,
      os,
      country: countryFromHeaders(request.headers),
      screenWidth: screenWidth ?? null,
      ipHash: hashIp(ipFromHeaders(request.headers)),
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("[track] failed to record visit", error);
    return new Response(null, { status: 204 });
  }
}
