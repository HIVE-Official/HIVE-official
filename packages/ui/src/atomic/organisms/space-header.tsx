"use client"

import * as React from "react"
import { MotionDiv, MotionButton } from "../../shells/motion-safe"
import { transitions, gesturePresets } from "../../lib/animations"
import { Button } from "../atoms/button"
import { Badge } from "../atoms/badge"
import { StatCard } from "../molecules/stat-card"
import { cn } from "../../lib/utils"
import type { SpaceData, SpaceActionHandler } from "../../types/space.types"

export interface SpaceHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  /** Space data (canonical type) */
  space: SpaceData
  /** Layout mode: header or sidebar */
  layout?: "header" | "sidebar"
  /** Whether sidebar is collapsed */
  isCollapsed?: boolean
  /** Loading state */
  isLoading?: boolean
  /** Action handler (aggregated) */
  onAction?: SpaceActionHandler
  /** Layout toggle handler */
  onToggleLayout?: () => void
  /** Legacy callbacks (for backward compatibility) */
  onJoin?: () => void
  onLeave?: () => void
  onEdit?: () => void
  onSettings?: () => void
  onAnalytics?: () => void
  onInvite?: () => void
}

const SpaceHeader = React.forwardRef<HTMLDivElement, SpaceHeaderProps>(
  (
    {
      className,
      space,
      layout = "header",
      isCollapsed = false,
      isLoading = false,
      onAction,
      onToggleLayout,
      // Legacy callbacks
      onJoin,
      onLeave,
      onEdit,
      onSettings,
      onAnalytics,
      onInvite,
      ...props
    },
    ref
  ) => {
    const isSidebar = layout === "sidebar"

    // Destructure space data
    const {
      name,
      description,
      coverPhoto,
      category,
      privacy,
      tags = [],
      stats,
      userContext,
      memberAvatars = [],
    } = space

    const { memberCount = 0, postCount = 0, eventCount = 0 } = stats || {}
    const { isJoined = false, isLeader = false } = userContext || {}

    // Event handlers with aggregation
    const handleJoin = React.useCallback(() => {
      onJoin?.()
      onAction?.({ type: "space.join" })
    }, [onJoin, onAction])

    const handleLeave = React.useCallback(() => {
      onLeave?.()
      onAction?.({ type: "space.leave" })
    }, [onLeave, onAction])

    const handleEdit = React.useCallback(() => {
      onEdit?.()
      onAction?.({ type: "space.edit" })
    }, [onEdit, onAction])

    const handleSettings = React.useCallback(() => {
      onSettings?.()
      onAction?.({ type: "space.settings" })
    }, [onSettings, onAction])

    const handleAnalytics = React.useCallback(() => {
      onAnalytics?.()
      onAction?.({ type: "space.analytics" })
    }, [onAnalytics, onAction])

    const handleInvite = React.useCallback(() => {
      onInvite?.()
      onAction?.({ type: "member.invite" })
    }, [onInvite, onAction])

    return (
      <MotionDiv
        ref={ref}
        layout
        className={cn(
          "transition-all duration-smooth ease-liquid",
          isSidebar ? "w-[320px] h-screen sticky top-0" : "w-full",
          className
        )}
        initial={false}
        animate={{
          width: isSidebar ? (isCollapsed ? 72 : 320) : "100%"
        }}
        transition={transitions.slow}
        {...(props as any)}
      >
        {/* Toggle Layout Button (Sidebar only) */}
        {isSidebar && onToggleLayout && (
          <MotionButton
            onClick={onToggleLayout}
            className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-md border border-white/8 bg-[#0c0c0c]/80 backdrop-blur-sm transition-smooth ease-liquid hover:bg-white/10"
            {...gesturePresets.buttonPress}
          >
            <svg className="h-4 w-4 text-white" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              {isCollapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              )}
            </svg>
          </MotionButton>
        )}

        {/* Cover Photo */}
        <MotionDiv
          layout
          className={cn(
            "relative overflow-hidden",
            isSidebar ? "h-32 rounded-t-lg" : "h-48 rounded-t-lg md:h-64"
          )}
        >
          {coverPhoto ? (
            <img
              src={coverPhoto}
              alt={`${name} cover`}
              className="h-full w-full object-cover transition-smooth ease-liquid"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#FFD700]/30 via-[#FFD700]/20 to-[#FFD700]/10 transition-smooth ease-liquid" />
          )}

          {/* Privacy Badge */}
          {!isCollapsed && (
            <MotionDiv
              initial={false}
              animate={{ opacity: isCollapsed ? 0 : 1 }}
              className="absolute right-4 top-4"
            >
              <Badge variant={privacy === "public" ? "default" : privacy === "private" ? "secondary" : "outline"}>
                {privacy === "public" ? "🌐 Public" : privacy === "private" ? "🔒 Private" : "👻 Hidden"}
              </Badge>
            </MotionDiv>
          )}
        </MotionDiv>

        {/* Main Content */}
        <MotionDiv
          layout
          className={cn(
            "border border-t-0 border-white/8 bg-[#0c0c0c]",
            isSidebar ? "rounded-b-lg p-4 overflow-y-auto flex-1" : "rounded-b-lg p-6"
          )}
        >
          <div className="flex flex-col gap-4">
            {/* Title Row */}
            {!isCollapsed && (
              <MotionDiv
                layout
                initial={false}
                animate={{ opacity: isCollapsed ? 0 : 1 }}
                className={cn(
                  "flex gap-3",
                  isSidebar ? "flex-col" : "flex-col sm:flex-row sm:items-start sm:justify-between"
                )}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className={cn(
                      "font-bold text-white",
                      isSidebar ? "text-lg" : "text-2xl md:text-3xl"
                    )}>
                      {name}
                    </h1>
                    <Badge className="transition-smooth ease-liquid text-xs">
                      {category}
                    </Badge>
                  </div>
                  {description && (
                    <p className={cn(
                      "mt-2 text-white/70",
                      isSidebar ? "text-xs line-clamp-2" : "text-sm md:text-base"
                    )}>
                      {description}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className={cn("flex gap-2", isSidebar ? "flex-col" : "shrink-0")}>
                  {isJoined ? (
                    <Button
                      variant="outline"
                      size={isSidebar ? "sm" : "default"}
                      onClick={handleLeave}
                      disabled={isLoading}
                      className={cn("transition-smooth ease-liquid", isSidebar && "w-full")}
                    >
                      <svg className="mr-2 h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Joined
                    </Button>
                  ) : (
                    <Button
                      size={isSidebar ? "sm" : "default"}
                      onClick={handleJoin}
                      disabled={isLoading}
                      className={cn("transition-smooth ease-liquid", isSidebar && "w-full")}
                    >
                      <svg className="mr-2 h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Join
                    </Button>
                  )}
                  {isLeader && !isSidebar && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleInvite}
                      disabled={isLoading}
                      className="transition-smooth ease-liquid"
                    >
                      <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                      </svg>
                    </Button>
                  )}
                </div>
              </MotionDiv>
            )}

            {/* Tags */}
            {tags.length > 0 && !isCollapsed && (
              <MotionDiv
                layout
                initial={false}
                animate={{ opacity: isCollapsed ? 0 : 1 }}
                className="flex flex-wrap gap-2"
              >
                {tags.slice(0, isSidebar ? 3 : tags.length).map((tag, index) => (
                  <Badge key={index} variant="sophomore" className="transition-smooth ease-liquid text-xs">
                    #{tag}
                  </Badge>
                ))}
                {isSidebar && tags.length > 3 && (
                  <Badge variant="freshman" className="text-xs">
                    +{tags.length - 3}
                  </Badge>
                )}
              </MotionDiv>
            )}

            {/* Stats Grid */}
            {!isCollapsed && (
              <MotionDiv
                layout
                initial={false}
                animate={{ opacity: isCollapsed ? 0 : 1 }}
                className={cn(
                  "grid gap-2",
                  isSidebar ? "grid-cols-1" : "gap-3 sm:grid-cols-3"
                )}
              >
                <StatCard
                  label="Members"
                  value={memberCount}
                  size={isSidebar ? "sm" : "default"}
                  icon={
                    <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                  }
                />
                <StatCard
                  label="Posts"
                  value={postCount}
                  size={isSidebar ? "sm" : "default"}
                  icon={
                    <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                  }
                />
                <StatCard
                  label="Events"
                  value={eventCount}
                  size={isSidebar ? "sm" : "default"}
                  icon={
                    <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  }
                />
              </MotionDiv>
            )}

            {/* Member Previews */}
            {memberAvatars.length > 0 && !isCollapsed && (
              <MotionDiv
                layout
                initial={false}
                animate={{ opacity: isCollapsed ? 0 : 1 }}
                className="flex items-center gap-3"
              >
                <div className="flex -space-x-2">
                  {memberAvatars.slice(0, isSidebar ? 4 : 5).map((member, index) => (
                    <div
                      key={index}
                      className={cn(
                        "overflow-hidden rounded-md border-2 border-[#0c0c0c] bg-white/10 transition-smooth ease-liquid hover:z-10 hover:scale-110",
                        isSidebar ? "h-7 w-6" : "h-8 w-7"
                      )}
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
                  {memberAvatars.length > (isSidebar ? 4 : 5) && (
                    <div className={cn(
                      "flex items-center justify-center overflow-hidden rounded-md border-2 border-[#0c0c0c] bg-white/10 text-[10px] font-semibold text-white/70",
                      isSidebar ? "h-7 w-6" : "h-8 w-7"
                    )}>
                      +{memberAvatars.length - (isSidebar ? 4 : 5)}
                    </div>
                  )}
                </div>
                {!isSidebar && (
                  <span className="text-sm text-white/70">
                    {memberCount > 0 && `${memberCount} total members`}
                  </span>
                )}
              </MotionDiv>
            )}

            {/* Leader Toolbar */}
            {isLeader && !isCollapsed && (
              <MotionDiv
                layout
                initial={false}
                animate={{ opacity: isCollapsed ? 0 : 1 }}
                className={cn(
                  "rounded-lg border border-white/8 bg-white/5",
                  isSidebar ? "p-2" : "flex flex-wrap gap-2 p-3"
                )}
              >
                {!isSidebar && (
                  <span className="flex items-center gap-1.5 text-sm font-medium text-white">
                    <svg className="h-4 w-4 text-[#FFD700]" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                    Leader Controls
                  </span>
                )}
                <div className={cn(
                  "flex gap-2",
                  isSidebar ? "flex-col" : "flex-1 flex-wrap sm:justify-end"
                )}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleEdit}
                    disabled={isLoading}
                    className={cn("transition-smooth ease-liquid", isSidebar && "w-full justify-start")}
                  >
                    <svg className="mr-1.5 h-3.5 w-3.5" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSettings}
                    disabled={isLoading}
                    className={cn("transition-smooth ease-liquid", isSidebar && "w-full justify-start")}
                  >
                    <svg className="mr-1.5 h-3.5 w-3.5" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAnalytics}
                    disabled={isLoading}
                    className={cn("transition-smooth ease-liquid", isSidebar && "w-full justify-start")}
                  >
                    <svg className="mr-1.5 h-3.5 w-3.5" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                    Analytics
                  </Button>
                  {isSidebar && isLeader && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleInvite}
                      disabled={isLoading}
                      className="w-full justify-start transition-smooth ease-liquid"
                    >
                      <svg className="mr-1.5 h-3.5 w-3.5" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                      </svg>
                      Invite
                    </Button>
                  )}
                </div>
              </MotionDiv>
            )}
          </div>
        </MotionDiv>

        {/* Collapsed Sidebar Icon Stack */}
        {isSidebar && isCollapsed && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-2 p-2"
          >
            {/* Members Icon */}
            <MotionButton
              {...gesturePresets.buttonPress}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/8 bg-[#0c0c0c] transition-smooth ease-liquid hover:bg-white/10"
            >
              <svg className="h-5 w-5 text-white" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </MotionButton>
            {/* Posts Icon */}
            <MotionButton
              {...gesturePresets.buttonPress}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/8 bg-[#0c0c0c] transition-smooth ease-liquid hover:bg-white/10"
            >
              <svg className="h-5 w-5 text-white" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </MotionButton>
            {/* Events Icon */}
            <MotionButton
              {...gesturePresets.buttonPress}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/8 bg-[#0c0c0c] transition-smooth ease-liquid hover:bg-white/10"
            >
              <svg className="h-5 w-5 text-white" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </MotionButton>
          </MotionDiv>
        )}
      </MotionDiv>
    )
  }
)

SpaceHeader.displayName = "SpaceHeader"

export { SpaceHeader }
