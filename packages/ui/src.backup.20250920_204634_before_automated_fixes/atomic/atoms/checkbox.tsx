'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { Check, Minus } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card';
  indeterminate?: boolean;
}

const checkboxSizes = {
  sm: {
    box: 'h-4 w-4',
    text: 'text-sm',
    icon: 'h-3 w-3'
  },
  md: {
    box: 'h-5 w-5', 
    text: 'text-base',
    icon: 'h-3.5 w-3.5'
  },
  lg: {
    box: 'h-6 w-6',
    text: 'text-lg', 
    icon: 'h-4 w-4'
  }
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  description,
  error,
  size = 'md',
  variant = 'default',
  indeterminate = false,
  checked,
  className,
  disabled,
  ...props
}, ref) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const isChecked = indeterminate ? false : checked;
  const showCheck = isChecked || indeterminate;

  const boxClasses = [
    'relative flex items-center justify-center',
    'border-2 rounded-md',
    'transition-all duration-200 ease-out',
    checkboxSizes[size].box,
    
    // States;
    !disabled && !error && [
      'border-[var(--hive-border-default)]',
      'hover:border-[var(--hive-brand-gold)]',
      'focus-within:border-[var(--hive-brand-gold)] focus-within:ring-2 focus-within:ring-[var(--hive-brand-gold)]/20'
    ].filter(Boolean).join(' '),
    
    disabled && [
      'border-[var(--hive-border-default)]',
      'bg-[var(--hive-background-disabled)]',
      'cursor-not-allowed'
    ].join(' '),
    
    error && [
      'border-[var(--hive-status-error)]',
      'focus-within:border-[var(--hive-status-error)] focus-within:ring-2 focus-within:ring-[var(--hive-status-error)]/20'
    ].join(' '),
    
    // Checked state;
    showCheck && !disabled && [
      'bg-[var(--hive-brand-secondary)] border-[var(--hive-brand-gold)]',
      error && 'bg-[var(--hive-status-error)] border-[var(--hive-status-error)]'
    ].filter(Boolean).join(' ')
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'flex items-start gap-3',
    variant === 'card' && [
      'p-4 rounded-xl border border-[var(--hive-border-default)]',
      'hover:bg-[var(--hive-background-secondary)]',
      !disabled && 'cursor-pointer',
      disabled && 'opacity-50'
    ].filter(Boolean).join(' ')
  ].filter(Boolean).join(' ');

  return (
    <label className={cn(containerClasses, className)}>
      <div className={boxClasses}>
        <input
          ref={inputRef}
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        
        {showCheck && (
          <div className={cn(
            'flex items-center justify-center',
            'text-[var(--hive-background-primary)]',
            checkboxSizes[size].icon,
            disabled && 'text-[var(--hive-text-disabled)]'
          )}>
            {indeterminate ? (
              <Minus className="h-full w-full" />
            ) : (
              <Check className="h-full w-full" />
            )}
          </div>
        )}
      </div>

      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && (
            <div className={cn(
              'font-medium text-[var(--hive-text-primary)]',
              checkboxSizes[size].text,
              disabled && 'text-[var(--hive-text-disabled)]'
            )}>
              {label}
            </div>
          )}
          {description && (
            <div className={cn(
              'text-[var(--hive-text-secondary)] mt-1',
              size === 'sm' && 'text-xs',
              size === 'md' && 'text-sm',
              size === 'lg' && 'text-base',
              disabled && 'text-[var(--hive-text-disabled)]'
            )}>
              {description}
            </div>
          )}
          {error && (
            <div className={cn(
              'text-[var(--hive-status-error)] mt-1',
              size === 'sm' && 'text-xs',
              size === 'md' && 'text-sm', 
              size === 'lg' && 'text-base'
            )}>
              {error}
            </div>
          )}
        </div>
      )}
    </label>
  )
});

Checkbox.displayName = 'Checkbox';