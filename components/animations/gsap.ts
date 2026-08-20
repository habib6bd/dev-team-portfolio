"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Registering here means every component imports plugins from one place and
// registration happens exactly once, no matter the import order.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/** Signature easing for the site — a fast start that settles gently. */
export const EASE = "power3.out";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
