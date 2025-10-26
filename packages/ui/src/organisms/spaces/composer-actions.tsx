// Bounded Context Owner: Spaces Domain Guild
/**
 * ComposerActions - Action row for creating different post types
 *
 * Shows available post type buttons based on user role and space policies.
 * Respects posting policies:
 * - leaders_only: Only leaders/mods see composer
 * - members: All members see composer
 * - request: Members see after approval
 *
 * Post types (icon buttons):
 * - Text Post (default)
 * - Event (calendar icon)
 * - Poll (bar chart icon)
 * - Form/Signup (clipboard icon)
 * - Announcement (megaphone icon - leaders only)
 */

import React from "react";
import { Button } from "../../atoms/button";
import { Avatar } from "../../atoms/avatar";
import { Badge } from "../../atoms/badge";
import { Card } from "../../atoms/card";
import { cn } from "../../utils/cn";
import type { PostingPolicy, MemberRole } from "./types";
import {
  MessageSquare,
  Calendar,
  BarChart3,
  ClipboardList,
  Megaphone,
  // Image,
  // Link as LinkIcon,
} from "lucide-react";

export interface ComposerActionsProps {
  /** User's avatar URL */
  userAvatar?: string;

  /** User's display name */
  userName: string;

  /** User's role in space */
  userRole: MemberRole;

  /** Space posting policy */
  postingPolicy: PostingPolicy;

  /** Whether space allows events */
  allowEvents?: boolean;

  /** Whether space allows polls */
  allowPolls?: boolean;

  /** Whether space allows forms/signups */
  allowForms?: boolean;

  /** Click handler for creating text post */
  onCreatePost?: () => void;

  /** Click handler for creating event */
  onCreateEvent?: () => void;

  /** Click handler for creating poll */
  onCreatePoll?: () => void;

  /** Click handler for creating form/signup */
  onCreateForm?: () => void;

  /** Click handler for creating announcement (leaders only) */
  onCreateAnnouncement?: () => void;

