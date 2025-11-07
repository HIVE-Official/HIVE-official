import { Skeleton } from '@hive/ui';

export default function SpacesLoading() {
  return (
    <div className="min-h-screen bg-hive-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header skeleton */}
        <Skeleton className="h-10 w-48" />

        {/* Spaces grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
