'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  MoreVertical, 
  Crown,
  Shield,
  User,
  X,
  Check,
  Clock,
  Mail,
  UserMinus,
  Settings,
  Eye,
  Sliders,
  ChevronDown,
  Hash,
  Calendar,
  Activity,
  StarIcon,
  MessageCircle,
  Share2
} from 'lucide-react';

export type DirectoryMemberRole = 'leader' | 'co_leader' | 'member' | 'pending';
export type DirectoryMemberStatus = 'active' | 'inactive' | 'banned' | 'pending';

export interface DirectorySpaceMember {
  id: string;
  handle: string;
  displayName: string;
  avatar?: string;
  role: DirectoryMemberRole;
  status: DirectoryMemberStatus;
  joinedAt: string;
  lastActive?: string;
  bio?: string;
  major?: string;
  year?: string;
  
  // Activity stats
  postsCount: number;
  eventsAttended: number;
  toolsUsed: number;
  
  // Permissions
  canManageMembers: boolean;
  canManageTools: boolean;
  canCreateEvents: boolean;
  canModerate: boolean;
  
  // Contact
  email?: string;
  isOnline?: boolean;
}

export type MemberFilterType = 'all' | 'leaders' | 'members' | 'pending' | 'online';
export type MemberSortType = 'name' | 'role' | 'joined' | 'activity';

export interface SpaceMemberDirectoryProps {
  members: DirectorySpaceMember[];
  currentUserRole: DirectoryMemberRole;
  spaceType: 'university' | 'residential' | 'greek' | 'student';
  onInviteMembers?: () => void;
  onManageMember?: (memberId: string, action: 'promote' | 'demote' | 'remove' | 'ban' | 'unban') => Promise<void>;
  onViewMemberProfile?: (memberId: string) => void;
  onMessageMember?: (memberId: string) => void;
  onApproveMember?: (memberId: string) => Promise<void>;
  onRejectMember?: (memberId: string) => Promise<void>;
  className?: string;
}

const ROLE_CONFIG: Record<DirectoryMemberRole, {
  label: string;
  icon: React.ReactElement;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  leader: {
    label: 'Leader',
    icon: <Crown className="w-4 h-4" />,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/30',
  },
  co_leader: {
    label: 'Co-Leader',
    icon: <Shield className="w-4 h-4" />,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/30',
  },
  member: {
    label: 'Member',
    icon: <User className="w-4 h-4" />,
    color: 'text-[var(--hive-text-secondary)]',
    bgColor: 'bg-[var(--hive-background-tertiary)]/40',
    borderColor: 'border-[var(--hive-border-primary)]/20',
  },
  pending: {
    label: 'Pending',
    icon: <Clock className="w-4 h-4" />,
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/30',
  },
};

const FILTER_OPTIONS: Array<{ value: MemberFilterType; label: string; icon: React.ReactNode }> = [
  { value: 'all', label: 'All Members', icon: <Users className="w-4 h-4" /> },
  { value: 'leaders', label: 'Leaders', icon: <Crown className="w-4 h-4" /> },
  { value: 'members', label: 'Members', icon: <User className="w-4 h-4" /> },
  { value: 'pending', label: 'Pending', icon: <Clock className="w-4 h-4" /> },
  { value: 'online', label: 'Online', icon: <Activity className="w-4 h-4" /> },
];

