"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { cn } from '../../lib/utils';
import { Card as HiveCard, CardHeader as HiveCardHeader, CardTitle as HiveCardTitle, CardContent as HiveCardContent } from '../../atomic/ui/card';
import { Button as HiveButton } from '../../atomic/atoms/button-enhanced';
import { Avatar as HiveAvatar } from '../../atomic/atoms/avatar';
import { HiveBadge } from '../hive-badge';
import { InputEnhanced as HiveInput } from '../../atomic/atoms/input-enhanced';
import { 
  Users, 
  Search, 
  UserPlus, 
  Crown, 
  Shield, 
  Star,
  MoreVertical,
  Mail,
  MessageCircle,
  UserMinus,
  Settings
} from 'lucide-react';
import { useRealtimeMembers, useOptimisticUpdates } from '../../hooks/use-live-updates';

// Types
interface SpaceMember {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  role: 'leader' | 'admin' | 'moderator' | 'member';
  joinedAt: Date;
  lastActive?: Date;
  bio?: string;
  major?: string;
  year?: string;
  isOnline?: boolean;
  contributions?: {
    posts: number;
    events: number;
    tools: number;
  };
}

export interface HiveMembersSurfaceProps {
  spaceId: string;
  spaceName?: string;
  isLeader?: boolean;
  currentUserId?: string;
  className?: string;
  variant?: 'widget' | 'full' | 'compact';
  members?: SpaceMember[];
  loading?: boolean;
  error?: Error | null;
  onInviteMember?: () => Promise<void>;
  onRemoveMember?: (memberId: string) => Promise<void>;
  onUpdateRole?: (memberId: string, newRole: SpaceMember['role']) => Promise<void>;
  onMessageMember?: (memberId: string) => void;
}

// Role configuration
const roleConfig = {
  leader: {
    label: 'Leader',
    icon: Crown,
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    priority: 0
  },
  admin: {
    label: 'Admin',
    icon: Shield,
    color: 'bg-red-100 text-red-800 border-red-300',
    priority: 1
  },
  moderator: {
    label: 'Moderator',
    icon: Star,
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    priority: 2
  },
  member: {
    label: 'Member',
    icon: Users,
    color: 'bg-gray-100 text-gray-700 border-gray-300',
    priority: 3
  }
};

