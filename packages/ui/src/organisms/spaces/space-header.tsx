// Bounded Context Owner: Spaces Domain Guild
/**
 * SpaceHeader - Identity bar for a space
 *
 * Displays space avatar, name, type, verification status, join state,
 * and secondary actions (share, report, overflow).
 *
 * Handles all join states:
 * - Public spaces: "Join" button
 * - Request-based: "Request to Join" → "Pending" states
 * - Invite-only: "Invite Only" (disabled unless user has invite)
 * - RSS unclaimed: "Claim this Space" CTA
 */

import React from "react";
import { Avatar } from "../../atoms/avatar";
import { Badge } from "../../atoms/badge";
import { Button } from "../../atoms/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../../molecules/dropdown-menu";
import { InlineNotice } from "../../molecules/inline-notice";
import { cn } from "../../utils/cn";
import type { Space, SpaceType } from "./types";
import {
  Check,
  UserPlus,
  Clock,
  Lock,
  Share2,
  Flag,
  MoreHorizontal,
  Rss,
  Shield,
} from "lucide-react";

/**
 * Space type display configuration
 */
const SPACE_TYPE_CONFIG: Record<
  SpaceType,
  {
    label: string;
    color: "default" | "secondary" | "outline" | "destructive";
  }
> = {
  student_org: { label: "Student Org", color: "default" },
  university_org: { label: "University Org", color: "secondary" },
  greek: { label: "Greek", color: "outline" },
  residential: { label: "Residential", color: "outline" },
};

/**
 * Join state for UI rendering
 */
type JoinState =
  | "not_member" // Can join
  | "pending" // Request pending
  | "member" // Already a member
  | "invite_required" // Invite-only, no invite
  | "unclaimed"; // RSS space, unclaimed

export interface SpaceHeaderProps {
  /** Space data */
  space: Space;

  /** User's current relationship to space */
  joinState: JoinState;

  /** Whether user is a leader/mod (shows additional actions) */
  isLeaderOrMod?: boolean;

  /** Join button click handler */
  onJoin?: () => void;

  /** Share to campus click handler */
  onShare?: () => void;

  /** Report space click handler */
  onReport?: () => void;

  /** Overflow menu click handler */
  onOverflowClick?: () => void;

  /** Claim space click handler (for RSS unclaimed) */
  onClaim?: () => void;

  /** Loading state for join action */
  isJoining?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Optional compact visual (e.g., when sticky) */
  compact?: boolean;

  /** Optional policy info to display as a ribbon */
  policy?: {
    posting?: "open" | "leaders_only";
    media?: "approval_required" | "open";
  };
}

