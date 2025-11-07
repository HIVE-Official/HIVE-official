import type * as admin from 'firebase-admin';
import { HttpStatus } from '@/lib/api-response-types';
import {
  validateSecureSpaceAccess,
  validateSecureSpaceMembership,
} from '@/lib/secure-firebase-queries';

interface SpaceAccessFailure {
  ok: false;
  status: number;
  error: string;
}

interface SpaceAccessSuccess {
  ok: true;
  space: admin.firestore.DocumentData;
}

export type SpaceAccessResult = SpaceAccessFailure | SpaceAccessSuccess;

interface SpaceMembershipSuccess extends SpaceAccessSuccess {
  membership: admin.firestore.DocumentData;
  membershipRef: admin.firestore.DocumentReference<admin.firestore.DocumentData>;
}

export type SpaceMembershipResult = SpaceAccessFailure | SpaceMembershipSuccess;

export async function requireSpaceAccess(
  spaceId: string,
  userId?: string,
): Promise<SpaceAccessResult> {
  const access = await validateSecureSpaceAccess(spaceId, userId);
  if (!access.isValid) {
    return {
      ok: false,
      status: access.error === 'Space not found' ? HttpStatus.NOT_FOUND : HttpStatus.FORBIDDEN,
      error: access.error || 'Access denied',
    };
  }

  return {
    ok: true,
    space: access.space!,
  };
}

export async function requireSpaceMembership(
  spaceId: string,
  userId: string,
): Promise<SpaceMembershipResult> {
  const membership = await validateSecureSpaceMembership(userId, spaceId);
  if (!membership.isValid) {
    return {
      ok: false,
      status: membership.error === 'Space not found' ? HttpStatus.NOT_FOUND : HttpStatus.FORBIDDEN,
      error: membership.error || 'Access denied',
    };
  }

  return {
    ok: true,
    space: membership.space!,
    membership: membership.membership!,
    membershipRef: membership.membershipRef!,
  };
}
