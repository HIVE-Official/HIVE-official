import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../lib/utils.js";
/**
 * VirtualList renders large collections efficiently by only mounting the items currently visible.
 * Basic fixed-height virtualisation keeps dependencies small for Edge deployments.
 */
export function VirtualList({ items, itemHeight, height, overscan = 3, getKey, renderItem, className, style, onScroll, ...props }) {
    const containerRef = React.useRef(null);
    const [scrollTop, setScrollTop] = React.useState(0);
    const totalHeight = items.length * itemHeight;
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(items.length, Math.ceil((scrollTop + getNumericHeight(height)) / itemHeight) + overscan);
    const visibleItems = React.useMemo(() => items.slice(startIndex, endIndex), [items, startIndex, endIndex]);
    const offsetY = startIndex * itemHeight;
    const handleScroll = React.useCallback((event) => {
        setScrollTop(event.currentTarget.scrollTop);
        onScroll?.(event);
    }, [onScroll]);
    // Re-sync scrollTop when items array shrinks drastically.
    React.useEffect(() => {
        const container = containerRef.current;
        if (!container)
            return;
        const maxScrollTop = Math.max(0, totalHeight - getNumericHeight(height));
        if (scrollTop > maxScrollTop) {
            container.scrollTop = maxScrollTop;
            setScrollTop(maxScrollTop);
        }
    }, [totalHeight, height, scrollTop]);
    const containerHeight = typeof height === "number" ? `${height}px` : height;
    return (_jsx("div", { ref: containerRef, className: cn("hive-virtual-list relative overflow-y-auto [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--hive-border-muted)]/60 [&::-webkit-scrollbar-track]:bg-transparent", className), style: { height: containerHeight, ...style }, onScroll: handleScroll, ...props, children: _jsx("div", { style: { height: `${totalHeight}px`, position: "relative" }, children: _jsx("div", { style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    transform: `translateY(${offsetY}px)`,
                }, children: visibleItems.map((item, visibleIndex) => {
                    const itemIndex = startIndex + visibleIndex;
                    const key = getKey ? getKey(item, itemIndex) : itemIndex;
                    return (_jsx("div", { className: "hive-virtual-list__item", style: { height: `${itemHeight}px` }, children: renderItem(item, itemIndex) }, key));
                }) }) }) }));
}
function getNumericHeight(height) {
    if (typeof height === "number")
        return height;
    if (typeof window === "undefined")
        return 0;
    if (height.endsWith("px")) {
        return parseFloat(height);
    }
    if (height.endsWith("vh")) {
        const value = parseFloat(height);
        return (window.innerHeight * value) / 100;
    }
    return 0;
}
//# sourceMappingURL=VirtualList.js.map