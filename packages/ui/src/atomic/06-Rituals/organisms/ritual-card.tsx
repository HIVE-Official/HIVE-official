'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { RitualProgressBar } from '../molecules/ritual-progress-bar';
import { Button } from '../../00-Global/atoms';
import { Calendar, Users, Clock, CheckCircle2 } from 'lucide-react';

export interface RitualCardProps extends React.HTMLAttributes<HTMLDivElement> {
  ritual: {
    id: string;
    name: string;
    description: string;
    icon?: string;
    progress: number; // 0-100
    participantCount: number;
    duration: string; // e.g., "7 days", "2 weeks"
    startDate?: string; // e.g., "Nov 1"
    endDate?: string; // e.g., "Nov 7"
    frequency: string; // e.g., "Daily", "Weekdays"
    isParticipating: boolean;
    isCompleted?: boolean;
  };
  onJoin?: () => void;
  onViewDetails?: () => void;
  variant?: 'default' | 'featured';
}

/**
 * RitualCard
 *
 * Vertical card for displaying ritual details.
 * Used in grid layouts on rituals page.
 * - Gold gradient for featured
 * - Progress bar
 * - Participant count
 * - Duration and frequency
 */
export const RitualCard = React.forwardRef<HTMLDivElement, RitualCardProps>(
  (
    {
      ritual,
      onJoin,
      onViewDetails,
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const isFeatured = variant === 'featured';

    return (
      <div
        ref={ref}
        className={cn(
          'group relative overflow-hidden rounded-2xl border transition-all duration-240',
          isFeatured
            ? // Featured: Gold gradient
              'border-[var(--hive-brand-primary)]/50 bg-gradient-to-br from-[var(--hive-brand-primary)]/[0.12] via-[var(--hive-brand-secondary)]/[0.08] to-transparent shadow-[0_0_24px_rgba(255,215,0,0.15)] hover:shadow-[0_0_32px_rgba(255,215,0,0.2)]'
            : // Default: Subtle border
              'border-[var(--hive-border-primary)] bg-[var(--hive-background-secondary)] hover:border-[var(--hive-border-secondary)]',
          ritual.isCompleted && 'opacity-75',
          className
        )}
        {...props}
      >
        {/* Gold shimmer for featured */}
        {isFeatured && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[var(--hive-brand-primary)]/[0.08] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        )}

        <div className="relative p-5 space-y-4">
          {/* Header */}
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div
              className={cn(
                'flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-3xl',
                isFeatured
                  ? 'bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] shadow-lg'
                  : 'bg-[var(--hive-background-tertiary)]'
              )}
            >
              {ritual.icon || '✨'}
            </div>

            {/* Completion Badge */}
            {ritual.isCompleted && (
              <div className="ml-auto flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-400">
                <CheckCircle2 className="h-3 w-3" />
                Completed
              </div>
            )}
          </div>

          {/* Title + Description */}
          <div className="space-y-2">
            <h3 className="font-semibold text-[var(--hive-text-primary)]">
              {ritual.name}
            </h3>
            <p className="text-sm text-[var(--hive-text-secondary)] line-clamp-2">
              {ritual.description}
            </p>
          </div>

          {/* Meta Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs text-[var(--hive-text-tertiary)]">
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              <span>{ritual.participantCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{ritual.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{ritual.frequency}</span>
            </div>
            {ritual.endDate && (
              <div className="flex items-center gap-1.5">
                <span>Ends {ritual.endDate}</span>
              </div>
            )}
          </div>

          {/* Progress */}
          {!ritual.isCompleted && (
            <RitualProgressBar
              progress={ritual.progress}
              label={`${ritual.progress}% complete`}
              variant="compact"
            />
          )}

          {/* Action Button */}
          <Button
            size="sm"
            variant={ritual.isParticipating ? 'ghost' : 'default'}
            className={cn(
              'w-full',
              !ritual.isParticipating &&
                isFeatured &&
                'bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] text-black hover:opacity-90'
            )}
            onClick={ritual.isParticipating || ritual.isCompleted ? onViewDetails : onJoin}
            disabled={ritual.isCompleted}
          >
            {ritual.isCompleted
              ? 'View Results'
              : ritual.isParticipating
              ? 'View Details'
              : 'Join Ritual'}
          </Button>
        </div>
      </div>
    );
  }
);

RitualCard.displayName = 'RitualCard';
