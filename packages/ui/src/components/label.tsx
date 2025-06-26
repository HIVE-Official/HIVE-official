import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "../lib/utils"

const labelVariants = cva(
  "font-sans font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        required: "text-foreground after:content-['*'] after:ml-0.5 after:text-red-500",
        optional: "text-muted-foreground after:content-['(optional)'] after:ml-1 after:text-xs",
      },
      size: {
        sm: "text-caption",
        default: "text-label",
        lg: "text-body-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, variant, size, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ variant, size, className }))}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label, labelVariants }
