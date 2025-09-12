'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { 
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  MapPin,
  Sparkles,
  Trophy,
  Target,
  Zap,
  Gift,
  Play,
  Eye,
  Bell,
  Plus,
  Filter,
  Grid3X3,
  List,
  ExternalLink
} from 'lucide-react';

export interface RitualInstance {
  id: string;
  ritualId: string;
  ritual: {
    name: string;
    title: string;
    description: string;
    type: 'onboarding' | 'seasonal' | 'achievement' | 'community' | 'creative' | 'emergency' | 'legacy';
    participationType: string;
    maxParticipants?: number;
    currentParticipants: number;
  };
  startTime: string;
  endTime?: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  location?: string;
  isUserParticipating: boolean;
  isUserEligible: boolean;
  participationStatus?: 'invited' | 'joined' | 'active' | 'completed';
  reminderSet: boolean;
  tags: string[];
}

export interface RitualCalendarProps {
  ritualInstances: RitualInstance[];
  onJoinRitual?: (ritualId: string, instanceId: string) => Promise<void>;
  onSetReminder?: (instanceId: string) => Promise<void>;
  onViewDetails?: (ritualId: string, instanceId: string) => void;
  className?: string;
  view?: 'month' | 'week' | 'day' | 'list';
  filterType?: string[];
  showPastEvents?: boolean;
  compactMode?: boolean;
}

