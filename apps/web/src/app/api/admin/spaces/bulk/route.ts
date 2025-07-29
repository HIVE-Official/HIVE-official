import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAuth } from 'firebase-admin/auth';
import { dbAdmin } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

/**
 * Admin Bulk Space Operations API
 * Provides batch operations for efficient space management
 * POST /api/admin/spaces/bulk - Execute bulk operations
 */

// Admin user IDs (TODO: Move to environment variables or admin table)
const ADMIN_USER_IDS = [
  'test-user', // For development
  // Add real admin user IDs here
];

const bulkOperationSchema = z.object({
  action: z.enum(['activate', 'deactivate', 'archive', 'categorize', 'tag', 'feature', 'reset', 'delete']),
  spaceIds: z.array(z.string()).min(1, 'At least one space ID required').max(100, 'Maximum 100 spaces per operation'),
  params: z.object({
    reason: z.string().min(1, 'Reason is required for bulk operations').max(500),
    newCategory: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    priority: z.number().int().min(0).max(10).optional()
  }).optional()
});

interface BulkOperationResult {
  success: boolean;
  totalSpaces: number;
  successfulOperations: number;
  failedOperations: number;
  errors: Array<{
    spaceId: string;
    spaceType?: string;
    error: string;
  }>;
  operationDetails: Array<{
    spaceId: string;
    spaceType: string;
    spaceName: string;
    previousState: any;
    newState: any;
    success: boolean;
  }>;
  executionTime: number;
  adminUserId: string;
  timestamp: string;
}

/**
 * Check if user is an admin
 */
async function isAdmin(userId: string): Promise<boolean> {
  return ADMIN_USER_IDS.includes(userId);
}

/**
 * Get space information by ID (searches across all types)
 */
async function getSpaceInfo(spaceId: string): Promise<{ spaceDoc: any, spaceType: string, spaceData: any } | null> {
  const spaceTypes = ['campus_living', 'fraternity_and_sorority', 'hive_exclusive', 'student_organizations', 'university_organizations'];
  
  for (const type of spaceTypes) {
    try {
      const spaceRef = dbAdmin
        .collection('spaces')
        .doc(type)
        .collection('spaces')
        .doc(spaceId);
        
      const spaceDoc = await spaceRef.get();
      if (spaceDoc.exists) {
        return {
          spaceDoc,
          spaceType: type,
          spaceData: { id: spaceDoc.id, ...spaceDoc.data() }
        };
      }
    } catch (error) {
      console.error(`Error checking space ${spaceId} in type ${type}:`, error);
    }
  }
  
  return null;
}

