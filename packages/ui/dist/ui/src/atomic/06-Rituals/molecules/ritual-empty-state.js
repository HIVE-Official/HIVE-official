'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '../../00-Global/atoms/card';
import { Button } from '../../00-Global/atoms/button';
import { Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
export const RitualEmptyState = ({ icon = '🎭', title = 'No Rituals Yet', message = 'Check back soon for campus-wide events and competitions.', actionLabel, onAction, className, ...props }) => {
    return (_jsxs(Card, { className: cn('border-white/10 bg-white/5 p-12 text-center', className), ...props, children: [_jsx("div", { className: "mb-4 text-6xl", children: icon }), _jsx("h3", { className: "mb-2 text-lg font-semibold text-white", children: title }), _jsx("p", { className: "mb-4 text-sm text-white/60", children: message }), actionLabel && onAction && (_jsxs(Button, { onClick: onAction, size: "sm", children: [_jsx(Sparkles, { className: "mr-2 h-4 w-4" }), actionLabel] }))] }));
};
//# sourceMappingURL=ritual-empty-state.js.map