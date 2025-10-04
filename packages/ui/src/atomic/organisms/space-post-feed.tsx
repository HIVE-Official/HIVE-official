"use client"

import * as React from "react"
import { Button } from "../atoms/button"
import { Badge } from "../atoms/badge"
import { cn } from "../../lib/utils"
import type { SpaceActionHandler } from "../../types/space.types"

export interface SpacePost {
  id: string
  author: {
    userId: string
    name: string
    handle: string
    avatar?: string
  }
  content: string
  contentType?: "text" | "image" | "link" | "announcement"
  images?: string[]
  linkPreview?: {
    title: string
    description?: string
    url: string
    image?: string
  }
  createdAt: Date
  updatedAt?: Date
  likeCount?: number
  commentCount?: number
  isLiked?: boolean
  isPinned?: boolean
  isAnnouncement?: boolean
}

export interface SpacePostFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  /** List of posts */
  posts?: SpacePost[]
  /** Show post composer */
  showComposer?: boolean
  /** Composer placeholder text */
  composerPlaceholder?: string
  /** Whether user can post */
  canPost?: boolean
  /** Has more posts to load */
  hasMore?: boolean
  /** Loading state */
  isLoading?: boolean
  /** Empty state message */
  emptyStateMessage?: string

  /** Action handler (aggregated) */
  onAction?: SpaceActionHandler

  /** Legacy handlers (for backward compatibility) */
  onCreatePost?: (content: string) => void
  onPostClick?: (post: SpacePost) => void
  onLike?: (postId: string) => void
  onComment?: (postId: string) => void
  onShare?: (postId: string) => void
  onLoadMore?: () => void
}

