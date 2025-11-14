'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Badge,
  Button,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
} from '../../00-Global/atoms';
import { FeedSpaceChip } from '../molecules/feed-space-chip';
import { FeedMediaPreview, type MediaItem } from '../molecules/feed-media-preview';
import type { FeedCardSpace } from './feed-card-post';

export type FeedEventStatus = 'upcoming' | 'today' | 'sold_out' | 'past';

export interface FeedCardEventMeta {
  scheduleLabel: string;
  locationLabel?: string;
  status: FeedEventStatus;
}

export interface FeedCardEventStats {
  attendingCount: number;
  capacity?: number;
  isAttending: boolean;
}

export interface FeedCardEventData {
  id: string;
  title: string;
  description?: string;
  space: FeedCardSpace;
  coverImage?: MediaItem;
  meta: FeedCardEventMeta;
  stats: FeedCardEventStats;
}

export interface FeedCardEventCallbacks {
  onViewDetails?: (eventId: string) => void;
  onToggleRsvp?: (eventId: string, nextValue: boolean) => void;
  onSpaceClick?: (spaceId: string) => void;
}

export interface FeedCardEventProps
  extends FeedCardEventCallbacks,
    React.HTMLAttributes<HTMLDivElement> {
  event: FeedCardEventData;
}

const statusBadgeCopy: Record<FeedEventStatus, string> = {
  upcoming: 'Upcoming',
  today: 'Today @ UB',
  sold_out: 'Full',
  past: 'Archive',
};

const statusBadgeTone: Record<FeedEventStatus, string> = {
  upcoming: 'bg-white/[0.04] text-[var(--hive-text-secondary)] border-white/[0.08]',
  today: 'bg-[var(--hive-brand-primary)]/10 text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/40',
  sold_out: 'bg-red-500/15 text-red-300 border-red-400/30',
  past: 'bg-white/[0.02] text-[var(--hive-text-tertiary)] border-white/[0.06]',
};

const getButtonLabel = (status: FeedEventStatus, isAttending: boolean) => {
  if (status === 'past') return 'View recap';
  if (status === 'sold_out') return 'Join waitlist';
  if (isAttending) return 'You’re going';
  return 'RSVP';
};

const isActionDisabled = (status: FeedEventStatus, isAttending: boolean) => {
  if (status === 'past') return false;
  if (status === 'sold_out') return false;
  return false;
};

export const FeedCardEvent = React.forwardRef<HTMLDivElement, FeedCardEventProps>(
  ({ event, onViewDetails, onToggleRsvp, onSpaceClick, className, ...props }, ref) => {
    const { coverImage, meta, stats, space } = event;
    const buttonLabel = getButtonLabel(meta.status, stats.isAttending);
    const disabled = isActionDisabled(meta.status, stats.isAttending);
    const capacityCopy =
      stats.capacity && stats.capacity > 0
        ? `${stats.attendingCount}/${stats.capacity} going`
        : `${stats.attendingCount} going`;

    return (
      <article
        ref={ref}
        role="article"
        className={cn(
          'group relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default) 70%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 96%,transparent)] shadow-[0_24px_45px_rgba(5,7,13,0.35)] transition-colors hover:border-[color-mix(in_srgb,var(--hive-border-default) 40%,transparent)]',
          className
        )}
        {...props}
      >
        {coverImage && (
          <div className="relative">
            <FeedMediaPreview media={[coverImage]} className="rounded-2xl rounded-b-none" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(5,7,13,0.65)] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
              <Badge className={cn('uppercase tracking-[0.2em]', statusBadgeTone[meta.status])}>
                {statusBadgeCopy[meta.status]}
              </Badge>
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
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 px-6 py-5">
          <header className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--hive-text-secondary)]">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/70">
                <ClockIcon className="h-3.5 w-3.5 text-[var(--hive-brand-primary)]" />
                {meta.scheduleLabel}
              </span>
              {meta.locationLabel && (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/55">
                  <MapPinIcon className="h-3.5 w-3.5 text-white/60" />
                  {meta.locationLabel}
                </span>
              )}
            </div>

            <h2 className="text-lg font-semibold leading-tight text-[var(--hive-text-primary)]">
              {event.title}
            </h2>

            {event.description && (
              <p className="text-sm leading-relaxed text-[var(--hive-text-secondary)] line-clamp-4">
                {event.description}
              </p>
            )}
          </header>

          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-[color-mix(in_srgb,var(--hive-border-default) 55%,transparent)] pt-4">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--hive-text-secondary)]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1 font-medium text-white/80">
                <UsersIcon className="h-4 w-4 text-[var(--hive-brand-primary)]" />
                {capacityCopy}
              </span>
              {stats.capacity && stats.capacity > 0 && (
                <span className="text-xs uppercase tracking-[0.16em] text-white/50">
                  {Math.max(stats.capacity - stats.attendingCount, 0)} spots left
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="md"
                variant={stats.isAttending ? 'secondary' : 'brand'}
                disabled={disabled}
                onClick={() => onToggleRsvp?.(event.id, !stats.isAttending)}
                className="min-w-[140px]"
              >
                {buttonLabel}
              </Button>
              <Button
                size="md"
                variant="ghost"
                onClick={() => onViewDetails?.(event.id)}
              >
                View
              </Button>
            </div>
          </footer>
        </div>
      </article>
    );
  }
);

FeedCardEvent.displayName = 'FeedCardEvent';

