"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "./gsap";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * A link that leans slightly toward the cursor. Pointer-driven only — it is
 * disabled on touch and for reduced-motion users, and never affects layout.
 */
export default function MagneticButton({ href, children, className }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion() || !window.matchMedia("(hover: hover)").matches) return;

    const move = gsap.quickTo(node, "x", { duration: 0.5, ease: "power3.out" });
    const moveY = gsap.quickTo(node, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      // Pull at most a quarter of the button's own size.
      move((event.clientX - (rect.left + rect.width / 2)) * 0.25);
      moveY((event.clientY - (rect.top + rect.height / 2)) * 0.25);
    };

    const onLeave = () => {
      move(0);
      moveY(0);
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);

    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  });

  return (
    <Link ref={ref} href={href} className={className}>
      {children}
    </Link>
  );
}
