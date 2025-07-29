import React from 'react';
export interface AnalyticsMetric {
    id: string;
    label: string;
    value: number;
    previousValue?: number;
    change?: number;
    changeType?: 'increase' | 'decrease' | 'neutral';
    trend?: number[];
    unit?: string;
    format?: 'number' | 'percentage' | 'currency' | 'time';
    icon?: React.ReactNode;
    color?: string;
}
export interface AnalyticsTimeframe {
    id: string;
    label: string;
    value: string;
}
export interface AnalyticsData {
    timeframe: string;
    metrics: AnalyticsMetric[];
    chartData: any[];
    lastUpdated: string;
}
interface AnalyticsDashboardProps {
    data: AnalyticsData;
    isLoading?: boolean;
    onTimeframeChange?: (timeframe: string) => void;
    onRefresh?: () => void;
    onExport?: () => void;
    className?: string;
}
export declare const AnalyticsDashboard: React.FC<AnalyticsDashboardProps>;
export declare const generateSampleAnalyticsData: () => AnalyticsData;
export default AnalyticsDashboard;
//# sourceMappingURL=analytics-dashboard.d.ts.map