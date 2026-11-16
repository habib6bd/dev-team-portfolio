/**
 * The team works from Bangladesh, so the dashboard shows Bangladesh time.
 * Without an explicit zone, server-rendered dates use whatever zone the host
 * machine happens to be in (UTC on most servers).
 */
export const TIME_ZONE = "Asia/Dhaka";

type DateInput = Date | string | number;

export function formatDate(value: DateInput, options: Intl.DateTimeFormatOptions): string {
  return new Date(value).toLocaleDateString("en-GB", { ...options, timeZone: TIME_ZONE });
}

export function formatDateTime(value: DateInput, options: Intl.DateTimeFormatOptions): string {
  return new Date(value).toLocaleString("en-GB", { ...options, timeZone: TIME_ZONE });
}
