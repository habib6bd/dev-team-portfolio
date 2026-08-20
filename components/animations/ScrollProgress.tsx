"use client";

import { useRef } from "react";
import { ScrollTrigger, gsap, prefersReducedMotion, useGSAP } from "./gsap";

/** Thin progress bar pinned under the header. */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion() || !bar.current) return;

    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      },
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
    >
      <div
        ref={bar}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600"
      />
    </div>
  );
}
