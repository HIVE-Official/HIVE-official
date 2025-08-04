"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.js";
import { Badge } from "../ui/badge.js";
import { Progress } from "../hive-progress.js";
import { Activity, Users, TrendingUp, AlertTriangle, CheckCircle, Clock, BarChart3, Eye, MousePointer, Zap, Globe, Code, Award, } from "lucide-react";
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
function HiveOverviewAnalytics({ data, formatNumber, getTrendIndicator }) {
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20", children: [_jsx("div", { className: "flex items-center justify-between mb-4", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center", children: _jsx(Users, { className: "h-6 w-6 text-white" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-white", children: "Total Users" }), _jsx("p", { className: "text-sm text-hive-text-mutedLight", children: "Platform-wide" })] })] }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-3xl font-bold text-blue-400", children: formatNumber(data.overview.totalUsers) }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("span", { className: `text-sm ${getTrendIndicator(data.trends.userGrowth).color}`, children: [getTrendIndicator(data.trends.userGrowth).arrow, " ", data.trends.userGrowth, "%"] }), _jsx("span", { className: "text-xs text-hive-text-mutedLight", children: "this month" })] })] })] }), _jsxs(Card, { className: "p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20", children: [_jsx("div", { className: "flex items-center justify-between mb-4", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center", children: _jsx(Globe, { className: "h-6 w-6 text-white" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-white", children: "Spaces Created" }), _jsx("p", { className: "text-sm text-hive-text-mutedLight", children: "Community hubs" })] })] }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-3xl font-bold text-purple-400", children: formatNumber(data.overview.spacesCreated) }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("span", { className: `text-sm ${getTrendIndicator(data.trends.spaceGrowth).color}`, children: [getTrendIndicator(data.trends.spaceGrowth).arrow, " ", data.trends.spaceGrowth, "%"] }), _jsx("span", { className: "text-xs text-hive-text-mutedLight", children: "this month" })] })] })] }), _jsxs(Card, { className: "p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20", children: [_jsx("div", { className: "flex items-center justify-between mb-4", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center", children: _jsx(Code, { className: "h-6 w-6 text-white" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-white", children: "Tools Built" }), _jsx("p", { className: "text-sm text-hive-text-mutedLight", children: "Student creations" })] })] }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-3xl font-bold text-green-400", children: formatNumber(data.overview.toolsBuilt) }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("span", { className: `text-sm ${getTrendIndicator(data.trends.toolAdoption).color}`, children: [getTrendIndicator(data.trends.toolAdoption).arrow, " ", data.trends.toolAdoption, "%"] }), _jsx("span", { className: "text-xs text-hive-text-mutedLight", children: "this month" })] })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "p-6", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Activity, { className: "h-5 w-5 text-hive-gold" }), _jsx("span", { children: "Platform Health" })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "text-center mb-4", children: [_jsxs("div", { className: "text-4xl font-bold text-hive-gold mb-2", children: [data.trends.platformHealth, "%"] }), _jsx("p", { className: "text-sm text-hive-text-mutedLight", children: "Overall Health Score" })] }), _jsx(Progress, { value: data.trends.platformHealth, className: "h-3" }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-hive-text-mutedLight", children: "Uptime" }), _jsxs("span", { className: "text-green-400", children: [data.performance.uptime, "%"] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-hive-text-mutedLight", children: "Success Rate" }), _jsxs("span", { className: "text-green-400", children: [data.performance.successRate, "%"] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-hive-text-mutedLight", children: "Response Time" }), _jsxs("span", { className: "text-blue-400", children: [data.performance.apiResponseTime, "ms"] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-hive-text-mutedLight", children: "Error Rate" }), _jsxs("span", { className: "text-orange-400", children: [(data.performance.errorRate * 100).toFixed(2), "%"] })] })] })] })] }), _jsxs(Card, { className: "p-6", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(TrendingUp, { className: "h-5 w-5 text-hive-gold" }), _jsx("span", { children: "Growth Trends" })] }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-hive-text-mutedLight", children: "User Growth" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Progress, { value: Math.abs(data.trends.userGrowth) * 8, className: "w-20 h-2" }), _jsxs("span", { className: `text-sm font-medium ${getTrendIndicator(data.trends.userGrowth).color}`, children: [data.trends.userGrowth, "%"] })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-hive-text-mutedLight", children: "Space Creation" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Progress, { value: Math.abs(data.trends.spaceGrowth) * 8, className: "w-20 h-2" }), _jsxs("span", { className: `text-sm font-medium ${getTrendIndicator(data.trends.spaceGrowth).color}`, children: [data.trends.spaceGrowth, "%"] })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-hive-text-mutedLight", children: "Tool Adoption" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Progress, { value: Math.abs(data.trends.toolAdoption) * 8, className: "w-20 h-2" }), _jsxs("span", { className: `text-sm font-medium ${getTrendIndicator(data.trends.toolAdoption).color}`, children: [data.trends.toolAdoption, "%"] })] })] })] }) })] })] })] }));
}
// HIVE Performance Analytics Component
function HivePerformanceAnalytics({ data }) {
    return (_jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsxs(Card, { className: "p-6 text-center", children: [_jsx(Zap, { className: "h-8 w-8 mx-auto mb-3 text-blue-400" }), _jsxs("div", { className: "text-2xl font-bold text-white", children: [data.performance.pageLoadTime, "s"] }), _jsx("div", { className: "text-sm text-hive-text-mutedLight", children: "Page Load Time" })] }), _jsxs(Card, { className: "p-6 text-center", children: [_jsx(Activity, { className: "h-8 w-8 mx-auto mb-3 text-green-400" }), _jsxs("div", { className: "text-2xl font-bold text-white", children: [data.performance.apiResponseTime, "ms"] }), _jsx("div", { className: "text-sm text-hive-text-mutedLight", children: "API Response" })] }), _jsxs(Card, { className: "p-6 text-center", children: [_jsx(CheckCircle, { className: "h-8 w-8 mx-auto mb-3 text-green-400" }), _jsxs("div", { className: "text-2xl font-bold text-white", children: [data.performance.uptime, "%"] }), _jsx("div", { className: "text-sm text-hive-text-mutedLight", children: "Uptime" })] }), _jsxs(Card, { className: "p-6 text-center", children: [_jsx(AlertTriangle, { className: "h-8 w-8 mx-auto mb-3 text-orange-400" }), _jsxs("div", { className: "text-2xl font-bold text-white", children: [(data.performance.errorRate * 100).toFixed(2), "%"] }), _jsx("div", { className: "text-sm text-hive-text-mutedLight", children: "Error Rate" })] })] }) }));
}
// HIVE Engagement Analytics Component
function HiveEngagementAnalytics({ data, formatNumber, getTrendIndicator }) {
    return (_jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "font-semibold text-white", children: "Daily Active Users" }), _jsx(Users, { className: "h-5 w-5 text-blue-400" })] }), _jsx("div", { className: "text-3xl font-bold text-blue-400 mb-2", children: formatNumber(data.engagement.dailyActiveUsers) }), _jsx(Progress, { value: 75, className: "h-2 mb-2" }), _jsx("p", { className: "text-xs text-hive-text-mutedLight", children: "+12% vs last week" })] }), _jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "font-semibold text-white", children: "Session Time" }), _jsx(Clock, { className: "h-5 w-5 text-green-400" })] }), _jsxs("div", { className: "text-3xl font-bold text-green-400 mb-2", children: [data.engagement.averageSessionTime, "m"] }), _jsx(Progress, { value: 85, className: "h-2 mb-2" }), _jsx("p", { className: "text-xs text-hive-text-mutedLight", children: "Average per user" })] }), _jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "font-semibold text-white", children: "Tool Usage" }), _jsx(Code, { className: "h-5 w-5 text-purple-400" })] }), _jsxs("div", { className: "text-3xl font-bold text-purple-400 mb-2", children: [data.engagement.toolUsageRate, "%"] }), _jsx(Progress, { value: data.engagement.toolUsageRate, className: "h-2 mb-2" }), _jsx("p", { className: "text-xs text-hive-text-mutedLight", children: "User adoption rate" })] })] }) }));
}
// HIVE Tools Analytics Component
function HiveToolsAnalytics({ data, formatNumber }) {
    return (_jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "p-6", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Code, { className: "h-5 w-5 text-hive-gold" }), _jsx("span", { children: "Tool Statistics" })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-purple-400", children: formatNumber(data.overview.toolsBuilt) }), _jsx("p", { className: "text-sm text-hive-text-mutedLight", children: "Total Built" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-400", children: formatNumber(data.realTimeMetrics.toolsInUse) }), _jsx("p", { className: "text-sm text-hive-text-mutedLight", children: "Currently Active" })] })] }), _jsx(Progress, { value: data.engagement.toolUsageRate, className: "h-3" }), _jsxs("p", { className: "text-xs text-center text-hive-text-mutedLight", children: [data.engagement.toolUsageRate, "% adoption rate"] })] })] }), _jsxs(Card, { className: "p-6", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Award, { className: "h-5 w-5 text-hive-gold" }), _jsx("span", { children: "Popular Categories" })] }) }), _jsx(CardContent, { className: "space-y-3", children: [
                                { name: 'Academic Tools', usage: 89, color: 'bg-blue-500' },
                                { name: 'Productivity', usage: 76, color: 'bg-green-500' },
                                { name: 'Social Features', usage: 64, color: 'bg-purple-500' },
                                { name: 'Utilities', usage: 52, color: 'bg-orange-500' }
                            ].map((category) => (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-white", children: category.name }), _jsxs("span", { className: "text-hive-text-mutedLight", children: [category.usage, "%"] })] }), _jsx("div", { className: "w-full bg-hive-background-tertiary rounded-full h-2", children: _jsx("div", { className: `${category.color} h-2 rounded-full transition-all duration-300`, style: { width: `${category.usage}%` } }) })] }, category.name))) })] })] }) }));
}
//# sourceMappingURL=analytics-dashboard.js.map