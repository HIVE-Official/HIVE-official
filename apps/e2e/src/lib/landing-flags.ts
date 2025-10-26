"use client";

// Feature flags for the landing page. Read-only at runtime from
// localStorage and URL params so we can toggle without redeploying.

export type LandingState = "prelaunch" | "live";

export interface LandingFlags {
  readonly state: LandingState;
  readonly countdownEnabled: boolean;
  readonly schoolsRequestEnabled: boolean;
  readonly referralsEnabled: boolean;
}

const DEFAULT_FLAGS: LandingFlags = {
  state: "prelaunch",
  countdownEnabled: false,
  schoolsRequestEnabled: true,
  referralsEnabled: false
};

function getFromLocalStorage(): Partial<LandingFlags> {
  try {
    const raw = localStorage.getItem("hive.landing.flags");
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Partial<LandingFlags>;
    return parsed ?? {};
  } catch {
    return {};
  }
}

function getFromUrl(): Partial<LandingFlags> {
  if (typeof window === "undefined") return {};
  try {
    const url = new URL(window.location.href);
    const state = url.searchParams.get("state");
    const countdown = url.searchParams.get("countdown");
    const schoolsRequest = url.searchParams.get("schoolsRequest");
    const referrals = url.searchParams.get("referrals");

    const out: Partial<LandingFlags> = {};
    if (state === "prelaunch" || state === "live") out.state = state;
    if (countdown != null) out.countdownEnabled = countdown === "1" || countdown === "true";
    if (schoolsRequest != null) out.schoolsRequestEnabled = schoolsRequest === "1" || schoolsRequest === "true";
    if (referrals != null) out.referralsEnabled = referrals === "1" || referrals === "true";
    return out;
  } catch {
    return {};
  }
}

export function getLandingFlags(): LandingFlags {
  if (typeof window === "undefined") return DEFAULT_FLAGS; // SSR fallback
  const merged: LandingFlags = {
    ...DEFAULT_FLAGS,
    ...getFromLocalStorage(),
    ...getFromUrl()
  };
  return merged;
}

export function setLandingFlags(next: Partial<LandingFlags>): void {
  try {
    const current = getFromLocalStorage();
    const merged = { ...DEFAULT_FLAGS, ...current, ...next } satisfies LandingFlags;
    localStorage.setItem("hive.landing.flags", JSON.stringify(merged));
  } catch {
    // no-op
  }
}

