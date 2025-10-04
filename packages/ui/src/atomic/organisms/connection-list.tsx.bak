"use client"

import * as React from "react"
import { UserCard } from "../molecules/user-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../atoms/tabs"
import { Button } from "../atoms/button"
import { Badge } from "../atoms/badge"
import { cn } from "../../lib/utils"

export interface Connection {
  id: string
  name: string
  handle: string
  avatarUrl?: string
  bio?: string
  major?: string
  academicYear?: string
  verified?: boolean
  mutualConnections?: number
  isFollowing?: boolean
}

export interface ConnectionListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of connections */
  connections: Connection[]
  /** List type */
  variant?: "following" | "followers" | "both"
  /** Following list (only if variant is "both") */
  following?: Connection[]
  /** Show actions (Follow/Unfollow buttons) */
  showActions?: boolean
  /** Callback when follow/unfollow is clicked */
  onToggleFollow?: (connectionId: string, isFollowing: boolean) => void
  /** Callback when connection is clicked */
  onConnectionClick?: (connectionId: string) => void
}

const ConnectionList = React.forwardRef<HTMLDivElement, ConnectionListProps>(
  ({
    className,
    connections,
    variant = "following",
    following = [],
    showActions = true,
    onToggleFollow,
    onConnectionClick,
    ...props
  }, ref) => {
    if (variant === "both") {
      return (
        <div ref={ref} className={cn("w-full", className)} {...props}>
          <Tabs defaultValue="followers" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="followers">
                Followers
                <span className="ml-2 text-xs text-muted-foreground">
                  {connections.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="following">
                Following
                <span className="ml-2 text-xs text-muted-foreground">
                  {following.length}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="followers" className="mt-6">
              {connections.length === 0 ? (
                <EmptyState text="No followers yet" />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {connections.map((connection) => (
                    <ConnectionCard
                      key={connection.id}
                      connection={connection}
                      showActions={showActions}
                      onToggleFollow={onToggleFollow}
                      onConnectionClick={onConnectionClick}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="following" className="mt-6">
              {following.length === 0 ? (
                <EmptyState text="Not following anyone yet" />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {following.map((connection) => (
                    <ConnectionCard
                      key={connection.id}
                      connection={connection}
                      showActions={showActions}
                      onToggleFollow={onToggleFollow}
                      onConnectionClick={onConnectionClick}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {connections.length === 0 ? (
          <EmptyState
            text={
              variant === "following"
                ? "Not following anyone yet"
                : "No followers yet"
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {connections.map((connection) => (
              <ConnectionCard
                key={connection.id}
                connection={connection}
                showActions={showActions}
                onToggleFollow={onToggleFollow}
                onConnectionClick={onConnectionClick}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)

ConnectionList.displayName = "ConnectionList"

// Internal component for individual connection card
interface ConnectionCardProps {
  connection: Connection
  showActions?: boolean
  onToggleFollow?: (connectionId: string, isFollowing: boolean) => void
  onConnectionClick?: (connectionId: string) => void
}

function ConnectionCard({
  connection,
  showActions,
  onToggleFollow,
  onConnectionClick,
}: ConnectionCardProps) {
  const handleClick = () => {
    onConnectionClick?.(connection.id)
  }

  const handleToggleFollow = () => {
    onToggleFollow?.(connection.id, !connection.isFollowing)
  }

  // Format badge: major + year, or just verified status
  const badge = connection.major && connection.academicYear
    ? `${connection.major} • ${connection.academicYear}`
    : connection.verified
    ? "Verified"
    : undefined

  return (
    <div className="relative" onClick={handleClick}>
      <UserCard
        name={connection.name}
        handle={connection.handle}
        avatar={connection.avatarUrl}
        bio={connection.bio || (connection.mutualConnections ?
          `${connection.mutualConnections} mutual ${connection.mutualConnections === 1 ? 'connection' : 'connections'}`
          : undefined)}
        badge={badge}
        badgeVariant="secondary"
        actionLabel={showActions && onToggleFollow ? (connection.isFollowing ? "Following" : "Follow") : undefined}
        onAction={showActions && onToggleFollow ? handleToggleFollow : undefined}
        actionVariant={connection.isFollowing ? "outline" : "default"}
      />
    </div>
  )
}

// Empty state component
function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <svg
          className="h-8 w-8 text-muted-foreground"
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
      </div>
      <p className="text-sm font-medium text-foreground mb-1">{text}</p>
      <p className="text-xs text-muted-foreground">
        Connect with people to build your network
      </p>
    </div>
  )
}

export { ConnectionList }
