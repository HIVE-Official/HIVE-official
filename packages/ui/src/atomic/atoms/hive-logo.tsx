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
        platinum: "text-[#E5E4E2]",
        aurora: "bg-gradient-to-r from-[#00c6ff] via-[#7fffd4] to-[#f9d423] bg-clip-text text-transparent",
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
    const isAurora = variant === "aurora"
    const gradientId = React.useId()

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
            viewBox="0 0 1500 1500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isAurora && (
              <defs>
                <linearGradient
                  id={`${gradientId}-aurora-gradient`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#00c6ff">
                    <animate
                      attributeName="stop-color"
                      values="#00c6ff;#7fffd4;#f9d423;#00c6ff"
                      dur="6s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="50%" stopColor="#7fffd4">
                    <animate
                      attributeName="stop-color"
                      values="#7fffd4;#f9d423;#00c6ff;#7fffd4"
                      dur="6s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="100%" stopColor="#f9d423">
                    <animate
                      attributeName="stop-color"
                      values="#f9d423;#00c6ff;#7fffd4;#f9d423"
                      dur="6s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <animateTransform
                    attributeName="gradientTransform"
                    type="rotate"
                    from="0 .5 .5"
                    to="360 .5 .5"
                    dur="12s"
                    repeatCount="indefinite"
                  />
                </linearGradient>
                <radialGradient
                  id={`${gradientId}-aurora-glow`}
                  cx="50%"
                  cy="50%"
                  r="50%"
                >
                  <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
                  <stop offset="70%" stopColor="rgba(124,255,212,0.25)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
              </defs>
            )}
            {/* HIVE official logo path */}
            <path
              d="M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z"
              fill={isAurora ? `url(#${gradientId}-aurora-gradient)` : "currentColor"}
            />
            {isAurora && (
              <circle
                cx="750"
                cy="750"
                r="620"
                fill={`url(#${gradientId}-aurora-glow)`}
                opacity="0"
              >
                <animate
                  attributeName="opacity"
                  values="0;0.35;0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
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
