/**
 * HIVE Connections API
 * Handles automatic connection detection and retrieval
 */

import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware";
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/structured-logger";
import type { ConnectionSource } from '@hive/core';

// Extended connection type with additional properties from Firestore
type FirestoreConnection = {
  userId: string;
  strength?: number;
  sources?: string[];  // Array of sources
  connectedAt?: any;
  type?: string;
  source?: ConnectionSource | string;
  createdAt?: any;
  [key: string]: any;
};

/**
 * Get user's connections
 * GET /api/connections
 */
export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const userId = getUserId(request);

  try {
    // Get all automatic connections
    const connectionsRef = dbAdmin
      .collection('users')
      .doc(userId)
      .collection('connections');

    const connectionsSnapshot = await connectionsRef
      .orderBy('strength', 'desc')
      .limit(100)
      .get();

    const connections = connectionsSnapshot.docs.map(doc => ({
      ...doc.data(),
      userId: doc.id
    })) as unknown as FirestoreConnection[];

    // Get friends list
    const friendsRef = dbAdmin
      .collection('users')
      .doc(userId)
      .collection('friends');

    const friendsSnapshot = await friendsRef.get();
    const friendIds = friendsSnapshot.docs.map(doc => doc.id);

    // Get mutual connections count for each connection
    const connectionsWithMutuals = await Promise.all(
      connections.map(async (connection) => {
        // Check if this connection also has us as a connection
        const reverseConnectionRef = dbAdmin
          .collection('users')
          .doc(connection.userId)
          .collection('connections')
          .doc(userId);

        const reverseConnection = await reverseConnectionRef.get();
        const isMutual = reverseConnection.exists;

        // Check if they're a friend
        const isFriend = friendIds.includes(connection.userId);

        // Get basic profile info for the connection
        const userDoc = await dbAdmin
          .collection('users')
          .doc(connection.userId)
          .get();

        const userData = userDoc.data();

        return {
          ...connection,
          isMutual,
          isFriend,
          profile: userData ? {
            fullName: userData.displayName,
            handle: userData.handle,
            avatarUrl: userData.avatarUrl,
            major: userData.academic?.major,
            academicYear: userData.academic?.academicYear,
            housing: userData.academic?.housing,
            statusMessage: userData.personal?.statusMessage,
            currentVibe: userData.personal?.currentVibe,
            availabilityStatus: userData.personal?.availabilityStatus
          } : null
        };
      })
    );

    // Get connection statistics
    const stats = {
      totalConnections: connections.length,
      friends: friendIds.length,
      averageStrength: connections.length > 0
        ? connections.reduce((sum, c) => sum + (c.strength || 0), 0) / connections.length
        : 0,
      strongConnections: connections.filter(c => (c.strength || 0) >= 70).length,
      connectionSources: connections.reduce((acc, c) => {
        // Handle both sources array and single source
        const sources = c.sources || (c.source ? [c.source as string] : []);
        sources.forEach((source: string) => {
          acc[source] = (acc[source] || 0) + 1;
        });
        return acc;
      }, {} as Record<string, number>)
    };

    logger.info('Connections retrieved', {
      userId,
      connectionCount: connections.length,
      friendCount: friendIds.length
    });

    return respond.success({
      connections: connectionsWithMutuals,
      stats
    });
  } catch (error) {
    logger.error(
      'Error fetching connections',
      error instanceof Error ? error : new Error(String(error)),
      { userId }
    );
    return respond.error('Failed to fetch connections', 'INTERNAL_ERROR');
  }
});

/**
 * Detect and create automatic connections
 * POST /api/connections/detect
 */
