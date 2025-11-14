import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const surfaceVariants = cva(
  "relative rounded-2xl border border-[var(--hive-border-subtle)] bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] transition-[box-shadow,transform] duration-200 ease-out",
  {
    variants: {
      tone: {
        default: "bg-[var(--hive-background-secondary)] border-[var(--hive-border-subtle)]",
        subtle: "bg-[var(--hive-background-primary)] border-[var(--hive-border-subtle)]",
        contrast: "bg-[var(--hive-background-tertiary)] border-[var(--hive-border-primary)]",
        inverted: "bg-[var(--hive-background-primary)] text-[var(--hive-text-inverse)] border-[var(--hive-border-primary)]",
        glass:
          "border-[color-mix(in_srgb,var(--hive-border-subtle) 60%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 72%,transparent)] backdrop-blur-[12px]",
      },
      elevation: {
        flat: "shadow-none",
        sm: "shadow-[0_12px_24px_rgba(0,0,0,0.18)]",
        md: "shadow-[0_16px_36px_rgba(0,0,0,0.26)]",
        lg: "shadow-[0_24px_48px_rgba(0,0,0,0.32)]",
      },
      padding: {
        none: "p-0",
        xs: "p-3",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
      radius: {
        md: "rounded-xl",
        lg: "rounded-2xl",
        full: "rounded-[24px]",
      },
      interactive: {
        true: "hover:-translate-y-px hover:shadow-[0_24px_56px_rgba(0,0,0,0.36)]",
      },
    },
    defaultVariants: {
      tone: "default",
      elevation: "sm",
      padding: "md",
      radius: "lg",
    },
  }
);

export interface SurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof surfaceVariants> {
  /**
   * Adds `role="presentation"` when the surface is purely decorative.
   */
  decorative?: boolean;
}

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, tone, elevation, padding, radius, interactive, decorative, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role={decorative ? "presentation" : props.role}
        className={cn(
          surfaceVariants({ tone, elevation, padding, radius, interactive }),
          className
        )}
        {...props}
      />
    );
  }
);
Surface.displayName = "Surface";

export { surfaceVariants };
