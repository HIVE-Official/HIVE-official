// Bounded Context Owner: Identity & Access Management Guild
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import type { ProfilePresence } from "../../../../profile/profile.contract";
import { getPresence, updatePresence, type PresenceWritePayload } from "../../../../server/profile/presence.service";

const getQuery = z.object({ profileId: z.string().min(1) });

const postBody = z.object({
  profileId: z.string().min(1),
  status: z.enum(["online", "away", "offline"]).optional(),
  isGhostMode: z.boolean().optional(),
});

const ok = (data: unknown, init?: ResponseInit) => NextResponse.json(data, init);
const bad = (msg: string, code = 400) => ok({ error: msg }, { status: code });

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = getQuery.safeParse({ profileId: searchParams.get("profileId") ?? "" });
    if (!parsed.success) return bad("profileId is required");
    const presence: ProfilePresence = await getPresence(parsed.data.profileId);
    return ok(presence);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to load presence";
    return ok({ error: msg }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const raw = (await request.json().catch(() => null)) as unknown;
    const parsed = postBody.safeParse(raw);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return bad(issue?.message ?? "Invalid presence payload");
    }
    const payload: PresenceWritePayload = {
      status: parsed.data.status,
      isGhostMode: parsed.data.isGhostMode,
    };
    const presence = await updatePresence(parsed.data.profileId, payload);
    return ok(presence);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to update presence";
    return ok({ error: msg }, { status: 500 });
  }
}
