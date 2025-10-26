// Bounded Context Owner: HiveLab Guild
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { toolService } from "../../../../../server/tools/service";
import { requireActorProfileId } from "../../../../../server/auth/session-actor";

export async function POST(request: NextRequest, { params }: { params: { toolId: string } }) {
  const { toolId } = params;
  const body = await request.json().catch(() => ({}));
  const rawSpaceIds = (body as { spaceIds?: unknown }).spaceIds;
  const profileId = await requireActorProfileId(request, false);
  if (!profileId) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Sign in to deploy tools" } },
      { status: 401 }
    );
  }

  const parsed = z.array(z.coerce.string()).nonempty().safeParse(rawSpaceIds);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID", message: "Provide non-empty spaceIds[]" } },
      { status: 400 }
    );
  }

  const result = await toolService.deployTool({ toolId, profileId, spaceIds: parsed.data });
  if (!result.ok) {
    const status = result.error === "FORBIDDEN" ? 403 : 400;
    return NextResponse.json(
      { success: false, error: { code: result.error === "FORBIDDEN" ? "FORBIDDEN" : "DEPLOY_FAILED", message: String(result.error) } },
      { status }
    );
  }

  return NextResponse.json({ success: true, data: { deployedTo: result.value.deployedTo } });
}
