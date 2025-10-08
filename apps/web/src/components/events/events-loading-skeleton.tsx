import { Skeleton, Card } from '@hive/ui';

export function EventsLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)]">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-40 bg-[var(--hive-background-primary)]/90 backdrop-blur border-b border-[var(--hive-border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-9 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-11 w-36 rounded-lg" />
          </div>

          {/* Filters */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-28 rounded-lg flex-shrink-0" />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Featured Events */}
        <section className="mb-12">
          <div className="mb-6">
            <Skeleton className="h-8 w-52 mb-2" />
            <Skeleton className="h-4 w-80" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <FeaturedEventSkeleton key={i} />
            ))}
          </div>
        </section>

        {/* Upcoming Events List */}
        <section>
          <div className="mb-6">
            <Skeleton className="h-7 w-44 mb-2" />
            <Skeleton className="h-4 w-72" />
          </div>

          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function FeaturedEventSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Event Image/Banner */}
      <Skeleton className="h-48 w-full rounded-none" />

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Date Badge */}
        <Skeleton className="h-8 w-32 rounded-full" />

        {/* Title and Description */}
        <div className="space-y-2">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Event Details */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center gap-6 pt-4 border-t border-[var(--hive-border-subtle)]">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-20" />
        </div>

        {/* Action Button */}
        <Skeleton className="h-11 w-full rounded-lg" />
      </div>
    </Card>
  );
}

function EventCardSkeleton() {
  return (
    <Card className="p-4">
      <div className="flex gap-4">
        {/* Date Box */}
        <div className="flex-shrink-0">
          <Skeleton className="h-16 w-16 rounded-lg" />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          {/* Title */}
          <Skeleton className="h-6 w-3/4" />

          {/* Details */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 pt-1">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          <Skeleton className="h-9 w-24 rounded-lg" />
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>
      </div>
    </Card>
  );
}