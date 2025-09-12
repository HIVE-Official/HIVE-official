import React from 'react';
import { cn } from '../lib/utils';

export interface HiveSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: Array<{ label: string; value: string }>;
  variant?: 'default' | 'ghost' | 'filled';
}

export const HiveSelect: React.FC<HiveSelectProps> = ({ 
  className, 
  options = [],
  variant = 'default',
  children,
  ...props 
}) => {
  const variantClasses = {
    default: 'border border-input bg-background',
    ghost: 'border-transparent bg-transparent hover:bg-accent',
    filled: 'bg-muted border-transparent',
  };
  
  return (
    <select 
      className={cn(
        'flex h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-background',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        className
      )} 
      {...props}
    >
      {options.map((option: { label: string; value: string }) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
      {children}
    </select>
  );
};

export const hiveSelectVariants = {};