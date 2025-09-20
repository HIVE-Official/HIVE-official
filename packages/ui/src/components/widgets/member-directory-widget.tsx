"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Settings,
  Crown,
  Shield,
  Star,
  Plus,
  Filter,
  Grid,
  List,
  Activity,
  TrendingUp,
  MessageSquare,
  Mail,
  UserCog,
  Download,
  Upload,
  Eye
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../atomic/atoms/button';
import { Badge } from '../../atomic/atoms/badge';
import { MemberDirectoryTool } from '../tools/member-directory-tool';
import { type Space } from '@hive/core';

export interface MemberDirectoryWidgetProps {
  space: Space;
  isLeader?: boolean;
  currentUserRole?: 'owner' | 'admin' | 'moderator' | 'member';
  leaderMode?: 'moderate' | 'manage' | 'configure' | 'insights' | null;
  showCompact?: boolean;
  maxMembers?: number;
  onMemberAction?: (memberId: string, action: string, data?: any) => void;
  authenticatedFetch?: (url: string, options?: RequestInit) => Promise<Response>;
  className?: string;
}

export function MemberDirectoryWidget({
  space,
  isLeader = false,
  currentUserRole = 'member',
  leaderMode,
  showCompact = false,
  maxMembers = 8,
  onMemberAction,
  authenticatedFetch,
  className
}: MemberDirectoryWidgetProps) {
  const [showFullDirectory, setShowFullDirectory] = useState(false);
  const [quickViewMode, setQuickViewMode] = useState<'recent' | 'active' | 'leaders'>('active');
  const [previewMembers, setPreviewMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch preview members data
  useEffect(() => {
    async function fetchPreviewMembers() {
      try {
        const fetchFunction = authenticatedFetch || fetch;
        const response = await fetchFunction(`/api/spaces/${space.id}/members?limit=8&includeOffline=true`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch members: ${response.status}`);
        }

        const data = await response.json();
        const apiMembers = data.members || [];

        // Transform API data to match widget format
        const transformedMembers = apiMembers.map((member: any) => ({
          id: member.id,
          name: member.name || 'Unknown User',
          username: member.username || 'user',
          avatar: member.avatar,
          role: member.role || 'member',
          status: member.status || 'offline',
          contributionScore: member.stats?.contributionScore || 0,
          lastActive: new Date(member.lastActive || Date.now()),
          isVerified: member.isVerified || false
        }));

        setPreviewMembers(transformedMembers);
      } catch (error) {
        console.error('Error fetching preview members:', error);
        // Fallback to empty array on error
        setPreviewMembers([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPreviewMembers();
  }, [space.id, authenticatedFetch]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      case 'busy': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return Crown;
      case 'admin': return Shield;
      case 'moderator': return Star;
      default: return Users;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'text-yellow-400';
      case 'admin': return 'text-purple-400';
      case 'moderator': return 'text-blue-400';
      default: return 'text-neutral-400';
    }
  };

  const filteredMembers = previewMembers
    .filter(member => {
      switch (quickViewMode) {
        case 'leaders':
          return ['owner', 'admin', 'moderator'].includes(member.role);
        case 'active':
          return member.status === 'online';
        case 'recent':
          return member.lastActive > new Date(Date.now() - 24 * 60 * 60 * 1000);
        default:
          return true;
      }
    })
    .slice(0, maxMembers);

  if (showCompact) {
    return (
      <div className={cn("space-y-3", className)}>
        {/* Compact Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#FFD700]" />
            <span className="text-sm font-medium text-white">Members</span>
            <Badge variant="secondary" className="text-xs">
              {space.memberCount || 0}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFullDirectory(true)}
            className="text-xs text-neutral-400 hover:text-white"
          >
            View All
          </Button>
        </div>

        {/* Quick View Mode Selector */}
        <div className="flex gap-1">
          {(['active', 'leaders', 'recent'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setQuickViewMode(mode)}
              className={cn(
                "px-2 py-1 text-xs rounded transition-colors capitalize",
                quickViewMode === mode
                  ? "bg-[#FFD700]/20 text-[#FFD700]"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              )}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Compact Member List */}
        <div className="space-y-2">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-2 bg-white/[0.02] rounded-lg animate-pulse">
                <div className="w-8 h-8 bg-white/10 rounded-full" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 bg-white/10 rounded w-24" />
                  <div className="h-2 bg-white/10 rounded w-16" />
                </div>
              </div>
            ))
          ) : filteredMembers.map((member) => {
            const RoleIcon = getRoleIcon(member.role);
            return (
              <div
                key={member.id}
                className="flex items-center gap-3 p-2 bg-white/[0.02] rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer"
                onClick={() => setShowFullDirectory(true)}
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-purple-500/20 flex items-center justify-center">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-7 h-7 rounded-full" />
                    ) : (
                      <span className="text-sm font-bold text-white">{member.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className={cn("absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-black", getStatusColor(member.status))} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-white truncate">{member.name}</span>
                    <RoleIcon className={cn("h-3 w-3", getRoleColor(member.role))} />
                  </div>
                  <div className="text-xs text-neutral-400">
                    {member.contributionScore} points
                  </div>
                </div>

                {leaderMode === 'manage' && isLeader && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMemberAction?.(member.id, 'manage');
                    }}
                  >
                    <UserCog className="h-3 w-3" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-4 text-neutral-400 text-sm">
            No {quickViewMode} members
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Full Widget Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-[#FFD700]" />
          <h3 className="text-lg font-semibold text-white">Member Directory</h3>
          <Badge variant="info" className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
            {space.memberCount || 0} members
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          {isLeader && (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="border-green-500/30 text-green-400 hover:bg-green-500/10"
              >
                <Plus className="h-4 w-4 mr-1" />
                Invite
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700]/10"
              >
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowFullDirectory(true)}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Eye className="h-4 w-4 mr-1" />
            View All
          </Button>
        </div>
      </div>

      {/* Member Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center p-3 bg-white/[0.02] rounded-lg">
          <div className="text-lg font-bold text-green-400">
            {isLoading ? (
              <div className="h-6 bg-white/10 rounded animate-pulse" />
            ) : (
              previewMembers.filter(m => m.status === 'online').length
            )}
          </div>
          <div className="text-xs text-neutral-400">Online</div>
        </div>
        <div className="text-center p-3 bg-white/[0.02] rounded-lg">
          <div className="text-lg font-bold text-blue-400">
            {isLoading ? (
              <div className="h-6 bg-white/10 rounded animate-pulse" />
            ) : (
              previewMembers.filter(m => ['owner', 'admin', 'moderator'].includes(m.role)).length
            )}
          </div>
          <div className="text-xs text-neutral-400">Leaders</div>
        </div>
        <div className="text-center p-3 bg-white/[0.02] rounded-lg">
          <div className="text-lg font-bold text-purple-400">
            {isLoading ? (
              <div className="h-6 bg-white/10 rounded animate-pulse" />
            ) : (
              previewMembers.filter(m => m.isVerified).length
            )}
          </div>
          <div className="text-xs text-neutral-400">Verified</div>
        </div>
        <div className="text-center p-3 bg-white/[0.02] rounded-lg">
          <div className="text-lg font-bold text-yellow-400">
            {isLoading ? (
              <div className="h-6 bg-white/10 rounded animate-pulse" />
            ) : previewMembers.length > 0 ? (
              Math.round(previewMembers.reduce((sum, m) => sum + m.contributionScore, 0) / previewMembers.length)
            ) : (
              0
            )}
          </div>
          <div className="text-xs text-neutral-400">Avg Score</div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-400">Quick view:</span>
        {(['active', 'leaders', 'recent'] as const).map((mode) => (
          <Button
            key={mode}
            variant={quickViewMode === mode ? "primary" : "secondary"}
            size="sm"
            onClick={() => setQuickViewMode(mode)}
            className={cn(
              "text-xs capitalize",
              quickViewMode === mode && "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30"
            )}
          >
            {mode === 'leaders' && <Crown className="h-3 w-3 mr-1" />}
            {mode === 'active' && <Activity className="h-3 w-3 mr-1" />}
            {mode === 'recent' && <TrendingUp className="h-3 w-3 mr-1" />}
            {mode}
          </Button>
        ))}
      </div>

      {/* Member Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-lg animate-pulse">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 bg-white/10 rounded-full" />
                <div className="w-4 h-4 bg-white/10 rounded" />
              </div>
              <div className="text-center space-y-1">
                <div className="h-4 bg-white/10 rounded" />
                <div className="h-3 bg-white/10 rounded w-16 mx-auto" />
                <div className="h-3 bg-white/10 rounded w-12 mx-auto" />
              </div>
            </div>
          ))
        ) : filteredMembers.map((member) => {
          const RoleIcon = getRoleIcon(member.role);
          return (
            <motion.div
              key={member.id}
              className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:border-white/[0.1] transition-colors cursor-pointer"
              onClick={() => setShowFullDirectory(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between mb-2">
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
                <RoleIcon className={cn("h-4 w-4", getRoleColor(member.role))} />
              </div>

              <div className="text-center">
                <h4 className="text-sm font-medium text-white truncate">{member.name.split(' ')[0]}</h4>
                <p className="text-xs text-neutral-400 mb-1">@{member.username}</p>
                <div className="text-xs">
                  <span className="text-[#FFD700] font-medium">{member.contributionScore}</span>
                  <span className="text-neutral-400"> pts</span>
                </div>
              </div>

              {leaderMode === 'manage' && isLeader && (
                <div className="mt-2 pt-2 border-t border-white/10">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMemberAction?.(member.id, 'manage');
                    }}
                  >
                    <UserCog className="h-3 w-3 mr-1" />
                    Manage
                  </Button>
                </div>
              )}
            </motion.div>
          );
        })
      </div>

      {/* Full Directory Modal */}
      <AnimatePresence>
        {showFullDirectory && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFullDirectory(false)}
          >
            <motion.div
              className="bg-[#0A0A0A] border border-white/[0.1] rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-[#FFD700]" />
                  <h2 className="text-xl font-semibold text-white">Member Directory</h2>
                  <Badge variant="info" className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
                    {space.name}
                  </Badge>
                </div>
                
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowFullDirectory(false)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  ✕
                </Button>
              </div>

              {/* Full Directory Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <MemberDirectoryTool
                  spaceId={space.id}
                  spaceName={space.name}
                  isLeader={isLeader}
                  currentUserRole={currentUserRole}
                  leaderMode={leaderMode}
                  onMemberAction={onMemberAction}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}