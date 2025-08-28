'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { ButtonEnhanced as Button } from '../../atomic/atoms/button-enhanced';
import { Text } from '../../atomic/atoms/text';
import { Icon } from '../../ui/icon';
import { cn } from '../../lib/utils';
import { Sparkles, Calendar, Users, Trophy, Clock, Heart, Star, Target, ArrowRight, Play, CheckCircle, MessageCircle, Share2, TrendingUp, Activity } from 'lucide-react';
// UB-specific ritual configurations
export const UB_RITUAL_TYPES = {
    orientation: {
        icon: Sparkles,
        color: 'text-purple-400',
        bgColor: 'bg-purple-900/20',
        label: 'New Student',
        campusArea: 'north'
    },
    finals: {
        icon: Target,
        color: 'text-red-400',
        bgColor: 'bg-red-900/20',
        label: 'Finals Week',
        campusArea: 'campus_wide'
    },
    homecoming: {
        icon: Trophy,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-900/20',
        label: 'Homecoming',
        campusArea: 'south'
    },
    spring_fest: {
        icon: Star,
        color: 'text-pink-400',
        bgColor: 'bg-pink-900/20',
        label: 'Spring Fest',
        campusArea: 'north'
    },
    graduation: {
        icon: Trophy,
        color: 'text-green-400',
        bgColor: 'bg-green-900/20',
        label: 'Graduation',
        campusArea: 'south'
    },
    move_in: {
        icon: Calendar,
        color: 'text-blue-400',
        bgColor: 'bg-blue-900/20',
        label: 'Move-In Week',
        campusArea: 'north'
    },
    club_rush: {
        icon: Users,
        color: 'text-orange-400',
        bgColor: 'bg-orange-900/20',
        label: 'Club Rush',
        campusArea: 'campus_wide'
    }
};
export const UB_PARTICIPATION_TYPES = {
    individual: { label: 'Personal Challenge', icon: Target },
    dorm: { label: 'Dorm vs Dorm', icon: Users },
    class: { label: 'Class Competition', icon: TrendingUp },
    campus_wide: { label: 'All UB Bulls', icon: Heart },
    club: { label: 'Club Challenge', icon: Star },
    academic: { label: 'Academic Achievement', icon: Trophy }
};
export function UBRitualFeedCard({ post, onLike, onComment, onShare, onJoinRitual, onViewRitual, className }) {
    const { ritual, type, milestone } = post;
    const typeConfig = UB_RITUAL_TYPES[ritual.type];
    const participationConfig = UB_PARTICIPATION_TYPES[ritual.participationType];
    const TypeIcon = typeConfig.icon;
    const ParticipationIcon = participationConfig.icon;
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
    const getPostTypeIndicator = () => {
        switch (type) {
            case 'ritual_announcement':
                return { icon: Sparkles, label: 'New Campus Ritual', color: 'text-purple-400' };
            case 'ritual_milestone':
                return { icon: Trophy, label: 'Milestone Achieved', color: 'text-yellow-400' };
            case 'ritual_completion':
                return { icon: CheckCircle, label: 'Ritual Completed', color: 'text-green-400' };
            case 'ritual_reminder':
                return { icon: Clock, label: 'Ritual Reminder', color: 'text-blue-400' };
            default:
                return { icon: Activity, label: 'Campus Activity', color: 'text-gray-400' };
        }
    };
    const postIndicator = getPostTypeIndicator();
    const PostIndicatorIcon = postIndicator.icon;
    return (_jsxs(Card, { className: cn("border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]", "hover:shadow-lg transition-all duration-200", "overflow-hidden", className), children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: cn("p-2 rounded-lg", typeConfig.bgColor), children: _jsx(TypeIcon, { className: cn("h-5 w-5", typeConfig.color) }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(PostIndicatorIcon, { className: cn("h-4 w-4", postIndicator.color) }), _jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", children: postIndicator.label })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Text, { variant: "body-sm", weight: "medium", className: "text-[var(--hive-text-primary)]", children: post.author.name }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: ["@", post.author.handle] }), post.author.role && (_jsx(Badge, { variant: "secondary", className: "text-xs", children: post.author.role }))] })] })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: formatTimeAgo(post.timestamp) })] }) }), _jsxs(CardContent, { className: "pt-0", children: [_jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Badge, { variant: "secondary", className: cn("text-xs", typeConfig.color), children: typeConfig.label }), _jsxs(Badge, { variant: "ghost", className: "text-xs", children: [_jsx(ParticipationIcon, { className: "h-3 w-3 mr-1" }), participationConfig.label] })] }), _jsx(Text, { variant: "h3", weight: "semibold", className: "mb-2", children: ritual.title }), _jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-3", children: post.content })] }), type === 'ritual_milestone' && milestone && (_jsxs("div", { className: "mb-4 p-3 rounded-lg bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)]", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Trophy, { className: "h-4 w-4 text-yellow-400" }), _jsx(Text, { variant: "body-sm", weight: "medium", children: milestone.achievement })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-center", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-lg", weight: "bold", color: "primary", children: milestone.participantCount }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "UB Students Participating" })] }), _jsxs("div", { children: [_jsxs(Text, { variant: "body-lg", weight: "bold", color: "primary", children: [milestone.completionRate, "%"] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Completion Rate" })] })] })] })), _jsxs("div", { className: "grid grid-cols-3 gap-4 mb-4 p-3 rounded-lg bg-[var(--hive-background-primary)]", children: [_jsxs("div", { className: "text-center", children: [_jsxs(Text, { variant: "body-md", weight: "bold", color: "primary", children: [Math.round(ritual.metrics.participationRate), "%"] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Participating" })] }), _jsxs("div", { className: "text-center", children: [_jsx(Text, { variant: "body-md", weight: "bold", color: "primary", children: Math.round(ritual.metrics.engagementScore) }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Engagement" })] }), _jsxs("div", { className: "text-center", children: [_jsx(Text, { variant: "body-md", weight: "bold", color: "primary", children: Math.round(ritual.metrics.campusImpact) }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Campus Impact" })] })] }), ritual.campusLocation && (_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Icon, { icon: Calendar, size: "sm", color: "secondary" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: ritual.campusLocation }), ritual.ubSpecific.campusAreas && (_jsx(Badge, { variant: "ghost", className: "text-xs", children: ritual.ubSpecific.campusAreas.join(', ') }))] })), _jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-[var(--hive-border-default)]", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Button, { variant: "ghost", size: "sm", className: "text-xs h-8 text-[var(--hive-text-secondary)] hover:text-pink-400 transition-colors", onClick: () => onLike?.(post.id), children: [_jsx(Heart, { className: "h-4 w-4 mr-2" }), post.engagement.likes] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "text-xs h-8 text-[var(--hive-text-secondary)] hover:text-blue-400 transition-colors", onClick: () => onComment?.(post.id), children: [_jsx(MessageCircle, { className: "h-4 w-4 mr-2" }), post.engagement.comments] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "text-xs h-8 text-[var(--hive-text-secondary)] hover:text-green-400 transition-colors", onClick: () => onShare?.(post.id), children: [_jsx(Share2, { className: "h-4 w-4 mr-2" }), post.engagement.shares] }), _jsxs("div", { className: "flex items-center gap-1 text-xs text-[var(--hive-text-secondary)]", children: [_jsx(Users, { className: "h-4 w-4" }), post.engagement.participants, " participating"] })] }), _jsx("div", { className: "flex items-center gap-2", children: post.hasCompleted ? (_jsxs(Badge, { variant: "success", className: "text-xs", children: [_jsx(CheckCircle, { className: "h-3 w-3 mr-1" }), "Completed"] })) : post.isParticipating ? (_jsxs(Button, { variant: "secondary", size: "sm", onClick: () => onViewRitual?.(ritual.id), children: [_jsx(Play, { className: "h-4 w-4 mr-2" }), "Continue"] })) : ritual.status === 'active' ? (_jsxs(Button, { variant: "primary", size: "sm", onClick: () => onJoinRitual?.(ritual.id), children: [_jsx(ArrowRight, { className: "h-4 w-4 mr-2" }), "Join"] })) : (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => onViewRitual?.(ritual.id), children: "View Details" })) })] })] })] }));
}
export function UBRitualsFeedIntegration({ ritualPosts, onLike, onComment, onShare, onJoinRitual, onViewRitual, showHeader = true, maxPosts, className }) {
    const displayPosts = maxPosts ? ritualPosts.slice(0, maxPosts) : ritualPosts;
    if (ritualPosts.length === 0) {
        return null;
    }
    return (_jsxs("div", { className: cn("space-y-4", className), children: [showHeader && (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 rounded-lg bg-purple-400/10", children: _jsx(Sparkles, { className: "h-5 w-5 text-purple-400" }) }), _jsxs("div", { children: [_jsx(Text, { variant: "h3", weight: "semibold", children: "Campus Rituals" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Shared experiences building UB culture" })] }), _jsxs(Badge, { variant: "secondary", className: "ml-auto", children: [ritualPosts.length, " active"] })] })), _jsxs("div", { className: "space-y-4", children: [displayPosts.map((post) => (_jsx(UBRitualFeedCard, { post: post, onLike: onLike, onComment: onComment, onShare: onShare, onJoinRitual: onJoinRitual, onViewRitual: onViewRitual }, post.id))), maxPosts && ritualPosts.length > maxPosts && (_jsx("div", { className: "text-center pt-4", children: _jsxs(Button, { variant: "ghost", size: "sm", children: [_jsx(ArrowRight, { className: "h-4 w-4 mr-2" }), "View ", ritualPosts.length - maxPosts, " more ritual updates"] }) }))] })] }));
}
export function UBRitualFeedFilters({ selectedTypes, selectedParticipation, onTypeChange, onParticipationChange, className }) {
    const toggleType = (type) => {
        if (selectedTypes.includes(type)) {
            onTypeChange(selectedTypes.filter(t => t !== type));
        }
        else {
            onTypeChange([...selectedTypes, type]);
        }
    };
    const toggleParticipation = (participation) => {
        if (selectedParticipation.includes(participation)) {
            onParticipationChange(selectedParticipation.filter(p => p !== participation));
        }
        else {
            onParticipationChange([...selectedParticipation, participation]);
        }
    };
    return (_jsxs(Card, { className: cn("p-4", className), children: [_jsx(Text, { variant: "h4", weight: "semibold", className: "mb-3", children: "Filter Rituals" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-sm", weight: "medium", className: "mb-2", children: "Ritual Types" }), _jsx("div", { className: "flex flex-wrap gap-2", children: Object.entries(UB_RITUAL_TYPES).map(([type, config]) => {
                                    const Icon = config.icon;
                                    const isSelected = selectedTypes.includes(type);
                                    return (_jsxs(Button, { variant: isSelected ? "primary" : "ghost", size: "sm", onClick: () => toggleType(type), className: "text-xs", children: [_jsx(Icon, { className: "h-3 w-3 mr-1" }), config.label] }, type));
                                }) })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", weight: "medium", className: "mb-2", children: "Participation Style" }), _jsx("div", { className: "flex flex-wrap gap-2", children: Object.entries(UB_PARTICIPATION_TYPES).map(([type, config]) => {
                                    const Icon = config.icon;
                                    const isSelected = selectedParticipation.includes(type);
                                    return (_jsxs(Button, { variant: isSelected ? "primary" : "ghost", size: "sm", onClick: () => toggleParticipation(type), className: "text-xs", children: [_jsx(Icon, { className: "h-3 w-3 mr-1" }), config.label] }, type));
                                }) })] })] })] }));
}
//# sourceMappingURL=ub-rituals-feed-integration.js.map