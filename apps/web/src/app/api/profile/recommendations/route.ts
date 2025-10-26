// Bounded Context Owner: Identity & Access Management Guild
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { profileRecommendationsStateSchema } from "../../../../profile/profile.contract";
import { fetchProfileBundle } from "../../../../server/profile/profile.service";

const querySchema = z.object({
  profileId: z.string().min(1),
  limit: z.coerce.number().int().positive().max(25).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = querySchema.safeParse({
      profileId: searchParams.get("profileId") ?? "",
      limit: searchParams.get("limit") ?? undefined,
    });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Reuse bundle loader for now; a dedicated service can replace this later
    const bundle = await fetchProfileBundle(parsed.data.profileId);
    const recs = profileRecommendationsStateSchema.parse(bundle.recommendations);
    // Respect limit if provided (spaces only for now)
    const limit = parsed.data.limit ?? recs.spaces.length;
    const limited = { ...recs, spaces: recs.spaces.slice(0, limit) };
    return NextResponse.json(limited);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load recommendations";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

