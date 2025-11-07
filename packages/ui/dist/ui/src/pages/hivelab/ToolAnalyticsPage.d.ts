export interface ToolAnalyticsData {
    overview: {
        totalUsage: number;
        activeUsers: number;
        avgRating: number;
        downloads: number;
    };
    usage: {
        daily: Array<{
            date: string;
            usage: number;
            users: number;
        }>;
        spaces: Array<{
            name: string;
            usage: number;
            members: number;
        }>;
        features: Array<{
            feature: string;
            usage: number;
            percentage: number;
        }>;
    };
    feedback: {
        ratings: Array<{
            rating: number;
            count: number;
        }>;
        comments: Array<{
            user: string;
            comment: string;
            rating: number;
            date: string;
        }>;
    };
}
export interface ToolAnalyticsPageProps {
    toolName: string;
    analytics: ToolAnalyticsData;
    timeRange?: '7d' | '30d' | '90d';
    onTimeRangeChange?: (range: '7d' | '30d' | '90d') => void;
    onBack?: () => void;
    onExport?: () => void;
}
export declare function ToolAnalyticsPage({ toolName, analytics, timeRange, onTimeRangeChange, onBack, onExport, }: ToolAnalyticsPageProps): import("react/jsx-runtime").JSX.Element;
export declare namespace ToolAnalyticsPage {
    var displayName: string;
}
//# sourceMappingURL=ToolAnalyticsPage.d.ts.map