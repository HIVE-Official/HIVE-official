'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from '../../framer-motion-proxy';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader } from '../../atomic/ui/card';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Badge } from '../../atomic/atoms/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { ScrollArea } from '../../ui/scroll-area';
import { Input } from '../../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../dialog';
import { 
  Users,
  Plus,
  Search,
  Settings,
  Crown,
  Lock,
  Globe,
  MessageSquare,
  Calendar,
  BookOpen,
  Coffee,
  Code,
  Heart,
  Eye,
  MoreHorizontal,
  ExternalLink,
  UserPlus,
  LogIn,
  Star,
  TrendingUp,
  Clock,
  Hash,
  MapPin,
  Zap,
  Shield,
  AlertCircle,
  CheckCircle,
  Filter,
  SortAsc,
  Grid,
  List
} from 'lucide-react';

// Space Types
export interface Space {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  coverImage?: string;
  type: 'academic' | 'social' | 'hobby' | 'study' | 'dorm' | 'org' | 'professional';
  category: string;
  privacy: 'public' | 'private' | 'university';
  memberCount: number;
  maxMembers?: number;
  isActive: boolean;
  createdAt: Date;
  lastActivity: Date;
  
  // User's relationship to space
  membershipStatus: 'member' | 'admin' | 'pending' | 'invited' | 'not-member';
  role?: 'member' | 'moderator' | 'admin' | 'founder';
  joinedAt?: Date;
  
  // Space activity
  recentActivity?: {
    type: 'post' | 'event' | 'tool' | 'member';
    title: string;
    timestamp: Date;
    actor?: { name: string; avatar?: string };
  };
  
  // Space stats
  stats: {
    postsThisWeek: number;
    eventsThisWeek: number;
    activeMembers: number;
    newMembersThisWeek: number;
  };
  
  // Tags and features
  tags: string[];
  features: ('tools' | 'events' | 'chat' | 'calendar' | 'files')[];
  
  // UB-specific
  building?: string;
  course?: string;
  semester?: string;
  isOfficial?: boolean;
}

export interface SpacesCardProps {
  spaces: Space[];
  recommendedSpaces?: Space[];
  isEditMode: boolean;
  onSpaceClick?: (spaceId: string) => void;
  onJoinSpace?: (spaceId: string) => void;
  onLeaveSpace?: (spaceId: string) => void;
  onCreateSpace?: () => void;
  onSearchSpaces?: (query: string) => void;
  onSettingsClick?: () => void;
  className?: string;
}

// Space Type Configuration
const spaceTypeConfig = {
  academic: { 
    icon: BookOpen, 
    color: 'bg-blue-500', 
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    label: 'Academic' 
  },
  social: { 
    icon: Coffee, 
    color: 'bg-green-500', 
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
    label: 'Social' 
  },
  study: { 
    icon: BookOpen, 
    color: 'bg-purple-500', 
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
    label: 'Study' 
  },
  dorm: { 
    icon: MapPin, 
    color: 'bg-orange-500', 
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50',
    label: 'Dorm' 
  },
  org: { 
    icon: Users, 
    color: 'bg-pink-500', 
    textColor: 'text-pink-700',
    bgColor: 'bg-pink-50',
    label: 'Organization' 
  },
  hobby: { 
    icon: Heart, 
    color: 'bg-red-500', 
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
    label: 'Hobby' 
  },
  professional: { 
    icon: Code, 
    color: 'bg-gray-500', 
    textColor: 'text-gray-700',
    bgColor: 'bg-gray-50',
    label: 'Professional' 
  }
};

// Role Configuration
const roleConfig = {
  founder: { icon: Crown, color: 'text-yellow-600', label: 'Founder' },
  admin: { icon: Shield, color: 'text-red-600', label: 'Admin' },
  moderator: { icon: Star, color: 'text-blue-600', label: 'Moderator' },
  member: { icon: Users, color: 'text-gray-600', label: 'Member' }
};

