// Bounded Context Owner: Community Guild
// Spaces recommendations ranking strategies.

import { Flags } from "../flags";

export interface SpaceSummaryForRanking {
  readonly activityScore?: unknown;
  readonly urgency?: unknown;
  readonly memberCount?: unknown;
}

const toNum = (v: unknown, d = 0) => (typeof v === "number" && Number.isFinite(v) ? v : d);
const toUrgency = (v: unknown): "low" | "medium" | "high" =>
  v === "high" || v === "medium" || v === "low" ? v : "low";

export function rankByActivity<T extends SpaceSummaryForRanking>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => {
    const bScore = toNum(b.activityScore);
    const aScore = toNum(a.activityScore);
    if (bScore !== aScore) return bScore - aScore;
    const order = { high: 3, medium: 2, low: 1 } as const;
    return (
      (order[toUrgency(b.urgency)] - order[toUrgency(a.urgency)]) ||
      (toNum(b.memberCount) - toNum(a.memberCount))
    );
  });
}

export function rankWithBlend<T extends SpaceSummaryForRanking>(items: readonly T[]): T[] {
  // Simple tunable blend: weight activity more, but nudge quieter groups by lowering memberCount tiebreaker.
  return [...items].sort((a, b) => {
    const scoreA = toNum(a.activityScore);
    const scoreB = toNum(b.activityScore);
    if (scoreA !== scoreB) return scoreB - scoreA;
    const urgencyWeight = { high: 3, medium: 2, low: 1 } as const;
    const uA = urgencyWeight[toUrgency(a.urgency)];
    const uB = urgencyWeight[toUrgency(b.urgency)];
    if (uA !== uB) return uB - uA;
    // In blend mode, invert memberCount weight slightly to avoid drowning small identity orgs.
    const mA = toNum(a.memberCount);
    const mB = toNum(b.memberCount);
    return (mA - mB);
  });
}

export function rankRecommended<T extends SpaceSummaryForRanking>(items: readonly T[]): T[] {
  // Feature flag driven: default off (activity only) until profiles/affinity inputs land.
  return Flags.recommendationBlend() ? rankWithBlend(items) : rankByActivity(items);
}

/**
 * Interleave ranked items to avoid more than `cap` consecutive entries of the same type.
 * Default cap is 2. If no alternative types remain, preserves order.
 */
export function interleaveToCapConsecutiveRepeats<T>(
  items: readonly T[],
  typeOf: (item: T) => string,
  cap = 2
): T[] {
  if (cap < 1 || items.length <= cap) return [...items];
  const out: T[] = [];
  const remaining = [...items];
  while (remaining.length) {
    const lastType = out.length ? typeOf(out[out.length - 1]!) : null;
    const tooManyRepeats = (() => {
      if (!lastType) return false;
      let count = 0;
      for (let i = out.length - 1; i >= 0 && typeOf(out[i]!) === lastType; i--) count++;
      return count >= cap;
    })();
    if (!tooManyRepeats) {
      out.push(remaining.shift()!);
      continue;
    }
    const idx = remaining.findIndex((cand) => typeOf(cand) !== lastType);
    if (idx > -1) {
      out.push(remaining.splice(idx, 1)[0]!);
    } else {
      out.push(remaining.shift()!);
    }
  }
  return out;
}

/**
 * Build the final recommended order, applying blend and repeat-capping when enabled.
 * When `Flags.recommendationBlend()` is true, apply a simple non-repeat interleave by `type`.
 */
export function buildRecommendedOrder<T extends SpaceSummaryForRanking & { type?: unknown }>(
  items: readonly T[]
): T[] {
  const ranked = rankRecommended(items);
  if (!Flags.recommendationBlend()) return ranked;
  const getType = (x: T) => (typeof x.type === "string" ? x.type : "unknown");
  return interleaveToCapConsecutiveRepeats(ranked, getType, Flags.recommendationRepeatCap());
}
