"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "@/components/animations/gsap";
import { reviews } from "@/data/siteData";

const INTERVAL = 6000;

export default function ReviewSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const quoteRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((next: number) => {
    setIndex((next + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % reviews.length), INTERVAL);
    return () => clearInterval(timer);
  }, [paused]);

  // Crossfade the quote whenever the slide changes.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !quoteRef.current) return;
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, ease: EASE },
      );
    },
    { dependencies: [index] },
  );

  const review = reviews[index]!;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-3xl border border-ink-100 bg-white p-8 shadow-soft sm:p-10">
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          className="h-9 w-9 fill-brand-200"
        >
          <path d="M12.9 6.4C7.9 8.7 5 12.9 5 18.2 5 23 7.7 26 11.4 26c3 0 5.3-2.2 5.3-5.1 0-2.8-2-4.9-4.6-4.9-.5 0-1.2.1-1.4.2.6-2.6 3-5.4 5.6-6.8l-3.4-3zm14.2 0c-5 2.3-7.9 6.5-7.9 11.8 0 4.8 2.7 7.8 6.4 7.8 3 0 5.3-2.2 5.3-5.1 0-2.8-2-4.9-4.6-4.9-.5 0-1.2.1-1.4.2.6-2.6 3-5.4 5.6-6.8l-3.4-3z" />
        </svg>

        {/* Announce the new quote to screen readers as it rotates. */}
        <div ref={quoteRef} aria-live="polite" aria-atomic="true">
          <blockquote className="mt-5 text-pretty text-lg leading-8 text-ink-700 sm:text-xl sm:leading-9">
            {review.text}
          </blockquote>

          <figcaption className="mt-7 flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white">
              {review.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </span>
            <span>
              <span className="block font-bold text-ink-900">{review.name}</span>
              <span className="block text-sm text-ink-500">
                {review.role}, {review.company}
              </span>
            </span>
          </figcaption>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        {/* Plain buttons, not a tablist: there is no tabpanel here, and an
            incomplete ARIA pattern is worse for a screen reader than none. */}
        <div className="flex gap-2">
          {reviews.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-current={i === index}
              aria-label={`Show review from ${item.name}`}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all duration-400 ${
                i === index ? "w-9 bg-brand-600" : "w-2.5 bg-ink-200 hover:bg-ink-300"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous review"
            className="grid h-10 w-10 place-items-center rounded-full border border-ink-200 text-ink-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next review"
            className="grid h-10 w-10 place-items-center rounded-full border border-ink-200 text-ink-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
