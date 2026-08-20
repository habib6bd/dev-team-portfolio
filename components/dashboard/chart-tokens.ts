/**
 * Chart palette.
 *
 * Slots 1 and 2 of the validated categorical order. Verified with the
 * data-viz validator against the light chart surface:
 *   lightness band PASS · chroma floor PASS · CVD separation ΔE 24.7 (protan)
 *   PASS · normal-vision ΔE 33.6 PASS · contrast >= 3:1 PASS
 * Re-run the validator before changing either hex.
 */
export const CHART = {
  series1: "#2a78d6", // blue — page views / primary magnitude
  series2: "#eb6834", // orange — leads
  grid: "#e8eaee",
  axis: "#b0b8c9",
  textPrimary: "#0f172a",
  textSecondary: "#4e5b75",
  textMuted: "#8491aa",
  surface: "#ffffff",
} as const;

/** Sequential blue ramp, light → dark, for magnitude-only bar lists. */
export const SEQUENTIAL = [
  "#cde2fb",
  "#9ec5f4",
  "#6da7ec",
  "#3987e5",
  "#2a78d6",
  "#256abf",
  "#1c5cab",
  "#184f95",
] as const;

export function formatNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 10_000) return `${Math.round(value / 1000)}k`;
  if (value >= 1_000) return `${(value / 1000).toFixed(1)}k`;
  return String(value);
}

export function formatDate(iso: string, style: "short" | "long" = "short"): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    ...(style === "long" ? { year: "numeric" } : {}),
  });
}

/** Percentage change from `previous` to `current`, or null when undefined. */
export function delta(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return ((current - previous) / previous) * 100;
}
