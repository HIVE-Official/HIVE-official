/**
 * Touch-Safe Button Component
 * Ensures all buttons meet 44px minimum touch target requirements
 * Replaces inconsistent button implementations across the app
 */

import React from 'react';
import { HiveButton as BaseButton } from '@hive/ui';
import { cn } from '../../lib/utils';

interface TouchSafeButtonProps extends React.ComponentPropsWithoutRef<typeof BaseButton> {
  size?: 'sm' | 'default' | 'lg' | 'icon' | 'xl';
  loading?: boolean;
  loadingText?: string;
}

export const TouchSafeButton = React.forwardRef<
  HTMLButtonElement,
  TouchSafeButtonProps
>(({
  className,
  size = 'default',
  children,
  disabled,
  loading = false,
  loadingText = 'Loading...',
  ...props
}, ref) => {
  // Ensure minimum touch target sizes
  const touchTargetClasses = {
    sm: 'min-h-[44px] min-w-[44px] px-4 py-2.5',
    default: 'min-h-[44px] min-w-[88px] px-6 py-3',
    lg: 'min-h-[48px] min-w-[120px] px-8 py-3.5',
    xl: 'min-h-[52px] min-w-[140px] px-10 py-4',
    icon: 'min-h-[44px] min-w-[44px] p-0 flex items-center justify-center'
  };

  return (
    <BaseButton
      ref={ref}
      className={cn(
        // Base touch target compliance
        touchTargetClasses[size],
        // Ensure proper tap highlighting on mobile
        'touch-manipulation',
        // Better focus states for accessibility
        'focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-primary)] focus:ring-offset-2 focus:ring-offset-[var(--hive-background-primary)]',
        // Loading state styles
        loading && 'relative cursor-wait opacity-70',
        className
      )}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="opacity-0">{children}</span>
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-label={loadingText}
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span className="sr-only">{loadingText}</span>
          </span>
        </>
      ) : (
        children
      )}
    </BaseButton>
  );
});

TouchSafeButton.displayName = 'TouchSafeButton';

// Icon button variant with guaranteed 44px touch target
export const TouchSafeIconButton = React.forwardRef<
  HTMLButtonElement,
  Omit<TouchSafeButtonProps, 'size'>
>(({ className, ...props }, ref) => {
  return (
    <TouchSafeButton
      ref={ref}
      size="icon"
      className={cn('rounded-full', className)}
      {...props}
    />
  );
});

TouchSafeIconButton.displayName = 'TouchSafeIconButton';

// Mobile navigation button with proper sizing
export const MobileNavButton = React.forwardRef<
  HTMLButtonElement,
  TouchSafeButtonProps
>(({ className, ...props }, ref) => {
  return (
    <TouchSafeButton
      ref={ref}
      size="icon"
      className={cn(
        'text-white/60 hover:text-white hover:bg-white/10',
        'transition-all duration-200',
        className
      )}
      {...props}
    />
  );
});

MobileNavButton.displayName = 'MobileNavButton';