const SpacePostFeed = React.forwardRef<HTMLDivElement, SpacePostFeedProps>(
  (
    {
      className,
      posts = [],
      showComposer = true,
      composerPlaceholder = "Message #space...",
      canPost = false,
      hasMore = false,
      isLoading = false,
      emptyStateMessage = "No messages yet. Start the conversation!",
      onAction,
      // Legacy handlers
      onCreatePost,
      onPostClick,
      onLike,
      onComment,
      onShare,
      onLoadMore,
      ...props
    },
    ref
  ) => {
    const [composerValue, setComposerValue] = React.useState("")
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    const messagesEndRef = React.useRef<HTMLDivElement>(null)

    // Aggregated event handlers
    const handleCreatePost = React.useCallback((content: string) => {
      onCreatePost?.(content)
      onAction?.({ type: "post.create", content })
    }, [onCreatePost, onAction])

    const handlePostClick = React.useCallback((post: SpacePost) => {
      onPostClick?.(post)
      onAction?.({ type: "post.click", postId: post.id })
    }, [onPostClick, onAction])

    const handleLike = React.useCallback((postId: string, isLiked: boolean) => {
      onLike?.(postId)
      onAction?.(isLiked ? { type: "post.unlike", postId } : { type: "post.like", postId })
    }, [onLike, onAction])

    const handleComment = React.useCallback((postId: string) => {
      onComment?.(postId)
      onAction?.({ type: "post.comment", postId })
    }, [onComment, onAction])

    const handleShare = React.useCallback((postId: string) => {
      onShare?.(postId)
      onAction?.({ type: "post.share", postId })
    }, [onShare, onAction])

    const handleLoadMore = React.useCallback(() => {
      onLoadMore?.()
      onAction?.({ type: "feed.loadMore" })
    }, [onLoadMore, onAction])

    // Auto-resize textarea
    React.useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
    }, [composerValue])

    // Format timestamp (Discord-style)
    const formatTimestamp = (date: Date) => {
      // Defensive check
      if (!date || !(date instanceof Date)) {
        return "Unknown time"
      }

      const now = new Date()
      const isToday = date.toDateString() === now.toDateString()
      const yesterday = new Date(now)
      yesterday.setDate(yesterday.getDate() - 1)
      const isYesterday = date.toDateString() === yesterday.toDateString()

      const time = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(date)

      if (isToday) return `Today at ${time}`
      if (isYesterday) return `Yesterday at ${time}`

      return new Intl.DateTimeFormat("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(date)
    }

    // Handle post creation
    const handlePost = () => {
      if (composerValue.trim()) {
        handleCreatePost(composerValue)
        setComposerValue("")
      }
    }

    // Handle Enter key (Shift+Enter for newline, Enter to send)
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handlePost()
      }
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col h-full min-h-[600px]", className)}
        {...props}
      >
        {/* Messages Area - Discord-style scrollable feed */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Load More at Top */}
          {hasMore && !isLoading && (
            <div className="flex justify-center pb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLoadMore}
                className="text-xs text-white/70 hover:text-white transition-all duration-[400ms]"
              >
                Load older messages
              </Button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-3 px-1">
                  <div className="h-10 w-10 rounded-full bg-white/5 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-white/5 rounded w-1/3 animate-pulse" />
                    <div className="h-4 bg-white/5 rounded w-2/3 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {posts.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <svg
                className="h-16 w-16 text-white/30 mb-4"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
              <p className="text-sm text-white/70 font-medium mb-1">
                Welcome to the beginning of this space
              </p>
              <p className="text-xs text-white/70">{emptyStateMessage}</p>
            </div>
          )}

          {/* Posts - Discord-style messages */}
          {posts.map((post, index) => {
            // Defensive check: ensure createdAt is a valid Date and author exists
            if (!post.createdAt || !(post.createdAt instanceof Date) || !post.author) {
              return null
            }

            const prevPost = index > 0 ? posts[index - 1] : null
            const isGrouped =
              prevPost &&
              prevPost.createdAt instanceof Date &&
              prevPost.author &&
              prevPost.author.userId === post.author.userId &&
              post.createdAt.getTime() - prevPost.createdAt.getTime() < 5 * 60 * 1000 // 5 min threshold

            return (
              <div
                key={post.id}
                className={cn(
                  "group relative px-1 py-0.5 hover:bg-white/5 rounded transition-all duration-[400ms]",
                  (onPostClick || onAction) && "cursor-pointer"
                )}
                onClick={() => handlePostClick(post)}
              >
                {/* Pinned Badge */}
                {post.isPinned && !isGrouped && (
                  <div className="flex items-center gap-1.5 text-xs text-[#FFD700] font-medium mb-2 pl-14">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 011-1h.5a1.5 1.5 0 000-3H6a1 1 0 01-1-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                    </svg>
                    <span>Pinned Message</span>
                  </div>
                )}

                {/* Announcement Badge */}
                {post.isAnnouncement && !isGrouped && (
                  <div className="flex items-center gap-1.5 text-xs text-[#FFD700] font-medium mb-2 pl-14">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                    </svg>
                    <span>Announcement</span>
                  </div>
                )}

                <div className="flex gap-3">
                  {/* Avatar (only show if not grouped) */}
                  {!isGrouped ? (
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white/10">
                      {post.author.avatar ? (
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#FFD700]/10 text-[#FFD700] text-xs font-semibold">
                          {post.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-10 shrink-0 flex items-start justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] text-white/50 mt-0.5">
                        {new Intl.DateTimeFormat("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        }).format(post.createdAt)}
                      </span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header (only if not grouped) */}
                    {!isGrouped && (
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-white hover:underline">
                          {post.author.name}
                        </span>
                        <span className="text-xs text-white/50">
                          {formatTimestamp(post.createdAt)}
                        </span>
                        {post.updatedAt &&
                          post.updatedAt instanceof Date &&
                          post.updatedAt.getTime() !== post.createdAt.getTime() && (
                            <span className="text-xs text-white/50">(edited)</span>
                          )}
                      </div>
                    )}

                    {/* Message Content */}
                    <div className="text-sm text-white leading-relaxed whitespace-pre-wrap break-words">
                      {post.content}
                    </div>

                    {/* Images */}
                    {post.images && post.images.length > 0 && (
                      <div className="mt-2 grid grid-cols-2 gap-1 max-w-md rounded-lg overflow-hidden">
                        {post.images.map((img, idx) => (
                          <div
                            key={idx}
                            className={cn(
                              "aspect-square bg-white/5",
                              post.images!.length === 1 && "col-span-2 aspect-video"
                            )}
                          >
                            <img src={img} alt="" className="h-full w-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Link Preview */}
                    {post.linkPreview && (
                      <a
                        href={post.linkPreview.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 block max-w-md rounded border border-white/8 bg-white/5 p-3 transition-all duration-[400ms] hover:border-white/20 hover:bg-white/10"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      >
                        <div className="flex gap-3">
                          {post.linkPreview.image && (
                            <div className="h-16 w-16 shrink-0 rounded bg-white/5 overflow-hidden">
                              <img
                                src={post.linkPreview.image}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                              {post.linkPreview.title}
                            </p>
                            {post.linkPreview.description && (
                              <p className="text-xs text-white/70 line-clamp-2 mt-0.5">
                                {post.linkPreview.description}
                              </p>
                            )}
                            <p className="text-xs text-white/50 mt-1 truncate">
                              {new URL(post.linkPreview.url).hostname}
                            </p>
                          </div>
                        </div>
                      </a>
                    )}

                    {/* Reactions Bar */}
                    {(post.likeCount || post.commentCount) && (
                      <div className="flex items-center gap-3 mt-1.5">
                        {/* Like */}
                        {post.likeCount > 0 && (
                          <button
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation()
                              handleLike(post.id, post.isLiked || false)
                            }}
                            className={cn(
                              "flex items-center gap-1 text-xs transition-all duration-[400ms] hover:text-[#FFD700]",
                              post.isLiked && "text-[#FFD700]"
                            )}
                          >
                            <svg
                              className="h-3.5 w-3.5"
                              fill={post.isLiked ? "currentColor" : "none"}
                              strokeWidth="2"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                              />
                            </svg>
                            <span className="text-white/50">{post.likeCount}</span>
                          </button>
                        )}

                        {/* Comment */}
                        {post.commentCount > 0 && (
                          <button
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation()
                              handleComment(post.id)
                            }}
                            className="flex items-center gap-1 text-xs transition-all duration-[400ms] hover:text-[#FFD700]"
                          >
                            <svg
                              className="h-3.5 w-3.5"
                              fill="none"
                              strokeWidth="2"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                              />
                            </svg>
                            <span className="text-white/50">{post.commentCount}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Hover Actions (Discord-style) */}
                  <div className="absolute top-0 right-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 bg-[#0c0c0c] border border-white/8 rounded-md shadow-lg flex gap-0.5 p-0.5">
                    <button
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        handleLike(post.id, post.isLiked || false)
                      }}
                      className="p-1.5 hover:bg-white/10 rounded transition-all duration-[400ms]"
                      title="Like"
                    >
                      <svg
                        className="h-4 w-4"
                        fill={post.isLiked ? "currentColor" : "none"}
                        strokeWidth="2"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        handleComment(post.id)
                      }}
                      className="p-1.5 hover:bg-white/10 rounded transition-all duration-[400ms]"
                      title="Reply"
                    >
                      <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        handleShare(post.id)
                      }}
                      className="p-1.5 hover:bg-white/10 rounded transition-all duration-[400ms]"
                      title="Share"
                    >
                      <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* Composer - Claude/ChatGPT-style at bottom */}
        {showComposer && canPost && (
          <div className="border-t border-white/8 bg-[#000000] p-4">
            <div className="relative max-w-4xl mx-auto">
              {/* Textarea Container with Claude-style rounded border */}
              <div className="relative rounded-3xl border border-white/8 bg-[#0c0c0c] focus-within:border-white/20 focus-within:ring-1 focus-within:ring-white/20 transition-all duration-[400ms]">
                <textarea
                  ref={textareaRef}
                  value={composerValue}
                  onChange={(e: React.ChangeEvent) => setComposerValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={composerPlaceholder}
                  className="w-full resize-none rounded-3xl bg-transparent px-6 py-3 pr-24 text-sm text-white placeholder:text-white/50 focus:outline-none min-h-[52px] max-h-[200px]"
                  rows={1}
                />

                {/* Inline Action Buttons (Claude/ChatGPT-style) */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1">
                  {/* Attach File */}
                  <button
                    type="button"
                    className="p-2 hover:bg-white/10 rounded-full transition-all duration-[400ms] text-white/70 hover:text-white"
                    title="Attach file"
                  >
                    <svg className="h-5 w-5" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                      />
                    </svg>
                  </button>

                  {/* Image */}
                  <button
                    type="button"
                    className="p-2 hover:bg-white/10 rounded-full transition-all duration-[400ms] text-white/70 hover:text-white"
                    title="Add image"
                  >
                    <svg className="h-5 w-5" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </button>

                  {/* Send Button */}
                  <button
                    type="button"
                    onClick={handlePost}
                    disabled={!composerValue.trim()}
                    className={cn(
                      "p-2 rounded-full transition-all duration-[400ms]",
                      composerValue.trim()
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                    )}
                    title="Send message (Enter)"
                  >
                    <svg className="h-5 w-5" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Helper Text */}
              <p className="mt-2 text-xs text-white/70 text-center">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }
)

SpacePostFeed.displayName = "SpacePostFeed"

export { SpacePostFeed }
