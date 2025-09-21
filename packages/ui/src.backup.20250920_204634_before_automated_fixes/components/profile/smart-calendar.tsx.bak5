'use client';

import React from 'react';
import { SmartCalendarProps } from './types';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { Calendar, Clock, MapPin, Users, Plus, AlertCircle, Loader2, BookOpen, Coffee, Award } from 'lucide-react';

export const SmartCalendar: React.FC<SmartCalendarProps> = ({
  events,
  isLoading = false,
  error,
  onEventClick,
  onAddEvent
}) => {
  if (isLoading) {
    return (
      <HiveCard className="p-6">
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-[var(--hive-brand-secondary)]" />
        </div>
      </HiveCard>
    );
  }

  if (error) {
    return (
      <HiveCard className="p-6">
        <div className="flex items-center justify-center py-4 text-center">
          <div>
            <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-400 mb-2">Failed to load events</p>
            <p className="text-sm text-gray-400">{error}</p>
          </div>
        </div>
      </HiveCard>
    );
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'class':
        return <BookOpen className="h-4 w-4" />;
      case 'social':
        return <Coffee className="h-4 w-4" />;
      case 'meeting':
        return <Users className="h-4 w-4" />;
      case 'milestone':
        return <Award className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'class':
        return 'from-blue-500/20 to-blue-600/20 border-blue-500/30';
      case 'social':
        return 'from-green-500/20 to-green-600/20 border-green-500/30';
      case 'meeting':
        return 'from-purple-500/20 to-purple-600/20 border-purple-500/30';
      case 'milestone':
        return 'from-hive-gold/20 to-yellow-400/20 border-hive-gold/30';
      default:
        return 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
    }
  };

  return (
    <HiveCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
          Smart Calendar
        </h2>
        <HiveButton 
          variant="outline" 
          size="sm" 
          onClick={onAddEvent}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Event
        </HiveButton>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-4">
          <Calendar className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">No upcoming events</p>
          <HiveButton onClick={onAddEvent}>
            Add Your First Event
          </HiveButton>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div 
              key={event.id} 
              className={`bg-gradient-to-r ${getEventColor(event.type)} border rounded-lg p-4 hover:border-opacity-60 transition-all cursor-pointer`}
              onClick={() => onEventClick?.(event.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[var(--hive-text-primary)]/10 rounded-lg flex items-center justify-center">
                    {getEventIcon(event.type)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-[var(--hive-text-primary)] mb-1">{event.title}</h3>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                      <Clock className="h-3 w-3" />
                      <span>{event.time}</span>
                      {event.location && (
                        <>
                          <span>•</span>
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </>
                      )}
                    </div>

                    {event.attendees.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                        <Users className="h-3 w-3" />
                        <span>{event.attendees.join(', ')}</span>
                      </div>
                    )}

                    {/* Social Discovery */}
                    {event.overlap && event.overlap.count > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <HiveBadge variant="study-streak" className="text-xs">
                          Social Discovery
                        </HiveBadge>
                        <span className="text-xs text-gray-300">
                          {event.overlap.message}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <HiveBadge variant="freshman" className="text-xs">
                    {event.type}
                  </HiveBadge>
                  
                  {event.isRecurring && (
                    <div className="text-xs text-gray-400">
                      Recurring
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-hive-border-secondary">
        <div className="grid grid-cols-2 gap-2">
          <HiveButton variant="ghost" size="sm">
            View Full Calendar
          </HiveButton>
          <HiveButton variant="ghost" size="sm">
            Sync Calendar
          </HiveButton>
        </div>
      </div>
    </HiveCard>
  );
};

export default SmartCalendar;