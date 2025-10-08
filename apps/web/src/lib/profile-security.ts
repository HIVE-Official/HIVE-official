/**
 * HIVE Profile Security Layer
 * Implements the security architecture for the profile vertical slice
 * Including connection permissions, ghost mode, and privacy controls
 */

import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from './firebase-admin';
import { logger } from './structured-logger';
import { getUserId, type AuthenticatedRequest } from './middleware';
import * as admin from 'firebase-admin';

// Connection visibility levels from PRD
export enum ConnectionVisibility {
  GHOST = 'ghost',           // Invisible
  FRIENDS = 'friends',       // Friends only
  CONNECTIONS = 'connections', // Visible in shared contexts
  CAMPUS = 'campus'          // All students
}

// Connection types from two-tier model
export enum ConnectionType {
  NONE = 'none',
  CONNECTION = 'connection', // Automatic from shared spaces
  FRIEND = 'friend'          // Intentional with mutual approval
}

// Profile field access levels
export interface FieldAccessControl {
  field: string;
  requiredLevel: ConnectionType;
  respectsGhostMode: boolean;
}

// Complete field access matrix
export const PROFILE_FIELD_ACCESS: FieldAccessControl[] = [
  // Always visible (even in ghost mode)
  { field: 'name', requiredLevel: ConnectionType.NONE, respectsGhostMode: false },
  { field: 'year', requiredLevel: ConnectionType.NONE, respectsGhostMode: false },
  { field: 'major', requiredLevel: ConnectionType.NONE, respectsGhostMode: false },
  { field: 'pronouns', requiredLevel: ConnectionType.NONE, respectsGhostMode: false },

  // Connection level access
  { field: 'profile', requiredLevel: ConnectionType.CONNECTION, respectsGhostMode: true },
  { field: 'spaceContext', requiredLevel: ConnectionType.CONNECTION, respectsGhostMode: true },
  { field: 'availability', requiredLevel: ConnectionType.CONNECTION, respectsGhostMode: true },
  { field: 'vibeStatus', requiredLevel: ConnectionType.CONNECTION, respectsGhostMode: true },

  // Friend level access
  { field: 'schedule', requiredLevel: ConnectionType.FRIEND, respectsGhostMode: true },
  { field: 'fullProfile', requiredLevel: ConnectionType.FRIEND, respectsGhostMode: true },
  { field: 'messaging', requiredLevel: ConnectionType.FRIEND, respectsGhostMode: true },
  { field: 'beacon', requiredLevel: ConnectionType.FRIEND, respectsGhostMode: true },
  { field: 'photoCarousel', requiredLevel: ConnectionType.FRIEND, respectsGhostMode: true }
];

/**
 * Campus isolation enforcement
 * All queries must be scoped to the user's campus
 */
export async function enforceCompusIsolation(userId: string): Promise<string> {
  try {
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      throw new Error('User not found');
    }

    const userData = userDoc.data();
    // For vBETA, hardcoded to UB Buffalo
    return userData?.campusId || 'ub-buffalo';
  } catch (error) {
    logger.error('Campus isolation check failed', { userId, error: error instanceof Error ? error.message : String(error) });
    // Default to UB for vBETA
    return 'ub-buffalo';
  }
}

/**
 * Check connection type between two users
 */
export async function getConnectionType(
  viewerId: string,
  targetId: string
): Promise<ConnectionType> {
  if (viewerId === targetId) {
    return ConnectionType.FRIEND; // Users always have full access to their own profile
  }

  try {
    // Check if they are friends
    const friendshipQuery = await dbAdmin
      .collection('friendships')
      .where('users', 'array-contains', viewerId)
      .get();

    const isFriend = friendshipQuery.docs.some(doc => {
      const data = doc.data();
      return data.users.includes(targetId) && data.status === 'accepted';
    });

    if (isFriend) {
      return ConnectionType.FRIEND;
    }

    // Check if they share any spaces (automatic connection)
    const viewerSpaces = await dbAdmin
      .collection('spaces')
      .where('members', 'array-contains', viewerId)
      .where('isActive', '==', true)
      .get();

    const viewerSpaceIds = viewerSpaces.docs.map(doc => doc.id);

    const targetSpaces = await dbAdmin
      .collection('spaces')
      .where('members', 'array-contains', targetId)
      .where('isActive', '==', true)
      .get();

    const targetSpaceIds = targetSpaces.docs.map(doc => doc.id);

    const hasSharedSpace = viewerSpaceIds.some(id => targetSpaceIds.includes(id));

    if (hasSharedSpace) {
      return ConnectionType.CONNECTION;
    }

    return ConnectionType.NONE;
  } catch (error) {
    logger.error('Connection type check failed', { userId: viewerId, targetId, error: error instanceof Error ? error.message : String(error) });
    return ConnectionType.NONE;
  }
}

