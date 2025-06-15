interface AnalyticsEvent {
    name: string;
    properties?: Record<string, any>;
}
export declare function useAnalytics(): {
    track: (event: AnalyticsEvent) => void;
    identify: (userId: string, traits?: Record<string, any>) => void;
    page: (name: string, properties?: Record<string, any>) => void;
};
export {};
//# sourceMappingURL=use-analytics.d.ts.map