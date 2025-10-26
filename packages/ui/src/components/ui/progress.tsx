"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/utils/index"

type Thickness = "sm" | "md" | "lg";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    thickness?: Thickness
  }
>(({ className, value = 0, thickness = "md", ...props }, ref) => {
  const thicknessClass =
    thickness === "sm" ? "h-1.5" : thickness === "lg" ? "h-3" : "h-2";
  const safeValue =
    typeof value === "number"
      ? Math.min(Math.max(value, 0), 100)
      : 0;
  return (
    <ProgressPrimitive.Root
      ref={ref}
      value={typeof value === "number" ? value : undefined}
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-foreground/10",
        thicknessClass,
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 bg-primary",
          "transition-transform duration-200 motion-reduce:transition-none"
        )}
        style={{ transform: `translateX(-${100 - safeValue}%)` }}
      />
    </ProgressPrimitive.Root>
  );
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
