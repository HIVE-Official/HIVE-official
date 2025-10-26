import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import "./badge.css";
import { cn } from "@/utils/index";

const badgeVariants = cva("badge-root", {
  variants: {
    variant: {
      gold: "badge-gold",
      neutral: "badge-neutral",
      outline: "badge-outline",
      success: "badge-success",
      warning: "badge-warning",
      destructive: "badge-destructive",
      muted: "badge-muted",
      // Legacy aliases mapped to semantic tokens
      secondary: "badge-muted",
      default: "badge-neutral",
      soft: "badge-muted"
    }
  },
  defaultVariants: {
    variant: "neutral"
  }
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

function Badge({ className, variant, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
    </div>
  );
}

export { Badge, badgeVariants };
