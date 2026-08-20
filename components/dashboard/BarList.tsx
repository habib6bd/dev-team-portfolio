import type { Breakdown } from "@/lib/analytics";
import { SEQUENTIAL } from "./chart-tokens";

type BarListProps = {
  data: Breakdown[];
  /** Rendered when there is nothing to show. */
  emptyLabel?: string;
  /** Formats each row's label, e.g. to prettify a URL path. */
  formatLabel?: (label: string) => string;
};

/**
 * Magnitude comparison, low → high. Sequential single hue rather than
 * categorical: these rows are ranks of one measure, not distinct entities,
 * so colour carries magnitude and never identity.
 */
export default function BarList({ data, emptyLabel = "Nothing recorded yet.", formatLabel }: BarListProps) {
  if (data.length === 0) {
    return <p className="py-10 text-center text-sm text-ink-500">{emptyLabel}</p>;
  }

  const max = Math.max(...data.map((row) => row.value), 1);
  const total = data.reduce((sum, row) => sum + row.value, 0);

  return (
    <ol className="space-y-3">
      {data.map((row, index) => {
        const width = (row.value / max) * 100;
        // Darkest step for the top row, lightening down the list.
        const color = SEQUENTIAL[Math.max(0, SEQUENTIAL.length - 1 - index)];

        return (
          <li key={`${row.label}-${index}`}>
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <span className="truncate font-medium text-ink-800" title={row.label}>
                {formatLabel ? formatLabel(row.label) : row.label}
              </span>
              <span className="shrink-0 tabular-nums font-semibold text-ink-900">
                {row.value}
                <span className="ml-1.5 text-xs font-normal text-ink-500">
                  {total > 0 ? `${Math.round((row.value / total) * 100)}%` : ""}
                </span>
              </span>
            </div>

            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-ink-100">
              <div
                className="h-full rounded-full"
                style={{ width: `${Math.max(width, 2)}%`, background: color }}
              />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
