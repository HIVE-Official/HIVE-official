'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  Crown,
  Shield,
  User,
  MoreVertical,
  UserPlus,
  UserX,
  Settings,
  MessageCircle,
  Search,
  X,
  Wifi,
  WifiOff,
  Clock,
  Star,
  Ban,
  Volume2,
  VolumeX
} from 'lucide-react';
import {
  Card,
  Button,
  Avatar,
  Badge,
  Input
} from '@hive/ui';
import type { User as UserType } from '@hive/core';

// Define missing types that should be in @hive/core
interface SpaceMember {
  id: string;
  userId: string;
  spaceId: string;
  role: 'owner' | 'admin' | 'moderator' | 'member';
  joinedAt: Date;
  isActive: boolean;
}
import { formatDistanceToNow } from 'date-fns';

interface MemberWithUser extends SpaceMember {
  user: UserType;
  isOnline?: boolean;
  lastSeen?: Date;
}

interface SpaceMemberListProps {
  spaceId: string;
  userMembership: SpaceMember | null;
  onlineMembers: UserType[];
  onClose: () => void;
  spaceRules?: import('@/lib/space-type-rules').SpaceTypeRules | null;
}

const ROLE_CONFIGS = {
  owner: {
    label: 'Owner',
    icon: Crown,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    priority: 1
  },
  admin: {
    label: 'Admin',
    icon: Shield,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    priority: 2
  },
  moderator: {
    label: 'Mod',
    icon: Settings,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    priority: 3
  },
  member: {
    label: 'Member',
    icon: User,
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/10',
    priority: 4
  }
};

