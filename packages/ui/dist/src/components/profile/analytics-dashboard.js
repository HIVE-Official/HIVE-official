'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, Zap, Award, BarChart3, LineChart, Download, RefreshCw, ArrowUpRight, ArrowDownRight, Clock, Star, Flame, Heart } from 'lucide-react';
import { HiveCard } from '../hive-card.js';
import { HiveButton } from '../hive-button.js';
import { cn } from '../../lib/utils.js';
export const AnalyticsDashboard = ({ data, isLoading = false, onTimeframeChange, onRefresh, onExport, className }) => {
    const [selectedMetric, setSelectedMetric] = useState(null);
    const [viewMode, setViewMode] = useState('overview');
    const timeframes = [
        { id: 'week', label: 'This Week', value: '7d' },
        { id: 'month', label: 'This Month', value: '30d' },
        { id: 'semester', label: 'This Semester', value: '120d' },
        { id: 'year', label: 'This Year', value: '365d' }
    ];
    const formatValue = (metric) => {
        const { value, format, unit } = metric;
        switch (format) {
            case 'percentage':
                return `${value}%`;
            case 'currency':
                return `$${value.toLocaleString()}`;
            case 'time':
                return `${Math.floor(value / 60)}h ${value % 60}m`;
            default:
                return unit ? `${value.toLocaleString()} ${unit}` : value.toLocaleString();
        }
    };
    const getChangeIcon = (changeType) => {
        switch (changeType) {
            case 'increase':
                return _jsx(ArrowUpRight, { className: "h-4 w-4 text-green-500" });
            case 'decrease':
                return _jsx(ArrowDownRight, { className: "h-4 w-4 text-red-500" });
            default:
                return null;
        }
    };
    const getChangeColor = (changeType) => {
        switch (changeType) {
            case 'increase':
                return 'text-green-500';
            case 'decrease':
                return 'text-red-500';
            default:
                return 'text-hive-text-secondary';
        }
    };
    const topMetrics = useMemo(() => {
        return data.metrics.slice(0, 4);
    }, [data.metrics]);
    const additionalMetrics = useMemo(() => {
        return data.metrics.slice(4);
    }, [data.metrics]);
    if (isLoading) {
        return (_jsx("div", { className: cn("space-y-6", className), children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "h-8 bg-hive-surface-elevated rounded-md w-48 mb-4" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: [...Array(4)].map((_, i) => (_jsx("div", { className: "h-32 bg-hive-surface-elevated rounded-xl" }, i))) }), _jsx("div", { className: "h-64 bg-hive-surface-elevated rounded-xl" })] }) }));
    }
    return (_jsxs("div", { className: cn("space-y-6", className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-hive-text-primary", children: "Analytics Dashboard" }), _jsx("p", { className: "text-hive-text-secondary", children: "Track your campus engagement and tool usage" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "flex items-center gap-1 bg-hive-surface-elevated rounded-lg p-1", children: timeframes.map((timeframe) => (_jsx("button", { onClick: () => onTimeframeChange?.(timeframe.value), className: cn("px-3 py-2 text-sm font-medium rounded-md transition-colors", data.timeframe === timeframe.value
                                        ? "bg-hive-gold text-hive-text-primary"
                                        : "text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-background-primary"), children: timeframe.label }, timeframe.id))) }), _jsxs(HiveButton, { variant: "outline", size: "sm", onClick: onRefresh, children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Refresh"] }), _jsxs(HiveButton, { variant: "outline", size: "sm", onClick: onExport, children: [_jsx(Download, { className: "h-4 w-4 mr-2" }), "Export"] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: topMetrics.map((metric, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: _jsx(MetricCard, { metric: metric, isSelected: selectedMetric === metric.id, onClick: () => setSelectedMetric(selectedMetric === metric.id ? null : metric.id) }) }, metric.id))) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, children: _jsxs(HiveCard, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-hive-text-primary", children: selectedMetric
                                                ? data.metrics.find(m => m.id === selectedMetric)?.label
                                                : 'Activity Overview' }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Detailed analytics for the selected timeframe" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => setViewMode('overview'), className: cn("p-2 rounded-lg transition-colors", viewMode === 'overview'
                                                ? "bg-hive-gold text-hive-text-primary"
                                                : "text-hive-text-secondary hover:text-hive-text-primary"), children: _jsx(BarChart3, { className: "h-4 w-4" }) }), _jsx("button", { onClick: () => setViewMode('detailed'), className: cn("p-2 rounded-lg transition-colors", viewMode === 'detailed'
                                                ? "bg-hive-gold text-hive-text-primary"
                                                : "text-hive-text-secondary hover:text-hive-text-primary"), children: _jsx(LineChart, { className: "h-4 w-4" }) })] })] }), _jsx("div", { className: "h-64 bg-hive-background-primary rounded-lg flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-4xl mb-2", children: "\uD83D\uDCCA" }), _jsx("p", { className: "text-hive-text-secondary", children: "Interactive chart visualization" }), _jsx("p", { className: "text-sm text-hive-text-tertiary", children: "Chart component integration pending" })] }) })] }) }), additionalMetrics.length > 0 && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6 }, children: _jsxs(HiveCard, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-hive-text-primary mb-4", children: "Detailed Metrics" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: additionalMetrics.map((metric) => (_jsxs("div", { className: "flex items-center gap-3 p-4 bg-hive-background-primary rounded-lg", children: [_jsx("div", { className: "flex-shrink-0", children: metric.icon && (_jsx("div", { className: "w-10 h-10 rounded-lg bg-hive-surface-elevated flex items-center justify-center", children: metric.icon })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-hive-text-primary truncate", children: metric.label }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-lg font-bold text-hive-text-primary", children: formatValue(metric) }), metric.change !== undefined && (_jsxs("div", { className: cn("flex items-center gap-1", getChangeColor(metric.changeType)), children: [getChangeIcon(metric.changeType), _jsxs("span", { className: "text-sm font-medium", children: [metric.change > 0 ? '+' : '', metric.change, "%"] })] }))] })] })] }, metric.id))) })] }) })), _jsx("div", { className: "text-center", children: _jsxs("p", { className: "text-sm text-hive-text-secondary flex items-center justify-center gap-2", children: [_jsx(Clock, { className: "h-4 w-4" }), "Last updated: ", new Date(data.lastUpdated).toLocaleString()] }) })] }));
};
const MetricCard = ({ metric, isSelected, onClick }) => {
    const { label, value, change, changeType, icon } = metric;
    return (_jsxs(HiveCard, { className: cn("p-6 cursor-pointer transition-all duration-200 hover:shadow-lg", isSelected && "ring-2 ring-hive-gold shadow-lg"), onClick: onClick, children: [_jsx("div", { className: "flex items-start justify-between", children: _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [icon && (_jsx("div", { className: "w-8 h-8 rounded-lg bg-hive-surface-elevated flex items-center justify-center", children: icon })), _jsx("p", { className: "text-sm font-medium text-hive-text-secondary truncate", children: label })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-2xl font-bold text-hive-text-primary", children: formatValue(metric) }), change !== undefined && (_jsxs("div", { className: cn("flex items-center gap-1", getChangeColor(changeType)), children: [getChangeIcon(changeType), _jsxs("span", { className: "text-sm font-medium", children: [change > 0 ? '+' : '', change, "% vs last period"] })] }))] })] }) }), metric.trend && (_jsx("div", { className: "mt-4", children: _jsx("div", { className: "h-12 bg-hive-background-primary rounded-md flex items-end justify-between px-1", children: metric.trend.map((point, index) => (_jsx("div", { className: "w-1 bg-hive-gold rounded-t-sm", style: { height: `${(point / Math.max(...metric.trend)) * 100}%` } }, index))) }) }))] }));
};
// Sample Analytics Data Generator
export const generateSampleAnalyticsData = () => {
    return {
        timeframe: '30d',
        lastUpdated: new Date().toISOString(),
        metrics: [
            {
                id: 'spaces_joined',
                label: 'Spaces Joined',
                value: 18,
                previousValue: 15,
                change: 20,
                changeType: 'increase',
                icon: _jsx(Users, { className: "h-4 w-4 text-blue-500" }),
                trend: [12, 14, 15, 16, 17, 18, 18]
            },
            {
                id: 'tools_used',
                label: 'Tools Used',
                value: 127,
                previousValue: 98,
                change: 30,
                changeType: 'increase',
                icon: _jsx(Zap, { className: "h-4 w-4 text-green-500" }),
                trend: [98, 105, 112, 118, 123, 125, 127]
            },
            {
                id: 'study_hours',
                label: 'Study Hours',
                value: 45,
                previousValue: 52,
                change: -13,
                changeType: 'decrease',
                icon: _jsx(Clock, { className: "h-4 w-4 text-orange-500" }),
                format: 'time',
                trend: [52, 50, 48, 46, 45, 44, 45]
            },
            {
                id: 'connections_made',
                label: 'New Connections',
                value: 234,
                previousValue: 189,
                change: 24,
                changeType: 'increase',
                icon: _jsx(Heart, { className: "h-4 w-4 text-red-500" }),
                trend: [189, 195, 208, 218, 225, 230, 234]
            },
            {
                id: 'engagement_rate',
                label: 'Engagement Rate',
                value: 87,
                previousValue: 82,
                change: 6,
                changeType: 'increase',
                icon: _jsx(Activity, { className: "h-4 w-4 text-purple-500" }),
                format: 'percentage'
            },
            {
                id: 'tools_created',
                label: 'Tools Created',
                value: 12,
                previousValue: 8,
                change: 50,
                changeType: 'increase',
                icon: _jsx(Star, { className: "h-4 w-4 text-yellow-500" })
            },
            {
                id: 'achievements_earned',
                label: 'Achievements',
                value: 28,
                previousValue: 23,
                change: 22,
                changeType: 'increase',
                icon: _jsx(Award, { className: "h-4 w-4 text-gold" })
            },
            {
                id: 'weekly_streak',
                label: 'Weekly Streak',
                value: 12,
                previousValue: 9,
                change: 33,
                changeType: 'increase',
                icon: _jsx(Flame, { className: "h-4 w-4 text-orange-600" }),
                unit: 'weeks'
            }
        ],
        chartData: [] // Chart data would be populated by actual chart library
    };
};
export default AnalyticsDashboard;
//# sourceMappingURL=analytics-dashboard.js.map