import * as React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "./avatar"
import type { AvatarProps } from "./avatar"

export interface SimpleAvatarProps extends AvatarProps {
  src?: string
  fallback?: string
}

/**
 * SimpleAvatar - A convenience wrapper around the compound Avatar component
 * that accepts src and fallback props directly for common use cases.
 */
export const SimpleAvatar = React.forwardRef<HTMLDivElement, SimpleAvatarProps>(
  ({ src, fallback, children, ...props }, ref) => {
    return (
      <Avatar ref={ref} {...props}>
        {src && <AvatarImage src={src} />}
        <AvatarFallback>{fallback || children}</AvatarFallback>
      </Avatar>
    )
  }
)

SimpleAvatar.displayName = "SimpleAvatar"