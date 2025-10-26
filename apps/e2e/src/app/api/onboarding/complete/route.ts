import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<Response> {
  const body = await request.json().catch(() => null) as { profileId?: string } | null;
  const profileId = body?.profileId ?? "profile-demo";
  const now = new Date();
  const expires = new Date(now.getTime() + 1000 * 60 * 60 * 12);

  return NextResponse.json({
    profileId,
    campusId: "ub-buffalo",
    onboardingCompletedAt: now.toISOString(),
    session: {
      sessionId: `session-${profileId}`,
      issuedAt: now.toISOString(),
      expiresAt: expires.toISOString()
    },
    domainEvents: [],
    defaultSpaces: [
      { id: "space-leadership", name: "Leadership Council" },
      { id: "space-build", name: "Build Lab" }
    ],
    cohortSpaces: []
  });
}
