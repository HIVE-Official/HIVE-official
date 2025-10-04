/**
 * Space Card - Unified Polymorphic Component
 *
 * Single card molecule that handles all space display variants:
 * - default: Standard vertical card for grids
 * - discovery: Horizontal card with campus context for browse/discovery
 * - joined: Vertical card with unread badge for joined spaces
 * - compact: Minimal card for lists
 *
 * Uses SpaceData canonical type and SpaceActionHandler for events.
 *
 * @module molecules/space-card
 */

"use client"

import * as React from "react"
import { MotionDiv } from "../../shells/motion-safe"
import { transitions } from "../../lib/animations"
import {
  Users,
  MessageCircle,
  CheckCircle2,
  Plus,
  Pin,
  Flame,
  GraduationCap,
  ChevronRight,
  Bell
} from "lucide-react"
import { Card } from "../atoms/card"
import { Badge } from "../atoms/badge"
import { Button } from "../atoms/button"
import { Avatar } from "../atoms/avatar"
import { cn } from "../../lib/utils"
import type {
  SpaceData,
  SpaceCardVariant,
  SpaceCardLayout,
  SpaceActionHandler,
  UserPreview
} from "../../types/space.types"

export interface SpaceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Space data (canonical type) */
  space: SpaceData

  /** Visual variant */
  variant?: SpaceCardVariant

  /** Layout orientation */
  layout?: SpaceCardLayout

  /** Whether to show action buttons */
  showActions?: boolean

  /** Whether to show stats */
  showStats?: boolean

  /** Whether to show campus context (friends, trending) */
  showCampusContext?: boolean

  /** Whether to show tags */
  showTags?: boolean

  /** Maximum tags to display */
  maxTags?: number

  /** Action handler (aggregated) */
  onAction?: SpaceActionHandler

  /** Legacy handlers (for backward compatibility) */
  onClick?: () => void
  onJoin?: () => void
  onLeave?: () => void
}

/**
 * Space Card Component
 */
