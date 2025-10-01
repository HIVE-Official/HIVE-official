'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Feed Composer - Create new posts in the feed
 *
 * Features:
 * - Text input area (auto-growing)
 * - Media upload toolbar
 * - Space selector
 * - Privacy selector
 * - Character counter
 * - Submit button
 */

const feedComposerVariants = cva(
  'w-full border rounded-lg p-4 bg-[var(--hive-surface-primary)]',
  {
    variants: {
      variant: {
        default: 'border-[var(--hive-border-default)]',
        focused: 'border-[var(--hive-brand-primary)] shadow-lg',
      },
      size: {
        compact: 'max-w-[600px]',
        full: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'compact',
    },
  }
);

export interface FeedComposerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof feedComposerVariants> {
  placeholder?: string;
  maxLength?: number;
  selectedSpace?: string;
  isPrivate?: boolean;
  isSubmitting?: boolean;
  onSubmit?: (content: string) => void;
  onCancel?: () => void;
}

export const FeedComposer = React.forwardRef<HTMLDivElement, FeedComposerProps>(
  (
    {
      className,
      variant,
      size,
      placeholder = "What's happening?",
      maxLength = 5000,
      selectedSpace = 'Select a space',
      isPrivate = false,
      isSubmitting = false,
      onSubmit,
      onCancel,
      ...props
    },
    ref
  ) => {
    const [content, setContent] = React.useState('');
    const [isFocused, setIsFocused] = React.useState(false);

    const charCount = content.length;
    const isOverLimit = charCount > maxLength;
    const canSubmit = charCount > 0 && !isOverLimit && !isSubmitting;

    return (
      <div
        ref={ref}
        className={cn(
          feedComposerVariants({ variant: isFocused ? 'focused' : variant, size }),
          className
        )}
        {...props}
      >
        {/* Author info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[var(--hive-surface-secondary)] flex items-center justify-center">
            <span>👤</span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-[var(--hive-text-primary)]">Your Name</p>
            <p className="text-sm text-[var(--hive-text-secondary)]">@yourhandle</p>
          </div>
        </div>

        {/* Text input */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            'w-full min-h-[120px] bg-transparent border-none outline-none resize-none',
            'text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)]',
            'text-lg'
          )}
          disabled={isSubmitting}
        />

        {/* Toolbar */}
        <div className="border-t border-[var(--hive-border-default)] pt-3 mt-3">
          <div className="flex items-center gap-2 mb-3">
            <button
              type="button"
              className="p-2 hover:bg-[var(--hive-surface-secondary)] rounded transition-colors"
              title="Add photo"
            >
              <span className="text-xl">📷</span>
            </button>
            <button
              type="button"
              className="p-2 hover:bg-[var(--hive-surface-secondary)] rounded transition-colors"
              title="Add video"
            >
              <span className="text-xl">🎥</span>
            </button>
            <button
              type="button"
              className="p-2 hover:bg-[var(--hive-surface-secondary)] rounded transition-colors"
              title="Add link"
            >
              <span className="text-xl">🔗</span>
            </button>
            <button
              type="button"
              className="p-2 hover:bg-[var(--hive-surface-secondary)] rounded transition-colors"
              title="Create event"
            >
              <span className="text-xl">📅</span>
            </button>
            <button
              type="button"
              className="p-2 hover:bg-[var(--hive-surface-secondary)] rounded transition-colors"
              title="Create poll"
            >
              <span className="text-xl">📊</span>
            </button>
            <button
              type="button"
              className="p-2 hover:bg-[var(--hive-surface-secondary)] rounded transition-colors"
              title="Add emoji"
            >
              <span className="text-xl">😊</span>
            </button>
          </div>

          {/* Space & Privacy selectors + Submit */}
          <div className="flex items-center gap-3">
            {/* Space selector */}
            <div className="flex-1 flex items-center gap-2">
              <button
                type="button"
                className="px-3 py-1.5 rounded bg-[var(--hive-surface-secondary)] hover:bg-[var(--hive-surface-tertiary)] transition-colors text-sm"
              >
                <span className="mr-1">📍</span>
                {selectedSpace}
              </button>

              {/* Privacy toggle */}
              <button
                type="button"
                className="px-3 py-1.5 rounded bg-[var(--hive-surface-secondary)] hover:bg-[var(--hive-surface-tertiary)] transition-colors text-sm"
              >
                <span className="mr-1">{isPrivate ? '🔒' : '🌍'}</span>
                {isPrivate ? 'Private' : 'Public'}
              </button>
            </div>

            {/* Character counter */}
            <span
              className={cn(
                'text-sm',
                isOverLimit
                  ? 'text-[var(--hive-error)]'
                  : 'text-[var(--hive-text-tertiary)]'
              )}
            >
              {charCount}/{maxLength}
            </span>

            {/* Submit button */}
            <button
              type="button"
              onClick={() => onSubmit?.(content)}
              disabled={!canSubmit}
              className={cn(
                'px-6 py-2 rounded-lg font-semibold transition-colors',
                canSubmit
                  ? 'bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] hover:opacity-90'
                  : 'bg-[var(--hive-surface-secondary)] text-[var(--hive-text-tertiary)] cursor-not-allowed'
              )}
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>

        {/* Helper text */}
        <div className="mt-3 p-2 bg-[var(--hive-surface-tertiary)] rounded text-xs text-[var(--hive-text-tertiary)]">
          ⚠️ SKELETON: Actual UI/UX to be designed in Storybook review
        </div>
      </div>
    );
  }
);

FeedComposer.displayName = 'FeedComposer';
