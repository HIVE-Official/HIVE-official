import React from 'react';
interface ActivityTrackingOptions {
    userId: string;
    type: 'space_visit' | 'tool_interaction' | 'content_creation' | 'social_interaction' | 'session_start' | 'session_end';
    spaceId?: string;
    toolId?: string;
    contentId?: string;
    duration?: number;
    metadata?: Record<string, any>;
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
    trackToolInteraction(userId: string, toolId: string, spaceId?: string, metadata?: Record<string, any>): void;
    trackContentCreation(userId: string, contentId: string, spaceId?: string, metadata?: Record<string, any>): void;
    trackSocialInteraction(userId: string, spaceId?: string, metadata?: Record<string, any>): void;
    trackBatch(events: ActivityTrackingOptions[]): Promise<void>;
}
export declare const activityTracker: ActivityTracker;
export declare function useActivityTracker(): ActivityTracker;
export declare function withSpaceTracking<T extends {
    spaceId: string;
}>(Component: React.ComponentType<T>): (props: T) => import("react/jsx-runtime").JSX.Element;
export declare const trackingUtils: {
    trackPageView: (userId: string, page: string, metadata?: Record<string, any>) => void;
    trackButtonClick: (userId: string, buttonId: string, spaceId?: string, metadata?: Record<string, any>) => void;
    trackFormSubmission: (userId: string, formType: string, spaceId?: string, metadata?: Record<string, any>) => void;
    trackSearch: (userId: string, query: string, results: number, metadata?: Record<string, any>) => void;
};
export default ActivityTracker;
//# sourceMappingURL=activity-tracker.d.ts.map