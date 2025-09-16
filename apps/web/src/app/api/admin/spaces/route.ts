import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAuth } from 'firebase-admin/auth';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";

/**
 * Admin Space Management API
 * Provides comprehensive space management capabilities for HIVE team
 * GET /api/admin/spaces - List and search spaces
 * POST /api/admin/spaces - Create or update space
 * DELETE /api/admin/spaces - Delete/archive space
 */

// Admin user IDs (TODO: Move to environment variables or admin table)
const ADMIN_USER_IDS = [
  'test-user', // For development
  // Add real admin user IDs here
];

const spaceActionSchema = z.object({
  spaceId: z.string().min(1, 'Space ID is required'),
  spaceType: z.enum(['campus_living', 'fraternity_and_sorority', 'hive_exclusive', 'student_organizations', 'university_organizations']),
  action: z.enum(['activate', 'deactivate', 'archive', 'delete', 'reset']),
  reason: z.string().min(1, 'Reason is required').max(500, 'Reason must be under 500 characters')
});

const spaceUpdateSchema = z.object({
  spaceId: z.string().min(1, 'Space ID is required'),
  spaceType: z.enum(['campus_living', 'fraternity_and_sorority', 'hive_exclusive', 'student_organizations', 'university_organizations']),
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  isPrivate: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  maxMembers: z.number().positive().optional()
});

const spaceCreateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().min(1, 'Description is required').max(500),
  spaceType: z.enum(['campus_living', 'fraternity_and_sorority', 'hive_exclusive', 'student_organizations', 'university_organizations']),
  isPrivate: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  maxMembers: z.number().positive().default(1000)
});

/**
 * Check if user is an admin
 */
async function isAdmin(userId: string): Promise<boolean> {
  return ADMIN_USER_IDS.includes(userId);
}

