"use client";

import React from 'react';
import { Card, CardContent, CardHeader } from "@hive/ui";

// Simple skeleton component
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-hive-background-tertiary ${className || ''}`}
      {...props}
    />
  );
}

export function ProfileLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-hive-background-primary pb-20 lg:pb-0">
      {/* Cover Image & Header Skeleton */}
      <div className="relative">
        {/* Cover Image Skeleton */}
        <Skeleton className="h-48 sm:h-56 w-full bg-hive-surface-elevated" />
        
        {/* Profile Header Skeleton */}
        <div className="relative px-4 sm:px-6 -mt-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            {/* Avatar Skeleton */}
            <Skeleton className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-hive-background-primary" />
            
            {/* Profile Info Skeleton */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="min-w-0 space-y-2">
                  <Skeleton className="h-8 w-48 bg-hive-surface-elevated" />
                  <Skeleton className="h-4 w-32 bg-hive-surface-elevated" />
                  <Skeleton className="h-4 w-64 bg-hive-surface-elevated" />
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-24 bg-hive-surface-elevated" />
                    <Skeleton className="h-4 w-32 bg-hive-surface-elevated" />
                  </div>
                </div>
                
                {/* Action Buttons Skeleton */}
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-28 bg-hive-surface-elevated" />
                  <Skeleton className="h-10 w-10 bg-hive-surface-elevated" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar Skeleton */}
      <div className="px-4 sm:px-6 mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="text-center space-y-1">
              <Skeleton className="h-6 w-12 mx-auto bg-hive-surface-elevated" />
              <Skeleton className="h-4 w-16 mx-auto bg-hive-surface-elevated" />
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="px-4 sm:px-6 mt-8">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-10 w-80 bg-hive-surface-elevated" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 bg-hive-surface-elevated" />
            <Skeleton className="h-8 w-8 bg-hive-surface-elevated" />
          </div>
        </div>

        {/* Content Cards Skeleton */}
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, cardIndex) => (
            <Card key={cardIndex} className="bg-hive-surface-elevated border-hive-border-subtle">
              <CardHeader>
                <Skeleton className="h-6 w-32 bg-hive-background-primary" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, itemIndex) => (
                    <div key={itemIndex} className="p-4 bg-hive-background-primary rounded-lg">
                      <div className="flex items-start gap-3">
                        <Skeleton className="w-12 h-12 rounded-lg bg-hive-surface-elevated" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-24 bg-hive-surface-elevated" />
                          <Skeleton className="h-3 w-32 bg-hive-surface-elevated" />
                          <Skeleton className="h-3 w-16 bg-hive-surface-elevated" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProfileSectionSkeleton({ title: _title, itemCount = 6 }: { title: string; itemCount?: number }) {
  return (
    <Card className="bg-hive-surface-elevated border-hive-border-subtle">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32 bg-hive-background-primary" />
          <Skeleton className="h-8 w-20 bg-hive-background-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: itemCount }).map((_, index) => (
            <div key={index} className="p-4 bg-hive-background-primary/50 rounded-lg">
              <div className="flex items-start gap-3">
                <Skeleton className="w-12 h-12 rounded-lg bg-hive-surface-elevated" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24 bg-hive-surface-elevated" />
                  <Skeleton className="h-3 w-32 bg-hive-surface-elevated" />
                  <div className="flex gap-2">
                    <Skeleton className="h-3 w-12 bg-hive-surface-elevated" />
                    <Skeleton className="h-3 w-16 bg-hive-surface-elevated" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}