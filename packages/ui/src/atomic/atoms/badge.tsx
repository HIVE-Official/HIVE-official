'use client';

import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  count?: number;
  maxCount?: number;
  children?: React.ReactNode;
}

const badgeVariants = {
  primary: 'bg-blue-600 text-[var(--hive-text-primary)] border-blue-600',
  secondary: 'bg-gray-800 text-gray-300 border-[var(--hive-border-default)]',
  success: 'bg-green-500/10 text-green-400 border-green-500/20',
  warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', 
  error: 'bg-red-500/10 text-red-400 border-red-500/20',
  info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  ghost: 'bg-transparent text-gray-400 border-gray-600'
};

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs font-medium',
  md: 'px-2.5 py-1 text-xs font-medium',
  lg: 'px-3 py-1.5 text-sm font-medium'
};

const dotSizes = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2.5 w-2.5'
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'secondary',
  size = 'md',
  dot = false,
  count,
  maxCount = 99,
  children,
  className,
  ...props
}) => {
  const baseClasses = [
    'inline-flex items-center gap-1.5',
    'rounded-full',
    'border',
    'transition-colors duration-200 ease-out',
    badgeVariants[variant],
    !dot && badgeSizes[size]
  ].filter(Boolean).join(' ');

  // Dot variant
  if (dot) {
    return (
      <span 
        className={cn(
          'inline-flex items-center gap-2',
          className
        )} 
        {...props}
      >
        <span className={cn(
          'rounded-full flex-shrink-0',
          badgeVariants[variant],
          dotSizes[size]
        )} />
        {children && (
          <span className="text-[var(--hive-text-primary)] font-medium">
            {children}
          </span>
        )}
      </span>
    );
  }

  // Count variant
  if (typeof count === 'number') {
    const displayCount = count > maxCount ? `${maxCount}+` : count.toString();
    
    return (
      <span 
        className={cn(baseClasses, className)} 
        {...props}
      >
        {displayCount}
      </span>
    );
  }

  // Default variant
  return (
    <span 
      className={cn(baseClasses, className)} 
      {...props}
    >
      {children}
    </span>
  );
};