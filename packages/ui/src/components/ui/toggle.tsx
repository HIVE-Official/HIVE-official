import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import "./toggle.css";
import { cn } from "@/utils/index";

const toggleVariants = cva("toggle-root", {
  variants: {
    variant: {
      default: "",
      outline: "border border-border",
    },
    size: {
      sm: "size-sm",
      md: "",
      lg: "size-lg",
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
