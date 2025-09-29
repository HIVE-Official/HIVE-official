'use client';

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const avatarVariants = cva(
  "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "h-6 w-6",
        default: "h-10 w-10",
        lg: "h-16 w-16",
        xl: "h-20 w-20",
        "2xl": "h-24 w-24",
      },
      variant: {
        default: "bg-[var(--hive-background-tertiary)]",
        brand: "bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)]",
        outline: "border-2 border-[var(--hive-border-strong)]",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(avatarVariants({ size, variant }), className)}
      {...props}
    />
  )
)
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & {
    onLoadingStatusChange?: (status: "idle" | "loading" | "loaded" | "error") => void
  }
>(({ className, src, alt, onLoadingStatusChange, ...props }, ref) => {
  const [loadingStatus, setLoadingStatus] = React.useState<"idle" | "loading" | "loaded" | "error">("idle")

  React.useEffect(() => {
    if (!src) {
      setLoadingStatus("error")
      return
    }

    setLoadingStatus("loading")

    const img = new Image()
    img.onload = () => {
      setLoadingStatus("loaded")
      onLoadingStatusChange?.("loaded")
    }
    img.onerror = () => {
      setLoadingStatus("error")
      onLoadingStatusChange?.("error")
    }
    img.src = src
  }, [src, onLoadingStatusChange])

  if (loadingStatus === "loaded") {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn("aspect-square h-full w-full object-cover", className)}
        {...props}
      />
    )
  }

  return null
})
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-[var(--hive-background-tertiary)] text-[var(--hive-text-primary)] text-sm font-medium",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = "AvatarFallback"

// Alternative names for compatibility
const ShadcnAvatar = Avatar
const ShadcnAvatarImage = AvatarImage
const ShadcnAvatarFallback = AvatarFallback

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  ShadcnAvatar,
  ShadcnAvatarImage,
  ShadcnAvatarFallback,
  avatarVariants,
}