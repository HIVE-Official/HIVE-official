// Bounded Context Owner: Rituals Guild
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { joinRitual } from "../../../../../server/rituals/service";

const body = z.object({ profileId: z.string().min(1) });

export async function POST(request: NextRequest, context: { params: { ritualId: string } }) {
  try {
    const raw = (await request.json().catch(() => null)) as unknown;
    const parsed = body.safeParse(raw);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return NextResponse.json({ error: issue?.message ?? "Invalid payload" }, { status: 400 });
    }
    const result = await joinRitual(context.params.ritualId, parsed.data.profileId);
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ ritual: result.ritual });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to join ritual" }, { status: 500 });
  }
}

