import { z } from 'zod';
export type OnboardingStepName = 'welcome' | 'name' | 'academics' | 'handle' | 'photo' | 'builder' | 'legal';
export declare const OnboardingStartedEventSchema: z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"onboarding_started">;
}, "strip", z.ZodTypeAny, {
    type: "onboarding_started";
    sessionId: string;
    timestamp: number;
    metadata?: Record<string, any> | undefined;
}, {
    type: "onboarding_started";
    sessionId: string;
    timestamp: number;
    metadata?: Record<string, any> | undefined;
}>;
export declare const OnboardingStepStartedEventSchema: z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"onboarding_step_started">;
    stepName: z.ZodEnum<["welcome", "name", "academics", "handle", "photo", "builder", "legal"]>;
}, "strip", z.ZodTypeAny, {
    type: "onboarding_step_started";
    sessionId: string;
    timestamp: number;
    stepName: "name" | "welcome" | "builder" | "handle" | "academics" | "photo" | "legal";
    metadata?: Record<string, any> | undefined;
}, {
    type: "onboarding_step_started";
    sessionId: string;
    timestamp: number;
    stepName: "name" | "welcome" | "builder" | "handle" | "academics" | "photo" | "legal";
    metadata?: Record<string, any> | undefined;
}>;
export declare const OnboardingStepCompletedEventSchema: z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"onboarding_step_completed">;
    stepName: z.ZodEnum<["welcome", "name", "academics", "handle", "photo", "builder", "legal"]>;
    stepDuration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "onboarding_step_completed";
    sessionId: string;
    timestamp: number;
    stepName: "name" | "welcome" | "builder" | "handle" | "academics" | "photo" | "legal";
    stepDuration: number;
    metadata?: Record<string, any> | undefined;
}, {
    type: "onboarding_step_completed";
    sessionId: string;
    timestamp: number;
    stepName: "name" | "welcome" | "builder" | "handle" | "academics" | "photo" | "legal";
    stepDuration: number;
    metadata?: Record<string, any> | undefined;
}>;
export declare const OnboardingStepSkippedEventSchema: z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"onboarding_step_skipped">;
    stepName: z.ZodEnum<["welcome", "name", "academics", "handle", "photo", "builder", "legal"]>;
    stepDuration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "onboarding_step_skipped";
    sessionId: string;
    timestamp: number;
    stepName: "name" | "welcome" | "builder" | "handle" | "academics" | "photo" | "legal";
    stepDuration: number;
    metadata?: Record<string, any> | undefined;
}, {
    type: "onboarding_step_skipped";
    sessionId: string;
    timestamp: number;
    stepName: "name" | "welcome" | "builder" | "handle" | "academics" | "photo" | "legal";
    stepDuration: number;
    metadata?: Record<string, any> | undefined;
}>;
export declare const OnboardingValidationErrorEventSchema: z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"onboarding_validation_error">;
    stepName: z.ZodEnum<["welcome", "name", "academics", "handle", "photo", "builder", "legal"]>;
}, "strip", z.ZodTypeAny, {
    type: "onboarding_validation_error";
    sessionId: string;
    timestamp: number;
    stepName: "name" | "welcome" | "builder" | "handle" | "academics" | "photo" | "legal";
    metadata?: Record<string, any> | undefined;
}, {
    type: "onboarding_validation_error";
    sessionId: string;
    timestamp: number;
    stepName: "name" | "welcome" | "builder" | "handle" | "academics" | "photo" | "legal";
    metadata?: Record<string, any> | undefined;
}>;
export declare const OnboardingCompletedEventSchema: z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"onboarding_completed">;
    totalDuration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "onboarding_completed";
    sessionId: string;
    timestamp: number;
    totalDuration: number;
    metadata?: Record<string, any> | undefined;
}, {
    type: "onboarding_completed";
    sessionId: string;
    timestamp: number;
    totalDuration: number;
    metadata?: Record<string, any> | undefined;
}>;
export declare const OnboardingAbandonedEventSchema: z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"onboarding_abandoned">;
    stepName: z.ZodEnum<["welcome", "name", "academics", "handle", "photo", "builder", "legal"]>;
    totalDuration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "onboarding_abandoned";
    sessionId: string;
    timestamp: number;
    stepName: "name" | "welcome" | "builder" | "handle" | "academics" | "photo" | "legal";
    totalDuration: number;
    metadata?: Record<string, any> | undefined;
}, {
    type: "onboarding_abandoned";
    sessionId: string;
    timestamp: number;
    stepName: "name" | "welcome" | "builder" | "handle" | "academics" | "photo" | "legal";
    totalDuration: number;
    metadata?: Record<string, any> | undefined;
}>;
export declare const OnboardingFunnelEventSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"onboarding_started">;
}, "strip", z.ZodTypeAny, {
    type: "onboarding_started";
    sessionId: string;
    timestamp: number;
    metadata?: Record<string, any> | undefined;
}, {
    type: "onboarding_started";
    sessionId: string;
    timestamp: number;
    metadata?: Record<string, any> | undefined;
}>, z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"onboarding_step_started">;
    stepName: z.ZodEnum<["welcome", "name", "academics", "handle", "photo", "builder", "legal"]>;
}, "strip", z.ZodTypeAny, {
    type: "onboarding_step_started";
    sessionId: string;
    timestamp: number;
    stepName: "name" | "welcome" | "builder" | "handle" | "academics" | "photo" | "legal";
    metadata?: Record<string, any> | undefined;
}, {
    type: "onboarding_step_started";
    sessionId: string;
    timestamp: number;
    stepName: "name" | "welcome" | "builder" | "handle" | "academics" | "photo" | "legal";
    metadata?: Record<string, any> | undefined;
}>, z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"onboarding_step_completed">;
    stepName: z.ZodEnum<["welcome", "name", "academics", "handle", "photo", "builder", "legal"]>;
    stepDuration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "onboarding_step_completed";
    sessionId: string;
    timestamp: number;
    stepName: "name" | "welcome" | "builder" | "handle" | "academics" | "photo" | "legal";
    stepDuration: number;
    metadata?: Record<string, any> | undefined;
}, {
    type: "onboarding_step_completed";
    sessionId: string;
    timestamp: number;
    stepName: "name" | "welcome" | "builder" | "handle" | "academics" | "photo" | "legal";
    stepDuration: number;
    metadata?: Record<string, any> | undefined;
}>, z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"onboarding_step_skipped">;
    stepName: z.ZodEnum<["welcome", "name", "academics", "handle", "photo", "builder", "legal"]>;
    stepDuration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "onboarding_step_skipped";
    sessionId: string;
    timestamp: number;
    stepName: "name" | "welcome" | "builder" | "handle" | "academics" | "photo" | "legal";
    stepDuration: number;
    metadata?: Record<string, any> | undefined;
}, {
    type: "onboarding_step_skipped";
    sessionId: string;
    timestamp: number;
    stepName: "name" | "welcome" | "builder" | "handle" | "academics" | "photo" | "legal";
    stepDuration: number;
    metadata?: Record<string, any> | undefined;
}>, z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"onboarding_validation_error">;
    stepName: z.ZodEnum<["welcome", "name", "academics", "handle", "photo", "builder", "legal"]>;
}, "strip", z.ZodTypeAny, {
    type: "onboarding_validation_error";
    sessionId: string;
    timestamp: number;
    stepName: "name" | "welcome" | "builder" | "handle" | "academics" | "photo" | "legal";
    metadata?: Record<string, any> | undefined;
}, {
    type: "onboarding_validation_error";
    sessionId: string;
    timestamp: number;
    stepName: "name" | "welcome" | "builder" | "handle" | "academics" | "photo" | "legal";
    metadata?: Record<string, any> | undefined;
}>, z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"onboarding_completed">;
    totalDuration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "onboarding_completed";
    sessionId: string;
    timestamp: number;
    totalDuration: number;
    metadata?: Record<string, any> | undefined;
}, {
    type: "onboarding_completed";
    sessionId: string;
    timestamp: number;
    totalDuration: number;
    metadata?: Record<string, any> | undefined;
}>, z.ZodObject<{
    timestamp: z.ZodNumber;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"onboarding_abandoned">;
    stepName: z.ZodEnum<["welcome", "name", "academics", "handle", "photo", "builder", "legal"]>;
    totalDuration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "onboarding_abandoned";
    sessionId: string;
    timestamp: number;
    stepName: "name" | "welcome" | "builder" | "handle" | "academics" | "photo" | "legal";
    totalDuration: number;
    metadata?: Record<string, any> | undefined;
}, {
    type: "onboarding_abandoned";
    sessionId: string;
    timestamp: number;
    stepName: "name" | "welcome" | "builder" | "handle" | "academics" | "photo" | "legal";
    totalDuration: number;
    metadata?: Record<string, any> | undefined;
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
    started: (sessionId: string, metadata?: Record<string, any>) => OnboardingStartedEvent;
    stepStarted: (sessionId: string, stepName: OnboardingStepName, metadata?: Record<string, any>) => OnboardingStepStartedEvent;
    stepCompleted: (sessionId: string, stepName: OnboardingStepName, stepDuration: number, metadata?: Record<string, any>) => OnboardingStepCompletedEvent;
    stepSkipped: (sessionId: string, stepName: OnboardingStepName, stepDuration: number, metadata?: Record<string, any>) => OnboardingStepSkippedEvent;
    validationError: (sessionId: string, stepName: OnboardingStepName, metadata?: Record<string, any>) => OnboardingValidationErrorEvent;
    completed: (sessionId: string, totalDuration: number, metadata?: Record<string, any>) => OnboardingCompletedEvent;
    abandoned: (sessionId: string, stepName: OnboardingStepName, totalDuration: number, metadata?: Record<string, any>) => OnboardingAbandonedEvent;
};
//# sourceMappingURL=onboarding.d.ts.map