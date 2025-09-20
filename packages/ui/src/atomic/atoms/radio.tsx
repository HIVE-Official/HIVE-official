'use client';

import React from 'react';
import { cn } from '../../lib/utils';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean
}

export interface RadioProps {
  name: string;
  options: RadioOption[];
  value?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card';
  orientation?: 'vertical' | 'horizontal';
  error?: string;
  disabled?: boolean;
  onChange?: (value: string) => void
}

export interface SingleRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card';
  error?: string
}

const radioSizes = {
  sm: {
    radio: 'h-4 w-4',
    text: 'text-sm',
    dot: 'h-2 w-2'
  },
  md: {
    radio: 'h-5 w-5',
    text: 'text-base',
    dot: 'h-2.5 w-2.5'
  },
  lg: {
    radio: 'h-6 w-6',
    text: 'text-lg',
    dot: 'h-3 w-3'
  }
};

// Single Radio Component
export const SingleRadio = React.forwardRef<HTMLInputElement, SingleRadioProps>(({
  label,
  description,
  size = 'md',
  variant = 'default',
  error,
  checked = false,
  disabled = false,
  className,
  ...props
}, ref) => {
  const radioClasses = [
    'relative flex items-center justify-center',
    'border-2 rounded-full',
    'transition-all duration-200 ease-out',
    radioSizes[size].radio,
    
    // States
    !disabled && !error && [
      'border-hive-border-default',
      'hover:border-hive-gold',
      'focus-within:border-hive-gold focus-within:ring-2 focus-within:ring-hive-gold/20'
    ].filter(Boolean).join(' '),
    
    disabled && [
      'border-[var(--hive-border-default)]',
      'bg-hive-smoke',
      'cursor-not-allowed'
    ].join(' '),
    
    error && [
      'border-hive-ruby',
      'focus-within:border-hive-ruby focus-within:ring-2 focus-within:ring-hive-ruby/20'
    ].join(' '),
    
    // Checked state
    checked && !disabled && [
      'bg-[var(--hive-brand-secondary)] border-hive-gold',
      error && 'bg-hive-ruby border-hive-ruby'
    ].filter(Boolean).join(' ')
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'flex items-start gap-3',
    variant === 'card' && [
      'p-4 rounded-xl border border-hive-border-default',
      'hover:bg-hive-background-interactive',
      !disabled && 'cursor-pointer',
      disabled && 'opacity-50'
    ].filter(Boolean).join(' ')
  ].filter(Boolean).join(' ');

  return (
    <label className={cn(containerClasses, className)}>
      <div className={radioClasses}>
        <input
          ref={ref}
          type="radio"
          checked={checked}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        
        {checked && (
          <div className={cn(
            'rounded-full bg-[var(--hive-text-primary)]',
            radioSizes[size].dot,
            disabled && 'bg-[var(--hive-text-disabled)]'
          )} />
        )}
      </div>

      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && (
            <div className={cn(
              'font-medium text-hive-text-primary',
              radioSizes[size].text,
              disabled && 'text-[var(--hive-text-disabled)]'
            )}>
              {label}
            </div>
          )}
          {description && (
            <div className={cn(
              'text-hive-text-secondary mt-1',
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

SingleRadio.displayName = 'SingleRadio';

// Radio Group Component
export const Radio: React.FC<RadioProps> = ({
  name,
  options,
  value,
  size = 'md',
  variant = 'default',
  orientation = 'vertical',
  error,
  disabled = false,
  onChange
}) => {
  const handleChange = (optionValue: string) => {
    if (!disabled) {
      onChange?.(optionValue)
    }
  };

  const containerClasses = [
    'space-y-3',
    orientation === 'horizontal' && 'flex flex-wrap gap-4 space-y-0'
  ].filter(Boolean).join(' ');

  return (
    <div className="space-y-2">
      <div className={containerClasses}>
        {options.map((option) => (
          <SingleRadio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            description={option.description}
            size={size}
            variant={variant}
            checked={value === option.value}
            disabled={disabled || option.disabled}
            error={error}
            onChange={() => handleChange(option.value)}
          />
        ))}
      </div>
      
      {error && (
        <p className="text-xs text-hive-ruby">
          {error}
        </p>
      )}
    </div>
  )
};