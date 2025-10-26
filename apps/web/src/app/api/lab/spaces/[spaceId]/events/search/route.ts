// Bounded Context Owner: HiveLab Guild
import { NextResponse, type NextRequest } from "next/server";
import { searchAttachableEvents } from "../../../../../../../server/tools/event-attach.service";
import { getToolTelemetry } from "../../../../../../../server/tools/telemetry";
import { resolveActorProfileId } from "../../../../../../../server/auth/session-actor";
const BYPASS_AUTH =
  process.env.NEXT_PUBLIC_AUTH_MODE === "mock" ||
  process.env.DISABLE_AUTH === "true" ||
  process.env.ENABLE_DEV_SEEDS === "true";

export async function GET(request: NextRequest, context: { params: { spaceId: string } }) {
  const qpProfile = request.nextUrl.searchParams.get("profileId");
  const actor = await resolveActorProfileId(request);
  const profileId = actor ?? (BYPASS_AUTH ? qpProfile ?? null : null);
  if (!profileId) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Sign in to search events" } },
      { status: 401 }
    );
  }
  const toolId = request.nextUrl.searchParams.get("toolId");
  const elementId = request.nextUrl.searchParams.get("elementId");
  const query = request.nextUrl.searchParams.get("q");
  const cursor = request.nextUrl.searchParams.get("cursor");
  const windowDaysParam = request.nextUrl.searchParams.get("windowDays");
  const limitParam = request.nextUrl.searchParams.get("limit");

  if (!toolId || !elementId) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_PARAMS",
          message: "toolId and elementId are required"
        }
      },
      { status: 400 }
    );
  }

  const result = await searchAttachableEvents({
    spaceId: context.params.spaceId,
    toolId,
    elementId,
    profileId,
    query,
    cursor,
    windowDays: windowDaysParam ? Number(windowDaysParam) : null,
    limit: limitParam ? Number(limitParam) : null
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: result.error
        }
      },
      { status: result.status }
    );
  }

  const telemetry = getToolTelemetry();
  await telemetry.recordInteraction({
    toolId,
    performedBy: profileId,
    event: "attach_search",
    metadata: {
      query: query ?? null,
      windowStart: result.data.window.start,
      windowEnd: result.data.window.end,
      returned: result.data.events.length,
      nextCursor: result.data.nextCursor
    }
  });

  return NextResponse.json({
    success: true,
    data: {
      events: result.data.events,
      nextCursor: result.data.nextCursor,
      window: result.data.window,
      toolVersion: result.toolVersion
    }
  });
}
