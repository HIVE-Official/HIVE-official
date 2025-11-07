import { dbAdmin } from './firebase-admin';
import { auth } from 'firebase-admin';
import { logger } from './structured-logger';
import { logAdminAction } from './admin-auth-firebase';
import { FieldValue } from 'firebase-admin/firestore';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

interface ModerationReport {
  id: string;
  type: 'post' | 'comment' | 'profile' | 'space';
  contentId: string;
  reportedUserId: string;
  reportedBy: string;
  reason: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'critical';
  campusId: string;
  createdAt: Date;
}

/**
 * Remove content and take action on user
 */
export async function moderateContent(
  adminId: string,
  reportId: string,
  action: 'dismiss' | 'warn' | 'remove' | 'suspend' | 'ban',
  notes?: string
) {
  const batch = dbAdmin.batch();

  try {
    // Get the report
    const reportDoc = await dbAdmin.collection('reports').doc(reportId).get();
    if (!reportDoc.exists) {
      throw new Error('Report not found');
    }

    const report = reportDoc.data() as ModerationReport;

    // Take action based on severity
    switch (action) {
      case 'dismiss':
        // Just mark report as resolved
        batch.update(reportDoc.ref, {
          status: 'resolved',
          resolution: 'dismissed',
          resolvedBy: adminId,
          resolvedAt: FieldValue.serverTimestamp(),
          notes
        });
        break;

      case 'warn':
        // Send warning to user
        batch.create(dbAdmin.collection('notifications').doc(), {
          userId: report.reportedUserId,
          type: 'warning',
          title: 'Community Guidelines Warning',
          message: 'Your content has been flagged for violating community guidelines.',
          reportId,
          createdAt: FieldValue.serverTimestamp(),
          campusId: CURRENT_CAMPUS_ID
        });

        // Update user warnings count
        batch.update(dbAdmin.collection('users').doc(report.reportedUserId), {
          warningsCount: FieldValue.increment(1),
          lastWarningAt: FieldValue.serverTimestamp()
        });

        // Mark report resolved
        batch.update(reportDoc.ref, {
          status: 'resolved',
          resolution: 'warned',
          resolvedBy: adminId,
          resolvedAt: FieldValue.serverTimestamp(),
          notes
        });
        break;

      case 'remove':
        // Remove the content
        if (report.type === 'post') {
          batch.update(dbAdmin.collection('posts').doc(report.contentId), {
            removed: true,
            removedBy: adminId,
            removedAt: FieldValue.serverTimestamp(),
            removalReason: report.reason
          });
        } else if (report.type === 'comment') {
          batch.update(dbAdmin.collection('comments').doc(report.contentId), {
            removed: true,
            removedBy: adminId,
            removedAt: FieldValue.serverTimestamp()
          });
        }

        // Notify user
        batch.create(dbAdmin.collection('notifications').doc(), {
          userId: report.reportedUserId,
          type: 'content_removed',
          title: 'Content Removed',
          message: 'Your content has been removed for violating community guidelines.',
          reportId,
          createdAt: FieldValue.serverTimestamp(),
          campusId: CURRENT_CAMPUS_ID
        });

        // Update user violations
        batch.update(dbAdmin.collection('users').doc(report.reportedUserId), {
          violationsCount: FieldValue.increment(1),
          lastViolationAt: FieldValue.serverTimestamp()
        });

        // Mark report resolved
        batch.update(reportDoc.ref, {
          status: 'resolved',
          resolution: 'content_removed',
          resolvedBy: adminId,
          resolvedAt: FieldValue.serverTimestamp(),
          notes
        });
        break;

      case 'suspend': {
        // Suspend user for 7 days
        const suspendUntil = new Date();
        suspendUntil.setDate(suspendUntil.getDate() + 7);

        batch.update(dbAdmin.collection('users').doc(report.reportedUserId), {
          suspended: true,
          suspendedUntil: suspendUntil,
          suspendedBy: adminId,
          suspendedAt: FieldValue.serverTimestamp(),
          suspensionReason: report.reason
        });

        // Notify user
        batch.create(dbAdmin.collection('notifications').doc(), {
          userId: report.reportedUserId,
          type: 'account_suspended',
          title: 'Account Suspended',
          message: 'Your account has been suspended for 7 days due to community guideline violations.',
          reportId,
          createdAt: FieldValue.serverTimestamp(),
          campusId: 'ub-buffalo'
        });

        // Mark report resolved
        batch.update(reportDoc.ref, {
          status: 'resolved',
          resolution: 'user_suspended',
          resolvedBy: adminId,
          resolvedAt: FieldValue.serverTimestamp(),
          notes
        });
        break;
      }

      case 'ban':
        // Permanently ban user
        await auth().updateUser(report.reportedUserId, {
          disabled: true
        });

        batch.update(dbAdmin.collection('users').doc(report.reportedUserId), {
          banned: true,
          bannedBy: adminId,
          bannedAt: FieldValue.serverTimestamp(),
          banReason: report.reason
        });

        // Mark report resolved
        batch.update(reportDoc.ref, {
          status: 'resolved',
          resolution: 'user_banned',
          resolvedBy: adminId,
          resolvedAt: FieldValue.serverTimestamp(),
          notes
        });
        break;
    }

    // Commit all changes
    await batch.commit();

    // Log admin action
    await logAdminAction(adminId, `moderation_${action}`, {
      reportId,
      userId: report.reportedUserId,
      contentType: report.type,
      contentId: report.contentId
    }, { notes });

    logger.info('Moderation action completed', {
      metadata: {
        adminId,
        reportId,
        action,
        userId: report.reportedUserId
      }
    } as any);

    return { success: true, action };

  } catch (error) {
    logger.error('Moderation action failed', {
      metadata: {
        adminId,
        reportId,
        action
      },
      error: error instanceof Error ? error.message : 'Unknown error'
    } as any);
    throw error;
  }
}

