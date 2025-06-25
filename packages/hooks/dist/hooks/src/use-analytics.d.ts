interface AnalyticsEvent {
    name: string;
    properties?: Record<string, unknown>;
}
export declare function useAnalytics(): {
    trackEvent: (event: AnalyticsEvent) => void;
    identify: (userId: string, traits?: Record<string, unknown>) => void;
    trackPage: (name: string, properties?: Record<string, unknown>) => void;
};
export {};
//# sourceMappingURL=use-analytics.d.ts.map