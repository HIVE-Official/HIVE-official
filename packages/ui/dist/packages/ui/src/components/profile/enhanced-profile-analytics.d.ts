import React from 'react';
interface ProfileAnalytics {
    weeklyActivity: Array<{
        week: string;
        spacesActive: number;
        toolsUsed: number;
        timeSpent: number;
    }>;
    topSpaces: Array<{
        id: string;
        name: string;
        timeSpent: number;
        engagement: number;
    }>;
    topTools: Array<{
        id: string;
        name: string;
        usageCount: number;
        productivity: number;
    }>;
    socialMetrics: {
        connectionsGrowth: number;
        engagementRate: number;
        helpfulnessScore: number;
    };
}
interface EnhancedProfileAnalyticsProps {
    analytics?: ProfileAnalytics;
    isLoading?: boolean;
    timeRange?: 'week' | 'month' | 'semester';
    onTimeRangeChange?: (range: 'week' | 'month' | 'semester') => void;
    className?: string;
}
export declare const EnhancedProfileAnalytics: React.FC<EnhancedProfileAnalyticsProps>;
export default EnhancedProfileAnalytics;
//# sourceMappingURL=enhanced-profile-analytics.d.ts.map