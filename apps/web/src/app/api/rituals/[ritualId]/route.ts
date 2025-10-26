// Bounded Context Owner: Rituals Guild
import { NextResponse } from "next/server";
import { getRitualById } from "../../../../server/rituals/service";

export async function GET(_request: Request, context: { params: { ritualId: string } }) {
  try {
    const ritual = await getRitualById(context.params.ritualId);
    if (!ritual) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ritual });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to load ritual" }, { status: 500 });
  }
}

