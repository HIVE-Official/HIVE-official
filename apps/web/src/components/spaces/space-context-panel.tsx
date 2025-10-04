"use client";

import { useState } from 'react';
import {
  Users,
  Calendar,
  Bell,
  Settings,
  Plus,
  Activity,
  Clock,
  MapPin,
  Star,
  TrendingUp,
  Zap
} from 'lucide-react';
import {
  Card,
  Button,
  Badge,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Progress
} from '@hive/ui';
import type { Space, User } from '@hive/core';
import { SpaceToolRenderer } from './space-tool-renderer';
import type { SpaceTypeRules } from '@/lib/space-type-rules';

interface SpaceContextPanelProps {
  space: Space;
  userMembership: any;
  onlineMembers: User[];
  contextualTools: any[];
  userPermissions: {
    isMember: boolean;
    isAdmin: boolean;
    isModerator?: boolean;
    role?: string;
  };
  spaceRules: SpaceTypeRules | null;
  onToolInteraction: (toolId: string, action: string) => void;
}

export function SpaceContextPanel({
  space,
  userMembership,
  onlineMembers,
  contextualTools,
  userPermissions,
  spaceRules,
  onToolInteraction
}: SpaceContextPanelProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('quick-info');

  // Mock recent activity - in real app, this would come from API
  const recentActivity = [
    { type: 'member_joined', user: 'Sarah Chen', time: '2 min ago' },
    { type: 'post_created', user: 'Mike Johnson', time: '15 min ago' },
    { type: 'event_created', user: 'Alex Rivera', time: '1 hour ago' }
  ];

  // Mock upcoming events - in real app, this would come from API
  const upcomingEvents = [
    { id: '1', title: 'Weekly Meeting', time: 'Today 3:00 PM', attendees: 12 },
    { id: '2', title: 'Project Presentation', time: 'Tomorrow 10:00 AM', attendees: 8 }
  ];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-4">

      {/* Quick Space Info */}
      <Card className="bg-gray-900/50 border-gray-800 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Space Info</h3>
          {userPermissions.isAdmin && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToolInteraction('space-settings', 'open')}
            >
              <Settings className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div className="space-y-3">
          {/* Space Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-[var(--hive-brand-primary)]">{space.memberCount || 0}</div>
              <div className="text-xs text-gray-400">Members</div>
            </div>
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{onlineMembers.length}</div>
              <div className="text-xs text-gray-400">Online</div>
            </div>
          </div>

          {/* Space Type Info */}
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="freshman" className="border-[var(--hive-brand-primary)]/30 text-[var(--hive-brand-primary)]">
              {space.type?.replace('_', ' ') || 'Community'}
            </Badge>
            {space.status === 'activated' && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-400">Active</span>
              </div>
            )}
          </div>

          {/* Join/Leave Button */}
          {!userPermissions.isMember ? (
            <Button
              className="w-full bg-[var(--hive-brand-primary)] text-black hover:bg-yellow-400"
              onClick={() => onToolInteraction('space-membership', 'join')}
            >
              Join Space
            </Button>
          ) : userPermissions.isAdmin ? (
            <Button
              variant="outline"
              className="w-full border-[var(--hive-brand-primary)]/30 text-[var(--hive-brand-primary)]"
              onClick={() => onToolInteraction('space-management', 'open')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Manage Space
            </Button>
          ) : null}
        </div>
      </Card>

      {/* Online Members */}
      {onlineMembers.length > 0 && (
        <Card className="bg-gray-900/50 border-gray-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Online Now
            </h4>
            <span className="text-xs text-gray-400">{onlineMembers.length}</span>
          </div>
          <div className="space-y-2">
            {onlineMembers.slice(0, 5).map((member, index) => (
              <div key={index} className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={(member as any).avatarUrl} />
                  <AvatarFallback className="bg-[var(--hive-brand-primary)] text-black text-xs">
                    {(member as any).name?.[0] || '?'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">
                    {(member as any).name || 'Unknown User'}
                  </div>
                  <div className="text-xs text-gray-400">
                    {(member as any).role || 'Member'}
                  </div>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full" />
              </div>
            ))}
            {onlineMembers.length > 5 && (
              <div className="text-xs text-gray-400 text-center pt-2">
                +{onlineMembers.length - 5} more online
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Contextual Tools */}
      {contextualTools.length > 0 && (
        <div className="space-y-3">
          {contextualTools.map(tool => (
            <Card key={tool.id} className="bg-gray-900/50 border-gray-800 p-4">
              <SpaceToolRenderer
                tool={tool}
                spaceId={space.id}
                spaceType={space.type as string}
                userPermissions={{
                  userId: userMembership?.userId || '',
                  spaceId: space.id,
                  role: userPermissions.role || 'guest'
                } as any}
                spaceRules={spaceRules}
                position="contextual"
              />
            </Card>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      {userPermissions.isMember && (
        <Card className="bg-gray-900/50 border-gray-800 p-4">
          <h4 className="font-semibold text-white mb-3">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:text-white"
              onClick={() => onToolInteraction('create-post', 'open')}
            >
              <Plus className="w-4 h-4 mr-1" />
              Post
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:text-white"
              onClick={() => onToolInteraction('create-event', 'open')}
            >
              <Calendar className="w-4 h-4 mr-1" />
              Event
            </Button>
            {userPermissions.isAdmin && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:text-white"
                  onClick={() => onToolInteraction('invite-members', 'open')}
                >
                  <Users className="w-4 h-4 mr-1" />
                  Invite
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:text-white"
                  onClick={() => onToolInteraction('space-analytics', 'open')}
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Stats
                </Button>
              </>
            )}
          </div>
        </Card>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <Card className="bg-gray-900/50 border-gray-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Upcoming
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToolInteraction('view-calendar', 'open')}
            >
              <span className="text-xs text-[var(--hive-brand-primary)]">View All</span>
            </Button>
          </div>
          <div className="space-y-3">
            {upcomingEvents.slice(0, 2).map(event => (
              <div
                key={event.id}
                className="p-3 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-800/70 transition-colors"
                onClick={() => onToolInteraction('view-event', event.id)}
              >
                <div className="text-sm font-medium text-white mb-1">
                  {event.title}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {event.attendees}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recent Activity */}
      <Card className="bg-gray-900/50 border-gray-800 p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-white flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Recent Activity
          </h4>
        </div>
        <div className="space-y-2">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-[var(--hive-brand-primary)] rounded-full flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-white font-medium">{activity.user}</span>
                <span className="text-gray-400 ml-1">
                  {activity.type === 'member_joined' && 'joined the space'}
                  {activity.type === 'post_created' && 'created a post'}
                  {activity.type === 'event_created' && 'created an event'}
                </span>
              </div>
              <span className="text-xs text-gray-500 flex-shrink-0">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Space Rules/Guidelines (for Greek Life and Residential) */}
      {((space.type as string) === 'greek_life_spaces' || (space.type as string) === 'residential_spaces') && (
        <Card className="bg-gray-900/50 border-gray-800 p-4">
          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-[var(--hive-brand-primary)]" />
            {(space.type as string) === 'greek_life_spaces' ? 'Chapter Guidelines' : 'Community Guidelines'}
          </h4>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="p-2 bg-gray-800/30 rounded">
              <div className="text-[var(--hive-brand-primary)] font-medium mb-1">
                {(space.type as string) === 'greek_life_spaces' ? 'Brotherhood/Sisterhood Values' : 'Respectful Living'}
              </div>
              <div className="text-xs text-gray-400">
                {(space.type as string) === 'greek_life_spaces'
                  ? 'Honor our traditions and support each other'
                  : 'Be considerate of your neighbors and shared spaces'
                }
              </div>
            </div>
          </div>
        </Card>
      )}

    </div>
  );
}