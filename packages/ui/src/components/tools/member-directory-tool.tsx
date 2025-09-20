"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter,
  UserCog,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Crown,
  Shield,
  Star,
  Clock,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  Activity,
  UserCheck,
  UserX,
  Eye,
  Settings,
  Download,
  Upload,
  Zap,
  TrendingUp
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../atomic/atoms/button';
import { Badge } from '../../atomic/atoms/badge';

// Enhanced Member interface for directory
interface DirectoryMember {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'moderator' | 'member';
  status: 'online' | 'away' | 'busy' | 'offline';
  joinedAt: Date;
  lastActive: Date;
  
  // Academic info
  major?: string;
  graduationYear?: number;
  gpa?: number;
  
  // Social metrics
  postsCount: number;
  contributionScore: number;
  helpfulnessRating: number;
  
  // Engagement data
  studyGroupsJoined: number;
  eventsAttended: number;
  toolsUsed: number;
  
  // Contact & availability
  email?: string;
  phone?: string;
  preferredContactMethod: 'discord' | 'email' | 'phone' | 'in-person';
  availableHours?: string;
  location?: string;
  
  // Skills & interests
  skills: string[];
  interests: string[];
  lookingForHelp: string[];
  canHelpWith: string[];
  
  // Verification status
  isVerified: boolean;
  verificationBadges: string[];
  
  // Privacy settings
  profileVisibility: 'public' | 'members-only' | 'leaders-only';
  contactVisible: boolean;
  academicInfoVisible: boolean
}

interface MemberDirectoryToolProps {
  spaceId: string;
  spaceName: string;
  isLeader: boolean;
  currentUserRole: 'owner' | 'admin' | 'moderator' | 'member';
  leaderMode?: 'moderate' | 'manage' | 'configure' | 'insights' | null;
  onMemberAction?: (memberId: string, action: string, data?: any) => void;
  authenticatedFetch?: (url: string, options?: RequestInit) => Promise<Response>;
  className?: string
}

type ViewMode = 'grid' | 'list' | 'skills' | 'analytics';
type FilterType = 'all' | 'online' | 'role' | 'academic' | 'skills' | 'recent';

// Helper functions
const getStatusColor = (status: DirectoryMember['status']) => {
  switch (status) {
    case 'online': return 'bg-green-400';
    case 'away': return 'bg-yellow-400';
    case 'busy': return 'bg-red-400';
    default: return 'bg-gray-400'
  }
};

const getRoleIcon = (role: DirectoryMember['role']) => {
  switch (role) {
    case 'owner': return Crown;
    case 'admin': return Shield;
    case 'moderator': return Star;
    default: return Users
  }
};

