"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { EASE, ScrollTrigger, gsap, prefersReducedMotion, useGSAP } from "./gsap";

/**
 * Scroll-reveal for the whole site.
 *
 * Any element (including one rendered by a Server Component) can opt in with
 * `data-anim="fade-up"`. That keeps pages on the server while still getting
 * motion — no "use client" needed just to animate a section.
 *
 * Supported values: fade, fade-up, fade-down, fade-left, fade-right, zoom.
 * Optional: data-anim-delay="0.15", data-anim-stagger="0.08" (on a parent,
 * to stagger its `[data-anim-child]` descendants).
 */
const VARIANTS: Record<string, gsap.TweenVars> = {
  fade: { opacity: 0 },
  "fade-up": { opacity: 0, y: 40 },
  "fade-down": { opacity: 0, y: -32 },
  "fade-left": { opacity: 0, x: -40 },
  "fade-right": { opacity: 0, x: 40 },
  zoom: { opacity: 0, scale: 0.94 },
};

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const targets = gsap.utils.toArray<HTMLElement>("[data-anim]");

      if (reduced) {
        // Respect the OS setting: show everything, animate nothing.
        gsap.set(targets, { opacity: 1, clearProps: "transform" });
        return;
      }

      targets.forEach((element) => {
        const variant = element.dataset.anim || "fade-up";
        const from = VARIANTS[variant] ?? VARIANTS["fade-up"];
        const delay = Number(element.dataset.animDelay ?? 0);
        const stagger = Number(element.dataset.animStagger ?? 0);
        const children = stagger
          ? gsap.utils.toArray<HTMLElement>("[data-anim-child]", element)
          : [];

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            // Fire a little before the element reaches the fold, so it has
            // finished settling by the time the reader looks at it.
            start: "top 88%",
            once: true,
          },
          delay,
        });

        timeline.fromTo(
          element,
          from,
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.85, ease: EASE, clearProps: "transform" },
        );

        if (children.length) {
          timeline.from(
            children,
            { opacity: 0, y: 24, duration: 0.6, ease: EASE, stagger, clearProps: "all" },
            "-=0.55",
          );
        }
      });

      // Layout can shift as fonts and images land; recalculate once settled.
      ScrollTrigger.refresh();
    },
    // Re-scan after every client-side navigation.
    { scope: root, dependencies: [usePathname()], revertOnUpdate: true },
  );

  return (
    <div ref={root} data-anim-root>
      {children}
    </div>
  );
}
