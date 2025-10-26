// Bounded Context Owner: Community Guild
import { describe, expect, it, vi } from "vitest";
import type { SpaceAggregate } from "../../domain/spaces/aggregates/space.aggregate";
import type { SpaceRepository } from "../../domain/spaces/space.repository";
import { SpaceApplicationService } from "./space.application.service";
import { assertOk } from "../../shared/testing/assertions";

class InMemoryRepo implements SpaceRepository {
  private readonly store = new Map<string, SpaceAggregate>();

  async findById(spaceId: string): Promise<SpaceAggregate | null> {
    return this.store.get(spaceId) ?? null;
  }

  async listByCampus(): Promise<SpaceAggregate[]> {
    return Array.from(this.store.values());
  }

  async save(space: SpaceAggregate): Promise<void> {
    this.store.set(space.getId(), space);
  }
}

describe("SpaceApplicationService", () => {
  it("creates a space with leader membership", async () => {
    const repository = new InMemoryRepo();
    const service = new SpaceApplicationService({ repository });

    const result = await service.createSpace({
      spaceId: "space-test",
      campusId: "ub-buffalo",
      leaderId: "leader-1",
      name: "Study Buddies",
      description: "Group coordination for nightly study sessions.",
      type: "student_organization",
      visibility: "campus",
      tags: ["study", "support"],
      settings: { maxMembers: 50 }
    });

    assertOk(result);
    const snapshot = result.value;
    expect(snapshot.leaderId).toBe("leader-1");
    expect(snapshot.members).toHaveLength(1);
    expect(snapshot.members[0]?.role).toBe("leader");
    expect(snapshot.members[0]?.profileId).toBe("leader-1");
  });

  it("dispatches domain events when members join", async () => {
    const repository = new InMemoryRepo();
    const publish = vi.fn(async (_events: readonly unknown[], _occurredAt: Date) => undefined);
    const service = new SpaceApplicationService({ repository, events: { publish } });

    const created = await service.createSpace({
      spaceId: "space-test",
      campusId: "ub-buffalo",
      leaderId: "leader-1",
      name: "Study Buddies",
      description: "Group coordination for nightly study sessions.",
      type: "student_organization",
      visibility: "campus"
    });
    assertOk(created);
    expect(publish).toHaveBeenCalledTimes(1);

    publish.mockClear();

    const joined = await service.joinSpace({
      spaceId: "space-test",
      profileId: "student-1",
      campusId: "ub-buffalo"
    });
    assertOk(joined);
    expect(publish).toHaveBeenCalledTimes(1);
    const call = publish.mock.calls[0];
    expect(call).toBeDefined();
    const [events, occurredAt] = call!;
    expect(Array.isArray(events)).toBe(true);
    const firstEvent = (events?.[0] ?? {}) as { type?: string; payload?: Record<string, unknown> };
    expect(firstEvent.type).toBe("SpaceMemberJoined");
    expect(firstEvent.payload).toMatchObject({
      spaceId: "space-test",
      profileId: "student-1",
      role: "member"
    });
    expect(occurredAt).toBeInstanceOf(Date);
  });
});
