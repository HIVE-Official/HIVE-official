// Bounded Context Owner: Identity & Access Management Guild
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  acceptFriendship,
  getFriendsState,
  removeFriendship,
  requestFriendship
} from "../../../../server/profile/profile.service";

const getQuery = z.object({ profileId: z.string().min(1) });

const postBody = z.object({
  profileId: z.string().min(1),
  targetProfileId: z.string().min(1),
  action: z.enum(["request", "accept"]) 
});

const deleteBody = z.object({
  profileId: z.string().min(1),
  targetProfileId: z.string().min(1)
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = getQuery.safeParse({ profileId: searchParams.get("profileId") ?? "" });
    if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    const state = await getFriendsState(parsed.data.profileId);
    return NextResponse.json(state);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to load friends";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const raw = (await request.json().catch(() => null)) as unknown;
    const parsed = postBody.safeParse(raw);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return NextResponse.json({ error: issue?.message ?? "Invalid payload" }, { status: 400 });
    }
    if (parsed.data.action === "request") {
      await requestFriendship(parsed.data.profileId, parsed.data.targetProfileId);
      return NextResponse.json({ success: true });
    }
    await acceptFriendship(parsed.data.profileId, parsed.data.targetProfileId);
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to update friendship";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const raw = (await request.json().catch(() => null)) as unknown;
    const parsed = deleteBody.safeParse(raw);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return NextResponse.json({ error: issue?.message ?? "Invalid payload" }, { status: 400 });
    }
    await removeFriendship(parsed.data.profileId, parsed.data.targetProfileId);
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to remove friendship";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

