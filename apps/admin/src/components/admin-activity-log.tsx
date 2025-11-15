"use client";

import { useState, useEffect } from "react";
import { Button as Button, HiveCard as Card, CardContent, CardHeader, CardTitle, Badge } from "@hive/ui";
import { useAdminAuth } from "@/lib/auth";
import { AdminActivityLog, ActivityLogStats, AdminAction } from "@/lib/admin-activity-logger";

export function AdminActivityLogDashboard() {
  const { admin } = useAdminAuth();
  const [logs, setLogs] = useState<AdminActivityLog[]>([]);
  const [stats, setStats] = useState<ActivityLogStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    adminId: '',
    action: '',
    dateFrom: '',
    dateTo: '',
    success: '',
    limit: 100,
  });

  const fetchActivityLogs = async () => {
    if (!admin) return;

    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });

      const response = await fetch(`/api/admin/activity-logs?${queryParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${admin.id}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch activity logs');
      }

      const data = await response.json();
      setLogs(data.logs || []);
      setStats(data.stats || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load activity logs');
    } finally {
      setLoading(false);
    }
  };

  const exportLogs = async () => {
    if (!admin) return;

    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });

      const response = await fetch(`/api/admin/activity-logs/export?${queryParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${admin.id}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to export logs');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `admin-activity-logs-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export logs');
    }
  };

  const cleanupOldLogs = async () => {
    if (!admin) return;

    if (!confirm('Are you sure you want to delete logs older than 90 days?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/admin/activity-logs', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.id}`,
        },
        body: JSON.stringify({ daysOld: 90 }),
      });

      if (!response.ok) {
        throw new Error('Failed to cleanup logs');
      }

      const data = await response.json();
      alert(`Cleaned up ${data.deletedCount} old logs`);
      await fetchActivityLogs();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cleanup logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivityLogs();
  }, [admin]);

  const getActionColor = (action: AdminAction) => {
    if (action.includes('approve') || action.includes('login')) return 'text-green-400';
    if (action.includes('reject') || action.includes('suspend') || action.includes('remove')) return 'text-red-400';
    if (action.includes('create') || action.includes('grant')) return 'text-blue-400';
    return 'text-gray-400';
  };

  const getTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-gray-700 bg-gray-900/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-gray-400">Total Actions</p>
                <p className="text-2xl font-bold text-white">{stats.totalActions}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-700 bg-gray-900/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-gray-400">Success Rate</p>
                <p className="text-2xl font-bold text-green-400">
                  {stats.totalActions > 0 ? Math.round((stats.successfulActions / stats.totalActions) * 100) : 0}%
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-700 bg-gray-900/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-gray-400">Failed Actions</p>
                <p className="text-2xl font-bold text-red-400">{stats.failedActions}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-700 bg-gray-900/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-gray-400">Active Admins</p>
                <p className="text-2xl font-bold text-blue-400">{stats.uniqueAdmins}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardHeader>
          <CardTitle className="text-white">Activity Log Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <select
              value={filters.action}
              onChange={(e) => setFilters({ ...filters, action: e.target.value })}
              className="rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="">All Actions</option>
              <option value="login">Login</option>
              <option value="user_suspend">User Suspend</option>
              <option value="user_role_grant">Role Grant</option>
              <option value="space_activate">Space Activate</option>
              <option value="content_approve">Content Approve</option>
              <option value="builder_request_approve">Builder Approve</option>
            </select>

            <select
              value={filters.success}
              onChange={(e) => setFilters({ ...filters, success: e.target.value })}
              className="rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="">All Results</option>
              <option value="true">Success</option>
              <option value="false">Failed</option>
            </select>

            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              className="rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />

            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              className="rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />

            <div className="flex gap-2">
              <Button
                onClick={fetchActivityLogs}
                disabled={loading}
                className="bg-amber-500 hover:bg-amber-600"
              >
                {loading ? 'Loading...' : 'Filter'}
              </Button>
              <Button
                onClick={exportLogs}
                variant="outline"
                className="border-green-600 text-green-400 hover:bg-green-600/10"
              >
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Logs */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Activity Logs ({logs.length})</CardTitle>
            <Button
              onClick={cleanupOldLogs}
              variant="outline"
              size="sm"
              className="border-red-600 text-red-400 hover:bg-red-600/10"
            >
              Cleanup Old Logs
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                No activity logs found
              </div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      log.success ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${getActionColor(log.action)}`}>
                          {log.action.replace(/_/g, ' ')}
                        </span>
                        {log.resource && (
                          <Badge variant="outline" className="text-xs">
                            {log.resource}
                          </Badge>
                        )}
                        {!log.success && (
                          <Badge variant="destructive" className="text-xs">
                            Failed
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{log.adminEmail}</span>
                        <span>{getTimeAgo(log.timestamp)}</span>
                        {log.resourceId && (
                          <span className="font-mono text-xs">ID: {log.resourceId}</span>
                        )}
                      </div>
                      {log.errorMessage && (
                        <p className="text-sm text-red-400 mt-1">{log.errorMessage}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </p>
                    {log.ipAddress && (
                      <p className="text-xs text-gray-500 font-mono">
                        {log.ipAddress}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Top Actions */}
      {stats && stats.mostCommonActions.length > 0 && (
        <Card className="border-gray-700 bg-gray-900/50">
          <CardHeader>
            <CardTitle className="text-white">Most Common Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.mostCommonActions.map((item, index) => (
                <div key={item.action} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-amber-500 text-black rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-white">{item.action.replace(/_/g, ' ')}</span>
                  </div>
                  <span className="text-gray-400">{item.count} times</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
