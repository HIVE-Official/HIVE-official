import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "surface";
  size?: "sm" | "default" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles with better mobile touch targets
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "active:scale-95 transition-transform duration-75", // Subtle press feedback
          // Variant styles
          {
            "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
            "border border-input hover:bg-accent hover:text-accent-foreground": variant === "outline",
            "bg-surface hover:bg-surface-hover": variant === "surface",
          },
          // Size styles with minimum 44px touch targets for mobile
          {
            "h-9 px-3 text-sm": size === "sm", // 36px - for compact interfaces
            "h-11 px-4 py-2.5 text-base min-h-[44px]": size === "default", // 44px+ - optimal mobile
            "h-12 px-6 py-3 text-lg min-h-[48px]": size === "lg", // 48px+ - primary actions
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button"; 