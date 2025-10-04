"use client"

import * as React from "react"
import { MotionDiv } from "../../shells/motion-safe"
import { transitions } from "../../lib/animations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Badge } from "./badge"
import { Button } from "./button"
import { cn } from "../../lib/utils"
import { Users, Pin, TrendingUp } from "lucide-react"

export interface BulletinCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Space name */
  title: string
  /** Brief description */
  description?: string
  /** Cover image URL (like a poster on bulletin board) */
  coverImage?: string
  /** Category badge text */
  category?: string
  /** Member count */
  memberCount?: number
  /** Trending indicator */
  isTrending?: boolean
  /** Pinned/featured */
  isPinned?: boolean
  /** Tags array */
  tags?: string[]
  /** Join handler */
  onJoin?: () => void
  /** Click handler */
  onClick?: () => void
  /** Already joined */
  isJoined?: boolean
}

/**
 * Bulletin Board Card Component
 *
 * Custom primitive built from shadcn Card with bulletin board aesthetic.
 * Designed to look like a notice pinned to a cork board.
 *
 * Features:
 * - Pin icon indicator for featured/pinned items
 * - Slight rotation effect on hover (like physical pin tilt)
 * - Shadow depth for layered bulletin feel
 * - Trending indicator for active spaces
 */
const BulletinCard = React.forwardRef<HTMLDivElement, BulletinCardProps>(
  (
    {
      className,
      title,
      description,
      coverImage,
      category,
      memberCount,
      isTrending = false,
      isPinned = false,
      tags = [],
      onJoin,
      onClick,
      isJoined = false,
      ...props
    },
    ref
  ) => {
    return (
      <MotionDiv
        whileHover={{
          scale: 1.02,
          rotate: isPinned ? 0.5 : 0,
        }}
        transition={transitions.fast}
      >
        <Card
          ref={ref}
          className={cn(
            "relative overflow-hidden cursor-pointer group",
            "border-l-4 border-l-primary/50",
            "hover:shadow-lg hover:border-l-primary",
            "transition-all duration-300",
            className
          )}
          onClick={onClick}
          {...props}
        >
          {/* Cover Image (like poster on bulletin board) */}
          {coverImage && (
            <div className="relative h-32 w-full overflow-hidden bg-muted">
              <img
                src={coverImage}
                alt=""
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          )}

          {/* Pin indicator for featured items */}
          {isPinned && (
            <div className={cn(
              "absolute top-3 right-3 text-primary z-10",
              coverImage && "text-background drop-shadow-lg"
            )}>
              <Pin className="h-4 w-4 fill-current" aria-hidden="true" />
            </div>
          )}

          {/* Trending indicator */}
          {isTrending && (
            <Badge
              variant="sophomore"
              className={cn(
                "absolute top-3 left-3 gap-1 z-10",
                coverImage
                  ? "bg-background/90 text-foreground backdrop-blur-sm"
                  : "bg-primary/10 text-primary border-primary/20"
              )}
            >
              <TrendingUp className="h-3 w-3" aria-hidden="true" />
              Trending
            </Badge>
          )}

          <CardHeader className={cn(
            isPinned && "pr-10",
            isTrending && !coverImage && "pt-12"
          )}>
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                {title}
              </CardTitle>
              {category && (
                <Badge variant="freshman" className="shrink-0 text-xs">
                  {category}
                </Badge>
              )}
            </div>
            {description && (
              <CardDescription className="line-clamp-2 text-sm">
                {description}
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="sophomore" className="text-xs font-normal">
                    #{tag}
                  </Badge>
                ))}
                {tags.length > 3 && (
                  <Badge variant="freshman" className="text-xs">
                    +{tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Stats & Action */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" aria-hidden="true" />
                <span className="font-medium">{memberCount || 0}</span>
              </div>

              <Button
                size="sm"
                variant={isJoined ? "outline" : "default"}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation()
                  onJoin?.()
                }}
                className="text-sm font-medium"
              >
                {isJoined ? "Joined" : "Join"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </MotionDiv>
    )
  }
)

BulletinCard.displayName = "BulletinCard"

export { BulletinCard }
