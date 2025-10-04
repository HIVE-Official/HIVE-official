"use client"

import * as React from "react"
import { MotionDiv, AnimatePresence } from "../../shells/motion-safe"
import { transitions } from "../../lib/animations"
import { X, ChevronDown, Users, Calendar as CalendarIcon, FileText, Info, Wrench } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../atoms/button"
import { Badge } from "../atoms/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../atoms/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../atoms/dialog"
import { SpacePostFeed, SpacePost } from "../organisms/space-post-feed"
import { SpaceAboutSection } from "../organisms/space-about-section"
import { SpaceEventsPanel, SpaceEvent } from "../organisms/space-events-panel"
import { SpaceResourcesPanel, SpaceResource } from "../organisms/space-resources-panel"
import { SpaceMembersPanel, SpaceMemberPreview } from "../organisms/space-members-panel"
import { EventsCalendar, CalendarEvent } from "../organisms/events-calendar"
import { SpaceSidePanel } from "../organisms/space-side-panel"
import {
  InlineToolsWidget,
  InlineEventForm,
  InlinePollForm,
  InlineTaskForm,
  InlineResourceForm,
  type EventFormData,
  type PollFormData,
  type TaskFormData,
  type ResourceFormData
} from "../molecules"
import type { SpaceData, SpaceActionHandler, ContextPanelState } from "../../types/space.types"

/**
 * Space Layout Template
 *
 * Demonstrates full composition architecture with:
 * - Canonical SpaceData type
 * - Single SpaceActionHandler for all events
 * - Controlled context panel state
 * - 60/40 responsive layout
 */
export interface SpaceLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Space data (canonical type) */
  space: SpaceData

  /** Posts for main feed */
  posts?: SpacePost[]
  /** Hot threads (10+ replies) shown as tabs */
  hotThreads?: Array<{ id: string; title: string; replyCount: number; posts: SpacePost[] }>
  /** Events for sidebar */
  events?: SpaceEvent[]
  /** Resources for sidebar */
  resources?: SpaceResource[]
  /** Members for sidebar preview */
  members?: SpaceMemberPreview[]

  /** Context panel state (controlled) */
  contextPanel?: ContextPanelState
  /** Context panel change handler */
  onContextPanelChange?: (state: ContextPanelState) => void

  /** Loading states */
  isLoadingPosts?: boolean
  isLoadingEvents?: boolean
  isLoadingResources?: boolean
  isLoadingMembers?: boolean

  /** Has more posts to load */
  hasMorePosts?: boolean

  /** Layout mode */
  layoutMode?: "sidebar" | "fullwidth"

  /** Action handler (aggregated - routes all actions) */
  onAction?: SpaceActionHandler

  /** @deprecated Legacy handlers (for backward compatibility) */
  onCreatePost?: (content: string) => void
  onPostClick?: (post: SpacePost) => void
  onLikePost?: (postId: string) => void
  onCommentPost?: (postId: string) => void
  onSharePost?: (postId: string) => void
  onLoadMore?: () => void
  onEditDescription?: () => void
  onEditRules?: () => void
  onCreateEvent?: () => void
  onEventClick?: (event: SpaceEvent) => void
  onRSVP?: (eventId: string, attending: boolean) => void
  onAddResource?: () => void
  onResourceClick?: (resource: SpaceResource) => void
  onInviteMembers?: () => void
  onViewAllMembers?: () => void
  onMemberClick?: (member: SpaceMemberPreview) => void
}

