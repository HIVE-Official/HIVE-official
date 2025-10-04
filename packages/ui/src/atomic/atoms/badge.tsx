import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:ring-offset-2 focus:ring-offset-black",
  {
    variants: {
      variant: {
        default:
          "border-white/20 text-white bg-transparent",
        secondary:
          "border-white/10 text-white/70 bg-white/5",
        outline:
          "border-white/20 text-white bg-transparent",
        gold:
          "border-[#FFD700]/50 bg-[#FFD700]/10 text-[#FFD700]",
        destructive:
          "border-red-500/50 bg-red-500/10 text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
