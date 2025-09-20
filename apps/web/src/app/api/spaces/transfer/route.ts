import { dbAdmin } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { logger } from "@/lib/structured-logger";
import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from '@/lib/middleware';

// Space movement restrictions
interface MovementRestriction {
  spaceType: 'campus_living' | 'cohort' | 'fraternity_and_sorority';
  cooldownDays: number;
  maxMovements: number;
  lockDuration?: number; // For year spaces (in days)
}

const MOVEMENT_RESTRICTIONS: Record<string, MovementRestriction> = {
  campus_living: {
    spaceType: 'campus_living',
    cooldownDays: 30, // 1 month
    maxMovements: 1
  },
  cohort: {
    spaceType: 'cohort',
    cooldownDays: 30, // 1 month for major spaces
    maxMovements: 1,
    lockDuration: 365 // 1 year lock for year spaces
  },
  fraternity_and_sorority: {
    spaceType: 'fraternity_and_sorority',
    cooldownDays: 0, // No cooldown, but only 1 total membership allowed
    maxMovements: 0 // Must leave current before joining new
  }
};

interface SpaceMovementRecord {
  userId: string;
  fromSpaceId: string;
  toSpaceId: string;
  spaceType: string;
  movementType: 'transfer' | 'leave' | 'join';
  timestamp: string;
  reason?: string;
  adminOverride?: boolean;
}

interface MovementValidationResult {
  canMove: boolean;
  reason?: string;
  nextAvailableDate?: string;
  currentCooldownDays?: number;
  movementsThisPeriod?: number;
}

