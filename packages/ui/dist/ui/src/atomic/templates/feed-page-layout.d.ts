import * as React from 'react';
import { type FeedItem } from '../organisms/feed-virtualized-list';
export interface FeedPageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    showComposer?: boolean;
    onCompose?: () => void;
    activeFilter?: 'all' | 'my_spaces' | 'events';
    onFilterChange?: (filter: 'all' | 'my_spaces' | 'events') => void;
    feedItems: FeedItem[];
    renderFeedItem: (item: FeedItem, index: number) => React.ReactNode;
    onLoadMore?: () => void;
    hasMore?: boolean;
    isLoading?: boolean;
    isInitialLoad?: boolean;
    error?: Error | null;
    onRetry?: () => void;
}
export declare const FeedPageLayout: React.ForwardRefExoticComponent<FeedPageLayoutProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=feed-page-layout.d.ts.map