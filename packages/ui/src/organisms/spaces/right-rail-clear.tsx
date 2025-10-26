// Bounded Context Owner: Spaces Domain Guild
/**
 * RightRailClear — opinionated, minimal right-side Dock (legacy name kept for code stability)
 *
 * Goal: a clean, scannable side column (Dock) that complements chat/feed without
 * duplicating details. Prioritizes: Up Next, Topics, Official Links, People.
 */

import React from "react";
import { cn } from "@/utils/cn";
import { Badge } from "@/atoms/badge";
import { Button } from "@/atoms/button";
import { Separator } from "@/atoms/separator";
import { Link as LinkIcon, Calendar, ChevronRight } from "lucide-react";
import type { Space, CalendarEvent, SpaceMember } from "./types";
import { EventsWidget } from "./widgets/events-widget";
import { Avatar, AvatarImage, AvatarFallback } from "@/atoms/avatar";

export interface RightRailClearProps {
  space: Space;
  events: CalendarEvent[];
  onlineMembers: SpaceMember[];

  onOpenCalendar?: () => void;
  onEventClick?: (eventId: string) => void;
  onRsvp?: (eventId: string, status: "going" | "maybe") => void;
  onTopicClick?: (tag: string) => void;
  onViewRoster?: () => void;

  className?: string;
}

export const RightRailClear: React.FC<RightRailClearProps> = ({
  space,
  events,
  onlineMembers,
  onOpenCalendar,
  onEventClick,
  onRsvp,
  onTopicClick,
  onViewRoster,
  className,
}) => {
  const nextEvent = events[0];
  const tags = space.tags || [];
  const links = space.featuredLinks || [];
  const totalMembers = space.memberCount ?? onlineMembers.length;
  const showPeople = onlineMembers.length > 0;

  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Up Next (single) */}
      <section aria-label="Up next">
        {nextEvent ? (
          <EventsWidget
            upcomingEvents={[nextEvent]}
            userRsvps={{}}
            onEventClick={onEventClick}
            onViewAllEvents={onOpenCalendar}
            onRsvp={onRsvp}
            variant="poster"
          />
        ) : (
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <Calendar className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
            <p className="text-body-sm text-muted-foreground">No upcoming events</p>
            <div className="mt-3">
              <Button size="sm" variant="ghost" onClick={onOpenCalendar}>
                Open calendar
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Topics (tags) */}
      {tags.length > 0 && (
        <section aria-label="Topics" className="rounded-xl border border-border bg-card p-4">
          <header className="mb-2">
            <h3 className="text-caption font-semibold tracking-[0.18em] text-primary">TOPICS</h3>
          </header>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer text-[11px]"
                onClick={() => onTopicClick?.(tag)}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {/* Official Links */}
      {links.length > 0 && (
        <section aria-label="Official links" className="rounded-xl border border-border bg-card p-4">
          <header className="mb-2">
            <h3 className="text-caption font-semibold tracking-[0.18em] text-primary">OFFICIAL LINKS</h3>
          </header>
          <div className="space-y-2">
            {links.slice(0, 5).map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-border/50 px-2 py-1.5 text-body-sm hover:border-primary/40 hover:bg-muted/30"
              >
                <LinkIcon className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="truncate">{l.label}</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* People online */}
      {showPeople && (
        <section aria-label="People" className="rounded-xl border border-border bg-card p-4">
          <header className="mb-2 flex items-center justify-between">
            <h3 className="text-caption font-semibold tracking-[0.18em] text-primary">PEOPLE</h3>
            <span className="text-caption text-muted-foreground">{totalMembers} total</span>
          </header>
          <div className="grid grid-cols-6 gap-2">
            {onlineMembers.slice(0, 12).map((m) => (
              <div key={m.userId} className="flex flex-col items-center gap-1">
                <Avatar className="h-8 w-8">
                  {m.avatarUrl ? (
                    <AvatarImage src={m.avatarUrl} alt={m.fullName} />
                  ) : (
                    <AvatarFallback className="text-[10px]">{initials(m.fullName)}</AvatarFallback>
                  )}
                </Avatar>
                <span className="text-[10px] text-muted-foreground truncate w-full text-center">
                  {m.fullName.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
          {totalMembers > onlineMembers.length && (
            <div className="mt-2 flex items-center justify-center border-t border-border/50 pt-2">
              <button
                className="text-caption text-primary hover:text-primary/80 inline-flex items-center gap-1"
                onClick={onViewRoster}
              >
                View all members
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          )}
        </section>
      )}

      {/* Calendar affordance */}
      <div className="flex items-center justify-center">
        <Button variant="ghost" size="sm" onClick={onOpenCalendar} className="gap-1">
          <Calendar className="h-3.5 w-3.5" />
          Open full calendar
        </Button>
      </div>

      <Separator className="opacity-20" />
    </div>
  );
};
