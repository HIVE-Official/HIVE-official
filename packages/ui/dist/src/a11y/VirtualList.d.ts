import * as React from "react";
export interface VirtualListProps<T> extends React.HTMLAttributes<HTMLDivElement> {
    items: readonly T[];
    /**
     * Fixed height of each item in pixels.
     */
    itemHeight: number;
    /**
     * Viewport height in pixels or CSS string.
     */
    height: number | string;
    /**
     * Optional overscan buffer (number of items rendered outside the viewport).
     */
    overscan?: number;
    /**
     * Custom key extractor. Defaults to the item index.
     */
    getKey?: (item: T, index: number) => React.Key;
    /**
     * Render function for each visible item.
     */
    renderItem: (item: T, index: number) => React.ReactNode;
}
/**
 * VirtualList renders large collections efficiently by only mounting the items currently visible.
 * Basic fixed-height virtualisation keeps dependencies small for Edge deployments.
 */
export declare function VirtualList<T>({ items, itemHeight, height, overscan, getKey, renderItem, className, style, onScroll, ...props }: VirtualListProps<T>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=VirtualList.d.ts.map