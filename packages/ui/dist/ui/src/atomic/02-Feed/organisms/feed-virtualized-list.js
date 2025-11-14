'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '../../00-Global/atoms/skeleton.js';
export const FeedVirtualizedList = React.forwardRef(({ items, renderItem, onLoadMore, hasMore = false, isLoading = false, loadingSkeletonCount = 3, estimatedItemHeight = 200, className, ...props }, ref) => {
    const loadMoreRef = React.useRef(null);
    // Intersection Observer for infinite scroll
    React.useEffect(() => {
        if (!loadMoreRef.current || !hasMore || isLoading)
            return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                onLoadMore?.();
            }
        }, { rootMargin: '200px' });
        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [hasMore, isLoading, onLoadMore]);
    const setSize = items.length;
    return (_jsxs("div", { ref: ref, role: "feed", "aria-busy": isLoading, className: cn('flex flex-col gap-4', className), ...props, children: [items.map((item, index) => (_jsx("div", { role: "article", "aria-posinset": index + 1, "aria-setsize": setSize, children: renderItem(item, index) }, item.id))), isLoading && (_jsx(_Fragment, { children: Array.from({ length: loadingSkeletonCount }).map((_, index) => (_jsxs("div", { className: "flex flex-col gap-4 rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default) 80%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 94%,transparent)] p-6", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Skeleton, { className: "h-10 w-10 shrink-0 rounded-full" }), _jsxs("div", { className: "flex flex-1 flex-col gap-2", children: [_jsx(Skeleton, { className: "h-4 w-32" }), _jsx(Skeleton, { className: "h-3 w-24" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-5 w-full" }), _jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-4/5" })] })] }, `skeleton-${index}`))) })), hasMore && !isLoading && (_jsx("div", { ref: loadMoreRef, className: "h-4", "aria-hidden": "true" })), !hasMore && items.length > 0 && (_jsx("div", { className: "flex items-center justify-center py-8", children: _jsx("p", { className: "text-sm text-[var(--hive-text-tertiary)]", children: "You've reached the end of the feed" }) })), !isLoading && items.length === 0 && (_jsxs("div", { className: "flex flex-col items-center justify-center gap-4 py-16 text-center", children: [_jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-[var(--hive-background-tertiary)]", children: _jsx("span", { className: "text-2xl", children: "\uD83D\uDCED" }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "No posts yet" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Join some spaces to see posts in your feed" })] })] }))] }));
});
FeedVirtualizedList.displayName = 'FeedVirtualizedList';
//# sourceMappingURL=feed-virtualized-list.js.map