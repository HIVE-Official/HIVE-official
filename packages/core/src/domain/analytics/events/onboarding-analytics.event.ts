/**
 * Onboarding Analytics Event
 * Domain event for onboarding-related analytics
 */

import { OnboardingAnalyticsEvent, OnboardingStepName } from '../types';

export class OnboardingAnalyticsEventEntity implements OnboardingAnalyticsEvent {
  public readonly eventId: string;
  public readonly stepName: OnboardingStepName;
  public readonly stepIndex: number;
  public readonly isCompleted: boolean;
  public readonly userId?: string;
  public readonly userIdHash?: string;
  public readonly sessionId: string;
  public readonly timestamp: Date;
  public readonly timeSpent?: number;
  public readonly validationErrors?: string[];
  public readonly anonymized?: boolean;
  public readonly metadata?: Record<string, unknown>;

  constructor(data: OnboardingAnalyticsEvent) {
    this.eventId = data.eventId || crypto.randomUUID();
    this.stepName = data.stepName;
    this.stepIndex = data.stepIndex;
    this.isCompleted = data.isCompleted;
    this.userId = data.userId;
    this.userIdHash = data.userIdHash;
    this.sessionId = data.sessionId;
    this.timestamp = data.timestamp || new Date();
    this.timeSpent = data.timeSpent;
    this.validationErrors = data.validationErrors;
    this.anonymized = data.anonymized;
    this.metadata = data.metadata;
  }

  public static create(
    stepName: OnboardingStepName,
    context: Partial<OnboardingAnalyticsEvent> & {
      stepIndex: number;
      isCompleted: boolean;
    }
  ): OnboardingAnalyticsEventEntity {
    return new OnboardingAnalyticsEventEntity({
      eventId: crypto.randomUUID(),
      stepName,
      timestamp: new Date(),
      sessionId: context.sessionId || crypto.randomUUID(),
      userId: context.userId,
      userIdHash: context.userIdHash,
      stepIndex: context.stepIndex,
      isCompleted: context.isCompleted,
      anonymized: context.anonymized,
      metadata: context.metadata,
    });
  }

  public isFirstStep(): boolean {
    return this.stepIndex === 0;
  }

  public isLastStep(): boolean {
    return this.stepName === 'legal';
  }

  public hasValidationErrors(): boolean {
    return (this.validationErrors?.length ?? 0) > 0;
  }

  public getCompletionRate(): number {
    const totalSteps = 6; // Based on OnboardingStepName enum
    return (this.stepIndex + 1) / totalSteps;
  }

  public anonymize(): OnboardingAnalyticsEventEntity {
    return new OnboardingAnalyticsEventEntity({
      ...this,
      userId: undefined,
      userIdHash: undefined,
      anonymized: true,
      metadata: {
        ...this.metadata,
        userId: undefined,
        userIdHash: undefined,
      },
    });
  }

  public withMetadata(metadata: Record<string, unknown>): OnboardingAnalyticsEventEntity {
    return new OnboardingAnalyticsEventEntity({
      ...this,
      metadata: { ...this.metadata, ...metadata },
    });
  }

  public toJSON(): OnboardingAnalyticsEvent {
    return {
      eventId: this.eventId,
      stepName: this.stepName,
      stepIndex: this.stepIndex,
      isCompleted: this.isCompleted,
      userId: this.userId,
      userIdHash: this.userIdHash,
      sessionId: this.sessionId,
      timestamp: this.timestamp,
      timeSpent: this.timeSpent,
      validationErrors: this.validationErrors,
      anonymized: this.anonymized,
      metadata: this.metadata,
    };
  }
}