import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/providers/auth-server';
import { automatedModerationWorkflows } from '@/lib/services/moderation/automated-moderation-workflows';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus } from '@/lib/api/response-types/api-response-types';
import { z } from 'zod';

/**
 * Automated Moderation Workflows API
 * GET /api/admin/moderation/workflows - Get all workflows
 * POST /api/admin/moderation/workflows - Create new workflow
 * PUT /api/admin/moderation/workflows - Update workflow
 * DELETE /api/admin/moderation/workflows - Delete workflow
 */

const WorkflowSchema = z.object({
  name: z.string().min(1, 'Workflow name is required'),
  description: z.string().min(1, 'Workflow description is required'),
  isActive: z.boolean(),
  priority: z.number().int().min(1).max(100),
  triggers: z.object({
    reportCount: z.number().int().min(1),
    timeWindow: z.number().int().min(1),
    aiConfidenceThreshold: z.number().min(0).max(1),
    severityLevels: z.array(z.enum(['low', 'medium', 'high', 'critical'])),
    contentTypes: z.array(z.enum(['post', 'comment', 'message', 'tool', 'space', 'profile', 'event'])),
    reporterTrustThreshold: z.number().min(0).max(1)
  }),
  actions: z.object({
    immediate: z.array(z.object({
      type: z.enum(['hide_content', 'remove_content', 'warn_user', 'suspend_user', 'ban_user', 'notify_moderators']),
      parameters: z.object({
        duration: z.number().optional(),
        message: z.string().optional(),
        notificationTemplate: z.string().optional()
      }).optional(),
      delayMinutes: z.number().optional()
    })),
    delayed: z.array(z.object({
      action: z.object({
        type: z.enum(['hide_content', 'remove_content', 'warn_user', 'suspend_user', 'ban_user', 'notify_moderators']),
        delayMinutes: z.number().min(1)
      }),
      conditions: z.object({
        noModerationAction: z.boolean(),
        reportStillActive: z.boolean()
      })
    })),
    escalation: z.array(z.object({
      condition: z.enum(['time_passed', 'multiple_reports', 'ai_confidence', 'user_appeal']),
      threshold: z.number(),
      action: z.enum(['assign_human', 'notify_admin', 'priority_queue']),
      parameters: z.any().optional()
    }))
  }),
  conditions: z.object({
    requireMultipleReports: z.boolean(),
    requireAIConfirmation: z.boolean(),
    requireHumanApproval: z.boolean(),
    businessHoursOnly: z.boolean()
  })
});

// GET - Get all workflows and statistics
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const includeStats = searchParams.get('includeStats') === 'true';
    const activeOnly = searchParams.get('activeOnly') === 'true';

    // Get workflows
    const workflows = await getWorkflows(activeOnly);
    
    // Get statistics if requested
    let statistics = null;
    if (includeStats) {
      statistics = await automatedModerationWorkflows.getWorkflowStatistics();
    }

    return NextResponse.json({
      success: true,
      workflows,
      statistics,
      count: workflows.length
    });

  } catch (error) {
    logger.error('Error getting moderation workflows', { error });
    return NextResponse.json(
      ApiResponseHelper.error('Failed to get workflows', 'INTERNAL_ERROR'),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// POST - Create new workflow
export async function POST(request: NextRequest) {
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

    // Parse and validate request body
    const body = await request.json();
    const validation = WorkflowSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        ApiResponseHelper.error('Invalid workflow data', 'INVALID_INPUT', validation.error.errors),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    const workflowData = validation.data;

    // Create workflow
    const workflowId = await automatedModerationWorkflows.createWorkflow(workflowData);

    // Log admin action
    logger.info('Automated workflow created', {
      workflowId,
      adminUserId: user.uid,
      workflowName: workflowData.name
    });

    return NextResponse.json({
      success: true,
      workflowId,
      message: 'Automated workflow created successfully'
    });

  } catch (error) {
    logger.error('Error creating moderation workflow', { error });
    return NextResponse.json(
      ApiResponseHelper.error('Failed to create workflow', 'INTERNAL_ERROR'),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// PUT - Update existing workflow
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
    const { workflowId, ...updateData } = body;

    if (!workflowId) {
      return NextResponse.json(
        ApiResponseHelper.error('Workflow ID is required', 'INVALID_INPUT'),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // Validate update data
    const validation = WorkflowSchema.partial().safeParse(updateData);
    if (!validation.success) {
      return NextResponse.json(
        ApiResponseHelper.error('Invalid workflow data', 'INVALID_INPUT', validation.error.errors),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // Update workflow
    await automatedModerationWorkflows.updateWorkflow(workflowId, validation.data);

    // Log admin action
    logger.info('Automated workflow updated', {
      workflowId,
      adminUserId: user.uid,
      updatedFields: Object.keys(updateData)
    });

    return NextResponse.json({
      success: true,
      message: 'Workflow updated successfully'
    });

  } catch (error) {
    logger.error('Error updating moderation workflow', { error });
    return NextResponse.json(
      ApiResponseHelper.error('Failed to update workflow', 'INTERNAL_ERROR'),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// DELETE - Delete workflow
export async function DELETE(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const workflowId = searchParams.get('workflowId');

    if (!workflowId) {
      return NextResponse.json(
        ApiResponseHelper.error('Workflow ID is required', 'INVALID_INPUT'),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // Deactivate workflow instead of deleting (safer)
    await automatedModerationWorkflows.updateWorkflow(workflowId, {
      isActive: false
    } as any);

    // Log admin action
    logger.info('Automated workflow deleted', {
      workflowId,
      adminUserId: user.uid
    });

    return NextResponse.json({
      success: true,
      message: 'Workflow deleted successfully'
    });

  } catch (error) {
    logger.error('Error deleting moderation workflow', { error });
    return NextResponse.json(
      ApiResponseHelper.error('Failed to delete workflow', 'INTERNAL_ERROR'),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// Helper function to check admin permissions
async function checkAdminPermissions(userId: string): Promise<boolean> {
  try {
    const { dbAdmin } = await import('@/lib/firebase/admin/firebase-admin');
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    if (!userDoc.exists) return false;
    
    const userData = userDoc.data();
    return userData?.role === 'admin' || userData?.permissions?.includes('admin');
  } catch (error) {
    logger.error('Error checking admin permissions', { error, userId });
    return false;
  }
}

// Helper function to get workflows
async function getWorkflows(activeOnly: boolean = false) {
  try {
    const { dbAdmin } = await import('@/lib/firebase/admin/firebase-admin');
    let query = dbAdmin.collection('automatedWorkflows')
      .orderBy('priority', 'desc')
      .orderBy('createdAt', 'desc');

    if (activeOnly) {
      query = query.where('isActive', '==', true);
    }

    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    logger.error('Error getting workflows', { error });
    return [];
  }
}