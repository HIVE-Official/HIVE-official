'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '../../00-Global/atoms/progress.js';
import { CheckCircleIcon } from '../../00-Global/atoms/index.js';
const defaultMilestones = [
    { percentage: 25, label: '25%', isCompleted: false },
    { percentage: 50, label: '50%', isCompleted: false },
    { percentage: 75, label: '75%', isCompleted: false },
    { percentage: 100, label: '100%', isCompleted: false },
];
export const RitualProgressBar = React.forwardRef(({ progress, milestones = defaultMilestones, showPercentage = true, label, variant = 'default', className, ...props }, ref) => {
    // Clamp progress between 0 and 100
    const clampedProgress = Math.min(100, Math.max(0, progress));
    // Update milestones based on current progress
    const updatedMilestones = milestones.map((milestone) => ({
        ...milestone,
        isCompleted: clampedProgress >= milestone.percentage,
    }));
    const isCompact = variant === 'compact';
    return (_jsxs("div", { ref: ref, className: cn('flex flex-col gap-3', className), ...props, children: [(label || showPercentage) && (_jsxs("div", { className: "flex items-center justify-between gap-2", children: [label && (_jsx("span", { className: cn('font-semibold text-[var(--hive-text-primary)]', isCompact ? 'text-xs' : 'text-sm'), children: label })), showPercentage && (_jsxs("span", { className: cn('font-bold text-[var(--hive-brand-primary)]', isCompact ? 'text-xs' : 'text-sm'), children: [Math.round(clampedProgress), "%"] }))] })), _jsxs("div", { className: "relative", children: [_jsx(Progress, { value: clampedProgress, className: cn('h-3 bg-[var(--hive-background-tertiary)] border border-[color-mix(in_srgb,var(--hive-border-default) 50%,transparent)]', isCompact && 'h-2'), indicatorClassName: "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] shadow-[0_0_12px_rgba(255,215,0,0.4)]" }), !isCompact && updatedMilestones.length > 0 && (_jsx("div", { className: "absolute inset-0 flex items-center", children: updatedMilestones.map((milestone) => (_jsxs("div", { className: "absolute flex flex-col items-center", style: { left: `${milestone.percentage}%`, transform: 'translateX(-50%)' }, children: [_jsx("div", { className: cn('z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-240', milestone.isCompleted
                                        ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)] shadow-[0_0_8px_rgba(255,215,0,0.6)]'
                                        : 'border-[var(--hive-border-default)] bg-[var(--hive-background-tertiary)]'), children: milestone.isCompleted && (_jsx(CheckCircleIcon, { className: "h-3 w-3 text-black" })) }), _jsx("span", { className: cn('mt-2 text-[10px] font-medium uppercase tracking-[0.16em]', milestone.isCompleted
                                        ? 'text-[var(--hive-brand-primary)]'
                                        : 'text-[var(--hive-text-tertiary)]'), children: milestone.label })] }, milestone.percentage))) }))] }), isCompact && updatedMilestones.length > 0 && (_jsx("div", { className: "flex items-center justify-between", children: updatedMilestones.map((milestone) => (_jsx("span", { className: cn('text-[10px] font-medium uppercase tracking-[0.16em]', milestone.isCompleted
                        ? 'text-[var(--hive-brand-primary)]'
                        : 'text-[var(--hive-text-tertiary)]'), children: milestone.label }, milestone.percentage))) }))] }));
});
RitualProgressBar.displayName = 'RitualProgressBar';
//# sourceMappingURL=ritual-progress-bar.js.map