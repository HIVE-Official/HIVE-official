import { NextResponse } from "next/server";
import { leaveSpace } from "../../../../server/fake-db";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const profileId = String(body.profileId ?? "demo");
  const spaceId = String(body.spaceId ?? "");
  if (!spaceId) {
    return NextResponse.json({ error: "spaceId required" }, { status: 400 });
  }
  const result = leaveSpace(profileId, spaceId);
  return NextResponse.json({ ok: result.ok });
}

