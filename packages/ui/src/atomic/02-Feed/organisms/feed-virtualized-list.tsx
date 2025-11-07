'use client';

import * as React from 'react';
import { cn } from '../../../lib/utils';
import { Skeleton } from '../../00-Global/atoms/skeleton';

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

export const FeedVirtualizedList = React.forwardRef<HTMLDivElement, FeedVirtualizedListProps>(
  (
    {
      items,
      renderItem,
      onLoadMore,
      hasMore = false,
      isLoading = false,
      loadingSkeletonCount = 3,
      estimatedItemHeight = 200,
      className,
      ...props
    },
    ref
  ) => {
    const loadMoreRef = React.useRef<HTMLDivElement>(null);

    // Intersection Observer for infinite scroll
    React.useEffect(() => {
      if (!loadMoreRef.current || !hasMore || isLoading) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onLoadMore?.();
          }
        },
        { rootMargin: '200px' }
      );

      observer.observe(loadMoreRef.current);

      return () => observer.disconnect();
    }, [hasMore, isLoading, onLoadMore]);

    const setSize = items.length;

    return (
      <div
        ref={ref}
        role="feed"
        aria-busy={isLoading}
        className={cn('flex flex-col gap-4', className)}
        {...props}
      >
        {/* Feed Items */}
        {items.map((item, index) => (
          <div
            key={item.id}
            role="article"
            aria-posinset={index + 1}
            aria-setsize={setSize}
          >
            {renderItem(item, index)}
          </div>
        ))}

        {/* Loading Skeletons */}
        {isLoading && (
          <>
            {Array.from({ length: loadingSkeletonCount }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="flex flex-col gap-4 rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default) 80%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 94%,transparent)] p-6"
              >
                <div className="flex items-start gap-3">
                  <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                  <div className="flex flex-1 flex-col gap-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            ))}
          </>
        )}

        {/* Load More Trigger */}
        {hasMore && !isLoading && (
          <div ref={loadMoreRef} className="h-4" aria-hidden="true" />
        )}

        {/* End of Feed Message */}
        {!hasMore && items.length > 0 && (
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-[var(--hive-text-tertiary)]">
              You've reached the end of the feed
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && items.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--hive-background-tertiary)]">
              <span className="text-2xl">📭</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
                No posts yet
              </h3>
              <p className="text-sm text-[var(--hive-text-secondary)]">
                Join some spaces to see posts in your feed
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

FeedVirtualizedList.displayName = 'FeedVirtualizedList';
