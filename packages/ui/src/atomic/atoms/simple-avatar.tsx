import * as React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "./avatar"
import { cn } from "@/lib/utils"

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
}

export interface SimpleAvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string
  fallback?: string
  size?: keyof typeof sizeClasses
}

/**
 * SimpleAvatar - A convenience wrapper around the compound Avatar component
 * that accepts src, fallback, and size props directly for common use cases.
 */
export const SimpleAvatar = React.forwardRef<HTMLSpanElement, SimpleAvatarProps>(
  ({ src, fallback, size = "md", children, className, ...props }, ref) => {
    return (
      <Avatar ref={ref} className={cn(sizeClasses[size], className)} {...props}>
        {src && <AvatarImage src={src} />}
        <AvatarFallback>{fallback || children}</AvatarFallback>
      </Avatar>
    )
  }
)

SimpleAvatar.displayName = "SimpleAvatar"
