/**
 * Social Calendar Card - Social Schedule Sharing
 * Displays today's schedule with social context and group coordination
 */

"use client";

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, UserPlus, UserCheck, UserX, Settings } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion } from '../../lib/motion';
import { butterClasses, getStaggerClass } from '../../lib/motion';
import '../../styles/social-profile.css';

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  endTime?: string;
  type: 'class' | 'study' | 'social' | 'meeting' | 'exam';
  location?: string;
  building?: string;
  room?: string;
  attendees?: {
    going: number;
    maybe: number;
    spotsLeft?: number;
  };
  canJoin?: boolean;
  userStatus?: 'going' | 'maybe' | 'not-going' | null;
  isRecurring?: boolean;
  professor?: string;
  friends?: string[]; // Friend names attending
}

interface SocialCalendarCardProps {
  events: CalendarEvent[];
  freeUntil?: string;
  availabilityStatus?: 'available' | 'busy' | 'studying' | 'do-not-disturb';
  onEventAction?: (eventId: string, action: 'join' | 'maybe' | 'leave') => void;
  onAddEvent?: () => void;
  onConnectCalendar?: () => void;
  className?: string;
}

export function SocialCalendarCard({
  events = [],
  freeUntil,
  availabilityStatus = 'available',
  onEventAction,
  onAddEvent,
  onConnectCalendar,
  className
}: SocialCalendarCardProps) {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  
  const todayEvents = events.filter(event => {
    const today = new Date().toDateString();
    return new Date(event.time).toDateString() === today;
  }).sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  
  const getEventTypeIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'class': return '📚';
      case 'study': return '📖';
      case 'social': return '🎉';
      case 'meeting': return '💼';
      case 'exam': return '📝';
      default: return '📅';
    }
  };
  
  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'class': return 'var(--campus-blue)';
      case 'study': return 'var(--social-green)';
      case 'social': return 'var(--campus-blue)';
      case 'meeting': return 'var(--alert-orange)';
      case 'exam': return '#EF4444';
      default: return 'var(--text-tertiary)';
    }
  };
  
  const getAvailabilityMessage = () => {
    if (freeUntil) {
      return `Free until ${freeUntil} • Available for study`;
    }
    switch (availabilityStatus) {
      case 'available': return 'Available for collaboration';
      case 'studying': return 'Currently studying';
      case 'busy': return 'Busy with classes';
      case 'do-not-disturb': return 'Do not disturb';
      default: return '';
    }
  };
  
  const handleEventAction = (eventId: string, action: 'join' | 'maybe' | 'leave') => {
    onEventAction?.(eventId, action);
  };

  return (
    <motion.div 
      className={cn("social-profile-card", butterClasses.card, className)} 
      style={{ gridArea: 'calendar' }}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Calendar size={20} className="text-white" />
          </div>
          <div>
            <h3 className="profile-heading text-primary">
              📅 TODAY • {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </h3>
          </div>
        </div>
        <motion.button
          onClick={onConnectCalendar}
          className={cn("text-tertiary hover:text-primary", butterClasses.button)}
          whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } }}
          whileTap={{ scale: 0.98, transition: { duration: 0.2 } }}
        >
          <Settings size={16} />
        </motion.button>
      </div>
      
      {/* Availability Status */}
      {getAvailabilityMessage() && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 mb-6">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="profile-caption text-green-400">
            💡 {getAvailabilityMessage()}
          </span>
        </div>
      )}
      
      {/* Today's Events */}
      <div className="space-y-5">
        {todayEvents.length === 0 ? (
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Calendar size={48} className="text-tertiary mx-auto mb-4 opacity-50" />
            <p className="profile-body text-tertiary mb-4">
              No events scheduled for today
            </p>
            <motion.button 
              onClick={onAddEvent}
              className={cn("social-action-button secondary", butterClasses.button)}
            >
              <UserPlus size={16} />
              Add Event
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}
          >
            {todayEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={{
                  hidden: { opacity: 0, y: 24, scale: 0.98 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
                }}
                className={cn("group relative p-5 rounded-xl border border-white/8 hover:border-white/16 cursor-pointer", butterClasses.listItem, getStaggerClass(index))}
                onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                whileHover={{ y: -3, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
              {/* Event Time */}
              <div className="flex items-start gap-5">
                <div className="flex flex-col items-center min-w-[60px]">
                  <div className="profile-caption font-semibold text-primary">
                    ⏰ {event.time}
                  </div>
                  {event.endTime && (
                    <div className="profile-fine text-tertiary">
                      {event.endTime}
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  {/* Event Title and Type */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{getEventTypeIcon(event.type)}</span>
                    <h4 className="profile-body font-semibold text-primary">
                      {event.title}
                    </h4>
                    {event.isRecurring && (
                      <Badge variant="secondary" className="text-xs">
                        Recurring
                      </Badge>
                    )}
                  </div>
                  
                  {/* Location */}
                  {event.location && (
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin size={14} className="text-tertiary" />
                      <span className="profile-caption text-secondary">
                        🏛️ {event.location}
                        {event.room && ` • Room ${event.room}`}
                      </span>
                    </div>
                  )}
                  
                  {/* Professor (for classes) */}
                  {event.professor && (
                    <div className="profile-fine text-tertiary mb-2">
                      👨‍🏫 Prof. {event.professor}
                    </div>
                  )}
                  
                  {/* Social Attendance Info */}
                  {event.attendees && (
                    <div className="flex items-center gap-5 mb-3">
                      <div className="flex items-center gap-1">
                        <Users size={14} className="text-social-green" />
                        <span className="profile-caption text-social-green">
                          {event.attendees.going} going
                        </span>
                      </div>
                      {event.attendees.maybe > 0 && (
                        <div className="flex items-center gap-1">
                          <span className="profile-caption text-alert-orange">
                            {event.attendees.maybe} maybe
                          </span>
                        </div>
                      )}
                      {event.attendees.spotsLeft && (
                        <div className="flex items-center gap-1">
                          <span className="profile-caption text-campus-blue">
                            {event.attendees.spotsLeft} spots left
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Friends Attending */}
                  {event.friends && event.friends.length > 0 && (
                    <div className="social-proof mb-3">
                      <span className="social-count">{event.friends[0]}</span>
                      {event.friends.length > 1 && (
                        <span> and {event.friends.length - 1} other{event.friends.length > 2 ? 's' : ''}</span>
                      )}
                      <span> you know {event.friends.length === 1 ? 'is' : 'are'} attending</span>
                    </div>
                  )}
                  
                  {/* Action Buttons (for joinable events) */}
                  {event.canJoin && expandedEvent === event.id && (
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventAction(event.id, 'join');
                        }}
                        className="social-action-button"
                        disabled={event.userStatus === 'going'}
                      >
                        <UserCheck size={14} />
                        {event.userStatus === 'going' ? 'Going' : 'Join Group'}
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventAction(event.id, 'maybe');
                        }}
                        className="social-action-button secondary"
                        disabled={event.userStatus === 'maybe'}
                      >
                        <UserPlus size={14} />
                        {event.userStatus === 'maybe' ? 'Maybe' : 'Maybe'}
                      </Button>
                      {event.userStatus && event.userStatus !== 'not-going' && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEventAction(event.id, 'leave');
                          }}
                          className="text-red-400 border-red-400/20 hover:border-red-400/40"
                        >
                          <UserX size={14} />
                          Can't Make It
                        </Button>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Event Type Color Indicator */}
                <div
                  className="w-1 h-full rounded-full opacity-60"
                  style={{ background: getEventTypeColor(event.type) }}
                />
              </div>
              
              {/* Expanded State Indicator */}
              {event.canJoin && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="profile-fine text-tertiary">
                    {expandedEvent === event.id ? 'Click to collapse' : 'Click for options'}
                  </div>
                </div>
              )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      
      {/* Calendar Integration Status */}
      <div className="mt-8 pt-6 border-t border-white/8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-social-green" />
            <span className="profile-caption text-secondary">
              🔗 Google Calendar • UB Portal
            </span>
          </div>
          <motion.button
            onClick={onConnectCalendar}
            className={cn("text-tertiary hover:text-primary", butterClasses.button)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ⚙️
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default SocialCalendarCard;