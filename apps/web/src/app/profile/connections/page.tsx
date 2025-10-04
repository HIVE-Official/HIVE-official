"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Tabs, TabsContent, TabsList, TabsTrigger, Badge } from '@hive/ui';
import { useAuth } from '@hive/auth-logic';
import { db } from '@hive/core';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  getDoc
} from 'firebase/firestore';

interface Connection {
  uid: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  major?: string;
  gradYear?: number;
  connectionStrength: number;
  isFriend: boolean;
  connectedAt: Date;
  sharedSpaces: number;
  mutualConnections: number;
  lastInteraction?: Date;
}

interface FriendRequest {
  id: string;
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar?: string;
  message?: string;
  createdAt: Date;
  status: 'pending' | 'accepted' | 'rejected';
}

export default function ConnectionsPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [connections, setConnections] = useState<Connection[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'friends' | 'requests'>('all');
  const [loading, setLoading] = useState(true);

  // Load connections
  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const connectionsRef = collection(db, 'users', user.uid, 'connections');
    const q = query(
      connectionsRef,
      where('campusId', '==', 'ub-buffalo'),
      orderBy('connectionStrength', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const connectionsData: Connection[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        connectionsData.push({
          uid: doc.id,
          displayName: data.displayName,
          avatarUrl: data.avatarUrl,
          bio: data.bio,
          major: data.major,
          gradYear: data.gradYear,
          connectionStrength: data.connectionStrength || 0,
          isFriend: data.isFriend || false,
          connectedAt: data.connectedAt?.toDate() || new Date(),
          sharedSpaces: data.sharedSpaces || 0,
          mutualConnections: data.mutualConnections || 0,
          lastInteraction: data.lastInteraction?.toDate()
        });
      });
      setConnections(connectionsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, router]);

  // Load friend requests
  useEffect(() => {
    if (!user) return;

    const requestsRef = collection(db, 'users', user.uid, 'friendRequests');
    const q = query(
      requestsRef,
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requestsData: FriendRequest[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        requestsData.push({
          id: doc.id,
          fromUserId: data.fromUserId,
          fromUserName: data.fromUserName,
          fromUserAvatar: data.fromUserAvatar,
          message: data.message,
          createdAt: data.createdAt?.toDate() || new Date(),
          status: data.status
        });
      });
      setFriendRequests(requestsData);
    });

    return () => unsubscribe();
  }, [user]);

  const sendFriendRequest = async (connectionId: string) => {
    if (!user) return;

    try {
      // Create friend request in recipient's collection
      const requestRef = doc(collection(db, 'users', connectionId, 'friendRequests'));
      await setDoc(requestRef, {
        fromUserId: user.uid,
        fromUserName: user.displayName || 'HIVE User',
        fromUserAvatar: user.photoURL,
        message: 'Would like to be friends on HIVE',
        status: 'pending',
        createdAt: serverTimestamp(),
        campusId: 'ub-buffalo'
      });

      // Update local connection to show pending request
      setConnections(prev =>
        prev.map(conn =>
          conn.uid === connectionId
            ? { ...conn, friendRequestPending: true }
            : conn
        )
      );
    } catch (error) {
      console.error('Failed to send friend request:', error);
    }
  };

  const acceptFriendRequest = async (requestId: string, fromUserId: string) => {
    if (!user) return;

    try {
      // Update request status
      const requestRef = doc(db, 'users', user.uid, 'friendRequests', requestId);
      await setDoc(requestRef, { status: 'accepted' }, { merge: true });

      // Update both users' connections to mark as friends
      const myConnRef = doc(db, 'users', user.uid, 'connections', fromUserId);
      const theirConnRef = doc(db, 'users', fromUserId, 'connections', user.uid);

      await setDoc(myConnRef, { isFriend: true }, { merge: true });
      await setDoc(theirConnRef, { isFriend: true }, { merge: true });

      // Remove from pending requests
      setFriendRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Failed to accept friend request:', error);
    }
  };

  const rejectFriendRequest = async (requestId: string) => {
    if (!user) return;

    try {
      const requestRef = doc(db, 'users', user.uid, 'friendRequests', requestId);
      await deleteDoc(requestRef);
      setFriendRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Failed to reject friend request:', error);
    }
  };

  const removeConnection = async (connectionId: string) => {
    if (!user) return;

    try {
      const connRef = doc(db, 'users', user.uid, 'connections', connectionId);
      await deleteDoc(connRef);
      setConnections(prev => prev.filter(conn => conn.uid !== connectionId));
    } catch (error) {
      console.error('Failed to remove connection:', error);
    }
  };

  // Filter connections based on search and tab
  const filteredConnections = connections.filter(conn => {
    const matchesSearch = conn.displayName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'friends' && conn.isFriend) ||
      (activeTab === 'requests' && friendRequests.length > 0);
    return matchesSearch && matchesTab;
  });

  // Connection strength indicator
  const getStrengthColor = (strength: number) => {
    if (strength >= 80) return 'bg-green-500';
    if (strength >= 60) return 'bg-yellow-500';
    if (strength >= 40) return 'bg-orange-500';
    return 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading connections...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Connections & Friends</h1>
          <p className="text-gray-400">Manage your HIVE network</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 border border-white/8 rounded-lg p-4">
            <div className="text-2xl font-bold text-[var(--hive-brand-primary)]">{connections.length}</div>
            <div className="text-sm text-gray-400">Total Connections</div>
          </div>
          <div className="bg-gray-900 border border-white/8 rounded-lg p-4">
            <div className="text-2xl font-bold text-[var(--hive-brand-primary)]">
              {connections.filter(c => c.isFriend).length}
            </div>
            <div className="text-sm text-gray-400">Friends</div>
          </div>
          <div className="bg-gray-900 border border-white/8 rounded-lg p-4">
            <div className="text-2xl font-bold text-[var(--hive-brand-primary)]">{friendRequests.length}</div>
            <div className="text-sm text-gray-400">Pending Requests</div>
          </div>
          <div className="bg-gray-900 border border-white/8 rounded-lg p-4">
            <div className="text-2xl font-bold text-[var(--hive-brand-primary)]">
              {Math.round(connections.reduce((acc, c) => acc + c.connectionStrength, 0) / connections.length) || 0}%
            </div>
            <div className="text-sm text-gray-400">Avg Connection Strength</div>
          </div>
        </div>

        {/* Search and Tabs */}
        <div className="mb-6">
          <Input
            placeholder="Search connections..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent) => setSearchQuery(e.target.value)}
            className="mb-4 bg-gray-900 border-white/8"
          />

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="bg-gray-900">
              <TabsTrigger value="all">All Connections</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
              <TabsTrigger value="requests">
                Friend Requests {friendRequests.length > 0 && (
                  <Badge className="ml-2 bg-[var(--hive-brand-primary)] text-black">{friendRequests.length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="requests" className="mt-6">
              {friendRequests.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No pending friend requests
                </div>
              ) : (
                <div className="space-y-4">
                  {friendRequests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-gray-900 border border-white/8 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                          {request.fromUserAvatar ? (
                            <img
                              src={request.fromUserAvatar}
                              alt={request.fromUserName}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-xl">👤</span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{request.fromUserName}</div>
                          <div className="text-sm text-gray-400">{request.message}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => acceptFriendRequest(request.id, request.fromUserId)}
                          className="bg-[var(--hive-brand-primary)] text-black hover:bg-[var(--hive-brand-primary)]/90"
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => rejectFriendRequest(request.id)}
                          className="border-white/20"
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredConnections.map((connection) => (
                  <ConnectionCard
                    key={connection.uid}
                    connection={connection}
                    onSendFriendRequest={sendFriendRequest}
                    onRemoveConnection={removeConnection}
                    getStrengthColor={getStrengthColor}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="friends" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredConnections.filter(c => c.isFriend).map((connection) => (
                  <ConnectionCard
                    key={connection.uid}
                    connection={connection}
                    onSendFriendRequest={sendFriendRequest}
                    onRemoveConnection={removeConnection}
                    getStrengthColor={getStrengthColor}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// Connection Card Component
function ConnectionCard({
  connection,
  onSendFriendRequest,
  onRemoveConnection,
  getStrengthColor
}: {
  connection: Connection;
  onSendFriendRequest: (id: string) => void;
  onRemoveConnection: (id: string) => void;
  getStrengthColor: (strength: number) => string;
}) {
  const router = useRouter();

  return (
    <div className="bg-gray-900 border border-white/8 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
            {connection.avatarUrl ? (
              <img
                src={connection.avatarUrl}
                alt={connection.displayName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-xl">👤</span>
            )}
          </div>
          <div>
            <div className="font-medium">{connection.displayName}</div>
            {connection.major && (
              <div className="text-xs text-gray-400">
                {connection.major} {connection.gradYear && `'${connection.gradYear % 100}`}
              </div>
            )}
          </div>
        </div>
        {connection.isFriend && (
          <Badge className="bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/50">
            Friend
          </Badge>
        )}
      </div>

      {/* Connection Strength */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">Connection Strength</span>
          <span className="text-gray-400">{connection.connectionStrength}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-1.5">
          <div
            className={`h-full rounded-full ${getStrengthColor(connection.connectionStrength)}`}
            style={{ width: `${connection.connectionStrength}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between text-xs text-gray-400 mb-3">
        <span>{connection.sharedSpaces} shared spaces</span>
        <span>{connection.mutualConnections} mutual</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => router.push(`/profile/${connection.uid}`)}
          className="flex-1 border-white/20"
        >
          View Profile
        </Button>
        {!connection.isFriend && (
          <Button
            size="sm"
            onClick={() => onSendFriendRequest(connection.uid)}
            className="flex-1 bg-[var(--hive-brand-primary)] text-black hover:bg-[var(--hive-brand-primary)]/90"
          >
            Add Friend
          </Button>
        )}
      </div>
    </div>
  );
}