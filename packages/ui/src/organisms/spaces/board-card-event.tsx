// Bounded Context Owner: Spaces Domain Guild
/**
 * BoardCardEvent - Event post with RSVP and check-in
 */

import React from "react";
import { cn } from "../../utils/cn";
import { BoardCard, type BoardCardProps } from "./board-card";
import { Button } from "../../atoms/button";
import { Badge } from "../../atoms/badge";
import type { EventPost, RSVPStatus, EventState } from "./types";
import {
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Clock4,
  XCircle,
  QrCode,
  UserPlus,
  Calendar as CalendarIcon,
  Copy as CopyIcon,
  ExternalLink,
} from "lucide-react";
import { format, addMinutes, subMinutes, isWithinInterval, formatDistanceToNow } from "date-fns";
import { useToast } from "../../hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { buildIcs } from "@/utils/ics";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../atoms/tooltip";

export interface BoardCardEventProps
  extends Omit<BoardCardProps, "post" | "children"> {
  post: EventPost;
  onRsvp?: (status: RSVPStatus) => void;
  onCheckIn?: () => void;
  onQrCheckIn?: () => void;
  onCopyLocation?: () => void;
  onAddToCalendar?: () => void;
  isLoading?: boolean;
  /** Minimal variant hides actions/utilities and prompts to open sheet */
  minimal?: boolean;
}

const EVENT_STATE_CONFIG: Record<
  EventState,
  { label: string; badgeVariant: "default" | "secondary" | "outline"; className: string }
> = {
  upcoming: { label: "Upcoming", badgeVariant: "outline", className: "text-primary border-primary/30" },
  active: { label: "Live", badgeVariant: "outline", className: "text-success border-success/40" },
  ended: { label: "Ended", badgeVariant: "outline", className: "text-muted-foreground" },
};

const RSVP_BUTTON_CONFIG: Record<
  RSVPStatus,
  { label: string; icon: typeof CheckCircle2; variant: "default" | "outline" | "secondary" }
> = {
  going: { label: "Going", icon: CheckCircle2, variant: "default" },
  maybe: { label: "Maybe", icon: Clock4, variant: "outline" },
  not_going: { label: "Can't go", icon: XCircle, variant: "outline" },
  waitlist: { label: "Waitlist", icon: Clock4, variant: "secondary" },
};

