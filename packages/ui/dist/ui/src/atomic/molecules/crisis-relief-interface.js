'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, MessageCircle, Clock, Shield } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { HiveCard } from '../atoms/hive-card.js';
const getReliefOptions = (timeOfDay, stressLevel) => {
    const baseOptions = [
        {
            id: 'study-help',
            title: 'Study Crisis Support',
            description: 'Get immediate help with assignments and exams',
            icon: _jsx(Users, { className: "w-5 h-5" }),
            activeCount: 12,
            responseTime: '< 2 min',
            relief_type: 'immediate'
        },
        {
            id: 'mental-health',
            title: 'Emotional Support',
            description: 'Talk to peers who understand what you\'re going through',
            icon: _jsx(Heart, { className: "w-5 h-5" }),
            activeCount: 8,
            responseTime: '< 5 min',
            relief_type: 'supportive'
        },
        {
            id: 'social-connection',
            title: 'Social Relief',
            description: 'Connect with students who are also awake right now',
            icon: _jsx(MessageCircle, { className: "w-5 h-5" }),
            activeCount: 15,
            responseTime: 'instant',
            relief_type: 'social'
        }
    ];
    // Prioritize based on time and stress level
    if (timeOfDay === 'late_night' && stressLevel === 'high') {
        return baseOptions.sort((a) => a.relief_type === 'supportive' ? -1 : 1);
    }
    if (stressLevel === 'high') {
        return baseOptions.sort((a) => a.relief_type === 'immediate' ? -1 : 1);
    }
    return baseOptions;
};
export const CrisisReliefInterface = ({ className, onReliefFound, timeOfDay = 'evening', stressLevel = 'moderate' }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [reliefOptions] = useState(() => getReliefOptions(timeOfDay, stressLevel));
    const handleOptionSelect = async (optionId) => {
        setSelectedOption(optionId);
        setIsConnecting(true);
        // Simulate connection (replace with real logic)
        setTimeout(() => {
            setIsConnecting(false);
            onReliefFound?.();
        }, 1500);
    };
    const getEmergencyMessage = () => {
        if (timeOfDay === 'late_night') {
            return "You're not alone - other UB students are awake right now";
        }
        if (stressLevel === 'high') {
            return "Take a breath. Help is available immediately.";
        }
        return "Find your people. Get the support you need.";
    };
    const getUrgencyColor = () => {
        if (stressLevel === 'high')
            return 'text-red-400';
        if (timeOfDay === 'late_night')
            return 'text-blue-400';
        return 'text-[var(--hive-brand-primary)]';
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: cn('crisis-relief-interface w-full max-w-md mx-auto space-y-4', className), children: [_jsxs(motion.div, { initial: { scale: 0.95 }, animate: { scale: 1 }, className: "text-center space-y-2 p-4", children: [_jsxs("div", { className: "flex items-center justify-center gap-2", children: [_jsx(Shield, { className: cn("w-6 h-6", getUrgencyColor()) }), _jsx("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: "Immediate Support" })] }), _jsx("p", { className: cn("text-sm font-medium", getUrgencyColor()), children: getEmergencyMessage() }), _jsxs("div", { className: "flex items-center justify-center gap-2 text-xs text-[var(--hive-text-muted)]", children: [_jsx(Clock, { className: "w-3 h-3" }), _jsx("span", { children: "Response guaranteed in under 5 minutes" })] })] }), _jsx("div", { className: "space-y-3", children: reliefOptions.map((option, index) => (_jsx(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, children: _jsx(HiveCard, { variant: selectedOption === option.id ? "brand" : "default", className: cn("p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02]", selectedOption === option.id && "ring-2 ring-[var(--hive-brand-primary)]", isConnecting && selectedOption === option.id && "animate-pulse"), onClick: () => !isConnecting && handleOptionSelect(option.id), children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: cn("p-2 rounded-lg bg-[var(--hive-brand-primary)]/10", selectedOption === option.id && "bg-[var(--hive-brand-primary)] text-black"), children: option.icon }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("h3", { className: "font-medium text-[var(--hive-text-primary)] truncate", children: option.title }), _jsxs("div", { className: "flex items-center gap-2 text-xs", children: [_jsxs("span", { className: "text-[var(--hive-status-success)]", children: [option.activeCount, " online"] }), _jsx("span", { className: "text-[var(--hive-text-muted)]", children: option.responseTime })] })] }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] line-clamp-2", children: option.description })] })] }) }) }, option.id))) }), isConnecting && selectedOption && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center p-4", children: _jsxs("div", { className: "inline-flex items-center gap-2 text-[var(--hive-brand-primary)]", children: [_jsx("div", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" }), _jsx("span", { className: "text-sm font-medium", children: "Connecting you to support..." })] }) })), _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.5 }, className: "text-center text-xs text-[var(--hive-text-muted)] space-y-1 p-4 border-t border-[var(--hive-border-primary)]", children: [_jsx("p", { children: "For urgent mental health support:" }), _jsxs("p", { children: [_jsx("span", { className: "text-[var(--hive-text-primary)] font-medium", children: "UB Counseling: (716) 645-2720" }), ' ', "\u2022", ' ', _jsx("span", { className: "text-[var(--hive-text-primary)] font-medium", children: "Crisis Text Line: Text HOME to 741741" })] })] })] }));
};
//# sourceMappingURL=crisis-relief-interface.js.map