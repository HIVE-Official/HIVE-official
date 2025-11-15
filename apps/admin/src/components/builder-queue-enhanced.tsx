"use client";

import { useState, useEffect } from "react";
import { Button as Button, Badge } from "@hive/ui";
import { useAdminAuth } from "@/lib/auth";

interface BuilderRequest {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  spaceId: string;
  spaceName: string;
  reason: string;
  experience: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  urgency: 'normal' | 'urgent';
}

export function BuilderQueueEnhanced() {
  const { admin } = useAdminAuth();
  const [requests, setRequests] = useState<BuilderRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    if (!admin) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/builder-requests', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${admin.id}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch builder requests');
      }

      const data = await response.json();
      setRequests(data.requests || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (requestId: string, action: 'approve' | 'reject') => {
    if (!admin) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/builder-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.id}`,
        },
        body: JSON.stringify({
          requestId,
          action,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} request`);
      }

      // Refresh requests after action
      await fetchRequests();
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${action} request`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchRequests, 30000);
    return () => clearInterval(interval);
  }, [admin]);

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    }
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  if (loading && requests.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-400">Loading builder requests...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="text-red-400">Error: {error}</div>
        <Button onClick={fetchRequests} variant="outline" size="sm">
          Retry
        </Button>
      </div>
    );
  }

  const pendingRequests = requests.filter(req => req.status === 'pending');
  const urgentRequests = pendingRequests.filter(req => req.urgency === 'urgent');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-white">Builder Queue</h3>
          <Badge variant="outline">
            {pendingRequests.length} pending
          </Badge>
          {urgentRequests.length > 0 && (
            <Badge variant="destructive">
              {urgentRequests.length} urgent
            </Badge>
          )}
        </div>
        <Button
          onClick={fetchRequests}
          disabled={loading}
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {pendingRequests.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No pending builder requests
        </div>
      ) : (
        <div className="space-y-4">
          {pendingRequests.map((request) => (
            <div
              key={request.id}
              className={`rounded-lg border p-4 ${
                request.urgency === 'urgent' 
                  ? 'border-red-500 bg-red-900/20' 
                  : 'border-gray-700 bg-gray-800'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-white">{request.userName}</h3>
                    {request.urgency === 'urgent' && (
                      <Badge variant="destructive" className="text-xs">
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-1">{request.userEmail}</p>
                  <p className="text-sm text-gray-300 mb-2">
                    Space: <span className="font-medium">{request.spaceName}</span>
                  </p>
                  <div className="mb-2">
                    <p className="text-sm font-medium text-gray-300">Reason:</p>
                    <p className="text-sm text-gray-400">{request.reason}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-300">Experience:</p>
                    <p className="text-sm text-gray-400">{request.experience}</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Submitted {getTimeAgo(request.submittedAt)}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRequest(request.id, 'reject')}
                    disabled={loading}
                    className="border-red-600 text-red-400 hover:bg-red-600/10"
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleRequest(request.id, 'approve')}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
