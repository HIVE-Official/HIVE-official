import { NextResponse } from "next/server";
import { listRecommended } from "../../../../server/fake-db";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const limit = Number.parseInt(searchParams.get("limit") ?? "3", 10);
  const profileId = String(searchParams.get("profileId") ?? "demo");
  // campusId is accepted for parity but unused in the in-memory DB
  const spaces = listRecommended({ profileId, limit: Math.max(limit, 0) });
  return NextResponse.json({ spaces });
}
