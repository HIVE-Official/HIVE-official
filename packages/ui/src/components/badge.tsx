import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { X, Plus } from "lucide-react"

import { cn } from "../lib/utils"
import { createGoldAccent } from "../lib/motion"
import { useAdaptiveMotion } from "../lib/adaptive-motion"

const badgeVariants = cva(
  // Modern chip base with 2025 AI feel
  "inline-flex items-center font-sans font-medium transition-all duration-base ease-smooth focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 select-none",
  {
    variants: {
      variant: {
        // CHIP: Modern chip-style (new default for 2025)
        chip: [
          "rounded-2xl border border-border bg-surface-01/50 text-foreground",
          "hover:bg-surface-01 hover:border-accent/40 hover:text-accent",
          "focus-visible:border-accent focus-visible:ring-accent/20"
        ],
        
        // PILL: Classic rounded pill
        pill: [
          "rounded-full border border-border bg-transparent text-foreground",
          "hover:bg-accent/5 hover:border-accent/50 hover:text-accent",
          "focus-visible:border-accent focus-visible:ring-accent/20"
        ],
        
        // ACCENT: Gold chip for featured content
        accent: [
          "rounded-2xl border border-accent/30 bg-accent/10 text-accent font-semibold",
          "hover:bg-accent/20 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10",
          "focus-visible:ring-accent/30"
        ],
        
        // RITUAL: Gold fill for special moments
        ritual: [
          "rounded-2xl border border-accent bg-accent text-background font-semibold",
          "hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/20 hover:scale-[1.05]",
          "focus-visible:ring-background focus-visible:ring-offset-accent"
        ],
        
        // INTERACTIVE: Clickable chip
        interactive: [
          "rounded-2xl border border-border bg-surface-01/30 text-foreground cursor-pointer",
          "hover:bg-surface-01 hover:border-accent/40 hover:text-accent hover:shadow-md hover:scale-[1.02]",
          "active:scale-[0.98] focus-visible:border-accent focus-visible:ring-accent/20"
        ],
        
        // REMOVABLE: Chip with remove button
        removable: [
          "rounded-2xl border border-border bg-surface-01 text-foreground cursor-pointer",
          "hover:bg-surface-02 hover:border-red-400/40 hover:text-red-400",
          "focus-visible:border-red-400 focus-visible:ring-red-400/20"
        ],
        
        // SELECTABLE: Toggle-able chip
        selectable: [
          "rounded-2xl border border-border bg-transparent text-foreground cursor-pointer",
          "hover:bg-accent/10 hover:border-accent/50 hover:text-accent",
          "data-[selected=true]:bg-accent/15 data-[selected=true]:border-accent data-[selected=true]:text-accent data-[selected=true]:font-semibold",
          "focus-visible:border-accent focus-visible:ring-accent/20"
        ],
        
        // STATUS CHIPS
        online: [
          "rounded-2xl border border-border bg-surface-01/50 text-foreground",
          "hover:bg-surface-01"
        ],
        busy: [
          "rounded-2xl border border-accent/30 bg-accent/5 text-accent",
          "hover:bg-accent/10"
        ],
        away: [
          "rounded-2xl border border-border bg-surface-01/30 text-muted",
          "hover:bg-surface-01"
        ],
        
        // SPECIAL TYPES
        mention: [
          "rounded-2xl border border-accent/20 bg-accent/5 text-accent",
          "hover:bg-accent/10 hover:border-accent/40"
        ],
        hashtag: [
          "rounded-2xl border border-border bg-transparent text-muted",
          "hover:bg-accent/5 hover:text-accent hover:border-accent/30"
        ],
        
        // FLOATING: Elevated chip
        floating: [
          "rounded-2xl border border-border bg-surface shadow-md text-foreground",
          "hover:shadow-lg hover:border-accent/30 hover:text-accent hover:-translate-y-0.5",
          "focus-visible:border-accent focus-visible:ring-accent/20"
        ],
        
        // OUTLINE: Simple outline style
        outline: [
          "rounded-2xl border border-border bg-transparent text-foreground",
          "hover:bg-surface-01/30 hover:border-accent/40 hover:text-accent",
          "focus-visible:border-accent focus-visible:ring-accent/20"
        ],
      },
      size: {
        xs: "px-2 py-1 text-xs h-6 gap-1",
        sm: "px-2.5 py-1 text-caption h-7 gap-1",
        default: "px-3 py-1.5 text-caption h-8 gap-1.5",
        lg: "px-4 py-2 text-body-sm h-10 gap-2",
        xl: "px-5 py-2.5 text-body h-12 gap-2",
      },
    },
    defaultVariants: {
      variant: "chip",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof badgeVariants> {
  enableMotion?: boolean
  removable?: boolean
  selectable?: boolean
  selected?: boolean
  onRemove?: () => void
  onSelect?: (selected: boolean) => void
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ 
    className, 
    variant, 
    size, 
    enableMotion = true,
    removable = false,
    selectable = false,
    selected = false,
    onRemove,
    onSelect,
    icon,
    rightIcon,
    children,
    onClick,
    ...props 
  }, ref) => {
    const { createTransition } = useAdaptiveMotion('social')
    
    // Determine variant based on props
    const actualVariant = removable ? 'removable' : selectable ? 'selectable' : variant
    
    const getMotionProps = () => {
      if (!enableMotion) return {}
      
      const baseMotion = {
        whileHover: { 
          scale: 1.02,
          transition: createTransition('fast')
        },
        whileTap: { 
          scale: 0.98,
          transition: createTransition('fast')
        }
      }
      
      if (actualVariant === 'ritual' || actualVariant === 'accent') {
        return {
          ...baseMotion,
          ...createGoldAccent('fast')
        }
      }
      
      return baseMotion
    }
    
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (selectable && onSelect) {
        onSelect(!selected)
      }
      onClick?.(e)
    }
    
    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onRemove?.()
    }
    
    // Exclude HTML event handlers that conflict with Framer Motion
    const { 
      onDrag, onDragStart, onDragEnd, onDragOver, onDragEnter, onDragLeave, onDrop,
      onAnimationStart, onAnimationEnd, onAnimationIteration,
      onTransitionStart, onTransitionEnd, onTransitionRun, onTransitionCancel,
      ...motionProps 
    } = props
    
    return (
      <motion.div
        ref={ref}
        className={cn(badgeVariants({ variant: actualVariant, size }), className)}
        onClick={handleClick}
        data-selected={selectable ? selected : undefined}
        {...getMotionProps()}
        {...motionProps}
      >
        {icon && (
          <span className="inline-flex items-center">
            {icon}
          </span>
        )}
        
        <span className="inline-flex items-center">
          {children}
        </span>
        
        {rightIcon && !removable && (
          <span className="inline-flex items-center">
            {rightIcon}
          </span>
        )}
        
        {removable && onRemove && (
          <motion.button
            type="button"
            onClick={handleRemove}
            className="inline-flex items-center justify-center ml-1 rounded-full hover:bg-red-400/20 focus:outline-none focus:ring-1 focus:ring-red-400/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Remove"
          >
            <X className="w-3 h-3" />
          </motion.button>
        )}
      </motion.div>
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
    online: { variant: "online" as const, text: "Online" },
    away: { variant: "away" as const, text: "Away" },
    offline: { variant: "away" as const, text: "Offline" },
    busy: { variant: "busy" as const, text: "Busy" },
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

// Modern Chip Group for 2025 AI feel
const ChipGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    orientation?: 'horizontal' | 'vertical'
    wrap?: boolean
    spacing?: 'sm' | 'default' | 'lg'
  }
>(({ className, orientation = 'horizontal', wrap = true, spacing = 'default', children, ...props }, ref) => {
  const spacingClasses = {
    sm: 'gap-1',
    default: 'gap-2', 
    lg: 'gap-3'
  }
  
  return (
    <div
      ref={ref}
      className={cn(
        "flex",
        orientation === 'horizontal' ? "flex-row" : "flex-col",
        wrap && "flex-wrap",
        spacingClasses[spacing],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
ChipGroup.displayName = "ChipGroup"

// Interactive Chip for selections
const InteractiveChip = React.forwardRef<
  HTMLDivElement,
  Omit<BadgeProps, 'variant'> & {
    value: string
    selected?: boolean
    onToggle?: (value: string, selected: boolean) => void
    addable?: boolean
  }
>(({ value, selected = false, onToggle, addable = false, children, ...props }, ref) => {
  const handleClick = () => {
    onToggle?.(value, !selected)
  }
  
  if (addable) {
    return (
      <Badge
        ref={ref}
        variant="interactive"
        icon={<Plus className="w-3 h-3" />}
        onClick={handleClick}
        {...props}
      >
        {children || value}
      </Badge>
    )
  }
  
  return (
    <Badge
      ref={ref}
      variant="selectable"
      selected={selected}
      onSelect={(isSelected) => onToggle?.(value, isSelected)}
      {...props}
    >
      {children || value}
    </Badge>
  )
})
InteractiveChip.displayName = "InteractiveChip"

// Filter Chip for search/filtering
const FilterChip = React.forwardRef<
  HTMLDivElement,
  Omit<BadgeProps, 'variant'> & {
    active?: boolean
    count?: number
    onToggle?: () => void
  }
>(({ active = false, count, onToggle, children, ...props }, ref) => (
  <Badge
    ref={ref}
    variant={active ? "accent" : "chip"}
    onClick={onToggle}
    rightIcon={count !== undefined ? <span className="text-xs opacity-75">({count})</span> : undefined}
    {...props}
  >
    {children}
  </Badge>
))
FilterChip.displayName = "FilterChip"

export { 
  Badge, 
  NotificationBadge,
  StatusBadge,
  MentionBadge,
  HashtagBadge,
  ChipGroup,
  InteractiveChip,
  FilterChip,
  badgeVariants 
} 