'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'list' | 'profile' | 'feed';
  count?: number;
  showSpinner?: boolean;
}

/**
 * Standardized loading skeleton component for consistent loading states
 */
export function LoadingSkeleton({ 
  className,
  variant = 'default',
  count = 1,
  showSpinner = false
}: LoadingSkeletonProps) {
  const items = Array.from({ length: count }, (_, i) => i);

  if (variant === 'card') {
    return (
      <div className={cn('space-y-4', className)}>
        {items.map((i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-lg p-6 animate-pulse"
            role="status"
            aria-label="Loading content"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full" />
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-white/10 rounded w-1/4" />
                <div className="h-3 bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-white/10 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={cn('space-y-2', className)}>
        {items.map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg animate-pulse"
            role="status"
            aria-label="Loading list item"
          >
            <div className="w-8 h-8 bg-white/10 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-white/10 rounded w-2/3" />
              <div className="h-2 bg-white/10 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'profile') {
    return (
      <div
        className={cn('space-y-6 animate-pulse', className)}
        role="status"
        aria-label="Loading profile"
      >
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/10 rounded-full" />
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-white/10 rounded w-1/3" />
            <div className="h-3 bg-white/10 rounded w-1/2" />
            <div className="flex gap-2">
              <div className="h-8 bg-white/10 rounded w-20" />
              <div className="h-8 bg-white/10 rounded w-20" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'feed') {
    return (
      <div className={cn('space-y-4', className)}>
        {items.map((i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-lg p-4 animate-pulse"
            role="status"
            aria-label="Loading feed post"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/10 rounded w-1/4" />
                <div className="h-3 bg-white/10 rounded w-1/6" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-white/10 rounded w-full" />
              <div className="h-3 bg-white/10 rounded w-3/4" />
              <div className="h-3 bg-white/10 rounded w-1/2" />
            </div>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
              <div className="h-8 bg-white/10 rounded w-16" />
              <div className="h-8 bg-white/10 rounded w-16" />
              <div className="h-8 bg-white/10 rounded w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default skeleton
  return (
    <div
      className={cn('animate-pulse', className)}
      role="status"
      aria-label="Loading"
    >
      <div className="space-y-3">
        {items.map((i) => (
          <div key={i} className="h-4 bg-white/10 rounded" />
        ))}
      </div>
      {showSpinner && (
        <div className="flex justify-center mt-4">
          <Loader2 className="h-6 w-6 animate-spin text-white/40" />
        </div>
      )}
    </div>
  );
}

/**
 * Full page loading state
 */
export function PageLoading({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-[var(--hive-brand-secondary)]" />
      <p className="mt-4 text-sm text-neutral-400">{message}</p>
    </div>
  );
}

/**
 * Inline loading spinner
 */
export function LoadingSpinner({ 
  size = 'sm',
  className 
}: { 
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <Loader2 
      className={cn(
        'animate-spin text-current',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}