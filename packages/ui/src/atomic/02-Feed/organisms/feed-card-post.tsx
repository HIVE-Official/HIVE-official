'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
} from '../../00-Global/atoms';
import { FeedSpaceChip } from '../molecules/feed-space-chip';
import { FeedMediaPreview, type MediaItem } from '../molecules/feed-media-preview';
import {
  FeedPostActions,
  type FeedPostActionsProps,
} from '../molecules/feed-post-actions';

export interface FeedCardAuthor {
  id: string;
  name: string;
  avatarUrl?: string;
  role?: string;
  verified?: boolean;
}

export interface FeedCardSpace {
  id: string;
  name: string;
  color?: string;
  icon?: string;
}

export interface FeedCardPostStats {
  upvotes: number;
  comments: number;
  isUpvoted: boolean;
  isBookmarked: boolean;
}

export interface FeedCardPostContent {
  headline?: string;
  body?: string;
  media?: MediaItem[];
  tags?: string[];
}

export interface FeedCardPostMeta {
  timeAgo: string;
  isPinned?: boolean;
  isEdited?: boolean;
}

export interface FeedCardPostData {
  id: string;
  author: FeedCardAuthor;
  space: FeedCardSpace;
  content: FeedCardPostContent;
  stats: FeedCardPostStats;
  meta: FeedCardPostMeta;
}

export interface FeedCardPostCallbacks {
  onOpen?: (postId: string) => void;
  onSpaceClick?: (spaceId: string) => void;
  onUpvote?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

type ArticleElement = React.ComponentPropsWithoutRef<"article">;

export interface FeedCardPostProps
  extends FeedCardPostCallbacks,
    ArticleElement {
  post: FeedCardPostData;
  layout?: 'default' | 'cozy';
  showSpaceChip?: boolean;
}

const clampCopy = (copy?: string) => copy?.trim();

export const FeedCardPost = React.forwardRef<HTMLElement, FeedCardPostProps>(
  (
    {
      post,
      layout = 'default',
      className,
      showSpaceChip = true,
      onOpen,
      onSpaceClick,
      onUpvote,
      onComment,
      onBookmark,
      onShare,
      ...props
    },
    ref
  ) => {
    const { author, content, space, stats, meta } = post;
    const media = content.media ?? [];
    const hasMedia = media.length > 0;

    const actions: FeedPostActionsProps = {
      upvotes: stats.upvotes,
      comments: stats.comments,
      isUpvoted: stats.isUpvoted,
      isBookmarked: stats.isBookmarked,
      onUpvote: () => onUpvote?.(post.id),
      onComment: () => onComment?.(post.id),
      onBookmark: () => onBookmark?.(post.id),
      onShare: () => onShare?.(post.id),
    };

    const handleCardClick = () => {
      onOpen?.(post.id);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      // Enter or Space to open post
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onOpen?.(post.id);
      }
      // L to upvote (like)
      else if (event.key === 'l' || event.key === 'L') {
        event.preventDefault();
        event.stopPropagation();
        onUpvote?.(post.id);
      }
      // C to comment
      else if (event.key === 'c' || event.key === 'C') {
        event.preventDefault();
        event.stopPropagation();
        onComment?.(post.id);
      }
      // B to bookmark
      else if (event.key === 'b' || event.key === 'B') {
        event.preventDefault();
        event.stopPropagation();
        onBookmark?.(post.id);
      }
      // S to share
      else if (event.key === 's' || event.key === 'S') {
        event.preventDefault();
        event.stopPropagation();
        onShare?.(post.id);
      }
    };

    const cardPadding = layout === 'cozy' ? 'p-4' : 'p-6';

    // Generate accessible description
    const ariaLabel = `Post by ${author.name} in ${space.name}${content.headline ? `: ${content.headline}` : ''}. ${stats.upvotes} upvotes, ${stats.comments} comments. Posted ${meta.timeAgo}.`;

    return (
      <article
        ref={ref}
        tabIndex={0}
        role="article"
        aria-label={ariaLabel}
        aria-describedby={`post-content-${post.id}`}
        className={cn(
          'group relative rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default) 80%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 94%,transparent)] backdrop-blur-sm transition-colors hover:border-[color-mix(in_srgb,var(--hive-border-default) 40%,transparent)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)]',
          cardPadding,
          className
        )}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {meta.isPinned && (
          <Badge
            variant="outline"
            className="absolute -top-3 left-6 bg-[var(--hive-background-primary)] text-[var(--hive-brand-primary)] shadow-md"
          >
            Pinned
          </Badge>
        )}

        <header className="flex items-start gap-3">
          <Avatar className="h-10 w-10 shrink-0 border border-[color-mix(in_srgb,var(--hive-border-default) 70%,transparent)]">
            <AvatarImage src={author.avatarUrl} alt={author.name} />
            <AvatarFallback>{author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex flex-1 flex-col gap-2 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-[var(--hive-text-primary)]">
                {author.name}
              </span>
              {author.role && (
                <span className="rounded-full border border-[color-mix(in_srgb,var(--hive-border-default) 40%,transparent)] px-2 py-0.5 text-[11px] uppercase tracking-wide text-[var(--hive-text-tertiary)]">
                  {author.role}
                </span>
              )}
              <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--hive-text-tertiary)]">
                {meta.timeAgo}
                {meta.isEdited ? ' • Edited' : ''}
              </span>
            </div>
            {showSpaceChip && (
              <FeedSpaceChip
                spaceId={space.id}
                spaceName={space.name}
                spaceColor={space.color}
                spaceIcon={space.icon}
                onClick={
                  onSpaceClick
                    ? (event) => {
                        event.stopPropagation();
                        onSpaceClick(space.id);
                      }
                    : undefined
                }
              />
            )}
          </div>
        </header>

        <div id={`post-content-${post.id}`} className="mt-4 space-y-3">
          {content.headline && (
            <h2 className="text-base font-semibold leading-snug text-[var(--hive-text-primary)]">
              {content.headline}
            </h2>
          )}
          {clampCopy(content.body) && (
            <p
              className={cn(
                'text-sm leading-relaxed text-[var(--hive-text-secondary)]',
                content.body && content.body.length > 220 ? 'line-clamp-5' : 'line-clamp-3'
              )}
            >
              {content.body}
            </p>
          )}
          {hasMedia && (
            <FeedMediaPreview media={media} className="mt-2" />
          )}
          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {content.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[color-mix(in_srgb,var(--hive-border-default) 50%,transparent)] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--hive-text-tertiary)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <footer className="mt-5">
          <FeedPostActions className="-ml-2" {...actions} />
        </footer>
      </article>
    );
  }
);

FeedCardPost.displayName = 'FeedCardPost';
