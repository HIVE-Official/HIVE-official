'use client';

import React from 'react';
import { cn } from '../../lib/utils';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  decorative?: boolean;
}

const separatorSizes = {
  horizontal: {
    sm: 'h-0.5',
    md: 'h-0.5',
    lg: 'h-0.75'
  },
  vertical: {
    sm: 'w-0.5',
    md: 'w-0.5',
    lg: 'w-0.75'
  }
};

const separatorVariants = {
  solid: 'bg-hive-border-default',
  dashed: 'border-dashed border-t border-hive-border-default bg-transparent',
  dotted: 'border-dotted border-t border-hive-border-default bg-transparent',
  gradient: 'bg-gradient-to-r from-transparent via-hive-border-default to-transparent'
};

const separatorSpacing = {
  none: '',
  sm: 'my-2',
  md: 'my-4',
  lg: 'my-6'
};

const verticalSpacing = {
  none: '',
  sm: 'mx-2',
  md: 'mx-4',
  lg: 'mx-6'
};

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(({
  orientation = 'horizontal',
  variant = 'solid',
  size = 'md',
  spacing = 'md',
  decorative = false,
  className,
  ...props
}, ref) => {
  const isHorizontal = orientation === 'horizontal';
  
  const baseClasses = [
    // Base styles
    'flex-shrink-0',
    
    // Orientation and size
    isHorizontal ? [
      'w-full',
      separatorSizes.horizontal[size]
    ].join(' ') : [
      'h-full',
      separatorSizes.vertical[size]
    ].join(' '),
    
    // Variant styles
    separatorVariants[variant],
    
    // Spacing
    spacing !== 'none' && (isHorizontal ? separatorSpacing[spacing] : verticalSpacing[spacing])
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={cn(baseClasses, className)}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={orientation}
      {...props}
    />
  );
});

Separator.displayName = 'Separator';

// Convenient preset components
export const HorizontalSeparator: React.FC<Omit<SeparatorProps, 'orientation'>> = (props) => (
  <Separator orientation="horizontal" {...props} />
);

export const VerticalSeparator: React.FC<Omit<SeparatorProps, 'orientation'>> = (props) => (
  <Separator orientation="vertical" {...props} />
);

export const GradientDivider: React.FC<Omit<SeparatorProps, 'variant'>> = (props) => (
  <Separator variant="gradient" {...props} />
);