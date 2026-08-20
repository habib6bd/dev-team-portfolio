import "server-only";

import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "devteam_session";
const SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "SESSION_SECRET is missing or too short. Set a random string of at least 32 characters in .env.local.",
    );
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

/** Constant-time compare that never throws on a length mismatch. */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function isDashboardPasswordSet(): boolean {
  return Boolean(process.env.DASHBOARD_PASSWORD);
}

export function verifyPassword(candidate: string): boolean {
  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) return false;
  // Hash both sides first so the comparison is length-independent as well
  // as constant-time.
  const hash = (value: string) => createHmac("sha256", getSecret()).update(value).digest("hex");
  return safeEqual(hash(candidate), hash(expected));
}

export async function createSession(): Promise<void> {
  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = `${randomBytes(12).toString("base64url")}.${expiresAt}`;
  const token = `${payload}.${sign(payload)}`;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/** True when the request carries a valid, unexpired, correctly signed session. */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [nonce, expiresAt, signature] = parts;
  const payload = `${nonce}.${expiresAt}`;
  if (!safeEqual(signature, sign(payload))) return false;

  const expiry = Number(expiresAt);
  return Number.isFinite(expiry) && expiry > Date.now();
}

/**
 * Guards a dashboard route. Call this in every page and action that reads or
 * writes client data — a layout check alone is not a sufficient boundary.
 */
export async function requireAuth(): Promise<void> {
  const { redirect } = await import("next/navigation");
  if (!(await isAuthenticated())) redirect("/login");
}
