import { CHART, delta, formatNumber } from "./chart-tokens";

type StatTileProps = {
  label: string;
  value: number;
  previous?: number;
  /** Values for the sparkline, oldest first. Omit for a bare tile. */
  spark?: number[];
  hint?: string;
  /** Formats the headline number; defaults to compact notation. */
  format?: (value: number) => string;
};

/**
 * A single headline number. A one-bar bar chart would be the wrong form for
 * this — the reader needs the value, its direction, and its recent shape.
 */
export default function StatTile({ label, value, previous, spark, hint, format }: StatTileProps) {
  const change = previous === undefined ? null : delta(value, previous);
  const rising = change !== null && change > 0;
  const falling = change !== null && change < 0;

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">{label}</p>

      <div className="mt-3 flex items-end justify-between gap-4">
        <p className="text-3xl font-bold leading-none tracking-tight text-ink-900">
          {(format ?? formatNumber)(value)}
        </p>

        {change !== null && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
              rising
                ? "bg-emerald-50 text-emerald-700"
                : falling
                  ? "bg-red-50 text-red-700"
                  : "bg-ink-100 text-ink-600"
            }`}
          >
            {/* Direction is carried by the arrow and the sign, not colour alone. */}
            <span aria-hidden="true">{rising ? "▲" : falling ? "▼" : "="}</span>
            {Math.abs(change).toFixed(0)}%
          </span>
        )}
      </div>

      {spark && spark.length > 1 && <Sparkline values={spark} />}

      <p className="mt-3 text-xs text-ink-500">
        {hint ?? (change !== null ? "vs. the previous period" : " ")}
      </p>
    </div>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const width = 240;
  const height = 36;
  const max = Math.max(...values, 1);
  const step = values.length > 1 ? width / (values.length - 1) : width;

  const points = values.map((value, index) => ({
    x: index * step,
    // Leave 2px of headroom so a peak is never clipped by the viewBox.
    y: height - 2 - (value / max) * (height - 4),
  }));

  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mt-4 h-9 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={area} fill={CHART.series1} opacity="0.1" />
      <path
        d={line}
        fill="none"
        stroke={CHART.series1}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
