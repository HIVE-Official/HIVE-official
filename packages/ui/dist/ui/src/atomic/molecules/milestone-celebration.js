"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Button } from '../atoms';
import { Card } from '.';
import { Trophy, Sparkles, CheckCircle, Users, Target, Award, Star, ChevronRight, Share, Heart, Zap } from 'lucide-react';
const getRarityConfig = (rarity) => {
    const configs = {
        common: {
            color: 'text-gray-400',
            bgColor: 'from-gray-400 to-gray-500',
            borderColor: 'border-gray-400/30',
            glowColor: 'shadow-gray-400/20'
        },
        uncommon: {
            color: 'text-green-400',
            bgColor: 'from-green-400 to-green-500',
            borderColor: 'border-green-400/30',
            glowColor: 'shadow-green-400/20'
        },
        rare: {
            color: 'text-blue-400',
            bgColor: 'from-blue-400 to-blue-500',
            borderColor: 'border-blue-400/30',
            glowColor: 'shadow-blue-400/20'
        },
        epic: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'from-[var(--hive-gold)] to-[var(--hive-gold)]',
            borderColor: 'border-[var(--hive-gold)]/30',
            glowColor: 'shadow-[var(--hive-gold)]/20'
        },
        legendary: {
            color: 'text-hive-gold',
            bgColor: 'from-hive-gold to-[var(--hive-gold)]',
            borderColor: 'border-hive-gold/30',
            glowColor: 'shadow-hive-gold/20'
        }
    };
    return configs[rarity] || configs.common;
};
const getMilestoneIcon = (type, iconName) => {
    if (iconName) {
        // Map icon names to components
        const iconMap = {
            trophy: Trophy,
            target: Target,
            users: Users,
            heart: Heart,
            star: Star,
            award: Award,
            zap: Zap
        };
        return iconMap[iconName] || Trophy;
    }
    switch (type) {
        case 'personal': return Target;
        case 'community': return Users;
        case 'ritual_complete': return Trophy;
        default: return CheckCircle;
    }
};
export function MilestoneCelebration({ milestone, isVisible, onClose, onShare, className = '' }) {
    const [showAnimation, setShowAnimation] = useState(false);
    const [animationPhase, setAnimationPhase] = useState('enter');
    const rarityConfig = getRarityConfig(milestone.rarity);
    const IconComponent = getMilestoneIcon(milestone.type, milestone.icon);
    useEffect(() => {
        if (isVisible) {
            setShowAnimation(true);
            setAnimationPhase('enter');
            // Trigger celebration animation after entry
            const celebrateTimer = setTimeout(() => {
                setAnimationPhase('celebrate');
            }, 500);
            // Settle into final state
            const settleTimer = setTimeout(() => {
                setAnimationPhase('settle');
            }, 2000);
            return () => {
                clearTimeout(celebrateTimer);
                clearTimeout(settleTimer);
            };
        }
        return () => { }; // No cleanup needed when not visible
    }, [isVisible]);
    if (!isVisible)
        return null;
    return (_jsxs("div", { className: `fixed inset-0 z-50 flex items-center justify-center p-4 ${className}`, children: [_jsx("div", { className: "absolute inset-0 bg-[var(--hive-black)]/70 backdrop-blur-sm transition-opacity duration-500", onClick: onClose }), _jsxs(Card, { className: `
        relative max-w-md w-full transform transition-all duration-500
        ${showAnimation
                    ? animationPhase === 'enter'
                        ? 'scale-50 opacity-0 translate-y-10'
                        : animationPhase === 'celebrate'
                            ? 'scale-110 opacity-100 translate-y-0'
                            : 'scale-100 opacity-100 translate-y-0'
                    : 'scale-50 opacity-0'}
        border-2 ${rarityConfig.borderColor} shadow-2xl ${rarityConfig.glowColor}
      `, children: [animationPhase === 'celebrate' && (_jsx("div", { className: "absolute inset-0 overflow-hidden rounded-lg", children: Array.from({ length: 12 }).map((_, i) => (_jsx("div", { className: `absolute w-2 h-2 ${rarityConfig.color} rounded-full animate-ping`, style: {
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${1 + Math.random()}s`
                            } }, i))) })), _jsxs("div", { className: "p-8 text-center relative z-10", children: [_jsxs("div", { className: `
            relative mx-auto mb-6 w-20 h-20 rounded-full 
            bg-gradient-to-r ${rarityConfig.bgColor}
            flex items-center justify-center
            ${animationPhase === 'celebrate' ? 'animate-pulse shadow-2xl' : ''}
            transition-all duration-500
          `, children: [_jsx(IconComponent, { className: "h-10 w-10 text-[var(--hive-text-inverse)]" }), animationPhase === 'celebrate' && (_jsxs(_Fragment, { children: [_jsx(Sparkles, { className: "absolute -top-2 -right-2 h-4 w-4 text-hive-gold animate-spin" }), _jsx(Sparkles, { className: "absolute -bottom-1 -left-2 h-3 w-3 text-hive-gold animate-spin", style: { animationDelay: '0.5s' } }), _jsx(Sparkles, { className: "absolute top-1 -right-3 h-2 w-2 text-hive-gold animate-spin", style: { animationDelay: '1s' } })] }))] }), _jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 ${rarityConfig.color} bg-current/10`, children: [_jsx(Star, { className: "h-3 w-3 mr-1" }), milestone.rarity.charAt(0).toUpperCase() + milestone.rarity.slice(1), " Milestone"] }), _jsx("h2", { className: "text-2xl font-bold text-hive-text-primary mb-2", children: milestone.name }), _jsx("p", { className: "text-hive-text-secondary leading-relaxed", children: milestone.description })] }), milestone.communityStats && (_jsxs("div", { className: "mb-6 p-4 bg-hive-surface-elevated rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Users, { className: "h-4 w-4 text-hive-brand-secondary" }), _jsx("span", { className: "text-hive-text-secondary", children: "Community Progress" })] }), _jsxs("span", { className: "font-semibold text-hive-text-primary", children: [milestone.communityStats.totalAchievers.toLocaleString(), " achieved"] })] }), _jsxs("div", { className: "mt-2 text-xs text-hive-text-secondary", children: [milestone.communityStats.percentageComplete, "% of students have reached this milestone"] })] })), milestone.unlockedFeatures && milestone.unlockedFeatures.length > 0 && (_jsxs("div", { className: "mb-6 p-4 bg-gradient-to-r from-hive-gold/10 to-green-500/10 rounded-lg border border-hive-gold/20", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-3", children: [_jsx(Zap, { className: "h-4 w-4 text-hive-gold" }), _jsx("span", { className: "font-semibold text-hive-text-primary text-sm", children: "New Features Unlocked!" })] }), _jsx("div", { className: "space-y-1", children: milestone.unlockedFeatures.map((feature, index) => (_jsxs("div", { className: "flex items-center space-x-2 text-sm", children: [_jsx(CheckCircle, { className: "h-3 w-3 text-green-400" }), _jsx("span", { className: "text-hive-text-secondary", children: feature })] }, index))) })] })), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [onShare && (_jsxs(Button, { onClick: onShare, variant: "secondary", className: "flex-1 border-hive-gold/30 text-hive-gold hover:bg-hive-gold/10", children: [_jsx(Share, { className: "h-4 w-4 mr-2" }), "Share Achievement"] })), _jsxs(Button, { onClick: onClose, className: "flex-1 bg-hive-gold text-hive-obsidian hover:bg-hive-gold/90", children: ["Continue Journey", _jsx(ChevronRight, { className: "h-4 w-4 ml-2" })] })] })] }), animationPhase === 'celebrate' && (_jsxs("div", { className: "absolute inset-0 pointer-events-none overflow-hidden rounded-lg", children: [_jsx("div", { className: "absolute top-0 left-1/4 w-2 h-2 bg-hive-gold transform rotate-45 animate-bounce", style: { animationDelay: '0.1s' } }), _jsx("div", { className: "absolute top-0 right-1/4 w-2 h-2 bg-[var(--hive-gold)] transform rotate-45 animate-bounce", style: { animationDelay: '0.3s' } }), _jsx("div", { className: "absolute bottom-0 left-1/3 w-2 h-2 bg-green-400 transform rotate-45 animate-bounce", style: { animationDelay: '0.5s' } }), _jsx("div", { className: "absolute bottom-0 right-1/3 w-2 h-2 bg-blue-400 transform rotate-45 animate-bounce", style: { animationDelay: '0.7s' } })] }))] })] }));
}
//# sourceMappingURL=milestone-celebration.js.map