"use client";

import { useState, useEffect } from "react";
import { Button, Card, Badge, Modal, Input } from "@hive/ui";
import { PageContainer } from "@/components/layout/page-container";
import { 
  Users, 
  UserPlus, 
  Search, 
 
  MoreVertical, 
  Star, 
  MessageSquare, 
  Shield, 
  UserMinus,
  Mail,
  Copy,
  Crown,
  Activity,
  TrendingUp,
  ArrowLeft
} from "lucide-react";
import { ErrorBoundary } from "../../../../../components/error-boundary";

interface SpaceMembersPageProps {
  params: Promise<{
    spaceId: string;
  }>;
}

interface SpaceMember {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: string;
  lastActive: string;
  contributionScore: number;
  verified?: boolean;
  status: 'active' | 'inactive';
  eventsAttended: number;
  postsCount: number;
  major?: string;
  year?: string;
}

interface InviteLink {
  id: string;
  url: string;
  expiresAt: string;
  maxUses: number;
  currentUses: number;
  createdBy: string;
  role: 'member' | 'moderator';
}

export default function SpaceMembersPage({ params }: SpaceMembersPageProps) {
  const [spaceId, setSpaceId] = useState<string>('');
  const [members, setMembers] = useState<SpaceMember[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'moderator' | 'member'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showMemberDetails, setShowMemberDetails] = useState<SpaceMember | null>(null);
  const [inviteLinks, setInviteLinks] = useState<InviteLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [spaceName, setSpaceName] = useState('');
  const [userRole, setUserRole] = useState<'admin' | 'moderator' | 'member'>('member');

  useEffect(() => {
    // Resolve params Promise
    const resolveParams = async () => {
      const resolvedParams = await params;
      setSpaceId(resolvedParams.spaceId);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!spaceId) return;
    // Mock data fetch
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSpaceName('CS Study Group');
      setUserRole('admin');
      
      const mockMembers: SpaceMember[] = [
        {
          id: '1',
          name: 'Sarah Chen',
          handle: 'sarahc',
          role: 'admin',
          joinedAt: '2024-01-15T10:00:00Z',
          lastActive: '2024-02-01T14:30:00Z',
          contributionScore: 95,
          verified: true,
          status: 'active',
          eventsAttended: 12,
          postsCount: 24,
          major: 'Computer Science',
          year: 'Junior'
        },
        {
          id: '2',
          name: 'Marcus Johnson',
          handle: 'marcusj',
          role: 'moderator',
          joinedAt: '2024-01-10T09:00:00Z',
          lastActive: '2024-02-01T12:15:00Z',
          contributionScore: 87,
          status: 'active',
          eventsAttended: 8,
          postsCount: 15,
          major: 'Computer Science',
          year: 'Senior'
        },
        {
          id: '3',
          name: 'Emma Davis',
          handle: 'emmad',
          role: 'member',
          joinedAt: '2024-01-20T11:30:00Z',
          lastActive: '2024-01-30T16:45:00Z',
          contributionScore: 62,
          status: 'active',
          eventsAttended: 4,
          postsCount: 8,
          major: 'Computer Science',
          year: 'Sophomore'
        },
        {
          id: '4',
          name: 'Alex Rivera',
          handle: 'alexr',
          role: 'member',
          joinedAt: '2024-01-25T13:00:00Z',
          lastActive: '2024-01-28T10:20:00Z',
          contributionScore: 45,
          status: 'inactive',
          eventsAttended: 2,
          postsCount: 3,
          major: 'Computer Science',
          year: 'Freshman'
        },
        {
          id: '5',
          name: 'Jessica Wong',
          handle: 'jessicaw',
          role: 'member',
          joinedAt: '2024-01-18T15:20:00Z',
          lastActive: '2024-02-01T11:10:00Z',
          contributionScore: 78,
          verified: true,
          status: 'active',
          eventsAttended: 7,
          postsCount: 12,
          major: 'Computer Science',
          year: 'Junior'
        }
      ];

      const mockInviteLinks: InviteLink[] = [
        {
          id: '1',
          url: 'https://hive.edu/invite/abc123',
          expiresAt: '2024-02-15T23:59:59Z',
          maxUses: 25,
          currentUses: 8,
          createdBy: '1',
          role: 'member'
        },
        {
          id: '2',
          url: 'https://hive.edu/invite/def456',
          expiresAt: '2024-02-10T23:59:59Z',
          maxUses: 10,
          currentUses: 10,
          createdBy: '2',
          role: 'member'
        }
      ];

      setMembers(mockMembers);
      setInviteLinks(mockInviteLinks);
      setIsLoading(false);
    };

    fetchData();
  }, [spaceId]);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.handle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getRoleIcon = (role: SpaceMember['role']) => {
    switch (role) {
      case 'admin': return Crown;
      case 'moderator': return Shield;
      case 'member': return Users;
      default: return Users;
    }
  };

  const getRoleColor = (role: SpaceMember['role']) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'moderator': return 'bg-[var(--hive-gold)]';
      case 'member': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };


  const copyInviteLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      // Show success toast
    } catch (err) {
      console.error('Failed to copy invite link:', err);
    }
  };

  const generateInviteLink = () => {
    const newLink: InviteLink = {
      id: Date.now().toString(),
      url: `https://hive.edu/invite/${Math.random().toString(36).substring(7)}`,
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days
      maxUses: 25,
      currentUses: 0,
      createdBy: '1',
      role: 'member'
    };
    
    setInviteLinks(prev => [newLink, ...prev]);
  };

  if (isLoading) {
    return (
      <PageContainer title="Loading..." maxWidth="7xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 bg-hive-gold rounded-lg animate-pulse mx-auto mb-4" />
            <p className="text-[var(--hive-text-inverse)]">Loading members...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  const activeMembers = members.filter(m => m.status === 'active').length;
  const totalMembers = members.length;

  return (
    <ErrorBoundary>
      <PageContainer
        title="Members"
        subtitle={`${spaceName} • ${activeMembers} active of ${totalMembers} total`}
        breadcrumbs={[
          { 
            label: "Spaces", 
            href: "/spaces",
            icon: ArrowLeft
          },
          { 
            label: spaceName, 
            href: `/spaces/${spaceId}`
          },
          { 
            label: "Members", 
            icon: Users 
          }
        ]}
        actions={
          <div className="flex items-center space-x-3">
            {(userRole === 'admin' || userRole === 'moderator') && (
              <Button 
                onClick={() => setShowInviteModal(true)}
                className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Members
              </Button>
            )}
          </div>
        }
        maxWidth="7xl"
      >
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
                placeholder="Search members..."
                className="pl-10 w-64"
              />
            </div>
            
            <select
              value={roleFilter}
              onChange={(e: any) => setRoleFilter(e.target.value as 'all' | 'admin' | 'moderator' | 'member')}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-[var(--hive-text-inverse)] text-sm focus:border-hive-gold focus:outline-none"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admins</option>
              <option value="moderator">Moderators</option>
              <option value="member">Members</option>
            </select>
            
            <select
              value={statusFilter}
              onChange={(e: any) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-[var(--hive-text-inverse)] text-sm focus:border-hive-gold focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-zinc-400">
            <Activity className="h-4 w-4" />
            <span>{filteredMembers.length} members shown</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-zinc-800/50 border-zinc-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">{totalMembers}</div>
                <div className="text-sm text-zinc-400">Total Members</div>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </Card>
          
          <Card className="p-4 bg-zinc-800/50 border-zinc-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">{activeMembers}</div>
                <div className="text-sm text-zinc-400">Active Members</div>
              </div>
              <Activity className="h-8 w-8 text-green-400" />
            </div>
          </Card>
          
          <Card className="p-4 bg-zinc-800/50 border-zinc-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">
                  {Math.round((activeMembers / totalMembers) * 100)}%
                </div>
                <div className="text-sm text-zinc-400">Activity Rate</div>
              </div>
              <TrendingUp className="h-8 w-8 text-[var(--hive-gold)]" />
            </div>
          </Card>
          
          <Card className="p-4 bg-zinc-800/50 border-zinc-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">
                  {members.filter(m => m.role === 'admin' || m.role === 'moderator').length}
                </div>
                <div className="text-sm text-zinc-400">Staff Members</div>
              </div>
              <Shield className="h-8 w-8 text-[var(--hive-gold)]" />
            </div>
          </Card>
        </div>

        {/* Members List */}
        <div className="space-y-3">
          {filteredMembers.map((member: any) => {
            const RoleIcon = getRoleIcon(member.role);
            
            return (
              <Card key={member.id} className="p-4 bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/70 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-zinc-600 rounded-full flex items-center justify-center">
                        <span className="text-[var(--hive-text-inverse)] font-semibold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getRoleColor(member.role)} rounded-full flex items-center justify-center`}>
                        <RoleIcon className="h-2.5 w-2.5 text-[var(--hive-text-inverse)]" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-[var(--hive-text-inverse)]">{member.name}</span>
                        {member.verified && <Star className="h-4 w-4 text-hive-gold fill-current" />}
                        <Badge 
                          variant={
                            member.role === 'admin' ? 'destructive' : 
                            member.role === 'moderator' ? 'building-tools' : 
                            'skill-tag'
                          } 
                          className="text-xs capitalize"
                        >
                          {member.role}
                        </Badge>
                        <Badge 
                          variant={member.status === 'active' ? 'building-tools' : 'skill-tag'} 
                          className="text-xs capitalize"
                        >
                          {member.status}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-zinc-400 mb-2">
                        @{member.handle} • {member.major} • {member.year}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-zinc-500">
                        <span>Joined {formatDate(member.joinedAt)}</span>
                        <span>•</span>
                        <span>Last active {formatTimeAgo(member.lastActive)}</span>
                        <span>•</span>
                        <span>Score: {member.contributionScore}/100</span>
                      </div>
                    </div>
                    
                    <div className="hidden md:flex items-center space-x-6 text-sm text-zinc-400">
                      <div className="text-center">
                        <div className="font-medium text-[var(--hive-text-inverse)]">{member.eventsAttended}</div>
                        <div className="text-xs">Events</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-[var(--hive-text-inverse)]">{member.postsCount}</div>
                        <div className="text-xs">Posts</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowMemberDetails(member)}
                      className="text-zinc-400 hover:text-[var(--hive-text-inverse)]"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
          
          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[var(--hive-text-inverse)] mb-2">No members found</h3>
              <p className="text-zinc-400">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>

        {/* Invite Members Modal */}
        <Modal
          isOpen={showInviteModal}
          onClose={() => setShowInviteModal(false)}
          title="Invite Members"
          size="lg"
        >
          <div className="space-y-6">
            {/* Direct Invite */}
            <div>
              <h4 className="font-medium text-[var(--hive-text-inverse)] mb-3">Direct Invitation</h4>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  placeholder="@handle or email@university.edu"
                  className="flex-1 p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-[var(--hive-text-inverse)] placeholder-zinc-400 focus:border-hive-gold focus:outline-none"
                />
                <Button className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne">
                  <Mail className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
              <p className="text-xs text-zinc-500">Send a direct invitation to specific users</p>
            </div>

            {/* Invite Links */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-[var(--hive-text-inverse)]">Invite Links</h4>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={generateInviteLink}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Generate Link
                </Button>
              </div>
              
              <div className="space-y-3">
                {inviteLinks.map((link) => (
                  <div key={link.id} className="p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm">
                        <span className="text-[var(--hive-text-inverse)] font-medium">
                          {link.currentUses}/{link.maxUses} uses
                        </span>
                        <span className="text-zinc-400 ml-2">
                          • Expires {formatDate(link.expiresAt)}
                        </span>
                      </div>
                      <Badge variant="skill-tag" className="text-xs">
                        {link.role}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={link.url}
                        readOnly
                        className="flex-1 p-2 bg-zinc-800 border border-zinc-700 rounded text-[var(--hive-text-inverse)] text-sm"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyInviteLink(link.url)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {inviteLinks.length === 0 && (
                  <div className="text-center py-4 text-zinc-500 text-sm">
                    No active invite links
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>

        {/* Member Details Modal */}
        <Modal
          isOpen={!!showMemberDetails}
          onClose={() => setShowMemberDetails(null)}
          title={showMemberDetails ? `${showMemberDetails.name} Profile` : ''}
          size="lg"
        >
          {showMemberDetails && (
            <div className="space-y-6">
              {/* Member Info */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-zinc-600 rounded-full flex items-center justify-center">
                  <span className="text-[var(--hive-text-inverse)] font-semibold text-lg">
                    {showMemberDetails.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-xl font-semibold text-[var(--hive-text-inverse)]">{showMemberDetails.name}</h3>
                    {showMemberDetails.verified && <Star className="h-5 w-5 text-hive-gold fill-current" />}
                  </div>
                  <p className="text-zinc-400">@{showMemberDetails.handle}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge 
                      variant={
                        showMemberDetails.role === 'admin' ? 'destructive' : 
                        showMemberDetails.role === 'moderator' ? 'building-tools' : 
                        'skill-tag'
                      } 
                      className="text-xs capitalize"
                    >
                      {showMemberDetails.role}
                    </Badge>
                    <Badge 
                      variant={showMemberDetails.status === 'active' ? 'building-tools' : 'skill-tag'} 
                      className="text-xs capitalize"
                    >
                      {showMemberDetails.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-zinc-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">{showMemberDetails.contributionScore}/100</div>
                  <div className="text-sm text-zinc-400">Contribution Score</div>
                </div>
                <div className="p-3 bg-zinc-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">{showMemberDetails.eventsAttended}</div>
                  <div className="text-sm text-zinc-400">Events Attended</div>
                </div>
              </div>

              {/* Member Details */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Major:</span>
                  <span className="text-[var(--hive-text-inverse)]">{showMemberDetails.major}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Year:</span>
                  <span className="text-[var(--hive-text-inverse)]">{showMemberDetails.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Joined:</span>
                  <span className="text-[var(--hive-text-inverse)]">{formatDate(showMemberDetails.joinedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Last Active:</span>
                  <span className="text-[var(--hive-text-inverse)]">{formatTimeAgo(showMemberDetails.lastActive)}</span>
                </div>
              </div>

              {/* Actions */}
              {(userRole === 'admin' || userRole === 'moderator') && showMemberDetails.role !== 'admin' && (
                <div className="flex items-center space-x-3 pt-4 border-t border-zinc-800">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {/* Message functionality to be implemented */}}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  
                  {userRole === 'admin' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {/* Promotion/demotion functionality to be implemented */}}
                      >
                        {showMemberDetails.role === 'moderator' ? (
                          <>
                            <UserMinus className="h-4 w-4 mr-2" />
                            Remove Moderator
                          </>
                        ) : (
                          <>
                            <Shield className="h-4 w-4 mr-2" />
                            Make Moderator
                          </>
                        )}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {/* Remove member functionality to be implemented */}}
                        className="text-red-400 border-red-500/30 hover:bg-red-500/10"
                      >
                        Remove Member
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </Modal>
      </PageContainer>
    </ErrorBoundary>
  );
}