// Bounded Context Owner: Spaces Domain Guild
/**
 * Dock — right-side context area for Spaces
 *
 * Contains:
 * - Calendar preview (upcoming events)
 * - Members preview (leaders + search)
 * - About section
 */

import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "../../atoms/card";
import { Button } from "../../atoms/button";
import { Badge } from "../../atoms/badge";
import { AvatarCard } from "../../molecules/avatar-card";
import { Input } from "../../atoms/input";
import { cn } from "../../utils/cn";
import {
  Calendar as CalendarIcon,
  Users,
  Info,
  Plus,
  Search,
  ExternalLink,
  Shield,
} from "lucide-react";
import { format } from "date-fns";
import type { CalendarEvent, SpaceMember, SpaceLink } from "./types";

/**
 * Calendar Preview Widget
 */
export interface CalendarPreviewProps {
  /** Upcoming events (max 5) */
  events: CalendarEvent[];

  /** Create event handler (leaders only) */
  onCreateEvent?: () => void;

  /** View all events handler */
  onViewAll?: () => void;

  /** Whether user can create events */
  canCreateEvents?: boolean;

  /** Additional CSS classes */
  className?: string;
}

export const CalendarPreview: React.FC<CalendarPreviewProps> = ({
  events,
  onCreateEvent,
  onViewAll,
  canCreateEvents = false,
  className,
}) => {
  const upcomingEvents = events.slice(0, 5);

  return (
    <Card className={cn("bg-card border-border", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-primary" />
          <CardTitle className="text-h4 font-h4">Upcoming Events</CardTitle>
        </div>
        {canCreateEvents && (
          <Button
            onClick={onCreateEvent}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Create event"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {upcomingEvents.length === 0 ? (
          <p className="text-body-sm font-body-sm text-muted-foreground text-center py-4">
            No upcoming events
          </p>
        ) : (
          <>
            {upcomingEvents.map((event) => (
              <button
                key={event.id}
                onClick={() => onViewAll?.()}
                className={cn(
                  "w-full text-left p-3 rounded-lg border border-border/30",
                  "transition-all duration-300 ease-out space-y-1 group",
                  "hover:bg-muted/30 hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5",
                  "active:scale-[0.98]"
                )}
              >
                <p className="text-body-sm font-semibold line-clamp-1 group-hover:text-primary transition-all duration-200">
                  {event.title}
                </p>
                <p className="text-caption font-caption text-muted-foreground">
                  {format(new Date(event.startTime), "EEE, MMM d • h:mm a")}
                </p>
                {event.goingCount > 0 && (
                  <div className="flex items-center gap-1 text-caption text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{event.goingCount} going</span>
                  </div>
                )}
              </button>
            ))}

            {events.length > 5 && (
              <Button
                onClick={onViewAll}
                variant="ghost"
                size="sm"
                className="w-full"
              >
                View all {events.length} events
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

/**
 * Members Preview Widget
 */
export interface MembersPreviewProps {
  /** Space members (leaders/mods first) */
  members: SpaceMember[];

  /** Total member count */
  totalCount: number;

  /** View all members handler */
  onViewAll?: () => void;

  /** Search handler */
  onSearch?: (query: string) => void;

  /** Additional CSS classes */
  className?: string;
}

export const MembersPreview: React.FC<MembersPreviewProps> = ({
  members,
  totalCount,
  onViewAll,
  onSearch,
  className,
}) => {
  // Show leaders/mods first, then recent members
  const displayMembers = members.slice(0, 8);

  return (
    <Card className={cn("bg-card border-border", className)}>
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle className="text-h4 font-h4">Members</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {totalCount.toLocaleString()}
          </Badge>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            className="pl-9"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      </CardHeader>

      <CardContent>
        {/* Members grid - portrait mode cards (compact for sidebar) */}
        <div className="grid grid-cols-2 gap-3">
          {displayMembers.map((member) => (
            <AvatarCard
              key={member.userId}
              id={member.userId}
              name={member.fullName}
              handle={member.handle}
              avatarUrl={member.avatarUrl}
              role={member.role}
              showRoleBadge={true}
              onClick={() => {
                /* View profile */
              }}
              variant="compact"
            />
          ))}
        </div>

        {totalCount > 8 && (
          <Button
            onClick={onViewAll}
            variant="ghost"
            size="sm"
            className="w-full mt-2"
          >
            View all members
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

/**
 * About Widget
 */
export interface AboutPreviewProps {
  /** Space description */
  description: string;

  /** Tags */
  tags: string[];

  /** Featured links */
  featuredLinks: SpaceLink[];

  /** Whether space is verified */
  isVerified: boolean;

  /** Space type label */
  spaceType: string;

  /** View full about handler */
  onViewMore?: () => void;

  /** Additional CSS classes */
  className?: string;
}

export const AboutPreview: React.FC<AboutPreviewProps> = ({
  description,
  tags,
  featuredLinks,
  isVerified,
  spaceType,
  onViewMore,
  className,
}) => {
  return (
    <Card className={cn("bg-card border-border", className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <CardTitle className="text-h4 font-h4">About</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-body-sm font-body-sm text-muted-foreground line-clamp-3">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 6).map((tag) => (
              <Badge key={tag} variant="muted" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 6 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 6}
              </Badge>
            )}
          </div>
        )}

        {/* Featured Links */}
        {featuredLinks.length > 0 && (
          <div className="space-y-2">
            <p className="text-caption text-muted-foreground font-semibold">
              Links
            </p>
            {featuredLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-body-sm font-body-sm text-primary hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Meta info */}
        <div className="pt-3 border-t border-border/30 space-y-1">
          <div className="flex items-center justify-between text-caption font-caption text-muted-foreground">
            <span>Type</span>
            <span className="font-medium">{spaceType}</span>
          </div>
          {isVerified && (
            <div className="flex items-center justify-between text-caption font-caption">
              <span className="text-muted-foreground">Status</span>
              <Badge variant="success" className="text-xs gap-1">
                <Shield className="h-3 w-3" />
                Verified
              </Badge>
            </div>
          )}
        </div>

        <Button
          onClick={onViewMore}
          variant="ghost"
          size="sm"
          className="w-full"
        >
          View full about
        </Button>
      </CardContent>
    </Card>
  );
};

/**
 * Complete Dock (legacy: Context Rail)
 */
export interface DockProps {
  /** Calendar preview props */
  calendar: CalendarPreviewProps;

  /** Members preview props */
  members: MembersPreviewProps;

  /** About preview props */
  about: AboutPreviewProps;

  /** Additional CSS classes */
  className?: string;
}

export const Dock: React.FC<DockProps> = ({
  calendar,
  members,
  about,
  className,
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      <CalendarPreview {...calendar} />
      <MembersPreview {...members} />
      <AboutPreview {...about} />
    </div>
  );
};
