// Bounded Context Owner: Identity & Access Management Guild
import { firebaseFirestore } from "@hive/firebase";
import type {
  AuthTelemetryPort,
  MagicLinkFailedEvent,
  MagicLinkSentEvent,
  SignupSubmittedEvent,
  OnboardingCompletedEvent
} from "@core";

interface FirestoreAuthTelemetryConfig {
  readonly collection?: string;
}

export class FirestoreAuthTelemetry implements AuthTelemetryPort {
  private readonly collection: string;

  constructor(config: FirestoreAuthTelemetryConfig = {}) {
    this.collection = config.collection ?? "auth_events";
  }

  async recordSignupSubmitted(event: SignupSubmittedEvent): Promise<void> {
    await this.writeEvent("signup_submitted", { ...event });
  }

  async recordMagicLinkSent(event: MagicLinkSentEvent): Promise<void> {
    await this.writeEvent("magic_link_sent", { ...event });
  }

  async recordMagicLinkFailed(event: MagicLinkFailedEvent): Promise<void> {
    await this.writeEvent("magic_link_failed", { ...event });
  }

  async recordOnboardingCompleted(event: OnboardingCompletedEvent): Promise<void> {
    await this.writeEvent("onboarding_completed", { ...event });
  }

  private async writeEvent(type: string, payload: Record<string, unknown>): Promise<void> {
    try {
      const firestore = firebaseFirestore();
      await firestore.collection(this.collection).add({
        type,
        occurredAt: new Date(),
        ...payload
      });
    } catch (error) {
      globalThis.console.warn("Failed to record auth telemetry", error);
    }
  }
}