/**
 * Get spaces with filtering and pagination
 * GET /api/admin/spaces
 */
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Authorization header required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
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
        return NextResponse.json(ApiResponseHelper.error("Invalid or expired token", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
      }
    }

    // Check if user is admin
    if (!(await isAdmin(adminUserId))) {
      return NextResponse.json(ApiResponseHelper.error("Admin access required", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Parse query parameters
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const spaceType = url.searchParams.get('type') || 'all';
    const status = url.searchParams.get('status') || 'all'; // all, active, dormant, archived
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    logger.info('👑 Admin accessing space management', { adminUserId, endpoint: '/api/admin/spaces' });

    // Get spaces across all types or specific type
    const spaceTypes = spaceType === 'all' ? 
      ['campus_living', 'fraternity_and_sorority', 'hive_exclusive', 'student_organizations', 'university_organizations'] :
      [spaceType];

    let allSpaces: any[] = [];

    for (const type of spaceTypes) {
      try {
        const spacesSnapshot = await dbAdmin
          .collection('spaces')
          .doc(type)
          .collection('spaces')
          .get();

        const spaces = spacesSnapshot.docs.map(doc => ({
          id: doc.id,
          type: type,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.()?.toISOString(),
          updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString(),
          activatedAt: doc.data().activatedAt?.toDate?.()?.toISOString(),
          archivedAt: doc.data().archivedAt?.toDate?.()?.toISOString()
        }));

        allSpaces.push(...spaces);
      } catch (error) {
        logger.error('Error fetching spaces for type', { type, error: error, endpoint: '/api/admin/spaces' });
      }
    }

    // Apply status filter
    if (status !== 'all') {
      allSpaces = allSpaces.filter(space => {
        switch (status) {
          case 'active':
            return space.hasBuilders && space.status === 'activated';
          case 'dormant':
            return !space.hasBuilders && space.status === 'activated';
          case 'archived':
            return space.isArchived;
          default:
            return true;
        }
      });
    }

    // Apply text search filter
    if (search) {
      const searchLower = search.toLowerCase();
      allSpaces = allSpaces.filter(space => 
        space.name?.toLowerCase().includes(searchLower) ||
        space.description?.toLowerCase().includes(searchLower) ||
        space.tags?.some((tag: string) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort by last updated (most recent first)
    allSpaces.sort((a, b) => {
      const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return bTime - aTime;
    });

    // Apply pagination
    const totalCount = allSpaces.length;
    const paginatedSpaces = allSpaces.slice(offset, offset + limit);

    // Get additional details for each space
    const spacesWithDetails = await Promise.all(
      paginatedSpaces.map(async (space) => {
        try {
          // Get member count and builder info
          const membersSnapshot = await dbAdmin
            .collection('spaces')
            .doc(space.type)
            .collection('spaces')
            .doc(space.id)
            .collection('members')
            .get();

          const members = membersSnapshot.docs.map(doc => ({
            id: doc.id,
            role: doc.data().role,
            joinedAt: doc.data().joinedAt?.toDate?.()?.toISOString()
          }));

          const builderCount = members.filter(m => m.role === 'builder').length;
          const adminCount = members.filter(m => m.role === 'admin').length;

          return {
            ...space,
            actualMemberCount: members.length,
            builderCount,
            adminCount,
            members: members.slice(0, 5), // First 5 members for preview
            healthScore: calculateSpaceHealthScore(space, members)
          };
        } catch (error) {
          logger.error('Error getting detailsfor space', { spaceId: space.id, error: error, endpoint: '/api/admin/spaces' });
          return {
            ...space,
            actualMemberCount: space.memberCount || 0,
            builderCount: 0,
            adminCount: 0,
            members: [],
            healthScore: 0
          };
        }
      })
    );

    // Calculate summary statistics
    const summary = {
      totalSpaces: totalCount,
      activeSpaces: allSpaces.filter(s => s.hasBuilders && s.status === 'activated').length,
      dormantSpaces: allSpaces.filter(s => !s.hasBuilders && s.status === 'activated').length,
      archivedSpaces: allSpaces.filter(s => s.isArchived).length,
      totalMembers: spacesWithDetails.reduce((sum, s) => sum + s.actualMemberCount, 0),
      averageMembers: spacesWithDetails.length > 0 ? 
        Math.round(spacesWithDetails.reduce((sum, s) => sum + s.actualMemberCount, 0) / spacesWithDetails.length) : 0,
      byType: spaceTypes.reduce((acc, type) => {
        const typeSpaces = allSpaces.filter(s => s.type === type);
        acc[type] = {
          total: typeSpaces.length,
          active: typeSpaces.filter(s => s.hasBuilders).length,
          dormant: typeSpaces.filter(s => !s.hasBuilders).length
        };
        return acc;
      }, {} as Record<string, any>)
    };

    return NextResponse.json({
      success: true,
      spaces: spacesWithDetails,
      pagination: {
        limit,
        offset,
        totalCount,
        hasMore: offset + limit < totalCount,
        nextOffset: offset + limit < totalCount ? offset + limit : null
      },
      filters: {
        search: search || null,
        type: spaceType || null,
        status: status || null
      },
      summary
    });

  } catch (error) {
    logger.error('Admin spaces GET error', { error: error, endpoint: '/api/admin/spaces' });
    return NextResponse.json(ApiResponseHelper.error("Failed to get spaces", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

/**
 * Create new space or update existing space
 * POST /api/admin/spaces
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Authorization header required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
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
        return NextResponse.json(ApiResponseHelper.error("Invalid or expired token", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
      }
    }

    // Check if user is admin
    if (!(await isAdmin(adminUserId))) {
      return NextResponse.json(ApiResponseHelper.error("Admin access required", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const body = await request.json();
    const action = body.action || 'create';

    if (action === 'create') {
      // Create new space
      const { name, description, spaceType, isPrivate, tags, maxMembers } = spaceCreateSchema.parse(body);

      const spaceRef = dbAdmin
        .collection('spaces')
        .doc(spaceType)
        .collection('spaces')
        .doc();

      const spaceData = {
        name,
        description,
        type: spaceType,
        isPrivate,
        tags,
        maxMembers,
        memberCount: 0,
        status: 'activated',
        hasBuilders: false,
        builderCount: 0,
        isAutoGenerated: false,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        createdBy: adminUserId,
        createdByAdmin: true
      };

      await spaceRef.set(spaceData);

      logger.info('👑 Admin created space', { adminUserId, spaceId: spaceRef.id, endpoint: '/api/admin/spaces' });

      return NextResponse.json({
        success: true,
        message: 'Space created successfully',
        spaceId: spaceRef.id,
        spaceType,
        name,
        createdBy: adminUserId
      });

    } else if (action === 'update') {
      // Update existing space
      const { spaceId, spaceType, name, description, isPrivate, tags, maxMembers } = spaceUpdateSchema.parse(body);

      const spaceRef = dbAdmin
        .collection('spaces')
        .doc(spaceType)
        .collection('spaces')
        .doc(spaceId);

      const spaceDoc = await spaceRef.get();
      if (!spaceDoc.exists) {
        return NextResponse.json(ApiResponseHelper.error("Space not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
      }

      const updateData: any = {
        updatedAt: FieldValue.serverTimestamp(),
        lastModifiedBy: adminUserId,
        lastModifiedByAdmin: true
      };

      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (isPrivate !== undefined) updateData.isPrivate = isPrivate;
      if (tags !== undefined) updateData.tags = tags;
      if (maxMembers !== undefined) updateData.maxMembers = maxMembers;

      await spaceRef.update(updateData);

      logger.info('👑 Adminupdated space', { adminUserId, spaceId, endpoint: '/api/admin/spaces' });

      return NextResponse.json({
        success: true,
        message: 'Space updated successfully',
        spaceId,
        spaceType,
        updatedFields: Object.keys(updateData).filter(key => !key.startsWith('updated') && !key.startsWith('lastModified')),
        updatedBy: adminUserId
      });
    }

  } catch (error: any) {
    logger.error('Admin spaces POST error', { error: error, endpoint: '/api/admin/spaces' });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid request data', 
          details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(ApiResponseHelper.error("Failed to create/update space", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

/**
 * Space actions (activate, deactivate, archive, delete)
 * DELETE /api/admin/spaces
 */
export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Authorization header required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
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
        return NextResponse.json(ApiResponseHelper.error("Invalid or expired token", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
      }
    }

    // Check if user is admin
    if (!(await isAdmin(adminUserId))) {
      return NextResponse.json(ApiResponseHelper.error("Admin access required", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const body = await request.json();
    const { spaceId, spaceType, action, reason } = spaceActionSchema.parse(body);

    const spaceRef = dbAdmin
      .collection('spaces')
      .doc(spaceType)
      .collection('spaces')
      .doc(spaceId);

    const spaceDoc = await spaceRef.get();
    if (!spaceDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Space not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const updateData: any = {
      updatedAt: FieldValue.serverTimestamp(),
      lastModifiedBy: adminUserId,
      lastModifiedByAdmin: true
    };

    let actionMessage = '';

    switch (action) {
      case 'activate':
        updateData.status = 'activated';
        updateData.activatedAt = FieldValue.serverTimestamp();
        updateData.activatedBy = adminUserId;
        updateData.activatedReason = reason;
        actionMessage = 'Space activated';
        break;

      case 'deactivate':
        updateData.status = 'dormant';
        updateData.deactivatedAt = FieldValue.serverTimestamp();
        updateData.deactivatedBy = adminUserId;
        updateData.deactivatedReason = reason;
        actionMessage = 'Space deactivated';
        break;

      case 'archive':
        updateData.isArchived = true;
        updateData.archivedAt = FieldValue.serverTimestamp();
        updateData.archivedBy = adminUserId;
        updateData.archivedReason = reason;
        actionMessage = 'Space archived';
        break;

      case 'reset':
        // Reset space to initial state
        updateData.hasBuilders = false;
        updateData.builderCount = 0;
        updateData.status = 'activated';
        updateData.resetAt = FieldValue.serverTimestamp();
        updateData.resetBy = adminUserId;
        updateData.resetReason = reason;
        actionMessage = 'Space reset to initial state';
        break;

      case 'delete':
        // For safety, we'll archive rather than actually delete
        updateData.isDeleted = true;
        updateData.deletedAt = FieldValue.serverTimestamp();
        updateData.deletedBy = adminUserId;
        updateData.deletedReason = reason;
        actionMessage = 'Space marked as deleted';
        break;
    }

    await spaceRef.update(updateData);

    // Log admin action
    await logAdminAction(adminUserId, `space_${action}`, spaceId, reason);

    logger.info('👑 Admin performedon space', {  action, spaceId, endpoint: '/api/admin/spaces'  });

    return NextResponse.json({
      success: true,
      message: actionMessage,
      action,
      spaceId,
      spaceType,
      reason,
      performedBy: adminUserId,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    logger.error('Admin spaces DELETE error', { error: error, endpoint: '/api/admin/spaces' });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid request data', 
          details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(ApiResponseHelper.error("Failed to perform space action", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

/**
 * Calculate space health score based on activity and engagement
 */
function calculateSpaceHealthScore(space: any, members: any[]): number {
  let score = 0;

  // Member count (0-40 points)
  const memberCount = members.length;
  if (memberCount > 0) score += Math.min(memberCount * 2, 40);

  // Has builders (20 points)
  if (space.hasBuilders) score += 20;

  // Recent activity (20 points)
  if (space.updatedAt) {
    const daysSinceUpdate = (Date.now() - new Date(space.updatedAt).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate < 7) score += 20;
    else if (daysSinceUpdate < 30) score += 10;
  }

  // Is not private (10 points)
  if (!space.isPrivate) score += 10;

  // Has description and tags (10 points)
  if (space.description && space.tags?.length > 0) score += 10;

  return Math.min(score, 100);
}

/**
 * Log admin actions for audit trail
 */
async function logAdminAction(adminUserId: string, action: string, targetId: string, reason: string) {
  try {
    await dbAdmin.collection('adminLogs').add({
      adminUserId,
      action,
      targetId,
      reason,
      timestamp: FieldValue.serverTimestamp(),
      type: 'space_action'
    });
  } catch (error) {
    logger.error('Error logging admin action', { error: error, endpoint: '/api/admin/spaces' });
  }
}