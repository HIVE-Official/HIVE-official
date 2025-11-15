'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { RitualProgressBar } from '../molecules/ritual-progress-bar';
import { Button } from '../../00-Global/atoms';
import { ChevronRight, Sparkles } from 'lucide-react';
/**
 * RitualStrip
 *
 * Horizontal feed banner for active campus rituals.
 * Shows progress bar, participant count, and join/view CTA.
 * Gold gradient background with glow effect.
 */
export const RitualStrip = React.forwardRef(({ ritual, onJoin, onViewDetails, variant = 'default', showProgress = true, className, ...props }, ref) => {
    const isCompact = variant === 'compact';
    return (_jsxs("div", { ref: ref, className: cn('group relative overflow-hidden rounded-2xl border transition-all duration-240', 
        // Gold gradient background
        'border-[var(--hive-brand-primary)]/50 bg-gradient-to-br from-[var(--hive-brand-primary)]/[0.12] via-[var(--hive-brand-secondary)]/[0.08] to-transparent', 
        // Gold glow
        'shadow-[0_0_24px_rgba(255,215,0,0.15)]', 'hover:shadow-[0_0_32px_rgba(255,215,0,0.2)]', className), ...props, children: [_jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[var(--hive-brand-primary)]/[0.08] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" }), _jsxs("div", { className: cn('relative p-4', isCompact ? 'py-3' : 'p-4'), children: [_jsxs("div", { className: "mb-3 flex items-start gap-3", children: [_jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] text-2xl shadow-lg", children: ritual.icon || _jsx(Sparkles, { className: "h-6 w-6 text-black" }) }), _jsxs("div", { className: "flex-1 space-y-1", children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)]", children: ritual.name }), !isCompact && (_jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: ritual.description })), _jsxs("div", { className: "flex items-center gap-3 text-xs text-[var(--hive-text-tertiary)]", children: [_jsxs("span", { children: [ritual.participantCount.toLocaleString(), " participants"] }), ritual.timeRemaining && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsxs("span", { children: [ritual.timeRemaining, " left"] })] }))] })] }), _jsx(motion.div, { whileTap: { scale: 0.95 }, transition: { type: 'spring', stiffness: 400, damping: 25 }, children: _jsx(Button, { size: "sm", variant: ritual.isParticipating ? 'ghost' : 'default', onClick: ritual.isParticipating ? onViewDetails : onJoin, className: cn('shrink-0', !ritual.isParticipating && 'bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] text-black hover:opacity-90'), children: ritual.isParticipating ? (_jsxs(_Fragment, { children: ["View", _jsx(ChevronRight, { className: "ml-1 h-4 w-4" })] })) : ('Join Ritual') }) })] }), showProgress && (_jsx(RitualProgressBar, { progress: ritual.progress, label: `${ritual.progress}% complete`, variant: "compact" }))] })] }));
});
RitualStrip.displayName = 'RitualStrip';
//# sourceMappingURL=ritual-strip.js.map