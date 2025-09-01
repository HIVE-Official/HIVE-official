import * as React from "react"
import { cn } from "../lib/utils"

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  className?: string
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, className, ...props }, ref) => {
    return (
      <a
        href={href}
        ref={ref}
        className={cn(
          "text-foreground underline-offset-4 hover:underline hover:text-accent transition-colors",
          className
        )}
        {...props}
      >
        {children}
      </a>
    )
  }
)

Link.displayName = "Link"

export { Link }