export const POST = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const userId = getUserId(request);

  try {
    // Get user's profile
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return respond.error('User profile not found', 'RESOURCE_NOT_FOUND');
    }

    const userData = userDoc.data()!;
    const detectedConnections: FirestoreConnection[] = [];
    const batch = dbAdmin.batch();

    // 1. Find users with same major
    if (userData.academic?.major) {
      const majorQuery = dbAdmin
        .collection('users')
        .where('campusId', '==', 'ub-buffalo')
        .where('academic.major', '==', userData.academic.major)
        .limit(50);

      const majorUsers = await majorQuery.get();
      majorUsers.forEach(doc => {
        if (doc.id !== userId) {
          const connection: FirestoreConnection = {
            userId: doc.id,
            connectedAt: new Date().toISOString(),
            sources: ['same_major'],
            strength: 30
          };
          detectedConnections.push(connection);
        }
      });
    }

    // 2. Find users in same dorm
    if (userData.academic?.housing) {
      const dormQuery = dbAdmin
        .collection('users')
        .where('campusId', '==', 'ub-buffalo')
        .where('academic.housing', '==', userData.academic.housing)
        .limit(30);

      const dormUsers = await dormQuery.get();
      dormUsers.forEach(doc => {
        if (doc.id !== userId) {
          const existing = detectedConnections.find(c => c.userId === doc.id);
          if (existing && existing.sources) {
            existing.sources.push('same_dorm');
            existing.strength = Math.min((existing.strength || 0) + 40, 100);
          } else {
            const connection: FirestoreConnection = {
              userId: doc.id,
              connectedAt: new Date().toISOString(),
              sources: ['same_dorm'],
              strength: 40
            };
            detectedConnections.push(connection);
          }
        }
      });
    }

    // 3. Find users in same year
    if (userData.academic?.academicYear) {
      const yearQuery = dbAdmin
        .collection('users')
        .where('campusId', '==', 'ub-buffalo')
        .where('academic.academicYear', '==', userData.academic.academicYear)
        .limit(20);

      const yearUsers = await yearQuery.get();
      yearUsers.forEach(doc => {
        if (doc.id !== userId) {
          const existing = detectedConnections.find(c => c.userId === doc.id);
          if (existing && existing.sources) {
            if (!existing.sources.includes('same_year')) {
              existing.sources.push('same_year');
              existing.strength = Math.min((existing.strength || 0) + 10, 100);
            }
          }
        }
      });
    }

    // 4. Find users in same spaces
    const userSpacesQuery = dbAdmin
      .collection('spaces')
      .where('members', 'array-contains', userId)
      .where('campusId', '==', 'ub-buffalo')
      .limit(10);

    const userSpaces = await userSpacesQuery.get();

    for (const spaceDoc of userSpaces.docs) {
      const members = spaceDoc.data().members || [];

      for (const memberId of members) {
        if (memberId !== userId) {
          const existing = detectedConnections.find(c => c.userId === memberId);
          if (existing && existing.sources) {
            if (!existing.sources.includes('same_space')) {
              existing.sources.push('same_space');
              existing.strength = Math.min((existing.strength || 0) + 20, 100);
            }
          } else {
            const connection: FirestoreConnection = {
              userId: memberId,
              connectedAt: new Date().toISOString(),
              sources: ['same_space'],
              strength: 20
            };
            detectedConnections.push(connection);
          }
        }
      }
    }

    // Save all connections (bidirectional)
    for (const connection of detectedConnections) {
      // Save connection for current user
      const connectionRef = dbAdmin
        .collection('users')
        .doc(userId)
        .collection('connections')
        .doc(connection.userId);

      batch.set(connectionRef, connection, { merge: true });

      // Save reverse connection
      const reverseConnectionRef = dbAdmin
        .collection('users')
        .doc(connection.userId)
        .collection('connections')
        .doc(userId);

      batch.set(reverseConnectionRef, {
        userId: userId,
        connectedAt: connection.connectedAt,
        sources: connection.sources,
        strength: connection.strength
      }, { merge: true });
    }

    await batch.commit();

    logger.info('Connections detected and created', {
      userId,
      detectCount: detectedConnections.length
    });

    return respond.success({
      message: 'Connections detected successfully',
      detected: detectedConnections.length,
      connections: detectedConnections.slice(0, 20) // Return first 20 for preview
    });
  } catch (error) {
    logger.error(
      'Error detecting connections',
      error instanceof Error ? error : new Error(String(error)),
      { userId }
    );
    return respond.error('Failed to detect connections', 'INTERNAL_ERROR');
  }
});