import * as React from "react";
export interface FeedInfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Feed items to display */
    children: React.ReactNode;
    /** Load more function */
    onLoadMore?: () => void | Promise<void>;
    /** Whether there are more items to load */
    hasMore?: boolean;
    /** Loading state */
    isLoading?: boolean;
    /** Initial load count (SPEC: 15 posts) */
    initialLoad?: number;
    /** Scroll increment (SPEC: 10 posts) */
    scrollIncrement?: number;
    /** Max items in memory (SPEC: 50 posts) */
    maxInMemory?: number;
    /** Threshold to trigger load (0-1, default 0.8 = 80% scrolled) */
    loadThreshold?: number;
    /** Custom loading component */
    loadingComponent?: React.ReactNode;
    /** Custom end component */
    endComponent?: React.ReactNode;
}
declare const FeedInfiniteScroll: React.ForwardRefExoticComponent<FeedInfiniteScrollProps & React.RefAttributes<HTMLDivElement>>;
export { FeedInfiniteScroll };
//# sourceMappingURL=feed-infinite-scroll.d.ts.map