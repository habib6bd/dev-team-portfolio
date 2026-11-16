import "server-only";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import ip3country from "ip3country";

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

let geoReady = false;

/**
 * Two-letter country code for the request, or null when it can't be worked out.
 *
 * Vercel and Cloudflare add the country as a header. Anywhere else (cPanel)
 * it is looked up offline from the client IP with the bundled ip3country
 * table, so the address never leaves the server. That table is IPv4-only.
 */
export function countryFromHeaders(headerList: Headers): string | null {
  const fromEdge = headerList.get("x-vercel-ip-country") ?? headerList.get("cf-ipcountry");
  // Cloudflare uses XX for "unknown" and T1 for Tor.
  if (fromEdge && /^[A-Za-z]{2}$/.test(fromEdge) && !/^(XX|T1)$/i.test(fromEdge)) {
    return fromEdge.toUpperCase();
  }

  const ip = ipFromHeaders(headerList)?.replace(/^::ffff:/i, "");
  if (!ip || !/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) return null;

  try {
    if (!geoReady) {
      ip3country.init();
      geoReady = true;
    }
    return ip3country.lookupStr(ip);
  } catch (error) {
    console.error("[geo] country lookup failed", error);
    return null;
  }
}

/** "BD" → "Bangladesh". Falls back to the input for anything unrecognised. */
export function countryName(code: string): string {
  if (!/^[A-Za-z]{2}$/.test(code)) return code;
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code.toUpperCase()) ?? code;
  } catch {
    return code;
  }
}

export async function requestContext() {
  const headerList = await headers();
  return {
    ipHash: hashIp(ipFromHeaders(headerList)),
    userAgent: headerList.get("user-agent"),
    referrer: headerList.get("referer"),
    country: countryFromHeaders(headerList),
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
