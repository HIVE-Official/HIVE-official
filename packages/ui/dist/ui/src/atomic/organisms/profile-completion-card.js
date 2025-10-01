'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Card } from '../atoms/card';
import { Award, Camera, User, MapPin, BookOpen, Users, Sparkles, ChevronRight, Check, Lock, Zap } from 'lucide-react';
/**
 * Profile Completion Card - DESIGN_SPEC Compliant with Behavioral Psychology
 *
 * Psychology Principles:
 * - 70% completion target for habit formation
 * - Variable rewards at strategic points
 * - Social proof through completion stats
 * - Loss aversion with "almost there" messaging
 * - Gamification without being obvious
 */
export const ProfileCompletionCard = ({ completionPercentage = 0, completedSteps = [], onStepClick, className = '' }) => {
    const [animatedPercentage, setAnimatedPercentage] = useState(0);
    const [showReward, setShowReward] = useState(false);
    // Animate percentage on mount for psychological impact
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedPercentage(completionPercentage);
        }, 100);
        // Show reward animation at key thresholds
        if (completionPercentage === 50 || completionPercentage === 70 || completionPercentage === 100) {
            setShowReward(true);
            setTimeout(() => setShowReward(false), 3000);
        }
        return () => clearTimeout(timer);
    }, [completionPercentage]);
    const steps = [
        {
            id: 'avatar',
            label: 'Add profile photo',
            description: 'Help others recognize you',
            icon: Camera,
            completed: completedSteps.includes('avatar'),
            points: 20
        },
        {
            id: 'bio',
            label: 'Write your bio',
            description: 'Share what makes you unique',
            icon: User,
            completed: completedSteps.includes('bio'),
            points: 15
        },
        {
            id: 'academic',
            label: 'Add academic info',
            description: 'Major, year, and graduation',
            icon: BookOpen,
            completed: completedSteps.includes('academic'),
            points: 15
        },
        {
            id: 'housing',
            label: 'Add your dorm',
            description: 'Connect with neighbors',
            icon: MapPin,
            completed: completedSteps.includes('housing'),
            points: 10
        },
        {
            id: 'interests',
            label: 'Select interests',
            description: 'Find your communities',
            icon: Sparkles,
            completed: completedSteps.includes('interests'),
            points: 20
        },
        {
            id: 'spaces',
            label: 'Join 3 spaces',
            description: 'Start building connections',
            icon: Users,
            completed: completedSteps.includes('spaces'),
            points: 20
        }
    ];
    const completedCount = steps.filter(s => s.completed).length;
    const totalPoints = steps.reduce((sum, step) => sum + step.points, 0);
    const earnedPoints = steps.filter(s => s.completed).reduce((sum, step) => sum + step.points, 0);
    // Psychological messaging based on completion
    const getMotivationalMessage = () => {
        if (completionPercentage === 0) {
            return "Start your journey - it only takes 2 minutes";
        }
        else if (completionPercentage < 30) {
            return "Great start! Keep going to unlock features";
        }
        else if (completionPercentage < 50) {
            return "You're building momentum";
        }
        else if (completionPercentage < 70) {
            return "Almost at the sweet spot - don't stop now!"; // Loss aversion
        }
        else if (completionPercentage === 70) {
            return "Perfect! You've unlocked core features 🎉";
        }
        else if (completionPercentage < 100) {
            return "Go for 100% to become a trusted member";
        }
        else {
            return "Profile complete! You're all set 🌟";
        }
    };
    // Color transitions for psychological reinforcement
    const getProgressColor = () => {
        if (completionPercentage >= 70)
            return 'from-[#FFD700] to-[#FFD700]';
        if (completionPercentage >= 50)
            return 'from-[#FFD700]/60 to-[#FFD700]';
        return 'from-gray-600 to-[#FFD700]/60';
    };
    return (_jsxs(Card, { className: `
        relative overflow-hidden
        bg-black border border-white/8
        p-6 space-y-4
        transition-all duration-300
        hover:border-white/16
        ${className}
      `, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 bg-gray-900 rounded-lg", children: _jsx(Award, { className: "w-4 h-4 text-[#FFD700]" }) }), _jsx("h3", { className: "text-lg font-medium text-white", children: "Profile Strength" })] }), _jsx("div", { className: "flex items-center gap-2", children: _jsxs("span", { className: "text-2xl font-bold text-white", children: [animatedPercentage, "%"] }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "relative h-3 bg-gray-900 rounded-full overflow-hidden", children: [_jsx("div", { className: `
              absolute inset-y-0 left-0
              bg-gradient-to-r ${getProgressColor()}
              transition-all duration-1000 ease-out
            `, style: { width: `${animatedPercentage}%` } }), _jsx("div", { className: "absolute top-0 bottom-0 w-px bg-white/20", style: { left: '70%' }, children: _jsx("div", { className: "absolute -top-5 left-1/2 -translate-x-1/2", children: _jsx("span", { className: "text-xs text-gray-500 whitespace-nowrap", children: "Target" }) }) })] }), _jsx("p", { className: "text-sm text-gray-300", children: getMotivationalMessage() })] }), _jsx("div", { className: "space-y-2", children: steps.map((step, index) => {
                    const Icon = step.icon;
                    const isLocked = index > 0 && !steps[index - 1].completed && !step.completed;
                    return (_jsxs("button", { onClick: () => !isLocked && !step.completed && onStepClick?.(step.id), disabled: isLocked || step.completed, className: `
                group w-full
                flex items-center gap-3
                p-3 rounded-lg
                transition-all duration-200
                ${step.completed
                            ? 'bg-gray-900/50 cursor-default'
                            : isLocked
                                ? 'bg-gray-900/30 cursor-not-allowed opacity-50'
                                : 'bg-gray-900 hover:bg-gray-800 cursor-pointer'}
              `, children: [_jsx("div", { className: `
                  p-2 rounded-lg transition-all
                  ${step.completed
                                    ? 'bg-[#FFD700]/20'
                                    : isLocked
                                        ? 'bg-gray-800'
                                        : 'bg-gray-800 group-hover:bg-gray-700'}
                `, children: step.completed ? (_jsx(Check, { className: "w-4 h-4 text-[#FFD700]" })) : isLocked ? (_jsx(Lock, { className: "w-4 h-4 text-gray-600" })) : (_jsx(Icon, { className: "w-4 h-4 text-gray-400 group-hover:text-gray-300" })) }), _jsxs("div", { className: "flex-1 text-left", children: [_jsx("p", { className: `
                  text-sm font-medium
                  ${step.completed ? 'text-gray-400 line-through' : 'text-white'}
                `, children: step.label }), _jsx("p", { className: "text-xs text-gray-500", children: step.description })] }), _jsxs("div", { className: `
                px-2 py-1 rounded-md text-xs font-medium
                ${step.completed
                                    ? 'bg-[#FFD700]/10 text-[#FFD700]'
                                    : 'bg-gray-800 text-gray-400'}
              `, children: ["+", step.points, " pts"] }), !step.completed && !isLocked && (_jsx(ChevronRight, { className: "\n                  w-4 h-4 text-gray-600\n                  opacity-0 group-hover:opacity-100\n                  transition-opacity duration-200\n                " }))] }, step.id));
                }) }), showReward && completionPercentage === 70 && (_jsx("div", { className: "absolute inset-0 pointer-events-none flex items-center justify-center", children: _jsx("div", { className: "animate-bounce", children: _jsx("div", { className: "bg-[#FFD700] text-black px-4 py-2 rounded-lg font-medium", children: "\uD83C\uDF89 Core features unlocked!" }) }) })), _jsx("div", { className: "pt-4 border-t border-white/8", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Zap, { className: "w-4 h-4 text-[#FFD700]" }), _jsxs("span", { className: "text-xs text-gray-400", children: [completedCount, " of ", steps.length, " complete"] })] }), _jsxs("span", { className: "text-xs text-[#FFD700] font-medium", children: [earnedPoints, "/", totalPoints, " points"] })] }) })] }));
};
//# sourceMappingURL=profile-completion-card.js.map