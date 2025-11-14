'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '../../00-Global/atoms/card.js';
import { Skeleton } from '../../00-Global/atoms/skeleton.js';
import { cn } from '@/lib/utils';
export const RitualLoadingSkeleton = ({ variant = 'card', className, ...props }) => {
    if (variant === 'banner') {
        return (_jsx(Card, { className: cn('border-white/10 bg-white/5 p-5', className), ...props, children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Skeleton, { className: "h-12 w-12 rounded-full" }), _jsxs("div", { className: "flex-1", children: [_jsx(Skeleton, { className: "mb-2 h-5 w-48" }), _jsx(Skeleton, { className: "h-4 w-64" })] }), _jsx(Skeleton, { className: "h-10 w-24 rounded-lg" })] }) }));
    }
    if (variant === 'detail') {
        return (_jsxs("div", { className: cn('space-y-4', className), ...props, children: [_jsxs(Card, { className: "border-white/10 bg-white/5 p-6", children: [_jsxs("div", { className: "mb-4 flex items-center gap-4", children: [_jsx(Skeleton, { className: "h-16 w-16 rounded-full" }), _jsxs("div", { className: "flex-1", children: [_jsx(Skeleton, { className: "mb-2 h-6 w-64" }), _jsx(Skeleton, { className: "h-4 w-96" })] })] }), _jsx(Skeleton, { className: "mb-4 h-24 w-full" }), _jsxs("div", { className: "grid grid-cols-3 gap-3", children: [_jsx(Skeleton, { className: "h-16 rounded-lg" }), _jsx(Skeleton, { className: "h-16 rounded-lg" }), _jsx(Skeleton, { className: "h-16 rounded-lg" })] })] }), _jsxs(Card, { className: "border-white/10 bg-white/5 p-6", children: [_jsx(Skeleton, { className: "mb-4 h-5 w-32" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-3/4" })] })] })] }));
    }
    // Default: card variant
    return (_jsxs(Card, { className: cn('border-white/10 bg-white/5 p-5', className), ...props, children: [_jsxs("div", { className: "mb-3 flex items-center gap-3", children: [_jsx(Skeleton, { className: "h-10 w-10 rounded-full" }), _jsxs("div", { className: "flex-1", children: [_jsx(Skeleton, { className: "mb-2 h-5 w-40" }), _jsx(Skeleton, { className: "h-3 w-56" })] })] }), _jsx(Skeleton, { className: "mb-3 h-16 w-full" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Skeleton, { className: "h-6 w-20 rounded-full" }), _jsx(Skeleton, { className: "h-6 w-24 rounded-full" })] })] }));
};
//# sourceMappingURL=ritual-loading-skeleton.js.map