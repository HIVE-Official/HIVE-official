import React from "react";
import { cn } from "../../lib/utils";
import { Skeleton } from "../ui/skeleton";

interface LoadingSkeletonProps {
  className?: string;
}

/**
 * A generic loading skeleton component designed to mimic a simple card layout.
 * It provides a visual placeholder for content that is loading,
 * improving perceived performance and user experience.
 */
export const LoadingSkeleton = ({ className }: LoadingSkeletonProps) => {
  return (
    <div
      className={cn("p-4 space-y-4 rounded-lg border bg-surface-01", className)}
    >
      <div className="flex items-center space-x-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
      <div className="space-y-2 pt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
};
