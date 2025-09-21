import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const hiveCardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]",
        brand:
          "border-[var(--hive-brand-primary)] bg-gradient-to-br from-[var(--hive-brand-primary)]/5 to-[var(--hive-brand-secondary)]/5 text-[var(--hive-text-primary)]",
        elevated:
          "border-[var(--hive-border-default)] bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] shadow-lg",
        interactive:
          "border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)] hover:border-[var(--hive-border-strong)] cursor-pointer",
        glass:
          "border-[var(--hive-border-default)]/20 bg-[var(--hive-background-primary)]/80 backdrop-blur-sm text-[var(--hive-text-primary)]",
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface HiveCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hiveCardVariants> {
  asChild?: boolean
}

const HiveCard = React.forwardRef<HTMLDivElement, HiveCardProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(hiveCardVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
HiveCard.displayName = "HiveCard"

const HiveCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
))
HiveCardHeader.displayName = "HiveCardHeader"

const HiveCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-[var(--hive-text-primary)]",
      className
    )}
    {...props}
  />
))
HiveCardTitle.displayName = "HiveCardTitle"

const HiveCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[var(--hive-text-secondary)]", className)}
    {...props}
  />
))
HiveCardDescription.displayName = "HiveCardDescription"

const HiveCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
))
HiveCardContent.displayName = "HiveCardContent"

const HiveCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-6", className)}
    {...props}
  />
))
HiveCardFooter.displayName = "HiveCardFooter"

export {
  HiveCard,
  HiveCardHeader,
  HiveCardFooter,
  HiveCardTitle,
  HiveCardDescription,
  HiveCardContent,
  hiveCardVariants,
}