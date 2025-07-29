import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Card } from '../../atomic/atoms/card';
import { Button } from '../../atomic/atoms/button';
import { Text } from '../../atomic/atoms/text';
import { Badge } from '../../atomic/atoms/badge';
import { Input } from '../../atomic/atoms/input';
import { Avatar } from '../../atomic/atoms/avatar';
import { 
  Users, 
  Crown, 
  Shield, 
  Star, 
  UserPlus, 
  UserMinus, 
  MoreVertical, 
  Search,
  Filter,
  Mail,
  MessageSquare,
  Calendar,
  Settings,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Ban,
  UserCheck
} from 'lucide-react';

const meta: Meta = {
  title: '07-Spaces/Member Management',
  parameters: {
    docs: {
      description: {
        component: 'Comprehensive member management components for HIVE Spaces - Kitchen Sink approach with all variants and edge cases',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock data for kitchen sink approach
const mockMembers = [
  {
    id: '1',
    name: 'Sarah Chen',
    handle: '@sarahc',
    email: 'sarah.chen@university.edu',
    avatar: '/placeholder-avatar.jpg',
    role: 'owner',
    status: 'active',
    joinedAt: '2023-08-15',
    lastActive: '2 minutes ago',
    contributions: 45,
    reputation: 2840,
    isOnline: true,
    permissions: ['all']
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    handle: '@marcusr',
    email: 'marcus.rodriguez@university.edu',
    avatar: '/placeholder-avatar-2.jpg',
    role: 'admin',
    status: 'active',
    joinedAt: '2023-09-01',
    lastActive: '1 hour ago',
    contributions: 32,
    reputation: 1950,
    isOnline: true,
    permissions: ['moderate', 'invite', 'manage_content']
  },
  {
    id: '3',
    name: 'Elena Vasquez',
    handle: '@elenav',
    email: 'elena.vasquez@university.edu',
    avatar: '/placeholder-avatar-3.jpg',
    role: 'moderator',
    status: 'active',
    joinedAt: '2023-09-15',
    lastActive: '30 minutes ago',
    contributions: 28,
    reputation: 1420,
    isOnline: false,
    permissions: ['moderate', 'manage_content']
  },
  {
    id: '4',
    name: 'David Park',
    handle: '@davidp',
    email: 'david.park@university.edu',
    avatar: '/placeholder-avatar-4.jpg',
    role: 'member',
    status: 'active',
    joinedAt: '2023-10-01',
    lastActive: '2 days ago',
    contributions: 12,
    reputation: 680,
    isOnline: false,
    permissions: ['post', 'comment']
  },
  {
    id: '5',
    name: 'Jessica Wong',
    handle: '@jessicaw',
    email: 'jessica.wong@university.edu',
    avatar: '/placeholder-avatar-5.jpg',
    role: 'member',
    status: 'pending',
    joinedAt: '2023-10-15',
    lastActive: 'Never',
    contributions: 0,
    reputation: 0,
    isOnline: false,
    permissions: []
  },
  {
    id: '6',
    name: 'Alex Thompson',
    handle: '@alext',
    email: 'alex.thompson@university.edu',
    avatar: '/placeholder-avatar-6.jpg',
    role: 'member',
    status: 'suspended',
    joinedAt: '2023-08-20',
    lastActive: '1 week ago',
    contributions: 8,
    reputation: 120,
    isOnline: false,
    permissions: []
  }
];

const mockInvitePending = [
  {
    id: 'inv1',
    email: 'john.doe@university.edu',
    invitedBy: 'Sarah Chen',
    invitedAt: '2023-10-20',
    status: 'pending',
    role: 'member'
  },
  {
    id: 'inv2',
    email: 'jane.smith@university.edu',
    invitedBy: 'Marcus Rodriguez',
    invitedAt: '2023-10-18',
    status: 'expired',
    role: 'member'
  }
];

// Role Configuration
const roleConfig = {
  owner: { 
    label: 'Owner', 
    icon: Crown, 
    color: 'text-yellow-400', 
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    permissions: 'Full access'
  },
  admin: { 
    label: 'Admin', 
    icon: Shield, 
    color: 'text-blue-400', 
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    permissions: 'Manage members & content'
  },
  moderator: { 
    label: 'Moderator', 
    icon: Star, 
    color: 'text-purple-400', 
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    permissions: 'Moderate content'
  },
  member: { 
    label: 'Member', 
    icon: Users, 
    color: 'text-gray-400', 
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/20',
    permissions: 'Basic access'
  }
};

const statusConfig = {
  active: { label: 'Active', color: 'text-green-400', bgColor: 'bg-green-500/10' },
  pending: { label: 'Pending', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' },
  suspended: { label: 'Suspended', color: 'text-red-400', bgColor: 'bg-red-500/10' },
  invited: { label: 'Invited', color: 'text-blue-400', bgColor: 'bg-blue-500/10' }
};

// ============================================================================
// MEMBER LIST COMPONENT - Kitchen Sink
// ============================================================================

interface MemberListProps {
  members: typeof mockMembers;
  variant?: 'default' | 'compact' | 'detailed' | 'admin';
  showActions?: boolean;
  showStats?: boolean;
  showOnlineStatus?: boolean;
  currentUserRole?: 'owner' | 'admin' | 'moderator' | 'member';
}

const MemberList: React.FC<MemberListProps> = ({
  members,
  variant = 'default',
  showActions = true,
  showStats = false,
  showOnlineStatus = true,
  currentUserRole = 'member'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.handle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const canManageMembers = ['owner', 'admin'].includes(currentUserRole);
  const canModerate = ['owner', 'admin', 'moderator'].includes(currentUserRole);

  const getMemberActions = (member: any) => {
    const actions = [];
    
    if (canManageMembers && member.role !== 'owner') {
      actions.push(
        <Button key="edit" size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
          <Settings className="h-4 w-4" />
        </Button>
      );
    }
    
    if (canModerate && member.status !== 'suspended') {
      actions.push(
        <Button key="message" size="sm" variant="ghost" className="text-green-400 hover:text-green-300">
          <MessageSquare className="h-4 w-4" />
        </Button>
      );
    }
    
    if (canManageMembers && member.role !== 'owner' && member.status !== 'suspended') {
      actions.push(
        <Button key="suspend" size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
          <Ban className="h-4 w-4" />
        </Button>
      );
    }
    
    return actions;
  };

  if (variant === 'compact') {
    return (
      <Card className="p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
        <div className="flex items-center justify-between mb-4">
          <Text variant="heading-sm" className="text-[var(--hive-text-primary)]">
            Members ({members.length})
          </Text>
          <Button size="sm" className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite
          </Button>
        </div>
        
        <div className="space-y-2">
          {members.slice(0, 5).map((member) => {
            const roleData = roleConfig[member.role as keyof typeof roleConfig];
            const RoleIcon = roleData.icon;
            
            return (
              <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)]">
                <div className="relative">
                  <Avatar
                    src={member.avatar}
                    fallback={member.name.charAt(0)}
                    size="sm"
                    className="border-2 border-[var(--hive-interactive-active)]"
                  />
                  {showOnlineStatus && member.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[var(--hive-background-primary)]" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Text variant="body-sm" className="text-[var(--hive-text-primary)] truncate font-medium">
                      {member.name}
                    </Text>
                    <RoleIcon className={`h-3 w-3 ${roleData.color}`} />
                  </div>
                  <Text variant="body-xs" className="text-[var(--hive-text-tertiary)] truncate">
                    {member.handle}
                  </Text>
                </div>
                
                {showActions && canManageMembers && (
                  <Button size="sm" variant="ghost" className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                )}
              </div>
            );
          })}
          
          {members.length > 5 && (
            <Button variant="ghost" className="w-full text-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary)]">
              View all {members.length} members
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
      {/* Header */}
      <div className="p-6 border-b border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-2">
              Space Members
            </Text>
            <Text variant="body-sm" className="text-[var(--hive-text-tertiary)]">
              Manage members, roles, and permissions for this space
            </Text>
          </div>
          
          {canManageMembers && (
            <div className="flex gap-2">
              <Button variant="outline" className="border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]">
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Members
              </Button>
            </div>
          )}
        </div>
        
        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--hive-text-tertiary)]" />
            <Input
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[var(--hive-interactive-hover)] border-[var(--hive-interactive-active)]"
            />
          </div>
          
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-lg text-[var(--hive-text-primary)] text-sm"
          >
            <option value="all">All Roles</option>
            <option value="owner">Owners</option>
            <option value="admin">Admins</option>
            <option value="moderator">Moderators</option>
            <option value="member">Members</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-lg text-[var(--hive-text-primary)] text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>
      
      {/* Stats Row */}
      {showStats && (
        <div className="p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-b border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <Text variant="body-lg" className="text-[var(--hive-text-primary)] font-bold">
                {members.filter(m => m.status === 'active').length}
              </Text>
              <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">Active</Text>
            </div>
            <div className="text-center">
              <Text variant="body-lg" className="text-[var(--hive-text-primary)] font-bold">
                {members.filter(m => m.isOnline).length}
              </Text>
              <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">Online</Text>
            </div>
            <div className="text-center">
              <Text variant="body-lg" className="text-[var(--hive-text-primary)] font-bold">
                {members.filter(m => m.role === 'admin' || m.role === 'owner').length}
              </Text>
              <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">Admins</Text>
            </div>
            <div className="text-center">
              <Text variant="body-lg" className="text-[var(--hive-text-primary)] font-bold">
                {members.filter(m => m.status === 'pending').length}
              </Text>
              <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">Pending</Text>
            </div>
          </div>
        </div>
      )}
      
      {/* Member List */}
      <div className="divide-y divide-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
        {filteredMembers.map((member) => {
          const roleData = roleConfig[member.role as keyof typeof roleConfig];
          const statusData = statusConfig[member.status as keyof typeof statusConfig];
          const RoleIcon = roleData.icon;
          
          return (
            <div key={member.id} className="p-4 hover:bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] transition-colors">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative">
                  <Avatar
                    src={member.avatar}
                    fallback={member.name.charAt(0)}
                    size={variant === 'detailed' ? 'lg' : 'md'}
                    className="border-2 border-[var(--hive-interactive-active)]"
                  />
                  {showOnlineStatus && member.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[var(--hive-background-primary)]" />
                  )}
                </div>
                
                {/* Member Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Text variant="heading-sm" className="text-[var(--hive-text-primary)] truncate">
                      {member.name}
                    </Text>
                    <div className={`px-2 py-1 rounded-full ${roleData.bgColor} ${roleData.borderColor} border flex items-center gap-1`}>
                      <RoleIcon className={`h-3 w-3 ${roleData.color}`} />
                      <Text variant="body-xs" className={roleData.color}>
                        {roleData.label}
                      </Text>
                    </div>
                    <div className={`px-2 py-1 rounded-full ${statusData.bgColor}`}>
                      <Text variant="body-xs" className={statusData.color}>
                        {statusData.label}
                      </Text>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-[var(--hive-text-tertiary)] text-sm">
                    <span>{member.handle}</span>
                    {variant === 'detailed' && (
                      <>
                        <span>•</span>
                        <span>{member.email}</span>
                        <span>•</span>
                        <span>Joined {new Date(member.joinedAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Last active: {member.lastActive}</span>
                      </>
                    )}
                  </div>
                  
                  {variant === 'detailed' && showStats && (
                    <div className="flex items-center gap-4 mt-2 text-xs text-[var(--hive-text-tertiary)]">
                      <span className="flex items-center gap-1">
                        <Activity className="h-3 w-3" />
                        {member.contributions} contributions
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {member.reputation} reputation
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Actions */}
                {showActions && (
                  <div className="flex items-center gap-1">
                    {getMemberActions(member)}
                    <Button size="sm" variant="ghost" className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className="p-12 text-center">
          <Users className="h-16 w-16 text-[var(--hive-text-tertiary)] mx-auto mb-4" />
          <Text variant="heading-md" className="text-[var(--hive-text-primary)] mb-2">
            No members found
          </Text>
          <Text variant="body-sm" className="text-[var(--hive-text-tertiary)]">
            Try adjusting your search or filter criteria
          </Text>
        </div>
      )}
    </Card>
  );
};

// ============================================================================
// INVITE MEMBERS COMPONENT
// ============================================================================

interface InviteMembersProps {
  variant?: 'modal' | 'inline' | 'compact';
  onInvite?: (email: string, role: string) => void;
  pendingInvites?: typeof mockInvitePending;
}

const InviteMembers: React.FC<InviteMembersProps> = ({
  variant = 'modal',
  onInvite,
  pendingInvites = mockInvitePending
}) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [message, setMessage] = useState('');
  const [emails, setEmails] = useState<string[]>([]);

  const handleAddEmail = () => {
    if (email && !emails.includes(email)) {
      setEmails([...emails, email]);
      setEmail('');
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter(e => e !== emailToRemove));
  };

  const handleInvite = () => {
    emails.forEach(email => onInvite?.(email, role));
    setEmails([]);
    setMessage('');
  };

  return (
    <Card className="bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <UserPlus className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
          <Text variant="heading-lg" className="text-[var(--hive-text-primary)]">
            Invite Members
          </Text>
        </div>
        
        {/* Email Input */}
        <div className="space-y-4 mb-6">
          <div>
            <Text variant="body-sm" className="text-[var(--hive-text-primary)] mb-2">
              Email addresses
            </Text>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddEmail()}
                className="flex-1 bg-[var(--hive-interactive-hover)] border-[var(--hive-interactive-active)]"
              />
              <Button 
                onClick={handleAddEmail}
                variant="outline"
                className="border-[var(--hive-brand-secondary)] text-[var(--hive-brand-secondary)]"
              >
                Add
              </Button>
            </div>
          </div>
          
          {/* Email Tags */}
          {emails.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {emails.map((email) => (
                <Badge 
                  key={email}
                  variant="secondary"
                  className="bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30"
                >
                  {email}
                  <button 
                    onClick={() => handleRemoveEmail(email)}
                    className="ml-2 hover:text-red-400"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
          
          {/* Role Selection */}
          <div>
            <Text variant="body-sm" className="text-[var(--hive-text-primary)] mb-2">
              Role
            </Text>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-lg text-[var(--hive-text-primary)]"
            >
              <option value="member">Member - Basic access</option>
              <option value="moderator">Moderator - Can moderate content</option>
              <option value="admin">Admin - Can manage members</option>
            </select>
          </div>
          
          {/* Personal Message */}
          <div>
            <Text variant="body-sm" className="text-[var(--hive-text-primary)] mb-2">
              Personal message (optional)
            </Text>
            <textarea
              placeholder="Add a personal note to your invitation..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-lg text-[var(--hive-text-primary)] placeholder-[var(--hive-text-tertiary)] resize-none"
            />
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            onClick={handleInvite}
            disabled={emails.length === 0}
            className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-secondary)] disabled:opacity-50"
          >
            <Mail className="h-4 w-4 mr-2" />
            Send {emails.length} Invitation{emails.length !== 1 ? 's' : ''}
          </Button>
          <Button variant="outline" className="border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]">
            Cancel
          </Button>
        </div>
        
        {/* Pending Invites */}
        {pendingInvites.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
            <Text variant="heading-sm" className="text-[var(--hive-text-primary)] mb-4">
              Pending Invitations ({pendingInvites.length})
            </Text>
            
            <div className="space-y-2">
              {pendingInvites.map((invite) => (
                <div key={invite.id} className="flex items-center justify-between p-3 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg">
                  <div>
                    <Text variant="body-sm" className="text-[var(--hive-text-primary)]">
                      {invite.email}
                    </Text>
                    <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                      Invited by {invite.invitedBy} • {invite.invitedAt}
                    </Text>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={invite.status === 'pending' ? 'secondary' : 'destructive'}
                      className={invite.status === 'pending' ? 'text-yellow-400' : 'text-red-400'}
                    >
                      {invite.status}
                    </Badge>
                    
                    <Button size="sm" variant="ghost" className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

// ============================================================================
// MEMBER ROLE MANAGEMENT COMPONENT
// ============================================================================

interface RoleManagementProps {
  member: typeof mockMembers[0];
  currentUserRole: 'owner' | 'admin' | 'moderator' | 'member';
  onRoleChange?: (memberId: string, newRole: string) => void;
  onPermissionChange?: (memberId: string, permission: string, enabled: boolean) => void;
}

const RoleManagement: React.FC<RoleManagementProps> = ({
  member,
  currentUserRole,
  onRoleChange,
  onPermissionChange
}) => {
  const canEditRole = ['owner', 'admin'].includes(currentUserRole) && member.role !== 'owner';
  const canEditPermissions = ['owner', 'admin'].includes(currentUserRole);

  const permissionCategories = {
    content: [
      { id: 'post', label: 'Create posts', description: 'Can create new posts in the space' },
      { id: 'comment', label: 'Comment', description: 'Can comment on posts' },
      { id: 'edit_posts', label: 'Edit posts', description: 'Can edit their own posts' },
      { id: 'delete_posts', label: 'Delete posts', description: 'Can delete their own posts' },
    ],
    moderation: [
      { id: 'moderate', label: 'Moderate content', description: 'Can moderate posts and comments' },
      { id: 'ban_members', label: 'Ban members', description: 'Can ban/suspend members' },
      { id: 'manage_reports', label: 'Manage reports', description: 'Can handle reported content' },
    ],
    management: [
      { id: 'invite', label: 'Invite members', description: 'Can invite new members to the space' },
      { id: 'manage_members', label: 'Manage members', description: 'Can edit member roles and permissions' },
      { id: 'space_settings', label: 'Space settings', description: 'Can edit space settings and details' },
    ]
  };

  return (
    <Card className="bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
      <div className="p-6">
        {/* Member Header */}
        <div className="flex items-center gap-4 mb-6">
          <Avatar
            src={member.avatar}
            fallback={member.name.charAt(0)}
            size="lg"
            className="border-2 border-[var(--hive-interactive-active)]"
          />
          <div className="flex-1">
            <Text variant="heading-lg" className="text-[var(--hive-text-primary)]">
              {member.name}
            </Text>
            <Text variant="body-sm" className="text-[var(--hive-text-tertiary)]">
              {member.handle} • {member.email}
            </Text>
          </div>
          
          <div className="text-right">
            <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
              Member since {new Date(member.joinedAt).toLocaleDateString()}
            </Text>
            <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
              Last active: {member.lastActive}
            </Text>
          </div>
        </div>
        
        {/* Role Selection */}
        <div className="mb-8">
          <Text variant="heading-sm" className="text-[var(--hive-text-primary)] mb-4">
            Role Assignment
          </Text>
          
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(roleConfig).map(([roleKey, roleData]) => {
              const RoleIcon = roleData.icon;
              const isSelected = member.role === roleKey;
              const canSelect = canEditRole && (
                currentUserRole === 'owner' || 
                (currentUserRole === 'admin' && roleKey !== 'owner')
              );
              
              return (
                <button
                  key={roleKey}
                  onClick={() => canSelect && onRoleChange?.(member.id, roleKey)}
                  disabled={!canSelect}
                  className={`
                    p-4 rounded-lg border-2 transition-all text-left
                    ${isSelected 
                      ? `${roleData.borderColor} ${roleData.bgColor}` 
                      : 'border-[var(--hive-interactive-active)] hover:border-[var(--hive-border-hover)]'
                    }
                    ${!canSelect ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <RoleIcon className={`h-5 w-5 ${isSelected ? roleData.color : 'text-[var(--hive-text-tertiary)]'}`} />
                    <Text variant="body-md" className={isSelected ? roleData.color : 'text-[var(--hive-text-primary)]'}>
                      {roleData.label}
                    </Text>
                  </div>
                  <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                    {roleData.permissions}
                  </Text>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Detailed Permissions */}
        {canEditPermissions && (
          <div>
            <Text variant="heading-sm" className="text-[var(--hive-text-primary)] mb-4">
              Detailed Permissions
            </Text>
            
            {Object.entries(permissionCategories).map(([category, permissions]) => (
              <div key={category} className="mb-6">
                <Text variant="body-md" className="text-[var(--hive-text-primary)] mb-3 capitalize">
                  {category} Permissions
                </Text>
                
                <div className="space-y-3">
                  {permissions.map((permission) => {
                    const hasPermission = member.permissions.includes(permission.id);
                    
                    return (
                      <div key={permission.id} className="flex items-center justify-between p-3 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg">
                        <div className="flex-1">
                          <Text variant="body-sm" className="text-[var(--hive-text-primary)]">
                            {permission.label}
                          </Text>
                          <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                            {permission.description}
                          </Text>
                        </div>
                        
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={hasPermission}
                            onChange={(e) => onPermissionChange?.(member.id, permission.id, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[var(--hive-interactive-active)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-[var(--hive-text-primary)] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--hive-brand-secondary)]"></div>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Actions */}
        <div className="flex justify-between pt-6 border-t border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
          <div className="flex gap-2">
            <Button variant="outline" className="border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]">
              Reset to Defaults
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]">
              Cancel
            </Button>
            <Button className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// ============================================================================
// STORYBOOK STORIES
// ============================================================================

export const DefaultMemberList: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <MemberList 
        members={mockMembers}
        currentUserRole="admin"
        showStats={true}
        showOnlineStatus={true}
      />
    </div>
  ),
};

export const CompactMemberList: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <MemberList 
        members={mockMembers}
        variant="compact"
        currentUserRole="member"
        showActions={false}
      />
    </div>
  ),
};

export const DetailedMemberList: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <MemberList 
        members={mockMembers}
        variant="detailed"
        currentUserRole="owner"
        showStats={true}
        showOnlineStatus={true}
      />
    </div>
  ),
};

export const InviteMembersModal: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <InviteMembers 
        onInvite={(email, role) => console.log('Invite:', email, role)}
        pendingInvites={mockInvitePending}
      />
    </div>
  ),
};

export const MemberRoleManagement: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <RoleManagement 
        member={mockMembers[1]}
        currentUserRole="owner"
        onRoleChange={(id, role) => console.log('Role change:', id, role)}
        onPermissionChange={(id, permission, enabled) => console.log('Permission change:', id, permission, enabled)}
      />
    </div>
  ),
};

export const KitchenSinkMemberManagement: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-8">
      <Text variant="display-md" className="text-[var(--hive-text-primary)] text-center">
        Member Management - Kitchen Sink
      </Text>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Compact List */}
        <MemberList 
          members={mockMembers.slice(0, 3)}
          variant="compact"
          currentUserRole="member"
        />
        
        {/* Invite Component */}
        <InviteMembers 
          variant="compact"
          pendingInvites={mockInvitePending.slice(0, 2)}
        />
      </div>
      
      {/* Full Detailed List */}
      <MemberList 
        members={mockMembers}
        variant="detailed"
        currentUserRole="admin"
        showStats={true}
        showOnlineStatus={true}
      />
      
      {/* Role Management */}
      <RoleManagement 
        member={mockMembers[2]}
        currentUserRole="owner"
      />
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-8">
      <Text variant="display-md" className="text-[var(--hive-text-primary)] text-center">
        Member Management - Edge Cases
      </Text>
      
      {/* Empty List */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Empty Member List</Text>
        <MemberList members={[]} currentUserRole="owner" />
      </div>
      
      {/* Single Member */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Single Member</Text>
        <MemberList members={[mockMembers[0]]} currentUserRole="member" />
      </div>
      
      {/* Suspended Members Only */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Suspended Members</Text>
        <MemberList 
          members={mockMembers.filter(m => m.status === 'suspended')} 
          currentUserRole="admin" 
        />
      </div>
      
      {/* No Permissions User */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Limited Permissions View</Text>
        <MemberList 
          members={mockMembers} 
          currentUserRole="member"
          showActions={false}
        />
      </div>
    </div>
  ),
};