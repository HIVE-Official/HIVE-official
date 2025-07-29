import React from 'react';
export interface ActivityMetric {
    id: string;
    name: string;
    value: number;
    unit: string;
    change: number;
    changeType: 'increase' | 'decrease' | 'neutral';
    target?: number;
    color: string;
    icon: React.ReactNode;
}
export interface ActivitySession {
    id: string;
    spaceId: string;
    spaceName: string;
    startTime: string;
    endTime: string;
    duration: number;
    activityType: 'study' | 'social' | 'tool_usage' | 'content_creation';
    toolsUsed?: string[];
    contentCreated?: {
        type: string;
        count: number;
    }[];
    interactions?: number;
}
export interface ActivityInsight {
    id: string;
    title: string;
    description: string;
    type: 'achievement' | 'recommendation' | 'warning' | 'milestone';
    priority: 'high' | 'medium' | 'low';
    actionable: boolean;
    action?: {
        label: string;
        url?: string;
    };
}
export interface ActivityGoal {
    id: string;
    title: string;
    description: string;
    target: number;
    current: number;
    unit: string;
    deadline: string;
    category: 'daily' | 'weekly' | 'monthly';
    color: string;
}
export interface ActivityTrackerData {
    metrics: ActivityMetric[];
    sessions: ActivitySession[];
    insights: ActivityInsight[];
    goals: ActivityGoal[];
    timeRange: 'today' | 'week' | 'month';
    weeklyStats: {
        totalHours: number;
        avgSessionLength: number;
        mostActiveDay: string;
        preferredTimeSlot: string;
        spacesVisited: number;
        toolsUsed: number;
    };
    heatmapData?: Array<{
        date: string;
        value: number;
    }>;
}
interface ActivityTrackerProps {
    data?: ActivityTrackerData;
    isLoading?: boolean;
    onTimeRangeChange?: (range: 'today' | 'week' | 'month') => void;
    onRefresh?: () => void;
    onExport?: () => void;
    onGoalUpdate?: (goalId: string, newTarget: number) => void;
    className?: string;
}
export declare function ActivityTracker({ data, isLoading, onTimeRangeChange, onRefresh, onExport, onGoalUpdate, className }: ActivityTrackerProps): import("react/jsx-runtime").JSX.Element;
export declare const mockActivityTrackerData: ActivityTrackerData;
export default ActivityTracker;
//# sourceMappingURL=activity-tracker.d.ts.map