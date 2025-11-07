'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { SpaceHeader } from '../molecules/space-header';
import { SpaceAboutWidget, type SpaceAboutData } from '../molecules/space-about-widget';
import { SpaceToolsWidget, type SpaceTool } from '../molecules/space-tools-widget';
import { SpacePostComposer } from '../organisms/space-post-composer';
import { FeedVirtualizedList, type FeedItem } from '../organisms/feed-virtualized-list';
import { Button, PinIcon } from '../atoms';
import type { MediaFile } from '../organisms/feed-composer-sheet';

export interface PinnedPost {
  id: string;
  title: string;
  author: string;
  timeAgo: string;
}

export interface SpaceBoardTemplateProps extends React.HTMLAttributes<HTMLDivElement> {
  // Space data
  spaceId: string;
  spaceName: string;
  spaceIcon?: string;
  spaceColor?: string;
  spaceDescription: string;
  memberCount: number;
  isPublic: boolean;

  // User state
  isMember: boolean;
  isLeader?: boolean;

  // Leaders
  leaders?: Array<{
    id: string;
    name: string;
    avatarUrl?: string;
    role?: string;
  }>;

  // Pinned posts
  pinnedPosts?: PinnedPost[];
  onPinnedPostClick?: (postId: string) => void;

  // Active tools
  activeTools?: SpaceTool[];
  onToolClick?: (toolId: string) => void;

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
  onPostSubmit?: (data: {
    content: string;
    spaceId: string;
    media: MediaFile[];
    anonymous: boolean;
  }) => void;
  isPostSubmitting?: boolean;

  // Settings
  allowAnonymous?: boolean;
  showComposer?: boolean;
}

/**
 * SpaceBoardTemplate
 *
 * Complete space board page with:
 * - Header (join/leave, share)
 * - Composer button (opens modal)
 * - Pinned posts stack
 * - Feed with infinite scroll
 * - Right rail (about, tools) - desktop only
 * - Mobile: single scroll (no tabs)
 */
export const SpaceBoardTemplate = React.forwardRef<HTMLDivElement, SpaceBoardTemplateProps>(
  (
    {
      spaceId,
      spaceName,
      spaceIcon,
      spaceColor,
      spaceDescription,
      memberCount,
      isPublic,
      isMember,
      isLeader = false,
      leaders = [],
      pinnedPosts = [],
      onPinnedPostClick,
      activeTools = [],
      onToolClick,
      feedItems,
      renderFeedItem,
      onLoadMore,
      hasMore = false,
      isLoading = false,
      onJoin,
      onLeave,
      onShare,
      onPostSubmit,
      isPostSubmitting = false,
      allowAnonymous = false,
      showComposer = true,
      className,
      ...props
    },
    ref
  ) => {
    const [composerOpen, setComposerOpen] = React.useState(false);

    const normalizedLeaders = React.useMemo(
      () =>
        leaders.map((leader) => ({
          ...leader,
          role: leader.role ?? "Leader",
        })),
      [leaders],
    );

    const spaceAboutData: SpaceAboutData = {
      spaceId,
      description: spaceDescription,
      memberCount,
      leaders: normalizedLeaders,
      isPublic,
      isMember,
    };

    return (
      <div
        ref={ref}
        className={cn('flex min-h-screen flex-col bg-[var(--hive-background-primary)]', className)}
        {...props}
      >
        {/* Header */}
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
        <div className="flex flex-1">
          {/* Center Column - Feed */}
          <main className="flex-1 px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-6">
              {/* Composer Button */}
              {showComposer && isMember && (
                <Button
                  variant="secondary"
                  className="w-full justify-start text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]"
                  onClick={() => setComposerOpen(true)}
                >
                  <span className="text-left">Share something with the space...</span>
                </Button>
              )}

              {/* Pinned Posts Stack */}
              {pinnedPosts.length > 0 && (
                <div className="space-y-2">
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

          {/* Right Rail - Desktop Only */}
          <aside className="hidden w-80 shrink-0 space-y-4 border-l border-[var(--hive-border-primary)] p-4 lg:block">
            {/* About Widget */}
            <SpaceAboutWidget
              data={spaceAboutData}
              onJoin={!isMember && onJoin ? () => onJoin(spaceId) : undefined}
              onLeave={isMember && onLeave ? () => onLeave(spaceId) : undefined}
            />

            {/* Active Tools Widget */}
            {activeTools.length > 0 && (
              <SpaceToolsWidget
                data={{
                  spaceId,
                  tools: activeTools,
                  hasMore: activeTools.length > 3,
                }}
                onToolClick={onToolClick}
              />
            )}
          </aside>
        </div>

        {/* Post Composer Modal */}
        {isMember && (
          <SpacePostComposer
            spaceId={spaceId}
            spaceName={spaceName}
            spaceIcon={spaceIcon}
            spaceColor={spaceColor}
            open={composerOpen}
            onOpenChange={setComposerOpen}
            allowAnonymous={allowAnonymous}
            onSubmit={onPostSubmit}
            isSubmitting={isPostSubmitting}
          />
        )}
      </div>
    );
  }
);

SpaceBoardTemplate.displayName = 'SpaceBoardTemplate';
