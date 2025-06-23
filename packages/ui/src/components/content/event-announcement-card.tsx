"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Bell, 
  Share2,
  ExternalLink,
  Zap,
  Star,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AdaptiveCard, CardHeader, CardContent, CardFooter, CardMedia } from "./adaptive-card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "./badge-system";
import { Button } from "../ui/button";

export interface EventAnnouncementData {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  organizer: {
    id: string;
    name: string;
    avatar?: string;
    isVerified?: boolean;
  };
  space?: {
    id: string;
    name: string;
    color?: string;
  };
  startTime: string; // ISO date string
  endTime?: string; // ISO date string
  location: {
    type: "physical" | "virtual" | "hybrid";
    address?: string;
    venue?: string;
    link?: string;
  };
  attendeeCount: number;
  maxAttendees?: number;
  isAttending?: boolean;
  isRSVPRequired?: boolean;
  eventType: "ritual" | "academic" | "social" | "workshop" | "meeting";
  tags: string[];
  priority?: "low" | "medium" | "high" | "urgent";
}

export interface EventAnnouncementCardProps {
  event: EventAnnouncementData;
  variant?: "compact" | "detailed" | "featured";
  onRSVP?: (eventId: string) => void;
  onShare?: (eventId: string) => void;
  onView?: (eventId: string) => void;
  className?: string;
}

const EventAnnouncementCard = React.forwardRef<HTMLDivElement, EventAnnouncementCardProps>(
  ({ event, onRSVP, onShare, onView, className }, ref) => {
    const {
      id,
      title,
      startTime,
      location,
      attendeeCount,
      isAttending,
      eventType,
    } = event;

    const handleInteract = () => onView?.(id);
    const handleRSVPClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onRSVP?.(id);
    };

    const startDate = new Date(startTime);
    const formattedDate = startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const formattedTime = startDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

    const locationText = location.type === 'virtual' ? 'Online' : (location.venue || location.address || 'TBA');

    return (
      <AdaptiveCard
        ref={ref}
        variant="glass"
        interactive="hover"
        onInteract={handleInteract}
        className={cn("w-full max-w-sm", className)}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <Badge variant="event" size="sm">{eventType}</Badge>
          </div>
          <div className="flex items-center space-x-4 text-sm text-white/60">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{formattedTime}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-white/80">
              <MapPin className="h-4 w-4" />
              <span>{locationText}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/80">
              <Users className="h-4 w-4" />
              <span>{attendeeCount} going</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant={isAttending ? "secondary" : "primary"}
            size="sm"
            className="w-full"
            onClick={handleRSVPClick}
          >
            {isAttending ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Going
              </>
            ) : (
              <>
                <Bell className="mr-2 h-4 w-4" />
                RSVP
              </>
            )}
          </Button>
        </CardFooter>
      </AdaptiveCard>
    );
  }
);

EventAnnouncementCard.displayName = "EventAnnouncementCard";

export { EventAnnouncementCard }; 