"use client";

import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from '@hive/ui';
import { 
  Activity,
  Users,
  Wrench,
  MessageCircle,
  Calendar,
  Star,
  Settings,
  Filter,
  Eye,
  EyeOff,
  ExternalLink,
  Clock,
  TrendingUp
} from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface ActivityRecord {
  id: string;
  type: 'space' | 'tool' | 'social' | 'profile';
  action: string;
  description: string;
  timestamp: string;
  metadata: {
    spaceId?: string;
    spaceName?: string;
    toolId?: string;
    toolName?: string;
    targetUserId?: string;
    targetUserName?: string;
    [key: string]: any;
  };
  isPrivate: boolean;
  impact: 'low' | 'medium' | 'high';
}

interface ActivityHistoryCardProps {
  settings?: Record<string, any>;
  isEditMode?: boolean;
  className?: string;
}

export function ActivityHistoryCard({ settings, isEditMode, className }: ActivityHistoryCardProps) {
  const [activities, setActivities] = useState<ActivityRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'space' | 'tool' | 'social'>('all');
  const [showPrivate, setShowPrivate] = useState(true);

  useEffect(() => {
    fetchActivityHistory();
  }, []);

  const fetchActivityHistory = async () => {
    try {
      const response = await fetch('/api/profile/activity?timeRange=week&limit=20');
      if (response.ok) {
        const data = await response.json();
        // Map the API response to our expected interface
        const mappedActivities: ActivityRecord[] = (data.activities || []).map((activity: any) => ({
          id: activity.id,
          type: mapActivityType(activity.type),
          action: generateActionFromType(activity.type),
          description: generateDescriptionFromActivity(activity),
          timestamp: activity.timestamp,
          metadata: {
            spaceId: activity.spaceId,
            spaceName: activity.spaceName,
            toolId: activity.toolId,
            toolName: activity.toolName,
            targetUserId: activity.targetUserId,
            targetUserName: activity.targetUserName
          },
          isPrivate: activity.isPrivate || false,
          impact: calculateImpactLevel(activity)
        }));
        setActivities(mappedActivities);
      }
    } catch (error) {
      console.error('Error fetching activity history:', error);
      // Mock data for development
      setActivities([
        {
          id: '1',
          type: 'tool',
          action: 'tool_created',
          description: 'Created "GPA Calculator" for Computer Science space',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          metadata: {
            spaceId: 'cs-major',
            spaceName: 'Computer Science',
            toolId: 'gpa-calc',
            toolName: 'GPA Calculator'
          },
          isPrivate: false,
          impact: 'high'
        },
        {
          id: '2',
          type: 'space',
          action: 'leadership_granted',
          description: 'Became admin of Ellicott Red 3rd Floor',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          metadata: {
            spaceId: 'ellicott-red-3',
            spaceName: 'Ellicott Red 3rd Floor'
          },
          isPrivate: false,
          impact: 'high'
        },
        {
          id: '3',
          type: 'social',
          action: 'connection_made',
          description: 'Connected with Sarah Chen through CS study group',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          metadata: {
            targetUserId: 'sarah-chen',
            targetUserName: 'Sarah Chen',
            spaceId: 'cs-study-group',
            spaceName: 'CS Study Group'
          },
          isPrivate: true,
          impact: 'medium'
        },
        {
          id: '4',
          type: 'space',
          action: 'event_created',
          description: 'Organized "Floor Game Night" for residents',
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          metadata: {
            spaceId: 'ellicott-red-3',
            spaceName: 'Ellicott Red 3rd Floor',
            eventTitle: 'Floor Game Night'
          },
          isPrivate: false,
          impact: 'medium'
        },
        {
          id: '5',
          type: 'tool',
          action: 'tool_installed',
          description: 'Added "Laundry Tracker" to your dorm space',
          timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
          metadata: {
            spaceId: 'ellicott-red-3',
            spaceName: 'Ellicott Red 3rd Floor',
            toolId: 'laundry-tracker',
            toolName: 'Laundry Tracker'
          },
          isPrivate: false,
          impact: 'low'
        },
        {
          id: '6',
          type: 'space',
          action: 'space_joined',
          description: 'Joined HIVE Builders community',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          metadata: {
            spaceId: 'hive-builders',
            spaceName: 'HIVE Builders'
          },
          isPrivate: false,
          impact: 'medium'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getActivityIcon = (type: string, action: string) => {
    switch (type) {
      case 'tool':
        return action === 'tool_created' ? Wrench : Settings;
      case 'space':
        return action === 'event_created' ? Calendar : Users;
      case 'social':
        return MessageCircle;
      case 'profile':
        return Star;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type: string, impact: string) => {
    const baseColors = {
      tool: 'text-purple-400',
      space: 'text-blue-400',
      social: 'text-green-400',
      profile: 'text-amber-400'
    };

    const impactIntensity = {
      high: 'opacity-100',
      medium: 'opacity-80',
      low: 'opacity-60'
    };

    return `${baseColors[type as keyof typeof baseColors]} ${impactIntensity[impact as keyof typeof impactIntensity]}`;
  };

  const getImpactBadge = (impact: string) => {
    const colors = {
      high: 'bg-red-500/20 text-red-400 border-red-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      low: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return colors[impact as keyof typeof colors];
  };

  // Helper functions for mapping API data
  const mapActivityType = (apiType: string): 'space' | 'tool' | 'social' | 'profile' => {
    switch (apiType) {
      case 'space_visit':
      case 'content_creation':
        return 'space';
      case 'tool_interaction':
        return 'tool';
      case 'social_interaction':
        return 'social';
      case 'profile_update':
      case 'login':
      case 'logout':
        return 'profile';
      default:
        return 'profile';
    }
  };

  const generateActionFromType = (apiType: string): string => {
    switch (apiType) {
      case 'space_visit': return 'space_visited';
      case 'content_creation': return 'content_created';
      case 'tool_interaction': return 'tool_used';
      case 'social_interaction': return 'interaction_made';
      case 'profile_update': return 'profile_updated';
      case 'login': return 'logged_in';
      case 'logout': return 'logged_out';
      default: return 'activity_recorded';
    }
  };

  const generateDescriptionFromActivity = (activity: any): string => {
    switch (activity.type) {
      case 'space_visit':
        return `Visited ${activity.spaceName || 'a space'}`;
      case 'content_creation':
        return `Created content in ${activity.spaceName || 'a space'}`;
      case 'tool_interaction':
        return `Used ${activity.toolName || 'a tool'}${activity.spaceName ? ` in ${activity.spaceName}` : ''}`;
      case 'social_interaction':
        return `Interacted with others${activity.spaceName ? ` in ${activity.spaceName}` : ''}`;
      case 'profile_update':
        return 'Updated profile information';
      case 'login':
        return 'Logged into HIVE';
      case 'logout':
        return 'Logged out of HIVE';
      default:
        return 'Recorded activity on HIVE';
    }
  };

  const calculateImpactLevel = (activity: any): 'low' | 'medium' | 'high' => {
    const duration = activity.duration || 0;
    switch (activity.type) {
      case 'content_creation':
        return 'high';
      case 'tool_interaction':
        return duration > 30 ? 'high' : 'medium';
      case 'social_interaction':
        return 'medium';
      case 'space_visit':
        return duration > 15 ? 'medium' : 'low';
      default:
        return 'low';
    }
  };

  const filteredActivities = activities.filter(activity => {
    if (filter !== 'all' && activity.type !== filter) return false;
    if (!showPrivate && activity.isPrivate) return false;
    return true;
  });

  if (isLoading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
            <div className="h-3 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 relative ${className}`}>
      {/* Edit Mode Indicator */}
      {isEditMode && (
        <div className="absolute top-2 right-2 opacity-50">
          <Settings className="h-4 w-4 text-muted-foreground" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-accent" />
          <h3 className="font-semibold text-foreground">Activity History</h3>
        </div>
        
        {!isEditMode && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPrivate(!showPrivate)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              title={showPrivate ? 'Hide private activities' : 'Show private activities'}
            >
              {showPrivate ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      {!isEditMode && (
        <div className="flex items-center gap-1 mb-4">
          {(['all', 'space', 'tool', 'social'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                filter === filterType 
                  ? 'bg-accent text-accent-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {filterType === 'all' ? 'All' : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Activity Stream */}
      <div className="space-y-3 max-h-72 overflow-y-auto">
        {filteredActivities.map((activity) => {
          const ActivityIcon = getActivityIcon(activity.type, activity.action);
          return (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors group">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center ${getActivityColor(activity.type, activity.impact)}`}>
                <ActivityIcon className="h-4 w-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-relaxed">
                  {activity.description}
                </p>
                
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(parseISO(activity.timestamp), { addSuffix: true })}
                  </span>
                  
                  <Badge className={`text-xs border ${getImpactBadge(activity.impact)}`}>
                    {activity.impact}
                  </Badge>
                  
                  {activity.isPrivate && (
                    <EyeOff className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>

                {/* Metadata Links */}
                {activity.metadata.spaceId && !isEditMode && (
                  <button className="text-xs text-accent hover:text-accent/80 transition-colors mt-1 flex items-center gap-1">
                    View in {activity.metadata.spaceName}
                    <ExternalLink className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No activities found</p>
          <p className="text-xs mt-1">
            {filter !== 'all' ? `Try changing the filter` : 'Get started by joining a space or creating a tool'}
          </p>
        </div>
      )}

      {/* Quick Actions */}
      {!isEditMode && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
          >
            <TrendingUp className="h-3 w-3 mr-2" />
            View Analytics
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            title="Export activity data"
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Privacy Notice */}
      {!isEditMode && (
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Your activity helps improve campus community recommendations
        </p>
      )}
    </Card>
  );
}