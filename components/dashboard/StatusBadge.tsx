import type { LeadStatus } from "@/lib/validation";

/**
 * Status colours are reserved for state and never reused as chart series.
 * Each badge carries a label, so state is never conveyed by colour alone.
 */
const STYLES: Record<LeadStatus, string> = {
  new: "bg-brand-50 text-brand-700 border-brand-200",
  contacted: "bg-amber-50 text-amber-800 border-amber-200",
  won: "bg-emerald-50 text-emerald-800 border-emerald-200",
  archived: "bg-ink-100 text-ink-600 border-ink-200",
};

const LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  won: "Won",
  archived: "Archived",
};

export default function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
        STYLES[status] ?? STYLES.new
      }`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {LABELS[status] ?? status}
    </span>
  );
}
