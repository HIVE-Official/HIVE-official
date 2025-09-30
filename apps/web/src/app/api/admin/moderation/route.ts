import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-server';
import { contentModerationService } from '@/lib/content-moderation-service';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus } from '@/lib/api-response-types';
import { z } from 'zod';

/**
 * Admin Moderation API
 * GET /api/admin/moderation - Get moderation queue
 * POST /api/admin/moderation - Process moderation action
 * PUT /api/admin/moderation - Update moderation rules
 */

const ModerationActionSchema = z.object({
  reportId: z.string().min(1, 'Report ID is required'),
  action: z.enum(['no_action', 'warn_user', 'hide_content', 'remove_content', 'suspend_user', 'ban_user', 'escalate_human']),
  reason: z.string().min(5, 'Reason must be at least 5 characters').max(500, 'Reason too long'),
  notes: z.string().max(1000, 'Notes too long').optional()
});

const ModerationRuleSchema = z.object({
  name: z.string().min(1, 'Rule name is required'),
  description: z.string().min(1, 'Rule description is required'),
  isActive: z.boolean(),
  priority: z.number().int().min(1).max(100),
  conditions: z.object({
    categories: z.array(z.enum([
      'spam', 'harassment', 'hate_speech', 'inappropriate_content',
      'misinformation', 'copyright', 'privacy_violation', 'violence',
      'self_harm', 'impersonation', 'other'
    ])),
    severities: z.array(z.enum(['low', 'medium', 'high', 'critical'])),
    aiConfidence: z.number().min(0).max(1),
    reporterTrustScore: z.number().min(0).max(1),
    multipleReports: z.number().int().min(1),
    contentAge: z.number().int().min(0)
  }),
  actions: z.object({
    automatic: z.array(z.enum(['no_action', 'warn_user', 'hide_content', 'remove_content', 'suspend_user', 'ban_user', 'escalate_human'])),
    requireHumanReview: z.boolean(),
    notifyModerators: z.boolean(),
    escalateImmediately: z.boolean()
  })
});

