"use client";

import React, { useState, useEffect } from 'react';
import { Card, ButtonEnhanced, Badge } from '@hive/ui';
import { 
  Users,
  Star,
  Clock,
  ArrowRight,
  Plus,
  Settings,
  Crown,
  Shield,
  Wrench,
  TrendingUp,
  MessageCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SpaceMembership {
  spaceId: string;
  spaceName: string;
  spaceType: 'university' | 'residential' | 'greek' | 'student';
  memberCount: number;
  role: 'member' | 'moderator' | 'admin' | 'builder';
  status: 'active' | 'inactive' | 'pending';
  lastActivity: string;
  activityLevel: 'high' | 'medium' | 'low';
  unreadCount: number;
  toolsActive: number;
  recentActivity: {
    posts: number;
    interactions: number;
    toolUsage: number;
  };
}

interface UserSpacesCardProps {
  settings?: Record<string, any>;
  isEditMode?: boolean;
  className?: string;
}

export function UserSpacesCard({ settings, isEditMode, className }: UserSpacesCardProps) {
  const router = useRouter();
  const [spaces, setSpaces] = useState<SpaceMembership[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'active' | 'all' | 'leading'>('active');

  useEffect(() => {
    fetchUserSpaces();
  }, []);

  const fetchUserSpaces = async () => {
    try {
      const response = await fetch('/api/profile/spaces?includeActivity=true&includeStats=true&timeRange=week');
      if (response.ok) {
        const data = await response.json();
        // Map the API response to our expected interface
        const mappedSpaces: SpaceMembership[] = (data.memberships || []).map((membership: any) => ({
          spaceId: membership.spaceId,
          spaceName: membership.spaceName,
          spaceType: membership.spaceType,
          memberCount: membership.memberCount,
          role: membership.role,
          status: membership.status,
          lastActivity: membership.lastActivity,
          activityLevel: membership.activityLevel,
          unreadCount: membership.notifications?.unreadCount || 0,
          toolsActive: membership.quickStats?.myTools || 0,
          recentActivity: {
            posts: membership.recentActivity?.posts || 0,
            interactions: membership.recentActivity?.interactions || 0,
            toolUsage: membership.recentActivity?.toolUsage || 0
          }
        }));
        setSpaces(mappedSpaces);
      }
    } catch (error) {
      console.error('Error fetching user spaces:', error);
      // Mock data for development
      setSpaces([
        {
          spaceId: 'cs-major',
          spaceName: 'Computer Science',
          spaceType: 'university',
          memberCount: 847,
          role: 'member',
          status: 'active',
          lastActivity: '2 hours ago',
          activityLevel: 'high',
          unreadCount: 3,
          toolsActive: 12,
          recentActivity: { posts: 15, interactions: 42, toolUsage: 8 }
        },
        {
          spaceId: 'ellicott-red-3',
          spaceName: 'Ellicott Red 3rd Floor',
          spaceType: 'residential',
          memberCount: 28,
          role: 'admin',
          status: 'active',
          lastActivity: '30 minutes ago',
          activityLevel: 'high',
          unreadCount: 7,
          toolsActive: 5,
          recentActivity: { posts: 8, interactions: 23, toolUsage: 12 }
        },
        {
          spaceId: 'hive-builders',
          spaceName: 'HIVE Builders',
          spaceType: 'student',
          memberCount: 156,
          role: 'builder',
          status: 'active',
          lastActivity: '1 hour ago',
          activityLevel: 'medium',
          unreadCount: 2,
          toolsActive: 18,
          recentActivity: { posts: 5, interactions: 15, toolUsage: 22 }
        },
        {
          spaceId: 'delta-sigma-phi',
          spaceName: 'Delta Sigma Phi',
          spaceType: 'greek',
          memberCount: 67,
          role: 'member',
          status: 'active',
          lastActivity: '3 hours ago',
          activityLevel: 'medium',
          unreadCount: 1,
          toolsActive: 8,
          recentActivity: { posts: 3, interactions: 12, toolUsage: 6 }
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Crown;
      case 'moderator': return Shield;
      case 'builder': return Wrench;
      default: return Users;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-amber-400';
      case 'moderator': return 'text-blue-400';
      case 'builder': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getActivityColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getSpaceTypeColor = (type: string) => {
    switch (type) {
      case 'university': return 'bg-blue-500/10 text-blue-400';
      case 'residential': return 'bg-green-500/10 text-green-400';
      case 'greek': return 'bg-purple-500/10 text-purple-400';
      case 'student': return 'bg-accent/10 text-accent';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  const filteredSpaces = spaces.filter(space => {
    if (view === 'active') return space.status === 'active' && space.activityLevel === 'high';
    if (view === 'leading') return ['admin', 'moderator', 'builder'].includes(space.role);
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
          <h3 className="font-semibold text-foreground">Your Spaces</h3>
        </div>
        
        {!isEditMode && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setView('active')}
              className={`text-xs px-2 py-1 rounded transition-colors ${
                view === 'active' 
                  ? 'bg-accent/20 text-accent' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setView('leading')}
              className={`text-xs px-2 py-1 rounded transition-colors ${
                view === 'leading' 
                  ? 'bg-accent/20 text-accent' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Leading
            </button>
            <button
              onClick={() => setView('all')}
              className={`text-xs px-2 py-1 rounded transition-colors ${
                view === 'all' 
                  ? 'bg-accent/20 text-accent' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </button>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted/20 rounded-lg">
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{spaces.length}</div>
          <div className="text-xs text-muted-foreground">Total</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-accent">
            {spaces.filter(s => ['admin', 'moderator', 'builder'].includes(s.role)).length}
          </div>
          <div className="text-xs text-muted-foreground">Leading</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-400">
            {spaces.filter(s => s.activityLevel === 'high').length}
          </div>
          <div className="text-xs text-muted-foreground">Active</div>
        </div>
      </div>

      {/* Spaces List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {filteredSpaces.map((space) => {
          const RoleIcon = getRoleIcon(space.role);
          return (
            <div
              key={space.spaceId}
              onClick={() => !isEditMode && router.push(`/spaces/${space.spaceId}`)}
              className={`p-3 rounded-lg border border-border/50 hover:border-border transition-all cursor-pointer group ${
                isEditMode ? 'pointer-events-none opacity-70' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground text-sm truncate">
                      {space.spaceName}
                    </h4>
                    <RoleIcon className={`h-3 w-3 ${getRoleColor(space.role)}`} />
                    {space.unreadCount > 0 && (
                      <Badge variant="destructive" className="text-xs px-1 py-0 h-4 min-w-4">
                        {space.unreadCount}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {space.memberCount.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Wrench className="h-3 w-3" />
                      {space.toolsActive} tools
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {space.lastActivity}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${getSpaceTypeColor(space.spaceType)}`}>
                      {space.spaceType}
                    </Badge>
                    <Badge className={`text-xs border ${getActivityColor(space.activityLevel)}`}>
                      {space.activityLevel} activity
                    </Badge>
                  </div>
                </div>
                
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

      {filteredSpaces.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No spaces found for this view</p>
        </div>
      )}

      {/* Quick Actions */}
      {!isEditMode && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
          <ButtonEnhanced 
            variant="outline" 
            size="sm" 
            onClick={() => router.push('/spaces')}
            className="flex-1"
          >
            <Plus className="h-3 w-3 mr-2" />
            Discover Spaces
          </ButtonEnhanced>
          
          <ButtonEnhanced 
            variant="outline" 
            size="sm"
            onClick={() => router.push('/spaces?view=my-spaces')}
          >
            <TrendingUp className="h-3 w-3" />
          </ButtonEnhanced>
        </div>
      )}
    </Card>
  );
}