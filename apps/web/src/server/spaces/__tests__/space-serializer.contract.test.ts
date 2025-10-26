// Bounded Context Owner: Community Guild
import { describe, expect, it } from "vitest";
import { SpacePostAggregate } from "@core";
import { serializePost } from "../service";
import { seedSpacePostSnapshots } from "../post-fixtures";

describe("Spaces post serialization contract", () => {
  it("matches the Spaces v1 event sample for Robotics", () => {
    const eventSnapshot = seedSpacePostSnapshots.find(
      (snapshot) => snapshot.id === "post-robotics-event"
    );
    expect(eventSnapshot).toBeDefined();
    if (!eventSnapshot) throw new Error("event snapshot missing");

    const serialized = serializePost(eventSnapshot);

    expect(serialized).toMatchObject({
      id: "post-robotics-event",
      spaceId: "space-robotics",
      kind: "event",
      audience: "campus",
      shareToCampus: true,
      attachments: [
        expect.objectContaining({
          type: "image",
          url: "https://cdn.hive.so/spaces/robotics/rover-test.jpg",
          title: "Rover test flyer"
        })
      ],
      event: expect.objectContaining({
        title: "Autonomous Rover Test Night",
        location: "Foundry Lab",
        startAt: expect.stringMatching(/T/),
        endAt: expect.stringMatching(/T/),
        maxAttendees: 40,
        coHostNames: ["Luca Nguyen"]
      })
    });

    expect(serialized.createdAt).toMatch(/T/);
    expect(serialized.updatedAt).toMatch(/T/);
    expect(serialized.moderationStatus).toBe("active");
  });

  it("serializes standard posts without leaking tool metadata", () => {
    const standardSnapshot = seedSpacePostSnapshots.find(
      (snapshot) => snapshot.id === "post-robotics-1"
    );
    expect(standardSnapshot).toBeDefined();
    if (!standardSnapshot) throw new Error("standard snapshot missing");

    const serialized = serializePost(standardSnapshot);
    expect(serialized.kind).toBe("standard");
    expect(serialized.event).toBeNull();
    expect(serialized.attachments).toEqual([]);
    expect(serialized.toolContext).toBeNull();
  });

  it("preserves tool context and pin metadata for Tool board threads", () => {
    const creation = SpacePostAggregate.create({
      id: "post-tool-thread",
      spaceId: "space-robotics",
      authorId: "profile-jwrhineh",
      authorHandle: "@jacob",
      content: "Poll recap is pinned for review.",
      createdAt: new Date("2025-02-10T18:00:00.000Z"),
      kind: "form",
      pinnedAt: new Date("2025-02-11T18:00:00.000Z"),
      pinExpiresAt: new Date("2025-02-18T18:00:00.000Z"),
      toolContext: {
        toolId: "tool-poll",
        toolSlug: "pulse-poll",
        placementId: "board:recap",
        variant: "recap",
        toolVersion: 3
      }
    });
    expect(creation.ok).toBe(true);
    if (!creation.ok) throw new Error(creation.error);

    const snapshot = creation.value.toSnapshot();
    const serialized = serializePost(snapshot);

    expect(serialized.toolContext).toEqual({
      toolId: "tool-poll",
      toolSlug: "pulse-poll",
      placementId: "board:recap",
      variant: "recap",
      toolVersion: 3
    });
    expect(serialized.pinnedAt).toBe("2025-02-11T18:00:00.000Z");
    expect(serialized.pinExpiresAt).toBe("2025-02-18T18:00:00.000Z");
  });
});
