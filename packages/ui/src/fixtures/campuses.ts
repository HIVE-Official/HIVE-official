// Fixtures: campus list with display name, campusId, domain, and optional logo URL
export type Campus = {
  id: string; // campusId (e.g., "ub-buffalo")
  name: string; // University at Buffalo
  domain: string; // buffalo.edu
  logoUrl?: string; // optional monochrome crest
};

export const CAMPUSES: readonly Campus[] = [
  { id: "ub-buffalo", name: "University at Buffalo", domain: "buffalo.edu" },
  { id: "asu", name: "Arizona State University", domain: "asu.edu" },
  { id: "umich", name: "University of Michigan", domain: "umich.edu" },
  { id: "uiuc", name: "University of Illinois Urbana-Champaign", domain: "illinois.edu" },
  { id: "psu", name: "Penn State", domain: "psu.edu" },
  { id: "rutgers", name: "Rutgers University", domain: "rutgers.edu" },
];

export function findCampusByDomain(domain: string): Campus | undefined {
  const clean = (domain || "").toLowerCase().trim();
  return CAMPUSES.find((c) => clean.endsWith(c.domain));
}

export function maskEmail(email: string): string {
  const [local, host] = email.split("@");
  if (!local || !host) return email;
  if (local.length <= 2) return `${local[0] ?? ""}•@${host}`;
  return `${local[0]}${"•".repeat(Math.max(1, local.length - 2))}${local[local.length - 1]}@${host}`;
}

// Minimal domain typo suggestions (extend as needed)
const DOMAIN_CORRECTIONS: Record<string, string> = {
  "bufflao.edu": "buffalo.edu",
  "umcih.edu": "umich.edu",
  "illiinois.edu": "illinois.edu",
};

export function suggestDomainCorrection(host: string): string | undefined {
  const clean = (host || "").toLowerCase().trim();
  return DOMAIN_CORRECTIONS[clean];
}