// Time formatting
function formatLastActivity(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Space Item Component
function SpaceItem({ 
  space, 
  onClick,
  onJoin,
  onLeave,
  variant = 'default'
}: { 
  space: Space;
  onClick?: (spaceId: string) => void;
  onJoin?: (spaceId: string) => void;
  onLeave?: (spaceId: string) => void;
  variant?: 'default' | 'compact' | 'recommended';
}) {
  const config = spaceTypeConfig[space.type];
  const TypeIcon = config.icon;
  const isCompact = variant === 'compact';
  const isRecommended = variant === 'recommended';

  const handleAction = useCallback((e: React.MouseEvent, action: 'join' | 'leave' | 'view') => {
    e.stopPropagation();
    switch (action) {
      case 'join':
        onJoin?.(space.id);
        break;
      case 'leave':
        onLeave?.(space.id);
        break;
      case 'view':
        onClick?.(space.id);
        break;
    }
  }, [space.id, onClick, onJoin, onLeave]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'group relative p-3 rounded-lg border transition-all hover:shadow-md cursor-pointer',
        isRecommended ? config.bgColor : 'bg-white border-[var(--hive-border-primary)]',
        'hover:border-[var(--hive-brand-primary)]'
      )}
      onClick={() => onClick?.(space.id)}
    >
      <div className="flex gap-3">
        {/* Space Avatar */}
        <div className="relative flex-shrink-0">
          <Avatar className={cn(isCompact ? 'w-10 h-10' : 'w-12 h-12')}>
            <AvatarImage src={space.avatar} />
            <AvatarFallback className={cn('text-sm', config.textColor, config.bgColor)}>
              {space.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          {/* Privacy Indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center border">
            {space.privacy === 'private' ? (
              <Lock className="w-2.5 h-2.5 text-gray-600" />
            ) : space.privacy === 'university' ? (
              <Shield className="w-2.5 h-2.5 text-blue-600" />
            ) : (
              <Globe className="w-2.5 h-2.5 text-green-600" />
            )}
          </div>
        </div>

        {/* Space Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h4 className={cn(
                'font-medium truncate',
                isCompact ? 'text-sm' : 'text-base',
                'text-[var(--hive-text-primary)]'
              )}>
                {space.name}
                {space.isOfficial && (
                  <CheckCircle className="inline w-3 h-3 ml-1 text-blue-500" />
                )}
              </h4>
              
              {!isCompact && (
                <p className="text-xs text-[var(--hive-text-muted)] mt-0.5 line-clamp-2">
                  {space.description}
                </p>
              )}

              {/* Tags & Category */}
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                  <TypeIcon className="w-3 h-3 mr-1" />
                  {space.category}
                </Badge>
                
                {space.course && (
                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                    {space.course}
                  </Badge>
                )}
              </div>
            </div>

            {/* Member Role */}
            {space.role && space.membershipStatus === 'member' && (
              <div className="flex-shrink-0">
                {roleConfig[space.role] && (
                  <Badge variant="secondary" className="text-xs">
                    {React.createElement(roleConfig[space.role].icon, { 
                      className: `w-3 h-3 mr-1 ${roleConfig[space.role].color}` 
                    })}
                    {roleConfig[space.role].label}
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 mt-2 text-xs text-[var(--hive-text-muted)]">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {space.memberCount}
              {space.maxMembers && ` / ${space.maxMembers}`}
            </div>
            
            {!isCompact && space.stats.activeMembers > 0 && (
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {space.stats.activeMembers} active
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatLastActivity(space.lastActivity)}
            </div>
          </div>

          {/* Recent Activity */}
          {!isCompact && space.recentActivity && (
            <div className="mt-2 p-2 bg-[var(--hive-background-tertiary)] rounded text-xs">
              <span className="text-[var(--hive-text-muted)]">
                {space.recentActivity.actor?.name || 'Someone'} {space.recentActivity.title}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 mt-3">
            {space.membershipStatus === 'not-member' && (
              <Button
                size="sm"
                className="h-6 px-3 text-xs"
                onClick={(e) => handleAction(e, 'join')}
              >
                <UserPlus className="w-3 h-3 mr-1" />
                Join
              </Button>
            )}
            
            {space.membershipStatus === 'pending' && (
              <Button
                size="sm"
                variant="secondary"
                className="h-6 px-3 text-xs"
                disabled
              >
                <Clock className="w-3 h-3 mr-1" />
                Pending
              </Button>
            )}
            
            {space.membershipStatus === 'invited' && (
              <>
                <Button
                  size="sm"
                  className="h-6 px-3 text-xs"
                  onClick={(e) => handleAction(e, 'join')}
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-6 px-3 text-xs"
                >
                  Decline
                </Button>
              </>
            )}
            
            {(space.membershipStatus === 'member' || space.membershipStatus === 'admin') && (
              <Button
                size="sm"
                variant="secondary"
                className="h-6 px-3 text-xs"
                onClick={(e) => handleAction(e, 'view')}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Open
              </Button>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
          >
            <MoreHorizontal className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Trending Indicator */}
      {space.stats.newMembersThisWeek > 5 && (
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
            <TrendingUp className="w-3 h-3 mr-1" />
            Trending
          </Badge>
        </div>
      )}
    </motion.div>
  );
}

// Space Search Component
function SpaceSearch({ 
  onSearch,
  onCreateSpace 
}: { 
  onSearch?: (query: string) => void;
  onCreateSpace?: () => void;
}) {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    onSearch?.(value);
  }, [onSearch]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--hive-text-muted)]" />
        <Input
          placeholder="Search spaces..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 h-9"
        />
      </div>
      
      <Button
        variant="secondary"
        size="sm"
        className="w-full"
        onClick={onCreateSpace}
      >
        <Plus className="w-4 h-4 mr-2" />
        Create New Space
      </Button>
    </div>
  );
}

// Space Stats Component
function SpaceStats({ spaces }: { spaces: Space[] }) {
  const stats = useMemo(() => {
    const memberSpaces = spaces.filter(s => s.membershipStatus === 'member' || s.membershipStatus === 'admin');
    const adminSpaces = spaces.filter(s => s.membershipStatus === 'admin' || s.role === 'admin' || s.role === 'founder');
    const totalMembers = memberSpaces.reduce((sum, space) => sum + space.memberCount, 0);
    const activeThisWeek = memberSpaces.filter(s => 
      new Date().getTime() - s.lastActivity.getTime() < 7 * 24 * 60 * 60 * 1000
    ).length;

    return {
      memberSpaces: memberSpaces.length,
      adminSpaces: adminSpaces.length,
      totalMembers,
      activeThisWeek
    };
  }, [spaces]);

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="text-center p-2 bg-[var(--hive-background-tertiary)] rounded-lg">
        <div className="text-lg font-semibold text-[var(--hive-text-primary)]">
          {stats.memberSpaces}
        </div>
        <div className="text-xs text-[var(--hive-text-muted)]">Spaces Joined</div>
      </div>
      
      <div className="text-center p-2 bg-[var(--hive-background-tertiary)] rounded-lg">
        <div className="text-lg font-semibold text-[var(--hive-text-primary)]">
          {stats.adminSpaces}
        </div>
        <div className="text-xs text-[var(--hive-text-muted)]">Leading</div>
      </div>
    </div>
  );
}

// Main Spaces Card Component
export function SpacesCard({
  spaces,
  recommendedSpaces = [],
  isEditMode,
  onSpaceClick,
  onJoinSpace,
  onLeaveSpace,
  onCreateSpace,
  onSearchSpaces,
  onSettingsClick,
  className
}: SpacesCardProps) {
  const [activeTab, setActiveTab] = useState<'my' | 'recommended' | 'search'>('my');
  const [showAllSpaces, setShowAllSpaces] = useState(false);

  // Filter user's spaces
  const mySpaces = useMemo(() => {
    return spaces
      .filter(space => 
        space.membershipStatus === 'member' || 
        space.membershipStatus === 'admin' ||
        space.membershipStatus === 'pending' ||
        space.membershipStatus === 'invited'
      )
      .sort((a, b) => {
        // Sort by role first (admin > member), then by last activity
        const roleOrder = { admin: 0, moderator: 1, member: 2 };
        const aRole = a.role || 'member';
        const bRole = b.role || 'member';
        
        if (roleOrder[aRole] !== roleOrder[bRole]) {
          return roleOrder[aRole] - roleOrder[bRole];
        }
        
        return b.lastActivity.getTime() - a.lastActivity.getTime();
      });
  }, [spaces]);

  const displayedSpaces = showAllSpaces ? mySpaces : mySpaces.slice(0, 4);
  const hasMoreSpaces = mySpaces.length > 4;

  const pendingInvites = useMemo(() => 
    mySpaces.filter(space => space.membershipStatus === 'invited'),
    [mySpaces]
  );

  return (
    <Card className={cn('h-full overflow-hidden', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[var(--hive-brand-primary)]" />
            <h3 className="font-semibold text-[var(--hive-text-primary)]">Spaces</h3>
            {pendingInvites.length > 0 && (
              <Badge variant="destructive" className="text-xs">
                {pendingInvites.length} invite{pendingInvites.length > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          
          {!isEditMode && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={onSettingsClick}
            >
              <Settings className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1">
          {[
            { key: 'my', label: 'My Spaces', count: mySpaces.length },
            { key: 'recommended', label: 'Discover', count: recommendedSpaces.length },
            { key: 'search', label: 'Search' }
          ].map(({ key, label, count }) => (
            <Button
              key={key}
              size="sm"
              variant={activeTab === key ? "default" : "ghost"}
              className="h-7 px-3 text-xs"
              onClick={() => setActiveTab(key as any)}
            >
              {label}
              {count !== undefined && count > 0 && (
                <Badge variant="secondary" className="ml-1 h-4 px-1 text-xs">
                  {count}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Space Stats */}
        {activeTab === 'my' && mySpaces.length > 0 && (
          <SpaceStats spaces={mySpaces} />
        )}

        {/* Search Interface */}
        {activeTab === 'search' && (
          <SpaceSearch 
            onSearch={onSearchSpaces}
            onCreateSpace={onCreateSpace}
          />
        )}

        {/* Pending Invites */}
        {activeTab === 'my' && pendingInvites.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-[var(--hive-text-primary)] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-orange-500" />
              Pending Invites
            </h4>
            {pendingInvites.map((space) => (
              <SpaceItem
                key={space.id}
                space={space}
                onClick={onSpaceClick}
                onJoin={onJoinSpace}
                onLeave={onLeaveSpace}
                variant="compact"
              />
            ))}
          </div>
        )}

        {/* Spaces List */}
        <div className="space-y-3">
          {activeTab === 'my' && (
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">
                Your Spaces ({mySpaces.filter(s => s.membershipStatus === 'member' || s.membershipStatus === 'admin').length})
              </h4>
              {hasMoreSpaces && !showAllSpaces && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-xs"
                  onClick={() => setShowAllSpaces(true)}
                >
                  View All
                </Button>
              )}
            </div>
          )}

          <ScrollArea className="max-h-96">
            <div className="space-y-3">
              <AnimatePresence>
                {activeTab === 'my' && (
                  displayedSpaces
                    .filter(space => space.membershipStatus === 'member' || space.membershipStatus === 'admin')
                    .map((space) => (
                      <SpaceItem
                        key={space.id}
                        space={space}
                        onClick={onSpaceClick}
                        onJoin={onJoinSpace}
                        onLeave={onLeaveSpace}
                      />
                    ))
                )}

                {activeTab === 'recommended' && (
                  recommendedSpaces.length > 0 ? (
                    recommendedSpaces.slice(0, 5).map((space) => (
                      <SpaceItem
                        key={space.id}
                        space={space}
                        onClick={onSpaceClick}
                        onJoin={onJoinSpace}
                        onLeave={onLeaveSpace}
                        variant="recommended"
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8 text-[var(--hive-text-muted)]"
                    >
                      <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">No recommendations yet</p>
                    </motion.div>
                  )
                )}

                {activeTab === 'search' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-[var(--hive-text-muted)]"
                  >
                    <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Search for spaces to join</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Empty States */}
              {activeTab === 'my' && mySpaces.filter(s => s.membershipStatus === 'member' || s.membershipStatus === 'admin').length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-[var(--hive-text-muted)]"
                >
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm mb-3">Join your first space!</p>
                  <Button size="sm" onClick={onCreateSpace}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Space
                  </Button>
                </motion.div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Quick Actions */}
        {activeTab === 'my' && mySpaces.length > 0 && (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={onCreateSpace}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={() => setActiveTab('recommended')}
            >
              <Search className="w-4 h-4 mr-2" />
              Discover
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Default props for development
export const mockSpaces: Space[] = [
  {
    id: 'space-1',
    name: 'CS 250 Study Group',
    description: 'Data Structures and Algorithms study group for CSE250 students.',
    avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=128&h=128&fit=crop',
    type: 'academic',
    category: 'Study Group',
    privacy: 'university',
    memberCount: 24,
    maxMembers: 30,
    isActive: true,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
    membershipStatus: 'member',
    role: 'moderator',
    joinedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    recentActivity: {
      type: 'post',
      title: 'shared practice problems for the final',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      actor: { name: 'Alex Kim', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' }
    },
    stats: {
      postsThisWeek: 8,
      eventsThisWeek: 2,
      activeMembers: 18,
      newMembersThisWeek: 3
    },
    tags: ['cse250', 'algorithms', 'finals'],
    features: ['tools', 'events', 'chat', 'files'],
    course: 'CSE 250',
    isOfficial: true
  },
  {
    id: 'space-2',
    name: 'Ellicott Complex - 3rd Floor',
    description: 'Floor community for third floor residents of Ellicott Complex.',
    type: 'dorm',
    category: 'Floor Community',
    privacy: 'private',
    memberCount: 42,
    isActive: true,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 30 * 60 * 1000),
    membershipStatus: 'member',
    role: 'member',
    joinedAt: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000),
    recentActivity: {
      type: 'event',
      title: 'created "Movie Night Friday"',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      actor: { name: 'Sarah Chen' }
    },
    stats: {
      postsThisWeek: 15,
      eventsThisWeek: 3,
      activeMembers: 35,
      newMembersThisWeek: 1
    },
    tags: ['dorm', 'community', 'events'],
    features: ['events', 'chat', 'calendar'],
    building: 'Ellicott Complex'
  },
  {
    id: 'space-3',
    name: 'UB Photography Club',
    description: 'Share your photos, learn techniques, and explore Buffalo together!',
    avatar: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=128&h=128&fit=crop',
    type: 'hobby',
    category: 'Creative',
    privacy: 'public',
    memberCount: 156,
    isActive: true,
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000),
    membershipStatus: 'member',
    role: 'member',
    joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    stats: {
      postsThisWeek: 25,
      eventsThisWeek: 1,
      activeMembers: 45,
      newMembersThisWeek: 8
    },
    tags: ['photography', 'creative', 'buffalo'],
    features: ['chat', 'events', 'files'],
    isOfficial: false
  },
  {
    id: 'space-4',
    name: 'CS Career Prep',
    description: 'Interview prep, internship tips, and job search strategies for CS students.',
    type: 'professional',
    category: 'Career Development',
    privacy: 'university',
    memberCount: 89,
    isActive: true,
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 6 * 60 * 60 * 1000),
    membershipStatus: 'invited',
    stats: {
      postsThisWeek: 12,
      eventsThisWeek: 2,
      activeMembers: 32,
      newMembersThisWeek: 7
    },
    tags: ['career', 'internships', 'interviews'],
    features: ['tools', 'events', 'chat']
  }
];

export const mockRecommendedSpaces: Space[] = [
  {
    id: 'rec-1',
    name: 'UB Hackathon 2024',
    description: 'Official space for UB\'s biggest hackathon of the year!',
    type: 'academic',
    category: 'Event',
    privacy: 'public',
    memberCount: 234,
    isActive: true,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000),
    membershipStatus: 'not-member',
    stats: {
      postsThisWeek: 45,
      eventsThisWeek: 5,
      activeMembers: 180,
      newMembersThisWeek: 67
    },
    tags: ['hackathon', 'coding', 'competition'],
    features: ['tools', 'events', 'chat', 'calendar'],
    isOfficial: true
  },
  {
    id: 'rec-2',
    name: 'Buffalo Food Lovers',
    description: 'Discover the best eats around Buffalo and UB campus!',
    type: 'social',
    category: 'Food & Dining',
    privacy: 'public',
    memberCount: 445,
    isActive: true,
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 20 * 60 * 1000),
    membershipStatus: 'not-member',
    stats: {
      postsThisWeek: 28,
      eventsThisWeek: 3,
      activeMembers: 156,
      newMembersThisWeek: 12
    },
    tags: ['food', 'buffalo', 'dining'],
    features: ['chat', 'events']
  }
];