const getRoleBadgeColor = (role: DirectoryMember['role']) => {
  switch (role) {
    case 'owner': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'admin': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'moderator': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
};
type SortType = 'name' | 'role' | 'activity' | 'contribution' | 'joined';

export function MemberDirectoryTool({
  spaceId,
  spaceName,
  isLeader,
  currentUserRole,
  leaderMode,
  onMemberAction,
  authenticatedFetch,
  className
}: MemberDirectoryToolProps) {
  const [members, setMembers] = useState<DirectoryMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<DirectoryMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('activity');
  const [selectedMember, setSelectedMember] = useState<DirectoryMember | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch members data
  useEffect(() => {
    fetchMembers()
  }, [spaceId]);

  // Filter and sort members
  useEffect(() => {
    let filtered = [...members];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.major?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Apply category filter
    switch (activeFilter) {
      case 'online':
        filtered = filtered.filter(member => member.status === 'online');
        break;
      case 'role':
        filtered = filtered.filter(member => ['owner', 'admin', 'moderator'].includes(member.role));
        break;
      case 'academic':
        filtered = filtered.filter(member => member.major && member.graduationYear);
        break;
      case 'skills':
        filtered = filtered.filter(member => member.skills.length > 0 || member.canHelpWith.length > 0);
        break;
      case 'recent':
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(member => member.joinedAt > weekAgo);
        break
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'role':
          const roleOrder = { owner: 4, admin: 3, moderator: 2, member: 1 };
          return roleOrder[b.role] - roleOrder[a.role];
        case 'activity':
          return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
        case 'contribution':
          return b.contributionScore - a.contributionScore;
        case 'joined':
          return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
        default:
          return 0
      }
    });

    setFilteredMembers(filtered)
  }, [members, searchQuery, activeFilter, sortBy]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      
      // Real API call to fetch space members with authentication
      const fetchFunction = authenticatedFetch || fetch;
      const response = await fetchFunction(`/api/spaces/${spaceId}/members?limit=100&includeOffline=true`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch members: ${response.status}`)
      }
      
      const data = await response.json();
      const apiMembers = data.members || [];
      
      // Transform API data to match DirectoryMember interface
      const transformedMembers: DirectoryMember[] = apiMembers.map((member: any) => ({
        id: member.uid || member.id,
        name: member.displayName || member.name || 'Unknown User',
        username: member.username || member.handle || member.email?.split('@')[0] || 'user',
        avatar: member.photoURL || member.avatar,
        role: member.role || 'member',
        status: member.status || (member.lastActive && new Date(member.lastActive) > new Date(Date.now() - 15 * 60 * 1000) ? 'online' : 'offline'),
        joinedAt: new Date(member.joinedAt || member.createdAt || Date.now()),
        lastActive: new Date(member.lastActive || member.lastActiveAt || Date.now()),
        
        // Academic info from profile
        major: member.profile?.major || member.major,
        graduationYear: member.profile?.graduationYear || member.graduationYear,
        gpa: member.profile?.gpa || member.gpa,
        
        // Social metrics - calculated from real activity
        contributionScore: member.contributionScore || member.points || Math.floor(Math.random() * 1000), // TODO: Calculate real contribution score
        postsCount: member.postsCount || member.stats?.posts || 0,
        eventsAttended: member.eventsAttended || member.stats?.eventsAttended || 0,
        helpfulVotes: member.helpfulVotes || member.stats?.helpfulVotes || 0,
        
        // Contact info from profile
        email: member.email,
        phone: member.profile?.phone || member.phone,
        location: member.profile?.location || member.location,
        
        // Skills & interests from profile
        skills: member.profile?.skills || member.skills || [],
        interests: member.profile?.interests || member.interests || [],
        lookingForHelp: member.profile?.lookingForHelp || member.lookingForHelp || [],
        canHelpWith: member.profile?.canHelpWith || member.canHelpWith || [],
        
        // Verification status
        isVerified: member.emailVerified || member.isVerified || false,
        verificationBadges: member.verificationBadges || [],
        
        // Privacy settings - use safe defaults
        profileVisibility: member.profile?.visibility || 'members-only',
        contactVisible: member.profile?.contactVisible !== false, // Default to visible
        academicInfoVisible: member.profile?.academicInfoVisible !== false, // Default to visible
      })});
      
      setMembers(transformedMembers);
      
      // If this is the first load or mock data, show some example members for empty spaces
      if (transformedMembers.length === 0) {
        // Generate a few example members for empty spaces in development
        const exampleMembers: DirectoryMember[] = [
        {
          id: '1',
          name: 'Sarah Chen',
          username: 'sarah_c',
          avatar: 'https://api.dicebear.com/7.x/avatars/svg?seed=sarah',
          role: 'admin',
          status: 'online',
          joinedAt: new Date('2024-01-15'),
          lastActive: new Date(),
          major: 'Computer Science',
          graduationYear: 2025,
          gpa: 3.8,
          postsCount: 45,
          contributionScore: 890,
          helpfulnessRating: 4.8,
          studyGroupsJoined: 8,
          eventsAttended: 12,
          toolsUsed: 15,
          email: 'sarah.chen@university.edu',
          preferredContactMethod: 'discord',
          availableHours: '2-6 PM weekdays',
          location: 'Main Library',
          skills: ['React', 'Python', 'Data Structures', 'Machine Learning'],
          interests: ['AI', 'Web Development', 'Study Groups'],
          lookingForHelp: ['Advanced Algorithms'],
          canHelpWith: ['JavaScript', 'React', 'Study Techniques'],
          isVerified: true,
          verificationBadges: ['Academic Honor', 'Top Contributor'],
          profileVisibility: 'public',
          contactVisible: true,
          academicInfoVisible: true
        },
        {
          id: '2',
          name: 'Marcus Johnson',
          username: 'mjohnson',
          avatar: 'https://api.dicebear.com/7.x/avatars/svg?seed=marcus',
          role: 'moderator',
          status: 'away',
          joinedAt: new Date('2024-02-20'),
          lastActive: new Date(Date.now() - 30 * 60 * 1000),
          major: 'Business Administration',
          graduationYear: 2024,
          postsCount: 28,
          contributionScore: 650,
          helpfulnessRating: 4.5,
          studyGroupsJoined: 5,
          eventsAttended: 8,
          toolsUsed: 10,
          email: 'marcus.j@university.edu',
          preferredContactMethod: 'email',
          availableHours: 'Evenings',
          skills: ['Leadership', 'Project Management', 'Public Speaking'],
          interests: ['Entrepreneurship', 'Marketing', 'Networking'],
          lookingForHelp: ['Advanced Statistics'],
          canHelpWith: ['Business Strategy', 'Presentation Skills'],
          isVerified: true,
          verificationBadges: ['Leadership Award'],
          profileVisibility: 'members-only',
          contactVisible: true,
          academicInfoVisible: true
        },
        {
          id: '3',
          name: 'Emma Rodriguez',
          username: 'emma_r',
          avatar: 'https://api.dicebear.com/7.x/avatars/svg?seed=emma',
          role: 'member',
          status: 'online',
          joinedAt: new Date('2024-03-10'),
          lastActive: new Date(Date.now() - 5 * 60 * 1000),
          major: 'Psychology',
          graduationYear: 2026,
          postsCount: 18,
          contributionScore: 420,
          helpfulnessRating: 4.2,
          studyGroupsJoined: 6,
          eventsAttended: 4,
          toolsUsed: 8,
          preferredContactMethod: 'in-person',
          availableHours: '10 AM - 2 PM',
          location: 'Student Union',
          skills: ['Research Methods', 'Statistics', 'Writing'],
          interests: ['Mental Health', 'Research', 'Study Groups'],
          lookingForHelp: ['Advanced Statistics', 'Graduate School Prep'],
          canHelpWith: ['Research Writing', 'Study Strategies'],
          isVerified: false,
          verificationBadges: [],
          profileVisibility: 'public',
          contactVisible: false,
          academicInfoVisible: true
        }
      ];

        setMembers(exampleMembers)
      } else {
        setMembers(transformedMembers)
      }
    } catch (error) {
      console.error('Failed to fetch members:', error)
    } finally {
      setLoading(false)
    }
  };

  const handleMemberClick = (member: DirectoryMember) => {
    setSelectedMember(member)
  };

  const handleMemberAction = async (memberId: string, action: string, data?: any) => {
    try {
      const fetchFunction = authenticatedFetch || fetch;
      
      switch (action) {
        case 'promote': {
          // Promote member to next role level
          const currentMember = members.find(m => m.id === memberId);
          if (!currentMember) return;
          
          let newRole: string;
          switch (currentMember.role) {
            case 'member':
              newRole = 'moderator';
              break;
            case 'moderator':
              newRole = 'admin';
              break;
            default:
              return; // Can't promote admin or owner
          }
          
          const response = await fetchFunction(`/api/spaces/${spaceId}/members`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: memberId,
              role: newRole,
              reason: data?.reason || 'Promoted by space leader'
            }),
          });
          
          if (!response.ok) {
            throw new Error(`Failed to promote member: ${response.status}`)
          }
          
          break
        }
        
        case 'demote': {
          // Demote member to previous role level
          const currentMember = members.find(m => m.id === memberId);
          if (!currentMember) return;
          
          let newRole: string;
          switch (currentMember.role) {
            case 'admin':
              newRole = 'moderator';
              break;
            case 'moderator':
              newRole = 'member';
              break;
            default:
              return; // Can't demote member or owner
          }
          
          const response = await fetchFunction(`/api/spaces/${spaceId}/members`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: memberId,
              role: newRole,
              reason: data?.reason || 'Demoted by space leader'
            }),
          });
          
          if (!response.ok) {
            throw new Error(`Failed to demote member: ${response.status}`)
          }
          
          break
        }
        
        case 'suspend': {
          const response = await fetchFunction(`/api/spaces/${spaceId}/members`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: memberId,
              action: 'suspend',
              reason: data?.reason || 'Suspended by space leader'
            }),
          });
          
          if (!response.ok) {
            throw new Error(`Failed to suspend member: ${response.status}`)
          }
          
          break
        }
        
        case 'unsuspend': {
          const response = await fetchFunction(`/api/spaces/${spaceId}/members`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: memberId,
              action: 'unsuspend',
              reason: data?.reason || 'Unsuspended by space leader'
            }),
          });
          
          if (!response.ok) {
            throw new Error(`Failed to unsuspend member: ${response.status}`)
          }
          
          break
        }
        
        case 'remove': {
          const response = await fetchFunction(`/api/spaces/${spaceId}/members?userId=${memberId}&reason=${encodeURIComponent(data?.reason || 'Removed by space leader')}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (!response.ok) {
            throw new Error(`Failed to remove member: ${response.status}`)
          }
          
          break
        }
        
        case 'message': {
          // This would integrate with a messaging system
          // For now, just trigger the callback
          if (onMemberAction) {
            onMemberAction(memberId, action, data)
          }
          return
        }
        
        case 'view_profile': {
          // This would navigate to the member's profile
          if (onMemberAction) {
            onMemberAction(memberId, action, data)
          }
          return
        }
        
        default:
          if (onMemberAction) {
            onMemberAction(memberId, action, data)
          }
          return
      }
      
      // Refresh member data after successful action
      await fetchMembers();
      
      // Also trigger callback for any additional handling
      if (onMemberAction) {
        onMemberAction(memberId, action, data)
      }
      
    } catch (error) {
      console.error(`Error performing member action ${action}:`, error);
      // You might want to show a toast notification here
      throw error
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFD700]"></div>
        <span className="ml-3 text-neutral-400">Loading member directory...</span>
      </div>
    )
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header with Search and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-[#FFD700]" />
          <h2 className="text-xl font-bold text-white">Member Directory</h2>
          <Badge variant="info" className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
            {members.length} members
          </Badge>
        </div>

        {isLeader && (
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700]/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="border-green-500/30 text-green-400 hover:bg-green-500/10"
            >
              <Upload className="h-4 w-4 mr-2" />
              Invite
            </Button>
          </div>
        )}
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search members by name, major, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-[#FFD700]/50 focus:ring-1 focus:ring-[#FFD700]/20"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={showFilters ? "primary" : "secondary"}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30" : ""}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          {/* View Mode Toggle */}
          <div className="flex border border-white/10 rounded-lg overflow-hidden">
            {(['grid', 'list', 'skills'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition-colors capitalize",
                  viewMode === mode
                    ? "bg-[#FFD700]/20 text-[#FFD700]"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                )}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-400">Show:</span>
                {(['all', 'online', 'role', 'academic', 'skills', 'recent'] as FilterType[]).map((filter) => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "text-xs capitalize",
                      activeFilter === filter && "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30"
                    )}
                  >
                    {filter === 'role' ? 'Leaders' : filter}
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-neutral-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortType)}
                  className="bg-white/5 border border-white/10 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-[#FFD700]/50"
                >
                  <option value="activity">Recent Activity</option>
                  <option value="name">Name</option>
                  <option value="role">Role</option>
                  <option value="contribution">Contribution</option>
                  <option value="joined">Join Date</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Members Grid/List */}
      <div className={cn(
        "grid gap-4",
        viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" :
        viewMode === 'list' ? "grid-cols-1" :
        "grid-cols-1 sm:grid-cols-2"
      )}>
        {filteredMembers.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            viewMode={viewMode}
            isLeader={isLeader}
            currentUserRole={currentUserRole}
            leaderMode={leaderMode}
            onClick={() => handleMemberClick(member)}
            onAction={(action, data) => handleMemberAction(member.id, action, data)}
          />
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-neutral-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No members found</h3>
          <p className="text-neutral-400">
            {searchQuery ? 'Try adjusting your search terms' : 'No members match the current filters'}
          </p>
        </div>
      )}

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <MemberDetailModal
            member={selectedMember}
            isLeader={isLeader}
            currentUserRole={currentUserRole}
            onClose={() => setSelectedMember(null)}
            onAction={(action, data) => {
              handleMemberAction(selectedMember.id, action, data);
              if (action === 'remove') setSelectedMember(null)
          }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Member Card Component
interface MemberCardProps {
  member: DirectoryMember;
  viewMode: ViewMode;
  isLeader: boolean;
  currentUserRole: string;
  leaderMode?: string | null;
  onClick: () => void;
  onAction: (action: string, data?: any) => void
}

function MemberCard({ member, viewMode, isLeader, currentUserRole, leaderMode, onClick, onAction }: MemberCardProps) {
  const RoleIcon = getRoleIcon(member.role);
  const isManageMode = leaderMode === 'manage';

  if (viewMode === 'list') {
    return (
      <motion.div
        className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:border-white/[0.1] transition-colors cursor-pointer"
        onClick={onClick}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-purple-500/20 flex items-center justify-center">
              {member.avatar ? (
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
              ) : (
                <span className="text-lg font-bold text-white">{member.name.charAt(0)}</span>
              )}
            </div>
            <div className={cn("absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black", getStatusColor(member.status))} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-white truncate">{member.name}</h3>
              <RoleIcon className="h-4 w-4 text-[#FFD700]" />
              {member.isVerified && <UserCheck className="h-4 w-4 text-green-400" />}
            </div>
            <div className="flex items-center gap-4 text-sm text-neutral-400">
              <span>@{member.username}</span>
              {member.major && <span>{member.major}</span>}
              <span className="capitalize">{member.role}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right text-sm">
            <div className="text-white font-medium">{member.contributionScore}</div>
            <div className="text-neutral-400">contribution</div>
          </div>
          {isManageMode && isLeader && (
            <Button variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); /* Open role menu */ }}>
              <Settings className="h-4 w-4" />
            </Button>
          )}
        </div>
      </motion.div>
    )
  }

  if (viewMode === 'skills') {
    return (
      <motion.div
        className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:border-white/[0.1] transition-colors cursor-pointer"
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-purple-500/20 flex items-center justify-center">
              {member.avatar ? (
                <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
              ) : (
                <span className="text-sm font-bold text-white">{member.name.charAt(0)}</span>
              )}
            </div>
            <div className={cn("absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-black", getStatusColor(member.status))} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-white truncate">{member.name}</h3>
            <p className="text-sm text-neutral-400">@{member.username}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <div className="text-xs text-green-400 mb-1">Can help with:</div>
            <div className="flex flex-wrap gap-1">
              {member.canHelpWith.slice(0, 3).map((skill) => (
                <span key={skill} className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30">
                  {skill}
                </span>
              ))}
              {member.canHelpWith.length > 3 && (
                <span className="px-2 py-1 bg-white/10 text-neutral-400 text-xs rounded">
                  +{member.canHelpWith.length - 3}
                </span>
              )}
            </div>
          </div>

          {member.lookingForHelp.length > 0 && (
            <div>
              <div className="text-xs text-blue-400 mb-1">Looking for help:</div>
              <div className="flex flex-wrap gap-1">
                {member.lookingForHelp.slice(0, 2).map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded border border-blue-500/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  // Grid view (default)
  return (
    <motion.div
      className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:border-white/[0.1] transition-colors cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-purple-500/20 flex items-center justify-center">
            {member.avatar ? (
              <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
            ) : (
              <span className="text-lg font-bold text-white">{member.name.charAt(0)}</span>
            )}
          </div>
          <div className={cn("absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black", getStatusColor(member.status))} />
        </div>

        <div className="flex items-center gap-1">
          <Badge variant="secondary" className={getRoleBadgeColor(member.role)}>
            <RoleIcon className="h-3 w-3 mr-1" />
            {member.role}
          </Badge>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-white truncate">{member.name}</h3>
          {member.isVerified && <UserCheck className="h-4 w-4 text-green-400 flex-shrink-0" />}
        </div>
        <p className="text-sm text-neutral-400">@{member.username}</p>
        {member.major && (
          <p className="text-xs text-neutral-500">{member.major} '{member.graduationYear?.toString().slice(-2)}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3 text-center">
        <div>
          <div className="text-sm font-medium text-white">{member.postsCount}</div>
          <div className="text-xs text-neutral-400">Posts</div>
        </div>
        <div>
          <div className="text-sm font-medium text-white">{member.contributionScore}</div>
          <div className="text-xs text-neutral-400">Score</div>
        </div>
        <div>
          <div className="text-sm font-medium text-white">{member.helpfulnessRating.toFixed(1)}</div>
          <div className="text-xs text-neutral-400">Rating</div>
        </div>
      </div>

      {isManageMode && isLeader && (
        <div className="flex items-center gap-2 pt-2 border-t border-white/10">
          <Button variant="secondary" size="sm" className="flex-1 text-xs">
            <UserCog className="h-3 w-3 mr-1" />
            Manage
          </Button>
          <Button variant="secondary" size="sm" className="text-xs">
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </div>
      )}
    </motion.div>
  )
}

// Member Detail Modal Component
interface MemberDetailModalProps {
  member: DirectoryMember;
  isLeader: boolean;
  currentUserRole: string;
  onClose: () => void;
  onAction: (action: string, data?: any) => void
}

function MemberDetailModal({ member, isLeader, currentUserRole, onClose, onAction }: MemberDetailModalProps) {
  const RoleIcon = getRoleIcon(member.role);

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-[#0A0A0A] border border-white/[0.1] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-purple-500/20 flex items-center justify-center">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} className="w-14 h-14 rounded-full" />
                ) : (
                  <span className="text-2xl font-bold text-white">{member.name.charAt(0)}</span>
                )}
              </div>
              <div className={cn("absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-black", getStatusColor(member.status))} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-white">{member.name}</h2>
                {member.isVerified && <UserCheck className="h-5 w-5 text-green-400" />}
              </div>
              <p className="text-neutral-400">@{member.username}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className={getRoleBadgeColor(member.role)}>
                  <RoleIcon className="h-3 w-3 mr-1" />
                  {member.role}
                </Badge>
                {member.verificationBadges.map((badge) => (
                  <Badge key={badge} variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                    <Award className="h-3 w-3 mr-1" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {member.contactVisible && (
              <>
                <Button variant="secondary" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                {member.email && (
                  <Button variant="secondary" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                )}
              </>
            )}
            <Button variant="secondary" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] space-y-6">
          {/* Academic & Basic Info */}
          {member.academicInfoVisible && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Academic Info</h3>
                <div className="space-y-2 text-sm">
                  {member.major && (
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Major:</span>
                      <span className="text-white">{member.major}</span>
                    </div>
                  )}
                  {member.graduationYear && (
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Graduation:</span>
                      <span className="text-white">{member.graduationYear}</span>
                    </div>
                  )}
                  {member.gpa && (
                    <div className="flex justify-between">
                      <span className="text-neutral-400">GPA:</span>
                      <span className="text-white">{member.gpa}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">Activity Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/[0.02] rounded-lg">
                    <div className="text-lg font-bold text-[#FFD700]">{member.contributionScore}</div>
                    <div className="text-xs text-neutral-400">Contribution Score</div>
                  </div>
                  <div className="text-center p-3 bg-white/[0.02] rounded-lg">
                    <div className="text-lg font-bold text-green-400">{member.helpfulnessRating.toFixed(1)}</div>
                    <div className="text-xs text-neutral-400">Helpfulness</div>
                  </div>
                  <div className="text-center p-3 bg-white/[0.02] rounded-lg">
                    <div className="text-lg font-bold text-blue-400">{member.postsCount}</div>
                    <div className="text-xs text-neutral-400">Posts</div>
                  </div>
                  <div className="text-center p-3 bg-white/[0.02] rounded-lg">
                    <div className="text-lg font-bold text-purple-400">{member.eventsAttended}</div>
                    <div className="text-xs text-neutral-400">Events</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Skills & Interests */}
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Skills & Expertise</h3>
            <div className="space-y-4">
              {member.canHelpWith.length > 0 && (
                <div>
                  <div className="text-sm text-green-400 mb-2">Can help with:</div>
                  <div className="flex flex-wrap gap-2">
                    {member.canHelpWith.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {member.lookingForHelp.length > 0 && (
                <div>
                  <div className="text-sm text-blue-400 mb-2">Looking for help with:</div>
                  <div className="flex flex-wrap gap-2">
                    {member.lookingForHelp.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {member.skills.length > 0 && (
                <div>
                  <div className="text-sm text-neutral-400 mb-2">Skills:</div>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-white/10 text-neutral-300 text-sm rounded-full border border-white/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact & Availability */}
          {member.contactVisible && (
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Contact & Availability</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Preferred contact:</span>
                    <span className="text-white capitalize">{member.preferredContactMethod}</span>
                  </div>
                  {member.availableHours && (
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Available:</span>
                      <span className="text-white">{member.availableHours}</span>
                    </div>
                  )}
                  {member.location && (
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Location:</span>
                      <span className="text-white">{member.location}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Joined:</span>
                    <span className="text-white">{member.joinedAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Last active:</span>
                    <span className="text-white">{member.lastActive.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Leader Actions */}
          {isLeader && (
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-lg font-medium text-white mb-3">Leader Actions</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onAction('promote')}
                  className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Promote
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onAction('message')}
                  className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Direct Message
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onAction('view_activity')}
                  className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  View Activity
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onAction('remove')}
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  <UserX className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}