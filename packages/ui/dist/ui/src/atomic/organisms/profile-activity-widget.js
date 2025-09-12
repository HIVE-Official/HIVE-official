'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { ButtonEnhanced as Button } from '../atoms/button-enhanced';
import { Activity, Plus, MessageSquare, Users, Heart, Calendar, BookOpen, Coffee, Code, Trophy, TrendingUp, Clock, ExternalLink, Settings, ChevronRight, Flame, Award, Target } from 'lucide-react';
const getActivityTypeConfig = (type) => {
    const configs = {
        post: {
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
            icon: MessageSquare,
            label: 'Posted'
        },
        comment: {
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/20',
            icon: MessageSquare,
            label: 'Commented'
        },
        join: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            borderColor: 'border-[var(--hive-gold)]/20',
            icon: Users,
            label: 'Joined'
        },
        create: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            borderColor: 'border-[var(--hive-gold)]/20',
            icon: Plus,
            label: 'Created'
        },
        like: {
            color: 'text-red-500',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/20',
            icon: Heart,
            label: 'Liked'
        },
        collaborate: {
            color: 'text-indigo-500',
            bgColor: 'bg-indigo-500/10',
            borderColor: 'border-indigo-500/20',
            icon: Code,
            label: 'Collaborated'
        },
        achievement: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            borderColor: 'border-[var(--hive-gold)]/20',
            icon: Trophy,
            label: 'Achieved'
        },
        event: {
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/20',
            icon: Calendar,
            label: 'Attended'
        }
    };
    return configs[type] || configs.post;
};
const getSpaceTypeIcon = (type) => {
    const icons = {
        academic: BookOpen,
        residential: Coffee,
        social: Heart,
        professional: Award,
        hobby: Code
    };
    return icons[type] || Heart;
};
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) {
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
        return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`;
    }
    else if (diffInHours < 24) {
        return `${diffInHours}h ago`;
    }
    else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
    }
};
export const ProfileActivityWidget = ({ user, recentActivities = [], todayActivities = 0, weeklyStreak = 0, totalEngagement = 0, activityScore = 0, topActivityType = 'post', isEditable = true, onViewActivity, onViewAllActivities, onCreatePost, onEngageMore, className }) => {
    const [isHovered, setIsHovered] = useState(false);
    // Get the most recent activities (up to 4)
    const displayActivities = recentActivities.slice(0, 4);
    const highlightedActivities = recentActivities.filter(activity => activity.isHighlighted).length;
    const totalActivitiesThisWeek = recentActivities.length;
    return (_jsxs(Card, { className: cn('relative overflow-hidden transition-all duration-300 hover:shadow-lg', 'bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]', isHovered && 'scale-[1.02]', className), onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Text, { variant: "body-sm", color: "gold", weight: "medium", children: "Recent Activity" }), weeklyStreak > 0 && (_jsxs(Badge, { variant: "secondary", className: "text-xs", children: [_jsx(Flame, { className: "h-3 w-3 mr-1" }), weeklyStreak, " day streak"] }))] }), isEditable && (_jsx(Button, { variant: "ghost", size: "icon", onClick: onViewAllActivities, className: "h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Settings, { className: "h-3 w-3" }) }))] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(Activity, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" }), _jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", children: todayActivities })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Today's Activity" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(TrendingUp, { className: "h-3 w-3 text-green-500" }), _jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", children: totalEngagement })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Total Engagement" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(Target, { className: "h-3 w-3 text-[var(--hive-gold)]" }), _jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", children: activityScore })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Activity Score" })] })] }), weeklyStreak > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "Weekly Engagement:" }), _jsxs(Text, { variant: "body-xs", color: "gold", weight: "medium", children: [totalActivitiesThisWeek, " activities"] })] }), _jsx("div", { className: "w-full bg-[var(--hive-background-secondary)] rounded-full h-2", children: _jsx("div", { className: "bg-gradient-to-r from-blue-500 to-[var(--hive-gold)] rounded-full h-2 transition-all duration-500", style: { width: `${Math.min((totalActivitiesThisWeek / 20) * 100, 100)}%` } }) }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [weeklyStreak, " day activity streak \u2022 Keep it going! \uD83D\uDD25"] })] })), displayActivities.length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "Recent Activity:" }), recentActivities.length > 4 && (_jsxs(Text, { variant: "body-xs", color: "secondary", children: ["+", recentActivities.length - 4, " more"] }))] }), _jsx("div", { className: "space-y-1", children: displayActivities.map((activity) => {
                                    const config = getActivityTypeConfig(activity.type);
                                    const SpaceIcon = activity.contextSpace ? getSpaceTypeIcon(activity.contextSpace.type) : null;
                                    return (_jsxs("div", { className: cn('flex items-center gap-2 p-2 rounded transition-colors cursor-pointer', 'hover:bg-[var(--hive-background-secondary)]', activity.isHighlighted && 'bg-[var(--hive-gold)]/5 border border-[var(--hive-gold)]/20'), onClick: () => onViewActivity?.(activity.id), children: [_jsx(config.icon, { className: cn('h-3 w-3 flex-shrink-0', config.color) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx(Text, { variant: "body-xs", color: "primary", className: "truncate", children: activity.title }), _jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [activity.contextSpace && SpaceIcon && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(SpaceIcon, { className: "h-2 w-2 text-[var(--hive-text-muted)]" }), _jsx(Text, { variant: "body-xs", color: "muted", className: "truncate", children: activity.contextSpace.name })] })), _jsx(Clock, { className: "h-2 w-2 text-[var(--hive-text-muted)]" }), _jsx(Text, { variant: "body-xs", color: "muted", children: formatTimestamp(activity.timestamp) })] })] }), activity.engagement && (_jsx("div", { className: "flex items-center gap-1", children: activity.engagement.likes > 0 && (_jsxs("div", { className: "flex items-center gap-0.5", children: [_jsx(Heart, { className: "h-2 w-2 text-red-500" }), _jsx(Text, { variant: "body-xs", color: "muted", children: activity.engagement.likes })] })) })), _jsx(ChevronRight, { className: "h-3 w-3 text-[var(--hive-text-secondary)] flex-shrink-0" })] }, activity.id));
                                }) })] })), topActivityType && (_jsxs("div", { className: "space-y-2 pt-2 border-t border-[var(--hive-border-primary)]", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "Activity Insights:" }), _jsxs("div", { className: cn('p-3 rounded-lg border', getActivityTypeConfig(topActivityType).bgColor, getActivityTypeConfig(topActivityType).borderColor), children: [_jsxs("div", { className: "flex items-center gap-2", children: [(() => {
                                                const IconComponent = getActivityTypeConfig(topActivityType).icon;
                                                return _jsx(IconComponent, { className: cn('h-4 w-4', getActivityTypeConfig(topActivityType).color) });
                                            })(), _jsxs(Text, { variant: "body-sm", color: "primary", children: ["Most active in: ", getActivityTypeConfig(topActivityType).label.toLowerCase()] })] }), _jsxs(Text, { variant: "body-xs", color: "secondary", className: "mt-1", children: ["You're building strong engagement through ", getActivityTypeConfig(topActivityType).label.toLowerCase(), " activities"] })] })] })), _jsxs("div", { className: "flex gap-2 pt-2 border-t border-[var(--hive-border-primary)]", children: [isEditable && onCreatePost && (_jsxs(Button, { variant: "secondary", size: "sm", onClick: onCreatePost, className: "flex-1", children: [_jsx(Plus, { className: "h-3 w-3 mr-1" }), "Create Post"] })), onViewAllActivities && (_jsxs(Button, { variant: "primary", size: "sm", onClick: onViewAllActivities, className: "flex-1", children: [_jsx(Activity, { className: "h-3 w-3 mr-1" }), "All Activity"] })), onEngageMore && (_jsx(Button, { variant: "ghost", size: "icon", onClick: onEngageMore, className: "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]", children: _jsx(ExternalLink, { className: "h-3 w-3" }) }))] }), recentActivities.length === 0 && (_jsxs("div", { className: "text-center py-6", children: [_jsx(Activity, { className: "h-8 w-8 mx-auto mb-3 text-[var(--hive-text-muted)]" }), _jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "No recent activity" }), _jsx(Text, { variant: "body-xs", color: "secondary", className: "mb-4", children: "Start engaging with the UB community to see your activity here" }), isEditable && onCreatePost && (_jsxs(Button, { variant: "secondary", size: "sm", onClick: onCreatePost, children: [_jsx(Plus, { className: "h-3 w-3 mr-1" }), "Create Your First Post"] }))] }))] }), isHovered && (_jsx("div", { className: "absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/5 to-[var(--hive-gold)]/5 rounded-lg blur-xl" }))] }));
};
//# sourceMappingURL=profile-activity-widget.js.map