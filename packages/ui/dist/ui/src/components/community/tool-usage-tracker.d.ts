/**
 * HIVE Tool Usage Tracker
 * Analytics and usage tracking for community tools
 */
import React from 'react';
import { Tool } from '@hive/core';
interface ToolUsageData {
    toolId: string;
    spaceId: string;
    sessions: Array<{
        id: string;
        userId: string;
        userName: string;
        startTime: string;
        endTime?: string;
        duration?: number;
        completedSuccessfully: boolean;
        dataSubmitted?: any;
        errors?: string[];
    }>;
    analytics: {
        totalSessions: number;
        uniqueUsers: number;
        averageSessionTime: number;
        completionRate: number;
        errorRate: number;
        popularityScore: number;
        dailyUsage: Array<{
            date: string;
            sessions: number;
            users: number;
        }>;
        hourlyUsage: Array<{
            hour: number;
            sessions: number;
        }>;
        userGrowth: Array<{
            period: string;
            newUsers: number;
            returningUsers: number;
        }>;
    };
    feedback: Array<{
        id: string;
        userId: string;
        userName: string;
        rating: number;
        comment?: string;
        timestamp: string;
    }>;
    performance: {
        loadTime: number;
        renderTime: number;
        errorFrequency: number;
        crashes: number;
    };
}
interface ToolUsageTrackerProps {
    tool: Tool;
    usageData: ToolUsageData;
    dateRange: '7d' | '30d' | '90d' | '1y';
    onDateRangeChange: (range: '7d' | '30d' | '90d' | '1y') => void;
    onExportData: () => void;
    userRole: 'admin' | 'moderator' | 'member';
}
export declare const ToolUsageTracker: React.FC<ToolUsageTrackerProps>;
export {};
//# sourceMappingURL=tool-usage-tracker.d.ts.map