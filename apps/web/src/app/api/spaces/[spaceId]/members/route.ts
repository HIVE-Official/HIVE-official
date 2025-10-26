// Bounded Context Owner: Community Guild
import { NextResponse } from "next/server";
import { spaceService, serializeSpace } from "../../../../../server/spaces/service";
import type { SerializedSpaceMember } from "../../../../../server/spaces/types";

const parseLimit = (value: string | null | undefined, fallback = 50) => {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.min(200, Math.floor(n));
};

export async function GET(request: Request, context: { params: { spaceId: string } }) {
  const { spaceId } = context.params;
  const url = new URL(request.url);
  const limit = parseLimit(url.searchParams.get("limit"), 50);
  const cursor = url.searchParams.get("cursor"); // cursor = last profileId seen

  const snapshot = await spaceService.getSpaceById(spaceId);

  if (!snapshot) {
    return NextResponse.json(
      { success: false, error: { code: "SPACE_NOT_FOUND", message: "Space not found" } },
      { status: 404 }
    );
  }

  // Serialize only members to avoid unnecessary work
  const payload = await serializeSpace(snapshot, undefined, { includeMembers: true });
  const members: SerializedSpaceMember[] = Array.isArray(payload.members)
    ? (payload.members as SerializedSpaceMember[])
    : [];

  let startIndex = 0;
  if (cursor) {
    const idx = members.findIndex((m) => String(m.profileId) === cursor);
    if (idx >= 0) startIndex = idx + 1;
  }

  const slice = members.slice(startIndex, startIndex + limit);
  const nextCursor = slice.length === limit ? String(slice[slice.length - 1]?.profileId ?? "") : null;

  return NextResponse.json({
    success: true,
    data: {
      items: slice,
      total: members.length,
      nextCursor
    }
  });
}