// Individual Member Card Component
const MemberCard: React.FC<{
  member: SpaceMember;
  isLeader: boolean;
  currentUserId?: string;
  variant?: 'widget' | 'full' | 'compact';
  onMessage?: () => void;
  onRemove?: () => void;
  onUpdateRole?: (newRole: SpaceMember['role']) => void;
}> = ({ 
  member, 
  isLeader, 
  currentUserId, 
  variant = 'widget',
  onMessage,
  onRemove,
  onUpdateRole 
}) => {
  const [showActions, setShowActions] = useState(false);
  const roleInfo = roleConfig[member.role];
  const RoleIcon = roleInfo.icon;
  const isCurrentUser = member.id === currentUserId;

  return (
    <div className={cn(
      "bg-[var(--hive-white)] rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-all",
      variant === 'compact' && "p-3"
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="relative">
            <HiveAvatar
              src={member.avatar}
              alt={member.name}
              initials={member.name.slice(0, 2).toUpperCase()}
              size={variant === 'compact' ? 'sm' : 'md'}
            />
            {member.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[var(--hive-white)] rounded-full" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-medium text-gray-900 truncate">
                {member.name}
                {isCurrentUser && <span className="text-gray-500 text-sm ml-1">(You)</span>}
              </h4>
              <HiveBadge 
                variant="secondary" 
                className={cn("text-xs flex items-center gap-1", roleInfo.color)}
              >
                <RoleIcon className="h-3 w-3" />
                {roleInfo.label}
              </HiveBadge>
            </div>
            
            {variant !== 'compact' && (
              <>
                {member.bio && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{member.bio}</p>
                )}
                
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  {member.major && <span>{member.major}</span>}
                  {member.year && <span>Class of {member.year}</span>}
                </div>

                {member.contributions && variant === 'full' && (
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>{member.contributions.posts} posts</span>
                    <span>{member.contributions.events} events</span>
                    <span>{member.contributions.tools} tools</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {showActions && (
            <div className="absolute right-0 top-8 w-48 bg-[var(--hive-white)] rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              {!isCurrentUser && (
                <>
                  <button
                    onClick={() => {
                      onMessage?.();
                      setShowActions(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Send message
                  </button>
                  
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      Send email
                    </a>
                  )}
                </>
              )}

              {isLeader && !isCurrentUser && member.role !== 'leader' && (
                <>
                  <div className="border-t border-gray-100 my-1" />
                  
                  {member.role !== 'admin' && (
                    <button
                      onClick={() => {
                        onUpdateRole?.('admin');
                        setShowActions(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Shield className="h-4 w-4" />
                      Make admin
                    </button>
                  )}
                  
                  {member.role !== 'moderator' && (
                    <button
                      onClick={() => {
                        onUpdateRole?.('moderator');
                        setShowActions(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Star className="h-4 w-4" />
                      Make moderator
                    </button>
                  )}
                  
                  {member.role !== 'member' && (
                    <button
                      onClick={() => {
                        onUpdateRole?.('member');
                        setShowActions(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Users className="h-4 w-4" />
                      Remove role
                    </button>
                  )}
                  
                  <div className="border-t border-gray-100 my-1" />
                  
                  <button
                    onClick={() => {
                      onRemove?.();
                      setShowActions(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <UserMinus className="h-4 w-4" />
                    Remove from space
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Surface Component
export const HiveMembersSurface: React.FC<HiveMembersSurfaceProps> = ({
  spaceId,
  spaceName,
  isLeader = false,
  currentUserId,
  className,
  variant = 'widget',
  members: propMembers,
  loading = false,
  error = null,
  onInviteMember,
  onRemoveMember,
  onUpdateRole,
  onMessageMember,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterRole, setFilterRole] = useState<SpaceMember['role'] | 'all'>('all');

  // Real-time members data
  const { data: realtimeMembers, loading: realtimeLoading, error: realtimeError } = useRealtimeMembers(spaceId);
  const { data: optimisticMembers } = useOptimisticUpdates<SpaceMember>((propMembers || realtimeMembers || []) as SpaceMember[]);

  // No mock data - use real members only
  const emptyMembers: SpaceMember[] = [];
  
  /* Removed mock data
  const mockMembers: SpaceMember[] = useMemo(() => [
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@university.edu',
      role: 'leader',
      joinedAt: new Date('2024-01-15'),
      bio: 'Computer Science major passionate about building communities',
      major: 'Computer Science',
      year: '2025',
      isOnline: true,
      contributions: { posts: 45, events: 12, tools: 3 }
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      email: 'marcus.j@university.edu',
      role: 'admin',
      joinedAt: new Date('2024-01-20'),
      bio: 'Business & Tech double major. Always looking to help!',
      major: 'Business',
      year: '2024',
      isOnline: true,
      contributions: { posts: 28, events: 8, tools: 2 }
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'moderator',
      joinedAt: new Date('2024-02-01'),
      bio: 'Design enthusiast and UX researcher',
      major: 'Design',
      year: '2025',
      isOnline: false,
      contributions: { posts: 34, events: 5, tools: 1 }
    },
    {
      id: '4',
      name: 'Alex Kim',
      role: 'member',
      joinedAt: new Date('2024-02-15'),
      major: 'Engineering',
      year: '2026',
      isOnline: false,
      contributions: { posts: 12, events: 3, tools: 0 }
    },
    {
      id: '5',
      name: 'Jordan Lee',
      role: 'member',
      joinedAt: new Date('2024-03-01'),
      bio: 'Freshman exploring tech and entrepreneurship',
      major: 'Undeclared',
      year: '2027',
      isOnline: true,
      contributions: { posts: 8, events: 2, tools: 0 }
    }
  ], []);
  */

  // Use optimistic members for immediate UI updates
  const members = optimisticMembers || emptyMembers;
  const isLoading = loading || realtimeLoading;
  const displayError = error || realtimeError;

  // Filter and sort members
  const filteredMembers = useMemo(() => {
    let filtered = [...members];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.major?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by role
    if (filterRole !== 'all') {
      filtered = filtered.filter(member => member.role === filterRole);
    }

    // Sort by role priority, then by name
    filtered.sort((a, b) => {
      const roleDiff = roleConfig[a.role].priority - roleConfig[b.role].priority;
      if (roleDiff !== 0) return roleDiff;
      return a.name.localeCompare(b.name);
    });

    return filtered;
  }, [members, searchQuery, filterRole]);

  // Stats
  const stats = useMemo(() => {
    const roleCount = members.reduce((acc, member) => {
      acc[member.role] = (acc[member.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const onlineCount = members.filter(m => m.isOnline).length;

    return { roleCount, onlineCount, total: members.length };
  }, [members]);

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-lg h-20 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i: number) => (
              <div key={i} className="bg-gray-100 rounded-lg h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (displayError) {
    return (
      <HiveCard className={cn("p-6", className)}>
        <div className="text-center space-y-2">
          <p className="text-gray-600">Unable to load members</p>
          <p className="text-sm text-gray-500">{displayError.message}</p>
        </div>
      </HiveCard>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {variant === 'full' && spaceName ? `${spaceName} Members` : 'Members'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {stats.total} members • {stats.onlineCount} online
          </p>
        </div>

        {isLeader && variant === 'full' && (
          <HiveButton
            variant="primary"
            size="sm"
            onClick={onInviteMember}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Invite Members
          </HiveButton>
        )}
      </div>

      {/* Search and Filters */}
      {variant === 'full' && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <HiveInput
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              // icon={<Search className="h-4 w-4 text-gray-400" />}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterRole}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterRole(e.target.value as 'all' | 'leader' | 'member' | 'moderator' | 'admin')}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold)]"
            >
              <option value="all">All Roles</option>
              <option value="leader">Leaders</option>
              <option value="admin">Admins</option>
              <option value="moderator">Moderators</option>
              <option value="member">Members</option>
            </select>
            
            <div className="flex border border-gray-200 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "px-3 py-2 text-sm",
                  viewMode === 'grid' ? "bg-gray-100" : "hover:bg-gray-50"
                )}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "px-3 py-2 text-sm",
                  viewMode === 'list' ? "bg-gray-100" : "hover:bg-gray-50"
                )}
              >
                List
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Members Grid/List */}
      <div className={cn(
        "grid gap-4",
        viewMode === 'grid' && variant === 'full' 
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1"
      )}>
        {filteredMembers.length === 0 ? (
          <HiveCard className="col-span-full p-8">
            <div className="text-center space-y-2">
              <p className="text-gray-600">No members found</p>
              <p className="text-sm text-gray-500">
                {searchQuery ? "Try adjusting your search" : "Be the first to join!"}
              </p>
            </div>
          </HiveCard>
        ) : (
          filteredMembers
            .slice(0, variant === 'widget' ? 5 : undefined)
            .map((member: SpaceMember) => (
              <MemberCard
                key={member.id}
                member={member}
                isLeader={isLeader}
                currentUserId={currentUserId}
                variant={variant}
                onMessage={() => onMessageMember?.(member.id)}
                onRemove={() => onRemoveMember?.(member.id)}
                onUpdateRole={(newRole) => onUpdateRole?.(member.id, newRole)}
              />
            ))
        )}
      </div>

      {/* View More for widget variant */}
      {variant === 'widget' && filteredMembers.length > 5 && (
        <button className="w-full py-2 text-sm text-[var(--hive-gold-dark)] hover:text-orange-700 font-medium">
          View all {filteredMembers.length} members →
        </button>
      )}
    </div>
  );
};

// Export display name for debugging
HiveMembersSurface.displayName = 'HiveMembersSurface';