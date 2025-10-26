// Bounded Context Owner: Community Guild
import { describe, it, expect, vi } from "vitest";

describe("Recommendations – interleave to cap repeats", () => {
  it("caps consecutive items of the same type to 2 when blend enabled", async () => {
    // Force blend flag via env before import so Flags picks it up
    const prev = process.env.NEXT_PUBLIC_RECO_BLEND;
    vi.stubEnv("NEXT_PUBLIC_RECO_BLEND", "true");
    const { buildRecommendedOrder } = await import("../recommendations");

    const items = [
      { id: 1, type: "student_organization", activityScore: 90, urgency: "high", memberCount: 100 },
      { id: 2, type: "student_organization", activityScore: 89, urgency: "high", memberCount: 90 },
      { id: 3, type: "student_organization", activityScore: 88, urgency: "medium", memberCount: 80 },
      { id: 4, type: "residential", activityScore: 87, urgency: "medium", memberCount: 70 },
      { id: 5, type: "residential", activityScore: 86, urgency: "low", memberCount: 60 },
      { id: 6, type: "greek_life", activityScore: 85, urgency: "low", memberCount: 50 }
    ];

    const out = buildRecommendedOrder(items);
    // Walk and ensure no more than 2 consecutive of the same type
    let streak = 0;
    let last: string | null = null;
    for (const i of out) {
      if (i.type === last) {
        streak += 1;
      } else {
        streak = 1;
        last = i.type as string;
      }
      expect(streak).toBeLessThanOrEqual(2);
    }

    // restore
    if (prev === undefined) delete process.env.NEXT_PUBLIC_RECO_BLEND; else process.env.NEXT_PUBLIC_RECO_BLEND = prev;
    vi.unstubAllEnvs();
  });
});
