"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { ProfileHeader } from '../molecules/profile-header';
import { ProfileStats } from '../molecules/profile-stats';
import { Clock, Users, Zap, Award, Calendar } from 'lucide-react';
const profileCardVariants = cva("bg-hive-surface-elevated border border-hive-border-subtle rounded-xl transition-all duration-200", {
    variants: {
        size: {
            sm: "p-4 space-y-4",
            md: "p-6 space-y-6",
            lg: "p-8 space-y-8"
        },
        variant: {
            default: "shadow-sm hover:shadow-md",
            elevated: "shadow-lg hover:shadow-xl",
            minimal: "shadow-none border-0",
            interactive: "shadow-sm hover:shadow-lg hover:scale-[1.02] cursor-pointer"
        },
        layout: {
            vertical: "flex flex-col",
            horizontal: "flex flex-row gap-6",
            stacked: "space-y-6"
        }
    },
    defaultVariants: {
        size: "md",
        variant: "default",
        layout: "stacked"
    }
});
export function HiveProfileCard({ user, stats, recentActivity = [], isOwnProfile = false, showStats = true, showActivity = true, showHeader = true, maxActivities = 3, onEditProfile, onEditAvatar, onShareProfile, onViewActivity, onStatClick, loading = false, size = "md", variant = "default", layout = "stacked", className, ...props }) {
    // Get activity icon based on HIVE activity types
    const getActivityIcon = (type, action) => {
        switch (type) {
            case 'space': return _jsx(Users, { className: "h-4 w-4 text-hive-brand-secondary" });
            case 'tool': return _jsx(Zap, { className: "h-4 w-4 text-hive-gold" });
            case 'connection': return _jsx(Users, { className: "h-4 w-4 text-purple-400" });
            case 'achievement': return _jsx(Award, { className: "h-4 w-4 text-yellow-400" });
            case 'builder': return _jsx(Zap, { className: "h-4 w-4 text-hive-gold" });
            default: return _jsx(Clock, { className: "h-4 w-4 text-hive-text-secondary" });
        }
    };
    // Format timestamp for display
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
        if (diffInHours < 1)
            return 'Just now';
        if (diffInHours < 24)
            return `${diffInHours}h ago`;
        if (diffInHours < 168)
            return `${Math.floor(diffInHours / 24)}d ago`;
        return date.toLocaleDateString();
    };
    const displayActivities = recentActivity.slice(0, maxActivities);
    if (loading) {
        return (_jsx("div", { className: cn(profileCardVariants({ size, variant, layout }), className), children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-16 h-16 bg-hive-surface-elevated rounded-full animate-pulse" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-6 w-32 bg-hive-surface-elevated rounded animate-pulse" }), _jsx("div", { className: "h-4 w-24 bg-hive-surface-elevated rounded animate-pulse" })] })] }), _jsx("div", { className: "grid grid-cols-3 gap-4", children: Array.from({ length: 3 }).map((_, i) => (_jsx("div", { className: "h-16 bg-hive-surface-elevated rounded animate-pulse" }, i))) })] }) }));
    }
    return (_jsxs("div", { className: cn(profileCardVariants({ size, variant, layout }), className), ...props, children: [showHeader && (_jsx(ProfileHeader, { user: user, isOwnProfile: isOwnProfile, onEditProfile: onEditProfile, onEditAvatar: onEditAvatar, onShareProfile: onShareProfile, variant: "ghost", avatarSize: size === "sm" ? "md" : "lg" })), showStats && (_jsx(ProfileStats, { stats: stats, variant: "ghost", layout: layout === "horizontal" ? "horizontal" : "grid", onStatClick: onStatClick, interactive: !!onStatClick, priority: user.isBuilder
                    ? ['toolsUsed', 'spacesLed', 'reputation', 'connectionsCount']
                    : ['spacesJoined', 'connectionsCount', 'currentStreak', 'reputation'] })), showActivity && displayActivities.length > 0 && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-lg font-semibold text-hive-text-primary", children: "Recent Activity" }), onViewActivity && recentActivity.length > maxActivities && (_jsx("button", { onClick: onViewActivity, className: "text-sm text-hive-gold hover:underline", children: "View all" }))] }), _jsx("div", { className: "space-y-3", children: displayActivities.map((activity) => (_jsxs("div", { className: "flex items-start gap-3 p-3 bg-hive-background-primary/50 rounded-lg hover:bg-hive-background-interactive transition-colors", children: [_jsx("div", { className: "flex-shrink-0 mt-0.5", children: activity.icon || getActivityIcon(activity.type, activity.action) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "text-sm font-medium text-hive-text-primary truncate", children: activity.title }), activity.description && (_jsx("p", { className: "text-sm text-hive-text-secondary mt-1", children: activity.description })), _jsx("p", { className: "text-xs text-hive-text-tertiary mt-1", children: activity.action }), _jsxs("div", { className: "flex items-center gap-1 mt-2 text-xs text-hive-text-secondary", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsx("span", { children: formatTimestamp(activity.timestamp) })] })] })] }, activity.id))) })] })), showActivity && displayActivities.length === 0 && (_jsxs("div", { className: "text-center py-8", children: [_jsx(Calendar, { className: "h-12 w-12 text-hive-text-secondary mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-medium text-hive-text-primary mb-2", children: "No recent activity" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: isOwnProfile
                            ? "Start by joining a space or using a tool!"
                            : "This user hasn't been active recently." })] }))] }));
}
// Keep backward compatibility with old name
export const ProfileCard = HiveProfileCard;
// Preset variants for common use cases
export function StudentProfileCard(props) {
    return _jsx(HiveProfileCard, { layout: "stacked", ...props });
}
export function BuilderProfileCard(props) {
    return _jsx(HiveProfileCard, { layout: "stacked", ...props });
}
export function CompactProfileCard(props) {
    return (_jsx(HiveProfileCard, { size: "sm", showActivity: false, maxActivities: 0, ...props }));
}
export function InteractiveProfileCard(props) {
    return _jsx(HiveProfileCard, { variant: "interactive", ...props });
}
export function MinimalProfileCard(props) {
    return _jsx(HiveProfileCard, { variant: "minimal", ...props });
}
// Export variants for external use
export { profileCardVariants };
//# sourceMappingURL=profile-card.js.map