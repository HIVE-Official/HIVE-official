import { dbAdmin } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { logger } from '@/lib/structured-logger';
import {
  withAuthAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from '@/lib/middleware';
import { CURRENT_CAMPUS_ID, addSecureCampusMetadata } from '@/lib/secure-firebase-queries';
import { requireSpaceAccess, requireSpaceMembership } from '@/lib/space-security';
import { HttpStatus } from '@/lib/api-response-types';

interface MovementRestriction {
  spaceType: 'campus_living' | 'cohort' | 'fraternity_and_sorority';
  cooldownDays: number;
  maxMovements: number;
  lockDuration?: number;
}

const MOVEMENT_RESTRICTIONS: Record<string, MovementRestriction> = {
  campus_living: {
    spaceType: 'campus_living',
    cooldownDays: 30,
    maxMovements: 1,
  },
  cohort: {
    spaceType: 'cohort',
    cooldownDays: 30,
    maxMovements: 1,
    lockDuration: 365,
  },
  fraternity_and_sorority: {
    spaceType: 'fraternity_and_sorority',
    cooldownDays: 0,
    maxMovements: 0,
  },
};

interface SpaceMovementRecord {
  userId: string;
  fromSpaceId: string;
  toSpaceId: string;
  spaceType: string;
  movementType: 'transfer' | 'leave' | 'join';
  timestamp: string;
  campusId: string;
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

interface SpaceInfo {
  id: string;
  data: Record<string, any>;
  movementType: string | null;
}

export const POST = withAuthAndErrors(async (request: AuthenticatedRequest, _context, respond) => {
  const userId = getUserId(request);
  const { fromSpaceId, toSpaceId, reason, adminOverride = false } = await request.json();

  if (!fromSpaceId || !toSpaceId) {
    return respond.error('Both fromSpaceId and toSpaceId are required', 'INVALID_INPUT', {
      status: HttpStatus.BAD_REQUEST,
    });
  }

  if (fromSpaceId === toSpaceId) {
    return respond.error('Cannot transfer to the same space', 'INVALID_INPUT', {
      status: HttpStatus.BAD_REQUEST,
    });
  }

  const fromMembership = await requireSpaceMembership(fromSpaceId, userId);
  if (!fromMembership.ok) {
    const code =
      fromMembership.status === HttpStatus.NOT_FOUND ? 'RESOURCE_NOT_FOUND' : 'FORBIDDEN';
    return respond.error(fromMembership.error, code, { status: fromMembership.status });
  }

  const toSpaceAccess = await requireSpaceAccess(toSpaceId, userId);
  if (!toSpaceAccess.ok) {
    const code =
      toSpaceAccess.status === HttpStatus.NOT_FOUND ? 'RESOURCE_NOT_FOUND' : 'FORBIDDEN';
    return respond.error(toSpaceAccess.error, code, { status: toSpaceAccess.status });
  }

  const fromSpace = await loadSpaceInfo(fromSpaceId);
  const toSpace = await loadSpaceInfo(toSpaceId);

  if (!fromSpace || !toSpace) {
    return respond.error('One or both spaces not found', 'RESOURCE_NOT_FOUND', {
      status: HttpStatus.NOT_FOUND,
    });
  }

  if (!fromSpace.movementType || !toSpace.movementType) {
    return respond.error('Transfers are not available for these space types', 'FORBIDDEN', {
      status: HttpStatus.FORBIDDEN,
    });
  }

  if (fromSpace.movementType !== toSpace.movementType) {
    return respond.error('Cannot transfer between different space types', 'INVALID_INPUT', {
      status: HttpStatus.BAD_REQUEST,
    });
  }

  const sourceMembershipSnapshot = await dbAdmin
    .collection('spaceMembers')
    .where('spaceId', '==', fromSpaceId)
    .where('userId', '==', userId)
    .where('isActive', '==', true)
    .where('campusId', '==', CURRENT_CAMPUS_ID)
    .limit(1)
    .get();

  if (sourceMembershipSnapshot.empty) {
    return respond.error('You are not a member of the source space', 'FORBIDDEN', {
      status: HttpStatus.FORBIDDEN,
    });
  }

  const sourceMembershipDoc = sourceMembershipSnapshot.docs[0];
  const sourceMembershipData = sourceMembershipDoc.data();

  const targetMembershipSnapshot = await dbAdmin
    .collection('spaceMembers')
    .where('spaceId', '==', toSpaceId)
    .where('userId', '==', userId)
    .where('campusId', '==', CURRENT_CAMPUS_ID)
    .limit(1)
    .get();

  if (!targetMembershipSnapshot.empty) {
    const targetMembershipData = targetMembershipSnapshot.docs[0].data();
    if (targetMembershipData.isActive) {
      return respond.error('You are already a member of the target space', 'CONFLICT', {
        status: HttpStatus.CONFLICT,
      });
    }
  }

  if (!adminOverride) {
    const validation = await validateMovementRestrictions(
      userId,
      fromSpace.movementType,
      fromSpace,
      toSpace,
    );
    if (!validation.canMove) {
      return respond.error(validation.reason || 'Movement restricted', 'FORBIDDEN', {
        status: HttpStatus.FORBIDDEN,
        details: validation,
      });
    }
  }

  if (fromSpace.movementType === 'fraternity_and_sorority') {
    const activeGreekMemberships = await dbAdmin
      .collection('spaceMembers')
      .where('userId', '==', userId)
      .where('isActive', '==', true)
      .where('campusId', '==', CURRENT_CAMPUS_ID)
      .limit(10)
      .get();

    let greekCount = 0;
    for (const doc of activeGreekMemberships.docs) {
      const membershipSpace = await loadSpaceInfo(doc.data().spaceId);
      if (membershipSpace?.movementType === 'fraternity_and_sorority') {
        greekCount += 1;
      }
    }

    if (greekCount > 1) {
      return respond.error(
        'You can only be a member of one Greek organization at a time',
        'FORBIDDEN',
        { status: HttpStatus.FORBIDDEN },
      );
    }
  }

  const batch = dbAdmin.batch();
  const timestamp = admin.firestore.FieldValue.serverTimestamp();

  batch.update(sourceMembershipDoc.ref, {
    isActive: false,
    leftAt: timestamp,
    transferredTo: toSpaceId,
    transferReason: reason || null,
    updatedAt: timestamp,
  });

  if (!targetMembershipSnapshot.empty) {
    const targetDoc = targetMembershipSnapshot.docs[0];
    batch.update(targetDoc.ref, {
      isActive: true,
      joinedAt: timestamp,
      reactivatedAt: timestamp,
      reactivatedBy: userId,
      role: targetDoc.data().role || sourceMembershipData.role || 'member',
      updatedAt: timestamp,
    });
  } else {
    const membershipRef = dbAdmin.collection('spaceMembers').doc();
    batch.set(
      membershipRef,
      addSecureCampusMetadata({
        spaceId: toSpaceId,
        userId,
        role: sourceMembershipData.role || 'member',
        joinedAt: timestamp,
        isActive: true,
        permissions: sourceMembershipData.permissions || ['post'],
        transferredFrom: fromSpaceId,
        transferReason: reason || null,
      }),
    );
  }

  batch.update(dbAdmin.collection('spaces').doc(fromSpaceId), {
    'metrics.memberCount': admin.firestore.FieldValue.increment(-1),
    'metrics.activeMembers': admin.firestore.FieldValue.increment(-1),
    updatedAt: timestamp,
  });

  batch.update(dbAdmin.collection('spaces').doc(toSpaceId), {
    'metrics.memberCount': admin.firestore.FieldValue.increment(1),
    'metrics.activeMembers': admin.firestore.FieldValue.increment(1),
    updatedAt: timestamp,
  });

  const movementRef = dbAdmin.collection('spaceMovements').doc();
  const movementRecord: SpaceMovementRecord = {
    userId,
    fromSpaceId,
    toSpaceId,
    spaceType: fromSpace.movementType,
    movementType: 'transfer',
    timestamp: new Date().toISOString(),
    campusId: CURRENT_CAMPUS_ID,
    reason,
    adminOverride,
  };
  batch.set(movementRef, movementRecord);

  await batch.commit();

  logger.info('Space transfer completed', {
    userId,
    fromSpaceId,
    toSpaceId,
    spaceType: fromSpace.movementType,
    adminOverride,
    endpoint: '/api/spaces/transfer',
  });

  return respond.success({
    message: 'Successfully transferred spaces',
    transfer: {
      from: {
        id: fromSpaceId,
        name: fromSpace.data.name,
        type: fromSpace.movementType,
      },
      to: {
        id: toSpaceId,
        name: toSpace.data.name,
        type: toSpace.movementType,
      },
      timestamp: movementRecord.timestamp,
    },
  });
});

export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, _context, respond) => {
  const userId = getUserId(request);
  const { searchParams } = new URL(request.url);
  const spaceType = searchParams.get('spaceType');
  const fromSpaceId = searchParams.get('fromSpaceId');
  const toSpaceId = searchParams.get('toSpaceId');

  if (spaceType && fromSpaceId && toSpaceId) {
    const fromSpace = await loadSpaceInfo(fromSpaceId);
    const toSpace = await loadSpaceInfo(toSpaceId);

    if (!fromSpace || !toSpace) {
      return respond.error('Space not found', 'RESOURCE_NOT_FOUND', {
        status: HttpStatus.NOT_FOUND,
      });
    }

    const validation = await validateMovementRestrictions(
      userId,
      normalizeMovementType(spaceType),
      fromSpace,
      toSpace,
    );

    return respond.success({
      canMove: validation.canMove,
      restrictions: validation,
      spaceType: normalizeMovementType(spaceType),
      from: { id: fromSpaceId, name: fromSpace.data.name },
      to: { id: toSpaceId, name: toSpace.data.name },
    });
  }

  const movementHistorySnapshot = await dbAdmin
    .collection('spaceMovements')
    .where('userId', '==', userId)
    .where('campusId', '==', CURRENT_CAMPUS_ID)
    .orderBy('timestamp', 'desc')
    .limit(20)
    .get();

  const movementHistory = movementHistorySnapshot.docs.map((doc) => doc.data());
  const restrictions: Record<string, MovementValidationResult> = {};

  for (const [key, restriction] of Object.entries(MOVEMENT_RESTRICTIONS)) {
    const activeMembershipSnapshot = await dbAdmin
      .collection('spaceMembers')
      .where('userId', '==', userId)
      .where('isActive', '==', true)
      .where('campusId', '==', CURRENT_CAMPUS_ID)
      .limit(5)
      .get();

    for (const doc of activeMembershipSnapshot.docs) {
      const membershipSpace = await loadSpaceInfo(doc.data().spaceId);
      if (membershipSpace?.movementType === restriction.spaceType) {
        const validation = await validateMovementRestrictions(userId, restriction.spaceType, membershipSpace, null);
        restrictions[key] = validation;
        break;
      }
    }
  }

  return respond.success({
    movementHistory,
    currentRestrictions: restrictions,
    restrictionRules: MOVEMENT_RESTRICTIONS,
  });
});

