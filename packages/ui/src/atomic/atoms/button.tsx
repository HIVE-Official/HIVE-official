import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black border border-white hover:bg-white/90 hover:-translate-y-0.5 hover:scale-[1.02]",
        primary:
          "bg-[var(--hive-brand-primary,#FFD700)] text-black border border-[var(--hive-brand-primary,#FFD700)] hover:bg-[var(--hive-brand-primary,#FFD700)]/90 hover:-translate-y-0.5 hover:scale-[1.02]",
        secondary:
          "bg-white/10 text-white border border-white/20 hover:bg-white/20",
        outline:
          "border border-white/20 text-white hover:bg-white hover:text-black",
        ghost:
          "text-white/80 hover:bg-white/10 hover:text-white",
        destructive:
          "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
        danger:
          "bg-red-500 text-white border border-red-500 hover:bg-red-500/90",
        gold:
          "bg-[#FFD700] text-black border border-[#FFD700] hover:bg-[#FFD700]/90 hover:-translate-y-0.5 hover:scale-[1.02]",
        link:
          "text-white underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
