// Bounded Context Owner: Rituals Guild
import { describe, it, expect } from "vitest";
import { InMemoryRitualRepository, RitualApplicationService } from "@core";

describe("RitualApplicationService", () => {
  it("creates and lists rituals for a profile", async () => {
    const repo = new InMemoryRitualRepository();
    const service = new RitualApplicationService({ repository: repo, clock: () => new Date("2025-01-01T00:00:00.000Z") });

    const create = await service.create({
      id: "ritual-test",
      campusId: "ub-buffalo",
      creatorId: "profile-jwrhineh",
      name: "Morning Focus",
      description: "10 minutes of focus to start the day.",
      schedule: { cadence: "daily", timeOfDay: "08:00" }
    });
    expect(create.ok).toBe(true);

    // Join viewer
    const join = await service.join("ritual-test", "profile-jwrhineh");
    expect(join.ok).toBe(true);

    // Should list at least this ritual for the viewer now
    const list = await service.listForProfile("profile-jwrhineh");
    expect(list.some((r) => r.id === "ritual-test")).toBe(true);
  });
});
