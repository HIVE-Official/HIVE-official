"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '../atoms/index.js';
import { Target, Compass, UserPlus, Sparkles, ChevronRight, Clock, Users, CheckCircle, Play, RotateCcw } from 'lucide-react';
const getRitualConfig = (ritualType) => {
    const configs = {
        initialize: {
            title: 'Initialize',
            description: 'Build your foundation',
            icon: Target,
            color: 'hive-gold',
            gradient: 'from-hive-gold to-yellow-500'
        },
        discover: {
            title: 'Discover',
            description: 'Find your communities',
            icon: Compass,
            color: 'hive-brand-secondary',
            gradient: 'from-hive-brand-secondary to-purple-500'
        },
        connect: {
            title: 'Connect',
            description: 'Build your network',
            icon: UserPlus,
            color: 'purple-400',
            gradient: 'from-purple-500 to-pink-500'
        },
        launch: {
            title: 'Launch',
            description: 'Prepare for campus',
            icon: Sparkles,
            color: 'green-400',
            gradient: 'from-green-500 to-blue-500'
        }
    };
    return configs[ritualType] || configs.initialize;
};
const getActionConfig = (actionType) => {
    const configs = {
        start: {
            label: 'Start Ritual',
            icon: Play,
            description: 'Begin your journey'
        },
        continue: {
            label: 'Continue',
            icon: ChevronRight,
            description: 'Pick up where you left off'
        },
        complete: {
            label: 'Complete',
            icon: CheckCircle,
            description: 'Finish this ritual'
        },
        retry: {
            label: 'Try Again',
            icon: RotateCcw,
            description: 'Retry this ritual'
        }
    };
    return configs[actionType] || configs.start;
};
export function RitualActionButton({ ritualType, actionType, progress = 0, isDisabled = false, isLoading = false, estimatedTime, participantCount, onClick, className = '' }) {
    const [isHovered, setIsHovered] = useState(false);
    const ritualConfig = getRitualConfig(ritualType);
    const actionConfig = getActionConfig(actionType);
    const RitualIcon = ritualConfig.icon;
    const ActionIcon = actionConfig.icon;
    const handleClick = () => {
        if (!isDisabled && !isLoading) {
            onClick?.();
        }
    };
    return (_jsxs("div", { className: `relative ${className}`, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [_jsxs(Button, { onClick: handleClick, disabled: isDisabled || isLoading, className: `
          relative overflow-hidden transition-all duration-300 h-auto p-0
          ${isHovered ? 'scale-105 shadow-xl' : 'shadow-lg'}
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `, children: [_jsx("div", { className: `
          absolute inset-0 bg-gradient-to-r ${ritualConfig.gradient} 
          transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-90'}
        ` }), (actionType === 'continue' || actionType === 'complete') && progress > 0 && (_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transition-all duration-300", style: { width: `${progress}%` } })), _jsxs("div", { className: "relative z-10 p-6 text-left w-full", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-12 h-12 bg-white/20 rounded-full flex items-center justify-center", children: _jsx(RitualIcon, { className: "h-6 w-6 text-[var(--hive-text-inverse)]" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold text-[var(--hive-text-inverse)]", children: ritualConfig.title }), _jsx("p", { className: "text-[var(--hive-text-inverse)]/80 text-sm", children: ritualConfig.description })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(ActionIcon, { className: "h-5 w-5 text-[var(--hive-text-inverse)]" }), isLoading && (_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" }))] })] }), (actionType === 'continue' || actionType === 'complete') && (_jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "flex items-center justify-between text-[var(--hive-text-inverse)]/80 text-xs mb-2", children: [_jsx("span", { children: "Progress" }), _jsxs("span", { children: [progress, "% complete"] })] }), _jsx("div", { className: "w-full bg-white/20 rounded-full h-2", children: _jsx("div", { className: "bg-white rounded-full h-2 transition-all duration-500", style: { width: `${progress}%` } }) })] })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "text-[var(--hive-text-inverse)] font-semibold", children: actionConfig.label }), _jsx("div", { className: "text-[var(--hive-text-inverse)]/70 text-xs", children: actionConfig.description })] }), _jsxs("div", { className: "text-right", children: [estimatedTime && (_jsxs("div", { className: "flex items-center space-x-1 text-[var(--hive-text-inverse)]/70 text-xs mb-1", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsxs("span", { children: ["~", estimatedTime, "m"] })] })), participantCount && (_jsxs("div", { className: "flex items-center space-x-1 text-[var(--hive-text-inverse)]/70 text-xs", children: [_jsx(Users, { className: "h-3 w-3" }), _jsxs("span", { children: [participantCount.toLocaleString(), " active"] })] }))] })] })] }), isHovered && (_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" }))] }), isHovered && (_jsx("div", { className: `
          absolute inset-0 -z-10 bg-gradient-to-r ${ritualConfig.gradient} 
          rounded-lg blur-xl opacity-30 scale-110
        ` }))] }));
}
//# sourceMappingURL=ritual-action-button.js.map