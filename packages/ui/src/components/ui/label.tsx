"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none transition-colors duration-fast ease-hive-smooth peer-disabled:cursor-not-allowed peer-disabled:opacity-50 font-sans",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted",
        error: "text-foreground",
        success: "text-foreground",
      },
      size: {
        sm: "text-body-sm",
        md: "text-body",
        lg: "text-h4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> & {
      /** Show required indicator */
      required?: boolean;
      /** Optional helper text */
      hint?: string;
    }
>(({ className, variant, size, required, hint, children, ...props }, ref) => (
  <div className="space-y-1">
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-1 text-accent font-normal" aria-label="required">
          *
        </span>
      )}
    </LabelPrimitive.Root>
    {hint && <p className="text-body-sm text-muted leading-relaxed">{hint}</p>}
  </div>
));

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
