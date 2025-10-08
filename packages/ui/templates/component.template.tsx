import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * {{COMPONENT_DESCRIPTION}}
 *
 * HIVE Design System Component
 * Built in Storybook, exported to production
 */

// REQUIRED: Define variants with CVA (Class Variance Authority)
const {{componentName}}Variants = cva(
  // Base classes - always applied
  "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-hover)] shadow-hive-level1",
        secondary: "bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)] shadow-hive-level1",
        outline: "border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-interactive-hover)] shadow-hive-level1",
        ghost: "hover:bg-[var(--hive-interactive-hover)] hover:text-[var(--hive-text-primary)]",
      },
      size: {
        default: "h-11 px-4 py-2 min-h-[44px]", // Mobile-first: 44px minimum touch target
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

// REQUIRED: Export TypeScript interface
export interface {{ComponentName}}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof {{componentName}}Variants> {
  /**
   * Additional props specific to this component
   */
}

// REQUIRED: Use React.forwardRef for ref forwarding
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

// REQUIRED: Set displayName for React DevTools
{{ComponentName}}.displayName = "{{ComponentName}}";
