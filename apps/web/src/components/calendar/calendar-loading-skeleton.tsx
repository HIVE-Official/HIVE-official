import { Skeleton, Card } from '@hive/ui';

export function CalendarLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)]">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-40 bg-[var(--hive-background-primary)]/90 backdrop-blur border-b border-[var(--hive-border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-9 w-40" />

            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </div>

          {/* View Mode Tabs */}
          <div className="flex gap-2 mt-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-20 rounded-lg" />
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Calendar Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-48" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <Skeleton className="h-9 w-24 rounded-lg" />
                <Skeleton className="h-9 w-9 rounded-lg" />
              </div>
            </div>

            {/* Calendar Grid */}
            <Card className="p-6">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, i) => (
                  <CalendarDaySkeleton key={i} hasEvents={i % 3 === 0} />
                ))}
              </div>
            </Card>

            {/* Upcoming Events List */}
            <div className="space-y-4">
              <Skeleton className="h-7 w-44" />
              {Array.from({ length: 3 }).map((_, i) => (
                <EventItemSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mini Calendar */}
            <Card className="p-4">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-8 rounded" />
                ))}
              </div>
            </Card>

            {/* Integrations */}
            <Card className="p-4">
              <Skeleton className="h-6 w-36 mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-8 w-16 rounded-full" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Event Types Filter */}
            <Card className="p-4">
              <Skeleton className="h-6 w-28 mb-4" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function CalendarDaySkeleton({ hasEvents }: { hasEvents: boolean }) {
  return (
    <div className="aspect-square p-2 space-y-1">
      <Skeleton className="h-6 w-6" />
      {hasEvents && (
        <div className="space-y-1">
          <Skeleton className="h-1 w-full rounded-full" />
          <Skeleton className="h-1 w-3/4 rounded-full" />
        </div>
      )}
    </div>
  );
}

function EventItemSkeleton() {
  return (
    <Card className="p-4">
      <div className="flex gap-4">
        {/* Time indicator */}
        <div className="flex-shrink-0">
          <Skeleton className="h-12 w-12 rounded-lg" />
        </div>

        {/* Event details */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 flex-shrink-0">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>
    </Card>
  );
}