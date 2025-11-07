'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../lib/utils';
import { RitualProgressBar } from '../molecules/ritual-progress-bar';
import { Button } from '../atoms';
import { Calendar, Users, Clock, CheckCircle2 } from 'lucide-react';
/**
 * RitualCard
 *
 * Vertical card for displaying ritual details.
 * Used in grid layouts on rituals page.
 * - Gold gradient for featured
 * - Progress bar
 * - Participant count
 * - Duration and frequency
 */
export const RitualCard = React.forwardRef(({ ritual, onJoin, onViewDetails, variant = 'default', className, ...props }, ref) => {
    const isFeatured = variant === 'featured';
    return (_jsxs("div", { ref: ref, className: cn('group relative overflow-hidden rounded-2xl border transition-all duration-240', isFeatured
            ? // Featured: Gold gradient
                'border-[var(--hive-brand-primary)]/50 bg-gradient-to-br from-[var(--hive-brand-primary)]/[0.12] via-[var(--hive-brand-secondary)]/[0.08] to-transparent shadow-[0_0_24px_rgba(255,215,0,0.15)] hover:shadow-[0_0_32px_rgba(255,215,0,0.2)]'
            : // Default: Subtle border
                'border-[var(--hive-border-primary)] bg-[var(--hive-background-secondary)] hover:border-[var(--hive-border-secondary)]', ritual.isCompleted && 'opacity-75', className), ...props, children: [isFeatured && (_jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[var(--hive-brand-primary)]/[0.08] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" })), _jsxs("div", { className: "relative p-5 space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: cn('flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-3xl', isFeatured
                                    ? 'bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] shadow-lg'
                                    : 'bg-[var(--hive-background-tertiary)]'), children: ritual.icon || '✨' }), ritual.isCompleted && (_jsxs("div", { className: "ml-auto flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-400", children: [_jsx(CheckCircle2, { className: "h-3 w-3" }), "Completed"] }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)]", children: ritual.name }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] line-clamp-2", children: ritual.description })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3 text-xs text-[var(--hive-text-tertiary)]", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(Users, { className: "h-3.5 w-3.5" }), _jsx("span", { children: ritual.participantCount.toLocaleString() })] }), _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(Clock, { className: "h-3.5 w-3.5" }), _jsx("span", { children: ritual.duration })] }), _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(Calendar, { className: "h-3.5 w-3.5" }), _jsx("span", { children: ritual.frequency })] }), ritual.endDate && (_jsx("div", { className: "flex items-center gap-1.5", children: _jsxs("span", { children: ["Ends ", ritual.endDate] }) }))] }), !ritual.isCompleted && (_jsx(RitualProgressBar, { progress: ritual.progress, label: `${ritual.progress}% complete`, variant: "compact" })), _jsx(Button, { size: "sm", variant: ritual.isParticipating ? 'ghost' : 'default', className: cn('w-full', !ritual.isParticipating &&
                            isFeatured &&
                            'bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] text-black hover:opacity-90'), onClick: ritual.isParticipating || ritual.isCompleted ? onViewDetails : onJoin, disabled: ritual.isCompleted, children: ritual.isCompleted
                            ? 'View Results'
                            : ritual.isParticipating
                                ? 'View Details'
                                : 'Join Ritual' })] })] }));
});
RitualCard.displayName = 'RitualCard';
//# sourceMappingURL=ritual-card.js.map