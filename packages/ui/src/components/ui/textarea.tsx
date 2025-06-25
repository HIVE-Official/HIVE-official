import * as React from "react";

import { cn } from "../../lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Error state styling */
  error?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Motion-based error feedback */
  shake?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, size = "md", shake = false, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base styles with FORCE WHITE TEXT
          "flex min-h-[80px] w-full rounded-lg font-sans",
          "bg-surface border border-[#2A2A2A]",
          "!text-white placeholder:text-muted", // FORCE white text
          "transition-all duration-fast ease-hive-smooth",

          // Focus states
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "focus-visible:border-[#FFD700]",

          // Hover states
          "hover:border-muted hover:bg-[#181818]",

          // Disabled states
          "disabled:cursor-not-allowed disabled:opacity-50",
          "disabled:bg-[#0A0A0A] disabled:border-disabled",

          // Size variants
          size === "sm" && "min-h-[60px] px-3 py-2 text-body-sm",
          size === "md" && "min-h-[80px] px-4 py-3 text-body",
          size === "lg" && "min-h-[120px] px-5 py-4 text-body",

          // Error state with shake animation
          error && [
            "border-muted",
            "focus-visible:ring-foreground focus-visible:border-foreground",
            shake && "animate-[shakeMicro_90ms_cubic-bezier(0.4,0.0,0.2,1)]",
          ],
          className
        )}
        style={{
          color: "#FFFFFF !important",
          // Force white text as inline style fallback
        }}
        ref={ref}
        aria-invalid={error}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
