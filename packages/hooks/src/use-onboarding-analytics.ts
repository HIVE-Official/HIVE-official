import { useCallback, useRef, useEffect } from 'react'
import { useAnalytics } from './use-analytics'
import type { OnboardingStepName } from '@hive/core'

interface OnboardingStepTiming {
  stepName: OnboardingStepName
  startTime: number
  endTime?: number
}

interface UseOnboardingAnalyticsReturn {
  trackOnboardingStarted: () => void
  trackStepStarted: (stepName: OnboardingStepName) => void
  trackStepCompleted: (stepName: OnboardingStepName, data?: Record<string, unknown>) => void
  trackStepSkipped: (stepName: OnboardingStepName, reason?: string) => void
  trackValidationError: (stepName: OnboardingStepName, field: string, error: string) => void
  trackOnboardingCompleted: (totalDuration: number, completedSteps: OnboardingStepName[]) => void
  trackOnboardingAbandoned: (lastStep: OnboardingStepName, reason?: string) => void
}

/**
 * Hook for tracking onboarding analytics events
 * Uses the general analytics pipeline
 */
export const useOnboardingAnalytics = (): UseOnboardingAnalyticsReturn => {
  const { track } = useAnalytics()
  const sessionStartTime = useRef<number | null>(null)
  const stepTimings = useRef<Map<OnboardingStepName, OnboardingStepTiming>>(new Map())
  const currentStep = useRef<OnboardingStepName | null>(null)

  // Initialize session on mount
  useEffect(() => {
    if (!sessionStartTime.current) {
      sessionStartTime.current = Date.now()
    }
  }, [])

  const trackOnboardingStarted = useCallback(() => {
    sessionStartTime.current = Date.now()
    
    track({
      name: 'onboarding_started',
      properties: {
        timestamp: Date.now(),
        sessionId: `onboarding_${sessionStartTime.current}`,
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        referrer: document.referrer,
      },
    })
  }, [track])

  const trackStepStarted = useCallback((stepName: OnboardingStepName) => {
    const now = Date.now()
    
    // Complete previous step timing if exists
    if (currentStep.current) {
      const prevTiming = stepTimings.current.get(currentStep.current)
      if (prevTiming && !prevTiming.endTime) {
        prevTiming.endTime = now
      }
    }

    // Start new step timing
    stepTimings.current.set(stepName, {
      stepName,
      startTime: now,
    })
    currentStep.current = stepName

    track({
      name: 'onboarding_step_started',
      properties: {
        timestamp: now,
        sessionId: `onboarding_${sessionStartTime.current}`,
        stepName,
        stepIndex: getStepIndex(stepName),
        sessionDuration: sessionStartTime.current ? now - sessionStartTime.current : 0,
      },
    })
  }, [track])

  const trackStepCompleted = useCallback((stepName: OnboardingStepName, data?: Record<string, unknown>) => {
    const now = Date.now()
    const timing = stepTimings.current.get(stepName)
    
    if (timing) {
      timing.endTime = now
    }

    const stepDuration = timing ? now - timing.startTime : 0

    track({
      name: 'onboarding_step_completed',
      properties: {
        timestamp: now,
        sessionId: `onboarding_${sessionStartTime.current}`,
        stepName,
        stepDuration,
        stepIndex: getStepIndex(stepName),
        sessionDuration: sessionStartTime.current ? now - sessionStartTime.current : 0,
        stepData: data,
      },
    })
  }, [track])

  const trackStepSkipped = useCallback((stepName: OnboardingStepName, reason?: string) => {
    const now = Date.now()
    const timing = stepTimings.current.get(stepName)
    const stepDuration = timing ? now - timing.startTime : 0

    track({
      name: 'onboarding_step_skipped',
      properties: {
        timestamp: now,
        sessionId: `onboarding_${sessionStartTime.current}`,
        stepName,
        stepDuration,
        stepIndex: getStepIndex(stepName),
        sessionDuration: sessionStartTime.current ? now - sessionStartTime.current : 0,
        skipReason: reason,
      },
    })
  }, [track])

  const trackValidationError = useCallback((stepName: OnboardingStepName, field: string, error: string) => {
    const now = Date.now()

    track({
      name: 'onboarding_validation_error',
      properties: {
        timestamp: now,
        sessionId: `onboarding_${sessionStartTime.current}`,
        stepName,
        stepIndex: getStepIndex(stepName),
        sessionDuration: sessionStartTime.current ? now - sessionStartTime.current : 0,
        field,
        error,
      },
    })
  }, [track])

  const trackOnboardingCompleted = useCallback((totalDuration: number, completedSteps: OnboardingStepName[]) => {
    const now = Date.now()
    const actualDuration = sessionStartTime.current ? now - sessionStartTime.current : totalDuration

    // Calculate step-by-step timings
    const stepTimingsData = Array.from(stepTimings.current.entries()).map(([stepName, timing]) => ({
      stepName,
      duration: timing.endTime ? timing.endTime - timing.startTime : 0,
      startTime: timing.startTime,
      endTime: timing.endTime,
    }))

    track({
      name: 'onboarding_completed',
      properties: {
        timestamp: now,
        sessionId: `onboarding_${sessionStartTime.current}`,
        totalDuration: actualDuration,
        completedSteps,
        stepCount: completedSteps.length,
        stepTimings: stepTimingsData,
        conversionRate: 1.0, // Completed successfully
      },
    })

    // Reset session data
    sessionStartTime.current = null
    stepTimings.current.clear()
    currentStep.current = null
  }, [track])

  const trackOnboardingAbandoned = useCallback((lastStep: OnboardingStepName, reason?: string) => {
    const now = Date.now()
    const sessionDuration = sessionStartTime.current ? now - sessionStartTime.current : 0

    // Get completed steps
    const completedSteps = Array.from(stepTimings.current.keys()).filter(stepName => {
      const timing = stepTimings.current.get(stepName)
      return timing?.endTime
    })

    track({
      name: 'onboarding_abandoned',
      properties: {
        timestamp: now,
        sessionId: `onboarding_${sessionStartTime.current}`,
        lastStep,
        totalDuration: sessionDuration,
        completedSteps,
        stepCount: completedSteps.length,
        abandonmentReason: reason,
        conversionRate: 0.0, // Abandoned
      },
    })

    // Reset session data
    sessionStartTime.current = null
    stepTimings.current.clear()
    currentStep.current = null
  }, [track])

  return {
    trackOnboardingStarted,
    trackStepStarted,
    trackStepCompleted,
    trackStepSkipped,
    trackValidationError,
    trackOnboardingCompleted,
    trackOnboardingAbandoned,
  }
}

/**
 * Get the index of an onboarding step for analytics
 */
function getStepIndex(stepName: OnboardingStepName): number {
  const stepOrder: OnboardingStepName[] = [
    'welcome',
    'name',
    'academics',
    'handle',
    'photo',
    'builder',
    'legal'
  ]
  
  return stepOrder.indexOf(stepName)
} 