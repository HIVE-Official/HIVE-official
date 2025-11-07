'use client';

import * as React from 'react';
import { Card } from '../../00-Global/atoms/card';
import { Skeleton } from '../../00-Global/atoms/skeleton';
import { cn } from '../../../lib/utils';

export interface RitualLoadingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'banner' | 'card' | 'detail';
}

export const RitualLoadingSkeleton: React.FC<RitualLoadingSkeletonProps> = ({
  variant = 'card',
  className,
  ...props
}) => {
  if (variant === 'banner') {
    return (
      <Card className={cn('border-white/10 bg-white/5 p-5', className)} {...props}>
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1">
            <Skeleton className="mb-2 h-5 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </Card>
    );
  }

  if (variant === 'detail') {
    return (
      <div className={cn('space-y-4', className)} {...props}>
        <Card className="border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="flex-1">
              <Skeleton className="mb-2 h-6 w-64" />
              <Skeleton className="h-4 w-96" />
            </div>
          </div>
          <Skeleton className="mb-4 h-24 w-full" />
          <div className="grid grid-cols-3 gap-3">
            <Skeleton className="h-16 rounded-lg" />
            <Skeleton className="h-16 rounded-lg" />
            <Skeleton className="h-16 rounded-lg" />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/5 p-6">
          <Skeleton className="mb-4 h-5 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </Card>
      </div>
    );
  }

  // Default: card variant
  return (
    <Card className={cn('border-white/10 bg-white/5 p-5', className)} {...props}>
      <div className="mb-3 flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1">
          <Skeleton className="mb-2 h-5 w-40" />
          <Skeleton className="h-3 w-56" />
        </div>
      </div>
      <Skeleton className="mb-3 h-16 w-full" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
    </Card>
  );
};
