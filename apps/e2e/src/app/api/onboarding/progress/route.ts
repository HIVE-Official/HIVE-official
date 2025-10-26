import { NextResponse } from "next/server";
import { onboardingStore } from "../../../../fixtures";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get("profileId");
  if (!profileId) {
    return NextResponse.json({ error: "profileId required" }, { status: 400 });
  }

  const snapshot = onboardingStore.get(profileId);
  if (!snapshot) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json(snapshot);
}

export async function POST(request: Request): Promise<Response> {
  const body = await request.json().catch(() => null) as {
    profileId?: string;
    stepId?: string;
    partialSubmission?: Partial<Record<string, unknown>>;
  } | null;

  if (!body?.profileId || !body?.stepId) {
    return NextResponse.json({ error: "profileId and stepId required" }, { status: 400 });
  }

  const entry = onboardingStore.saveStep(body.profileId, body.stepId, (body.partialSubmission ?? {}) as any);

  return NextResponse.json({
    profileId: body.profileId,
    stepsCompleted: entry.stepsCompleted,
    lastUpdated: entry.lastUpdated
  });
}