export const SpaceMemberDirectory: React.FC<SpaceMemberDirectoryProps> = ({
  members,
  currentUserRole,
  spaceType,
  onInviteMembers,
  onManageMember,
  onViewMemberProfile,
  onMessageMember,
  onApproveMember,
  onRejectMember,
  className
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<MemberFilterType>('all');
  const [sortBy, setSortBy] = useState<MemberSortType>('name');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const canManageMembers = currentUserRole === 'leader' || currentUserRole === 'co_leader';

  const filteredMembers = useMemo(() => {
    const filtered = members.filter(member => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesHandle = member.handle.toLowerCase().includes(query);
        const matchesName = member.displayName.toLowerCase().includes(query);
        const matchesMajor = member.major?.toLowerCase().includes(query);
        if (!matchesHandle && !matchesName && !matchesMajor) return false;
      }

      // Role/status filter
      switch (selectedFilter) {
        case 'leaders':
          return member.role === 'leader' || member.role === 'co_leader';
        case 'members':
          return member.role === 'member';
        case 'pending':
          return member.status === 'pending';
        case 'online':
          return member.isOnline;
        default:
          return true;
      }
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'role': {
          const roleOrder = { leader: 0, co_leader: 1, member: 2, pending: 3 };
          return roleOrder[a.role] - roleOrder[b.role];
        }
        case 'joined':
          return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
        case 'activity': {
          const aActivity = a.lastActive ? new Date(a.lastActive).getTime() : 0;
          const bActivity = b.lastActive ? new Date(b.lastActive).getTime() : 0;
          return bActivity - aActivity;
        }
        default:
          return a.displayName.localeCompare(b.displayName);
      }
    });

    return filtered;
  }, [members, searchQuery, selectedFilter, sortBy]);

  const pendingMembers = members.filter(m => m.status === 'pending');
  const onlineMembers = members.filter(m => m.isOnline).length;

  const handleMemberAction = async (memberId: string, action: 'promote' | 'demote' | 'remove' | 'ban' | 'unban') => {
    if (!onManageMember) return;
    
    try {
      await onManageMember(memberId, action);
      setSelectedMember(null);
    } catch (error) {
      console.error('Failed to manage member:', error);
    }
  };

  const MemberCard: React.FC<{ member: DirectorySpaceMember }> = ({ member }) => {
    const roleConfig = ROLE_CONFIG[member.role];
    const isSelected = selectedMember === member.id;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={cn(
          'p-4 rounded-2xl border transition-all duration-200',
          'bg-gradient-to-br from-[var(--hive-background-secondary)]/60 via-[var(--hive-background-tertiary)]/40 to-[var(--hive-background-interactive)]/60',
          'border-[var(--hive-border-primary)]/20',
          'hover:border-[var(--hive-brand-primary)]/30 hover:bg-[var(--hive-brand-primary)]/5',
          member.status === 'pending' && 'border-orange-400/30 bg-orange-400/5',
          member.status === 'banned' && 'border-red-400/30 bg-red-400/5 opacity-60'
        )}
      >
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="relative">
            <div className={cn(
              'w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold',
              'bg-gradient-to-br from-[var(--hive-brand-primary)]/20 to-[var(--hive-brand-secondary)]/20',
              'border border-[var(--hive-border-primary)]/20'
            )}>
              {member.avatar ? (
                <img src={member.avatar} alt={member.displayName} className="w-full h-full rounded-2xl object-cover" />
              ) : (
                <span className="text-[var(--hive-text-primary)]">
                  {member.displayName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            
            {member.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-[var(--hive-background-secondary)] rounded-full" />
            )}
          </div>

          {/* Member Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-[var(--hive-text-primary)] truncate">
                {member.displayName}
              </h3>
              
              {/* Role Badge */}
              <div className={cn(
                'px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1',
                roleConfig.bgColor,
                roleConfig.borderColor,
                roleConfig.color,
                'border'
              )}>
                {roleConfig.icon}
                <span>{roleConfig.label}</span>
              </div>
            </div>

            <p className="text-sm text-[var(--hive-text-secondary)] mb-2">
              @{member.handle}
            </p>

            {member.major && (
              <p className="text-xs text-[var(--hive-text-muted)] mb-2">
                {member.major} {member.year && `• ${member.year}`}
              </p>
            )}

            {/* Activity Stats */}
            <div className="flex items-center gap-4 text-xs text-[var(--hive-text-muted)]">
              <div className="flex items-center gap-1">
                <Hash className="w-3 h-3" />
                <span>{member.postsCount} posts</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{member.eventsAttended} events</span>
              </div>
              <div className="flex items-center gap-1">
                <Settings className="w-3 h-3" />
                <span>{member.toolsUsed} tools</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {member.status === 'pending' && canManageMembers && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onApproveMember?.(member.id)}
                  className="w-8 h-8 rounded-lg bg-green-400/10 text-green-400 hover:bg-green-400/20 transition-colors duration-200 flex items-center justify-center"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onRejectMember?.(member.id)}
                  className="w-8 h-8 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-colors duration-200 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {member.status === 'active' && (
              <>
                <button
                  onClick={() => onViewMemberProfile?.(member.id)}
                  className="w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-brand-primary)]/10 transition-all duration-200 flex items-center justify-center"
                >
                  <Eye className="w-4 h-4" />
                </button>

                {onMessageMember && (
                  <button
                    onClick={() => onMessageMember(member.id)}
                    className="w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-brand-primary)]/10 transition-all duration-200 flex items-center justify-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                )}

                {canManageMembers && member.role !== 'leader' && (
                  <button
                    onClick={() => setSelectedMember(isSelected ? null : member.id)}
                    className="w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-brand-primary)]/10 transition-all duration-200 flex items-center justify-center"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Management Actions */}
        <AnimatePresence>
          {isSelected && canManageMembers && member.status === 'active' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-[var(--hive-border-primary)]/20"
            >
              <div className="flex items-center gap-2 flex-wrap">
                {member.role === 'member' && (
                  <button
                    onClick={() => handleMemberAction(member.id, 'promote')}
                    className="px-3 py-1.5 rounded-lg bg-blue-400/10 text-blue-400 border border-blue-400/30 hover:bg-blue-400/20 transition-all duration-200 text-sm flex items-center gap-1"
                  >
                    <Shield className="w-3 h-3" />
                    <span>Promote to Co-Leader</span>
                  </button>
                )}

                {member.role === 'co_leader' && (
                  <button
                    onClick={() => handleMemberAction(member.id, 'demote')}
                    className="px-3 py-1.5 rounded-lg bg-orange-400/10 text-orange-400 border border-orange-400/30 hover:bg-orange-400/20 transition-all duration-200 text-sm flex items-center gap-1"
                  >
                    <User className="w-3 h-3" />
                    <span>Demote to Member</span>
                  </button>
                )}

                <button
                  onClick={() => handleMemberAction(member.id, 'remove')}
                  className="px-3 py-1.5 rounded-lg bg-red-400/10 text-red-400 border border-red-400/30 hover:bg-red-400/20 transition-all duration-200 text-sm flex items-center gap-1"
                >
                  <UserMinus className="w-3 h-3" />
                  <span>Remove</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className={cn('h-full flex flex-col', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[var(--hive-brand-primary)]/20 border border-[var(--hive-brand-primary)]/30 flex items-center justify-center">
            <Users className="w-5 h-5 text-[var(--hive-brand-primary)]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--hive-text-primary)]">
              Members ({filteredMembers.length})
            </h2>
            <p className="text-sm text-[var(--hive-text-secondary)]">
              {onlineMembers} online • {pendingMembers.length} pending
            </p>
          </div>
        </div>

        {canManageMembers && onInviteMembers && (
          <button
            onClick={onInviteMembers}
            className="px-4 py-2.5 rounded-2xl bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 hover:bg-[var(--hive-brand-primary)]/30 hover:border-[var(--hive-brand-primary)]/60 transition-all duration-300 font-semibold flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite</span>
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--hive-text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search members by name, handle, or major..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'w-12 h-12 rounded-2xl border transition-all duration-200 flex items-center justify-center',
              showFilters
                ? 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/40'
                : 'bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] border-[var(--hive-border-primary)]/30 hover:text-[var(--hive-text-primary)]'
            )}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 flex-wrap">
                {FILTER_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedFilter(option.value)}
                    className={cn(
                      'px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2',
                      selectedFilter === option.value
                        ? 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/30'
                        : 'bg-[var(--hive-background-tertiary)]/40 text-[var(--hive-text-secondary)] border border-[var(--hive-border-primary)]/20 hover:text-[var(--hive-text-primary)] hover:border-[var(--hive-brand-primary)]/30'
                    )}
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--hive-text-secondary)]">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as MemberSortType)}
                  className="px-3 py-1.5 rounded-lg border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] text-sm focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200"
                >
                  <option value="name">Name</option>
                  <option value="role">Role</option>
                  <option value="joined">Joined Date</option>
                  <option value="activity">Last Active</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Members List */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {filteredMembers.length > 0 ? (
            <div className="space-y-3">
              {filteredMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/20 flex items-center justify-center">
                <Users className="w-8 h-8 text-[var(--hive-text-muted)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
                No members found
              </h3>
              <p className="text-[var(--hive-text-secondary)] max-w-sm mx-auto">
                {searchQuery
                  ? 'Try adjusting your search or filters to find members.'
                  : 'There are no members matching the selected filters.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SpaceMemberDirectory;