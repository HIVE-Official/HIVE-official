'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * FeedRitualBanner - Ritual promotion banner for feed
 *
 * Features:
 * - Full-width ritual promotion card
 * - Gold accent (one of the allowed use cases!)
 * - Progress bar showing participation
 * - CTA button to join ritual
 * - Sparkles icon for ritual identity
 *
 * Usage:
 * ```tsx
 * import { FeedRitualBanner } from '@hive/ui';
 *
 * <FeedRitualBanner
 *   title="Morning Check-in"
 *   description="Start your day with 2 minutes of reflection"
 *   progress={65}
 *   totalParticipants={432}
 *   onJoin={() => handleJoinRitual()}
 *   isParticipating={false}
 * />
 * ```
 */
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../../00-Global/atoms/button.js';
import { Progress } from '../../00-Global/atoms/progress.js';
import { SparklesIcon, UsersIcon, LucideCheck } from '../../00-Global/atoms/icon-library.js';
export const FeedRitualBanner = React.forwardRef(({ title, description, progress, totalParticipants, isParticipating, onJoin, iconUrl, className, isLoading = false, }, ref) => {
    return (_jsxs("div", { ref: ref, className: cn('group relative overflow-hidden rounded-xl border border-[var(--hive-brand-primary)]/30 bg-gradient-to-br from-[var(--hive-brand-primary)]/10 via-[var(--hive-background-secondary)] to-[var(--hive-background-secondary)] p-4 shadow-lg transition-all hover:shadow-xl', className), children: [_jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--hive-brand-primary)]/5 to-transparent opacity-50" }), _jsxs("div", { className: "relative space-y-3", children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { className: "flex items-start gap-3 flex-1", children: [_jsx("div", { className: "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] shadow-lg", children: iconUrl ? (_jsx("img", { src: iconUrl, alt: "", className: "h-6 w-6", "aria-hidden": "true" })) : (_jsx(SparklesIcon, { className: "h-6 w-6 text-[var(--hive-brand-primary-text)]" })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "text-lg font-bold text-[var(--hive-text-primary)] line-clamp-1", children: title }), _jsx("p", { className: "mt-1 text-sm text-[var(--hive-text-secondary)] line-clamp-2", children: description })] })] }), _jsx(Button, { onClick: onJoin, disabled: isLoading, variant: isParticipating ? 'outline' : 'brand', size: "md", className: "flex-shrink-0", children: isParticipating ? (_jsxs(_Fragment, { children: [_jsx(LucideCheck, { className: "mr-2 h-4 w-4" }), "Participating"] })) : ('Join Ritual') })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Progress, { value: progress, className: "h-2 bg-[var(--hive-background-tertiary)]", indicatorClassName: "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)]" }), _jsxs("div", { className: "flex items-center justify-between text-xs", children: [_jsxs("div", { className: "flex items-center gap-1.5 text-[var(--hive-text-secondary)]", children: [_jsx(UsersIcon, { className: "h-3.5 w-3.5" }), _jsxs("span", { children: [_jsx("span", { className: "font-semibold text-[var(--hive-text-primary)]", children: totalParticipants.toLocaleString() }), ' ', totalParticipants === 1 ? 'student' : 'students', " participating"] })] }), _jsxs("div", { className: "font-medium text-[var(--hive-brand-primary)]", children: [progress, "% complete"] })] })] })] })] }));
});
FeedRitualBanner.displayName = 'FeedRitualBanner';
//# sourceMappingURL=feed-ritual-banner.js.map