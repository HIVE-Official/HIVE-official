// Bounded Context Owner: Design System Guild
/**
 * AvatarCard - Portrait-mode user card
 *
 * A consistent, reusable card for displaying user/member information
 * across the platform. Works in lists, grids, and standalone contexts.
 *
 * Design:
 * - Portrait orientation (vertical layout)
 * - Avatar at top
 * - Name, handle, and metadata below
 * - Optional role badge
 * - Interactive hover states
 * - Supports click/tap actions
 *
 * Usage:
 * - Member lists and rosters
 * - User search results
 * - Connection suggestions
 * - Moderation queues
 * - Any user profile preview
 */

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../atoms/avatar";
import { Badge } from "../atoms/badge";
import { Button } from "../atoms/button";
import { Card } from "../atoms/card";
import { cn } from "../utils/cn";
import { Crown, Shield, User } from "lucide-react";

export interface AvatarCardProps {
  /** User ID */
  id: string;

  /** Display name */
  name: string;

  /** Handle (username) */
  handle: string;

  /** Avatar URL */
  avatarUrl?: string;

  /** User role */
  role?: "leader" | "moderator" | "member" | "follower";

  /** Additional metadata (e.g., "Joined 2 months ago", "89 posts") */
  metadata?: string;

  /** Show role badge */
  showRoleBadge?: boolean;

  /** Card click handler */
  onClick?: () => void;

  /** Optional action button */
  action?: {
    label: string;
    onClick: (e: React.MouseEvent) => void;
    variant?: "default" | "outline" | "ghost";
    disabled?: boolean;
  };

  /** Card variant */
  variant?: "default" | "compact" | "detailed" | "portrait";

  /** Custom className */
  className?: string;
}

const ROLE_CONFIG: Record<
  NonNullable<AvatarCardProps["role"]>,
  {
    label: string;
    icon: typeof Crown;
    variant: "gold" | "neutral" | "muted" | "warning" | "outline";
  }
> = {
  leader: {
    label: "Leader",
    icon: Crown,
    variant: "gold",
  },
  moderator: {
    label: "Mod",
    icon: Shield,
    variant: "warning",
  },
  member: {
    label: "Member",
    icon: User,
    variant: "neutral",
  },
  follower: {
    label: "Follower",
    icon: User,
    variant: "muted",
  },
};

export const AvatarCard = React.forwardRef<HTMLDivElement, AvatarCardProps>(
  (
    {
      id: _id,
      name,
      handle,
      avatarUrl,
      role,
      metadata,
      showRoleBadge = true,
      onClick,
      action,
      variant = "portrait",
      className,
    },
    ref
  ) => {
    const roleConfig = role ? ROLE_CONFIG[role] : null;
    const RoleIcon = roleConfig?.icon;

    const isCompact = variant === "compact";
    const isDetailed = variant === "detailed";

    if (variant === "portrait") {
      const content = (
        <div className={cn("relative w-full overflow-hidden rounded-xl border border-input bg-muted/20", onClick && "cursor-pointer group")}> 
          {/* Ratio box (3:4) */}
          <div className="relative w-full pb-[133%]">
            {/* Image layer */}
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-transform duration-300",
                  onClick && "group-hover:scale-[1.03]"
                )}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                <span className="text-h1 font-h1 text-primary/60">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            {/* Overlay gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

            {/* Top overlays */}
            {showRoleBadge && roleConfig && (
              <div className="absolute left-2 top-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-input bg-background/70 px-2 py-0.5 text-xs font-medium text-foreground backdrop-blur-sm">
                  {RoleIcon && <RoleIcon className="h-3 w-3" />}
                  {roleConfig.label}
                </span>
              </div>
            )}
            {action && (
              <div className="absolute right-2 top-2">
                <Button
                  variant={action.variant || "outline"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick(e);
                  }}
                  disabled={action.disabled}
                >
                  {action.label}
                </Button>
              </div>
            )}

            {/* Bottom text */}
            <div className="absolute inset-x-0 bottom-0 p-3">
              <div className="rounded-lg bg-background/60 p-2 backdrop-blur-sm">
                <p className="text-body font-semibold text-foreground truncate">{name}</p>
                <p className="text-caption text-muted-foreground truncate">@{handle}</p>
                {metadata ? (
                  <p className="text-caption text-muted-foreground mt-1 line-clamp-2">{metadata}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      );

      if (onClick) {
        return (
          <div ref={ref} onClick={onClick} className="transition-transform duration-200 active:scale-[0.98]">
            {content}
          </div>
        );
      }
      return (
        <div ref={ref}>{content}</div>
      );
    }

    const content = (
      <>
        {/* Avatar */}
        <div className="flex justify-center">
          <Avatar
            size={isCompact ? "sm" : isDetailed ? "lg" : "md"}
            className={cn(
              "transition-all duration-300",
              onClick && "group-hover:scale-110 group-hover:ring-2 group-hover:ring-primary/20"
            )}
          >
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={name} className="object-cover" />
            ) : (
              <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
            )}
          </Avatar>
        </div>

        {/* Info */}
        <div
          className={cn("text-center space-y-1", isCompact && "space-y-0.5")}
        >
          {/* Name */}
          <h3
            className={cn(
              "font-semibold truncate transition-colors duration-200",
              isCompact ? "text-body-sm" : "text-body",
              onClick && "group-hover:text-primary"
            )}
          >
            {name}
          </h3>

          {/* Handle */}
          <p
            className={cn(
              "text-muted-foreground truncate",
              isCompact ? "text-caption" : "text-body-sm"
            )}
          >
            @{handle}
          </p>

          {/* Role badge */}
          {showRoleBadge && roleConfig && (
            <div className="flex justify-center pt-1">
              <Badge
                variant={roleConfig.variant}
                className={cn(
                  "gap-1",
                  isCompact ? "text-xs px-2 py-0.5" : "text-xs"
                )}
              >
                {RoleIcon && <RoleIcon className="h-3 w-3" />}
                {roleConfig.label}
              </Badge>
            </div>
          )}

          {/* Metadata */}
          {metadata && (
            <p
              className={cn(
                "text-caption text-muted-foreground pt-1",
                isCompact && "text-xs"
              )}
            >
              {metadata}
            </p>
          )}
        </div>

        {/* Action button */}
        {action && (
          <Button
            variant={action.variant || "outline"}
            size={isCompact ? "sm" : "default"}
            onClick={(e) => {
              e.stopPropagation();
              action.onClick(e);
            }}
            disabled={action.disabled}
            className="w-full transition-all duration-200 active:scale-95"
          >
            {action.label}
          </Button>
        )}
      </>
    );

    if (onClick) {
      const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      };

      return (
        <Card
          ref={ref}
          role="button"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className={cn(
            "bg-card border-border cursor-pointer",
            "transition-all duration-300 ease-out group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "hover:bg-muted/30 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5",
            "active:scale-[0.99]",
            isCompact ? "p-3" : isDetailed ? "p-6" : "p-4",
            className
          )}
          onClick={onClick}
        >
          <div className={cn("space-y-3", isCompact && "space-y-2")}>
            {content}
          </div>
        </Card>
      );
    }

    return (
      <Card
        ref={ref}
        className={cn(
          "bg-card border-border",
          isCompact ? "p-3" : isDetailed ? "p-6" : "p-4",
          className
        )}
      >
        <div className={cn("space-y-3", isCompact && "space-y-2")}>
          {content}
        </div>
      </Card>
    );
  }
);

AvatarCard.displayName = "AvatarCard";



