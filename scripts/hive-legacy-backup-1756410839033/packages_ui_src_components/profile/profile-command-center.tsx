/**
 * ProfileCommandCenter - Campus Command Center for UB Students
 * 
 * The Profile is NOT a social media profile - it's a functional command center
 * that connects students to their campus communities through:
 * 1. Active spaces with quick access
 * 2. Tools they've built and their community impact
 * 3. Recent activity and coordination opportunities
 * 4. Calendar integration for campus events
 */

'use client';

import React from 'react';
import { Calendar, Users, Zap, Activity, MessageSquare, Plus } from 'lucide-react';
import { cn } from '../lib/utils';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export interface ProfileUser {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  major?: string;
  year?: string;
  location?: string; // Dorm/residence
}

export interface ActiveSpace {
  id: string;
  name: string;
  memberCount: number;
  recentActivity?: string;
  unreadCount?: number;
}

export interface BuiltTool {
  id: string;
  name: string;
  category: string;
  usageCount: number;
  spaceContext?: string;
}

export interface RecentActivity {
  id: string;
  type: 'post' | 'tool_shared' | 'space_joined' | 'event_created';
  content: string;
  timestamp: string;
  spaceContext?: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  time: string;
  location?: string;
  spaceContext?: string;
}

export interface ProfileCommandCenterProps {
  user: ProfileUser;
  activeSpaces: ActiveSpace[];
  builtTools: BuiltTool[];
  recentActivity: RecentActivity[];
  upcomingEvents: UpcomingEvent[];
  onViewSpace?: (spaceId: string) => void;
  onViewTool?: (toolId: string) => void;
  onJoinSpace?: () => void;
  onCreateTool?: () => void;
  onViewAllActivity?: () => void;
  onViewCalendar?: () => void;
  className?: string;
}

