import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const separatorVariants = cva("bg-[var(--hive-border-subtle)]", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px h-full",
    },
    inset: {
      none: "",
      sm: "mx-4",
      md: "mx-6",
      lg: "mx-8",
    },
    tone: {
      default: "bg-[var(--hive-border-subtle)]",
      muted: "bg-[var(--hive-border-muted)]",
      contrast: "bg-[var(--hive-border-primary)]/80",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    inset: "none",
    tone: "default",
  },
});

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation, inset, tone, role = "separator", ...props }, ref) => {
    const ariaOrientation = orientation === "vertical" ? "vertical" : "horizontal";
    return (
      <div
        ref={ref}
        role={role}
        aria-orientation={ariaOrientation}
        className={cn(separatorVariants({ orientation, inset, tone }), className)}
        {...props}
      />
    );
  }
);
Separator.displayName = "Separator";

export { separatorVariants };
