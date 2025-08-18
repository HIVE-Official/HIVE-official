"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../button';
import { Badge } from '../badge';
import { cn } from '../lib/utils';
import { Flame, Users, Clock, Sparkles, ArrowRight, CheckCircle, Star, Zap } from 'lucide-react';
const ritualConfig = {
    first_light: {
        icon: Flame,
        color: 'ritual',
        label: 'First Light',
        gradient: 'from-accent/20 via-accent/10 to-transparent',
        celebrationColor: 'from-accent/30 via-accent/15 to-transparent',
        emoji: '🕯️',
        particleColor: '#FFD700',
    },
    torch_pass: {
        icon: Flame,
        color: 'accent',
        label: 'Torch Pass',
        gradient: 'from-accent/15 via-accent/5 to-transparent',
        celebrationColor: 'from-accent/25 via-accent/10 to-transparent',
        emoji: '🔥',
        particleColor: '#FFD700',
    },
    space_hunt: {
        icon: Sparkles,
        color: 'accent',
        label: 'Space Hunt',
        gradient: 'from-accent/15 via-accent/5 to-transparent',
        celebrationColor: 'from-accent/25 via-accent/10 to-transparent',
        emoji: '🎯',
        particleColor: '#FFD700',
    },
    builder_spotlight: {
        icon: Users,
        color: 'accent',
        label: 'Builder Spotlight',
        gradient: 'from-accent/15 via-accent/5 to-transparent',
        celebrationColor: 'from-accent/25 via-accent/10 to-transparent',
        emoji: '🌟',
        particleColor: '#FFD700',
    },
    wave: {
        icon: Zap,
        color: 'accent',
        label: 'Wave',
        gradient: 'from-accent/15 via-accent/5 to-transparent',
        celebrationColor: 'from-accent/25 via-accent/10 to-transparent',
        emoji: '🌊',
        particleColor: '#FFD700',
    },
};
// Particle component for celebration effects
const Particle = ({ delay, color }) => (_jsx(motion.div, { className: "absolute w-1 h-1 rounded-full", style: { backgroundColor: color }, initial: {
        scale: 0,
        x: 0,
        y: 0,
        opacity: 1
    }, animate: {
        scale: [0, 1, 0],
        x: Math.random() * 200 - 100,
        y: Math.random() * 150 - 75,
        opacity: [1, 1, 0]
    }, transition: {
        duration: 2,
        delay: delay,
        ease: "easeOut"
    } }));
