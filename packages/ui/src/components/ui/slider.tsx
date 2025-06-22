"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    /** Size variant for the slider */
    size?: "sm" | "md" | "lg";
  }
>(({ className, size = "md", ...props }, ref) => {
  const sizeClasses = {
    sm: "h-4",
    md: "h-5",
    lg: "h-6",
  };

  const trackHeights = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-2.5",
  };

  const thumbSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center cursor-pointer",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "relative w-full grow overflow-hidden rounded-full bg-white/10",
          trackHeights[size]
        )}
      >
        <SliderPrimitive.Range className="absolute h-full bg-accent-gold transition-all duration-150 ease-out" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          // Base styles
          "block rounded-full border-2 border-accent-gold bg-accent-gold transition-all duration-150 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-canvas",

          // Hover & active states
          "hover:scale-110 hover:shadow-lg hover:shadow-accent-gold/25",
          "active:scale-105",

          // Disabled state
          "disabled:pointer-events-none disabled:opacity-50",

          // Size
          thumbSizes[size]
        )}
      />
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
