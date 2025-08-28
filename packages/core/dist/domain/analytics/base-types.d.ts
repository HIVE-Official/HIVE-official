export interface BaseAnalyticsEvent {
    id: string;
    timestamp: Date;
    sessionId: string;
    userId?: string;
    event: string;
    category: EventCategory;
    properties: Record<string, unknown>;
    context: EventContext;
    metadata: EventMetadata;
}
export type EventCategory = "page_view" | "user_interaction" | "conversion" | "engagement" | "performance" | "error" | "system";
export interface EventContext {
    page: PageContext;
    user: UserContext;
    device: DeviceContext;
    campaign: CampaignContext;
    experiment: ExperimentContext;
}
export interface PageContext {
    url: string;
    path: string;
    title: string;
    referrer?: string;
    loadTime: number;
    scrollDepth: number;
    timeOnPage: number;
    exitPage: boolean;
}
export interface UserContext {
    isAuthenticated: boolean;
    userType: "guest" | "new" | "returning" | "verified";
    campus?: string;
    cohort?: string;
    abTestVariants: Record<string, string>;
}
export interface DeviceContext {
    type: "desktop" | "mobile" | "tablet";
    os: string;
    browser: string;
    viewport: {
        width: number;
        height: number;
    };
    connection: {
        type: "wifi" | "cellular" | "ethernet" | "unknown";
        speed: "slow" | "medium" | "fast";
    };
}
export interface CampaignContext {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
    gclid?: string;
}
export interface ExperimentContext {
    experiments: ExperimentVariant[];
}
export interface ExperimentVariant {
    id: string;
    name: string;
    variant: string;
    startDate: Date;
}
export interface EventMetadata {
    version: string;
    environment: "development" | "staging" | "production";
    buildId: string;
    region: string;
    processed: boolean;
    errors?: string[];
}
export interface TouchPoint {
    timestamp: Date;
    event: string;
    source: string;
    medium: string;
}
export declare function validateAnalyticsEvent(event: unknown): BaseAnalyticsEvent;
export declare function isValidAnalyticsEvent(event: unknown): event is BaseAnalyticsEvent;
//# sourceMappingURL=base-types.d.ts.map