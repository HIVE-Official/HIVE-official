/**
 * HIVE Enhanced Admin User Management
 * Complete user management with social features, advanced controls, and real-time monitoring
 */

"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button as Button, HiveCard as Card, CardContent, CardHeader, CardTitle, Badge } from "@hive/ui";
import { useAdminAuth } from "@/lib/auth";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Edit3, 
  Eye, 
  Users, 
  UserCheck,
  UserX,
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Mail,
  RefreshCw, 
  Shield, 
  ShieldCheck,
  BarChart3, 
  Layers, 
  PlayCircle,
  PauseCircle,
  Flag,
  CheckSquare,
  X,
  ChevronDown,
  Copy,
  Award,
  Briefcase,
  GraduationCap,
  BookOpen,
  Download
} from 'lucide-react';

interface AdminUser {
  id: string;
  email: string;
  username: string;
  handle: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  status: 'active' | 'inactive' | 'suspended' | 'banned' | 'pending_verification';
  role: 'student' | 'builder' | 'admin' | 'moderator' | 'staff' | 'faculty';
  verificationStatus: 'unverified' | 'pending' | 'verified' | 'rejected';
  isOnline: boolean;
  lastActive: string;
  createdAt: string;
  lastLogin?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
  
  // Academic Info
  university?: string;
  school?: string;
  major?: string;
  graduationYear?: number;
  studentId?: string;
  gpa?: number;
  
  // Profile Stats
  profileCompletion: number;
  spacesCount: number;
  toolsCount: number;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  
  // Engagement Analytics
  analytics: {
    totalSessions: number;
    avgSessionDuration: number;
    dailyActiveStreak: number;
    weeklyActiveStreak: number;
    lastSeenDevice: string;
    lastSeenLocation?: string;
    totalTimeSpent: number;
    actionsPerSession: number;
    engagementScore: number;
  };
  
  // Social Features
  socialFeatures: {
    canCreateSpaces: boolean;
    canInviteUsers: boolean;
    canComment: boolean;
    canMessage: boolean;
    canFollow: boolean;
    canCreateTools: boolean;
    canReview: boolean;
  };
  
  // Permissions
  permissions: {
    canAccessBeta: boolean;
    canUsePremiumFeatures: boolean;
    canModerateCommunity: boolean;
    canManageContent: boolean;
    canInviteUsers: boolean;
    canExportData: boolean;
    canDeleteAccount: boolean;
  };
  
  // Violations & Reports
  violations: {
    count: number;
    severity: 'none' | 'low' | 'medium' | 'high' | 'critical';
    lastViolation?: string;
    types: string[];
  };
  
  reports: {
    count: number;
    lastReport?: string;
    status: 'none' | 'under_review' | 'resolved';
  };
  
  // Subscription & Billing
  subscription?: {
    plan: 'free' | 'pro' | 'premium' | 'enterprise';
    status: 'active' | 'cancelled' | 'expired' | 'trial';
    expiresAt?: string;
    billingCycle?: 'monthly' | 'yearly';
  };
  
  // Contact & Location
  contactInfo: {
    email: string;
    phone?: string;
    emergencyContact?: string;
    preferredLanguage: string;
    timezone: string;
  };
  
  location: {
    country?: string;
    state?: string;
    city?: string;
    campus?: string;
    residence?: string;
  };
  
  // Tags and Notes
  tags: string[];
  adminNotes?: string;
  internalFlags: string[];
}

interface UserSearchResult {
  users: AdminUser[];
  total: number;
  page: number;
  limit: number;
  filters: {
    roles: Array<{ value: string; count: number }>;
    statuses: Array<{ value: string; count: number }>;
    universities: Array<{ value: string; count: number }>;
    majors: Array<{ value: string; count: number }>;
  };
}

interface EnhancedAdminUserManagementProps {
  onUserSelect?: (user: AdminUser) => void;
  onUserUpdate?: (userId: string, updates: Partial<AdminUser>) => void;
  onBulkAction?: (userIds: string[], action: string) => void;
  enableFeatureFlag?: boolean;
}

interface UserCardProps {
  user: AdminUser;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onAction: (action: string) => void;
  onViewDetails: () => void;
}


