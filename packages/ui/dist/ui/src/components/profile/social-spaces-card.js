/**
 * Social Spaces Card - Community Social Discovery
 * Display user's communities with social context and activity
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Users, Calendar, TrendingUp, Plus, Search, Zap, Volume2, VolumeX, Crown, Shield, UserPlus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion } from '../../lib/motion';
import { butterClasses, getStaggerClass } from '../../lib/motion';
import '../../styles/social-profile.css';
export function SocialSpacesCard({ spaces = [], recommendations = [], onSpaceClick, onJoinSpace, onCreateSpace, onExploreSpaces, className }) {
    const [showRecommendations, setShowRecommendations] = useState(false);
    const getSpaceIcon = (type) => {
        switch (type) {
            case 'academic': return '🎓';
            case 'housing': return '🏠';
            case 'club': return '⭐';
            case 'course': return '💻';
            case 'community': return '🎉';
            case 'social': return '🌟';
            default: return '👥';
        }
    };
    const getActivityIcon = (level) => {
        switch (level) {
            case 'very-active': return _jsx(Zap, { className: "text-red-400", size: 12 });
            case 'busy': return _jsx(TrendingUp, { className: "text-orange-400", size: 12 });
            case 'active': return _jsx(Volume2, { className: "text-green-400", size: 12 });
            case 'quiet': return _jsx(VolumeX, { className: "text-gray-400", size: 12 });
        }
    };
    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin': return _jsx(Crown, { size: 12, className: "text-blue-400" });
            case 'leader': return _jsx(Shield, { size: 12, className: "text-blue-400" });
            case 'moderator': return _jsx(Shield, { size: 12, className: "text-green-400" });
            default: return null;
        }
    };
    const formatMemberCount = (count) => {
        if (count > 1000)
            return `${(count / 1000).toFixed(1)}k👥`;
        return `${count}👥`;
    };
    const getActivityText = (level) => {
        switch (level) {
            case 'very-active': return 'Very Active';
            case 'busy': return 'Busy';
            case 'active': return 'Active';
            case 'quiet': return 'Quiet';
        }
    };
    const SpaceItem = ({ space, isRecommendation = false }) => (_jsxs(motion.div, { className: cn("group relative p-5 rounded-xl border border-white/8 hover:border-white/16 cursor-pointer", butterClasses.listItem), onClick: () => isRecommendation ? onJoinSpace?.(space.id) : onSpaceClick?.(space.id), whileHover: { y: -4, scale: 1.005, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }, whileTap: { scale: 0.995, transition: { duration: 0.2 } }, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }, children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-4 flex-1", children: [_jsx("div", { className: "w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg", style: { background: space.color }, children: space.icon || getSpaceIcon(space.type) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h4", { className: "profile-body font-semibold text-primary truncate", children: space.name }), getRoleIcon(space.role)] }), _jsxs("div", { className: "flex items-center gap-3 mt-1.5", children: [_jsx("span", { className: "profile-caption text-secondary", children: formatMemberCount(space.memberCount) }), _jsx("span", { className: "text-tertiary", children: "\u2022" }), _jsxs("div", { className: "flex items-center gap-1", children: [getActivityIcon(space.activityLevel), _jsx("span", { className: "profile-caption text-tertiary", children: getActivityText(space.activityLevel) })] })] })] })] }), !isRecommendation && space.unreadCount && space.unreadCount > 0 && (_jsx(Badge, { className: "bg-blue-500 text-white text-xs px-2 py-0 min-w-[20px] h-5 flex items-center justify-center", children: space.unreadCount > 99 ? '99+' : space.unreadCount }))] }), !isRecommendation && space.recentActivity && (_jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "profile-caption text-secondary", children: ["\uD83D\uDCCA ", space.recentActivity.author, " ", space.recentActivity.type === 'post' ? 'posted' : space.recentActivity.type === 'poll' ? 'created poll' : 'announced'] }), _jsx("div", { className: "profile-fine text-tertiary mt-1 line-clamp-2", children: space.recentActivity.content })] })), !isRecommendation && space.upcomingEvents && space.upcomingEvents.count > 0 && (_jsxs("div", { className: "flex items-center gap-1 mb-3", children: [_jsx(Calendar, { size: 12, className: "text-campus-blue" }), _jsxs("span", { className: "profile-fine text-campus-blue", children: ["\u26A1 ", space.upcomingEvents.count, " event", space.upcomingEvents.count > 1 ? 's' : '', " this week"] })] })), isRecommendation && space.mutualFriends && space.mutualFriends.length > 0 && (_jsxs("div", { className: "social-proof mb-3", children: [_jsx("span", { className: "social-count", children: space.mutualFriends.length }), _jsxs("span", { children: [" mutual connection", space.mutualFriends.length > 1 ? 's' : ''] })] })), isRecommendation && (_jsxs(Button, { size: "sm", onClick: (e) => {
                    e.stopPropagation();
                    onJoinSpace?.(space.id);
                }, className: "social-action-button w-full", children: [_jsx(UserPlus, { size: 14 }), "Join Space"] }))] }));
    return (_jsxs(motion.div, { className: cn("social-profile-card", butterClasses.card, className), style: { gridArea: 'spaces' }, initial: { opacity: 0, y: 24, scale: 0.98 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }, children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center", children: _jsx(Users, { size: 20, className: "text-white" }) }), _jsxs("div", { children: [_jsx("h3", { className: "profile-heading text-primary", children: "\uD83D\uDC65 YOUR COMMUNITIES" }), _jsxs("div", { className: "profile-caption text-secondary", children: [spaces.length, " spaces joined"] })] })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: onExploreSpaces, className: "text-tertiary hover:text-primary", children: _jsx(Search, { size: 16 }) })] }), _jsxs("div", { className: "flex gap-1 mb-6 p-1 bg-white/5 rounded-lg", children: [_jsx("button", { onClick: () => setShowRecommendations(false), className: cn("flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all", !showRecommendations
                            ? "bg-white/10 text-primary border border-white/20"
                            : "text-secondary hover:text-primary"), children: "Your Spaces" }), _jsx("button", { onClick: () => setShowRecommendations(true), className: cn("flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all", showRecommendations
                            ? "bg-white/10 text-primary border border-white/20"
                            : "text-secondary hover:text-primary"), children: "Discover" })] }), _jsx("div", { className: "space-y-4 mb-8 max-h-80 overflow-y-auto", children: showRecommendations ? (_jsx(motion.div, { initial: "hidden", animate: "visible", variants: {
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                    }, children: recommendations.length === 0 ? (_jsxs(motion.div, { className: "text-center py-6", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.2 }, children: [_jsx(Users, { size: 32, className: "text-tertiary mx-auto mb-3 opacity-50" }), _jsx("p", { className: "profile-body text-tertiary mb-4", children: "No new recommendations" }), _jsxs(motion.button, { onClick: onExploreSpaces, className: cn("social-action-button secondary", butterClasses.button), children: [_jsx(Search, { size: 16 }), "Explore Spaces"] })] })) : (recommendations.map((space, index) => (_jsx(motion.div, { variants: {
                            hidden: { opacity: 0, y: 24, scale: 0.98 },
                            visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
                        }, className: getStaggerClass(index), children: _jsx(SpaceItem, { space: space, isRecommendation: true }) }, space.id)))) })) : (_jsx(motion.div, { initial: "hidden", animate: "visible", variants: {
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                    }, children: spaces.length === 0 ? (_jsxs(motion.div, { className: "text-center py-6", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.2 }, children: [_jsx(Users, { size: 32, className: "text-tertiary mx-auto mb-3 opacity-50" }), _jsx("p", { className: "profile-body text-tertiary mb-4", children: "You haven't joined any spaces yet" }), _jsxs(motion.button, { onClick: onExploreSpaces, className: cn("social-action-button", butterClasses.button), children: [_jsx(Search, { size: 16 }), "Find Your People"] })] })) : (spaces
                        .sort((a, b) => {
                        // Sort by unread count first, then by recent activity
                        if (a.unreadCount && !b.unreadCount)
                            return -1;
                        if (!a.unreadCount && b.unreadCount)
                            return 1;
                        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
                    })
                        .map((space, index) => (_jsx(motion.div, { variants: {
                            hidden: { opacity: 0, y: 20, scale: 0.95 },
                            visible: { opacity: 1, y: 0, scale: 1 }
                        }, className: getStaggerClass(index), children: _jsx(SpaceItem, { space: space }) }, space.id)))) })) }), !showRecommendations && (_jsxs(motion.div, { className: "flex items-center gap-3 p-4 rounded-xl border border-dashed border-white/20 hover:border-white/40 cursor-pointer transition-all group", whileHover: { scale: 1.005, borderColor: 'rgba(255, 255, 255, 0.4)', transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }, whileTap: { scale: 0.995, transition: { duration: 0.2 } }, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }, onClick: onCreateSpace, children: [_jsx(motion.div, { className: "w-8 h-8 rounded-lg border border-dashed border-white/30 group-hover:border-white/50 flex items-center justify-center", whileHover: { rotate: 180 }, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }, children: _jsx(Plus, { size: 16, className: "text-tertiary group-hover:text-primary" }) }), _jsxs("div", { className: "flex-1 profile-caption text-tertiary group-hover:text-primary cursor-pointer", children: ["\u2795 Find your people...", _jsx("div", { className: "profile-fine text-tertiary group-hover:text-secondary mt-1", children: "Based on your interests" })] })] })), _jsxs(motion.div, { className: "flex gap-3 mt-8", initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.7, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }, children: [_jsx(motion.div, { className: "flex-1", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: _jsxs(Button, { onClick: onExploreSpaces, className: cn("social-action-button w-full", butterClasses.button), children: [_jsx(Search, { size: 16 }), "Explore"] }) }), _jsx(motion.div, { whileHover: { scale: 1.01, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } }, whileTap: { scale: 0.99, transition: { duration: 0.2 } }, children: _jsxs(Button, { onClick: onCreateSpace, className: cn("social-action-button secondary", butterClasses.button), variant: "outline", children: [_jsx(Plus, { size: 16 }), "Create Space"] }) })] })] }));
}
export default SocialSpacesCard;
//# sourceMappingURL=social-spaces-card.js.map