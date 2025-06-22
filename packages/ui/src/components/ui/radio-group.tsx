"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const radioVariants = cva(
  [
    "aspect-square rounded-full border-2 transition-all duration-200 ease-out",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg-canvas",
    "disabled:cursor-not-allowed disabled:opacity-50",
    // Sophisticated hover and selection states
    "hover:border-white/40 hover:shadow-sm hover:bg-white/5",
    // Unchecked state with glass effect
    "data-[state=unchecked]:border-white/20 data-[state=unchecked]:bg-white/4",
    // Checked state with gold accent
    "data-[state=checked]:border-accent-gold data-[state=checked]:bg-accent-gold/10",
    "data-[state=checked]:shadow-lg data-[state=checked]:shadow-accent-gold/20",
    // Active press state
    "active:scale-95 active:transition-transform active:duration-75",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const indicatorVariants = cva(
  [
    "flex items-center justify-center transition-all duration-200 ease-out",
    "data-[state=checked]:text-accent-gold",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-2 w-2",
        md: "h-2.5 w-2.5",
        lg: "h-3 w-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-3", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioVariants> {}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, size, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioVariants({ size }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        className={cn(indicatorVariants({ size }))}
      >
        <Circle className="h-full w-full fill-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