export function ProfileCommandCenter({
  user,
  activeSpaces,
  builtTools,
  recentActivity,
  upcomingEvents,
  onViewSpace,
  onViewTool,
  onJoinSpace,
  onCreateTool,
  onViewAllActivity,
  onViewCalendar,
  className
}: ProfileCommandCenterProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* User Header */}
      <Card className="border border-gray-700 bg-[var(--hive-background-primary)]">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gray-800 text-[var(--hive-text-inverse)] text-lg">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-[var(--hive-text-inverse)]">{user.name}</h1>
              <p className="text-gray-400">{user.handle}</p>
              
              {(user.major || user.year || user.location) && (
                <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                  {user.major && user.year && (
                    <span>{user.major} • {user.year}</span>
                  )}
                  {user.location && (
                    <span>{user.location}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Command Center Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Spaces */}
        <Card className="border border-gray-700 bg-[var(--hive-background-primary)]">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                <h3 className="font-semibold text-[var(--hive-text-inverse)]">My Spaces</h3>
                <Badge variant="secondary" className="text-xs">
                  {activeSpaces.length}
                </Badge>
              </div>
              <ButtonEnhanced variant="ghost" size="sm" onClick={onJoinSpace}>
                <Plus className="h-4 w-4" />
              </ButtonEnhanced>
            </div>
            
            <div className="space-y-3">
              {activeSpaces.slice(0, 4).map(space => (
                <div
                  key={space.id}
                  className="flex items-center justify-between p-3 border border-gray-700 rounded-lg hover:bg-gray-800/50 cursor-pointer"
                  onClick={() => onViewSpace?.(space.id)}
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[var(--hive-text-inverse)] text-sm truncate">
                      {space.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {space.memberCount} members
                      {space.recentActivity && ` • ${space.recentActivity}`}
                    </p>
                  </div>
                  
                  {space.unreadCount && space.unreadCount > 0 && (
                    <Badge variant="primary" className="ml-2 text-xs">
                      {space.unreadCount}
                    </Badge>
                  )}
                </div>
              ))}
              
              {activeSpaces.length > 4 && (
                <ButtonEnhanced variant="ghost" size="sm" className="w-full">
                  View all {activeSpaces.length} spaces
                </ButtonEnhanced>
              )}
            </div>
          </div>
        </Card>

        {/* Built Tools */}
        <Card className="border border-gray-700 bg-[var(--hive-background-primary)]">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-400" />
                <h3 className="font-semibold text-[var(--hive-text-inverse)]">Tools Built</h3>
                <Badge variant="secondary" className="text-xs">
                  {builtTools.length}
                </Badge>
              </div>
              <ButtonEnhanced variant="ghost" size="sm" onClick={onCreateTool}>
                <Plus className="h-4 w-4" />
              </ButtonEnhanced>
            </div>
            
            <div className="space-y-3">
              {builtTools.slice(0, 4).map(tool => (
                <div
                  key={tool.id}
                  className="flex items-center justify-between p-3 border border-gray-700 rounded-lg hover:bg-gray-800/50 cursor-pointer"
                  onClick={() => onViewTool?.(tool.id)}
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[var(--hive-text-inverse)] text-sm truncate">
                      {tool.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {tool.usageCount} uses
                      {tool.spaceContext && ` in ${tool.spaceContext}`}
                    </p>
                  </div>
                  
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {tool.category}
                  </Badge>
                </div>
              ))}
              
              {builtTools.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Build your first tool</p>
                </div>
              )}
              
              {builtTools.length > 4 && (
                <ButtonEnhanced variant="ghost" size="sm" className="w-full">
                  View all {builtTools.length} tools
                </ButtonEnhanced>
              )}
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="border border-gray-700 bg-[var(--hive-background-primary)]">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-400" />
                <h3 className="font-semibold text-[var(--hive-text-inverse)]">Recent Activity</h3>
              </div>
              <ButtonEnhanced variant="ghost" size="sm" onClick={onViewAllActivity}>
                View All
              </ButtonEnhanced>
            </div>
            
            <div className="space-y-3">
              {recentActivity.slice(0, 4).map(activity => (
                <div key={activity.id} className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-2 w-2 bg-green-400 rounded-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300 line-clamp-2">
                      {activity.content}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span>{activity.timestamp}</span>
                      {activity.spaceContext && (
                        <>
                          <div className="h-1 w-1 bg-gray-500 rounded-full" />
                          <span>{activity.spaceContext}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {recentActivity.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card className="border border-gray-700 bg-[var(--hive-background-primary)]">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-400" />
                <h3 className="font-semibold text-[var(--hive-text-inverse)]">Upcoming</h3>
              </div>
              <ButtonEnhanced variant="ghost" size="sm" onClick={onViewCalendar}>
                Calendar
              </ButtonEnhanced>
            </div>
            
            <div className="space-y-3">
              {upcomingEvents.slice(0, 4).map(event => (
                <div key={event.id} className="flex gap-3 p-3 border border-gray-700 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[var(--hive-text-inverse)] text-sm truncate">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span>{event.time}</span>
                      {event.location && (
                        <>
                          <div className="h-1 w-1 bg-gray-500 rounded-full" />
                          <span>{event.location}</span>
                        </>
                      )}
                      {event.spaceContext && (
                        <>
                          <div className="h-1 w-1 bg-gray-500 rounded-full" />
                          <span>{event.spaceContext}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {upcomingEvents.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No upcoming events</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Compact version for sidebar/mobile
export function ProfileCommandCenterCompact({ 
  user, 
  activeSpaces, 
  builtTools,
  className 
}: Pick<ProfileCommandCenterProps, 'user' | 'activeSpaces' | 'builtTools' | 'className'>) {
  return (
    <Card className={cn("border border-gray-700 bg-[var(--hive-background-primary)]", className)}>
      <div className="p-4 space-y-4">
        {/* User */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-gray-800 text-[var(--hive-text-inverse)] text-sm">
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-[var(--hive-text-inverse)] text-sm truncate">{user.name}</h3>
            <p className="text-xs text-gray-500">{user.major}</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{activeSpaces.length} spaces</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3" />
            <span>{builtTools.length} tools</span>
          </div>
        </div>
      </div>
    </Card>
  );
}