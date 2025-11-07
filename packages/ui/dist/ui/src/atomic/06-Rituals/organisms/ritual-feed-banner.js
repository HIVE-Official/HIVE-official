'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../../00-Global/atoms/button';
import { Card } from '../../00-Global/atoms/card';
import { Clock, UserPlus } from 'lucide-react';
export const RitualFeedBannerCard = ({ banner, onAction }) => {
    const timeRemaining = React.useMemo(() => {
        const now = Date.now();
        const ends = new Date(banner.endsAt).getTime();
        const diff = ends - now;
        if (diff <= 0)
            return 'Ended';
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        if (hours > 0)
            return `${hours}h ${minutes}m left`;
        return `${minutes}m left`;
    }, [banner.endsAt]);
    return (_jsx(Card, { className: cn('overflow-hidden border-white/10 bg-gradient-to-br from-[var(--hive-background-secondary)] via-[var(--hive-background-primary)] to-black p-6', banner.accentColor ? `border-[${banner.accentColor}]` : null), children: _jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/60", children: [_jsx("span", { children: "Ritual" }), _jsx("span", { children: banner.archetype.replace('_', ' ') })] }), _jsx("h2", { className: "text-xl font-semibold text-white", children: banner.title }), banner.subtitle ? (_jsx("p", { className: "max-w-xl text-sm text-white/70", children: banner.subtitle })) : null, _jsxs("div", { className: "flex flex-wrap items-center gap-4 text-xs text-white/60", children: [_jsxs("span", { className: "inline-flex items-center gap-1", children: [_jsx(Clock, { className: "h-4 w-4" }), timeRemaining] }), banner.stats?.map((stat) => (_jsxs("span", { className: "inline-flex items-center gap-1", children: [_jsx(UserPlus, { className: "h-4 w-4" }), stat.label, ": ", stat.value] }, stat.label)))] })] }), _jsx(Button, { size: "lg", onClick: () => onAction?.(banner.cta.href), className: cn(banner.cta.variant === 'primary'
                        ? 'bg-[var(--hive-brand-primary)] hover:bg-[var(--hive-brand-primary)]/90 text-black'
                        : 'bg-white/10 text-white hover:bg-white/20'), asChild: !onAction, children: onAction ? (_jsx("span", { children: banner.cta.label })) : (_jsx("a", { href: banner.cta.href, children: banner.cta.label })) })] }) }));
};
//# sourceMappingURL=ritual-feed-banner.js.map