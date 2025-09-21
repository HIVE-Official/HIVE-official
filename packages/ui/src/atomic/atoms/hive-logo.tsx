import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const hiveLogoVariants = cva(
  "inline-flex items-center justify-center font-bold",
  {
    variants: {
      size: {
        sm: "text-lg",
        default: "text-xl",
        lg: "text-2xl",
        xl: "text-3xl",
        "2xl": "text-4xl",
      },
      variant: {
        default: "text-[var(--hive-brand-primary)]",
        white: "text-white",
        dark: "text-[var(--hive-text-primary)]",
        gradient: "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] bg-clip-text text-transparent",
        monochrome: "text-[var(--hive-text-primary)]",
      },
      animated: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        glow: "drop-shadow-[0_0_8px_var(--hive-brand-primary)]",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
      animated: "none",
    },
  }
)

export interface HiveLogoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hiveLogoVariants> {
  showIcon?: boolean
  showText?: boolean
  href?: string
  target?: string
}

const HiveLogo = React.forwardRef<HTMLDivElement, HiveLogoProps>(
  ({
    className,
    size,
    variant,
    animated,
    showIcon = true,
    showText = true,
    href,
    target,
    ...props
  }, ref) => {
    const logoContent = (
      <div
        ref={ref}
        className={cn(hiveLogoVariants({ size, variant, animated }), className)}
        {...props}
      >
        {showIcon && (
          <svg
            className={cn(
              "mr-2",
              size === "sm" && "h-5 w-5",
              size === "default" && "h-6 w-6",
              size === "lg" && "h-8 w-8",
              size === "xl" && "h-10 w-10",
              size === "2xl" && "h-12 w-12"
            )}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* HIVE hexagon logo */}
            <path
              d="M12 2L21.5 7V17L12 22L2.5 17V7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="currentColor"
              fillOpacity="0.1"
            />
            <path
              d="M8 9L10 7L14 7L16 9L16 13L14 15L10 15L8 13L8 9Z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="currentColor"
              fillOpacity="0.2"
            />
            <circle
              cx="12"
              cy="11"
              r="2"
              fill="currentColor"
            />
          </svg>
        )}
        {showText && (
          <span className="font-bold tracking-tight">
            HIVE
          </span>
        )}
      </div>
    )

    if (href) {
      return (
        <a
          href={href}
          target={target}
          className="inline-flex items-center no-underline hover:opacity-80 transition-opacity"
        >
          {logoContent}
        </a>
      )
    }

    return logoContent
  }
)
HiveLogo.displayName = "HiveLogo"

// Pre-built logo variations
export const HiveLogos = {
  // Standard logos
  standard: (props: Partial<HiveLogoProps>) => (
    <HiveLogo variant="default" showIcon showText {...props} />
  ),

  // Icon only
  icon: (props: Partial<HiveLogoProps>) => (
    <HiveLogo variant="default" showIcon showText={false} {...props} />
  ),

  // Text only
  text: (props: Partial<HiveLogoProps>) => (
    <HiveLogo variant="default" showIcon={false} showText {...props} />
  ),

  // White variant for dark backgrounds
  white: (props: Partial<HiveLogoProps>) => (
    <HiveLogo variant="white" showIcon showText {...props} />
  ),

  // Gradient variant
  gradient: (props: Partial<HiveLogoProps>) => (
    <HiveLogo variant="gradient" showIcon showText {...props} />
  ),

  // Animated variants
  glowing: (props: Partial<HiveLogoProps>) => (
    <HiveLogo variant="default" animated="glow" showIcon showText {...props} />
  ),
}

export { HiveLogo, hiveLogoVariants }