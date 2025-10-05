import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from '@/lib/middleware';

/**
 * Check and grant pending admin permissions
 * This endpoint is called after successful authentication to grant admin rights
 * to pre-approved users who are signing in for the first time
 *
 * POST /api/auth/check-admin-grant
 */

// List of pre-approved admin emails
const APPROVED_ADMIN_EMAILS = [
  'jwrhineh@buffalo.edu',  // Jacob Rhinehart - Founder
  'noahowsh@gmail.com',     // Noah - Co-founder
];

export const POST = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  try {
    const userId = getUserId(request);

    // Get user from Firebase Auth
    const auth = getAuth();
    const userRecord = await auth.getUser(userId);
    const userEmail = userRecord.email;

    if (!userEmail) {
      return respond.success({
        granted: false,
        reason: 'No email associated with account'
      });
    }

    // Check if user is in approved admin list
    if (!APPROVED_ADMIN_EMAILS.includes(userEmail)) {
      return respond.success({
        granted: false,
        reason: 'Not in admin list'
      });
    }

    // Check if already has admin claims
    if (userRecord.customClaims?.isAdmin === true) {
      logger.info('User already has admin claims', {
        userId,
        email: userEmail,
        endpoint: '/api/auth/check-admin-grant'
      });

      return respond.success({
        granted: false,
        reason: 'Already admin',
        isAdmin: true
      });
    }

    // Grant admin permissions
    logger.info('🔐 Granting admin permissions', {
      userId,
      email: userEmail,
      endpoint: '/api/auth/check-admin-grant'
    });

    // Determine role based on email
    const role = userEmail === 'jwrhineh@buffalo.edu' ? 'super_admin' : 'admin';
    const permissions = role === 'super_admin' ? ['all'] : [
      'read',
      'write',
      'delete',
      'moderate',
      'manage_users',
      'manage_spaces',
      'feature_flags'
    ];

    // Set Firebase custom claims
    const customClaims = {
      role,
      permissions,
      isAdmin: true,
      adminSince: new Date().toISOString()
    };

    await auth.setCustomUserClaims(userId, customClaims);

    // Update Firestore user document
    const userUpdateData = {
      isAdmin: true,
      adminRole: role,
      adminPermissions: permissions,
      adminGrantedAt: new Date().toISOString(),
      adminGrantedBy: 'auto-grant',
      email: userEmail
    };

    await dbAdmin.collection('users').doc(userId).set(userUpdateData, { merge: true });

    // Add to admins collection
    await dbAdmin.collection('admins').doc(userId).set({
      uid: userId,
      email: userEmail,
      name: userRecord.displayName || userEmail.split('@')[0],
      role,
      permissions,
      active: true,
      createdAt: new Date().toISOString(),
      grantedBy: 'auto-grant'
    });

    // Remove from pending grants if exists
    try {
      await dbAdmin.collection('pendingAdminGrants').doc(userEmail).delete();
    } catch (error) {
      // Ignore if doesn't exist
    }

    logger.info('✅ Admin permissions granted successfully', {
      userId,
      email: userEmail,
      endpoint: '/api/auth/check-admin-grant'
    });

    return respond.success({
      granted: true,
      role,
      permissions,
      message: 'Admin permissions granted successfully. Please refresh to access admin features.'
    });

  } catch (error) {
    logger.error(
      `Error granting admin permissions at /api/auth/check-admin-grant`,
      error instanceof Error ? error : new Error(String(error))
    );

    return respond.error(
      'Failed to check/grant admin permissions',
      'INTERNAL_ERROR'
    );
  }
});