"use client";

import { useState, useEffect } from 'react';
import { Button } from '@hive/ui';
import { CheckCircle, XCircle, Eye, Clock } from 'lucide-react';

interface PendingPhoto {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  avatarUrl: string;
  uploadedAt: Date;
  moderationStatus: 'pending' | 'under_review';
  reportReason?: string;
}

export default function ModerationPage() {
  const [pendingPhotos, setPendingPhotos] = useState<PendingPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewingId, setReviewingId] = useState<string | null>(null);

  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulate loading pending photos
    setTimeout(() => {
      setPendingPhotos([
        {
          id: '1',
          userId: 'user1',
          userEmail: 'student@buffalo.edu',
          userName: 'John Doe',
          avatarUrl: 'https://via.placeholder.com/150',
          uploadedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          moderationStatus: 'pending'
        },
        {
          id: '2', 
          userId: 'user2',
          userEmail: 'jane@buffalo.edu',
          userName: 'Jane Smith',
          avatarUrl: 'https://via.placeholder.com/150',
          uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          moderationStatus: 'under_review'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleApprove = async (photoId: string) => {
    setReviewingId(photoId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setPendingPhotos(prev => prev.filter(photo => photo.id !== photoId));
    setReviewingId(null);
    
    // In real implementation, call API to approve photo
    console.log('Approved photo:', photoId);
  };

  const handleReject = async (photoId: string, reason: string = 'Violates community guidelines') => {
    setReviewingId(photoId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setPendingPhotos(prev => prev.filter(photo => photo.id !== photoId));
    setReviewingId(null);
    
    // In real implementation, call API to reject photo
    console.log('Rejected photo:', photoId, 'Reason:', reason);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted font-body">Loading moderation queue...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-semibold text-foreground">
                Photo Moderation
              </h1>
              <p className="text-muted font-body mt-1">
                Review and approve user profile photos
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted font-body">
                {pendingPhotos.length} pending review{pendingPhotos.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {pendingPhotos.length === 0 ? (
          <div className="text-center py-16">
            <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
            <h2 className="text-xl font-display font-medium text-foreground mb-2">
              All caught up!
            </h2>
            <p className="text-muted font-body">
              No photos pending moderation at the moment.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pendingPhotos.map((photo) => (
              <div
                key={photo.id}
                className="module-border module-surface module-padding space-y-4"
              >
                {/* Photo */}
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.avatarUrl}
                    alt={`${photo.userName}'s profile photo`}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      photo.moderationStatus === 'pending'
                        ? 'bg-accent/10 text-accent border border-accent/20'
                        : 'bg-surface-02 text-foreground border border-border'
                    }`}>
                      {photo.moderationStatus === 'pending' ? (
                        <Clock className="w-3 h-3" />
                      ) : (
                        <Eye className="w-3 h-3" />
                      )}
                      {photo.moderationStatus === 'pending' ? 'Pending' : 'In Review'}
                    </div>
                  </div>
                </div>

                {/* User Info */}
                <div className="space-y-2">
                  <div>
                    <h3 className="font-medium text-foreground font-body">
                      {photo.userName}
                    </h3>
                    <p className="text-sm text-muted font-body">
                      {photo.userEmail}
                    </p>
                  </div>
                  <div className="text-xs text-muted font-body">
                    Uploaded {formatTimeAgo(photo.uploadedAt)}
                  </div>
                </div>

                {/* Moderation Guidelines */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground font-body">
                    Review Criteria:
                  </h4>
                  <ul className="text-xs text-muted font-body space-y-1">
                    <li>• Clear face visibility</li>
                    <li>• Appropriate content</li>
                    <li>• Good lighting quality</li>
                    <li>• No offensive material</li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleApprove(photo.id)}
                    disabled={reviewingId === photo.id}
                    className="flex-1 bg-accent hover:bg-accent/90 text-background"
                  >
                    {reviewingId === photo.id ? (
                      <div className="animate-spin w-3 h-3 border border-white border-t-transparent rounded-full mr-2" />
                    ) : (
                      <CheckCircle className="w-3 h-3 mr-2" />
                    )}
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReject(photo.id)}
                    disabled={reviewingId === photo.id}
                    className="flex-1 border-muted text-muted hover:bg-surface-02 hover:animate-pulse"
                  >
                    <XCircle className="w-3 h-3 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}