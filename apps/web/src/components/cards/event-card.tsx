"use client";

import React from 'react';
import { Card, CardContent, CardHeader, Badge, Avatar, AvatarImage, AvatarFallback } from '@hive/ui';
import { Calendar, Clock, MapPin, Users, Heart, Share2, MessageCircle } from 'lucide-react';
import { cn } from '@hive/ui';
import Link from 'next/link';
import { type Event } from '@hive/core';

interface EventCardProps {
  event: Event;
  showRSVPButton?: boolean;
  onRSVP?: (eventId: string, status: 'yes' | 'no' | 'maybe') => void;
  userRSVPStatus?: 'yes' | 'no' | 'maybe' | null;
  className?: string;
  compact?: boolean;
}

export function EventCard({ 
  event, 
  showRSVPButton = true, 
  onRSVP,
  userRSVPStatus,
  className,
  compact = false
}: EventCardProps) {
  const handleRSVP = (e: React.MouseEvent, status: 'yes' | 'no' | 'maybe') => {
    e.preventDefault();
    e.stopPropagation();
    onRSVP?.(event.id, status);
  };

  const formatEventDate = (date: Date) => {
    const now = new Date();
    const eventDate = new Date(date);
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    return eventDate.toLocaleDateString();
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (compact) {
    return (
      <Link href={`/events/${event.id}`} className={cn("block", className)}>
        <Card className="hover:shadow-md transition-all duration-200 hover:scale-[1.01] cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {/* Date/Time column */}
              <div className="flex-shrink-0 text-center">
                <div className="bg-[var(--hive-brand-primary)]/10 rounded-lg p-2 min-w-[60px]">
                  <div className="text-xs font-medium text-[var(--hive-brand-primary)]">
                    {formatEventDate(event.startDate)}
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {new Date(event.startDate).getDate()}
                  </div>
                  <div className="text-xs text-gray-600">
                    {formatTime(event.startDate)}
                  </div>
                </div>
              </div>

              {/* Event details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm line-clamp-1 mb-1">
                  {event.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-1 mb-2">
                  {event.description}
                </p>
                
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  {event.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{event.attendeeCount || 0}</span>
                  </div>
                </div>
              </div>

              {/* RSVP status indicator */}
              {userRSVPStatus && (
                <div className={cn(
                  "flex-shrink-0 w-2 h-2 rounded-full",
                  userRSVPStatus === 'yes' && "bg-green-400",
                  userRSVPStatus === 'maybe' && "bg-yellow-400",
                  userRSVPStatus === 'no' && "bg-red-400"
                )} />
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/events/${event.id}`} className={cn("block", className)}>
      <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group cursor-pointer border-2 hover:border-[var(--hive-brand-primary)]/20">
        {/* Event image/header */}
        <div className="relative h-48 bg-gradient-to-br from-[var(--hive-brand-primary)]/20 to-[var(--hive-brand-secondary)]/20 rounded-t-lg overflow-hidden">
          {event.imageUrl ? (
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${event.imageUrl})` }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Calendar className="h-16 w-16 text-[var(--hive-brand-primary)]/60" />
            </div>
          )}

          {/* Event type badge */}
          <div className="absolute top-3 left-3">
            <Badge 
              variant="secondary" 
              className="bg-white/90 text-gray-700 text-xs font-medium"
            >
              {event.type || 'Event'}
            </Badge>
          </div>

          {/* Date indicator */}
          <div className="absolute top-3 right-3 bg-white/90 rounded-lg p-2 text-center">
            <div className="text-xs font-medium text-[var(--hive-brand-primary)]">
              {new Date(event.startDate).toLocaleDateString([], { month: 'short' })}
            </div>
            <div className="text-lg font-bold text-gray-900">
              {new Date(event.startDate).getDate()}
            </div>
          </div>
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg group-hover:text-[var(--hive-brand-primary)] transition-colors line-clamp-1">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {event.description}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Event details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-[var(--hive-brand-primary)]" />
              <span className="font-medium">{formatEventDate(event.startDate)}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-[var(--hive-brand-primary)]" />
              <span>
                {formatTime(event.startDate)}
                {event.endDate && ` - ${formatTime(event.endDate)}`}
              </span>
            </div>

            {event.location && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-[var(--hive-brand-primary)]" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            )}
          </div>

          {/* Attendees */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {event.attendeeCount || 0} attending
              </span>
              {event.maxAttendees && (
                <span className="text-sm text-gray-400">
                  / {event.maxAttendees}
                </span>
              )}
            </div>

            {/* Attendee avatars */}
            {event.recentAttendees && event.recentAttendees.length > 0 && (
              <div className="flex -space-x-1">
                {event.recentAttendees.slice(0, 3).map((attendee, index) => (
                  <Avatar key={index} className="h-6 w-6 border-2 border-white">
                    <AvatarImage src={attendee.avatarUrl} alt={attendee.name} />
                    <AvatarFallback className="text-xs">
                      {attendee.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {event.recentAttendees.length > 3 && (
                  <div className="h-6 w-6 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center">
                    <span className="text-xs text-gray-600">+{event.recentAttendees.length - 3}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RSVP buttons */}
          {showRSVPButton && (
            <div className="flex gap-2">
              <button
                onClick={(e) => handleRSVP(e, 'yes')}
                className={cn(
                  "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200",
                  userRSVPStatus === 'yes'
                    ? "bg-green-500 text-white"
                    : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                )}
              >
                Going
              </button>
              <button
                onClick={(e) => handleRSVP(e, 'maybe')}
                className={cn(
                  "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200",
                  userRSVPStatus === 'maybe'
                    ? "bg-yellow-500 text-white"
                    : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200"
                )}
              >
                Maybe
              </button>
              <button
                onClick={(e) => handleRSVP(e, 'no')}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  userRSVPStatus === 'no'
                    ? "bg-red-500 text-white"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                )}
              >
                Can't Go
              </button>
            </div>
          )}

          {/* Event actions */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <button 
                className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors text-sm"
                onClick={(e) => e.preventDefault()}
              >
                <Heart className="h-4 w-4" />
                <span>{event.likeCount || 0}</span>
              </button>
              <button 
                className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors text-sm"
                onClick={(e) => e.preventDefault()}
              >
                <MessageCircle className="h-4 w-4" />
                <span>{event.commentCount || 0}</span>
              </button>
            </div>
            
            <button 
              className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors text-sm"
              onClick={(e) => e.preventDefault()}
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default EventCard;