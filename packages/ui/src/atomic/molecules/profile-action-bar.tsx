"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "../atoms/button"
import { ArrowLeft, Edit, MessageCircle, UserPlus, Share2, Settings, UserMinus } from "lucide-react"

export type ProfileRelationship = "own" | "connected" | "stranger"

export interface ProfileActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Relationship to the profile owner */
  relationship: ProfileRelationship

  /** User's name (for share text) */
  userName: string

  /** User's handle (for share URL) */
  userHandle: string

  /** Back button label */
  backLabel?: string

  /** Callbacks */
  onBack?: () => void
  onEdit?: () => void
  onMessage?: () => void
  onConnect?: () => void
  onDisconnect?: () => void
  onShare?: () => void
  onSettings?: () => void

  /** Loading states */
  isConnecting?: boolean
  isDisconnecting?: boolean
}

/**
 * Profile Action Bar
 *
 * Context-aware action bar that shows different buttons based on relationship:
 * - Own Profile: Back, Edit, Settings, Share
 * - Connected: Back, Message, Disconnect, Share
 * - Stranger: Back, Connect (primary), Share
 *
 * Design Pattern: Modal-first IA
 * - Actions trigger modals/sheets (not route changes)
 * - Back button preserves navigation context
 * - Primary action is visually prominent
 */
const ProfileActionBar = React.forwardRef<HTMLDivElement, ProfileActionBarProps>(
  ({
    className,
    relationship,
    userName,
    userHandle,
    backLabel = "Back",
    onBack,
    onEdit,
    onMessage,
    onConnect,
    onDisconnect,
    onShare,
    onSettings,
    isConnecting = false,
    isDisconnecting = false,
    ...props
  }, ref) => {
    // Default share handler if not provided
    const handleShare = React.useCallback(() => {
      if (onShare) {
        onShare()
      } else {
        // Fallback to Web Share API
        if (navigator.share) {
          navigator.share({
            title: `${userName} on HIVE`,
            text: `Check out ${userName}'s profile on HIVE`,
            url: `${window.location.origin}/profile/${userHandle}`,
          }).catch(() => {
            // User cancelled or share failed
          })
        } else {
          // Copy to clipboard fallback
          navigator.clipboard.writeText(`${window.location.origin}/profile/${userHandle}`)
        }
      }
    }, [onShare, userName, userHandle])

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between gap-3 p-4 bg-background/95 backdrop-blur-sm border-b",
          className
        )}
        {...props}
      >
        {/* Left: Back button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{backLabel}</span>
        </Button>

        {/* Right: Context-aware actions */}
        <div className="flex items-center gap-2">
          {relationship === "own" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="gap-2"
              >
                <Edit className="h-4 w-4" />
                <span className="hidden sm:inline">Edit</span>
              </Button>

              {onSettings && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSettings}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </>
          )}

          {relationship === "connected" && (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={onMessage}
                className="gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Message</span>
              </Button>

              {onDisconnect && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDisconnect}
                  disabled={isDisconnecting}
                  className="gap-2 text-destructive hover:text-destructive"
                >
                  <UserMinus className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {isDisconnecting ? "Disconnecting..." : "Disconnect"}
                  </span>
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </>
          )}

          {relationship === "stranger" && (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={onConnect}
                disabled={isConnecting}
                className="gap-2"
              >
                <UserPlus className="h-4 w-4" />
                <span>{isConnecting ? "Connecting..." : "Connect"}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    )
  }
)

ProfileActionBar.displayName = "ProfileActionBar"

export { ProfileActionBar }
