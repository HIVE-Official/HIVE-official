import { auth } from 'firebase-admin';
import { dbAdmin as adminDb } from './firebase-admin';
import { logger } from './structured-logger';

// Admin user IDs - Move to Firestore admin collection in production
const ADMIN_EMAILS = [
  'jacob@buffalo.edu', // You
  'admin@buffalo.edu', // Admin account
];

/**
 * Check if a user has admin privileges
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
  try {
    // Check Firebase Auth custom claims
    const user = await auth().getUser(userId);
    if (user.customClaims?.admin === true) {
      return true;
    }

    // Check email in admin list (fallback for development)
    if (user.email && ADMIN_EMAILS.includes(user.email)) {
      // Grant admin claim for faster future checks
      await auth().setCustomUserClaims(userId, {
        ...user.customClaims,
        admin: true
      });
      logger.info('Admin claim granted to user', { userId, email: user.email });
      return true;
    }

    // Check Firestore admins collection
    const adminDoc = await adminDb
      .collection('admins')
      .doc(userId)
      .get();

    if (adminDoc.exists && adminDoc.data()?.active === true) {
      // Grant admin claim for faster future checks
      await auth().setCustomUserClaims(userId, {
        ...user.customClaims,
        admin: true
      });
      return true;
    }

    return false;
  } catch (error) {
    logger.error('Error checking admin status', { userId, error });
    return false;
  }
}

/**
 * Require admin access for a request
 */
export async function requireAdmin(userId: string): Promise<void> {
  const hasAdmin = await isUserAdmin(userId);
  if (!hasAdmin) {
    throw new Error('Admin access required');
  }
}

/**
 * Log admin action for audit trail
 */
export async function logAdminAction(
  adminId: string,
  action: string,
  target: any,
  metadata?: any
) {
  try {
    await adminDb.collection('admin_logs').add({
      adminId,
      action,
      target,
      metadata,
      timestamp: new Date(),
      campusId: 'ub-buffalo'
    });
  } catch (error) {
    logger.error('Failed to log admin action', {
      metadata: { adminId, action },
      error: error instanceof Error ? error.message : 'Unknown error'
    } as any);
  }
}