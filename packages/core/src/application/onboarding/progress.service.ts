// Bounded Context Owner: Identity & Access Management Guild
import { err, ok, type Result } from "../../shared/result";
import type { OnboardingSubmissionDto } from "../../domain/profile/dto/onboarding-submission.dto";
import type { OnboardingProgressRepository } from "../../domain/onboarding/onboarding-progress.repository";
import type { OnboardingProgressSnapshot } from "../../domain/onboarding/onboarding-progress.snapshot";

export interface SaveProgressCommand {
  readonly profileId: string;
  readonly stepId: string;
  readonly partialSubmission: Partial<OnboardingSubmissionDto>;
}

export interface SaveProgressSuccess {
  readonly snapshot: OnboardingProgressSnapshot;
}

export class OnboardingProgressService {
  constructor(private readonly repository: OnboardingProgressRepository) {}

  async saveProgress(
    command: SaveProgressCommand
  ): Promise<Result<SaveProgressSuccess>> {
    if (!command.profileId) {
      return err("profileId is required");
    }

    if (!command.stepId) {
      return err("stepId is required");
    }

    const existing = await this.repository.findByProfileId(command.profileId);
    const stepsCompleted = new Set(existing?.stepsCompleted ?? []);
    stepsCompleted.add(command.stepId);

    const snapshot: OnboardingProgressSnapshot = {
      profileId: command.profileId,
      stepsCompleted: Array.from(stepsCompleted),
      partialSubmission: {
        ...existing?.partialSubmission,
        ...command.partialSubmission
      },
      lastUpdated: new Date()
    };

    await this.repository.save(snapshot);

    return ok({ snapshot });
  }

  async getProgress(
    profileId: string
  ): Promise<Result<OnboardingProgressSnapshot | null>> {
    if (!profileId) {
      return err("profileId is required");
    }

    const snapshot = await this.repository.findByProfileId(profileId);
    return ok(snapshot);
  }

  async clear(profileId: string): Promise<Result<void>> {
    if (!profileId) {
      return err("profileId is required");
    }

    await this.repository.delete(profileId);
    return ok(undefined);
  }
}
