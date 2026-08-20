"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

/**
 * Records a page view on first load and on every client-side navigation.
 * Fire-and-forget: a failed beacon never affects the page.
 */
function TrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastSent = useRef<string | null>(null);

  useEffect(() => {
    // The dashboard is our own tool — its traffic is not client traffic.
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/login")) return;

    const query = searchParams.toString();
    const path = query ? `${pathname}?${query}` : pathname;

    // React runs effects twice in dev StrictMode; only send each path once.
    // The request is deliberately not aborted on cleanup — that would cancel
    // the beacon on the second pass and lose the view.
    if (lastSent.current === path) return;
    lastSent.current = path;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path,
        referrer: document.referrer || null,
        screenWidth: window.innerWidth,
      }),
      keepalive: true,
    }).catch(() => {
      // Analytics is best-effort; ignore network errors.
    });
  }, [pathname, searchParams]);

  return null;
}

/**
 * `useSearchParams` needs a Suspense boundary so it doesn't opt every page
 * out of static rendering.
 */
export default function VisitTracker() {
  return (
    <Suspense fallback={null}>
      <TrackerInner />
    </Suspense>
  );
}
