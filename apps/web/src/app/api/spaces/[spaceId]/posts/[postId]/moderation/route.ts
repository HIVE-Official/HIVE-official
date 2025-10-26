// Bounded Context Owner: Community Guild
import { NextResponse } from "next/server";
import { z } from "zod";
import { spaceService, spacePostService, serializePost } from "../../../../../../../server/spaces/service";
import { resolveActorProfileId } from "../../../../../../../server/auth/session-actor";
import { canModerate } from "../../../../../../../server/spaces/policy";

const ModerationSchema = z.object({
  actorId: z.string().min(1),
  action: z.enum(["auto_hide", "unhide", "escalate", "remove"]),
  reason: z.string().trim().min(1).optional(),
  escalatedReason: z.string().trim().min(1).optional()
});

export async function POST(
  request: Request,
  context: { params: { spaceId: string; postId: string } }
) {
  const { spaceId, postId } = context.params;
  const space = await spaceService.getSpaceById(spaceId);

  if (!space) {
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

  const payload = await request.json().catch(() => null);
  const parsed = ModerationSchema.safeParse(payload ?? {});

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

  const resolvedActorId = await resolveActorProfileId(request, parsed.data.actorId);
  if (!resolvedActorId) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Session required" } },
      { status: 401 }
    );
  }
  const { action, reason, escalatedReason } = parsed.data;
  if (!canModerate(space, resolvedActorId)) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "NOT_AUTHORIZED",
          message: "Only space moderators can manage post safety"
        }
      },
      { status: 403 }
    );
  }

  if (action === "escalate" && !escalatedReason && !reason) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "ESCALATION_REASON_REQUIRED",
          message: "Escalations require a reason for governance review"
        }
      },
      { status: 400 }
    );
  }

  const result = await spacePostService.applyModerationAction({
    spaceId,
    postId,
    actorId: resolvedActorId,
    action,
    reason: reason ?? null,
    escalatedReason: escalatedReason ?? null
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "MODERATION_FAILED",
          message: result.error
        }
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    data: serializePost(result.value)
  });
}
