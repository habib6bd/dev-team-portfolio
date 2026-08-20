"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const RANGES = [
  { days: 7, label: "7 days" },
  { days: 30, label: "30 days" },
  { days: 90, label: "90 days" },
];

/** One row of range controls, above the charts they filter. */
export default function RangePicker({ current }: { current: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const select = (days: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("days", String(days));
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  };

  return (
    <div
      role="group"
      aria-label="Date range"
      className={`inline-flex rounded-xl border border-ink-200 bg-white p-1 transition-opacity ${
        pending ? "opacity-60" : ""
      }`}
    >
      {RANGES.map((range) => (
        <button
          key={range.days}
          type="button"
          onClick={() => select(range.days)}
          aria-pressed={current === range.days}
          className={`rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-colors ${
            current === range.days
              ? "bg-ink-900 text-white"
              : "text-ink-600 hover:bg-ink-50"
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
