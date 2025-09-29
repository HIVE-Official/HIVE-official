"use strict";
/**
 * Onboarding Analytics Event
 * Domain event for onboarding-related analytics
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingAnalyticsEventEntity = void 0;
class OnboardingAnalyticsEventEntity {
    constructor(data) {
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
    static create(stepName, context) {
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
    isFirstStep() {
        return this.stepIndex === 0;
    }
    isLastStep() {
        return this.stepName === 'legal';
    }
    hasValidationErrors() {
        return (this.validationErrors?.length ?? 0) > 0;
    }
    getCompletionRate() {
        const totalSteps = 6; // Based on OnboardingStepName enum
        return (this.stepIndex + 1) / totalSteps;
    }
    anonymize() {
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
    withMetadata(metadata) {
        return new OnboardingAnalyticsEventEntity({
            ...this,
            metadata: { ...this.metadata, ...metadata },
        });
    }
    toJSON() {
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
exports.OnboardingAnalyticsEventEntity = OnboardingAnalyticsEventEntity;
//# sourceMappingURL=onboarding-analytics.event.js.map