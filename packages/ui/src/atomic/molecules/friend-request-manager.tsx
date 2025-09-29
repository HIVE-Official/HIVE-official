"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
  Send,
  Clock,
  Check,
  X,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../atoms/button';
import { Avatar } from '../atoms/avatar';
import { Badge } from '../atoms/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../atoms/tabs';

/**
 * SPEC-Compliant Friend Request Manager
 * Per SPEC.md:
 * - Two-layer social graph visualization
 * - Campus-isolated friend system
 * - Privacy-aware display
 */

interface FriendRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromUserName: string;
  toUserName: string;
  fromUserAvatar?: string;
  toUserAvatar?: string;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  createdAt: Date;
}

interface FriendRequestManagerProps {
  userId: string;
  onAcceptRequest?: (requestId: string) => Promise<void>;
  onRejectRequest?: (requestId: string) => Promise<void>;
  onCancelRequest?: (requestId: string) => Promise<void>;
  onSendRequest?: (userId: string, message?: string) => Promise<void>;
  className?: string;
}

export const FriendRequestManager: React.FC<FriendRequestManagerProps> = ({
  userId,
  onAcceptRequest,
  onRejectRequest,
  onCancelRequest,
  onSendRequest,
  className = ''
}) => {
  const [receivedRequests, setReceivedRequests] = useState<FriendRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingRequest, setProcessingRequest] = useState<string | null>(null);

  // Fetch friend requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);

        // Fetch received requests
        const receivedResponse = await fetch('/api/friends/request?type=received');
        const receivedData = await receivedResponse.json();
        setReceivedRequests(receivedData.requests || []);

        // Fetch sent requests
        const sentResponse = await fetch('/api/friends/request?type=sent');
        const sentData = await sentResponse.json();
        setSentRequests(sentData.requests || []);
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (requestId: string) => {
    if (!onAcceptRequest) return;

    setProcessingRequest(requestId);
    try {
      await onAcceptRequest(requestId);
      // Remove from received requests
      setReceivedRequests(prev => prev.filter(r => r.id !== requestId));
    } catch (error) {
      console.error('Error accepting request:', error);
    } finally {
      setProcessingRequest(null);
    }
  };

  const handleReject = async (requestId: string) => {
    if (!onRejectRequest) return;

    setProcessingRequest(requestId);
    try {
      await onRejectRequest(requestId);
      // Remove from received requests
      setReceivedRequests(prev => prev.filter(r => r.id !== requestId));
    } catch (error) {
      console.error('Error rejecting request:', error);
    } finally {
      setProcessingRequest(null);
    }
  };

  const handleCancel = async (requestId: string) => {
    if (!onCancelRequest) return;

    setProcessingRequest(requestId);
    try {
      await onCancelRequest(requestId);
      // Remove from sent requests
      setSentRequests(prev => prev.filter(r => r.id !== requestId));
    } catch (error) {
      console.error('Error cancelling request:', error);
    } finally {
      setProcessingRequest(null);
    }
  };

  const RequestCard = ({ request, type }: { request: FriendRequest; type: 'received' | 'sent' }) => {
    const isProcessing = processingRequest === request.id;
    const displayName = type === 'received' ? request.fromUserName : request.toUserName;
    const displayAvatar = type === 'received' ? request.fromUserAvatar : request.toUserAvatar;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border hover:border-hive-brand-gold/30 transition-colors"
      >
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <Avatar className="w-12 h-16"> {/* SPEC: 3:4 portrait ratio */}
            {displayAvatar ? (
              <img src={displayAvatar} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-hive-brand-gold/20 to-hive-brand-gold/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-hive-brand-gold" />
              </div>
            )}
          </Avatar>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-hive-foreground truncate">
                {displayName}
              </h4>
              <Badge variant="secondary" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {getTimeAgo(request.createdAt)}
              </Badge>
            </div>

            {request.message && (
              <p className="text-sm text-hive-text-secondary mb-2 line-clamp-2">
                <MessageCircle className="w-3 h-3 inline mr-1" />
                {request.message}
              </p>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              {type === 'received' ? (
                <>
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleAccept(request.id)}
                    disabled={isProcessing}
                    className="bg-hive-brand-gold hover:bg-hive-brand-gold-light text-black"
                  >
                    {isProcessing ? (
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <UserCheck className="w-4 h-4 mr-1" />
                        Accept
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReject(request.id)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="w-4 h-4 border-2 border-hive-foreground/30 border-t-hive-foreground rounded-full animate-spin" />
                    ) : (
                      <>
                        <UserX className="w-4 h-4 mr-1" />
                        Decline
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCancel(request.id)}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="w-4 h-4 border-2 border-hive-foreground/30 border-t-hive-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      <X className="w-4 h-4 mr-1" />
                      Cancel Request
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-hive-foreground flex items-center gap-2">
          <Users className="w-5 h-5 text-hive-brand-gold" />
          Friend Requests
        </h3>
        {receivedRequests.length > 0 && (
          <Badge className="bg-hive-brand-gold text-black">
            {receivedRequests.length} new
          </Badge>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="received" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="received" className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Received ({receivedRequests.length})
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Sent ({sentRequests.length})
          </TabsTrigger>
        </TabsList>

        {/* Received Requests */}
        <TabsContent value="received" className="space-y-3">
          {loading ? (
            <div className="py-8 text-center text-hive-text-secondary">
              Loading requests...
            </div>
          ) : receivedRequests.length === 0 ? (
            <div className="py-8 text-center">
              <UserPlus className="w-12 h-12 text-hive-text-tertiary mx-auto mb-3" />
              <p className="text-hive-text-secondary">No pending friend requests</p>
              <p className="text-sm text-hive-text-tertiary mt-1">
                When someone wants to be friends, you'll see it here
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {receivedRequests.map(request => (
                <RequestCard key={request.id} request={request} type="received" />
              ))}
            </AnimatePresence>
          )}
        </TabsContent>

        {/* Sent Requests */}
        <TabsContent value="sent" className="space-y-3">
          {loading ? (
            <div className="py-8 text-center text-hive-text-secondary">
              Loading requests...
            </div>
          ) : sentRequests.length === 0 ? (
            <div className="py-8 text-center">
              <Send className="w-12 h-12 text-hive-text-tertiary mx-auto mb-3" />
              <p className="text-hive-text-secondary">No pending requests sent</p>
              <p className="text-sm text-hive-text-tertiary mt-1">
                Friend requests you've sent will appear here
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {sentRequests.map(request => (
                <RequestCard key={request.id} request={request} type="sent" />
              ))}
            </AnimatePresence>
          )}
        </TabsContent>
      </Tabs>

      {/* Friend count achievement (behavioral psychology) */}
      {(receivedRequests.length + sentRequests.length) >= 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-hive-brand-gold/10 to-hive-brand-gold/5 rounded-lg p-3 border border-hive-brand-gold/20"
        >
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-hive-brand-gold" />
            <span className="text-hive-foreground font-medium">
              You're building your network!
            </span>
            <span className="text-hive-text-secondary">
              Active friend requests show you're connected on campus
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Helper function to format time ago
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
}