import { withAuthAndErrors, type AuthenticatedRequest } from "@/lib/middleware";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";

/**
 * Check if user has permission to create spaces
 * Implements multiple locks and restrictions
 */
export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const userId = request.user.uid;
  const userEmail = request.user.email || '';

  try {
    // Get user document
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    const userData = userDoc.data();

    if (!userData) {
      return respond.error("User not found", "NOT_FOUND", { status: 404 });
    }

    // Calculate account age in days
    const accountCreated = userData.createdAt?.toDate() || new Date();
    const accountAge = Math.floor((Date.now() - accountCreated.getTime()) / (1000 * 60 * 60 * 24));

    // Check email verification
    const emailVerified = request.user.decodedToken.email_verified || false;

    // Count spaces created today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const spacesCreatedTodaySnapshot = await dbAdmin
      .collection('spaces')
      .where('createdBy', '==', userId)
      .where('createdAt', '>=', todayStart)
      .get();

    const spacesCreatedToday = spacesCreatedTodaySnapshot.size;

    // Check if user is admin
    const isAdmin = userData.role === 'admin' || userData.isAdmin === true;

    // Check if user is banned from creating spaces
    const isBanned = userData.spaceBanned === true || userData.banned === true;

    // Determine if user can create spaces
    let canCreate = true;
    let reason = '';

    // Apply restrictions
    if (isBanned) {
      canCreate = false;
      reason = 'Your space creation privileges have been revoked';
    } else if (!emailVerified && !isAdmin) {
      canCreate = false;
      reason = 'Email verification required';
    } else if (accountAge < 7 && !isAdmin) {
      canCreate = false;
      reason = `Account must be at least 7 days old (current: ${accountAge} days)`;
    } else if (spacesCreatedToday >= 3 && !isAdmin) {
      canCreate = false;
      reason = 'Daily limit reached (3 spaces per day)';
    }

    // Check global platform lock
    const platformConfigDoc = await dbAdmin.collection('config').doc('platform').get();
    const platformConfig = platformConfigDoc.data();

    if (platformConfig?.spaceCreationLocked && !isAdmin) {
      canCreate = false;
      reason = platformConfig.spaceCreationLockReason || 'Space creation is temporarily disabled';
    }

    // Log permission check
    await dbAdmin.collection('audit_logs').add({
      type: 'space_creation_permission_check',
      userId,
      userEmail,
      canCreate,
      reason,
      accountAge,
      emailVerified,
      spacesCreatedToday,
      timestamp: new Date()
    });

    return respond.success({
      canCreate,
      reason,
      spacesCreatedToday,
      maxSpacesPerDay: isAdmin ? 999 : 3,
      accountAge,
      minAccountAge: 7,
      emailVerified,
      isAdmin,
      restrictions: {
        universityOrgLocked: !isAdmin,
        greekLifeLocked: !userData.greekLifeVerified && !isAdmin,
        requiresApproval: !emailVerified
      }
    });

  } catch (error) {
    logger.error('Error checking space creation permission', { error: error instanceof Error ? error : new Error(String(error)), userId });
    return respond.error("Failed to check permissions", "INTERNAL_ERROR", { status: 500 });
  }
});