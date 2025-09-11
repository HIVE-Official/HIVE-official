"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Link, CheckCircle, X } from 'lucide-react';
import { Button, Badge } from '@hive/ui';
import { cn } from '@hive/ui';
import toast from '@/hooks/use-toast-notifications';
import { authenticatedFetch } from '@/lib/auth-utils';
import { formatDistanceToNow } from 'date-fns';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description?: string;
    datetime: string;
    endTime?: string;
    location?: string;
    virtualLink?: string;
    maxAttendees?: number;
    currentAttendees?: number;
    tags?: string[];
    imageUrl?: string;
    spaceId: string;
    spaceName?: string;
    isRecurring?: boolean;
    userRSVP?: boolean;
  };
  variant?: 'grid' | 'list' | 'compact';
  onRSVP?: (eventId: string) => void;
  onCancel?: (eventId: string) => void;
}

export function EventCard({ event, variant = 'grid', onRSVP, onCancel }: EventCardProps) {
  const [isRSVPing, setIsRSVPing] = useState(false);
  const [hasRSVP, setHasRSVP] = useState(event.userRSVP || false);

  const eventDate = new Date(event.datetime);
  const isUpcoming = eventDate > new Date();
  const timeUntil = isUpcoming ? formatDistanceToNow(eventDate, { addSuffix: true }) : 'Past event';
  
  const attendeeCount = event.currentAttendees || 0;
  const isFull = event.maxAttendees ? attendeeCount >= event.maxAttendees : false;
  const spotsLeft = event.maxAttendees ? event.maxAttendees - attendeeCount : null;

  const handleRSVP = async () => {
    if (!isUpcoming || isFull) return;

    setIsRSVPing(true);
    
    try {
      const endpoint = hasRSVP 
        ? `/api/events/${event.id}/cancel-rsvp`
        : `/api/events/${event.id}/rsvp`;
        
      const response = await authenticatedFetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to update RSVP');
      }

      setHasRSVP(!hasRSVP);
      
      if (hasRSVP) {
        toast.info('RSVP cancelled', 'Your spot has been released');
        if (onCancel) onCancel(event.id);
      } else {
        toast.eventRSVP(event.title);
        if (onRSVP) onRSVP(event.id);
      }
    } catch (error) {
      console.error('RSVP error:', error);
      toast.error('Failed to update RSVP', 'Please try again');
    } finally {
      setIsRSVPing(false);
    }
  };

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between p-3 bg-[var(--hive-white)]/[0.02] rounded-lg border border-[var(--hive-white)]/[0.08] hover:bg-[var(--hive-white)]/[0.05] transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="text-center">
            <div className="text-xs text-gray-400">{eventDate.toLocaleDateString('en', { month: 'short' })}</div>
            <div className="text-lg font-bold text-[var(--hive-text-primary)]">{eventDate.getDate()}</div>
          </div>
          <div>
            <h4 className="font-medium text-[var(--hive-text-primary)]">{event.title}</h4>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Clock className="h-3 w-3" />
              <span>{eventDate.toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' })}</span>
              {event.location && (
                <>
                  <span>•</span>
                  <MapPin className="h-3 w-3" />
                  <span>{event.location}</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        {isUpcoming && (
          <Button
            size="sm"
            variant={hasRSVP ? "outline" : "primary"}
            onClick={handleRSVP}
            disabled={isRSVPing || isFull}
            className={hasRSVP ? "border-green-500 text-green-400" : ""}
          >
            {isRSVPing ? 'Loading...' : hasRSVP ? 'Going' : isFull ? 'Full' : 'RSVP'}
          </Button>
        )}
      </motion.div>
    );
  }

  if (variant === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-4 p-4 bg-[var(--hive-white)]/[0.02] rounded-xl border border-[var(--hive-white)]/[0.08] hover:border-[var(--hive-white)]/[0.12] transition-all"
      >
        <div className="text-center min-w-[60px]">
          <div className="text-sm text-gray-400">{eventDate.toLocaleDateString('en', { month: 'short' })}</div>
          <div className="text-2xl font-bold text-[var(--hive-text-primary)]">{eventDate.getDate()}</div>
          <div className="text-xs text-gray-400">{eventDate.toLocaleDateString('en', { weekday: 'short' })}</div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-[var(--hive-text-primary)] mb-1">{event.title}</h3>
              {event.description && (
                <p className="text-sm text-gray-400 line-clamp-2 mb-2">{event.description}</p>
              )}
              
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{eventDate.toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' })}</span>
                </div>
                
                {event.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{event.location}</span>
                  </div>
                )}
                
                {event.virtualLink && (
                  <div className="flex items-center gap-1">
                    <Link className="h-3 w-3" />
                    <span>Virtual</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>
                    {attendeeCount}
                    {event.maxAttendees && ` / ${event.maxAttendees}`}
                  </span>
                </div>
              </div>
              
              {event.tags && event.tags.length > 0 && (
                <div className="flex gap-1 mt-2">
                  {event.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-end gap-2">
              {isUpcoming ? (
                <>
                  <Badge variant={hasRSVP ? "default" : "outline"} className="text-xs">
                    {timeUntil}
                  </Badge>
                  <Button
                    size="sm"
                    variant={hasRSVP ? "outline" : "primary"}
                    onClick={handleRSVP}
                    disabled={isRSVPing || isFull}
                    className={hasRSVP ? "border-green-500 text-green-400" : ""}
                  >
                    {isRSVPing ? 'Loading...' : hasRSVP ? 'Cancel RSVP' : isFull ? 'Event Full' : 'RSVP'}
                  </Button>
                </>
              ) : (
                <Badge variant="outline" className="text-xs text-gray-500">
                  Past Event
                </Badge>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid variant (default)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="bg-[var(--hive-white)]/[0.02] rounded-xl border border-[var(--hive-white)]/[0.08] overflow-hidden hover:border-[var(--hive-white)]/[0.12] transition-all"
    >
      {event.imageUrl ? (
        <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${event.imageUrl})` }} />
      ) : (
        <div className="h-32 bg-gradient-to-br from-[var(--hive-gold)]/20 to-[var(--hive-gold)]/5 flex items-center justify-center">
          <Calendar className="h-12 w-12 text-[var(--hive-gold)]/50" />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-[var(--hive-text-primary)] line-clamp-1">{event.title}</h3>
            {event.spaceName && (
              <p className="text-xs text-gray-400 mt-1">by {event.spaceName}</p>
            )}
          </div>
          {hasRSVP && (
            <CheckCircle className="h-5 w-5 text-green-400 shrink-0" />
          )}
        </div>
        
        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            <span>{eventDate.toLocaleDateString('en', { month: 'short', day: 'numeric' })}</span>
            <span>•</span>
            <Clock className="h-3 w-3" />
            <span>{eventDate.toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' })}</span>
          </div>
          
          {(event.location || event.virtualLink) && (
            <div className="flex items-center gap-2">
              {event.location ? (
                <>
                  <MapPin className="h-3 w-3" />
                  <span className="line-clamp-1">{event.location}</span>
                </>
              ) : (
                <>
                  <Link className="h-3 w-3" />
                  <span>Virtual Event</span>
                </>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-3 w-3" />
              <span>
                {attendeeCount} going
                {spotsLeft !== null && spotsLeft > 0 && (
                  <span className="text-[var(--hive-gold)] ml-1">
                    ({spotsLeft} spots left)
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
        
        {event.tags && event.tags.length > 0 && (
          <div className="flex gap-1 mt-3">
            {event.tags.slice(0, 2).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {event.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{event.tags.length - 2}
              </Badge>
            )}
          </div>
        )}
        
        {isUpcoming && (
          <Button
            className={cn(
              "w-full mt-4",
              hasRSVP 
                ? "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30" 
                : "bg-[var(--hive-gold)] text-[var(--hive-black)] hover:bg-[var(--hive-gold)]/90"
            )}
            onClick={handleRSVP}
            disabled={isRSVPing || (!hasRSVP && isFull)}
          >
            {isRSVPing ? 'Loading...' : hasRSVP ? 'Cancel RSVP' : isFull ? 'Event Full' : 'RSVP'}
          </Button>
        )}
      </div>
    </motion.div>
  );
}