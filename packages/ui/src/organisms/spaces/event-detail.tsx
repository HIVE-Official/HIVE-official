// Bounded Context Owner: Spaces Domain Guild
/**
 * EventDetail - Full event detail view with RSVP and Check-in
 *
 * Shows complete event information including:
 * - Event title, description, time, location
 * - RSVP counts and user's status
 * - Check-in functionality (during event window)
 * - Co-hosts list
 * - Attendee list (going/maybe/not going)
 */

import React from "react";
import { brand } from "@/brand/classnames";
import { Button } from "@/atoms/button";
import { Badge } from "@/atoms/badge";
import { Card, CardContent, CardHeader } from "@/atoms/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/atoms/tooltip";
import { cn } from "@/utils/cn";
import { buildIcs } from "@/utils/ics";
import type { CalendarEvent, RSVPStatus } from "./types";
import {
  CalendarPlus,
  MapPin,
  Clock,
  Users,
  UsersRound,
  Check,
  X,
  HelpCircle,
  Share2,
  QrCode,
  AlertCircle,
  Sparkles,
  Edit,
  Trash2,
} from "lucide-react";
import {
  format,
  isPast,
  isWithinInterval,
  addMinutes,
  subMinutes,
} from "date-fns";

export interface EventFriendAttendee {
  id: string;
  name: string;
  avatarUrl?: string;
  handle?: string;
}

export interface EventDetailProps {
  /** Event data */
  event: CalendarEvent;

  /** User's current RSVP status */
  userRsvp?: RSVPStatus;

  /** Whether user has checked in */
  isCheckedIn?: boolean;

  /** Whether user is event host or co-host */
  isHost?: boolean;

  /** RSVP click handler */
  onRSVP?: (status: RSVPStatus) => void;

  /** Check-in click handler */
  onCheckIn?: () => void;

  /** Share event handler */
  onShare?: () => void;

  /** Copy link handler */
  onCopyLink?: () => void;

  /** Edit event handler (hosts only) */
  onEdit?: () => void;

  /** Delete event handler (hosts only) */
  onDelete?: () => void;

  /** Show QR code handler (hosts only) */
  onShowQR?: () => void;

  /** Add to calendar handler */
  onAddToCalendar?: () => void;

  /** Create Space handler (leaders/hosts) */
  onCreateSpace?: () => void;
  canCreateSpace?: boolean;

  /** Friends the current user knows that are attending */
  friendsGoing?: EventFriendAttendee[];

  /** Total friends going (if more than preview) */
  friendsGoingCount?: number;

  /** Loading state */
  isLoading?: boolean;

  /** Additional CSS classes */
  className?: string;
}

