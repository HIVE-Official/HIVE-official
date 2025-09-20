"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff,
  Star,
  Search,
  Filter,
  Grid,
  List,
  BarChart3,
  UserCheck,
  UserX,
  MessageSquare,
  Share2,
  Download,
  Upload,
  Settings,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Bell,
  BellOff,
  Copy,
  ExternalLink,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../atomic/atoms/button';
import { Badge } from '../../atomic/atoms/badge';
import { type Space } from '@hive/core';

export interface EventManagerToolProps {
  spaceId: string;
  spaceName: string;
  isLeader?: boolean;
  currentUserRole?: 'owner' | 'admin' | 'moderator' | 'member';
  leaderMode?: 'moderate' | 'manage' | 'configure' | 'insights' | null;
  onEventAction?: (eventId: string, action: string, data?: any) => void;
  authenticatedFetch?: (url: string, options?: RequestInit) => Promise<Response>;
  className?: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  isVirtual: boolean;
  maxCapacity?: number;
  currentAttendees: number;
  waitlistCount: number;
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
  visibility: 'public' | 'members' | 'leaders';
  createdBy: string;
  createdAt: Date;
  tags: string[];
  rsvpDeadline?: Date;
  requiresApproval: boolean;
  attendees: Array<{
    id: string;
    name: string;
    avatar?: string;
    status: 'going' | 'maybe' | 'not_going' | 'waitlist';
    rsvpedAt: Date;
  }>;
  analytics?: {
    views: number;
    clicks: number;
    shares: number;
    conversationRate: number;
  };
}

