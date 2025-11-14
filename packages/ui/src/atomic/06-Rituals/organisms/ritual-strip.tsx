'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RitualProgressBar } from '../molecules/ritual-progress-bar';
import { Button } from '../../00-Global/atoms';
import { ChevronRight, Sparkles } from 'lucide-react';

export interface RitualStripProps extends React.HTMLAttributes<HTMLDivElement> {
  ritual: {
    id: string;
    name: string;
    description: string;
    icon?: string;
    progress: number; // 0-100
    participantCount: number;
    timeRemaining?: string; // e.g., "2d 5h"
    isParticipating: boolean;
  };
  onJoin?: () => void;
  onViewDetails?: () => void;
  variant?: 'default' | 'compact';
  showProgress?: boolean;
}

/**
 * RitualStrip
 *
 * Horizontal feed banner for active campus rituals.
 * Shows progress bar, participant count, and join/view CTA.
 * Gold gradient background with glow effect.
 */
export const RitualStrip = React.forwardRef<HTMLDivElement, RitualStripProps>(
  (
    {
      ritual,
      onJoin,
      onViewDetails,
      variant = 'default',
      showProgress = true,
      className,
      ...props
    },
    ref
  ) => {
    const isCompact = variant === 'compact';

    return (
      <div
        ref={ref}
        className={cn(
          'group relative overflow-hidden rounded-2xl border transition-all duration-240',
          // Gold gradient background
          'border-[var(--hive-brand-primary)]/50 bg-gradient-to-br from-[var(--hive-brand-primary)]/[0.12] via-[var(--hive-brand-secondary)]/[0.08] to-transparent',
          // Gold glow
          'shadow-[0_0_24px_rgba(255,215,0,0.15)]',
          'hover:shadow-[0_0_32px_rgba(255,215,0,0.2)]',
          className
        )}
        {...props}
      >
        {/* Gold shimmer effect */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[var(--hive-brand-primary)]/[0.08] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className={cn('relative p-4', isCompact ? 'py-3' : 'p-4')}>
          {/* Header Row */}
          <div className="mb-3 flex items-start gap-3">
            {/* Icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] text-2xl shadow-lg">
              {ritual.icon || <Sparkles className="h-6 w-6 text-black" />}
            </div>

            {/* Title + Meta */}
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold text-[var(--hive-text-primary)]">
                {ritual.name}
              </h3>
              {!isCompact && (
                <p className="text-sm text-[var(--hive-text-secondary)]">
                  {ritual.description}
                </p>
              )}
              <div className="flex items-center gap-3 text-xs text-[var(--hive-text-tertiary)]">
                <span>{ritual.participantCount.toLocaleString()} participants</span>
                {ritual.timeRemaining && (
                  <>
                    <span>•</span>
                    <span>{ritual.timeRemaining} left</span>
                  </>
                )}
              </div>
            </div>

            {/* Join/View Button */}
            <motion.div
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <Button
                size="sm"
                variant={ritual.isParticipating ? 'ghost' : 'default'}
                onClick={ritual.isParticipating ? onViewDetails : onJoin}
                className={cn(
                  'shrink-0',
                  !ritual.isParticipating && 'bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] text-black hover:opacity-90'
                )}
              >
                {ritual.isParticipating ? (
                  <>
                    View
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  'Join Ritual'
                )}
              </Button>
            </motion.div>
          </div>

          {/* Progress Bar */}
          {showProgress && (
            <RitualProgressBar
              progress={ritual.progress}
              label={`${ritual.progress}% complete`}
              variant="compact"
            />
          )}
        </div>
      </div>
    );
  }
);

RitualStrip.displayName = 'RitualStrip';
