// Bounded Context Owner: Community Guild
import { NextResponse } from "next/server";
import { z } from "zod";
import { spaceService, serializeSpace, spaceJoinRequestService } from "../../../../server/spaces/service";

const BodySchema = z.object({
  spaceId: z.string().min(1),
  profileId: z.string().min(1),
  campusId: z.string().default("ub-buffalo")
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = BodySchema.safeParse(json ?? {});

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

  const result = await spaceService.joinSpace({
    spaceId: parsed.data.spaceId,
    profileId: parsed.data.profileId,
    campusId: parsed.data.campusId
  });

  if (!result.ok) {
    if (result.error === "JOIN_REQUEST_REQUIRED") {
      const req = await spaceJoinRequestService.request({ spaceId: parsed.data.spaceId, profileId: parsed.data.profileId });
      if (req.ok) {
        return NextResponse.json(
          {
            success: true,
            data: {
              joinRequest: {
                id: req.value.id,
                spaceId: req.value.spaceId,
                profileId: req.value.profileId,
                requestedAt: req.value.requestedAt.toISOString(),
                status: req.value.status
              }
            }
          },
          { status: 202 }
        );
      }
      return NextResponse.json(
        { success: false, error: { code: "JOIN_REQUEST_FAILED", message: req.error } },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "JOIN_FAILED",
          message: result.error
        }
      },
      { status: 400 }
    );
  }

  const serialized = await serializeSpace(result.value, parsed.data.profileId, {
    includeMembers: true,
    // Keep meta out of join response and avoid heavy fetches in hot path
    includeMeta: false,
    includePosts: false,
    includeActivityMetrics: false,
    includeTools: false
  });

  return NextResponse.json({
    success: true,
    data: serialized
  });
}
