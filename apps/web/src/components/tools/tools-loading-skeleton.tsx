import { Skeleton, HiveCard } from '@hive/ui';

export function ToolsLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)]">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-b from-[var(--hive-background-secondary)] to-[var(--hive-background-primary)] border-b border-[var(--hive-border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center space-y-4">
            <Skeleton className="h-12 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 max-w-full mx-auto" />
            <div className="flex justify-center gap-3 pt-4">
              <Skeleton className="h-11 w-36 rounded-lg" />
              <Skeleton className="h-11 w-44 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-3">
            <Skeleton className="flex-1 h-12 rounded-lg" />
            <Skeleton className="h-12 w-32 rounded-lg" />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-28 rounded-lg flex-shrink-0" />
            ))}
          </div>
        </div>

        {/* Featured Tools Section */}
        <section className="mb-12">
          <div className="mb-6">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-80" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <FeaturedToolSkeleton key={i} />
            ))}
          </div>
        </section>

        {/* All Tools Section */}
        <section>
          <div className="mb-6">
            <Skeleton className="h-7 w-40 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <ToolCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function FeaturedToolSkeleton() {
  return (
    <HiveCard className="p-6 space-y-4 relative overflow-hidden">
      {/* Featured Badge */}
      <div className="absolute top-4 right-4">
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* Icon */}
      <Skeleton className="h-16 w-16 rounded-xl" />

      {/* Title and Description */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 pt-4 border-t border-[var(--hive-border-subtle)]">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
    </HiveCard>
  );
}

function ToolCardSkeleton() {
  return (
    <HiveCard className="p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      {/* Title and Description */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Tags */}
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-4 pt-2 text-sm">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-9 flex-1 rounded-lg" />
        <Skeleton className="h-9 w-9 rounded-lg" />
      </div>
    </HiveCard>
  );
}

// Compact version for list views
export function ToolsListLoadingSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <HiveCard key={i} className="p-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />

            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <div className="flex gap-3">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>

            <Skeleton className="h-9 w-24 rounded-lg flex-shrink-0" />
          </div>
        </HiveCard>
      ))}
    </div>
  );
}