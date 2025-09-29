'use client';

import { HiveCard } from '@hive/ui';

/**
 * Loading state for space discovery page
 */
export function SpaceDiscoveryLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-gray-800 rounded-lg w-48 mb-4 animate-pulse" />
          <div className="h-6 bg-gray-800 rounded-lg w-96 animate-pulse" />
        </div>

        {/* Filter Tabs Skeleton */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-10 bg-gray-800 rounded-lg w-24 flex-shrink-0 animate-pulse"
            />
          ))}
        </div>

        {/* Spaces Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SpaceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Loading state for individual space
 */
export function SpaceDetailLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Header Skeleton */}
      <div className="bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 bg-gray-800 rounded-lg animate-pulse" />
                <div>
                  <div className="h-6 bg-gray-800 rounded w-48 mb-2 animate-pulse" />
                  <div className="h-4 bg-gray-800 rounded w-64 animate-pulse" />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="h-4 bg-gray-800 rounded w-24 animate-pulse" />
                <div className="h-4 bg-gray-800 rounded w-20 animate-pulse" />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-10 bg-gray-800 rounded w-20 animate-pulse" />
              <div className="h-10 bg-gray-800 rounded w-24 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tabs Skeleton */}
            <div className="flex gap-2 border-b border-gray-800 pb-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 bg-gray-800 rounded w-20 animate-pulse" />
              ))}
            </div>

            {/* Posts Skeleton */}
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <PostSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-5 space-y-6">
            <HiveCard className="bg-gray-900/50 border-gray-800 p-4">
              <div className="h-6 bg-gray-800 rounded w-32 mb-4 animate-pulse" />
              <div className="space-y-3">
                <div className="h-16 bg-gray-800 rounded animate-pulse" />
                <div className="h-4 bg-gray-800 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-800 rounded w-3/4 animate-pulse" />
              </div>
            </HiveCard>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Loading state for space creation
 */
export function SpaceCreationLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center p-4">
      <HiveCard className="w-full max-w-2xl bg-gray-900/50 border-gray-800 p-6">
        <div className="text-center space-y-6">
          <div className="text-6xl animate-pulse">🍯</div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-800 rounded w-48 mx-auto animate-pulse" />
            <div className="h-4 bg-gray-800 rounded w-64 mx-auto animate-pulse" />
          </div>

          {/* Form Skeleton */}
          <div className="space-y-4 text-left">
            <div className="h-12 bg-gray-800 rounded animate-pulse" />
            <div className="h-32 bg-gray-800 rounded animate-pulse" />
            <div className="h-12 bg-gray-800 rounded animate-pulse" />
          </div>
        </div>
      </HiveCard>
    </div>
  );
}

/**
 * Skeleton component for individual space cards
 */
function SpaceCardSkeleton() {
  return (
    <HiveCard className="bg-gray-900/50 border-gray-800 overflow-hidden">
      {/* Banner Skeleton */}
      <div className="h-32 bg-gray-800 animate-pulse" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-800 rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-800 rounded w-full animate-pulse" />
        <div className="h-4 bg-gray-800 rounded w-5/6 animate-pulse" />

        <div className="flex items-center justify-between pt-2">
          <div className="h-4 bg-gray-800 rounded w-24 animate-pulse" />
          <div className="h-6 bg-gray-800 rounded w-16 animate-pulse" />
        </div>
      </div>
    </HiveCard>
  );
}

/**
 * Skeleton component for posts
 */
function PostSkeleton() {
  return (
    <HiveCard className="bg-gray-900/50 border-gray-800 p-4">
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-gray-800 rounded-full animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-800 rounded w-24 animate-pulse" />
            <div className="h-4 bg-gray-800 rounded w-16 animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-800 rounded w-4/5 animate-pulse" />
          </div>
        </div>
      </div>
    </HiveCard>
  );
}

/**
 * Loading state for contextual tools
 */
export function ToolsLoading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <HiveCard key={i} className="bg-gray-900/50 border-gray-800 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gray-800 rounded animate-pulse" />
            <div className="flex-1">
              <div className="h-4 bg-gray-800 rounded w-32 mb-1 animate-pulse" />
              <div className="h-3 bg-gray-800 rounded w-24 animate-pulse" />
            </div>
          </div>
          <div className="h-16 bg-gray-800 rounded animate-pulse" />
        </HiveCard>
      ))}
    </div>
  );
}

/**
 * Inline loading component for quick actions
 */
export function InlineActionLoading({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <div className="w-4 h-4 border-2 border-hive-gold border-t-transparent rounded-full animate-spin" />
      <span>{message}</span>
    </div>
  );
}