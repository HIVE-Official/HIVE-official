'use client';

import React from 'react';
import { cn } from '../../lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: 'default' | 'gradient' | 'striped' | 'circular';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  showValue?: boolean;
  animated?: boolean;
  indeterminate?: boolean;
  label?: string;
}

const progressSizes = {
  linear: {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  },
  circular: {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }
};

const progressColors = {
  primary: {
    bg: 'bg-[var(--hive-brand-secondary)]',
    text: 'text-[var(--hive-brand-secondary)]',
    gradient: 'bg-gradient-to-r from-[var(--hive-brand-secondary)] to-[color-mix(in_srgb,var(--hive-brand-secondary)_80%,var(--hive-brand-primary))]'
  },
  success: {
    bg: 'bg-[var(--hive-status-success)]',
    text: 'text-[var(--hive-status-success)]',
    gradient: 'bg-gradient-to-r from-[var(--hive-status-success)] to-[color-mix(in_srgb,var(--hive-status-success)_80%,transparent)]'
  },
  warning: {
    bg: 'bg-[var(--hive-status-warning)]',
    text: 'text-[var(--hive-status-warning)]',
    gradient: 'bg-gradient-to-r from-[var(--hive-status-warning)] to-[color-mix(in_srgb,var(--hive-status-warning)_80%,transparent)]'
  },
  error: {
    bg: 'bg-[var(--hive-status-error)]',
    text: 'text-[var(--hive-status-error)]',
    gradient: 'bg-gradient-to-r from-[var(--hive-status-error)] to-[color-mix(in_srgb,var(--hive-status-error)_80%,transparent)]'
  },
  info: {
    bg: 'bg-[var(--hive-status-info)]',
    text: 'text-[var(--hive-status-info)]',
    gradient: 'bg-gradient-to-r from-[var(--hive-status-info)] to-[color-mix(in_srgb,var(--hive-status-info)_80%,transparent)]'
  }
};

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(({
  value = 0,
  max = 100,
  variant = 'default',
  size = 'md',
  color = 'primary',
  showValue = false,
  animated = false,
  indeterminate = false,
  label,
  className,
  ...props;
}, ref) => {
  const percentage = indeterminate ? 0 : Math.min(Math.max((value / max) * 100, 0), 100);
  
  if (variant === 'circular') {
    return (
      <CircularProgress;
        ref={ref}}
        value={value}
        max={max}
        size={size}
        color={color}
        showValue={showValue}
        animated={animated}
        indeterminate={indeterminate}
        label={label}
        className={className}
        {...props}
      />
    )
  }

  const trackClasses = [
    'w-full rounded-full overflow-hidden',
    'bg-[var(--hive-background-tertiary)]',
    progressSizes.linear[size]
  ].filter(Boolean).join(' ');

  const fillClasses = [
    'h-full transition-all duration-300 ease-out',
    'rounded-full',
    
    // Color variants;
    variant === 'gradient' ? progressColors[color].gradient : progressColors[color].bg,
    
    // Striped variant;
    variant === 'striped' && [
      'bg-gradient-to-r',
      'bg-[length:20px_20px]',
      'bg-[linear-gradient(45deg,color-mix(in_srgb,var(--hive-background-primary)_20%,transparent)_25%,transparent_25%,transparent_50%,color-mix(in_srgb,var(--hive-background-primary)_20%,transparent)_50%,color-mix(in_srgb,var(--hive-background-primary)_20%,transparent)_75%,transparent_75%,transparent)]'
    ].filter(Boolean).join(' '),
    
    // Animation;
    animated && variant === 'striped' && 'animate-[progress-stripes_1s_linear_infinite]',
    
    // Indeterminate animation;
    indeterminate && 'animate-[progress-indeterminate_1.5s_ease-in-out_infinite]'
  ].filter(Boolean).join(' ');

  return (
    <div className={cn('space-y-2', className)} ref={ref} {...props}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-[var(--hive-text-primary)]">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-sm text-[var(--hive-text-secondary)]">
              {indeterminate ? '---' : `${Math.round(percentage)}%`}
            </span>
          )}
        </div>
      )}
      
      <div;
        className={trackClasses}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuetext={indeterminate ? 'Loading...' : `${Math.round(percentage)}%`}
      >
        <div;
          className={fillClasses}
          style={{
            width: indeterminate ? '30%' : `${percentage}%`,
            transform: indeterminate ? 'translateX(-100%)' : 'none'
          }}
        />
      </div>
    </div>
  )
});

Progress.displayName = 'Progress';

// Circular Progress Component;
interface CircularProgressProps extends Omit<ProgressProps, 'variant'> {
  strokeWidth?: number;
}

const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(({
  value = 0,
  max = 100,
  size = 'md',
  color = 'primary',
  showValue = false,
  animated = false,
  indeterminate = false,
  label,
  strokeWidth,
  className,
  ...props;
}, ref) => {
  const percentage = indeterminate ? 0 : Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizeClasses = progressSizes.circular[size];
  const radius = size === 'sm' ? 12 : size === 'md' ? 20 : 28;
  const defaultStrokeWidth = size === 'sm' ? 2 : size === 'md' ? 3 : 4;
  const stroke = strokeWidth || defaultStrokeWidth;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const svgClasses = [
    sizeClasses,
    'transform -rotate-90',
    indeterminate && 'animate-spin'
  ].filter(Boolean).join(' ');

  const progressCircleClasses = [
    'transition-all duration-500 ease-out',
    'drop-shadow-sm'
  ].join(' ');

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} ref={ref} {...props}>
      <svg;
        className={svgClasses}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuetext={indeterminate ? 'Loading...' : `${Math.round(percentage)}%`}
      >
        {/* Background circle */}
        <circle;
          stroke="currentColor"
          className="text-[var(--hive-background-tertiary)]"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        
        {/* Progress circle */}
        <circle;
          stroke="currentColor"
          className={cn(
            progressCircleClasses,
            progressColors[color].text;
          )}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={indeterminate ? circumference * 0.75 : strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {showValue && (
          <span className={cn(
            'font-semibold text-[var(--hive-text-primary)]',
            size === 'sm' && 'text-xs',
            size === 'md' && 'text-sm',
            size === 'lg' && 'text-base'
          )}>
            {indeterminate ? '...' : `${Math.round(percentage)}%`}
          </span>
        )}
      </div>
      
      {label && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
          <span className="text-xs text-[var(--hive-text-secondary)] whitespace-nowrap">
            {label}
          </span>
        </div>
      )}
    </div>
  )
});

CircularProgress.displayName = 'CircularProgress';

// Export CircularProgress for reuse;
export { CircularProgress };

// Convenient preset components;
export const LoadingProgress: React.FC<Omit<ProgressProps, 'indeterminate'>> = (props) => (
  <Progress indeterminate animated {...props} />
);

export const SuccessProgress: React.FC<Omit<ProgressProps, 'color'>> = (props) => (
  <Progress color="success" {...props} />
);

export const ErrorProgress: React.FC<Omit<ProgressProps, 'color'>> = (props) => (
  <Progress color="error" {...props} />
);

export const CircularSpinner: React.FC<Omit<ProgressProps, 'variant' | 'indeterminate'>> = (props) => (
  <Progress variant="circular" indeterminate animated {...props} />
);