"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Heart,
  MessageCircle,
  Share,
  Calendar,
  MapPin
} from "lucide-react";

// HIVE Brand Motion System - Referenced for timing values
// fast: 90ms micro-interactions, content: 220ms transitions, easing: cubic-bezier(0.22,0.61,0.36,1)

// Base Card Types
export type CardVariant = "profile" | "post" | "space" | "event" | "tool";
export type CardSize = "sm" | "md" | "lg" | "xl";

// Base Card Props
interface BaseCardProps {
  className?: string;
  hoverable?: boolean;
  size?: CardSize;
  onClick?: () => void;
}

// Profile Card (Tinder-style with full image background)
interface ProfileCardProps extends BaseCardProps {
  variant: "profile";
  user: {
    id: string;
    name: string;
    bio?: string;
    major?: string;
    year?: string;
    imageUrl?: string;
    isOnline?: boolean;
    mutualConnections?: number;
  };
  onLike?: () => void;
  onPass?: () => void;
  onMessage?: () => void;
}

export const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  ({ className, user, onLike, onPass, onMessage, hoverable = true, size = "lg", ...props }, ref) => {
    const [isLiked, setIsLiked] = React.useState(false);
    const [dragX, setDragX] = React.useState(0);

    const handleLike = () => {
      setIsLiked(true);
      onLike?.();
    };

    return (
      <motion.div
        ref={ref}
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        onDrag={(_, info) => {
          setDragX(info.offset.x);
        }}
        onDragEnd={(_, info) => {
          setDragX(0); // Reset position
          if (info.offset.x > 100) {
            handleLike();
          } else if (info.offset.x < -100) {
            onPass?.();
          }
        }}
        style={{ x: dragX }}
        className={cn(
          // Base styles - full image card
          "relative overflow-hidden rounded-2xl bg-[#0A0A0A] border border-white/[0.06]",
          "cursor-grab active:cursor-grabbing",
          
          // Size variants
          {
            "h-96 w-72": size === "sm",
            "h-[500px] w-80": size === "md", 
            "h-[600px] w-96": size === "lg",
            "h-[700px] w-[400px]": size === "xl",
          },

          // Hover effects with HIVE motion
          hoverable && [
            "transition-all duration-[90ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]",
            "hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#FFD700]/20",
            "hover:border-[#FFD700]/30"
          ],

          className
        )}
        {...props}
      >
        {/* Full Background Image */}
        <div className="absolute inset-0">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.name}
              className="h-full w-full object-cover"
              loading="lazy"
              style={{
                imageRendering: 'crisp-edges',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
              }}
              sizes="(max-width: 768px) 320px, 400px"
              onError={(e) => {
                // Replace with fallback on error
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          ) : null}
          
          {/* Fallback Background */}
          <div 
            className="h-full w-full bg-gradient-to-br from-[#0A0A0A] via-neutral-900 to-[#FFD700]/10 flex items-center justify-center"
            style={{ display: user.imageUrl ? 'none' : 'flex' }}
          >
            <span className="text-6xl font-[Space_Grotesk] text-neutral-500">
              {user.name.charAt(0)}
            </span>
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>

        {/* Online Status Indicator */}
        {user.isOnline && (
          <div className="absolute top-4 right-4 w-3 h-3 bg-[#FFD700] rounded-full border-2 border-[#0A0A0A] animate-pulse" />
        )}

        {/* Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <h3 className="text-2xl font-[Space_Grotesk] font-semibold mb-2">
              {user.name}
            </h3>
            
            {user.major && (
              <p className="text-[#FFD700] font-medium mb-1">
                {user.major} {user.year && `• ${user.year}`}
              </p>
            )}
            
            {user.bio && (
              <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
                {user.bio}
              </p>
            )}

            {user.mutualConnections && user.mutualConnections > 0 && (
              <p className="text-white/60 text-xs mb-4">
                {user.mutualConnections} mutual connection{user.mutualConnections !== 1 ? 's' : ''}
              </p>
            )}
          </motion.div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPass}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-[90ms]"
            >
              <span className="text-xl">✕</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMessage}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-[#FFD700] transition-colors duration-[90ms]"
            >
              <MessageCircle className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={cn(
                "w-12 h-12 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all duration-[90ms]",
                isLiked 
                  ? "bg-[#FFD700]/90 border-[#FFD700] text-[#0A0A0A]" 
                  : "bg-white/10 border-white/20 text-white/80 hover:text-[#FFD700] hover:border-[#FFD700]/50"
              )}
            >
              <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
            </motion.button>
          </div>
        </div>

        {/* Drag Indicators */}
        <AnimatePresence>
          {Math.abs(dragX) > 50 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "absolute inset-0 flex items-center justify-center text-6xl font-bold",
                dragX > 0 ? "text-[#FFD700]" : "text-red-400"
              )}
            >
              {dragX > 0 ? "💛" : "✕"}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);
ProfileCard.displayName = "ProfileCard";



