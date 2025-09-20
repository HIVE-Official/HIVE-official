import { z } from "zod";
export type OnboardingStepName = "welcome" | "name" | "academics" | "handle" | "photo" | "builder" | "legal";
export declare const OnboardingStartedEventSchema: z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    type: z.ZodLiteral<"onboarding_started">;
}, "strip", z.ZodTypeAny, {
    type?: "onboarding_started";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
}, {
    type?: "onboarding_started";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
}>;
export declare const OnboardingStepStartedEventSchema: z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    type: z.ZodLiteral<"onboarding_step_started">;
    stepName: z.ZodEnum<["welcome", "name", "academics", "handle", "photo", "builder", "legal"]>;
}, "strip", z.ZodTypeAny, {
    type?: "onboarding_step_started";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    stepName?: "builder" | "name" | "photo" | "handle" | "welcome" | "academics" | "legal";
}, {
    type?: "onboarding_step_started";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    stepName?: "builder" | "name" | "photo" | "handle" | "welcome" | "academics" | "legal";
}>;
export declare const OnboardingStepCompletedEventSchema: z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    type: z.ZodLiteral<"onboarding_step_completed">;
    stepName: z.ZodEnum<["welcome", "name", "academics", "handle", "photo", "builder", "legal"]>;
    stepDuration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type?: "onboarding_step_completed";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    stepName?: "builder" | "name" | "photo" | "handle" | "welcome" | "academics" | "legal";
    stepDuration?: number;
}, {
    type?: "onboarding_step_completed";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    stepName?: "builder" | "name" | "photo" | "handle" | "welcome" | "academics" | "legal";
    stepDuration?: number;
}>;
export declare const OnboardingStepSkippedEventSchema: z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    type: z.ZodLiteral<"onboarding_step_skipped">;
    stepName: z.ZodEnum<["welcome", "name", "academics", "handle", "photo", "builder", "legal"]>;
    stepDuration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type?: "onboarding_step_skipped";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    stepName?: "builder" | "name" | "photo" | "handle" | "welcome" | "academics" | "legal";
    stepDuration?: number;
}, {
    type?: "onboarding_step_skipped";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    stepName?: "builder" | "name" | "photo" | "handle" | "welcome" | "academics" | "legal";
    stepDuration?: number;
}>;
export declare const OnboardingValidationErrorEventSchema: z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    type: z.ZodLiteral<"onboarding_validation_error">;
    stepName: z.ZodEnum<["welcome", "name", "academics", "handle", "photo", "builder", "legal"]>;
}, "strip", z.ZodTypeAny, {
    type?: "onboarding_validation_error";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    stepName?: "builder" | "name" | "photo" | "handle" | "welcome" | "academics" | "legal";
}, {
    type?: "onboarding_validation_error";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    stepName?: "builder" | "name" | "photo" | "handle" | "welcome" | "academics" | "legal";
}>;
export declare const OnboardingCompletedEventSchema: z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    type: z.ZodLiteral<"onboarding_completed">;
    totalDuration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type?: "onboarding_completed";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    totalDuration?: number;
}, {
    type?: "onboarding_completed";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    totalDuration?: number;
}>;
export declare const OnboardingAbandonedEventSchema: z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    type: z.ZodLiteral<"onboarding_abandoned">;
    stepName: z.ZodEnum<["welcome", "name", "academics", "handle", "photo", "builder", "legal"]>;
    totalDuration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type?: "onboarding_abandoned";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    stepName?: "builder" | "name" | "photo" | "handle" | "welcome" | "academics" | "legal";
    totalDuration?: number;
}, {
    type?: "onboarding_abandoned";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    stepName?: "builder" | "name" | "photo" | "handle" | "welcome" | "academics" | "legal";
    totalDuration?: number;
}>;
export declare const OnboardingFunnelEventSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    type: z.ZodLiteral<"onboarding_started">;
}, "strip", z.ZodTypeAny, {
    type?: "onboarding_started";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
}, {
    type?: "onboarding_started";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
}>, z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    type: z.ZodLiteral<"onboarding_step_started">;
    stepName: z.ZodEnum<["welcome", "name", "academics", "handle", "photo", "builder", "legal"]>;
}, "strip", z.ZodTypeAny, {
    type?: "onboarding_step_started";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    stepName?: "builder" | "name" | "photo" | "handle" | "welcome" | "academics" | "legal";
}, {
    type?: "onboarding_step_started";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    stepName?: "builder" | "name" | "photo" | "handle" | "welcome" | "academics" | "legal";
}>, z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    type: z.ZodLiteral<"onboarding_step_completed">;
    stepName: z.ZodEnum<["welcome", "name", "academics", "handle", "photo", "builder", "legal"]>;
    stepDuration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type?: "onboarding_step_completed";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    stepName?: "builder" | "name" | "photo" | "handle" | "welcome" | "academics" | "legal";
    stepDuration?: number;
}, {
    type?: "onboarding_step_completed";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    stepName?: "builder" | "name" | "photo" | "handle" | "welcome" | "academics" | "legal";
    stepDuration?: number;
}>, z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    type: z.ZodLiteral<"onboarding_step_skipped">;
    stepName: z.ZodEnum<["welcome", "name", "academics", "handle", "photo", "builder", "legal"]>;
    stepDuration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type?: "onboarding_step_skipped";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    stepName?: "builder" | "name" | "photo" | "handle" | "welcome" | "academics" | "legal";
    stepDuration?: number;
}, {
    type?: "onboarding_step_skipped";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    stepName?: "builder" | "name" | "photo" | "handle" | "welcome" | "academics" | "legal";
    stepDuration?: number;
}>, z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    type: z.ZodLiteral<"onboarding_validation_error">;
    stepName: z.ZodEnum<["welcome", "name", "academics", "handle", "photo", "builder", "legal"]>;
}, "strip", z.ZodTypeAny, {
    type?: "onboarding_validation_error";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    stepName?: "builder" | "name" | "photo" | "handle" | "welcome" | "academics" | "legal";
}, {
    type?: "onboarding_validation_error";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    stepName?: "builder" | "name" | "photo" | "handle" | "welcome" | "academics" | "legal";
}>, z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    type: z.ZodLiteral<"onboarding_completed">;
    totalDuration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type?: "onboarding_completed";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    totalDuration?: number;
}, {
    type?: "onboarding_completed";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    totalDuration?: number;
}>, z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    type: z.ZodLiteral<"onboarding_abandoned">;
    stepName: z.ZodEnum<["welcome", "name", "academics", "handle", "photo", "builder", "legal"]>;
    totalDuration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type?: "onboarding_abandoned";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    stepName?: "builder" | "name" | "photo" | "handle" | "welcome" | "academics" | "legal";
    totalDuration?: number;
}, {
    type?: "onboarding_abandoned";
    metadata?: Record<string, unknown>;
    sessionId?: string;
    timestamp?: number;
    stepName?: "builder" | "name" | "photo" | "handle" | "welcome" | "academics" | "legal";
    totalDuration?: number;
}>]>;
export type OnboardingStartedEvent = z.infer<typeof OnboardingStartedEventSchema>;
export type OnboardingStepStartedEvent = z.infer<typeof OnboardingStepStartedEventSchema>;
export type OnboardingStepCompletedEvent = z.infer<typeof OnboardingStepCompletedEventSchema>;
export type OnboardingStepSkippedEvent = z.infer<typeof OnboardingStepSkippedEventSchema>;
export type OnboardingValidationErrorEvent = z.infer<typeof OnboardingValidationErrorEventSchema>;
export type OnboardingCompletedEvent = z.infer<typeof OnboardingCompletedEventSchema>;
export type OnboardingAbandonedEvent = z.infer<typeof OnboardingAbandonedEventSchema>;
export type OnboardingFunnelEvent = z.infer<typeof OnboardingFunnelEventSchema>;
export interface OnboardingFunnelMetrics {
    totalStarted: number;
    totalCompleted: number;
    conversionRate: number;
    averageDuration: number;
    stepDropOffRates: Record<OnboardingStepName, number>;
    stepAverageDurations: Record<OnboardingStepName, number>;
    commonValidationErrors: Array<{
        step: OnboardingStepName;
        field: string;
        error: string;
        count: number;
    }>;
    abandonmentReasons: Record<string, number>;
}
export declare const createOnboardingEvent: {
    started: (sessionId: string, metadata?: Record<string, unknown>) => OnboardingStartedEvent;
    stepStarted: (sessionId: string, stepName: OnboardingStepName, metadata?: Record<string, unknown>) => OnboardingStepStartedEvent;
    stepCompleted: (sessionId: string, stepName: OnboardingStepName, stepDuration: number, metadata?: Record<string, unknown>) => OnboardingStepCompletedEvent;
    stepSkipped: (sessionId: string, stepName: OnboardingStepName, stepDuration: number, metadata?: Record<string, unknown>) => OnboardingStepSkippedEvent;
    validationError: (sessionId: string, stepName: OnboardingStepName, metadata?: Record<string, unknown>) => OnboardingValidationErrorEvent;
    completed: (sessionId: string, totalDuration: number, metadata?: Record<string, unknown>) => OnboardingCompletedEvent;
    abandoned: (sessionId: string, stepName: OnboardingStepName, totalDuration: number, metadata?: Record<string, unknown>) => OnboardingAbandonedEvent;
};
//# sourceMappingURL=onboarding.d.ts.map