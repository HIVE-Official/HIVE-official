import React from 'react';
import { cn } from '../lib/utils';

export interface HiveProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export const HiveProgress: React.FC<HiveProgressProps> = ({ 
  className, 
  value = 0,
  max = 100,
  variant = 'default',
  ...props 
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const variantColors = {
    default: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
  };
  
  return (
    <div className={cn('w-full bg-secondary rounded-full h-2', className)} {...props}>
      <div 
        className={cn('h-full rounded-full transition-all', variantColors[variant])}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export const hiveProgressVariants = {};