/**
 * Check if user has ghost mode enabled
 */
export async function isGhostModeActive(userId: string): Promise<boolean> {
  try {
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return false;
    }

    const userData = userDoc.data();
    return userData?.privacy?.ghostMode === true;
  } catch (error) {
    logger.error('Ghost mode check failed', { userId, error: error instanceof Error ? error.message : String(error) });
    return false;
  }
}

/**
 * Filter profile data based on connection level and privacy settings
 */
export async function filterProfileData(
  profile: ProfileSystem,
  viewerId: string,
  targetId: string
): Promise<FilteredProfile> {
  if (viewerId === targetId) {
    return profile as FilteredProfile;
  }

  const connectionType = await getConnectionType(viewerId, targetId);
  const isGhost = await isGhostModeActive(targetId);

  const profileRecord = profile as unknown as Record<string, unknown>;
  const filteredRecord: Record<string, unknown> = {};

  for (const control of PROFILE_FIELD_ACCESS) {
    const fieldPath = control.field.split('.');
    const sourceValue = getNestedField(profileRecord, fieldPath);

    if (sourceValue === undefined) {
      continue;
    }

    const hasConnectionLevel = connectionType >= control.requiredLevel;
    const ghostBlocked = isGhost && control.respectsGhostMode && connectionType !== ConnectionType.FRIEND;

    if (hasConnectionLevel && !ghostBlocked) {
      setNestedField(filteredRecord, fieldPath, sourceValue);
    }
  }

  filteredRecord._connectionType = connectionType;
  filteredRecord._ghostModeActive = isGhost;

  return filteredRecord as FilteredProfile;
}

/**
 * Rate limiting for profile operations
 */
function getNestedField(source: Record<string, unknown>, path: string[]): unknown {
  return path.reduce<unknown>((current, key) => {
    if (!current || typeof current !== 'object') {
      return undefined;
    }
    return (current as Record<string, unknown>)[key];
  }, source);
}

function setNestedField(target: Record<string, unknown>, path: string[], value: unknown): void {
  let current: Record<string, unknown> = target;

  for (let index = 0; index < path.length - 1; index += 1) {
    const key = path[index];
    const existing = current[key];

    if (!existing || typeof existing !== 'object') {
      current[key] = {};
    }

    current = current[key] as Record<string, unknown>;
  }

  current[path[path.length - 1]] = value as unknown;
}

/**
 * Rate limiting for profile operations
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  userId: string,
  action: string,
  limit: number = 60,
  windowMs: number = 60000
): boolean {
  const key = `${userId}:${action}`;
  const now = Date.now();

  const current = rateLimitMap.get(key);

  if (!current || current.resetTime < now) {
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + windowMs
    });
    return true;
  }

  if (current.count >= limit) {
    return false;
  }

  current.count++;
  return true;
}

/**
 * Audit logging for sensitive operations
 */
export async function auditLog(
  userId: string,
  action: string,
  details: Record<string, unknown>
): Promise<void> {
  try {
    await dbAdmin.collection('audit_logs').add({
      userId,
      operation: action,
      details,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      ip: details.ip || 'unknown',
      userAgent: details.userAgent || 'unknown'
    });
  } catch (error) {
    logger.error('Audit logging failed', { userId, error: error instanceof Error ? error.message : String(error) });
  }
}

/**
 * Middleware for profile route protection
 */
