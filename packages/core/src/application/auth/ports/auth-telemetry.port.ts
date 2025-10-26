// Bounded Context Owner: Identity & Access Management Guild
import type { UserType } from "../../../domain/profile/profile.types";

export interface SignupSubmittedEvent {
  readonly email: string;
  readonly campusId: string;
  readonly userType: UserType;
  readonly occurredAt: Date;
}

export interface MagicLinkSentEvent extends SignupSubmittedEvent {
  readonly messageId: string;
  readonly expiresAt: Date;
}

export interface MagicLinkFailedEvent extends SignupSubmittedEvent {
  readonly reason: string;
}

export interface OnboardingCompletedEvent {
  readonly profileId: string;
  readonly campusId: string;
  readonly userType: UserType;
  readonly occurredAt: Date;
  readonly defaultSpaces: readonly string[];
  readonly cohortSpaces: readonly string[];
}

export interface AuthTelemetryPort {
  recordSignupSubmitted(event: SignupSubmittedEvent): Promise<void>;
  recordMagicLinkSent(event: MagicLinkSentEvent): Promise<void>;
  recordMagicLinkFailed(event: MagicLinkFailedEvent): Promise<void>;
  recordOnboardingCompleted(event: OnboardingCompletedEvent): Promise<void>;
}
