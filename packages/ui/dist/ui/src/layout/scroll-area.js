import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../lib/utils";
const defaultState = { atStart: true, atEnd: false };
export const ScrollArea = React.forwardRef(({ className, children, orientation = "vertical", showShadows = true, inertial = true, ...props }, forwardedRef) => {
    const internalRef = React.useRef(null);
    const [state, setState] = React.useState(defaultState);
    const mergeRefs = React.useCallback((node) => {
        internalRef.current = node;
        if (typeof forwardedRef === "function") {
            forwardedRef(node);
        }
        else if (forwardedRef) {
            forwardedRef.current = node;
        }
    }, [forwardedRef]);
    const updateScrollState = React.useCallback(() => {
        const node = internalRef.current;
        if (!node)
            return;
        if (orientation === "vertical") {
            const { scrollTop, scrollHeight, clientHeight } = node;
            const atStart = scrollTop <= 1;
            const atEnd = scrollTop + clientHeight >= scrollHeight - 1;
            setState({ atStart, atEnd });
        }
        else {
            const { scrollLeft, scrollWidth, clientWidth } = node;
            const atStart = scrollLeft <= 1;
            const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;
            setState({ atStart, atEnd });
        }
    }, [orientation]);
    React.useLayoutEffect(() => {
        const node = internalRef.current;
        if (!node)
            return;
        updateScrollState();
        const handleScroll = () => updateScrollState();
        node.addEventListener("scroll", handleScroll, { passive: true });
        return () => node.removeEventListener("scroll", handleScroll);
    }, [updateScrollState]);
    React.useEffect(() => {
        const node = internalRef.current;
        if (!node || typeof ResizeObserver === "undefined")
            return;
        updateScrollState();
        const observer = new ResizeObserver(updateScrollState);
        observer.observe(node);
        return () => observer.disconnect();
    }, [updateScrollState]);
    const isVertical = orientation === "vertical";
    return (_jsxs("div", { className: cn("relative", className), children: [_jsx("div", { ref: mergeRefs, className: cn("overflow-auto [-webkit-overflow-scrolling:touch] [scrollbar-width:thin]", isVertical ? "max-h-full" : "max-w-full", inertial && "motion-safe:scroll-smooth", "[&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--hive-border-muted)]/60 [&::-webkit-scrollbar-track]:bg-transparent"), ...props, children: children }), showShadows && isVertical && (_jsxs(_Fragment, { children: [!state.atStart && (_jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[var(--hive-background-primary)]/80 via-[var(--hive-background-primary)]/40 to-transparent transition-opacity duration-200" })), !state.atEnd && (_jsx("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[var(--hive-background-primary)]/80 via-[var(--hive-background-primary)]/40 to-transparent transition-opacity duration-200" }))] })), showShadows && !isVertical && (_jsxs(_Fragment, { children: [!state.atStart && (_jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[var(--hive-background-primary)]/80 via-[var(--hive-background-primary)]/40 to-transparent transition-opacity duration-200" })), !state.atEnd && (_jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[var(--hive-background-primary)]/80 via-[var(--hive-background-primary)]/40 to-transparent transition-opacity duration-200" }))] }))] }));
});
ScrollArea.displayName = "ScrollArea";
export const ScrollViewport = React.forwardRef(({ height, style, ...props }, ref) => {
    return (_jsx(ScrollArea, { ref: ref, style: {
            maxHeight: typeof height === "number" ? `${height}px` : height,
            ...style,
        }, ...props }));
});
ScrollViewport.displayName = "ScrollViewport";
//# sourceMappingURL=scroll-area.js.map