export function SpaceMemberList({ spaceId, userMembership, onlineMembers, onClose, spaceRules }: SpaceMemberListProps) {
  const [members, setMembers] = useState<MemberWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'online' | 'offline'>('online');
  const [showInviteModal, setShowInviteModal] = useState(false);

  const isAdmin = userMembership?.role === 'admin' || userMembership?.role === 'owner';

  // Space rules-based permissions and features
  const canViewMemberProfiles = spaceRules?.visibility.memberProfiles !== 'limited_external' || !!userMembership;
  const isGreekLife = spaceRules?.membership.joinMethod === 'invitation_only';
  const isResidential = spaceRules?.membership.maxSpaces === 1;
  const requiresApproval = spaceRules?.membership.joinMethod === 'approval';

  // Customize member list based on space type
  const getMemberSectionTitle = () => {
    if (isGreekLife) return "Chapter Members";
    if (isResidential) return "Residents";
    return "Community Members";
  };

  const getInviteButtonText = () => {
    if (isGreekLife) return "Send Invitation";
    if (requiresApproval) return "Invite to Apply";
    return "Invite Member";
  };
  const canManageMembers = userMembership?.role === 'admin' || userMembership?.role === 'owner';

  // Fetch members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`/api/spaces/${spaceId}/members`);
        const data = await response.json();

        if (data.success) {
          const membersWithOnlineStatus = data.data.map((member: MemberWithUser) => ({
            ...member,
            isOnline: onlineMembers.some(om => om.id === member.user.id)
          }));

          // Sort by role priority, then online status, then alphabetically
          membersWithOnlineStatus.sort((a: MemberWithUser, b: MemberWithUser) => {
            const roleA = ROLE_CONFIGS[a.role as keyof typeof ROLE_CONFIGS] || ROLE_CONFIGS.member;
            const roleB = ROLE_CONFIGS[b.role as keyof typeof ROLE_CONFIGS] || ROLE_CONFIGS.member;

            if (roleA.priority !== roleB.priority) {
              return roleA.priority - roleB.priority;
            }

            if (a.isOnline !== b.isOnline) {
              return a.isOnline ? -1 : 1;
            }

            return a.user.fullName.localeCompare(b.user.fullName);
          });

          setMembers(membersWithOnlineStatus);
        }
      } catch (error) {
        console.error('Failed to fetch members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [spaceId, onlineMembers]);

  // Filter members based on search and tab
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.user.handle?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === 'all' ||
                      (activeTab === 'online' && member.isOnline) ||
                      (activeTab === 'offline' && !member.isOnline);

    return matchesSearch && matchesTab;
  });

  // Handle member actions
  const handleKickMember = async (memberId: string) => {
    try {
      await fetch(`/api/spaces/${spaceId}/members/${memberId}`, {
        method: 'DELETE'
      });

      setMembers(prev => prev.filter(m => m.id !== memberId));
    } catch (error) {
      console.error('Failed to kick member:', error);
    }
  };

  const handleChangeRole = async (memberId: string, newRole: 'owner' | 'admin' | 'moderator' | 'member') => {
    try {
      await fetch(`/api/spaces/${spaceId}/members/${memberId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });

      setMembers(prev => prev.map(m =>
        m.id === memberId ? { ...m, role: newRole } : m
      ));
    } catch (error) {
      console.error('Failed to change role:', error);
    }
  };

  const onlineCount = members.filter(m => m.isOnline).length;
  const totalCount = members.length;

  return (
    <div className="h-full flex flex-col bg-gray-950">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-[var(--hive-brand-primary)]" />
            <h3 className="text-lg font-semibold text-white">Members</h3>
            <Badge variant="sophomore" className="text-xs">
              {totalCount}
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            {canManageMembers && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowInviteModal(true)}
              >
                <UserPlus className="w-4 h-4" />
              </Button>
            )}

            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors lg:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            value={searchQuery}
            onChange={(e: React.ChangeEvent) => setSearchQuery(e.target.value)}
            placeholder="Search members..."
            className="pl-10 bg-gray-800 border-gray-700 text-white text-sm"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('online')}
            className={`flex-1 text-xs font-medium py-2 px-3 rounded-md transition-colors ${
              activeTab === 'online'
                ? 'bg-green-500/20 text-green-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Online — {onlineCount}
          </button>
          <button
            onClick={() => setActiveTab('offline')}
            className={`flex-1 text-xs font-medium py-2 px-3 rounded-md transition-colors ${
              activeTab === 'offline'
                ? 'bg-gray-600/20 text-gray-300'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Offline — {totalCount - onlineCount}
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 text-xs font-medium py-2 px-3 rounded-md transition-colors ${
              activeTab === 'all'
                ? 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All
          </button>
        </div>
      </div>

      {/* Member List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-1"></div>
                  <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="p-4 text-center">
            <Users className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">
              {searchQuery ? 'No members found' : 'No members in this category'}
            </p>
          </div>
        ) : (
          <div className="p-2">
            {filteredMembers.map((member) => (
              <MemberItem
                key={member.id}
                member={member}
                currentUserMembership={userMembership}
                onKick={handleKickMember}
                onChangeRole={handleChangeRole}
              />
            ))}
          </div>
        )}
      </div>

      {/* Online Status Summary */}
      <div className="p-4 border-t border-gray-800 bg-gray-900/50">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{onlineCount} online</span>
          </div>
          <span>{totalCount} total members</span>
        </div>
      </div>
    </div>
  );
}

// Individual Member Item Component
function MemberItem({
  member,
  currentUserMembership,
  onKick,
  onChangeRole
}: {
  member: MemberWithUser;
  currentUserMembership: SpaceMember | null;
  onKick: (memberId: string) => void;
  onChangeRole: (memberId: string, role: 'owner' | 'admin' | 'moderator' | 'member') => void;
}) {
  const roleConfig = ROLE_CONFIGS[member.role as keyof typeof ROLE_CONFIGS] || ROLE_CONFIGS.member;
  const RoleIcon = roleConfig.icon;

  const canManageThisMember = currentUserMembership &&
    (currentUserMembership.role === 'owner' ||
     (currentUserMembership.role === 'admin' && member.role === 'member'));

  const isCurrentUser = currentUserMembership?.userId === member.userId;

  return (
    <div className="group flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors">
      {/* Avatar with status */}
      <div className="relative">
        <Avatar
          src={member.user.avatarUrl}
          fallback={member.user.fullName?.[0]}
          className="w-8 h-8"
        />

        {/* Online status indicator */}
        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-gray-950 rounded-full ${
          member.isOnline ? 'bg-green-500' : 'bg-gray-500'
        }`} />
      </div>

      {/* Member info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-white truncate">
            {member.user.fullName}
            {isCurrentUser && (
              <span className="text-xs text-gray-400 ml-1">(you)</span>
            )}
          </span>

          {/* Role badge */}
          <div className={`flex items-center space-x-1 px-2 py-0.5 rounded text-xs ${roleConfig.bgColor}`}>
            <RoleIcon className={`w-3 h-3 ${roleConfig.color}`} />
            <span className={roleConfig.color}>{roleConfig.label}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-400">
          {member.user.handle && (
            <span>@{member.user.handle}</span>
          )}

          {!member.isOnline && member.lastSeen && (
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>
                Last seen {formatDistanceToNow(new Date(member.lastSeen), { addSuffix: true })}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Direct message */}
        <button className="p-1 text-gray-400 hover:text-[var(--hive-brand-primary)] hover:bg-gray-700 rounded transition-colors">
          <MessageCircle className="w-4 h-4" />
        </button>

        {/* Member management menu */}
        {canManageThisMember && !isCurrentUser && (
          <div className="relative">
            <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
            {/* Simplified menu - would need proper dropdown implementation */}
          </div>
        )}
      </div>
    </div>
  );
}