import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveChartVariants: (props?: {
    variant?: "default" | "premium" | "minimal";
    size?: "sm" | "lg" | "xl" | "default";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface ChartDataPoint {
    label: string;
    value: number;
    color?: string;
    metadata?: Record<string, any>;
}
export interface TimeSeriesDataPoint {
    timestamp: string | number;
    value: number;
    label?: string;
    color?: string;
}
export interface MetricData {
    label: string;
    value: number | string;
    change?: number;
    changeType?: 'increase' | 'decrease' | 'neutral';
    icon?: React.ReactNode;
    color?: string;
    subtitle?: string;
}
export interface BaseChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>, VariantProps<typeof hiveChartVariants> {
    title?: string;
    subtitle?: string;
    loading?: boolean;
    error?: string;
    empty?: React.ReactNode;
    actions?: React.ReactNode;
    showLegend?: boolean;
    showTooltip?: boolean;
    animated?: boolean;
}
declare const ChartContainer: React.FC<BaseChartProps & {
    children: React.ReactNode;
}>;
export interface HiveMetricCardProps extends BaseChartProps {
    data: MetricData;
    trend?: 'up' | 'down' | 'neutral';
    sparklineData?: number[];
}
export declare const HiveMetricCard: React.FC<HiveMetricCardProps>;
export interface HiveBarChartProps extends BaseChartProps {
    data: ChartDataPoint[];
    horizontal?: boolean;
    showValues?: boolean;
    colorScheme?: string[];
}
export declare const HiveBarChart: React.FC<HiveBarChartProps>;
export interface HiveDonutChartProps extends BaseChartProps {
    data: ChartDataPoint[];
    innerRadius?: number;
    colorScheme?: string[];
}
export declare const HiveDonutChart: React.FC<HiveDonutChartProps>;
export interface HiveLineChartProps extends BaseChartProps {
    data: TimeSeriesDataPoint[];
    smooth?: boolean;
    area?: boolean;
    gradient?: boolean;
    color?: string;
}
export declare const HiveLineChart: React.FC<HiveLineChartProps>;
export declare const ChartActions: React.FC<{
    onMaximize?: () => void;
    onDownload?: () => void;
    onShare?: () => void;
    onToggleVisibility?: () => void;
    visible?: boolean;
}>;
export interface HiveChartsProps extends BaseChartProps {
    type: 'metric' | 'bar' | 'donut' | 'line' | 'engagement' | 'activity' | 'pie';
    data?: any;
    interactive?: boolean;
    onDataPointClick?: (data: any) => void;
    onDataPointHover?: (data: any) => void;
    emptyStateAction?: string;
}
export declare const HiveCharts: React.FC<HiveChartsProps>;
export { ChartContainer, hiveChartVariants };
//# sourceMappingURL=hive-charts.d.ts.map