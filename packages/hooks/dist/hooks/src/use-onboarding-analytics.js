"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnboardingAnalytics = void 0;
const react_1 = require("react");
const use_analytics_1 = require("./use-analytics");
/**
 * Hook for tracking onboarding analytics events
 * Uses the general analytics pipeline
 */
const useOnboardingAnalytics = () => {
    const { track } = (0, use_analytics_1.useAnalytics)();
    const sessionStartTime = (0, react_1.useRef)(null);
    const stepTimings = (0, react_1.useRef)(new Map());
    const currentStep = (0, react_1.useRef)(null);
    // Initialize session on mount
    (0, react_1.useEffect)(() => {
        if (!sessionStartTime.current) {
            sessionStartTime.current = Date.now();
        }
    }, []);
    const trackOnboardingStarted = (0, react_1.useCallback)(() => {
        sessionStartTime.current = Date.now();
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
        });
    }, [track]);
    const trackStepStarted = (0, react_1.useCallback)((stepName) => {
        const now = Date.now();
        // Complete previous step timing if exists
        if (currentStep.current) {
            const prevTiming = stepTimings.current.get(currentStep.current);
            if (prevTiming && !prevTiming.endTime) {
                prevTiming.endTime = now;
            }
        }
        // Start new step timing
        stepTimings.current.set(stepName, {
            stepName,
            startTime: now,
        });
        currentStep.current = stepName;
        track({
            name: 'onboarding_step_started',
            properties: {
                timestamp: now,
                sessionId: `onboarding_${sessionStartTime.current}`,
                stepName,
                stepIndex: getStepIndex(stepName),
                sessionDuration: sessionStartTime.current ? now - sessionStartTime.current : 0,
            },
        });
    }, [track]);
    const trackStepCompleted = (0, react_1.useCallback)((stepName, data) => {
        const now = Date.now();
        const timing = stepTimings.current.get(stepName);
        if (timing) {
            timing.endTime = now;
        }
        const stepDuration = timing ? now - timing.startTime : 0;
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
        });
    }, [track]);
    const trackStepSkipped = (0, react_1.useCallback)((stepName, reason) => {
        const now = Date.now();
        const timing = stepTimings.current.get(stepName);
        const stepDuration = timing ? now - timing.startTime : 0;
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
        });
    }, [track]);
    const trackValidationError = (0, react_1.useCallback)((stepName, field, error) => {
        const now = Date.now();
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
        });
    }, [track]);
    const trackOnboardingCompleted = (0, react_1.useCallback)((totalDuration, completedSteps) => {
        const now = Date.now();
        const actualDuration = sessionStartTime.current ? now - sessionStartTime.current : totalDuration;
        // Calculate step-by-step timings
        const stepTimingsData = Array.from(stepTimings.current.entries()).map(([stepName, timing]) => ({
            stepName,
            duration: timing.endTime ? timing.endTime - timing.startTime : 0,
            startTime: timing.startTime,
            endTime: timing.endTime,
        }));
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
        });
        // Reset session data
        sessionStartTime.current = null;
        stepTimings.current.clear();
        currentStep.current = null;
    }, [track]);
    const trackOnboardingAbandoned = (0, react_1.useCallback)((lastStep, reason) => {
        const now = Date.now();
        const sessionDuration = sessionStartTime.current ? now - sessionStartTime.current : 0;
        // Get completed steps
        const completedSteps = Array.from(stepTimings.current.keys()).filter(stepName => {
            const timing = stepTimings.current.get(stepName);
            return timing?.endTime;
        });
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
        });
        // Reset session data
        sessionStartTime.current = null;
        stepTimings.current.clear();
        currentStep.current = null;
    }, [track]);
    return {
        trackOnboardingStarted,
        trackStepStarted,
        trackStepCompleted,
        trackStepSkipped,
        trackValidationError,
        trackOnboardingCompleted,
        trackOnboardingAbandoned,
    };
};
exports.useOnboardingAnalytics = useOnboardingAnalytics;
/**
 * Get the index of an onboarding step for analytics
 */
function getStepIndex(stepName) {
    const stepOrder = [
        'welcome',
        'name',
        'academics',
        'handle',
        'photo',
        'builder',
        'legal'
    ];
    return stepOrder.indexOf(stepName);
}
//# sourceMappingURL=use-onboarding-analytics.js.map