// UI helper: timezone-aware formatting without extra deps

const TZ_ABBREV: Record<string, string> = {
  "America/New_York": "ET",
};

export function tzAbbrev(timeZone: string): string | undefined {
  return TZ_ABBREV[timeZone];
}

export function formatInTimeZone(
  dateLike: string | number | Date,
  timeZone: string,
  options: Intl.DateTimeFormatOptions
): string {
  const date = new Date(dateLike);
  // If invalid, return a safe placeholder
  if (Number.isNaN(date.getTime())) return "Invalid date";
  const fmt = new Intl.DateTimeFormat(undefined, { timeZone, ...options });
  return fmt.format(date);
}

export function formatEventRangeInTimeZone(
  start: string | number | Date,
  end: string | number | Date,
  timeZone: string
): string {
  const startStr = formatInTimeZone(start, timeZone, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  const endStr = formatInTimeZone(end, timeZone, { hour: "numeric", minute: "2-digit" });
  return `${startStr} – ${endStr}`;
}

export function formatWithAbbrev(
  dateLike: string | number | Date,
  timeZone: string,
  options: Intl.DateTimeFormatOptions
): string {
  const base = formatInTimeZone(dateLike, timeZone, options);
  const abbr = tzAbbrev(timeZone);
  return abbr ? `${base} ${abbr}` : base;
}

export function formatEventRangeWithAbbrev(
  start: string | number | Date,
  end: string | number | Date,
  timeZone: string
): string {
  const range = formatEventRangeInTimeZone(start, end, timeZone);
  const abbr = tzAbbrev(timeZone);
  return abbr ? `${range} ${abbr}` : range;
}
