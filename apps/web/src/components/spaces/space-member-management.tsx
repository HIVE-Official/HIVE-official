"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Crown, 
  Shield, 
  User, 
  UserPlus, 
  UserMinus, 
  MoreHorizontal, 
  Search,
  Filter,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Mail,
  MessageSquare,
  Eye,
  EyeOff,
  Ban,
  UserCheck,
  Star,
  Calendar,
  Activity,
  TrendingUp,
  Clock,
  MapPin,
  ExternalLink,
  Download,
  Upload,
  Trash2,
  Edit3,
  Save,
  X,
  Plus
} from 'lucide-react';
import { Button, Badge } from "@hive/ui";

import { Alert } from "@/components/temp-stubs";
// Space Member Management Interface for Claimed Leaders
export interface MemberManagementProps {
  spaceId: string;
  spaceName: string;
  currentUserRole: 'admin' | 'owner' | 'moderator';
  onClose?: () => void;
}

interface MemberData {
  id: string;
  name: string;
  username: string;
  email?: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'moderator' | 'member';
  status: 'active' | 'inactive' | 'suspended';
  joinedAt: Date;
  lastActive: Date;
  stats: {
    postsCount: number;
    eventsAttended: number;
    contributionScore: number;
  };
  permissions: {
    canPost: boolean;
    canCreateEvents: boolean;
    canInviteMembers: boolean;
    canModerate: boolean;
  };
  flags?: {
    isReported: boolean;
    warningCount: number;
    isSuspended: boolean;
  };
}

const roleHierarchy = {
  owner: 4,
  admin: 3,
  moderator: 2,
  member: 1
};

const roleConfig = {
  owner: {
    label: 'Owner',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    icon: Crown,
    description: 'Full space control'
  },
  admin: {
    label: 'Admin',
    color: 'text-purple-400',
    bg: 'bg-purple-500/20',
    icon: Shield,
    description: 'Management permissions'
  },
  moderator: {
    label: 'Moderator',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    icon: UserCheck,
    description: 'Content moderation'
  },
  member: {
    label: 'Member',
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    icon: User,
    description: 'Standard access'
  }
};

