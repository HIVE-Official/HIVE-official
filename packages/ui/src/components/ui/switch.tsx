"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const switchVariants = cva(
  [
    "peer inline-flex shrink-0 cursor-pointer transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg-canvas",
    "disabled:cursor-not-allowed disabled:opacity-50",
    // Sophisticated background with glass effect
    "border border-white/12 backdrop-blur-sm",
    // Unchecked state - subtle dark background
    "data-[state=unchecked]:bg-white/8 data-[state=unchecked]:hover:bg-white/12",
    // Checked state - gold gradient with glow
    "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-accent-gold data-[state=checked]:to-accent-gold-hover",
    "data-[state=checked]:border-accent-gold/30 data-[state=checked]:shadow-lg data-[state=checked]:shadow-accent-gold/20",
    // Hover enhancement for checked state
    "data-[state=checked]:hover:shadow-xl data-[state=checked]:hover:shadow-accent-gold/30",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-5 w-9 rounded-full",
        md: "h-6 w-11 rounded-full",
        lg: "h-7 w-13 rounded-full",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const thumbVariants = cva(
  [
    "pointer-events-none block rounded-full transition-all duration-300 ease-out",
    "border border-white/20 shadow-lg backdrop-blur-sm",
    // Unchecked thumb - glass effect
    "data-[state=unchecked]:bg-white/90 data-[state=unchecked]:translate-x-0.5",
    // Checked thumb - refined design
    "data-[state=checked]:bg-white data-[state=checked]:border-white/30",
    // Enhanced shadow and scale on checked
    "data-[state=checked]:shadow-xl data-[state=checked]:scale-105",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-4 w-4 data-[state=checked]:translate-x-4",
        md: "h-5 w-5 data-[state=checked]:translate-x-5",
        lg: "h-6 w-6 data-[state=checked]:translate-x-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(switchVariants({ size }), className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb className={cn(thumbVariants({ size }))} />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
