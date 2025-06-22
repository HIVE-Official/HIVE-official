"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const checkboxVariants = cva(
  [
    "peer shrink-0 border-2 transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg-canvas",
    "disabled:cursor-not-allowed disabled:opacity-50",
    // Sophisticated hover and active states
    "hover:border-white/30 hover:shadow-sm",
    "data-[state=checked]:border-accent-gold data-[state=checked]:bg-accent-gold data-[state=checked]:text-black",
    "data-[state=indeterminate]:border-accent-gold data-[state=indeterminate]:bg-accent-gold data-[state=indeterminate]:text-black",
    // Unchecked state with glass effect
    "data-[state=unchecked]:border-white/20 data-[state=unchecked]:bg-white/4 data-[state=unchecked]:text-white",
    // Active press state
    "active:scale-95 active:transition-transform active:duration-75",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-4 w-4 rounded-md",
        md: "h-5 w-5 rounded-lg",
        lg: "h-6 w-6 rounded-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const iconVariants = cva("transition-all duration-150", {
  variants: {
    size: {
      sm: "h-3 w-3",
      md: "h-3.5 w-3.5",
      lg: "h-4 w-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ size }), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      {props.checked === "indeterminate" && (
        <Minus className={cn(iconVariants({ size }), "stroke-[2.5]")} />
      )}
      {props.checked === true && (
        <Check className={cn(iconVariants({ size }), "stroke-[2.5]")} />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
