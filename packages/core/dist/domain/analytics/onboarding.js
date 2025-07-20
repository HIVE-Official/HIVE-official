"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOnboardingEvent = exports.OnboardingFunnelEventSchema = exports.OnboardingAbandonedEventSchema = exports.OnboardingCompletedEventSchema = exports.OnboardingValidationErrorEventSchema = exports.OnboardingStepSkippedEventSchema = exports.OnboardingStepCompletedEventSchema = exports.OnboardingStepStartedEventSchema = exports.OnboardingStartedEventSchema = void 0;
const zod_1 = require("zod");
// Base onboarding event schema
const BaseOnboardingEventSchema = zod_1.z.object({
    timestamp: zod_1.z.number(),
    sessionId: zod_1.z.string(),
    metadata: zod_1.z.record(zod_1.z.unknown()).optional(),
});
// Onboarding started event
exports.OnboardingStartedEventSchema = BaseOnboardingEventSchema.extend({
    type: zod_1.z.literal("onboarding_started"),
});
// Step started event
exports.OnboardingStepStartedEventSchema = BaseOnboardingEventSchema.extend({
    type: zod_1.z.literal("onboarding_step_started"),
    stepName: zod_1.z.enum([
        "welcome",
        "name",
        "academics",
        "handle",
        "photo",
        "builder",
        "legal",
    ]),
});
// Step completed event
exports.OnboardingStepCompletedEventSchema = BaseOnboardingEventSchema.extend({
    type: zod_1.z.literal("onboarding_step_completed"),
    stepName: zod_1.z.enum([
        "welcome",
        "name",
        "academics",
        "handle",
        "photo",
        "builder",
        "legal",
    ]),
    stepDuration: zod_1.z.number(),
});
// Step skipped event
exports.OnboardingStepSkippedEventSchema = BaseOnboardingEventSchema.extend({
    type: zod_1.z.literal("onboarding_step_skipped"),
    stepName: zod_1.z.enum([
        "welcome",
        "name",
        "academics",
        "handle",
        "photo",
        "builder",
        "legal",
    ]),
    stepDuration: zod_1.z.number(),
});
// Validation error event
exports.OnboardingValidationErrorEventSchema = BaseOnboardingEventSchema.extend({
    type: zod_1.z.literal("onboarding_validation_error"),
    stepName: zod_1.z.enum([
        "welcome",
        "name",
        "academics",
        "handle",
        "photo",
        "builder",
        "legal",
    ]),
});
// Onboarding completed event
exports.OnboardingCompletedEventSchema = BaseOnboardingEventSchema.extend({
    type: zod_1.z.literal("onboarding_completed"),
    totalDuration: zod_1.z.number(),
});
// Onboarding abandoned event
exports.OnboardingAbandonedEventSchema = BaseOnboardingEventSchema.extend({
    type: zod_1.z.literal("onboarding_abandoned"),
    stepName: zod_1.z.enum([
        "welcome",
        "name",
        "academics",
        "handle",
        "photo",
        "builder",
        "legal",
    ]),
    totalDuration: zod_1.z.number(),
});
// Union of all onboarding events
exports.OnboardingFunnelEventSchema = zod_1.z.discriminatedUnion("type", [
    exports.OnboardingStartedEventSchema,
    exports.OnboardingStepStartedEventSchema,
    exports.OnboardingStepCompletedEventSchema,
    exports.OnboardingStepSkippedEventSchema,
    exports.OnboardingValidationErrorEventSchema,
    exports.OnboardingCompletedEventSchema,
    exports.OnboardingAbandonedEventSchema,
]);
// Helper functions for analytics
exports.createOnboardingEvent = {
    started: (sessionId, metadata) => ({
        type: "onboarding_started",
        timestamp: Date.now(),
        sessionId,
        metadata,
    }),
    stepStarted: (sessionId, stepName, metadata) => ({
        type: "onboarding_step_started",
        timestamp: Date.now(),
        sessionId,
        stepName,
        metadata,
    }),
    stepCompleted: (sessionId, stepName, stepDuration, metadata) => ({
        type: "onboarding_step_completed",
        timestamp: Date.now(),
        sessionId,
        stepName,
        stepDuration,
        metadata,
    }),
    stepSkipped: (sessionId, stepName, stepDuration, metadata) => ({
        type: "onboarding_step_skipped",
        timestamp: Date.now(),
        sessionId,
        stepName,
        stepDuration,
        metadata,
    }),
    validationError: (sessionId, stepName, metadata) => ({
        type: "onboarding_validation_error",
        timestamp: Date.now(),
        sessionId,
        stepName,
        metadata,
    }),
    completed: (sessionId, totalDuration, metadata) => ({
        type: "onboarding_completed",
        timestamp: Date.now(),
        sessionId,
        totalDuration,
        metadata,
    }),
    abandoned: (sessionId, stepName, totalDuration, metadata) => ({
        type: "onboarding_abandoned",
        timestamp: Date.now(),
        sessionId,
        stepName,
        totalDuration,
        metadata,
    }),
};
//# sourceMappingURL=onboarding.js.map