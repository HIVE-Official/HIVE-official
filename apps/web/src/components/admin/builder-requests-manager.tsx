'use client';

import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  Badge, 
  Button,
  Alert,
  AlertDescription
} from '@hive/ui';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Building, 
  Calendar,
  AlertTriangle,
  Mail,
  Shield,
  MessageSquare
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface BuilderRequest {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  userMajor?: string;
  userYear?: string;
  spaceId: string;
  spaceName: string;
  spaceType: string;
  requestType: 'leader' | 'builder' | 'moderator';
  reason: string;
  experience?: string;
  qualifications?: string[];
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  reviewNotes?: string;
  urgency: 'normal' | 'high' | 'urgent';
}

interface BuilderRequestsManagerProps {
  isAdmin: boolean;
}

export function BuilderRequestsManager({ isAdmin }: BuilderRequestsManagerProps) {
  const [requests, setRequests] = useState<BuilderRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [processing, setProcessing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reviewModal, setReviewModal] = useState<BuilderRequest | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  useEffect(() => {
    loadRequests();
  }, [filter]);

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/admin/builder-requests?status=${filter}`);
      if (!response.ok) {
        throw new Error('Failed to load builder requests');
      }
      
      const data = await response.json();
      setRequests(data.requests || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const processRequest = async (requestId: string, action: 'approve' | 'reject') => {
    try {
      setProcessing(requestId);
      setError(null);
      
      const response = await fetch(`/api/admin/builder-requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: action === 'approve' ? 'approved' : 'rejected',
          reviewNotes: reviewNotes || `Request ${action}d by admin`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} request`);
      }

      // Update local state
      setRequests(prev =>
        prev.map(req =>
          req.id === requestId
            ? {
                ...req,
                status: action === 'approve' ? 'approved' : 'rejected',
                reviewedAt: new Date(),
                reviewNotes: reviewNotes || `Request ${action}d by admin`,
              }
            : req
        )
      );

      // Close review modal
      setReviewModal(null);
      setReviewNotes('');
      
      // Reload requests
      await loadRequests();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setProcessing(null);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return 'text-red-600 bg-red-50';
      case 'high':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-green-600 bg-green-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (!isAdmin) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          You don't have permission to manage builder requests.
        </AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Builder Requests</h2>
          <p className="text-muted-foreground">
            Manage student leader and builder role requests
          </p>
        </div>
        <Button onClick={loadRequests} variant="outline">
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
          <Button
            key={status}
            variant={filter === status ? 'default' : 'outline'}
            onClick={() => setFilter(status)}
            size="sm"
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status === 'pending' && requests.filter(r => r.status === 'pending').length > 0 && (
              <Badge className="ml-2" variant="secondary">
                {requests.filter(r => r.status === 'pending').length}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Requests List */}
      <div className="grid gap-4">
        {requests.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <div className="text-center text-muted-foreground">
                No {filter !== 'all' ? filter : ''} requests found
              </div>
            </CardContent>
          </Card>
        ) : (
          requests.map((request) => (
            <Card key={request.id} className="border-l-4 border-l-blue-500">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-4">
                    {/* Request Header */}
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <h3 className="font-semibold text-lg">
                        {request.requestType.charAt(0).toUpperCase() + request.requestType.slice(1)} Request
                      </h3>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                      {request.urgency !== 'normal' && (
                        <Badge className={getUrgencyColor(request.urgency)}>
                          {request.urgency}
                        </Badge>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{request.userName}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{request.userEmail}</span>
                        </div>
                        {request.userMajor && (
                          <div className="text-sm text-muted-foreground">
                            {request.userMajor} • {request.userYear}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{request.spaceName}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Type: {request.spaceType.replace(/_/g, ' ')}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Submitted {formatDistanceToNow(new Date(request.submittedAt), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Request Reason */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Reason for Request:</span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-6">
                        {request.reason}
                      </p>
                    </div>

                    {/* Experience if provided */}
                    {request.experience && (
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Experience:</span>
                        <p className="text-sm text-muted-foreground">
                          {request.experience}
                        </p>
                      </div>
                    )}

                    {/* Qualifications if provided */}
                    {request.qualifications && request.qualifications.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Qualifications:</span>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {request.qualifications.map((qual, idx) => (
                            <li key={idx}>{qual}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Review Info */}
                    {request.status !== 'pending' && request.reviewedAt && (
                      <div className="pt-2 border-t">
                        <div className="text-sm text-muted-foreground">
                          {request.status === 'approved' ? 'Approved' : 'Rejected'} by {request.reviewedBy || 'admin'}{' '}
                          {formatDistanceToNow(new Date(request.reviewedAt), { addSuffix: true })}
                        </div>
                        {request.reviewNotes && (
                          <div className="mt-1 text-sm text-muted-foreground">
                            Notes: {request.reviewNotes}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {request.status === 'pending' && (
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => setReviewModal(request)}
                        disabled={processing === request.id}
                      >
                        Review
                      </Button>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:bg-green-50"
                          onClick={() => processRequest(request.id, 'approve')}
                          disabled={processing === request.id}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => processRequest(request.id, 'reject')}
                          disabled={processing === request.id}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <CardTitle>Review Builder Request</CardTitle>
              <CardDescription>
                Review request from {reviewModal.userName} for {reviewModal.spaceName}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Review Notes</label>
                <textarea
                  className="w-full mt-1 p-2 border rounded-md"
                  rows={4}
                  placeholder="Add notes about your decision..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setReviewModal(null);
                    setReviewNotes('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => processRequest(reviewModal.id, 'reject')}
                  disabled={!!processing}
                >
                  Reject
                </Button>
                <Button
                  variant="default"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => processRequest(reviewModal.id, 'approve')}
                  disabled={!!processing}
                >
                  Approve
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}