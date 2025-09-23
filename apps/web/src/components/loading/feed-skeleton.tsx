"use client";

import React from 'react';
import { Card } from '@hive/ui';

interface FeedSkeletonProps {
  itemCount?: number;
  showRitualStrip?: boolean;
}

export function FeedSkeleton({ itemCount = 5, showRitualStrip = true }: FeedSkeletonProps) {
  return (
    <div className="space-y-4">
      {/* Ritual Strip Skeleton */}
      {showRitualStrip && (
        <div className="bg-hive-surface border-b border-hive-border">
          <div className="max-w-2xl mx-auto px-6 py-4">
            <div className="flex items-center space-x-4 overflow-x-auto">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 flex flex-col items-center space-y-2">
                  {/* Ritual Ring */}
                  <div className="w-16 h-16 rounded-full bg-hive-background-overlay animate-pulse" />
                  {/* Ritual Name */}
                  <div className="w-12 h-3 bg-hive-background-overlay rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Feed Items Skeleton */}
      <div className="max-w-2xl mx-auto px-6 space-y-4">
        {Array.from({ length: itemCount }).map((_, index) => (
          <FeedItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

function FeedItemSkeleton() {
  return (
    <Card className="p-4">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            {/* Time badge */}
            <div className="w-20 h-5 bg-hive-background-overlay rounded animate-pulse" />
            {/* Title */}
            <div className="w-3/4 h-6 bg-hive-background-overlay rounded animate-pulse" />
            {/* Space name */}
            <div className="w-1/3 h-4 bg-hive-background-overlay rounded animate-pulse" />
          </div>
          {/* Action button */}
          <div className="w-16 h-8 bg-hive-background-overlay rounded animate-pulse" />
        </div>

        {/* Details */}
        <div className="space-y-2">
          {/* Time info */}
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-hive-background-overlay rounded animate-pulse" />
            <div className="w-24 h-4 bg-hive-background-overlay rounded animate-pulse" />
          </div>
          {/* Location */}
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-hive-background-overlay rounded animate-pulse" />
            <div className="w-32 h-4 bg-hive-background-overlay rounded animate-pulse" />
          </div>
          {/* Attendee count */}
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-hive-background-overlay rounded animate-pulse" />
            <div className="w-20 h-4 bg-hive-background-overlay rounded animate-pulse" />
          </div>
        </div>

        {/* Tags */}
        <div className="flex space-x-2">
          <div className="w-16 h-6 bg-hive-background-overlay rounded animate-pulse" />
          <div className="w-12 h-6 bg-hive-background-overlay rounded animate-pulse" />
          <div className="w-20 h-6 bg-hive-background-overlay rounded animate-pulse" />
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-between pt-3 border-t border-hive-border">
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-hive-background-overlay rounded animate-pulse" />
            <div className="w-8 h-8 bg-hive-background-overlay rounded animate-pulse" />
          </div>
          <div className="flex space-x-2">
            <div className="w-16 h-8 bg-hive-background-overlay rounded animate-pulse" />
            <div className="w-8 h-8 bg-hive-background-overlay rounded animate-pulse" />
          </div>
        </div>
      </div>
    </Card>
  );
}

// Compact skeleton for loading states
export function CompactFeedSkeleton({ itemCount = 3 }: { itemCount?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: itemCount }).map((_, index) => (
        <div key={index} className="p-3 bg-hive-background-overlay rounded-lg animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex-1 space-y-1">
              <div className="w-2/3 h-4 bg-hive-border rounded" />
              <div className="w-1/2 h-3 bg-hive-border rounded" />
            </div>
            <div className="w-12 h-6 bg-hive-border rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}