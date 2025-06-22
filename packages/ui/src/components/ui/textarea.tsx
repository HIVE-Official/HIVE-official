import * as React from "react";

import { cn } from "../../lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Error state styling */
  error?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "min-h-[80px] px-3 py-2 text-sm",
      md: "min-h-[100px] px-4 py-3 text-sm",
      lg: "min-h-[120px] px-4 py-3 text-base",
    };

    return (
      <textarea
        className={cn(
          // Base styles
          "flex w-full rounded-lg border-2 bg-transparent transition-all duration-150 ease-out resize-none",
          "placeholder:text-text-muted focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",

          // Default state
          "border-white/12 hover:border-white/20 focus-visible:border-accent-gold",
          "focus-visible:ring-2 focus-visible:ring-accent-gold/20 focus-visible:ring-offset-0",

          // Error state
          error && [
            "border-red-500/50 focus-visible:border-red-500",
            "focus-visible:ring-red-500/20",
          ],

          // Size variants
          sizeClasses[size],

          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
