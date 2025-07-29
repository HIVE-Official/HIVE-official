"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card } from "../ui/card.js";
import { Badge } from "../ui/badge.js";
import { Activity, Users, TrendingUp, AlertTriangle, CheckCircle, Clock, BarChart3, Eye, MousePointer, Zap, } from "lucide-react";
function MetricCard({ title, value, change, trend, icon, description, }) {
    const getTrendColor = () => {
        switch (trend) {
            case "up":
                return "text-green-400";
            case "down":
                return "text-red-400";
            default:
                return "text-gray-400";
        }
    };
    const getTrendIcon = () => {
        switch (trend) {
            case "up":
                return "↗";
            case "down":
                return "↘";
            default:
                return "→";
        }
    };
    return (_jsxs(Card, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h3", { className: "text-sm font-medium text-gray-400", children: title }), _jsx("div", { className: "text-gold", children: icon })] }), _jsx("div", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-1", children: value }), change && (_jsxs("p", { className: `text-xs ${getTrendColor()} flex items-center gap-1`, children: [_jsx("span", { children: getTrendIcon() }), change, description && _jsx("span", { className: "text-gray-500", children: "from last week" })] })), description && !change && (_jsx("p", { className: "text-xs text-gray-500", children: description }))] }));
}
function AlertItem({ severity, message, timestamp, component, }) {
    const getSeverityColor = () => {
        switch (severity) {
            case "critical":
                return "bg-red-500";
            case "high":
                return "bg-orange-500";
            case "medium":
                return "bg-yellow-500";
            default:
                return "bg-blue-500";
        }
    };
    const getSeverityIcon = () => {
        switch (severity) {
            case "critical":
            case "high":
                return _jsx(AlertTriangle, { className: "h-4 w-4" });
            default:
                return _jsx(CheckCircle, { className: "h-4 w-4" });
        }
    };
    return (_jsxs("div", { className: "flex items-start gap-3 p-3 border border-[var(--hive-border-default)] rounded-lg", children: [_jsx("div", { className: `p-1 rounded-full ${getSeverityColor()}`, children: getSeverityIcon() }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Badge, { variant: "outline", className: "text-xs", children: severity.toUpperCase() }), component && (_jsx(Badge, { variant: "outline", className: "text-xs text-gray-400", children: component }))] }), _jsx("p", { className: "text-sm text-[var(--hive-text-primary)]", children: message }), _jsxs("p", { className: "text-xs text-gray-400 mt-1 flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3" }), timestamp] })] })] }));
}
function PerformanceChart({ data, title, unit = "ms" }) {
    const maxValue = Math.max(...data.map((d) => d.value));
    return (_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-gray-400", children: title }), _jsx("div", { className: "h-24 flex items-end gap-1", children: data.map((point, index) => (_jsx("div", { className: "flex-1 bg-gold/20 hover:bg-gold/40 transition-colors relative group", style: {
                        height: `${(point.value / maxValue) * 100}%`,
                        minHeight: "0.5",
                    }, children: _jsxs("div", { className: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded text-xs text-[var(--hive-text-primary)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap", children: [point.value, unit, " at ", point.time] }) }, index))) }), _jsxs("div", { className: "flex justify-between text-xs text-gray-500", children: [_jsx("span", { children: data[0]?.time }), _jsx("span", { children: data[data.length - 1]?.time })] })] }));
}
export function AnalyticsDashboard() {
    const [timeRange, setTimeRange] = useState("24h");
    const [mockData, setMockData] = useState({
        activeUsers: 1247,
        pageViews: 8932,
        errorRate: 0.02,
        avgResponseTime: 245,
        conversionRate: 3.4,
        engagement: 85,
    });
    // Mock real-time data updates
    useEffect(() => {
        const interval = setInterval(() => {
            setMockData((prev) => ({
                ...prev,
                activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
                pageViews: prev.pageViews + Math.floor(Math.random() * 50),
                avgResponseTime: prev.avgResponseTime + Math.floor(Math.random() * 20 - 10),
            }));
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    const mockAlerts = [
        {
            severity: "high",
            message: "API response time exceeded threshold (>3s)",
            timestamp: "2 minutes ago",
            component: "Space API",
        },
        {
            severity: "medium",
            message: "Higher than usual error rate in Creator Tools",
            timestamp: "15 minutes ago",
            component: "Tool Builder",
        },
        {
            severity: "low",
            message: "Memory usage increased by 15%",
            timestamp: "1 hour ago",
            component: "Main App",
        },
    ];
    const mockPerformanceData = [
        { time: "12:00", value: 245 },
        { time: "12:15", value: 267 },
        { time: "12:30", value: 234 },
        { time: "12:45", value: 289 },
        { time: "13:00", value: 256 },
        { time: "13:15", value: 278 },
        { time: "13:30", value: 245 },
        { time: "13:45", value: 234 },
        { time: "14:00", value: 267 },
        { time: "14:15", value: 289 },
    ];
    const mockCoreWebVitals = {
        lcp: { value: 1.2, rating: "good" },
        fid: { value: 45, rating: "good" },
        cls: { value: 0.08, rating: "needs-improvement" },
    };
    const getWebVitalColor = (rating) => {
        switch (rating) {
            case "good":
                return "text-green-400";
            case "needs-improvement":
                return "text-yellow-400";
            case "poor":
                return "text-red-400";
            default:
                return "text-gray-400";
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-[var(--hive-text-primary)]", children: "Analytics Dashboard" }), _jsx("p", { className: "text-gray-400 mt-1", children: "Real-time insights and performance metrics" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: "outline", className: "text-green-400 border-green-400", children: "Live" }), _jsxs("select", { value: timeRange, onChange: (e) => {
                                        const value = e.target.value;
                                        if (["1h", "24h", "7d", "30d"].includes(value)) {
                                            setTimeRange(value);
                                        }
                                    }, className: "bg-gray-900 border border-[var(--hive-border-default)] rounded px-3 py-1 text-sm text-[var(--hive-text-primary)]", children: [_jsx("option", { value: "1h", children: "Last Hour" }), _jsx("option", { value: "24h", children: "Last 24 Hours" }), _jsx("option", { value: "7d", children: "Last 7 Days" }), _jsx("option", { value: "30d", children: "Last 30 Days" })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4", children: [_jsx(MetricCard, { title: "Active Users", value: mockData.activeUsers.toLocaleString(), change: "+12.5%", trend: "up", icon: _jsx(Users, { className: "h-5 w-5" }) }), _jsx(MetricCard, { title: "Page Views", value: mockData.pageViews.toLocaleString(), change: "+8.2%", trend: "up", icon: _jsx(Eye, { className: "h-5 w-5" }) }), _jsx(MetricCard, { title: "Error Rate", value: `${(mockData.errorRate * 100).toFixed(2)}%`, change: "-0.3%", trend: "down", icon: _jsx(AlertTriangle, { className: "h-5 w-5" }) }), _jsx(MetricCard, { title: "Avg Response", value: `${mockData.avgResponseTime}ms`, change: "+15ms", trend: "up", icon: _jsx(Zap, { className: "h-5 w-5" }) }), _jsx(MetricCard, { title: "Conversion Rate", value: `${mockData.conversionRate}%`, change: "+0.8%", trend: "up", icon: _jsx(TrendingUp, { className: "h-5 w-5" }) }), _jsx(MetricCard, { title: "Engagement", value: `${mockData.engagement}%`, change: "+5.2%", trend: "up", icon: _jsx(MousePointer, { className: "h-5 w-5" }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: "Performance Trends" }), _jsx(BarChart3, { className: "h-5 w-5 text-gold" })] }), _jsx(PerformanceChart, { data: mockPerformanceData, title: "API Response Time", unit: "ms" })] }), _jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: "Core Web Vitals" }), _jsx(Activity, { className: "h-5 w-5 text-gold" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-400", children: "Largest Contentful Paint (LCP)" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: `text-sm font-medium ${getWebVitalColor(mockCoreWebVitals.lcp.rating)}`, children: [mockCoreWebVitals.lcp.value, "s"] }), _jsx(Badge, { variant: "outline", className: `text-xs ${getWebVitalColor(mockCoreWebVitals.lcp.rating)} border-current`, children: mockCoreWebVitals.lcp.rating.replace("-", " ") })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-400", children: "First Input Delay (FID)" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: `text-sm font-medium ${getWebVitalColor(mockCoreWebVitals.fid.rating)}`, children: [mockCoreWebVitals.fid.value, "ms"] }), _jsx(Badge, { variant: "outline", className: `text-xs ${getWebVitalColor(mockCoreWebVitals.fid.rating)} border-current`, children: mockCoreWebVitals.fid.rating.replace("-", " ") })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-400", children: "Cumulative Layout Shift (CLS)" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: `text-sm font-medium ${getWebVitalColor(mockCoreWebVitals.cls.rating)}`, children: mockCoreWebVitals.cls.value }), _jsx(Badge, { variant: "outline", className: `text-xs ${getWebVitalColor(mockCoreWebVitals.cls.rating)} border-current`, children: mockCoreWebVitals.cls.rating.replace("-", " ") })] })] })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: "Live Alerts" }), _jsxs(Badge, { variant: "outline", className: "text-red-400 border-red-400", children: [mockAlerts.length, " Active"] })] }), _jsx("div", { className: "space-y-3", children: mockAlerts.map((alert, index) => (_jsx(AlertItem, { ...alert }, index))) })] }), _jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: "System Health" }), _jsx(CheckCircle, { className: "h-5 w-5 text-green-400" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-400", children: "Database" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full" }), _jsx("span", { className: "text-sm text-green-400", children: "Healthy" })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-400", children: "API Services" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full" }), _jsx("span", { className: "text-sm text-green-400", children: "Healthy" })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-400", children: "Storage" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-yellow-400 rounded-full" }), _jsx("span", { className: "text-sm text-yellow-400", children: "Warning" })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-400", children: "Authentication" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full" }), _jsx("span", { className: "text-sm text-green-400", children: "Healthy" })] })] })] })] })] })] }) }));
}
//# sourceMappingURL=analytics-dashboard.js.map