// Bounded Context Owner: Community Guild
import { describe, expect, it } from "vitest";
import { SpacePostAggregate } from "./space-post.aggregate";

const BASE_INPUT = {
  id: "post-test",
  spaceId: "space-robotics",
  authorId: "profile-jordan",
  authorHandle: "@jordan",
  content: "Kickoff tonight in Capen 108. Bring soldering irons!",
  createdAt: new Date("2025-02-05T18:00:00.000Z")
} as const;

describe("SpacePostAggregate – moderation & pin safety", () => {
  it("rejects pin expirations that precede the pin timestamp", () => {
    const result = SpacePostAggregate.create({
      ...BASE_INPUT,
      pinnedAt: new Date("2025-02-05T18:05:00.000Z"),
      pinExpiresAt: new Date("2025-02-05T18:00:00.000Z")
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toMatch(/after the pinned timestamp/);
    }
  });

  it("records audit events whenever a leader pins or unpins", () => {
    const creation = SpacePostAggregate.create(BASE_INPUT);
    if (!creation.ok) throw new Error(creation.error);
    const aggregate = creation.value;

    const pinResult = aggregate.pin({
      actorId: "profile-nia",
      reason: "Open house for new members",
      at: new Date("2025-02-05T18:30:00.000Z"),
      expiresAt: new Date("2025-02-07T18:30:00.000Z")
    });
    expect(pinResult.ok).toBe(true);

    const pinEvents = aggregate
      .pullDomainEvents()
      .filter((event) => event.type === "SpacePostPinStatusChanged");
    expect(pinEvents).toHaveLength(1);
    expect(pinEvents[0]?.payload).toMatchObject({
      action: "pinned",
      pinnedAt: new Date("2025-02-05T18:30:00.000Z"),
      pinExpiresAt: new Date("2025-02-07T18:30:00.000Z")
    });

    const unpinResult = aggregate.unpin({
      actorId: "profile-nia",
      reason: "Event has wrapped"
    });
    expect(unpinResult.ok).toBe(true);

    const subsequentEvents = aggregate
      .pullDomainEvents()
      .filter((event) => event.type === "SpacePostPinStatusChanged");
    expect(subsequentEvents).toHaveLength(1);
    expect(subsequentEvents[0]?.payload).toMatchObject({
      action: "unpinned",
      pinnedAt: null,
      pinExpiresAt: null
    });
  });

  it("enforces moderation transitions and emits events when status changes", () => {
    const creation = SpacePostAggregate.create(BASE_INPUT);
    if (!creation.ok) throw new Error(creation.error);
    const aggregate = creation.value;
    aggregate.pullDomainEvents(); // clear SpacePostCreated

    const autoHide = aggregate.setModerationStatus("auto_hidden", {
      actorId: "system-auto",
      reason: "Flagged by students"
    });
    expect(autoHide.ok).toBe(true);

    const escalate = aggregate.setModerationStatus("escalated", {
      actorId: "profile-nia",
      reason: "Needs campus safety review",
      escalatedReason: "Contains sensitive student data"
    });
    expect(escalate.ok).toBe(true);

    const events = aggregate.pullDomainEvents();
    const moderationEvents = events.filter((event) => event.type === "SpacePostModerationChanged");
    expect(moderationEvents).toHaveLength(2);
    expect(moderationEvents[0]?.payload).toMatchObject({
      from: "active",
      to: "auto_hidden"
    });
    expect(moderationEvents[1]?.payload).toMatchObject({
      from: "auto_hidden",
      to: "escalated",
      escalatedReason: "Contains sensitive student data"
    });

    const restore = aggregate.setModerationStatus("active", {
      actorId: "profile-nia",
      reason: "Safety review cleared"
    });
    expect(restore.ok).toBe(true);

    const finalEvents = aggregate
      .pullDomainEvents()
      .filter((event) => event.type === "SpacePostModerationChanged");
    expect(finalEvents).toHaveLength(1);
    expect(finalEvents[0]?.payload).toMatchObject({
      from: "escalated",
      to: "active"
    });
  });
});
