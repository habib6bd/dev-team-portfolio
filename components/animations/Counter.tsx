"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "./gsap";

type CounterProps = {
  value: number;
  suffix?: string;
  className?: string;
};

/** Counts up from zero the first time it scrolls into view. */
export default function Counter({ value, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const node = ref.current;
      if (!node) return;

      if (prefersReducedMotion()) {
        node.textContent = `${value}${suffix}`;
        return;
      }

      const counter = { current: 0 };

      gsap.to(counter, {
        current: value,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: node, start: "top 90%", once: true },
        onUpdate: () => {
          node.textContent = `${Math.round(counter.current)}${suffix}`;
        },
      });
    },
    { dependencies: [value, suffix] },
  );

  // Server-rendered with the final value, so it is correct without JS and
  // readable by search engines.
  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
