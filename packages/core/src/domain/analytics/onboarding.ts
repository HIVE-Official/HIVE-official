import { z } from 'zod'

// Onboarding step names
export type OnboardingStepName = 
  | 'welcome'
  | 'name'
  | 'academics'
  | 'handle'
  | 'photo'
  | 'builder'
  | 'legal'

// Base onboarding event schema
const BaseOnboardingEventSchema = z.object({
  timestamp: z.number(),
  sessionId: z.string(),
  metadata: z.record(z.any()).optional(),
})

// Onboarding started event
export const OnboardingStartedEventSchema = BaseOnboardingEventSchema.extend({
  type: z.literal('onboarding_started'),
})

// Step started event
export const OnboardingStepStartedEventSchema = BaseOnboardingEventSchema.extend({
  type: z.literal('onboarding_step_started'),
  stepName: z.enum(['welcome', 'name', 'academics', 'handle', 'photo', 'builder', 'legal']),
})

// Step completed event
export const OnboardingStepCompletedEventSchema = BaseOnboardingEventSchema.extend({
  type: z.literal('onboarding_step_completed'),
  stepName: z.enum(['welcome', 'name', 'academics', 'handle', 'photo', 'builder', 'legal']),
  stepDuration: z.number(),
})

// Step skipped event
export const OnboardingStepSkippedEventSchema = BaseOnboardingEventSchema.extend({
  type: z.literal('onboarding_step_skipped'),
  stepName: z.enum(['welcome', 'name', 'academics', 'handle', 'photo', 'builder', 'legal']),
  stepDuration: z.number(),
})

// Validation error event
export const OnboardingValidationErrorEventSchema = BaseOnboardingEventSchema.extend({
  type: z.literal('onboarding_validation_error'),
  stepName: z.enum(['welcome', 'name', 'academics', 'handle', 'photo', 'builder', 'legal']),
})

// Onboarding completed event
export const OnboardingCompletedEventSchema = BaseOnboardingEventSchema.extend({
  type: z.literal('onboarding_completed'),
  totalDuration: z.number(),
})

// Onboarding abandoned event
export const OnboardingAbandonedEventSchema = BaseOnboardingEventSchema.extend({
  type: z.literal('onboarding_abandoned'),
  stepName: z.enum(['welcome', 'name', 'academics', 'handle', 'photo', 'builder', 'legal']),
  totalDuration: z.number(),
})

// Union of all onboarding events
export const OnboardingFunnelEventSchema = z.discriminatedUnion('type', [
  OnboardingStartedEventSchema,
  OnboardingStepStartedEventSchema,
  OnboardingStepCompletedEventSchema,
  OnboardingStepSkippedEventSchema,
  OnboardingValidationErrorEventSchema,
  OnboardingCompletedEventSchema,
  OnboardingAbandonedEventSchema,
])

// TypeScript types
export type OnboardingStartedEvent = z.infer<typeof OnboardingStartedEventSchema>
export type OnboardingStepStartedEvent = z.infer<typeof OnboardingStepStartedEventSchema>
export type OnboardingStepCompletedEvent = z.infer<typeof OnboardingStepCompletedEventSchema>
export type OnboardingStepSkippedEvent = z.infer<typeof OnboardingStepSkippedEventSchema>
export type OnboardingValidationErrorEvent = z.infer<typeof OnboardingValidationErrorEventSchema>
export type OnboardingCompletedEvent = z.infer<typeof OnboardingCompletedEventSchema>
export type OnboardingAbandonedEvent = z.infer<typeof OnboardingAbandonedEventSchema>
export type OnboardingFunnelEvent = z.infer<typeof OnboardingFunnelEventSchema>

// Funnel metrics interface
export interface OnboardingFunnelMetrics {
  totalStarted: number
  totalCompleted: number
  conversionRate: number
  averageDuration: number
  stepDropOffRates: Record<OnboardingStepName, number>
  stepAverageDurations: Record<OnboardingStepName, number>
  commonValidationErrors: Array<{
    step: OnboardingStepName
    field: string
    error: string
    count: number
  }>
  abandonmentReasons: Record<string, number>
}

// Helper functions for analytics
export const createOnboardingEvent = {
  started: (sessionId: string, metadata?: Record<string, any>): OnboardingStartedEvent => ({
    type: 'onboarding_started',
    timestamp: Date.now(),
    sessionId,
    metadata,
  }),

  stepStarted: (sessionId: string, stepName: OnboardingStepName, metadata?: Record<string, any>): OnboardingStepStartedEvent => ({
    type: 'onboarding_step_started',
    timestamp: Date.now(),
    sessionId,
    stepName,
    metadata,
  }),

  stepCompleted: (sessionId: string, stepName: OnboardingStepName, stepDuration: number, metadata?: Record<string, any>): OnboardingStepCompletedEvent => ({
    type: 'onboarding_step_completed',
    timestamp: Date.now(),
    sessionId,
    stepName,
    stepDuration,
    metadata,
  }),

  stepSkipped: (sessionId: string, stepName: OnboardingStepName, stepDuration: number, metadata?: Record<string, any>): OnboardingStepSkippedEvent => ({
    type: 'onboarding_step_skipped',
    timestamp: Date.now(),
    sessionId,
    stepName,
    stepDuration,
    metadata,
  }),

  validationError: (sessionId: string, stepName: OnboardingStepName, metadata?: Record<string, any>): OnboardingValidationErrorEvent => ({
    type: 'onboarding_validation_error',
    timestamp: Date.now(),
    sessionId,
    stepName,
    metadata,
  }),

  completed: (sessionId: string, totalDuration: number, metadata?: Record<string, any>): OnboardingCompletedEvent => ({
    type: 'onboarding_completed',
    timestamp: Date.now(),
    sessionId,
    totalDuration,
    metadata,
  }),

  abandoned: (sessionId: string, stepName: OnboardingStepName, totalDuration: number, metadata?: Record<string, any>): OnboardingAbandonedEvent => ({
    type: 'onboarding_abandoned',
    timestamp: Date.now(),
    sessionId,
    stepName,
    totalDuration,
    metadata,
  }),
} 