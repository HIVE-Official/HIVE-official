import { Skeleton } from '@hive/ui';

export default function RitualsLoading() {
  return (
    <div className="min-h-screen bg-hive-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Ritual cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
