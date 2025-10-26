// Bounded Context Owner: Identity & Access Management Guild
import type { OnboardingSubmissionDto } from "../profile/dto/onboarding-submission.dto";

export interface OnboardingProgressSnapshot {
  readonly profileId: string;
  readonly stepsCompleted: readonly string[];
  readonly partialSubmission: Partial<OnboardingSubmissionDto>;
  readonly lastUpdated: Date;
}