export const SpaceHeader = React.forwardRef<HTMLDivElement, SpaceHeaderProps>(
  (
    {
      space,
      joinState,
      isLeaderOrMod = false,
      onJoin,
      onShare,
      onReport,
      onOverflowClick: _onOverflowClick,
      onClaim,
      isJoining = false,
      className,
      compact = false,
      policy,
    },
    ref
  ) => {
    const typeConfig = SPACE_TYPE_CONFIG[space.type];
    const isUnclaimed =
      space.source === "rss_imported" && joinState === "unclaimed";

    // Join button configuration based on state
    const getJoinButton = () => {
      if (isUnclaimed) {
        return (
          <Button
            onClick={onClaim}
            variant="default"
            size="default"
            className="btn-prominent"
          >
            <Shield className="h-4 w-4 mr-2" />
            Claim this Space
          </Button>
        );
      }

      switch (joinState) {
        case "member":
          return (
            <Button variant="outline" size="default" disabled className="gap-2">
              <Check className="h-4 w-4" />
              Joined
            </Button>
          );

        case "pending":
          return (
            <Button variant="outline" size="default" disabled className="gap-2">
              <Clock className="h-4 w-4" />
              Request Pending
            </Button>
          );

        case "invite_required":
          return (
            <Button variant="outline" size="default" disabled className="gap-2">
              <Lock className="h-4 w-4" />
              Invite Only
            </Button>
          );

        case "not_member":
        default: {
          const label =
            space.joinPolicy === "request" ? "Request to Join" : "Join";
          return (
            <Button
              onClick={onJoin}
              variant="default"
              size="default"
              disabled={isJoining}
              className={cn("gap-2 btn-prominent")}
            >
              <UserPlus className="h-4 w-4" />
              {isJoining ? "Joining..." : label}
            </Button>
          );
        }
      }
    };

    // Derived policy flags
    const leadersOnly = policy?.posting === "leaders_only";
    const mediaApproval = policy?.media === "approval_required";

    return (
      <section aria-label="Space header" ref={ref} className={cn("bg-card rounded-lg border border-[hsl(var(--border)/0.65)]", className)}>
        <div
          className={cn(
            "p-4 md:p-5 lg:p-6",
            // Grid enforces consistent left/center/right alignment and trims stray gaps
            "grid grid-cols-[auto,1fr,auto] items-start md:items-center gap-4 md:gap-6"
          )}
          data-compact={compact || undefined}
        >
        {/* Left: Identity */}
        <div className="flex items-center md:items-start gap-3 md:gap-4 min-w-0">
          {/* Portrait tile avatar */}
          <div className="relative h-14 w-14 md:h-16 md:w-16 overflow-hidden rounded-xl border border-[hsl(var(--border)/0.65)] bg-[hsl(var(--secondary)/0.5)] flex-shrink-0">
            <Avatar src={space.avatarUrl} alt={space.name} fallback={space.name[0]?.toUpperCase()} className="h-full w-full object-cover" />
          </div>

          {/* Name, type, meta */}
          <div className="flex-1 min-w-0 space-y-1.5">
            {/* Name row */}
            <div className="flex items-center gap-2 flex-wrap">
              <h1
                className={cn(
                  "truncate text-foreground",
                  compact ? "text-h5 font-h5" : "text-h4 font-h4"
                )}
              >
                {space.name}
              </h1>
              {space.isVerified && (
                <div className="flex-shrink-0">
                  <Check
                    className="h-5 w-5 text-primary"
                    aria-label="Verified"
                  />
                </div>
              )}
            </div>

            {/* Type badge + meta chips */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="flex-shrink-0 text-muted-foreground">{typeConfig.label}</Badge>
              <Badge variant="outline" className="text-muted-foreground flex-shrink-0">
                {space.visibility === "public" ? "Public" : "Members Only"}
              </Badge>
              {/* show at most two chips; others fold into overflow menu */}
              {space.source === "rss_imported" && (
                <Badge variant="muted" className="gap-1 hidden md:inline-flex">
                  <Rss className="h-3 w-3" /> RSS
                </Badge>
              )}
            </div>

            {/* Member count */}
            <p className="text-body-sm font-body-sm text-muted-foreground leading-snug">
              {space.memberCount.toLocaleString()} member{space.memberCount !== 1 ? "s" : ""}
              {space.activeMembers7d > 0 && <span className="ml-2">• {space.activeMembers7d} active</span>}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="col-start-3 flex items-center justify-end gap-2">
          {/* Join button */}
          {getJoinButton()}
          {/* Overflow with Share/Report */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="More options">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {space.allowPublicPosts && joinState === "member" && !isUnclaimed ? (
                <DropdownMenuItem onClick={onShare}>
                  <Share2 className="h-4 w-4" /> <span>Share to campus</span>
                </DropdownMenuItem>
              ) : null}
              {!isLeaderOrMod ? (
                <>
                  {space.allowPublicPosts && joinState === "member" && !isUnclaimed ? <DropdownMenuSeparator /> : null}
                  <DropdownMenuItem onClick={onReport}>
                    <Flag className="h-4 w-4" /> <span>Report space</span>
                  </DropdownMenuItem>
                </>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Container end */}
        </div>

        {/* Policy ribbon (optional) */}
        {(leadersOnly || mediaApproval) && (
          <div className="mt-2 px-4 pb-4">
            <InlineNotice variant={leadersOnly ? "warning" : "info"} heading={leadersOnly ? "Leaders-only posting" : "Media approval required"}>
              {leadersOnly ? "Only leaders can post in this space." : "Uploads are reviewed by leaders before appearing."}
            </InlineNotice>
          </div>
        )}

        {/* Unclaimed notice (if applicable) */}
        {isUnclaimed && (
          <div className="px-4 pb-4">
            <InlineNotice variant="info" heading="Unclaimed space">
              This space was imported and is unclaimed. Claiming enables leader controls.
            </InlineNotice>
          </div>
        )}
      </section>
    );
  }
);

SpaceHeader.displayName = "SpaceHeader";
