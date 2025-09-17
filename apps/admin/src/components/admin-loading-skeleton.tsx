"use client";

import { Skeleton } from "@hive/ui";

export function AdminLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-64 bg-gray-800 mb-2" />
              <Skeleton className="h-4 w-48 bg-gray-800" />
            </div>
            <div className="text-right">
              <Skeleton className="h-3 w-20 bg-gray-800 mb-1 ml-auto" />
              <Skeleton className="h-5 w-32 bg-gray-800 mb-1" />
              <div className="flex items-center gap-2 mt-1 justify-end">
                <Skeleton className="h-2 w-2 rounded-full bg-gray-800" />
                <Skeleton className="h-3 w-16 bg-gray-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Skeleton */}
        <div className="mb-8">
          <div className="flex gap-2 overflow-x-auto">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 bg-gray-800 flex-shrink-0" />
            ))}
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-6">
          {/* Metric Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
                <Skeleton className="h-4 w-24 bg-gray-800 mb-3" />
                <Skeleton className="h-8 w-16 bg-gray-800 mb-1" />
                <Skeleton className="h-3 w-32 bg-gray-800" />
              </div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column */}
            <div className="lg:col-span-2 p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <Skeleton className="h-6 w-48 bg-gray-800 mb-4" />
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-full bg-gray-800 mb-1" />
                      <Skeleton className="h-3 w-2/3 bg-gray-800" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <Skeleton className="h-6 w-32 bg-gray-800 mb-4" />
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-full bg-gray-800 mb-1" />
                    <Skeleton className="h-3 w-3/4 bg-gray-800" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="mt-8 p-4 bg-gray-900/30 border border-gray-700 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-2 w-2 rounded-full bg-gray-800" />
                <Skeleton className="h-3 w-32 bg-gray-800" />
              </div>
              <Skeleton className="h-3 w-24 bg-gray-800" />
            </div>
            <Skeleton className="h-3 w-48 bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
}