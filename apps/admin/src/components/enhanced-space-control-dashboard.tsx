"use client";

import { useState, useEffect, useCallback } from "react";
import { Button as Button, HiveCard as Card, CardContent, CardHeader, CardTitle, Badge } from "@hive/ui";
import { useAdminAuth } from "@/lib/auth";
import { 
  Search, Filter, Users, AlertTriangle, 
  Settings, Eye, BarChart3, RefreshCw,
  Play, Pause, Archive, RotateCcw, Edit,
  CheckCircle, XCircle, Clock, Zap, Target, Globe,
  MessageSquare, Calendar, Wrench, Shield
} from "lucide-react";

interface EnhancedSpace {
  id: string;
  name: string;
  type: 'campus_living' | 'fraternity_and_sorority' | 'hive_exclusive' | 'student_organizations' | 'university_organizations';
  description: string;
  memberCount: number;
  actualMemberCount: number;
  builderCount: number;
  adminCount: number;
  status: 'dormant' | 'activated' | 'frozen' | 'archived';
  hasBuilders: boolean;
  healthScore: number;
  createdAt: string;
  updatedAt: string;
  activatedAt?: string;
  surfaces: {
    pinned: boolean;
    posts: boolean;
    events: boolean;
    tools: boolean;
    chat: boolean;
    members: boolean;
  };
  engagement: {
    weeklyPosts: number;
    weeklyEvents: number;
    weeklyJoins: number;
    retentionRate: number;
  };
  trends: {
    memberGrowth: number;
    engagementTrend: 'up' | 'down' | 'stable';
    activity_level: 'low' | 'medium' | 'high';
  };
  members: Array<{
    id: string;
    role: string;
    joinedAt: string;
  }>;
}

interface AdminDashboardStats {
  totalSpaces: number;
  activeSpaces: number;
  dormantSpaces: number;
  archivedSpaces: number;
  totalMembers: number;
  averageMembers: number;
  healthySpaces: number;
  unhealthySpaces: number;
  byType: Record<string, {
    total: number;
    active: number;
    dormant: number;
    healthy: number;
  }>;
}

interface BulkOperation {
  action: 'activate' | 'deactivate' | 'archive' | 'categorize' | 'tag' | 'feature';
  spaceIds: string[];
  params?: Record<string, unknown>;
}

