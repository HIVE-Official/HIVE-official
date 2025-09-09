'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Crown, 
  Shield, 
  Eye,
  UserPlus, 
  UserMinus,
  MoreHorizontal,
  Search,
  Filter,
  Calendar,
  MapPin,
  GraduationCap,
  Activity,
  TrendingUp,
  AlertTriangle,
  Clock,
  Mail,
  MessageCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Space } from '../../types';

export type HiveMemberRole = 'owner' | 'admin' | 'moderator' | 'member';
export type HiveMemberStatus = 'active' | 'inactive' | 'suspended';

export interface HiveSpaceMember {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  role: HiveMemberRole;
  status: HiveMemberStatus;
  joinedAt: Date;
  lastActive?: Date;
  
  // Campus info
  major?: string;
  year?: string;
  dorm?: string;
  
  // Activity metrics for insights
  postsCount?: number;
  engagementScore?: number;
  coordinationParticipation?: number;
}

export interface HiveMembersSurfaceProps {
  space: Space;
  members?: HiveSpaceMember[];
  maxMembers?: number;
  isBuilder?: boolean;
  leaderMode?: 'configure' | 'moderate' | 'insights' | null;
  canManageMembers?: boolean;
  
  // Event handlers
  onChangeRole?: (memberId: string, role: HiveMemberRole) => void;
  onRemoveMember?: (memberId: string) => void;
  onBlockMember?: (memberId: string) => void;
  onInviteMember?: () => void;
  onMessageMember?: (memberId: string) => void;
}

// Mock members data
const mockMembers: HiveSpaceMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'schen@buffalo.edu',
    role: 'owner',
    status: 'active',
    joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    major: 'Computer Science',
    year: 'Junior',
    dorm: 'Ellicott Complex',
    postsCount: 15,
    engagementScore: 92,
    coordinationParticipation: 8
  },
  {
    id: '2',
    name: 'Alex Rodriguez',
    email: 'alexr@buffalo.edu',
    role: 'admin',
    status: 'active',
    joinedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
    lastActive: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    major: 'Engineering',
    year: 'Senior',
    dorm: 'Governors',
    postsCount: 12,
    engagementScore: 85,
    coordinationParticipation: 6
  },
  {
    id: '3',
    name: 'Jordan Martinez',
    email: 'jmart@buffalo.edu',
    role: 'moderator',
    status: 'active',
    joinedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
    lastActive: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    major: 'Business Administration',
    year: 'Sophomore',
    dorm: 'South Campus',
    postsCount: 8,
    engagementScore: 78,
    coordinationParticipation: 4
  },
  {
    id: '4',
    name: 'Taylor Kim',
    email: 'tkim@buffalo.edu',
    role: 'member',
    status: 'active',
    joinedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    major: 'Psychology',
    year: 'Freshman',
    dorm: 'Ellicott Complex',
    postsCount: 5,
    engagementScore: 65,
    coordinationParticipation: 3
  },
  {
    id: '5',
    name: 'Morgan Davis',
    email: 'mdavis@buffalo.edu',
    role: 'member',
    status: 'inactive',
    joinedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    major: 'Biology',
    year: 'Junior',
    dorm: 'Governors',
    postsCount: 2,
    engagementScore: 32,
    coordinationParticipation: 1
  }
];

