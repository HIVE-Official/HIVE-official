'use client';

import React from 'react';
import { cn } from '../../lib/utils';

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: 'online' | 'offline' | 'away' | 'busy' | 'error' | 'success' | 'warning' | 'pending';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dot' | 'pulse' | 'glow' | 'ring';
  label?: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showLabel?: boolean;
  animate?: boolean;
}

const statusColors = {
  online: {
    bg: 'bg-[var(--hive-status-success)]',
    border: 'border-[var(--hive-status-success)]',
    text: 'text-[var(--hive-status-success)]',
    glow: '[--hive-glow:var(--hive-status-success)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]'
  },
  offline: {
    bg: 'bg-[var(--hive-text-disabled)]',
    border: 'border-[var(--hive-text-disabled)]',
    text: 'text-[var(--hive-text-disabled)]',
    glow: '[--hive-glow:var(--hive-text-disabled)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]'
  },
  away: {
    bg: 'bg-[var(--hive-status-warning)]',
    border: 'border-[var(--hive-status-warning)]',
    text: 'text-[var(--hive-status-warning)]',
    glow: '[--hive-glow:var(--hive-status-warning)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]'
  },
  busy: {
    bg: 'bg-[var(--hive-status-error)]',
    border: 'border-[var(--hive-status-error)]',
    text: 'text-[var(--hive-status-error)]',
    glow: '[--hive-glow:var(--hive-status-error)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]'
  },
  error: {
    bg: 'bg-[var(--hive-status-error)]',
    border: 'border-[var(--hive-status-error)]',
    text: 'text-[var(--hive-status-error)]',
    glow: '[--hive-glow:var(--hive-status-error)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]'
  },
  success: {
    bg: 'bg-[var(--hive-status-success)]',
    border: 'border-[var(--hive-status-success)]',
    text: 'text-[var(--hive-status-success)]',
    glow: '[--hive-glow:var(--hive-status-success)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]'
  },
  warning: {
    bg: 'bg-[var(--hive-status-warning)]',
    border: 'border-[var(--hive-status-warning)]',
    text: 'text-[var(--hive-status-warning)]',
    glow: '[--hive-glow:var(--hive-status-warning)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]'
  },
  pending: {
    bg: 'bg-[var(--hive-text-tertiary)]',
    border: 'border-[var(--hive-text-tertiary)]',
    text: 'text-[var(--hive-text-tertiary)]',
    glow: '[--hive-glow:var(--hive-text-tertiary)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]'
  }
};

const indicatorSizes = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-4 h-4'
};

const positionClasses = {
  top: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
  bottom: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
  left: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2',
  right: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2',
  'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
  'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
  'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
  'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2'
};

export const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(({
  status,
  size = 'md',
  variant = 'dot',
  label,
  position,
  showLabel = false,
  animate = true,
  className,
  ...props
}, ref) => {
  const statusColor = statusColors[status];
  const isPositioned = Boolean(position);

  const baseClasses = [
    'flex items-center',
    isPositioned ? 'absolute' : 'relative',
    position && positionClasses[position]
  ].filter(Boolean).join(' ');

  const dotClasses = [
    'rounded-full flex-shrink-0',
    indicatorSizes[size],
    
    // Variant styles
    variant === 'dot' && statusColor.bg,
    
    variant === 'pulse' && [
      statusColor.bg,
      animate && 'animate-pulse'
    ].filter(Boolean).join(' '),
    
    variant === 'glow' && [
      statusColor.bg,
      statusColor.glow,
      animate && 'animate-pulse'
    ].filter(Boolean).join(' '),
    
    variant === 'ring' && [
      'border-2',
      statusColor.border,
      'bg-[var(--hive-background-primary)]'
    ].filter(Boolean).join(' ')
  ].filter(Boolean).join(' ');

  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1);

  if (showLabel || (!isPositioned && label)) {
    return (
      <div 
        ref={ref}
        className={cn(baseClasses, 'gap-2', className)}
        {...props}
      >
        <div className={dotClasses} />
        <span className={cn(
          'text-sm font-medium capitalize',
          statusColor.text
        )}>
          {displayLabel}
        </span>
      </div>
    );
  }

  return (
    <div 
      ref={ref}
      className={cn(baseClasses, className)}
      title={displayLabel}
      {...props}
    >
      <div className={dotClasses} />
    </div>
  );
});

StatusIndicator.displayName = 'StatusIndicator';

// Convenient preset components
export const OnlineIndicator: React.FC<Omit<StatusIndicatorProps, 'status'>> = (props) => (
  <StatusIndicator status="online" {...props} />
);

export const OfflineIndicator: React.FC<Omit<StatusIndicatorProps, 'status'>> = (props) => (
  <StatusIndicator status="offline" {...props} />
);

export const BusyIndicator: React.FC<Omit<StatusIndicatorProps, 'status'>> = (props) => (
  <StatusIndicator status="busy" {...props} />
);

export const AwayIndicator: React.FC<Omit<StatusIndicatorProps, 'status'>> = (props) => (
  <StatusIndicator status="away" {...props} />
);

export const ErrorIndicator: React.FC<Omit<StatusIndicatorProps, 'status'>> = (props) => (
  <StatusIndicator status="error" {...props} />
);

export const SuccessIndicator: React.FC<Omit<StatusIndicatorProps, 'status'>> = (props) => (
  <StatusIndicator status="success" {...props} />
);

export const WarningIndicator: React.FC<Omit<StatusIndicatorProps, 'status'>> = (props) => (
  <StatusIndicator status="warning" {...props} />
);

export const PulseIndicator: React.FC<Omit<StatusIndicatorProps, 'variant'>> = (props) => (
  <StatusIndicator variant="pulse" {...props} />
);

export const GlowIndicator: React.FC<Omit<StatusIndicatorProps, 'variant'>> = (props) => (
  <StatusIndicator variant="glow" {...props} />
);

// Status Badge Component (combines indicator with content)
export interface StatusBadgeProps extends Omit<StatusIndicatorProps, 'showLabel'> {
  children?: React.ReactNode;
  count?: number;
  max?: number;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'sm',
  variant = 'dot',
  position = 'top-right',
  children,
  count,
  max = 99,
  className,
  ...props
}) => {
  const hasContent = children || count !== undefined;
  const displayCount = count !== undefined ? (count > max ? `${max}+` : count.toString()) : '';

  if (!hasContent) {
    return <StatusIndicator status={status} size={size} variant={variant} className={className} {...props} />;
  }

  return (
    <div className="relative inline-flex">
      {children}
      <div className={cn(
        'absolute flex items-center justify-center',
        positionClasses[position],
        count !== undefined && [
          'min-w-4.5 h-4.5 px-1',
          'text-xs font-bold text-[var(--hive-text-inverse)]',
          'rounded-full',
          statusColors[status].bg
        ].filter(Boolean).join(' ')
      )}>
        {count !== undefined ? (
          displayCount
        ) : (
          <StatusIndicator 
            status={status} 
            size={size} 
            variant={variant}
            animate={props.animate}
          />
        )}
      </div>
    </div>
  );
};