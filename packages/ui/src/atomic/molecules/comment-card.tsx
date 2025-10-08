"use client"

import * as React from "react"
import { Card, CardContent } from "../atoms/card"
import { Button } from "../atoms/button"
import { Badge } from "../atoms/badge"
import { cn } from "../../lib/utils"

export interface CommentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: string
  userName: string
  timestamp: string
  content: string
  badge?: string
  badgeVariant?: "default" | "secondary" | "destructive" | "outline"
  isAuthor?: boolean
  maxLines?: number
  showActions?: boolean
  likeCount?: number
  isLiked?: boolean
  onLike?: () => void
  onReply?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

const CommentCard = React.forwardRef<HTMLDivElement, CommentCardProps>(
  (
    {
      className,
      avatar,
      userName,
      timestamp,
      content,
      badge,
      badgeVariant = "secondary",
      isAuthor = false,
      maxLines = 4,
      showActions = true,
      likeCount,
      isLiked = false,
      onLike,
      onReply,
      onEdit,
      onDelete,
      ...props
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = React.useState(false)
    const [needsExpansion, setNeedsExpansion] = React.useState(false)
    const contentRef = React.useRef<HTMLParagraphElement>(null)

    // Generate initials from name
    const initials = userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

    // Check if content needs expansion
    React.useEffect(() => {
      if (contentRef.current) {
        const lineHeight = parseInt(window.getComputedStyle(contentRef.current).lineHeight)
        const height = contentRef.current.scrollHeight
        const lines = Math.round(height / lineHeight)
        setNeedsExpansion(lines > maxLines)
      }
    }, [content, maxLines])

    return (
      <Card
        ref={ref}
        className={cn(
          "transition-all duration-smooth ease-liquid",
          isAuthor && "border-primary/30 bg-primary/5",
          className
        )}
        {...props}
      >
        <CardContent className="flex gap-3 p-4">
          <div className="h-12 w-10 shrink-0 overflow-hidden rounded-md border border-border bg-muted transition-smooth ease-liquid">
            {avatar ? (
              <img src={avatar} alt={userName} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xs font-semibold text-primary">
                {initials}
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-2 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-foreground">
                  {userName}
                </span>
                {badge && (
                  <Badge
                    variant={badgeVariant}
                    className="transition-smooth ease-liquid"
                  >
                    {badge}
                  </Badge>
                )}
                {isAuthor && (
                  <Badge
                    variant="freshman"
                    className="transition-smooth ease-liquid"
                  >
                    You
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">
                  {timestamp}
                </span>
              </div>

              {isAuthor && (
                <div className="flex items-center gap-1">
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={onEdit}
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-destructive hover:text-destructive"
                      onClick={onDelete}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p
                ref={contentRef}
                className={cn(
                  "text-sm text-foreground whitespace-pre-wrap break-words transition-all duration-smooth ease-liquid",
                  !isExpanded && needsExpansion && `line-clamp-${maxLines}`
                )}
              >
                {content}
              </p>

              {needsExpansion && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-xs font-medium text-primary hover:underline transition-smooth ease-liquid"
                >
                  {isExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </div>

            {showActions && (
              <div className="flex items-center gap-3 pt-1">
                {onLike && (
                  <button
                    onClick={onLike}
                    className={cn(
                      "flex items-center gap-1 text-xs transition-smooth ease-liquid",
                      isLiked
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill={isLiked ? "currentColor" : "none"}
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    {likeCount ? likeCount : "Like"}
                  </button>
                )}
                {onReply && (
                  <button
                    onClick={onReply}
                    className="text-xs text-muted-foreground hover:text-foreground transition-smooth ease-liquid"
                  >
                    Reply
                  </button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
)

CommentCard.displayName = "CommentCard"

export { CommentCard }