export const HiveMembersSurface: React.FC<HiveMembersSurfaceProps> = ({
  space,
  members = mockMembers,
  maxMembers,
  isBuilder = false,
  leaderMode,
  canManageMembers = false,
  onChangeRole,
  onRemoveMember,
  onBlockMember,
  onInviteMember,
  onMessageMember
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<HiveMemberRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<HiveMemberStatus | 'all'>('all');
  const [showMemberActions, setShowMemberActions] = useState<string | null>(null);

  // Debounce search term to improve performance
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredMembers = useMemo(() => {
    let filtered = members.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           member.email?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           member.major?.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesRole = roleFilter === 'all' || member.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
      
      return matchesSearch && matchesRole && matchesStatus;
    });

    // Sort by role hierarchy, then by last active
    filtered.sort((a, b) => {
      const roleOrder = { owner: 0, admin: 1, moderator: 2, member: 3 };
      const roleComparison = roleOrder[a.role] - roleOrder[b.role];
      if (roleComparison !== 0) return roleComparison;
      
      const aActive = a.lastActive?.getTime() || 0;
      const bActive = b.lastActive?.getTime() || 0;
      return bActive - aActive;
    });

    if (maxMembers) {
      filtered = filtered.slice(0, maxMembers);
    }

    return filtered;
  }, [members, debouncedSearchTerm, roleFilter, statusFilter, maxMembers]);

  const getRoleIcon = (role: HiveMemberRole) => {
    switch (role) {
      case 'owner': return <Crown className="h-4 w-4 text-[var(--hive-brand-secondary)]" />;
      case 'admin': return <Shield className="h-4 w-4 text-purple-400" />;
      case 'moderator': return <Eye className="h-4 w-4 text-blue-400" />;
      default: return <Users className="h-4 w-4 text-neutral-400" />;
    }
  };

  const getRoleBadgeColor = (role: HiveMemberRole) => {
    switch (role) {
      case 'owner': return 'bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] border-[var(--hive-brand-secondary)]/30';
      case 'admin': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'moderator': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-white/10 text-neutral-400 border-white/20';
    }
  };

  const getStatusColor = (status: HiveMemberStatus, lastActive?: Date) => {
    if (status === 'suspended') return 'text-red-400';
    if (status === 'inactive') return 'text-gray-400';
    
    if (!lastActive) return 'text-gray-400';
    
    const hoursAgo = (Date.now() - lastActive.getTime()) / (1000 * 60 * 60);
    if (hoursAgo < 1) return 'text-green-400';
    if (hoursAgo < 24) return 'text-yellow-400';
    return 'text-gray-400';
  };

  const formatLastActive = (date?: Date) => {
    if (!date) return 'Never';
    
    const now = Date.now();
    const diff = now - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 5) return 'Online';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const memberStats = useMemo(() => {
    return {
      total: members.length,
      active: members.filter(m => m.status === 'active').length,
      leaders: members.filter(m => ['owner', 'admin', 'moderator'].includes(m.role)).length,
      newThisWeek: members.filter(m => 
        Date.now() - m.joinedAt.getTime() < 7 * 24 * 60 * 60 * 1000
      ).length
    };
  }, [members]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
            <h3 className="font-semibold text-[var(--hive-text-inverse)]">
              Members
            </h3>
            <span className="text-sm text-neutral-400">({memberStats.total})</span>
          </div>

          {leaderMode === 'insights' && (
            <div className="flex items-center gap-2 px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
              <TrendingUp className="h-3 w-3 text-purple-400" />
              <span className="text-xs text-purple-400">Analytics Active</span>
            </div>
          )}
        </div>

        {canManageMembers && (
          <div className="flex items-center gap-2">
            <button
              onClick={onInviteMember}
              className="flex items-center gap-2 px-3 py-2 bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30 rounded-lg hover:bg-[var(--hive-brand-secondary)]/20 transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              <span className="text-sm">Invite</span>
            </button>
          </div>
        )}
      </div>

      {/* Stats Cards (Insights Mode) */}
      {leaderMode === 'insights' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
            <div className="text-lg font-bold text-purple-400">{memberStats.total}</div>
            <div className="text-xs text-neutral-400">Total Members</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <div className="text-lg font-bold text-green-400">{memberStats.active}</div>
            <div className="text-xs text-neutral-400">Active</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <div className="text-lg font-bold text-blue-400">{memberStats.leaders}</div>
            <div className="text-xs text-neutral-400">Leaders</div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
            <div className="text-lg font-bold text-yellow-400">{memberStats.newThisWeek}</div>
            <div className="text-xs text-neutral-400">New This Week</div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      {members.length > 5 && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[var(--hive-text-inverse)] placeholder:text-neutral-400 focus:border-[var(--hive-brand-secondary)]/30 focus:outline-none text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as HiveMemberRole | 'all')}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
            >
              <option value="all">All Roles</option>
              <option value="owner">Owners</option>
              <option value="admin">Admins</option>
              <option value="moderator">Moderators</option>
              <option value="member">Members</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as HiveMemberStatus | 'all')}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      )}

      {/* Members List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 hover:bg-white/[0.05] transition-colors",
                leaderMode === 'insights' && "border-purple-500/20 bg-purple-500/5"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                      {member.avatar ? (
                        <img src={member.avatar} alt="" className="w-full h-full rounded-lg object-cover" />
                      ) : (
                        <span className="text-sm font-semibold text-[var(--hive-text-inverse)]">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      )}
                    </div>
                    
                    {/* Online Status Dot */}
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[var(--hive-background-primary)]",
                      getStatusColor(member.status, member.lastActive) === 'text-green-400' && "bg-green-400",
                      getStatusColor(member.status, member.lastActive) === 'text-yellow-400' && "bg-yellow-400",
                      getStatusColor(member.status, member.lastActive) === 'text-red-400' && "bg-red-400",
                      getStatusColor(member.status, member.lastActive) === 'text-gray-400' && "bg-gray-400"
                    )} />
                  </div>

                  {/* Member Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-[var(--hive-text-inverse)] truncate">{member.name}</h4>
                      {getRoleIcon(member.role)}
                      
                      {/* Role Badge */}
                      <span className={cn(
                        "px-2 py-0.5 text-xs font-medium rounded-full border capitalize",
                        getRoleBadgeColor(member.role)
                      )}>
                        {member.role}
                      </span>

                      {member.status === 'suspended' && (
                        <div className="flex items-center gap-1 text-red-400">
                          <AlertTriangle className="h-3 w-3" />
                          <span className="text-xs">Suspended</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-neutral-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatLastActive(member.lastActive)}</span>
                      </div>

                      {member.major && (
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-3 w-3" />
                          <span>{member.major} • {member.year}</span>
                        </div>
                      )}

                      {member.dorm && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{member.dorm}</span>
                        </div>
                      )}
                    </div>

                    {/* Insights Mode Metrics */}
                    {leaderMode === 'insights' && (
                      <div className="mt-2 flex items-center gap-4 text-xs">
                        <span className="text-blue-400">{member.postsCount} posts</span>
                        <span className="text-green-400">{member.engagementScore}% engagement</span>
                        <span className="text-purple-400">{member.coordinationParticipation} coordinations</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {/* Quick Message */}
                  <button
                    onClick={() => onMessageMember?.(member.id)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Send message"
                  >
                    <MessageCircle className="h-4 w-4 text-neutral-400 hover:text-[var(--hive-text-inverse)]" />
                  </button>

                  {/* Management Actions */}
                  {canManageMembers && member.role !== 'owner' && (
                    <div className="relative">
                      <button
                        onClick={() => setShowMemberActions(
                          showMemberActions === member.id ? null : member.id
                        )}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <MoreHorizontal className="h-4 w-4 text-neutral-400" />
                      </button>

                      <AnimatePresence>
                        {showMemberActions === member.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute right-0 top-full mt-1 w-48 bg-[var(--hive-background-primary)] border border-white/10 rounded-lg shadow-lg z-10 p-1"
                          >
                            {/* Role Management */}
                            <div className="px-3 py-1 text-xs font-medium text-neutral-400">Change Role</div>
                            {(['admin', 'moderator', 'member'] as const).map((role) => (
                              <button
                                key={role}
                                onClick={() => {
                                  onChangeRole?.(member.id, role);
                                  setShowMemberActions(null);
                                }}
                                disabled={member.role === role}
                                className={cn(
                                  "w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-white/5 rounded transition-colors capitalize",
                                  member.role === role && "opacity-50 cursor-not-allowed"
                                )}
                              >
                                {getRoleIcon(role)}
                                {role}
                              </button>
                            ))}

                            <hr className="border-white/10 my-1" />

                            {/* Actions */}
                            <button
                              onClick={() => {
                                onBlockMember?.(member.id);
                                setShowMemberActions(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-white/5 rounded transition-colors text-yellow-400"
                            >
                              <Eye className="h-4 w-4" />
                              {member.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                            </button>

                            <button
                              onClick={() => {
                                onRemoveMember?.(member.id);
                                setShowMemberActions(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-red-500/10 rounded transition-colors text-red-400"
                            >
                              <UserMinus className="h-4 w-4" />
                              Remove Member
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredMembers.length === 0 && (
          <div className="text-center py-8">
            <Users className="h-12 w-12 mx-auto mb-3 text-neutral-400 opacity-50" />
            <p className="text-neutral-400">No members found</p>
            <p className="text-sm text-neutral-500 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Show More Button */}
      {maxMembers && members.length > maxMembers && (
        <div className="text-center pt-4">
          <button className="text-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary)]/80 transition-colors text-sm font-medium">
            View all {members.length} members
          </button>
        </div>
      )}
    </div>
  );
};

export default HiveMembersSurface;