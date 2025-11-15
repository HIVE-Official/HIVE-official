'use client';

import * as React from 'react';
import { cn } from '../../../lib/utils';
import { Button, PinIcon } from '../../00-Global/atoms';
import { SpaceHeader } from '../molecules/space-header';
import { FeedVirtualizedList, type FeedItem } from '../../02-Feed/organisms/feed-virtualized-list';

export interface PinnedPost {
  id: string;
  title: string;
  author: string;
  timeAgo: string;
}

export interface SpaceBoardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  spaceId: string;
  spaceName: string;
  spaceIcon?: string;
  spaceColor?: string;
  memberCount: number;
  isMember: boolean;
  isLeader?: boolean;

  // Pinned posts
  pinnedPosts?: PinnedPost[];
  onPinnedPostClick?: (postId: string) => void;

  // Composer
  showComposer?: boolean;
  onCompose?: () => void;

  // Feed
  feedItems: FeedItem[];
  renderFeedItem: (item: FeedItem, index: number) => React.ReactNode;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;

  // Actions
  onJoin?: (spaceId: string) => void;
  onLeave?: (spaceId: string) => void;
  onShare?: () => void;
}

export const SpaceBoardLayout = React.forwardRef<HTMLDivElement, SpaceBoardLayoutProps>(
  (
    {
      spaceId,
      spaceName,
      spaceIcon,
      memberCount,
      isMember,
      isLeader = false,
      pinnedPosts = [],
      onPinnedPostClick,
      showComposer = true,
      onCompose,
      feedItems,
      renderFeedItem,
      onLoadMore,
      hasMore = false,
      isLoading = false,
      onJoin,
      onLeave,
      onShare,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex min-h-screen flex-col', className)}
        {...props}
      >
        {/* Space Header */}
        <SpaceHeader
          space={{
            id: spaceId,
            name: spaceName,
            iconUrl: spaceIcon,
          }}
          memberCount={memberCount}
          membershipState={isMember ? 'joined' : 'not_joined'}
          isLeader={isLeader}
          onJoin={!isMember && onJoin ? () => onJoin(spaceId) : undefined}
          onLeave={isMember && onLeave ? () => onLeave(spaceId) : undefined}
          onShare={onShare}
        />

        {/* Main Content */}
        <main className="flex-1 bg-[var(--hive-background-primary)]">
          <div className="mx-auto max-w-3xl px-4 py-6">
            {/* Composer */}
            {showComposer && isMember && (
              <div className="mb-6">
                <Button
                  variant="secondary"
                  className="w-full justify-start text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]"
                  onClick={onCompose}
                >
                  <span className="text-left">Share something with the space...</span>
                </Button>
              </div>
            )}

            {/* Pinned Posts Stack */}
            {pinnedPosts.length > 0 && (
              <div className="mb-6 space-y-2">
                <div className="flex items-center gap-2 px-2">
                  <PinIcon className="h-4 w-4 text-[var(--hive-brand-primary)]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--hive-text-tertiary)]">
                    Pinned Posts
                  </span>
                </div>
                <div className="space-y-2">
                  {pinnedPosts.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => onPinnedPostClick?.(post.id)}
                      className="group flex w-full items-start gap-3 rounded-xl border-l-4 border-[var(--hive-brand-primary)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 96%,transparent)] p-4 text-left transition-colors hover:bg-[color-mix(in_srgb,var(--hive-background-secondary) 92%,transparent)]"
                    >
                      <div className="flex-1 space-y-1">
                        <h3 className="text-sm font-semibold text-[var(--hive-text-primary)]">
                          {post.title}
                        </h3>
                        <p className="text-xs text-[var(--hive-text-tertiary)]">
                          {post.author} • {post.timeAgo}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Feed */}
            <FeedVirtualizedList
              items={feedItems}
              renderItem={renderFeedItem}
              onLoadMore={onLoadMore}
              hasMore={hasMore}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>
    );
  }
);

SpaceBoardLayout.displayName = 'SpaceBoardLayout';
