// Bounded Context Owner: Platform Services
// Campus → IANA timezone mapping with a safe default

const DEFAULT_TZ = "America/New_York";

const CAMPUS_TIMEZONES: Record<string, string> = {
  "ub-buffalo": "America/New_York",
};

export function campusTimeZone(campusId?: string | null): string {
  if (!campusId) return DEFAULT_TZ;
  return CAMPUS_TIMEZONES[campusId] ?? DEFAULT_TZ;
}

