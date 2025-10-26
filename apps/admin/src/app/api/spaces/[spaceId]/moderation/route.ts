// Bounded Context Owner: Governance Guild
import { NextResponse } from "next/server";
import { isAdmin } from "@admin/server/auth";
import { loadAdminSpaceContext } from "@admin/server/space-context";

const DAY_MS = 24 * 60 * 60 * 1000;

export async function GET(
  _request: Request,
  { params }: { params: { spaceId: string } }
) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_AUTHORIZED", message: "Admin session required." } },
      { status: 403 }
    );
  }

  const context = await loadAdminSpaceContext(params.spaceId);
  if (!context) {
    return NextResponse.json(
      { success: false, error: { code: "SPACE_NOT_FOUND", message: "Space not found." } },
      { status: 404 }
    );
  }

  const now = Date.now();
  const openItems = context.posts
    .filter((post) => post.moderationStatus && post.moderationStatus !== "active")
    .map((post) => ({
      postId: post.id,
      status: post.moderationStatus,
      createdAt: post.createdAt,
      authorId: post.authorId,
      excerpt: post.content.slice(0, 120),
      audience: post.audience
    }));

  const autoHidden7d = context.posts.filter(
    (post) =>
      post.moderationStatus === "auto_hidden" &&
      new Date(post.createdAt).getTime() >= now - 7 * DAY_MS
  ).length;

  const safetyLevel =
    openItems.length >= 5 || autoHidden7d >= 3
      ? "high"
      : openItems.length > 0 || autoHidden7d > 0
      ? "medium"
      : "low";

  const payload = {
    spaceId: params.spaceId,
    generatedAt: new Date().toISOString(),
    queue: openItems,
    safetyPulse: {
      level: safetyLevel,
      openCount: openItems.length,
      autoHidden7d
    },
    notes:
      "Moderation feed highlights auto-hidden posts and leader actions. Coach student leaders to resolve items within 24 hours to keep trust high."
  };

  return NextResponse.json({ success: true, data: payload });
}
