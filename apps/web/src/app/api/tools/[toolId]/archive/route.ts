// Bounded Context Owner: HiveLab Guild
import { NextResponse } from "next/server";
import { toolService, serializeTool } from "../../../../../server/tools/service";
import { resolveActorProfileId } from "../../../../../server/auth/session-actor";
const BYPASS_AUTH =
  process.env.NEXT_PUBLIC_AUTH_MODE === "mock" ||
  process.env.DISABLE_AUTH === "true" ||
  process.env.ENABLE_DEV_SEEDS === "true";

export async function POST(request: Request, context: { params: { toolId: string } }) {
  const url = new URL(request.url);
  const bodyProfile = url.searchParams.get("profileId");
  const actor = await resolveActorProfileId(request);
  const profileId = actor ?? (BYPASS_AUTH ? bodyProfile ?? null : null);
  if (!profileId) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Sign in to archive tools" } },
      { status: 401 }
    );
  }
  const result = await toolService.archiveTool({ toolId: context.params.toolId, profileId });

  if (!result.ok) {
    const status = result.error === "FORBIDDEN" ? 403 : 400;
    return NextResponse.json(
      { success: false, error: { code: "ARCHIVE_FAILED", message: result.error } },
      { status }
    );
  }

  return NextResponse.json({ success: true, data: serializeTool(result.value) });
}
