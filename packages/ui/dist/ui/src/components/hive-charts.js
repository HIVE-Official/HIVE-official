"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations } from '../motion/hive-motion-system';
import { BarChart3, Zap, Users, ArrowUp, ArrowDown, Minus, Maximize2, Download, Share, Eye, EyeOff } from 'lucide-react';
// HIVE Charts System - Data Visualization with Liquid Metal Motion
// Sophisticated chart components with magnetic interactions and smooth animations
const hiveChartVariants = cva(
// Base chart styles - matte obsidian glass
"relative w-full bg-[var(--hive-background-secondary)]/20 backdrop-blur-xl border border-[var(--hive-border-glass)] rounded-2xl overflow-hidden", {
    variants: {
        variant: {
            default: "",
            premium: "border-yellow-500/20 bg-yellow-500/5",
            minimal: "border-white/5 bg-transparent",
        },
        size: {
            sm: "h-32",
            default: "h-64",
            lg: "h-80",
            xl: "h-96",
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
// Chart container with header
const ChartContainer = ({ className, variant, size, title, subtitle, loading, error, empty, actions, children, ...props }) => {
    return (_jsxs("div", { className: cn(hiveChartVariants({ variant, size, className })), ...props, children: [(title || subtitle || actions) && (_jsx("div", { className: "p-6 border-b border-white/10", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "space-y-1", children: [title && (_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: title })), subtitle && (_jsx("p", { className: "text-sm text-[var(--hive-text-primary)]/60", children: subtitle }))] }), actions && (_jsx("div", { className: "flex items-center space-x-2", children: actions }))] }) })), _jsx("div", { className: "relative flex-1 p-6", children: loading ? (_jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("div", { className: "flex items-center space-x-2 text-[var(--hive-text-primary)]/60", children: [_jsx(motion.div, { className: "w-5 h-5 border-2 border-white/20 border-t-yellow-400 rounded-full", animate: { rotate: 360 }, transition: { duration: 1, repeat: Infinity, ease: "linear" } }), _jsx("span", { children: "Loading chart..." })] }) })) : error ? (_jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("div", { className: "text-center text-red-400", children: [_jsx("div", { className: "text-4xl mb-2", children: "\u26A0\uFE0F" }), _jsx("div", { children: error })] }) })) : (children) })] }));
};
export const HiveMetricCard = ({ className, variant = "default", data, trend, sparklineData, actions, ...props }) => {
    const getTrendIcon = () => {
        switch (data.changeType || trend) {
            case 'increase':
                return _jsx(ArrowUp, { size: 16, className: "text-green-400" });
            case 'decrease':
                return _jsx(ArrowDown, { size: 16, className: "text-red-400" });
            default:
                return _jsx(Minus, { size: 16, className: "text-[var(--hive-text-primary)]/40" });
        }
    };
    const getTrendColor = () => {
        switch (data.changeType || trend) {
            case 'increase':
                return 'text-green-400';
            case 'decrease':
                return 'text-red-400';
            default:
                return 'text-[var(--hive-text-primary)]/60';
        }
    };
    return (_jsx(ChartContainer, { className: className, variant: variant, size: "sm", actions: actions, ...props, children: _jsxs("div", { className: "flex items-start justify-between h-full", children: [_jsxs("div", { className: "space-y-3 flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [data.icon && (_jsx("div", { className: cn("text-[var(--hive-text-primary)]/60", data.color), children: data.icon })), _jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]/80", children: data.label })] }), _jsxs("div", { className: "space-y-1", children: [_jsx(motion.div, { className: "text-3xl font-bold text-[var(--hive-text-primary)]", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: motionDurations.smooth, ease: liquidMetal.easing }, children: data.value }), data.subtitle && (_jsx("div", { className: "text-xs text-[var(--hive-text-primary)]/50", children: data.subtitle })), data.change !== undefined && (_jsxs(motion.div, { className: cn("flex items-center space-x-1 text-sm", getTrendColor()), initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { duration: motionDurations.smooth, delay: 0.1 }, children: [getTrendIcon(), _jsxs("span", { children: [Math.abs(data.change), "%"] })] }))] })] }), sparklineData && sparklineData.length > 0 && (_jsx("div", { className: "w-16 h-8", children: _jsx(MiniSparkline, { data: sparklineData, trend: data.changeType === 'increase' ? 'up' : data.changeType === 'decrease' ? 'down' : trend }) }))] }) }));
};
// Mini Sparkline Component
const MiniSparkline = ({ data, trend }) => {
    const svgRef = useRef(null);
    const pathData = useMemo(() => {
        if (data.length < 2)
            return '';
        const width = 64;
        const height = 32;
        const padding = 2;
        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min || 1;
        const points = data.map((value, index) => {
            const x = padding + (index / (data.length - 1)) * (width - padding * 2);
            const y = height - padding - ((value - min) / range) * (height - padding * 2);
            return `${x},${y}`;
        });
        return `M ${points.join(' L ')}`;
    }, [data]);
    const trendColor = trend === 'up' ? 'var(--hive-status-success)' : trend === 'down' ? 'var(--hive-status-error)' : 'var(--hive-text-disabled)';
    return (_jsx("svg", { ref: svgRef, width: "64", height: "32", className: "overflow-visible", children: _jsx(motion.path, { d: pathData, fill: "none", stroke: trendColor, strokeWidth: 2, initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 1, ease: liquidMetal.easing } }) }));
};
export const HiveBarChart = ({ className, variant = "default", data, horizontal = false, showValues = true, showLegend = false, colorScheme = ['var(--hive-brand-secondary)', 'var(--hive-status-info)', 'var(--hive-status-success)', 'var(--hive-status-error)', 'var(--hive-status-info)'], animated = true, ...props }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    return (_jsx(ChartContainer, { className: className, variant: variant, ...props, children: _jsxs("div", { className: cn("space-y-3", horizontal ? "space-y-2" : "h-full flex flex-col"), children: [!horizontal && (_jsx("div", { className: "flex items-end justify-between space-x-2 flex-1", children: data.map((item, index) => (_jsxs("div", { className: "flex flex-col items-center space-y-2 flex-1", children: [_jsx("div", { className: "relative w-full flex items-end justify-center", style: { height: '160px' }, children: _jsx(motion.div, { className: "w-full rounded-t-lg relative overflow-hidden", style: {
                                        backgroundColor: item.color || colorScheme[index % colorScheme.length],
                                        opacity: 0.8,
                                    }, initial: { height: 0 }, animate: { height: animated ? `${(item.value / maxValue) * 160}px` : `${(item.value / maxValue) * 160}px` }, transition: {
                                        duration: animated ? motionDurations.smooth : 0,
                                        delay: animated ? index * 0.1 : 0,
                                        ease: liquidMetal.easing
                                    }, whileHover: {
                                        opacity: 1,
                                        scale: 1.02,
                                        transition: { duration: motionDurations.quick }
                                    }, children: showValues && (_jsx(motion.div, { className: "absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-[var(--hive-text-primary)]", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: {
                                            duration: motionDurations.smooth,
                                            delay: animated ? index * 0.1 + 0.3 : 0
                                        }, children: item.value })) }) }), _jsx("div", { className: "text-xs text-[var(--hive-text-primary)]/60 text-center truncate w-full", children: item.label })] }, index))) })), horizontal && (_jsx("div", { className: "space-y-3", children: data.map((item, index) => (_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-[var(--hive-text-primary)]/80 truncate", children: item.label }), showValues && (_jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: item.value }))] }), _jsx("div", { className: "w-full bg-[var(--hive-text-primary)]/10 rounded-full h-2 overflow-hidden", children: _jsx(motion.div, { className: "h-full rounded-full", style: {
                                        backgroundColor: item.color || colorScheme[index % colorScheme.length]
                                    }, initial: { width: 0 }, animate: { width: `${(item.value / maxValue) * 100}%` }, transition: {
                                        duration: animated ? motionDurations.smooth : 0,
                                        delay: animated ? index * 0.1 : 0,
                                        ease: liquidMetal.easing
                                    }, whileHover: {
                                        scale: 1.02,
                                        transition: { duration: motionDurations.quick }
                                    } }) })] }, index))) })), showLegend && (_jsx("div", { className: "flex flex-wrap gap-4 pt-4 border-t border-white/10", children: data.map((item, index) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: item.color || colorScheme[index % colorScheme.length] } }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]/60", children: item.label })] }, index))) }))] }) }));
};
export const HiveDonutChart = ({ className, variant = "default", data, innerRadius = 0.6, showLegend = true, colorScheme = ['var(--hive-brand-secondary)', 'var(--hive-status-info)', 'var(--hive-status-success)', 'var(--hive-status-error)', 'var(--hive-status-info)'], animated = true, ...props }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const size = 200;
    const radius = size / 2 - 20;
    const innerRadiusValue = radius * innerRadius;
    let currentAngle = -90; // Start from top
    const segments = data.map((item, index) => {
        const percentage = (item.value / total) * 100;
        const angle = (item.value / total) * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;
        currentAngle += angle;
        const largeArcFlag = angle > 180 ? 1 : 0;
        const startAngleRad = (startAngle * Math.PI) / 180;
        const endAngleRad = (endAngle * Math.PI) / 180;
        const x1 = size / 2 + radius * Math.cos(startAngleRad);
        const y1 = size / 2 + radius * Math.sin(startAngleRad);
        const x2 = size / 2 + radius * Math.cos(endAngleRad);
        const y2 = size / 2 + radius * Math.sin(endAngleRad);
        const x3 = size / 2 + innerRadiusValue * Math.cos(endAngleRad);
        const y3 = size / 2 + innerRadiusValue * Math.sin(endAngleRad);
        const x4 = size / 2 + innerRadiusValue * Math.cos(startAngleRad);
        const y4 = size / 2 + innerRadiusValue * Math.sin(startAngleRad);
        const pathData = [
            `M ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `L ${x3} ${y3}`,
            `A ${innerRadiusValue} ${innerRadiusValue} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
            'Z'
        ].join(' ');
        return {
            ...item,
            pathData,
            percentage,
            color: item.color || colorScheme[index % colorScheme.length],
        };
    });
    return (_jsx(ChartContainer, { className: className, variant: variant, ...props, children: _jsxs("div", { className: "flex items-center justify-center space-x-8", children: [_jsxs("div", { className: "relative", children: [_jsx("svg", { width: size, height: size, className: "transform -rotate-90", children: segments.map((segment, index) => (_jsx(motion.path, { d: segment.pathData, fill: segment.color, stroke: "color-mix(in_srgb,var(--hive-background-primary)_10%,transparent)", strokeWidth: 1, initial: { opacity: 0, scale: 0 }, animate: { opacity: 0.8, scale: 1 }, transition: {
                                    duration: animated ? motionDurations.smooth : 0,
                                    delay: animated ? index * 0.1 : 0,
                                    ease: liquidMetal.easing
                                }, whileHover: {
                                    opacity: 1,
                                    scale: 1.05,
                                    transition: { duration: motionDurations.quick }
                                } }, index))) }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(motion.div, { className: "text-2xl font-bold text-[var(--hive-text-primary)]", initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1 }, transition: { duration: motionDurations.smooth, delay: 0.5 }, children: total }), _jsx("div", { className: "text-xs text-[var(--hive-text-primary)]/60", children: "Total" })] }) })] }), showLegend && (_jsx("div", { className: "space-y-3", children: segments.map((segment, index) => (_jsxs(motion.div, { className: "flex items-center space-x-3", initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: {
                            duration: motionDurations.smooth,
                            delay: animated ? index * 0.1 + 0.3 : 0
                        }, children: [_jsx("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: segment.color } }), _jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "text-sm text-[var(--hive-text-primary)]/80", children: segment.label }), _jsxs("div", { className: "text-xs text-[var(--hive-text-primary)]/60", children: [segment.value, " (", segment.percentage.toFixed(1), "%)"] })] })] }, index))) }))] }) }));
};
export const HiveLineChart = ({ className, variant = "default", data, smooth = true, area = false, gradient = true, color = 'var(--hive-brand-secondary)', animated = true, ...props }) => {
    const svgRef = useRef(null);
    const { pathData, areaData, points } = useMemo(() => {
        if (data.length < 2)
            return { pathData: '', areaData: '', points: [] };
        const width = 400;
        const height = 200;
        const padding = 20;
        const values = data.map(d => d.value);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const range = maxValue - minValue || 1;
        const points = data.map((point, index) => {
            const x = padding + (index / (data.length - 1)) * (width - padding * 2);
            const y = height - padding - ((point.value - minValue) / range) * (height - padding * 2);
            return { x, y, value: point.value };
        });
        const pathCommands = points.map((point, index) => {
            if (index === 0)
                return `M ${point.x},${point.y}`;
            if (smooth && index > 0) {
                const prevPoint = points[index - 1];
                const cpx1 = prevPoint.x + (point.x - prevPoint.x) * 0.5;
                const cpy1 = prevPoint.y;
                const cpx2 = prevPoint.x + (point.x - prevPoint.x) * 0.5;
                const cpy2 = point.y;
                return `C ${cpx1},${cpy1} ${cpx2},${cpy2} ${point.x},${point.y}`;
            }
            return `L ${point.x},${point.y}`;
        });
        const pathData = pathCommands.join(' ');
        const areaData = area ?
            pathData + ` L ${points[points.length - 1].x},${height - padding} L ${padding},${height - padding} Z` :
            '';
        return { pathData, areaData, points };
    }, [data, smooth, area]);
    return (_jsx(ChartContainer, { className: className, variant: variant, ...props, children: _jsx("div", { className: "w-full h-full flex items-center justify-center", children: _jsxs("svg", { width: "400", height: "200", className: "overflow-visible", children: [_jsx("defs", { children: gradient && (_jsxs("linearGradient", { id: "areaGradient", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [_jsx("stop", { offset: "0%", style: { stopColor: color, stopOpacity: 0.3 } }), _jsx("stop", { offset: "100%", style: { stopColor: color, stopOpacity: 0 } })] })) }), area && areaData && (_jsx(motion.path, { d: areaData, fill: gradient ? "url(#areaGradient)" : color, fillOpacity: gradient ? 1 : 0.2, initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: animated ? motionDurations.smooth : 0, delay: 0.2 } })), _jsx(motion.path, { d: pathData, fill: "none", stroke: color, strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round", initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: {
                            duration: animated ? motionDurations.smooth * 1.5 : 0,
                            ease: liquidMetal.easing
                        } }), points.map((point, index) => (_jsx(motion.circle, { cx: point.x, cy: point.y, r: 4, fill: color, stroke: "color-mix(in_srgb,var(--hive-background-primary)_20%,transparent)", strokeWidth: 2, initial: { scale: 0 }, animate: { scale: 1 }, transition: {
                            duration: animated ? motionDurations.quick : 0,
                            delay: animated ? index * 0.05 + 0.5 : 0
                        }, whileHover: {
                            scale: 1.5,
                            transition: { duration: motionDurations.quick }
                        } }, index)))] }) }) }));
};
// Chart Actions
export const ChartActions = ({ onMaximize, onDownload, onShare, onToggleVisibility, visible = true }) => (_jsxs("div", { className: "flex items-center space-x-2", children: [onToggleVisibility && (_jsx(motion.button, { className: "p-2 text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 hover:bg-[var(--hive-text-primary)]/10 rounded-lg transition-colors", onClick: onToggleVisibility, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: visible ? _jsx(Eye, { size: 14 }) : _jsx(EyeOff, { size: 14 }) })), onMaximize && (_jsx(motion.button, { className: "p-2 text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 hover:bg-[var(--hive-text-primary)]/10 rounded-lg transition-colors", onClick: onMaximize, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Maximize2, { size: 14 }) })), onDownload && (_jsx(motion.button, { className: "p-2 text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 hover:bg-[var(--hive-text-primary)]/10 rounded-lg transition-colors", onClick: onDownload, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Download, { size: 14 }) })), onShare && (_jsx(motion.button, { className: "p-2 text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 hover:bg-[var(--hive-text-primary)]/10 rounded-lg transition-colors", onClick: onShare, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Share, { size: 14 }) }))] }));
export const HiveCharts = ({ type, data = [], interactive, onDataPointClick, onDataPointHover, emptyStateAction, ...props }) => {
    // Sample data for different chart types
    const sampleMetricData = {
        label: "Active Tools",
        value: 42,
        change: 12.5,
        changeType: 'increase',
        icon: _jsx(Zap, { size: 20 }),
        subtitle: "This week"
    };
    const sampleBarData = [
        { label: "Mon", value: 65 },
        { label: "Tue", value: 78 },
        { label: "Wed", value: 90 },
        { label: "Thu", value: 81 },
        { label: "Fri", value: 95 }
    ];
    const sampleDonutData = [
        { label: "Tools", value: 45 },
        { label: "Spaces", value: 30 },
        { label: "Elements", value: 25 }
    ];
    const sampleLineData = [
        { timestamp: "Jan", value: 20 },
        { timestamp: "Feb", value: 35 },
        { timestamp: "Mar", value: 45 },
        { timestamp: "Apr", value: 55 },
        { timestamp: "May", value: 70 }
    ];
    const renderChart = () => {
        const chartData = data.length > 0 ? data : null;
        switch (type) {
            case 'metric':
                return (_jsx(HiveMetricCard, { data: chartData || sampleMetricData, ...props }));
            case 'bar':
                return (_jsx(HiveBarChart, { data: chartData || sampleBarData, ...props }));
            case 'donut':
            case 'pie':
                return (_jsx(HiveDonutChart, { data: chartData || sampleDonutData, ...props }));
            case 'line':
            case 'activity':
                return (_jsx(HiveLineChart, { data: chartData || sampleLineData, ...props }));
            case 'engagement':
                return (_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(HiveMetricCard, { data: { label: "Tools Created", value: 24, change: 12, changeType: 'increase', icon: _jsx(BarChart3, { size: 16 }) } }), _jsx(HiveMetricCard, { data: { label: "Spaces Active", value: 8, change: 3, changeType: 'increase', icon: _jsx(Users, { size: 16 }) } }), _jsx(HiveBarChart, { data: chartData || sampleBarData, title: "Weekly Activity", className: "col-span-2" })] }));
            default:
                return (_jsx(HiveBarChart, { data: chartData || sampleBarData, ...props }));
        }
    };
    if (data.length === 0 && emptyStateAction) {
        return (_jsx(ChartContainer, { ...props, children: _jsxs("div", { className: "flex flex-col items-center justify-center h-full text-center space-y-4", children: [_jsx("div", { className: "text-6xl opacity-30", children: "\uD83D\uDCCA" }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)]/80", children: "No Data Available" }), _jsx("p", { className: "text-sm text-[var(--hive-text-primary)]/60", children: "Start building tools to see analytics" })] }), _jsx("button", { className: "px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors", children: emptyStateAction })] }) }));
    }
    return renderChart();
};
export { ChartContainer, hiveChartVariants };
//# sourceMappingURL=hive-charts.js.map