'use client';

import React from 'react';
import { cn } from '../../lib/utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'inline' | 'floating';
  disabled?: boolean;
  children: React.ReactNode
}

const labelSizes = {
  sm: 'text-xs',
  md: 'text-sm', 
  lg: 'text-base'
};

const labelVariants = {
  default: 'block font-medium text-[var(--hive-text-primary)]',
  inline: 'inline-flex items-center font-medium text-[var(--hive-text-primary)]',
  floating: 'absolute font-medium text-[var(--hive-text-secondary)] transition-all duration-200 ease-out'
};

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({
  htmlFor,
  required = false,
  size = 'md',
  variant = 'default',
  disabled = false,
  className,
  children,
  ...props
}, ref) => {
  const baseClasses = [
    labelVariants[variant],
    labelSizes[size],
    
    // Disabled state
    disabled && 'opacity-50 cursor-not-allowed',
    
    // Floating variant positioning
    variant === 'floating' && [
      'left-3 top-2.5',
      'pointer-events-none',
      'peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-[var(--hive-text-muted)]',
      'peer-focus:-top-2 peer-focus:left-2 peer-focus:text-xs peer-focus:text-[var(--hive-brand-secondary)]',
      'peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:text-xs'
    ].join(' ')
  ].filter(Boolean).join(' ');

  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={cn(baseClasses, className)}
      {...props}
    >
      {children}
      {required && (
        <span 
          className="text-[var(--hive-status-error)] ml-1" 
          aria-label="required"
          title="This field is required"
        >
          *
        </span>
      )}
    </label>
  )
});

Label.displayName = 'Label';