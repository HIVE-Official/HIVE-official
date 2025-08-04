'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveCard } from '../hive-card.js';
import { HiveButton } from '../hive-button.js';
import { TrendingUp, Users, Wrench, Zap, Activity, Loader2 } from 'lucide-react';
export const ProfileStats = ({ stats, isLoading = false }) => {
    if (isLoading) {
        return (_jsx(HiveCard, { className: "p-6", children: _jsx("div", { className: "flex items-center justify-center py-4", children: _jsx(Loader2, { className: "h-6 w-6 animate-spin text-[var(--hive-brand-secondary)]" }) }) }));
    }
    const statItems = [
        {
            icon: _jsx(Users, { className: "h-5 w-5" }),
            label: 'Total Spaces',
            value: stats.totalSpaces,
            subValue: `${stats.activeSpaces} active`,
            color: 'text-blue-400',
            bgColor: 'from-blue-500/20 to-blue-600/20',
            borderColor: 'border-blue-500/30'
        },
        {
            icon: _jsx(Wrench, { className: "h-5 w-5" }),
            label: 'Tools Created',
            value: stats.toolsCreated,
            subValue: 'Builder status',
            color: 'text-purple-400',
            bgColor: 'from-purple-500/20 to-purple-600/20',
            borderColor: 'border-purple-500/30'
        },
        {
            icon: _jsx(Users, { className: "h-5 w-5" }),
            label: 'Connections',
            value: stats.connectionsCount,
            subValue: 'Campus network',
            color: 'text-green-400',
            bgColor: 'from-green-500/20 to-green-600/20',
            borderColor: 'border-green-500/30'
        },
        {
            icon: _jsx(Zap, { className: "h-5 w-5" }),
            label: 'Day Streak',
            value: stats.streakDays,
            subValue: 'Keep it up!',
            color: 'text-[var(--hive-brand-secondary)]',
            bgColor: 'from-hive-gold/20 to-yellow-400/20',
            borderColor: 'border-hive-gold/30'
        },
        {
            icon: _jsx(Activity, { className: "h-5 w-5" }),
            label: 'Total Activity',
            value: stats.totalActivity,
            subValue: 'All time',
            color: 'text-orange-400',
            bgColor: 'from-orange-500/20 to-orange-600/20',
            borderColor: 'border-orange-500/30'
        }
    ];
    return (_jsxs(HiveCard, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)] flex items-center gap-2", children: [_jsx(TrendingUp, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" }), "Your Stats"] }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "View Analytics" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4", children: statItems.map((stat) => (_jsxs("div", { className: `bg-gradient-to-r ${stat.bgColor} border ${stat.borderColor} rounded-lg p-4 text-center hover:border-opacity-60 transition-all`, children: [_jsx("div", { className: `w-12 h-12 bg-[var(--hive-text-primary)]/10 rounded-lg flex items-center justify-center mx-auto mb-3 ${stat.color}`, children: stat.icon }), _jsx("div", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-1", children: stat.value }), _jsx("div", { className: "text-sm font-medium text-gray-300 mb-1", children: stat.label }), _jsx("div", { className: "text-xs text-gray-400", children: stat.subValue })] }, stat.label))) }), _jsxs("div", { className: "mt-8 pt-6 border-t border-hive-border-secondary", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "Recent Achievements" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [stats.streakDays >= 7 && (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-[var(--hive-brand-secondary)]/10 rounded-lg border border-hive-gold/20", children: [_jsx("div", { className: "w-10 h-10 bg-[var(--hive-brand-secondary)]/20 rounded-lg flex items-center justify-center", children: _jsx(Zap, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Week Warrior" }), _jsx("div", { className: "text-sm text-gray-400", children: "7+ day activity streak" })] })] })), stats.totalSpaces >= 5 && (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20", children: [_jsx("div", { className: "w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center", children: _jsx(Users, { className: "h-5 w-5 text-blue-400" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Community Explorer" }), _jsx("div", { className: "text-sm text-gray-400", children: "Joined 5+ spaces" })] })] })), stats.toolsCreated >= 1 && (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20", children: [_jsx("div", { className: "w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center", children: _jsx(Wrench, { className: "h-5 w-5 text-purple-400" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Tool Creator" }), _jsx("div", { className: "text-sm text-gray-400", children: "Built your first tool" })] })] })), stats.connectionsCount >= 50 && (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20", children: [_jsx("div", { className: "w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center", children: _jsx(Users, { className: "h-5 w-5 text-green-400" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Super Connector" }), _jsx("div", { className: "text-sm text-gray-400", children: "50+ campus connections" })] })] }))] })] }), _jsxs("div", { className: "mt-6 p-4 bg-gradient-to-r from-hive-gold/10 to-yellow-400/10 rounded-lg border border-hive-gold/20", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Activity, { className: "h-4 w-4 text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Activity Insights" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("div", { className: "text-gray-400", children: "Most Active" }), _jsx("div", { className: "text-[var(--hive-text-primary)]", children: "Weekday afternoons" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-gray-400", children: "Best Streak" }), _jsxs("div", { className: "text-[var(--hive-text-primary)]", children: [Math.max(stats.streakDays, 12), " days"] })] })] })] })] }));
};
export default ProfileStats;
//# sourceMappingURL=profile-stats.js.map