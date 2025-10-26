// Bounded Context Owner: Community Guild
import { describe, expect, it } from "vitest";
import { SpacePostAggregate } from "./space-post.aggregate";
import { assertOk, assertErr } from "../../../shared/testing/assertions";

const buildPost = () => {
  const creation = SpacePostAggregate.create({
    id: "post-1",
    spaceId: "space-1",
    authorId: "author-1",
    authorHandle: "@ava",
    content: "Initial announcement",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    tags: ["announcements"]
  });

  if (!creation.ok) {
    throw new Error(`Failed to create post fixture: ${creation.error}`);
  }

  // drop the creation event so tests can focus on subsequent updates
  creation.value.pullDomainEvents();
  return creation.value;
};

describe("SpacePostAggregate", () => {
  it("pins and unpins a post with audit events and expiration handling", () => {
    const aggregate = buildPost();

    const pinAt = new Date("2025-01-02T00:00:00.000Z");
    const expiresAt = new Date("2025-01-04T00:00:00.000Z");

    assertOk(
      aggregate.pin({
        actorId: "leader-1",
        at: pinAt,
        expiresAt,
        reason: "Highlight robotics kickoff"
      })
    );
    let snapshot = aggregate.toSnapshot();
    expect(snapshot.pinnedAt?.toISOString()).toBe("2025-01-02T00:00:00.000Z");
    expect(snapshot.pinExpiresAt?.toISOString()).toBe("2025-01-04T00:00:00.000Z");

    const eventsAfterPin = aggregate.pullDomainEvents();
    expect(eventsAfterPin).toEqual([
      {
        type: "SpacePostUpdated",
        payload: { postId: "post-1", spaceId: "space-1" }
      },
      {
        type: "SpacePostPinStatusChanged",
        payload: {
          postId: "post-1",
          spaceId: "space-1",
          actorId: "leader-1",
          action: "pinned",
          pinnedAt: new Date("2025-01-02T00:00:00.000Z"),
          pinExpiresAt: new Date("2025-01-04T00:00:00.000Z"),
          previousPinnedAt: null,
          previousPinExpiresAt: null,
          reason: "Highlight robotics kickoff"
        }
      }
    ]);

    assertOk(
      aggregate.unpin(
        { actorId: "leader-1", reason: "Carousel rotation" },
        new Date("2025-01-05T00:00:00.000Z")
      )
    );
    snapshot = aggregate.toSnapshot();
    expect(snapshot.pinnedAt).toBeNull();
    expect(snapshot.pinExpiresAt).toBeNull();

    const eventsAfterUnpin = aggregate.pullDomainEvents();
    expect(eventsAfterUnpin).toEqual([
      {
        type: "SpacePostUpdated",
        payload: { postId: "post-1", spaceId: "space-1" }
      },
      {
        type: "SpacePostPinStatusChanged",
        payload: {
          postId: "post-1",
          spaceId: "space-1",
          actorId: "leader-1",
          action: "unpinned",
          pinnedAt: null,
          pinExpiresAt: null,
          previousPinnedAt: new Date("2025-01-02T00:00:00.000Z"),
          previousPinExpiresAt: new Date("2025-01-04T00:00:00.000Z"),
          reason: "Carousel rotation"
        }
      }
    ]);

    assertErr(
      aggregate.pin({
        actorId: "leader-1",
        at: pinAt,
        expiresAt: new Date("2025-01-01T23:00:00.000Z")
      })
    );
  });

  it("enforces moderation transitions and records audit context", () => {
    const aggregate = buildPost();

    assertOk(
      aggregate.setModerationStatus(
        "auto_hidden",
        { actorId: "system-auto", reason: "Report threshold exceeded" },
        new Date("2025-01-01T02:00:00.000Z")
      )
    );

    let snapshot = aggregate.toSnapshot();
    expect(snapshot.moderationStatus).toBe("auto_hidden");
    expect(snapshot.moderationUpdatedBy).toBe("system-auto");
    expect(snapshot.moderationUpdatedAt.toISOString()).toBe("2025-01-01T02:00:00.000Z");
    expect(snapshot.moderationReason).toBe("Report threshold exceeded");

    assertOk(
      aggregate.setModerationStatus(
        "escalated",
        {
          actorId: "system-auto",
          reason: "Potential safety risk",
          escalatedReason: "Forwarded to Hive team"
        },
        new Date("2025-01-01T02:05:00.000Z")
      )
    );

    snapshot = aggregate.toSnapshot();
    expect(snapshot.moderationStatus).toBe("escalated");
    expect(snapshot.moderationEscalatedBy).toBe("system-auto");
    expect(snapshot.moderationEscalatedAt?.toISOString()).toBe("2025-01-01T02:05:00.000Z");
    expect(snapshot.moderationEscalatedReason).toBe("Forwarded to Hive team");

    const events = aggregate.pullDomainEvents();
    const moderationEvents = events.filter((event) => event.type === "SpacePostModerationChanged");
    expect(moderationEvents).toHaveLength(2);
    const escalationEvent = moderationEvents[moderationEvents.length - 1];
    expect(escalationEvent).toMatchObject({
      type: "SpacePostModerationChanged",
      payload: {
        from: "auto_hidden",
        to: "escalated",
        actorId: "system-auto",
        reason: "Potential safety risk",
        escalatedReason: "Forwarded to Hive team"
      }
    });

    assertOk(
      aggregate.setModerationStatus(
        "escalated",
        { actorId: "system-auto" },
        new Date("2025-01-01T02:10:00.000Z")
      )
    );
  });

  it("enforces audience transitions and records audit context", () => {
    const aggregate = buildPost();

    assertOk(
      aggregate.setAudience(
        "public",
        { actorId: "leader-1", reason: "Campus spotlight" },
        new Date("2025-01-01T03:00:00.000Z")
      )
    );

    let snapshot = aggregate.toSnapshot();
    expect(snapshot.audience).toBe("public");
    expect(snapshot.shareToCampus).toBe(false);

    let events = aggregate.pullDomainEvents();
    expect(events).toEqual([
      {
        type: "SpacePostUpdated",
        payload: { postId: "post-1", spaceId: "space-1" }
      },
      {
        type: "SpacePostAudienceChanged",
        payload: {
          postId: "post-1",
          spaceId: "space-1",
          from: "members",
          to: "public",
          actorId: "leader-1",
          reason: "Campus spotlight",
          previousShareToCampus: false,
          shareToCampus: false
        }
      }
    ]);

    assertOk(
      aggregate.setAudience(
        "campus",
        { actorId: "leader-1" },
        new Date("2025-01-01T03:10:00.000Z")
      )
    );

    events = aggregate.pullDomainEvents();
    expect(events).toEqual([
      {
        type: "SpacePostUpdated",
        payload: { postId: "post-1", spaceId: "space-1" }
      },
      {
        type: "SpacePostAudienceChanged",
        payload: {
          postId: "post-1",
          spaceId: "space-1",
          from: "public",
          to: "campus",
          actorId: "leader-1",
          reason: null,
          previousShareToCampus: false,
          shareToCampus: false
        }
      }
    ]);

    assertErr(aggregate.setAudience("public", { actorId: "" }));
  });

  it("prevents enabling campus sharing for members-only posts", () => {
    const creation = SpacePostAggregate.create({
      id: "members-only",
      spaceId: "space-1",
      authorId: "author-1",
      authorHandle: "@ava",
      content: "Members update",
      createdAt: new Date("2025-01-01T00:00:00.000Z"),
      shareToCampus: true
    });

    assertErr(creation);

    const aggregate = buildPost();
    assertErr(aggregate.setShareToCampus(true));

    assertOk(
      aggregate.setAudience(
        "campus",
        { actorId: "leader-1" },
        new Date("2025-01-01T04:00:00.000Z")
      )
    );
    aggregate.pullDomainEvents();

    assertOk(aggregate.setShareToCampus(true));
    expect(aggregate.toSnapshot().shareToCampus).toBe(true);

    assertOk(
      aggregate.setAudience(
        "members",
        { actorId: "leader-1", reason: "Back to private" },
        new Date("2025-01-01T05:00:00.000Z")
      )
    );

    const snapshot = aggregate.toSnapshot();
    expect(snapshot.audience).toBe("members");
    expect(snapshot.shareToCampus).toBe(false);

    const visibilityEvent = aggregate.pullDomainEvents().find(
      (event) => event.type === "SpacePostAudienceChanged"
    );
    expect(visibilityEvent).toMatchObject({
      payload: {
        from: "campus",
        to: "members",
        previousShareToCampus: true,
        shareToCampus: false
      }
    });
  });

  it("updates engagement summary with sanitisation and supports removals", () => {
    const aggregate = buildPost();

    assertOk(aggregate.updateEngagementSummary({ rsvpYes: 10.7, rsvpMaybe: 2 }));
    let snapshot = aggregate.toSnapshot();
    expect(snapshot.engagementSummary?.rsvpYes).toBe(11);
    expect(snapshot.engagementSummary?.rsvpMaybe).toBe(2);

    assertOk(aggregate.updateEngagementSummary({ rsvpYes: null }));
    snapshot = aggregate.toSnapshot();
    expect(snapshot.engagementSummary?.rsvpYes).toBeUndefined();
    expect(snapshot.engagementSummary?.rsvpMaybe).toBe(2);

    assertErr(aggregate.updateEngagementSummary({ checkIns: -1 }));
  });

  it("increments reactions and comments without allowing negative totals", () => {
    const aggregate = buildPost();

    assertOk(aggregate.incrementReactions(3));
    assertOk(aggregate.incrementCommentCount(2));
    let snapshot = aggregate.toSnapshot();
    expect(snapshot.reactions).toBe(3);
    expect(snapshot.commentCount).toBe(2);

    assertOk(aggregate.incrementReactions(-1));
    assertOk(aggregate.incrementCommentCount(-1));
    snapshot = aggregate.toSnapshot();
    expect(snapshot.reactions).toBe(2);
    expect(snapshot.commentCount).toBe(1);

    assertErr(aggregate.incrementReactions(-5));
    assertErr(aggregate.incrementCommentCount(-5));
  });

  it("replaces attachments and validates quality score bounds", () => {
    const aggregate = buildPost();

    assertOk(
      aggregate.replaceAttachments([
        { type: "link", url: "https://hive.edu/updates", title: "Updates" },
        { type: "image", url: "https://hive.edu/banner.png" },
        { type: "file", url: "" } // invalid, dropped
      ])
    );

    let snapshot = aggregate.toSnapshot();
    expect(snapshot.attachments).toHaveLength(2);
    expect(snapshot.attachments[0]).toMatchObject({
      type: "link",
      title: "Updates"
    });

    assertOk(aggregate.setQualityScore(95));
    snapshot = aggregate.toSnapshot();
    expect(snapshot.qualityScore).toBe(95);

    assertOk(aggregate.setQualityScore(null));
    snapshot = aggregate.toSnapshot();
    expect(snapshot.qualityScore).toBeNull();

    assertErr(aggregate.setQualityScore(120));
  });
});
