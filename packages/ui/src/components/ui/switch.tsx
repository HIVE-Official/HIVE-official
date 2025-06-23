"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "../../lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      // Base styling - HIVE dark-first design
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
      "border-2 border-[#2A2A2A]", // Subtle border
      
      // HIVE motion system
      "transition-all duration-fast ease-hive-smooth",
      
      // Hover state
      "hover:scale-105", // Subtle HIVE scale effect
      "hover:border-accent/50",
      
      // Focus state - gold ring
      "focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-accent",
      "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      
      // Unchecked state - dark surface
      "data-[state=unchecked]:bg-surface",
      "data-[state=unchecked]:border-[#2A2A2A]",
      
      // Checked state - gold accent
      "data-[state=checked]:bg-accent",
      "data-[state=checked]:border-accent",
      "data-[state=checked]:scale-110", // Slightly larger when checked
      
      // Disabled state
      "disabled:cursor-not-allowed disabled:opacity-50",
      "disabled:hover:scale-100", // No scale on disabled hover
      
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        // Base thumb styling
        "pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0",
        "bg-foreground", // White thumb
        
        // HIVE motion system for smooth sliding
        "transition-all duration-fast ease-hive-smooth",
        
        // Position states
        "data-[state=unchecked]:translate-x-0.5", // Slight offset from edge
        "data-[state=checked]:translate-x-5.5", // Slide to right with offset
        
        // Scale effect when switching
        "data-[state=checked]:scale-110",
        
        // On checked state, make thumb dark to contrast with gold background
        "data-[state=checked]:bg-background",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