// Enhanced Event Card with Proper Transitions
interface EventCardProps extends BaseCardProps {
  variant: "event";
  event: {
    id: string;
    title: string;
    description?: string;
    startTime: Date;
    endTime?: Date;
    location?: string;
    imageUrl?: string;
    attendeeCount: number;
    maxAttendees?: number;
    isAttending?: boolean;
    host: {
      name: string;
      imageUrl?: string;
    };
    space?: {
      name: string;
      color: string;
    };
  };
  onRSVP?: () => void;
  onShare?: () => void;
}

export const EventCard = React.forwardRef<HTMLDivElement, EventCardProps>(
  ({ className, event, onRSVP, onShare, hoverable = true, ...props }, ref) => {
    const [isAttending, setIsAttending] = React.useState(event.isAttending || false);
    const [isHovered, setIsHovered] = React.useState(false);

    const handleRSVP = () => {
      setIsAttending(!isAttending);
      onRSVP?.();
    };

    const formatEventTime = (date: Date) => {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }).format(date);
    };

    const isUpcoming = event.startTime > new Date();
    const isHappening = event.startTime <= new Date() && (!event.endTime || event.endTime >= new Date());

    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={cn(
          // Base event card styles
          "group relative overflow-hidden rounded-xl bg-[#0A0A0A] border border-white/[0.06]",
          
          // Status-based styling
          isHappening && "ring-2 ring-[#FFD700]/50 border-[#FFD700]/30",
          
          // Hover effects
          hoverable && [
            "transition-all duration-[220ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]",
            "hover:border-white/[0.12] hover:shadow-xl hover:shadow-black/20"
          ],

          className
        )}
        {...props}
      >
        {/* Event Image */}
        {event.imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={event.imageUrl}
              alt={event.title}
              className="h-full w-full object-cover"
              loading="lazy"
              style={{
                imageRendering: 'crisp-edges',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              srcSet={`${event.imageUrl}&w=600&h=337&fit=crop 600w, ${event.imageUrl}&w=800&h=450&fit=crop 800w, ${event.imageUrl}&w=1200&h=675&fit=crop 1200w`}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Live Indicator */}
            {isHappening && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFD700] text-[#0A0A0A] text-xs font-medium"
              >
                <div className="w-2 h-2 bg-[#0A0A0A] rounded-full animate-pulse" />
                LIVE
              </motion.div>
            )}

            {/* Space Badge */}
            {event.space && (
              <div 
                className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border"
                style={{ 
                  backgroundColor: `${event.space.color}20`,
                  color: event.space.color,
                  borderColor: `${event.space.color}30`
                }}
              >
                {event.space.name}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-[Space_Grotesk] font-semibold text-white truncate group-hover:text-[#FFD700] transition-colors duration-[90ms]">
                {event.title}
              </h3>
              
              {event.description && (
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed line-clamp-2">
                  {event.description}
                </p>
              )}
            </div>
          </div>

          {/* Event Details */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-neutral-400">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{formatEventTime(event.startTime)}</span>
              {event.endTime && (
                <span className="ml-1">
                  - {formatEventTime(event.endTime)}
                </span>
              )}
            </div>

            {event.location && (
              <div className="flex items-center text-sm text-neutral-400">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{event.location}</span>
              </div>
            )}

            <div className="flex items-center text-sm text-neutral-400">
              <Users className="mr-2 h-4 w-4" />
              <span>
                {event.attendeeCount} attending
                {event.maxAttendees && ` • ${event.maxAttendees - event.attendeeCount} spots left`}
              </span>
            </div>
          </div>

          {/* Host */}
          <div className="mt-4 flex items-center">
            <div className="flex items-center text-sm text-neutral-400">
              <span className="mr-2">Hosted by</span>
              <div className="flex items-center">
                {event.host.imageUrl ? (
                  <img
                    src={event.host.imageUrl}
                    alt={event.host.name}
                    className="w-5 h-5 rounded-full mr-2"
                    loading="lazy"
                    style={{
                      imageRendering: 'crisp-edges',
                    }}
                    sizes="20px"
                    srcSet={`${event.host.imageUrl}&w=20&h=20&fit=crop&crop=face 1x, ${event.host.imageUrl}&w=40&h=40&fit=crop&crop=face 2x`}
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-neutral-700 mr-2 flex items-center justify-center text-xs">
                    {event.host.name.charAt(0)}
                  </div>
                )}
                <span className="font-medium text-white">{event.host.name}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRSVP}
              disabled={Boolean(event.maxAttendees && event.attendeeCount >= event.maxAttendees)}
              className={cn(
                "flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-[90ms]",
                isAttending
                  ? "bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30 hover:bg-[#FFD700]/30"
                  : "bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFD700]/90 border border-[#FFD700]",
                event.maxAttendees && event.attendeeCount >= event.maxAttendees && 
                  "opacity-50 cursor-not-allowed"
              )}
            >
              {isAttending ? "✓ Attending" : isUpcoming ? "RSVP" : "Join"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onShare}
              className="ml-3 p-2.5 rounded-lg border border-white/[0.06] text-neutral-400 hover:text-white hover:border-white/[0.12] transition-colors duration-[90ms]"
            >
              <Share className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }
);
EventCard.displayName = "EventCard";

 