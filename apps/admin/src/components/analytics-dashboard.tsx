"use client";

import { useState, useEffect } from "react";
import { HiveCard as Card, CardContent, CardHeader, CardTitle, Badge } from "@hive/ui";
import { useAdminAuth } from "@/lib/auth";

interface PlatformStats {
  users: {
    total: number;
    active: number;
    inactive: number;
    byMajor: Record<string, number>;
    byYear: Record<string, number>;
    growth: {
      lastWeek: number;
      lastMonth: number;
    };
  };
  spaces: {
    total: number;
    active: number;
    dormant: number;
    byType: Record<string, {
      total: number;
      active: number;
      dormant: number;
      members: number;
    }>;
    hasBuilders: number;
    totalMembers: number;
    averageMembers: number;
    activationRate: number;
  };
  builderRequests: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    urgent: number;
    approvalRate: number;
    averageResponseTime: number;
  };
  system: {
    status: string;
    uptime: number;
    memory: {
      rss: number;
      heapTotal: number;
      heapUsed: number;
      external: number;
    };
    collections: {
      users: number;
      spaces: number;
      builderRequests: number;
    };
    lastUpdated: string;
  };
}

export function AnalyticsDashboard() {
  const { admin } = useAdminAuth();
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStats = async () => {
    if (!admin) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/dashboard', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${admin.id}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const data = await response.json();
      setStats(data.statistics);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [admin]);

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const formatMemory = (bytes: number) => {
    return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
  };

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-400">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-400">No analytics data available</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Platform Analytics</h2>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-gray-400">
            Last updated: {lastUpdated?.toLocaleTimeString()}
          </Badge>
          <button
            onClick={fetchStats}
            disabled={loading}
            className="text-sm text-amber-400 hover:text-amber-300 disabled:opacity-50"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-white">{stats.users.total}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-400">Active</p>
                <p className="text-lg text-green-400">{stats.users.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Spaces</p>
                <p className="text-2xl font-bold text-white">{stats.spaces.total}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-400">Active</p>
                <p className="text-lg text-blue-400">{stats.spaces.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Builder Requests</p>
                <p className="text-2xl font-bold text-white">{stats.builderRequests.total}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-yellow-400">Pending</p>
                <p className="text-lg text-yellow-400">{stats.builderRequests.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">System Status</p>
                <Badge variant={stats.system.status === 'healthy' ? 'secondary' : 'destructive'}>
                  {stats.system.status}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Uptime</p>
                <p className="text-sm text-white">{formatUptime(stats.system.uptime)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Analytics */}
        <Card className="border-gray-700 bg-gray-900/50">
          <CardHeader>
            <CardTitle className="text-white">User Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Active Users</span>
                <span className="text-green-400">{stats.users.active}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Inactive Users</span>
                <span className="text-red-400">{stats.users.inactive}</span>
              </div>
              <div className="pt-2 border-t border-gray-700">
                <h4 className="text-sm font-semibold text-white mb-2">Top Majors</h4>
                <div className="space-y-1">
                  {Object.entries(stats.users.byMajor).slice(0, 5).map(([major, count]) => (
                    <div key={major} className="flex justify-between text-sm">
                      <span className="text-gray-400">{major}</span>
                      <span className="text-white">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Space Analytics */}
        <Card className="border-gray-700 bg-gray-900/50">
          <CardHeader>
            <CardTitle className="text-white">Space Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Activation Rate</span>
                <span className="text-blue-400">{stats.spaces.activationRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Average Members</span>
                <span className="text-white">{stats.spaces.averageMembers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Members</span>
                <span className="text-white">{stats.spaces.totalMembers}</span>
              </div>
              <div className="pt-2 border-t border-gray-700">
                <h4 className="text-sm font-semibold text-white mb-2">By Type</h4>
                <div className="space-y-1">
                  {Object.entries(stats.spaces.byType).map(([type, data]) => (
                    <div key={type} className="flex justify-between text-sm">
                      <span className="text-gray-400">{type.replace(/_/g, ' ')}</span>
                      <span className="text-white">{data.active}/{data.total}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Builder Requests */}
        <Card className="border-gray-700 bg-gray-900/50">
          <CardHeader>
            <CardTitle className="text-white">Builder Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Approval Rate</span>
                <span className="text-green-400">{stats.builderRequests.approvalRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Avg Response Time</span>
                <span className="text-white">{stats.builderRequests.averageResponseTime}h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Urgent Requests</span>
                <span className="text-red-400">{stats.builderRequests.urgent}</span>
              </div>
              <div className="pt-2 border-t border-gray-700">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-400">Pending</p>
                    <p className="text-lg text-yellow-400">{stats.builderRequests.pending}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Approved</p>
                    <p className="text-lg text-green-400">{stats.builderRequests.approved}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Rejected</p>
                    <p className="text-lg text-red-400">{stats.builderRequests.rejected}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="border-gray-700 bg-gray-900/50">
          <CardHeader>
            <CardTitle className="text-white">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status</span>
                <Badge variant={stats.system.status === 'healthy' ? 'secondary' : 'destructive'}>
                  {stats.system.status}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Memory Usage</span>
                <span className="text-white">{formatMemory(stats.system.memory.heapUsed)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Memory</span>
                <span className="text-white">{formatMemory(stats.system.memory.heapTotal)}</span>
              </div>
              <div className="pt-2 border-t border-gray-700">
                <h4 className="text-sm font-semibold text-white mb-2">Collections</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Users</span>
                    <span className="text-white">{stats.system.collections.users}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Spaces</span>
                    <span className="text-white">{stats.system.collections.spaces}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Builder Requests</span>
                    <span className="text-white">{stats.system.collections.builderRequests}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
