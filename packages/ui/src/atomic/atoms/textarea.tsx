'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle } from 'lucide-react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'outline' | 'filled' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  maxLength?: number;
  showCount?: boolean;
  fullWidth?: boolean
}

const textareaVariants = {
  default: [
    'bg-transparent',
    'border border-[var(--hive-border-default)]',
    'focus:border-[var(--hive-brand-secondary)] focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/20',
    'hover:border-[var(--hive-border-hover)]'
  ].join(' '),
  outline: [
    'bg-transparent',
    'border border-[var(--hive-border-default)]',
    'focus:border-[var(--hive-brand-secondary)] focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/20',
    'hover:border-[var(--hive-border-hover)]'
  ].join(' '),
  ghost: [
    'bg-transparent',
    'border border-transparent',
    'focus:bg-[var(--hive-background-secondary)] focus:border-[var(--hive-border-default)]'
  ].join(' '),
  filled: [
    'bg-[var(--hive-background-secondary)]',
    'border border-transparent',
    'focus:bg-[var(--hive-background-tertiary)] focus:border-[var(--hive-brand-secondary)]'
  ].join(' ')
};

const textareaSizes = {
  sm: 'p-4 text-sm min-h-24',
  md: 'p-5 text-sm min-h-32',
  lg: 'p-6 text-base min-h-40'
};

const resizeClasses = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x', 
  both: 'resize'
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  helperText,
  variant = 'default',
  size = 'md',
  resize = 'vertical',
  maxLength,
  showCount = false,
  fullWidth = true,
  className,
  disabled,
  value,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = React.useState(value || '');
  const currentLength = typeof value === 'string' ? value.length : (typeof internalValue === 'string' ? internalValue.length : 0);

  React.useEffect(() => {
    if (typeof value === 'string') {
      setInternalValue(value)
    }
  }, [value]);

  const baseClasses = [
    // Layout - chip feel with high radius
    'w-full rounded-2xl',
    'transition-all duration-200 ease-out',
    
    // Typography
    'font-medium text-[var(--hive-text-primary)]',
    'placeholder:text-[var(--hive-text-tertiary)]',
    
    // Focus
    'focus:outline-none',
    
    // States
    'disabled:opacity-50 disabled:cursor-not-allowed',
    error && 'border-hive-ruby focus:border-hive-ruby focus:ring-hive-ruby/20',
    
    // Variants and sizing
    textareaVariants[variant],
    textareaSizes[size],
    resizeClasses[resize],
    
    // Width
    fullWidth && 'w-full'
  ].filter(Boolean).join(' ');

  const showCharacterCount = showCount && maxLength;

  return (
    <div className={cn('space-y-2', fullWidth && 'w-full')}>
      {label && (
        <label className="block text-sm font-medium text-hive-text-primary">
          {label}
        </label>
      )}
      
      <div className="relative">
        <textarea
          ref={ref}
          value={value}
          maxLength={maxLength}
          disabled={disabled}
          className={cn(baseClasses, className)}
          onChange={(e) => {
            setInternalValue(e.target.value);
            props.onChange?.(e)
          }}
          {...props}
        />
        
        {error && (
          <div className="absolute top-3 right-3">
            <AlertCircle className="h-4 w-4 text-hive-ruby" />
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          {error && (
            <p className="text-xs text-hive-ruby">
              {error}
            </p>
          )}
          {!error && helperText && (
            <p className="text-xs text-hive-text-secondary">
              {helperText}
            </p>
          )}
        </div>
        
        {showCharacterCount && (
          <p className={cn(
            'text-xs',
            currentLength > maxLength! * 0.9 ? 'text-[var(--hive-brand-secondary)]' : 'text-hive-text-secondary',
            currentLength >= maxLength! && 'text-hive-ruby'
          )}>
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  )
});

Textarea.displayName = 'Textarea';