// GET - Get moderation queue
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error('Authentication required', 'UNAUTHORIZED'),
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    // Check if user is admin/moderator
    const hasModeratorAccess = await checkModeratorPermissions(user.uid);
    if (!hasModeratorAccess) {
      return NextResponse.json(
        ApiResponseHelper.error('Moderator access required', 'FORBIDDEN'),
        { status: HttpStatus.FORBIDDEN }
      );
    }

    const { searchParams } = new URL(request.url);
    const queueId = searchParams.get('queueId');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const severity = searchParams.get('severity');
    const assignedTo = searchParams.get('assignedTo');

    // Get moderation queue
    let reports = await contentModerationService.getModerationQueue(
      queueId || undefined,
      assignedTo === 'me' ? user.uid : assignedTo || undefined,
      limit
    );

    // Apply additional filters
    if (status) {
      reports = reports.filter(report => report.status === status);
    }
    if (category) {
      reports = reports.filter(report => report.category === category);
    }
    if (severity) {
      reports = reports.filter(report => report.severity === severity);
    }

    // Get queue statistics
    const queueStats = await getQueueStatistics();

    return NextResponse.json({
      success: true,
      reports,
      statistics: queueStats,
      pagination: {
        limit,
        count: reports.length
      },
      filters: {
        status,
        category,
        severity,
        assignedTo
      }
    });

  } catch (error) {
    logger.error('Error getting moderation queue', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json(
      ApiResponseHelper.error('Failed to get moderation queue', 'INTERNAL_ERROR'),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// POST - Process moderation action
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error('Authentication required', 'UNAUTHORIZED'),
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    // Check if user is admin/moderator
    const hasModeratorAccess = await checkModeratorPermissions(user.uid);
    if (!hasModeratorAccess) {
      return NextResponse.json(
        ApiResponseHelper.error('Moderator access required', 'FORBIDDEN'),
        { status: HttpStatus.FORBIDDEN }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = ModerationActionSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        ApiResponseHelper.error('Invalid request data', 'INVALID_INPUT', validation.error.errors),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    const { reportId, action, reason, notes } = validation.data;

    // Process the moderation action
    await contentModerationService.processModerationAction(
      reportId,
      user.uid,
      action,
      reason,
      notes
    );

    // Log moderator action
    logger.info('Moderation action processed', {
      reportId,
      moderatorId: user.uid,
      action,
      reason: reason.substring(0, 100) // Log first 100 chars of reason
    });

    return NextResponse.json({
      success: true,
      message: 'Moderation action processed successfully',
      action: {
        reportId,
        action,
        processedAt: new Date().toISOString(),
        processedBy: user.uid
      }
    });

  } catch (error) {
    logger.error('Error processing moderation action', { error: error instanceof Error ? error : new Error(String(error)) });
    
    if (error instanceof Error && error.message.includes('Report not found')) {
      return NextResponse.json(
        ApiResponseHelper.error('Report not found', 'NOT_FOUND'),
        { status: HttpStatus.NOT_FOUND }
      );
    }

    return NextResponse.json(
      ApiResponseHelper.error('Failed to process moderation action', 'INTERNAL_ERROR'),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// PUT - Update moderation rules (admin only)
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error('Authentication required', 'UNAUTHORIZED'),
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    // Check if user is admin
    const isAdmin = await checkAdminPermissions(user.uid);
    if (!isAdmin) {
      return NextResponse.json(
        ApiResponseHelper.error('Admin access required', 'FORBIDDEN'),
        { status: HttpStatus.FORBIDDEN }
      );
    }

    const body = await request.json();
    const { ruleId, ...ruleData } = body;

    if (ruleId) {
      // Update existing rule
      const validation = ModerationRuleSchema.partial().safeParse(ruleData);
      if (!validation.success) {
        return NextResponse.json(
          ApiResponseHelper.error('Invalid rule data', 'INVALID_INPUT', validation.error.errors),
          { status: HttpStatus.BAD_REQUEST }
        );
      }

      await updateModerationRule(ruleId, validation.data, user.uid);
      
      return NextResponse.json({
        success: true,
        message: 'Moderation rule updated successfully',
        ruleId
      });
    } else {
      // Create new rule
      const validation = ModerationRuleSchema.safeParse(ruleData);
      if (!validation.success) {
        return NextResponse.json(
          ApiResponseHelper.error('Invalid rule data', 'INVALID_INPUT', validation.error.errors),
          { status: HttpStatus.BAD_REQUEST }
        );
      }

      const newRuleId = await createModerationRule(validation.data, user.uid);
      
      return NextResponse.json({
        success: true,
        message: 'Moderation rule created successfully',
        ruleId: newRuleId
      });
    }

  } catch (error) {
    logger.error('Error updating moderation rules', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json(
      ApiResponseHelper.error('Failed to update moderation rules', 'INTERNAL_ERROR'),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// Helper function to check moderator permissions
async function checkModeratorPermissions(userId: string): Promise<boolean> {
  try {
    const { dbAdmin } = await import('@/lib/firebase-admin');
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    if (!userDoc.exists) return false;
    
    const userData = userDoc.data();
    return userData?.role === 'admin' || 
           userData?.role === 'moderator' || 
           userData?.permissions?.includes('moderate_content');
  } catch (error) {
    logger.error('Error checking moderator permissions', { error: error instanceof Error ? error : new Error(String(error)), userId });
    return false;
  }
}

// Helper function to check admin permissions
async function checkAdminPermissions(userId: string): Promise<boolean> {
  try {
    const { dbAdmin } = await import('@/lib/firebase-admin');
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    if (!userDoc.exists) return false;
    
    const userData = userDoc.data();
    return userData?.role === 'admin' || userData?.permissions?.includes('admin');
  } catch (error) {
    logger.error('Error checking admin permissions', { error: error instanceof Error ? error : new Error(String(error)), userId });
    return false;
  }
}

// Helper function to get queue statistics
async function getQueueStatistics() {
  try {
    const { dbAdmin } = await import('@/lib/firebase-admin');
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const [pendingReports, todayReports, resolvedToday] = await Promise.all([
      dbAdmin.collection('contentReports')
        .where('status', 'in', ['pending', 'under_review'])
        .get(),
      dbAdmin.collection('contentReports')
        .where('createdAt', '>=', todayStart.toISOString())
        .get(),
      dbAdmin.collection('contentReports')
        .where('status', '==', 'resolved')
        .where('updatedAt', '>=', todayStart.toISOString())
        .get()
    ]);

    return {
      pendingReports: pendingReports.size,
      todayReports: todayReports.size,
      resolvedToday: resolvedToday.size,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    logger.error('Error getting queue statistics', { error: error instanceof Error ? error : new Error(String(error)) });
    return {
      pendingReports: 0,
      todayReports: 0,
      resolvedToday: 0,
      lastUpdated: new Date().toISOString()
    };
  }
}

// Helper function to update moderation rule
async function updateModerationRule(ruleId: string, ruleData: any, adminUserId: string) {
  const { dbAdmin } = await import('@/lib/firebase-admin');
  
  await dbAdmin.collection('moderationRules').doc(ruleId).update({
    ...ruleData,
    updatedAt: new Date().toISOString(),
    updatedBy: adminUserId
  });

  // Log admin action
  logger.info('Moderation rule updated', { ruleId, adminUserId });
}

// Helper function to create moderation rule
async function createModerationRule(ruleData: any, adminUserId: string): Promise<string> {
  const { dbAdmin } = await import('@/lib/firebase-admin');
  
  const newRule = {
    ...ruleData,
    id: `rule_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: adminUserId,
    updatedBy: adminUserId,
    statistics: {
      triggered: 0,
      accuracy: 0,
      lastTriggered: null
    }
  };

  await dbAdmin.collection('moderationRules').doc(newRule.id).set(newRule);

  // Log admin action
  logger.info('Moderation rule created', { ruleId: newRule.id, adminUserId });

  return newRule.id;
}