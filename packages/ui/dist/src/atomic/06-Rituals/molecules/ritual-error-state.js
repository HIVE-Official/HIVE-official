'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '../../00-Global/atoms/card';
import { Button } from '../../00-Global/atoms/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '../../../lib/utils';
export const RitualErrorState = ({ title = 'Failed to Load Ritual', message = 'Something went wrong while loading this ritual. Please try again.', onRetry, className, ...props }) => {
    return (_jsxs(Card, { className: cn('border-red-500/20 bg-red-500/5 p-8 text-center', className), ...props, children: [_jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10", children: _jsx(AlertCircle, { className: "h-8 w-8 text-red-400" }) }), _jsx("h3", { className: "mb-2 text-lg font-semibold text-white", children: title }), _jsx("p", { className: "mb-4 text-sm text-white/60", children: message }), onRetry && (_jsxs(Button, { onClick: onRetry, variant: "outline", size: "sm", children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4" }), "Try Again"] }))] }));
};
//# sourceMappingURL=ritual-error-state.js.map