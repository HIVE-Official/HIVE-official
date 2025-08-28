'use client';
import { useEffect, useCallback } from 'react';
import { analytics } from './analytics-client';
/**
 * Hook to initialize analytics when user signs in
 */
export function useAnalyticsInit(userId) {
    useEffect(() => {
        analytics.init({
            userId,
            enabledFeatures: {
                userTracking: true,
                performanceTracking: true,
                errorTracking: true,
                engagementTracking: true
            }
        });
        if (userId) {
            analytics.setUserId(userId);
        }
    }, [userId]);
}
/**
 * Hook to track page views automatically
 */
export function usePageTracking(pageName, metadata) {
    useEffect(() => {
        analytics.trackPageView(pageName, metadata);
    }, [pageName, metadata]);
}
/**
 * Hook to get analytics tracking functions
 */
export function useAnalytics() {
    const trackAuth = useCallback((type, data) => {
        analytics.trackAuth({
            type: type,
            ...data
        });
    }, []);
    const trackOnboardingStep = useCallback((step, stepName, type, data) => {
        analytics.trackOnboarding({
            type,
            step,
            stepName,
            data
        });
    }, []);
    const trackClick = useCallback((component, action, metadata) => {
        analytics.trackClick(component, action, metadata);
    }, []);
    const trackForm = useCallback((component, data) => {
        analytics.trackFormSubmit(component, data);
    }, []);
    const trackError = useCallback((error, component, severity = 'medium') => {
        const metadata = { component, severity };
        analytics.trackError(error, metadata);
    }, []);
    return {
        trackAuth,
        trackOnboardingStep,
        trackClick,
        trackForm,
        trackError
    };
}
/**
 * Hook to track onboarding step timing
 */
export function useOnboardingStepTracking(step, stepName) {
    const { trackOnboardingStep } = useAnalytics();
    useEffect(() => {
        const startTime = Date.now();
        // Track step started
        trackOnboardingStep(step, stepName, 'step_started');
        return () => {
            // Track step completed on unmount
            const timeSpent = (Date.now() - startTime) / 1000;
            trackOnboardingStep(step, stepName, 'step_completed', { timeSpentSeconds: timeSpent });
        };
    }, [step, stepName, trackOnboardingStep]);
    const trackStepSkipped = useCallback(() => {
        trackOnboardingStep(step, stepName, 'step_skipped');
    }, [step, stepName, trackOnboardingStep]);
    const trackStepError = useCallback((error) => {
        trackOnboardingStep(step, stepName, 'step_error', { error });
    }, [step, stepName, trackOnboardingStep]);
    return {
        trackStepSkipped,
        trackStepError
    };
}
/**
 * Hook to track user engagement automatically
 */
export function useEngagementTracking() {
    const trackEngagement = useCallback((type, data) => {
        analytics.trackEngagement({
            type,
            ...data
        });
    }, []);
    return { trackEngagement };
}
export function useErrorBoundary(component) {
    return {
        onError: (error, errorInfo) => {
            const metadata = {
                component,
                componentStack: errorInfo.componentStack
            };
            analytics.trackError(error, metadata);
        }
    };
}
//# sourceMappingURL=analytics-hooks.js.map