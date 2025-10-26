"use client";
/**
 * SpaceDashboard – Clean dashboard layout for a Space
 *
 * Grid-first, no 60/40 split. Composes existing widgets (Events, Community,
 * Resources, Tools) with optional recent activity. Mobile becomes a single
 * column; desktop uses a 12‑column grid with sensible spans.
 */

import React from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/atoms/button";
import { Separator } from "@/atoms/separator";
import { EventsWidget } from "./widgets/events-widget";
import { CommunityWidget } from "./widgets/community-widget";
import { ResourcesWidget } from "./widgets/resources-widget";
import { ToolsWidget } from "./widgets/tools-widget";
import type { Space, CalendarEvent, SpaceMember } from "./types";
import type { DockProps } from "./dock";
import { Dock } from "./dock";
import type { Resource } from "./widgets/resources-widget";
import type { Tool } from "./widgets/tools-widget";

export interface SpaceDashboardProps {
  space: Space;

  /** Events + RSVP context */
  upcomingEvents: CalendarEvent[];
  userRsvps?: Record<string, "going" | "maybe">;

  /** Community */
  onlineMembers: SpaceMember[];
  recentMembers?: SpaceMember[];

  /** Resources & Tools */
  resources: Resource[];
  tools: Tool[];

  /** Callbacks */
  onJoinSpace?: () => void;
  onEventClick?: (eventId: string) => void;
  onViewAllEvents?: () => void;
  onRsvp?: (eventId: string, status: "going" | "maybe") => void;
  onMemberClick?: (userId: string) => void;
  onViewRoster?: () => void;
  onResourceClick?: (resourceId: string) => void;
  onViewAllResources?: () => void;
  onToolClick?: (toolId: string) => void;
  onViewAllTools?: () => void;

  /** Layout tuning */
  dense?: boolean; // tighter gaps
  className?: string;

  /** Optional right-side Dock (context) */
  rightRail?: React.ReactNode; // legacy prop name
  /** Preferred alias for right-side Dock content */
  dock?: React.ReactNode;
  /** If providing Dock via props rather than a React node */
  dockProps?: DockProps;
  /** @deprecated Use dockProps instead */
  railProps?: DockProps;
  /** Sticky offset for the Dock (px) */
  railStickyOffset?: number;
}

export const SpaceDashboard = React.forwardRef<HTMLDivElement, SpaceDashboardProps>(
  (
    {
      space,
      upcomingEvents,
      userRsvps,
      onlineMembers,
      recentMembers,
      resources,
      tools,
      onJoinSpace,
      onEventClick,
      onViewAllEvents,
      onRsvp,
      onMemberClick,
      onViewRoster,
      onResourceClick,
      onViewAllResources,
      onToolClick,
      onViewAllTools,
      dense = true,
      className,
      rightRail,
      dock,
      dockProps,
      railProps,
      railStickyOffset = 16,
    },
    ref
  ) => {
    const viewerRole = space.membership?.role ?? null;
    const isMember = Boolean(viewerRole);
    const canManage = viewerRole === "leader" || viewerRole === "moderator";
    // Determine if we should render the right-side Dock
    const dockConfig = dockProps ?? railProps;
    const hasDock = Boolean(dock ?? rightRail) || Boolean(dockConfig);

    return (
      <div ref={ref} className={cn("min-h-full bg-background", className)}>
        {/* Header */}
        <div className="border-b border-border/60 bg-background/95 supports-[backdrop-filter]:bg-background/75 backdrop-blur">
          <div className="mx-auto w-full max-w-[var(--shell-max-w)] px-[var(--shell-gutter)] py-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h1 className="text-heading-sm md:text-heading font-semibold text-foreground truncate">
                  {space.name}
                </h1>
                <p className="text-caption text-muted-foreground line-clamp-1">
                  Dashboard – snapshot of activity, people, and tools.
                </p>
              </div>
              {!isMember && onJoinSpace && (
                <Button size="sm" onClick={onJoinSpace}>Join Space</Button>
              )}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="mx-auto w-full max-w-[var(--shell-max-w)] px-[var(--shell-gutter)]">
          <div
            className={cn(
              hasDock
                ? "grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_320px] gap-6"
                : "",
              "py-5"
            )}
          >
            {/* Main content column */}
            <div className={cn(
              hasDock ? "min-w-0" : "",
            )}>
            <div className={cn(
              "grid grid-cols-1 md:grid-cols-12",
              dense ? "gap-4 md:gap-5" : "gap-6 md:gap-8",
            )}>
            {/* Spotlight / Next Event – spans 7 columns on desktop */}
            <section className="md:col-span-7">
              <EventsWidget
                upcomingEvents={upcomingEvents}
                userRsvps={userRsvps}
                onEventClick={onEventClick}
                onViewAllEvents={onViewAllEvents}
                onRsvp={onRsvp}
                variant="poster"
              />
            </section>

            {/* People – spans 5 columns */}
            <section className="md:col-span-5">
              <CommunityWidget
                onlineMembers={onlineMembers}
                recentMembers={recentMembers}
                totalMembers={space.memberCount}
                onMemberClick={onMemberClick}
                onViewRoster={onViewRoster}
              />
            </section>

            {/* Resources – spans 7 columns */}
            <section className="md:col-span-7">
              <ResourcesWidget
                resources={resources}
                onResourceClick={onResourceClick}
                onViewAll={onViewAllResources}
                canManage={canManage}
              />
            </section>

            {/* Tools – spans 5 columns */}
            <section className="md:col-span-5">
              <ToolsWidget
                tools={tools}
                canManage={canManage}
                onToolClick={onToolClick}
                onViewAllTools={onViewAllTools}
                variant="peek"
              />
            </section>

            {/* Optional: quick separator for future rows */}
            <div className="md:col-span-12"><Separator className="opacity-50" /></div>

            {/* Future row: Activity/Tasks/Announcements cards could sit here */}
            </div>
            </div>

            {/* Dock column (right-side) */}
            {hasDock && (
              <aside aria-label="Dock" className="hidden md:block min-w-0">
                <div className="sticky" style={{ top: railStickyOffset }}>
                  {(dock ?? rightRail) ?? (dockConfig && <Dock {...dockConfig} />)}
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    );
  }
);

SpaceDashboard.displayName = "SpaceDashboard";
