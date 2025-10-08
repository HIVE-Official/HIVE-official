/**
 * @deprecated This file has been deprecated.
 *
 * DEPRECATION REASON:
 * This 20/50/30 three-zone adaptive layout does not match SPEC.md requirements.
 *
 * SPEC requires:
 * - 60/40 split (Chat Board + Universal Widgets Sidebar)
 * - Side panels that expand with hash URLs (#events, #members, #resources)
 * - Inline tools (📅📊📋📚) not separate views
 *
 * USE INSTEAD: space-layout.tsx
 *
 * This file is kept for reference only. Do not use in production.
 */

"use client"

import * as React from "react"
import { MotionDiv } from "../../shells/motion-safe"
import {
  MessageSquare,
  Pin,
  Wrench,
  Calendar as CalendarIcon,
  FileText,
  Users,
  Plus,
  ChevronRight,
  Settings,
  MoreHorizontal
} from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../atoms/button"
import { Badge } from "../atoms/badge"
import { Avatar, AvatarFallback } from "../atoms/avatar"
import { ScrollArea } from "../atoms/scroll-area"
import { SpacePostFeed, SpacePost } from "../organisms/space-post-feed"
import { EventsCalendar, CalendarEvent } from "../organisms/events-calendar"
import type { SpaceData, SpaceActionHandler } from "../../types/space.types"

/**
 * Space Layout - Three-Zone Adaptive Architecture
 *
 * LEFT (20%): Quick Access Panel - Launcher-style navigation
 * CENTER (50%): Adaptive Canvas - Content area that transforms
 * RIGHT (30%): Ambient Context - Live presence and contextual info
 *
 * Key Principles:
 * - No rigid tabs - fluid context switching
 * - Tools are first-class (equal to Stream)
 * - Center adapts to focus (stream, tool, event, etc)
 * - Right sidebar shows ambient awareness (who's here, what's happening)
 * - Everything is contextual
 */

export type SpaceView = 'stream' | 'pinned' | 'tools' | 'events' | 'files' | 'members'

export interface SpaceTool {
  id: string
  name: string
  icon: string
  description: string
  usageCount: number
}

export interface SpaceLayoutAdaptiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Space data (canonical type) */
  space: SpaceData

  /** Posts for stream view */
  posts?: SpacePost[]

  /** Pinned posts */
  pinnedPosts?: SpacePost[]

  /** Space tools (HiveLab) */
  tools?: SpaceTool[]

  /** Events */
  events?: CalendarEvent[]

  /** Files/Resources count */
  filesCount?: number

  /** Members for presence */
  members?: Array<{ userId: string; name: string; isOnline: boolean; avatar?: string }>

  /** Online members count */
  onlineCount?: number

  /** Initial view */
  initialView?: SpaceView

  /** Action handler */
  onAction?: SpaceActionHandler
}

