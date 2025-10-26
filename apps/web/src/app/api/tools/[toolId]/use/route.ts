// Bounded Context Owner: HiveLab Guild
import { NextRequest, NextResponse } from "next/server";
import { toolService, serializeTool } from "../../../../../server/tools/service";
import { requireActorProfileId } from "../../../../../server/auth/session-actor";

export async function POST(request: NextRequest, context: { params: { toolId: string } }) {
  const profileId = await requireActorProfileId(request, false);
  if (!profileId) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Sign in to record usage" } },
      { status: 401 }
    );
  }

  const result = await toolService.recordUse(context.params.toolId, profileId);
  if (!result.ok) {
    return NextResponse.json(
      { success: false, error: { code: "USAGE_FAILED", message: result.error } },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true, data: serializeTool(result.value) });
}
