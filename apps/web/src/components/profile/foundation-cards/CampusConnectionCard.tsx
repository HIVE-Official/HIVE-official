"use client";

import React, { useState } from 'react';
import { Card, Button, Badge } from '@hive/ui';
import { 
  Users,
  Activity,
  Clock,
  ArrowRight,
  Plus,
  Lock,
  Unlock,
  TrendingUp,
  MessageCircle,
  Calendar,
  Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SpaceMembership {
  spaceId: string;
  spaceName: string;
  spaceType: string;
  memberCount: number;
  role: 'member' | 'moderator' | 'admin' | 'builder';
  activityLevel: 'high' | 'medium' | 'low';
  recentActivity: {
    posts: number;
    interactions: number;
    timeSpent: number;
  };
}

interface CampusConnectionCardProps {
  spaces: SpaceMembership[];
  totalSpaces: number;
  activeSpaces: number;
  isUnlocked: boolean;
  onUnlock: () => void;
}

export function CampusConnectionCard({ 
  spaces, 
  totalSpaces, 
  activeSpaces, 
  isUnlocked, 
  onUnlock 
}: CampusConnectionCardProps) {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);

  // Calculate engagement stats
  const totalInteractions = spaces.reduce((sum, space) => sum + space.recentActivity.interactions, 0);
  const totalTimeSpent = spaces.reduce((sum, space) => sum + space.recentActivity.timeSpent, 0);
  const mostActiveSpace = spaces.length > 0 
    ? spaces.reduce((max, space) => 
        space.recentActivity.timeSpent > max.recentActivity.timeSpent ? space : max
      )
    : null;

  if (!isUnlocked) {
    return (
      <Card className="p-6 relative overflow-hidden">
        {/* Unlock teaser overlay */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-center">
            <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <div className="text-sm font-medium mb-1">Campus Connection</div>
            <div className="text-xs text-muted-foreground mb-3 max-w-[200px]">
              Complete your basic profile to unlock your campus network overview
            </div>
            <Button 
              onClick={onUnlock}
              size="sm"
              variant="outline"
            >
              <Unlock className="h-4 w-4 mr-2" />
              Unlock
            </Button>
          </div>
        </div>

        {/* Blurred background content */}
        <div className="opacity-30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              <span className="font-medium">Campus Network</span>
            </div>
            <Badge variant="secondary">Preview</Badge>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">3</div>
                <div className="text-xs text-muted-foreground">Active Spaces</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">47</div>
                <div className="text-xs text-muted-foreground">Connections</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="h-2 bg-muted rounded-full"></div>
              <div className="h-2 bg-muted rounded-full w-3/4"></div>
              <div className="h-2 bg-muted rounded-full w-1/2"></div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-accent" />
          <span className="font-medium">Campus Connection</span>
        </div>
        {activeSpaces > 0 && (
          <Badge variant="secondary" className="bg-accent/10 text-accent">
            <Activity className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )}
      </div>

      {/* Stats overview */}
      {totalSpaces > 0 ? (
        <div className="space-y-4">
          {/* Key metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{totalSpaces}</div>
              <div className="text-xs text-muted-foreground">
                Space{totalSpaces !== 1 ? 's' : ''} Joined
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{totalInteractions}</div>
              <div className="text-xs text-muted-foreground">Interactions</div>
            </div>
          </div>

          {/* Activity level indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Weekly Activity</span>
              <span className="text-accent">{totalTimeSpent}min</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${Math.min(100, (totalTimeSpent / 120) * 100)}%` 
                }}
              />
            </div>
          </div>

          {/* Most active space */}
          {mostActiveSpace && (
            <div className="bg-accent/5 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{mostActiveSpace.spaceName}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {mostActiveSpace.recentActivity.timeSpent}min this week
                  </div>
                </div>
                <Badge 
                  variant={mostActiveSpace.activityLevel === 'high' ? 'default' : 'secondary'}
                  className={mostActiveSpace.activityLevel === 'high' ? 'bg-accent text-accent-foreground' : ''}
                >
                  {mostActiveSpace.activityLevel}
                </Badge>
              </div>
            </div>
          )}

          {/* Recent spaces preview */}
          {!showDetails && spaces.length > 1 && (
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Recent Spaces</div>
              {spaces.slice(0, 2).map(space => (
                <div key={space.spaceId} className="flex items-center justify-between text-xs">
                  <span className="truncate flex-1">{space.spaceName}</span>
                  <div className="flex items-center gap-1">
                    {space.recentActivity.interactions > 0 && (
                      <MessageCircle className="h-3 w-3 text-muted-foreground" />
                    )}
                    <span className="text-muted-foreground">{space.recentActivity.interactions}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Detailed view */}
          {showDetails && (
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">All Spaces</div>
              {spaces.map(space => (
                <div key={space.spaceId} className="flex items-center justify-between p-2 hover:bg-accent/5 rounded transition-colors">
                  <div className="flex-1">
                    <div className="text-sm font-medium">{space.spaceName}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <span>{space.spaceType}</span>
                      <span>•</span>
                      <span>{space.memberCount} members</span>
                      {space.role !== 'member' && (
                        <>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs py-0 px-1">
                            {space.role}
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-xs font-medium">{space.recentActivity.timeSpent}min</div>
                      <div className="text-xs text-muted-foreground">{space.recentActivity.interactions} interactions</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      space.activityLevel === 'high' ? 'bg-green-500' :
                      space.activityLevel === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* No spaces joined yet */
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <div className="font-medium text-foreground mb-1">Ready to connect?</div>
            <div className="text-sm text-muted-foreground mb-4">
              Join spaces to connect with your campus community
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">Suggested for you:</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between p-2 bg-accent/5 rounded">
                <span>CS Majors</span>
                <Badge variant="secondary">Academic</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-accent/5 rounded">
                <span>Campus Events</span>
                <Badge variant="secondary">Community</Badge>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="mt-6 space-y-2">
        {totalSpaces > 0 && (
          <Button 
            onClick={() => setShowDetails(!showDetails)}
            variant="ghost" 
            size="sm"
            className="w-full"
          >
            {showDetails ? 'Show less' : `View all ${totalSpaces} spaces`}
          </Button>
        )}
        
        <Button 
          onClick={() => router.push('/spaces')}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          {totalSpaces > 0 ? 'Discover more spaces' : 'Find spaces to join'}
        </Button>

        {totalSpaces > 0 && (
          <Button 
            onClick={() => router.push('/spaces')}
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            View activity trends
          </Button>
        )}
      </div>
    </Card>
  );
}