'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { cn } from '../../lib/utils.js';
import { Card, CardContent, CardHeader } from '../../components/ui/card.js';
import { Badge } from '../atoms/badge.js';
import { Text } from '../atoms/text.js';
import { ButtonEnhanced as Button } from '../atoms/button-enhanced.js';
import { Users, Plus, Crown, Star, MessageSquare, Calendar, BookOpen, Coffee, Code, Heart, Settings, ChevronRight, ExternalLink, Search, TrendingUp, Award } from 'lucide-react';
const getSpaceTypeConfig = (type) => {
    const configs = {
        academic: {
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
            icon: BookOpen,
            label: 'Academic'
        },
        residential: {
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/20',
            icon: Coffee,
            label: 'Residential'
        },
        social: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            borderColor: 'border-[var(--hive-gold)]/20',
            icon: Heart,
            label: 'Social'
        },
        professional: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            borderColor: 'border-[var(--hive-gold)]/20',
            icon: Award,
            label: 'Professional'
        },
        hobby: {
            color: 'text-pink-500',
            bgColor: 'bg-pink-500/10',
            borderColor: 'border-pink-500/20',
            icon: Code,
            label: 'Hobby'
        }
    };
    return configs[type] || configs.social;
};
const getRoleConfig = (role) => {
    const configs = {
        member: {
            color: 'text-[var(--hive-text-secondary)]',
            bgColor: 'bg-[var(--hive-background-secondary)]',
            icon: Users,
            label: 'Member'
        },
        moderator: {
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            icon: Star,
            label: 'Moderator'
        },
        admin: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            icon: Crown,
            label: 'Admin'
        },
        founder: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            icon: Crown,
            label: 'Founder'
        }
    };
    return configs[role] || configs.member;
};
const getActivityLevelConfig = (level) => {
    const configs = {
        high: {
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            label: 'Very Active'
        },
        medium: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            label: 'Active'
        },
        low: {
            color: 'text-[var(--hive-text-muted)]',
            bgColor: 'bg-[var(--hive-background-secondary)]',
            label: 'Quiet'
        }
    };
    return configs[level] || configs.medium;
};
export const ProfileSpacesWidget = ({ user, joinedSpaces = [], totalSpaces = 0, spacesCreated = 0, totalMembers = 0, weeklyEngagement = 0, featuredSpace, isEditable = true, onJoinSpace, onViewSpace, onCreateSpace, onViewAllSpaces, onExploreSpaces, className }) => {
    const [isHovered, setIsHovered] = useState(false);
    // Get the most active spaces (up to 3)
    const activeSpaces = joinedSpaces
        .sort((a, b) => (b.unreadMessages || 0) - (a.unreadMessages || 0))
        .slice(0, 3);
    const leadershipRoles = joinedSpaces.filter(space => ['admin', 'moderator', 'founder'].includes(space.role)).length;
    const totalUnread = joinedSpaces.reduce((sum, space) => sum + (space.unreadMessages || 0), 0);
    return (_jsxs(Card, { className: cn('relative overflow-hidden transition-all duration-300 hover:shadow-lg', 'bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]', isHovered && 'scale-[1.02]', className), onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Text, { variant: "body-sm", color: "gold", weight: "medium", children: "My Spaces" }), totalUnread > 0 && (_jsxs(Badge, { variant: "secondary", className: "text-xs", children: [_jsx(MessageSquare, { className: "h-3 w-3 mr-1" }), totalUnread, " unread"] }))] }), isEditable && (_jsx(Button, { variant: "ghost", size: "icon", onClick: onViewAllSpaces, className: "h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Settings, { className: "h-3 w-3" }) }))] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(Users, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" }), _jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", children: totalSpaces })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Spaces Joined" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(Crown, { className: "h-3 w-3 text-[var(--hive-gold)]" }), _jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", children: leadershipRoles })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Leadership" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(TrendingUp, { className: "h-3 w-3 text-green-500" }), _jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", children: totalMembers })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Community Size" })] })] }), featuredSpace && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "Most Active Space:" }), (() => {
                                        const IconComponent = getRoleConfig(featuredSpace.role).icon;
                                        return _jsx(IconComponent, { className: cn('h-3 w-3', getRoleConfig(featuredSpace.role).color) });
                                    })()] }), _jsx("div", { className: cn('p-3 rounded-lg border transition-colors hover:bg-[var(--hive-background-secondary)] cursor-pointer', getSpaceTypeConfig(featuredSpace.type).bgColor, getSpaceTypeConfig(featuredSpace.type).borderColor), onClick: () => onViewSpace?.(featuredSpace.id), children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-start gap-2 flex-1 min-w-0", children: [(() => {
                                                    const IconComponent = getSpaceTypeConfig(featuredSpace.type).icon;
                                                    return _jsx(IconComponent, { className: cn('h-4 w-4 mt-0.5 flex-shrink-0', getSpaceTypeConfig(featuredSpace.type).color) });
                                                })(), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", className: "truncate", children: featuredSpace.name }), _jsx(Badge, { variant: "secondary", className: cn('text-xs', getRoleConfig(featuredSpace.role).color), children: getRoleConfig(featuredSpace.role).label })] }), _jsx(Text, { variant: "body-xs", color: "secondary", className: "line-clamp-2", children: featuredSpace.description }), _jsxs("div", { className: "flex items-center gap-3 mt-2", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [featuredSpace.memberCount.toLocaleString(), " members"] })] }), featuredSpace.unreadMessages && featuredSpace.unreadMessages > 0 && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MessageSquare, { className: "h-3 w-3 text-blue-500" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [featuredSpace.unreadMessages, " new"] })] })), featuredSpace.upcomingEvents && featuredSpace.upcomingEvents > 0 && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Calendar, { className: "h-3 w-3 text-green-500" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [featuredSpace.upcomingEvents, " events"] })] }))] })] })] }), _jsx(Button, { variant: "ghost", size: "icon", onClick: (e) => {
                                                e.stopPropagation();
                                                onViewSpace?.(featuredSpace.id);
                                            }, className: "h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] flex-shrink-0 ml-2", children: _jsx(ExternalLink, { className: "h-3 w-3" }) })] }) })] })), activeSpaces.length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "Active Spaces:" }), joinedSpaces.length > 3 && (_jsxs(Text, { variant: "body-xs", color: "secondary", children: ["+", joinedSpaces.length - 3, " more"] }))] }), _jsx("div", { className: "space-y-1", children: activeSpaces.map((space) => {
                                    const typeConfig = getSpaceTypeConfig(space.type);
                                    const roleConfig = getRoleConfig(space.role);
                                    const activityConfig = getActivityLevelConfig(space.activityLevel);
                                    return (_jsxs("div", { className: "flex items-center gap-2 p-2 rounded hover:bg-[var(--hive-background-secondary)] transition-colors cursor-pointer", onClick: () => onViewSpace?.(space.id), children: [_jsx(typeConfig.icon, { className: cn('h-3 w-3', typeConfig.color) }), _jsx(Text, { variant: "body-xs", color: "primary", className: "flex-1 truncate", children: space.name }), space.unreadMessages && space.unreadMessages > 0 && (_jsx(Badge, { variant: "secondary", className: "text-xs", children: space.unreadMessages })), _jsx("div", { className: cn('w-2 h-2 rounded-full', activityConfig.color.replace('text-', 'bg-')) }), _jsx(ChevronRight, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" })] }, space.id));
                                }) })] })), weeklyEngagement > 0 && (_jsxs("div", { className: "space-y-2 pt-2 border-t border-[var(--hive-border-primary)]", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "This Week:" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Community Engagement" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-16 h-2 bg-[var(--hive-background-secondary)] rounded-full", children: _jsx("div", { className: "h-2 bg-green-500 rounded-full transition-all duration-500", style: { width: `${Math.min(weeklyEngagement, 100)}%` } }) }), _jsxs(Text, { variant: "body-xs", color: "gold", weight: "medium", children: [weeklyEngagement, "%"] })] })] })] })), _jsxs("div", { className: "flex gap-2 pt-2 border-t border-[var(--hive-border-primary)]", children: [isEditable && onJoinSpace && (_jsxs(Button, { variant: "secondary", size: "sm", onClick: onJoinSpace, className: "flex-1", children: [_jsx(Plus, { className: "h-3 w-3 mr-1" }), "Join Space"] })), onViewAllSpaces && (_jsxs(Button, { variant: "primary", size: "sm", onClick: onViewAllSpaces, className: "flex-1", children: [_jsx(Users, { className: "h-3 w-3 mr-1" }), "My Spaces"] })), onExploreSpaces && (_jsx(Button, { variant: "ghost", size: "icon", onClick: onExploreSpaces, className: "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Search, { className: "h-3 w-3" }) }))] }), joinedSpaces.length === 0 && (_jsxs("div", { className: "text-center py-6", children: [_jsx(Users, { className: "h-8 w-8 mx-auto mb-3 text-[var(--hive-text-muted)]" }), _jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "No spaces joined yet" }), _jsx(Text, { variant: "body-xs", color: "secondary", className: "mb-4", children: "Discover communities and connect with fellow UB students" }), isEditable && onJoinSpace && (_jsxs(Button, { variant: "secondary", size: "sm", onClick: onJoinSpace, children: [_jsx(Plus, { className: "h-3 w-3 mr-1" }), "Explore Spaces"] }))] }))] }), isHovered && (_jsx("div", { className: "absolute inset-0 -z-10 bg-gradient-to-r from-[var(--hive-gold)]/5 to-green-500/5 rounded-lg blur-xl" }))] }));
};
//# sourceMappingURL=profile-spaces-widget.js.map