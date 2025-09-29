/**
 * HIVE Connections Hook
 * Manages connections, friends, and friend requests
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@hive/auth-logic';
import type {
  Connection,
  Friend,
  FriendRequest,
  UserConnections
} from '@hive/core';

interface ConnectionsState {
  connections: Connection[];
  friends: Friend[];
  receivedRequests: FriendRequest[];
  sentRequests: FriendRequest[];
  stats: {
    totalConnections: number;
    totalFriends: number;
    onlineFriends: number;
    pendingReceived: number;
    pendingSent: number;
    averageStrength: number;
  };
  isLoading: boolean;
  error: Error | null;
}

interface UseConnectionsReturn extends ConnectionsState {
  // Connection actions
  detectConnections: () => Promise<void>;
  refreshConnections: () => Promise<void>;

  // Friend actions
  sendFriendRequest: (toUserId: string, message?: string) => Promise<void>;
  acceptFriendRequest: (requestId: string) => Promise<void>;
  rejectFriendRequest: (requestId: string) => Promise<void>;
  unfriend: (friendId: string) => Promise<void>;

  // Utility functions
  isConnected: (userId: string) => boolean;
  isFriend: (userId: string) => boolean;
  hasPendingRequest: (userId: string) => boolean;
  getConnectionStrength: (userId: string) => number;
}

export function useConnections(): UseConnectionsReturn {
  const { user } = useAuth();
  const [state, setState] = useState<ConnectionsState>({
    connections: [],
    friends: [],
    receivedRequests: [],
    sentRequests: [],
    stats: {
      totalConnections: 0,
      totalFriends: 0,
      onlineFriends: 0,
      pendingReceived: 0,
      pendingSent: 0,
      averageStrength: 0
    },
    isLoading: true,
    error: null
  });

  // Fetch all connection data
  const fetchConnections = useCallback(async () => {
    if (!user) {
      setState(prev => ({ ...prev, isLoading: false }));
      return;
    }

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      // Fetch connections
      const connectionsResponse = await fetch('/api/connections', {
        credentials: 'include'
      });

      if (!connectionsResponse.ok) {
        throw new Error('Failed to fetch connections');
      }

      const connectionsData = await connectionsResponse.json();

      // Fetch friends and requests
      const friendsResponse = await fetch('/api/friends', {
        credentials: 'include'
      });

      if (!friendsResponse.ok) {
        throw new Error('Failed to fetch friends');
      }

      const friendsData = await friendsResponse.json();

      setState({
        connections: connectionsData.connections || [],
        friends: friendsData.friends || [],
        receivedRequests: friendsData.receivedRequests || [],
        sentRequests: friendsData.sentRequests || [],
        stats: {
          totalConnections: connectionsData.stats?.totalConnections || 0,
          totalFriends: friendsData.stats?.totalFriends || 0,
          onlineFriends: friendsData.stats?.onlineFriends || 0,
          pendingReceived: friendsData.stats?.pendingReceived || 0,
          pendingSent: friendsData.stats?.pendingSent || 0,
          averageStrength: connectionsData.stats?.averageStrength || 0
        },
        isLoading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error as Error
      }));
    }
  }, [user]);

  // Detect new connections based on affiliations
  const detectConnections = useCallback(async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/connections', {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to detect connections');
      }

      const result = await response.json();

      // Refresh connections list
      await fetchConnections();
    } catch (error) {
      throw error;
    }
  }, [user, fetchConnections]);

  // Send friend request
  const sendFriendRequest = useCallback(async (toUserId: string, message?: string) => {
    if (!user) throw new Error('Not authenticated');

    try {
      const response = await fetch('/api/friends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ toUserId, message })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send friend request');
      }

      // Refresh friends list
      await fetchConnections();
    } catch (error) {
      throw error;
    }
  }, [user, fetchConnections]);

  // Accept friend request
  const acceptFriendRequest = useCallback(async (requestId: string) => {
    if (!user) throw new Error('Not authenticated');

    try {
      const response = await fetch('/api/friends', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ requestId, action: 'accept' })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to accept friend request');
      }

      // Refresh friends list
      await fetchConnections();
    } catch (error) {
      throw error;
    }
  }, [user, fetchConnections]);

  // Reject friend request
  const rejectFriendRequest = useCallback(async (requestId: string) => {
    if (!user) throw new Error('Not authenticated');

    try {
      const response = await fetch('/api/friends', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ requestId, action: 'reject' })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to reject friend request');
      }

      // Refresh friends list
      await fetchConnections();
    } catch (error) {
      throw error;
    }
  }, [user, fetchConnections]);

  // Unfriend
  const unfriend = useCallback(async (friendId: string) => {
    if (!user) throw new Error('Not authenticated');

    try {
      const response = await fetch(`/api/friends/${friendId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to unfriend');
      }

      // Refresh friends list
      await fetchConnections();
    } catch (error) {
      throw error;
    }
  }, [user, fetchConnections]);

  // Utility functions
  const isConnected = useCallback((userId: string) => {
    return state.connections.some(c => c.userId === userId);
  }, [state.connections]);

  const isFriend = useCallback((userId: string) => {
    return state.friends.some(f => f.userId === userId);
  }, [state.friends]);

  const hasPendingRequest = useCallback((userId: string) => {
    return (
      state.sentRequests.some(r => r.toUserId === userId && r.status === 'pending') ||
      state.receivedRequests.some(r => r.fromUserId === userId && r.status === 'pending')
    );
  }, [state.sentRequests, state.receivedRequests]);

  const getConnectionStrength = useCallback((userId: string) => {
    const connection = state.connections.find(c => c.userId === userId);
    return connection?.strength || 0;
  }, [state.connections]);

  // Initial fetch
  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  // Auto-detect connections on first load
  useEffect(() => {
    if (user && state.connections.length === 0 && !state.isLoading) {
      detectConnections();
    }
  }, [user, state.connections.length, state.isLoading, detectConnections]);

  return {
    ...state,
    detectConnections,
    refreshConnections: fetchConnections,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    unfriend,
    isConnected,
    isFriend,
    hasPendingRequest,
    getConnectionStrength
  };
}