export interface HiveAnalyticsData {
    overview: {
        totalUsers: number;
        activeUsers: number;
        totalSpaces: number;
        totalTools: number;
        spacesCreated: number;
        toolsBuilt: number;
        engagementRate: number;
        retentionRate: number;
    };
    performance: {
        pageLoadTime: number;
        apiResponseTime: number;
        errorRate: number;
        uptime: number;
        successRate: number;
    };
    usage: {
        dailyActiveUsers: number;
        monthlyActiveUsers: number;
        sessionDuration: number;
        pageViews: number;
    };
    growth: {
        userGrowth: number;
        spaceGrowth: number;
        toolGrowth: number;
        engagementGrowth: number;
    };
    trends: {
        userGrowth: number;
        spaceGrowth: number;
        toolAdoption: number;
        platformHealth: number;
    };
    engagement: {
        dailyActiveUsers: number;
        averageSessionTime: number;
        toolUsageRate: number;
    };
    realTimeMetrics: {
        toolsInUse: number;
    };
}
export declare function AnalyticsDashboard(): () => void;
//# sourceMappingURL=analytics-dashboard.d.ts.map