export const EventDetail = React.forwardRef<HTMLDivElement, EventDetailProps>(
  (
    {
      event,
      userRsvp,
      isCheckedIn = false,
      isHost = false,
      onRSVP,
      onCheckIn,
      onShare,
      onCopyLink,
      onEdit,
      onDelete,
      onShowQR,
      onAddToCalendar,
      onCreateSpace,
      friendsGoing = [],
      friendsGoingCount,
      isLoading = false,
      className,
    },
    ref
  ) => {
    const eventStart = new Date(event.startTime);
    const eventEnd = new Date(event.endTime);
    const isEventPast = isPast(eventEnd);

    // Check if check-in window is open
    const checkInWindowStart = event.checkInWindowBefore
      ? subMinutes(eventStart, event.checkInWindowBefore)
      : eventStart;
    const checkInWindowEnd = event.checkInWindowAfter
      ? addMinutes(eventStart, event.checkInWindowAfter)
      : eventEnd;
    const isCheckInOpen =
      event.checkInEnabled &&
      isWithinInterval(new Date(), {
        start: checkInWindowStart,
        end: checkInWindowEnd,
      });

    // Check if event is at capacity
    const isAtCapacity =
      typeof event.maxAttendees === "number" && event.maxAttendees > 0
        ? event.goingCount >= event.maxAttendees
        : false;
    const isOnWaitlist = userRsvp === "going" && isAtCapacity;

    const friendPreview = friendsGoing.slice(0, 4);
    const knownFriendsCount =
      friendsGoingCount ?? friendsGoing.length ?? 0;
    const extraFriends = Math.max(
      0,
      knownFriendsCount - friendPreview.length
    );
    const friendLabel = knownFriendsCount === 1 ? "friend" : "friends";
    const showActionRail =
      (!isEventPast && Boolean(onRSVP)) ||
      Boolean(onAddToCalendar) ||
      Boolean(onShare);

    return (
      <Card
        ref={ref}
        className={cn(
          brand.surface.bento(),
          "relative overflow-hidden border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.94)] backdrop-blur-sm",
          "shadow-[0_20px_40px_rgba(15,23,42,0.18)]",
          className
        )}
      >
        <CardHeader className="space-y-6 pb-8">
          <div className="relative overflow-hidden rounded-3xl border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.82)]">
            {event.coverImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- Storybook surface
              <img
                src={event.coverImageUrl}
                alt={
                  event.coverImageAlt ?? `${event.title} hero illustration`
                }
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary)/0.08)] via-[hsl(var(--background)/0.88)] to-[hsl(var(--primary)/0.16)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--background)/0.96)] via-[hsl(var(--background)/0.9)] to-[hsl(var(--primary)/0.12)] mix-blend-normal backdrop-blur-[2px]" />
            {!event.coverImageUrl && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
                <Sparkles className="h-16 w-16 sm:h-20 sm:w-20" aria-hidden="true" />
              </div>
            )}
            <div className="relative z-10 flex flex-col gap-6 p-5 sm:p-7">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-4">
                  <h1 className="max-w-3xl text-h3 font-h3 text-foreground drop-shadow-sm sm:text-h2 md:text-h1">
                    {event.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 text-foreground/85">
                    <div className="flex items-center gap-2 rounded-2xl border border-[hsl(var(--border)/0.4)] bg-[hsl(var(--background)/0.76)] px-3 py-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <div className="leading-tight">
                        <p className="font-semibold">
                          {format(eventStart, "EEEE, MMM d")}
                        </p>
                        <p className="text-caption text-muted-foreground/80">
                          {format(eventStart, "h:mm a")} –{" "}
                          {format(eventEnd, "h:mm a")}
                        </p>
                      </div>
                    </div>

                    {event.location ? (
                      <div className="flex items-center gap-2 rounded-2xl border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.78)] px-3 py-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-body-sm font-medium text-foreground/85">
                          {event.location}
                        </span>
                      </div>
                    ) : null}

                    <div className="flex items-center gap-2 rounded-2xl border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.78)] px-3 py-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-body-sm font-medium text-foreground/85">
                        {event.goingCount} going
                        {event.maybeCount > 0
                          ? ` · ${event.maybeCount} maybe`
                          : ""}
                      </span>
                    </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 self-end">
                {isHost && (
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={onEdit}
                        variant="ghost"
                        size="icon"
                        title="Edit event"
                        className="rounded-full border border-transparent text-muted-foreground hover:text-primary"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={onDelete}
                        variant="ghost"
                        size="icon"
                        title="Delete event"
                        className="rounded-full border border-transparent text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <Badge
                    variant="outline"
                    className="rounded-full border-[hsl(var(--primary)/0.35)] bg-[hsl(var(--primary)/0.12)] text-primary"
                  >
                    {event.maxAttendees
                      ? `${event.goingCount}/${event.maxAttendees} spots`
                      : `${event.goingCount} RSVPs`}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {(event.tags?.length || event.isRssImported) && (
            <div className="flex flex-wrap items-center gap-2 text-muted-foreground/70">
              {event.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="muted"
                  className="rounded-full border border-[hsl(var(--primary)/0.2)] bg-[hsl(var(--primary)/0.12)] text-primary"
                >
                  {tag}
                </Badge>
              ))}
              {event.isRssImported ? (
                <Badge
                  variant="outline"
                  className="rounded-full border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.1)] text-primary"
                >
                  Synced
                </Badge>
              ) : null}
            </div>
          )}

          {friendPreview.length > 0 && (
            <div data-experimental className="flex flex-wrap items-center gap-4 rounded-3xl border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.82)] p-4">
              <div className="flex">
                {friendPreview.map((friend, index) => (
                  <FriendPortrait
                    key={friend.id}
                    friend={friend}
                    index={index}
                  />
                ))}
                {extraFriends > 0 && (
                  <div
                    className={cn(
                      "relative h-12 w-9 overflow-hidden rounded-[14px] border border-dashed border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.75)] text-caption font-semibold text-muted-foreground",
                      friendPreview.length > 0 && "-ml-3"
                    )}
                  >
                    <span className="absolute inset-0 flex items-center justify-center">
                      +{extraFriends}
                    </span>
                  </div>
                )}
              </div>

              <div className="min-w-[12rem] flex-1">
                <p className="text-body font-semibold text-foreground">
                  You know {knownFriendsCount} {friendLabel} going
                </p>
                {friendPreview.length > 0 ? (
                  <p className="text-caption text-muted-foreground/80">
                    {friendPreview
                      .map((friend) => friend.name.split(" ")[0])
                      .slice(0, 3)
                      .join(", ")}
                    {extraFriends > 0 ? " and others" : ""} already RSVP’d.
                  </p>
                ) : null}
              </div>

              <Badge
                variant="muted"
                className="inline-flex items-center gap-1 rounded-full border border-[hsl(var(--border)/0.3)] bg-[hsl(var(--background)/0.7)] text-foreground/80"
              >
                <UsersRound className="h-3 w-3" />
                Friends RSVP
              </Badge>
            </div>
          )}

          {showActionRail && (
            <div data-experimental className="flex flex-wrap items-center gap-3 rounded-3xl border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.82)] p-4">
              {!isEventPast && onRSVP && (
                <div className="flex flex-1 flex-wrap gap-2">
                  <Button
                    onClick={() => onRSVP("going")}
                    variant={userRsvp === "going" ? "default" : "outline"}
                    size="sm"
                    disabled={
                      isLoading || (isAtCapacity && userRsvp !== "going")
                    }
                    className={cn(
                      "gap-2 px-4 py-2",
                      userRsvp === "going"
                        ? "bg-[hsl(var(--primary)/0.8)] text-primary-foreground"
                        : "border-[hsl(var(--border)/0.45)] text-primary"
                    )}
                  >
                    <Check className="h-4 w-4" />
                    {isOnWaitlist ? "Waitlisted" : "Going"}
                  </Button>

                  <Button
                    onClick={() => onRSVP("maybe")}
                    variant={userRsvp === "maybe" ? "secondary" : "outline"}
                    size="sm"
                    disabled={isLoading}
                    className={cn(
                      "gap-2 px-4 py-2",
                      userRsvp === "maybe"
                        ? "bg-[hsl(var(--primary)/0.18)] text-primary"
                        : "border-[hsl(var(--border)/0.4)] text-muted-foreground"
                    )}
                  >
                    <HelpCircle className="h-4 w-4" />
                    Maybe
                  </Button>

                  <Button
                    onClick={() => onRSVP("not_going")}
                    variant="ghost"
                    size="sm"
                    disabled={isLoading}
                    className="gap-2 px-4 py-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                    Can't go
                  </Button>
                </div>
              )}

              <div className="ml-auto flex items-center gap-2" aria-live="polite">
                {onAddToCalendar && (
                  <Button
                    onClick={onAddToCalendar}
                    variant="outline"
                    size="sm"
                    disabled={isLoading || isEventPast}
                    className="gap-2 border-[hsl(var(--border)/0.4)] text-primary"
                  >
                    <CalendarPlus className="h-4 w-4" />
                    Add to calendar
                  </Button>
                )}

                {/* ICS fallback */}
                <Button
                  onClick={() => {
                    const ics = buildIcs({
                      title: event.title,
                      description: event.description,
                      location: event.location,
                      start: new Date(event.startTime),
                      end: new Date(event.endTime),
                    });
                    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${event.title || 'event'}.ics`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                  }}
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-muted-foreground hover:text-foreground"
                  disabled={isEventPast}
                >
                  .ics
                </Button>

                {onCopyLink && (
                  <Button onClick={onCopyLink} variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                    Copy link
                  </Button>
                )}
                {onShare && (
                  <Button
                    onClick={onShare}
                    variant="ghost"
                    size="icon"
                    title="Share event"
                    className="rounded-full border border-transparent text-muted-foreground hover:text-primary"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {isAtCapacity && userRsvp !== "going" && !isEventPast && (
            <div className="flex items-center gap-3 rounded-3xl border border-[hsl(var(--destructive)/0.28)] bg-[hsl(var(--destructive)/0.12)] p-4 text-[hsl(var(--destructive)/0.95)]">
              <AlertCircle className="h-5 w-5" />
              <p className="text-body-sm font-semibold">
                This event is at capacity.{" "}
                {event.enableWaitlist
                  ? "Join the waitlist to be notified if a spot opens."
                  : "Registration is closed."}
              </p>
            </div>
          )}

          {isCheckInOpen && userRsvp === "going" && !isCheckedIn && (
            <div className="space-y-3 rounded-3xl border border-[hsl(var(--primary)/0.28)] bg-[hsl(var(--primary)/0.12)] p-5">
              <div className="flex items-center gap-2 text-primary">
                <QrCode className="h-5 w-5" />
                <p className="text-body font-semibold">
                  Check-in is now open
                </p>
              </div>
              <Button
                onClick={onCheckIn}
                variant="default"
                size="sm"
                disabled={isLoading}
                className="w-full gap-2"
              >
                <Check className="h-4 w-4" />
                Check in
              </Button>
            </div>
          )}

          {!isCheckInOpen && event.checkInEnabled && !isEventPast && userRsvp === "going" && !isCheckedIn && (
            <div className="space-y-3 rounded-3xl border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.82)] p-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <QrCode className="h-5 w-5" />
                <p className="text-body font-semibold">Check-in opens soon</p>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button variant="outline" size="sm" disabled className="w-full gap-2 border-[hsl(var(--border)/0.4)]">
                      <Check className="h-4 w-4" /> Check in
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  Opens {event.checkInWindowBefore ? `${event.checkInWindowBefore} min before` : 'before start'}
                </TooltipContent>
              </Tooltip>
            </div>
          )}

          {isCheckedIn && (
            <div className="flex items-center gap-2 rounded-3xl border border-[hsl(var(--success)/0.3)] bg-[hsl(var(--success)/0.12)] p-4 text-[hsl(var(--success)/0.95)]">
              <Check className="h-5 w-5" />
              <p className="text-body-sm font-semibold">
                You're checked in! {event.checkedInCount} total attendees.
              </p>
            </div>
          )}

          {isHost && event.qrCodeEnabled && (
            <Button
              onClick={onShowQR}
              variant="outline"
              size="sm"
              className="w-full gap-2 border-[hsl(var(--primary)/0.35)] text-primary"
            >
              <QrCode className="h-4 w-4" />
              Show check-in QR
            </Button>
          )}

          {isHost && (
            <div className="flex flex-wrap items-center gap-2">
              {onEdit && (
                <Button onClick={onEdit} variant="ghost" size="sm" className="gap-2">
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button onClick={onDelete} variant="ghost" size="sm" className="gap-2 text-destructive">
                  Delete
                </Button>
              )}
              {onCreateSpace && (
                <Button onClick={onCreateSpace} variant="outline" size="sm" className="gap-2 border-[hsl(var(--border)/0.4)]">
                  Create Space
                </Button>
              )}
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-8">
          {event.description && (
            <div className="space-y-3">
              <h2 className="flex items-center gap-2 text-h4 font-h4 text-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                About this event
              </h2>
              <p className="text-body font-body text-muted-foreground whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          )}

          {event.coHostNames && event.coHostNames.length > 0 && (
            <div className="space-y-3">
              <h2 className="flex items-center gap-2 text-h4 font-h4 text-foreground">
                <UsersRound className="h-4 w-4 text-primary" />
                Hosted by
              </h2>
              <div className="flex flex-wrap gap-2">
                {event.coHostNames.map((name, idx) => (
                  <Badge
                    key={`${name}-${idx}`}
                    variant="muted"
                    className="rounded-full border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.7)] text-body-sm font-medium"
                  >
                    {name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {isHost && (
            <div className="space-y-4 rounded-3xl border border-[hsl(var(--primary)/0.2)] bg-[hsl(var(--background)/0.75)] p-6">
              <h3 className="flex items-center gap-2 text-body font-semibold text-foreground">
                <Users className="h-4 w-4 text-primary" />
                Attendee signals
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-h2 font-h2 text-primary">
                    {event.goingCount}
                  </p>
                  <p className="text-caption uppercase tracking-[0.2em] text-muted-foreground/70">
                    Going
                  </p>
                </div>
                <div>
                  <p className="text-h2 font-h2 text-foreground">
                    {event.maybeCount}
                  </p>
                  <p className="text-caption uppercase tracking-[0.2em] text-muted-foreground/70">
                    Maybe
                  </p>
                </div>
                {event.enableWaitlist && (
                  <div>
                    <p className="text-h2 font-h2 text-foreground">
                      {event.waitlistCount || 0}
                    </p>
                    <p className="text-caption uppercase tracking-[0.2em] text-muted-foreground/70">
                      Waitlist
                    </p>
                  </div>
                )}
                {event.checkInEnabled && (
                  <div>
                    <p className="text-h2 font-h2 text-[hsl(var(--success))]">
                      {event.checkedInCount || 0}
                    </p>
                    <p className="text-caption uppercase tracking-[0.2em] text-muted-foreground/70">
                      Checked in
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {isEventPast && (
            <div className="rounded-3xl border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.72)] p-4 text-center text-body-sm text-muted-foreground">
              This event has ended
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);

EventDetail.displayName = "EventDetail";

const FriendPortrait = ({
  friend,
  index,
}: {
  friend: EventFriendAttendee;
  index: number;
}) => {
  const initials =
    friend.name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("")
      .slice(0, 2) || "HI";

  return (
    <div
      className={cn(
        "relative h-12 w-9 overflow-hidden rounded-[14px] border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.85)] shadow-[0_12px_24px_rgba(15,23,42,0.2)] transition-transform duration-300 hover:-translate-y-0.5",
        index > 0 && "-ml-3"
      )}
      title={friend.name}
    >
      {friend.avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- Storybook surface
        <img
          src={friend.avatarUrl}
          alt={friend.name}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-[hsl(var(--primary)/0.12)] text-caption font-semibold text-primary">
          {initials}
        </span>
      )}
      <span className="sr-only">{friend.name}</span>
    </div>
  );
};
