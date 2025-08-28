import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Campus Activity Feed - Profile Integration
 * Uses SocialInteraction and UserIdentity molecules for campus social activity
 *
 * Built using HIVE foundation systems and molecules:
 * - SocialInteraction molecule for engagement actions
 * - UserIdentity molecule for consistent user display
 * - ComprehensiveCard molecule for activity item structure
 * - Campus-specific activity types and cross-slice integration
 */
import React, { useCallback } from 'react';
import { cn } from '../../lib/utils';
// Molecule imports
import { SocialInteraction } from '../../atomic/molecules/social-interaction';
import { UserIdentity } from '../../atomic/molecules/user-identity';
import { ComprehensiveCard } from '../../atomic/molecules/comprehensive-card';
// Foundation system imports
import { typographyComposition } from '../../atomic/foundations/typography-composition';
import { iconComposition, Users, Hammer, Calendar, MessageSquare, Star, MapPin, Clock, TrendingUp, Zap, BookOpen, Heart, ExternalLink } from '../../atomic/foundations/icon-composition';
import { motionComposition } from '../../atomic/foundations/motion-composition';
// === ACTIVITY TYPE METADATA ===
const activityTypeConfig = {
    space_join: {
        icon: Users,
        color: 'text-[var(--hive-info-primary)]',
        bgColor: 'bg-[var(--hive-info-background)]',
        borderColor: 'border-[var(--hive-info-border)]',
        verb: 'joined',
        campusRelevant: true
    },
    space_create: {
        icon: Users,
        color: 'text-[var(--hive-info-primary)]',
        bgColor: 'bg-[var(--hive-info-background)]',
        borderColor: 'border-[var(--hive-info-border)]',
        verb: 'created',
        campusRelevant: true
    },
    tool_build: {
        icon: Hammer,
        color: 'text-[var(--hive-success-primary)]',
        bgColor: 'bg-[var(--hive-success-background)]',
        borderColor: 'border-[var(--hive-success-border)]',
        verb: 'built',
        campusRelevant: true
    },
    tool_use: {
        icon: Zap,
        color: 'text-[var(--hive-success-primary)]',
        bgColor: 'bg-[var(--hive-success-background)]',
        borderColor: 'border-[var(--hive-success-border)]',
        verb: 'used',
        campusRelevant: true
    },
    event_create: {
        icon: Calendar,
        color: 'text-[var(--hive-warning-primary)]',
        bgColor: 'bg-[var(--hive-warning-background)]',
        borderColor: 'border-[var(--hive-warning-border)]',
        verb: 'created',
        campusRelevant: true
    },
    event_attend: {
        icon: Calendar,
        color: 'text-[var(--hive-warning-primary)]',
        bgColor: 'bg-[var(--hive-warning-background)]',
        borderColor: 'border-[var(--hive-warning-border)]',
        verb: 'attended',
        campusRelevant: true
    },
    connection_made: {
        icon: Heart,
        color: 'text-[var(--hive-error-primary)]',
        bgColor: 'bg-[var(--hive-error-background)]',
        borderColor: 'border-[var(--hive-error-border)]',
        verb: 'connected with',
        campusRelevant: true
    },
    post_create: {
        icon: MessageSquare,
        color: 'text-[var(--hive-text-primary)]',
        bgColor: 'bg-[var(--hive-bg-subtle)]',
        borderColor: 'border-[var(--hive-border-subtle)]',
        verb: 'posted in',
        campusRelevant: true
    },
    achievement_unlock: {
        icon: Star,
        color: 'text-[var(--hive-gold-primary)]',
        bgColor: 'bg-[var(--hive-gold-background)]',
        borderColor: 'border-[var(--hive-gold-border)]',
        verb: 'unlocked',
        campusRelevant: true
    },
    collaboration_start: {
        icon: Users,
        color: 'text-[var(--hive-info-primary)]',
        bgColor: 'bg-[var(--hive-info-background)]',
        borderColor: 'border-[var(--hive-info-border)]',
        verb: 'started collaborating on',
        campusRelevant: true
    }
};
// === TIME FORMATTING ===
const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffMins < 1)
        return 'just now';
    if (diffMins < 60)
        return `${diffMins}m ago`;
    if (diffHours < 24)
        return `${diffHours}h ago`;
    if (diffDays < 7)
        return `${diffDays}d ago`;
    return timestamp.toLocaleDateString();
};
const ActivityItemComponent = React.forwardRef(({ activity, variant, showUserProfile, showEngagementActions, showCampusContext, onActivityClick, onUserClick, onTargetClick, onEngagement }, ref) => {
    const config = activityTypeConfig[activity.type];
    const IconComponent = config.icon;
    // Build social actions from engagement data
    const socialActions = [];
    if (activity.engagement && showEngagementActions) {
        socialActions.push({
            type: 'like',
            count: activity.engagement.likes,
            isActive: activity.engagement.userLiked || false,
            label: 'Like'
        }, {
            type: 'comment',
            count: activity.engagement.comments,
            isActive: activity.engagement.userCommented || false,
            label: 'Comment'
        }, {
            type: 'share',
            count: activity.engagement.shares,
            isActive: activity.engagement.userShared || false,
            label: 'Share'
        });
    }
    return (_jsx("div", { ref: ref, className: cn('group relative', onActivityClick && 'cursor-pointer'), onClick: () => onActivityClick?.(activity), children: _jsx(ComprehensiveCard, { variant: "interactive", size: variant === 'compact' ? 'compact' : variant === 'detailed' ? 'spacious' : 'comfortable', campusOptimized: true, className: cn(
            // Activity type border accent
            'border-l-4', config.borderColor, 
            // Hover effects
            'hover:shadow-md transition-shadow'), children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [_jsx("div", { className: cn('p-2 rounded-lg shrink-0', config.bgColor, config.borderColor, 'border'), children: _jsx(IconComponent, { className: cn(iconComposition.sizes.small.className, config.color) }) }), showUserProfile && (_jsx("div", { className: "min-w-0 flex-1", children: _jsx(UserIdentity, { name: activity.user.name, handle: activity.user.handle, avatar: activity.user.avatar, status: activity.user.status, role: activity.user.role, verified: activity.user.verified, size: "small", layout: "horizontal", interactive: "subtle", onClick: () => onUserClick?.(activity.user.id) }) }))] }), _jsxs("div", { className: "flex items-center gap-1 text-[var(--hive-text-muted)] shrink-0", children: [_jsx(Clock, { className: iconComposition.sizes.micro.className }), _jsx("span", { className: cn('font-[var(--hive-font-family-primary)]', `text-[${typographyComposition.scale.caption.size}]`), children: formatRelativeTime(activity.timestamp) })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-1 flex-wrap", children: [_jsx("span", { className: cn('font-[var(--hive-font-family-primary)]', `text-[${typographyComposition.scale.small.size}]`, 'text-[var(--hive-text-secondary)]'), children: config.verb }), activity.target && (_jsxs("button", { onClick: (e) => {
                                            e.stopPropagation();
                                            onTargetClick?.(activity.target);
                                        }, className: cn('font-medium', 'text-[var(--hive-gold-primary)]', 'hover:underline', 'inline-flex items-center gap-1'), children: [_jsx("span", { children: activity.target.name }), activity.target.icon && _jsx("span", { children: activity.target.icon })] }))] }), _jsx("h3", { className: cn('font-[var(--hive-font-family-primary)]', 'font-semibold', variant === 'compact'
                                    ? `text-[${typographyComposition.scale.small.size}]`
                                    : `text-[${typographyComposition.scale.base.size}]`, 'text-[var(--hive-text-primary)]', 'leading-tight'), children: activity.title }), activity.content && variant !== 'compact' && (_jsx("p", { className: cn('font-[var(--hive-font-family-primary)]', `text-[${typographyComposition.scale.small.size}]`, 'text-[var(--hive-text-secondary)]', 'leading-relaxed', variant === 'detailed' ? 'line-clamp-none' : 'line-clamp-3'), children: activity.content })), showCampusContext && activity.campusContext && (_jsxs("div", { className: "flex items-center gap-4 text-[var(--hive-text-muted)]", children: [activity.campusContext.location && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: iconComposition.sizes.micro.className }), _jsx("span", { className: `text-[${typographyComposition.scale.caption.size}]`, children: activity.campusContext.location })] })), activity.campusContext.course && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(BookOpen, { className: iconComposition.sizes.micro.className }), _jsx("span", { className: `text-[${typographyComposition.scale.caption.size}]`, children: activity.campusContext.course })] }))] })), activity.media && activity.media.length > 0 && variant !== 'compact' && (_jsxs("div", { className: "rounded-lg overflow-hidden border border-[var(--hive-border-subtle)]", children: [activity.media[0].type === 'image' && (_jsx("img", { src: activity.media[0].preview || activity.media[0].url, alt: "Activity media", className: "w-full h-48 object-cover" })), activity.media[0].type === 'link' && (_jsxs("div", { className: "p-3 bg-[var(--hive-bg-subtle)] flex items-center gap-3", children: [_jsx(ExternalLink, { className: iconComposition.sizes.small.className }), _jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)] truncate", children: activity.media[0].url })] }))] }))] }), showEngagementActions && socialActions.length > 0 && (_jsx("div", { className: "pt-3 border-t border-[var(--hive-border-subtle)]", children: _jsx(SocialInteraction, { actions: socialActions, size: "small", layout: variant === 'compact' ? 'compact' : 'horizontal', variant: "ghost", onAction: (actionType) => onEngagement?.(actionType) }) }))] }) }) }));
});
ActivityItemComponent.displayName = 'ActivityItemComponent';
// === MAIN COMPONENT ===
export const CampusActivityFeed = React.forwardRef(({ activities, showUserProfiles = true, showEngagementActions = true, showCampusContext = true, enableRealtime = false, activityTypes, timeRange = 'all', variant = 'comfortable', maxItems, isLoading = false, hasMore = false, onActivityClick, onUserClick, onTargetClick, onEngagement, onLoadMore, className }, ref) => {
    // Filter activities based on criteria
    const filteredActivities = activities
        .filter(activity => {
        if (activityTypes && !activityTypes.includes(activity.type))
            return false;
        if (timeRange !== 'all') {
            const now = new Date();
            const activityDate = new Date(activity.timestamp);
            const diffMs = now.getTime() - activityDate.getTime();
            const diffDays = diffMs / (1000 * 60 * 60 * 24);
            switch (timeRange) {
                case 'today':
                    return diffDays < 1;
                case 'week':
                    return diffDays < 7;
                case 'month':
                    return diffDays < 30;
                default:
                    return true;
            }
        }
        return true;
    })
        .slice(0, maxItems);
    const handleEngagement = useCallback((activityId, action) => {
        onEngagement?.(activityId, action);
    }, [onEngagement]);
    if (isLoading) {
        return (_jsx("div", { ref: ref, className: cn('space-y-4', className), children: [...Array(5)].map((_, i) => (_jsx("div", { className: "animate-pulse", children: _jsx("div", { className: "h-32 bg-[var(--hive-bg-subtle)] rounded-lg" }) }, i))) }));
    }
    if (filteredActivities.length === 0) {
        return (_jsxs("div", { ref: ref, className: cn('text-center py-8', className), children: [_jsx(Activity, { className: cn(iconComposition.sizes.xl.className, 'text-[var(--hive-text-muted)] mx-auto mb-3') }), _jsx("h3", { className: "font-medium text-[var(--hive-text-primary)] mb-2", children: "No campus activity yet" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] max-w-md mx-auto", children: "Join spaces, build tools, and connect with classmates to see your campus activity here." })] }));
    }
    return (_jsxs("div", { ref: ref, className: cn('space-y-4', className), children: [filteredActivities.map(activity => (_jsx(ActivityItemComponent, { activity: activity, variant: variant, showUserProfile: showUserProfiles, showEngagementActions: showEngagementActions, showCampusContext: showCampusContext, onActivityClick: onActivityClick, onUserClick: onUserClick, onTargetClick: onTargetClick, onEngagement: (action) => handleEngagement(activity.id, action) }, activity.id))), hasMore && onLoadMore && (_jsx("div", { className: "text-center pt-4", children: _jsxs("button", { onClick: onLoadMore, className: cn('inline-flex items-center gap-2 px-6 py-3 rounded-lg', 'font-medium', 'text-[var(--hive-text-primary)]', 'bg-[var(--hive-bg-subtle)]', 'border border-[var(--hive-border-subtle)]', 'hover:bg-[var(--hive-bg-interactive)]', 'hover:border-[var(--hive-border-glass-strong)]', `transition-colors duration-[${motionComposition.durations.fast.ms}]`), children: [_jsx(TrendingUp, { className: iconComposition.sizes.small.className }), "Load More Activity"] }) })), enableRealtime && (_jsx("div", { className: "fixed bottom-4 right-4 z-50", children: _jsxs("div", { className: cn('flex items-center gap-2 px-3 py-2 rounded-full', 'bg-[var(--hive-success-background)]', 'border border-[var(--hive-success-border)]', 'text-[var(--hive-success-primary)]', 'text-sm font-medium', 'shadow-lg'), children: [_jsx("div", { className: "w-2 h-2 bg-[var(--hive-success-primary)] rounded-full animate-pulse" }), "Live Activity"] }) }))] }));
});
CampusActivityFeed.displayName = 'CampusActivityFeed';
export { activityTypeConfig, formatRelativeTime };
//# sourceMappingURL=campus-activity-feed.js.map