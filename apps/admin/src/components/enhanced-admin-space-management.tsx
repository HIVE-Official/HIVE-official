/**
 * HIVE Enhanced Admin Space Management
 * Complete space management with social features, real-time updates, and advanced controls
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
  Trash2, 
  Eye, 
  Users, 
  Settings, 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Calendar, 
  MapPin, 
  Hash, 
  Star, 
  Heart, 
  RefreshCw, 
  Archive, 
  Shield, 
  Layers, 
  Database, 
  BarChart3, 
  Globe,
  Lock,
  PlayCircle,
  PauseCircle,
  StopCircle,
  Mail,
  Flag,
  CheckSquare,
  X,
  ChevronDown,
  Copy,
  BookOpen,
  Building,
  GraduationCap,
  Home
} from 'lucide-react';

interface AdminSpace {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: 'university_spaces' | 'residential_spaces' | 'greek_life_spaces' | 'student_spaces';
  subType: 'academic_major' | 'class_year' | 'university_organization' | 'dorm_building' | 'off_campus_area' | 'greek_chapter' | 'greek_council' | 'student_club' | 'interest_community';
  status: 'dormant' | 'activated' | 'frozen' | 'archived' | 'suspended';
  visibility: 'public' | 'private' | 'invite_only' | 'university_only';
  memberCount: number;
  activeMembers: number;
  buildersCount: number;
  toolsCount: number;
  postsCount: number;
  eventsCount: number;
  hasBuilders: boolean;
  isVerified: boolean;
  isPinned: boolean;
  isFeatured: boolean;
  createdAt: string;
  activatedAt?: string;
  lastActivity: string;
  creator: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  moderators: Array<{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'admin' | 'moderator';
    joinedAt: string;
  }>;
  surfaces: {
    pinned: boolean;
    posts: boolean;
    events: boolean;
    tools: boolean;
    chat: boolean;
    members: boolean;
    calendar: boolean;
    files: boolean;
  };
  settings: {
    allowMemberInvites: boolean;
    requireApproval: boolean;
    enableNotifications: boolean;
    publicDirectory: boolean;
    allowDiscovery: boolean;
    enableAnalytics: boolean;
  };
  analytics: {
    dailyActiveUsers: number;
    weeklyActiveUsers: number;
    monthlyActiveUsers: number;
    postsPerDay: number;
    engagementRate: number;
    growthRate: number;
    retentionRate: number;
  };
  tags: string[];
  categories: string[];
  location?: string;
  website?: string;
  contactEmail?: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    discord?: string;
    slack?: string;
  };
  reports: {
    count: number;
    lastReport: string;
    status: 'none' | 'under_review' | 'resolved';
  };
  violations: {
    count: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
    lastViolation?: string;
  };
}

interface SpaceSearchResult {
  spaces: AdminSpace[];
  total: number;
  page: number;
  limit: number;
  filters: {
    types: Array<{ value: string; count: number }>;
    statuses: Array<{ value: string; count: number }>;
    categories: Array<{ value: string; count: number }>;
  };
}

interface EnhancedAdminSpaceManagementProps {
  onBulkAction?: (spaceIds: string[], action: string) => void;
  enableFeatureFlag?: boolean;
}

interface SpaceCardProps {
  space: AdminSpace;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onAction: (action: string) => void;
  onViewDetails: () => void;
}


interface BulkActionsBarProps {
  selectedSpaces: string[];
  onAction: (action: string) => void;
  onClearSelection: () => void;
}

const SpaceCard: React.FC<SpaceCardProps> = ({
  space,
  isSelected,
  onSelect,
  onEdit,
  onAction,
  onViewDetails
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusColor = (status: AdminSpace['status']) => {
    switch (status) {
      case 'activated': return 'bg-green-500';
      case 'dormant': return 'bg-gray-500';
      case 'frozen': return 'bg-blue-500';
      case 'archived': return 'bg-yellow-500';
      case 'suspended': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: AdminSpace['type'], subType?: AdminSpace['subType']) => {
    if (subType) {
      switch (subType) {
        case 'academic_major': return <BookOpen className="w-4 h-4 text-blue-400" />;
        case 'class_year': return <Calendar className="w-4 h-4 text-green-400" />;
        case 'university_organization': return <Shield className="w-4 h-4 text-purple-400" />;
        case 'dorm_building': return <Building className="w-4 h-4 text-orange-400" />;
        case 'off_campus_area': return <MapPin className="w-4 h-4 text-yellow-400" />;
        case 'greek_chapter': return <Star className="w-4 h-4 text-gold-400" />;
        case 'greek_council': return <Users className="w-4 h-4 text-purple-400" />;
        case 'student_club': return <Heart className="w-4 h-4 text-pink-400" />;
        case 'interest_community': return <Globe className="w-4 h-4 text-teal-400" />;
        default: return <Hash className="w-4 h-4" />;
      }
    }
    
    switch (type) {
      case 'university_spaces': return <GraduationCap className="w-4 h-4 text-blue-400" />;
      case 'residential_spaces': return <Home className="w-4 h-4 text-orange-400" />;
      case 'greek_life_spaces': return <Users className="w-4 h-4 text-purple-400" />;
      case 'student_spaces': return <Heart className="w-4 h-4 text-pink-400" />;
      default: return <Hash className="w-4 h-4" />;
    }
  };

  const getVisibilityIcon = (visibility: AdminSpace['visibility']) => {
    switch (visibility) {
      case 'public': return <Globe className="w-3 h-3 text-green-400" />;
      case 'private': return <Lock className="w-3 h-3 text-red-400" />;
      case 'invite_only': return <Mail className="w-3 h-3 text-yellow-400" />;
      case 'university_only': return <Shield className="w-3 h-3 text-blue-400" />;
      default: return <Globe className="w-3 h-3" />;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getEngagementColor = (rate: number) => {
    if (rate >= 75) return 'text-green-400';
    if (rate >= 50) return 'text-yellow-400';
    if (rate >= 25) return 'text-orange-400';
    return 'text-red-400';
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
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(space.status)}`} />
              <h3 className="font-semibold text-white truncate">{space.name}</h3>
              {space.isVerified && <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />}
              {space.isPinned && <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />}
              {space.isFeatured && <TrendingUp className="w-4 h-4 text-purple-400 flex-shrink-0" />}
            </div>
            
            <div className="flex items-center space-x-3 mb-2">
              <div className="flex items-center space-x-1 text-gray-400">
                {getTypeIcon(space.type, space.subType)}
                <span className="text-xs capitalize">{space.subType.replace('_', ' ')}</span>
              </div>
              {getVisibilityIcon(space.visibility)}
              <span className="text-xs text-gray-400 capitalize">{space.visibility.replace('_', ' ')}</span>
              <div className="text-xs text-gray-500">
                {space.type.replace('_', ' ')}
              </div>
            </div>

            <p className="text-sm text-gray-300 line-clamp-2 mb-3">{space.description}</p>

            {/* Tags */}
            {space.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {space.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                    #{tag}
                  </Badge>
                ))}
                {space.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    +{space.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
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
              <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg py-1 z-20 min-w-[180px]">
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
                    Edit Space
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(`${window.location.origin}/spaces/${space.slug}`);
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </button>
                  <div className="border-t border-gray-600 my-1" />
                  {space.status === 'activated' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAction('deactivate');
                        setShowMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-yellow-400 hover:bg-gray-700 flex items-center gap-2"
                    >
                      <PauseCircle className="w-4 h-4" />
                      Deactivate
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
                      Activate
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAction('freeze');
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-blue-400 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <StopCircle className="w-4 h-4" />
                    Freeze
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAction('archive');
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-400 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Archive className="w-4 h-4" />
                    Archive
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAction('delete');
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="ml-8 grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        <div className="text-center">
          <div className="text-lg font-semibold text-white">{formatNumber(space.memberCount)}</div>
          <div className="text-xs text-gray-400">Members</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-green-400">{space.activeMembers}</div>
          <div className="text-xs text-gray-400">Active</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-400">{space.toolsCount}</div>
          <div className="text-xs text-gray-400">Tools</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-purple-400">{space.postsCount}</div>
          <div className="text-xs text-gray-400">Posts</div>
        </div>
      </div>

      {/* Analytics */}
      <div className="ml-8 mb-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Activity className="w-3 h-3 text-gray-400" />
              <span className={`${getEngagementColor(space.analytics.engagementRate)}`}>
                {space.analytics.engagementRate.toFixed(1)}% engagement
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3 text-gray-400" />
              <span className="text-gray-300">
                {space.analytics.growthRate > 0 ? '+' : ''}{space.analytics.growthRate.toFixed(1)}% growth
              </span>
            </div>
          </div>
          <div className="text-gray-400">
            Active: {formatDate(space.lastActivity)}
          </div>
        </div>
      </div>

      {/* Alerts */}
      {(space.reports.count > 0 || space.violations.count > 0) && (
        <div className="ml-8 flex items-center space-x-2">
          {space.reports.count > 0 && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs">
              <Flag className="w-3 h-3 text-yellow-400" />
              <span className="text-yellow-400">{space.reports.count} reports</span>
            </div>
          )}
          {space.violations.count > 0 && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-xs">
              <AlertTriangle className="w-3 h-3 text-red-400" />
              <span className="text-red-400">{space.violations.count} violations</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const BulkActionsBar: React.FC<BulkActionsBarProps> = ({
  selectedSpaces,
  onAction,
  onClearSelection
}) => {
  return (
    <>
      {selectedSpaces.length > 0 && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-5 h-5 text-amber-500" />
              <span className="text-white font-medium">{selectedSpaces.length} spaces selected</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                onClick={() => onAction('activate')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <PlayCircle className="w-4 h-4 mr-1" />
                Activate
              </Button>
              <Button
                size="sm"
                onClick={() => onAction('deactivate')}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                <PauseCircle className="w-4 h-4 mr-1" />
                Deactivate
              </Button>
              <Button
                size="sm"
                onClick={() => onAction('freeze')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <StopCircle className="w-4 h-4 mr-1" />
                Freeze
              </Button>
              <Button
                size="sm"
                onClick={() => onAction('archive')}
                className="bg-gray-600 hover:bg-gray-700 text-white"
              >
                <Archive className="w-4 h-4 mr-1" />
                Archive
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onClearSelection}
                className="border-gray-600 text-gray-300"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const EnhancedAdminSpaceManagement: React.FC<EnhancedAdminSpaceManagementProps> = ({
  onBulkAction,
  enableFeatureFlag = true
}) => {
  const { admin } = useAdminAuth();
  const [spaces, setSpaces] = useState<SpaceSearchResult | null>(null);
  const [selectedSpaces, setSelectedSpaces] = useState<string[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<AdminSpace | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedVisibility, setSelectedVisibility] = useState<string>("all");
  const [sortBy, setSortBy] = useState<'name' | 'members' | 'activity' | 'created'>('activity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Feature flag check
  if (!enableFeatureFlag) {
    return (
      <div className="text-center py-8">
        <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">Enhanced space management is not available</p>
      </div>
    );
  }

  const spaceTypes = [
    { value: 'university_spaces', label: 'University Spaces', icon: GraduationCap, description: 'Academic majors, class years, university organizations' },
    { value: 'residential_spaces', label: 'Residential Spaces', icon: Home, description: 'Dorm buildings and off-campus areas' },
    { value: 'greek_life_spaces', label: 'Greek Life Spaces', icon: Users, description: 'Individual chapters and Greek councils' },
    { value: 'student_spaces', label: 'Student Spaces', icon: Heart, description: 'Clubs, organizations, and interest communities' },
  ];


  const searchSpaces = useCallback(async () => {
    if (!admin) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/spaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.id}`,
        },
        body: JSON.stringify({
          action: 'search',
          query: searchTerm,
          type: selectedType !== 'all' ? selectedType : undefined,
          status: selectedStatus !== 'all' ? selectedStatus : undefined,
          visibility: selectedVisibility !== 'all' ? selectedVisibility : undefined,
          sortBy,
          sortOrder,
          limit: 50,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to search spaces');
      }

      const data = await response.json();
      setSpaces(data.spaces || { spaces: [], total: 0, page: 1, limit: 50, filters: { types: [], statuses: [], categories: [] } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  }, [admin, searchTerm, selectedType, selectedStatus, selectedVisibility, sortBy, sortOrder]);

  const handleSpaceAction = useCallback(async (action: string, spaceId: string) => {
    if (!admin) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/spaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.id}`,
        },
        body: JSON.stringify({
          action,
          spaceId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} space`);
      }

      await searchSpaces();
      
      if (selectedSpace?.id === spaceId) {
        setSelectedSpace(null);
        // Details closed
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setLoading(false);
    }
  }, [admin, searchSpaces, selectedSpace]);

  const handleBulkAction = useCallback(async (action: string) => {
    if (selectedSpaces.length === 0) return;
    
    await onBulkAction?.(selectedSpaces, action);
    await searchSpaces();
    setSelectedSpaces([]);
  }, [selectedSpaces, onBulkAction, searchSpaces]);

  const handleSpaceSelect = useCallback((spaceId: string) => {
    setSelectedSpaces(prev => 
      prev.includes(spaceId) 
        ? prev.filter(id => id !== spaceId)
        : [...prev, spaceId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (!spaces) return;
    
    if (selectedSpaces.length === spaces.spaces.length) {
      setSelectedSpaces([]);
    } else {
      setSelectedSpaces(spaces.spaces.map(s => s.id));
    }
  }, [spaces, selectedSpaces]);

  useEffect(() => {
    searchSpaces();
  }, [searchSpaces]);

  const filteredSpaces = useMemo(() => {
    if (!spaces) return [];
    return spaces.spaces;
  }, [spaces]);

  const getStatsOverview = () => {
    if (!spaces) return { total: 0, active: 0, pending: 0, issues: 0 };
    
    return {
      total: spaces.total,
      active: spaces.spaces.filter(s => s.status === 'activated').length,
      pending: spaces.spaces.filter(s => s.status === 'dormant').length,
      issues: spaces.spaces.filter(s => s.reports.count > 0 || s.violations.count > 0).length,
    };
  };

  const stats = getStatsOverview();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Space Management</h2>
          <p className="text-gray-400 mt-1">Monitor and manage all community spaces</p>
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
                <p className="text-sm font-medium text-gray-400">Total Spaces</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <Database className="w-8 h-8 text-gray-400" />
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
                <p className="text-sm font-medium text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
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
                  placeholder="Search spaces by name, description, or creator..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchSpaces()}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <Button 
                onClick={searchSpaces}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-700">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="all">All Types</option>
                    {spaceTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>

                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="activated">Activated</option>
                    <option value="dormant">Dormant</option>
                    <option value="frozen">Frozen</option>
                    <option value="archived">Archived</option>
                    <option value="suspended">Suspended</option>
                  </select>

                  <select
                    value={selectedVisibility}
                    onChange={(e) => setSelectedVisibility(e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="all">All Visibility</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="invite_only">Invite Only</option>
                    <option value="university_only">University Only</option>
                  </select>

                  <select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [field, order] = e.target.value.split('-');
                      setSortBy(field as 'name' | 'members' | 'activity' | 'created');
                      setSortOrder(order as 'asc' | 'desc');
                    }}
                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="activity-desc">Latest Activity</option>
                    <option value="created-desc">Newest First</option>
                    <option value="created-asc">Oldest First</option>
                    <option value="members-desc">Most Members</option>
                    <option value="members-asc">Least Members</option>
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

      {/* Spaces List */}
      {spaces && (
        <Card className="border-gray-700 bg-gray-900/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">
                Spaces ({spaces.total} found)
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSelectAll}
                  className="border-gray-600 text-gray-300"
                >
                  {selectedSpaces.length === spaces.spaces.length ? 'Deselect All' : 'Select All'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 text-amber-500 mx-auto mb-4 animate-spin" />
                <p className="text-gray-400">Loading spaces...</p>
              </div>
            ) : filteredSpaces.length === 0 ? (
              <div className="text-center py-12">
                <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No spaces found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className={`space-y-4 ${viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : ''}`}>
                {filteredSpaces.map((space) => (
                  <SpaceCard
                    key={space.id}
                    space={space}
                    isSelected={selectedSpaces.includes(space.id)}
                    onSelect={() => handleSpaceSelect(space.id)}
                    onEdit={() => {
                      setSelectedSpace(space);
                      // Show details
                    }}
                    onAction={(action) => handleSpaceAction(action, space.id)}
                    onViewDetails={() => {
                      setSelectedSpace(space);
                      // Show details
                    }}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedSpaces={selectedSpaces}
        onAction={handleBulkAction}
        onClearSelection={() => setSelectedSpaces([])}
      />
    </div>
  );
};
