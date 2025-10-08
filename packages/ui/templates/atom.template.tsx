import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * {{ComponentName}} - HIVE Atom Component
 *
 * Atomic Design: Foundational UI element
 * Built in Storybook, exported to production
 */

const {{componentName}}Variants = cva(
  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-primary)] disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)]",
        secondary: "bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]",
      },
      size: {
        default: "h-11 px-4 min-h-[44px]", // Mobile-first touch target
        sm: "h-11 px-3 min-h-[44px]",
        lg: "h-12 px-8 min-h-[48px]",
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
    VariantProps<typeof {{componentName}}Variants> {}

export const {{ComponentName}} = React.forwardRef<
  HTMLDivElement,
  {{ComponentName}}Props
>(({ className, variant, size, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn({{componentName}}Variants({ variant, size }), className)}
      {...props}
    />
  );
});

{{ComponentName}}.displayName = "{{ComponentName}}";
