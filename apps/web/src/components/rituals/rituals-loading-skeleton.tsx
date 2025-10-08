import { Skeleton, Card } from '@hive/ui';

export function RitualsLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)]">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-40 bg-[var(--hive-background-primary)]/90 backdrop-blur border-b border-[var(--hive-border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-5 w-96 max-w-full" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Active Rituals Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-72" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Ritual Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <RitualCardSkeleton key={i} />
            ))}
          </div>
        </section>

        {/* Upcoming Rituals Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Skeleton className="h-8 w-56 mb-2" />
              <Skeleton className="h-4 w-80" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <RitualCardSkeleton key={i} variant="upcoming" />
            ))}
          </div>
        </section>

        {/* Completed Rituals Section */}
        <section>
          <div className="mb-6">
            <Skeleton className="h-7 w-52 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>

          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <CompletedRitualSkeleton key={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function RitualCardSkeleton({ variant = 'active' }: { variant?: 'active' | 'upcoming' }) {
  return (
    <Card className="p-6 space-y-4">
      {/* Header with icon and badge */}
      <div className="flex items-start justify-between">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* Title and Description */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Progress Bar (only for active) */}
      {variant === 'active' && (
        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 pt-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-28" />
      </div>

      {/* Action Button */}
      <Skeleton className="h-10 w-full rounded-lg" />
    </Card>
  );
}

function CompletedRitualSkeleton() {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <Skeleton className="h-14 w-14 rounded-full flex-shrink-0" />

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-4 w-full max-w-md" />
          <div className="flex gap-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>

        {/* View Button */}
        <Skeleton className="h-9 w-24 rounded-lg flex-shrink-0" />
      </div>
    </Card>
  );
}