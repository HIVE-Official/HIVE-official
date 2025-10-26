// Bounded Context Owner: Identity & Access Management Guild
import type { OnboardingProgressSnapshot } from "./onboarding-progress.snapshot";

export interface OnboardingProgressRepository {
  save(snapshot: OnboardingProgressSnapshot): Promise<void>;
  findByProfileId(profileId: string): Promise<OnboardingProgressSnapshot | null>;
  delete(profileId: string): Promise<void>;
}
