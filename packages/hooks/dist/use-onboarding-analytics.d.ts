import type { OnboardingStepName } from '@hive/core';
interface UseOnboardingAnalyticsReturn {
    trackOnboardingStarted: () => void;
    trackStepStarted: (stepName: OnboardingStepName) => void;
    trackStepCompleted: (stepName: OnboardingStepName, data?: Record<string, any>) => void;
    trackStepSkipped: (stepName: OnboardingStepName, reason?: string) => void;
    trackValidationError: (stepName: OnboardingStepName, field: string, error: string) => void;
    trackOnboardingCompleted: (totalDuration: number, completedSteps: OnboardingStepName[]) => void;
    trackOnboardingAbandoned: (lastStep: OnboardingStepName, reason?: string) => void;
}
/**
 * Hook for tracking onboarding analytics events
 * Uses the general analytics pipeline
 */
export declare const useOnboardingAnalytics: () => UseOnboardingAnalyticsReturn;
export {};
//# sourceMappingURL=use-onboarding-analytics.d.ts.map