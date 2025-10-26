// Bounded Context Owner: Community Guild
import { NextResponse } from "next/server";
import { z } from "zod";
import { spaceService } from "../../../../../../../server/spaces/service";
import { commentsService, type SpacePostComment } from "../../../../../../../server/spaces/comments.service";

const CreateSchema = z.object({
  authorId: z.string().min(1),
  authorName: z.string().min(1),
  authorHandle: z.string().min(1),
  content: z.string().min(1)
});

export async function GET(request: Request, context: { params: { spaceId: string; postId: string } }) {
  const space = await spaceService.getSpaceById(context.params.spaceId);
  if (!space) {
    return NextResponse.json({ success: false, error: { code: "SPACE_NOT_FOUND", message: "Space not found" } }, { status: 404 });
  }
  const url = new URL(request.url);
  const limit = Math.max(1, Math.min(100, Number(url.searchParams.get("limit") ?? 20)));
  const cursor = url.searchParams.get("cursor") ?? undefined;
  const { items, nextCursor } = await commentsService.list(context.params.spaceId, context.params.postId, limit, cursor);
  return NextResponse.json({
    success: true,
    data: items.map((c: SpacePostComment) => ({
      id: c.id,
      authorId: c.authorId,
      authorName: c.authorName,
      authorHandle: c.authorHandle,
      content: c.content,
      createdAt: c.createdAt.toISOString()
    })),
    cursor: nextCursor
  });
}

export async function POST(request: Request, context: { params: { spaceId: string; postId: string } }) {
  const space = await spaceService.getSpaceById(context.params.spaceId);
  if (!space) {
    return NextResponse.json({ success: false, error: { code: "SPACE_NOT_FOUND", message: "Space not found" } }, { status: 404 });
  }
  const json = await request.json().catch(() => null);
  const parsed = CreateSchema.safeParse(json ?? {});
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_BODY", message: parsed.error.issues.map((i) => i.message).join(", ") } },
      { status: 400 }
    );
  }
  const created = await commentsService.add({
    spaceId: context.params.spaceId,
    postId: context.params.postId,
    ...parsed.data
  });
  return NextResponse.json({ success: true, data: { ...created, createdAt: created.createdAt.toISOString() } }, { status: 201 });
}
