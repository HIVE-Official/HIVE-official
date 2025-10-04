import React from 'react';
interface ProfileAggregatorOptions {
    includeSpaces?: boolean;
    includeActivity?: boolean;
    includeCalendar?: boolean;
    includePrivacy?: boolean;
    includeStats?: boolean;
    timeRange?: 'week' | 'month' | 'semester' | 'year' | 'all';
}
interface AggregatedProfileData {
    dashboard: Record<string, unknown> | null;
    spaces: Record<string, unknown> | null;
    calendar: Record<string, unknown> | null;
    activity: Record<string, unknown> | null;
    privacy: Record<string, unknown> | null;
    stats: Record<string, unknown> | null;
    metadata: {
        loadTime: number;
        endpoints: string[];
        timeRange: string;
        generatedAt: string;
    };
}
declare class ProfileAggregator {
    private static instance;
    private baseUrl;
    private cache;
    private constructor();
    static getInstance(): ProfileAggregator;
    aggregateProfileData(options?: ProfileAggregatorOptions): Promise<AggregatedProfileData>;
    getDashboard(timeRange?: string): Promise<Record<string, unknown>>;
    getSpacesWithActivity(timeRange?: string): Promise<Record<string, unknown>>;
    getCalendarEvents(startDate?: string, endDate?: string): Promise<Record<string, unknown>>;
    getActivityAnalytics(timeRange?: string): Promise<Record<string, unknown>>;
    getActivityInsights(timeRange?: string): Promise<Record<string, unknown>>;
    getPrivacySettings(): Promise<Record<string, unknown>>;
    getDetailedStats(timeRange?: string): Promise<Record<string, unknown>>;
    getSpaceRecommendations(type?: string, limit?: number): Promise<Record<string, unknown>>;
    batchUpdateProfile(updates: {
        privacy?: Record<string, unknown>;
        preferences?: Record<string, unknown>;
        spaceActions?: Array<{
            spaceId: string;
            action: string;
            value?: unknown;
        }>;
    }): Promise<Record<string, unknown>[]>;
    private updatePrivacySettings;
    private performSpaceAction;
    private fetchWithCache;
    private getDateRange;
    private getResultIndex;
    clearCache(): void;
    preloadProfileData(options?: ProfileAggregatorOptions): Promise<void>;
}
export declare const profileAggregator: ProfileAggregator;
export declare function useProfileAggregator(): ProfileAggregator;
export declare function withProfileData<T>(Component: React.ComponentType<T & {
    profileData: AggregatedProfileData;
}>): (props: T) => any;
export declare const profileUtils: {
    calculateEngagementScore: (profileData: AggregatedProfileData) => number;
    getActivityTrend: (profileData: AggregatedProfileData) => "up" | "down" | "stable";
    formatTimeSpent: (minutes: number) => string;
    getTopSpaces: (profileData: AggregatedProfileData, limit?: number) => Array<Record<string, unknown>>;
};
export default ProfileAggregator;
//# sourceMappingURL=profile-aggregator.d.ts.map