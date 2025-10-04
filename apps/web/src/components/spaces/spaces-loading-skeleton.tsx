import { Skeleton, Card, Grid } from '@hive/ui';

export function SpacesLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <Skeleton className="h-8 w-48" />

            <div className="flex items-center gap-3 flex-1 max-w-2xl">
              <Skeleton className="flex-1 h-11" />
              <Skeleton className="h-11 w-28" />
              <Skeleton className="h-11 w-32" />
            </div>
          </div>

          {/* Category Filter Skeleton */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-32 rounded-lg flex-shrink-0" />
            ))}
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Section 1 */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="w-6 h-6 rounded" />
            <div className="flex-1">
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <Grid columns={1} responsive="adaptive" gap={4}>
            {Array.from({ length: 3 }).map((_, i) => (
              <SpaceCardSkeleton key={i} />
            ))}
          </Grid>
        </section>

        {/* Section 2 */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="w-6 h-6 rounded" />
            <div className="flex-1">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
          <Grid columns={1} responsive="adaptive" gap={4}>
            {Array.from({ length: 3 }).map((_, i) => (
              <SpaceCardSkeleton key={i} />
            ))}
          </Grid>
        </section>

        {/* Section 3 */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="w-6 h-6 rounded" />
            <div className="flex-1">
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-52" />
            </div>
          </div>
          <Grid columns={1} responsive="adaptive" gap={4}>
            {Array.from({ length: 3 }).map((_, i) => (
              <SpaceCardSkeleton key={i} />
            ))}
          </Grid>
        </section>
      </div>
    </div>
  );
}

function SpaceCardSkeleton() {
  return (
    <Card className="bg-gray-900/50 border-gray-800 overflow-hidden">
      {/* Banner */}
      <Skeleton className="h-24 w-full rounded-none" />

      <div className="p-4">
        {/* Title and description */}
        <div className="mb-3">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-4 mb-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Score indicators and join button */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 flex-1">
            <Skeleton className="h-1 w-12 rounded-full" />
            <Skeleton className="h-1 w-10 rounded-full" />
            <Skeleton className="h-1 w-14 rounded-full" />
          </div>
          <Skeleton className="h-9 w-16 rounded-md" />
        </div>
      </div>
    </Card>
  );
}