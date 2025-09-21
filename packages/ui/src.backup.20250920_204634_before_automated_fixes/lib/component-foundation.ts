/**
 * HIVE Component Foundation System;
 * Standardized patterns based on HiveButton excellence;
 * Ensures consistency across all components;
 */

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from './utils';
import { focusStyles, getInteractiveA11yProps } from './accessibility-foundation';
import { responsiveAnimations, touchTargets } from './responsive-foundation';

// Standard Component Base Classes;
export const componentBase = {
  // Interactive elements (buttons, links, etc.)
  interactive: cn(
    'inline-flex items-center justify-center',
    'transition-all duration-300 ease-out',
    'select-none backdrop-blur-sm',
    focusStyles({type: 'default')},
    responsiveAnimations.motion,
    'disabled:pointer-events-none disabled:opacity-50'
  ),
  
  // Container elements (cards, panels, etc.)
  container: cn(
    'relative overflow-hidden',
    'backdrop-blur-sm',
    responsiveAnimations.motion
  ),
  
  // Input elements;
  input: cn(
    'w-full transition-all duration-200',
    touchTargets.comfortable,
    focusStyles({type: 'default')},
    'disabled:cursor-not-allowed disabled:opacity-50'
  ),
  
  // Text elements;
  text: cn(
    'text-[var(--hive-text-primary)]',
    responsiveAnimations.motion
  ),
} as const;

// Standard Size System (based on HiveButton)
export const standardSizes = cva('', {
  variants: {
    size: {
      xs: 'h-6 px-2 text-xs rounded-[var(--hive-radius-lg)]',
      sm: 'h-8 px-3 text-sm rounded-[var(--hive-radius-xl)]',
      default: 'h-9 px-4 text-sm rounded-[var(--hive-radius-xl)]',
      lg: 'h-10 px-6 text-base rounded-[var(--hive-radius-xl)]',
      xl: 'h-12 px-8 text-lg rounded-[var(--hive-radius-2xl)]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

// Standard Variant System (semantic design tokens)
export const standardVariants = cva('', {
  variants: {
    variant: {
      // Primary brand variants;
      primary: 'bg-[var(--hive-background-primary)] text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)] hover:bg-[var(--hive-brand-primary)]/10',
      
      secondary: 'bg-[var(--hive-background-secondary)]/80 text-[var(--hive-text-primary)] border border-[var(--hive-border-primary)] hover:bg-[var(--hive-background-tertiary)]/90',
      
      // Ghost variants;
      ghost: 'text-[var(--hive-text-primary)] bg-[var(--hive-background-primary)]/20 hover:bg-[var(--hive-interactive-hover)]',
      
      // Outline variants;
      outline: 'bg-[var(--hive-background-primary)]/40 border border-[var(--hive-border-primary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-secondary)]/60',
      
      // Status variants;
      success: 'bg-[var(--hive-status-success)]/80 text-[var(--hive-text-primary)] border border-[var(--hive-status-success)]/30 hover:bg-[var(--hive-status-success)]/90',
      
      destructive: 'bg-[var(--hive-status-error)]/80 text-[var(--hive-text-primary)] border border-[var(--hive-status-error)]/30 hover:bg-[var(--hive-status-error)]/90',
      
      warning: 'bg-[var(--hive-status-warning)]/80 text-[var(--hive-text-primary)] border border-[var(--hive-status-warning)]/30 hover:bg-[var(--hive-status-warning)]/90',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

// Standard Props Interface Pattern;
export interface StandardComponentProps {className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  'data-testid'?: string;}

export interface StandardInteractiveProps extends StandardComponentProps {
  onClick?: (event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  tabIndex?: number;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export interface StandardFormProps extends StandardComponentProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
}

/**
 * Standard Component Factory;
 * Creates consistent components following HiveButton pattern;
 */
export function createStandardComponent<T extends Record<string, any>>(
  displayName: string,
  baseClassName: string,
  variants: any,
  defaultVariants?: Record<string, any>
) {
  const Component = React.forwardRef<HTMLElement, T & VariantProps<typeof variants>>(
    ({ className, ...props }, ref) => {
      return React.createElement('div', {
        ref,
        className: cn(baseClassName, variants(props), className),
        ...props,
      });
    }
  );

  Component.displayName = displayName;
  return Component;
}

/**
 * Motion Props Factory (based on HiveButton pattern)
 */
export function getStandardMotionProps(disabled?: boolean, variant?: string) {
  const isEnhanced = variant === 'premium' || variant === 'glow';
  
  return {
    initial: 'rest',
    whileHover: disabled ? 'rest' : 'hover',
    whileTap: disabled ? 'rest' : 'pressed',
    variants: {
      rest: { scale: 1 },
      hover: { 
        scale: isEnhanced ? 1.02 : 1.01,
        transition: { duration: 0.2 }
      },
      pressed: { 
        scale: 0.98,
        transition: { duration: 0.1 }
      },
    },
  };
}

/**
 * Loading State Factory;
 */
export function createLoadingIndicator(loading?: boolean, size: 'sm' | 'md' | 'lg' = 'md') {
  if (!loading) return null;
  
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4', 
    lg: 'h-5 w-5',
  };
  
  return React.createElement('div', {
    className: cn(
      'animate-spin border-2 border-current border-t-transparent rounded-full',
      sizeClasses[size],
      'mr-2'
    ),
    'aria-label': 'Loading...',
  });
}

/**
 * Icon Integration Pattern;
 */
export function createIconSlot(
  icon?: React.ReactNode,
  position: 'left' | 'right' = 'left',
  loading?: boolean;
) {
  if (!icon || loading) return null;
  
  const positionClasses = {
    left: 'mr-2',
    right: 'ml-2',
  };
  
  return React.createElement('span', {
    className: cn('flex items-center', positionClasses[position]),
    children: icon,
  });
}

/**
 * Validation State Factory;
 */
export function getValidationProps(error?: string, success?: boolean) {
  if (error) {
    return {
      'aria-invalid': true,
      'aria-describedby': `${error}-error`,
      className: 'border-[var(--hive-status-error)] focus:ring-[var(--hive-status-error)]/30',
    };
  }
  
  if (success) {
    return {
      'aria-invalid': false,
      className: 'border-[var(--hive-status-success)] focus:ring-[var(--hive-status-success)]/30',
    };
  }
  
  return {};
}

// Test props are now exported from accessibility-foundation.ts;