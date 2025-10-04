"use client";

import { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Crown,
  Shield,
  UserCheck,
  MoreVertical,
  Download,
  UserMinus,
  UserPlus,
  Settings,
  Activity,
  Calendar,
  MessageSquare,
  Filter
} from 'lucide-react';
import {
  Button,
  Card,
  Input,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@hive/ui';
import { api } from '@/lib/api-client';

interface Member {
  id: string;
  userId: string;
  name: string;
  handle: string;
  avatar?: string;
  role: 'owner' | 'leader' | 'moderator' | 'member';
  joinedAt: Date;
  lastActive: Date;
  isOnline: boolean;
  stats: {
    posts: number;
    comments: number;
    events: number;
    activeDays: number;
  };
  email?: string; // Only visible to leaders
  major?: string;
  year?: string;
}

interface MembersPanelProps {
  spaceId: string;
  userRole: 'owner' | 'leader' | 'moderator' | 'member' | 'guest';
  isLeader: boolean;
}

export function MembersPanel({ spaceId, userRole, isLeader }: MembersPanelProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'online' | 'all' | 'leaders'>('online');
  const [sortBy, setSortBy] = useState<'recent' | 'active' | 'name' | 'role'>('recent');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  useEffect(() => {
    loadMembers();
  }, [spaceId, activeTab, sortBy]);

  const loadMembers = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/spaces/${spaceId}/members`, {
        params: {
          tab: activeTab,
          sort: sortBy,
          includeStats: true,
          includePrivate: isLeader
        }
      });
      setMembers(response.members || []);
    } catch (error) {
      console.error('Failed to load members:', error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm('Remove this member from the space?')) return;

    try {
      await api.delete(`/api/spaces/${spaceId}/members/${memberId}`);
      setMembers(members.filter(m => m.id !== memberId));
    } catch (error) {
      console.error('Failed to remove member:', error);
    }
  };

  const handlePromoteMember = async (memberId: string, newRole: string) => {
    try {
      await api.patch(`/api/spaces/${spaceId}/members/${memberId}`, { role: newRole });
      setMembers(members.map(m =>
        m.id === memberId ? { ...m, role: newRole as any } : m
      ));
    } catch (error) {
      console.error('Failed to promote member:', error);
    }
  };

  const exportMembers = async () => {
    try {
      const response = await api.get(`/api/spaces/${spaceId}/members/export`, {
        responseType: 'blob'
      });

      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `space-members-${spaceId}.csv`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export members:', error);
    }
  };

  const filteredMembers = members.filter(member => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        member.name.toLowerCase().includes(query) ||
        member.handle.toLowerCase().includes(query) ||
        (member.major?.toLowerCase().includes(query))
      );
    }
    return true;
  });

  const getMembersByTab = () => {
    switch (activeTab) {
      case 'online':
        return filteredMembers.filter(m => m.isOnline);
      case 'leaders':
        return filteredMembers.filter(m => ['owner', 'leader', 'moderator'].includes(m.role));
      default:
        return filteredMembers;
    }
  };

  const membersToShow = getMembersByTab();
  const onlineCount = members.filter(m => m.isOnline).length;
  const totalCount = members.length;

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-800 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-gray-800 rounded w-24 mb-1" />
                <div className="h-3 bg-gray-800 rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Members</h3>
            <p className="text-sm text-gray-400">
              {totalCount} total • {onlineCount} online
            </p>
          </div>
          {isLeader && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="border-gray-700">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
                <DropdownMenuItem onClick={exportMembers}>
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite Members
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Member Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="bg-gray-800 border-gray-700 w-full">
            <TabsTrigger value="online" className="text-xs flex-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
              Online ({onlineCount})
            </TabsTrigger>
            <TabsTrigger value="all" className="text-xs flex-1">
              All ({totalCount})
            </TabsTrigger>
            <TabsTrigger value="leaders" className="text-xs flex-1">
              <Crown className="w-3 h-3 mr-1" />
              Leaders
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Sort */}
        <div className="flex items-center gap-2 mt-3">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e: React.ChangeEvent) => setSortBy(e.target.value as any)}
            className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-white"
          >
            <option value="recent">Recently Joined</option>
            <option value="active">Most Active</option>
            <option value="name">Name A-Z</option>
            <option value="role">By Role</option>
          </select>
        </div>
      </div>

      {/* Members List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {membersToShow.length > 0 ? (
          membersToShow.map(member => (
            <MemberCard
              key={member.id}
              member={member}
              isLeader={isLeader}
              userRole={userRole}
              onRemove={() => handleRemoveMember(member.id)}
              onPromote={(role) => handlePromoteMember(member.id, role)}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">
              {searchQuery ? `No members found for "${searchQuery}"` : 'No members found'}
            </p>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {isLeader && selectedMembers.length > 0 && (
        <div className="p-4 border-t border-gray-800 bg-gray-900/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              {selectedMembers.length} selected
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-red-600 text-red-400">
                <UserMinus className="w-4 h-4 mr-1" />
                Remove
              </Button>
              <Button size="sm" variant="outline" className="border-blue-600 text-blue-400">
                <MessageSquare className="w-4 h-4 mr-1" />
                Message
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MemberCard({
  member,
  isLeader,
  userRole,
  onRemove,
  onPromote
}: {
  member: Member;
  isLeader: boolean;
  userRole: string;
  onRemove: () => void;
  onPromote: (role: string) => void;
}) {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="w-3 h-3 text-yellow-400" />;
      case 'leader': return <Shield className="w-3 h-3 text-blue-400" />;
      case 'moderator': return <UserCheck className="w-3 h-3 text-green-400" />;
      default: return null;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'leader': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'moderator': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 5) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <Card className="p-3 bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="w-10 h-10">
            <AvatarImage src={member.avatar} />
            <AvatarFallback className="bg-[var(--hive-brand-primary)] text-black text-sm">
              {member.name[0]}
            </AvatarFallback>
          </Avatar>
          {member.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-white text-sm truncate">
              {member.name}
            </span>
            {getRoleIcon(member.role)}
            <Badge className={`text-xs px-1.5 py-0.5 ${getRoleBadgeColor(member.role)}`}>
              {member.role}
            </Badge>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>@{member.handle}</span>
            {member.major && <span>{member.major}</span>}
            {!member.isOnline && (
              <span>Active {formatLastActive(member.lastActive)}</span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="hidden md:flex items-center gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            {member.stats.posts}
          </div>
          <div className="flex items-center gap-1">
            <Activity className="w-3 h-3" />
            {member.stats.activeDays}d
          </div>
        </div>

        {/* Actions */}
        {isLeader && member.role !== 'owner' && userRole !== member.role && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
              <DropdownMenuItem>
                <MessageSquare className="w-4 h-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              {member.role === 'member' && (
                <DropdownMenuItem onClick={() => onPromote('moderator')}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Make Moderator
                </DropdownMenuItem>
              )}
              {(member.role === 'member' || member.role === 'moderator') && userRole === 'owner' && (
                <DropdownMenuItem onClick={() => onPromote('leader')}>
                  <Crown className="w-4 h-4 mr-2" />
                  Make Leader
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={onRemove}
                className="text-red-400 focus:text-red-400"
              >
                <UserMinus className="w-4 h-4 mr-2" />
                Remove Member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Expanded stats for leaders */}
      {isLeader && (
        <div className="mt-3 pt-3 border-t border-gray-800 grid grid-cols-4 gap-2 text-xs">
          <div className="text-center">
            <div className="text-white font-medium">{member.stats.posts}</div>
            <div className="text-gray-400">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-white font-medium">{member.stats.comments}</div>
            <div className="text-gray-400">Comments</div>
          </div>
          <div className="text-center">
            <div className="text-white font-medium">{member.stats.events}</div>
            <div className="text-gray-400">Events</div>
          </div>
          <div className="text-center">
            <div className="text-white font-medium">{member.stats.activeDays}</div>
            <div className="text-gray-400">Active Days</div>
          </div>
        </div>
      )}
    </Card>
  );
}