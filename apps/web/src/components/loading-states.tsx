"use client";

import React from 'react';
import { Card } from '@hive/ui';
import { Loader2, Sparkles } from 'lucide-react';

// Full page loader
export function PageLoader({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-500" />
        <p className="text-gray-600 dark:text-gray-400">{message}</p>
      </div>
    </div>
  );
}

// Section loader
export function SectionLoader({ 
  height = 200,
  message 
}: { 
  height?: number;
  message?: string;
}) {
  return (
    <div 
      className="flex items-center justify-center"
      style={{ minHeight: height }}
    >
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
        {message && (
          <p className="text-sm text-gray-500">{message}</p>
        )}
      </div>
    </div>
  );
}

// Inline loader
export function InlineLoader({ size = 'sm' }: { size?: 'xs' | 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <Loader2 className={`${sizeClasses[size]} animate-spin text-gray-400`} />
  );
}

// Button loader
export function ButtonLoader({ 
  loading,
  children,
  loadingText = 'Loading...'
}: {
  loading: boolean;
  children: React.ReactNode;
  loadingText?: string;
}) {
  if (loading) {
    return (
      <>
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        {loadingText}
      </>
    );
  }
  return <>{children}</>;
}

// Card skeleton
export function CardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <Card className="p-4 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        </div>
      </div>
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i} 
            className="h-3 bg-gray-200 dark:bg-gray-700 rounded"
            style={{ width: `${100 - (i * 10)}%` }}
          />
        ))}
      </div>
    </Card>
  );
}

// Posts skeleton
export function PostsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} lines={2 + (i % 2)} />
      ))}
    </div>
  );
}

// Grid skeleton
export function GridSkeleton({ 
  columns = 3,
  rows = 2 
}: { 
  columns?: number;
  rows?: number;
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-4`}>
      {Array.from({ length: columns * rows }).map((_, i) => (
        <Card key={i} className="p-4 animate-pulse">
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        </Card>
      ))}
    </div>
  );
}

// Table skeleton
export function TableSkeleton({ 
  columns = 4,
  rows = 5 
}: { 
  columns?: number;
  rows?: number;
}) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-4 py-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr key={rowIdx} className="border-t">
              {Array.from({ length: columns }).map((_, colIdx) => (
                <td key={colIdx} className="px-4 py-3">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Shimmer effect
export function ShimmerEffect({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

// Loading overlay
export function LoadingOverlay({ 
  visible,
  message = 'Processing...'
}: { 
  visible: boolean;
  message?: string;
}) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="p-6 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3 text-blue-500" />
        <p className="text-gray-600 dark:text-gray-400">{message}</p>
      </Card>
    </div>
  );
}

// Suspense fallback
export function SuspenseFallback({ 
  type = 'section' 
}: { 
  type?: 'page' | 'section' | 'inline';
}) {
  switch (type) {
    case 'page':
      return <PageLoader />;
    case 'inline':
      return <InlineLoader />;
    case 'section':
    default:
      return <SectionLoader />;
  }
}

// Loading dots animation
export function LoadingDots() {
  return (
    <span className="inline-flex gap-1">
      <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
      <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
      <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
    </span>
  );
}

// Progress bar
export function ProgressBar({ 
  progress,
  showLabel = true 
}: { 
  progress: number;
  showLabel?: boolean;
}) {
  return (
    <div className="w-full">
      <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-500 mt-1 text-center">
          {Math.round(progress)}%
        </p>
      )}
    </div>
  );
}

// Fancy loader with animation
export function FancyLoader({ message = 'Creating magic...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <div className="absolute inset-0 animate-ping">
          <Sparkles className="h-12 w-12 text-yellow-400 opacity-75" />
        </div>
        <Sparkles className="h-12 w-12 text-yellow-500 relative" />
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-400 animate-pulse">
        {message}
      </p>
    </div>
  );
}