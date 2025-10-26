/**
 * CommunityWidget - Consolidated Community Tool
 *
 * Combines "who's here" presence + member roster access
 * Click-through to full member roster via breadcrumb navigation
 */

import React from "react";
import { BaseWidget } from "./base-widget";
import { Avatar, AvatarImage, AvatarFallback } from "@/atoms/avatar";
import { Badge } from "@/atoms/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/atoms/tooltip";
import { Users, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";
import type { SpaceMember } from "../types";

export interface CommunityWidgetProps {
  /** Currently online members */
  onlineMembers: SpaceMember[];

  /** Recently active members (last 24h) */
  recentMembers?: SpaceMember[];

  /** Total member count */
  totalMembers: number;

  /** Click member to view profile */
  onMemberClick?: (userId: string) => void;

  /** Click header to view full roster */
  onViewRoster?: () => void;

  /** Loading state */
  loading?: boolean;

  /** Custom class */
  className?: string;
}

const CommunityWidget = React.forwardRef<HTMLDivElement, CommunityWidgetProps>(
  (
    {
      onlineMembers,
      recentMembers = [],
      totalMembers,
      onMemberClick,
      onViewRoster,
      loading,
      className,
    },
    ref
  ): JSX.Element => {
    const displayMembers = onlineMembers.slice(0, 8);
    const hasMore = onlineMembers.length > 8;

    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    return (
      <BaseWidget
        ref={ref}
        title="COMMUNITY"
        icon={<Users className="h-4 w-4" />}
        headerHint="Presence radar"
        accent="success"
        backgroundLabel="Community"
        loading={loading}
        action={{
          label: "Open",
          onClick: () => onViewRoster?.(),
        }}
        className={cn(className)}
        onClick={() => onViewRoster?.()}
      >
        <div className="space-y-4">
          {/* Online Count */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-success" />
              <span className="text-body-sm font-medium text-foreground">
                {onlineMembers.length} online now
              </span>
            </div>
            <span className="text-caption text-muted-foreground">
              {totalMembers} total
            </span>
          </div>

          {/* Online Members Grid */}
          {displayMembers.length > 0 ? (
            <div className="grid grid-cols-4 gap-3">
              <TooltipProvider>
                {displayMembers.map((member) => (
                  <Tooltip key={member.userId} delayDuration={200}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMemberClick?.(member.userId);
                        }}
                        className={cn(
                          "relative flex flex-col items-center gap-1.5 transition-transform",
                          "hover:-translate-y-0.5 hover:scale-105"
                        )}
                      >
                        <div className="relative">
                          <Avatar className="h-10 w-10 border-2 border-[hsl(var(--background)/0.6)] bg-[hsl(var(--background)/0.75)] shadow-[0_8px_16px_rgba(15,23,42,0.22)]">
                            {member.avatarUrl ? (
                              <AvatarImage
                                src={member.avatarUrl}
                                alt={member.fullName}
                              />
                            ) : null}
                            <AvatarFallback className="text-[10px] font-semibold bg-muted">
                              {getInitials(member.fullName)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-success rounded-full border-2 border-card" />
                        </div>
                        <span className="text-[10px] text-muted-foreground line-clamp-1 max-w-full text-center px-0.5">
                          {member.fullName.split(" ")[0]}
                        </span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-xs font-medium">{member.fullName}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {member.role === "leader" ? "Leader" : "Member"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>

              {hasMore && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewRoster?.();
                  }}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed border-[hsl(var(--success)/0.35)]",
                    "bg-[hsl(var(--background)/0.6)]/70 px-3 py-4 transition-all hover:-translate-y-0.5"
                  )}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--success)/0.35)] bg-[hsl(var(--success)/0.12)] text-caption font-semibold text-success">
                    <span>
                      +{onlineMembers.length - 8}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    more
                  </span>
                </button>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <Users className="h-10 w-10 mx-auto text-muted-foreground/40 mb-2" />
              <p className="text-body-sm text-muted-foreground">
                No members online
              </p>
            </div>
          )}

          {/* Recently Active */}
          {recentMembers.length > 0 && (
            <div className="pt-3 border-t border-border/50">
              <p className="text-caption text-muted-foreground mb-2">
                Recently active
              </p>
              <div className="flex flex-wrap gap-1.5">
                {recentMembers.slice(0, 6).map((member) => (
                  <Badge
                    key={member.userId}
                    variant="secondary"
                    className="cursor-pointer px-1.5 py-0.5 text-[10px] transition-colors hover:bg-[hsl(var(--success)/0.1)]"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMemberClick?.(member.userId);
                    }}
                  >
                    {member.fullName.split(" ")[0]}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Click affordance */}
          <div className="flex items-center justify-center pt-2 border-t border-border/50">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewRoster?.();
              }}
              className="text-caption text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group"
            >
              <span>View all {totalMembers} members</span>
              <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </BaseWidget>
    );
  }
);

CommunityWidget.displayName = "CommunityWidget";

export { CommunityWidget };




