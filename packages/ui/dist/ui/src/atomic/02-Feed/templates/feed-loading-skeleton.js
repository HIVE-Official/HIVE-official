'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../lib/utils';
import { Skeleton } from '../../00-Global/atoms/skeleton';
const PostSkeleton = ({ className }) => (_jsxs("div", { className: cn('flex flex-col gap-4 rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default) 80%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 94%,transparent)] p-6', className), children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Skeleton, { className: "h-10 w-10 shrink-0 rounded-full" }), _jsxs("div", { className: "flex flex-1 flex-col gap-2", children: [_jsx(Skeleton, { className: "h-4 w-32" }), _jsx(Skeleton, { className: "h-3 w-24" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-5 w-full" }), _jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-4/5" })] }), _jsxs("div", { className: "flex items-center gap-4 pt-2", children: [_jsx(Skeleton, { className: "h-8 w-16" }), _jsx(Skeleton, { className: "h-8 w-16" }), _jsx(Skeleton, { className: "h-8 w-16" })] })] }));
const EventSkeleton = ({ className }) => (_jsxs("div", { className: cn('flex flex-col overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default) 70%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 96%,transparent)]', className), children: [_jsx(Skeleton, { className: "h-48 w-full rounded-none" }), _jsxs("div", { className: "flex flex-col gap-4 p-6", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx(Skeleton, { className: "h-6 w-20" }), _jsx(Skeleton, { className: "h-6 w-16" })] }), _jsx(Skeleton, { className: "h-6 w-3/4" }), _jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-5/6" }), _jsxs("div", { className: "flex items-center justify-between gap-4 border-t border-[color-mix(in_srgb,var(--hive-border-default) 55%,transparent)] pt-4", children: [_jsx(Skeleton, { className: "h-8 w-24" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Skeleton, { className: "h-9 w-28" }), _jsx(Skeleton, { className: "h-9 w-16" })] })] })] })] }));
const ToolSkeleton = ({ className }) => (_jsxs("div", { className: cn('flex flex-col gap-5 rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default) 78%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 96%,transparent)] p-6', className), children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Skeleton, { className: "h-12 w-12 shrink-0 rounded-xl" }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Skeleton, { className: "h-5 w-24" }), _jsx(Skeleton, { className: "h-4 w-16" })] })] }), _jsx(Skeleton, { className: "h-4 w-12" })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Skeleton, { className: "h-6 w-2/3" }), _jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-5/6" }), _jsxs("div", { className: "flex items-center gap-3 pt-1", children: [_jsx(Skeleton, { className: "h-4 w-20" }), _jsx(Skeleton, { className: "h-4 w-24" })] })] }), _jsxs("div", { className: "flex items-center justify-between gap-3 border-t border-[color-mix(in_srgb,var(--hive-border-default) 40%,transparent)] pt-4", children: [_jsx(Skeleton, { className: "h-4 w-16" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Skeleton, { className: "h-9 w-20" }), _jsx(Skeleton, { className: "h-9 w-24" })] })] })] }));
export const FeedLoadingSkeleton = React.forwardRef(({ count = 5, variant = 'mixed', className, ...props }, ref) => {
    const renderSkeleton = (index) => {
        if (variant === 'post') {
            return _jsx(PostSkeleton, {}, index);
        }
        if (variant === 'event') {
            return _jsx(EventSkeleton, {}, index);
        }
        if (variant === 'tool') {
            return _jsx(ToolSkeleton, {}, index);
        }
        // Mixed: Alternate between different types
        const types = ['post', 'post', 'event', 'tool'];
        const type = types[index % types.length];
        switch (type) {
            case 'event':
                return _jsx(EventSkeleton, {}, index);
            case 'tool':
                return _jsx(ToolSkeleton, {}, index);
            default:
                return _jsx(PostSkeleton, {}, index);
        }
    };
    return (_jsx("div", { ref: ref, role: "status", "aria-label": "Loading feed", className: cn('flex flex-col gap-4', className), ...props, children: Array.from({ length: count }).map((_, index) => renderSkeleton(index)) }));
});
FeedLoadingSkeleton.displayName = 'FeedLoadingSkeleton';
//# sourceMappingURL=feed-loading-skeleton.js.map