import React from 'react';
interface SpaceAnalytics {
    spaceId: string;
    spaceName: string;
    spaceType: string;
    membershipData: {
        totalMembers: number;
        activeMembers: number;
        newMembers: number;
        churnMembers: number;
        memberGrowthRate: number;
        averageEngagement: number;
    };
    contentData: {
        totalPosts: number;
        postsThisWeek: number;
        averageEngagement: number;
        topContentTypes: Array<{
            type: string;
            count: number;
            engagement: number;
        }>;
        contentGrowthRate: number;
        moderationQueue: number;
    };
    eventData: {
        totalEvents: number;
        upcomingEvents: number;
        averageAttendance: number;
        eventCompletionRate: number;
        topEventTypes: Array<{
            type: string;
            count: number;
            avgAttendance: number;
        }>;
    };
    toolData: {
        totalTools: number;
        activeTools: number;
        toolUsage: number;
        topTools: Array<{
            name: string;
            usage: number;
            satisfaction: number;
        }>;
    };
    healthMetrics: {
        overallHealth: number;
        engagementTrend: 'up' | 'down' | 'stable';
        alerts: Array<{
            type: 'warning' | 'critical' | 'info';
            message: string;
        }>;
        recommendations: Array<{
            priority: 'high' | 'medium' | 'low';
            action: string;
        }>;
    };
    timeSeriesData: {
        memberGrowth: Array<{
            date: string;
            members: number;
            active: number;
        }>;
        contentActivity: Array<{
            date: string;
            posts: number;
            engagement: number;
        }>;
        eventAttendance: Array<{
            date: string;
            events: number;
            attendance: number;
        }>;
    };
    lastUpdated: string;
}
interface SpaceAnalyticsDashboardProps {
    analytics: SpaceAnalytics;
    isLeader?: boolean;
    onRefresh?: () => void;
    onExportData?: () => void;
    onUpdateSettings?: () => void;
}
export declare const SpaceAnalyticsDashboard: React.FC<SpaceAnalyticsDashboardProps>;
export {};
//# sourceMappingURL=space-analytics-dashboard.d.ts.map