export function EnhancedSpaceControlDashboard() {
  const { admin } = useAdminAuth();
  
  // State Management
  const [spaces, setSpaces] = useState<EnhancedSpace[]>([]);
  const [filteredSpaces, setFilteredSpaces] = useState<EnhancedSpace[]>([]);
  const [selectedSpaces, setSelectedSpaces] = useState<Set<string>>(new Set());
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedHealth, setSelectedHealth] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("updated");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // View State
  const [viewMode, setViewMode] = useState<'grid' | 'table' | 'analytics'>('table');
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<EnhancedSpace | null>(null);

  const spaceTypes = [
    { value: 'campus_living', label: 'Campus Living', icon: '🏠', color: 'text-blue-400' },
    { value: 'fraternity_and_sorority', label: 'Greek Life', icon: '🏛️', color: 'text-purple-400' },
    { value: 'hive_exclusive', label: 'HIVE Exclusive', icon: '⚡', color: 'text-amber-400' },
    { value: 'student_organizations', label: 'Student Orgs', icon: '👥', color: 'text-green-400' },
    { value: 'university_organizations', label: 'University Orgs', icon: '🎓', color: 'text-red-400' },
  ];

  // Fetch Enhanced Space Data
  const fetchSpaces = useCallback(async () => {
    if (!admin) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/spaces', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${admin.id}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch spaces');
      }

      const data = await response.json();
      setSpaces(data.spaces || []);
      setStats(data.summary || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load spaces');
    } finally {
      setLoading(false);
    }
  }, [admin]);

  // Apply Filters and Search
  useEffect(() => {
    let filtered = [...spaces];

    // Text search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(space => 
        space.name.toLowerCase().includes(searchLower) ||
        space.description.toLowerCase().includes(searchLower)
      );
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(space => space.type === selectedType);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(space => space.status === selectedStatus);
    }

    // Health filter
    if (selectedHealth !== 'all') {
      filtered = filtered.filter(space => {
        switch (selectedHealth) {
          case 'healthy': return space.healthScore >= 70;
          case 'warning': return space.healthScore >= 40 && space.healthScore < 70;
          case 'critical': return space.healthScore < 40;
          default: return true;
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal: string | number, bVal: string | number;
      
      switch (sortBy) {
        case 'name':
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case 'members':
          aVal = a.actualMemberCount;
          bVal = b.actualMemberCount;
          break;
        case 'health':
          aVal = a.healthScore;
          bVal = b.healthScore;
          break;
        case 'updated':
        default:
          aVal = new Date(a.updatedAt || 0).getTime();
          bVal = new Date(b.updatedAt || 0).getTime();
          break;
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredSpaces(filtered);
  }, [spaces, searchTerm, selectedType, selectedStatus, selectedHealth, sortBy, sortOrder]);

  // Bulk Operations
  const executeBulkOperation = async (operation: BulkOperation) => {
    if (!admin || operation.spaceIds.length === 0) return;

    setLoading(true);
    try {
      const response = await fetch('/api/admin/spaces/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.id}`,
        },
        body: JSON.stringify(operation),
      });

      if (!response.ok) {
        throw new Error('Bulk operation failed');
      }

      // Refresh data
      await fetchSpaces();
      setSelectedSpaces(new Set());
      setShowBulkActions(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bulk operation failed');
    } finally {
      setLoading(false);
    }
  };

  // Space Action Handler
  const handleSpaceAction = async (action: string, spaceId: string, reason?: string) => {
    if (!admin) return;

    setLoading(true);
    try {
      const response = await fetch('/api/admin/spaces', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.id}`,
        },
        body: JSON.stringify({
          action,
          spaceId,
          spaceType: spaces.find(s => s.id === spaceId)?.type,
          reason: reason || `Admin ${action} action`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} space`);
      }

      await fetchSpaces();
      if (selectedSpace?.id === spaceId) {
        setSelectedSpace(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, [fetchSpaces]);

  // Helper Functions
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'activated': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'dormant': return <Clock className="h-4 w-4 text-gray-400" />;
      case 'frozen': return <XCircle className="h-4 w-4 text-red-400" />;
      case 'archived': return <Archive className="h-4 w-4 text-yellow-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 70) return 'text-green-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getHealthBadge = (score: number) => {
    if (score >= 70) return <Badge className="bg-green-500/20 text-green-400">Healthy</Badge>;
    if (score >= 40) return <Badge className="bg-yellow-500/20 text-yellow-400">Warning</Badge>;
    return <Badge className="bg-red-500/20 text-red-400">Critical</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* Header with Real-Time Stats */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Shield className="h-8 w-8 text-amber-400" />
              Space Control Center
            </h1>
            <p className="text-gray-400 mt-1">Complete administrative control over all campus spaces</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={fetchSpaces}
              disabled={loading}
              className="bg-amber-500 hover:bg-amber-600"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              onClick={() => setShowBulkActions(!showBulkActions)}
              variant="outline"
              className="border-amber-500/30 text-amber-400"
            >
              <Settings className="h-4 w-4 mr-2" />
              Bulk Actions
            </Button>
          </div>
        </div>

        {/* Real-Time Statistics Dashboard */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Card className="border-gray-700 bg-gray-900/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Globe className="h-8 w-8 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-400">Total Spaces</p>
                    <p className="text-2xl font-bold text-white">{stats.totalSpaces}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-700 bg-gray-900/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Zap className="h-8 w-8 text-green-400" />
                  <div>
                    <p className="text-sm text-gray-400">Active</p>
                    <p className="text-2xl font-bold text-green-400">{stats.activeSpaces}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-700 bg-gray-900/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Dormant</p>
                    <p className="text-2xl font-bold text-gray-400">{stats.dormantSpaces}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-700 bg-gray-900/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Total Members</p>
                    <p className="text-2xl font-bold text-purple-400">{stats.totalMembers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-700 bg-gray-900/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-8 w-8 text-amber-400" />
                  <div>
                    <p className="text-sm text-gray-400">Avg Members</p>
                    <p className="text-2xl font-bold text-amber-400">{stats.averageMembers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-700 bg-gray-900/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Target className="h-8 w-8 text-red-400" />
                  <div>
                    <p className="text-sm text-gray-400">Health Score</p>
                    <p className="text-2xl font-bold text-red-400">
                      {Math.round(filteredSpaces.reduce((sum, s) => sum + s.healthScore, 0) / filteredSpaces.length || 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Advanced Filters and Search */}
        <Card className="border-gray-700 bg-gray-900/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Advanced Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search spaces by name, description, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedType("all");
                    setSelectedStatus("all");
                    setSelectedHealth("all");
                  }}
                  variant="outline"
                  className="border-gray-600 text-gray-400"
                >
                  Clear
                </Button>
              </div>

              {/* Filter Controls */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="all">All Types</option>
                  {spaceTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="activated">✅ Activated</option>
                  <option value="dormant">⏸️ Dormant</option>
                  <option value="frozen">❄️ Frozen</option>
                  <option value="archived">📦 Archived</option>
                </select>

                <select
                  value={selectedHealth}
                  onChange={(e) => setSelectedHealth(e.target.value)}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="all">All Health</option>
                  <option value="healthy">🟢 Healthy (70+)</option>
                  <option value="warning">🟡 Warning (40-69)</option>
                  <option value="critical">🔴 Critical (&lt;40)</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="updated">Last Updated</option>
                  <option value="name">Name</option>
                  <option value="members">Member Count</option>
                  <option value="health">Health Score</option>
                </select>

                <Button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  variant="outline"
                  className="border-gray-600 text-gray-400"
                >
                  {sortOrder === 'asc' ? '↑' : '↓'} {sortOrder.toUpperCase()}
                </Button>
              </div>

              {/* View Mode Toggles */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    onClick={() => setViewMode('table')}
                    size="sm"
                    variant={viewMode === 'table' ? 'default' : 'outline'}
                    className={viewMode === 'table' ? 'bg-amber-500' : 'border-gray-600 text-gray-400'}
                  >
                    Table
                  </Button>
                  <Button
                    onClick={() => setViewMode('grid')}
                    size="sm"
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    className={viewMode === 'grid' ? 'bg-amber-500' : 'border-gray-600 text-gray-400'}
                  >
                    Grid
                  </Button>
                  <Button
                    onClick={() => setViewMode('analytics')}
                    size="sm"
                    variant={viewMode === 'analytics' ? 'default' : 'outline'}
                    className={viewMode === 'analytics' ? 'bg-amber-500' : 'border-gray-600 text-gray-400'}
                  >
                    Analytics
                  </Button>
                </div>
                <div className="text-sm text-gray-400">
                  Showing {filteredSpaces.length} of {spaces.length} spaces
                  {selectedSpaces.size > 0 && ` (${selectedSpaces.size} selected)`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions Panel */}
        {showBulkActions && selectedSpaces.size > 0 && (
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardHeader>
              <CardTitle className="text-amber-400 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Bulk Actions ({selectedSpaces.size} spaces selected)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => executeBulkOperation({
                    action: 'activate',
                    spaceIds: Array.from(selectedSpaces)
                  })}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Activate All
                </Button>
                <Button
                  onClick={() => executeBulkOperation({
                    action: 'deactivate',
                    spaceIds: Array.from(selectedSpaces)
                  })}
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-gray-400"
                >
                  <Pause className="h-4 w-4 mr-2" />
                  Deactivate All
                </Button>
                <Button
                  onClick={() => executeBulkOperation({
                    action: 'archive',
                    spaceIds: Array.from(selectedSpaces)
                  })}
                  size="sm"
                  variant="outline"
                  className="border-yellow-600 text-yellow-400"
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Archive All
                </Button>
                <Button
                  onClick={() => setSelectedSpaces(new Set())}
                  size="sm"
                  variant="outline"
                  className="border-red-600 text-red-400"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Clear Selection
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <Card className="border-red-500/30 bg-red-500/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <span className="text-red-400">{error}</span>
                <Button
                  onClick={() => setError(null)}
                  size="sm"
                  variant="ghost"
                  className="text-red-400 hover:text-red-300"
                >
                  Dismiss
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Spaces Display - Table View */}
        {viewMode === 'table' && (
          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-white">
                Spaces Management Table
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-3 text-gray-400">
                        <input
                          type="checkbox"
                          checked={filteredSpaces.length > 0 && selectedSpaces.size === filteredSpaces.length}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSpaces(new Set(filteredSpaces.map(s => s.id)));
                            } else {
                              setSelectedSpaces(new Set());
                            }
                          }}
                          className="rounded"
                        />
                      </th>
                      <th className="text-left p-3 text-gray-400">Space</th>
                      <th className="text-left p-3 text-gray-400">Type</th>
                      <th className="text-left p-3 text-gray-400">Status</th>
                      <th className="text-left p-3 text-gray-400">Members</th>
                      <th className="text-left p-3 text-gray-400">Health</th>
                      <th className="text-left p-3 text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSpaces.map((space) => (
                      <tr key={space.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={selectedSpaces.has(space.id)}
                            onChange={(e) => {
                              const newSelected = new Set(selectedSpaces);
                              if (e.target.checked) {
                                newSelected.add(space.id);
                              } else {
                                newSelected.delete(space.id);
                              }
                              setSelectedSpaces(newSelected);
                            }}
                            className="rounded"
                          />
                        </td>
                        <td className="p-3">
                          <div>
                            <div className="font-semibold text-white">{space.name}</div>
                            <div className="text-sm text-gray-400 truncate max-w-xs">
                              {space.description}
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {spaceTypes.find(t => t.value === space.type)?.icon}
                            </span>
                            <span className={spaceTypes.find(t => t.value === space.type)?.color}>
                              {spaceTypes.find(t => t.value === space.type)?.label}
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(space.status)}
                            <span className="text-white capitalize">{space.status}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div>
                            <div className="text-white">{space.actualMemberCount}</div>
                            <div className="text-xs text-gray-400">
                              {space.builderCount} builders
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold ${getHealthColor(space.healthScore)}`}>
                              {space.healthScore}
                            </span>
                            {getHealthBadge(space.healthScore)}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedSpace(space)}
                              className="border-gray-600 text-gray-400"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            {space.status === 'activated' ? (
                              <Button
                                size="sm"
                                onClick={() => handleSpaceAction('deactivate', space.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                <Pause className="h-3 w-3" />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => handleSpaceAction('activate', space.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Play className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <Card className="border-gray-700 bg-gray-900/50">
            <CardContent className="p-8 text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-amber-400 mx-auto mb-4" />
              <p className="text-gray-400">Loading spaces data...</p>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!loading && filteredSpaces.length === 0 && (
          <Card className="border-gray-700 bg-gray-900/50">
            <CardContent className="p-8 text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No Spaces Found</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm || selectedType !== 'all' || selectedStatus !== 'all' 
                  ? 'Try adjusting your search criteria or filters.'
                  : 'No spaces have been created yet.'}
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedType("all");
                  setSelectedStatus("all");
                  setSelectedHealth("all");
                }}
                className="bg-amber-500 hover:bg-amber-600"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Space Detail Modal */}
        {selectedSpace && (
          <Card className="border-amber-500/30 bg-gray-900/95 fixed inset-4 z-50 overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-3">
                  <span className="text-2xl">
                    {spaceTypes.find(t => t.value === selectedSpace.type)?.icon}
                  </span>
                  {selectedSpace.name}
                </CardTitle>
                <Button
                  onClick={() => setSelectedSpace(null)}
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                >
                  <XCircle className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Space Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">ID:</span>
                      <span className="text-white font-mono">{selectedSpace.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className={spaceTypes.find(t => t.value === selectedSpace.type)?.color}>
                        {spaceTypes.find(t => t.value === selectedSpace.type)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(selectedSpace.status)}
                        <span className="text-white capitalize">{selectedSpace.status}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Created:</span>
                      <span className="text-white">
                        {new Date(selectedSpace.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Updated:</span>
                      <span className="text-white">
                        {new Date(selectedSpace.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Community Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Members:</span>
                      <span className="text-white">{selectedSpace.actualMemberCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Builders:</span>
                      <span className="text-green-400">{selectedSpace.builderCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Admins:</span>
                      <span className="text-purple-400">{selectedSpace.adminCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Health Score:</span>
                      <span className={getHealthColor(selectedSpace.healthScore)}>
                        {selectedSpace.healthScore}/100
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Has Builders:</span>
                      <span className={selectedSpace.hasBuilders ? 'text-green-400' : 'text-gray-400'}>
                        {selectedSpace.hasBuilders ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Surface Configuration</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(selectedSpace.surfaces).map(([surface, enabled]) => (
                      <div key={surface} className="flex justify-between">
                        <span className="text-gray-400 capitalize flex items-center gap-2">
                          {surface === 'posts' && <MessageSquare className="h-3 w-3" />}
                          {surface === 'events' && <Calendar className="h-3 w-3" />}
                          {surface === 'tools' && <Wrench className="h-3 w-3" />}
                          {surface === 'members' && <Users className="h-3 w-3" />}
                          {surface}:
                        </span>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${enabled ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                          <span className={enabled ? 'text-green-400' : 'text-gray-400'}>
                            {enabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold text-white mb-3">Description</h4>
                <p className="text-gray-300 bg-gray-800/50 p-3 rounded-lg">
                  {selectedSpace.description || 'No description provided.'}
                </p>
              </div>

              {/* Recent Members */}
              {selectedSpace.members.length > 0 && (
                <div>
                  <h4 className="font-semibold text-white mb-3">Recent Members</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedSpace.members.map((member, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-800/50 p-2 rounded">
                        <span className="text-white">{member.id}</span>
                        <div className="flex items-center gap-2">
                          <Badge 
                            className={
                              member.role === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                              member.role === 'builder' ? 'bg-green-500/20 text-green-400' :
                              'bg-gray-500/20 text-gray-400'
                            }
                          >
                            {member.role}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            {new Date(member.joinedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Admin Actions */}
              <div className="border-t border-gray-700 pt-6">
                <h4 className="font-semibold text-white mb-3">Administrative Actions</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedSpace.status === 'activated' ? (
                    <Button
                      onClick={() => handleSpaceAction('deactivate', selectedSpace.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      Deactivate Space
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleSpaceAction('activate', selectedSpace.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Activate Space
                    </Button>
                  )}
                  
                  <Button
                    onClick={() => handleSpaceAction('freeze', selectedSpace.id)}
                    variant="outline"
                    className="border-yellow-600 text-yellow-400 hover:bg-yellow-600/10"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Freeze Space
                  </Button>

                  <Button
                    onClick={() => handleSpaceAction('archive', selectedSpace.id)}
                    variant="outline"
                    className="border-gray-600 text-gray-400 hover:bg-gray-600/10"
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Archive Space
                  </Button>

                  <Button
                    onClick={() => handleSpaceAction('reset', selectedSpace.id)}
                    variant="outline"
                    className="border-blue-600 text-blue-400 hover:bg-blue-600/10"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Space
                  </Button>

                  <Button
                    onClick={() => {
                      // TODO: Implement edit functionality
                      console.log('Edit space:', selectedSpace.id);
                    }}
                    variant="outline"
                    className="border-amber-600 text-amber-400 hover:bg-amber-600/10"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
