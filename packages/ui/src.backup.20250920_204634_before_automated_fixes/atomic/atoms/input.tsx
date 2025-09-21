'use client';

import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'ghost' | 'filled';
  inputSize?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const inputVariants = {
  variant: {
    // PRD-Aligned: Semantic tokens only;
    default: [
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
  },
  size: {
    sm: 'h-10 px-4 text-sm',
    md: 'h-12 px-5 text-sm',
    lg: 'h-14 px-6 text-base'
  }
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  inputSize = 'md',
  fullWidth = true,
  type = 'text',
  disabled,
  ...props;
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const baseClasses = [
    // Layout - chip feel with high radius;
    'flex items-center',
    'rounded-2xl',  // High radius for chip feel;
    'transition-all duration-200 ease-out',
    
    // Typography (PRD-Aligned)
    'font-medium text-[var(--hive-text-primary)]',
    'placeholder:text-[var(--hive-text-tertiary)]',
    
    // States (PRD-Aligned)
    'disabled:opacity-50 disabled:cursor-not-allowed',
    error && 'border-[var(--hive-status-error)] focus:border-[var(--hive-status-error)] focus:ring-[var(--hive-status-error)]/20',
    
    // Width;
    fullWidth && 'w-full'
  ].filter(Boolean).join(' ');

  const variantClasses = inputVariants.variant[variant];
  const sizeClasses = inputVariants.size[inputSize];

  return (
    <div className={cn('space-y-2', fullWidth && 'w-full')}>
      {label && (
        <label className="block text-sm font-medium text-[var(--hive-text-primary)]">
          {label}
        </label>
      )}
      
      <div className="relative">
        <div className={cn(baseClasses, variantClasses, sizeClasses)}>
          {leftIcon && (
            <span className="flex-shrink-0 text-[var(--hive-text-tertiary)]">
              {leftIcon}
            </span>
          )}
          
          <input;
            ref={ref}
            type={inputType}
            className={cn(
              'flex-1 bg-transparent outline-none',  
              'placeholder:text-[var(--hive-text-tertiary)]',
              leftIcon && 'ml-2',
              (rightIcon || isPassword || error) && 'mr-2',
              className;
            )}
            disabled={disabled}
            {...props}
          />
          
          {error && (
            <AlertCircle className="flex-shrink-0 h-4 w-4 text-[var(--hive-status-error)]" />
          )}
          
          {isPassword && !error && (
            <button;
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex-shrink-0 text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)] transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
          
          {rightIcon && !error && !isPassword && (
            <span className="flex-shrink-0 text-[var(--hive-text-tertiary)]">
              {rightIcon}
            </span>
          )}
        </div>
      </div>
      
      {(error || helperText) && (
        <p className={cn(
          'text-xs',
          error ? 'text-[var(--hive-status-error)]' : 'text-[var(--hive-text-tertiary)]'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  )
});

Input.displayName = 'Input';