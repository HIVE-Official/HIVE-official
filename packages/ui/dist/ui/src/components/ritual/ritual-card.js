"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../button';
import { Badge } from '../badge';
import { cn } from '../../lib/utils';
import { Flame, Users, Clock, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
const ritualConfig = {
    first_light: {
        icon: Flame,
        color: 'ritual',
        label: 'First Light',
        gradient: 'from-accent/20 via-accent/10 to-transparent',
    },
    torch_pass: {
        icon: Flame,
        color: 'accent',
        label: 'Torch Pass',
        gradient: 'from-accent/15 via-accent/5 to-transparent',
    },
    space_hunt: {
        icon: Sparkles,
        color: 'accent',
        label: 'Space Hunt',
        gradient: 'from-accent/15 via-accent/5 to-transparent',
    },
    builder_spotlight: {
        icon: Users,
        color: 'accent',
        label: 'Builder Spotlight',
        gradient: 'from-accent/15 via-accent/5 to-transparent',
    },
    wave: {
        icon: Sparkles,
        color: 'accent',
        label: 'Wave',
        gradient: 'from-accent/20 via-accent/10 to-transparent',
    },
};
export const RitualCard = ({ id: _id, title, description, type, participantCount, timeRemaining, isActive, hasParticipated, onParticipate, className, }) => {
    const config = ritualConfig[type];
    const Icon = config.icon;
    return (_jsxs(motion.div, { layout: true, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, whileHover: { scale: 1.02 }, className: cn("relative overflow-hidden rounded-lg border border-border bg-surface", "transition-all duration-base ease-brand", "hover:border-accent/30 hover:shadow-lg", isActive && "ring-1 ring-accent/20", className), children: [_jsx("div", { className: cn("absolute inset-0 bg-gradient-to-br opacity-50", config.gradient) }), _jsxs("div", { className: "relative p-6 space-y-4", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: cn("p-2 rounded-lg transition-all duration-base", hasParticipated
                                            ? "bg-accent/20 text-accent"
                                            : "bg-surface-02 text-muted hover:text-accent"), children: _jsx(Icon, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-display font-semibold text-foreground", children: title }), _jsx(Badge, { variant: hasParticipated ? "ritual" : "chip", size: "sm", children: config.label })] })] }), hasParticipated && (_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, className: "p-1 bg-accent/20 rounded-full", children: _jsx(CheckCircle, { className: "w-4 h-4 text-accent" }) }))] }), _jsx("p", { className: "text-muted font-body text-sm leading-relaxed", children: description }), _jsxs("div", { className: "flex items-center gap-4 text-xs text-muted", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "w-3 h-3" }), _jsxs("span", { children: [participantCount.toLocaleString(), " participated"] })] }), timeRemaining && isActive && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-3 h-3" }), _jsxs("span", { children: [timeRemaining, " remaining"] })] }))] }), _jsx(AnimatePresence, { mode: "wait", children: !hasParticipated && isActive ? (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, children: _jsxs(Button, { variant: "ritual", size: "sm", onClick: onParticipate, className: "w-full group", children: [_jsx("span", { children: "Join Ritual" }), _jsx(ArrowRight, { className: "w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" })] }) }, "participate")) : hasParticipated ? (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "text-center py-2", children: _jsx("span", { className: "text-accent text-sm font-medium", children: "\u2728 Ritual completed" }) }, "completed")) : (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "text-center py-2", children: _jsx("span", { className: "text-muted text-sm", children: "Ritual will begin soon" }) }, "inactive")) })] }), isActive && !hasParticipated && (_jsx(motion.div, { className: "absolute inset-0 rounded-lg border border-accent/50", animate: { opacity: [0, 0.5, 0] }, transition: { duration: 2, repeat: Infinity } }))] }));
};
//# sourceMappingURL=ritual-card.js.map