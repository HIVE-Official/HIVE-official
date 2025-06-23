"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "../../lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // Base styling - HIVE dark-first design
      "peer h-4 w-4 shrink-0 rounded-sm",
      "bg-surface border-2 border-[#2A2A2A]", // Dark surface with subtle border
      
      // HIVE motion system
      "transition-all duration-fast ease-hive-smooth",
      
      // Hover state - gold accent
      "hover:border-accent/50 hover:bg-[#181818]",
      "hover:scale-105", // Subtle HIVE scale effect
      
      // Focus state - gold ring
      "focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-accent",
      "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      
      // Checked state - gold fill
      "data-[state=checked]:bg-accent data-[state=checked]:border-accent",
      "data-[state=checked]:text-background", // Dark text on gold background
      "data-[state=checked]:scale-110", // Slightly larger when checked
      
      // Indeterminate state - gold fill
      "data-[state=indeterminate]:bg-accent data-[state=indeterminate]:border-accent",
      "data-[state=indeterminate]:text-background", // Dark text on gold background
      "data-[state=indeterminate]:scale-110",
      
      // Disabled state
      "disabled:cursor-not-allowed disabled:opacity-50",
      "disabled:hover:scale-100", // No scale on disabled hover
      
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "flex items-center justify-center text-current",
        "animate-in zoom-in-75 duration-fast" // HIVE motion for check appearance
      )}
    >
      {props.checked === "indeterminate" ? (
        <Minus className="h-3 w-3" />
      ) : (
        <Check className="h-3 w-3" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