export function withProfileSecurity(
  handler: Function,
  options: {
    requireAuth?: boolean;
    checkGhostMode?: boolean;
    auditOperation?: string;
    rateLimit?: { limit: number; window: number };
  } = {}
) {
  return async (req: NextRequest | AuthenticatedRequest, context: Record<string, unknown>) => {
    try {
      // Check authentication if required
      if (options.requireAuth) {
        const userId = getUserId(req as AuthenticatedRequest);
        if (!userId) {
          return NextResponse.json(
            { error: 'Authentication required' },
            { status: 401 }
          );
        }

        // Check rate limiting
        if (options.rateLimit) {
          const allowed = checkRateLimit(
            userId,
            options.auditOperation || 'profile_operation',
            options.rateLimit.limit,
            options.rateLimit.window
          );

          if (!allowed) {
            return NextResponse.json(
              { error: 'Rate limit exceeded' },
              { status: 429 }
            );
          }
        }

        // Enforce campus isolation
        const campusId = await enforceCompusIsolation(userId);
        req.headers.set('x-campus-id', campusId);

        // Audit sensitive operations
        if (options.auditOperation) {
          await auditLog(userId, options.auditOperation, {
            ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
            userAgent: req.headers.get('user-agent'),
            method: req.method,
            url: req.url
          });
        }
      }

      // Execute the handler
      return await handler(req, context);
    } catch (error) {
      logger.error('Profile security middleware error', { error: error instanceof Error ? error.message : String(error) });
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

/**
 * Privacy control enforcement
 */
export interface PrivacySettings {
  ghostMode: boolean;
  visibilityLevel: ConnectionVisibility;
  scheduleSharing: {
    friends: boolean;
    connections: boolean;
  };
  availabilityBroadcast: {
    friends: boolean;
    connections: boolean;
    campus: boolean;
  };
  discoveryParticipation: boolean;
  spaceActivityVisibility: Map<string, boolean>;
}

export type FilteredProfile = Partial<ProfileSystem> & {
  _connectionType?: ConnectionType;
  _ghostModeActive?: boolean;
};

export async function getPrivacySettings(userId: string): Promise<PrivacySettings> {
  try {
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      throw new Error('User not found');
    }

    const userData = userDoc.data();
    const privacy = userData?.privacy || {};

    return {
      ghostMode: privacy.ghostMode || false,
      visibilityLevel: privacy.visibilityLevel || ConnectionVisibility.CONNECTIONS,
      scheduleSharing: {
        friends: privacy.scheduleSharing?.friends !== false,
        connections: privacy.scheduleSharing?.connections || false
      },
      availabilityBroadcast: {
        friends: privacy.availabilityBroadcast?.friends !== false,
        connections: privacy.availabilityBroadcast?.connections !== false,
        campus: privacy.availabilityBroadcast?.campus || false
      },
      discoveryParticipation: privacy.discoveryParticipation !== false,
      spaceActivityVisibility: new Map(Object.entries(privacy.spaceActivityVisibility || {}))
    };
  } catch (error) {
    logger.error('Privacy settings fetch failed', { userId, error: error instanceof Error ? error.message : String(error) });
    // Return default privacy settings
    return {
      ghostMode: false,
      visibilityLevel: ConnectionVisibility.CONNECTIONS,
      scheduleSharing: { friends: true, connections: false },
      availabilityBroadcast: { friends: true, connections: true, campus: false },
      discoveryParticipation: true,
      spaceActivityVisibility: new Map()
    };
  }
}

/**
 * Connection permission checker
 */
export async function canViewField(
  viewerId: string,
  targetId: string,
  fieldName: string
): Promise<boolean> {
  // User can always view their own fields
  if (viewerId === targetId) {
    return true;
  }

  const connectionType = await getConnectionType(viewerId, targetId);
  const fieldControl = PROFILE_FIELD_ACCESS.find(f => f.field === fieldName);

  if (!fieldControl) {
    // Unknown field, deny by default
    return false;
  }

  // Check connection level requirement
  if (connectionType < fieldControl.requiredLevel) {
    return false;
  }

  // Check ghost mode
  if (fieldControl.respectsGhostMode) {
    const isGhost = await isGhostModeActive(targetId);
    if (isGhost && connectionType !== ConnectionType.FRIEND) {
      return false;
    }
  }

  return true;
}

const ProfileSecurityService = {
  enforceCompusIsolation,
  getConnectionType,
  isGhostModeActive,
  filterProfileData,
  checkRateLimit,
  auditLog,
  withProfileSecurity,
  getPrivacySettings,
  canViewField
};

export default ProfileSecurityService;