const RITUAL_TYPE_CONFIG = {
  onboarding: { icon: Sparkles, color: 'text-purple-400', bgColor: 'bg-purple-500/20', label: 'Welcome' },
  seasonal: { icon: CalendarIcon, color: 'text-orange-400', bgColor: 'bg-orange-500/20', label: 'Seasonal' },
  achievement: { icon: Trophy, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', label: 'Achievement' },
  community: { icon: Users, color: 'text-blue-400', bgColor: 'bg-blue-500/20', label: 'Community' },
  creative: { icon: Zap, color: 'text-pink-400', bgColor: 'bg-pink-500/20', label: 'Creative' },
  emergency: { icon: Target, color: 'text-red-400', bgColor: 'bg-red-500/20', label: 'Emergency' },
  legacy: { icon: Gift, color: 'text-indigo-400', bgColor: 'bg-indigo-500/20', label: 'Legacy' }
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function RitualCalendar({
  ritualInstances,
  onJoinRitual,
  onSetReminder,
  onViewDetails,
  className,
  view: initialView = 'month',
  filterType = [],
  showPastEvents = false,
  compactMode = false
}: RitualCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState(initialView);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(filterType);
  const [joiningRitual, setJoiningRitual] = useState<string | null>(null);
  
  // Filter ritual instances
  const filteredInstances = ritualInstances.filter(instance => {
    const instanceDate = new Date(instance.startTime);
    const now = new Date();
    
    // Filter by past/future
    if (!showPastEvents && instanceDate < now) return false;
    
    // Filter by type
    if (selectedFilters.length > 0 && !selectedFilters.includes(instance.ritual.type)) {
      return false;
    }
    
    // Filter by date range based on view
    switch (view) {
      case 'month':
        return instanceDate.getMonth() === currentDate.getMonth() && 
               instanceDate.getFullYear() === currentDate.getFullYear();
      case 'week': {
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return instanceDate >= weekStart && instanceDate <= weekEnd;
      }
      case 'day':
        return instanceDate.toDateString() === currentDate.toDateString();
      case 'list':
        // Show upcoming events for list view
        return instanceDate >= now;
      default:
        return true;
    }
  });

  // Get events for a specific date
  const getEventsForDate = (date: Date): RitualInstance[] => {
    return filteredInstances.filter(instance => {
      const instanceDate = new Date(instance.startTime);
      return instanceDate.toDateString() === date.toDateString();
    });
  };

  // Handle ritual joining
  const handleJoinRitual = async (ritualId: string, instanceId: string) => {
    if (!onJoinRitual || joiningRitual) return;
    
    setJoiningRitual(instanceId);
    try {
      await onJoinRitual(ritualId, instanceId);
    } catch (error) {
      console.error('Failed to join ritual:', error);
    } finally {
      setJoiningRitual(null);
    }
  };

  // Navigation functions
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    switch (view) {
      case 'month':
        navigateMonth(direction);
        break;
      case 'week':
        navigateWeek(direction);
        break;
      case 'day':
        navigateDay(direction);
        break;
    }
  };

  // Generate calendar days for month view
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  // Format date for display
  const formatDate = (date: Date, format: 'short' | 'long' | 'time' = 'short'): string => {
    if (format === 'time') {
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    }
    if (format === 'long') {
      return date.toLocaleDateString([], { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Render ritual instance card
  const renderRitualCard = (instance: RitualInstance, compact: boolean = false) => {
    const config = RITUAL_TYPE_CONFIG[instance.ritual.type];
    const Icon = config.icon;
    const startTime = new Date(instance.startTime);
    const isUpcoming = startTime > new Date();
    const isActive = instance.status === 'active';
    
    if (compact) {
      return (
        <motion.div
          key={instance.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "p-2 rounded-lg border text-xs",
            config.bgColor,
            "border-white/10 hover:border-white/20 transition-all cursor-pointer"
          )}
          onClick={() => onViewDetails?.(instance.ritualId, instance.id)}
        >
          <div className="flex items-center gap-1 mb-1">
            <Icon className={cn("h-3 w-3", config.color)} />
            <span className="font-medium text-[var(--hive-text-primary)] truncate">
              {instance.ritual.title}
            </span>
          </div>
          <div className="text-[var(--hive-text-secondary)]">
            {formatDate(startTime, 'time')}
          </div>
        </motion.div>
      );
    }
    
    return (
      <motion.div
        key={instance.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-[var(--hive-background-secondary)] rounded-xl border border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-glass)] transition-all"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-lg", config.bgColor)}>
              <Icon className={cn("h-5 w-5", config.color)} />
            </div>
            <div>
              <h4 className="font-semibold text-[var(--hive-text-primary)]">{instance.ritual.title}</h4>
              <p className="text-sm text-[var(--hive-text-secondary)]">{instance.ritual.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {instance.isUserParticipating && (
              <div className="w-2 h-2 bg-green-400 rounded-full" title="You're participating" />
            )}
            {instance.reminderSet && (
              <Bell className="h-4 w-4 text-[var(--hive-gold)]" />
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-[var(--hive-text-secondary)] mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formatDate(startTime, 'time')}</span>
            {instance.endTime && (
              <span> - {formatDate(new Date(instance.endTime), 'time')}</span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>
              {instance.ritual.currentParticipants}
              {instance.ritual.maxParticipants && `/${instance.ritual.maxParticipants}`}
            </span>
          </div>
          
          {instance.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{instance.location}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={cn("px-2 py-1 rounded text-xs font-medium", config.bgColor, config.color)}>
              {config.label}
            </span>
            {isActive && (
              <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-400">
                Live
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {!instance.reminderSet && onSetReminder && isUpcoming && (
              <button
                onClick={() => onSetReminder(instance.id)}
                className="p-2 text-[var(--hive-text-secondary)] hover:text-[var(--hive-gold)] hover:bg-[var(--hive-gold)]/10 rounded-lg transition-all"
                title="Set reminder"
              >
                <Bell className="h-4 w-4" />
              </button>
            )}
            
            <button
              onClick={() => onViewDetails?.(instance.ritualId, instance.id)}
              className="p-2 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)] rounded-lg transition-all"
              title="View details"
            >
              <Eye className="h-4 w-4" />
            </button>
            
            {!instance.isUserParticipating && instance.isUserEligible && isUpcoming && onJoinRitual && (
              <button
                onClick={() => handleJoinRitual(instance.ritualId, instance.id)}
                disabled={joiningRitual === instance.id}
                className="px-3 py-1.5 bg-[var(--hive-gold)] text-[var(--hive-black)] rounded-lg text-sm font-medium hover:bg-[var(--hive-gold)]/90 disabled:opacity-50"
              >
                {joiningRitual === instance.id ? 'Joining...' : 'Join'}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={cn("bg-[var(--hive-background-secondary)] rounded-xl border border-[var(--hive-border-subtle)]", className)}>
      {/* Header */}
      <div className="p-6 border-b border-[var(--hive-border-subtle)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">Ritual Calendar</h2>
            <p className="text-[var(--hive-text-secondary)]">
              {view === 'month' && MONTHS[currentDate.getMonth()] + ' ' + currentDate.getFullYear()}
              {view === 'week' && 'Week of ' + formatDate(currentDate, 'short')}
              {view === 'day' && formatDate(currentDate, 'long')}
              {view === 'list' && 'Upcoming Rituals'}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="flex bg-[var(--hive-background-tertiary)] rounded-lg p-1">
              {[
                { key: 'month', icon: Grid3X3 },
                { key: 'week', icon: CalendarIcon },
                { key: 'day', icon: Clock },
                { key: 'list', icon: List }
              ].map(({ key, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setView(key as 'month' | 'week' | 'day' | 'list')}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    view === key
                      ? "bg-[var(--hive-gold)] text-[var(--hive-black)]"
                      : "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-secondary)]"
                  )}
                  title={key.charAt(0).toUpperCase() + key.slice(1) + ' view'}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
            
            {/* Navigation */}
            {view !== 'list' && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleNavigate('prev')}
                  className="p-2 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)] rounded-lg transition-all"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 py-2 text-sm font-medium text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)] rounded-lg transition-all"
                >
                  Today
                </button>
                <button
                  onClick={() => handleNavigate('next')}
                  className="p-2 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)] rounded-lg transition-all"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[var(--hive-text-secondary)]" />
          <div className="flex gap-2 flex-wrap">
            {Object.entries(RITUAL_TYPE_CONFIG).map(([type, config]) => {
              const Icon = config.icon;
              const isSelected = selectedFilters.includes(type);
              
              return (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedFilters(prev => 
                      isSelected 
                        ? prev.filter(t => t !== type)
                        : [...prev, type]
                    );
                  }}
                  className={cn(
                    "flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-all",
                    isSelected
                      ? cn(config.bgColor, config.color, "border", "border-current")
                      : "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)]"
                  )}
                >
                  <Icon className="h-3 w-3" />
                  {config.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {view === 'month' && (
            <motion.div
              key="month"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-2">
                {WEEKDAYS.map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-[var(--hive-text-secondary)]">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {generateCalendarDays().map((date, index) => (
                  <div
                    key={index}
                    className={cn(
                      "min-h-[120px] p-2 border rounded-lg transition-all",
                      date 
                        ? "bg-[var(--hive-background-tertiary)] border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-glass)] cursor-pointer"
                        : "border-transparent"
                    )}
                    onClick={() => date && setSelectedDate(date)}
                  >
                    {date && (
                      <>
                        <div className={cn(
                          "text-sm font-medium mb-2",
                          date.toDateString() === new Date().toDateString()
                            ? "text-[var(--hive-gold)]"
                            : "text-[var(--hive-text-primary)]"
                        )}>
                          {date.getDate()}
                        </div>
                        <div className="space-y-1">
                          {getEventsForDate(date).slice(0, 3).map(instance => 
                            renderRitualCard(instance, true)
                          )}
                          {getEventsForDate(date).length > 3 && (
                            <div className="text-xs text-[var(--hive-text-secondary)] text-center pt-1">
                              +{getEventsForDate(date).length - 3} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          
          {view === 'week' && (
            <motion.div
              key="week"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-7 gap-4">
                {Array.from({ length: 7 }, (_, i) => {
                  const date = new Date(currentDate);
                  date.setDate(currentDate.getDate() - currentDate.getDay() + i);
                  const events = getEventsForDate(date);
                  
                  return (
                    <div key={i} className="space-y-2">
                      <div className="text-center">
                        <div className="text-sm font-medium text-[var(--hive-text-secondary)]">
                          {WEEKDAYS[i]}
                        </div>
                        <div className={cn(
                          "text-lg font-bold",
                          date.toDateString() === new Date().toDateString()
                            ? "text-[var(--hive-gold)]"
                            : "text-[var(--hive-text-primary)]"
                        )}>
                          {date.getDate()}
                        </div>
                      </div>
                      <div className="space-y-2">
                        {events.map(instance => renderRitualCard(instance, true))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
          
          {view === 'day' && (
            <motion.div
              key="day"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-[var(--hive-text-primary)]">
                  {formatDate(currentDate, 'long')}
                </h3>
              </div>
              
              <div className="space-y-4">
                {getEventsForDate(currentDate).length > 0 ? (
                  getEventsForDate(currentDate).map(instance => renderRitualCard(instance))
                ) : (
                  <div className="text-center py-12 text-[var(--hive-text-secondary)]">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No rituals scheduled for this day</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
          
          {view === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {filteredInstances.length > 0 ? (
                <div className="space-y-4">
                  {filteredInstances
                    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
                    .map(instance => renderRitualCard(instance))}
                </div>
              ) : (
                <div className="text-center py-12 text-[var(--hive-text-secondary)]">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No upcoming rituals found</p>
                  <p className="text-sm mt-2">Try adjusting your filters or check back later</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Selected Date Modal/Sidebar */}
      <AnimatePresence>
        {selectedDate && view === 'month' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--hive-background-primary)] rounded-xl border border-[var(--hive-border-subtle)] p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[var(--hive-text-primary)]">
                  {formatDate(selectedDate, 'long')}
                </h3>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="p-2 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)] rounded-lg transition-all"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                {getEventsForDate(selectedDate).length > 0 ? (
                  getEventsForDate(selectedDate).map(instance => renderRitualCard(instance))
                ) : (
                  <div className="text-center py-8 text-[var(--hive-text-secondary)]">
                    <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No rituals scheduled for this day</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}