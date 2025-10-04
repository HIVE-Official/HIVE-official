import * as React from "react";
export interface ToolAnalytics {
    toolId: string;
    toolName: string;
    toolIcon: string;
    totalSubmissions: number;
    submissionTrend: number;
    completionRate: number;
    avgCompletionTime: string;
    totalViews: number;
    uniqueUsers: number;
    abandonmentRate: number;
    activeMembers: number;
    totalMembers: number;
    participationRate: number;
    topContributors: Array<{
        name: string;
        handle: string;
        count: number;
    }>;
    usageByHour: Array<{
        hour: number;
        count: number;
    }>;
    usageByDay: Array<{
        day: string;
        count: number;
    }>;
    topResponses?: Array<{
        answer: string;
        count: number;
        percentage: number;
    }>;
}
export interface AnalyticsInsight {
    id: string;
    type: "success" | "warning" | "info";
    title: string;
    description: string;
    metric?: string;
    icon: React.ReactNode;
}
export interface HiveLabAnalyticsDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Analytics data for tools */
    toolsAnalytics?: ToolAnalytics[];
    /** Selected tool ID */
    selectedToolId?: string;
    /** Tool selection handler */
    onToolSelect?: (toolId: string) => void;
    /** Date range */
    dateRange?: "7d" | "30d" | "90d" | "all";
    /** Date range change handler */
    onDateRangeChange?: (range: "7d" | "30d" | "90d" | "all") => void;
    /** Export data handler */
    onExport?: (format: "csv" | "pdf") => void;
    /** Insights */
    insights?: AnalyticsInsight[];
}
declare const HiveLabAnalyticsDashboard: React.ForwardRefExoticComponent<HiveLabAnalyticsDashboardProps & React.RefAttributes<HTMLDivElement>>;
export { HiveLabAnalyticsDashboard };
//# sourceMappingURL=hivelab-analytics-dashboard.d.ts.map