'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Onboarding Step Indicator
 *
 * Progress indicator for onboarding
 */

const onboardingstepindicatorVariants = cva(
  'relative w-full border rounded-lg p-4 bg-[var(--hive-surface-primary)]',
  {
    variants: {
      variant: {
        default: 'border-[var(--hive-border-default)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface OnboardingStepIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof onboardingstepindicatorVariants> {
  currentStep?: any;
  totalSteps?: any;
  completedSteps?: any;
  isLoading?: boolean;
  error?: string;
}

export const OnboardingStepIndicator = React.forwardRef<
  HTMLDivElement,
  OnboardingStepIndicatorProps
>(
  (
    {
      className,
      variant,
      isLoading = false,
      error,
      ...props
    },
    ref
  ) => {
    if (isLoading) {
      return (
        <div
          ref={ref}
          className={cn(onboardingstepindicatorVariants({ variant }), className)}
          {...props}
        >
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-[var(--hive-surface-secondary)] rounded" />
            <div className="h-4 bg-[var(--hive-surface-secondary)] rounded w-3/4" />
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div
          ref={ref}
          className={cn(onboardingstepindicatorVariants({ variant }), 'border-[var(--hive-error)]', className)}
          {...props}
        >
          <p className="text-[var(--hive-error)]">Error: {error}</p>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(onboardingstepindicatorVariants({ variant }), className)}
        {...props}
      >
        <div className="text-center py-8">
          <p className="text-2xl mb-2">🎨</p>
          <p className="text-[var(--hive-text-primary)] font-semibold mb-1">
            Onboarding Step Indicator
          </p>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
            Progress indicator for onboarding
          </p>
          <div className="p-2 bg-[var(--hive-surface-tertiary)] rounded text-xs text-[var(--hive-text-tertiary)]">
            ⚠️ SKELETON: UI/UX to be designed in Storybook review
          </div>
        </div>
      </div>
    );
  }
);

OnboardingStepIndicator.displayName = 'OnboardingStepIndicator';
