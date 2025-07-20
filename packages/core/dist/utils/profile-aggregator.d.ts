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
    dashboard: any;
    spaces: any;
    calendar: any;
    activity: any;
    privacy: any;
    stats: any;
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
    getDashboard(timeRange?: string): Promise<any>;
    getSpacesWithActivity(timeRange?: string): Promise<any>;
    getCalendarEvents(startDate?: string, endDate?: string): Promise<any>;
    getActivityAnalytics(timeRange?: string): Promise<any>;
    getActivityInsights(timeRange?: string): Promise<any>;
    getPrivacySettings(): Promise<any>;
    getDetailedStats(timeRange?: string): Promise<any>;
    getSpaceRecommendations(type?: string, limit?: number): Promise<any>;
    batchUpdateProfile(updates: {
        privacy?: any;
        preferences?: any;
        spaceActions?: Array<{
            spaceId: string;
            action: string;
            value?: any;
        }>;
    }): Promise<any>;
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
}>): (props: T) => import("react/jsx-runtime").JSX.Element;
export declare const profileUtils: {
    calculateEngagementScore: (profileData: AggregatedProfileData) => number;
    getActivityTrend: (profileData: AggregatedProfileData) => "up" | "down" | "stable";
    formatTimeSpent: (minutes: number) => string;
    getTopSpaces: (profileData: AggregatedProfileData, limit?: number) => any[];
};
export default ProfileAggregator;
//# sourceMappingURL=profile-aggregator.d.ts.map