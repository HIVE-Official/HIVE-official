import * as React from 'react';
export interface FeedItem {
    id: string;
    type: 'post' | 'event' | 'tool' | 'system';
    data: any;
}
export interface FeedVirtualizedListProps extends React.HTMLAttributes<HTMLDivElement> {
    items: FeedItem[];
    renderItem: (item: FeedItem, index: number) => React.ReactNode;
    onLoadMore?: () => void;
    hasMore?: boolean;
    isLoading?: boolean;
    loadingSkeletonCount?: number;
    estimatedItemHeight?: number;
}
export declare const FeedVirtualizedList: React.ForwardRefExoticComponent<FeedVirtualizedListProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=feed-virtualized-list.d.ts.map