const SpaceLayout = React.forwardRef<HTMLDivElement, SpaceLayoutProps>(
  (
    {
      className,
      space,
      posts = [],
      hotThreads = [],
      events = [],
      resources = [],
      members = [],
      contextPanel,
      onContextPanelChange,
      isLoadingPosts = false,
      isLoadingEvents = false,
      isLoadingResources = false,
      isLoadingMembers = false,
      hasMorePosts = false,
      layoutMode = "sidebar",
      onAction,
      // Legacy handlers
      onCreatePost,
      onPostClick,
      onLikePost,
      onCommentPost,
      onSharePost,
      onLoadMore,
      onEditDescription,
      onEditRules,
      onCreateEvent,
      onEventClick,
      onRSVP,
      onAddResource,
      onResourceClick,
      onInviteMembers,
      onViewAllMembers,
      onMemberClick,
      ...props
    },
    ref
  ) => {
    // Destructure space data with safe defaults
    const userContext = space.userContext ?? { isJoined: false, isLeader: false, unreadCount: 0 }
    const stats = space.stats ?? { memberCount: 0, postCount: 0, eventCount: 0, activeToday: 0 }
    const { isJoined, isLeader } = userContext

    // Modal state management
    type ModalType = "events" | "members" | "resources" | "about" | "tools" | null
    const [openModal, setOpenModal] = React.useState<ModalType>(null)

    // Inline tool form state
    const [activeToolForm, setActiveToolForm] = React.useState<"event" | "poll" | "task" | "resource" | null>(null)

    // Internal state (fallback if not controlled)
    const [internalContextOpen, setInternalContextOpen] = React.useState(false)
    const [internalSelectedPostId, setInternalSelectedPostId] = React.useState<string | null>(null)

    // Use controlled state if provided, otherwise use internal state
    const contextOpen = contextPanel?.isOpen ?? internalContextOpen
    const selectedPostId = contextPanel?.postId ?? internalSelectedPostId
    const selectedPost = posts.find(p => p.id === selectedPostId)

    // Context panel controls
    const openContext = React.useCallback((postId: string) => {
      if (onContextPanelChange) {
        onContextPanelChange({ isOpen: true, postId })
      } else {
        setInternalContextOpen(true)
        setInternalSelectedPostId(postId)
      }
    }, [onContextPanelChange])

    const closeContext = React.useCallback(() => {
      if (onContextPanelChange) {
        onContextPanelChange({ isOpen: false })
      } else {
        setInternalContextOpen(false)
        setTimeout(() => setInternalSelectedPostId(null), 300)
      }
    }, [onContextPanelChange])

    // Central action router - forwards all actions to parent and organisms
    const handleAction = React.useCallback<SpaceActionHandler>((action) => {
      // Handle inline tool actions
      if (action.type === "tool.event.create") {
        setActiveToolForm("event")
        return
      }
      if (action.type === "tool.poll.create") {
        setActiveToolForm("poll")
        return
      }
      if (action.type === "tool.task.create") {
        setActiveToolForm("task")
        return
      }
      if (action.type === "tool.resource.upload") {
        setActiveToolForm("resource")
        return
      }

      // Route to legacy handlers first (backward compatibility)
      switch (action.type) {
        case "post.create":
          onCreatePost?.(action.content)
          break
        case "post.click":
          const post = posts.find(p => p.id === action.postId)
          if (post) {
            openContext(action.postId)
            onPostClick?.(post)
          }
          break
        case "post.like":
          onLikePost?.(action.postId)
          break
        case "post.unlike":
          onLikePost?.(action.postId) // Legacy doesn't distinguish
          break
        case "post.comment":
          onCommentPost?.(action.postId)
          break
        case "post.share":
          onSharePost?.(action.postId)
          break
        case "feed.loadMore":
          onLoadMore?.()
          break
        case "description.edit":
          onEditDescription?.()
          break
        case "rules.edit":
          onEditRules?.()
          break
        case "event.create":
          onCreateEvent?.()
          break
        case "event.click":
          const event = events.find(e => e.id === action.eventId)
          if (event) onEventClick?.(event)
          break
        case "event.rsvp":
          onRSVP?.(action.eventId, action.attending)
          break
        case "resource.add":
          onAddResource?.()
          break
        case "resource.click":
          const resource = resources.find(r => r.id === action.resourceId)
          if (resource) onResourceClick?.(resource)
          break
        case "member.invite":
          onInviteMembers?.()
          break
        case "member.viewAll":
          onViewAllMembers?.()
          break
        case "member.click":
          const member = members.find(m => m.userId === action.memberId)
          if (member) onMemberClick?.(member)
          break
      }

      // Forward to parent's action handler
      onAction?.(action)
    }, [
      posts, events, resources, members,
      openContext, onAction,
      onCreatePost, onPostClick, onLikePost, onCommentPost, onSharePost, onLoadMore,
      onEditDescription, onEditRules, onCreateEvent, onEventClick, onRSVP,
      onAddResource, onResourceClick, onInviteMembers, onViewAllMembers, onMemberClick
    ])

    // Sidebar content (40% width) - Widget previews that open modals for full view
    const sidebarContent = (
      <div className="space-y-4">
        {/* Members Widget */}
        <div className="rounded-lg border border-white/8 bg-[#0c0c0c] overflow-hidden transition-all duration-[400ms] hover:border-white/20">
          <div className="p-4 border-b border-white/8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-white/70" />
                <h3 className="text-sm font-semibold text-white">Members</h3>
              </div>
              <Badge variant="sophomore" className="text-xs">
                {stats.memberCount}
              </Badge>
            </div>
          </div>
          <div className="p-4">
            {/* Preview: First 3 members */}
            {members.slice(0, 3).length > 0 ? (
              <div className="space-y-2 mb-3">
                {members.slice(0, 3).map((member) => (
                  <div key={member.userId} className="flex items-center gap-2 text-xs">
                    <div className="h-6 w-6 rounded-full bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] font-semibold text-[10px]">
                      {member.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-white/80 truncate flex-1">{member.name}</span>
                    {member.isOnline && (
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-white/50 mb-3">No members yet</p>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpenModal("members")}
              className="w-full text-xs"
            >
              View All
            </Button>
          </div>
        </div>

        {/* Events Widget */}
        <div className="rounded-lg border border-white/8 bg-[#0c0c0c] overflow-hidden transition-all duration-[400ms] hover:border-white/20">
          <div className="p-4 border-b border-white/8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-white/70" />
                <h3 className="text-sm font-semibold text-white">Events</h3>
              </div>
              {events.length > 0 && (
                <Badge variant="freshman" className="text-xs bg-[#FFD700] text-black">
                  {events.length}
                </Badge>
              )}
            </div>
          </div>
          <div className="p-4">
            {/* Preview: Next 3 upcoming events */}
            {events.slice(0, 3).length > 0 ? (
              <div className="space-y-3 mb-3">
                {events.slice(0, 3).map((event) => (
                  <div key={event.id} className="text-xs">
                    <p className="font-medium text-white line-clamp-1">{event.title}</p>
                    <p className="text-white/50 text-[10px] mt-0.5">
                      {event.timeDisplay || "Time TBD"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-white/50 mb-3">No upcoming events</p>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpenModal("events")}
              className="w-full text-xs"
            >
              View Calendar
            </Button>
          </div>
        </div>

        {/* Tools Widget - SPEC Compliant Inline Tools */}
        <div className="rounded-lg border border-white/8 bg-[#0c0c0c] overflow-hidden transition-all duration-[400ms] hover:border-white/20">
          <div className="p-4 border-b border-white/8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-white/70" />
                <h3 className="text-sm font-semibold text-white">Quick Tools</h3>
              </div>
              <Badge variant="freshman" className="text-xs bg-[#FFD700] text-black">
                4
              </Badge>
            </div>
          </div>
          <div className="p-4">
            <InlineToolsWidget
              isLeader={isLeader}
              isNewMember={false} // TODO: Calculate from joinedAt
              onCreateEvent={() => handleAction({ type: "tool.event.create" })}
              onCreatePoll={() => handleAction({ type: "tool.poll.create" })}
              onCreateTask={() => handleAction({ type: "tool.task.create" })}
              onUploadResource={() => handleAction({ type: "tool.resource.upload" })}
            />
          </div>
        </div>

        {/* Resources Widget */}
        {(resources.length > 0 || isLeader) && (
          <div className="rounded-lg border border-white/8 bg-[#0c0c0c] overflow-hidden transition-all duration-[400ms] hover:border-white/20">
            <div className="p-4 border-b border-white/8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-white/70" />
                  <h3 className="text-sm font-semibold text-white">Resources</h3>
                </div>
                <Badge variant="sophomore" className="text-xs">
                  {resources.length}
                </Badge>
              </div>
            </div>
            <div className="p-4">
              {resources.slice(0, 3).length > 0 ? (
                <div className="space-y-2 mb-3">
                  {resources.slice(0, 3).map((resource) => (
                    <div key={resource.id} className="text-xs">
                      <p className="font-medium text-white line-clamp-1">{resource.title}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-white/50 mb-3">No resources yet</p>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpenModal("resources")}
                className="w-full text-xs"
              >
                View All
              </Button>
            </div>
          </div>
        )}

        {/* About Widget */}
        <div className="rounded-lg border border-white/8 bg-[#0c0c0c] overflow-hidden transition-all duration-[400ms] hover:border-white/20">
          <div className="p-4 border-b border-white/8">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-white/70" />
              <h3 className="text-sm font-semibold text-white">About</h3>
            </div>
          </div>
          <div className="p-4">
            <p className="text-xs text-white/70 line-clamp-2 mb-3">
              {space.description}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpenModal("about")}
              className="w-full text-xs"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    )

    // Context panel content (Thread/Post detail view)
    const contextContent = selectedPost && (
      <div className="h-full flex flex-col">
        {/* Context Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/8">
          <h3 className="text-lg font-semibold tracking-tight leading-tight">Thread</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeContext}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Thread Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Original Post */}
          <div className="mb-6 pb-6 border-b border-white/8">
            <div className="flex gap-3">
              {/* Author Avatar */}
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white/10">
                {selectedPost.author.avatar ? (
                  <img
                    src={selectedPost.author.avatar}
                    alt={selectedPost.author.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#FFD700]/10 text-[#FFD700] text-xs font-semibold">
                    {selectedPost.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm font-semibold text-white">
                    {selectedPost.author.name}
                  </span>
                  <span className="text-xs text-white/70">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    }).format(selectedPost.createdAt)}
                  </span>
                </div>
                <div className="text-sm text-white leading-normal whitespace-pre-wrap">
                  {selectedPost.content}
                </div>
              </div>
            </div>
          </div>

          {/* Comments would go here */}
          <div className="text-center py-8 text-sm text-white/70">
            Comments coming soon...
          </div>
        </div>
      </div>
    )

    if (layoutMode === "fullwidth") {
      // Full-width mode with sliding context panel (Discord-style)
      return (
        <div
          ref={ref}
          className={cn("relative w-full h-full flex", className)}
          {...props}
        >
          {/* Main Feed + Thread Tabs - Takes full width when context closed */}
          <MotionDiv
            className="flex-1 min-w-0"
            animate={{
              marginRight: contextOpen ? 400 : 0,
            }}
            transition={transitions.slow}
          >
            {hotThreads && hotThreads.length > 0 ? (
              <Tabs defaultValue="feed" className="w-full">
                <TabsList className="mb-4 w-full justify-start overflow-x-auto border-b border-white/8 bg-transparent">
                  <TabsTrigger value="feed" className="data-[state=active]:border-b-2 data-[state=active]:border-[#FFD700]">
                    Feed
                  </TabsTrigger>
                  {hotThreads.slice(0, 5).map((thread) => (
                    <TabsTrigger
                      key={thread.id}
                      value={thread.id}
                      className="data-[state=active]:border-b-2 data-[state=active]:border-[#FFD700]"
                    >
                      <span className="truncate max-w-[120px]">{thread.title}</span>
                      <Badge variant="sophomore" className="ml-2 text-xs">
                        {thread.replyCount}
                      </Badge>
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="feed" className="mt-0">
                  <SpacePostFeed
                    posts={posts}
                    canPost={isJoined}
                    showComposer={isJoined}
                    hasMore={hasMorePosts}
                    isLoading={isLoadingPosts}
                  />
                </TabsContent>

                {hotThreads.map((thread) => (
                  <TabsContent key={thread.id} value={thread.id} className="mt-0">
                    <SpacePostFeed
                      posts={thread.posts}
                      canPost={isJoined}
                      showComposer={false}
                      hasMore={false}
                      isLoading={false}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <SpacePostFeed
                posts={posts}
                canPost={isJoined}
                showComposer={isJoined}
                hasMore={hasMorePosts}
                isLoading={isLoadingPosts}
              />
            )}
          </MotionDiv>

          {/* Sliding Context Panel (Thread view) */}
          <AnimatePresence>
            {contextOpen && (
              <MotionDiv
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 400, opacity: 0 }}
                transition={transitions.slow}
                className="absolute right-0 top-0 h-full w-[400px] border-l border-white/8 bg-[#0c0c0c] shadow-lg"
              >
                {contextContent}
              </MotionDiv>
            )}
          </AnimatePresence>
        </div>
      )
    }

    // Sidebar mode - Traditional 60/40 split with sticky sidebar
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-6 w-full max-w-7xl mx-auto p-6",
          "flex-col lg:flex-row",
          className
        )}
        {...props}
      >
        {/* Main Content (Feed + Thread Tabs) - 60% */}
        <div className="flex-[6] min-w-0">
          {hotThreads && hotThreads.length > 0 ? (
            <Tabs defaultValue="feed" className="w-full">
              <TabsList className="mb-4 w-full justify-start overflow-x-auto border-b border-white/8 bg-transparent">
                <TabsTrigger value="feed" className="data-[state=active]:border-b-2 data-[state=active]:border-[#FFD700]">
                  Feed
                </TabsTrigger>
                {hotThreads.slice(0, 5).map((thread) => (
                  <TabsTrigger
                    key={thread.id}
                    value={thread.id}
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#FFD700]"
                  >
                    <span className="truncate max-w-[120px]">{thread.title}</span>
                    <Badge variant="sophomore" className="ml-2 text-xs">
                      {thread.replyCount}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="feed" className="mt-0">
                <SpacePostFeed
                  posts={posts}
                  canPost={isJoined}
                  showComposer={isJoined}
                  hasMore={hasMorePosts}
                  isLoading={isLoadingPosts}
                />
              </TabsContent>

              {hotThreads.map((thread) => (
                <TabsContent key={thread.id} value={thread.id} className="mt-0">
                  <SpacePostFeed
                    posts={thread.posts}
                    canPost={isJoined}
                    showComposer={false}
                    hasMore={false}
                    isLoading={false}
                  />
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <SpacePostFeed
              posts={posts}
              canPost={isJoined}
              showComposer={isJoined}
              hasMore={hasMorePosts}
              isLoading={isLoadingPosts}
            />
          )}
        </div>

        {/* Sidebar - 40% */}
        <div className="flex-[4] space-y-4 min-w-0 lg:sticky lg:top-4 lg:self-start lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
          {sidebarContent}
        </div>

        {/* Context Panel Overlay (for thread view on mobile/tablet) */}
        <AnimatePresence>
          {contextOpen && (
            <>
              {/* Backdrop */}
              <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeContext}
                className="fixed inset-0 bg-[#0c0c0c]/80 backdrop-blur-sm z-40 lg:hidden"
              />

              {/* Sliding Panel (mobile) */}
              <MotionDiv
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={transitions.slow}
                className="fixed right-0 top-0 h-full w-full max-w-md border-l border-white/8 bg-[#0c0c0c] shadow-2xl z-50 lg:hidden"
              >
                {contextContent}
              </MotionDiv>
            </>
          )}
        </AnimatePresence>

        {/* Modal Dialogs */}
        {/* Events Calendar Modal */}
        <Dialog open={openModal === "events"} onOpenChange={(open) => !open && setOpenModal(null)}>
          <DialogContent className="max-w-6xl h-[90vh] p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Events Calendar</DialogTitle>
            </DialogHeader>
            <div className="h-full overflow-y-auto">
              <EventsCalendar
                events={events.map(event => ({
                  id: event.id,
                  title: event.title,
                  dateTime: {
                    start: event.startDate,
                    end: event.endDate,
                    display: event.timeDisplay || "Time TBD"
                  },
                  location: {
                    name: event.location || "Location TBD",
                    type: event.locationType || "on-campus"
                  },
                  space: {
                    name: space.name,
                    id: space.id
                  },
                  attendees: {
                    count: event.attendeeCount || 0
                  },
                  rsvp: {
                    status: event.userRSVP || null
                  },
                  category: event.category,
                  campusContext: event.campusContext
                }))}
                onEventClick={(eventId) => {
                  handleAction({ type: "event.click", eventId })
                }}
                onRsvp={(eventId, status) => {
                  handleAction({ type: "event.rsvp", eventId, attending: status === "going" })
                }}
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Members Modal */}
        <Dialog open={openModal === "members"} onOpenChange={(open) => !open && setOpenModal(null)}>
          <DialogContent className="max-w-4xl h-[80vh] p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Members</DialogTitle>
            </DialogHeader>
            <div className="h-full overflow-y-auto">
              <SpaceMembersPanel
                members={members}
                totalMemberCount={stats.memberCount}
                canInvite={isLeader}
                previewLimit={50}
                isLoading={isLoadingMembers}
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Resources Modal */}
        <Dialog open={openModal === "resources"} onOpenChange={(open) => !open && setOpenModal(null)}>
          <DialogContent className="max-w-4xl h-[80vh] p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Resources</DialogTitle>
            </DialogHeader>
            <div className="h-full overflow-y-auto">
              <SpaceResourcesPanel
                resources={resources}
                canAddResources={isLeader}
                alwaysShowAddButton={isLeader}
                isLoading={isLoadingResources}
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* About Modal */}
        <Dialog open={openModal === "about"} onOpenChange={(open) => !open && setOpenModal(null)}>
          <DialogContent className="max-w-3xl h-[80vh] p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">About {space.name}</DialogTitle>
            </DialogHeader>
            <div className="h-full overflow-y-auto">
              <SpaceAboutSection
                description={space.description}
                tags={space.tags}
                category={space.category}
                type={space.spaceType}
                memberCount={stats.memberCount}
                postCount={stats.postCount}
                eventCount={stats.eventCount}
                createdAt={space.createdAt}
                createdBy={space.creator}
                rules={space.rules}
                isLeader={isLeader}
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Tools Modal */}
        <Dialog open={openModal === "tools"} onOpenChange={(open) => !open && setOpenModal(null)}>
          <DialogContent className="max-w-4xl h-[80vh] p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Space Tools</DialogTitle>
            </DialogHeader>
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <Wrench className="h-16 w-16 mx-auto text-white/30" />
                <h3 className="text-xl font-semibold text-white">HiveLab Tools Coming Soon</h3>
                <p className="text-sm text-white/70 max-w-md">
                  Space leaders will be able to create custom tools for their communities using HiveLab's no-code builder.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
)

SpaceLayout.displayName = "SpaceLayout"

export { SpaceLayout }
