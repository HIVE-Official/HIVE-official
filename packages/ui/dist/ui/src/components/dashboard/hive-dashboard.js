'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Activity, Users, TrendingUp, Clock, Star, Eye, EyeOff, ChevronRight, BarChart3, Zap, Target, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.js';
import { Button } from '../hive-button.js';
import { Badge } from '../ui/badge.js';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.js';
import { Progress } from '../hive-progress.js';
import { Switch } from '../hive-switch.js';
// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};
const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    },
    hover: {
        y: -4,
        scale: 1.02,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
        }
    }
};
export function HiveDashboard({ data, isLoading = false, onRefresh, onNavigate, className = "" }) {
    const [timeRange, setTimeRange] = useState('week');
    const [ghostMode, setGhostMode] = useState(data?.privacy.ghostMode.enabled || false);
    // Handle ghost mode toggle
    const handleGhostModeToggle = async (enabled) => {
        setGhostMode(enabled);
        // TODO: Call API to update ghost mode
    };
    // Format duration helper
    const formatDuration = (minutes) => {
        if (minutes < 60)
            return `${minutes}m`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    };
    // Format time helper
    const formatTimeAgo = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        if (days > 0)
            return `${days}d ago`;
        if (hours > 0)
            return `${hours}h ago`;
        return 'Just now';
    };
    if (isLoading) {
        return _jsx(DashboardSkeleton, {});
    }
    if (!data) {
        return (_jsx("div", { className: "flex items-center justify-center h-96", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-lg text-gray-600 mb-4", children: "Unable to load dashboard" }), _jsx(Button, { onClick: onRefresh, children: "Try Again" })] }) }));
    }
    return (_jsxs(motion.div, { className: `dashboard-container p-6 space-y-6 ${className}`, variants: containerVariants, initial: "hidden", animate: "visible", children: [_jsxs(motion.div, { className: "dashboard-header flex items-center justify-between", variants: cardVariants, children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Avatar, { className: "h-16 w-16", children: [_jsx(AvatarImage, { src: data.user.profilePhotoUrl }), _jsx(AvatarFallback, { className: "text-xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-[var(--hive-text-primary)]", children: data.user.name.split(' ').map(n => n[0]).join('').toUpperCase() })] }), _jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-bold text-gray-900", children: ["Welcome back, ", data.user.name.split(' ')[0]] }), _jsxs("p", { className: "text-gray-600 flex items-center space-x-2", children: [_jsxs("span", { children: ["@", data.user.handle] }), data.user.major && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsx("span", { children: data.user.major })] }))] })] })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [ghostMode ? _jsx(EyeOff, { className: "h-4 w-4 text-gray-500" }) : _jsx(Eye, { className: "h-4 w-4 text-gray-500" }), _jsx("span", { className: "text-sm text-gray-600", children: "Ghost Mode" }), _jsx(Switch, { checked: ghostMode, onCheckedChange: handleGhostModeToggle })] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: onRefresh, children: [_jsx(Activity, { className: "h-4 w-4 mr-2" }), "Refresh"] })] })] }), _jsxs("div", { className: "dashboard-grid grid grid-cols-12 gap-6", children: [_jsx(motion.div, { className: "col-span-12 lg:col-span-8", variants: cardVariants, whileHover: "hover", children: _jsxs(Card, { className: "h-full bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(BarChart3, { className: "h-5 w-5 text-blue-600" }), _jsx("span", { children: "Campus Activity Summary" }), _jsx(Badge, { variant: "secondary", children: timeRange })] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(StatCard, { label: "Active Spaces", value: data.summary.activeSpaces, total: data.summary.totalSpaces, icon: _jsx(Users, { className: "h-4 w-4" }), color: "blue" }), _jsx(StatCard, { label: "Time This Week", value: formatDuration(data.summary.weeklyActivity), icon: _jsx(Clock, { className: "h-4 w-4" }), color: "green" }), _jsx(StatCard, { label: "Content Created", value: data.summary.contentCreated, icon: _jsx(Award, { className: "h-4 w-4" }), color: "purple" }), _jsx(StatCard, { label: "Tools Used", value: data.summary.toolsUsed, icon: _jsx(Zap, { className: "h-4 w-4" }), color: "orange" })] }) })] }) }), _jsx(motion.div, { className: "col-span-12 lg:col-span-4", variants: cardVariants, whileHover: "hover", children: _jsxs(Card, { className: "h-full", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Target, { className: "h-5 w-5 text-emerald-600" }), _jsx("span", { children: "Weekly Goal" })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-3xl font-bold text-emerald-600", children: [data.insights.weeklyGoal.percentage, "%"] }), _jsxs("p", { className: "text-sm text-gray-600", children: [formatDuration(data.insights.weeklyGoal.current), " of ", formatDuration(data.insights.weeklyGoal.target)] })] }), _jsx(Progress, { value: data.insights.weeklyGoal.percentage, className: "h-2" }), _jsxs("div", { className: "flex items-center justify-between text-xs text-gray-500", children: [_jsxs("span", { children: ["Current streak: ", data.insights.streaks.currentStreak, " days"] }), _jsxs("span", { children: ["Best: ", data.insights.streaks.longestStreak, " days"] })] })] })] }) }), _jsx(motion.div, { className: "col-span-12 lg:col-span-6", variants: cardVariants, whileHover: "hover", children: _jsxs(Card, { className: "h-full", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Star, { className: "h-5 w-5 text-yellow-600" }), _jsx("span", { children: "Quick Access" })] }) }), _jsx(CardContent, { className: "space-y-3", children: data.quickActions.favoriteSpaces.slice(0, 4).map((space) => (_jsxs(motion.div, { className: "flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors", onClick: () => onNavigate?.(`/spaces/${space.spaceId}`), whileHover: { x: 4 }, whileTap: { scale: 0.98 }, children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), _jsx("span", { className: "font-medium text-sm", children: space.spaceName })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [space.unreadCount > 0 && (_jsx(Badge, { variant: "destructive", className: "text-xs", children: space.unreadCount })), _jsx(ChevronRight, { className: "h-4 w-4 text-gray-400" })] })] }, space.spaceId))) })] }) }), _jsx(motion.div, { className: "col-span-12 lg:col-span-6", variants: cardVariants, whileHover: "hover", children: _jsxs(Card, { className: "h-full", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Calendar, { className: "h-5 w-5 text-indigo-600" }), _jsx("span", { children: "Upcoming Events" })] }) }), _jsx(CardContent, { className: "space-y-3", children: data.upcomingEvents.slice(0, 4).map((event) => (_jsxs(motion.div, { className: "flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors", whileHover: { x: 4 }, whileTap: { scale: 0.98 }, children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `w-2 h-2 rounded-full ${event.isToday ? 'bg-red-500' : 'bg-blue-500'}` }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-sm", children: event.title }), _jsxs("p", { className: "text-xs text-gray-500", children: [event.spaceName || 'Personal', " \u2022 ", formatTimeAgo(event.startDate)] })] })] }), event.isToday && (_jsx(Badge, { variant: "destructive", className: "text-xs", children: "Today" }))] }, event.id))) })] }) }), _jsx(motion.div, { className: "col-span-12", variants: cardVariants, whileHover: "hover", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Activity, { className: "h-5 w-5 text-green-600" }), _jsx("span", { children: "Recent Activity" })] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium text-sm text-gray-700", children: "Spaces" }), data.recentActivity.spaces.slice(0, 3).map((activity, index) => (_jsxs("div", { className: "flex items-center space-x-3 text-sm", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full" }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-gray-900", children: activity.spaceName }), _jsx("p", { className: "text-gray-500 text-xs", children: formatTimeAgo(activity.timestamp) })] })] }, index)))] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium text-sm text-gray-700", children: "Tools" }), data.recentActivity.tools.slice(0, 3).map((activity, index) => (_jsxs("div", { className: "flex items-center space-x-3 text-sm", children: [_jsx("div", { className: "w-2 h-2 bg-purple-500 rounded-full" }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-gray-900", children: activity.toolName || 'Unknown Tool' }), _jsx("p", { className: "text-gray-500 text-xs", children: formatTimeAgo(activity.timestamp) })] })] }, index)))] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium text-sm text-gray-700", children: "Social" }), data.recentActivity.social.slice(0, 3).map((activity, index) => (_jsxs("div", { className: "flex items-center space-x-3 text-sm", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-gray-900", children: activity.description }), _jsx("p", { className: "text-gray-500 text-xs", children: formatTimeAgo(activity.timestamp) })] })] }, index)))] })] }) })] }) }), _jsx(motion.div, { className: "col-span-12 lg:col-span-6", variants: cardVariants, whileHover: "hover", children: _jsxs(Card, { className: "h-full bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(TrendingUp, { className: "h-5 w-5 text-purple-600" }), _jsx("span", { children: "Campus Insights" })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Peak Activity Time" }), _jsx("span", { className: "font-semibold text-purple-600", children: data.insights.peakActivityTime })] }), data.insights.mostActiveSpace && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Most Active Space" }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "font-semibold text-sm", children: data.insights.mostActiveSpace.spaceName }), _jsx("p", { className: "text-xs text-gray-500", children: formatDuration(data.insights.mostActiveSpace.timeSpent) })] })] })), _jsx("div", { className: "pt-2 border-t border-purple-200", children: _jsx(Button, { variant: "outline", size: "sm", className: "w-full", onClick: () => onNavigate?.('/analytics'), children: "View Detailed Analytics" }) })] })] }) }), _jsx(motion.div, { className: "col-span-12 lg:col-span-6", variants: cardVariants, whileHover: "hover", children: _jsxs(Card, { className: "h-full", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Users, { className: "h-5 w-5 text-indigo-600" }), _jsx("span", { children: "Recommended Spaces" })] }) }), _jsx(CardContent, { className: "space-y-3", children: data.quickActions.recommendations.length > 0 ? (data.quickActions.recommendations.map((rec) => (_jsxs(motion.div, { className: "flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors", onClick: () => onNavigate?.(`/spaces/${rec.spaceId}`), whileHover: { x: 4 }, whileTap: { scale: 0.98 }, children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-2 h-2 bg-indigo-500 rounded-full" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-sm", children: rec.spaceName }), _jsxs("p", { className: "text-xs text-gray-500", children: [rec.matchScore, "% match \u2022 ", rec.matchReasons[0]] })] })] }), _jsx(ChevronRight, { className: "h-4 w-4 text-gray-400" })] }, rec.spaceId)))) : (_jsxs("div", { className: "text-center py-8 text-gray-500", children: [_jsx("p", { className: "text-sm", children: "No recommendations available" }), _jsx("p", { className: "text-xs mt-1", children: "Explore spaces to get personalized suggestions" })] })) })] }) })] })] }));
}
function StatCard({ label, value, total, icon, color }) {
    const colorClasses = {
        blue: 'text-blue-600 bg-blue-100',
        green: 'text-green-600 bg-green-100',
        purple: 'text-purple-600 bg-purple-100',
        orange: 'text-orange-600 bg-orange-100',
    };
    return (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: `inline-flex items-center justify-center w-10 h-10 rounded-lg ${colorClasses[color]} mb-2`, children: icon }), _jsxs("div", { className: "text-2xl font-bold text-gray-900", children: [value, total && _jsxs("span", { className: "text-gray-500", children: ["/", total] })] }), _jsx("div", { className: "text-sm text-gray-600", children: label })] }));
}
// Loading Skeleton
function DashboardSkeleton() {
    return (_jsxs("div", { className: "dashboard-container p-6 space-y-6", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "h-16 w-16 bg-gray-200 rounded-full animate-pulse" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-6 bg-gray-200 rounded w-48 animate-pulse" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-32 animate-pulse" })] })] }) }), _jsx("div", { className: "grid grid-cols-12 gap-6", children: Array.from({ length: 6 }).map((_, i) => (_jsx("div", { className: "col-span-12 lg:col-span-6", children: _jsx("div", { className: "h-48 bg-gray-200 rounded-lg animate-pulse" }) }, i))) })] }));
}
export default HiveDashboard;
//# sourceMappingURL=hive-dashboard.js.map