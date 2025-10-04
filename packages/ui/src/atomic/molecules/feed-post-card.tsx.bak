"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { useTouchGestures } from "@hive/hooks"
import { Card } from "../atoms/card"
import { Button } from "../atoms/button"
import { Badge } from "../atoms/badge"
import { Avatar } from "../atoms/avatar"
import {
  Heart,
  MessageCircle,
  Repeat2,
  Quote,
  Bookmark,
  EyeOff,
  MoreHorizontal,
  TrendingUp,
} from "lucide-react"

export interface FeedPost {
  id: string
  content: string
  author: {
    name: string
    handle: string
    avatar?: string
  }
  space: {
    name: string
    id: string
    memberCount: number
  }
  timestamp: string // e.g., "2h ago", "Just now"
  reactions: {
    count: number
    hasReacted: boolean
    topEmoji?: string
  }
  comments: {
    count: number
    preview?: Array<{
      author: string
      text: string
    }>
  }
  reposts: {
    count: number
    hasReposted: boolean
  }
  requotes: {
    count: number
  }
  saves: {
    count: number
    hasSaved: boolean
  }
  isPromoted?: boolean
  isTrending?: boolean
  media?: {
    type: "image" | "video"
    url: string
  }[]
  requotedPost?: {
    author: string
    content: string
    timestamp: string
  }
  friendActivity?: {
    names: string[] // ["Jake", "Sarah", "Mike"]
    action: "reacted" | "commented" | "reposted"
  }
}

export interface FeedPostCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Post data */
  post: FeedPost

  /** React handler */
  onReact?: (postId: string) => void

  /** Comment handler */
  onComment?: (postId: string) => void

  /** Repost handler */
  onRepost?: (postId: string) => void

  /** Requote handler */
  onRequote?: (postId: string) => void

  /** Save handler */
  onSave?: (postId: string) => void

  /** Hide handler */
  onHide?: (postId: string) => void

  /** Space navigation handler */
  onSpaceClick?: (spaceId: string) => void

  /** Author profile handler */
  onAuthorClick?: (handle: string) => void

  /** Show compact version */
  compact?: boolean

  /** Enable mobile touch gestures */
  enableMobileGestures?: boolean
}

