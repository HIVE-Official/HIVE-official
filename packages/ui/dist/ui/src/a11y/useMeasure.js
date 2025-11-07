import * as React from "react";
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
const defaultBounds = {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
};
/**
 * useMeasure returns live bounds for a DOM node using ResizeObserver.
 * Works in both layout and hydration-safe scenarios.
 */
export function useMeasure({ box, onResize, } = {}) {
    const ref = React.useRef(null);
    const [bounds, setBounds] = React.useState(defaultBounds);
    useIsomorphicLayoutEffect(() => {
        const node = ref.current;
        if (!node)
            return;
        if (typeof ResizeObserver === "undefined") {
            return;
        }
        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (!entry)
                return;
            const { width, height, top, left, right, bottom } = entry.contentRect;
            const nextBounds = { width, height, top, left, right, bottom };
            setBounds(nextBounds);
            onResize?.(nextBounds);
        });
        observer.observe(node, box ? { box } : undefined);
        return () => observer.disconnect();
    }, [box, onResize]);
    const callbackRef = React.useCallback((node) => {
        ref.current = node;
    }, []);
    return { ref: callbackRef, bounds };
}
//# sourceMappingURL=useMeasure.js.map