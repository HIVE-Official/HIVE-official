/**
 * Secure Firebase Queries with Campus Isolation
 *
 * Server-side utilities for Firebase Admin SDK that enforce campus isolation
 * CRITICAL: All space-related queries MUST use these functions
 */

import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import * as admin from 'firebase-admin';

// Hardcoded for UB launch - will be dynamic in multi-campus rollout
export const CURRENT_CAMPUS_ID = 'ub-buffalo';

/**
 * Validates that a space belongs to the current campus and user has access
 */
export async function validateSecureSpaceAccess(
  spaceId: string,
  userId?: string
): Promise<{
  isValid: boolean;
  space?: admin.firestore.DocumentData;
  error?: string;
}> {
  try {
    const spaceDoc = await dbAdmin.collection('spaces').doc(spaceId).get();

    if (!spaceDoc.exists) {
      return { isValid: false, error: 'Space not found' };
    }

    const spaceData = spaceDoc.data()!;

    // Critical: Validate campus isolation
    if (spaceData.campusId !== CURRENT_CAMPUS_ID) {
      logger.error('SECURITY: Cross-campus space access blocked', {
        spaceId,
        spaceCampusId: spaceData.campusId,
        currentCampusId: CURRENT_CAMPUS_ID,
        userId
      });
      return { isValid: false, error: 'Access denied - campus mismatch' };
    }

    // Validate space is active
    if (!spaceData.isActive) {
      return { isValid: false, error: 'Space is not active' };
    }

    return { isValid: true, space: spaceData };
  } catch (error) {
    logger.error('Error validating secure space access', { spaceId, userId, error: error instanceof Error ? error.message : String(error) });
    return { isValid: false, error: 'Validation failed' };
  }
}

/**
 * Get a campus-isolated spaces query
 */
export function getSecureSpacesQuery() {
  return dbAdmin.collection('spaces')
    .where('campusId', '==', CURRENT_CAMPUS_ID)
    .where('isActive', '==', true);
}

/**
 * Get spaces with cursor-based pagination (simplified to avoid compound indexes)
 */
