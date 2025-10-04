"use client"

import * as React from "react"
import { UserCard } from "../molecules/user-card"
import { Input } from "../atoms/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../atoms/select"
import { Badge } from "../atoms/badge"
import { cn } from "../../lib/utils"

export interface SpaceMember {
  userId: string
  name: string
  handle: string
  avatar?: string
  bio?: string
  role: "member" | "moderator" | "leader" | "founder"
  joinedAt: Date
  contribution?: {
    posts: number
    comments: number
    events: number
  }
  isOnline?: boolean
}

export interface SpaceMemberListProps extends React.HTMLAttributes<HTMLDivElement> {
  members: SpaceMember[]
  currentUserId?: string
  isSpaceLeader?: boolean
  onMemberClick?: (member: SpaceMember) => void
  onMemberAction?: (member: SpaceMember, action: "promote" | "remove" | "message") => void
  showSearch?: boolean
  showFilters?: boolean
  emptyStateMessage?: string
}

const SpaceMemberList = React.forwardRef<HTMLDivElement, SpaceMemberListProps>(
  (
    {
      className,
      members,
      currentUserId,
      isSpaceLeader = false,
      onMemberClick,
      onMemberAction,
      showSearch = true,
      showFilters = true,
      emptyStateMessage = "No members found",
      ...props
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [roleFilter, setRoleFilter] = React.useState<string>("all")
    const [sortBy, setSortBy] = React.useState<string>("recent")

    // Filter and sort members
    const filteredMembers = React.useMemo(() => {
      let filtered = members

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filtered = filtered.filter(
          (m) =>
            m.name.toLowerCase().includes(query) ||
            m.handle.toLowerCase().includes(query)
        )
      }

      // Role filter
      if (roleFilter !== "all") {
        filtered = filtered.filter((m) => m.role === roleFilter)
      }

      // Sort
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case "recent":
            return b.joinedAt.getTime() - a.joinedAt.getTime()
          case "oldest":
            return a.joinedAt.getTime() - b.joinedAt.getTime()
          case "name":
            return a.name.localeCompare(b.name)
          case "active":
            const aTotal = (a.contribution?.posts || 0) + (a.contribution?.comments || 0)
            const bTotal = (b.contribution?.posts || 0) + (b.contribution?.comments || 0)
            return bTotal - aTotal
          default:
            return 0
        }
      })

      return filtered
    }, [members, searchQuery, roleFilter, sortBy])

    // Role badge styling
    const getRoleBadge = (role: SpaceMember["role"]) => {
      switch (role) {
        case "founder":
          return { label: "Founder", variant: "default" as const }
        case "leader":
          return { label: "Leader", variant: "default" as const }
        case "moderator":
          return { label: "Moderator", variant: "secondary" as const }
        default:
          return null
      }
    }

    // Action button for each member
    const getMemberAction = (member: SpaceMember) => {
      if (member.userId === currentUserId) {
        return null
      }

      if (isSpaceLeader && member.role === "member") {
        return {
          label: "Manage",
          variant: "outline" as const,
          onClick: () => onMemberAction?.(member, "promote"),
        }
      }

      return {
        label: "Message",
        variant: "ghost" as const,
        onClick: () => onMemberAction?.(member, "message"),
      }
    }

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {/* Filters & Search */}
        {(showSearch || showFilters) && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            {showSearch && (
              <div className="relative flex-1 max-w-sm">
                <svg
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70"
                  fill="none"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            )}

            {/* Filters */}
            {showFilters && (
              <div className="flex gap-2">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="founder">Founders</SelectItem>
                    <SelectItem value="leader">Leaders</SelectItem>
                    <SelectItem value="moderator">Moderators</SelectItem>
                    <SelectItem value="member">Members</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="active">Most Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}

        {/* Member Count */}
        <div className="flex items-center gap-2 text-sm text-white/70">
          <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
          <span>
            {filteredMembers.length} {filteredMembers.length === 1 ? "member" : "members"}
            {searchQuery || roleFilter !== "all" ? ` (filtered from ${members.length})` : ""}
          </span>
        </div>

        {/* Member Grid */}
        {filteredMembers.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member) => {
              const roleBadge = getRoleBadge(member.role)
              const action = getMemberAction(member)

              return (
                <div
                  key={member.userId}
                  onClick={() => onMemberClick?.(member)}
                  className={onMemberClick ? "cursor-pointer" : undefined}
                >
                  <UserCard
                    name={member.name}
                    handle={member.handle}
                    avatar={member.avatar}
                    bio={member.bio}
                    badge={roleBadge?.label}
                    badgeVariant={roleBadge?.variant}
                    actionLabel={action?.label}
                    onAction={action?.onClick}
                    actionVariant={action?.variant}
                    isOnline={member.isOnline}
                  />
                </div>
              )
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/8 bg-white/5 py-12 px-4">
            <svg
              className="h-12 w-12 text-white/30"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
            <p className="mt-4 text-sm font-medium text-white">{emptyStateMessage}</p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("")
                  setRoleFilter("all")
                }}
                className="mt-2 text-sm text-[#FFD700] transition-smooth ease-liquid hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    )
  }
)

SpaceMemberList.displayName = "SpaceMemberList"

export { SpaceMemberList }
