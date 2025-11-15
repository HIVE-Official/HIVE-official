/**
 * HIVE Admin User Management - COMPREHENSIVE SOCIAL PLATFORM OVERSIGHT
 * Ruthless enforcement of HIVE's space system + full social features control
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button as Button, HiveCard as Card, CardContent, CardHeader, CardTitle, Badge } from "@hive/ui";
import { useAdminAuth } from "@/lib/auth";
import { 
  Users,
  UserPlus,
  Shield,
  Crown,
  AlertTriangle,
  CheckCircle,
  Ban,
  Eye,
  Mail,
  Heart,
  Activity,
  TrendingUp,
  Clock,
  GraduationCap,
  Home,
  Zap,
  Search,
  RefreshCw,
  MoreVertical,
  Edit3,
  Trash2,
  Globe,
  Download,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

// STRICT USER TYPES WITH HIVE SPACE SYSTEM ENFORCEMENT
type UserRole = 'student' | 'faculty' | 'admin' | 'builder' | 'system';
type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending_verification' | 'quarantined';
type AccountType = 'individual' | 'organization' | 'system_managed';

// SPACE SYSTEM COMPLIANCE TYPES
type ValidSpaceCategory = 'university_spaces' | 'residential_spaces' | 'greek_life_spaces' | 'student_spaces';

interface UserSpaceActivity {
  spaceId: string;
  spaceName: string;
  spaceCategory: ValidSpaceCategory;
  role: 'member' | 'leader' | 'co_leader' | 'moderator';
  joinedAt: string;
  lastActivity: string;
  postsCount: number;
  toolsUsed: number;
  engagementScore: number;
  violations: number;
}

interface UserSocialMetrics {
  followersCount: number;
  followingCount: number;
  postsCount: number;
  commentsCount: number;
  likesReceived: number;
  likesGiven: number;
  toolsCreated: number;
  toolsUsed: number;
  eventsOrganized: number;
  eventsAttended: number;
  messagesCount: number;
  notificationsCount: number;
  engagementRate: number;
  influenceScore: number;
}

interface UserPrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  showOnlineStatus: boolean;
  allowDirectMessages: boolean;
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
  allowSpaceInvites: boolean;
  allowToolSharing: boolean;
  ghostMode: boolean;
}

interface UserViolation {
  id: string;
  type: 'space_misuse' | 'tool_abuse' | 'social_misconduct' | 'policy_violation' | 'spam' | 'harassment';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  reportedAt: string;
  reportedBy: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  evidence: string[];
  action: 'warning' | 'restriction' | 'suspension' | 'ban' | 'none';
}

interface HiveAdminUser {
  id: string;
  email: string;
  handle: string;
  displayName: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  accountType: AccountType;
  
  // Academic Information
  university: string;
  major?: string;
  graduationYear?: number;
  studentId?: string;
  
  // Profile Details
  profilePhoto?: string;
  bio?: string;
  location?: string;
  website?: string;
  phone?: string;
  
  // System Information
  createdAt: string;
  lastActive: string;
  lastLogin: string;
  loginCount: number;
  emailVerified: boolean;
  phoneVerified: boolean;
  onboardingCompleted: boolean;
  
  // HIVE Space System Data
  spaceMemberships: UserSpaceActivity[];
  spaceLeadership: UserSpaceActivity[];
  spacesCreated: number;
  spacesRequested: number;
  spaceViolations: UserViolation[];
  
  // Social Platform Metrics
  socialMetrics: UserSocialMetrics;
  privacySettings: UserPrivacySettings;
  
  // Platform Activity
  deviceInfo: {
    platform: string;
    browser: string;
    lastIP: string;
    location: string;
  };
  
  // Moderation Data
  violations: UserViolation[];
  warnings: number;
  restrictions: string[];
  suspensions: number;
  moderationNotes: string[];
  
  // Features & Permissions
  featureFlags: Record<string, boolean>;
  permissions: string[];
  betaFeatures: string[];
  
  // Analytics
  analytics: {
    weeklyActiveTime: number;
    dailyActiveTime: number;
    pageViews: number;
    sessionsCount: number;
    averageSessionDuration: number;
    bounceRate: number;
  };
}

interface UserBulkAction {
  id: string;
  action: 'activate' | 'deactivate' | 'suspend' | 'delete' | 'verify' | 'assign_role' | 'send_message' | 'export_data';
  userIds: string[];
  parameters?: Record<string, unknown>;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  results?: {
    successful: number;
    failed: number;
    errors: string[];
  };
}

interface HiveAdminUserManagementProps {
  onUpdateUser?: (userId: string, updates: Partial<HiveAdminUser>) => Promise<void>;
  onDeleteUser?: (userId: string) => Promise<void>;
  onSuspendUser?: (userId: string, reason: string, duration?: number) => Promise<void>;
  onVerifyUser?: (userId: string) => Promise<void>;
  onBulkAction?: (action: UserBulkAction) => Promise<void>;
  enableFeatureFlag?: boolean;
}

const UserCard: React.FC<{
  user: HiveAdminUser;
  onViewDetails: () => void;
  onEdit: () => void;
  onSuspend: () => void;
  onDelete: () => void;
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
}> = ({ user, onViewDetails, onEdit, onSuspend, onDelete, isSelected, onSelect }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSpaces, setShowSpaces] = useState(false);

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'text-red-400';
      case 'faculty': return 'text-blue-400';
      case 'builder': return 'text-purple-400';
      case 'student': return 'text-green-400';
      case 'system': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4" />;
      case 'faculty': return <GraduationCap className="w-4 h-4" />;
      case 'builder': return <Zap className="w-4 h-4" />;
      case 'student': return <Users className="w-4 h-4" />;
      case 'system': return <Shield className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'suspended': return 'bg-red-500';
      case 'pending_verification': return 'bg-yellow-500';
      case 'quarantined': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getEngagementColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getSpaceCategoryIcon = (category: ValidSpaceCategory) => {
    switch (category) {
      case 'university_spaces': return <GraduationCap className="w-3 h-3" />;
      case 'residential_spaces': return <Home className="w-3 h-3" />;
      case 'greek_life_spaces': return <Users className="w-3 h-3" />;
      case 'student_spaces': return <Heart className="w-3 h-3" />;
      default: return <Globe className="w-3 h-3" />;
    }
  };

  return (
    <div className="group">
      <Card className={`border transition-all cursor-pointer ${
        isSelected ? 'border-amber-500 bg-amber-500/5' : 'border-gray-700 bg-gray-900/50 hover:bg-gray-800/50'
      }`}>
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start space-x-3 flex-1">
              {/* Selection Checkbox */}
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => onSelect(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-amber-500 focus:ring-amber-500"
                />
              </label>

              {/* Profile Photo */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                  {user.profilePhoto ? (
                    <img src={user.profilePhoto} alt={user.displayName} className="w-full h-full object-cover" />
                  ) : (
                    <Users className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${getStatusColor(user.status)}`} />
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-white truncate">{user.displayName}</h3>
                  <div className={`flex items-center space-x-1 ${getRoleColor(user.role)}`}>
                    {getRoleIcon(user.role)}
                  </div>
                  {user.violations.length > 0 && (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400 mb-1">
                  <span>@{user.handle}</span>
                  <span>•</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>{user.university}</span>
                  {user.major && (
                    <>
                      <span>•</span>
                      <span>{user.major}</span>
                    </>
                  )}
                  {user.graduationYear && (
                    <>
                      <span>•</span>
                      <span>Class of {user.graduationYear}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Actions Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>

              {showMenu && (
                <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg py-1 z-20 min-w-[160px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails();
                        setShowMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                        setShowMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit User
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSuspend();
                        setShowMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-yellow-400 hover:bg-gray-700 flex items-center gap-2"
                    >
                      <Ban className="w-4 h-4" />
                      Suspend User
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                        setShowMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-gray-700 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete User
                    </button>
                </div>
              )}
            </div>
          </div>

          {/* Social Metrics Grid */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            <div className="text-center p-2 bg-gray-800/50 rounded">
              <div className="text-sm font-semibold text-blue-400">{user.socialMetrics.followersCount}</div>
              <div className="text-xs text-gray-400">Followers</div>
            </div>
            <div className="text-center p-2 bg-gray-800/50 rounded">
              <div className="text-sm font-semibold text-green-400">{user.socialMetrics.postsCount}</div>
              <div className="text-xs text-gray-400">Posts</div>
            </div>
            <div className="text-center p-2 bg-gray-800/50 rounded">
              <div className="text-sm font-semibold text-purple-400">{user.socialMetrics.toolsCreated}</div>
              <div className="text-xs text-gray-400">Tools</div>
            </div>
            <div className="text-center p-2 bg-gray-800/50 rounded">
              <div className="text-sm font-semibold text-amber-400">{user.spaceMemberships.length}</div>
              <div className="text-xs text-gray-400">Spaces</div>
            </div>
          </div>

          {/* Space Memberships */}
          <div className="mb-3">
            <button
              onClick={() => setShowSpaces(!showSpaces)}
              className="flex items-center justify-between w-full text-xs text-gray-400 hover:text-white transition-colors"
            >
              <span>Space Memberships ({user.spaceMemberships.length})</span>
              {showSpaces ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
            
            {showSpaces && (
              <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
                  {user.spaceMemberships.slice(0, 5).map((space) => (
                    <div key={space.spaceId} className="flex items-center justify-between p-2 bg-gray-800/30 rounded text-xs">
                      <div className="flex items-center space-x-2">
                        {getSpaceCategoryIcon(space.spaceCategory)}
                        <span className="text-white truncate max-w-[120px]">{space.spaceName}</span>
                        <Badge size="xs" className="bg-purple-500/10 text-purple-400">
                          {space.role}
                        </Badge>
                      </div>
                      <div className={`text-xs ${getEngagementColor(space.engagementScore)}`}>
                        {space.engagementScore}%
                      </div>
                    </div>
                  ))}
                  {user.spaceMemberships.length > 5 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{user.spaceMemberships.length - 5} more spaces
                    </div>
                  )}
              </div>
            )}
          </div>

          {/* Engagement & Activity */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Activity className="w-3 h-3 text-gray-400" />
                <span className={getEngagementColor(user.socialMetrics.engagementRate)}>
                  {user.socialMetrics.engagementRate}% engagement
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3 text-gray-400" />
                <span className="text-gray-300">{user.socialMetrics.influenceScore} influence</span>
              </div>
            </div>
            <div className="text-gray-400">
              {new Date(user.lastActive).toLocaleDateString()}
            </div>
          </div>

          {/* Violations Alert */}
          {user.violations.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-700">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 text-red-400">
                  <AlertTriangle className="w-3 h-3" />
                  <span>{user.violations.length} active violations</span>
                </div>
                <div className="text-red-400">
                  {user.warnings} warnings
                </div>
              </div>
            </div>
          )}

          {/* HIVE Space System Compliance */}
          <div className="mt-3 pt-3 border-t border-gray-700">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Shield className="w-3 h-3 text-blue-400" />
                <span className="text-blue-400">Space System Compliance</span>
              </div>
              <div className={`${user.spaceViolations.length === 0 ? 'text-green-400' : 'text-red-400'}`}>
                {user.spaceViolations.length === 0 ? 'Compliant' : `${user.spaceViolations.length} violations`}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const HiveAdminUserManagement: React.FC<HiveAdminUserManagementProps> = ({
  // onUpdateUser,
  // onDeleteUser,
  // onSuspendUser,
  // onVerifyUser,
  // onBulkAction,
  enableFeatureFlag = true
}) => {
  const { admin } = useAdminAuth();
  const [users, setUsers] = useState<HiveAdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  // const [showBulkActions, setShowBulkActions] = useState(false);

  // Feature flag check
  if (!enableFeatureFlag) {
    return (
      <div className="text-center py-8">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">User management system is not available</p>
      </div>
    );
  }

  const loadUsers = useCallback(async () => {
    if (!admin) return;

    setLoading(true);
    try {
      const response = await fetch('/api/admin/users/comprehensive', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${admin.id}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load users');
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  }, [admin]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectUser = (userId: string, selected: boolean) => {
    const newSelected = new Set(selectedUsers);
    if (selected) {
      newSelected.add(userId);
    } else {
      newSelected.delete(userId);
    }
    setSelectedUsers(newSelected);
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedUsers(new Set(filteredUsers.map(u => u.id)));
    } else {
      setSelectedUsers(new Set());
    }
  };

  const getUserStats = () => {
    const stats = {
      total: users.length,
      active: users.filter(u => u.status === 'active').length,
      suspended: users.filter(u => u.status === 'suspended').length,
      pending: users.filter(u => u.status === 'pending_verification').length,
      withViolations: users.filter(u => u.violations.length > 0).length,
      spaceViolators: users.filter(u => u.spaceViolations.length > 0).length,
    };

    const byRole = {
      students: users.filter(u => u.role === 'student').length,
      faculty: users.filter(u => u.role === 'faculty').length,
      admins: users.filter(u => u.role === 'admin').length,
      builders: users.filter(u => u.role === 'builder').length,
    };

    return { ...stats, byRole };
  };

  const stats = getUserStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-gray-400 mt-1">
            Comprehensive oversight of HIVE's social platform with space system enforcement
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            onClick={loadUsers}
            disabled={loading}
            variant="outline"
            className="border-gray-600 text-gray-300"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Refresh
          </Button>
          
          <Button className="bg-amber-500 hover:bg-amber-600 text-black">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Active</p>
                <p className="text-2xl font-bold text-green-400">{stats.active}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Suspended</p>
                <p className="text-2xl font-bold text-red-400">{stats.suspended}</p>
              </div>
              <Ban className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Violations</p>
                <p className="text-2xl font-bold text-orange-400">{stats.withViolations}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Space Issues</p>
                <p className="text-2xl font-bold text-purple-400">{stats.spaceViolators}</p>
              </div>
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name, handle, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">All Roles</option>
              <option value="student">Students ({stats.byRole.students})</option>
              <option value="faculty">Faculty ({stats.byRole.faculty})</option>
              <option value="admin">Admins ({stats.byRole.admins})</option>
              <option value="builder">Builders ({stats.byRole.builders})</option>
            </select>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as UserStatus | 'all')}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
              <option value="pending_verification">Pending</option>
              <option value="quarantined">Quarantined</option>
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.size > 0 && (
            <div className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-amber-400 font-medium">
                  {selectedUsers.size} users selected
                </span>
                <Button
                  size="sm"
                  onClick={() => handleSelectAll(false)}
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                >
                  Clear Selection
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Activate
                </Button>
                <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                  <Ban className="w-4 h-4 mr-1" />
                  Suspend
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Mail className="w-4 h-4 mr-1" />
                  Message
                </Button>
                <Button size="sm" className="bg-gray-600 hover:bg-gray-700 text-white">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Users List */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">
              Users ({filteredUsers.length})
            </CardTitle>
            <div className="flex items-center space-x-2">
              <label className="flex items-center text-sm text-gray-400">
                <input
                  type="checkbox"
                  checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="mr-2 w-4 h-4 rounded border-gray-600 bg-gray-800 text-amber-500 focus:ring-amber-500"
                />
                Select All
              </label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <RefreshCw className="w-8 h-8 text-amber-500 mx-auto mb-4 animate-spin" />
              <p className="text-gray-400">Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No users found</h3>
              <p className="text-gray-400">
                {searchTerm ? 'Try adjusting your search' : 'No users match the current filters'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onViewDetails={() => console.log('View details:', user.id)}
                  onEdit={() => console.log('Edit user:', user.id)}
                  onSuspend={() => console.log('Suspend user:', user.id)}
                  onDelete={() => console.log('Delete user:', user.id)}
                  isSelected={selectedUsers.has(user.id)}
                  onSelect={(selected) => handleSelectUser(user.id, selected)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* HIVE Space System Enforcement Reference */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>HIVE SPACE SYSTEM ENFORCEMENT</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">✅ USER COMPLIANCE TRACKING</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Monitors user space membership compliance</li>
                <li>• Tracks proper space category usage</li>
                <li>• Enforces tool-based functionality rules</li>
                <li>• Prevents forbidden space creation</li>
              </ul>
            </div>
            
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <h4 className="font-semibold text-red-400 mb-2">❌ AUTOMATIC VIOLATION DETECTION</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Creating forbidden functional spaces</li>
                <li>• Misusing space categories</li>
                <li>• Tool system violations</li>
                <li>• Community container rule breaks</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
