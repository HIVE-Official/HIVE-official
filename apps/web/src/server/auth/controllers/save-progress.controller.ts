// Bounded Context Owner: Identity & Access Management Guild
import type { OnboardingProgressService } from "@core";
import type { HttpResponse } from "../../http/types";
import type { OnboardingSubmissionDto } from "@core";
import { z } from "zod";

export interface SaveProgressRequest {
  readonly profileId: string;
  readonly stepId: string;
  readonly partialSubmission: Partial<OnboardingSubmissionDto>;
}

export interface SaveProgressResponse {
  readonly profileId: string;
  readonly stepsCompleted: readonly string[];
  readonly lastUpdated: string;
}

export const createSaveProgressController = (
  progressService: OnboardingProgressService
) => async (
  request: SaveProgressRequest
): Promise<HttpResponse<SaveProgressResponse>> => {
  const schema = z.object({
    profileId: z.string().min(1, "profileId is required"),
    stepId: z.string().min(1, "stepId is required"),
    partialSubmission: z
      .object({})
      .passthrough()
      .default({})
  });

  const parsed = schema.safeParse(request);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid request";
    return { status: 400, error: message };
  }

  const result = await progressService.saveProgress(parsed.data);

  if (!result.ok) {
    return {
      status: 400,
      error: result.error
    };
  }

  return {
    status: 200,
    body: {
      profileId: result.value.snapshot.profileId,
      stepsCompleted: result.value.snapshot.stepsCompleted,
      lastUpdated: result.value.snapshot.lastUpdated.toISOString()
    }
  };
};
