// Bounded Context Owner: Community Guild
import { NextResponse } from "next/server";
import { z } from "zod";
import { spaceService, serializeSpace } from "../../../../../../server/spaces/service";
import { resolveActorProfileId } from "../../../../../../server/auth/session-actor";
import { canUpdateRoles } from "../../../../../../server/spaces/policy";

const UpdateRoleSchema = z.object({
  profileId: z.string().min(1),
  role: z.enum(["member", "moderator", "admin"]),
  viewerId: z.string().min(1).optional()
});

export async function POST(
  request: Request,
  context: { params: { spaceId: string } }
) {
  const json = await request.json().catch(() => null);
  const parsed = UpdateRoleSchema.safeParse(json ?? {});

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

  // Authorize: only leaders/admins may change roles
  const space = await spaceService.getSpaceById(context.params.spaceId);
  if (!space) {
    return NextResponse.json(
      { success: false, error: { code: "SPACE_NOT_FOUND", message: "Space not found" } },
      { status: 404 }
    );
  }
  const actorId = await resolveActorProfileId(request, parsed.data.viewerId);
  const devBypass = process.env.ENABLE_DEV_SEEDS === "true" || process.env.DISABLE_AUTH === "true";
  if (!actorId && !devBypass) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Session required" } },
      { status: 401 }
    );
  }
  if (!devBypass && (!actorId || !canUpdateRoles(space, actorId))) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_AUTHORIZED", message: "Only leaders or admins can update member roles" } },
      { status: 403 }
    );
  }

  const result = await spaceService.updateMemberRole(context.params.spaceId, parsed.data.profileId, parsed.data.role);
  if (!result.ok) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "ROLE_UPDATE_FAILED",
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
