'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, TrendingDown, Clock, Users, Zap, Target, BarChart3, Download, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../hive-button';
import { Badge } from '../ui/badge';
import { Progress } from '../hive-progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20
        }
    }
};
export function ActivityTracker({ data, isLoading = false, onTimeRangeChange, onRefresh, onExport, onGoalUpdate, className = "" }) {
    const [activeView, setActiveView] = useState('overview');
    const [timeRange, setTimeRange] = useState(data?.timeRange || 'week');
    const handleTimeRangeChange = (range) => {
        setTimeRange(range);
        onTimeRangeChange?.(range);
    };
    // Calculate completion percentage for goals
    const goalCompletions = useMemo(() => {
        if (!data?.goals)
            return {};
        return data.goals.reduce((acc, goal) => {
            acc[goal.id] = Math.min((goal.current / goal.target) * 100, 100);
            return acc;
        }, {});
    }, [data?.goals]);
    // Group sessions by date
    const sessionsByDate = useMemo(() => {
        if (!data?.sessions)
            return {};
        return data.sessions.reduce((acc, session) => {
            const date = session.startTime.split('T')[0];
            if (!acc[date])
                acc[date] = [];
            acc[date].push(session);
            return acc;
        }, {});
    }, [data?.sessions]);
    // Format duration
    const formatDuration = (minutes) => {
        if (minutes < 60)
            return `${minutes}m`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    };
    // Format time
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };
    if (isLoading) {
        return _jsx(ActivityTrackerSkeleton, {});
    }
    if (!data) {
        return (_jsx("div", { className: "flex items-center justify-center h-96", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-lg text-gray-600 mb-4", children: "Unable to load activity data" }), _jsx(Button, { onClick: onRefresh, children: "Try Again" })] }) }));
    }
    return (_jsxs(motion.div, { className: `activity-tracker space-y-6 ${className}`, variants: containerVariants, initial: "hidden", animate: "visible", children: [_jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { children: _jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Activity, { className: "h-5 w-5 text-blue-600" }), _jsx("span", { children: "Activity Tracker" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Tabs, { value: timeRange, onValueChange: (value) => handleTimeRangeChange(value), children: _jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [_jsx(TabsTrigger, { value: "today", children: "Today" }), _jsx(TabsTrigger, { value: "week", children: "Week" }), _jsx(TabsTrigger, { value: "month", children: "Month" })] }) }), _jsx(Button, { variant: "outline", size: "sm", onClick: onRefresh, children: _jsx(RefreshCw, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", size: "sm", onClick: onExport, children: _jsx(Download, { className: "h-4 w-4" }) })] })] }) }) }) }), _jsx(motion.div, { variants: itemVariants, children: _jsxs(Tabs, { value: activeView, onValueChange: (value) => setActiveView(value), children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [_jsx(TabsTrigger, { value: "overview", children: "Overview" }), _jsx(TabsTrigger, { value: "sessions", children: "Sessions" }), _jsx(TabsTrigger, { value: "goals", children: "Goals" })] }), _jsxs(TabsContent, { value: "overview", className: "space-y-6 mt-6", children: [_jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: data.metrics.map((metric) => (_jsx(motion.div, { variants: itemVariants, whileHover: { y: -2 }, children: _jsx(Card, { className: "h-full", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("div", { className: `p-2 rounded-lg bg-${metric.color}-100`, children: _jsx("div", { className: `text-${metric.color}-600`, children: metric.icon }) }), _jsxs("div", { className: "flex items-center space-x-1 text-xs", children: [metric.changeType === 'increase' ? (_jsx(TrendingUp, { className: "h-3 w-3 text-green-500" })) : metric.changeType === 'decrease' ? (_jsx(TrendingDown, { className: "h-3 w-3 text-red-500" })) : null, _jsxs("span", { className: `
                            ${metric.changeType === 'increase' ? 'text-green-600' : ''}
                            ${metric.changeType === 'decrease' ? 'text-red-600' : ''}
                            ${metric.changeType === 'neutral' ? 'text-gray-500' : ''}
                          `, children: [metric.change > 0 ? '+' : '', metric.change, "%"] })] })] }), _jsxs("div", { className: "text-2xl font-bold text-gray-900", children: [metric.value, _jsx("span", { className: "text-sm text-gray-500 ml-1", children: metric.unit })] }), _jsx("div", { className: "text-sm text-gray-600", children: metric.name }), metric.target && (_jsxs("div", { className: "mt-2", children: [_jsx(Progress, { value: (metric.value / metric.target) * 100, className: "h-1" }), _jsxs("div", { className: "text-xs text-gray-500 mt-1", children: ["Target: ", metric.target, " ", metric.unit] })] }))] }) }) }, metric.id))) }), _jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(BarChart3, { className: "h-5 w-5 text-purple-600" }), _jsx("span", { children: "Weekly Summary" })] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-6 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: formatDuration(data.weeklyStats.totalHours) }), _jsx("div", { className: "text-sm text-gray-600", children: "Total Time" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: formatDuration(data.weeklyStats.avgSessionLength) }), _jsx("div", { className: "text-sm text-gray-600", children: "Avg Session" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: data.weeklyStats.mostActiveDay }), _jsx("div", { className: "text-sm text-gray-600", children: "Most Active" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-orange-600", children: data.weeklyStats.preferredTimeSlot }), _jsx("div", { className: "text-sm text-gray-600", children: "Peak Hours" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-indigo-600", children: data.weeklyStats.spacesVisited }), _jsx("div", { className: "text-sm text-gray-600", children: "Spaces" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-pink-600", children: data.weeklyStats.toolsUsed }), _jsx("div", { className: "text-sm text-gray-600", children: "Tools" })] })] }) })] }) }), _jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(TrendingUp, { className: "h-5 w-5 text-emerald-600" }), _jsx("span", { children: "Insights & Recommendations" })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: data.insights.map((insight) => (_jsx(motion.div, { className: `p-4 rounded-lg border ${insight.type === 'achievement' ? 'bg-green-50 border-green-200' :
                                                            insight.type === 'warning' ? 'bg-red-50 border-red-200' :
                                                                insight.type === 'recommendation' ? 'bg-blue-50 border-blue-200' :
                                                                    'bg-purple-50 border-purple-200'}`, whileHover: { x: 4 }, children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-medium text-sm mb-1", children: insight.title }), _jsx("p", { className: "text-xs text-gray-600 mb-2", children: insight.description }), insight.actionable && insight.action && (_jsx(Button, { variant: "outline", size: "sm", className: "text-xs", children: insight.action.label }))] }), _jsx(Badge, { variant: insight.priority === 'high' ? 'destructive' : 'secondary', className: "text-xs", children: insight.priority })] }) }, insight.id))) }) })] }) })] }), _jsx(TabsContent, { value: "sessions", className: "space-y-6 mt-6", children: _jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Clock, { className: "h-5 w-5 text-blue-600" }), _jsx("span", { children: "Recent Sessions" })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: Object.entries(sessionsByDate).map(([date, sessions]) => (_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-sm text-gray-700 mb-2", children: new Date(date).toLocaleDateString('en-US', {
                                                                weekday: 'long',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            }) }), _jsx("div", { className: "space-y-2", children: sessions.map((session) => (_jsxs(motion.div, { className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg", whileHover: { x: 2 }, children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${session.activityType === 'study' ? 'bg-blue-500' :
                                                                                    session.activityType === 'social' ? 'bg-green-500' :
                                                                                        session.activityType === 'tool_usage' ? 'bg-purple-500' :
                                                                                            'bg-orange-500'}` }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-sm", children: session.spaceName }), _jsxs("p", { className: "text-xs text-gray-500", children: [formatTime(session.startTime), " - ", formatTime(session.endTime)] })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-sm font-medium", children: formatDuration(session.duration) }), _jsx(Badge, { variant: "outline", className: "text-xs", children: session.activityType.replace('_', ' ') })] })] }, session.id))) })] }, date))) }) })] }) }) }), _jsx(TabsContent, { value: "goals", className: "space-y-6 mt-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: data.goals.map((goal) => (_jsx(motion.div, { variants: itemVariants, whileHover: { y: -2 }, children: _jsx(Card, { className: "h-full", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-sm mb-1", children: goal.title }), _jsx("p", { className: "text-xs text-gray-600", children: goal.description })] }), _jsx(Badge, { variant: "outline", className: "text-xs", children: goal.category })] }), _jsxs("div", { className: "mb-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsxs("span", { className: "text-sm font-medium", children: [goal.current, " / ", goal.target, " ", goal.unit] }), _jsxs("span", { className: "text-sm text-gray-500", children: [Math.round(goalCompletions[goal.id]), "%"] })] }), _jsx(Progress, { value: goalCompletions[goal.id], className: "h-2" })] }), _jsxs("div", { className: "text-xs text-gray-500", children: ["Due: ", new Date(goal.deadline).toLocaleDateString()] })] }) }) }, goal.id))) }) })] }) })] }));
}
// Loading Skeleton
function ActivityTrackerSkeleton() {
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "h-20 bg-gray-200 rounded-lg animate-pulse" }), _jsx("div", { className: "h-12 bg-gray-200 rounded-lg animate-pulse" }), _jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: Array.from({ length: 4 }).map((_, i) => (_jsx("div", { className: "h-32 bg-gray-200 rounded-lg animate-pulse" }, i))) }), _jsx("div", { className: "h-40 bg-gray-200 rounded-lg animate-pulse" }), _jsx("div", { className: "h-48 bg-gray-200 rounded-lg animate-pulse" })] }));
}
// Mock data for development
export const mockActivityTrackerData = {
    metrics: [
        {
            id: 'total_time',
            name: 'Total Time',
            value: 24,
            unit: 'hours',
            change: 12,
            changeType: 'increase',
            target: 30,
            color: 'blue',
            icon: _jsx(Clock, { className: "h-4 w-4" })
        },
        {
            id: 'spaces_visited',
            name: 'Spaces',
            value: 8,
            unit: 'spaces',
            change: 2,
            changeType: 'increase',
            color: 'green',
            icon: _jsx(Users, { className: "h-4 w-4" })
        },
        {
            id: 'tools_used',
            name: 'Tools',
            value: 15,
            unit: 'tools',
            change: 5,
            changeType: 'increase',
            color: 'purple',
            icon: _jsx(Zap, { className: "h-4 w-4" })
        },
        {
            id: 'goals_completed',
            name: 'Goals',
            value: 3,
            unit: 'completed',
            change: 0,
            changeType: 'neutral',
            color: 'orange',
            icon: _jsx(Target, { className: "h-4 w-4" })
        }
    ],
    sessions: [
        {
            id: 'session_1',
            spaceId: 'cs_majors',
            spaceName: 'CS Majors',
            startTime: new Date().toISOString(),
            endTime: new Date(Date.now() + 7200000).toISOString(),
            duration: 120,
            activityType: 'study',
            toolsUsed: ['gpa_calculator', 'study_timer'],
            interactions: 15
        }
    ],
    insights: [
        {
            id: 'insight_1',
            title: 'Great Progress!',
            description: 'You\'ve exceeded your weekly study goal by 20%',
            type: 'achievement',
            priority: 'medium',
            actionable: false
        },
        {
            id: 'insight_2',
            title: 'Consider Morning Sessions',
            description: 'Your focus appears highest between 9-11 AM',
            type: 'recommendation',
            priority: 'low',
            actionable: true,
            action: {
                label: 'Schedule Morning Time'
            }
        }
    ],
    goals: [
        {
            id: 'goal_1',
            title: 'Weekly Study Goal',
            description: 'Maintain consistent study schedule',
            target: 25,
            current: 24,
            unit: 'hours',
            deadline: new Date(Date.now() + 259200000).toISOString(),
            category: 'weekly',
            color: 'blue'
        }
    ],
    timeRange: 'week',
    weeklyStats: {
        totalHours: 24,
        avgSessionLength: 45,
        mostActiveDay: 'Tuesday',
        preferredTimeSlot: '2-4 PM',
        spacesVisited: 8,
        toolsUsed: 15
    }
};
export default ActivityTracker;
//# sourceMappingURL=activity-tracker.js.map