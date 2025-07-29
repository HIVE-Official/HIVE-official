'use client';

import React from 'react';
import { cn } from '../../lib/utils';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'gold' | 'white';
  variant?: 'spin' | 'pulse' | 'bounce';
}

const spinnerSizes = {
  xs: 'h-3 w-3',    // 3
  sm: 'h-4 w-4',    // 16px
  md: 'h-6 w-6',    // 24px
  lg: 'h-8 w-8',    // 32px
  xl: 'h-12 w-12'   // 48px
};

const spinnerColors = {
  primary: 'border-hive-text-primary',
  secondary: 'border-hive-text-secondary', 
  gold: 'border-hive-gold',
  white: 'border-white'
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'gold',
  variant = 'spin',
  className,
  ...props
}) => {
  if (variant === 'pulse') {
    return (
      <div 
        className={cn(
          'inline-flex',
          spinnerSizes[size],
          className
        )} 
        {...props}
      >
        <div className={cn(
          'rounded-full animate-pulse',
          'bg-current opacity-75',
          spinnerColors[color].replace('border-', 'text-'),
          'h-full w-full'
        )} />
      </div>
    );
  }

  if (variant === 'bounce') {
    return (
      <div 
        className={cn(
          'inline-flex items-center space-x-1',
          className
        )} 
        {...props}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'rounded-full animate-bounce',
              'bg-current',
              spinnerColors[color].replace('border-', 'text-'),
              size === 'xs' && 'h-1 w-1',
              size === 'sm' && 'h-1.5 w-1.5',
              size === 'md' && 'h-2 w-2',
              size === 'lg' && 'h-3 w-3',
              size === 'xl' && 'h-4 w-4'
            )}
            style={{
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    );
  }

  // Default spin variant
  return (
    <div 
      className={cn(
        'inline-block animate-spin rounded-full',
        'border-2 border-transparent border-t-current',
        spinnerSizes[size],
        spinnerColors[color].replace('border-', 'text-'),
        className
      )} 
      {...props}
    />
  );
};