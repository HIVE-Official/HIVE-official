// Bounded Context Owner: Community Guild
import { NextResponse } from "next/server";
import { spaceService } from "../../../../server/spaces/service";

const DEFAULT_CAMPUS_ID = "ub-buffalo";
const MAX_LIMIT = 10;

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const query = (url.searchParams.get("q") ?? "").trim();
  const campusId = url.searchParams.get("campusId") ?? DEFAULT_CAMPUS_ID;
  const limitParam = Number.parseInt(url.searchParams.get("limit") ?? "", 10);
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, MAX_LIMIT) : 6;

  if (!query) {
    return NextResponse.json({ success: true, data: [] });
  }

  const spaces = await spaceService.searchSpacesByName({
    campusId,
    query,
    limit
  });

  return NextResponse.json({
    success: true,
    data: spaces.map((space) => ({
      id: space.id,
      name: space.name,
      campusId: space.campusId,
      type: space.type,
      description: space.description
    }))
  });
}
