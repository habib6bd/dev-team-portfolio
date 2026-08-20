import "server-only";

import { createHash } from "node:crypto";
import { headers } from "next/headers";

/**
 * Salted hash of the client IP. We keep this instead of the raw address so
 * rate limiting and unique-visitor counts work without storing personal data.
 */
export function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  const salt = process.env.SESSION_SECRET ?? "devteam-fallback-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

export function ipFromHeaders(headerList: Headers): string | null {
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headerList.get("x-real-ip");
}

export async function requestContext() {
  const headerList = await headers();
  return {
    ipHash: hashIp(ipFromHeaders(headerList)),
    userAgent: headerList.get("user-agent"),
    referrer: headerList.get("referer"),
    // Set by Vercel; null when self-hosted unless your proxy adds it.
    country: headerList.get("x-vercel-ip-country"),
  };
}

/** Best-effort device/browser/OS labels from a user-agent string. */
export function parseUserAgent(userAgent: string | null) {
  const ua = userAgent ?? "";

  const device = /iPad|Tablet/i.test(ua)
    ? "Tablet"
    : /Mobi|Android|iPhone/i.test(ua)
      ? "Mobile"
      : "Desktop";

  const browser = /Edg\//i.test(ua)
    ? "Edge"
    : /OPR\/|Opera/i.test(ua)
      ? "Opera"
      : /Chrome\//i.test(ua)
        ? "Chrome"
        : /Safari\//i.test(ua)
          ? "Safari"
          : /Firefox\//i.test(ua)
            ? "Firefox"
            : "Other";

  const os = /Windows/i.test(ua)
    ? "Windows"
    : /Android/i.test(ua)
      ? "Android"
      : /iPhone|iPad|iOS/i.test(ua)
        ? "iOS"
        : /Mac OS X/i.test(ua)
          ? "macOS"
          : /Linux/i.test(ua)
            ? "Linux"
            : "Other";

  return { device, browser, os };
}

const BOT_PATTERN = /bot|crawler|spider|crawling|preview|headless|lighthouse|pingdom|monitor/i;

export function isBot(userAgent: string | null): boolean {
  return BOT_PATTERN.test(userAgent ?? "");
}
