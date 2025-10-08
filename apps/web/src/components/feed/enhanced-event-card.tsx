"use client";

import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from '@hive/ui';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Heart,
  Share2,
  Bookmark,
  ExternalLink,
  ChevronRight,
  Star,
  UserPlus
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description?: string;
    startTime: string;
    endTime?: string;
    location?: string;
    spaceName?: string;
    spaceId?: string;
    attendeeCount?: number;
    isAttending?: boolean;
    isBookmarked?: boolean;
    tags?: string[];
    imageUrl?: string;
    organizer?: {
      name: string;
      handle?: string;
    };
  };
  onRSVP: (eventId: string, attending: boolean) => Promise<void>;
  onBookmark: (eventId: string) => Promise<void>;
  onShare: (eventId: string) => Promise<void>;
  onClick?: (eventId: string) => void;
  isMobile?: boolean;
  className?: string;
}

export function EnhancedEventCard({
  event,
  onRSVP,
  onBookmark,
  onShare,
  onClick,
  isMobile = false,
  className = ''
}: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [lastActionTime, setLastActionTime] = useState<number>(0);

  // Rate limiting: Prevent actions more than once per 500ms
  const isActionAllowed = () => {
    const now = Date.now();
    if (now - lastActionTime < 500) {
      return false;
    }
    setLastActionTime(now);
    return true;
  };

  // Calculate time relevance for styling
  const eventTime = new Date(event.startTime);
  const now = new Date();
  const hoursUntilEvent = (eventTime.getTime() - now.getTime()) / (1000 * 60 * 60);

  const isHappeningNow = hoursUntilEvent >= -1 && hoursUntilEvent <= 1;
  const isUpcoming = hoursUntilEvent > 0 && hoursUntilEvent <= 24;
  const isToday = hoursUntilEvent > 0 && hoursUntilEvent <= 24;

  // Mobile swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Security: Validate touch event and prevent potential injection
    if (!e.targetTouches || e.targetTouches.length === 0) return;

    const touch = e.targetTouches[0];
    if (!touch || typeof touch.clientX !== 'number') return;

    // Clamp values to screen bounds for security
    const clampedX = Math.max(0, Math.min(touch.clientX, window.innerWidth || 2000));

    setTouchEnd(null);
    setTouchStart(clampedX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Security: Validate touch event
    if (!e.targetTouches || e.targetTouches.length === 0) return;

    const touch = e.targetTouches[0];
    if (!touch || typeof touch.clientX !== 'number') return;

    // Clamp values to screen bounds for security
    const clampedX = Math.max(0, Math.min(touch.clientX, window.innerWidth || 2000));

    setTouchEnd(clampedX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;   // Swipe left (start > end)
    const isRightSwipe = distance < -50; // Swipe right (start < end)

    // Correct swipe logic to match indicators:
    // Left swipe (←) = bookmark, Right swipe (→) = RSVP
    if (isLeftSwipe) {
      handleBookmark(); // ← Swipe to bookmark
    } else if (isRightSwipe) {
      handleRSVP(); // Swipe to RSVP →
    }

    // Reset touch state for security
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleRSVP = async () => {
    if (!isActionAllowed() || actionLoading) return;

    setActionLoading('rsvp');
    try {
      await onRSVP(event.id, !event.isAttending);
    } catch (error) {
      console.error('RSVP action failed:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleBookmark = async () => {
    if (!isActionAllowed() || actionLoading) return;

    setActionLoading('bookmark');
    try {
      await onBookmark(event.id);
    } catch (error) {
      console.error('Bookmark action failed:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleShare = async () => {
    if (!isActionAllowed() || actionLoading) return;

    setActionLoading('share');
    try {
      await onShare(event.id);
    } catch (error) {
      console.error('Share action failed:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCardClick = () => {
    if (onClick && event.id) {
      // Validate event ID to prevent XSS
      const sanitizedId = String(event.id).replace(/[^a-zA-Z0-9_-]/g, '');
      if (sanitizedId.length > 0 && sanitizedId.length < 100) {
        onClick(sanitizedId);
      }
    }
  };

  // Sanitize display text to prevent XSS
  const sanitizeText = (text: string | undefined): string => {
    if (!text) return '';
    return String(text)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .slice(0, 500); // Limit length
  };

  const getTimeDisplay = () => {
    if (isHappeningNow) {
      return {
        text: 'Happening Now',
        color: 'text-green-400',
        bg: 'bg-green-500/20'
      };
    } else if (hoursUntilEvent <= 2 && hoursUntilEvent > 0) {
      return {
        text: `In ${Math.round(hoursUntilEvent)}h`,
        color: 'text-orange-400',
        bg: 'bg-orange-500/20'
      };
    } else if (isToday) {
      return {
        text: `Today ${format(eventTime, 'h:mm a')}`,
        color: 'text-blue-400',
        bg: 'bg-blue-500/20'
      };
    } else {
      return {
        text: format(eventTime, 'MMM d, h:mm a'),
        color: 'text-hive-text-secondary',
        bg: 'bg-hive-background-overlay'
      };
    }
  };

  const timeDisplay = getTimeDisplay();

  // Desktop hover preview
  const renderHoverPreview = () => {
    if (isMobile || !isHovered) return null;

    return (
      <div className="absolute top-full left-0 right-0 z-10 mt-2 p-4 bg-hive-surface border border-hive-border rounded-lg shadow-lg">
        {event.description && (
          <p className="text-sm text-hive-text-secondary mb-3">
            {event.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleRSVP}
              disabled={actionLoading === 'rsvp'}
              className={`max-w-sm ${
                event.isAttending
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-[var(--hive-brand-primary)] text-hive-obsidian hover:bg-hive-champagne'
              }`}
            >
              {event.isAttending ? 'Going' : 'RSVP'}
            </Button>

            <Button
              onClick={handleBookmark}
              variant="outline"
              className="max-w-sm"
              disabled={actionLoading === 'bookmark'}
            >
              <Bookmark className={`h-4 w-4 ${event.isBookmarked ? 'fill-current text-[var(--hive-brand-primary)]' : ''}`} />
            </Button>

            <Button
              onClick={handleShare}
              variant="outline"
              className="max-w-sm"
              disabled={actionLoading === 'share'}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          <Button
            onClick={handleCardClick}
            variant="outline"
            className="max-w-sm"
          >
            View Details
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <Card
        className={`group cursor-pointer transition-all duration-200 hover:border-[var(--hive-brand-primary)]/50 ${
          isHappeningNow ? 'ring-2 ring-green-500/50' : ''
        } ${className}`}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchMove={isMobile ? handleTouchMove : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
        onClick={isMobile ? handleCardClick : undefined}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <Badge className={`text-xs ${timeDisplay.bg} ${timeDisplay.color}`}>
                  {timeDisplay.text}
                </Badge>
                {isHappeningNow && (
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                )}
              </div>

              <h3 className="text-lg font-semibold text-hive-text-primary group-hover:text-[var(--hive-brand-primary)] transition-colors">
                {sanitizeText(event.title)}
              </h3>

              {event.spaceName && (
                <p className="text-sm text-hive-text-secondary">
                  in {sanitizeText(event.spaceName)}
                </p>
              )}
            </div>

            {/* Quick Action - Mobile Only */}
            {isMobile && (
              <div className="flex items-center space-x-2">
                <Button
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleRSVP();
                  }}
                  className={`max-w-sm ${
                    event.isAttending
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-[var(--hive-brand-primary)] text-hive-obsidian hover:bg-hive-champagne'
                  }`}
                  disabled={actionLoading === 'rsvp'}
                >
                  {event.isAttending ? 'Going' : 'RSVP'}
                </Button>
              </div>
            )}
          </div>

          {/* Event Details */}
          <div className="space-y-2">
            <div className="flex items-center text-sm text-hive-text-secondary">
              <Clock className="h-4 w-4 mr-2" />
              <span>
                {format(eventTime, 'h:mm a')}
                {event.endTime && ` - ${format(new Date(event.endTime), 'h:mm a')}`}
              </span>
            </div>

            {event.location && (
              <div className="flex items-center text-sm text-hive-text-secondary">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{sanitizeText(event.location)}</span>
              </div>
            )}

            {event.attendeeCount !== undefined && (
              <div className="flex items-center text-sm text-hive-text-secondary">
                <Users className="h-4 w-4 mr-2" />
                <span>{event.attendeeCount} attending</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {event.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {event.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{event.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Mobile Swipe Indicators */}
          {isMobile && (
            <div className="flex items-center justify-between mt-3 text-xs text-hive-text-secondary">
              <span>← Swipe to bookmark</span>
              <span>Swipe to RSVP →</span>
            </div>
          )}

          {/* Desktop Action Bar */}
          {!isMobile && (
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-hive-border">
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleBookmark();
                  }}
                  className={`p-2 rounded transition-colors ${
                    event.isBookmarked
                      ? 'text-[var(--hive-brand-primary)]'
                      : 'text-hive-text-secondary hover:text-[var(--hive-brand-primary)]'
                  }`}
                  disabled={actionLoading === 'bookmark'}
                >
                  <Bookmark className={`h-4 w-4 ${event.isBookmarked ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleShare();
                  }}
                  className="p-2 rounded text-hive-text-secondary hover:text-blue-400 transition-colors"
                  disabled={actionLoading === 'share'}
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleRSVP();
                  }}
                  className={`max-w-sm ${
                    event.isAttending
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-[var(--hive-brand-primary)] text-hive-obsidian hover:bg-hive-champagne'
                  }`}
                  disabled={actionLoading === 'rsvp'}
                >
                  {event.isAttending ? (
                    <>
                      <Star className="h-4 w-4 mr-2" />
                      Going
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      RSVP
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleCardClick}
                  variant="outline"
                  className="max-w-sm"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Desktop Hover Preview */}
      {renderHoverPreview()}
    </div>
  );
}
