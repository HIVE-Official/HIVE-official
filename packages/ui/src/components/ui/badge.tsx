import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Default: Subtle glass-like appearance
        default:
          "bg-white/8 border-white/12 text-white/90 hover:bg-white/12 hover:border-white/20",
        // Secondary: Backward compatibility alias for default
        secondary:
          "bg-white/8 border-white/12 text-white/90 hover:bg-white/12 hover:border-white/20",
        // Gold: Premium accent with proper glow
        gold: [
          "bg-gradient-to-br from-accent-gold/90 to-accent-gold/80",
          "border-accent-gold/30 text-black font-semibold",
          "shadow-accent-gold/20 hover:shadow-accent-gold/30 hover:shadow-lg",
          "hover:from-accent-gold hover:to-accent-gold/90",
        ].join(" "),
        // Success: Clean green with glass effect
        success:
          "bg-emerald-500/20 border-emerald-400/30 text-emerald-100 hover:bg-emerald-500/30",
        // Error: Sophisticated red
        error:
          "bg-red-500/20 border-red-400/30 text-red-100 hover:bg-red-500/30",
        // Warning: Amber glass effect
        warning:
          "bg-amber-500/20 border-amber-400/30 text-amber-100 hover:bg-amber-500/30",
        // Outline: Clean border-only design
        outline:
          "bg-transparent border-white/20 text-white/80 hover:bg-white/5 hover:border-white/30",
        // Solid: High contrast
        solid:
          "bg-white text-black border-white/20 hover:bg-white/90 font-semibold",
        // Ghost: Minimal appearance
        ghost:
          "bg-transparent border-transparent text-white/70 hover:bg-white/5 hover:text-white/90",
      },
      size: {
        sm: "h-5 px-2 text-xs rounded-md gap-1",
        md: "h-6 px-2.5 text-xs rounded-lg gap-1.5",
        lg: "h-7 px-3 text-sm rounded-lg gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "prefix">,
    VariantProps<typeof badgeVariants> {
  /** Optional dot indicator */
  dot?: boolean;
  /** Optional prefix content */
  prefix?: React.ReactNode;
  /** Optional suffix content */
  suffix?: React.ReactNode;
}

function Badge({
  className,
  variant,
  size,
  dot = false,
  prefix,
  suffix,
  children,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <div
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            variant === "gold" && "bg-black/60",
            variant === "success" && "bg-emerald-300",
            variant === "error" && "bg-red-300",
            variant === "warning" && "bg-amber-300",
            (!variant ||
              variant === "default" ||
              variant === "secondary" ||
              variant === "outline" ||
              variant === "ghost") &&
              "bg-white/60",
            variant === "solid" && "bg-black/60"
          )}
        />
      )}
      {prefix && <span className="shrink-0">{prefix}</span>}
      {children && <span className="truncate">{children}</span>}
      {suffix && <span className="shrink-0">{suffix}</span>}
    </div>
  );
}

export { Badge, badgeVariants };
