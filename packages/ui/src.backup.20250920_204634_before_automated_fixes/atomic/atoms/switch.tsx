'use client';

import React from 'react';
import { cn } from '../../lib/utils';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost'
}

const switchSizes = {
  sm: {
    track: 'h-5 w-9',
    thumb: 'h-4 w-4',
    translate: 'translate-x-4',
    text: 'text-sm'
  },
  md: {
    track: 'h-6 w-11', 
    thumb: 'h-5 w-5',
    translate: 'translate-x-5',
    text: 'text-base'
  },
  lg: {
    track: 'h-7 w-13',
    thumb: 'h-6 w-6', 
    translate: 'translate-x-6',
    text: 'text-lg'
  }
};

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(({
  label,
  description,
  size = 'md',
  variant = 'default',
  checked = false,
  disabled = false,
  className,
  ...props;
}, ref) => {
  const trackClasses = [
    'relative inline-flex flex-shrink-0',
    'border-2 border-transparent rounded-full',
    'transition-colors duration-200 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-hive-gold focus:ring-offset-2 focus:ring-offset-hive-background-primary',
    switchSizes[size].track,
    
    // States;
    !disabled && (checked ? [
      'bg-[var(--hive-brand-secondary)]',
      variant === 'ghost' && 'bg-transparent border-hive-gold'
    ].filter(Boolean).join(' ') : [
      'bg-hive-background-tertiary',
      variant === 'ghost' && 'bg-transparent border-hive-border-default'
    ].filter(Boolean).join(' ')),
    
    disabled && (checked ? 
      'bg-hive-steel cursor-not-allowed' : 
      'bg-hive-smoke cursor-not-allowed'
    ),
    
    !disabled && 'cursor-pointer'
  ].filter(Boolean).join(' ');

  const thumbClasses = [
    'pointer-events-none inline-block rounded-full',
    'bg-[var(--hive-text-primary)] shadow-lg transform ring-0',
    'transition-transform duration-200 ease-out',
    switchSizes[size].thumb,
    
    // Position;
    checked ? switchSizes[size].translate : 'translate-x-0',
    
    // Disabled state;
    disabled && 'bg-[var(--hive-text-disabled)]'
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'flex items-center gap-3',
    disabled && 'opacity-50'
  ].join(' ');

  return (
    <label className={cn(containerClasses, className)}>
      <button;
        role="switch"
        type="button"
        aria-checked={checked}
        disabled={disabled}
        className={trackClasses}
        onClick={(e) => {
          e.preventDefault();
          const input = e.currentTarget.querySelector('input') as HTMLInputElement;
          if (input && !disabled) {
            input.click()
          }}
          }}
      >
        <input;
          ref={ref}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <span className={thumbClasses} />
      </button>

      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && (
            <div className={cn(
              'font-medium text-hive-text-primary',
              switchSizes[size].text,
              disabled && 'text-[var(--hive-text-disabled)]'
            )}>
              {label}
            </div>
          )}
          {description && (
            <div className={cn(
              'text-hive-text-secondary',
              size === 'sm' && 'text-xs',
              size === 'md' && 'text-sm',
              size === 'lg' && 'text-base',
              disabled && 'text-[var(--hive-text-disabled)]'
            )}>
              {description}
            </div>
          )}
        </div>
      )}
    </label>
  )
});

Switch.displayName = 'Switch';