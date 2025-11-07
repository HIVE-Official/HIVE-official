'use client';

/**
 * FeedRitualBanner - Ritual promotion banner for feed
 *
 * Features:
 * - Full-width ritual promotion card
 * - Gold accent (one of the allowed use cases!)
 * - Progress bar showing participation
 * - CTA button to join ritual
 * - Sparkles icon for ritual identity
 *
 * Usage:
 * ```tsx
 * import { FeedRitualBanner } from '@hive/ui';
 *
 * <FeedRitualBanner
 *   title="Morning Check-in"
 *   description="Start your day with 2 minutes of reflection"
 *   progress={65}
 *   totalParticipants={432}
 *   onJoin={() => handleJoinRitual()}
 *   isParticipating={false}
 * />
 * ```
 */

import * as React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../atoms/button';
import { Progress } from '../atoms/progress';
import { SparklesIcon, UsersIcon, CheckIcon } from '../atoms/icon-library';

export interface FeedRitualBannerProps {
  /**
   * Ritual title
   */
  title: string;

  /**
   * Ritual description
   */
  description: string;

  /**
   * Participation progress (0-100)
   */
  progress: number;

  /**
   * Total number of participants
   */
  totalParticipants: number;

  /**
   * Whether current user is participating
   */
  isParticipating: boolean;

  /**
   * Callback when user clicks join/participate
   */
  onJoin: () => void;

  /**
   * Optional ritual icon URL
   */
  iconUrl?: string;

  /**
   * Additional class names
   */
  className?: string;

  /**
   * Loading state for join action
   */
  isLoading?: boolean;
}

export const FeedRitualBanner = React.forwardRef<HTMLDivElement, FeedRitualBannerProps>(
  (
    {
      title,
      description,
      progress,
      totalParticipants,
      isParticipating,
      onJoin,
      iconUrl,
      className,
      isLoading = false,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'group relative overflow-hidden rounded-xl border border-[var(--hive-brand-primary)]/30 bg-gradient-to-br from-[var(--hive-brand-primary)]/10 via-[var(--hive-background-secondary)] to-[var(--hive-background-secondary)] p-4 shadow-lg transition-all hover:shadow-xl',
          className
        )}
      >
        {/* Gold accent glow (subtle) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--hive-brand-primary)]/5 to-transparent opacity-50" />

        <div className="relative space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              {/* Icon */}
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] shadow-lg">
                {iconUrl ? (
                  <img
                    src={iconUrl}
                    alt=""
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                ) : (
                  <SparklesIcon className="h-6 w-6 text-[var(--hive-brand-primary-text)]" />
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-[var(--hive-text-primary)] line-clamp-1">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-[var(--hive-text-secondary)] line-clamp-2">
                  {description}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={onJoin}
              disabled={isLoading}
              variant={isParticipating ? 'outline' : 'brand'}
              size="md"
              className="flex-shrink-0"
            >
              {isParticipating ? (
                <>
                  <CheckIcon className="mr-2 h-4 w-4" />
                  Participating
                </>
              ) : (
                'Join Ritual'
              )}
            </Button>
          </div>

          {/* Progress Section */}
          <div className="space-y-2">
            {/* Progress bar */}
            <Progress
              value={progress}
              className="h-2 bg-[var(--hive-background-tertiary)]"
              indicatorClassName="bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)]"
            />

            {/* Stats */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-[var(--hive-text-secondary)]">
                <UsersIcon className="h-3.5 w-3.5" />
                <span>
                  <span className="font-semibold text-[var(--hive-text-primary)]">
                    {totalParticipants.toLocaleString()}
                  </span>{' '}
                  {totalParticipants === 1 ? 'student' : 'students'} participating
                </span>
              </div>

              <div className="font-medium text-[var(--hive-brand-primary)]">
                {progress}% complete
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

FeedRitualBanner.displayName = 'FeedRitualBanner';
