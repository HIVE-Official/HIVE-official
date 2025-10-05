"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { Loader2 } from "lucide-react";
const FeedInfiniteScroll = React.forwardRef(({ className, children, onLoadMore, hasMore = false, isLoading = false, initialLoad = 15, scrollIncrement = 10, maxInMemory = 50, loadThreshold = 0.8, loadingComponent, endComponent, ...props }, ref) => {
    const [isLoadingMore, setIsLoadingMore] = React.useState(false);
    const observerTarget = React.useRef(null);
    // Intersection Observer for infinite scroll
    React.useEffect(() => {
        if (!onLoadMore || !hasMore || isLoading || isLoadingMore)
            return;
        const observer = new IntersectionObserver((entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
                handleLoadMore();
            }
        }, {
            threshold: loadThreshold,
            rootMargin: "100px", // Load 100px before reaching bottom
        });
        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }
        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasMore, isLoading, isLoadingMore, loadThreshold]);
    const handleLoadMore = async () => {
        if (!onLoadMore || !hasMore || isLoadingMore)
            return;
        setIsLoadingMore(true);
        try {
            await onLoadMore();
        }
        catch (error) {
            console.error("Error loading more items:", error);
        }
        finally {
            setIsLoadingMore(false);
        }
    };
    return (_jsxs("div", { ref: ref, className: cn("space-y-4", className), ...props, children: [children, (isLoading || isLoadingMore) && (loadingComponent || (_jsxs("div", { className: "flex items-center justify-center py-8", children: [_jsx(Loader2, { className: "h-6 w-6 animate-spin text-white/50" }), _jsx("span", { className: "ml-3 text-sm text-white/50", children: "Loading more..." })] }))), hasMore && !isLoading && !isLoadingMore && (_jsx("div", { ref: observerTarget, className: "h-4" })), !hasMore && !isLoading && (endComponent || (_jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center", children: [_jsx("div", { className: "text-4xl mb-3", children: "\u2728" }), _jsx("p", { className: "text-sm font-semibold text-white mb-1", children: "You're all caught up!" }), _jsx("p", { className: "text-xs text-white/50 max-w-xs", children: "That's everything from your spaces. Check back later for new content." })] })))] }));
});
FeedInfiniteScroll.displayName = "FeedInfiniteScroll";
export { FeedInfiniteScroll };
//# sourceMappingURL=feed-infinite-scroll.js.map