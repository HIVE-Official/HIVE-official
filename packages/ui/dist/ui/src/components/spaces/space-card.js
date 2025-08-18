"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../button';
import { Badge } from '../badge';
import { cn } from '../lib/utils';
import { Users, Calendar, Sparkles, Lock, Unlock, ArrowRight, Clock, Star } from 'lucide-react';
const spaceTypeConfig = {
    academic: {
        label: 'Academic',
        color: 'accent',
        icon: Star,
    },
    residential: {
        label: 'Residential',
        color: 'chip',
        icon: Users,
    },
    interest: {
        label: 'Interest',
        color: 'chip',
        icon: Sparkles,
    },
    organization: {
        label: 'Organization',
        color: 'chip',
        icon: Users,
    },
    greek: {
        label: 'Greek Life',
        color: 'accent',
        icon: Star,
    },
};
const statusConfig = {
    preview: {
        label: 'Preview Mode',
        description: 'Space will activate when a leader requests access',
        icon: Clock,
        actionLabel: 'Request to Lead',
    },
    active: {
        label: 'Active',
        description: 'Join to participate in this community',
        icon: Unlock,
        actionLabel: 'Join Space',
    },
    invite_only: {
        label: 'Invite Only',
        description: 'Request access to join this exclusive space',
        icon: Lock,
        actionLabel: 'Request Access',
    },
};
export const SpaceCard = ({ id: _id, name, description, type, status, memberCount, potentialMembers, recentActivity, upcomingEvents, leaders = [], isJoined = false, canRequest = true, onJoin, onRequestAccess, onViewSpace, className, }) => {
    const [isHovered, setIsHovered] = useState(false);
    const typeConfig = spaceTypeConfig[type];
    const statusInfo = statusConfig[status];
    const TypeIcon = typeConfig.icon;
    const StatusIcon = statusInfo.icon;
    const displayMemberCount = status === 'preview' ? potentialMembers : memberCount;
    const handlePrimaryAction = () => {
        if (isJoined) {
            onViewSpace?.();
        }
        else if (status === 'preview') {
            onRequestAccess?.();
        }
        else {
            onJoin?.();
        }
    };
    return (_jsxs(motion.div, { layout: true, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, whileHover: { scale: 1.02 }, onHoverStart: () => setIsHovered(true), onHoverEnd: () => setIsHovered(false), className: cn("relative bg-surface border border-border rounded-lg overflow-hidden", "transition-all duration-base ease-brand cursor-pointer", "hover:border-accent/30 hover:shadow-lg group", isJoined && "ring-1 ring-accent/20", className), children: [_jsxs("div", { className: "p-4 border-b border-border/50", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "p-1.5 bg-surface-02 rounded-lg", children: _jsx(TypeIcon, { className: "w-4 h-4 text-accent" }) }), _jsx(Badge, { variant: typeConfig.color, size: "sm", children: typeConfig.label })] }), _jsxs(Badge, { variant: status === 'active' ? 'chip' : 'outline', size: "xs", children: [_jsx(StatusIcon, { className: "w-2 h-2 mr-1" }), statusInfo.label] })] }), _jsx("h3", { className: "font-display font-semibold text-foreground mb-1 group-hover:text-accent transition-colors", children: name }), _jsx("p", { className: "text-muted text-sm leading-relaxed line-clamp-2", children: description })] }), _jsxs("div", { className: "p-4 space-y-3", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4 text-xs", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "w-3 h-3 text-muted" }), _jsx("span", { className: "text-muted", children: status === 'preview' ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-accent font-medium", children: displayMemberCount?.toLocaleString() }), _jsx("span", { children: " potential" })] })) : (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-foreground font-medium", children: displayMemberCount?.toLocaleString() }), _jsx("span", { children: " members" })] })) })] }), upcomingEvents !== undefined && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "w-3 h-3 text-muted" }), _jsxs("span", { className: "text-muted", children: [_jsx("span", { className: "text-foreground font-medium", children: upcomingEvents }), _jsx("span", { children: " events" })] })] }))] }), recentActivity && (_jsxs("div", { className: "text-xs text-muted", children: [_jsx("span", { className: "opacity-75", children: "Latest: " }), _jsx("span", { children: recentActivity })] })), leaders.length > 0 && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-xs text-muted", children: "Leaders:" }), _jsxs("div", { className: "flex -space-x-1", children: [leaders.slice(0, 3).map((leader, index) => (_jsx("div", { className: "w-5 h-5 bg-surface-02 rounded-full border border-border flex items-center justify-center text-xs text-muted", style: { zIndex: 10 - index }, children: leader.avatarUrl ? (_jsx("img", { src: leader.avatarUrl, alt: leader.name, className: "w-full h-full rounded-full object-cover" })) : (leader.name?.charAt(0)?.toUpperCase() || "?") }, leader.id))), leaders.length > 3 && (_jsxs("div", { className: "w-5 h-5 bg-surface-03 rounded-full border border-border flex items-center justify-center text-xs text-muted", children: ["+", leaders.length - 3] }))] })] }))] }), _jsx("div", { className: "p-4 border-t border-border/50 bg-surface-01/50", children: _jsx(AnimatePresence, { mode: "wait", children: isJoined ? (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, children: _jsxs(Button, { variant: "outline", size: "sm", onClick: handlePrimaryAction, className: "w-full group", children: [_jsx("span", { children: "View Space" }), _jsx(ArrowRight, { className: "w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" })] }) }, "joined")) : status === 'preview' ? (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, className: "space-y-2", children: [_jsx("p", { className: "text-xs text-muted text-center", children: statusInfo.description }), _jsx(Button, { variant: "accent", size: "sm", onClick: handlePrimaryAction, disabled: !canRequest, className: "w-full", children: statusInfo.actionLabel })] }, "preview")) : (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, children: _jsx(Button, { variant: status === 'invite_only' ? 'outline' : 'default', size: "sm", onClick: handlePrimaryAction, disabled: !canRequest, className: "w-full", children: statusInfo.actionLabel }) }, "active")) }) }), _jsx(AnimatePresence, { children: isHovered && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "absolute inset-0 bg-accent/5 pointer-events-none" })) })] }));
};
//# sourceMappingURL=space-card.js.map