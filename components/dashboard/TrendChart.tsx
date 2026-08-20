"use client";

import { useEffect, useRef, useState } from "react";
import type { TimePoint } from "@/lib/analytics";
import { CHART, formatDate, formatNumber } from "./chart-tokens";

const HEIGHT = 280;
const PADDING = { top: 20, right: 20, bottom: 34, left: 44 };

/**
 * Page views and enquiries over time.
 *
 * One y-axis for both series by deliberate choice — a second scale would let
 * a flat lead line look like a steep one. Leads are also drawn as points on
 * the same axis so the relationship stays honest.
 */
export default function TrendChart({ data }: { data: TimePoint[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(880);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setWidth(Math.max(320, entry.contentRect.width));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (data.length === 0) {
    return <p className="py-16 text-center text-sm text-ink-500">No traffic recorded yet.</p>;
  }

  const innerW = width - PADDING.left - PADDING.right;
  const innerH = HEIGHT - PADDING.top - PADDING.bottom;

  const maxValue = Math.max(1, ...data.map((d) => Math.max(d.views, d.leads)));
  // Round the axis up to a friendly number so gridlines land on whole values.
  const niceMax = niceCeil(maxValue);

  const x = (index: number) =>
    PADDING.left + (data.length === 1 ? innerW / 2 : (index / (data.length - 1)) * innerW);
  const y = (value: number) => PADDING.top + innerH - (value / niceMax) * innerH;

  const linePath = (key: "views" | "leads") =>
    data
      .map((point, index) => `${index === 0 ? "M" : "L"}${x(index).toFixed(1)},${y(point[key]).toFixed(1)}`)
      .join(" ");

  const areaPath = `${linePath("views")} L${x(data.length - 1).toFixed(1)},${PADDING.top + innerH} L${x(0).toFixed(1)},${PADDING.top + innerH} Z`;

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((fraction) => Math.round(niceMax * fraction));
  // Show at most ~7 date labels, regardless of range length.
  const labelEvery = Math.max(1, Math.ceil(data.length / 7));

  const active = hover === null ? null : data[hover];

  const handlePointer = (event: React.PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relative = ((event.clientX - rect.left) / rect.width) * width;
    const index = Math.round(((relative - PADDING.left) / innerW) * (data.length - 1));
    setHover(Math.min(data.length - 1, Math.max(0, index)));
  };

  return (
    <div ref={wrapRef} className="relative">
      <div className="mb-4 flex flex-wrap items-center gap-5">
        <Legend color={CHART.series1} label="Page views" />
        <Legend color={CHART.series2} label="Enquiries" />
      </div>

      <svg
        role="img"
        aria-label={`Page views and enquiries per day over the last ${data.length} days`}
        viewBox={`0 0 ${width} ${HEIGHT}`}
        className="w-full touch-none"
        style={{ height: HEIGHT }}
        onPointerMove={handlePointer}
        onPointerLeave={() => setHover(null)}
      >
        {/* Recessive gridlines and y labels. */}
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={PADDING.left}
              x2={width - PADDING.right}
              y1={y(tick)}
              y2={y(tick)}
              stroke={CHART.grid}
              strokeWidth="1"
            />
            <text
              x={PADDING.left - 10}
              y={y(tick)}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize="11"
              fill={CHART.textMuted}
            >
              {formatNumber(tick)}
            </text>
          </g>
        ))}

        {/* Date labels. */}
        {data.map((point, index) =>
          index % labelEvery === 0 || index === data.length - 1 ? (
            <text
              key={point.date}
              x={x(index)}
              y={HEIGHT - 10}
              textAnchor="middle"
              fontSize="11"
              fill={CHART.textMuted}
            >
              {formatDate(point.date)}
            </text>
          ) : null,
        )}

        <path d={areaPath} fill={CHART.series1} opacity="0.08" />

        <path
          d={linePath("views")}
          fill="none"
          stroke={CHART.series1}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={linePath("leads")}
          fill="none"
          stroke={CHART.series2}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Enquiry markers — a 2px surface ring keeps them readable where the
            two series overlap. */}
        {data.map((point, index) =>
          point.leads > 0 ? (
            <circle
              key={point.date}
              cx={x(index)}
              cy={y(point.leads)}
              r="4.5"
              fill={CHART.series2}
              stroke={CHART.surface}
              strokeWidth="2"
            />
          ) : null,
        )}

        {/* Crosshair. */}
        {hover !== null && active && (
          <g pointerEvents="none">
            <line
              x1={x(hover)}
              x2={x(hover)}
              y1={PADDING.top}
              y2={PADDING.top + innerH}
              stroke={CHART.axis}
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <circle cx={x(hover)} cy={y(active.views)} r="5" fill={CHART.series1} stroke={CHART.surface} strokeWidth="2" />
            <circle cx={x(hover)} cy={y(active.leads)} r="5" fill={CHART.series2} stroke={CHART.surface} strokeWidth="2" />
          </g>
        )}
      </svg>

      {hover !== null && active && (
        <div
          className="pointer-events-none absolute top-10 z-10 min-w-44 -translate-x-1/2 rounded-xl border border-ink-100 bg-white p-3 shadow-lift"
          style={{
            left: `${Math.min(88, Math.max(12, (x(hover) / width) * 100))}%`,
          }}
        >
          <p className="text-xs font-semibold text-ink-900">{formatDate(active.date, "long")}</p>
          <dl className="mt-2 space-y-1.5 text-xs">
            <TooltipRow color={CHART.series1} label="Page views" value={active.views} />
            <TooltipRow color={CHART.series1} label="Visitors" value={active.visitors} muted />
            <TooltipRow color={CHART.series2} label="Enquiries" value={active.leads} />
          </dl>
        </div>
      )}
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-medium text-ink-600">
      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function TooltipRow({
  color,
  label,
  value,
  muted,
}: {
  color: string;
  label: string;
  value: number;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-6">
      <dt className="flex items-center gap-2 text-ink-600">
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full"
          style={{ background: color, opacity: muted ? 0.4 : 1 }}
        />
        {label}
      </dt>
      <dd className="font-semibold text-ink-900">{value}</dd>
    </div>
  );
}

/** Rounds up to 1, 2, or 5 times a power of ten. */
function niceCeil(value: number): number {
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const normalised = value / magnitude;
  const step = normalised <= 1 ? 1 : normalised <= 2 ? 2 : normalised <= 5 ? 5 : 10;
  return step * magnitude;
}
