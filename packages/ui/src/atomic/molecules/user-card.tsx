"use client"

import * as React from "react"
import { Card, CardContent } from "../atoms/card"
import { Button } from "../atoms/button"
import { Badge } from "../atoms/badge"
import { cn } from "../../lib/utils"

export interface UserCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  handle: string
  avatar?: string
  bio?: string
  badge?: string
  badgeVariant?: "default" | "secondary" | "destructive" | "outline"
  actionLabel?: string
  onAction?: () => void
  actionVariant?: "default" | "secondary" | "destructive" | "outline" | "ghost"
  isOnline?: boolean
  disabled?: boolean
}

const UserCard = React.forwardRef<HTMLDivElement, UserCardProps>(
  (
    {
      className,
      name,
      handle,
      avatar,
      bio,
      badge,
      badgeVariant = "secondary",
      actionLabel,
      onAction,
      actionVariant = "default",
      isOnline,
      disabled,
      ...props
    },
    ref
  ) => {
    // Generate initials from name
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

    return (
      <Card
        ref={ref}
        className={cn(
          "transition-all duration-smooth ease-liquid hover:shadow-md hover:border-primary/50",
          disabled && "opacity-60 pointer-events-none",
          className
        )}
        {...props}
      >
        <CardContent className="flex items-start gap-3 p-4">
          <div className="relative shrink-0">
            <div className="h-16 w-14 overflow-hidden rounded-lg border-2 border-border bg-muted transition-smooth ease-liquid">
              {avatar ? (
                <img src={avatar} alt={name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-sm font-semibold text-primary">
                  {initials}
                </div>
              )}
            </div>
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-card bg-green-500 transition-smooth ease-liquid" />
            )}
          </div>

          <div className="flex flex-1 flex-col gap-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground truncate">
                    {name}
                  </span>
                  {badge && (
                    <Badge
                      variant={badgeVariant}
                      className="shrink-0 transition-smooth ease-liquid"
                    >
                      {badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground truncate">
                  {handle}
                </span>
              </div>

              {actionLabel && (
                <Button
                  variant={actionVariant}
                  size="sm"
                  onClick={onAction}
                  disabled={disabled}
                  className="shrink-0 transition-smooth ease-liquid"
                >
                  {actionLabel}
                </Button>
              )}
            </div>

            {bio && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {bio}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
)

UserCard.displayName = "UserCard"

export { UserCard }
