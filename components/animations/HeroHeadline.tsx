"use client";

import { useRef } from "react";
import { EASE, SplitText, gsap, prefersReducedMotion, useGSAP } from "./gsap";

/**
 * Splits the headline into lines and reveals each from behind a mask.
 * The text stays real DOM text throughout, so it remains selectable and
 * readable by screen readers and crawlers.
 */
export default function HeroHeadline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      gsap.set(node, { opacity: 1 });
      return;
    }

    // autoSplit re-splits on font load and resize; onSplit re-runs the
    // reveal against the new lines so it never animates stale nodes.
    const split = SplitText.create(node, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        gsap.set(node, { opacity: 1 });
        return gsap.from(self.lines, {
          yPercent: 115,
          duration: 1,
          ease: EASE,
          stagger: 0.09,
          delay: 0.1,
        });
      },
    });

    return () => split.revert();
  });

  return (
    <h1 ref={ref} className={className} data-hero-headline>
      {children}
    </h1>
  );
}
