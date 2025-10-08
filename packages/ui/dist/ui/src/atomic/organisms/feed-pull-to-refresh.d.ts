import * as React from "react";
export interface FeedPullToRefreshProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Content to wrap */
    children: React.ReactNode;
    /** Refresh handler */
    onRefresh?: () => void | Promise<void>;
    /** Pull threshold in pixels (default: 80px) */
    pullThreshold?: number;
    /** Max pull distance in pixels (default: 120px) */
    maxPullDistance?: number;
    /** Enable pull to refresh (default: true on mobile) */
    enabled?: boolean;
}
declare const FeedPullToRefresh: React.ForwardRefExoticComponent<FeedPullToRefreshProps & React.RefAttributes<HTMLDivElement>>;
export { FeedPullToRefresh };
//# sourceMappingURL=feed-pull-to-refresh.d.ts.map