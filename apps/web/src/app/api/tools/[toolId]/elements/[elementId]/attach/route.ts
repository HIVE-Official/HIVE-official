// Bounded Context Owner: HiveLab Guild
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { toolService, serializeTool } from "../../../../../../../server/tools/service";
import { requireActorProfileId } from "../../../../../../../server/auth/session-actor";

const BodySchema = z.object({ eventId: z.string().min(1).nullable().optional() });

export async function POST(request: NextRequest, context: { params: { toolId: string; elementId: string } }) {
  const { toolId, elementId } = context.params;
  const body = await request.json().catch(() => ({}));
  const parsed = BodySchema.safeParse(body ?? {});
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_BODY", message: parsed.error.message } },
      { status: 400 }
    );
  }

  const profileId = await requireActorProfileId(request, false);
  if (!profileId) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Sign in to attach events" } },
      { status: 401 }
    );
  }

  const result = await toolService.updateElementAttachment({
    toolId,
    profileId,
    elementId,
    eventId: parsed.data?.eventId ?? null
  });

  if (!result.ok) {
    return NextResponse.json(
      { success: false, error: { code: result.error === "FORBIDDEN" ? "FORBIDDEN" : "ATTACH_FAILED", message: String(result.error) } },
      { status: result.error === "FORBIDDEN" ? 403 : 400 }
    );
  }

  return NextResponse.json({ success: true, data: serializeTool(result.value) });
}
