'use client';

import { useState, useEffect } from 'react';
import { HiveCard, HiveButton, Badge } from '@hive/ui';
import {
  Users,
  Calendar,
  FileText,
  Wrench,
  ChevronLeft,
  ChevronRight,
  Clock,
  Link,
  File,
  Video,
  ClipboardList,
  Archive,
  Eye
} from 'lucide-react';
import { api } from '@/lib/api-client';
import { formatDistanceToNow } from 'date-fns';
import { ToolsWidget } from './tools-widget';

interface SpaceSidebarProps {
  spaceId: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenPanel: (panel: string) => void;
  membership: any;
}

interface OnlineMember {
  id: string;
  name: string;
  avatar?: string;
  lastActive: Date;
}

interface UpcomingEvent {
  id: string;
  title: string;
  type: 'event' | 'deadline' | 'meeting';
  startTime: Date;
  endTime: Date;
  attendees: number;
}

interface Resource {
  id: string;
  title: string;
  type: 'document' | 'link' | 'media' | 'form';
  viewCount: number;
  uploadedBy: string;
}

export function SpaceSidebar({
  spaceId,
  collapsed,
  onToggleCollapse,
  onOpenPanel,
  membership
}: SpaceSidebarProps) {
  const [onlineMembers, setOnlineMembers] = useState<OnlineMember[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [pinnedResources, setPinnedResources] = useState<Resource[]>([]);
  const [installedTools, setInstalledTools] = useState<any[]>([]);

  useEffect(() => {
    if (spaceId) {
      loadSidebarData();
      const interval = setInterval(loadSidebarData, 30000); // Refresh every 30s
      return () => clearInterval(interval);
    }
  }, [spaceId]);

  const loadSidebarData = async () => {
    try {
      // Load online members
      const membersResponse = await api.get(`/api/spaces/${spaceId}/members`, {
        params: { online: true, limit: 10 }
      });
      setOnlineMembers(membersResponse.members || []);

      // Load upcoming events
      const eventsResponse = await api.get(`/api/spaces/${spaceId}/events`, {
        params: { upcoming: true, limit: 3 }
      });
      setUpcomingEvents(eventsResponse.events || []);

      // Load pinned resources
      const resourcesResponse = await api.get(`/api/spaces/${spaceId}/resources`, {
        params: { pinned: true, limit: 5 }
      });
      setPinnedResources(resourcesResponse.resources || []);

      // Load installed tools
      const toolsResponse = await api.get(`/api/spaces/${spaceId}/tools`);
      setInstalledTools(toolsResponse.tools || []);
    } catch (error) {
      console.error('Failed to load sidebar data:', error);
    }
  };

  if (collapsed) {
    return (
      <div className="p-2">
        <HiveButton
          size="sm"
          variant="ghost"
          onClick={onToggleCollapse}
          className="mb-4"
        >
          <ChevronRight className="w-4 h-4" />
        </HiveButton>

        {/* Collapsed icons */}
        <div className="space-y-4">
          <button
            onClick={() => onOpenPanel('members')}
            className="relative p-2 hover:bg-gray-800 rounded"
          >
            <Users className="w-5 h-5 text-gray-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
          </button>

          <button
            onClick={() => onOpenPanel('events')}
            className="p-2 hover:bg-gray-800 rounded"
          >
            <Calendar className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => onOpenPanel('resources')}
            className="p-2 hover:bg-gray-800 rounded"
          >
            <FileText className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => onOpenPanel('tools')}
            className="p-2 hover:bg-gray-800 rounded"
          >
            <Wrench className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Collapse Button */}
      <HiveButton
        size="sm"
        variant="ghost"
        onClick={onToggleCollapse}
        className="mb-2"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Collapse
      </HiveButton>

      {/* Members Widget */}
      <HiveCard className="bg-gray-900/50 border-gray-800 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Users className="w-4 h-4" />
            Members
          </h3>
          <button
            onClick={() => onOpenPanel('members')}
            className="text-xs text-gray-400 hover:text-white"
          >
            View all
          </button>
        </div>

        {/* Online Count */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-400">
            {onlineMembers.length} online now
          </span>
        </div>

        {/* Avatar Stack */}
        <div className="flex -space-x-2">
          {onlineMembers.slice(0, 8).map((member) => (
            <div
              key={member.id}
              className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-900"
              title={member.name}
            />
          ))}
          {onlineMembers.length > 8 && (
            <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-900 flex items-center justify-center">
              <span className="text-xs text-gray-400">
                +{onlineMembers.length - 8}
              </span>
            </div>
          )}
        </div>
      </HiveCard>

      {/* Events Widget */}
      <HiveCard className="bg-gray-900/50 border-gray-800 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Events
          </h3>
          <button
            onClick={() => onOpenPanel('events')}
            className="text-xs text-gray-400 hover:text-white"
          >
            View all
          </button>
        </div>

        {upcomingEvents.length === 0 ? (
          <p className="text-sm text-gray-500">No upcoming events</p>
        ) : (
          <div className="space-y-2">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="p-2 bg-gray-800/50 rounded cursor-pointer hover:bg-gray-800"
                onClick={() => onOpenPanel(`event-${event.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-white line-clamp-1">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {getEventTimeDisplay(event)}
                    </p>
                  </div>
                  <Badge
                    className={`text-xs ${
                      event.type === 'deadline'
                        ? 'bg-red-500/20 text-red-400'
                        : event.type === 'meeting'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {event.type}
                  </Badge>
                </div>

                {/* Countdown for today's events */}
                {isToday(event.startTime) && (
                  <div className="mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[var(--hive-brand-primary)]" />
                    <span className="text-xs text-[var(--hive-brand-primary)]">
                      {getCountdown(event.startTime)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </HiveCard>

      {/* Resources Widget */}
      <HiveCard className="bg-gray-900/50 border-gray-800 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Resources
          </h3>
          <button
            onClick={() => onOpenPanel('resources')}
            className="text-xs text-gray-400 hover:text-white"
          >
            View all
          </button>
        </div>

        {pinnedResources.length === 0 ? (
          <p className="text-sm text-gray-500">No pinned resources</p>
        ) : (
          <div className="space-y-2">
            {pinnedResources.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center gap-2 p-2 bg-gray-800/50 rounded hover:bg-gray-800 cursor-pointer"
              >
                {getResourceIcon(resource.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">
                    {resource.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {resource.viewCount} views
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </HiveCard>

      {/* Tools Widget */}
      <ToolsWidget
        spaceId={spaceId}
        userRole={membership?.role || 'guest'}
        canCreateEvents={['owner', 'leader', 'moderator'].includes(membership?.role)}
        canCreatePolls={Boolean(membership)}
        canCreateTasks={['owner', 'leader', 'moderator'].includes(membership?.role)}
        canCreateResources={Boolean(membership)}
        onToolUsed={(toolType, data) => {
          // Refresh sidebar data after tool usage
          loadSidebarData();
        }}
      />
    </div>
  );
}

// Helper functions
function getEventTimeDisplay(event: UpcomingEvent): string {
  const now = new Date();
  const start = new Date(event.startTime);
  const hoursDiff = (start.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursDiff < 0) {
    return 'Happening now';
  } else if (hoursDiff < 24) {
    return `Today at ${start.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    })}`;
  } else if (hoursDiff < 48) {
    return `Tomorrow at ${start.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    })}`;
  } else {
    return start.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }
}

function isToday(date: Date): boolean {
  const today = new Date();
  const d = new Date(date);
  return d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
}

function getCountdown(date: Date): string {
  const now = new Date();
  const target = new Date(date);
  const diff = target.getTime() - now.getTime();

  if (diff < 0) return 'Started';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function getResourceIcon(type: string) {
  switch (type) {
    case 'document':
      return <File className="w-4 h-4 text-blue-400" />;
    case 'link':
      return <Link className="w-4 h-4 text-green-400" />;
    case 'media':
      return <Video className="w-4 h-4 text-purple-400" />;
    case 'form':
      return <ClipboardList className="w-4 h-4 text-yellow-400" />;
    default:
      return <Archive className="w-4 h-4 text-gray-400" />;
  }
}