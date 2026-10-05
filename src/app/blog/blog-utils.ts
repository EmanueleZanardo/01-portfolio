/** Format an ISO yyyy-mm-dd date as "Oct 4, 2026" (UTC, stable across timezones). */
export function formatPostDate(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}