export function SpaceMemberManagement({ spaceId, spaceName, currentUserRole, onClose }: MemberManagementProps) {
  const [members, setMembers] = useState<MemberData[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<MemberData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<MemberData | null>(null);
  const [showMemberDetails, setShowMemberDetails] = useState(false);
  const [showRoleChangeModal, setShowRoleChangeModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Permission checks
  const canChangeRoles = currentUserRole === 'owner' || currentUserRole === 'admin';
  const canRemoveMembers = currentUserRole === 'owner' || currentUserRole === 'admin';
  const canSuspendMembers = currentUserRole !== 'member';
  const canInviteMembers = currentUserRole !== 'member';

  // Fetch members from API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('hive_session');
        const session = token ? JSON.parse(token) : null;
        
        const response = await fetch(`/api/spaces/${spaceId}/members?management=true`, {
          headers: {
            'Authorization': `Bearer ${process.env.NODE_ENV === 'development' ? 'test-token' : session?.token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        
        const data = await response.json();
        const membersWithStats = data.members.map((member: any) => ({
          ...member,
          joinedAt: new Date(member.joinedAt),
          lastActive: new Date(member.lastActive || member.joinedAt),
          stats: member.stats || {
            postsCount: 0,
            eventsAttended: 0,
            contributionScore: 0,
          },
          permissions: member.permissions || {
            canPost: true,
            canCreateEvents: member.role !== 'member',
            canInviteMembers: member.role !== 'member',
            canModerate: ['owner', 'admin', 'moderator'].includes(member.role),
          },
          flags: member.flags || {
            isReported: false,
            warningCount: 0,
            isSuspended: false,
          }
        }));
        
        setMembers(membersWithStats);
      } catch (error) {
        console.error('Failed to fetch members:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch members');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [spaceId]);

  // Filter members based on search and filters
  useEffect(() => {
    let filtered = members;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Role filter
    if (selectedRole !== 'all') {
      filtered = filtered.filter(member => member.role === selectedRole);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(member => member.status === selectedStatus);
    }

    // Sort by role hierarchy, then by join date
    filtered.sort((a, b) => {
      const roleA = roleHierarchy[a.role as keyof typeof roleHierarchy];
      const roleB = roleHierarchy[b.role as keyof typeof roleHierarchy];
      
      if (roleA !== roleB) {
        return roleB - roleA; // Higher roles first
      }
      
      return a.joinedAt.getTime() - b.joinedAt.getTime(); // Earlier joiners first
    });

    setFilteredMembers(filtered);
  }, [members, searchQuery, selectedRole, selectedStatus]);

  const handleRoleChange = async (memberId: string, newRole: string) => {
    try {
      const token = localStorage.getItem('hive_session');
      const session = token ? JSON.parse(token) : null;
      
      const response = await fetch(`/api/spaces/${spaceId}/members/${memberId}/role`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${process.env.NODE_ENV === 'development' ? 'test-token' : session?.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to change role');
      }
      
      // Update local state
      setMembers(prev => prev.map(member =>
        member.id === memberId 
          ? { ...member, role: newRole as any }
          : member
      ));
      
      setShowRoleChangeModal(false);
      setSelectedMember(null);
    } catch (error) {
      console.error('Failed to change role:', error);
      alert('Failed to change member role');
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this member from the space?')) {
      return;
    }

    try {
      const token = localStorage.getItem('hive_session');
      const session = token ? JSON.parse(token) : null;
      
      const response = await fetch(`/api/spaces/${spaceId}/members/${memberId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${process.env.NODE_ENV === 'development' ? 'test-token' : session?.token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove member');
      }
      
      // Update local state
      setMembers(prev => prev.filter(member => member.id !== memberId));
    } catch (error) {
      console.error('Failed to remove member:', error);
      alert('Failed to remove member');
    }
  };

  const handleSuspendMember = async (memberId: string, suspend: boolean) => {
    try {
      const token = localStorage.getItem('hive_session');
      const session = token ? JSON.parse(token) : null;
      
      const response = await fetch(`/api/spaces/${spaceId}/members/${memberId}/suspend`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${process.env.NODE_ENV === 'development' ? 'test-token' : session?.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ suspended: suspend }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update suspension status');
      }
      
      // Update local state
      setMembers(prev => prev.map(member =>
        member.id === memberId 
          ? { 
              ...member, 
              status: suspend ? 'suspended' : 'active',
              flags: { ...member.flags, isSuspended: suspend }
            }
          : member
      ));
    } catch (error) {
      console.error('Failed to update suspension:', error);
      alert('Failed to update member status');
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-[var(--hive-background-primary)] border border-white/[0.1] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-600 rounded w-48 mb-4"></div>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-600 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded w-24"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-[var(--hive-background-primary)] border border-white/[0.1] rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-[var(--hive-brand-secondary)]" />
            <div>
              <h2 className="text-xl font-semibold text-white">Member Management</h2>
              <p className="text-sm text-gray-400">{spaceName} • {members.length} members</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {canInviteMembers && (
              <Button
                size="sm"
                className="bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] border-[var(--hive-brand-secondary)]/30 hover:bg-[var(--hive-brand-secondary)]/30"
                onClick={() => setShowInviteModal(true)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Members
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              className="border-white/[0.2] text-white hover:bg-white/[0.1]"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-4 mb-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/[0.02] border border-white/[0.06] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/50 focus:border-[var(--hive-brand-secondary)]/30"
              />
            </div>

            {/* Role Filter */}
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 bg-white/[0.02] border border-white/[0.06] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/50"
            >
              <option value="all">All Roles</option>
              <option value="owner">Owners</option>
              <option value="admin">Admins</option>
              <option value="moderator">Moderators</option>
              <option value="member">Members</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-white/[0.02] border border-white/[0.06] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/50"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{filteredMembers.length} showing</span>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-yellow-400" />
              <span>{members.filter(m => m.role === 'owner').length} owners</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-400" />
              <span>{members.filter(m => m.role === 'admin').length} admins</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>{members.filter(m => m.flags?.isSuspended).length} suspended</span>
            </div>
          </div>
        </div>

        {/* Members List */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-300px)]">
          <div className="space-y-3">
            {filteredMembers.map((member) => {
              const config = roleConfig[member.role];
              const RoleIcon = config.icon;
              const canManageMember = canChangeRoles && 
                roleHierarchy[currentUserRole as keyof typeof roleHierarchy] > roleHierarchy[member.role as keyof typeof roleHierarchy];

              return (
                <motion.div
                  key={member.id}
                  className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-white/[0.1] transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  layout
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt=""
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-500/20 to-gray-700/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Member Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-white truncate">{member.name}</h4>
                      <span className="text-sm text-gray-400">@{member.username}</span>
                      
                      {/* Role Badge */}
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${config.bg} ${config.color}`}>
                        <RoleIcon className="w-3 h-3" />
                        <span>{config.label}</span>
                      </div>

                      {/* Status Indicators */}
                      {member.flags?.isSuspended && (
                        <Badge variant="outline" className="border-red-500/30 text-red-400">
                          Suspended
                        </Badge>
                      )}
                      
                      {member.flags?.isReported && (
                        <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                          Reported
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>Joined {member.joinedAt.toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{member.stats.postsCount} posts</span>
                      <span>•</span>
                      <span>{member.stats.eventsAttended} events</span>
                      <span>•</span>
                      <span>Score: {member.stats.contributionScore}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {/* View Details */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/[0.2] text-white hover:bg-white/[0.1]"
                      onClick={() => {
                        setSelectedMember(member);
                        setShowMemberDetails(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    {canManageMember && (
                      <>
                        {/* Change Role */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                          onClick={() => {
                            setSelectedMember(member);
                            setShowRoleChangeModal(true);
                          }}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>

                        {/* Suspend/Unsuspend */}
                        <Button
                          variant="outline"
                          size="sm"
                          className={member.flags?.isSuspended 
                            ? "border-green-500/30 text-green-400 hover:bg-green-500/10"
                            : "border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                          }
                          onClick={() => handleSuspendMember(member.id, !member.flags?.isSuspended)}
                        >
                          {member.flags?.isSuspended ? <CheckCircle className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                        </Button>

                        {/* Remove Member */}
                        {canRemoveMembers && member.role !== 'owner' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                            onClick={() => handleRemoveMember(member.id)}
                          >
                            <UserMinus className="h-4 w-4" />
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Role Change Modal */}
      <AnimatePresence>
        {showRoleChangeModal && selectedMember && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[var(--hive-background-primary)] border border-white/[0.1] rounded-2xl p-6 w-full max-w-md"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Change Member Role</h3>
              <p className="text-sm text-gray-400 mb-6">
                Change role for <strong>{selectedMember.name}</strong>
              </p>

              <div className="space-y-3 mb-6">
                {Object.entries(roleConfig).map(([role, config]) => {
                  const Icon = config.icon;
                  const canAssign = roleHierarchy[currentUserRole as keyof typeof roleHierarchy] > roleHierarchy[role as keyof typeof roleHierarchy];
                  
                  return (
                    <button
                      key={role}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        selectedMember.role === role
                          ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                          : canAssign
                          ? 'bg-white/[0.02] border-white/[0.06] text-white hover:border-white/[0.1]'
                          : 'bg-gray-500/10 border-gray-500/20 text-gray-500 cursor-not-allowed'
                      }`}
                      onClick={() => canAssign && handleRoleChange(selectedMember.id, role)}
                      disabled={!canAssign}
                    >
                      <Icon className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">{config.label}</div>
                        <div className="text-xs opacity-70">{config.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-white/[0.2] text-white hover:bg-white/[0.1]"
                  onClick={() => {
                    setShowRoleChangeModal(false);
                    setSelectedMember(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}