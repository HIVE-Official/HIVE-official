export type SchoolStatus = "open" | "first-wave" | "planned";

export interface School {
  readonly name: string;
  readonly slug: string;
  readonly status: SchoolStatus;
  readonly aliases?: readonly string[];
  readonly domain?: string; // best-effort domain hint for auth handoff
}

// Seed — UB first, then planned campuses. Keep shapes stable (no new fields across app).
export const schoolsSeed: readonly School[] = [
  { name: "University at Buffalo", slug: "ub", status: "first-wave", aliases: ["UB", "SUNY Buffalo"], domain: "buffalo.edu" },
  { name: "Buffalo State University", slug: "buff-state", status: "planned", aliases: ["Buff State", "Buffalo State"], domain: "buffalostate.edu" },
  { name: "Syracuse University", slug: "syracuse", status: "planned", aliases: ["Syracuse"], domain: "syracuse.edu" },
  { name: "Cornell University", slug: "cornell", status: "planned", aliases: ["Cornell"], domain: "cornell.edu" },
  { name: "RIT", slug: "rit", status: "planned", aliases: ["Rochester Institute of Technology"], domain: "rit.edu" }
];

export function searchSchools(query: string): readonly School[] {
  const q = query.trim().toLowerCase();
  if (!q) return schoolsSeed;
  return schoolsSeed.filter((s) => {
    if (s.name.toLowerCase().includes(q)) return true;
    if (s.aliases?.some((a) => a.toLowerCase().includes(q))) return true;
    return false;
  });
}

