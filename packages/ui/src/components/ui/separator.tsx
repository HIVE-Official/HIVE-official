"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "../../lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    /** Color variant */
    variant?: "default" | "muted" | "accent";
  }
>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      variant = "default",
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: "bg-white/12",
      muted: "bg-white/6",
      accent: "bg-accent-gold/20",
    };

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 transition-colors duration-fast ease-hive-smooth",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
