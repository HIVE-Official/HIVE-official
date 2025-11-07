'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Sparkles, TrendingUp, Users, Eye, Gift, Zap } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { HiveCard } from '../atoms/hive-card.js';
import { Progress } from '../atoms/progress.js';
// Behavioral rewards designed for 70% completion target
const completionRewards = [
    {
        threshold: 30,
        type: 'preview',
        title: 'Preview Your Matches',
        description: 'See who you might connect with at UB',
        icon: _jsx(Eye, { className: "w-5 h-5 text-purple-400" }),
        previewContent: (_jsxs("div", { className: "flex -space-x-2", children: [[1, 2, 3].map(i => (_jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full border-2 border-white" }, i))), _jsx("div", { className: "w-8 h-8 bg-[var(--hive-background-tertiary)] rounded-full border-2 border-white flex items-center justify-center text-xs", children: "+7" })] })),
        socialProof: { count: 23, action: 'students like you joined today' },
    },
    {
        threshold: 50,
        type: 'access',
        title: 'Unlock Exclusive Spaces',
        description: 'Access member-only communities',
        icon: _jsx(Users, { className: "w-5 h-5 text-blue-400" }),
        urgency: 'medium',
        socialProof: { count: 12, action: 'exclusive spaces available' },
    },
    {
        threshold: 70, // TARGET COMPLETION RATE
        type: 'exclusive',
        title: 'Insider Campus Knowledge',
        description: 'Get the insider info only members know',
        icon: _jsx(Sparkles, { className: "w-5 h-5 text-[var(--hive-brand-primary)]" }),
        urgency: 'high',
        socialProof: { count: 5, action: 'exclusive insights waiting' },
    },
    {
        threshold: 85,
        type: 'social',
        title: 'Full Platform Access',
        description: 'Complete access to all HIVE features',
        icon: _jsx(Gift, { className: "w-5 h-5 text-green-400" }),
        urgency: 'low',
    },
];
export const CompletionPsychologyEnhancer = ({ currentStep, totalSteps, className, onCompletionBoost, }) => {
    const [completionPercentage, setCompletionPercentage] = useState(0);
    const [, setActiveRewards] = useState([]);
    const [unlockedRewards, setUnlockedRewards] = useState(new Set());
    const [justUnlocked, setJustUnlocked] = useState(null);
    // Calculate completion percentage
    useEffect(() => {
        const percentage = Math.round((currentStep / totalSteps) * 100);
        setCompletionPercentage(percentage);
        // Check for newly unlocked rewards
        const newlyUnlocked = completionRewards.find(reward => percentage >= reward.threshold && !unlockedRewards.has(reward.threshold));
        if (newlyUnlocked) {
            setUnlockedRewards(prev => new Set([...prev, newlyUnlocked.threshold]));
            setJustUnlocked(newlyUnlocked);
            onCompletionBoost?.(newlyUnlocked.type);
            // Clear the unlock notification after animation
            setTimeout(() => setJustUnlocked(null), 3000);
        }
        // Set active rewards (current + next few)
        const current = completionRewards.filter(reward => percentage >= reward.threshold - 20 && percentage <= reward.threshold + 10);
        setActiveRewards(current.slice(0, 3));
    }, [currentStep, totalSteps, unlockedRewards, onCompletionBoost]);
    // Color handled by Progress styling; gradient helper removed to keep code minimal
    const getMotivationalMessage = () => {
        if (completionPercentage >= 70) {
            return "🎉 You're in the exclusive zone! Only the best students make it this far.";
        }
        if (completionPercentage >= 50) {
            return "⚡ Almost there! You're closer than most students get.";
        }
        if (completionPercentage >= 30) {
            return "🚀 Great progress! Keep going to unlock exclusive features.";
        }
        return "✨ Perfect start! Each step unlocks something amazing.";
    };
    const getNextReward = () => {
        return completionRewards.find(reward => completionPercentage < reward.threshold);
    };
    const nextReward = getNextReward();
    return (_jsxs("div", { className: cn('completion-psychology-enhancer space-y-4', className), children: [_jsx(HiveCard, { className: "p-6", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Profile Completion" }), _jsxs("span", { className: "text-sm font-bold text-[var(--hive-brand-primary)]", children: [completionPercentage, "%"] })] }), _jsxs("div", { className: "relative", children: [_jsx(Progress, { value: completionPercentage, className: "h-3" }), _jsx("div", { className: "absolute top-0 h-3 w-0.5 bg-[var(--hive-brand-primary)] opacity-60", style: { left: '70%' } }), _jsx("div", { className: "absolute -top-1 text-xs text-[var(--hive-brand-primary)] font-medium", style: { left: '70%', transform: 'translateX(-50%)' }, children: "Target" })] })] }), _jsx(motion.p, { initial: { opacity: 0, y: 5 }, animate: { opacity: 1, y: 0 }, className: "text-sm text-[var(--hive-text-secondary)] font-medium", children: getMotivationalMessage() }, completionPercentage), _jsxs("div", { className: "flex items-center gap-2 text-xs text-[var(--hive-text-muted)]", children: [_jsxs("span", { children: ["Step ", currentStep, " of ", totalSteps] }), _jsx("span", { children: "\u2022" }), _jsxs("span", { children: [totalSteps - currentStep, " steps remaining"] })] })] }) }), _jsx(AnimatePresence, { children: justUnlocked && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.9, y: -20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.9, y: -20 }, className: "fixed top-4 right-4 z-50", children: _jsx(HiveCard, { className: "p-4 bg-gradient-to-r from-[var(--hive-brand-primary)]/20 to-yellow-400/20 border border-[var(--hive-brand-primary)]/30", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 bg-[var(--hive-brand-primary)] rounded-full", children: justUnlocked.icon }), _jsxs("div", { children: [_jsxs("h4", { className: "font-semibold text-[var(--hive-text-primary)]", children: ["\uD83C\uDF89 Unlocked: ", justUnlocked.title] }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: justUnlocked.description })] })] }) }) })) }), nextReward && (_jsxs(HiveCard, { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 bg-[var(--hive-background-secondary)] rounded-lg opacity-60", children: nextReward.icon }), _jsxs("div", { className: "flex-1", children: [_jsxs("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: ["Next: ", nextReward.title] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-[var(--hive-text-secondary)]", children: [_jsxs("span", { children: [nextReward.threshold - completionPercentage, "% to unlock"] }), nextReward.socialProof && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsxs("span", { className: "text-[var(--hive-brand-primary)]", children: [nextReward.socialProof.count, " ", nextReward.socialProof.action] })] }))] })] }), nextReward.urgency === 'high' && (_jsxs("div", { className: "flex items-center gap-1 text-xs text-orange-400", children: [_jsx(Zap, { className: "w-3 h-3" }), _jsx("span", { children: "Limited" })] }))] }), nextReward.previewContent && (_jsx("div", { className: "mt-3 p-3 bg-[var(--hive-background-secondary)]/30 rounded-lg", children: nextReward.previewContent }))] })), completionPercentage >= 60 && completionPercentage < 70 && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center p-4", children: _jsxs(HiveCard, { className: "p-4 bg-gradient-to-r from-[var(--hive-brand-primary)]/10 to-orange-400/10 border border-[var(--hive-brand-primary)]/30", children: [_jsxs("div", { className: "flex items-center justify-center gap-2 text-[var(--hive-brand-primary)]", children: [_jsx(TrendingUp, { className: "w-5 h-5" }), _jsxs("span", { className: "font-semibold", children: ["You're ", 70 - completionPercentage, "% away from exclusive access!"] })] }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mt-1", children: "Only the top students make it to 70% completion" })] }) })), completionPercentage >= 70 && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "text-center p-4", children: _jsx(HiveCard, { className: "p-6 bg-gradient-to-r from-[var(--hive-brand-primary)]/20 to-yellow-400/20", children: _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-center gap-2", children: [_jsx(CheckCircle, { className: "w-6 h-6 text-[var(--hive-brand-primary)]" }), _jsx("span", { className: "text-lg font-bold text-[var(--hive-text-primary)]", children: "Elite Status Achieved!" })] }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "You're in the top tier of UB students. You now have access to everything HIVE offers." })] }) }) }))] }));
};
//# sourceMappingURL=completion-psychology-enhancer.js.map
