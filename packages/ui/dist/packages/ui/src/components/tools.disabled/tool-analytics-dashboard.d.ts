import React from 'react';
interface ToolAnalytics {
    overview: {
        totalUsage: number;
        uniqueUsers: number;
        averageSessionDuration: number;
        totalInstallations: number;
        activeInstallations: number;
        averageRating: number;
        totalReviews: number;
        conversionRate: number;
    };
    usage: {
        timeSeriesData: Array<{
            date: string;
            usage: number;
            uniqueUsers: number;
            sessionDuration: number;
        }>;
        topActions: Array<{
            action: string;
            count: number;
            percentage: number;
        }>;
        topSpaces: Array<{
            spaceId: string;
            spaceName: string;
            usage: number;
            users: number;
        }>;
    };
    performance: {
        averageLoadTime: number;
        errorRate: number;
        crashRate: number;
        popularFeatures: Array<{
            feature: string;
            usage: number;
            retention: number;
        }>;
    };
    audience: {
        userRetention: {
            day1: number;
            day7: number;
            day30: number;
        };
        demographics: {
            byUserType: Array<{
                type: string;
                count: number;
                percentage: number;
            }>;
            byInstitution: Array<{
                institution: string;
                count: number;
                percentage: number;
            }>;
            byGeoLocation: Array<{
                location: string;
                count: number;
                percentage: number;
            }>;
        };
        engagementMetrics: {
            averageSessionsPerUser: number;
            averageTimePerSession: number;
            bounceRate: number;
        };
    };
    revenue: {
        totalRevenue: number;
        monthlyRecurringRevenue: number;
        averageRevenuePerUser: number;
        lifetimeValue: number;
        churnRate: number;
    };
}
interface ToolAnalyticsDashboardProps {
    toolId: string;
    toolName: string;
    analytics?: ToolAnalytics;
    onRefresh?: () => void;
    onExport?: (format: 'csv' | 'pdf' | 'json') => void;
    className?: string;
}
export declare const ToolAnalyticsDashboard: React.FC<ToolAnalyticsDashboardProps>;
export default ToolAnalyticsDashboard;
//# sourceMappingURL=tool-analytics-dashboard.d.ts.map