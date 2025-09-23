/**
 * HIVE Connection Manager
 * Implements the two-tier connection model from the PRD
 * Handles automatic connections from spaces and intentional friend relationships
 */

import { dbAdmin } from './firebase-admin';
import * as admin from 'firebase-admin';
import { logger } from './structured-logger';
import {
  ConnectionType,
  getConnectionType,
  getPrivacySettings,
  auditLog
} from './profile-security';

export interface Connection {
  id: string;
  userId: string;
  connectedUserId: string;
  type: ConnectionType;
  spaceIds: string[]; // Spaces they share
  createdAt: Date;
  updatedAt: Date;
}

export interface Friendship {
  id: string;
  users: [string, string]; // Always sorted for consistency
  status: 'pending' | 'accepted' | 'declined';
  requestedBy: string;
  requestedAt: Date;
  respondedAt?: Date;
  acceptedAt?: Date;
}

/**
 * Create automatic connections when users join a space
 */
export async function createSpaceConnections(
  userId: string,
  spaceId: string
): Promise<Connection[]> {
  try {
    // Get all other members of the space
    const membersSnapshot = await dbAdmin
      .collection('members')
      .where('spaceId', '==', spaceId)
      .where('status', '==', 'active')
      .get();

    const otherMembers = membersSnapshot.docs
      .map(doc => doc.data())
      .filter(member => member.userId !== userId);

    const connections: Connection[] = [];

    // Create or update connections with each member
    for (const member of otherMembers) {
      const connectionId = [userId, member.userId].sort().join(':');

      const connectionRef = dbAdmin.collection('connections').doc(connectionId);
      const connectionDoc = await connectionRef.get();

      if (connectionDoc.exists) {
        // Update existing connection to add this space
        const data = connectionDoc.data();
        if (!data) continue; // Skip if data is undefined

        const updatedSpaceIds = [...new Set([...(data.spaceIds || []), spaceId])];

        await connectionRef.update({
          spaceIds: updatedSpaceIds,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        connections.push({
          id: connectionId,
          userId,
          connectedUserId: member.userId,
          type: ConnectionType.CONNECTION,
          spaceIds: updatedSpaceIds,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: new Date()
        });
      } else {
        // Create new connection
        const newConnection = {
          users: [userId, member.userId].sort(),
          userId,
          connectedUserId: member.userId,
          type: ConnectionType.CONNECTION,
          spaceIds: [spaceId],
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };

        await connectionRef.set(newConnection);

        connections.push({
          id: connectionId,
          userId,
          connectedUserId: member.userId,
          type: ConnectionType.CONNECTION,
          spaceIds: [spaceId],
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    logger.info('Created space connections', {
      userId,
      spaceId,
      count: connections.length
    });

    return connections;
  } catch (error) {
    logger.error('Failed to create space connections', { userId, spaceId, error });
    throw error;
  }
}

/**
 * Remove connections when user leaves a space
 */
export async function removeSpaceConnections(
  userId: string,
  spaceId: string
): Promise<void> {
  try {
    // Find all connections that include this space
    const connectionsSnapshot = await dbAdmin
      .collection('connections')
      .where('users', 'array-contains', userId)
      .get();

    const batch = dbAdmin.batch();
    let removedCount = 0;
    let updatedCount = 0;

    for (const doc of connectionsSnapshot.docs) {
      const data = doc.data();
      if (!data) continue; // Skip if data is undefined

      const spaceIds = (data.spaceIds || []).filter((id: string) => id !== spaceId);

      if (spaceIds.length === 0) {
        // No more shared spaces, remove the connection
        batch.delete(doc.ref);
        removedCount++;
      } else {
        // Update to remove this space
        batch.update(doc.ref, {
          spaceIds,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        updatedCount++;
      }
    }

    await batch.commit();

    logger.info('Updated space connections', {
      userId,
      spaceId,
      data: { removed: removedCount, updated: updatedCount }
    });
  } catch (error) {
    logger.error('Failed to remove space connections', { userId, spaceId, error });
    throw error;
  }
}

/**
 * Send a friend request
 */
export async function sendFriendRequest(
  requesterId: string,
  targetId: string
): Promise<Friendship> {
  try {
    // Check if they have a connection first
    const connectionType = await getConnectionType(requesterId, targetId);
    if (connectionType === ConnectionType.NONE) {
      throw new Error('Cannot send friend request without existing connection');
    }

    // Check if friendship already exists
    const friendshipId = [requesterId, targetId].sort().join(':');
    const existingFriendship = await dbAdmin
      .collection('friendships')
      .doc(friendshipId)
      .get();

    if (existingFriendship.exists) {
      const data = existingFriendship.data();
      if (!data) {
        throw new Error('Invalid friendship data');
      }
      if (data.status === 'accepted') {
        throw new Error('Already friends');
      }
      if (data.status === 'pending') {
        throw new Error('Friend request already pending');
      }
    }

    // Create friend request
    const friendship: Omit<Friendship, 'id'> = {
      users: [requesterId, targetId].sort() as [string, string],
      status: 'pending',
      requestedBy: requesterId,
      requestedAt: admin.firestore.FieldValue.serverTimestamp() as any
    };

    await dbAdmin.collection('friendships').doc(friendshipId).set(friendship);

    // Audit log
    await auditLog(requesterId, 'send_friend_request', { target: targetId });

    // Create notification for target user
    await dbAdmin.collection('notifications').add({
      userId: targetId,
      type: 'friend_request',
      from: requesterId,
      message: 'sent you a friend request',
      read: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return {
      id: friendshipId,
      ...friendship,
      requestedAt: new Date()
    };
  } catch (error) {
    logger.error('Failed to send friend request', { userId: requesterId, data: { targetId }, error });
    throw error;
  }
}

/**
 * Respond to a friend request
 */
export async function respondToFriendRequest(
  userId: string,
  friendshipId: string,
  accept: boolean
): Promise<void> {
  try {
    const friendshipRef = dbAdmin.collection('friendships').doc(friendshipId);
    const friendshipDoc = await friendshipRef.get();

    if (!friendshipDoc.exists) {
      throw new Error('Friend request not found');
    }

    const data = friendshipDoc.data();
    if (!data) {
      throw new Error('Invalid friendship data');
    }

    // Verify user is the target of the request
    if (!data.users.includes(userId) || data.requestedBy === userId) {
      throw new Error('Cannot respond to this friend request');
    }

    if (data.status !== 'pending') {
      throw new Error('Friend request already responded to');
    }

    // Update friendship status
    await friendshipRef.update({
      status: accept ? 'accepted' : 'declined',
      respondedAt: admin.firestore.FieldValue.serverTimestamp(),
      ...(accept && { acceptedAt: admin.firestore.FieldValue.serverTimestamp() })
    });

    // If accepted, upgrade the connection type
    if (accept) {
      const connectionId = data.users.sort().join(':');
      const connectionRef = dbAdmin.collection('connections').doc(connectionId);

      await connectionRef.update({
        type: ConnectionType.FRIEND,
        upgradedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      // Create notification for requester
      await dbAdmin.collection('notifications').add({
        userId: data.requestedBy,
        type: 'friend_request_accepted',
        from: userId,
        message: 'accepted your friend request',
        read: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    // Audit log
    await auditLog(userId, accept ? 'accept_friend_request' : 'decline_friend_request', {
      friendship: friendshipId,
      requester: data.requestedBy
    });
  } catch (error) {
    logger.error('Failed to respond to friend request', { userId, data: { friendshipId, accept }, error });
    throw error;
  }
}

/**
 * Remove a friend
 */
export async function removeFriend(
  userId: string,
  friendId: string
): Promise<void> {
  try {
    const friendshipId = [userId, friendId].sort().join(':');
    const friendshipRef = dbAdmin.collection('friendships').doc(friendshipId);
    const friendshipDoc = await friendshipRef.get();

    if (!friendshipDoc.exists) {
      throw new Error('Friendship not found');
    }

    const friendshipData = friendshipDoc.data();
    if (!friendshipData || friendshipData.status !== 'accepted') {
      throw new Error('Not friends');
    }

    // Delete friendship
    await friendshipRef.delete();

    // Downgrade connection to regular connection (if they still share spaces)
    const connectionRef = dbAdmin.collection('connections').doc(friendshipId);
    const connectionDoc = await connectionRef.get();

    if (connectionDoc.exists) {
      const data = connectionDoc.data();
      if (data && data.spaceIds && data.spaceIds.length > 0) {
        // They still share spaces, downgrade to connection
        await connectionRef.update({
          type: ConnectionType.CONNECTION,
          downgradedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      } else {
        // No shared spaces, remove connection entirely
        await connectionRef.delete();
      }
    }

    // Audit log
    await auditLog(userId, 'remove_friend', { friend: friendId });
  } catch (error) {
    logger.error('Failed to remove friend', { userId, data: { friendId }, error });
    throw error;
  }
}

/**
 * Get all connections for a user
 */
export async function getUserConnections(
  userId: string,
  includeGhostMode: boolean = false
): Promise<Connection[]> {
  try {
    const connectionsSnapshot = await dbAdmin
      .collection('connections')
      .where('users', 'array-contains', userId)
      .get();

    const connections: Connection[] = [];

    for (const doc of connectionsSnapshot.docs) {
      const data = doc.data();
      const otherUserId = data.users.find((id: string) => id !== userId);

      // Check ghost mode unless explicitly including
      if (!includeGhostMode) {
        const privacySettings = await getPrivacySettings(otherUserId);
        if (privacySettings.ghostMode && data.type !== ConnectionType.FRIEND) {
          continue; // Skip ghost mode users who aren't friends
        }
      }

      connections.push({
        id: doc.id,
        userId,
        connectedUserId: otherUserId,
        type: data.type,
        spaceIds: data.spaceIds || [],
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      });
    }

    return connections;
  } catch (error) {
    logger.error('Failed to get user connections', { userId, error });
    throw error;
  }
}

/**
 * Get friend suggestions based on mutual connections and shared spaces
 */
export async function getFriendSuggestions(
  userId: string,
  limit: number = 5
): Promise<Array<{ userId: string; score: number; reasons: string[] }>> {
  try {
    // Get user's current connections
    const connections = await getUserConnections(userId);
    const currentConnectionIds = new Set(connections.map(c => c.connectedUserId));

    // Get user's friends
    const friends = connections.filter(c => c.type === ConnectionType.FRIEND);
    const friendIds = new Set(friends.map(f => f.connectedUserId));

    // Find friends of friends
    const friendsOfFriends = new Map<string, number>();
    for (const friendId of friendIds) {
      const friendConnections = await getUserConnections(friendId);
      for (const conn of friendConnections) {
        if (conn.type === ConnectionType.FRIEND &&
            conn.connectedUserId !== userId &&
            !friendIds.has(conn.connectedUserId)) {
          const count = friendsOfFriends.get(conn.connectedUserId) || 0;
          friendsOfFriends.set(conn.connectedUserId, count + 1);
        }
      }
    }

    // Calculate scores
    const suggestions = [];
    for (const [suggestedId, mutualCount] of friendsOfFriends.entries()) {
      if (!currentConnectionIds.has(suggestedId)) {
        continue; // Must have existing connection to suggest as friend
      }

      const connection = connections.find(c => c.connectedUserId === suggestedId);
      if (!connection || connection.type === ConnectionType.FRIEND) {
        continue; // Already friends or no connection
      }

      const sharedSpaces = connection.spaceIds.length;
      const score = (mutualCount * 30) + (sharedSpaces * 20);

      const reasons = [];
      if (mutualCount > 0) {
        reasons.push(`${mutualCount} mutual friends`);
      }
      if (sharedSpaces > 0) {
        reasons.push(`${sharedSpaces} shared spaces`);
      }

      suggestions.push({ userId: suggestedId, score, reasons });
    }

    // Sort by score and limit
    return suggestions
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  } catch (error) {
    logger.error('Failed to get friend suggestions', { userId, error });
    return [];
  }
}

const ConnectionManagerService = {
  createSpaceConnections,
  removeSpaceConnections,
  sendFriendRequest,
  respondToFriendRequest,
  removeFriend,
  getUserConnections,
  getFriendSuggestions
};

export default ConnectionManagerService;