function normalizeMovementType(type?: string | null): string {
  return (type || '').toLowerCase();
}

function resolveMovementType(space: Record<string, any>): string | null {
  const directType = (space.movementType || space.movementCategory || '').toString().toLowerCase();
  if (directType && MOVEMENT_RESTRICTIONS[directType]) {
    return directType;
  }
  const rawType = (space.category || space.type || '').toString().toLowerCase();
  if (!rawType) return null;
  if (rawType.includes('campus') || rawType.includes('residential')) {
    return 'campus_living';
  }
  if (rawType.includes('cohort')) {
    return 'cohort';
  }
  if (rawType.includes('greek') || rawType.includes('fraternity')) {
    return 'fraternity_and_sorority';
  }
  return rawType;
}

async function loadSpaceInfo(spaceId: string): Promise<SpaceInfo | null> {
  const spaceDoc = await dbAdmin.collection('spaces').doc(spaceId).get();
  if (!spaceDoc.exists) {
    return null;
  }

  const data = spaceDoc.data() ?? {};
  if (data.campusId && data.campusId !== CURRENT_CAMPUS_ID) {
    return null;
  }

  return {
    id: spaceDoc.id,
    data,
    movementType: resolveMovementType(data),
  };
}

async function validateMovementRestrictions(
  userId: string,
  movementType: string,
  fromSpace: SpaceInfo | null,
  toSpace: SpaceInfo | null,
): Promise<MovementValidationResult> {
  const restriction = MOVEMENT_RESTRICTIONS[movementType];
  if (!restriction) {
    return { canMove: true };
  }

  const cooldownDate = new Date();
  cooldownDate.setDate(cooldownDate.getDate() - restriction.cooldownDays);

  const recentMovementsSnapshot = await dbAdmin
    .collection('spaceMovements')
    .where('userId', '==', userId)
    .where('spaceType', '==', movementType)
    .where('campusId', '==', CURRENT_CAMPUS_ID)
    .where('timestamp', '>=', cooldownDate.toISOString())
    .get();

  const recentMovements = recentMovementsSnapshot.docs.map((doc) => doc.data());

  if (restriction.maxMovements > 0 && recentMovements.length >= restriction.maxMovements) {
    const lastMovement = recentMovements
      .map((movement) => new Date(movement.timestamp))
      .sort((a, b) => b.getTime() - a.getTime())[0];

    if (lastMovement) {
      const nextAvailable = new Date(lastMovement);
      nextAvailable.setDate(nextAvailable.getDate() + restriction.cooldownDays);

      if (Date.now() < nextAvailable.getTime()) {
        return {
          canMove: false,
          reason: `Movement restricted. You can move again after ${nextAvailable.toLocaleDateString()}`,
          nextAvailableDate: nextAvailable.toISOString(),
          currentCooldownDays: Math.ceil(
            (nextAvailable.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
          ),
          movementsThisPeriod: recentMovements.length,
        };
      }
    }
  }

  if (
    movementType === 'cohort' &&
    restriction.lockDuration &&
    fromSpace?.data?.name &&
    toSpace?.data?.name &&
    fromSpace.data.name !== toSpace.data.name
  ) {
    const membershipSnapshot = await dbAdmin
      .collection('spaceMembers')
      .where('userId', '==', userId)
      .where('spaceId', '==', fromSpace.id)
      .where('isActive', '==', true)
      .where('campusId', '==', CURRENT_CAMPUS_ID)
      .limit(1)
      .get();

    if (!membershipSnapshot.empty) {
      const membershipData = membershipSnapshot.docs[0].data();
      const joinedAt = membershipData.joinedAt?.toDate?.() ?? new Date();
      const lockUntil = new Date(joinedAt);
      lockUntil.setDate(lockUntil.getDate() + restriction.lockDuration);

      if (Date.now() < lockUntil.getTime()) {
        return {
          canMove: false,
          reason: `Year-based spaces are locked for 1 year. You can change after ${lockUntil.toLocaleDateString()}`,
          nextAvailableDate: lockUntil.toISOString(),
          currentCooldownDays: Math.ceil(
            (lockUntil.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
          ),
        };
      }
    }
  }

  return { canMove: true };
}
