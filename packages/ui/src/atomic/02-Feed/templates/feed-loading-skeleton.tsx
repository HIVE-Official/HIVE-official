'use client';

import * as React from 'react';
import { cn } from '../../../lib/utils';
import { Skeleton } from '../../00-Global/atoms/skeleton';

export interface FeedLoadingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  variant?: 'post' | 'event' | 'tool' | 'mixed';
}

const PostSkeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'flex flex-col gap-4 rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default) 80%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 94%,transparent)] p-6',
      className
    )}
  >
    {/* Header */}
    <div className="flex items-start gap-3">
      <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>

    {/* Content */}
    <div className="space-y-2">
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>

    {/* Actions */}
    <div className="flex items-center gap-4 pt-2">
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-8 w-16" />
    </div>
  </div>
);

const EventSkeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'flex flex-col overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default) 70%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 96%,transparent)]',
      className
    )}
  >
    {/* Cover Image */}
    <Skeleton className="h-48 w-full rounded-none" />

    {/* Content */}
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-16" />
      </div>

      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />

      <div className="flex items-center justify-between gap-4 border-t border-[color-mix(in_srgb,var(--hive-border-default) 55%,transparent)] pt-4">
        <Skeleton className="h-8 w-24" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-16" />
        </div>
      </div>
    </div>
  </div>
);

const ToolSkeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'flex flex-col gap-5 rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default) 78%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 96%,transparent)] p-6',
      className
    )}
  >
    {/* Header */}
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <Skeleton className="h-4 w-12" />
    </div>

    {/* Content */}
    <div className="space-y-3">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex items-center gap-3 pt-1">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between gap-3 border-t border-[color-mix(in_srgb,var(--hive-border-default) 40%,transparent)] pt-4">
      <Skeleton className="h-4 w-16" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  </div>
);

export const FeedLoadingSkeleton = React.forwardRef<HTMLDivElement, FeedLoadingSkeletonProps>(
  ({ count = 5, variant = 'mixed', className, ...props }, ref) => {
    const renderSkeleton = (index: number) => {
      if (variant === 'post') {
        return <PostSkeleton key={index} />;
      }
      if (variant === 'event') {
        return <EventSkeleton key={index} />;
      }
      if (variant === 'tool') {
        return <ToolSkeleton key={index} />;
      }

      // Mixed: Alternate between different types
      const types = ['post', 'post', 'event', 'tool'];
      const type = types[index % types.length];

      switch (type) {
        case 'event':
          return <EventSkeleton key={index} />;
        case 'tool':
          return <ToolSkeleton key={index} />;
        default:
          return <PostSkeleton key={index} />;
      }
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading feed"
        className={cn('flex flex-col gap-4', className)}
        {...props}
      >
        {Array.from({ length: count }).map((_, index) => renderSkeleton(index))}
      </div>
    );
  }
);

FeedLoadingSkeleton.displayName = 'FeedLoadingSkeleton';
