"use client";

import { useState, useEffect } from "react";
import { Button as Button, HiveCard as Card, CardContent, CardHeader, CardTitle, Badge } from "@hive/ui";
import { useAdminAuth } from "@/lib/auth";

interface FlaggedContent {
  id: string;
  type: 'post' | 'comment' | 'tool' | 'space' | 'user';
  content: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  spaceId?: string;
  spaceName?: string;
  flaggedAt: string;
  flaggedBy: string;
  flagReason: string;
  flagCount: number;
  status: 'pending' | 'approved' | 'removed' | 'warning_sent';
  reviewedAt?: string;
  reviewedBy?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface ContentFilter {
  type: string;
  status: string;
  severity: string;
  dateRange: string;
}

export function ContentModerationDashboard() {
  const { admin } = useAdminAuth();
  const [flaggedContent, setFlaggedContent] = useState<FlaggedContent[]>([]);
  const [selectedContent, setSelectedContent] = useState<FlaggedContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ContentFilter>({
    type: 'all',
    status: 'pending',
    severity: 'all',
    dateRange: 'today'
  });

  const fetchFlaggedContent = async () => {
    if (!admin) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/content-moderation', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${admin.id}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch flagged content');
      }

      const data = await response.json();
      setFlaggedContent(data.flaggedContent || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load flagged content');
    } finally {
      setLoading(false);
    }
  };

  const handleModerationAction = async (contentId: string, action: string, reason?: string) => {
    if (!admin) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/content-moderation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.id}`,
        },
        body: JSON.stringify({
          contentId,
          action,
          reason,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} content`);
      }

      // Refresh flagged content
      await fetchFlaggedContent();
      
      if (selectedContent?.id === contentId) {
        setSelectedContent(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Moderation action failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlaggedContent();
    // Auto-refresh every 2 minutes
    const interval = setInterval(fetchFlaggedContent, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, [admin]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500';
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500';
      case 'low': return 'text-green-500 bg-green-500/10 border-green-500';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'approved': return 'text-green-400 bg-green-400/10';
      case 'removed': return 'text-red-400 bg-red-400/10';
      case 'warning_sent': return 'text-orange-400 bg-orange-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const filteredContent = flaggedContent.filter(item => {
    if (filters.type !== 'all' && item.type !== filters.type) return false;
    if (filters.status !== 'all' && item.status !== filters.status) return false;
    if (filters.severity !== 'all' && item.severity !== filters.severity) return false;
    return true;
  });

  const pendingCount = flaggedContent.filter(item => item.status === 'pending').length;
  const criticalCount = flaggedContent.filter(item => item.severity === 'critical').length;

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Content Moderation</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-yellow-400">
                {pendingCount} pending
              </Badge>
              {criticalCount > 0 && (
                <Badge variant="destructive">
                  {criticalCount} critical
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">All Types</option>
              <option value="post">Posts</option>
              <option value="comment">Comments</option>
              <option value="tool">Tools</option>
              <option value="space">Spaces</option>
              <option value="user">Users</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="removed">Removed</option>
              <option value="warning_sent">Warning Sent</option>
            </select>

            <select
              value={filters.severity}
              onChange={(e) => setFilters({...filters, severity: e.target.value})}
              className="rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <Button
              onClick={fetchFlaggedContent}
              disabled={loading}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Flagged Content List */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardHeader>
          <CardTitle className="text-white">
            Flagged Content ({filteredContent.length} items)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {filteredContent.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No flagged content found
            </div>
          ) : (
            <div className="space-y-4">
              {filteredContent.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-lg border p-4 ${
                    item.severity === 'critical' 
                      ? 'border-red-500 bg-red-900/20' 
                      : 'border-gray-700 bg-gray-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className={getSeverityColor(item.severity)}>
                          {item.severity}
                        </Badge>
                        <Badge variant="outline" className="text-blue-400">
                          {item.type}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                        <span className="text-sm text-gray-400">
                          {item.flagCount} flags
                        </span>
                      </div>
                      
                      <div className="mb-2">
                        <p className="text-sm font-medium text-gray-300">Author:</p>
                        <p className="text-sm text-gray-400">
                          {item.authorName} ({item.authorEmail})
                        </p>
                      </div>

                      {item.spaceName && (
                        <div className="mb-2">
                          <p className="text-sm font-medium text-gray-300">Space:</p>
                          <p className="text-sm text-gray-400">{item.spaceName}</p>
                        </div>
                      )}

                      <div className="mb-2">
                        <p className="text-sm font-medium text-gray-300">Flag Reason:</p>
                        <p className="text-sm text-gray-400">{item.flagReason}</p>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-300">Content:</p>
                        <p className="text-sm text-gray-400 bg-gray-900 p-2 rounded max-w-2xl">
                          {item.content.length > 200 
                            ? `${item.content.substring(0, 200)}...` 
                            : item.content
                          }
                        </p>
                      </div>

                      <p className="text-xs text-gray-500">
                        Flagged {getTimeAgo(item.flaggedAt)}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedContent(item)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        View Details
                      </Button>
                      
                      {item.status === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleModerationAction(item.id, 'approve')}
                            disabled={loading}
                            className="border-green-600 text-green-400 hover:bg-green-600/10"
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleModerationAction(item.id, 'remove')}
                            disabled={loading}
                            className="border-red-600 text-red-400 hover:bg-red-600/10"
                          >
                            Remove
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleModerationAction(item.id, 'warning')}
                            disabled={loading}
                            className="border-yellow-600 text-yellow-400 hover:bg-yellow-600/10"
                          >
                            Warning
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Content Details Modal */}
      {selectedContent && (
        <Card className="border-gray-700 bg-gray-900/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Content Details</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedContent(null)}
                className="text-gray-400 hover:text-white"
              >
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-300">Content Type</p>
                  <p className="text-white">{selectedContent.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">Severity</p>
                  <Badge className={getSeverityColor(selectedContent.severity)}>
                    {selectedContent.severity}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">Status</p>
                  <Badge className={getStatusColor(selectedContent.status)}>
                    {selectedContent.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">Flag Count</p>
                  <p className="text-white">{selectedContent.flagCount}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Full Content</p>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-300">{selectedContent.content}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-300">Author</p>
                  <p className="text-white">{selectedContent.authorName}</p>
                  <p className="text-sm text-gray-400">{selectedContent.authorEmail}</p>
                </div>
                {selectedContent.spaceName && (
                  <div>
                    <p className="text-sm font-medium text-gray-300">Space</p>
                    <p className="text-white">{selectedContent.spaceName}</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-300">Flag Reason</p>
                <p className="text-white">{selectedContent.flagReason}</p>
              </div>

              {selectedContent.status === 'pending' && (
                <div className="pt-4 border-t border-gray-700">
                  <h4 className="font-semibold text-white mb-3">Moderation Actions</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => handleModerationAction(selectedContent.id, 'approve')}
                      disabled={loading}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Approve Content
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleModerationAction(selectedContent.id, 'remove')}
                      disabled={loading}
                      className="border-red-600 text-red-400 hover:bg-red-600/10"
                    >
                      Remove Content
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleModerationAction(selectedContent.id, 'warning')}
                      disabled={loading}
                      className="border-yellow-600 text-yellow-400 hover:bg-yellow-600/10"
                    >
                      Send Warning
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
