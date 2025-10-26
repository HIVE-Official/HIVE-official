// Bounded Context Owner: Community Guild
import { describe, expect, it, beforeAll, afterAll, vi } from "vitest";
import { adaptSpacePost, adaptSpacePosts, type SerializedSpacePost } from "../../spaces/post-adapter";

const basePost: SerializedSpacePost = {
  id: "post-1",
  spaceId: "space-1",
  authorId: "profile-1",
  authorHandle: "@avery",
  content: "Base content",
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:05:00.000Z",
  reactions: 3,
  commentCount: 2,
  tags: ["tag-1"],
  kind: "standard",
  audience: "members",
  origin: "member",
  shareToCampus: false,
  qualityScore: null,
  moderationStatus: "active",
  pinnedAt: null,
  pinExpiresAt: null,
  attachments: [],
  toolContext: null,
  engagementSummary: null
};

describe("adaptSpacePost", () => {
  beforeAll(() => {
    // Freeze time for deterministic pin expiry checks
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-02T00:00:00.000Z"));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("maps core fields and derives visibility", () => {
    const adapted = adaptSpacePost(basePost);

    expect(adapted.id).toBe("post-1");
    expect(adapted.spaceId).toBe("space-1");
    expect(adapted.kind).toBe("standard");
    expect(adapted.visibility).toBe("members_only");
    expect(adapted.author.displayName).toBe("avery");
    expect(adapted.counts).toEqual({ reactions: 3, comments: 2 });
    expect(adapted.moderation).toEqual({ status: "active", isHidden: false });
  });

  it("flags auto hidden posts", () => {
    const adapted = adaptSpacePost({
      ...basePost,
      moderationStatus: "auto_hidden"
    });

    expect(adapted.moderation.isHidden).toBe(true);
    expect(adapted.moderation.status).toBe("auto_hidden");
  });

  it("derives pin status with expiry", () => {
    const adapted = adaptSpacePost({
      ...basePost,
      pinnedAt: "2025-01-01T12:00:00.000Z",
      pinExpiresAt: "2025-01-03T00:00:00.000Z"
    });

    expect(adapted.pin.isPinned).toBe(true);
    expect(adapted.pin.pinnedAt?.toISOString()).toBe("2025-01-01T12:00:00.000Z");
    expect(adapted.pin.expiresAt?.toISOString()).toBe("2025-01-03T00:00:00.000Z");
  });

  it("marks pins as expired when expiry is in the past", () => {
    const adapted = adaptSpacePost({
      ...basePost,
      pinnedAt: "2024-12-25T00:00:00.000Z",
      pinExpiresAt: "2024-12-31T00:00:00.000Z"
    });

    expect(adapted.pin.isPinned).toBe(false);
  });

  it("normalizes attachment types and retains metadata", () => {
    const adapted = adaptSpacePost({
      ...basePost,
      attachments: [
        { type: "image", url: "https://cdn.example.com/img.png" },
        { type: "link", url: "https://news.example.com", title: "News", description: "Campus news" },
        { type: "file", url: "https://cdn.example.com/file.pdf" },
        { type: "mystery", url: "https://cdn.example.com/unknown" }
      ]
    });

    expect(adapted.attachments).toEqual([
      { type: "image", url: "https://cdn.example.com/img.png" },
      { type: "link", url: "https://news.example.com", title: "News", description: "Campus news" },
      { type: "file", url: "https://cdn.example.com/file.pdf" },
      { type: "unknown", url: "https://cdn.example.com/unknown" }
    ]);
  });

  it("identifies tool posts", () => {
    const adapted = adaptSpacePost({
      ...basePost,
      toolContext: {
        toolId: "tool-1",
        toolSlug: "poll",
        placementId: "composer",
        variant: "quick"
      }
    });

    expect(adapted.toolContext).toEqual({
      toolId: "tool-1",
      toolSlug: "poll",
      placementId: "composer",
      variant: "quick"
    });
  });

  it("treats public audience posts as campus-visible", () => {
    const adapted = adaptSpacePost({
      ...basePost,
      audience: "public",
      shareToCampus: true,
      moderationStatus: "removed"
    });

    expect(adapted.visibility).toBe("public");
    expect(adapted.shareToCampus).toBe(true);
    expect(adapted.moderation).toEqual({ status: "removed", isHidden: true });
  });

  it("falls back to author id when handle is missing", () => {
    const adapted = adaptSpacePost({
      ...basePost,
      authorHandle: "",
      authorId: "profile-123"
    });

    expect(adapted.author.displayName).toBe("profile-123");
    expect(adapted.author.handle).toBe("");
  });

  it("passes through engagement summaries and normalizes pin dates", () => {
    const adapted = adaptSpacePost({
      ...basePost,
      pinExpiresAt: "invalid-date",
      engagementSummary: {
        rsvpYes: 3,
        acknowledgements: 2
      }
    });

    expect(adapted.pin.expiresAt).toBeUndefined();
    expect(adapted.pin.isPinned).toBe(false);
    expect(adapted.engagementSummary).toEqual({
      rsvpYes: 3,
      acknowledgements: 2
    });
  });

  it("converts a list of posts", () => {
    const adapted = adaptSpacePosts([basePost, basePost]);
    expect(adapted).toHaveLength(2);
  });
});
