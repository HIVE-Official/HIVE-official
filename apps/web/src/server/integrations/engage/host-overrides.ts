// Bounded Context Owner: Community Guild
// Ops-tunable overrides for Engage host → Space mapping/classification
import type { SpaceType } from "@core";

export type HostOverride = {
  readonly spaceId?: string;         // Force mapping to an existing space id
  readonly type?: SpaceType;         // Force category override
  readonly normalizeTo?: string;     // Normalize host name (alias consolidation)
  readonly skip?: boolean;           // Skip creating/importing for this host
  readonly tags?: readonly string[]; // Extra tags to add on space creation
};

// Keyed by lower-cased host name
export const HOST_OVERRIDES: Record<string, HostOverride> = {
  // Example entries:
  // "ub club rowing team": { normalizeTo: "UB Club Rowing Team" },
  // "career design center": { type: "university_organization" },
  // "sample org to skip": { skip: true },
  // "some alias": { spaceId: "org-ub-anime-club" },
};

export const normalizeHostKey = (name: string) => name.trim().toLowerCase();

export function getHostOverride(hostName: string): HostOverride | null {
  const key = normalizeHostKey(hostName);
  return HOST_OVERRIDES[key] ?? null;
}

