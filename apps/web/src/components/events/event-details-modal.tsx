'use client';

import React from 'react';
import { Button, Badge, HiveModal } from '@hive/ui';
import {
  X,
  Clock,
  MapPin,
  Users,
  Star,
  Heart,
  MessageCircle,
  Share2,
  Zap,
  ExternalLink,
  Calendar,
  Globe,
  Lock,
  Eye,
  Copy,
  Check,
} from 'lucide-react';

interface EventOrganizer {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  verified?: boolean;
}

interface EventData {
  id: string;
  title: string;
  description: string;
  type: 'academic' | 'social' | 'professional' | 'recreational' | 'official';
  organizer: EventOrganizer;
  space?: {
    id: string;
    name: string;
    type: string;
  };
  datetime: {
    start: string;
    end: string;
    timezone: string;
  };
  location: {
    type: 'physical' | 'virtual' | 'hybrid';
    name: string;
    address?: string;
    virtualLink?: string;
  };
  capacity: {
    max: number;
    current: number;
    waitlist: number;
  };
  tools: string[];
  tags: string[];
  visibility: 'public' | 'space_only' | 'invited_only';
  rsvpStatus?: 'going' | 'interested' | 'not_going' | null;
  isBookmarked: boolean;
  engagement: {
    going: number;
    interested: number;
    comments: number;
    shares: number;
  };
  requirements?: string[];
  createdAt: string;
  updatedAt: string;
}

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventData | null;
  currentUserId?: string;
  onRSVP?: (eventId: string, status: 'going' | 'interested' | 'not_going') => void;
  onBookmark?: (eventId: string) => void;
}

const typeConfig: Record<EventData['type'], { icon: string; color: string; bg: string }> = {
  academic: { icon: '📚', color: 'text-blue-400', bg: 'bg-blue-500/15' },
  social: { icon: '🎉', color: 'text-pink-400', bg: 'bg-pink-500/15' },
  professional: { icon: '💼', color: 'text-green-400', bg: 'bg-green-500/15' },
  recreational: { icon: '🎮', color: 'text-amber-400', bg: 'bg-amber-500/15' },
  official: { icon: '🏛️', color: 'text-purple-400', bg: 'bg-purple-500/15' },
};

const visibilityConfig: Record<EventData['visibility'], { icon: typeof Globe; label: string }> = {
  public: { icon: Globe, label: 'Public' },
  space_only: { icon: Eye, label: 'Space Only' },
  invited_only: { icon: Lock, label: 'Invite Only' },
};

function formatFullDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function getRelativeDay(dateStr: string): string | null {
  const date = new Date(dateStr);
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  if (date.toDateString() === now.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return null;
}

function getDuration(start: string, end: string): string {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  isOpen,
  onClose,
  event,
  currentUserId,
  onRSVP,
  onBookmark,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!event) return null;

  const type = typeConfig[event.type];
  const visibility = visibilityConfig[event.visibility];
  const VisibilityIcon = visibility.icon;
  const relativeDay = getRelativeDay(event.datetime.start);
  const duration = getDuration(event.datetime.start, event.datetime.end);
  const capacityPercent = event.capacity.max > 0
    ? Math.min((event.capacity.current / event.capacity.max) * 100, 100)
    : 0;
  const spotsLeft = Math.max(event.capacity.max - event.capacity.current, 0);
  const isFull = spotsLeft === 0 && event.capacity.max > 0;
  const isOrganizer = currentUserId === event.organizer.id;

  const handleShare = () => {
    const url = `${window.location.origin}/events/${event.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <HiveModal open={isOpen} onOpenChange={() => onClose()} size="md">
      <div className="max-h-[85vh] overflow-y-auto overscroll-contain">
        {/* Hero header */}
        <div className="relative px-6 pt-6 pb-5">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/[0.06] p-2 text-zinc-400 transition-colors hover:bg-white/[0.1] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Type + visibility badges */}
          <div className="mb-4 flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full ${type.bg} px-3 py-1 text-xs font-medium ${type.color} capitalize`}>
              <span className="text-sm">{type.icon}</span>
              {event.type}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1 text-xs text-zinc-400">
              <VisibilityIcon className="h-3 w-3" />
              {visibility.label}
            </span>
            {relativeDay && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--hive-brand-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--hive-brand-primary)]">
                {relativeDay}
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold leading-tight text-white pr-8">
            {event.title}
          </h2>

          {/* Organizer */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-700 text-xs font-medium text-white">
              {event.organizer.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-zinc-300">{event.organizer.name}</span>
              {event.organizer.verified && (
                <Star className="h-3.5 w-3.5 fill-[var(--hive-brand-primary)] text-[var(--hive-brand-primary)]" />
              )}
              <span className="text-zinc-500">@{event.organizer.handle}</span>
            </div>
            {event.space && (
              <>
                <span className="text-zinc-600">·</span>
                <span className="text-sm text-[var(--hive-brand-primary)]">{event.space.name}</span>
              </>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 border-t border-zinc-800" />

        {/* Info grid */}
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
          {/* Date & Time */}
          <div className="flex items-start gap-3 px-6 py-4">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">
              <Calendar className="h-4 w-4 text-[var(--hive-brand-primary)]" />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">When</p>
              <p className="mt-0.5 text-sm font-medium text-white">
                {formatFullDate(event.datetime.start)}
              </p>
              <p className="text-sm text-zinc-400">
                {formatTime(event.datetime.start)} – {formatTime(event.datetime.end)}
                <span className="ml-1.5 text-zinc-500">({duration})</span>
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3 px-6 py-4">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">
              <MapPin className="h-4 w-4 text-[var(--hive-brand-primary)]" />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Where</p>
              <p className="mt-0.5 text-sm font-medium text-white">{event.location.name}</p>
              {event.location.address && (
                <p className="text-sm text-zinc-400">{event.location.address}</p>
              )}
              {event.location.type !== 'physical' && event.location.virtualLink && (
                <a
                  href={event.location.virtualLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-sm text-[var(--hive-brand-primary)] hover:underline"
                >
                  Join virtual link
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {event.location.type === 'hybrid' && (
                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-2 py-0.5 text-[10px] uppercase tracking-wider text-zinc-400">
                  Hybrid
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Capacity bar */}
        <div className="mx-6 rounded-xl bg-white/[0.03] p-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[var(--hive-brand-primary)]" />
              <span className="font-medium text-white">
                {event.capacity.current}
                {event.capacity.max > 0 && <span className="text-zinc-500">/{event.capacity.max}</span>}
                {' '}attending
              </span>
            </div>
            {isFull ? (
              <span className="text-xs font-medium text-red-400">Full</span>
            ) : event.capacity.max > 0 ? (
              <span className="text-xs text-zinc-500">{spotsLeft} spots left</span>
            ) : null}
          </div>
          {event.capacity.max > 0 && (
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isFull ? 'bg-red-500' : capacityPercent > 80 ? 'bg-amber-500' : 'bg-[var(--hive-brand-primary)]'
                }`}
                style={{ width: `${capacityPercent}%` }}
              />
            </div>
          )}
          {event.capacity.waitlist > 0 && (
            <p className="mt-2 text-xs text-zinc-500">
              {event.capacity.waitlist} on waitlist
            </p>
          )}
        </div>

        {/* Description */}
        {event.description && (
          <div className="px-6 pt-5 pb-1">
            <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 mb-2">About</p>
            <p className="text-sm leading-relaxed text-zinc-300 whitespace-pre-wrap">
              {event.description}
            </p>
          </div>
        )}

        {/* Requirements */}
        {event.requirements && event.requirements.length > 0 && (
          <div className="px-6 pt-4">
            <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 mb-2">Requirements</p>
            <ul className="space-y-1.5">
              {event.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-zinc-600" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-6 pt-4">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Tools available */}
        {event.tools.length > 0 && (
          <div className="px-6 pt-4">
            <div className="flex items-center gap-2 rounded-xl bg-white/[0.03] px-4 py-3">
              <Zap className="h-4 w-4 text-[var(--hive-brand-primary)]" />
              <span className="text-sm text-zinc-300">
                {event.tools.length} tool{event.tools.length !== 1 ? 's' : ''} available during this event
              </span>
            </div>
          </div>
        )}

        {/* Engagement stats */}
        <div className="mx-6 mt-5 flex items-center gap-4 border-t border-zinc-800 pt-4 text-sm text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            {event.engagement.going} going
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5" />
            {event.engagement.interested} interested
          </span>
          <span className="flex items-center gap-1.5">
            <MessageCircle className="h-3.5 w-3.5" />
            {event.engagement.comments}
          </span>
          <span className="flex items-center gap-1.5">
            <Share2 className="h-3.5 w-3.5" />
            {event.engagement.shares}
          </span>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 mt-4 border-t border-zinc-800 bg-[var(--hive-background-secondary)] px-6 py-4">
          <div className="flex items-center gap-2">
            {/* RSVP buttons */}
            <Button
              variant={event.rsvpStatus === 'going' ? 'primary' : 'outline'}
              size="sm"
              onClick={() =>
                onRSVP?.(event.id, event.rsvpStatus === 'going' ? 'not_going' : 'going')
              }
              className={`flex-1 ${
                event.rsvpStatus === 'going'
                  ? 'bg-[var(--hive-brand-primary)] text-black'
                  : ''
              }`}
            >
              <Users className="mr-1.5 h-3.5 w-3.5" />
              {event.rsvpStatus === 'going' ? "You're Going" : isFull ? 'Join Waitlist' : 'Going'}
            </Button>
            <Button
              variant={event.rsvpStatus === 'interested' ? 'primary' : 'outline'}
              size="sm"
              onClick={() =>
                onRSVP?.(event.id, event.rsvpStatus === 'interested' ? 'not_going' : 'interested')
              }
              className={`flex-1 ${
                event.rsvpStatus === 'interested'
                  ? 'bg-[var(--hive-brand-primary)] text-black'
                  : ''
              }`}
            >
              <Star className="mr-1.5 h-3.5 w-3.5" />
              Interested
            </Button>

            {/* Bookmark */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBookmark?.(event.id)}
              className={event.isBookmarked ? 'text-[var(--hive-brand-primary)]' : 'text-zinc-400'}
            >
              <Heart className={`h-4 w-4 ${event.isBookmarked ? 'fill-current' : ''}`} />
            </Button>

            {/* Share */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-zinc-400"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </HiveModal>
  );
};
