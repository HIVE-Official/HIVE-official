'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button, PlusIcon, UsersIcon, AlertCircleIcon } from '../../00-Global/atoms';
import { LiveRegion } from '../../../a11y/LiveRegion';
import { FeedFilterBar } from '../molecules/feed-filter-bar';
import { FeedVirtualizedList, type FeedItem } from '../organisms/feed-virtualized-list';
import { FeedLoadingSkeleton } from './feed-loading-skeleton';

export interface FeedPageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  // Header props
  title?: string;
  showComposer?: boolean;
  onCompose?: () => void;

  // Filter props
  activeFilter?: 'all' | 'my_spaces' | 'events';
  onFilterChange?: (filter: 'all' | 'my_spaces' | 'events') => void;

  // Feed props
  feedItems: FeedItem[];
  renderFeedItem: (item: FeedItem, index: number) => React.ReactNode;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
  isInitialLoad?: boolean;

  // Error state
  error?: Error | null;
  onRetry?: () => void;
}

/**
 * Get user-friendly error messages based on error type
 */
function getErrorMessage(error: Error): { title: string; message: string; guidance: string } {
  const errorMessage = error.message.toLowerCase();

  // Network errors
  if (errorMessage.includes('fetch') || errorMessage.includes('network') || errorMessage.includes('failed to fetch')) {
    return {
      title: 'Connection Issue',
      message: 'Unable to connect to HIVE',
      guidance: 'Check your internet connection and try again',
    };
  }

  // Auth errors
  if (errorMessage.includes('unauthorized') || errorMessage.includes('auth') || errorMessage.includes('401')) {
    return {
      title: 'Authentication Required',
      message: 'Your session has expired',
      guidance: 'Please sign in again to continue',
    };
  }

  // Rate limit errors
  if (errorMessage.includes('rate limit') || errorMessage.includes('too many') || errorMessage.includes('429')) {
    return {
      title: 'Slow Down',
      message: 'Too many requests',
      guidance: 'Please wait a moment before trying again',
    };
  }

  // Not found errors
  if (errorMessage.includes('not found') || errorMessage.includes('404')) {
    return {
      title: 'Content Not Found',
      message: 'This content no longer exists',
      guidance: 'Try refreshing or browse other content',
    };
  }

  // Permission errors
  if (errorMessage.includes('forbidden') || errorMessage.includes('permission') || errorMessage.includes('403')) {
    return {
      title: 'Access Denied',
      message: "You don't have permission to view this",
      guidance: 'This content may be private or restricted',
    };
  }

  // Generic server errors
  if (errorMessage.includes('500') || errorMessage.includes('server')) {
    return {
      title: 'Server Error',
      message: 'Something went wrong on our end',
      guidance: "We're working on it. Please try again in a few minutes",
    };
  }

  // Default fallback
  return {
    title: 'Something Went Wrong',
    message: error.message || 'An unexpected error occurred',
    guidance: 'Please try again or contact support if this persists',
  };
}

export const FeedPageLayout = React.forwardRef<HTMLDivElement, FeedPageLayoutProps>(
  (
    {
      title = 'Feed',
      showComposer = true,
      onCompose,
      activeFilter = 'all',
      onFilterChange,
      feedItems,
      renderFeedItem,
      onLoadMore,
      hasMore = false,
      isLoading = false,
      isInitialLoad = false,
      error,
      onRetry,
      className,
      ...props
    },
    ref
  ) => {
    // Announce when new items are appended to the feed
    const [announcement, setAnnouncement] = React.useState<string | null>(null);
    const prevCountRef = React.useRef<number>(feedItems.length);

    React.useEffect(() => {
      const prev = prevCountRef.current;
      if (feedItems.length > prev) {
        const added = feedItems.length - prev;
        setAnnouncement(`${added} new ${added === 1 ? 'item' : 'items'} loaded in feed`);
      }
      prevCountRef.current = feedItems.length;
    }, [feedItems.length]);

    return (
      <div
        ref={ref}
        className={cn('flex min-h-screen flex-col', className)}
        {...props}
      >
        {/* Screen reader announcements for dynamic updates */}
        <LiveRegion message={announcement} politeness="polite" className="sr-only" />
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-[color-mix(in_srgb,var(--hive-border-default) 70%,transparent)] bg-[var(--hive-background-primary)]/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4">
            <h1 id="feed-title" className="text-xl font-bold text-[var(--hive-text-primary)]">
              {title}
            </h1>
            {showComposer && (
              <Button
                variant="brand"
                size="md"
                onClick={onCompose}
                className="shrink-0"
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Create Post</span>
                <span className="sm:hidden">New</span>
              </Button>
            )}
          </div>

          {/* Filter Bar */}
          <div className="border-t border-[color-mix(in_srgb,var(--hive-border-default) 60%,transparent)]">
            <div className="mx-auto max-w-3xl px-4">
              <FeedFilterBar
                activeFilter={activeFilter}
                onFilterChange={onFilterChange || (() => {})}
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-[var(--hive-background-primary)]" role="main" aria-labelledby="feed-title">
          <div className="mx-auto max-w-3xl px-4 py-6">
            {/* Initial Loading State */}
            {isInitialLoad && !error && (
              <FeedLoadingSkeleton count={5} variant="mixed" />
            )}

            {/* Error State */}
            {error && (() => {
              const errorDetails = getErrorMessage(error);
              return (
                <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
                  {/* Icon with accessible label */}
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10"
                    role="img"
                    aria-label="Error indicator"
                  >
                    <AlertCircleIcon className="h-8 w-8 text-red-500" />
                  </div>

                  {/* Error Content */}
                  <div className="space-y-3 max-w-md">
                    <h3 className="text-xl font-bold text-[var(--hive-text-primary)]">
                      {errorDetails.title}
                    </h3>
                    <p className="text-base text-[var(--hive-text-secondary)]">
                      {errorDetails.message}
                    </p>
                    <p className="text-sm text-[var(--hive-text-tertiary)] italic">
                      {errorDetails.guidance}
                    </p>
                  </div>

                  {/* Retry Button */}
                  {onRetry && (
                    <Button
                      variant="brand"
                      size="lg"
                      onClick={onRetry}
                      className="mt-1"
                    >
                      Try Again
                    </Button>
                  )}
                </div>
              );
            })()}

            {/* Empty State */}
            {!isInitialLoad && !error && feedItems.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
                {/* Icon */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] shadow-lg">
                  <UsersIcon className="h-10 w-10 text-[var(--hive-background-primary)]" />
                </div>

                {/* Content */}
                <div className="space-y-3 max-w-sm">
                  <h3 className="text-xl font-bold text-[var(--hive-text-primary)]">
                    Welcome to HIVE!
                  </h3>
                  <p className="text-base text-[var(--hive-text-secondary)] leading-relaxed">
                    Your feed will show posts from spaces you join. Browse spaces to discover campus communities, events, and content.
                  </p>
                </div>

                {/* Action */}
                <Button
                  variant="brand"
                  size="lg"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.location.href = '/spaces/browse';
                    }
                  }}
                  className="mt-2"
                >
                  <UsersIcon className="mr-2 h-5 w-5" />
                  Browse Spaces
                </Button>
              </div>
            )}

            {/* Feed List */}
            {!isInitialLoad && !error && feedItems.length > 0 && (
              <FeedVirtualizedList
                items={feedItems}
                renderItem={renderFeedItem}
                onLoadMore={onLoadMore}
                hasMore={hasMore}
                isLoading={isLoading}
              />
            )}
          </div>
        </main>
      </div>
    );
  }
);

FeedPageLayout.displayName = 'FeedPageLayout';