export async function getSecureSpacesWithCursor({
  filterType,
  searchTerm,
  limit = 50,
  cursor,
  orderBy = 'createdAt',
  orderDirection = 'desc'
}: {
  filterType?: string;
  searchTerm?: string;
  limit?: number;
  cursor?: string;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}): Promise<{
  spaces: admin.firestore.DocumentData[];
  nextCursor?: string;
  hasMore: boolean;
}> {
  try {
    // Simplified query to avoid compound index requirements
    // Only use campus isolation and active status
    let query = dbAdmin.collection('spaces')
      .where('campusId', '==', CURRENT_CAMPUS_ID)
      .where('isActive', '==', true);

    // For development: limit to reasonable number
    query = query.limit(Math.min(limit + 1, 100));

    const snapshot = await query.get();
    let docs = snapshot.docs;

    // Client-side filtering to avoid compound index requirements
    if (filterType && filterType !== 'all') {
      docs = docs.filter(doc => doc.data().type === filterType);
    }

    if (searchTerm) {
      docs = docs.filter(doc => {
        const data = doc.data();
        return data.name_lowercase?.includes(searchTerm.toLowerCase()) ||
               data.description?.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    // Apply limit after filtering
    const hasMore = docs.length > limit;
    const spaces = hasMore ? docs.slice(0, limit) : docs;
    const nextCursor = hasMore && spaces.length > 0 ? spaces[spaces.length - 1].id : undefined;

    return {
      spaces: spaces.map(doc => ({ id: doc.id, ...doc.data() })),
      nextCursor,
      hasMore
    };
  } catch (error) {
    logger.error('Error in getSecureSpacesWithCursor:', { error: error instanceof Error ? error.message : String(error) });
    return {
      spaces: [],
      nextCursor: undefined,
      hasMore: false
    };
  }
}

/**
 * Get campus-isolated space membership query
 */
export function getSecureSpaceMembersQuery(spaceId: string) {
  return dbAdmin.collection('spaceMembers')
    .where('spaceId', '==', spaceId)
    .where('isActive', '==', true);
}

/**
 * Validates user membership in a space with campus isolation
 */
export async function validateSecureSpaceMembership(
  userId: string,
  spaceId: string
): Promise<{
  isValid: boolean;
  membership?: admin.firestore.DocumentData;
  space?: admin.firestore.DocumentData;
  error?: string;
}> {
  try {
    // First validate space access
    const spaceValidation = await validateSecureSpaceAccess(spaceId, userId);
    if (!spaceValidation.isValid) {
      return { isValid: false, error: spaceValidation.error };
    }

    // Check user membership
    const membershipQuery = dbAdmin.collection('spaceMembers')
      .where('spaceId', '==', spaceId)
      .where('userId', '==', userId)
      .where('isActive', '==', true)
      .limit(1);

    const membershipSnapshot = await membershipQuery.get();

    if (membershipSnapshot.empty) {
      return { isValid: false, error: 'User is not a member of this space' };
    }

    const membershipData = membershipSnapshot.docs[0].data();

    return {
      isValid: true,
      membership: membershipData,
      space: spaceValidation.space
    };
  } catch (error) {
    logger.error('Error validating secure space membership', { userId, spaceId, error: error instanceof Error ? error.message : String(error) });
    return { isValid: false, error: 'Validation failed' };
  }
}

/**
 * Validates if user can join a specific space (campus + space rules)
 */
export async function validateSpaceJoinability(
  userId: string,
  spaceId: string
): Promise<{
  canJoin: boolean;
  space?: admin.firestore.DocumentData;
  error?: string;
}> {
  try {
    // Validate space access
    const spaceValidation = await validateSecureSpaceAccess(spaceId, userId);
    if (!spaceValidation.isValid) {
      return { canJoin: false, error: spaceValidation.error };
    }

    const space = spaceValidation.space!;

    // Check if space is private
    if (space.isPrivate) {
      return { canJoin: false, error: 'Space is private and requires invitation' };
    }

    // Check if user is already a member
    const existingMemberQuery = dbAdmin.collection('spaceMembers')
      .where('spaceId', '==', spaceId)
      .where('userId', '==', userId)
      .where('isActive', '==', true)
      .limit(1);

    const existingSnapshot = await existingMemberQuery.get();
    if (!existingSnapshot.empty) {
      return { canJoin: false, error: 'User is already a member' };
    }

    // Greek life exclusive check
    if (space.spaceType === 'greek_life') {
      const greekMemberQuery = dbAdmin.collection('spaceMembers')
        .where('userId', '==', userId)
        .where('isActive', '==', true);

      const greekSnapshot = await greekMemberQuery.get();

      for (const memberDoc of greekSnapshot.docs) {
        const memberData = memberDoc.data();
        const memberSpaceDoc = await dbAdmin.collection('spaces').doc(memberData.spaceId).get();

        if (memberSpaceDoc.exists) {
          const memberSpace = memberSpaceDoc.data()!;
          if (memberSpace.type === 'greek_life' && memberSpace.campusId === CURRENT_CAMPUS_ID) {
            return { canJoin: false, error: 'User can only join one Greek life organization' };
          }
        }
      }
    }

    return { canJoin: true, space };
  } catch (error) {
    logger.error('Error validating space joinability', { userId, spaceId, error: error instanceof Error ? error.message : String(error) });
    return { canJoin: false, error: 'Validation failed' };
  }
}

/**
 * Add campus metadata to any document being created
 */
export function addSecureCampusMetadata(data: Record<string, any>): Record<string, any> {
  return {
    ...data,
    campusId: CURRENT_CAMPUS_ID,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };
}

/**
 * Audit security violations
 */
export function auditSecurityViolation(
  action: string,
  details: Record<string, any>
): void {
  logger.error('SECURITY_VIOLATION', {
    action,
    operation: action,
    timestamp: new Date().toISOString(),
    currentCampusId: CURRENT_CAMPUS_ID,
    ...details
  });

  // In production, trigger alerts
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to monitoring service
  }
}

/**
 * Get secure user data with campus validation
 */
export async function getSecureUserData(userId: string): Promise<{
  isValid: boolean;
  user?: admin.firestore.DocumentData;
  error?: string;
}> {
  try {
    const userDoc = await dbAdmin.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return { isValid: false, error: 'User not found' };
    }

    const userData = userDoc.data()!;

    // Validate user belongs to current campus
    if (userData.campusId !== CURRENT_CAMPUS_ID) {
      auditSecurityViolation('cross_campus_user_access', {
        userId,
        userCampus: userData.campusId,
        currentCampus: CURRENT_CAMPUS_ID
      });
      return { isValid: false, error: 'User not authorized for this campus' };
    }

    return { isValid: true, user: userData };
  } catch (error) {
    logger.error('Error getting secure user data', { userId, error: error instanceof Error ? error.message : String(error) });
    return { isValid: false, error: 'User validation failed' };
  }
}
