import { z } from 'zod';
// Base onboarding event schema
const BaseOnboardingEventSchema = z.object({
    timestamp: z.number(),
    sessionId: z.string(),
    metadata: z.record(z.any()).optional(),
});
// Onboarding started event
export const OnboardingStartedEventSchema = BaseOnboardingEventSchema.extend({
    type: z.literal('onboarding_started'),
});
// Step started event
export const OnboardingStepStartedEventSchema = BaseOnboardingEventSchema.extend({
    type: z.literal('onboarding_step_started'),
    stepName: z.enum(['welcome', 'name', 'academics', 'handle', 'photo', 'builder', 'legal']),
});
// Step completed event
export const OnboardingStepCompletedEventSchema = BaseOnboardingEventSchema.extend({
    type: z.literal('onboarding_step_completed'),
    stepName: z.enum(['welcome', 'name', 'academics', 'handle', 'photo', 'builder', 'legal']),
    stepDuration: z.number(),
});
// Step skipped event
export const OnboardingStepSkippedEventSchema = BaseOnboardingEventSchema.extend({
    type: z.literal('onboarding_step_skipped'),
    stepName: z.enum(['welcome', 'name', 'academics', 'handle', 'photo', 'builder', 'legal']),
    stepDuration: z.number(),
});
// Validation error event
export const OnboardingValidationErrorEventSchema = BaseOnboardingEventSchema.extend({
    type: z.literal('onboarding_validation_error'),
    stepName: z.enum(['welcome', 'name', 'academics', 'handle', 'photo', 'builder', 'legal']),
});
// Onboarding completed event
export const OnboardingCompletedEventSchema = BaseOnboardingEventSchema.extend({
    type: z.literal('onboarding_completed'),
    totalDuration: z.number(),
});
// Onboarding abandoned event
export const OnboardingAbandonedEventSchema = BaseOnboardingEventSchema.extend({
    type: z.literal('onboarding_abandoned'),
    stepName: z.enum(['welcome', 'name', 'academics', 'handle', 'photo', 'builder', 'legal']),
    totalDuration: z.number(),
});
// Union of all onboarding events
export const OnboardingFunnelEventSchema = z.discriminatedUnion('type', [
    OnboardingStartedEventSchema,
    OnboardingStepStartedEventSchema,
    OnboardingStepCompletedEventSchema,
    OnboardingStepSkippedEventSchema,
    OnboardingValidationErrorEventSchema,
    OnboardingCompletedEventSchema,
    OnboardingAbandonedEventSchema,
]);
// Helper functions for analytics
export const createOnboardingEvent = {
    started: (sessionId, metadata) => ({
        type: 'onboarding_started',
        timestamp: Date.now(),
        sessionId,
        metadata,
    }),
    stepStarted: (sessionId, stepName, metadata) => ({
        type: 'onboarding_step_started',
        timestamp: Date.now(),
        sessionId,
        stepName,
        metadata,
    }),
    stepCompleted: (sessionId, stepName, stepDuration, metadata) => ({
        type: 'onboarding_step_completed',
        timestamp: Date.now(),
        sessionId,
        stepName,
        stepDuration,
        metadata,
    }),
    stepSkipped: (sessionId, stepName, stepDuration, metadata) => ({
        type: 'onboarding_step_skipped',
        timestamp: Date.now(),
        sessionId,
        stepName,
        stepDuration,
        metadata,
    }),
    validationError: (sessionId, stepName, metadata) => ({
        type: 'onboarding_validation_error',
        timestamp: Date.now(),
        sessionId,
        stepName,
        metadata,
    }),
    completed: (sessionId, totalDuration, metadata) => ({
        type: 'onboarding_completed',
        timestamp: Date.now(),
        sessionId,
        totalDuration,
        metadata,
    }),
    abandoned: (sessionId, stepName, totalDuration, metadata) => ({
        type: 'onboarding_abandoned',
        timestamp: Date.now(),
        sessionId,
        stepName,
        totalDuration,
        metadata,
    }),
};
//# sourceMappingURL=onboarding.js.map