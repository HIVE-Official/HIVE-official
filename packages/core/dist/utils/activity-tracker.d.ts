import React from 'react';
interface ActivityTrackingOptions {
    userId: string;
    type: 'space_visit' | 'tool_interaction' | 'content_creation' | 'social_interaction' | 'session_start' | 'session_end';
    spaceId?: string;
    toolId?: string;
    contentId?: string;
    duration?: number;
    metadata?: Record<string, unknown>;
}
declare class ActivityTracker {
    private static instance;
    private baseUrl;
    private sessionStartTime;
    private currentSpaceId;
    private spaceVisitStart;
    private constructor();
    static getInstance(): ActivityTracker;
    trackActivity(options: ActivityTrackingOptions): Promise<void>;
    startSession(userId: string): void;
    endSession(userId: string): void;
    enterSpace(userId: string, spaceId: string): void;
    exitSpace(userId: string): void;
    trackToolInteraction(userId: string, toolId: string, spaceId?: string, metadata?: Record<string, unknown>): void;
    trackContentCreation(userId: string, contentId: string, spaceId?: string, metadata?: Record<string, unknown>): void;
    trackSocialInteraction(userId: string, spaceId?: string, metadata?: Record<string, unknown>): void;
    trackBatch(events: ActivityTrackingOptions[]): Promise<void>;
}
export declare const activityTracker: ActivityTracker;
export declare function useActivityTracker(): ActivityTracker;
export declare function withSpaceTracking<T extends {
    spaceId: string;
}>(Component: React.ComponentType<T>): (props: T) => any;
export declare const trackingUtils: {
    trackPageView: (userId: string, page: string, metadata?: Record<string, unknown>) => void;
    trackButtonClick: (userId: string, buttonId: string, spaceId?: string, metadata?: Record<string, unknown>) => void;
    trackFormSubmission: (userId: string, formType: string, spaceId?: string, metadata?: Record<string, unknown>) => void;
    trackSearch: (userId: string, query: string, results: number, metadata?: Record<string, unknown>) => void;
};
export default ActivityTracker;
//# sourceMappingURL=activity-tracker.d.ts.map