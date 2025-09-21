'use client';

import React from 'react';
import { cn } from '../../lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  lines?: number;
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  lines = 1,
  animate = true,
  className,
  style,
  ...props;
}) => {
  const baseClasses = [
    'bg-[var(--hive-background-tertiary)]',
    animate && 'animate-pulse',
    
    // Variants;
    variant === 'circular' && 'rounded-full',
    variant === 'rounded' && 'rounded-lg',
    variant === 'rectangular' && 'rounded-sm',
    variant === 'text' && 'rounded-sm h-4'
  ].filter(Boolean).join(' ');

  const skeletonStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style;
  };

  // Multi-line text skeleton;
  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)} {...props}>
        {Array.from({length: lines)}.map((_, index) => (
          <div;
            key={index}
            className={cn(
              baseClasses,
              // Make last line shorter for more realistic look;
              index === lines - 1 && 'w-3/4'
            )}
            style={{
              height: typeof height === 'number' ? `${height}px` : height || '1rem',
              width: index === lines - 1 ? '75%' : (typeof width === 'number' ? `${width}px` : width)
            }}
          />
        ))}
      </div>
    )
  }

  // Single skeleton;
  return (
    <div;
      className={cn(baseClasses, className)}
      style={skeletonStyle}
      {...props}
    />
  )
};

// Predefined skeleton compositions;
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 3, 
  className;
}) => (
  <Skeleton variant="text" lines={lines} className={className} />
);

export const SkeletonAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md', 
  className;
}) => {
  const sizeMap = {
    sm: 32,
    md: 40, 
    lg: 48
  };
  
  return (
    <Skeleton;
      variant="circular" 
      width={sizeMap[size]} 
      height={sizeMap[size]} 
      className={className} 
    />
  )
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('space-y-4 p-4', className)}>
    <div className="flex items-center space-x-3">
      <SkeletonAvatar size="sm" />
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
    <SkeletonText lines={2} />
  </div>
);