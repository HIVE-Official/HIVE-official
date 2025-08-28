import type { OnboardingEvent, UserEngagementEvent } from './analytics-types';
/**
 * Hook to initialize analytics when user signs in
 */
export declare function useAnalyticsInit(userId?: string): void;
/**
 * Hook to track page views automatically
 */
export declare function usePageTracking(pageName: string, metadata?: Record<string, unknown>): void;
/**
 * Hook to get analytics tracking functions
 */
export declare function useAnalytics(): {
    trackAuth: (type: string, data?: Record<string, unknown>) => void;
    trackOnboardingStep: (step: OnboardingEvent["step"], stepName: OnboardingEvent["stepName"], type: OnboardingEvent["type"], data?: Record<string, unknown>) => void;
    trackClick: (component: string, action: string, metadata?: Record<string, unknown>) => void;
    trackForm: (component: string, data?: Record<string, unknown>) => void;
    trackError: (error: Error, component?: string, severity?: "low" | "medium" | "high" | "critical") => void;
};
/**
 * Hook to track onboarding step timing
 */
export declare function useOnboardingStepTracking(step: OnboardingEvent['step'], stepName: OnboardingEvent['stepName']): {
    trackStepSkipped: () => void;
    trackStepError: (error: string) => void;
};
/**
 * Hook to track user engagement automatically
 */
export declare function useEngagementTracking(): {
    trackEngagement: (type: UserEngagementEvent["type"], data?: Partial<UserEngagementEvent>) => void;
};
export declare function useErrorBoundary(component: string): {
    onError: (error: Error, errorInfo: {
        componentStack: string;
    }) => void;
};
//# sourceMappingURL=analytics-hooks.d.ts.map