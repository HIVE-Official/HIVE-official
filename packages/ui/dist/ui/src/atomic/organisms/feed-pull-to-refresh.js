"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { Loader2, RefreshCw } from "lucide-react";
const FeedPullToRefresh = React.forwardRef(({ className, children, onRefresh, pullThreshold = 80, maxPullDistance = 120, enabled = true, ...props }, ref) => {
    const [pullDistance, setPullDistance] = React.useState(0);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [isPulling, setIsPulling] = React.useState(false);
    const startY = React.useRef(0);
    const containerRef = React.useRef(null);
    const handleTouchStart = (e) => {
        if (!enabled || isRefreshing)
            return;
        const scrollTop = containerRef.current?.scrollTop || 0;
        if (scrollTop === 0) {
            startY.current = e.touches[0].clientY;
            setIsPulling(true);
        }
    };
    const handleTouchMove = (e) => {
        if (!enabled || !isPulling || isRefreshing)
            return;
        const currentY = e.touches[0].clientY;
        const diff = currentY - startY.current;
        if (diff > 0) {
            // Pulling down
            e.preventDefault();
            const pull = Math.min(diff, maxPullDistance);
            setPullDistance(pull);
        }
    };
    const handleTouchEnd = async () => {
        if (!enabled || !isPulling)
            return;
        setIsPulling(false);
        if (pullDistance >= pullThreshold && onRefresh && !isRefreshing) {
            setIsRefreshing(true);
            try {
                await onRefresh();
            }
            catch (error) {
                console.error("Error refreshing:", error);
            }
            finally {
                setIsRefreshing(false);
                setPullDistance(0);
            }
        }
        else {
            // Animate back to 0
            setPullDistance(0);
        }
    };
    React.useEffect(() => {
        const container = containerRef.current;
        if (!container || !enabled)
            return;
        container.addEventListener("touchstart", handleTouchStart, { passive: true });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });
        container.addEventListener("touchend", handleTouchEnd);
        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
            container.removeEventListener("touchend", handleTouchEnd);
        };
    }, [enabled, isPulling, pullDistance, isRefreshing]);
    const pullProgress = pullDistance / pullThreshold;
    const shouldRefresh = pullDistance >= pullThreshold;
    return (_jsxs("div", { ref: (node) => {
            containerRef.current = node;
            if (typeof ref === "function")
                ref(node);
            else if (ref)
                ref.current = node;
        }, className: cn("relative overflow-auto", className), ...props, children: [enabled && (isPulling || isRefreshing) && (_jsx("div", { className: "absolute top-0 left-0 right-0 flex items-center justify-center transition-all duration-300 ease-liquid", style: {
                    height: `${pullDistance}px`,
                    opacity: Math.min(pullProgress, 1),
                }, children: _jsxs("div", { className: "flex flex-col items-center gap-2", children: [isRefreshing ? (_jsx(Loader2, { className: "h-6 w-6 animate-spin text-white" })) : (_jsx(RefreshCw, { className: cn("h-6 w-6 text-white transition-transform duration-200", shouldRefresh && "rotate-180"), style: {
                                transform: `rotate(${pullProgress * 180}deg)`,
                            } })), _jsx("span", { className: "text-xs font-medium text-white", children: isRefreshing
                                ? "Refreshing..."
                                : shouldRefresh
                                    ? "Release to refresh"
                                    : "Pull to refresh" })] }) })), _jsx("div", { className: "transition-transform duration-300 ease-liquid", style: {
                    transform: `translateY(${pullDistance}px)`,
                }, children: children })] }));
});
FeedPullToRefresh.displayName = "FeedPullToRefresh";
export { FeedPullToRefresh };
//# sourceMappingURL=feed-pull-to-refresh.js.map