/**
 * Get pending moderation reports
 */
export async function getPendingReports(limit = 50) {
  try {
    const snapshot = await dbAdmin
      .collection('reports')
      .where('campusId', '==', CURRENT_CAMPUS_ID)
      .where('status', 'in', ['pending', 'reviewing'])
      .orderBy('priority', 'desc')
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    logger.error('Failed to fetch pending reports', {
      error: error instanceof Error ? error.message : 'Unknown error'
    } as any);
    return [];
  }
}

/**
 * Get moderation statistics
 */
export async function getModerationStats() {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Get counts in parallel
    const [pending, reviewing, resolvedToday] = await Promise.all([
      dbAdmin.collection('reports')
        .where('campusId', '==', CURRENT_CAMPUS_ID)
        .where('status', '==', 'pending')
        .count()
        .get(),

      dbAdmin.collection('reports')
        .where('campusId', '==', CURRENT_CAMPUS_ID)
        .where('status', '==', 'reviewing')
        .count()
        .get(),

      dbAdmin.collection('reports')
        .where('campusId', '==', CURRENT_CAMPUS_ID)
        .where('status', '==', 'resolved')
        .where('resolvedAt', '>=', today)
        .count()
        .get()
    ]);

    return {
      pending: pending.data().count,
      reviewing: reviewing.data().count,
      resolvedToday: resolvedToday.data().count,
      avgResponseTime: 15, // TODO: Calculate from actual data
      falsePositiveRate: 5 // TODO: Calculate from actual data
    };
  } catch (error) {
    logger.error('Failed to get moderation stats', {
      error: error instanceof Error ? error.message : 'Unknown error'
    } as any);
    return {
      pending: 0,
      reviewing: 0,
      resolvedToday: 0,
      avgResponseTime: 0,
      falsePositiveRate: 0
    };
  }
}
import 'server-only';
