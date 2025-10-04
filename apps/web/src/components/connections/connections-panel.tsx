/**
 * HIVE Connections Panel
 * Displays connections, friends, and manages friend requests
 */

'use client';

import { useState } from 'react';
import { useConnections } from '@/hooks/use-connections';
import { Button, Badge, Avatar, Card, Tabs, TabsContent, TabsList, TabsTrigger } from '@hive/ui';
import { Users, UserPlus, Check, X, Sparkles, Signal, Heart } from 'lucide-react';
import type { Connection, Friend, FriendRequest } from '@hive/core';

interface ConnectionsPanelProps {
  className?: string;
}

export function ConnectionsPanel({ className }: ConnectionsPanelProps) {
  const {
    connections,
    friends,
    receivedRequests,
    sentRequests,
    stats,
    isLoading,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    unfriend,
    isFriend,
    getConnectionStrength
  } = useConnections();

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [friendRequestMessage, setFriendRequestMessage] = useState('');

  // Get connection strength indicator
  const getStrengthIndicator = (strength: number) => {
    if (strength >= 70) return { icon: '🔥', label: 'Strong', color: 'text-orange-500' };
    if (strength >= 40) return { icon: '⚡', label: 'Good', color: 'text-yellow-500' };
    return { icon: '✨', label: 'New', color: 'text-gray-500' };
  };

  // Get availability indicator
  const getAvailabilityColor = (status?: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'studying': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-gray-400';
      default: return 'bg-gray-300';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse text-gray-500">Loading connections...</div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Connections</p>
              <p className="text-2xl font-bold">{stats.totalConnections}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Friends</p>
              <p className="text-2xl font-bold">{stats.totalFriends}</p>
            </div>
            <Heart className="h-8 w-8 text-pink-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Online</p>
              <p className="text-2xl font-bold">{stats.onlineFriends}</p>
            </div>
            <Signal className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold">{stats.pendingReceived}</p>
            </div>
            <UserPlus className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="connections" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="connections">
            Connections
            <Badge className="ml-2">{connections.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="friends">
            Friends
            <Badge className="ml-2">{friends.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="requests">
            Requests
            {receivedRequests.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {receivedRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="sent">
            Sent
            <Badge className="ml-2">{sentRequests.length}</Badge>
          </TabsTrigger>
        </TabsList>

        {/* Connections Tab */}
        <TabsContent value="connections" className="space-y-3">
          {connections.length === 0 ? (
            <Card className="p-8 text-center">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600">No connections yet</p>
              <p className="text-sm text-gray-500 mt-1">
                Connections are created automatically when you share affiliations with others
              </p>
            </Card>
          ) : (
            connections.map((connection: any) => {
              const strength = getStrengthIndicator(connection.strength);
              const alreadyFriend = isFriend(connection.userId);

              return (
                <Card key={connection.userId} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar
                          src={connection.profile?.avatarUrl}
                          alt={connection.profile?.fullName}
                          fallback={connection.profile?.fullName?.[0] || '?'}
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getAvailabilityColor(
                            connection.profile?.availabilityStatus
                          )}`}
                        />
                      </div>

                      <div>
                        <p className="font-medium">{connection.profile?.fullName}</p>
                        <p className="text-sm text-gray-600">
                          {connection.profile?.major} • {connection.profile?.academicYear}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs ${strength.color}`}>
                            {strength.icon} {strength.label} connection
                          </span>
                          {connection.sources && (
                            <div className="flex gap-1">
                              {connection.sources.includes('same_major') && (
                                <Badge variant="secondary" className="text-xs">
                                  Major
                                </Badge>
                              )}
                              {connection.sources.includes('same_dorm') && (
                                <Badge variant="secondary" className="text-xs">
                                  Dorm
                                </Badge>
                              )}
                              {connection.sources.includes('same_space') && (
                                <Badge variant="secondary" className="text-xs">
                                  Spaces
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      {alreadyFriend ? (
                        <Badge variant="secondary">Friends</Badge>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => sendFriendRequest(connection.userId)}
                        >
                          <UserPlus className="h-4 w-4 mr-1" />
                          Add Friend
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </TabsContent>

        {/* Friends Tab */}
        <TabsContent value="friends" className="space-y-3">
          {friends.length === 0 ? (
            <Card className="p-8 text-center">
              <Heart className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600">No friends yet</p>
              <p className="text-sm text-gray-500 mt-1">
                Send friend requests to your connections to build your network
              </p>
            </Card>
          ) : (
            friends.map((friend: any) => (
              <Card key={friend.userId} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar
                        src={friend.profile?.avatarUrl}
                        alt={friend.profile?.fullName}
                        fallback={friend.profile?.fullName?.[0] || '?'}
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getAvailabilityColor(
                          friend.profile?.availabilityStatus
                        )}`}
                      />
                    </div>

                    <div>
                      <p className="font-medium">{friend.profile?.fullName}</p>
                      <p className="text-sm text-gray-600">
                        {friend.profile?.major} • {friend.profile?.academicYear}
                      </p>
                      {friend.profile?.statusMessage && (
                        <p className="text-xs text-gray-500 mt-1">
                          "{friend.profile.statusMessage}"
                        </p>
                      )}
                      {friend.mutualCount > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          {friend.mutualCount} mutual friends
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => unfriend(friend.userId)}
                  >
                    Unfriend
                  </Button>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Friend Requests Tab */}
        <TabsContent value="requests" className="space-y-3">
          {receivedRequests.length === 0 ? (
            <Card className="p-8 text-center">
              <UserPlus className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600">No pending friend requests</p>
            </Card>
          ) : (
            receivedRequests.map((request: any) => (
              <Card key={request.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={request.fromProfile?.avatarUrl}
                      alt={request.fromProfile?.fullName}
                      fallback={request.fromProfile?.fullName?.[0] || '?'}
                    />

                    <div>
                      <p className="font-medium">{request.fromProfile?.fullName}</p>
                      <p className="text-sm text-gray-600">
                        {request.fromProfile?.major} • {request.fromProfile?.academicYear}
                      </p>
                      {request.message && (
                        <p className="text-sm text-gray-500 mt-1">"{request.message}"</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => acceptFriendRequest(request.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => rejectFriendRequest(request.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Sent Requests Tab */}
        <TabsContent value="sent" className="space-y-3">
          {sentRequests.length === 0 ? (
            <Card className="p-8 text-center">
              <UserPlus className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600">No sent friend requests</p>
            </Card>
          ) : (
            sentRequests.map((request: any) => (
              <Card key={request.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={request.toProfile?.avatarUrl}
                      alt={request.toProfile?.fullName}
                      fallback={request.toProfile?.fullName?.[0] || '?'}
                    />

                    <div>
                      <p className="font-medium">{request.toProfile?.fullName}</p>
                      <p className="text-sm text-gray-600">
                        {request.toProfile?.major} • {request.toProfile?.academicYear}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Pending</p>
                    </div>
                  </div>

                  <Badge variant="secondary">Pending</Badge>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}