const SpaceCard = React.forwardRef<HTMLDivElement, SpaceCardProps>(
  (
    {
      className,
      space,
      variant = "default",
      layout = "vertical",
      showActions = true,
      showStats = true,
      showCampusContext = false,
      showTags = true,
      maxTags = 3,
      onAction,
      onClick,
      onJoin,
      onLeave,
      ...props
    },
    ref
  ) => {
    // Determine layout based on variant
    const effectiveLayout = variant === "discovery" ? "horizontal" : layout

    // Campus context signals (for discovery variant)
    const campusSignals = React.useMemo(() => {
      const signals: Array<{ type: string; label: string; icon: React.ReactNode }> = []

      if (space.campus.friendsInSpace.length > 0) {
        const count = space.campus.friendsInSpace.length
        signals.push({
          type: "friends",
          label: `${count} ${count === 1 ? "friend" : "friends"} here`,
          icon: <Users className="h-3.5 w-3.5" />
        })
      }

      if (space.campus.isTrending) {
        signals.push({
          type: "trending",
          label: "Trending on campus",
          icon: <Flame className="h-3.5 w-3.5" />
        })
      }

      if (space.campus.primaryMajor) {
        signals.push({
          type: "major",
          label: space.campus.primaryMajor,
          icon: <GraduationCap className="h-3.5 w-3.5" />
        })
      }

      return signals
    }, [space.campus])

    // Handle actions with both new and legacy handlers
    const handleCardClick = () => {
      onClick?.()
      onAction?.({ type: "space.click" })
    }

    const handleJoin = (e: React.MouseEvent) => {
      e.stopPropagation()
      onJoin?.()
      onAction?.({ type: "space.join" })
    }

    const handleLeave = (e: React.MouseEvent) => {
      e.stopPropagation()
      onLeave?.()
      onAction?.({ type: "space.leave" })
    }

    // Render helper: Member avatars
    const renderMemberAvatars = () => {
      if (!space.memberAvatars || space.memberAvatars.length === 0) return null

      const displayAvatars = space.memberAvatars.slice(0, 4)
      const remaining = space.memberAvatars.length - 4

      return (
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {displayAvatars.map((member, index) => (
              <div
                key={index}
                className="h-7 w-7 overflow-hidden rounded-md border-2 border-[#0c0c0c] bg-white/10 transition-smooth ease-liquid hover:z-10 hover:scale-110"
              >
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#FFD700]/10 text-[10px] font-semibold text-[#FFD700]">
                    {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                )}
              </div>
            ))}
            {remaining > 0 && (
              <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-md border-2 border-[#0c0c0c] bg-white/10 text-[10px] font-semibold text-white/70">
                +{remaining}
              </div>
            )}
          </div>
          {variant !== "compact" && (
            <span className="text-xs text-white/70">
              {space.stats.memberCount} members
            </span>
          )}
        </div>
      )
    }

    // Render helper: Stats
    const renderStats = () => {
      if (!showStats) return null

      return (
        <div className="flex items-center gap-4 text-sm text-white/70">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" aria-hidden="true" />
            <span>{space.stats.memberCount}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>{space.stats.postCount}</span>
          </div>
          {space.stats.activeToday > 0 && (
            <div className="flex items-center gap-1.5 text-[#FFD700]">
              <Flame className="h-4 w-4" aria-hidden="true" />
              <span className="text-xs">{space.stats.activeToday} active</span>
            </div>
          )}
        </div>
      )
    }

    // Render helper: Campus context badges
    const renderCampusContext = () => {
      if (!showCampusContext || campusSignals.length === 0) return null

      // Show primary signal only for compact variant
      const displaySignals = variant === "compact" ? campusSignals.slice(0, 1) : campusSignals

      return (
        <div className="flex flex-wrap gap-1.5">
          {displaySignals.map((signal, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="h-6 gap-1 px-2 text-xs bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/20"
            >
              {signal.icon}
              <span>{signal.label}</span>
            </Badge>
          ))}
        </div>
      )
    }

    // Render helper: Tags
    const renderTags = () => {
      if (!showTags || space.tags.length === 0) return null

      const displayTags = space.tags.slice(0, maxTags)
      const remaining = space.tags.length - maxTags

      return (
        <div className="flex flex-wrap gap-1.5">
          {displayTags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
          {remaining > 0 && (
            <Badge variant="outline" className="text-xs">
              +{remaining}
            </Badge>
          )}
        </div>
      )
    }

    // Render helper: Action button
    const renderActionButton = () => {
      if (!showActions) return null

      const { isJoined, unreadCount } = space.userContext

      if (variant === "compact") {
        return (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 shrink-0"
            onClick={isJoined ? handleLeave : handleJoin}
          >
            {isJoined ? (
              <CheckCircle2 className="h-4 w-4 text-[#FFD700]" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        )
      }

      if (variant === "discovery") {
        return (
          <Button
            size="sm"
            className="shrink-0"
            onClick={handleJoin}
          >
            <Plus className="mr-2 h-4 w-4" />
            Join Space
          </Button>
        )
      }

      if (isJoined) {
        return (
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Badge variant="default" className="h-5 px-2 text-xs bg-[#FFD700] text-black">
                {unreadCount} new
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-sm font-medium"
              onClick={handleLeave}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Joined
            </Button>
          </div>
        )
      }

      return (
        <Button
          size="sm"
          className="w-full text-sm font-medium"
          onClick={handleJoin}
        >
          <Plus className="mr-2 h-4 w-4" />
          Join Space
        </Button>
      )
    }

    // Render helper: Cover photo
    const renderCover = () => {
      const coverHeight = variant === "compact" ? "h-16" : effectiveLayout === "horizontal" ? "h-full" : "h-32"

      return (
        <div className={cn("relative w-full overflow-hidden", coverHeight)}>
          {space.coverPhoto ? (
            <img
              src={space.coverPhoto}
              alt={`${space.name} cover`}
              className="h-full w-full object-cover transition-smooth ease-liquid group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#FFD700]/30 via-[#FFD700]/20 to-[#FFD700]/10 transition-smooth ease-liquid group-hover:from-[#FFD700]/40 group-hover:via-[#FFD700]/30 group-hover:to-[#FFD700]/20" />
          )}

          {/* Overlays */}
          <div className="absolute inset-0 flex items-start justify-between p-2">
            {/* Privacy badge (top-right) */}
            {variant !== "compact" && (
              <div className="ml-auto">
                <Badge
                  variant={space.privacy === "public" ? "secondary" : "default"}
                  className="text-xs backdrop-blur-sm bg-[#0c0c0c]/80"
                >
                  {space.privacy === "public" ? "Public" : space.privacy === "private" ? "Private" : "Hidden"}
                </Badge>
              </div>
            )}
          </div>

          {/* Unread indicator (joined variant) */}
          {variant === "joined" && space.userContext.unreadCount > 0 && (
            <div className="absolute top-2 left-2">
              <Badge variant="default" className="h-6 px-2 text-xs bg-[#FFD700] text-black">
                {space.userContext.unreadCount} new
              </Badge>
            </div>
          )}

          {/* Trending flame (discovery variant) */}
          {variant === "discovery" && space.campus.isTrending && (
            <div className="absolute top-2 left-2">
              <Badge variant="default" className="h-6 gap-1 px-2 text-xs bg-[#FFD700] text-black">
                <Flame className="h-3 w-3 fill-current" />
                Trending
              </Badge>
            </div>
          )}
        </div>
      )
    }

    // Compact variant (minimal, for lists)
    if (variant === "compact") {
      return (
        <MotionDiv
          whileHover={{ x: 4 }}
          transition={transitions.fast}
        >
          <Card
            ref={ref}
            className={cn(
              "group flex items-center gap-3 p-3 transition-all duration-smooth ease-liquid hover:shadow-md hover:border-[#FFD700]/50 cursor-pointer",
              className
            )}
            onClick={handleCardClick}
            {...props}
          >
            {/* Cover thumbnail */}
            <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded">
              {space.coverPhoto ? (
                <img
                  src={space.coverPhoto}
                  alt={space.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-[#FFD700]/30 to-[#FFD700]/10" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-white truncate group-hover:text-[#FFD700] transition-smooth">
                {space.name}
              </h4>
              <div className="flex items-center gap-2 text-xs text-white/70">
                <span>{space.stats.memberCount} members</span>
                <span>•</span>
                <Badge variant="outline" className="h-4 px-1 text-[10px]">
                  {space.category}
                </Badge>
              </div>
            </div>

            {/* Action */}
            {renderActionButton()}
          </Card>
        </MotionDiv>
      )
    }

    // Horizontal layout (for discovery variant)
    if (effectiveLayout === "horizontal") {
      return (
        <MotionDiv
          whileHover={{ y: -2 }}
          transition={transitions.fast}
        >
          <Card
            ref={ref}
            className={cn(
              "group flex overflow-hidden transition-all duration-smooth ease-liquid hover:shadow-lg hover:border-[#FFD700]/50 cursor-pointer",
              className
            )}
            onClick={handleCardClick}
            {...props}
          >
            {/* Cover photo (left side) */}
            <div className="relative w-48 shrink-0">
              {renderCover()}
            </div>

            {/* Content (right side) */}
            <div className="flex-1 p-4 space-y-3 min-w-0">
              {/* Header */}
              <div className="space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-white line-clamp-1 transition-smooth ease-liquid group-hover:text-[#FFD700]">
                    {space.name}
                  </h3>
                  <Badge variant="outline" className="shrink-0 text-xs">
                    {space.category}
                  </Badge>
                </div>
                {space.description && (
                  <p className="text-sm text-white/70 line-clamp-2">
                    {space.description}
                  </p>
                )}
              </div>

              {/* Campus context (discovery priority) */}
              {renderCampusContext()}

              {/* Stats */}
              {renderStats()}

              {/* Friends preview (if applicable) */}
              {space.campus.friendsInSpace.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {space.campus.friendsInSpace.slice(0, 3).map((friend, index) => (
                      <div
                        key={index}
                        className="h-6 w-6 overflow-hidden rounded-full border-2 border-[#0c0c0c] bg-white/10"
                      >
                        {friend.avatar ? (
                          <img src={friend.avatar} alt={friend.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[#FFD700]/10 text-[10px] font-semibold text-[#FFD700]">
                            {friend.name[0]}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-white/70">
                    {space.campus.friendsInSpace[0].name}
                    {space.campus.friendsInSpace.length > 1 && ` and ${space.campus.friendsInSpace.length - 1} ${space.campus.friendsInSpace.length === 2 ? "other" : "others"}`}
                  </span>
                </div>
              )}

              {/* Action button */}
              <div className="pt-1">
                {renderActionButton()}
              </div>
            </div>
          </Card>
        </MotionDiv>
      )
    }

    // Vertical layout (default, joined variants)
    return (
      <MotionDiv
        whileHover={{ y: -4 }}
        transition={transitions.fast}
      >
        <Card
          ref={ref}
          className={cn(
            "group overflow-hidden transition-all duration-smooth ease-liquid hover:shadow-lg hover:border-[#FFD700]/50 cursor-pointer",
            className
          )}
          onClick={handleCardClick}
          {...props}
        >
          {/* Cover Photo */}
          {renderCover()}

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Header */}
            <div className="space-y-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-white line-clamp-1 transition-smooth ease-liquid group-hover:text-[#FFD700]">
                  {space.name}
                </h3>
                <Badge variant="outline" className="shrink-0 text-xs">
                  {space.category}
                </Badge>
              </div>
              {space.description && (
                <p className="text-sm text-white/70 line-clamp-2">
                  {space.description}
                </p>
              )}
            </div>

            {/* Campus context (if enabled) */}
            {renderCampusContext()}

            {/* Tags */}
            {renderTags()}

            {/* Stats */}
            {renderStats()}

            {/* Member Previews */}
            {space.memberAvatars && space.memberAvatars.length > 0 && renderMemberAvatars()}

            {/* Action Button */}
            <div className="pt-2">
              {renderActionButton()}
            </div>
          </div>
        </Card>
      </MotionDiv>
    )
  }
)

SpaceCard.displayName = "SpaceCard"

export { SpaceCard }
