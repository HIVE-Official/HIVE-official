"use client"

import * as React from "react"
import { Card, CardContent } from "../atoms/card"
import { Badge } from "../atoms/badge"
import { cn } from "../../lib/utils"

export type NotificationType =
  | "comment"
  | "like"
  | "follow"
  | "mention"
  | "space_invite"
  | "event_reminder"
  | "ritual_reminder"
  | "post"

export interface NotificationItemProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: string
  userName: string
  type: NotificationType
  message: string
  timestamp: string
  isRead?: boolean
  badge?: string
  badgeVariant?: "default" | "secondary" | "destructive" | "outline"
  onRead?: () => void
}

const notificationIcons: Record<NotificationType, string> = {
  comment: "💬",
  like: "❤️",
  follow: "👤",
  mention: "@",
  space_invite: "🏠",
  event_reminder: "📅",
  ritual_reminder: "⚡",
  post: "📝",
}

const NotificationItem = React.forwardRef<HTMLDivElement, NotificationItemProps>(
  (
    {
      className,
      avatar,
      userName,
      type,
      message,
      timestamp,
      isRead = false,
      badge,
      badgeVariant = "secondary",
      onRead,
      onClick,
      ...props
    },
    ref
  ) => {
    const initials = userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isRead && onRead) {
        onRead()
      }
      onClick?.(e)
    }

    return (
      <Card
        ref={ref}
        className={cn(
          "cursor-pointer transition-all duration-smooth ease-liquid hover:shadow-md hover:border-primary/50",
          !isRead && "bg-primary/5 border-primary/20",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <CardContent className="flex items-start gap-3 p-3">
          <div className="relative shrink-0">
            <div className="h-12 w-10 overflow-hidden rounded-md border border-border bg-muted transition-smooth ease-liquid">
              {avatar ? (
                <img src={avatar} alt={userName} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xs font-semibold text-primary">
                  {initials}
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-card bg-background text-xs transition-smooth ease-liquid">
              {notificationIcons[type]}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm text-foreground">
                <span className="font-semibold">{userName}</span>{" "}
                <span className="text-muted-foreground">{message}</span>
              </p>
              {!isRead && (
                <div className="h-2 w-2 shrink-0 rounded-full bg-primary transition-smooth ease-liquid" />
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{timestamp}</span>
              {badge && (
                <Badge
                  variant={badgeVariant}
                  className="transition-smooth ease-liquid"
                >
                  {badge}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
)

NotificationItem.displayName = "NotificationItem"

export { NotificationItem }
