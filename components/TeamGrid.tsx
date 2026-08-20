"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/animations/gsap";
import type { TeamMember } from "@/data/siteData";

/**
 * The three people a client works with.
 *
 * Cards lean very slightly toward the pointer. The effect is pointer-only and
 * skipped entirely for reduced-motion users — it is decoration, never the way
 * information is conveyed.
 */
export default function TeamGrid({ members }: { members: TeamMember[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !window.matchMedia("(hover: hover)").matches) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-team-card]", root.current);
      const cleanups: (() => void)[] = [];

      cards.forEach((card) => {
        const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
        const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
        const lift = gsap.quickTo(card, "y", { duration: 0.6, ease: "power3.out" });

        const onMove = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;
          rotateY(px * 9);
          rotateX(-py * 9);
          lift(-8);
        };

        const onLeave = () => {
          rotateX(0);
          rotateY(0);
          lift(0);
        };

        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      data-anim="fade-up"
      data-anim-stagger="0.12"
      className="grid gap-6 md:grid-cols-3"
      style={{ perspective: "1200px" }}
    >
      {members.map((member) => (
        <article
          key={member.slug}
          data-anim-child
          data-team-card
          className="group relative flex flex-col rounded-3xl border border-ink-100 bg-white p-7 shadow-soft transition-shadow duration-500 hover:shadow-lift"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-50/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <div className="relative flex items-center gap-4">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-xl font-black tracking-tight text-white shadow-glow">
              {member.initials}
            </span>
            <div className="min-w-0">
              <h3 className="truncate text-lg font-bold text-ink-900">{member.name}</h3>
              <p className="mt-0.5 text-sm font-semibold text-brand-600">{member.role}</p>
            </div>
          </div>

          <p className="relative mt-5 text-sm leading-7 text-ink-600">{member.bio}</p>

          <div className="relative mt-6 flex flex-wrap gap-2">
            {member.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-ink-100 bg-ink-50 px-3 py-1 text-xs font-medium text-ink-600"
              >
                {skill}
              </span>
            ))}
          </div>

          <dl className="relative mt-7 grid grid-cols-2 gap-4 border-t border-ink-100 pt-5">
            {member.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs font-medium uppercase tracking-wider text-ink-400">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-xl font-bold text-ink-900">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <div className="relative mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {member.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-semibold text-ink-500 transition-colors hover:text-brand-600"
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