// POST - Transfer between spaces of the same type with restrictions
export const POST = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const userId = getUserId(request);
    const body = await request.json();
    const { fromSpaceId, toSpaceId, reason, adminOverride = false } = body;

    if (!fromSpaceId || !toSpaceId) {
      return respond.error("Both fromSpaceId and toSpaceId are required", "INVALID_INPUT", 400);
    }

    if (fromSpaceId === toSpaceId) {
      return respond.error("Cannot transfer to the same space", "INVALID_INPUT", 400);
    }

    // Find both spaces and validate they're the same type
    const fromSpaceInfo = await findSpaceInfo(fromSpaceId);
    const toSpaceInfo = await findSpaceInfo(toSpaceId);

    if (!fromSpaceInfo || !toSpaceInfo) {
      return respond.error("One or both spaces not found", "RESOURCE_NOT_FOUND", 404);
    }

    if (fromSpaceInfo.spaceType !== toSpaceInfo.spaceType) {
      return respond.error("Cannot transfer between different space types", "INVALID_INPUT", 400);
    }

    // Check if user is a member of the source space
    const membershipSnapshot = await dbAdmin.collection('members')
      .where('userId', '==', userId)
      .where('spaceId', '==', fromSpaceId)
      .where('status', '==', 'active')
      .get();
    if (membershipSnapshot.empty) {
      return respond.error("You are not a member of the source space", "UNAUTHORIZED", 401);
    }

    const memberData = membershipSnapshot.docs[0].data();

    // Validate movement restrictions (unless admin override)
    if (!adminOverride) {
      const validationResult = await validateMovementRestrictions(userId, fromSpaceInfo.spaceType, fromSpaceInfo.space, toSpaceInfo.space);
      
      if (!validationResult.canMove) {
        return respond.error(validationResult.reason || "Cannot move at this time", "MOVEMENT_RESTRICTED", 403, {
          details: validationResult,
          message: validationResult.reason || "Cannot move at this time"
        });
      }
    }

    // Check if user is already a member of target space
    const targetMembershipSnapshot = await dbAdmin.collection('members')
      .where('userId', '==', userId)
      .where('spaceId', '==', toSpaceId)
      .get();
    if (!targetMembershipSnapshot.empty) {
      return respond.error("You are already a member of the target space", "INVALID_INPUT", 400);
    }

    // Special handling for fraternity_and_sorority (only 1 membership allowed)
    if (fromSpaceInfo.spaceType === 'fraternity_and_sorority') {
      const allGreekMemberships = await dbAdmin.collection('members')
        .where('userId', '==', userId)
        .where('status', '==', 'active')
        .get();
      const greekMemberships = [];

      for (const memberDoc of allGreekMemberships.docs) {
        const memberData = memberDoc.data();
        const spaceInfo = await findSpaceInfo(memberData.spaceId);
        if (spaceInfo?.spaceType === 'fraternity_and_sorority') {
          greekMemberships.push(memberData);
        }
      }

      if (greekMemberships.length > 1) {
        return respond.error("You can only be a member of one Greek organization at a time", "INVALID_INPUT", 400);
      }
    }

    // Perform the transfer atomically
    const batch = dbAdmin.batch();

    // 1. Remove from source space
    const sourceMemRef = membershipSnapshot.docs[0].ref;
    batch.delete(sourceMemRef);

    // 2. Add to target space
    const targetMemRef = dbAdmin.collection('members').doc();
    batch.set(targetMemRef, {
      userId,
      spaceId: toSpaceId,
      spaceName: toSpaceInfo.space.name,
      spaceType: toSpaceInfo.spaceType,
      role: memberData.role || 'member',
      status: 'active',
      joinedAt: admin.firestore.FieldValue.serverTimestamp(),
      transferredFrom: fromSpaceId,
      transferReason: reason || 'User requested transfer'
    });

    // 3. Update member counts
    const fromSpaceRef = dbAdmin.collection('spaces').doc(fromSpaceId);
    const toSpaceRef = dbAdmin.collection('spaces').doc(toSpaceId);

    batch.update(fromSpaceRef, {
      memberCount: fromSpaceInfo.space.memberCount - 1,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    batch.update(toSpaceRef, {
      memberCount: (toSpaceInfo.space.memberCount || 0) + 1,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // 4. Record the movement for cooldown tracking
    const movementRecord: SpaceMovementRecord = {
      userId,
      fromSpaceId,
      toSpaceId,
      spaceType: fromSpaceInfo.spaceType,
      movementType: 'transfer',
      timestamp: new Date().toISOString(),
      reason,
      adminOverride
    };

    const movementRef = dbAdmin.collection('spaceMovements').doc();
    batch.set(movementRef, movementRecord);

    // Commit the batch
    await batch.commit();

    logger.info('Space transfer completed', {
      userId,
      fromSpaceId,
      toSpaceId,
      spaceType: fromSpaceInfo.spaceType,
      adminOverride,
      endpoint: '/api/spaces/transfer'
    });

    return respond.success({
      message: 'Successfully transferred spaces',
      transfer: {
        from: {
          id: fromSpaceId,
          name: fromSpaceInfo.space.name,
          type: fromSpaceInfo.spaceType
        },
        to: {
          id: toSpaceId,
          name: toSpaceInfo.space.name,
          type: toSpaceInfo.spaceType
        },
        timestamp: movementRecord.timestamp
      }
    });

});

// GET - Check if user can move and get movement history
export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const userId = getUserId(request);
    const { searchParams } = new URL(request.url);
    const spaceType = searchParams.get('spaceType');
    const fromSpaceId = searchParams.get('fromSpaceId');
    const toSpaceId = searchParams.get('toSpaceId');

    if (spaceType && fromSpaceId && toSpaceId) {
      // Check specific movement
      const fromSpaceInfo = await findSpaceInfo(fromSpaceId);
      const toSpaceInfo = await findSpaceInfo(toSpaceId);

      if (!fromSpaceInfo || !toSpaceInfo) {
        return respond.error("Space not found", "RESOURCE_NOT_FOUND", 404);
      }

      const validationResult = await validateMovementRestrictions(userId, spaceType as any, fromSpaceInfo.space, toSpaceInfo.space);

      return respond.success({
        canMove: validationResult.canMove,
        restrictions: validationResult,
        spaceType,
        from: { id: fromSpaceId, name: fromSpaceInfo.space.name },
        to: { id: toSpaceId, name: toSpaceInfo.space.name }
      });
    }

    // Get movement history
    const movementHistorySnapshot = await dbAdmin.collection('spaceMovements')
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc')
      .limit(20)
      .get();
    const movementHistory = movementHistorySnapshot.docs.map(doc => doc.data());

    // Get current restrictions for each space type
    const restrictions: Record<string, any> = {};
    for (const [type, restriction] of Object.entries(MOVEMENT_RESTRICTIONS)) {
      const userSpacesSnapshot = await dbAdmin.collection('members')
        .where('userId', '==', userId)
        .where('spaceType', '==', type)
        .where('status', '==', 'active')
        .get();
      if (!userSpacesSnapshot.empty) {
        const spaceData = userSpacesSnapshot.docs[0].data();
        const spaceInfo = await findSpaceInfo(spaceData.spaceId);
        
        if (spaceInfo) {
          const validationResult = await validateMovementRestrictions(userId, type as any, spaceInfo.space, null);
          restrictions[type] = validationResult;
        }
      }
    }

    return respond.success({
      movementHistory,
      currentRestrictions: restrictions,
      restrictionRules: MOVEMENT_RESTRICTIONS
    });

});

