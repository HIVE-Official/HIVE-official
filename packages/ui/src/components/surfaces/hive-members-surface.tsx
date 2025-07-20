"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { liquidMetal, motionDurations } from '../../motion/hive-motion-system';
import { type Space } from '@hive/core';
import { 
  Users,
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  UserMinus,
  Crown,
  Shield,
  Star,
  MessageCircle,
  Settings,
  Copy,
  Share2,
  Eye,
  EyeOff,
  Clock,
  Calendar,
  MapPin,
  GraduationCap,
  Building,
  Home,
  Gamepad2,
  Coffee,
  Music,
  Code,
  Palette,
  Camera,
  Mic,
  Video,
  Book,
  Heart,
  Zap,
  Sparkles,
  TrendingUp,
  Grid,
  List,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Globe,
  Github,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

// HIVE Members Surface - Community Member Management
// Member directory with profiles, roles, and social features

const hiveMembersSurfaceVariants = cva(
  "relative w-full",
  {
    variants: {
      mode: {
        view: "",
        edit: "ring-2 ring-gray-500/30 ring-offset-2 ring-offset-black/20",
        builder: "ring-2 ring-gray-500/30 ring-offset-2 ring-offset-black/20",
      }
    },
    defaultVariants: {
      mode: "view",
    },
  }
);

// Member roles with HIVE design patterns
const memberRoles = {
  builder: {
    icon: Crown,
    label: 'Builder',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    description: 'Space creator and admin'
  },
  moderator: {
    icon: Shield,
    label: 'Moderator',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    description: 'Community moderator'
  },
  member: {
    icon: Users,
    label: 'Member',
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    description: 'Active community member'
  },
  guest: {
    icon: Eye,
    label: 'Guest',
    color: 'text-gray-400',
    bg: 'bg-gray-500/20',
    description: 'Limited access member'
  },
} as const;

// Member status indicators
const memberStatuses = {
  online: {
    label: 'Online',
    color: 'bg-green-500',
    description: 'Currently active'
  },
  away: {
    label: 'Away',
    color: 'bg-yellow-500',
    description: 'Temporarily away'
  },
  busy: {
    label: 'Busy',
    color: 'bg-red-500',
    description: 'Do not disturb'
  },
  offline: {
    label: 'Offline',
    color: 'bg-gray-500',
    description: 'Not currently active'
  },
} as const;

export interface Member {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  role: keyof typeof memberRoles;
  status: keyof typeof memberStatuses;
  joinedAt: Date;
  lastActive: Date;
  isVerified: boolean;
  badges: string[];
  stats: {
    postsCount: number;
    likesReceived: number;
    eventsAttended: number;
    contributionScore: number;
  };
  interests: string[];
  major?: string;
  graduationYear?: number;
  location?: string;
  socialLinks?: {
    github?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
  permissions: {
    canMessage: boolean;
    canViewProfile: boolean;
    canInviteOthers: boolean;
  };
}

export interface HiveMembersSurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hiveMembersSurfaceVariants> {
  space: Space;
  members?: Member[];
  currentUserId?: string;
  isBuilder?: boolean;
  canModerate?: boolean;
  onViewProfile?: (memberId: string) => void;
  onMessageMember?: (memberId: string) => void;
  onInviteMember?: () => void;
  onRemoveMember?: (memberId: string) => void;
  onChangeRole?: (memberId: string, role: keyof typeof memberRoles) => void;
  onBlockMember?: (memberId: string) => void;
  viewMode?: 'grid' | 'list';
  showOfflineMembers?: boolean;
  showMemberStats?: boolean;
  maxMembers?: number;
}

export const HiveMembersSurface = React.forwardRef<HTMLDivElement, HiveMembersSurfaceProps>(
  ({ 
    className,
    mode,
    space,
    members = [],
    currentUserId,
    isBuilder = false,
    canModerate = false,
    onViewProfile,
    onMessageMember,
    onInviteMember,
    onRemoveMember,
    onChangeRole,
    onBlockMember,
    viewMode = 'grid',
    showOfflineMembers = true,
    showMemberStats = true,
    maxMembers = 20,
    ...props 
  }, ref) => {
    
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState<keyof typeof memberRoles | 'all'>('all');
    const [currentViewMode, setCurrentViewMode] = useState(viewMode);
    const [hoveredMember, setHoveredMember] = useState<string | null>(null);
    const [showMemberMenu, setShowMemberMenu] = useState<string | null>(null);
    
    // Filter and sort members
    const filteredMembers = members
      .filter(member => {
        // Role filter
        const roleMatch = selectedRole === 'all' || member.role === selectedRole;
        
        // Search filter
        const searchMatch = searchQuery === '' || 
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.interests.some(interest => 
            interest.toLowerCase().includes(searchQuery.toLowerCase())
          );
        
        // Offline filter
        const statusMatch = showOfflineMembers || member.status !== 'offline';
        
        return roleMatch && searchMatch && statusMatch;
      })
      .sort((a, b) => {
        // Builders first
        if (a.role === 'builder' && b.role !== 'builder') return -1;
        if (a.role !== 'builder' && b.role === 'builder') return 1;
        
        // Then by role hierarchy
        const roleOrder = { builder: 4, moderator: 3, member: 2, guest: 1 };
        if (roleOrder[a.role] !== roleOrder[b.role]) {
          return roleOrder[b.role] - roleOrder[a.role];
        }
        
        // Online members first
        if (a.status !== 'offline' && b.status === 'offline') return -1;
        if (a.status === 'offline' && b.status !== 'offline') return 1;
        
        // Finally by join date
        return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
      })
      .slice(0, maxMembers);
    
    // Member counts by role
    const roleCounts = members.reduce((acc, member) => {
      acc[member.role] = (acc[member.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Online member count
    const onlineCount = members.filter(m => m.status !== 'offline').length;
    
    // Get social icon
    const getSocialIcon = (platform: string) => {
      const iconMap: Record<string, any> = {
        github: Github,
        twitter: Twitter,
        instagram: Instagram,
        linkedin: Linkedin,
        website: Globe
      };
      return iconMap[platform] || Globe;
    };
    
    // Empty state
    if (members.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(hiveMembersSurfaceVariants({ mode, className }))}
          {...props}
        >
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDurations.smooth }}
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-6 bg-gray-500/20 rounded-2xl flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: motionDurations.quick }}
            >
              <Users className="w-8 h-8 text-gray-400" />
            </motion.div>
            
            <h3 className="text-xl font-semibold text-white mb-3">No Members Yet</h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Invite people to join your Space and build a thriving community together.
            </p>
            
            {canModerate && (
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-500/20 text-gray-400 border border-gray-500/30 rounded-xl hover:bg-gray-500/30 transition-all duration-200 font-medium"
                onClick={onInviteMember}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <UserPlus className="w-4 h-4" />
                Invite Members
              </motion.button>
            )}
          </motion.div>
        </div>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn(hiveMembersSurfaceVariants({ mode, className }))}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-white">Members</h3>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>{members.length} total</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>{onlineCount} online</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex bg-black/20 rounded-xl border border-white/10 p-1">
              {[
                { key: 'grid', icon: Grid },
                { key: 'list', icon: List }
              ].map(({ key, icon: Icon }) => (
                <motion.button
                  key={key}
                  className={cn(
                    "p-2 rounded-lg transition-all duration-200",
                    currentViewMode === key
                      ? "bg-gray-500/20 text-gray-400"
                      : "text-gray-400 hover:text-white"
                  )}
                  onClick={() => setCurrentViewMode(key as any)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.button>
              ))}
            </div>
            
            {/* Invite Button */}
            {canModerate && (
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-gray-500/20 text-gray-400 border border-gray-500/30 rounded-xl hover:bg-gray-500/30 transition-all duration-200 font-medium"
                onClick={onInviteMember}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Invite</span>
              </motion.button>
            )}
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/30 transition-all duration-200"
            />
          </div>
          
          {/* Role Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {[
              { key: 'all', label: 'All Members', icon: Users, color: 'text-white', count: members.length },
              ...Object.entries(memberRoles).map(([key, config]) => ({
                key,
                label: config.label,
                icon: config.icon,
                color: config.color,
                count: roleCounts[key] || 0
              }))
            ].map((filter) => {
              const Icon = filter.icon;
              const isActive = selectedRole === filter.key;
              
              return (
                <motion.button
                  key={filter.key}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-medium transition-all duration-200 whitespace-nowrap",
                    isActive
                      ? "bg-gray-500/20 text-gray-400 border-gray-500/30"
                      : "bg-black/20 text-gray-400 border-white/10 hover:border-white/20 hover:text-white"
                  )}
                  onClick={() => setSelectedRole(filter.key as any)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-gray-400" : filter.color)} />
                  <span>{filter.label}</span>
                  <span className={cn(
                    "px-1.5 py-0.5 rounded-full text-xs",
                    isActive 
                      ? "bg-gray-500/30 text-gray-300"
                      : "bg-white/10 text-gray-500"
                  )}>
                    {filter.count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
        
        {/* Members Grid/List */}
        <div className={cn(
          currentViewMode === 'grid'
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            : "space-y-3"
        )}>
          {filteredMembers.map((member, index) => {
            const roleConfig = memberRoles[member.role];
            const statusConfig = memberStatuses[member.status];
            const RoleIcon = roleConfig.icon;
            const isHovered = hoveredMember === member.id;
            const isCurrentUser = member.id === currentUserId;
            
            return (
              <motion.article
                key={member.id}
                className={cn(
                  "relative group bg-black/10 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden transition-all duration-200 cursor-pointer",
                  isHovered && "border-white/10",
                  isCurrentUser && "ring-1 ring-blue-500/30 bg-blue-500/5",
                  mode === 'edit' && "hover:ring-2 hover:ring-gray-500/30"
                )}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
                onClick={() => onViewProfile?.(member.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                layout
              >
                <div className={cn("p-4", currentViewMode === 'list' && "flex items-center gap-4")}>
                  {/* Avatar with Status */}
                  <div className="relative flex-shrink-0">
                    <div className={cn(
                      "rounded-full overflow-hidden bg-gray-600",
                      currentViewMode === 'grid' ? "w-16 h-16 mx-auto mb-3" : "w-12 h-12"
                    )}>
                      {member.avatar ? (
                        <img src={member.avatar} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-500/20 to-gray-700/20 flex items-center justify-center">
                          <span className={cn(
                            "font-medium text-white",
                            currentViewMode === 'grid' ? "text-lg" : "text-sm"
                          )}>
                            {member.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Status Indicator */}
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black/20",
                      statusConfig.color
                    )} />
                    
                    {/* Role Badge */}
                    {member.role !== 'member' && (
                      <motion.div
                        className={cn(
                          "absolute -top-1 -left-1 p-1 rounded-full",
                          roleConfig.bg
                        )}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.02 + 0.2 }}
                      >
                        <RoleIcon className={cn("w-3 h-3", roleConfig.color)} />
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Member Info */}
                  <div className={cn(
                    "flex-1 min-w-0",
                    currentViewMode === 'grid' && "text-center"
                  )}>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={cn(
                        "font-medium text-white truncate",
                        currentViewMode === 'grid' && "text-center w-full"
                      )}>
                        {member.name}
                      </h4>
                      {member.isVerified && (
                        <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      )}
                    </div>
                    
                    <div className={cn(
                      "text-xs text-gray-400 mb-2",
                      currentViewMode === 'grid' && "text-center"
                    )}>
                      <span>@{member.username}</span>
                      <span className="mx-2">•</span>
                      <span className={roleConfig.color}>{roleConfig.label}</span>
                    </div>
                    
                    {/* Bio (Grid View) */}
                    {currentViewMode === 'grid' && member.bio && (
                      <p className="text-sm text-gray-300 line-clamp-2 mb-3 leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                    
                    {/* Stats */}
                    {showMemberStats && (
                      <div className={cn(
                        "flex gap-4 text-xs text-gray-500",
                        currentViewMode === 'grid' ? "justify-center" : "justify-start"
                      )}>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{member.stats.postsCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          <span>{member.stats.likesReceived}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{member.stats.eventsAttended}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Interests (List View) */}
                    {currentViewMode === 'list' && member.interests.length > 0 && (
                      <div className="flex items-center gap-1 mt-2 flex-wrap">
                        {member.interests.slice(0, 3).map((interest, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-300"
                          >
                            {interest}
                          </span>
                        ))}
                        {member.interests.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{member.interests.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className={cn(
                    "flex items-center gap-2",
                    currentViewMode === 'grid' ? "justify-center mt-3" : "ml-3"
                  )}>
                    {!isCurrentUser && member.permissions.canMessage && (
                      <motion.button
                        className="p-2 text-gray-400 hover:text-blue-400 rounded-lg hover:bg-blue-500/10 transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMessageMember?.(member.id);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </motion.button>
                    )}
                    
                    {canModerate && !isCurrentUser && (
                      <div className="relative">
                        <motion.button
                          className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowMemberMenu(showMemberMenu === member.id ? null : member.id);
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </motion.button>
                        
                        {/* Member Actions Menu */}
                        <AnimatePresence>
                          {showMemberMenu === member.id && (
                            <motion.div
                              className="absolute top-full right-0 mt-2 w-48 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-20"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: motionDurations.quick }}
                            >
                              <div className="p-2">
                                <motion.button
                                  className="w-full flex items-center gap-3 p-2 text-left rounded-lg hover:bg-white/5 transition-all duration-200 text-sm text-white"
                                  onClick={() => onChangeRole?.(member.id, 'moderator')}
                                  whileHover={{ x: 4 }}
                                >
                                  <Shield className="w-4 h-4 text-blue-400" />
                                  Make Moderator
                                </motion.button>
                                
                                <motion.button
                                  className="w-full flex items-center gap-3 p-2 text-left rounded-lg hover:bg-red-500/10 transition-all duration-200 text-sm text-red-400"
                                  onClick={() => onRemoveMember?.(member.id)}
                                  whileHover={{ x: 4 }}
                                >
                                  <UserMinus className="w-4 h-4" />
                                  Remove Member
                                </motion.button>
                                
                                <motion.button
                                  className="w-full flex items-center gap-3 p-2 text-left rounded-lg hover:bg-red-500/10 transition-all duration-200 text-sm text-red-400"
                                  onClick={() => onBlockMember?.(member.id)}
                                  whileHover={{ x: 4 }}
                                >
                                  <UserX className="w-4 h-4" />
                                  Block Member
                                </motion.button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
        
        {/* Builder Hint */}
        {isBuilder && mode === 'edit' && (
          <motion.div
            className="mt-6 p-4 bg-gray-500/10 border border-gray-500/30 rounded-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Builder Mode Active</h4>
                <p className="text-xs text-gray-300/80">
                  Members are the heart of your community. Foster connections and manage roles to create an inclusive environment.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    );
  }
);

HiveMembersSurface.displayName = "HiveMembersSurface";

export { hiveMembersSurfaceVariants, memberRoles, memberStatuses };