const FeedPostCard = React.forwardRef<HTMLDivElement, FeedPostCardProps>(
  (
    {
      className,
      post,
      onReact,
      onComment,
      onRepost,
      onRequote,
      onSave,
      onHide,
      onSpaceClick,
      onAuthorClick,
      compact = false,
      enableMobileGestures = true,
      ...props
    },
    ref
  ) => {
    const [showFullContent, setShowFullContent] = React.useState(false)
    const isLongContent = post.content.length > 280

    // Mobile touch gestures
    const { touchHandlers, triggerHaptic } = useTouchGestures(
      {
        enableSwipe: enableMobileGestures,
        enableLongPress: enableMobileGestures,
        enableDoubleTap: enableMobileGestures,
        swipeThreshold: 80,
        longPressDuration: 600,
      },
      {
        onSwipe: (data) => {
          if (data.direction === 'right' && data.distance > 100) {
            // Swipe right to save
            triggerHaptic('light')
            onSave?.(post.id)
          } else if (data.direction === 'left' && data.distance > 100) {
            // Swipe left to hide
            triggerHaptic('light')
            onHide?.(post.id)
          }
        },
        onDoubleTap: () => {
          // Double tap to react
          triggerHaptic('medium')
          onReact?.(post.id)
        },
        onLongPress: () => {
          // Long press to show more options
          triggerHaptic('heavy')
          // Could trigger context menu or additional actions
        }
      }
    )

    return (
      <Card
        ref={ref}
        className={cn(
          "p-4 border transition-all duration-fast ease-smooth bg-[#0c0c0c] hover:shadow-md",
          // Dark monochrome borders with smooth transitions
          post.isPromoted
            ? "border-l-4 border-l-[#FFD700] border-white/8 hover:border-white/20 hover:shadow-[#FFD700]/10"
            : "border-white/8 hover:border-white/20",
          className
        )}
        {...(enableMobileGestures ? touchHandlers : {})}
        {...props}
      >
        {/* Promoted Badge - Gold accent */}
        {post.isPromoted && (
          <div className="flex items-center gap-1 text-xs text-white/70 mb-2">
            <TrendingUp className="h-3 w-3 text-[#FFD700]" />
            <span>Promoted by space leaders</span>
          </div>
        )}

        {/* Friend Activity - Dark monochrome with emphasis */}
        {post.friendActivity && (
          <div className="flex items-center gap-1 text-xs text-white/70 mb-2">
            <span className="font-semibold text-white">{post.friendActivity.names.slice(0, 2).join(", ")}</span>
            {post.friendActivity.names.length > 2 && (
              <span className="font-semibold text-white">+{post.friendActivity.names.length - 2}</span>
            )}
            <span>{post.friendActivity.action}</span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          {/* Avatar */}
          <Avatar
            className="h-10 w-10 cursor-pointer border border-white/20"
            onClick={() => onAuthorClick?.(post.author.handle)}
          >
            {post.author.avatar ? (
              <img src={post.author.avatar} alt={post.author.name} />
            ) : (
              <div className="bg-white/10 text-white flex items-center justify-center text-sm font-bold">
                {post.author.name.charAt(0)}
              </div>
            )}
          </Avatar>

          {/* Author Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onAuthorClick?.(post.author.handle)}
                className="text-sm font-bold text-white hover:underline truncate"
              >
                {post.author.name}
              </button>
              <span className="text-xs text-white/50">@{post.author.handle}</span>
              <span className="text-xs text-white/50">·</span>
              <span className="text-xs text-white/50">{post.timestamp}</span>
            </div>

            {/* Space Attribution */}
            <button
              onClick={() => onSpaceClick?.(post.space.id)}
              className="flex items-center gap-1 mt-0.5 text-xs text-white/70 hover:text-white transition-colors"
            >
              <span>in</span>
              <span className="font-semibold">{post.space.name}</span>
              <Badge variant="freshman" className="h-4 px-1 text-[9px] ml-1 border-white/20 text-white/70">
                {post.space.memberCount} members
              </Badge>
            </button>
          </div>

          {/* Menu */}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/10">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Requoted Post (if exists) */}
        {post.requotedPost && (
          <div className="mb-3 p-3 border border-white/8 rounded-lg bg-white/5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-white">
                {post.requotedPost.author}
              </span>
              <span className="text-xs text-white/50">
                {post.requotedPost.timestamp}
              </span>
            </div>
            <p className="text-sm text-white/70 line-clamp-3">
              {post.requotedPost.content}
            </p>
          </div>
        )}

        {/* Content */}
        <div className="mb-3">
          <p
            className={cn(
              "text-sm text-white whitespace-pre-wrap",
              !showFullContent && isLongContent && "line-clamp-6"
            )}
          >
            {post.content}
          </p>
          {isLongContent && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-xs text-white font-semibold hover:underline mt-1"
            >
              {showFullContent ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        {/* Media (if exists) */}
        {post.media && post.media.length > 0 && (
          <div
            className={cn(
              "mb-3 rounded-lg overflow-hidden border border-white/20",
              post.media.length === 1 && "aspect-video",
              post.media.length === 2 && "grid grid-cols-2 gap-0.5",
              post.media.length > 2 && "grid grid-cols-2 gap-0.5"
            )}
          >
            {post.media.slice(0, 4).map((item, idx) => (
              <div key={idx} className="relative bg-white/5 aspect-square">
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video src={item.url} className="w-full h-full object-cover" controls />
                )}
                {post.media && post.media.length > 4 && idx === 3 && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-white text-lg font-bold">
                    +{post.media.length - 4}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Comment Preview */}
        {post.comments.preview && post.comments.preview.length > 0 && (
          <div className="mb-3 p-2 border border-white/8 rounded bg-white/5">
            <div className="text-xs text-white/70 space-y-1">
              {post.comments.preview.map((comment, idx) => (
                <div key={idx}>
                  <span className="font-semibold text-white">{comment.author}</span>{" "}
                  <span className="line-clamp-1">{comment.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interaction Stats - Dark monochrome */}
        {!compact && (
          <div className="flex items-center gap-4 mb-2 text-xs text-white/50">
            {post.reactions.count > 0 && (
              <span className="font-medium">
                {post.reactions.topEmoji && <span className="mr-1">{post.reactions.topEmoji}</span>}
                {post.reactions.count} reactions
              </span>
            )}
            {post.comments.count > 0 && <span className="font-medium">{post.comments.count} comments</span>}
            {(post.reposts.count > 0 || post.requotes.count > 0) && (
              <span className="font-medium">{post.reposts.count + post.requotes.count} shares</span>
            )}
          </div>
        )}

        {/* Action Buttons - Dark monochrome with white emphasis */}
        <div className="flex items-center justify-between pt-2 border-t border-white/8">
          {/* React - Dark monochrome with smooth animation */}
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex-1 h-8 gap-2 transition-all duration-fast ease-smooth text-white/70 hover:text-white hover:scale-105 active:scale-95",
              post.reactions.hasReacted && "text-white font-bold"
            )}
            onClick={() => onReact?.(post.id)}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-all duration-fast ease-smooth",
                post.reactions.hasReacted && "fill-current scale-110"
              )}
            />
            {!compact && <span className="text-xs font-medium">{post.reactions.count || "React"}</span>}
          </Button>

          {/* Comment */}
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 h-8 gap-2 transition-all duration-fast ease-smooth text-white/70 hover:text-white hover:scale-105 active:scale-95"
            onClick={() => onComment?.(post.id)}
          >
            <MessageCircle className="h-4 w-4 transition-all duration-fast ease-smooth" />
            {!compact && <span className="text-xs font-medium">{post.comments.count || "Comment"}</span>}
          </Button>

          {/* Repost - Dark monochrome with smooth animation */}
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex-1 h-8 gap-2 transition-all duration-fast ease-smooth text-white/70 hover:text-white hover:scale-105 active:scale-95",
              post.reposts.hasReposted && "text-white font-bold"
            )}
            onClick={() => onRepost?.(post.id)}
          >
            <Repeat2 className={cn(
              "h-4 w-4 transition-all duration-fast ease-smooth",
              post.reposts.hasReposted && "text-[#FFD700]"
            )} />
            {!compact && <span className="text-xs font-medium">{post.reposts.count || "Repost"}</span>}
          </Button>

          {/* Requote */}
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 h-8 gap-2 transition-all duration-fast ease-smooth text-white/70 hover:text-white hover:scale-105 active:scale-95"
            onClick={() => onRequote?.(post.id)}
          >
            <Quote className="h-4 w-4 transition-all duration-fast ease-smooth" />
            {!compact && <span className="text-xs font-medium">Requote</span>}
          </Button>

          {/* Save - Gold when saved with smooth animation */}
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 p-0 transition-all duration-fast ease-smooth text-white/70 hover:text-white hover:scale-105 active:scale-95",
              post.saves.hasSaved && "text-[#FFD700] hover:text-[#FFD700]"
            )}
            onClick={() => onSave?.(post.id)}
          >
            <Bookmark className={cn(
              "h-4 w-4 transition-all duration-fast ease-smooth",
              post.saves.hasSaved && "fill-current scale-110"
            )} />
          </Button>
        </div>

        {/* Trending Badge - Gold accent */}
        {post.isTrending && (
          <div className="mt-2 pt-2 border-t border-white/8">
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-[#FFD700]" />
              <span className="font-semibold text-white">Trending on campus</span>
            </div>
          </div>
        )}
      </Card>
    )
  }
)

FeedPostCard.displayName = "FeedPostCard"

export { FeedPostCard }
