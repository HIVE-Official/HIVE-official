// Lightweight .ics generator for single events (UTC)
export function buildIcs({
  title,
  description,
  location,
  start,
  end,
}: {
  title: string;
  description?: string | null;
  location?: string | null;
  start: Date;
  end: Date;
}): string {
  const fmt = (d: Date) =>
    `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}T${String(d.getUTCHours()).padStart(2, "0")}${String(d.getUTCMinutes()).padStart(2, "0")}00Z`;
  const uid = `${Date.now()}@hive`
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//HIVE//Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${escapeLine(title)}`,
    description ? `DESCRIPTION:${escapeLine(description)}` : undefined,
    location ? `LOCATION:${escapeLine(location)}` : undefined,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean).join("\r\n");
}

function escapeLine(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

