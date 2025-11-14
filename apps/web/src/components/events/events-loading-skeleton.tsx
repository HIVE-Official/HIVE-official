/**
 * Events Loading Skeleton - Temporary stub for MVP
 * Will be fully implemented post-launch
 */

import React from 'react';
import { Skeleton } from '@hive/ui';

export const EventsLoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="rounded-2xl bg-[var(--hive-background-secondary)] p-6">
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  );
};
