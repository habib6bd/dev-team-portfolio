"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { LEAD_STATUSES } from "@/lib/validation";

const TABS = [{ value: "all", label: "All" }, ...LEAD_STATUSES.map((status) => ({
  value: status,
  label: status.charAt(0).toUpperCase() + status.slice(1),
}))];

export default function LeadFilters({
  status,
  search,
  counts,
}: {
  status: string;
  search: string;
  counts: Record<string, number>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [term, setTerm] = useState(search);

  const push = (next: URLSearchParams) => {
    startTransition(() => router.push(`${pathname}?${next.toString()}`));
  };

  const setStatus = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete("status");
    else params.set("status", value);
    push(params);
  };

  // Debounce so a query fires once the visitor stops typing, not per keypress.
  useEffect(() => {
    if (term === search) return;
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (term) params.set("q", term);
      else params.delete("q");
      push(params);
    }, 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  return (
    <div className={`flex flex-wrap items-center gap-3 transition-opacity ${pending ? "opacity-60" : ""}`}>
      <div role="group" aria-label="Filter by status" className="inline-flex rounded-xl border border-ink-200 bg-white p-1">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setStatus(tab.value)}
            aria-pressed={status === tab.value}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
              status === tab.value ? "bg-ink-900 text-white" : "text-ink-600 hover:bg-ink-50"
            }`}
          >
            {tab.label}
            {counts[tab.value] !== undefined && (
              <span className={`ml-1.5 text-xs ${status === tab.value ? "text-white/70" : "text-ink-400"}`}>
                {counts[tab.value]}
              </span>
            )}
          </button>
        ))}
      </div>

      <label className="relative flex-1 sm:max-w-xs">
        <span className="sr-only">Search enquiries</span>
        <input
          type="search"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Search name, email or message…"
          className="w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
        />
      </label>
    </div>
  );
}