  /** Loading state */
  isLoading?: boolean;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Determine if user can post based on role and policy
 */
function canUserPost(
  userRole: MemberRole,
  postingPolicy: PostingPolicy
): boolean {
  if (postingPolicy === "leaders_only") {
    return userRole === "leader" || userRole === "moderator";
  }
  // members and request both allow posting (request assumes user is approved)
  return userRole !== "follower";
}

export const ComposerActions = React.forwardRef<
  HTMLDivElement,
  ComposerActionsProps
>(
  (
    {
      userAvatar,
      userName,
      userRole,
      postingPolicy,
      allowEvents = true,
      allowPolls = true,
      allowForms = true,
      onCreatePost,
      onCreateEvent,
      onCreatePoll,
      onCreateForm,
      onCreateAnnouncement,
      isLoading = false,
      className,
    },
    ref
  ) => {
    const canPost = canUserPost(userRole, postingPolicy);
    const isLeader = userRole === "leader" || userRole === "moderator";

    // If user can't post, show a disabled state
    if (!canPost) {
      return (
        <Card ref={ref} className={cn("bg-card border-border p-4", className)}>
          <div className="flex items-center gap-3 opacity-60">
            <Avatar
              src={userAvatar}
              alt={userName}
              fallback={userName[0]?.toUpperCase()}
              className="h-10 w-10"
            />
            <p className="text-body-sm font-body-sm text-muted-foreground">
              Only leaders and moderators can post in this space.
            </p>
          </div>
        </Card>
      );
    }

    return (
      <Card ref={ref} className={cn("bg-card border-border p-4", className)}>
        <div className="space-y-3">
          {/* Top row: Avatar + text input trigger */}
          <button
            onClick={onCreatePost}
            disabled={isLoading}
            className={cn(
              "flex items-center gap-3 w-full text-left group",
              "transition-all duration-200",
              "active:scale-[0.99]"
            )}
          >
            <Avatar
              src={userAvatar}
              alt={userName}
              fallback={userName[0]?.toUpperCase()}
              className="h-10 w-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
            />
            <div
              className={cn(
                "flex-1 h-10 px-4 rounded-lg border border-border bg-muted/30",
                "flex items-center",
                "transition-all duration-300 ease-out",
                "group-hover:bg-muted/50 group-hover:border-primary/50",
                "group-hover:shadow-md"
              )}
            >
              <span className="text-body-sm font-body-sm text-muted-foreground group-hover:text-foreground transition-all duration-200">
                What's happening in your space?
              </span>
            </div>
          </button>

          {/* Bottom row: Post type quick actions */}
          <div className="flex items-center justify-between gap-2 pl-[52px]">
            {/* Left: Quick actions */}
            <div className="flex items-center gap-1">
              {/* Text post (default) */}
              <Button
                onClick={onCreatePost}
                variant="ghost"
                size="sm"
                disabled={isLoading}
                className={cn(
                  "gap-2 text-muted-foreground hover:text-foreground hover:bg-primary/10",
                  "transition-all duration-200 active:scale-95"
                )}
                title="Create text post"
              >
                <MessageSquare className="h-4 w-4 transition-transform hover:rotate-12" />
                <span className="sr-only md:not-sr-only md:inline">Post</span>
              </Button>

              {/* Event */}
              {allowEvents && (
                <Button
                  onClick={onCreateEvent}
                  variant="ghost"
                  size="sm"
                  disabled={isLoading}
                  className={cn(
                    "gap-2 text-muted-foreground hover:text-foreground hover:bg-primary/10",
                    "transition-all duration-200 active:scale-95"
                  )}
                  title="Create event"
                >
                  <Calendar className="h-4 w-4 transition-transform hover:scale-110" />
                  <span className="sr-only md:not-sr-only md:inline">
                    Event
                  </span>
                </Button>
              )}

              {/* Poll */}
              {allowPolls && (
                <Button
                  onClick={onCreatePoll}
                  variant="ghost"
                  size="sm"
                  disabled={isLoading}
                  className={cn(
                    "gap-2 text-muted-foreground hover:text-foreground hover:bg-primary/10",
                    "transition-all duration-200 active:scale-95"
                  )}
                  title="Create poll"
                >
                  <BarChart3 className="h-4 w-4 transition-transform hover:scale-110" />
                  <span className="sr-only md:not-sr-only md:inline">Poll</span>
                </Button>
              )}

              {/* Form/Signup */}
              {allowForms && (
                <Button
                  onClick={onCreateForm}
                  variant="ghost"
                  size="sm"
                  disabled={isLoading}
                  className={cn(
                    "gap-2 text-muted-foreground hover:text-foreground hover:bg-primary/10",
                    "transition-all duration-200 active:scale-95"
                  )}
                  title="Create form or signup"
                >
                  <ClipboardList className="h-4 w-4 transition-transform hover:scale-110" />
                  <span className="sr-only md:not-sr-only md:inline">Form</span>
                </Button>
              )}
            </div>

            {/* Right: Leader-only actions */}
            {isLeader && (
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="text-xs">
                  Leader
                </Badge>
                <Button
                  onClick={onCreateAnnouncement}
                  variant="ghost"
                  size="sm"
                  disabled={isLoading}
                  className="gap-2 text-muted-foreground hover:text-primary"
                  title="Create announcement"
                >
                  <Megaphone className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only md:inline">
                    Announce
                  </span>
                </Button>
              </div>
            )}
          </div>

          {/* Policy indicator (if leaders_only) */}
          {postingPolicy === "leaders_only" && isLeader && (
            <div className="pl-[52px] pt-2 border-t border-border/30">
              <p className="text-caption font-caption text-muted-foreground">
                Only leaders and moderators can post in this space.
              </p>
            </div>
          )}
        </div>
      </Card>
    );
  }
);

ComposerActions.displayName = "ComposerActions";
