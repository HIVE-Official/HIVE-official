import { useCallback, useRef, useEffect } from 'react'
import { useCreationAnalytics } from './useCreationAnalytics'
import type { OnboardingStepName, OnboardingFunnelEvent } from '@hive/core'

interface OnboardingStepTiming {
  stepName: OnboardingStepName
  startTime: number
  endTime?: number
}

interface UseOnboardingAnalyticsReturn {
  trackOnboardingStarted: () => void
  trackStepStarted: (stepName: OnboardingStepName) => void
  trackStepCompleted: (stepName: OnboardingStepName, data?: Record<string, any>) => void
  trackStepSkipped: (stepName: OnboardingStepName, reason?: string) => void
  trackValidationError: (stepName: OnboardingStepName, field: string, error: string) => void
  trackOnboardingCompleted: (totalDuration: number, completedSteps: OnboardingStepName[]) => void
  trackOnboardingAbandoned: (lastStep: OnboardingStepName, reason?: string) => void
}

/**
 * Hook for tracking onboarding analytics events
 * Integrates with the existing Creation Engine analytics pipeline
 */
export const useOnboardingAnalytics = (): UseOnboardingAnalyticsReturn => {
  const { trackEvent } = useCreationAnalytics()
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
    
    const event: OnboardingFunnelEvent = {
      type: 'onboarding_started',
      timestamp: Date.now(),
      sessionId: `onboarding_${sessionStartTime.current}`,
      metadata: {
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        referrer: document.referrer,
      },
    }

    trackEvent(event)
  }, [trackEvent])

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

    const event: OnboardingFunnelEvent = {
      type: 'onboarding_step_started',
      timestamp: now,
      sessionId: `onboarding_${sessionStartTime.current}`,
      stepName,
      metadata: {
        stepIndex: getStepIndex(stepName),
        sessionDuration: sessionStartTime.current ? now - sessionStartTime.current : 0,
      },
    }

    trackEvent(event)
  }, [trackEvent])

  const trackStepCompleted = useCallback((stepName: OnboardingStepName, data?: Record<string, any>) => {
    const now = Date.now()
    const timing = stepTimings.current.get(stepName)
    
    if (timing) {
      timing.endTime = now
    }

    const stepDuration = timing ? now - timing.startTime : 0

    const event: OnboardingFunnelEvent = {
      type: 'onboarding_step_completed',
      timestamp: now,
      sessionId: `onboarding_${sessionStartTime.current}`,
      stepName,
      stepDuration,
      metadata: {
        stepIndex: getStepIndex(stepName),
        sessionDuration: sessionStartTime.current ? now - sessionStartTime.current : 0,
        stepData: data,
      },
    }

    trackEvent(event)
  }, [trackEvent])

  const trackStepSkipped = useCallback((stepName: OnboardingStepName, reason?: string) => {
    const now = Date.now()
    const timing = stepTimings.current.get(stepName)
    const stepDuration = timing ? now - timing.startTime : 0

    const event: OnboardingFunnelEvent = {
      type: 'onboarding_step_skipped',
      timestamp: now,
      sessionId: `onboarding_${sessionStartTime.current}`,
      stepName,
      stepDuration,
      metadata: {
        stepIndex: getStepIndex(stepName),
        sessionDuration: sessionStartTime.current ? now - sessionStartTime.current : 0,
        skipReason: reason,
      },
    }

    trackEvent(event)
  }, [trackEvent])

  const trackValidationError = useCallback((stepName: OnboardingStepName, field: string, error: string) => {
    const now = Date.now()

    const event: OnboardingFunnelEvent = {
      type: 'onboarding_validation_error',
      timestamp: now,
      sessionId: `onboarding_${sessionStartTime.current}`,
      stepName,
      metadata: {
        stepIndex: getStepIndex(stepName),
        sessionDuration: sessionStartTime.current ? now - sessionStartTime.current : 0,
        field,
        error,
      },
    }

    trackEvent(event)
  }, [trackEvent])

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

    const event: OnboardingFunnelEvent = {
      type: 'onboarding_completed',
      timestamp: now,
      sessionId: `onboarding_${sessionStartTime.current}`,
      totalDuration: actualDuration,
      metadata: {
        completedSteps,
        stepCount: completedSteps.length,
        stepTimings: stepTimingsData,
        conversionRate: 1.0, // Completed successfully
      },
    }

    trackEvent(event)

    // Reset session data
    sessionStartTime.current = null
    stepTimings.current.clear()
    currentStep.current = null
  }, [trackEvent])

  const trackOnboardingAbandoned = useCallback((lastStep: OnboardingStepName, reason?: string) => {
    const now = Date.now()
    const sessionDuration = sessionStartTime.current ? now - sessionStartTime.current : 0

    // Get completed steps
    const completedSteps = Array.from(stepTimings.current.keys()).filter(stepName => {
      const timing = stepTimings.current.get(stepName)
      return timing?.endTime
    })

    const event: OnboardingFunnelEvent = {
      type: 'onboarding_abandoned',
      timestamp: now,
      sessionId: `onboarding_${sessionStartTime.current}`,
      stepName: lastStep,
      totalDuration: sessionDuration,
      metadata: {
        lastStepIndex: getStepIndex(lastStep),
        completedSteps,
        stepCount: completedSteps.length,
        abandonReason: reason,
        conversionRate: 0.0, // Abandoned
      },
    }

    trackEvent(event)

    // Reset session data
    sessionStartTime.current = null
    stepTimings.current.clear()
    currentStep.current = null
  }, [trackEvent])

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

// Helper function to get step index for analytics
function getStepIndex(stepName: OnboardingStepName): number {
  const stepOrder: OnboardingStepName[] = [
    'welcome',
    'name',
    'academics',
    'handle',
    'photo',
    'builder',
    'legal',
  ]
  
  return stepOrder.indexOf(stepName)
} 