// Bounded Context Owner: HiveLab Guild
import { NextResponse, type NextRequest } from "next/server";
import { searchAttachableEvents } from "../../../../../../../server/tools/event-attach.service";
import { requireActorProfileId } from "../../../../../../../server/auth/session-actor";

export async function GET(request: NextRequest, context: { params: { toolId: string; elementId: string } }) {
  const { toolId, elementId } = context.params;
  const qp = request.nextUrl.searchParams;

  const spaceId = (qp.get("spaceId") ?? "").trim();
  if (!spaceId) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_QUERY", message: "spaceId is required" } },
      { status: 400 }
    );
  }

  const profileId = await requireActorProfileId(request, true);
  if (!profileId) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Sign in to search events" } },
      { status: 401 }
    );
  }

  const query = qp.get("query");
  const cursor = qp.get("cursor");
  const windowDays = qp.get("windowDays");
  const limit = qp.get("limit");

  const result = await searchAttachableEvents({
    spaceId,
    toolId,
    elementId,
    profileId,
    query: query ?? null,
    cursor: cursor ?? null,
    windowDays: windowDays ? Number(windowDays) : null,
    limit: limit ? Number(limit) : null
  });

  if (!result.ok) {
    const status = result.status ?? 400;
    return NextResponse.json(
      { success: false, error: { code: result.error, message: result.error } },
      { status }
    );
  }

  return NextResponse.json({ success: true, data: result.data, toolVersion: result.toolVersion });
}
