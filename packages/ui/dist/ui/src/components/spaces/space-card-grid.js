"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Badge } from '../badge';
import { cn } from '../../lib/utils.js';
import { Users, Sparkles, Star, ArrowRight, Flame, Zap } from 'lucide-react';
const spaceTypeConfig = {
    academic: {
        label: 'Academic',
        icon: Star,
        color: 'accent',
        bgPattern: 'radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
    },
    residential: {
        label: 'Residential',
        icon: Users,
        color: 'chip',
        bgPattern: 'radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
    },
    interest: {
        label: 'Interest',
        icon: Sparkles,
        color: 'chip',
        bgPattern: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)',
    },
    organization: {
        label: 'Organization',
        icon: Users,
        color: 'chip',
        bgPattern: 'radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
    },
    greek: {
        label: 'Greek Life',
        icon: Star,
        color: 'accent',
        bgPattern: 'radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
    },
};
const statusConfig = {
    preview: {
        label: 'Preview',
        icon: Zap,
        color: 'text-accent',
        bgColor: 'bg-accent/10',
    },
    active: {
        label: 'Active',
        icon: Flame,
        color: 'text-accent',
        bgColor: 'bg-accent/10',
    },
    invite_only: {
        label: 'Invite Only',
        icon: Star,
        color: 'text-accent',
        bgColor: 'bg-accent/10',
    },
};
const activityLevelConfig = {
    low: { intensity: 0.3, color: 'text-muted' },
    medium: { intensity: 0.6, color: 'text-foreground' },
    high: { intensity: 1, color: 'text-accent' },
};
export const SpaceCardGrid = ({ id: _id, name, description, type, status, memberCount, potentialMembers, recentActivity, upcomingEvents = 0, activityLevel, leaders = [], isJoined = false, onJoin, onViewSpace, className, }) => {
    const [isHovered, setIsHovered] = useState(false);
    const config = spaceTypeConfig[type];
    const statusInfo = statusConfig[status];
    const _activityInfo = activityLevelConfig[activityLevel];
    const displayMemberCount = status === 'preview' ? potentialMembers : memberCount;
    return (_jsxs(motion.article, { layout: true, initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, whileHover: { y: -4 }, onHoverStart: () => setIsHovered(true), onHoverEnd: () => setIsHovered(false), className: cn("group relative bg-surface border border-border rounded-xl overflow-hidden", "transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]", "hover:shadow-xl hover:border-border-hover", "cursor-pointer", className), style: {
            backgroundImage: config.bgPattern,
        }, children: [_jsxs("div", { className: "p-4 pb-0", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsx("div", { className: cn("w-8 h-8 rounded-lg flex items-center justify-center", statusInfo.bgColor), children: _jsx(config.icon, { className: cn("h-4 w-4", config.color === 'accent' ? 'text-accent' : 'text-foreground') }) }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(statusInfo.icon, { className: cn("h-3 w-3", statusInfo.color) }), _jsx("span", { className: cn("text-xs font-medium", statusInfo.color), children: statusInfo.label })] })] }), _jsx("h3", { className: "font-display font-semibold text-foreground text-base leading-tight mb-2 line-clamp-2", children: name }), _jsx(Badge, { variant: config.color, className: "text-xs mb-3", children: config.label })] }), _jsxs("div", { className: "px-4 pb-4", children: [_jsx("p", { className: "text-muted font-body text-xs leading-relaxed mb-4 line-clamp-3", children: description }), _jsxs("div", { className: "grid grid-cols-2 gap-2 mb-4 text-center", children: [_jsxs("div", { className: "p-2 bg-surface-01/50 border border-border/50 rounded-lg", children: [_jsx("div", { className: "text-lg font-display font-semibold text-foreground", children: displayMemberCount ? displayMemberCount.toLocaleString() : '0' }), _jsx("div", { className: "text-xs text-muted", children: status === 'preview' ? 'Potential' : 'Members' })] }), _jsxs("div", { className: "p-2 bg-surface-01/50 border border-border/50 rounded-lg", children: [_jsx("div", { className: "text-lg font-display font-semibold text-foreground", children: upcomingEvents }), _jsx("div", { className: "text-xs text-muted", children: "Events" })] })] }), recentActivity && (_jsxs("div", { className: "mb-4 p-2 bg-surface-01/30 border border-border/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("div", { className: cn("w-2 h-2 rounded-full", activityLevel === 'high' ? 'bg-accent animate-pulse' :
                                            activityLevel === 'medium' ? 'bg-foreground/60' : 'bg-muted') }), _jsx("span", { className: "text-xs font-medium text-foreground", children: "Recent Activity" })] }), _jsx("p", { className: "text-xs text-muted line-clamp-1", children: recentActivity })] })), leaders.length > 0 && (_jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "text-xs text-muted mb-2", children: "Leaders" }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("div", { className: "flex -space-x-1", children: leaders.slice(0, 3).map((leader) => (_jsx("div", { className: "w-5 h-5 rounded-full bg-surface-02 border border-surface flex-shrink-0", title: leader.name }, leader.id))) }), leaders.length > 3 && (_jsxs("span", { className: "text-xs text-muted ml-1", children: ["+", leaders.length - 3] }))] })] }))] }), _jsx("div", { className: "p-4 pt-0", children: isJoined ? (_jsxs(Button, { variant: "secondary", size: "sm", onClick: onViewSpace, className: "w-full gap-2 text-xs", children: ["View Space", _jsx(ArrowRight, { className: "h-3 w-3" })] })) : (_jsx(Button, { variant: status === 'preview' ? 'ritual' : 'default', size: "sm", onClick: onJoin, className: "w-full gap-2 text-xs", children: status === 'preview' ? (_jsxs(_Fragment, { children: [_jsx(Sparkles, { className: "h-3 w-3" }), "Request to Lead"] })) : status === 'invite_only' ? ('Request Access') : ('Join Space') })) }), _jsx(motion.div, { className: "absolute inset-0 pointer-events-none", initial: { opacity: 0 }, animate: { opacity: isHovered ? 1 : 0 }, transition: { duration: 0.2 }, children: _jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" }) }), activityLevel === 'high' && (_jsx(motion.div, { className: "absolute top-2 right-2 w-1 h-1 bg-accent rounded-full", animate: {
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                }, transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                } }))] }));
};
//# sourceMappingURL=space-card-grid.js.map