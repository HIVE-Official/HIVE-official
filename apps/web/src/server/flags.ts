// Bounded Context Owner: Platform Guild
// Feature flag utilities with precedence: cookie > env > default

import { cookies as readCookies } from "next/headers";

type FlagKey = "spaces.v2" | "nav.detailSheet" | "recommendation.blend" | "demo.spaces";

const ENV_MAP: Record<FlagKey, string | undefined> = {
  "spaces.v2": process.env.NEXT_PUBLIC_SPACES_V2,
  "nav.detailSheet": process.env.NEXT_PUBLIC_NAV_DETAIL_SHEET,
  "recommendation.blend": process.env.NEXT_PUBLIC_RECO_BLEND,
  "demo.spaces": process.env.NEXT_PUBLIC_DEMO_SPACES,
};

const DEFAULTS: Record<FlagKey, boolean> = {
  "spaces.v2": false,
  "nav.detailSheet": false,
  "recommendation.blend": false,
  "demo.spaces": false,
};

export function getFlagBoolean(key: FlagKey): boolean {
  // Cookie precedence (ff.<key>)
  try {
    // next/headers cookies() is only valid in a request context; avoid type issues in build by soft-casting.
    const c = (readCookies as unknown as () => { get(name: string): { value?: string } | undefined })();
    const cookie = c?.get?.(`ff.${key}`)?.value;
    if (cookie === "1" || cookie === "true") return true;
    if (cookie === "0" || cookie === "false") return false;
  } catch {
    // not in a request context; ignore
  }

  // Env
  const env = ENV_MAP[key];
  if (env === "1" || env === "true") return true;
  if (env === "0" || env === "false") return false;

  // Default
  return DEFAULTS[key];
}

export const Flags = {
  spacesV2(): boolean {
    return getFlagBoolean("spaces.v2");
  },
  navDetailSheet(): boolean {
    // Prefer explicit mode var when present
    const mode = process.env.NEXT_PUBLIC_NAV_DETAIL_MODE?.toLowerCase();
    if (mode === "sheet") return true;
    if (mode === "route") return false;
    return getFlagBoolean("nav.detailSheet");
  },
  /**
   * Optional string mode for navigation detail presentation.
   * Returns 'sheet' | 'route' with a default derived from the boolean flag.
   */
  navDetailMode(): "sheet" | "route" {
    const mode = process.env.NEXT_PUBLIC_NAV_DETAIL_MODE?.toLowerCase();
    if (mode === "sheet" || mode === "route") return mode;
    return getFlagBoolean("nav.detailSheet") ? "sheet" : "route";
  },
  recommendationBlend(): boolean {
    if (process.env.NEXT_PUBLIC_RECO_BLEND_FORCE === "true") {
      return true;
    }
    // Direct env opt-in for tests and local toggling
    if (process.env.NEXT_PUBLIC_RECO_BLEND === "true" || process.env.RECO_BLEND === "true") {
      return true;
    }
    if (process.env.NEXT_PUBLIC_RECO_BLEND_READY !== "true") {
      return false;
    }
    return getFlagBoolean("recommendation.blend");
  },
  /**
   * Cap for consecutive repeats of the same space type in recommendations interleave.
   * Defaults to 2; clamps between 1 and 5.
   */
  recommendationRepeatCap(): number {
    const raw = process.env.NEXT_PUBLIC_RECO_REPEAT_CAP ?? process.env.RECO_REPEAT_CAP;
    const n = Number(raw);
    if (!Number.isFinite(n)) return 2;
    return Math.min(5, Math.max(1, Math.floor(n)));
  },
  /**
   * TTL (ms) for campus-level recommendations cache within the API route process.
   * Defaults to 10s; clamps between 0 (disabled) and 120s.
   */
  recommendationCacheTtlMs(): number {
    const raw = process.env.RECO_CACHE_TTL_MS ?? process.env.NEXT_PUBLIC_RECO_CACHE_TTL_MS;
    const n = Number(raw);
    if (!Number.isFinite(n)) return 10_000;
    return Math.min(120_000, Math.max(0, Math.floor(n)));
  },
  demoSpaces(): boolean {
    return getFlagBoolean("demo.spaces");
  },
};
