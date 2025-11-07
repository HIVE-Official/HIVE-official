"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const topBarNavVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 rounded-lg",
  {
    variants: {
      variant: {
        default: [
          "text-foreground/80 hover:text-foreground",
          "hover:bg-accent/50 active:bg-accent/70",
          "relative overflow-hidden",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
          "before:translate-x-[-100%] before:transition-transform before:duration-500",
          "hover:before:translate-x-[100%]",
          "backdrop-blur-sm"
        ],
        active: [
          "text-primary bg-primary/10",
          "shadow-sm border border-primary/20",
          "relative overflow-hidden",
          "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5",
          "after:bg-gradient-to-r after:from-primary/80 after:via-primary after:to-primary/80",
          "after:shadow-lg after:shadow-primary/25",
          "backdrop-blur-sm"
        ],
        ghost: [
          "text-foreground/60 hover:text-foreground hover:bg-accent/40",
          "transition-all duration-300"
        ],
        minimal: [
          "text-foreground/70 hover:text-foreground",
          "relative after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0",
          "after:bg-primary after:transition-all after:duration-300 after:-translate-x-1/2",
          "hover:after:w-full"
        ]
      },
      size: {
        default: "min-h-[48px] px-4 py-2",
        sm: "min-h-[44px] px-3 py-1.5 text-xs",
        lg: "min-h-[52px] px-6 py-3",
        icon: "min-h-[48px] min-w-[48px] p-0"
      },
      responsive: {
        desktop: "hidden md:inline-flex",
        mobile: "inline-flex md:hidden",
        always: "inline-flex"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      responsive: "always"
    }
  }
)

const topBarNavIconVariants = cva(
  "flex-shrink-0 transition-all duration-200",
  {
    variants: {
      size: {
        default: "h-4 w-4",
        sm: "h-3 w-3",
        lg: "h-5 w-5",
        icon: "h-5 w-5"
      },
      state: {
        default: "opacity-80 group-hover:opacity-100",
        active: "opacity-100 text-primary",
        pulse: "opacity-100 animate-pulse"
      }
    },
    defaultVariants: {
      size: "default",
      state: "default"
    }
  }
)

const topBarNavLabelVariants = cva(
  "transition-all duration-200 font-medium",
  {
    variants: {
      visibility: {
        always: "block",
        desktop: "hidden md:block",
        mobile: "block md:hidden",
        never: "hidden"
      },
      weight: {
        normal: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold"
      }
    },
    defaultVariants: {
      visibility: "desktop",
      weight: "normal"
    }
  }
)

export interface TopBarNavProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof topBarNavVariants> {
  icon?: React.ReactNode
  label?: string
  href?: string
  badge?: string | number
  isActive?: boolean
  labelVisibility?: VariantProps<typeof topBarNavLabelVariants>["visibility"]
  labelWeight?: VariantProps<typeof topBarNavLabelVariants>["weight"]
  iconState?: VariantProps<typeof topBarNavIconVariants>["state"]
  asChild?: boolean
}

const TopBarNav = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, TopBarNavProps>(
  ({
    className,
    variant,
    size,
    responsive,
    icon,
    label,
    href,
    badge,
    isActive,
    labelVisibility = "desktop",
    labelWeight = "normal",
    iconState = "default",
    children,
    // asChild not used in this implementation
    ...props
  }, ref) => {
    const activeVariant = isActive ? "active" : variant
    const activeIconState = isActive ? "active" : iconState

    const commonClassName = cn(
      topBarNavVariants({ variant: activeVariant, size, responsive }),
      "group relative",
      className
    )

    const content = (
      <>
        {icon && (
          <span className={cn(topBarNavIconVariants({ size, state: activeIconState }))}>
            {icon}
          </span>
        )}

        {label && (
          <span className={cn(topBarNavLabelVariants({ visibility: labelVisibility, weight: labelWeight }))}>
            {label}
          </span>
        )}

        {badge && (
          <span className={cn(
            "absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1",
            "bg-destructive text-destructive-foreground text-xs font-bold rounded-full",
            "flex items-center justify-center",
            "shadow-lg shadow-destructive/25",
            "border border-background",
            "z-10"
          )}>
            {typeof badge === 'number' && badge > 99 ? '99+' : badge}
          </span>
        )}

        {children}
      </>
    )

    if (href) {
      const drop = new Set(['type','form','formAction','formEncType','formMethod','formNoValidate','formTarget','autoFocus','disabled','name','value','onToggle'])
      const anchorProps = Object.fromEntries(Object.entries(props as any).filter(([k]) => !drop.has(k)))
      return (
        <a
          href={href}
          className={commonClassName}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...anchorProps}
        >
          {content}
        </a>
      )
    }

    return (
      <button
        className={commonClassName}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    )
  }
)

TopBarNav.displayName = "TopBarNav"

export { TopBarNav, topBarNavVariants, topBarNavIconVariants, topBarNavLabelVariants }
