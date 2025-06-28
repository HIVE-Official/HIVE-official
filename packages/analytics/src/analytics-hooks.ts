'use client'

import { useEffect, useCallback } from 'react'
import { analytics } from './analytics-client'
import type { OnboardingEvent, UserEngagementEvent } from './analytics-types'

/**
 * Hook to initialize analytics when user signs in
 */
export function useAnalyticsInit(userId?: string) {
  useEffect(() => {
    analytics.init({
      userId,
      enabledFeatures: {
        userTracking: true,
        performanceTracking: true,
        errorTracking: true,
        engagementTracking: true
      }
    })

    if (userId) {
      analytics.setUserId(userId)
    }
  }, [userId])
}

/**
 * Hook to track page views automatically
 */
export function usePageTracking(pageName: string, metadata?: Record<string, unknown>) {
  useEffect(() => {
    analytics.trackPageView(pageName, metadata)
  }, [pageName, metadata])
}

/**
 * Hook to get analytics tracking functions
 */
export function useAnalytics() {
  const trackAuth = useCallback((type: string, data?: Record<string, unknown>) => {
    analytics.trackAuth({
      type: type as 'email_entered' | 'magic_link_sent' | 'magic_link_clicked' | 'auth_success' | 'auth_error',
      ...data
    })
  }, [])

  const trackOnboardingStep = useCallback((
    step: OnboardingEvent['step'],
    stepName: OnboardingEvent['stepName'],
    type: OnboardingEvent['type'],
    data?: Record<string, unknown>
  ) => {
    analytics.trackOnboarding({
      type,
      step,
      stepName,
      data
    })
  }, [])

  const trackClick = useCallback((component: string, action: string, metadata?: Record<string, unknown>) => {
    analytics.trackClick(component, action, metadata)
  }, [])

  const trackForm = useCallback((component: string, data?: Record<string, unknown>) => {
    analytics.trackFormSubmit(component, data)
  }, [])

  const trackError = useCallback((error: Error, component?: string, severity: 'low' | 'medium' | 'high' | 'critical' = 'medium') => {
    analytics.trackError({
      message: error.message,
      stack: error.stack,
      component,
      severity
    })
  }, [])

  return {
    trackAuth,
    trackOnboardingStep,
    trackClick,
    trackForm,
    trackError
  }
}

/**
 * Hook to track onboarding step timing
 */
export function useOnboardingStepTracking(
  step: OnboardingEvent['step'],
  stepName: OnboardingEvent['stepName']
) {
  const { trackOnboardingStep } = useAnalytics()

  useEffect(() => {
    const startTime = Date.now()
    
    // Track step started
    trackOnboardingStep(step, stepName, 'step_started')

    return () => {
      // Track step completed on unmount
      const timeSpent = (Date.now() - startTime) / 1000
      trackOnboardingStep(step, stepName, 'step_completed', { timeSpentSeconds: timeSpent })
    }
  }, [step, stepName, trackOnboardingStep])

  const trackStepSkipped = useCallback(() => {
    trackOnboardingStep(step, stepName, 'step_skipped')
  }, [step, stepName, trackOnboardingStep])

  const trackStepError = useCallback((error: string) => {
    trackOnboardingStep(step, stepName, 'step_error', { error })
  }, [step, stepName, trackOnboardingStep])

  return {
    trackStepSkipped,
    trackStepError
  }
}

/**
 * Hook to track user engagement automatically
 */
export function useEngagementTracking() {
  const trackEngagement = useCallback((
    type: UserEngagementEvent['type'],
    data?: Partial<UserEngagementEvent>
  ) => {
    analytics.trackEngagement({
      type,
      ...data
    })
  }, [])

  return { trackEngagement }
} 