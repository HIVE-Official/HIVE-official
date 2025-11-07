import * as React from 'react';
export interface FeedLoadingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    count?: number;
    variant?: 'post' | 'event' | 'tool' | 'mixed';
}
export declare const FeedLoadingSkeleton: React.ForwardRefExoticComponent<FeedLoadingSkeletonProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=feed-loading-skeleton.d.ts.map