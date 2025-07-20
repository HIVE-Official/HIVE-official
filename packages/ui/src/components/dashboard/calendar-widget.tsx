'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  Plus,
  Eye,
  MoreHorizontal,
  Bell,
  BookOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../hive-button';
import { Badge } from '../ui/badge';

// Calendar event types
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  date: string;
  type: 'personal' | 'space' | 'academic' | 'social';
  location?: string;
  spaceId?: string;
  spaceName?: string;
  attendeeCount?: number;
  color?: string;
  isAllDay?: boolean;
  reminderSet?: boolean;
}

export interface CalendarWidgetData {
  events: CalendarEvent[];
  upcomingDeadlines: Array<{
    id: string;
    title: string;
    dueDate: string;
    type: 'assignment' | 'exam' | 'project';
    spaceId?: string;
    spaceName?: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  weeklySchedule?: Array<{
    dayOfWeek: number;
    timeSlots: Array<{
      startTime: string;
      endTime: string;
      title: string;
      recurring: boolean;
    }>;
  }>;
}

interface CalendarWidgetProps {
  data?: CalendarWidgetData;
  isLoading?: boolean;
  onEventClick?: (eventId: string) => void;
  onDateSelect?: (date: Date) => void;
  onAddEvent?: () => void;
  className?: string;
  viewMode?: 'month' | 'week' | 'agenda';
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 25
    }
  }
} as const;

export function CalendarWidget({ 
  data, 
  isLoading = false, 
  onEventClick, 
  onDateSelect, 
  onAddEvent,
  className = "",
  viewMode = 'agenda'
}: CalendarWidgetProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeView, setActiveView] = useState<'month' | 'week' | 'agenda'>(viewMode);

  // Get current week events
  const currentWeekEvents = useMemo(() => {
    if (!data?.events) return [];
    
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return data.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    }).sort((a, b) => new Date(a.date + ' ' + a.startTime).getTime() - new Date(b.date + ' ' + b.startTime).getTime());
  }, [data?.events, currentDate]);

  // Get today's events
  const todayEvents = useMemo(() => {
    if (!data?.events) return [];
    
    const today = new Date().toISOString().split('T')[0];
    return data.events.filter(event => event.date === today);
  }, [data?.events]);

  // Get upcoming deadlines (next 7 days)
  const upcomingDeadlines = useMemo(() => {
    if (!data?.upcomingDeadlines) return [];
    
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    return data.upcomingDeadlines.filter(deadline => {
      const dueDate = new Date(deadline.dueDate);
      return dueDate >= today && dueDate <= nextWeek;
    }).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [data?.upcomingDeadlines]);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'personal': return 'bg-green-100 text-green-700 border-green-200';
      case 'space': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'social': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (isLoading) {
    return <CalendarSkeleton />;
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Unable to load calendar</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={`calendar-widget space-y-4 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Calendar Header */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <span>Calendar</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onAddEvent}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Today's Events */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span>Today's Schedule</span>
              <Badge variant="secondary">{todayEvents.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todayEvents.length > 0 ? (
              <div className="space-y-3">
                {todayEvents.map((event) => (
                  <motion.div 
                    key={event.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-gray-50 ${getEventTypeColor(event.type)}`}
                    onClick={() => onEventClick?.(event.id)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          {event.reminderSet && (
                            <Bell className="h-3 w-3 text-gray-500" />
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>
                              {event.isAllDay 
                                ? 'All day' 
                                : `${formatTime(event.startTime)} - ${formatTime(event.endTime)}`
                              }
                            </span>
                          </span>
                          {event.location && (
                            <span className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </span>
                          )}
                          {event.attendeeCount && (
                            <span className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>{event.attendeeCount}</span>
                            </span>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No events scheduled for today</p>
                <p className="text-xs mt-1">Add an event to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Upcoming Deadlines */}
      {upcomingDeadlines.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-red-600" />
                <span>Upcoming Deadlines</span>
                <Badge variant="destructive">{upcomingDeadlines.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline) => (
                  <motion.div 
                    key={deadline.id}
                    className={`p-3 rounded-lg border ${getPriorityColor(deadline.priority)}`}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{deadline.title}</h4>
                        <div className="flex items-center space-x-4 mt-1 text-xs">
                          <span>Due {formatDate(deadline.dueDate)}</span>
                          {deadline.spaceName && (
                            <span className="text-gray-600">
                              in {deadline.spaceName}
                            </span>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {deadline.type}
                          </Badge>
                        </div>
                      </div>
                      <Badge 
                        variant={deadline.priority === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {deadline.priority}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* This Week's Events */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <span>This Week</span>
                <Badge variant="secondary">{currentWeekEvents.length}</Badge>
              </div>
              <div className="flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    const prevWeek = new Date(currentDate);
                    prevWeek.setDate(currentDate.getDate() - 7);
                    setCurrentDate(prevWeek);
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    const nextWeek = new Date(currentDate);
                    nextWeek.setDate(currentDate.getDate() + 7);
                    setCurrentDate(nextWeek);
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentWeekEvents.length > 0 ? (
              <div className="space-y-2">
                {currentWeekEvents.map((event) => (
                  <motion.div 
                    key={event.id}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => onEventClick?.(event.id)}
                    whileHover={{ x: 2 }}
                  >
                    <div className={`w-3 h-3 rounded-full bg-${event.color || 'blue'}-500`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{event.title}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(event.date)} • {formatTime(event.startTime)}
                        {event.spaceName && ` • ${event.spaceName}`}
                      </p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getEventTypeColor(event.type)}`}
                    >
                      {event.type}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No events this week</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

// Loading Skeleton
function CalendarSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="h-40 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  );
}

// Mock data for development
export const mockCalendarData: CalendarWidgetData = {
  events: [
    {
      id: 'event_1',
      title: 'CS 101 Lecture',
      description: 'Introduction to Computer Science',
      startTime: '10:00',
      endTime: '11:30',
      date: new Date().toISOString().split('T')[0],
      type: 'academic',
      location: 'Room 204',
      spaceId: 'cs_majors',
      spaceName: 'CS Majors',
      color: 'blue',
      reminderSet: true
    },
    {
      id: 'event_2',
      title: 'Study Group',
      description: 'Algorithms and Data Structures',
      startTime: '14:00',
      endTime: '16:00',
      date: new Date().toISOString().split('T')[0],
      type: 'space',
      location: 'Library',
      spaceId: 'study_groups',
      spaceName: 'Study Groups',
      attendeeCount: 5,
      color: 'purple',
      reminderSet: true
    },
    {
      id: 'event_3',
      title: 'Coffee Chat',
      startTime: '11:00',
      endTime: '12:00',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
      type: 'social',
      location: 'Campus Cafe',
      attendeeCount: 3,
      color: 'orange'
    }
  ],
  upcomingDeadlines: [
    {
      id: 'deadline_1',
      title: 'Math Assignment 3',
      dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
      type: 'assignment',
      spaceId: 'math_study',
      spaceName: 'Math Study Group',
      priority: 'high'
    },
    {
      id: 'deadline_2',
      title: 'CS Project Proposal',
      dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0], // 3 days
      type: 'project',
      spaceId: 'cs_majors',
      spaceName: 'CS Majors',
      priority: 'medium'
    }
  ]
};

export default CalendarWidget;