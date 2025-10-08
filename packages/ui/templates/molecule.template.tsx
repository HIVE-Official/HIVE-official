'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * {{ComponentName}} - HIVE Molecule Component
 *
 * Atomic Design: Combination of atoms into functional unit
 * Built in Storybook, exported to production
 *
 * Behavioral Design Considerations:
 * - User feedback and interaction patterns
 * - Loading and error states
 * - Accessibility (WCAG 2.1 AA)
 */

const {{componentName}}Variants = cva(
  "flex flex-col gap-2 transition-all",
  {
    variants: {
      variant: {
        default: "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)]",
        elevated: "bg-[var(--hive-background-secondary)] shadow-hive-level2",
        glass: "hive-glass border border-[var(--hive-border-default)]",
      },
      size: {
        default: "p-4",
        sm: "p-3",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface {{ComponentName}}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof {{componentName}}Variants> {
  /**
   * Loading state - show skeleton or spinner
   */
  isLoading?: boolean;
  /**
   * Error state - show error message
   */
  error?: string | null;
}

export const {{ComponentName}} = React.forwardRef<
  HTMLDivElement,
  {{ComponentName}}Props
>(({ className, variant, size, isLoading, error, children, ...props }, ref) => {
  // Handle loading state
  if (isLoading) {
    return (
      <div
        ref={ref}
        className={cn({{componentName}}Variants({ variant, size }), "animate-pulse", className)}
        {...props}
      >
        <div className="h-4 bg-[var(--hive-border-default)] rounded" />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div
        ref={ref}
        className={cn({{componentName}}Variants({ variant, size }), "border-[var(--hive-status-error)]", className)}
        {...props}
      >
        <p className="text-[var(--hive-status-error)] text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn({{componentName}}Variants({ variant, size }), className)}
      {...props}
    >
      {children}
    </div>
  );
});

{{ComponentName}}.displayName = "{{ComponentName}}";
