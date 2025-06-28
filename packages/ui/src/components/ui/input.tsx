import React from "react";
import { cn } from "../../lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Mobile-optimized input with better touch targets
          "flex h-11 w-full rounded-md border border-input bg-background px-4 py-3 text-base min-h-[44px]",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Better mobile keyboard handling
          "selection:bg-accent/20",
          // Ensure no zoom on iOS (16px font prevents zoom)
          "text-base sm:text-sm", // 16px on mobile prevents zoom, 14px on desktop
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input"; 