import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const avatarVariants = cva(
  // Base styles following HIVE brand guidelines - circular avatars
  "relative inline-flex shrink-0 overflow-hidden rounded-full border-2 border-border bg-surface-02 transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-xs", // 24px
        sm: "h-8 w-8 text-xs", // 32px  
        default: "h-10 w-10 text-sm", // 40px
        lg: "h-12 w-12 text-base", // 48px
        xl: "h-16 w-16 text-lg", // 64px
        "2xl": "h-24 w-24 text-xl", // 96px
      },
      status: {
        none: "",
        online: "ring-2 ring-[#22C55E] ring-offset-2 ring-offset-background",
        away: "ring-2 ring-[#F59E0B] ring-offset-2 ring-offset-background", 
        offline: "ring-2 ring-surface-03 ring-offset-2 ring-offset-background",
      },
      interactive: {
        true: "cursor-pointer hover:scale-105 hover:border-accent/50 hover:ring-2 hover:ring-accent/20 hover:ring-offset-2 hover:ring-offset-background",
        false: "",
      }
    },
    defaultVariants: {
      size: "default",
      status: "none",
      interactive: false,
    },
  }
)

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & 
  VariantProps<typeof avatarVariants>
>(({ className, size, status, interactive, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, status, interactive, className }))}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, children, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center bg-surface-02 font-sans font-medium text-foreground select-none",
      className
    )}
    {...props}
  >
    {children}
  </AvatarPrimitive.Fallback>
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// Presence indicator component for social platform features
const AvatarPresence = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    status: "online" | "away" | "offline"
    size?: "sm" | "default" | "lg"
  }
>(({ className, status, size = "default", ...props }, ref) => {
  const presenceSize = {
    sm: "h-2 w-2",
    default: "h-2.5 w-2.5",
    lg: "h-3 w-3",
  }

  const presenceColor = {
    online: "bg-[#22C55E]",
    away: "bg-[#F59E0B]", 
    offline: "bg-surface-03",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "absolute bottom-0 right-0 rounded-full border-2 border-background",
        presenceSize[size],
        presenceColor[status],
        className
      )}
      {...props}
    />
  )
})
AvatarPresence.displayName = "AvatarPresence"

// Complete avatar with presence - convenience component
const AvatarWithPresence = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof Avatar> & {
    src?: string
    alt?: string
    fallback?: string
    presence?: "online" | "away" | "offline"
  }
>(({ className, src, alt, fallback, presence, size, ...props }, ref) => {
  const getPresenceSize = () => {
    switch (size) {
      case "xs":
      case "sm":
        return "sm"
      case "xl":
      case "2xl":
        return "lg"
      default:
        return "default"
    }
  }

  return (
    <Avatar
      ref={ref}
      className={cn("relative", className)}
      size={size}
      {...props}
    >
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
      {presence && (
        <AvatarPresence 
          status={presence} 
          size={getPresenceSize()}
        />
      )}
    </Avatar>
  )
})
AvatarWithPresence.displayName = "AvatarWithPresence"

// Avatar group for showing multiple users
const AvatarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    max?: number
    size?: VariantProps<typeof avatarVariants>["size"]
  }
>(({ className, children, max = 3, size = "default", ...props }, ref) => {
  const childrenArray = React.Children.toArray(children)
  const visibleChildren = childrenArray.slice(0, max)
  const remainingCount = childrenArray.length - max

  return (
    <div
      ref={ref}
      className={cn("flex -space-x-1", className)}
      {...props}
    >
      {visibleChildren.map((child, index) => (
        <div key={index} className="relative">
          {React.isValidElement(child) 
            ? React.cloneElement(child as React.ReactElement<{className?: string; size?: VariantProps<typeof avatarVariants>["size"]}>, { 
                size,
                className: cn("border-2 border-background", (child.props as {className?: string}).className)
              })
            : child
          }
        </div>
      ))}
      {remainingCount > 0 && (
        <Avatar size={size} className="border-2 border-background">
          <AvatarFallback className="bg-surface-03 text-muted font-medium">
            +{remainingCount}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
})
AvatarGroup.displayName = "AvatarGroup"

// Utility function to generate initials from name
export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export { 
  Avatar, 
  AvatarImage, 
  AvatarFallback, 
  AvatarPresence,
  AvatarWithPresence,
  AvatarGroup,
  avatarVariants 
}