export const RitualCardCelebration = ({ id: _id, title, description, type, participantCount, timeRemaining, isActive, hasParticipated, celebrationMoment = false, onParticipate, className, }) => {
    const [isParticipating, setIsParticipating] = useState(false);
    const [showCelebration, setShowCelebration] = useState(celebrationMoment);
    const [particles, setParticles] = useState([]);
    const config = ritualConfig[type];
    useEffect(() => {
        if (showCelebration) {
            // Generate particles for celebration
            const particleArray = Array.from({ length: 20 }, (_, i) => i);
            setParticles(particleArray);
            // Auto-hide celebration after animation
            const timer = setTimeout(() => {
                setShowCelebration(false);
                setParticles([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showCelebration]);
    const handleParticipate = () => {
        if (isParticipating || hasParticipated)
            return;
        setIsParticipating(true);
        setShowCelebration(true);
        onParticipate?.();
        setTimeout(() => {
            setIsParticipating(false);
        }, 2000);
    };
    return (_jsxs(motion.article, { layout: true, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: cn("group relative overflow-hidden", "bg-surface border rounded-xl", "transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]", "hover:shadow-lg hover:border-accent/30", className), children: [_jsx("div", { className: cn("absolute inset-0 bg-gradient-to-br transition-opacity duration-500", showCelebration ? config.celebrationColor : config.gradient) }), _jsx(AnimatePresence, { children: showCelebration && (_jsx("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: _jsx("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2", children: particles.map((particle) => (_jsx(Particle, { delay: particle * 0.1, color: config.particleColor }, particle))) }) })) }), _jsxs("div", { className: "relative p-6", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(motion.div, { className: cn("w-12 h-12 rounded-xl flex items-center justify-center", "bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30"), animate: showCelebration ? {
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 5, -5, 0]
                                        } : { scale: 1, rotate: 0 }, transition: { duration: 0.6 }, children: _jsx("span", { className: "text-2xl", children: config.emoji }) }), _jsxs("div", { children: [_jsx(Badge, { variant: config.color, className: "mb-2", children: config.label }), _jsx("h3", { className: "font-display font-bold text-foreground text-xl leading-tight", children: title })] })] }), _jsxs("div", { className: "flex flex-col items-end gap-2", children: [hasParticipated && (_jsxs(motion.div, { initial: { scale: 0, rotate: -180 }, animate: { scale: 1, rotate: 0 }, className: "flex items-center gap-1 px-2 py-1 bg-accent/20 border border-accent/30 rounded-full", children: [_jsx(CheckCircle, { className: "h-3 w-3 text-accent" }), _jsx("span", { className: "text-xs font-medium text-accent", children: "Completed" })] })), isActive && !hasParticipated && (_jsxs(motion.div, { animate: {
                                            scale: [1, 1.05, 1],
                                            opacity: [0.7, 1, 0.7]
                                        }, transition: {
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }, className: "flex items-center gap-1 px-2 py-1 bg-accent/10 border border-accent/20 rounded-full", children: [_jsx(Sparkles, { className: "h-3 w-3 text-accent" }), _jsx("span", { className: "text-xs font-medium text-accent", children: "Active" })] }))] })] }), _jsx("p", { className: "text-muted font-body leading-relaxed mb-6", children: description }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [_jsxs("div", { className: "flex items-center gap-3 p-3 bg-surface-01/50 border border-border/50 rounded-lg", children: [_jsx(Users, { className: "h-5 w-5 text-accent" }), _jsxs("div", { children: [_jsx("div", { className: "font-display font-semibold text-foreground text-lg", children: participantCount.toLocaleString() }), _jsx("div", { className: "text-xs text-muted", children: "Participants" })] })] }), timeRemaining && (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-surface-01/50 border border-border/50 rounded-lg", children: [_jsx(Clock, { className: "h-5 w-5 text-muted" }), _jsxs("div", { children: [_jsx("div", { className: "font-display font-semibold text-foreground text-lg", children: timeRemaining }), _jsx("div", { className: "text-xs text-muted", children: "Remaining" })] })] }))] }), showCelebration && (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "mb-6 p-4 bg-accent/10 border border-accent/30 rounded-lg", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(motion.div, { animate: { rotate: 360 }, transition: { duration: 1, ease: "easeInOut" }, children: _jsx(Star, { className: "h-5 w-5 text-accent" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-accent text-sm", children: "\uD83C\uDF89 Ritual Completed!" }), _jsxs("p", { className: "text-xs text-muted", children: ["You've joined ", participantCount.toLocaleString(), " others in this campus moment"] })] })] }) })), _jsx(AnimatePresence, { mode: "wait", children: hasParticipated ? (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, className: "text-center p-4 bg-accent/5 border border-accent/20 rounded-lg", children: [_jsx(CheckCircle, { className: "h-6 w-6 text-accent mx-auto mb-2" }), _jsx("p", { className: "text-sm font-medium text-accent", children: "Thank you for participating!" }), _jsx("p", { className: "text-xs text-muted mt-1", children: "Your contribution helps build our campus community" })] }, "completed")) : (_jsxs(Button, { variant: "ritual", size: "lg", onClick: handleParticipate, disabled: !isActive || isParticipating, className: cn("w-full gap-3 font-semibold text-lg py-4", isParticipating && "animate-pulse"), children: [_jsx(motion.div, { animate: isParticipating ? {
                                        rotate: 360,
                                        scale: [1, 1.2, 1]
                                    } : { rotate: 0, scale: 1 }, transition: {
                                        duration: isParticipating ? 1 : 0.2,
                                        repeat: isParticipating ? Infinity : 0
                                    }, children: _jsx(config.icon, { className: "h-5 w-5" }) }), isParticipating ? 'Participating...' : 'Join Ritual', !isParticipating && _jsx(ArrowRight, { className: "h-5 w-5" })] }, "participate")) })] }), showCelebration && (_jsx(motion.div, { className: "absolute inset-0 pointer-events-none", initial: { opacity: 0 }, animate: { opacity: [0, 0.3, 0] }, transition: { duration: 1, repeat: 2 }, children: _jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent" }) }))] }));
};
//# sourceMappingURL=ritual-card-celebration.js.map