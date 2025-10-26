// Bounded Context Owner: Identity & Access Management Guild
import { describe, expect, it } from "vitest";
import {
  InMemorySessionRepository,
  SessionService
} from "@core";
import { UuidGenerator } from "@core/infrastructure/id/uuid-generator";

describe("SessionService", () => {
  it("creates and refreshes sessions", async () => {
    const repo = new InMemorySessionRepository();
    const service = new SessionService(repo, new UuidGenerator(), () => new Date("2025-01-01T00:00:00.000Z"));

    const result = await service.create({ profileId: "profile-1" });
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }

    expect(result.value.expiresAt.getTime()).toBe(
      new Date("2025-01-01T12:00:00.000Z").getTime()
    );

    const refresh = await service.refresh({
      sessionId: result.value.sessionId,
      extendByHours: 4
    });

    expect(refresh.ok).toBe(true);
  });
});