export function EventManagerTool({
  spaceId,
  spaceName,
  isLeader = false,
  currentUserRole = 'member',
  leaderMode,
  onEventAction,
  authenticatedFetch,
  className
}: EventManagerToolProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Event['status']>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'calendar'>('list');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch events data from API
  useEffect(() => {
    async function fetchEvents() {
      try {
        const fetchFunction = authenticatedFetch || fetch;
        const response = await fetchFunction(`/api/spaces/${spaceId}/events?limit=50&upcoming=true`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.status}`);
        }

        const data = await response.json();
        const apiEvents = data.events || [];

        // Transform API data to match Event interface
        const transformedEvents: Event[] = apiEvents.map((event: any) => ({
          id: event.id,
          title: event.title || 'Untitled Event',
          description: event.description || '',
          startDate: new Date(event.startDate || Date.now()),
          endDate: new Date(event.endDate || Date.now()),
          location: event.location || event.virtualLink || 'Location TBD',
          isVirtual: event.virtualLink ? true : false,
          maxCapacity: event.maxAttendees,
          currentAttendees: event.currentAttendees || 0,
          waitlistCount: 0, // Not implemented in API yet
          status: event.status || 'draft',
          visibility: event.isPrivate ? 'members' : 'public',
          createdBy: event.organizer?.fullName || event.organizer?.handle || 'Unknown',
          createdAt: new Date(event.createdAt || Date.now()),
          tags: event.tags || [],
          rsvpDeadline: event.rsvpDeadline ? new Date(event.rsvpDeadline) : undefined,
          requiresApproval: event.requiredRSVP || false,
          attendees: [], // Would need separate API call to get full attendee list
          analytics: {
            views: 0, // Not implemented yet
            clicks: 0,
            shares: 0,
            conversationRate: 0
          }
        }));

        setEvents(transformedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Fallback to empty array on error
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, [spaceId, authenticatedFetch]);

  const handleEventAction = async (eventId: string, action: string, data?: any) => {
    try {
      const fetchFunction = authenticatedFetch || fetch;
      
      switch (action) {
        case 'create': {
          const response = await fetchFunction(`/api/spaces/${spaceId}/events`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })};
          
          if (!response.ok) {
            throw new Error(`Failed to create event: ${response.status}`);
          }
          
          break;
        }
        
        case 'edit':
        case 'update': {
          const response = await fetchFunction(`/api/spaces/${spaceId}/events/${eventId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })};
          
          if (!response.ok) {
            throw new Error(`Failed to update event: ${response.status}`);
          }
          
          break;
        }
        
        case 'delete': {
          const response = await fetchFunction(`/api/spaces/${spaceId}/events/${eventId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          })};
          
          if (!response.ok) {
            throw new Error(`Failed to delete event: ${response.status}`);
          }
          
          break;
        }
        
        case 'publish': {
          const response = await fetchFunction(`/api/spaces/${spaceId}/events/${eventId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'published' }),
          })};
          
          if (!response.ok) {
            throw new Error(`Failed to publish event: ${response.status}`);
          }
          
          break;
        }
        
        case 'cancel': {
          const response = await fetchFunction(`/api/spaces/${spaceId}/events/${eventId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'cancelled' }),
          })};
          
          if (!response.ok) {
            throw new Error(`Failed to cancel event: ${response.status}`);
          }
          
          break;
        }
        
        case 'rsvp': {
          const response = await fetchFunction(`/api/spaces/${spaceId}/events/${eventId}/rsvp`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: data?.status || 'going' }),
          })};
          
          if (!response.ok) {
            throw new Error(`Failed to RSVP to event: ${response.status}`);
          }
          
          break;
        }
        
        case 'share': {
          // This would integrate with sharing functionality
          // For now, just trigger the callback
          if (onEventAction) {
            onEventAction(eventId, action, data);
          }
          return;
        }
        
        case 'copy': {
          // This would copy event details to clipboard
          if (onEventAction) {
            onEventAction(eventId, action, data);
          }
          return;
        }
        
        case 'analytics': {
          // This would show analytics for the event
          if (onEventAction) {
            onEventAction(eventId, action, data);
          }
          return;
        }
        
        default:
          if (onEventAction) {
            onEventAction(eventId, action, data);
          }
          return;
      }
      
      // Refresh event data after successful action
      const refreshFetchFunction = authenticatedFetch || fetch;
      const response = await refreshFetchFunction(`/api/spaces/${spaceId}/events?limit=50&upcoming=true`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })};

      if (response.ok) {
        const data = await response.json();
        const apiEvents = data.events || [];
        const transformedEvents = apiEvents.map((event: any) => ({
          id: event.id,
          title: event.title || 'Untitled Event',
          description: event.description || '',
          startDate: new Date(event.startDate || Date.now()),
          endDate: new Date(event.endDate || Date.now()),
          location: event.location || event.virtualLink || 'Location TBD',
          isVirtual: event.virtualLink ? true : false,
          maxCapacity: event.maxAttendees,
          currentAttendees: event.currentAttendees || 0,
          waitlistCount: 0,
          status: event.status || 'draft',
          visibility: event.isPrivate ? 'members' : 'public',
          createdBy: event.organizer?.fullName || event.organizer?.handle || 'Unknown',
          createdAt: new Date(event.createdAt || Date.now()),
          tags: event.tags || [],
          rsvpDeadline: event.rsvpDeadline ? new Date(event.rsvpDeadline) : undefined,
          requiresApproval: event.requiredRSVP || false,
          attendees: [],
          analytics: {
            views: 0,
            clicks: 0,
            shares: 0,
            conversationRate: 0
          }
        }));
        setEvents(transformedEvents);
      }
      
      // Also trigger callback for any additional handling
      if (onEventAction) {
        onEventAction(eventId, action, data);
      }
      
    } catch (error) {
      console.error(`Error performing event action ${action}:`, error);
      // You might want to show a toast notification here
      throw error;
    }
  };

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    return events
      .filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      })}
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [events, searchQuery, statusFilter]);

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'draft': return 'text-gray-400 bg-gray-500/20';
      case 'published': return 'text-green-400 bg-green-500/20';
      case 'ongoing': return 'text-blue-400 bg-blue-500/20';
      case 'completed': return 'text-purple-400 bg-purple-500/20';
      case 'cancelled': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status: Event['status']) => {
    switch (status) {
      case 'draft': return Eye;
      case 'published': return CheckCircle;
      case 'ongoing': return Activity;
      case 'completed': return Star;
      case 'cancelled': return XCircle;
      default: return AlertCircle;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };

  const getCapacityColor = (current: number, max?: number) => {
    if (!max) return 'text-gray-400';
    const percentage = current / max;
    if (percentage >= 0.9) return 'text-red-400';
    if (percentage >= 0.7) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-[#FFD700]" />
          <h2 className="text-xl font-semibold text-white">Event Manager</h2>
          <Badge variant="info" className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
            {filteredEvents.length} events
          </Badge>
        </div>

        {isLeader && (
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="border-green-500/30 text-green-400 hover:bg-green-500/10"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Create Event
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700]/10"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search events, descriptions, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/[0.02] border border-white/[0.06] rounded-lg text-white placeholder-neutral-400 focus:border-[#FFD700]/30 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 bg-white/[0.02] border border-white/[0.06] rounded-lg text-white focus:border-[#FFD700]/30 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="flex items-center bg-white/[0.02] border border-white/[0.06] rounded-lg">
            {(['list', 'grid', 'calendar'] as const).map((mode, index) => {
              const icons = { list: List, grid: Grid, calendar: Calendar };
              const Icon = icons[mode];
              return (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={cn(
                    "p-2 transition-colors capitalize",
                    viewMode === mode 
                      ? "bg-[#FFD700]/20 text-[#FFD700]" 
                      : "text-neutral-400 hover:text-white",
                    index === 0 && "rounded-l-lg",
                    index === 2 && "rounded-r-lg"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Events List/Grid */}
      <div className={cn(
        viewMode === 'grid' 
          ? "grid grid-cols-1 lg:grid-cols-2 gap-4"
          : "space-y-4"
      )}>
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 animate-pulse">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-white/10 rounded w-3/4" />
                  <div className="h-4 bg-white/10 rounded w-full" />
                  <div className="h-4 bg-white/10 rounded w-2/3" />
                </div>
                <div className="w-16 h-6 bg-white/10 rounded ml-3" />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="h-4 bg-white/10 rounded" />
                <div className="h-4 bg-white/10 rounded" />
                <div className="h-4 bg-white/10 rounded" />
                <div className="h-4 bg-white/10 rounded" />
              </div>
              <div className="flex gap-2 mb-3">
                <div className="h-5 bg-white/10 rounded w-16" />
                <div className="h-5 bg-white/10 rounded w-20" />
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <div className="h-8 bg-white/10 rounded w-20" />
                  <div className="h-8 bg-white/10 rounded w-16" />
                </div>
                <div className="flex gap-1">
                  <div className="w-8 h-8 bg-white/10 rounded" />
                  <div className="w-8 h-8 bg-white/10 rounded" />
                </div>
              </div>
            </div>
          ))
        ) : filteredEvents.map((event) => {
          const StatusIcon = getStatusIcon(event.status);
          const capacityColor = getCapacityColor(event.currentAttendees, event.maxCapacity);
          
          return (
            <motion.div
              key={event.id}
              className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.1] transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              layout
            >
              {/* Event Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white truncate">{event.title}</h3>
                    {event.isVirtual && (
                      <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-400">
                        Virtual
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-neutral-400 line-clamp-2 mb-2">
                    {event.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 ml-3">
                  <div className={cn("flex items-center gap-1 px-2 py-1 rounded-full text-xs", getStatusColor(event.status))}>
                    <StatusIcon className="h-3 w-3" />
                    <span className="capitalize">{event.status}</span>
                  </div>
                  
                  {isLeader && (
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEventAction(event.id, 'edit')}
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEventAction(event.id, 'delete')}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div className="flex items-center gap-2 text-neutral-400">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(event.startDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-neutral-400" />
                  <span className={capacityColor}>
                    {event.currentAttendees}{event.maxCapacity && `/${event.maxCapacity}`}
                  </span>
                  {event.waitlistCount > 0 && (
                    <span className="text-yellow-400">+{event.waitlistCount} waitlist</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <Calendar className="h-4 w-4" />
                  <span>Created {formatDate(event.createdAt)}</span>
                </div>
              </div>

              {/* Event Tags */}
              {event.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {event.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-purple-500/20 text-purple-300"
                    >
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

              {/* Analytics (Insights Mode) */}
              {leaderMode === 'insights' && event.analytics && (
                <motion.div
                  className="mb-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <div className="grid grid-cols-4 gap-3 text-center">
                    <div>
                      <div className="text-sm font-bold text-blue-400">{event.analytics.views}</div>
                      <div className="text-xs text-neutral-400">Views</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-green-400">{event.analytics.clicks}</div>
                      <div className="text-xs text-neutral-400">Clicks</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-yellow-400">{event.analytics.shares}</div>
                      <div className="text-xs text-neutral-400">Shares</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-purple-400">{Math.round(event.analytics.conversationRate * 100)}%</div>
                      <div className="text-xs text-neutral-400">Conversion</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-xs"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  {event.status === 'published' && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-xs border-green-500/30 text-green-400 hover:bg-green-500/10"
                    >
                      <UserCheck className="h-3 w-3 mr-1" />
                      RSVP
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEventAction(event.id, 'share')}
                  >
                    <Share2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEventAction(event.id, 'copy')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  {isLeader && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEventAction(event.id, 'analytics')}
                    >
                      <BarChart3 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Calendar className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Events Found</h3>
          <p className="text-neutral-400 text-sm mb-6">
            {searchQuery || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Create your first event to get started'
            }
          </p>
          {isLeader && !searchQuery && statusFilter === 'all' && (
            <Button
              variant="secondary"
              onClick={() => setShowCreateModal(true)}
              className="border-green-500/30 text-green-400 hover:bg-green-500/10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create First Event
            </Button>
          )}
        </motion.div>
      )}

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="bg-[#0A0A0A] border border-white/[0.1] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">{selectedEvent.title}</h2>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedEvent(null)}
                  >
                    ✕
                  </Button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-6">
                  <p className="text-neutral-300 leading-relaxed">{selectedEvent.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Event Details</h4>
                      <div className="space-y-2 text-sm text-neutral-400">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{formatDate(selectedEvent.startDate)} - {formatDate(selectedEvent.endDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{selectedEvent.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{selectedEvent.currentAttendees} attending</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Attendees</h4>
                      <div className="space-y-2">
                        {selectedEvent.attendees.slice(0, 5).map((attendee) => (
                          <div key={attendee.id} className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-purple-500/20 flex items-center justify-center">
                              {attendee.avatar ? (
                                <img src={attendee.avatar} alt={attendee.name} className="w-5 h-5 rounded-full" />
                              ) : (
                                <span className="text-xs font-bold text-white">{attendee.name.charAt(0)}</span>
                              )}
                            </div>
                            <span className="text-sm text-white">{attendee.name}</span>
                            <Badge variant="secondary" className="text-xs capitalize">
                              {attendee.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        ))}
                        {selectedEvent.attendees.length > 5 && (
                          <div className="text-xs text-neutral-400">
                            +{selectedEvent.attendees.length - 5} more attendees
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      {selectedEvent.status === 'published' && (
                        <Button className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30">
                          <UserCheck className="h-4 w-4 mr-2" />
                          RSVP Now
                        </Button>
                      )}
                      <Button variant="secondary">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>

                    {isLeader && (
                      <div className="flex items-center gap-2">
                        <Button variant="secondary" size="sm">
                          <Edit3 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="secondary" size="sm">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Analytics
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}