/**
 * Execute bulk space operations
 * POST /api/admin/spaces/bulk
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let adminUserId: string;
    
    // Handle test tokens in development
    if (token === 'test-token') {
      adminUserId = 'test-user';
    } else {
      try {
        const auth = getAuth();
        const decodedToken = await auth.verifyIdToken(token);
        adminUserId = decodedToken.uid;
      } catch (authError) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
      }
    }

    // Check if user is admin
    if (!(await isAdmin(adminUserId))) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const { action, spaceIds, params } = bulkOperationSchema.parse(body);

    console.log(`👑 Admin ${adminUserId} executing bulk ${action} on ${spaceIds.length} spaces`);

    // Initialize result tracking
    const result: BulkOperationResult = {
      success: false,
      totalSpaces: spaceIds.length,
      successfulOperations: 0,
      failedOperations: 0,
      errors: [],
      operationDetails: [],
      executionTime: 0,
      adminUserId,
      timestamp: new Date().toISOString()
    };

    // Process each space
    const operationPromises = spaceIds.map(async (spaceId) => {
      try {
        // Get space information
        const spaceInfo = await getSpaceInfo(spaceId);
        if (!spaceInfo) {
          result.errors.push({
            spaceId,
            error: 'Space not found'
          });
          result.failedOperations++;
          return;
        }

        const { spaceDoc, spaceType, spaceData } = spaceInfo;
        const spaceRef = spaceDoc.ref;
        
        // Store previous state for audit
        const previousState = { ...spaceData };
        
        // Prepare update data based on action
        const updateData: any = {
          updatedAt: FieldValue.serverTimestamp(),
          lastModifiedBy: adminUserId,
          lastModifiedByAdmin: true,
          bulkOperationId: `bulk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };

        let newState: any = {};
        let operationSuccess = false;

        switch (action) {
          case 'activate':
            updateData.status = 'activated';
            updateData.activatedAt = FieldValue.serverTimestamp();
            updateData.activatedBy = adminUserId;
            updateData.activatedReason = params?.reason || 'Bulk activation';
            newState = { ...spaceData, status: 'activated' };
            operationSuccess = true;
            break;

          case 'deactivate':
            updateData.status = 'dormant';
            updateData.deactivatedAt = FieldValue.serverTimestamp();
            updateData.deactivatedBy = adminUserId;
            updateData.deactivatedReason = params?.reason || 'Bulk deactivation';
            newState = { ...spaceData, status: 'dormant' };
            operationSuccess = true;
            break;

          case 'archive':
            updateData.isArchived = true;
            updateData.archivedAt = FieldValue.serverTimestamp();
            updateData.archivedBy = adminUserId;
            updateData.archivedReason = params?.reason || 'Bulk archival';
            newState = { ...spaceData, isArchived: true };
            operationSuccess = true;
            break;

          case 'reset':
            updateData.hasBuilders = false;
            updateData.builderCount = 0;
            updateData.status = 'activated';
            updateData.resetAt = FieldValue.serverTimestamp();
            updateData.resetBy = adminUserId;
            updateData.resetReason = params?.reason || 'Bulk reset';
            newState = { ...spaceData, hasBuilders: false, builderCount: 0, status: 'activated' };
            operationSuccess = true;
            break;

          case 'categorize':
            if (params?.newCategory) {
              // This would require moving the space to a different collection
              // For now, we'll add a category tag
              const currentTags = spaceData.tags || [];
              updateData.tags = [...currentTags, `category:${params.newCategory}`];
              updateData.categorizedAt = FieldValue.serverTimestamp();
              updateData.categorizedBy = adminUserId;
              newState = { ...spaceData, tags: updateData.tags };
              operationSuccess = true;
            } else {
              throw new Error('New category parameter required');
            }
            break;

          case 'tag':
            if (params?.tags && params.tags.length > 0) {
              const currentTags = spaceData.tags || [];
              const newTags = [...new Set([...currentTags, ...params.tags])]; // Deduplicate
              updateData.tags = newTags;
              updateData.taggedAt = FieldValue.serverTimestamp();
              updateData.taggedBy = adminUserId;
              newState = { ...spaceData, tags: newTags };
              operationSuccess = true;
            } else {
              throw new Error('Tags parameter required');
            }
            break;

          case 'feature':
            updateData.isFeatured = params?.featured ?? true;
            updateData.featuredAt = FieldValue.serverTimestamp();
            updateData.featuredBy = adminUserId;
            if (params?.priority !== undefined) {
              updateData.featuredPriority = params.priority;
            }
            newState = { ...spaceData, isFeatured: updateData.isFeatured };
            operationSuccess = true;
            break;

          case 'delete':
            // Soft delete for safety
            updateData.isDeleted = true;
            updateData.deletedAt = FieldValue.serverTimestamp();
            updateData.deletedBy = adminUserId;
            updateData.deletedReason = params?.reason || 'Bulk deletion';
            newState = { ...spaceData, isDeleted: true };
            operationSuccess = true;
            break;

          default:
            throw new Error(`Unsupported bulk action: ${action}`);
        }

        // Execute the update
        await spaceRef.update(updateData);

        // Record successful operation
        result.operationDetails.push({
          spaceId,
          spaceType,
          spaceName: spaceData.name || 'Unknown',
          previousState,
          newState,
          success: true
        });

        result.successfulOperations++;

        // Log individual action for audit trail
        await logBulkAction(adminUserId, action, spaceId, spaceType, params?.reason || 'Bulk operation');

      } catch (error) {
        console.error(`Error processing space ${spaceId}:`, error);
        result.errors.push({
          spaceId,
          spaceType: 'unknown',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        result.failedOperations++;

        // Record failed operation
        result.operationDetails.push({
          spaceId,
          spaceType: 'unknown',
          spaceName: 'Unknown',
          previousState: {},
          newState: {},
          success: false
        });
      }
    });

    // Execute all operations in parallel (with concurrency limit)
    const CONCURRENCY_LIMIT = 10;
    for (let i = 0; i < operationPromises.length; i += CONCURRENCY_LIMIT) {
      const batch = operationPromises.slice(i, i + CONCURRENCY_LIMIT);
      await Promise.all(batch);
    }

    // Calculate execution time and finalize result
    result.executionTime = Date.now() - startTime;
    result.success = result.failedOperations === 0;

    // Log bulk operation summary
    await logBulkOperationSummary(adminUserId, action, result);

    console.log(`👑 Bulk ${action} completed: ${result.successfulOperations}/${result.totalSpaces} successful in ${result.executionTime}ms`);

    return NextResponse.json({
      success: true,
      message: `Bulk ${action} completed`,
      result,
      summary: {
        action,
        totalSpaces: result.totalSpaces,
        successful: result.successfulOperations,
        failed: result.failedOperations,
        executionTime: result.executionTime
      }
    });

  } catch (error: any) {
    console.error('Bulk operation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid request data', 
          details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Bulk operation failed',
        executionTime: Date.now() - startTime
      },
      { status: 500 }
    );
  }
}

/**
 * Log individual bulk action for audit trail
 */
async function logBulkAction(
  adminUserId: string, 
  action: string, 
  spaceId: string, 
  spaceType: string, 
  reason: string
) {
  try {
    await dbAdmin.collection('adminLogs').add({
      adminUserId,
      action: `bulk_${action}`,
      targetId: spaceId,
      targetType: 'space',
      spaceType,
      reason,
      timestamp: FieldValue.serverTimestamp(),
      type: 'bulk_space_action',
      isBulkOperation: true
    });
  } catch (error) {
    console.error('Error logging bulk action:', error);
  }
}

/**
 * Log bulk operation summary for audit trail
 */
async function logBulkOperationSummary(
  adminUserId: string, 
  action: string, 
  result: BulkOperationResult
) {
  try {
    await dbAdmin.collection('adminLogs').add({
      adminUserId,
      action: `bulk_${action}_summary`,
      timestamp: FieldValue.serverTimestamp(),
      type: 'bulk_operation_summary',
      isBulkOperation: true,
      summary: {
        action,
        totalSpaces: result.totalSpaces,
        successfulOperations: result.successfulOperations,
        failedOperations: result.failedOperations,
        executionTime: result.executionTime,
        errorCount: result.errors.length
      },
      errors: result.errors,
      affectedSpaces: result.operationDetails.map(op => ({
        spaceId: op.spaceId,
        spaceType: op.spaceType,
        spaceName: op.spaceName,
        success: op.success
      }))
    });
  } catch (error) {
    console.error('Error logging bulk operation summary:', error);
  }
}