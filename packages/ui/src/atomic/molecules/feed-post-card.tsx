'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Feed Post Card - Displays a single post in the feed
 *
 * Required sections:
 * - Author info (avatar, name, timestamp)
 * - Space badge (which space it's from)
 * - Content (text, media)
 * - Engagement stats (likes, comments, shares)
 * - Action buttons (like, comment, share, menu)
 */

const feedPostCardVariants = cva(
  // Base styles - minimal skeleton
  'relative w-full border rounded-lg p-4 bg-[var(--hive-surface-primary)]',
  {
    variants: {
      variant: {
        default: 'border-[var(--hive-border-default)]',
        highlighted: 'border-[var(--hive-brand-primary)] shadow-lg',
      },
      size: {
        default: 'max-w-[600px]',
        full: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface FeedPostCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof feedPostCardVariants> {
  // Author
  authorName?: string;
  authorHandle?: string;
  authorAvatar?: string;
  timestamp?: string;

  // Space info
  spaceName?: string;
  spaceIcon?: string;

  // Content
  contentType?: 'text' | 'image' | 'video' | 'link' | 'event' | 'poll';
  textContent?: string;
  images?: string[];
  videoUrl?: string;
  linkPreview?: {
    title: string;
    description: string;
    image?: string;
    url: string;
  };

  // Engagement
  likeCount?: number;
  commentCount?: number;
  shareCount?: number;
  isLiked?: boolean;

  // States
  isLoading?: boolean;
  error?: string;

  // Actions
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onMenuClick?: () => void;
}

export const FeedPostCard = React.forwardRef<HTMLDivElement, FeedPostCardProps>(
  (
    {
      className,
      variant,
      size,
      authorName = 'Author Name',
      authorHandle = '@handle',
      authorAvatar,
      timestamp = '2h ago',
      spaceName,
      spaceIcon,
      contentType = 'text',
      textContent = 'This is placeholder post content. Actual UI/UX to be determined in Storybook.',
      images = [],
      videoUrl,
      linkPreview,
      likeCount = 0,
      commentCount = 0,
      shareCount = 0,
      isLiked = false,
      isLoading = false,
      error,
      onLike,
      onComment,
      onShare,
      onMenuClick,
      ...props
    },
    ref
  ) => {
    if (isLoading) {
      return (
        <div
          ref={ref}
          className={cn(feedPostCardVariants({ variant, size }), className)}
          {...props}
        >
          <div className="animate-pulse">
            <div className="h-10 bg-[var(--hive-surface-secondary)] rounded mb-4" />
            <div className="h-20 bg-[var(--hive-surface-secondary)] rounded mb-4" />
            <div className="h-8 bg-[var(--hive-surface-secondary)] rounded" />
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div
          ref={ref}
          className={cn(
            feedPostCardVariants({ variant, size }),
            'border-[var(--hive-error)]',
            className
          )}
          {...props}
        >
          <p className="text-[var(--hive-error)]">Error: {error}</p>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(feedPostCardVariants({ variant, size }), className)}
        {...props}
      >
        {/* SKELETON: Author Section */}
        <div className="flex items-center gap-3 mb-4">
          {/* Avatar placeholder */}
          <div className="w-10 h-10 rounded-full bg-[var(--hive-surface-secondary)] flex items-center justify-center">
            <span className="text-sm">👤</span>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[var(--hive-text-primary)]">
                {authorName}
              </span>
              <span className="text-sm text-[var(--hive-text-secondary)]">
                {authorHandle}
              </span>
              {spaceName && (
                <>
                  <span className="text-[var(--hive-text-tertiary)]">→</span>
                  <span className="text-sm text-[var(--hive-brand-primary)]">
                    {spaceName}
                  </span>
                </>
              )}
            </div>
            <span className="text-sm text-[var(--hive-text-tertiary)]">
              {timestamp}
            </span>
          </div>

          {/* Menu button */}
          <button
            type="button"
            onClick={onMenuClick}
            className="p-2 hover:bg-[var(--hive-surface-secondary)] rounded"
          >
            <span>⋯</span>
          </button>
        </div>

        {/* SKELETON: Content Section */}
        <div className="mb-4">
          {contentType === 'text' && (
            <p className="text-[var(--hive-text-primary)] whitespace-pre-wrap">
              {textContent}
            </p>
          )}

          {contentType === 'image' && images.length > 0 && (
            <div className="space-y-2">
              {textContent && (
                <p className="text-[var(--hive-text-primary)] mb-2">
                  {textContent}
                </p>
              )}
              <div className="bg-[var(--hive-surface-secondary)] rounded-lg p-8 text-center">
                <span className="text-4xl">🖼️</span>
                <p className="text-sm text-[var(--hive-text-secondary)] mt-2">
                  Image placeholder ({images.length} image{images.length > 1 ? 's' : ''})
                </p>
              </div>
            </div>
          )}

          {contentType === 'video' && (
            <div className="space-y-2">
              {textContent && (
                <p className="text-[var(--hive-text-primary)] mb-2">
                  {textContent}
                </p>
              )}
              <div className="bg-[var(--hive-surface-secondary)] rounded-lg p-8 text-center">
                <span className="text-4xl">🎥</span>
                <p className="text-sm text-[var(--hive-text-secondary)] mt-2">
                  Video placeholder
                </p>
              </div>
            </div>
          )}

          {contentType === 'link' && linkPreview && (
            <div className="space-y-2">
              {textContent && (
                <p className="text-[var(--hive-text-primary)] mb-2">
                  {textContent}
                </p>
              )}
              <div className="border border-[var(--hive-border-default)] rounded-lg p-4">
                <span className="text-2xl">🔗</span>
                <p className="font-semibold text-[var(--hive-text-primary)] mt-2">
                  {linkPreview.title}
                </p>
                <p className="text-sm text-[var(--hive-text-secondary)]">
                  {linkPreview.description}
                </p>
              </div>
            </div>
          )}

          {contentType === 'event' && (
            <div className="space-y-2">
              {textContent && (
                <p className="text-[var(--hive-text-primary)] mb-2">
                  {textContent}
                </p>
              )}
              <div className="bg-[var(--hive-surface-secondary)] rounded-lg p-4">
                <span className="text-2xl">📅</span>
                <p className="font-semibold text-[var(--hive-text-primary)] mt-2">
                  Event placeholder
                </p>
                <p className="text-sm text-[var(--hive-text-secondary)]">
                  Date • Time • Location
                </p>
              </div>
            </div>
          )}

          {contentType === 'poll' && (
            <div className="space-y-2">
              {textContent && (
                <p className="text-[var(--hive-text-primary)] mb-2">
                  {textContent}
                </p>
              )}
              <div className="bg-[var(--hive-surface-secondary)] rounded-lg p-4">
                <span className="text-2xl">📊</span>
                <p className="font-semibold text-[var(--hive-text-primary)] mt-2">
                  Poll placeholder
                </p>
                <p className="text-sm text-[var(--hive-text-secondary)]">
                  Option 1 | Option 2 | Option 3
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SKELETON: Engagement & Actions Section */}
        <div className="border-t border-[var(--hive-border-default)] pt-3">
          {/* Engagement counts */}
          {(likeCount > 0 || commentCount > 0 || shareCount > 0) && (
            <div className="flex items-center gap-4 text-sm text-[var(--hive-text-secondary)] mb-3">
              {likeCount > 0 && <span>{likeCount} likes</span>}
              {commentCount > 0 && <span>{commentCount} comments</span>}
              {shareCount > 0 && <span>{shareCount} shares</span>}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onLike}
              className={cn(
                'flex-1 py-2 px-4 rounded hover:bg-[var(--hive-surface-secondary)] transition-colors',
                isLiked && 'text-[var(--hive-brand-primary)]'
              )}
            >
              {isLiked ? '❤️' : '🤍'} Like
            </button>

            <button
              type="button"
              onClick={onComment}
              className="flex-1 py-2 px-4 rounded hover:bg-[var(--hive-surface-secondary)] transition-colors"
            >
              💬 Comment
            </button>

            <button
              type="button"
              onClick={onShare}
              className="flex-1 py-2 px-4 rounded hover:bg-[var(--hive-surface-secondary)] transition-colors"
            >
              🔄 Share
            </button>
          </div>
        </div>

        {/* Helper text for design */}
        <div className="mt-4 p-2 bg-[var(--hive-surface-tertiary)] rounded text-xs text-[var(--hive-text-tertiary)]">
          ⚠️ SKELETON: Actual UI/UX to be designed in Storybook review
        </div>
      </div>
    );
  }
);

FeedPostCard.displayName = 'FeedPostCard';
