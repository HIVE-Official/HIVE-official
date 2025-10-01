import * as React from "react"
import { cn } from "../../lib/utils"

export interface SkipNavProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Target element ID to skip to (without #)
   * @default "main-content"
   */
  targetId?: string
  /**
   * Text to display when focused
   * @default "Skip to main content"
   */
  children?: React.ReactNode
}

/**
 * SkipNav - Accessibility component for keyboard navigation
 *
 * Provides a hidden link that becomes visible when focused,
 * allowing keyboard users to skip repetitive navigation.
 *
 * WCAG 2.1 Success Criterion 2.4.1 (Bypass Blocks)
 *
 * @example
 * ```tsx
 * <SkipNav />
 * <Navigation />
 * <main id="main-content">...</main>
 * ```
 *
 * @example Custom target
 * ```tsx
 * <SkipNav targetId="dashboard" />
 * <div id="dashboard">...</div>
 * ```
 */
const SkipNav = React.forwardRef<HTMLAnchorElement, SkipNavProps>(
  ({
    targetId = "main-content",
    children = "Skip to main content",
    className,
    ...props
  }, ref) => {
    return (
      <a
        ref={ref}
        href={`#${targetId}`}
        className={cn(
          // Hidden by default
          "sr-only",
          // Visible when focused
          "focus:not-sr-only",
          "focus:absolute focus:top-4 focus:left-4 focus:z-[9999]",
          // Styling
          "px-4 py-2 rounded-md",
          "bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)]",
          "font-medium text-sm",
          "shadow-hive-level3",
          // Transitions
          "transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--hive-brand-primary)]",
          className
        )}
        {...props}
      >
        {children}
      </a>
    )
  }
)

SkipNav.displayName = "SkipNav"

export { SkipNav }