const UserCard: React.FC<UserCardProps> = ({
  user,
  isSelected,
  onSelect,
  onEdit,
  onAction,
  onViewDetails
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusColor = (status: AdminUser['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'suspended': return 'bg-yellow-500';
      case 'banned': return 'bg-red-500';
      case 'pending_verification': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleIcon = (role: AdminUser['role']) => {
    switch (role) {
      case 'admin': return <ShieldCheck className="w-4 h-4 text-red-400" />;
      case 'moderator': return <Shield className="w-4 h-4 text-blue-400" />;
      case 'builder': return <Award className="w-4 h-4 text-purple-400" />;
      case 'faculty': return <GraduationCap className="w-4 h-4 text-green-400" />;
      case 'staff': return <Briefcase className="w-4 h-4 text-orange-400" />;
      case 'student': return <BookOpen className="w-4 h-4 text-gray-400" />;
      default: return <Users className="w-4 h-4 text-gray-400" />;
    }
  };

  const getVerificationIcon = (status: AdminUser['verificationStatus']) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'rejected': return <X className="w-4 h-4 text-red-400" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getEngagementColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  return (
    <div
      className={`relative p-4 bg-gray-900/50 border rounded-xl hover:bg-gray-800/50 transition-all cursor-pointer group ${
        isSelected ? 'border-amber-500 bg-amber-500/5' : 'border-gray-700'
      }`}
      onClick={onSelect}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {}}
          className="w-4 h-4 text-amber-500 bg-gray-800 border-gray-600 rounded focus:ring-amber-500"
        />
      </div>

      {/* Header */}
      <div className="ml-8 mb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            {/* Avatar */}
            <div className="relative">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.displayName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-medium text-lg">
                    {user.displayName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {user.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full" />
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-white truncate">{user.displayName}</h3>
                {getRoleIcon(user.role)}
                {getVerificationIcon(user.verificationStatus)}
                {user.emailVerified && <Mail className="w-3 h-3 text-blue-400" />}
                {user.twoFactorEnabled && <Shield className="w-3 h-3 text-green-400" />}
              </div>
              
              <div className="flex items-center space-x-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`} />
                <span className="text-xs text-gray-400 capitalize">{user.status.replace('_', ' ')}</span>
                <span className="text-xs text-gray-400">@{user.handle}</span>
              </div>

              <div className="flex items-center space-x-3 text-xs text-gray-400 mb-2">
                <span className="capitalize">{user.role}</span>
                {user.university && (
                  <>
                    <span>•</span>
                    <span>{user.university}</span>
                  </>
                )}
                {user.major && (
                  <>
                    <span>•</span>
                    <span>{user.major}</span>
                  </>
                )}
              </div>

              {user.bio && (
                <p className="text-sm text-gray-300 line-clamp-2 mb-2">{user.bio}</p>
              )}
            </div>
          </div>

          {/* Action Menu */}
          <div className="relative ml-4">
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
              <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg py-1 z-20 min-w-[200px]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails();
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Full Profile
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
                      navigator.clipboard.writeText(user.email);
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Email
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`mailto:${user.email}`, '_blank');
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Send Email
                  </button>
                  <div className="border-t border-gray-600 my-1" />
                  {user.status === 'active' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAction('suspend');
                        setShowMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-yellow-400 hover:bg-gray-700 flex items-center gap-2"
                    >
                      <PauseCircle className="w-4 h-4" />
                      Suspend User
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAction('activate');
                        setShowMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-green-400 hover:bg-gray-700 flex items-center gap-2"
                    >
                      <PlayCircle className="w-4 h-4" />
                      Activate User
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAction('ban');
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <UserX className="w-4 h-4" />
                    Ban User
                  </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="ml-8 grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        <div className="text-center">
          <div className="text-sm font-semibold text-white">{formatNumber(user.spacesCount)}</div>
          <div className="text-xs text-gray-400">Spaces</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-blue-400">{user.toolsCount}</div>
          <div className="text-xs text-gray-400">Tools</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-purple-400">{formatNumber(user.followersCount)}</div>
          <div className="text-xs text-gray-400">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-green-400">{user.profileCompletion}%</div>
          <div className="text-xs text-gray-400">Profile</div>
        </div>
      </div>

      {/* Analytics */}
      <div className="ml-8 mb-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Activity className="w-3 h-3 text-gray-400" />
              <span className={`${getEngagementColor(user.analytics.engagementScore)}`}>
                {user.analytics.engagementScore}% engagement
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-gray-300">
                {formatDuration(user.analytics.avgSessionDuration)} avg
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3 text-gray-400" />
              <span className="text-gray-300">
                {user.analytics.dailyActiveStreak} day streak
              </span>
            </div>
          </div>
          <div className="text-gray-400">
            {user.isOnline ? 'Online now' : `Last seen: ${formatDate(user.lastActive)}`}
          </div>
        </div>
      </div>

      {/* Tags */}
      {user.tags.length > 0 && (
        <div className="ml-8 mb-3">
          <div className="flex flex-wrap gap-1">
            {user.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
            {user.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                +{user.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Alerts */}
      {(user.reports.count > 0 || user.violations.count > 0 || !user.emailVerified) && (
        <div className="ml-8 flex items-center space-x-2">
          {!user.emailVerified && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-xs">
              <Mail className="w-3 h-3 text-blue-400" />
              <span className="text-blue-400">Unverified</span>
            </div>
          )}
          {user.reports.count > 0 && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs">
              <Flag className="w-3 h-3 text-yellow-400" />
              <span className="text-yellow-400">{user.reports.count} reports</span>
            </div>
          )}
          {user.violations.count > 0 && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-xs">
              <AlertTriangle className="w-3 h-3 text-red-400" />
              <span className="text-red-400">{user.violations.count} violations</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const EnhancedAdminUserManagement: React.FC<EnhancedAdminUserManagementProps> = ({
  // onUserSelect,
  // onUserUpdate,
  onBulkAction,
  enableFeatureFlag = true
}) => {
  const { admin } = useAdminAuth();
  const [users, setUsers] = useState<UserSearchResult | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  // const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedVerification, setSelectedVerification] = useState<string>("all");
  const [selectedUniversity, setSelectedUniversity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<'name' | 'created' | 'lastActive' | 'engagement'>('lastActive');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Feature flag check
  if (!enableFeatureFlag) {
    return (
      <div className="text-center py-8">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">Enhanced user management is not available</p>
      </div>
    );
  }

  const searchUsers = useCallback(async () => {
    if (!admin) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.id}`,
        },
        body: JSON.stringify({
          action: 'search',
          query: searchTerm,
          role: selectedRole !== 'all' ? selectedRole : undefined,
          status: selectedStatus !== 'all' ? selectedStatus : undefined,
          verificationStatus: selectedVerification !== 'all' ? selectedVerification : undefined,
          university: selectedUniversity !== 'all' ? selectedUniversity : undefined,
          sortBy,
          sortOrder,
          limit: 50,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to search users');
      }

      const data = await response.json();
      setUsers(data.users || { 
        users: [], 
        total: 0, 
        page: 1, 
        limit: 50, 
        filters: { 
          roles: [], 
          statuses: [], 
          universities: [], 
          majors: [] 
        } 
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  }, [admin, searchTerm, selectedRole, selectedStatus, selectedVerification, selectedUniversity, sortBy, sortOrder]);

  const handleUserAction = useCallback(async (action: string, userId: string) => {
    if (!admin) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.id}`,
        },
        body: JSON.stringify({
          action,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} user`);
      }

      await searchUsers();
      
      if (selectedUser?.id === userId) {
        setSelectedUser(null);
        // setShowDetails(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setLoading(false);
    }
  }, [admin, searchUsers, selectedUser]);

  const handleBulkAction = useCallback(async (action: string) => {
    if (selectedUsers.length === 0) return;
    
    await onBulkAction?.(selectedUsers, action);
    await searchUsers();
    setSelectedUsers([]);
  }, [selectedUsers, onBulkAction, searchUsers]);

  const handleUserSelect = useCallback((userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (!users) return;
    
    if (selectedUsers.length === users.users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.users.map(u => u.id));
    }
  }, [users, selectedUsers]);

  useEffect(() => {
    searchUsers();
  }, [searchUsers]);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.users;
  }, [users]);

  const getStatsOverview = () => {
    if (!users) return { total: 0, active: 0, verified: 0, issues: 0 };
    
    return {
      total: users.total,
      active: users.users.filter(u => u.status === 'active').length,
      verified: users.users.filter(u => u.verificationStatus === 'verified').length,
      issues: users.users.filter(u => u.reports.count > 0 || u.violations.count > 0).length,
    };
  };

  const stats = getStatsOverview();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-gray-400 mt-1">Monitor and manage all platform users</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="border-gray-600 text-gray-300"
          >
            {viewMode === 'grid' ? <BarChart3 className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
          </Button>
          <Button
            onClick={() => window.location.reload()}
            className="bg-amber-500 hover:bg-amber-600 text-black"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                <p className="text-sm font-medium text-gray-400">Verified</p>
                <p className="text-2xl font-bold text-blue-400">{stats.verified}</p>
              </div>
              <ShieldCheck className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Issues</p>
                <p className="text-2xl font-bold text-red-400">{stats.issues}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Main Search */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name, email, handle, or university..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchUsers()}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <Button 
                onClick={searchUsers}
                disabled={loading}
                className="bg-amber-500 hover:bg-amber-600 text-black"
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-gray-600 text-gray-300"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t border-gray-700">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="all">All Roles</option>
                    <option value="student">Student</option>
                    <option value="builder">Builder</option>
                    <option value="faculty">Faculty</option>
                    <option value="staff">Staff</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>

                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                    <option value="banned">Banned</option>
                    <option value="pending_verification">Pending</option>
                  </select>

                  <select
                    value={selectedVerification}
                    onChange={(e) => setSelectedVerification(e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="all">All Verification</option>
                    <option value="verified">Verified</option>
                    <option value="pending">Pending</option>
                    <option value="unverified">Unverified</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  <select
                    value={selectedUniversity}
                    onChange={(e) => setSelectedUniversity(e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="all">All Universities</option>
                    <option value="buffalo">University at Buffalo</option>
                    <option value="columbia">Columbia University</option>
                    <option value="nyu">New York University</option>
                  </select>

                  <select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [field, order] = e.target.value.split('-');
                      setSortBy(field as 'name' | 'created' | 'lastActive' | 'engagement');
                      setSortOrder(order as 'asc' | 'desc');
                    }}
                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="lastActive-desc">Recently Active</option>
                    <option value="created-desc">Newest First</option>
                    <option value="created-asc">Oldest First</option>
                    <option value="engagement-desc">Most Engaged</option>
                    <option value="engagement-asc">Least Engaged</option>
                    <option value="name-asc">Name A-Z</option>
                    <option value="name-desc">Name Z-A</option>
                  </select>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Users List */}
      {users && (
        <Card className="border-gray-700 bg-gray-900/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">
                Users ({users.total} found)
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSelectAll}
                  className="border-gray-600 text-gray-300"
                >
                  {selectedUsers.length === users.users.length ? 'Deselect All' : 'Select All'}
                </Button>
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
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className={`space-y-4 ${viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : ''}`}>
                {filteredUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    isSelected={selectedUsers.includes(user.id)}
                    onSelect={() => handleUserSelect(user.id)}
                    onEdit={() => {
                      setSelectedUser(user);
                      // setShowDetails(true);
                    }}
                    onAction={(action) => handleUserAction(action, user.id)}
                    onViewDetails={() => {
                      setSelectedUser(user);
                      // setShowDetails(true);
                    }}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Bulk Actions Bar */}
      {selectedUsers.length > 0 && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CheckSquare className="w-5 h-5 text-amber-500" />
                <span className="text-white font-medium">{selectedUsers.length} users selected</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  onClick={() => handleBulkAction('activate')}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <UserCheck className="w-4 h-4 mr-1" />
                  Activate
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleBulkAction('suspend')}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  <PauseCircle className="w-4 h-4 mr-1" />
                  Suspend
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleBulkAction('verify')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <ShieldCheck className="w-4 h-4 mr-1" />
                  Verify
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleBulkAction('export')}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedUsers([])}
                  className="border-gray-600 text-gray-300"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              </div>
            </div>
        </div>
      )}
    </div>
  );
};
