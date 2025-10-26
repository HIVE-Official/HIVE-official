// Bounded Context Owner: Identity & Access Management Guild
import type { OnboardingProgressSnapshot } from "../../domain/onboarding/onboarding-progress.snapshot";
import type { OnboardingProgressRepository } from "../../domain/onboarding/onboarding-progress.repository";

export class InMemoryOnboardingProgressRepository
  implements OnboardingProgressRepository
{
  private readonly store = new Map<string, OnboardingProgressSnapshot>();

  async save(snapshot: OnboardingProgressSnapshot): Promise<void> {
    this.store.set(snapshot.profileId, {
      ...snapshot,
      stepsCompleted: [...snapshot.stepsCompleted],
      partialSubmission: { ...snapshot.partialSubmission },
      lastUpdated: new Date(snapshot.lastUpdated.getTime())
    });
  }

  async findByProfileId(
    profileId: string
  ): Promise<OnboardingProgressSnapshot | null> {
    const snapshot = this.store.get(profileId);
    if (!snapshot) {
      return null;
    }

    return {
      ...snapshot,
      stepsCompleted: [...snapshot.stepsCompleted],
      partialSubmission: { ...snapshot.partialSubmission },
      lastUpdated: new Date(snapshot.lastUpdated.getTime())
    };
  }

  async delete(profileId: string): Promise<void> {
    this.store.delete(profileId);
  }
}
