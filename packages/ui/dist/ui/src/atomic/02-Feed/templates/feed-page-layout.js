'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../lib/utils';
import { Button, PlusIcon, UsersIcon, AlertCircleIcon } from '../atoms';
import { LiveRegion } from '../../a11y/LiveRegion';
import { FeedFilterBar } from '../molecules/feed-filter-bar';
import { FeedVirtualizedList } from '../organisms/feed-virtualized-list';
import { FeedLoadingSkeleton } from './feed-loading-skeleton';
/**
 * Get user-friendly error messages based on error type
 */
function getErrorMessage(error) {
    const errorMessage = error.message.toLowerCase();
    // Network errors
    if (errorMessage.includes('fetch') || errorMessage.includes('network') || errorMessage.includes('failed to fetch')) {
        return {
            title: 'Connection Issue',
            message: 'Unable to connect to HIVE',
            guidance: 'Check your internet connection and try again',
        };
    }
    // Auth errors
    if (errorMessage.includes('unauthorized') || errorMessage.includes('auth') || errorMessage.includes('401')) {
        return {
            title: 'Authentication Required',
            message: 'Your session has expired',
            guidance: 'Please sign in again to continue',
        };
    }
    // Rate limit errors
    if (errorMessage.includes('rate limit') || errorMessage.includes('too many') || errorMessage.includes('429')) {
        return {
            title: 'Slow Down',
            message: 'Too many requests',
            guidance: 'Please wait a moment before trying again',
        };
    }
    // Not found errors
    if (errorMessage.includes('not found') || errorMessage.includes('404')) {
        return {
            title: 'Content Not Found',
            message: 'This content no longer exists',
            guidance: 'Try refreshing or browse other content',
        };
    }
    // Permission errors
    if (errorMessage.includes('forbidden') || errorMessage.includes('permission') || errorMessage.includes('403')) {
        return {
            title: 'Access Denied',
            message: "You don't have permission to view this",
            guidance: 'This content may be private or restricted',
        };
    }
    // Generic server errors
    if (errorMessage.includes('500') || errorMessage.includes('server')) {
        return {
            title: 'Server Error',
            message: 'Something went wrong on our end',
            guidance: "We're working on it. Please try again in a few minutes",
        };
    }
    // Default fallback
    return {
        title: 'Something Went Wrong',
        message: error.message || 'An unexpected error occurred',
        guidance: 'Please try again or contact support if this persists',
    };
}
export const FeedPageLayout = React.forwardRef(({ title = 'Feed', showComposer = true, onCompose, activeFilter = 'all', onFilterChange, feedItems, renderFeedItem, onLoadMore, hasMore = false, isLoading = false, isInitialLoad = false, error, onRetry, className, ...props }, ref) => {
    // Announce when new items are appended to the feed
    const [announcement, setAnnouncement] = React.useState(null);
    const prevCountRef = React.useRef(feedItems.length);
    React.useEffect(() => {
        const prev = prevCountRef.current;
        if (feedItems.length > prev) {
            const added = feedItems.length - prev;
            setAnnouncement(`${added} new ${added === 1 ? 'item' : 'items'} loaded in feed`);
        }
        prevCountRef.current = feedItems.length;
    }, [feedItems.length]);
    return (_jsxs("div", { ref: ref, className: cn('flex min-h-screen flex-col', className), ...props, children: [_jsx(LiveRegion, { message: announcement, politeness: "polite", className: "sr-only" }), _jsxs("header", { className: "sticky top-0 z-20 border-b border-[color-mix(in_srgb,var(--hive-border-default) 70%,transparent)] bg-[var(--hive-background-primary)]/95 backdrop-blur-md", children: [_jsxs("div", { className: "mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4", children: [_jsx("h1", { id: "feed-title", className: "text-xl font-bold text-[var(--hive-text-primary)]", children: title }), showComposer && (_jsxs(Button, { variant: "brand", size: "md", onClick: onCompose, className: "shrink-0", children: [_jsx(PlusIcon, { className: "mr-2 h-4 w-4" }), _jsx("span", { className: "hidden sm:inline", children: "Create Post" }), _jsx("span", { className: "sm:hidden", children: "New" })] }))] }), _jsx("div", { className: "border-t border-[color-mix(in_srgb,var(--hive-border-default) 60%,transparent)]", children: _jsx("div", { className: "mx-auto max-w-3xl px-4", children: _jsx(FeedFilterBar, { activeFilter: activeFilter, onFilterChange: onFilterChange || (() => { }) }) }) })] }), _jsx("main", { className: "flex-1 bg-[var(--hive-background-primary)]", role: "main", "aria-labelledby": "feed-title", children: _jsxs("div", { className: "mx-auto max-w-3xl px-4 py-6", children: [isInitialLoad && !error && (_jsx(FeedLoadingSkeleton, { count: 5, variant: "mixed" })), error && (() => {
                            const errorDetails = getErrorMessage(error);
                            return (_jsxs("div", { className: "flex flex-col items-center justify-center gap-5 py-16 text-center", children: [_jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10", role: "img", "aria-label": "Error indicator", children: _jsx(AlertCircleIcon, { className: "h-8 w-8 text-red-500" }) }), _jsxs("div", { className: "space-y-3 max-w-md", children: [_jsx("h3", { className: "text-xl font-bold text-[var(--hive-text-primary)]", children: errorDetails.title }), _jsx("p", { className: "text-base text-[var(--hive-text-secondary)]", children: errorDetails.message }), _jsx("p", { className: "text-sm text-[var(--hive-text-tertiary)] italic", children: errorDetails.guidance })] }), onRetry && (_jsx(Button, { variant: "brand", size: "lg", onClick: onRetry, className: "mt-1", children: "Try Again" }))] }));
                        })(), !isInitialLoad && !error && feedItems.length === 0 && (_jsxs("div", { className: "flex flex-col items-center justify-center gap-6 py-16 text-center", children: [_jsx("div", { className: "flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] shadow-lg", children: _jsx(UsersIcon, { className: "h-10 w-10 text-[var(--hive-background-primary)]" }) }), _jsxs("div", { className: "space-y-3 max-w-sm", children: [_jsx("h3", { className: "text-xl font-bold text-[var(--hive-text-primary)]", children: "Welcome to HIVE!" }), _jsx("p", { className: "text-base text-[var(--hive-text-secondary)] leading-relaxed", children: "Your feed will show posts from spaces you join. Browse spaces to discover campus communities, events, and content." })] }), _jsxs(Button, { variant: "brand", size: "lg", onClick: () => {
                                        if (typeof window !== 'undefined') {
                                            window.location.href = '/spaces/browse';
                                        }
                                    }, className: "mt-2", children: [_jsx(UsersIcon, { className: "mr-2 h-5 w-5" }), "Browse Spaces"] })] })), !isInitialLoad && !error && feedItems.length > 0 && (_jsx(FeedVirtualizedList, { items: feedItems, renderItem: renderFeedItem, onLoadMore: onLoadMore, hasMore: hasMore, isLoading: isLoading }))] }) })] }));
});
FeedPageLayout.displayName = 'FeedPageLayout';
//# sourceMappingURL=feed-page-layout.js.map