export const BoardCardEvent = React.forwardRef<HTMLDivElement, BoardCardEventProps>(
  (
    { post, onRsvp, onCheckIn, onQrCheckIn, onCopyLocation, onAddToCalendar, isLoading = false, isLeaderOrMod, minimal = true, ...boardCardProps },
    ref
  ) => {
    const { toast } = useToast();
    const stateConfig = EVENT_STATE_CONFIG[post.state];

    const checkInWindowBefore = post.checkInWindowBefore ?? 0;
    const checkInWindowAfter = post.checkInWindowAfter ?? 0;
    const quarterHourWindow = {
      start: subMinutes(new Date(post.startTime), checkInWindowBefore),
      end: addMinutes(new Date(post.startTime), checkInWindowAfter),
    };
    const isCheckInWindowOpen =
      post.checkInEnabled &&
      isWithinInterval(new Date(), { start: quarterHourWindow.start, end: quarterHourWindow.end });

    const isAtCapacity = Boolean(post.maxAttendees && post.goingCount >= post.maxAttendees);
    const startsIn = post.state === "upcoming" ? formatDistanceToNow(new Date(post.startTime), { addSuffix: true }) : undefined;
    const capacityPct = post.maxAttendees ? Math.min(100, Math.round((post.goingCount / post.maxAttendees) * 100)) : null;

    const mapsUrl = post.location ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(post.location)}` : undefined;
    const calendarUrl = (() => {
      const title = encodeURIComponent(post.title);
      const details = encodeURIComponent(post.description || "");
      const location = encodeURIComponent(post.location || "");
      const start = new Date(post.startTime);
      const end = new Date(post.endTime);
      const fmt = (d: Date) => `${d.getUTCFullYear()}${String(d.getUTCMonth()+1).padStart(2,'0')}${String(d.getUTCDate()).padStart(2,'0')}T${String(d.getUTCHours()).padStart(2,'0')}${String(d.getUTCMinutes()).padStart(2,'0')}00Z`;
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${fmt(start)}/${fmt(end)}`;
    })();

    return (
      <BoardCard ref={ref} post={post} isLeaderOrMod={isLeaderOrMod} showAuthor={false} onOpen={boardCardProps.onOpen} {...boardCardProps}>
        <div className="space-y-3 rounded-md">
          {post.coverImageUrl && (
            <div className="relative overflow-hidden rounded-md border border-border/20 anim-fade-in">
              <img
                src={post.coverImageUrl as any}
                alt={(post as any).coverImageAlt || post.title}
                className="w-full h-40 object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
          {/* Title first */}
          <h3 className="text-body font-semibold text-foreground truncate">{post.title}</h3>

          {/* Time + State + Location */}
          <div className="flex flex-wrap items-center gap-3 text-caption text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {format(new Date(post.startTime), "EEE, MMM d · h:mma")}
              {post.state === "upcoming" && (
                <span className="ml-2 text-muted-foreground/80">• Starts {startsIn}</span>
              )}
            </span>
            <Badge variant={stateConfig.badgeVariant} className={stateConfig.className}>
              {stateConfig.label}
            </Badge>
            {post.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {post.location}
              </span>
            )}
          </div>

          {/* Description */}
          {post.description && (
            <p className={cn("text-sm text-muted-foreground", minimal ? "line-clamp-2" : "line-clamp-3")}>{post.description}</p>
          )}

          {/* Hosts & counts */}
          <div className="flex flex-wrap items-center gap-2 text-caption text-muted-foreground">
            {post.coHostIds.length > 0 && (
              <span className="inline-flex items-center gap-1">
                <Users className="h-3.5 w-3.5" /> {post.coHostIds.length} co-host{post.coHostIds.length > 1 ? "s" : ""}
              </span>
            )}
            <span>{post.goingCount} going</span>
            {post.maybeCount > 0 && <span>· {post.maybeCount} maybe</span>}
            {post.waitlistCount > 0 && <span>· {post.waitlistCount} waitlist</span>}
            {isAtCapacity && <span className="text-warning"> · Capacity reached</span>}
          </div>

          {/* Capacity meter */}
          {!minimal && typeof capacityPct === 'number' && (
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-40 rounded-full bg-foreground/10 overflow-hidden" aria-label={`Event is ${capacityPct}% full`}>
                <div className="h-full rounded-full bg-foreground/50 transition-[width] duration-200" style={{ width: `${capacityPct}%` }} />
              </div>
              <span className="text-caption text-muted-foreground">{capacityPct}% full</span>
            </div>
          )}

          {/* RSVP row */}
          {!minimal && (
          <div className="flex flex-wrap items-center gap-2">
            {(Object.keys(RSVP_BUTTON_CONFIG) as RSVPStatus[]).map((status) => {
              // Gate waitlist: only show when at capacity and waitlist enabled
              if (status === 'waitlist' && !(isAtCapacity && post.enableWaitlist)) return null;
              const config = RSVP_BUTTON_CONFIG[status];
              const Icon = config.icon;
              const isSelected = post.userRsvp === status;
              const disabled = isLoading || (status === "going" && isAtCapacity && !isSelected);
              return (
                    <Button
                      key={status}
                      onClick={() => {
                        const prev = post.userRsvp;
                        onRsvp?.(status);
                        toast({
                          title: "RSVP updated",
                          description: `Set to ${status}.`,
                          action: (
                            <ToastAction altText="Undo" onClick={() => onRsvp?.(prev as RSVPStatus)}>
                              Undo
                            </ToastAction>
                          )
                        });
                      }}
                  variant={isSelected ? "default" : config.variant}
                  size="sm"
                  className="h-8 gap-1 px-3 text-xs"
                  disabled={disabled}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {config.label}
                </Button>
              );
            })}

            {post.checkInEnabled && (
              isCheckInWindowOpen ? (
                <Button
                  onClick={() => onCheckIn?.()}
                  variant="default"
                  size="sm"
                  className="h-8 gap-1 px-3 text-xs"
                  disabled={isLoading}
                >
                  <QrCode className="h-3.5 w-3.5" /> Tap in
                </Button>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <Button
                        onClick={() => {}}
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1 px-3 text-xs"
                        disabled
                      >
                        <QrCode className="h-3.5 w-3.5" /> Tap in
                      </Button>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Opens {post.checkInWindowBefore ? `${post.checkInWindowBefore} min before` : 'before start'}</TooltipContent>
                </Tooltip>
              )
            )}

            {isLeaderOrMod && post.state !== "ended" && (
              <Button
                onClick={onQrCheckIn}
                variant="ghost"
                size="sm"
                className="h-8 gap-1 px-3 text-xs text-muted-foreground hover:text-foreground"
                disabled={isLoading}
              >
                <UserPlus className="h-3.5 w-3.5" /> Share QR
              </Button>
            )}
          </div>
          )}

          {/* Utility actions: compact icon row with tooltips */}
          {!minimal && (
          <div className="flex flex-wrap items-center gap-1 anim-fade-in">
            <a href={calendarUrl} target="_blank" rel="noopener noreferrer" onClick={onAddToCalendar} aria-label="Add to calendar" className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted/40">
              <CalendarIcon className="h-4 w-4" />
            </a>
            <button
              type="button"
              aria-label="Download .ics"
              onClick={() => {
                const ics = buildIcs({ title: post.title, description: post.description || undefined, location: post.location || undefined, start: new Date(post.startTime), end: new Date(post.endTime) });
                const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = `${post.title || 'event'}.ics`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
              }}
              className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted/40 text-muted-foreground"
            >
              .ics
            </button>
            {mapsUrl && (
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Open maps" className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted/40">
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {post.location && (
              <button
                type="button"
                aria-label="Copy location"
                onClick={() => {
                  try {
                    (navigator as any)?.clipboard?.writeText?.(post.location);
                  } catch (error) {
                    console.warn("spaces.board_card_event.copy_location_failed", error);
                  }
                  onCopyLocation?.();
                }}
                className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted/40"
              >
                <CopyIcon className="h-4 w-4" />
              </button>
            )}
          </div>
          )}

          {/* Minimal CTA: open sheet for details */}
          {minimal && (
            <div className="pt-1">
              <button type="button" className="text-caption text-primary hover:underline" onClick={(e) => { e.stopPropagation(); boardCardProps.onOpen?.(); }}>
                View details →
              </button>
            </div>
          )}
        </div>
        {/* SR-only live region for RSVP confirmation */}
        <div className="sr-only" role="status" aria-live="polite">RSVP status {post.userRsvp || 'no response'}</div>
      </BoardCard>
    );
  }
);

BoardCardEvent.displayName = "BoardCardEvent";
