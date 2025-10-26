// Bounded Context Owner: Rituals Guild
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { listRitualsForProfile } from "../../../server/rituals/service";

const query = z.object({ profileId: z.string().min(1) });

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = query.safeParse({ profileId: searchParams.get("profileId") ?? "" });
    if (!parsed.success) return NextResponse.json({ error: "profileId required" }, { status: 400 });
    const rituals = await listRitualsForProfile(parsed.data.profileId);
    return NextResponse.json({ rituals });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to load rituals" }, { status: 500 });
  }
}

