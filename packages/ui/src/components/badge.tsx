import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-sans text-caption font-medium transition-all duration-base ease-smooth focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
  {
    variants: {
      variant: {
        // DEFAULT: Gold border/line - the new HIVE standard
        default: "border-accent bg-transparent text-accent hover:bg-accent/10 hover:shadow-sm hover:shadow-accent/20",
        
        // OUTLINE: Subtle border variant
        outline: "border-border text-foreground hover:bg-accent/5 hover:border-accent/50 hover:text-accent",
        
        // ACCENT: Full gold treatment for special content
        accent: "border-accent bg-accent/10 text-accent hover:bg-accent/20 hover:shadow-md hover:shadow-accent/20 font-semibold",
        
        // RITUAL: ONLY allowed gold fill (for special HIVE moments)
        ritual: "border-accent bg-accent text-background hover:bg-accent/90 shadow-sm shadow-accent/20 font-semibold",
        
        // GHOST: Minimal styling
        ghost: "border-transparent text-muted hover:bg-accent/10 hover:text-accent",
        
        // SURFACE: Subtle surface styling
        surface: "border-border bg-surface-01 text-foreground hover:bg-surface-02 hover:border-accent/30 hover:text-accent",
        
        // MUTED: For less important info
        muted: "border-transparent bg-surface-02 text-muted hover:bg-surface-01 hover:text-foreground",
        
        // STATUS VARIANTS: Using gold as the primary with state colors as accents
        positive: "border-green-500 bg-transparent text-green-400 hover:bg-green-500/10",
        warning: "border-amber-500 bg-transparent text-amber-400 hover:bg-amber-500/10",
        negative: "border-red-500 bg-transparent text-red-400 hover:bg-red-500/10",
        info: "border-blue-500 bg-transparent text-blue-400 hover:bg-blue-500/10",
        
        // INTERACTIVE: Clickable badges with gold accent
        interactive: "border-accent text-accent hover:bg-accent/10 hover:shadow-md hover:shadow-accent/20 cursor-pointer active:scale-[0.98]",
        
        // MENTION: For @mentions with gold styling
        mention: "border-accent/30 bg-accent/10 text-accent hover:bg-accent/20 hover:border-accent/50",
        
        // HASHTAG: For #tags with subtle styling
        hashtag: "border-border text-muted hover:bg-accent/5 hover:text-accent hover:border-accent/30",
      },
      size: {
        xs: "px-1.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-caption",
        default: "px-2.5 py-1 text-caption",
        lg: "px-3 py-1.5 text-body-sm",
        xl: "px-4 py-2 text-body",
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
      <div ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props} />
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
    away: { variant: "muted" as const, text: "Away" },
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