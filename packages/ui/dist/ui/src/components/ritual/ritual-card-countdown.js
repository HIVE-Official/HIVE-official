"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../button';
import { Badge } from '../badge';
import { cn } from '../../lib/utils';
import { Flame, Users, Clock, Sparkles, ArrowRight, Zap, Calendar, Timer } from 'lucide-react';
const ritualConfig = {
    first_light: {
        icon: Flame,
        color: 'ritual',
        label: 'First Light',
        emoji: '🕯️',
        gradient: 'from-accent/15 via-accent/5 to-transparent',
    },
    torch_pass: {
        icon: Flame,
        color: 'accent',
        label: 'Torch Pass',
        emoji: '🔥',
        gradient: 'from-accent/10 via-accent/3 to-transparent',
    },
    space_hunt: {
        icon: Sparkles,
        color: 'accent',
        label: 'Space Hunt',
        emoji: '🎯',
        gradient: 'from-accent/10 via-accent/3 to-transparent',
    },
    builder_spotlight: {
        icon: Users,
        color: 'accent',
        label: 'Builder Spotlight',
        emoji: '🌟',
        gradient: 'from-accent/10 via-accent/3 to-transparent',
    },
    wave: {
        icon: Zap,
        color: 'accent',
        label: 'Wave',
        emoji: '🌊',
        gradient: 'from-accent/10 via-accent/3 to-transparent',
    },
};
const urgencyConfig = {
    low: {
        pulseIntensity: 0.05,
        borderColor: 'border-border',
        textColor: 'text-muted',
    },
    medium: {
        pulseIntensity: 0.1,
        borderColor: 'border-accent/30',
        textColor: 'text-foreground',
    },
    high: {
        pulseIntensity: 0.2,
        borderColor: 'border-accent/50',
        textColor: 'text-accent',
    },
};
export const RitualCardCountdown = ({ id: _id, title, description, type, participantCount, startTime, endTime, isActive: _isActive, hasParticipated, urgencyLevel, onParticipate, onSetReminder, className, }) => {
    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isStarted, setIsStarted] = useState(false);
    const [isExpired, setIsExpired] = useState(false);
    const config = ritualConfig[type];
    const urgency = urgencyConfig[urgencyLevel];
    useEffect(() => {
        const calculateTimeRemaining = () => {
            const now = new Date();
            const targetTime = isStarted ? endTime : startTime;
            const timeDiff = targetTime.getTime() - now.getTime();
            if (timeDiff <= 0) {
                if (!isStarted) {
                    setIsStarted(true);
                    return;
                }
                else {
                    setIsExpired(true);
                    setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                    return;
                }
            }
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            setTimeRemaining({ days, hours, minutes, seconds });
        };
        // Initial calculation
        calculateTimeRemaining();
        setIsStarted(new Date() >= startTime);
        // Update every second
        const interval = setInterval(calculateTimeRemaining, 1000);
        return () => clearInterval(interval);
    }, [startTime, endTime, isStarted]);
    const formatTime = (value) => value.toString().padStart(2, '0');
    const getUrgencyMessage = () => {
        if (isExpired)
            return "Ritual has ended";
        if (!isStarted)
            return "Starting soon";
        if (timeRemaining.days === 0 && timeRemaining.hours < 2)
            return "Ending very soon!";
        if (timeRemaining.days === 0 && timeRemaining.hours < 12)
            return "Less than 12 hours left";
        if (timeRemaining.days === 0)
            return "Final day";
        return `${timeRemaining.days} day${timeRemaining.days !== 1 ? 's' : ''} remaining`;
    };
    return (_jsxs(motion.article, { layout: true, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: cn("group relative overflow-hidden", "bg-surface border rounded-xl", "transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]", "hover:shadow-lg", urgency.borderColor, className), children: [_jsx(motion.div, { className: "absolute inset-0 pointer-events-none", animate: {
                    opacity: [urgency.pulseIntensity, urgency.pulseIntensity * 2, urgency.pulseIntensity]
                }, transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }, children: _jsx("div", { className: cn("absolute inset-0 bg-gradient-to-br", config.gradient) }) }), _jsxs("div", { className: "relative p-6", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(motion.div, { className: "w-10 h-10 rounded-lg bg-surface-01 border border-border flex items-center justify-center", animate: urgencyLevel === 'high' ? {
                                            scale: [1, 1.05, 1],
                                        } : { scale: 1 }, transition: {
                                            duration: 1,
                                            repeat: urgencyLevel === 'high' ? Infinity : 0
                                        }, children: _jsx("span", { className: "text-xl", children: config.emoji }) }), _jsxs("div", { children: [_jsx(Badge, { variant: config.color, className: "mb-2", children: config.label }), _jsx("h3", { className: "font-display font-semibold text-foreground text-lg leading-tight", children: title })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: cn("text-xs font-medium", urgency.textColor), children: getUrgencyMessage() }), _jsxs("div", { className: "text-xs text-muted mt-1", children: [participantCount.toLocaleString(), " joined"] })] })] }), _jsx("p", { className: "text-muted font-body leading-relaxed mb-6", children: description }), _jsxs("div", { className: "mb-6 p-4 bg-surface-01/50 border border-border/50 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Timer, { className: "h-4 w-4 text-muted" }), _jsx("span", { className: "text-sm font-medium text-foreground", children: isStarted ? 'Time Remaining' : 'Starts In' })] }), urgencyLevel === 'high' && (_jsx(motion.div, { animate: { scale: [1, 1.1, 1] }, transition: { duration: 1, repeat: Infinity }, className: "text-xs text-accent font-medium", children: "\uD83D\uDD25 URGENT" }))] }), _jsxs("div", { className: "grid grid-cols-4 gap-2 text-center", children: [_jsxs("div", { className: "p-2 bg-surface border border-border rounded", children: [_jsx("div", { className: "font-display font-bold text-foreground text-lg", children: formatTime(timeRemaining.days) }), _jsx("div", { className: "text-xs text-muted", children: "Days" })] }), _jsxs("div", { className: "p-2 bg-surface border border-border rounded", children: [_jsx("div", { className: "font-display font-bold text-foreground text-lg", children: formatTime(timeRemaining.hours) }), _jsx("div", { className: "text-xs text-muted", children: "Hours" })] }), _jsxs("div", { className: "p-2 bg-surface border border-border rounded", children: [_jsx("div", { className: "font-display font-bold text-foreground text-lg", children: formatTime(timeRemaining.minutes) }), _jsx("div", { className: "text-xs text-muted", children: "Minutes" })] }), _jsxs("div", { className: "p-2 bg-surface border border-border rounded", children: [_jsx(motion.div, { className: "font-display font-bold text-foreground text-lg", animate: urgencyLevel === 'high' ? {
                                                    color: ['#FFFFFF', '#FFD700', '#FFFFFF']
                                                } : {}, transition: {
                                                    duration: 1,
                                                    repeat: urgencyLevel === 'high' ? Infinity : 0
                                                }, children: formatTime(timeRemaining.seconds) }), _jsx("div", { className: "text-xs text-muted", children: "Seconds" })] })] })] }), _jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-sm font-medium text-foreground", children: "Campus Participation" }), _jsxs("span", { className: "text-sm text-muted", children: [participantCount.toLocaleString(), " students"] })] }), _jsx("div", { className: "w-full bg-surface-02 rounded-full h-2", children: _jsx(motion.div, { className: "bg-gradient-to-r from-accent/50 to-accent h-2 rounded-full", initial: { width: 0 }, animate: { width: `${Math.min((participantCount / 1000) * 100, 100)}%` }, transition: { duration: 1, ease: "easeOut" } }) })] }), _jsx("div", { className: "space-y-3", children: isExpired ? (_jsxs("div", { className: "text-center p-4 bg-surface-01/50 border border-border/50 rounded-lg", children: [_jsx(Clock, { className: "h-6 w-6 text-muted mx-auto mb-2" }), _jsx("p", { className: "text-sm text-muted", children: "This ritual has ended" })] })) : !isStarted ? (_jsxs(Button, { variant: "outline", size: "lg", onClick: onSetReminder, className: "w-full gap-2", children: [_jsx(Calendar, { className: "h-4 w-4" }), "Set Reminder"] })) : hasParticipated ? (_jsx("div", { className: "text-center p-4 bg-accent/10 border border-accent/30 rounded-lg", children: _jsx("p", { className: "text-sm font-medium text-accent", children: "\u2728 You've participated in this ritual!" }) })) : (_jsxs(Button, { variant: "ritual", size: "lg", onClick: onParticipate, className: cn("w-full gap-3 font-semibold", urgencyLevel === 'high' && "animate-pulse"), children: [_jsx(config.icon, { className: "h-5 w-5" }), "Join Now", _jsx(ArrowRight, { className: "h-5 w-5" })] })) })] }), urgencyLevel === 'high' && (_jsx(motion.div, { className: "absolute inset-0 pointer-events-none", animate: {
                    borderColor: ['rgba(255, 215, 0, 0.3)', 'rgba(255, 215, 0, 0.6)', 'rgba(255, 215, 0, 0.3)']
                }, transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }, style: {
                    border: '2px solid transparent',
                    borderRadius: '12px'
                } }))] }));
};
//# sourceMappingURL=ritual-card-countdown.js.map