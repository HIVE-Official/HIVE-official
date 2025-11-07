'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../lib/utils.js';
import { Badge, Button, ClockIcon, MapPinIcon, UsersIcon, } from '../atoms/index.js';
import { FeedSpaceChip } from '../molecules/feed-space-chip.js';
import { FeedMediaPreview } from '../molecules/feed-media-preview.js';
const statusBadgeCopy = {
    upcoming: 'Upcoming',
    today: 'Today @ UB',
    sold_out: 'Full',
    past: 'Archive',
};
const statusBadgeTone = {
    upcoming: 'bg-white/[0.04] text-[var(--hive-text-secondary)] border-white/[0.08]',
    today: 'bg-[var(--hive-brand-primary)]/10 text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/40',
    sold_out: 'bg-red-500/15 text-red-300 border-red-400/30',
    past: 'bg-white/[0.02] text-[var(--hive-text-tertiary)] border-white/[0.06]',
};
const getButtonLabel = (status, isAttending) => {
    if (status === 'past')
        return 'View recap';
    if (status === 'sold_out')
        return 'Join waitlist';
    if (isAttending)
        return 'You’re going';
    return 'RSVP';
};
const isActionDisabled = (status, isAttending) => {
    if (status === 'past')
        return false;
    if (status === 'sold_out')
        return false;
    return false;
};
export const FeedCardEvent = React.forwardRef(({ event, onViewDetails, onToggleRsvp, onSpaceClick, className, ...props }, ref) => {
    const { coverImage, meta, stats, space } = event;
    const buttonLabel = getButtonLabel(meta.status, stats.isAttending);
    const disabled = isActionDisabled(meta.status, stats.isAttending);
    const capacityCopy = stats.capacity && stats.capacity > 0
        ? `${stats.attendingCount}/${stats.capacity} going`
        : `${stats.attendingCount} going`;
    return (_jsxs("article", { ref: ref, role: "article", className: cn('group relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default) 70%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 96%,transparent)] shadow-[0_24px_45px_rgba(5,7,13,0.35)] transition-colors hover:border-[color-mix(in_srgb,var(--hive-border-default) 40%,transparent)]', className), ...props, children: [coverImage && (_jsxs("div", { className: "relative", children: [_jsx(FeedMediaPreview, { media: [coverImage], className: "rounded-2xl rounded-b-none" }), _jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(5,7,13,0.65)] via-transparent to-transparent" }), _jsxs("div", { className: "absolute bottom-4 left-4 flex flex-wrap items-center gap-2", children: [_jsx(Badge, { className: cn('uppercase tracking-[0.2em]', statusBadgeTone[meta.status]), children: statusBadgeCopy[meta.status] }), _jsx(FeedSpaceChip, { spaceId: space.id, spaceName: space.name, spaceColor: space.color, spaceIcon: space.icon, onClick: onSpaceClick
                                    ? (event) => {
                                        event.stopPropagation();
                                        onSpaceClick(space.id);
                                    }
                                    : undefined })] })] })), _jsxs("div", { className: "flex flex-col gap-4 px-6 py-5", children: [_jsxs("header", { className: "space-y-3", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-3 text-sm text-[var(--hive-text-secondary)]", children: [_jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/70", children: [_jsx(ClockIcon, { className: "h-3.5 w-3.5 text-[var(--hive-brand-primary)]" }), meta.scheduleLabel] }), meta.locationLabel && (_jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/55", children: [_jsx(MapPinIcon, { className: "h-3.5 w-3.5 text-white/60" }), meta.locationLabel] }))] }), _jsx("h2", { className: "text-lg font-semibold leading-tight text-[var(--hive-text-primary)]", children: event.title }), event.description && (_jsx("p", { className: "text-sm leading-relaxed text-[var(--hive-text-secondary)] line-clamp-4", children: event.description }))] }), _jsxs("footer", { className: "flex flex-wrap items-center justify-between gap-4 border-t border-[color-mix(in_srgb,var(--hive-border-default) 55%,transparent)] pt-4", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-3 text-sm text-[var(--hive-text-secondary)]", children: [_jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1 font-medium text-white/80", children: [_jsx(UsersIcon, { className: "h-4 w-4 text-[var(--hive-brand-primary)]" }), capacityCopy] }), stats.capacity && stats.capacity > 0 && (_jsxs("span", { className: "text-xs uppercase tracking-[0.16em] text-white/50", children: [Math.max(stats.capacity - stats.attendingCount, 0), " spots left"] }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { size: "md", variant: stats.isAttending ? 'secondary' : 'brand', disabled: disabled, onClick: () => onToggleRsvp?.(event.id, !stats.isAttending), className: "min-w-[140px]", children: buttonLabel }), _jsx(Button, { size: "md", variant: "ghost", onClick: () => onViewDetails?.(event.id), children: "View" })] })] })] })] }));
});
FeedCardEvent.displayName = 'FeedCardEvent';
//# sourceMappingURL=feed-card-event.js.map