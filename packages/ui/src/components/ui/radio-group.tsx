"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../../lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        // Base styling - HIVE dark-first design
        "aspect-square h-4 w-4 rounded-full",
        "bg-surface border-2 border-[#2A2A2A]", // Dark surface with subtle border
        "text-accent", // Gold text for indicator
        
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
        "data-[state=checked]:border-accent",
        "data-[state=checked]:bg-accent/10", // Subtle gold background
        "data-[state=checked]:scale-110", // Slightly larger when checked
        
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50",
        "disabled:hover:scale-100", // No scale on disabled hover
        
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        {/* Gold filled circle indicator */}
        <div className="h-2 w-2 rounded-full bg-accent animate-in zoom-in-75 duration-fast" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
