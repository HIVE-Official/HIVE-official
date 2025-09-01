"use client";

import React, { useState, useEffect } from 'react';
import { Card, ButtonEnhanced, Badge } from '@hive/ui';
import { 
  Users,
  MessageCircle,
  UserPlus,
  Star,
  Settings,
  ArrowRight,
  Calendar,
  Zap,
  Heart,
  Handshake,
  Search,
  Filter
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface Connection {
  id: string;
  userId: string;
  name: string;
  handle: string;
  avatar?: string;
  type: 'classmate' | 'floormate' | 'study_partner' | 'project_partner';
  strength: 'strong' | 'medium' | 'new';
  lastInteraction: string;
  sharedSpaces: string[];
  sharedInterests: string[];
  mutualConnections: number;
  collaborationCount: number;
  recentActivity: {
    type: 'space_activity' | 'tool_creation' | 'event_attendance';
    description: string;
    timestamp: string;
  }[];
}

interface SocialConnectionsCardProps {
  settings?: Record<string, any>;
  isEditMode?: boolean;
  className?: string;
}

export function SocialConnectionsCard({ settings, isEditMode, className }: SocialConnectionsCardProps) {
  const router = useRouter();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'recent' | 'strong' | 'study_partners'>('recent');

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await fetch('/api/profile/connections?limit=20&includeOffline=true');
      if (response.ok) {
        const data = await response.json();
        // Map API response to our expected interface
        const mappedConnections: Connection[] = (data.connections || []).map((apiConn: any) => ({
          id: apiConn.id,
          userId: apiConn.userId,
          name: apiConn.fullName,
          handle: `@${apiConn.handle}`,
          avatar: apiConn.avatarUrl,
          type: mapConnectionType(apiConn.connectionType),
          strength: calculateConnectionStrength(apiConn),
          lastInteraction: apiConn.lastInteraction || apiConn.connectedAt,
          sharedSpaces: [], // Would need additional API call
          sharedInterests: apiConn.commonInterests || [],
          mutualConnections: apiConn.mutualSpaces || 0,
          collaborationCount: Math.floor(Math.random() * 10), // Would track in real system
          recentActivity: [
            {
              type: 'space_activity',
              description: `Active in ${apiConn.major || 'campus'} community`,
              timestamp: apiConn.lastInteraction || apiConn.connectedAt
            }
          ]
        }));
        setConnections(mappedConnections);
      }
    } catch (error) {
      console.error('Error fetching connections:', error);
      // Mock data for development
      setConnections([
        {
          id: '1',
          userId: 'sarah-chen',
          name: 'Sarah Chen',
          handle: '@sarahc',
          type: 'study_partner',
          strength: 'strong',
          lastInteraction: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          sharedSpaces: ['cs-major', 'study-group-cse'],
          sharedInterests: ['machine-learning', 'web-development'],
          mutualConnections: 8,
          collaborationCount: 12,
          recentActivity: [
            {
              type: 'tool_creation',
              description: 'Created "Study Schedule Optimizer"',
              timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
            }
          ]
        },
        {
          id: '2',
          userId: 'mike-torres',
          name: 'Mike Torres',
          handle: '@miket',
          type: 'floormate',
          strength: 'strong',
          lastInteraction: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          sharedSpaces: ['ellicott-red-3', 'intramural-basketball'],
          sharedInterests: ['basketball', 'gaming'],
          mutualConnections: 15,
          collaborationCount: 5,
          recentActivity: [
            {
              type: 'event_attendance',
              description: 'Attended "Floor Game Night"',
              timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
            }
          ]
        },
        {
          id: '3',
          userId: 'alex-kim',
          name: 'Alex Kim',
          handle: '@alexk',
          type: 'project_partner',
          strength: 'medium',
          lastInteraction: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          sharedSpaces: ['hive-builders', 'cs-major'],
          sharedInterests: ['app-development', 'startup'],
          mutualConnections: 5,
          collaborationCount: 8,
          recentActivity: [
            {
              type: 'space_activity',
              description: 'Posted in HIVE Builders',
              timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString()
            }
          ]
        },
        {
          id: '4',
          userId: 'emma-davis',
          name: 'Emma Davis',
          handle: '@emmad',
          type: 'classmate',
          strength: 'new',
          lastInteraction: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
          sharedSpaces: ['cse-341', 'study-lounge'],
          sharedInterests: ['algorithms', 'data-structures'],
          mutualConnections: 3,
          collaborationCount: 1,
          recentActivity: [
            {
              type: 'space_activity',
              description: 'Joined CSE 341 study group',
              timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString()
            }
          ]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getConnectionIcon = (type: string) => {
    switch (type) {
      case 'study_partner': return Star;
      case 'floormate': return Users;
      case 'project_partner': return Handshake;
      case 'classmate': return MessageCircle;
      default: return Users;
    }
  };

  const getConnectionColor = (type: string, strength: string) => {
    const baseColors = {
      study_partner: 'text-purple-400',
      floormate: 'text-green-400',
      project_partner: 'text-blue-400',
      classmate: 'text-amber-400'
    };

    const strengthOpacity = {
      strong: 'opacity-100',
      medium: 'opacity-80',
      new: 'opacity-60'
    };

    return `${baseColors[type as keyof typeof baseColors]} ${strengthOpacity[strength as keyof typeof strengthOpacity]}`;
  };

  const getStrengthBadge = (strength: string) => {
    const colors = {
      strong: 'bg-green-500/20 text-green-400 border-green-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      new: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    };
    return colors[strength as keyof typeof colors];
  };

  // Helper functions for mapping API data
  const mapConnectionType = (apiType: string): 'classmate' | 'floormate' | 'study_partner' | 'project_partner' => {
    switch (apiType) {
      case 'classmate': return 'classmate';
      case 'space_member': return 'study_partner';
      case 'mutual_friend': return 'project_partner';
      case 'suggested': return 'classmate';
      default: return 'classmate';
    }
  };

  const calculateConnectionStrength = (apiConn: any): 'strong' | 'medium' | 'new' => {
    const daysSinceConnection = Math.floor(
      (Date.now() - new Date(apiConn.connectedAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    const mutualSpaces = apiConn.mutualSpaces || 0;
    const hasRecentInteraction = apiConn.lastInteraction && 
      (Date.now() - new Date(apiConn.lastInteraction).getTime()) < (7 * 24 * 60 * 60 * 1000);
    
    if (mutualSpaces >= 2 && hasRecentInteraction) return 'strong';
    if (daysSinceConnection > 30 && mutualSpaces >= 1) return 'medium';
    return 'new';
  };

  const filteredConnections = connections.filter(connection => {
    if (view === 'recent') return new Date(connection.lastInteraction) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    if (view === 'strong') return connection.strength === 'strong';
    if (view === 'study_partners') return connection.type === 'study_partner';
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
          <Users className="h-5 w-5 text-accent" />
          <h3 className="font-semibold text-foreground">Social Connections</h3>
        </div>
        
        {!isEditMode && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setView('recent')}
              className={`text-xs px-2 py-1 rounded transition-colors ${
                view === 'recent' 
                  ? 'bg-accent/20 text-accent' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Recent
            </button>
            <button
              onClick={() => setView('strong')}
              className={`text-xs px-2 py-1 rounded transition-colors ${
                view === 'strong' 
                  ? 'bg-accent/20 text-accent' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Close
            </button>
            <button
              onClick={() => setView('study_partners')}
              className={`text-xs px-2 py-1 rounded transition-colors ${
                view === 'study_partners' 
                  ? 'bg-accent/20 text-accent' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Study
            </button>
          </div>
        )}
      </div>

      {/* Connection Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted/20 rounded-lg">
        <div className="text-center">
          <div className="text-lg font-bold text-accent">{connections.length}</div>
          <div className="text-xs text-muted-foreground">Total</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-400">
            {connections.filter(c => c.strength === 'strong').length}
          </div>
          <div className="text-xs text-muted-foreground">Close</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-400">
            {connections.filter(c => c.type === 'study_partner').length}
          </div>
          <div className="text-xs text-muted-foreground">Study</div>
        </div>
      </div>

      {/* Connections List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {filteredConnections.map((connection) => {
          const ConnectionIcon = getConnectionIcon(connection.type);
          return (
            <div
              key={connection.id}
              onClick={() => !isEditMode && router.push(`/profile/${connection.handle.replace('@', '')}`)}
              className={`p-3 rounded-lg border border-border/50 hover:border-border transition-all cursor-pointer group ${
                isEditMode ? 'pointer-events-none opacity-70' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <ConnectionIcon className={`h-4 w-4 ${getConnectionColor(connection.type, connection.strength)}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground text-sm truncate">
                        {connection.name}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {connection.handle}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {connection.mutualConnections} mutual
                      </span>
                      <span className="flex items-center gap-1">
                        <Handshake className="h-3 w-3" />
                        {connection.collaborationCount} collabs
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`text-xs capitalize ${getStrengthBadge(connection.strength)}`}>
                        {connection.strength}
                      </Badge>
                      <Badge variant="secondary" className="text-xs capitalize">
                        {connection.type.replace('_', ' ')}
                      </Badge>
                    </div>

                    {connection.recentActivity.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {connection.recentActivity[0].description} • {formatDistanceToNow(parseISO(connection.recentActivity[0].timestamp), { addSuffix: true })}
                      </p>
                    )}
                  </div>
                </div>
                
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
              </div>
            </div>
          );
        })}
      </div>

      {filteredConnections.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No connections found</p>
          <p className="text-xs mt-1">
            {view === 'recent' ? 'No recent interactions' : 
             view === 'strong' ? 'Build stronger connections by collaborating more' :
             'Find study partners by joining academic spaces'}
          </p>
        </div>
      )}

      {/* Quick Actions */}
      {!isEditMode && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
          <ButtonEnhanced 
            variant="outline" 
            size="sm" 
            className="flex-1"
          >
            <UserPlus className="h-3 w-3 mr-2" />
            Find Study Partners
          </ButtonEnhanced>
          
          <ButtonEnhanced 
            variant="outline" 
            size="sm"
            title="Browse all connections"
          >
            <Search className="h-3 w-3" />
          </ButtonEnhanced>
        </div>
      )}

      {/* Connection Suggestions */}
      {!isEditMode && (
        <div className="mt-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-accent" />
            <span className="font-medium text-foreground text-sm">Suggested Connection</span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            Connect with Jessica Liu - shares 3 classes and 2 spaces with you
          </p>
          <ButtonEnhanced size="sm" variant="outline" className="w-full">
            <UserPlus className="h-3 w-3 mr-2" />
            Send Connection Request
          </ButtonEnhanced>
        </div>
      )}
    </Card>
  );
}