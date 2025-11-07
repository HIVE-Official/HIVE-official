import { Skeleton } from '@hive/ui';

export default function HiveLabLoading() {
  return (
    <div className="min-h-screen bg-hive-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header skeleton */}
        <Skeleton className="h-12 w-64" />

        {/* Tool composer skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-96 w-full rounded-lg" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