// Helper function to find space info across all types
async function findSpaceInfo(spaceId: string): Promise<{ space: any; spaceType: string } | null> {
  const spaceTypes = ['campus_living', 'fraternity_and_sorority', 'hive_exclusive', 'student_organizations', 'university_organizations', 'cohort'];
  
  for (const type of spaceTypes) {
    try {
      const spaceDoc = await dbAdmin.collection('spaces').doc(spaceId).get();
      
      if (spaceDoc.exists) {
        return {
          space: { id: spaceDoc.id, ...spaceDoc.data() },
          spaceType: type
        };
      }
    } catch (error) {
      logger.warn('Error checking space type', { spaceId, type, error });
    }
  }
  
  return null;
}

// Helper function to validate movement restrictions
async function validateMovementRestrictions(
  userId: string, 
  spaceType: string, 
  fromSpace: any, 
  toSpace: any
): Promise<MovementValidationResult> {
  const restriction = MOVEMENT_RESTRICTIONS[spaceType];
  
  if (!restriction) {
    return { canMove: true };
  }

  // Get recent movements for this user and space type
  const cooldownDate = new Date();
  cooldownDate.setDate(cooldownDate.getDate() - restriction.cooldownDays);

  const recentMovementsSnapshot = await dbAdmin.collection('spaceMovements')
    .where('userId', '==', userId)
    .where('spaceType', '==', spaceType)
    .where('timestamp', '>=', cooldownDate.toISOString())
    .get();
  const recentMovements = recentMovementsSnapshot.docs.map(doc => doc.data());

  // Check cooldown
  if (recentMovements.length >= restriction.maxMovements) {
    const lastMovement = recentMovements.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
    const nextAvailableDate = new Date(lastMovement.timestamp);
    nextAvailableDate.setDate(nextAvailableDate.getDate() + restriction.cooldownDays);

    if (new Date() < nextAvailableDate) {
      return {
        canMove: false,
        reason: `Movement restricted. You can move again after ${nextAvailableDate.toLocaleDateString()}`,
        nextAvailableDate: nextAvailableDate.toISOString(),
        currentCooldownDays: Math.ceil((nextAvailableDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
        movementsThisPeriod: recentMovements.length
      };
    }
  }

  // Special validation for year-based cohort spaces (1 year lock)
  if (spaceType === 'cohort' && restriction.lockDuration) {
    const yearPattern = /'(\d{2})/; // Matches '25, '26, etc.
    const fromSpaceYear = fromSpace?.name?.match(yearPattern)?.[1];
    const toSpaceYear = toSpace?.name?.match(yearPattern)?.[1];

    // If moving between different graduation years, check lock duration
    if (fromSpaceYear && toSpaceYear && fromSpaceYear !== toSpaceYear) {
      const membershipSnapshot = await dbAdmin.collection('members')
        .where('userId', '==', userId)
        .where('spaceId', '==', fromSpace.id)
        .where('status', '==', 'active')
        .get();
      if (!membershipSnapshot.empty) {
        const memberData = membershipSnapshot.docs[0].data();
        const joinedDate = new Date(memberData.joinedAt?.seconds ? memberData.joinedAt.seconds * 1000 : memberData.joinedAt);
        const lockUntilDate = new Date(joinedDate);
        lockUntilDate.setDate(lockUntilDate.getDate() + restriction.lockDuration);

        if (new Date() < lockUntilDate) {
          return {
            canMove: false,
            reason: `Year-based spaces are locked for 1 year. You can change graduation year after ${lockUntilDate.toLocaleDateString()}`,
            nextAvailableDate: lockUntilDate.toISOString(),
            currentCooldownDays: Math.ceil((lockUntilDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
          };
        }
      }
    }
  }

  return { canMove: true };
}