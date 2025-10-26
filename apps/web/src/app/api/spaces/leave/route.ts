// Bounded Context Owner: Community Guild
import { NextResponse } from "next/server";
import { z } from "zod";
import { spaceService, serializeSpace } from "../../../../server/spaces/service";

const BodySchema = z.object({
  spaceId: z.string().min(1),
  profileId: z.string().min(1)
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

  const result = await spaceService.leaveSpace(parsed.data);

  if (!result.ok) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "LEAVE_FAILED",
          message: result.error
        }
      },
      { status: 400 }
    );
  }

  const serialized = await serializeSpace(result.value, parsed.data.profileId, {
    includeMembers: true,
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
