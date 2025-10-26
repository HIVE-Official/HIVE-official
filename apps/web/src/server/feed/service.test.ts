// Bounded Context Owner: Engagement Guild
import { describe, it, expect } from "vitest";
import { getFeedForProfile } from "./service";

const campusId = "ub-buffalo";
const profileId = "profile-jwrhineh";

describe("Feed service adapter", () => {
  it("returns items sorted by recency and respects limit", async () => {
    const items = await getFeedForProfile({ campusId, profileId, limit: 2 });
    expect(items.length).toBe(2);
    expect(new Date(items[0].createdAt).getTime()).toBeGreaterThanOrEqual(
      new Date(items[1].createdAt).getTime()
    );
  });

  it("applies cursor (before) to filter out newer items", async () => {
    const tenMinutesAgoIso = new Date(Date.now() - 1000 * 60 * 10).toISOString();
    const items = await getFeedForProfile({ campusId, profileId, cursor: tenMinutesAgoIso, limit: 50 });
    expect(items.length).toBeGreaterThan(0);
    items.forEach((item) => {
      expect(new Date(item.createdAt).getTime()).toBeLessThan(new Date(tenMinutesAgoIso).getTime());
    });
  });
});
