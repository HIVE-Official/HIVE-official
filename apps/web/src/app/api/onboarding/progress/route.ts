// Bounded Context Owner: Identity & Access Management Guild
import { NextRequest, NextResponse } from "next/server";
import { getAuthContainer } from "../../../../server/auth/container";
import { createSaveProgressController } from "../../../../server/auth/controllers/save-progress.controller";
import { resolveAutoJoinAssignments } from "@core";
import { z } from "zod";

const ONBOARDING_STEPS = [
  "email_verified",
  "handle_set",
  "personal-info",
  "academic-info",
  "interests",
  "review",
  "first_space_joined"
] as const;

const STEP_ALIASES: Record<string, (typeof ONBOARDING_STEPS)[number]> = {
  personal: "personal-info",
  "personal-info": "personal-info",
  personal_info: "personal-info",
  academic: "academic-info",
  academics: "academic-info",
  "academic-info": "academic-info",
  academic_info: "academic-info",
  interests: "interests",
  interests_selected: "interests",
  review: "review"
};

export async function GET(request: NextRequest) {
  const profileId = request.nextUrl.searchParams.get("profileId");
  if (!profileId) {
    return NextResponse.json({ error: "profileId is required" }, { status: 400 });
  }

  const container = getAuthContainer();
  const result = await container.progressService.getProgress(profileId);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  if (!result.value) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const snapshot = result.value;
  const stepSet = new Set(snapshot.stepsCompleted ?? []);
  const completedSteps = Array.from(stepSet);
  const canonicalStepSet = new Set(
    completedSteps.map((step) => STEP_ALIASES[step] ?? step)
  );
  const remainingSteps = ONBOARDING_STEPS.filter((step) => !canonicalStepSet.has(step));
  const percentComplete = Math.min(
    100,
    Math.round((canonicalStepSet.size / Number(ONBOARDING_STEPS.length)) * 100)
  );

  const profile = await container.profileRepository.findById(profileId);
  const profileProps = profile?.getProps();
  const assignments = profileProps ? resolveAutoJoinAssignments(profileProps) : { defaultSpaces: [], cohortSpaces: [] };

  return NextResponse.json({
    profileId: snapshot.profileId,
    campusId: profileProps?.campusId ?? null,
    stepsCompleted: completedSteps,
    remainingSteps,
    percentComplete,
    totalSteps: ONBOARDING_STEPS.length,
    partialSubmission: snapshot.partialSubmission,
    lastUpdated: snapshot.lastUpdated.toISOString(),
    autoJoinPreview: assignments
  });
}

export async function POST(request: NextRequest) {
  const raw = await request.json().catch(() => null);
  const schema = z.object({
    profileId: z.string().min(1),
    stepId: z.string().min(1),
    partialSubmission: z.object({}).passthrough().default({}),
  });
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
  }
  const container = getAuthContainer();
  const controller = createSaveProgressController(container.progressService);
  const result = await controller(parsed.data);

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(result.body, { status: result.status });
}
