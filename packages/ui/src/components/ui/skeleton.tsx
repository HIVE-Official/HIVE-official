import * as React from "react";
import { cn } from "../../lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: "rounded" | "circle";
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, shape = "rounded", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative isolate overflow-hidden bg-white/10 dark:bg-zinc-800",
        shape === "rounded" ? "rounded-md" : "rounded-full",
        "after:absolute after:inset-y-0 after:-translate-x-full after:w-full after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent after:animate-shimmer",
        className
      )}
      {...props}
    />
  )
);
Skeleton.displayName = "Skeleton";
