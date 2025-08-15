import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HiveButton } from '../../components/hive-button';
import { HiveBadge } from '../../components/hive-badge';
import { HiveCard } from '../../components/hive-card';
import { motion, AnimatePresence } from 'framer-motion';

const meta: Meta = {
  title: '07-Spaces/Membership',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Space Membership & Roles

Member roles, permissions, and collaboration workflows within HIVE spaces. These stories demonstrate how different member types interact with spaces and each other.

## Member Roles

1. **Member** - Regular community member with basic permissions
2. **Builder** - Space administrator with management capabilities
3. **Requested Builder** - Member who has requested builder status

## Membership Features

- **Role-Based Permissions** - Different capabilities based on member role
- **Invitation System** - Invite new members to join spaces
- **Join Requests** - Handle requests to join private spaces
- **Role Promotion** - Promote members to builder status
- **Collaborative Features** - Member interactions and teamwork

## When to Use

- **Member Onboarding** - New member welcome and orientation
- **Permission Management** - Role-based access control
- **Community Building** - Member engagement and collaboration
- **Space Governance** - Member management and moderation
- **Invitation Workflows** - Growing space membership
        `,
      },
    },
  },
};

export default meta;

// Mock data for membership
const mockMembers = [
  {
    id: 'member1',
    name: 'Alex Chen',
    email: 'alex.chen@stanford.edu',
    avatar: '/api/placeholder/40/40',
    role: 'builder',
    joinedAt: new Date('2024-01-15'),
    lastActive: new Date('2024-01-20'),
    contributions: 24,
    status: 'active',
    bio: 'CS major interested in algorithms and machine learning',
    year: 'Junior',
    major: 'Computer Science',
    badges: ['founder', 'top-contributor'],
  },
  {
    id: 'member2',
    name: 'Sarah Miller',
    email: 'sarah.miller@stanford.edu',
    avatar: '/api/placeholder/40/40',
    role: 'builder',
    joinedAt: new Date('2024-01-16'),
    lastActive: new Date('2024-01-19'),
    contributions: 18,
    status: 'active',
    bio: 'TA for CS106B, love helping students learn',
    year: 'Senior',
    major: 'Computer Science',
    badges: ['ta', 'helpful'],
  },
  {
    id: 'member3',
    name: 'Mike Johnson',
    email: 'mike.johnson@stanford.edu',
    avatar: '/api/placeholder/40/40',
    role: 'member',
    joinedAt: new Date('2024-01-18'),
    lastActive: new Date('2024-01-20'),
    contributions: 12,
    status: 'active',
    bio: 'Sophomore studying CS and Math',
    year: 'Sophomore',
    major: 'Computer Science & Mathematics',
    badges: ['active-member'],
  },
  {
    id: 'member4',
    name: 'Emily Davis',
    email: 'emily.davis@stanford.edu',
    avatar: '/api/placeholder/40/40',
    role: 'member',
    joinedAt: new Date('2024-01-19'),
    lastActive: new Date('2024-01-19'),
    contributions: 8,
    status: 'active',
    bio: 'Pre-med student taking CS courses',
    year: 'Freshman',
    major: 'Biology',
    badges: ['newcomer'],
  },
  {
    id: 'member5',
    name: 'David Wilson',
    email: 'david.wilson@stanford.edu',
    avatar: '/api/placeholder/40/40',
    role: 'requested_builder',
    joinedAt: new Date('2024-01-20'),
    lastActive: new Date('2024-01-20'),
    contributions: 15,
    status: 'active',
    bio: 'Passionate about algorithms and competitive programming',
    year: 'Sophomore',
    major: 'Computer Science',
    badges: ['problem-solver'],
  },
];

const mockSpace = {
  id: 'space123',
  name: 'Stanford CS Study Group',
  memberCount: 156,
  settings: {
    privacy: 'public',
    allowInvites: true,
    requireApproval: false,
    maxMembers: 500,
  },
};

const mockInvitations = [
  {
    id: 'inv1',
    email: 'john.doe@stanford.edu',
    invitedBy: 'Alex Chen',
    invitedAt: new Date('2024-01-19'),
    status: 'pending',
    role: 'member',
  },
  {
    id: 'inv2',
    email: 'jane.smith@stanford.edu',
    invitedBy: 'Sarah Miller',
    invitedAt: new Date('2024-01-18'),
    status: 'pending',
    role: 'member',
  },
  {
    id: 'inv3',
    email: 'bob.wilson@stanford.edu',
    invitedBy: 'Alex Chen',
    invitedAt: new Date('2024-01-17'),
    status: 'accepted',
    role: 'member',
  },
];

// Member Card Component
const MemberCard = ({ 
  member, 
  canManage, 
  onRoleChange, 
  onRemove,
  onViewProfile 
}: {
  member: any;
  canManage: boolean;
  onRoleChange: (memberId: string, newRole: string) => void;
  onRemove: (memberId: string) => void;
  onViewProfile: (memberId: string) => void;
}) => (
  <HiveCard className="p-4">
    <div className="flex items-start gap-3">
      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-medium">
          {member.name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium truncate">{member.name}</h3>
          <HiveBadge 
            variant={member.role === 'builder' ? 'default' : 'outline'}
            size="sm"
            className="capitalize"
          >
            {member.role.replace('_', ' ')}
          </HiveBadge>
        </div>
        <p className="text-sm text-gray-600 mb-2">{member.bio}</p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>{member.year} • {member.major}</span>
          <span>{member.contributions} contributions</span>
          <span>Joined {member.joinedAt.toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1 mt-2">
          {member.badges.map((badge) => (
            <span key={badge} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              {badge}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <HiveButton
          size="sm"
          variant="outline"
          onClick={() => onViewProfile(member.id)}
        >
          View Profile
        </HiveButton>
        {canManage && (
          <div className="flex items-center gap-1">
            <select
              value={member.role}
              onChange={(e) => onRoleChange(member.id, e.target.value)}
              className="text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-hive-gold"
            >
              <option value="member">Member</option>
              <option value="builder">Builder</option>
            </select>
            <button
              onClick={() => onRemove(member.id)}
              className="text-xs text-red-600 hover:text-red-700 px-2 py-1"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  </HiveCard>
);

// Role Comparison Component
const RoleComparison = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <HiveCard className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">👤</span>
        <h3 className="font-semibold">Member</h3>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span>
          <span>View all content</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span>
          <span>Create posts and comments</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span>
          <span>React to posts</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span>
          <span>Join events</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span>
          <span>Use tools</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-500">✗</span>
          <span>Moderate content</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-500">✗</span>
          <span>Manage members</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-500">✗</span>
          <span>Edit space settings</span>
        </div>
      </div>
    </HiveCard>

    <HiveCard className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🛠️</span>
        <h3 className="font-semibold">Builder</h3>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span>
          <span>All member permissions</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span>
          <span>Pin and unpin posts</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span>
          <span>Delete inappropriate content</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span>
          <span>Invite new members</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span>
          <span>Manage member roles</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span>
          <span>Edit space settings</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span>
          <span>Deploy and manage tools</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span>
          <span>Access analytics</span>
        </div>
      </div>
    </HiveCard>
  </div>
);

export const MemberRoleComparison: StoryObj = {
  render: () => {
    const [selectedRole, setSelectedRole] = useState('member');
    
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Member Role Comparison
            </h1>
            <p className="text-gray-600">
              Understanding different member roles and their capabilities
            </p>
          </div>

          {/* Role Selector */}
          <div className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Select Role to View</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedRole('member')}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${selectedRole === 'member' 
                    ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                `}
              >
                <span>👤</span>
                <span>Member</span>
              </button>
              <button
                onClick={() => setSelectedRole('builder')}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${selectedRole === 'builder' 
                    ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                `}
              >
                <span>🛠️</span>
                <span>Builder</span>
              </button>
            </div>
          </div>

          {/* Role Details */}
          <div className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6 mb-6">
            <AnimatePresence mode="wait">
              {selectedRole === 'member' && (
                <motion.div
                  key="member"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">👤</span>
                    <div>
                      <h3 className="text-lg font-semibold">Member</h3>
                      <p className="text-gray-600">Regular community member</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">What Members Can Do</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• View all space content</li>
                        <li>• Create posts and comments</li>
                        <li>• React to posts with hearts and helpful votes</li>
                        <li>• Join events and activities</li>
                        <li>• Use deployed tools</li>
                        <li>• Update their profile information</li>
                        <li>• Leave the space if desired</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Member Experience</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-sm">Typical Day</h5>
                          <p className="text-xs text-gray-600">
                            Check posts, ask questions, join study sessions, use tools
                          </p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-sm">Growth Path</h5>
                          <p className="text-xs text-gray-600">
                            Active members can request builder status
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedRole === 'builder' && (
                <motion.div
                  key="builder"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">🛠️</span>
                    <div>
                      <h3 className="text-lg font-semibold">Builder</h3>
                      <p className="text-gray-600">Space administrator and community leader</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Additional Builder Capabilities</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• All member permissions</li>
                        <li>• Pin and unpin important posts</li>
                        <li>• Delete inappropriate content</li>
                        <li>• Invite new members to the space</li>
                        <li>• Promote members to builder status</li>
                        <li>• Edit space settings and privacy</li>
                        <li>• Deploy and manage tools</li>
                        <li>• Access detailed analytics</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Builder Responsibilities</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-[var(--hive-brand-secondary)]/10 rounded-lg">
                          <h5 className="font-medium text-sm">Community Leadership</h5>
                          <p className="text-xs text-gray-600">
                            Guide discussions, moderate content, foster growth
                          </p>
                        </div>
                        <div className="p-3 bg-[var(--hive-brand-secondary)]/10 rounded-lg">
                          <h5 className="font-medium text-sm">Technical Management</h5>
                          <p className="text-xs text-gray-600">
                            Configure space, deploy tools, manage permissions
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Role Comparison Table */}
          <div className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Role Comparison</h2>
            <RoleComparison />
          </div>
        </div>
      </div>
    );
  },
};

export const InvitationFlow: StoryObj = {
  render: () => {
    const [invitations, setInvitations] = useState(mockInvitations);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteForm, setInviteForm] = useState({
      email: '',
      role: 'member',
      message: '',
    });

    const handleSendInvitation = () => {
      if (inviteForm.email) {
        const newInvitation = {
          id: `inv${invitations.length + 1}`,
          email: inviteForm.email,
          invitedBy: 'Alex Chen',
          invitedAt: new Date(),
          status: 'pending',
          role: inviteForm.role,
        };
        setInvitations([newInvitation, ...invitations]);
        setInviteForm({ email: '', role: 'member', message: '' });
        setShowInviteModal(false);
      }
    };

    const handleResendInvitation = (invitationId: string) => {
      setInvitations(invitations.map(inv => 
        inv.id === invitationId 
          ? { ...inv, invitedAt: new Date() }
          : inv
      ));
    };

    const handleCancelInvitation = (invitationId: string) => {
      setInvitations(invitations.filter(inv => inv.id !== invitationId));
    };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Invitation System
                </h1>
                <p className="text-gray-600">
                  Invite new members to join your space
                </p>
              </div>
              <HiveButton onClick={() => setShowInviteModal(true)}>
                Send Invitation
              </HiveButton>
            </div>
          </div>

          {/* Invitation Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <HiveCard className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--hive-brand-secondary)]">
                  {invitations.filter(inv => inv.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">Pending Invitations</div>
              </div>
            </HiveCard>
            <HiveCard className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {invitations.filter(inv => inv.status === 'accepted').length}
                </div>
                <div className="text-sm text-gray-600">Accepted</div>
              </div>
            </HiveCard>
            <HiveCard className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {invitations.length}
                </div>
                <div className="text-sm text-gray-600">Total Sent</div>
              </div>
            </HiveCard>
          </div>

          {/* Invitations List */}
          <div className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Recent Invitations</h2>
            </div>
            <div className="divide-y">
              {invitations.map((invitation) => (
                <div key={invitation.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-lg">📧</span>
                      </div>
                      <div>
                        <div className="font-medium">{invitation.email}</div>
                        <div className="text-sm text-gray-600">
                          Invited by {invitation.invitedBy} • {invitation.invitedAt.toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <HiveBadge variant="outline" size="sm" className="capitalize">
                            {invitation.role}
                          </HiveBadge>
                          <HiveBadge 
                            variant={invitation.status === 'accepted' ? 'default' : 'outline'}
                            size="sm"
                            className={`
                              ${invitation.status === 'accepted' ? 'bg-green-500 text-[var(--hive-text-primary)]' : 
                                invitation.status === 'pending' ? 'bg-yellow-500 text-[var(--hive-text-primary)]' : ''}
                            `}
                          >
                            {invitation.status}
                          </HiveBadge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {invitation.status === 'pending' && (
                        <>
                          <HiveButton
                            variant="outline"
                            size="sm"
                            onClick={() => handleResendInvitation(invitation.id)}
                          >
                            Resend
                          </HiveButton>
                          <button
                            onClick={() => handleCancelInvitation(invitation.id)}
                            className="text-red-600 hover:text-red-700 text-sm px-2 py-1"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Invite Modal */}
          {showInviteModal && (
            <div className="fixed inset-0 bg-[var(--hive-background-primary)] bg-opacity-50 flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[var(--hive-text-primary)] rounded-lg p-6 max-w-md w-full"
              >
                <h3 className="text-lg font-semibold mb-4">Invite New Member</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={inviteForm.email}
                      onChange={(e) => setInviteForm({...inviteForm, email: e.target.value})}
                      placeholder="Enter email address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Role
                    </label>
                    <select
                      value={inviteForm.role}
                      onChange={(e) => setInviteForm({...inviteForm, role: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                    >
                      <option value="member">Member</option>
                      <option value="builder">Builder</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Personal Message (Optional)
                    </label>
                    <textarea
                      value={inviteForm.message}
                      onChange={(e) => setInviteForm({...inviteForm, message: e.target.value})}
                      placeholder="Add a personal message to the invitation..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold"
                      rows={3}
                    />
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h4 className="font-medium text-blue-900 mb-1">Invitation Preview</h4>
                    <p className="text-sm text-blue-800">
                      {inviteForm.email || 'user@stanford.edu'} will receive an email invitation to join{' '}
                      <strong>{mockSpace.name}</strong> as a <strong>{inviteForm.role}</strong>.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <HiveButton
                    variant="outline"
                    onClick={() => setShowInviteModal(false)}
                  >
                    Cancel
                  </HiveButton>
                  <HiveButton
                    onClick={handleSendInvitation}
                    disabled={!inviteForm.email}
                  >
                    Send Invitation
                  </HiveButton>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    );
  },
};

export const JoinRequestFlow: StoryObj = {
  render: () => {
    const [joinRequests, setJoinRequests] = useState([
      {
        id: 'req1',
        name: 'John Smith',
        email: 'john.smith@stanford.edu',
        requestedAt: new Date('2024-01-20'),
        reason: 'I\'m a CS major interested in joining study groups and collaborating on projects.',
        year: 'Sophomore',
        major: 'Computer Science',
        status: 'pending',
      },
      {
        id: 'req2',
        name: 'Lisa Brown',
        email: 'lisa.brown@stanford.edu',
        requestedAt: new Date('2024-01-19'),
        reason: 'Looking for a supportive community to help with CS coursework and make new friends.',
        year: 'Freshman',
        major: 'Computer Science',
        status: 'pending',
      },
    ]);

    const handleApproveRequest = (requestId: string) => {
      setJoinRequests(joinRequests.map(req => 
        req.id === requestId 
          ? { ...req, status: 'approved' }
          : req
      ));
    };

    const handleDeclineRequest = (requestId: string) => {
      setJoinRequests(joinRequests.map(req => 
        req.id === requestId 
          ? { ...req, status: 'declined' }
          : req
      ));
    };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Join Request Management
            </h1>
            <p className="text-gray-600">
              Review and approve requests to join your space
            </p>
          </div>

          {/* Request Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <HiveCard className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--hive-brand-secondary)]">
                  {joinRequests.filter(req => req.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">Pending Requests</div>
              </div>
            </HiveCard>
            <HiveCard className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {joinRequests.filter(req => req.status === 'approved').length}
                </div>
                <div className="text-sm text-gray-600">Approved</div>
              </div>
            </HiveCard>
            <HiveCard className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {joinRequests.filter(req => req.status === 'declined').length}
                </div>
                <div className="text-sm text-gray-600">Declined</div>
              </div>
            </HiveCard>
          </div>

          {/* Join Requests */}
          <div className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Join Requests</h2>
            </div>
            <div className="divide-y">
              {joinRequests.map((request) => (
                <div key={request.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {request.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{request.name}</div>
                        <div className="text-sm text-gray-600">{request.email}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {request.year} • {request.major}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Requested {request.requestedAt.toLocaleDateString()}
                        </div>
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-sm mb-1">Why they want to join:</h4>
                          <p className="text-sm text-gray-700">{request.reason}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {request.status === 'pending' ? (
                        <>
                          <HiveButton
                            size="sm"
                            onClick={() => handleApproveRequest(request.id)}
                          >
                            Approve
                          </HiveButton>
                          <HiveButton
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeclineRequest(request.id)}
                          >
                            Decline
                          </HiveButton>
                        </>
                      ) : (
                        <HiveBadge
                          variant={request.status === 'approved' ? 'default' : 'outline'}
                          className={`
                            ${request.status === 'approved' ? 'bg-green-500 text-[var(--hive-text-primary)]' : 
                              request.status === 'declined' ? 'bg-red-500 text-[var(--hive-text-primary)]' : ''}
                          `}
                        >
                          {request.status}
                        </HiveBadge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Join Request Guidelines */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Join Request Guidelines</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Review each request carefully to ensure they're a good fit for the space</li>
              <li>• Consider their background, year, and stated interest in the community</li>
              <li>• Approve requests that align with the space's purpose and values</li>
              <li>• Provide feedback when declining requests to help them improve</li>
            </ul>
          </div>
        </div>
      </div>
    );
  },
};

export const PermissionMatrix: StoryObj = {
  render: () => {
    const permissions = [
      {
        action: 'View Content',
        member: true,
        builder: true,
        description: 'View posts, comments, and other space content',
      },
      {
        action: 'Create Posts',
        member: true,
        builder: true,
        description: 'Create new posts and discussions',
      },
      {
        action: 'Comment on Posts',
        member: true,
        builder: true,
        description: 'Reply to posts and engage in discussions',
      },
      {
        action: 'React to Posts',
        member: true,
        builder: true,
        description: 'Add heart and helpful reactions',
      },
      {
        action: 'Join Events',
        member: true,
        builder: true,
        description: 'RSVP to and attend space events',
      },
      {
        action: 'Use Tools',
        member: true,
        builder: true,
        description: 'Use deployed tools and resources',
      },
      {
        action: 'Pin Posts',
        member: false,
        builder: true,
        description: 'Pin important posts to the top',
      },
      {
        action: 'Delete Posts',
        member: false,
        builder: true,
        description: 'Remove inappropriate or spam content',
      },
      {
        action: 'Invite Members',
        member: false,
        builder: true,
        description: 'Send invitations to new members',
      },
      {
        action: 'Manage Members',
        member: false,
        builder: true,
        description: 'Promote, demote, or remove members',
      },
      {
        action: 'Edit Space Settings',
        member: false,
        builder: true,
        description: 'Modify space configuration and privacy',
      },
      {
        action: 'Deploy Tools',
        member: false,
        builder: true,
        description: 'Add and configure tools for the space',
      },
      {
        action: 'View Analytics',
        member: false,
        builder: true,
        description: 'Access detailed space analytics',
      },
    ];

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Permission Matrix
            </h1>
            <p className="text-gray-600">
              Detailed breakdown of what each role can do
            </p>
          </div>

          {/* Permission Table */}
          <div className="bg-[var(--hive-text-primary)] rounded-lg shadow-sm border overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Role-Based Permissions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Builder
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[var(--hive-text-primary)] divide-y divide-gray-200">
                  {permissions.map((permission, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {permission.action}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`
                          inline-flex items-center justify-center w-6 h-6 rounded-full
                          ${permission.member ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
                        `}>
                          {permission.member ? '✓' : '✗'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`
                          inline-flex items-center justify-center w-6 h-6 rounded-full
                          ${permission.builder ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
                        `}>
                          {permission.builder ? '✓' : '✗'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {permission.description}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Permission Notes */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">👤 Member Notes</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• All members have full access to view and engage with content</li>
                <li>• Members can create and participate in discussions</li>
                <li>• Members can join events and use available tools</li>
                <li>• Members can request to become builders</li>
              </ul>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">🛠️ Builder Notes</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Builders have all member permissions plus administrative access</li>
                <li>• Builders are responsible for community moderation</li>
                <li>• Builders can manage members and space settings</li>
                <li>• Builders have access to analytics and insights</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const CollaborativeExperience: StoryObj = {
  render: () => {
    const [members] = useState(mockMembers);
    const [activeCollaborations, setActiveCollaborations] = useState([
      {
        id: 'collab1',
        name: 'Algorithm Study Session',
        type: 'study-group',
        members: ['member1', 'member3', 'member4'],
        status: 'active',
        startedAt: new Date('2024-01-20T14:00:00'),
        description: 'Working through dynamic programming problems together',
      },
      {
        id: 'collab2',
        name: 'CS106B Project Review',
        type: 'project-review',
        members: ['member2', 'member5'],
        status: 'active',
        startedAt: new Date('2024-01-20T13:30:00'),
        description: 'Reviewing code for the maze solver project',
      },
    ]);

    const getCollaborationMembers = (collaboration: any) => {
      return members.filter(member => collaboration.members.includes(member.id));
    };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Collaborative Experience
            </h1>
            <p className="text-gray-600">
              How members work together in the space
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Active Collaborations */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Active Collaborations</h2>
              <div className="space-y-4">
                {activeCollaborations.map((collaboration) => (
                  <HiveCard key={collaboration.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{collaboration.name}</h3>
                        <p className="text-sm text-gray-600">{collaboration.description}</p>
                      </div>
                      <HiveBadge variant="default" size="sm">
                        {collaboration.type.replace('-', ' ')}
                      </HiveBadge>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-gray-600">Participants:</span>
                      <div className="flex -space-x-2">
                        {getCollaborationMembers(collaboration).map((member) => (
                          <div
                            key={member.id}
                            className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white"
                            title={member.name}
                          >
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Started {collaboration.startedAt.toLocaleTimeString()}
                      </span>
                      <HiveButton size="sm" variant="outline">
                        Join
                      </HiveButton>
                    </div>
                  </HiveCard>
                ))}
              </div>
            </div>

            {/* Member Directory */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Community Members</h2>
              <div className="space-y-3">
                {members.map((member) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    canManage={false}
                    onRoleChange={() => {}}
                    onRemove={() => {}}
                    onViewProfile={() => {}}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Collaboration Features */}
          <div className="mt-8 bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Collaboration Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">📚 Study Groups</h3>
                <p className="text-sm text-blue-800">
                  Form study groups with classmates to work through problems together
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">🔧 Project Collaboration</h3>
                <p className="text-sm text-green-800">
                  Work together on coding projects and get feedback from peers
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-900 mb-2">💡 Knowledge Sharing</h3>
                <p className="text-sm text-purple-800">
                  Share resources, tips, and insights with the community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};