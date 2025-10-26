// Bounded Context Owner: Community Guild
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

describe("Spaces media approval moderation flow", () => {
  let getMediaApprovals: typeof import("./route").GET;
  let actOnMediaApprovals: typeof import("./route").POST;
  let createPost: typeof import("../posts/route").POST;
  let listPosts: typeof import("../posts/route").GET;

  beforeAll(async () => {
    vi.stubEnv("ENABLE_DEV_SEEDS", "true");
    vi.stubEnv("USE_FIRESTORE_SPACES", "false");

    ({ GET: getMediaApprovals, POST: actOnMediaApprovals } = await import("./route"));
    ({ POST: createPost, GET: listPosts } = await import("../posts/route"));
  });

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  it("lets the Robotics Guild leader approve a pending photo so UB members see it on the board", async () => {
    const createResponse = await createPost(
      new Request("https://hive.test/api/spaces/space-robotics/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorId: "profile-nia",
          authorHandle: "@nia",
          content: "Gallery from tonight's bot build — need a quick review before publishing.",
          attachments: [
            {
              type: "image",
              url: "https://cdn.hive.test/uploads/robotics/gallery-01.jpg",
              title: "Drive base progress"
            }
          ]
        })
      }),
      { params: { spaceId: "space-robotics" } }
    );

    expect(createResponse.status).toBe(201);
    const createdBody = await createResponse.json();
    expect(createdBody.success).toBe(true);
    expect(createdBody.pendingMedia).toHaveLength(1);

    const approvalId: string = createdBody.pendingMedia[0]?.approvalId;
    const postId: string = createdBody.data.id;

    const approvalsResponse = await getMediaApprovals(
      new Request(
        "https://hive.test/api/spaces/space-robotics/media-approvals?actorId=profile-jwrhineh"
      ),
      { params: { spaceId: "space-robotics" } }
    );

    expect(approvalsResponse.status).toBe(200);
    const approvalsBody = await approvalsResponse.json();
    expect(approvalsBody.success).toBe(true);
    expect(approvalsBody.data).toHaveLength(1);
    expect(approvalsBody.data[0]?.id).toBe(approvalId);

    const approveResponse = await actOnMediaApprovals(
      new Request("https://hive.test/api/spaces/space-robotics/media-approvals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          approvalId,
          actorId: "profile-jwrhineh",
          action: "approve"
        })
      }),
      { params: { spaceId: "space-robotics" } }
    );

    expect(approveResponse.status).toBe(200);
    const approveBody = await approveResponse.json();
    expect(approveBody.success).toBe(true);
    expect(approveBody.data.status).toBe("approved");

    const approvalsAfter = await getMediaApprovals(
      new Request(
        "https://hive.test/api/spaces/space-robotics/media-approvals?actorId=profile-jwrhineh"
      ),
      { params: { spaceId: "space-robotics" } }
    );

    const approvalsAfterBody = await approvalsAfter.json();
    expect(approvalsAfterBody.data).toHaveLength(0);

    const postsResponse = await listPosts(
      new Request("https://hive.test/api/spaces/space-robotics/posts"),
      { params: { spaceId: "space-robotics" } }
    );

    const postsBody = await postsResponse.json();
    const approvedPost = (postsBody.data as Array<{ id: string; attachments: unknown[] }>).find(
      (post) => post.id === postId
    );

    expect(approvedPost).toBeDefined();
    expect(Array.isArray(approvedPost?.attachments)).toBe(true);
    expect(approvedPost?.attachments).toEqual([
      expect.objectContaining({
        type: "image",
        url: "https://cdn.hive.test/uploads/robotics/gallery-01.jpg",
        title: "Drive base progress"
      })
    ]);
  });
});
