'use client';

import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

export interface EmailInputProps {
  value?: string;
  onChange?: (value: string) => void;
  domain?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const emailSizes = {
  sm: 'h-10 text-sm',
  md: 'h-12 text-sm',
  lg: 'h-14 text-base'
};

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(({
  value = '',
  onChange,
  domain = 'university.edu',
  placeholder = 'username',
  label,
  error,
  size = 'md',
  className,
  ...props
}, ref) => {
  
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-[var(--hive-text-primary)]">
          {label}
          {error && <span className="text-[var(--hive-status-error)] ml-1">*</span>}
        </label>
      )}
      
      <div className="flex items-center">
        {/* Username Input */}
        <div className={cn(
          'flex items-center flex-1 px-5',
          'bg-transparent border border-[var(--hive-border-default)]',
          'rounded-2xl rounded-r-none border-r-0',
          'focus-within:border-[var(--hive-brand-secondary)] focus-within:ring-2 focus-within:ring-[var(--hive-brand-secondary)]/20',
          'hover:border-[var(--hive-border-hover)]',
          'transition-all duration-200 ease-out',
          emailSizes[size],
          error && 'border-[var(--hive-status-error)] focus-within:border-[var(--hive-status-error)]'
        )}>
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className={cn(
              'flex-1 bg-transparent outline-none',
              'font-medium text-[var(--hive-text-primary)]',
              'placeholder:text-[var(--hive-text-tertiary)]'
            )}
            {...props}
          />
        </div>
        
        {/* Domain Display */}
        <div className={cn(
          'flex items-center px-5',
          'bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)]',
          'rounded-2xl rounded-l-none',
          'font-medium text-[var(--hive-text-secondary)]',
          emailSizes[size],
          error && 'border-[var(--hive-status-error)]'
        )}>
          @{domain}
        </div>
      </div>
      
      {error && (
        <p className="text-xs text-[var(--hive-status-error)]">
          {error}
        </p>
      )}
    </div>
  );
});

EmailInput.displayName = 'EmailInput';