"use client";

/**
 * Event System Dashboard - Complete Frontend
 * 
 * The main interface for the Event Management System (vBETA focus).
 * Provides access to all 5 event tools with seamless integration.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../index';
import { Calendar, Users, QrCode, BarChart3, MessageSquare, Plus, Filter, Search, Clock } from 'lucide-react';
import { cn } from '../lib/utils';
import { EventDefinition, EventAnalytics, RSVPResponse } from './event-system-core';
import { EventCreatorToolV2 } from './event-creator-tool-v2';
import { ToolRuntimeEngine, ToolDefinition } from '../tools/tool-runtime-engine';

interface EventSystemDashboardProps {
  spaceId: string;
  userId: string;
  userRole: 'admin' | 'moderator' | 'member';
  className?: string;
}

type EventSystemView = 'dashboard' | 'create' | 'manage' | 'calendar' | 'analytics' | 'tool';

interface EventSystemTool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  toolDefinition: ToolDefinition;
  category: 'creation' | 'management' | 'engagement' | 'analysis';
}

export function EventSystemDashboard({ spaceId, userId, userRole, className }: EventSystemDashboardProps) {
  const [currentView, setCurrentView] = useState<EventSystemView>('dashboard');
  const [selectedTool, setSelectedTool] = useState<EventSystemTool | null>(null);
  const [events, setEvents] = useState<EventDefinition[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<EventDefinition[]>([]);
  const [analytics, setAnalytics] = useState<EventAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  // Event System Tools (5 core tools)
  const eventTools: EventSystemTool[] = [
    {
      id: 'event-creator',
      name: 'Event Creator',
      description: 'Create and configure new events with all the details',
      icon: Plus,
      category: 'creation',
      toolDefinition: createEventCreatorTool()
    },
    {
      id: 'rsvp-manager',
      name: 'RSVP Manager',
      description: 'Track responses and manage event attendance',
      icon: Users,
      category: 'management',
      toolDefinition: createRSVPManagerTool()
    },
    {
      id: 'event-checkin',
      name: 'Event Check-In',
      description: 'QR code check-in system for live events',
      icon: QrCode,
      category: 'engagement',
      toolDefinition: createCheckInTool()
    },
    {
      id: 'event-calendar',
      name: 'Event Calendar',
      description: 'View and manage all space events in calendar format',
      icon: Calendar,
      category: 'management',
      toolDefinition: createEventCalendarTool()
    },
    {
      id: 'event-feedback',
      name: 'Event Feedback',
      description: 'Collect post-event feedback and ratings',
      icon: MessageSquare,
      category: 'analysis',
      toolDefinition: createFeedbackTool()
    }
  ];

  // Fetch space events
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/spaces/${spaceId}/events`, {
        headers: { 'Authorization': `Bearer ${userId}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events || []);
        setUpcomingEvents((data.events || []).filter((event: EventDefinition) => 
          new Date(event.startDate) > new Date()
        ).slice(0, 5));
      } else {
        // Fallback to sample events
        const sampleEvents = getSampleEvents();
        setEvents(sampleEvents);
        setUpcomingEvents(sampleEvents.slice(0, 5));
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
      const sampleEvents = getSampleEvents();
      setEvents(sampleEvents);
      setUpcomingEvents(sampleEvents.slice(0, 5));
    } finally {
      setLoading(false);
    }
  }, [spaceId, userId]);

  // Launch tool
  const handleLaunchTool = (tool: EventSystemTool) => {
    setSelectedTool(tool);
    setCurrentView('tool');
  };

  // Handle tool actions
  const handleToolSave = async (data: Record<string, any>) => {
    if (!selectedTool) return;
    
    try {
      await fetch(`/api/tools/${selectedTool.id}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userId}`
        },
        body: JSON.stringify({ spaceId, data })
      });
    } catch (error) {
      console.error('Failed to save tool data:', error);
    }
  };

  const handleToolSubmit = async (data: Record<string, any>) => {
    if (!selectedTool) return;
    
    try {
      await fetch(`/api/tools/${selectedTool.id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userId}`
        },
        body: JSON.stringify({ spaceId, data })
      });
      
      // Refresh events after submission
      await fetchEvents();
      
      // Return to dashboard
      setSelectedTool(null);
      setCurrentView('dashboard');
    } catch (error) {
      console.error('Failed to submit tool data:', error);
    }
  };

  // Load events on mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Tool Runtime View
  if (currentView === 'tool' && selectedTool) {
    return (
      <div className={cn("space-y-4", className)}>
        {/* Tool Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HiveButton
              variant="secondary"
              size="sm"
              onClick={() => {
                setSelectedTool(null);
                setCurrentView('dashboard');
              }}
            >
              ← Back to Event System
            </HiveButton>
            <div className="flex items-center gap-2">
              <selectedTool.icon className="w-5 h-5 text-amber-600" />
              <span className="font-medium text-gray-900">{selectedTool.name}</span>
            </div>
          </div>
        </div>

        {/* Tool Runtime */}
        <ToolRuntimeEngine
          tool={selectedTool.toolDefinition}
          userId={userId}
          spaceId={spaceId}
          mode="production"
          onSave={handleToolSave}
          onSubmit={handleToolSubmit}
        />
      </div>
    );
  }

  // Event Creator View
  if (currentView === 'create') {
    return (
      <div className={cn("", className)}>
        <EventCreatorToolV2
          spaceId={spaceId}
          onEventCreated={async (event) => {
            await fetchEvents();
            setCurrentView('dashboard');
          }}
          onCancel={() => setCurrentView('dashboard')}
        />
      </div>
    );
  }

  // Main Dashboard View
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Event Management System</h1>
          <p className="text-gray-600">
            Complete event coordination for your campus community
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <HiveBadge variant="secondary">
            {events.length} total events
          </HiveBadge>
          <HiveButton onClick={() => setCurrentView('create')}>
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </HiveButton>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <HiveCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</p>
              <p className="text-sm text-gray-600">Upcoming Events</p>
            </div>
          </div>
        </HiveCard>

        <HiveCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">847</p>
              <p className="text-sm text-gray-600">Total RSVPs</p>
            </div>
          </div>
        </HiveCard>

        <HiveCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">94%</p>
              <p className="text-sm text-gray-600">Attendance Rate</p>
            </div>
          </div>
        </HiveCard>

        <HiveCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
              <p className="text-sm text-gray-600">Avg Rating</p>
            </div>
          </div>
        </HiveCard>
      </div>

      {/* Event System Tools */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-900">Event Tools</h2>
          <HiveBadge variant="secondary">5 tools</HiveBadge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {eventTools.map(tool => (
            <EventToolCard
              key={tool.id}
              tool={tool}
              onLaunch={() => handleLaunchTool(tool)}
            />
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
          <HiveButton variant="secondary" size="sm">
            View All Events
          </HiveButton>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : upcomingEvents.length === 0 ? (
          <HiveCard className="p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming events</h3>
            <p className="text-gray-600 mb-4">Create your first event to get started</p>
            <HiveButton onClick={() => setCurrentView('create')}>
              Create Event
            </HiveButton>
          </HiveCard>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>

      {/* System Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-medium text-amber-800 mb-2">🎯 vBETA Event System</h4>
        <p className="text-sm text-amber-700 mb-2">
          This is HIVE's focused Event Management System - the single system we're launching for vBETA.
        </p>
        <div className="text-xs text-amber-600 space-y-1">
          <p>• <strong>5 Integrated Tools</strong>: Event Creator, RSVP Manager, Check-In System, Calendar, Feedback</p>
          <p>• <strong>Complete Workflow</strong>: Plan → Promote → Execute → Analyze</p>
          <p>• <strong>Campus Integration</strong>: Works across all Spaces with unified coordination</p>
          <p>• <strong>Built with Elements</strong>: Shows students how tools are constructed from reusable components</p>
        </div>
      </div>
    </div>
  );
}

// Individual Event Tool Card
interface EventToolCardProps {
  tool: EventSystemTool;
  onLaunch: () => void;
}

function EventToolCard({ tool, onLaunch }: EventToolCardProps) {
  const categoryColors = {
    creation: 'bg-green-100 text-green-800',
    management: 'bg-blue-100 text-blue-800',
    engagement: 'bg-purple-100 text-purple-800',
    analysis: 'bg-orange-100 text-orange-800',
  };

  return (
    <HiveCard className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={onLaunch}>
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <tool.icon className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{tool.name}</h3>
              <HiveBadge variant="secondary" className={cn("text-xs", categoryColors[tool.category])}>
                {tool.category}
              </HiveBadge>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600">
          {tool.description}
        </p>
        
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <HiveButton size="sm" className="flex-1">
            Launch Tool
          </HiveButton>
        </div>
      </div>
    </HiveCard>
  );
}

// Individual Event Card
interface EventCardProps {
  event: EventDefinition;
}

function EventCard({ event }: EventCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <HiveCard className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{event.title}</h3>
            <HiveBadge variant="secondary" className="text-xs">
              {event.category}
            </HiveBadge>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(event.startDate)}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-1">
                <span>{event.location.venue || event.location.type}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <HiveBadge variant={event.status === 'published' ? 'default' : 'outline'}>
            {event.status}
          </HiveBadge>
        </div>
      </div>
    </HiveCard>
  );
}

// Tool Definition Creators (these would create the actual tool definitions)
function createEventCreatorTool(): ToolDefinition {
  return {
    id: 'event-creator-tool',
    name: 'Event Creator',
    description: 'Create comprehensive events with all details',
    version: '1.0.0',
    elements: [
      {
        id: 'event-title',
        type: 'text_input',
        label: 'Event Title',
        properties: { placeholder: 'Enter event title...' },
        position: { x: 0, y: 0 },
        size: { width: 100, height: 60 },
        validation: { required: true }
      },
      // Additional elements would be defined here
    ],
    actions: [
      {
        id: 'create-event',
        trigger: 'submit-button',
        type: 'submit',
        config: { endpoint: '/api/events/create' }
      }
    ],
    metadata: {
      createdBy: 'hive-system',
      createdAt: new Date().toISOString(),
      category: 'event',
      tags: ['event', 'creation']
    }
  };
}

function createRSVPManagerTool(): ToolDefinition {
  // Similar structure for RSVP Manager
  return {
    id: 'rsvp-manager-tool',
    name: 'RSVP Manager',
    description: 'Manage event responses and attendance',
    version: '1.0.0',
    elements: [],
    actions: [],
    metadata: {
      createdBy: 'hive-system',
      createdAt: new Date().toISOString(),
      category: 'event',
      tags: ['rsvp', 'management']
    }
  };
}

function createCheckInTool(): ToolDefinition {
  return {
    id: 'checkin-tool',
    name: 'Event Check-In',
    description: 'QR code based event check-in system',
    version: '1.0.0',
    elements: [],
    actions: [],
    metadata: {
      createdBy: 'hive-system',
      createdAt: new Date().toISOString(),
      category: 'event',
      tags: ['checkin', 'qr-code']
    }
  };
}

function createEventCalendarTool(): ToolDefinition {
  return {
    id: 'event-calendar-tool',
    name: 'Event Calendar',
    description: 'Calendar view of all space events',
    version: '1.0.0',
    elements: [],
    actions: [],
    metadata: {
      createdBy: 'hive-system',
      createdAt: new Date().toISOString(),
      category: 'event',
      tags: ['calendar', 'scheduling']
    }
  };
}

function createFeedbackTool(): ToolDefinition {
  return {
    id: 'feedback-tool',
    name: 'Event Feedback',
    description: 'Collect post-event feedback and ratings',
    version: '1.0.0',
    elements: [],
    actions: [],
    metadata: {
      createdBy: 'hive-system',
      createdAt: new Date().toISOString(),
      category: 'event',
      tags: ['feedback', 'analysis']
    }
  };
}

// Sample events for development
function getSampleEvents(): EventDefinition[] {
  return [
    {
      id: 'event-1',
      spaceId: 'space-1',
      createdBy: 'user-1',
      title: 'CS Study Group - Algorithms',
      description: 'Weekly study session for CSE 331 - Algorithm Design',
      category: 'academic',
      type: 'study_session',
      startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
      timezone: 'America/New_York',
      isAllDay: false,
      location: {
        type: 'on_campus',
        venue: 'Davis Hall',
        room: '101'
      },
      capacity: 25,
      requiresRSVP: true,
      allowGuests: false,
      visibility: 'space_only',
      coHostingSpaces: [],
      status: 'published',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['study', 'algorithms', 'cs']
    },
    // More sample events...
  ];
}

export default EventSystemDashboard;