const SpaceLayoutAdaptive = React.forwardRef<HTMLDivElement, SpaceLayoutAdaptiveProps>(
  (
    {
      className,
      space,
      posts = [],
      pinnedPosts = [],
      tools = [],
      events = [],
      filesCount = 0,
      members = [],
      onlineCount = 0,
      initialView = 'stream',
      onAction,
      ...props
    },
    ref
  ) => {
    const [activeView, setActiveView] = React.useState<SpaceView>(initialView)
    const [selectedToolId, setSelectedToolId] = React.useState<string | null>(null)
    const [selectedEventId, setSelectedEventId] = React.useState<string | null>(null)

    const userContext = space.userContext ?? { isJoined: false, isLeader: false, unreadCount: 0 }
    const stats = space.stats ?? { memberCount: 0, postCount: 0, eventCount: 0, activeToday: 0 }
    const { isJoined, isLeader } = userContext

    const onlineMembers = members.filter(m => m.isOnline).slice(0, 6)

    // Quick Access Item Component
    const QuickAccessItem = ({
      icon: Icon,
      label,
      count,
      view,
      badge
    }: {
      icon: any;
      label: string;
      count?: number;
      view: SpaceView;
      badge?: 'gold' | 'default'
    }) => (
      <button
        onClick={() => setActiveView(view)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200",
          activeView === view
            ? "bg-white/10 text-white"
            : "text-white/70 hover:bg-white/5 hover:text-white"
        )}
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        {count !== undefined && count > 0 && (
          <Badge
            variant={badge === 'gold' ? 'default' : 'secondary'}
            className={cn(
              "text-xs",
              badge === 'gold' && "bg-[#FFD700] text-black"
            )}
          >
            {count}
          </Badge>
        )}
      </button>
    )

    return (
      <div
        ref={ref}
        className={cn("flex flex-col h-screen bg-[#000000]", className)}
        {...props}
      >
        {/* Space Identity Bar */}
        <div className="border-b border-white/8 bg-[#0c0c0c] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-white">{space.name}</h1>
                  <Badge variant="freshman" className="text-xs capitalize">
                    {space.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mt-1 text-sm text-white/70">
                  <span>{stats.memberCount} members</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    {onlineCount} online
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isJoined && (
                <Badge variant="sophomore" className="text-xs">
                  {isLeader ? 'Leader' : 'Member'}
                </Badge>
              )}
              <Button variant="outline" size="sm" className="gap-2">
                <Wrench className="h-4 w-4" />
                Tools
                <ChevronRight className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Three-Zone Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* LEFT: Quick Access Panel (20%) */}
          <div className="w-[20%] border-r border-white/8 bg-[#0c0c0c] flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-1">
                <QuickAccessItem
                  icon={MessageSquare}
                  label="Stream"
                  count={posts.length}
                  view="stream"
                />
                <QuickAccessItem
                  icon={Pin}
                  label="Pinned"
                  count={pinnedPosts.length}
                  view="pinned"
                />
                <QuickAccessItem
                  icon={Wrench}
                  label="Tools"
                  count={tools.length}
                  view="tools"
                />
                <QuickAccessItem
                  icon={CalendarIcon}
                  label="Events"
                  count={events.length}
                  view="events"
                  badge="gold"
                />
                <QuickAccessItem
                  icon={FileText}
                  label="Files"
                  count={filesCount}
                  view="files"
                />
                <QuickAccessItem
                  icon={Users}
                  label="Members"
                  count={stats.memberCount}
                  view="members"
                />
              </div>
            </ScrollArea>

            {/* New Post Button - Always Visible */}
            {isJoined && (
              <div className="p-4 border-t border-white/8">
                <Button
                  className="w-full gap-2 bg-[#FFD700] text-black hover:bg-[#FFD700]/90"
                  onClick={() => onAction?.({ type: 'post.create', content: '' })}
                >
                  <Plus className="h-4 w-4" />
                  New Post
                </Button>
              </div>
            )}
          </div>

          {/* CENTER: Adaptive Canvas (50%) */}
          <div className="flex-1 bg-[#000000] overflow-hidden">
            <ScrollArea className="h-full">
              {/* Stream View */}
              {activeView === 'stream' && (
                <div className="p-6">
                  <SpacePostFeed
                    posts={posts}
                    canPost={isJoined}
                    showComposer={isJoined}
                    onAction={onAction}
                  />
                </div>
              )}

              {/* Pinned View */}
              {activeView === 'pinned' && (
                <div className="p-6">
                  <div className="mb-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveView('stream')}
                      className="mb-4"
                    >
                      ← Back to stream
                    </Button>
                    <h2 className="text-2xl font-bold text-white">Pinned Posts</h2>
                    <p className="text-sm text-white/70 mt-1">
                      Important announcements and resources
                    </p>
                  </div>

                  {pinnedPosts.length === 0 ? (
                    <div className="text-center py-12">
                      <Pin className="h-12 w-12 mx-auto text-white/30 mb-3" />
                      <p className="text-white/70">No pinned posts yet</p>
                    </div>
                  ) : (
                    <SpacePostFeed
                      posts={pinnedPosts}
                      canPost={false}
                      showComposer={false}
                      onAction={onAction}
                    />
                  )}
                </div>
              )}

              {/* Tools View */}
              {activeView === 'tools' && (
                <div className="p-6">
                  <div className="mb-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveView('stream')}
                      className="mb-4"
                    >
                      ← Back to stream
                    </Button>
                    <h2 className="text-2xl font-bold text-white">Space Tools</h2>
                    <p className="text-sm text-white/70 mt-1">
                      Custom tools built for this community
                    </p>
                  </div>

                  {tools.length === 0 ? (
                    <div className="text-center py-12">
                      <Wrench className="h-12 w-12 mx-auto text-white/30 mb-3" />
                      <p className="text-white/70 mb-4">No tools yet</p>
                      {isLeader && (
                        <Button variant="outline" size="sm">
                          Create Tool in HiveLab
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {tools.map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => setSelectedToolId(tool.id)}
                          className="p-6 rounded-lg border border-white/8 bg-[#0c0c0c] hover:border-white/20 transition-all duration-200 text-left"
                        >
                          <div className="text-3xl mb-3">{tool.icon}</div>
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-white/70 mb-3">
                            {tool.description}
                          </p>
                          <div className="text-xs text-white/50">
                            {tool.usageCount} uses
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Events View */}
              {activeView === 'events' && (
                <div className="p-6">
                  <div className="mb-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveView('stream')}
                      className="mb-4"
                    >
                      ← Back to stream
                    </Button>
                  </div>

                  <EventsCalendar
                    events={events}
                    onEventClick={(eventId) => {
                      setSelectedEventId(eventId)
                      onAction?.({ type: 'event.click', eventId })
                    }}
                    onRsvp={(eventId, status) => {
                      onAction?.({ type: 'event.rsvp', eventId, attending: status === 'going' })
                    }}
                  />
                </div>
              )}

              {/* Files View */}
              {activeView === 'files' && (
                <div className="p-6">
                  <div className="mb-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveView('stream')}
                      className="mb-4"
                    >
                      ← Back to stream
                    </Button>
                    <h2 className="text-2xl font-bold text-white">Files & Resources</h2>
                  </div>

                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto text-white/30 mb-3" />
                    <p className="text-white/70">File browser coming soon</p>
                  </div>
                </div>
              )}

              {/* Members View */}
              {activeView === 'members' && (
                <div className="p-6">
                  <div className="mb-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveView('stream')}
                      className="mb-4"
                    >
                      ← Back to stream
                    </Button>
                    <h2 className="text-2xl font-bold text-white">Members</h2>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {members.map((member) => (
                      <div
                        key={member.userId}
                        className="p-4 rounded-lg border border-white/8 bg-[#0c0c0c] hover:border-white/20 transition-all duration-200"
                      >
                        <div className="relative w-16 h-16 mx-auto mb-3">
                          <Avatar className="w-16 h-16">
                            <AvatarFallback className="bg-[#FFD700]/10 text-[#FFD700]">
                              {member.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {member.isOnline && (
                            <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-[#0c0c0c] bg-green-500" />
                          )}
                        </div>
                        <p className="text-sm font-medium text-white text-center">
                          {member.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>

          {/* RIGHT: Ambient Context Sidebar (30%) */}
          <div className="w-[30%] border-l border-white/8 bg-[#0c0c0c] flex flex-col">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {/* Online Now */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Online Now ({onlineCount})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {onlineMembers.map((member) => (
                      <div
                        key={member.userId}
                        className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                      >
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-[#FFD700]/10 text-[#FFD700] text-xs">
                            {member.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-white/80">{member.name.split(" ")[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                {isLeader && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                        <Users className="h-3 w-3 mr-2" />
                        Invite Member
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                        <CalendarIcon className="h-3 w-3 mr-2" />
                        Create Event
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                        <Pin className="h-3 w-3 mr-2" />
                        Pin Post
                      </Button>
                    </div>
                  </div>
                )}

                {/* Space Stats */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Space Stats</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-white/70">
                      <span>Posts this week</span>
                      <span className="text-white font-medium">{stats.activeToday}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Upcoming events</span>
                      <span className="text-white font-medium">{events.length}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Active tools</span>
                      <span className="text-white font-medium">{tools.length}</span>
                    </div>
                  </div>
                </div>

                {/* Leaders */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Leaders</h3>
                  <div className="space-y-2">
                    {space.creator && (
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-[#FFD700]/10 text-[#FFD700] text-xs">
                            {space.creator.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {space.creator.name}
                          </p>
                          <p className="text-xs text-white/50">Founder</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    )
  }
)

SpaceLayoutAdaptive.displayName = "SpaceLayoutAdaptive"

export { SpaceLayoutAdaptive }
