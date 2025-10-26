// Bounded Context Owner: Identity & Access Management Guild
import type {
  AuthTelemetryPort,
  MagicLinkFailedEvent,
  MagicLinkSentEvent,
  SignupSubmittedEvent,
  OnboardingCompletedEvent
} from "@core";

export class ConsoleAuthTelemetry implements AuthTelemetryPort {
  async recordSignupSubmitted(event: SignupSubmittedEvent): Promise<void> {
    console.warn("auth.signup_submitted", event);
    await Promise.resolve();
  }

  async recordMagicLinkSent(event: MagicLinkSentEvent): Promise<void> {
    console.warn("auth.magic_link_sent", event);
    await Promise.resolve();
  }

  async recordMagicLinkFailed(event: MagicLinkFailedEvent): Promise<void> {
    console.warn("auth.magic_link_failed", event);
    await Promise.resolve();
  }

  async recordOnboardingCompleted(event: OnboardingCompletedEvent): Promise<void> {
    console.warn("auth.onboarding_completed", event);
    await Promise.resolve();
  }
}
