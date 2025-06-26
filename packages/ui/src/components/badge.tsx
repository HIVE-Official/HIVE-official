import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-sans text-caption font-medium transition-all duration-fast ease-smooth focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Primary badge - high contrast
        default: "border-transparent bg-foreground text-background hover:bg-foreground/90",
        
        // Secondary badge - subtle surface
        secondary: "border-transparent bg-surface-01 text-foreground hover:bg-surface-02",
        
        // Ritual badge - ONLY allowed gold fill (for special HIVE moments)
        ritual: "border-transparent bg-accent text-background hover:bg-accent/90 shadow-sm shadow-accent/20 font-semibold",
        
        // Outline variants - no fills, borders/text only
        outline: "border-border text-foreground hover:bg-accent/10 hover:border-accent/50",
        ghost: "border-transparent text-muted hover:bg-accent/10 hover:text-foreground",
        
        // Muted variant for less important info
        muted: "border-transparent bg-surface-02 text-muted hover:bg-surface-01",
        
        // Additional variants for special use cases
        positive: "border-transparent bg-[#22C55E] text-background hover:bg-[#22C55E]/90",
        neutral: "border-transparent bg-[#F59E0B] text-background hover:bg-[#F59E0B]/90",
        accent: "border-transparent bg-accent text-background hover:bg-accent/90",
        interactive: "border-border text-accent hover:bg-accent/10 hover:border-accent cursor-pointer",
        mention: "border-accent/30 bg-accent/10 text-accent hover:bg-accent/20",
        hashtag: "border-border text-muted hover:bg-surface-01 hover:text-foreground",
      },
      size: {
        xs: "px-1.5 py-0.5 text-xs min-h-[1.25rem]",
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-caption",
        lg: "px-3 py-1 text-body-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)} 
        {...props} 
      />
    )
  }
)
Badge.displayName = "Badge"

// Convenience components for specific use cases

// Notification badge with count
const NotificationBadge = React.forwardRef<
  HTMLDivElement,
  Omit<BadgeProps, "children"> & {
    count: number
    max?: number
  }
>(({ count, max = 99, ...props }, ref) => {
  const displayCount = count > max ? `${max}+` : count.toString()
  
  return (
    <Badge
      ref={ref}
      variant="ritual"
      size="xs"
      className="min-w-[1.25rem] h-5 px-1"
      {...props}
    >
      {displayCount}
    </Badge>
  )
})
NotificationBadge.displayName = "NotificationBadge"

// Status badge for user presence
const StatusBadge = React.forwardRef<
  HTMLDivElement,
  Omit<BadgeProps, "children" | "variant"> & {
    status: "online" | "away" | "offline" | "busy"
  }
>(({ status, ...props }, ref) => {
  const statusConfig = {
    online: { variant: "positive" as const, text: "Online" },
    away: { variant: "neutral" as const, text: "Away" },
    offline: { variant: "muted" as const, text: "Offline" },
    busy: { variant: "accent" as const, text: "Busy" },
  }
  
  const config = statusConfig[status]
  
  return (
    <Badge
      ref={ref}
      variant={config.variant}
      size="sm"
      {...props}
    >
      <div className={cn(
        "w-2 h-2 rounded-full mr-1.5",
        status === "online" && "bg-[#22C55E]",
        status === "away" && "bg-[#F59E0B]",
        status === "offline" && "bg-surface-03",
        status === "busy" && "bg-accent"
      )} />
      {config.text}
    </Badge>
  )
})
StatusBadge.displayName = "StatusBadge"

// Mention badge for @username
const MentionBadge = React.forwardRef<
  HTMLDivElement,
  Omit<BadgeProps, "children" | "variant"> & {
    username: string
    interactive?: boolean
  }
>(({ username, interactive, ...props }, ref) => (
  <Badge
    ref={ref}
    variant={interactive ? "interactive" : "mention"}
    {...props}
  >
    @{username}
  </Badge>
))
MentionBadge.displayName = "MentionBadge"

// Hashtag badge for #topics
const HashtagBadge = React.forwardRef<
  HTMLDivElement,
  Omit<BadgeProps, "children" | "variant"> & {
    tag: string
    interactive?: boolean
  }
>(({ tag, interactive, ...props }, ref) => (
  <Badge
    ref={ref}
    variant={interactive ? "interactive" : "hashtag"}
    {...props}
  >
    #{tag}
  </Badge>
))
HashtagBadge.displayName = "HashtagBadge"

export { 
  Badge, 
  NotificationBadge,
  StatusBadge,
  MentionBadge,
  HashtagBadge,
  badgeVariants 
} 