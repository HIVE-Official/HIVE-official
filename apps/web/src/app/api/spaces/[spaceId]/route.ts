// Bounded Context Owner: Community Guild
import { NextResponse } from "next/server";
import { z } from "zod";
import { spaceService, serializeSpace } from "../../../../server/spaces/service";

const DEFAULT_PROFILE_ID = "profile-jwrhineh";

export async function GET(
  request: Request,
  context: { params: { spaceId: string } }
) {
  const spaceId = context.params.spaceId;
  const snapshot = await spaceService.getSpaceById(spaceId);

  if (!snapshot) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SPACE_NOT_FOUND",
          message: "Space not found"
        }
      },
      { status: 404 }
    );
  }

  const url = new URL(request.url);
  const viewerId = url.searchParams.get("profileId") ?? DEFAULT_PROFILE_ID;

  const serialized = await serializeSpace(snapshot, viewerId, {
    includeMembers: true,
    includeMeta: true,
    includePosts: true
  });

  return NextResponse.json({
    success: true,
    data: serialized
  });
}

const UpdateSpaceSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  tags: z.array(z.string().min(1)).optional(),
  viewerId: z.string().min(1).optional()
});

export async function PATCH(
  request: Request,
  context: { params: { spaceId: string } }
) {
  const json = await request.json().catch(() => null);
  const parsed = UpdateSpaceSchema.safeParse(json ?? {});

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_BODY",
          message: parsed.error.issues.map((issue) => issue.message).join(", ")
        }
      },
      { status: 400 }
    );
  }

  const result = await spaceService.updateDetails(context.params.spaceId, parsed.data);
  if (!result.ok) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "UPDATE_FAILED",
          message: result.error
        }
      },
      { status: 400 }
    );
  }

  const viewerId = parsed.data.viewerId;

  const serialized = await serializeSpace(result.value, viewerId, {
    includeMembers: true,
    includeMeta: true,
    includePosts: true
  });

  return NextResponse.json({
    success: true,
    data: serialized
  });
}
