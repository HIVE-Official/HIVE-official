"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { Button, Progress } from '../atoms/index.js';
import { Card } from '../molecules/index.js';
import { Clock, Users, CheckCircle, Sparkles, ChevronRight, Trophy, Target, UserPlus, Compass } from 'lucide-react';
const WEEK_THEMES = {
    1: { title: "Initialize", description: "Build your foundation", icon: Target, color: "hive-gold" },
    2: { title: "Discover", description: "Find your communities", icon: Compass, color: "hive-brand-secondary" },
    3: { title: "Connect", description: "Build your network", icon: UserPlus, color: "purple-400" },
    4: { title: "Launch", description: "Prepare for campus", icon: Sparkles, color: "green-400" }
};
export function RitualsHub({ currentWeek = 1, availableRituals = [], completedRituals = [], className = '' }) {
    const [activeRitual, setActiveRitual] = useState(null);
    const [communityStats, setCommunityStats] = useState({
        totalParticipants: 1247,
        weeklyGoal: 2000,
        completionRate: 0.73
    });
    // Get current week's ritual
    useEffect(() => {
        const currentWeekRitual = availableRituals.find(ritual => ritual.week === currentWeek && ritual.userParticipation?.status === 'active');
        setActiveRitual(currentWeekRitual || availableRituals[0] || null);
    }, [currentWeek, availableRituals]);
    const getWeekStatus = (week) => {
        if (week < currentWeek)
            return 'completed';
        if (week === currentWeek)
            return 'active';
        return 'upcoming';
    };
    const getRitualIcon = (type) => {
        switch (type) {
            case 'onboarding': return Target;
            case 'community': return Users;
            case 'creative': return Sparkles;
            default: return CheckCircle;
        }
    };
    const formatDuration = (minutes) => {
        if (minutes < 60)
            return `${minutes}m`;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    };
    return (_jsxs("div", { className: `space-y-8 ${className}`, children: [_jsxs("div", { className: "text-center space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h1", { className: "text-3xl font-bold text-hive-text-primary", children: "Summer Rituals" }), _jsx("p", { className: "text-hive-text-secondary text-lg", children: "Four weeks to build your campus foundation" })] }), _jsx("div", { className: "grid grid-cols-4 gap-4 max-w-4xl mx-auto", children: Object.entries(WEEK_THEMES).map(([weekNum, theme]) => {
                            const week = parseInt(weekNum);
                            const status = getWeekStatus(week);
                            const IconComponent = theme.icon;
                            return (_jsxs(Card, { className: `p-4 text-center transition-all duration-300 ${status === 'active'
                                    ? `bg-${theme.color}/20 border-${theme.color} shadow-lg scale-105`
                                    : status === 'completed'
                                        ? 'bg-green-500/20 border-green-500'
                                        : 'bg-hive-surface-elevated border-hive-border-subtle opacity-60'}`, children: [_jsx("div", { className: `w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${status === 'active'
                                            ? `bg-${theme.color}`
                                            : status === 'completed'
                                                ? 'bg-green-500'
                                                : 'bg-hive-surface-elevated'}`, children: status === 'completed' ? (_jsx(CheckCircle, { className: "h-6 w-6 text-white" })) : (_jsx(IconComponent, { className: `h-6 w-6 ${status === 'active' ? 'text-hive-obsidian' : 'text-hive-text-secondary'}` })) }), _jsxs("h3", { className: `font-semibold mb-1 ${status === 'active' ? 'text-hive-text-primary' : 'text-hive-text-secondary'}`, children: ["Week ", week] }), _jsx("p", { className: `text-sm font-medium ${status === 'active' ? `text-${theme.color}` : 'text-hive-text-secondary'}`, children: theme.title }), _jsx("p", { className: "text-xs text-hive-text-secondary mt-1", children: theme.description })] }, week));
                        }) })] }), _jsxs(Card, { className: "p-6 bg-gradient-to-r from-hive-gold/10 to-hive-brand-secondary/10 border-hive-gold/30", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-12 h-12 bg-hive-gold rounded-full flex items-center justify-center", children: _jsx(Users, { className: "h-6 w-6 text-hive-obsidian" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-hive-text-primary", children: "Community Progress" }), _jsxs("p", { className: "text-sm text-hive-text-secondary", children: [communityStats.totalParticipants.toLocaleString(), " students building together"] })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-2xl font-bold text-hive-gold", children: [Math.round(communityStats.completionRate * 100), "%"] }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "completion rate" })] })] }), _jsx(Progress, { value: communityStats.completionRate * 100, className: "h-3" }), _jsxs("div", { className: "flex justify-between text-xs text-hive-text-secondary mt-2", children: [_jsxs("span", { children: [communityStats.totalParticipants.toLocaleString(), " active"] }), _jsxs("span", { children: ["Goal: ", communityStats.weeklyGoal.toLocaleString()] })] })] }), activeRitual && (_jsxs(Card, { className: "p-6 bg-hive-surface-elevated border-hive-brand-secondary/30", children: [_jsxs("div", { className: "flex items-start justify-between mb-6", children: [_jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-hive-gold to-hive-brand-secondary rounded-xl flex items-center justify-center", children: React.createElement(getRitualIcon(activeRitual.type), {
                                            className: "h-8 w-8 text-hive-obsidian"
                                        }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-hive-text-primary mb-1", children: activeRitual.title }), _jsx("p", { className: "text-hive-gold font-medium mb-2", children: activeRitual.tagline }), _jsx("p", { className: "text-hive-text-secondary text-sm leading-relaxed", children: activeRitual.description })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "flex items-center space-x-2 text-hive-text-secondary text-sm mb-2", children: [_jsx(Clock, { className: "h-4 w-4" }), _jsx("span", { children: formatDuration(activeRitual.duration) })] }), _jsxs("div", { className: "flex items-center space-x-2 text-hive-text-secondary text-sm", children: [_jsx(Users, { className: "h-4 w-4" }), _jsxs("span", { children: [activeRitual.activeParticipants.toLocaleString(), " active"] })] })] })] }), activeRitual.userParticipation && (_jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("h3", { className: "font-semibold text-hive-text-primary", children: "Your Progress" }), _jsxs("span", { className: "text-sm text-hive-text-secondary", children: [activeRitual.userParticipation.progressPercentage, "% complete"] })] }), _jsx(Progress, { value: activeRitual.userParticipation.progressPercentage, className: "h-2 mb-3" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-hive-text-secondary", children: "Current step:" }), _jsx("p", { className: "font-medium text-hive-text-primary", children: activeRitual.userParticipation.currentStep })] }), _jsxs(Button, { className: "bg-hive-gold text-hive-obsidian hover:bg-hive-gold/90", children: [activeRitual.userParticipation.nextAction, _jsx(ChevronRight, { className: "h-4 w-4 ml-2" })] })] })] })), activeRitual.milestones.length > 0 && (_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-hive-text-primary mb-3", children: "Milestones" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: activeRitual.milestones.map((milestone) => (_jsxs("div", { className: `p-3 rounded-lg border transition-colors ${milestone.isReached
                                        ? 'bg-green-500/20 border-green-500/50'
                                        : 'bg-hive-surface-base border-hive-border-subtle'}`, children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [milestone.isReached ? (_jsx(CheckCircle, { className: "h-4 w-4 text-green-400" })) : (_jsx("div", { className: "w-4 h-4 rounded-full border-2 border-hive-border-subtle" })), _jsx("span", { className: `text-sm font-medium ${milestone.isReached ? 'text-green-400' : 'text-hive-text-primary'}`, children: milestone.name })] }), _jsx("p", { className: "text-xs text-hive-text-secondary", children: milestone.description })] }, milestone.id))) })] }))] })), completedRituals.length > 0 && (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx(Trophy, { className: "h-6 w-6 text-hive-gold" }), _jsx("h2", { className: "text-xl font-bold text-hive-text-primary", children: "Completed Rituals" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: completedRituals.map((ritual) => (_jsx(Card, { className: "p-4 bg-green-500/10 border-green-500/30", children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center", children: _jsx(CheckCircle, { className: "h-5 w-5 text-green-400" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-hive-text-primary text-sm", children: ritual.title }), _jsxs("p", { className: "text-xs text-hive-text-secondary mt-1", children: ["Week ", ritual.week, " \u2022 Completed"] })] })] }) }, ritual.id))) })] }))] }));
}
//# sourceMappingURL=rituals-hub.js.map