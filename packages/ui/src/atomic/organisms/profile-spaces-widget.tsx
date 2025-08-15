'use client';

import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { ButtonEnhanced as Button } from '../atoms/button-enhanced';
import { 
  Users,
  Plus,
  Crown,
  Star,
  MessageSquare,
  Calendar,
  Zap,
  BookOpen,
  Coffee,
  Code,
  Heart,
  Settings,
  ChevronRight,
  ExternalLink,
  Search,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';

export interface JoinedSpace {
  id: string;
  name: string;
  description: string;
  type: 'academic' | 'residential' | 'social' | 'professional' | 'hobby';
  memberCount: number;
  role: 'member' | 'moderator' | 'admin' | 'founder';
  joinedDate: string;
  lastActive: string;
  isPrivate: boolean;
  activityLevel: 'high' | 'medium' | 'low';
  unreadMessages?: number;
  upcomingEvents?: number;
}

export interface ProfileSpacesWidgetProps {
  user: {
    id: string;
    name: string;
  };
  joinedSpaces?: JoinedSpace[];
  totalSpaces?: number;
  spacesCreated?: number;
  totalMembers?: number;
  weeklyEngagement?: number;
  featuredSpace?: JoinedSpace;
  isEditable?: boolean;
  onJoinSpace?: () => void;
  onViewSpace?: (spaceId: string) => void;
  onCreateSpace?: () => void;
  onViewAllSpaces?: () => void;
  onExploreSpaces?: () => void;
  className?: string;
}

const getSpaceTypeConfig = (type: string) => {
  const configs = {
    academic: {
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      icon: BookOpen,
      label: 'Academic'
    },
    residential: {
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      icon: Coffee,
      label: 'Residential'
    },
    social: {
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      icon: Heart,
      label: 'Social'
    },
    professional: {
      color: 'text-[var(--hive-gold)]',
      bgColor: 'bg-[var(--hive-gold)]/10',
      borderColor: 'border-[var(--hive-gold)]/20',
      icon: Award,
      label: 'Professional'
    },
    hobby: {
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20',
      icon: Code,
      label: 'Hobby'
    }
  };
  
  return configs[type as keyof typeof configs] || configs.social;
};

const getRoleConfig = (role: string) => {
  const configs = {
    member: {
      color: 'text-[var(--hive-text-secondary)]',
      bgColor: 'bg-[var(--hive-background-secondary)]',
      icon: Users,
      label: 'Member'
    },
    moderator: {
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      icon: Star,
      label: 'Moderator'
    },
    admin: {
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      icon: Crown,
      label: 'Admin'
    },
    founder: {
      color: 'text-[var(--hive-gold)]',
      bgColor: 'bg-[var(--hive-gold)]/10',
      icon: Crown,
      label: 'Founder'
    }
  };
  
  return configs[role as keyof typeof configs] || configs.member;
};

const getActivityLevelConfig = (level: string) => {
  const configs = {
    high: {
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      label: 'Very Active'
    },
    medium: {
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      label: 'Active'
    },
    low: {
      color: 'text-[var(--hive-text-muted)]',
      bgColor: 'bg-[var(--hive-background-secondary)]',
      label: 'Quiet'
    }
  };
  
  return configs[level as keyof typeof configs] || configs.medium;
};

export const ProfileSpacesWidget: React.FC<ProfileSpacesWidgetProps> = ({
  user,
  joinedSpaces = [],
  totalSpaces = 0,
  spacesCreated = 0,
  totalMembers = 0,
  weeklyEngagement = 0,
  featuredSpace,
  isEditable = true,
  onJoinSpace,
  onViewSpace,
  onCreateSpace,
  onViewAllSpaces,
  onExploreSpaces,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get the most active spaces (up to 3)
  const activeSpaces = joinedSpaces
    .sort((a, b) => (b.unreadMessages || 0) - (a.unreadMessages || 0))
    .slice(0, 3);
  
  const leadershipRoles = joinedSpaces.filter(space => 
    ['admin', 'moderator', 'founder'].includes(space.role)
  ).length;
  
  const totalUnread = joinedSpaces.reduce((sum, space) => sum + (space.unreadMessages || 0), 0);

  return (
    <Card 
      className={cn(
        'relative overflow-hidden transition-all duration-300 hover:shadow-lg',
        'bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]',
        isHovered && 'scale-[1.02]',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Text variant="body-sm" color="gold" weight="medium">
              My Spaces
            </Text>
            {totalUnread > 0 && (
              <Badge variant="outline" className="text-xs">
                <MessageSquare className="h-3 w-3 mr-1" />
                {totalUnread} unread
              </Badge>
            )}
          </div>
          {isEditable && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onViewAllSpaces}
              className="h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
            >
              <Settings className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        
        {/* Space Membership Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Users className="h-3 w-3 text-[var(--hive-text-secondary)]" />
              <Text variant="body-sm" weight="medium" color="primary">
                {totalSpaces}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Spaces Joined
            </Text>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Crown className="h-3 w-3 text-[var(--hive-gold)]" />
              <Text variant="body-sm" weight="medium" color="primary">
                {leadershipRoles}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Leadership
            </Text>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <Text variant="body-sm" weight="medium" color="primary">
                {totalMembers}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Community Size
            </Text>
          </div>
        </div>

        {/* Featured Space */}
        {featuredSpace && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Text variant="body-sm" color="primary" weight="medium">Most Active Space:</Text>
              {(() => {
                const IconComponent = getRoleConfig(featuredSpace.role).icon;
                return <IconComponent className={cn(
                  'h-3 w-3',
                  getRoleConfig(featuredSpace.role).color
                )} />;
              })()}
            </div>
            <div className={cn(
              'p-3 rounded-lg border transition-colors hover:bg-[var(--hive-background-secondary)] cursor-pointer',
              getSpaceTypeConfig(featuredSpace.type).bgColor,
              getSpaceTypeConfig(featuredSpace.type).borderColor
            )}
            onClick={() => onViewSpace?.(featuredSpace.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  {(() => {
                    const IconComponent = getSpaceTypeConfig(featuredSpace.type).icon;
                    return <IconComponent className={cn(
                      'h-4 w-4 mt-0.5 flex-shrink-0',
                      getSpaceTypeConfig(featuredSpace.type).color
                    )} />;
                  })()}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Text variant="body-sm" weight="medium" color="primary" className="truncate">
                        {featuredSpace.name}
                      </Text>
                      <Badge 
                        variant="outline" 
                        className={cn('text-xs', getRoleConfig(featuredSpace.role).color)}
                      >
                        {getRoleConfig(featuredSpace.role).label}
                      </Badge>
                    </div>
                    <Text variant="body-xs" color="secondary" className="line-clamp-2">
                      {featuredSpace.description}
                    </Text>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-[var(--hive-text-secondary)]" />
                        <Text variant="body-xs" color="secondary">
                          {featuredSpace.memberCount.toLocaleString()} members
                        </Text>
                      </div>
                      {featuredSpace.unreadMessages && featuredSpace.unreadMessages > 0 && (
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3 text-blue-500" />
                          <Text variant="body-xs" color="secondary">
                            {featuredSpace.unreadMessages} new
                          </Text>
                        </div>
                      )}
                      {featuredSpace.upcomingEvents && featuredSpace.upcomingEvents > 0 && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-green-500" />
                          <Text variant="body-xs" color="secondary">
                            {featuredSpace.upcomingEvents} events
                          </Text>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewSpace?.(featuredSpace.id);
                  }}
                  className="h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] flex-shrink-0 ml-2"
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Recent Active Spaces */}
        {activeSpaces.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Text variant="body-sm" color="primary" weight="medium">Active Spaces:</Text>
              {joinedSpaces.length > 3 && (
                <Text variant="body-xs" color="secondary">
                  +{joinedSpaces.length - 3} more
                </Text>
              )}
            </div>
            <div className="space-y-1">
              {activeSpaces.map((space) => {
                const typeConfig = getSpaceTypeConfig(space.type);
                const roleConfig = getRoleConfig(space.role);
                const activityConfig = getActivityLevelConfig(space.activityLevel);
                return (
                  <div 
                    key={space.id}
                    className="flex items-center gap-2 p-2 rounded hover:bg-[var(--hive-background-secondary)] transition-colors cursor-pointer"
                    onClick={() => onViewSpace?.(space.id)}
                  >
                    <typeConfig.icon className={cn('h-3 w-3', typeConfig.color)} />
                    <Text variant="body-xs" color="primary" className="flex-1 truncate">
                      {space.name}
                    </Text>
                    {space.unreadMessages && space.unreadMessages > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {space.unreadMessages}
                      </Badge>
                    )}
                    <div className={cn('w-2 h-2 rounded-full', activityConfig.color.replace('text-', 'bg-'))} />
                    <ChevronRight className="h-3 w-3 text-[var(--hive-text-secondary)]" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Weekly Engagement */}
        {weeklyEngagement > 0 && (
          <div className="space-y-2 pt-2 border-t border-[var(--hive-border-primary)]">
            <Text variant="body-sm" color="primary" weight="medium">This Week:</Text>
            <div className="flex items-center justify-between">
              <Text variant="body-sm" color="secondary">Community Engagement</Text>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-[var(--hive-background-secondary)] rounded-full">
                  <div 
                    className="h-2 bg-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(weeklyEngagement, 100)}%` }}
                  />
                </div>
                <Text variant="body-xs" color="gold" weight="medium">
                  {weeklyEngagement}%
                </Text>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2 border-t border-[var(--hive-border-primary)]">
          {isEditable && onJoinSpace && (
            <Button
              variant="outline"
              size="sm"
              onClick={onJoinSpace}
              className="flex-1"
            >
              <Plus className="h-3 w-3 mr-1" />
              Join Space
            </Button>
          )}
          
          {onViewAllSpaces && (
            <Button
              variant="default"
              size="sm"
              onClick={onViewAllSpaces}
              className="flex-1"
            >
              <Users className="h-3 w-3 mr-1" />
              My Spaces
            </Button>
          )}
          
          {onExploreSpaces && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onExploreSpaces}
              className="text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
            >
              <Search className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Empty State */}
        {joinedSpaces.length === 0 && (
          <div className="text-center py-6">
            <Users className="h-8 w-8 mx-auto mb-3 text-[var(--hive-text-muted)]" />
            <Text variant="body-sm" color="secondary" className="mb-2">
              No spaces joined yet
            </Text>
            <Text variant="body-xs" color="secondary" className="mb-4">
              Discover communities and connect with fellow UB students
            </Text>
            {isEditable && onJoinSpace && (
              <Button
                variant="outline"
                size="sm"
                onClick={onJoinSpace}
              >
                <Plus className="h-3 w-3 mr-1" />
                Explore Spaces
              </Button>
            )}
          </div>
        )}

      </CardContent>

      {/* Hover Glow Effect */}
      {isHovered && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/5 to-green-500/5 rounded-lg blur-xl" />
      )}
    </Card>
  );
};