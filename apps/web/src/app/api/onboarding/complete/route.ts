// Bounded Context Owner: Identity & Access Management Guild
import { NextRequest, NextResponse } from "next/server";
import { getAuthContainer } from "../../../../server/auth/container";
import { createCompleteOnboardingController, type CompleteOnboardingRequest } from "../../../../server/auth/controllers/complete-onboarding.controller";
import { z } from "zod";
import {
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS
} from "../../../../server/auth/constants";

export async function POST(request: NextRequest) {
  const raw = await request.json().catch(() => null);
  const schema = z.object({
    profileId: z.string().min(1),
    submission: z.object({}).passthrough(),
  });
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
  }
  const container = getAuthContainer();
  const controller = createCompleteOnboardingController(
    container.profileOnboardingService,
    container.progressService,
    container.sessionService,
    container.spaceAutoJoinService
  );

  const result = await controller(parsed.data as unknown as CompleteOnboardingRequest);

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const response = NextResponse.json(result.body, { status: result.status });
  const session = result.body.session;

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: session.sessionId,
    httpOnly: SESSION_COOKIE_OPTIONS.httpOnly,
    sameSite: SESSION_COOKIE_OPTIONS.sameSite,
    path: SESSION_COOKIE_OPTIONS.path,
    maxAge: SESSION_COOKIE_OPTIONS.maxAge,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(session.expiresAt)
  });

  return response;
}
