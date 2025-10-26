// Bounded Context Owner: Identity & Access Management Guild
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getProfileCalendar } from "../../../../server/profile/calendar.service";

const querySchema = z.object({
  profileId: z.string().min(1),
  start: z.string().optional(),
  end: z.string().optional(),
  limit: z.string().optional(),
});

const ok = (data: unknown, init?: ResponseInit) => NextResponse.json(data, init);
const bad = (msg: string, code = 400) => ok({ error: msg }, { status: code });

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = querySchema.safeParse({
      profileId: searchParams.get("profileId") ?? "",
      start: searchParams.get("start") ?? undefined,
      end: searchParams.get("end") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
    });
    if (!parsed.success) return bad("Invalid request");

    const start = parsed.data.start ? new Date(parsed.data.start) : undefined;
    const end = parsed.data.end ? new Date(parsed.data.end) : undefined;
    const limit = parsed.data.limit ? Math.max(1, Math.min(100, Number(parsed.data.limit))) : undefined;

    const resp = await getProfileCalendar({
      profileId: parsed.data.profileId,
      start,
      end,
      limit,
    });
    return ok(resp);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to load calendar";
    return ok({ error: msg }, { status: 500 });
  }
}
