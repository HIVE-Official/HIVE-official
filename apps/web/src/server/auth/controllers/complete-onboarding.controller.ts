// Bounded Context Owner: Identity & Access Management Guild
import type {
  OnboardingSubmissionDto,
  ProfileOnboardingService,
  OnboardingProgressService,
  SessionService
} from "@core";
import type { HttpResponse } from "../../http/types";
import { z } from "zod";
import { SpaceAutoJoinService } from "../services/space-auto-join.service";

export interface CompleteOnboardingRequest {
  readonly profileId: string;
  readonly submission: OnboardingSubmissionDto;
}

export interface CompleteOnboardingResponse {
  readonly profileId: string;
  readonly campusId: string;
  readonly onboardingCompletedAt: string;
  readonly session: {
    readonly sessionId: string;
    readonly issuedAt: string;
    readonly expiresAt: string;
  };
  readonly domainEvents: readonly unknown[];
  readonly defaultSpaces: readonly {
    readonly id: string;
    readonly name: string;
  }[];
  readonly cohortSpaces: readonly {
    readonly id: string;
    readonly name: string;
  }[];
}

export const createCompleteOnboardingController = (
  profileOnboardingService: ProfileOnboardingService,
  progressService: OnboardingProgressService,
  sessionService: SessionService,
  spaceAutoJoinService: SpaceAutoJoinService
) => async (
  request: CompleteOnboardingRequest
): Promise<HttpResponse<CompleteOnboardingResponse>> => {
  const schema = z.object({
    profileId: z.string().min(1, "profileId is required"),
    submission: z
      .object({
        handle: z.string().min(3, "Handle is required"),
        consentGiven: z.boolean()
      })
      .passthrough()
  });

  const parsed = schema.safeParse(request);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid request";
    return { status: 400, error: message };
  }

  const completion = await profileOnboardingService.completeOnboarding({
    profileId: parsed.data.profileId,
    submission: parsed.data.submission as unknown as OnboardingSubmissionDto
  });

  if (!completion.ok) {
    return {
      status: 400,
      error: completion.error
    };
  }

  await progressService.clear(parsed.data.profileId);

  const sessionResult = await sessionService.create({
    profileId: parsed.data.profileId,
    scopes: ["app:web"],
    ttlHours: 12
  });

  if (!sessionResult.ok) {
    return {
      status: 500,
      error: sessionResult.error ?? "Failed to establish session"
    };
  }

  try {
    await spaceAutoJoinService.assign({
      profileId: parsed.data.profileId,
      campusId: completion.value.campusId,
      defaultSpaces: completion.value.defaultSpaces,
      cohortSpaces: completion.value.cohortSpaces
    });
  } catch (error) {
    console.warn("space.auto_join_failed", error);
  }

  return {
    status: 200,
    body: {
      profileId: parsed.data.profileId,
      campusId: completion.value.campusId,
      onboardingCompletedAt:
        completion.value.onboardingCompletedAt.toISOString(),
      session: {
        sessionId: sessionResult.value.sessionId,
        issuedAt: sessionResult.value.issuedAt.toISOString(),
        expiresAt: sessionResult.value.expiresAt.toISOString()
      },
      domainEvents: completion.value.domainEvents,
      defaultSpaces: completion.value.defaultSpaces,
      cohortSpaces: completion.value.cohortSpaces
    }
  };
};
