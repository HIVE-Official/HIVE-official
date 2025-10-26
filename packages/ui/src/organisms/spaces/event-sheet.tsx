// Bounded Context Owner: Spaces Domain Guild
/**
 * EventSheet — Compact sheet wrapper around EventDetail.
 * - Uses Dialog primitives for a smaller, calmer overlay.
 * - blurExperimental blurs not-yet-final sections (friends/attendees/action rail) until UX is finalized.
 */
import * as React from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/molecules/dialog";
import type { CalendarEvent, RSVPStatus } from "./types";
import { EventDetail } from "./event-detail";

export interface EventSheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  event: CalendarEvent;
  userRsvp?: RSVPStatus;
  isHost?: boolean;
  onRSVP?: (status: RSVPStatus) => void;
  onCheckIn?: () => void;
  onShare?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onShowQR?: () => void;
  onAddToCalendar?: () => void;
  blurExperimental?: boolean;
}

export const EventSheet: React.FC<EventSheetProps> = ({
  open = false,
  onOpenChange,
  event,
  userRsvp,
  isHost,
  onRSVP,
  onCheckIn,
  onShare,
  onEdit,
  onDelete,
  onShowQR,
  onAddToCalendar,
  blurExperimental = true,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/50" />
      <DialogContent className="p-0 w-[min(96vw,640px)]">
        <div className={blurExperimental ? "[&_[data-experimental]]:blur-sm" : undefined}>
          <EventDetail
            event={event}
            userRsvp={userRsvp}
            isHost={isHost}
            onRSVP={onRSVP}
            onCheckIn={onCheckIn}
            onShare={onShare}
            onEdit={onEdit}
            onDelete={onDelete}
            onShowQR={onShowQR}
            onAddToCalendar={onAddToCalendar}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

