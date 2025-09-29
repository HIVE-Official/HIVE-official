/**
 * Onboarding Analytics Event
 * Domain event for onboarding-related analytics
 */
import { OnboardingAnalyticsEvent, OnboardingStepName } from '../types';
export declare class OnboardingAnalyticsEventEntity implements OnboardingAnalyticsEvent {
    readonly eventId: string;
    readonly stepName: OnboardingStepName;
    readonly stepIndex: number;
    readonly isCompleted: boolean;
    readonly userId?: string;
    readonly userIdHash?: string;
    readonly sessionId: string;
    readonly timestamp: Date;
    readonly timeSpent?: number;
    readonly validationErrors?: string[];
    readonly anonymized?: boolean;
    readonly metadata?: Record<string, unknown>;
    constructor(data: OnboardingAnalyticsEvent);
    static create(stepName: OnboardingStepName, context: Partial<OnboardingAnalyticsEvent> & {
        stepIndex: number;
        isCompleted: boolean;
    }): OnboardingAnalyticsEventEntity;
    isFirstStep(): boolean;
    isLastStep(): boolean;
    hasValidationErrors(): boolean;
    getCompletionRate(): number;
    anonymize(): OnboardingAnalyticsEventEntity;
    withMetadata(metadata: Record<string, unknown>): OnboardingAnalyticsEventEntity;
    toJSON(): OnboardingAnalyticsEvent;
}
//# sourceMappingURL=onboarding-analytics.event.d.ts.map